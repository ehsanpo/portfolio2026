import { useAudioStore } from "@/store/useAudioStore";
import { memo, useEffect, useRef, useState } from "react";
import { ChevronUp, Minimize2, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import type SiriWaveType from "siriwave";

const SiriWaveBar = memo(function SiriWaveBar() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let cancelled = false;
		let wave: InstanceType<SiriWaveType> | null = null;
		let unsubscribe: (() => void) | null = null;

		const applyState = (isPlaying: boolean) => {
			if (!wave) return;
			wave.setAmplitude(isPlaying ? 10 : 0.12);
			wave.setSpeed(isPlaying ? 0.3 : 0);
		};

		const setup = async () => {
			const container = containerRef.current;
			if (!container) return;

			const { default: SiriWave } = await import("siriwave");
			if (cancelled || !container) return;

			const curveDefinition = [
				{ color: "255,200,2", supportLine: true },
				{ color: "250,34,5" },
				{ color: "0,182,254" },
			];

			wave = new SiriWave({
				container,
				style: "ios9",
				speed: 0.08,
				amplitude: 3,
				color: "#facc15",
				autostart: true,
				cover: false,
				width: 96,
				height: 24,
				curveDefinition,
			});

			wave.start();
			applyState(useAudioStore.getState().isPlaying);
			unsubscribe = useAudioStore.subscribe(
				(state) => state.isPlaying,
				(isPlaying) => applyState(isPlaying)
			);
		};

		setup();

		return () => {
			cancelled = true;
			if (unsubscribe) unsubscribe();
			if (wave) wave.dispose();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative h-6 w-16 sm:w-24"
			style={{ minWidth: "64px", paddingTop: "6px" }}
		/>
	);
});

