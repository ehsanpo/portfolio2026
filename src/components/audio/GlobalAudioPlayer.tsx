import { useAudioStore } from "@/store/useAudioStore";
import { memo, useEffect, useRef, useState } from "react";
import { ChevronUp, Minimize2, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const SiriWaveBar = memo(function SiriWaveBar() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let cancelled = false;
		let wave: any = null;
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
				{ color: "35,30,22", supportLine: true },
				{ color: "239,91,59" },
				{ color: "244,184,41" },
			];

			wave = new SiriWave({
				container,
				style: "ios9",
				speed: 0.08,
				amplitude: 3,
				color: "#ef5b3b",
				autostart: true,
				cover: false,
				width: 96,
				height: 24,
				curveDefinition,
			});

			wave.start();
			applyState(useAudioStore.getState().isPlaying);
			unsubscribe = useAudioStore.subscribe((state) => {
				applyState(state.isPlaying);
			});
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
				"fixed right-3 bottom-3 left-3 z-50 transition-all duration-300 md:left-auto md:w-[540px]",
				shouldHide && "pointer-events-none translate-y-full opacity-0"
			)}
			aria-hidden={shouldHide}
		>
			<div className="on-paper hard bg-cream text-ink relative w-full">
				{isMinimized ? (
					<div className="flex items-center gap-3 px-2.5 py-1.5">
						<span className="size-2.5 shrink-0 border border-ink bg-tomato" aria-hidden="true" />
						<span className="font-pixel shrink-0 text-xs leading-none">STUDIO DECK</span>
						<div className="relative h-2.5 flex-1 border-[1.5px] border-ink bg-paper">
							<div
								className="absolute inset-y-0 left-0 bg-tomato"
								style={{ width: `${progress}%` }}
							/>
						</div>
						<button
							type="button"
							onClick={() => setIsMinimized(false)}
							className="inline-flex size-6 items-center justify-center border-[1.5px] border-ink bg-paper text-ink shadow-[2px_2px_0_var(--ink)] transition-transform active:translate-x-[1px] active:translate-y-[1px]"
							aria-label="Expand player"
						>
							<ChevronUp className="size-3.5" />
						</button>
					</div>
				) : (
					<div>
						<div className="flex items-center gap-3 border-b-[1.5px] border-ink px-2.5 py-1">
							<span className="size-2.5 shrink-0 border border-ink bg-tomato" aria-hidden="true" />
							<span className="stripes h-[11px] flex-1" aria-hidden="true" />
							<span className="font-pixel text-xs leading-none">ON AIR / STUDIO DECK</span>
							<span className="stripes h-[11px] flex-1" aria-hidden="true" />
							<button
								type="button"
								onClick={() => setIsMinimized(true)}
								className="inline-flex size-5 items-center justify-center border-[1.5px] border-ink bg-paper text-ink transition-colors hover:bg-mustard"
								aria-label="Minimize player"
							>
								<Minimize2 className="size-3" />
							</button>
						</div>

						<div className="flex flex-col gap-2.5 p-3">
							<div className="flex items-center gap-2.5">
								<div className="flex items-center gap-1.5">
									<button
										type="button"
										onClick={prevTrack}
										disabled={playlist.length === 0}
										className="key h-8! w-8! bg-paper p-0! text-ink shadow-[2px_2px_0_var(--ink)]! disabled:cursor-not-allowed disabled:opacity-40"
										aria-label="Previous track"
									>
										<SkipBack className="size-3.5" />
									</button>
									<button
										type="button"
										onClick={togglePlay}
										className={cn(
											"key h-9! w-9! p-0! shadow-[2px_2px_0_var(--ink)]!",
											isPlaying ? "bg-tomato text-ink" : "bg-mustard text-ink"
										)}
										aria-label={isPlaying ? "Pause" : "Play"}
									>
										{isPlaying ? (
											<Pause className="size-4" />
										) : (
											<Play className="ml-0.5 size-4" />
										)}
									</button>
									<button
										type="button"
										onClick={nextTrack}
										disabled={playlist.length === 0}
										className="key h-8! w-8! bg-paper p-0! text-ink shadow-[2px_2px_0_var(--ink)]! disabled:cursor-not-allowed disabled:opacity-40"
										aria-label="Next track"
									>
										<SkipForward className="size-3.5" />
									</button>
								</div>

								<div className="flex min-w-0 flex-1 items-center gap-2 border-[1.5px] border-ink bg-paper px-2.5 py-1.5">
									<div className="min-w-0 flex-1">
										<p className="truncate font-mono text-xs font-bold text-ink">
											{currentTrack?.title || "No song selected"}
										</p>
										<p className="truncate font-mono text-[10px] text-ink/70">
											{currentTrack?.artist || "Select a song"}
										</p>
									</div>
									<div className="shrink-0 border-l-[1.5px] border-ink/20 pl-2">
										<SiriWaveBar />
									</div>
								</div>

								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={toggleMute}
										className="key h-8! w-8! bg-paper p-0! text-ink shadow-[2px_2px_0_var(--ink)]!"
										aria-label={isMuted ? "Unmute" : "Mute"}
									>
										{isMuted || volume === 0 ? (
											<VolumeX className="size-3.5" />
										) : (
											<Volume2 className="size-3.5" />
										)}
									</button>
									<div className="hidden w-16 items-center sm:flex">
										<div className="relative h-2.5 w-full border-[1.5px] border-ink bg-paper">
											<div
												className="absolute inset-y-0 left-0 bg-mustard"
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
												aria-label="Volume"
												className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<span className="w-8 text-right font-mono text-[10px] font-semibold text-ink">
									{currentTimeLabel}
								</span>
								<div className="relative h-3 flex-1 border-[1.5px] border-ink bg-paper">
									<div
										className="absolute inset-y-0 left-0 bg-tomato"
										style={{ width: `${progress}%` }}
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
										aria-label="Seek track"
										className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
									/>
									<div
										className="pointer-events-none absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-ink bg-mustard"
										style={{ left: `${progress}%` }}
									/>
								</div>
								<span className="w-8 font-mono text-[10px] font-semibold text-ink">
									{totalTimeLabel}
								</span>
							</div>
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