export function GlobalAudioPlayer() {
	const {
		currentTrack,
		isPlaying,
		pauseTrack,
		resumeTrack,
		nextTrack,
		prevTrack,
		playlist,
		volume,
		isMuted,
		setVolume,
		setMuted,
		currentTime,
		duration,
		setCurrentTime,
		setDuration,
		seekVersion,
		seekTime,
		requestSeek,
	} = useAudioStore();

	const [isMinimized, setIsMinimized] = useState(false);
	const [isLocalPlayerVisible, setIsLocalPlayerVisible] = useState(false);

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const intersectionRef = useRef<IntersectionObserver | null>(null);
	const mutationRef = useRef<MutationObserver | null>(null);

	// Handle audio play/pause and track changes
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		// Connect to audio system for visualization
		import("@/utils/audioSystem").then(({ audioManager }) => {
			audioManager.connectSource(audio);
		});

		if (currentTrack) {
			if (audio.src !== currentTrack.src) {
				audio.src = currentTrack.src || "";
				audio.load();
			}

			if (isPlaying) {
				audio.play().catch((error) => {
					console.error("Audio playback failed:", error);
					pauseTrack();
				});
			} else {
				audio.pause();
			}
		} else {
			audio.pause();
			audio.src = "";
		}
	}, [currentTrack, isPlaying, pauseTrack]);

	// Handle volume changes
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : volume;
		}
	}, [volume, isMuted]);

	// Handle external seek requests
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (!Number.isFinite(seekTime)) return;
		if (seekVersion === 0) return;

		const clamped =
			Number.isFinite(audio.duration) && audio.duration > 0
				? Math.min(Math.max(seekTime, 0), audio.duration)
				: Math.max(seekTime, 0);
		audio.currentTime = clamped;
	}, [seekVersion, seekTime]);

	// Track local player visibility (hide global UI while in view)
	useEffect(() => {
		const attachObserver = () => {
			if (intersectionRef.current) {
				intersectionRef.current.disconnect();
				intersectionRef.current = null;
			}

			const target = document.querySelector("[data-local-music-player]");
			if (!target) {
				setIsLocalPlayerVisible(false);
				return false;
			}

			intersectionRef.current = new IntersectionObserver(
				(entries) => {
					setIsLocalPlayerVisible(entries.some((entry) => entry.isIntersecting));
				},
				{ threshold: 0.2 }
			);
			intersectionRef.current.observe(target);
			return true;
		};

		const ensureObserver = () => {
			if (attachObserver()) return;
			if (mutationRef.current) mutationRef.current.disconnect();
			mutationRef.current = new MutationObserver(() => {
				if (attachObserver()) {
					mutationRef.current?.disconnect();
					mutationRef.current = null;
				}
			});
			mutationRef.current.observe(document.body, { childList: true, subtree: true });
		};

		ensureObserver();
		const handleAfterSwap = () => ensureObserver();
		document.addEventListener("astro:after-swap", handleAfterSwap);

		return () => {
			document.removeEventListener("astro:after-swap", handleAfterSwap);
			intersectionRef.current?.disconnect();
			mutationRef.current?.disconnect();
		};
	}, []);

	const handleTimeUpdate = () => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	const handleLoadedMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
		}
	};

	const handleEnded = () => {
		nextTrack();
	};

	const togglePlay = () => {
		if (isPlaying) {
			pauseTrack();
		} else {
			resumeTrack();
		}
	};

	const toggleMute = () => {
		setMuted(!isMuted);
	};

	const formatTime = (seconds: number) => {
		if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
	const totalTimeLabel = duration > 0 ? formatTime(duration) : currentTrack?.duration || "0:00";
	const currentTimeLabel = formatTime(currentTime);
	const shouldHide = isLocalPlayerVisible;

	if (!currentTrack) return null;

	return (
		<div
			className={cn(
				"fixed right-0 bottom-0 left-0 z-50 transition-all duration-300",
				shouldHide && "pointer-events-none translate-y-full opacity-0"
			)}
			aria-hidden={shouldHide}
		>
			<div
				className={cn(
					"skeu-panel relative w-full",
					isMinimized ? "h-4 px-2 py-0" : "px-3 py-2"
				)}
			>
				{isMinimized ? (
					<div className="relative h-full">
						<div className="absolute inset-0 skeu-track">
							<div
								className="absolute inset-y-0 left-0 rounded-full"
								style={{
									width: `${progress}%`,
									background: "linear-gradient(90deg, hsl(45 80% 50%), hsl(45 80% 60%))",
									boxShadow: "0 0 8px hsl(45 100% 50% / 0.5)",
								}}
							/>
						</div>
						<button
							onClick={() => setIsMinimized(false)}
							className="skeu-button absolute top-1/2 right-1 flex h-4 w-4 -translate-y-1/2 items-center justify-center"
							aria-label="Expand player"
						>
							<ChevronUp className="h-2.5 w-2.5" />
						</button>
					</div>
				) : (
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2">
								<button
									onClick={prevTrack}
									disabled={playlist.length === 0}
									className="skeu-button flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
									aria-label="Previous track"
								>
									<SkipBack className="h-4 w-4" />
								</button>
								<button
									onClick={togglePlay}
									className={cn(
										"flex h-9 w-9 items-center justify-center",
										isPlaying ? "skeu-button-primary" : "skeu-button"
									)}
									aria-label={isPlaying ? "Pause" : "Play"}
								>
									{isPlaying ? (
										<Pause className="h-4 w-4" />
									) : (
										<Play className="ml-0.5 h-4 w-4" />
									)}
								</button>
								<button
									onClick={nextTrack}
									disabled={playlist.length === 0}
									className="skeu-button flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
									aria-label="Next track"
								>
									<SkipForward className="h-4 w-4" />
								</button>
							</div>

							<div className="flex min-w-0 flex-1 items-center gap-3">
								<div className="skeu-inset min-w-0 flex-1 px-3 py-1.5">
									<p className="text-xs font-medium text-foreground truncate">
										{currentTrack?.title || "No song selected"}
									</p>
									<p className="text-[10px] text-muted-foreground truncate">
										{currentTrack?.artist || "Select a song"}
									</p>
								</div>
								<div className="skeu-inset flex items-center px-2 py-1">
									<SiriWaveBar />
								</div>
							</div>

							<div className="flex items-center gap-2">
								<button
									onClick={toggleMute}
									className="skeu-button flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
									aria-label={isMuted ? "Unmute" : "Mute"}
								>
									{isMuted || volume === 0 ? (
										<VolumeX className="h-4 w-4" />
									) : (
										<Volume2 className="h-4 w-4" />
									)}
								</button>
								<div className="hidden w-20 items-center md:flex">
									<div className="relative h-1.5 w-full skeu-track">
										<div
											className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/60"
											style={{ width: `${isMuted ? 0 : volume * 100}%` }}
										/>
										<input
											type="range"
											min="0"
											max="100"
											value={isMuted ? 0 : Math.round(volume * 100)}
											onChange={(e) => {
												setMuted(false);
												setVolume(Number(e.target.value) / 100);
											}}
											className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
										/>
										<div
											className="skeu-knob absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
											style={{ left: `${isMuted ? 0 : volume * 100}%` }}
										/>
									</div>
								</div>
								<button
									onClick={() => setIsMinimized(true)}
									className="skeu-button flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground"
									aria-label="Minimize player"
								>
									<Minimize2 className="h-3.5 w-3.5" />
								</button>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<span className="w-8 text-right text-[10px] font-mono text-muted-foreground">
								{currentTimeLabel}
							</span>
							<div className="relative h-1.5 flex-1 skeu-track">
								<div
									className="absolute inset-y-0 left-0 rounded-full"
									style={{
										width: `${progress}%`,
										background: "linear-gradient(90deg, hsl(45 80% 50%), hsl(45 80% 60%))",
										boxShadow: "0 0 8px hsl(45 100% 50% / 0.5)",
									}}
								/>
								<input
									type="range"
									min="0"
									max="100"
									value={progress}
									onChange={(e) => {
										if (duration <= 0) return;
										const nextValue = Number(e.target.value);
										requestSeek((nextValue / 100) * duration);
									}}
									className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
								/>
								<div
									className="skeu-knob absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
									style={{ left: `${progress}%` }}
								/>
							</div>
							<span className="w-8 text-[10px] font-mono text-muted-foreground">
								{totalTimeLabel}
							</span>
						</div>
					</div>
				)}
			</div>
			<audio
				ref={audioRef}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={handleEnded}
			/>
		</div>
	);
}
