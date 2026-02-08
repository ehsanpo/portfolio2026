import { useAudioStore } from "@/store/useAudioStore";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
		setMuted,
		currentTime,
		duration,
		setCurrentTime,
		setDuration,
		seekVersion,
		seekTime,
	} = useAudioStore();
	const [isMinimized, setIsMinimized] = useState(false);

	// Visual equalizer state
	const [audioData, setAudioData] = useState<number[]>(new Array(20).fill(0));
	const animationRef = useRef<number>();

	const audioRef = useRef<HTMLAudioElement | null>(null);

	// Handle audio play/pause and track changes
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		// Connect to audio system for visualization
		// Dynamic import to avoid SSR issues if this runs on server, though client:only prevents that usually
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

	// Visual equalizer animation using simple random data for now
	// In a real implementation with Web Audio API, we could analyze the actual stream
	useEffect(() => {
		if (isPlaying) {
			const animateEqualizer = () => {
				setAudioData((prev) => prev.map(() => Math.random() * 100));
				animationRef.current = requestAnimationFrame(animateEqualizer);
			};
			animateEqualizer();

			return () => {
				if (animationRef.current) {
					cancelAnimationFrame(animationRef.current);
				}
			};
		} else {
			setAudioData(new Array(20).fill(0));
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		}
	}, [isPlaying]);

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

	if (!currentTrack) return null;

	return (
		<div
			className={cn(
				"glass-card border-secondary-400/30 bg-secondary-400/30 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur transition-all duration-300",
				isMinimized ? "h-2" : "h-16"
			)}
		>
			{isMinimized ? (
				// Minimized view - just progress bar
				<div className="relative h-full">
					<div
						className="from-primary-500 to-secondary-500 h-full bg-linear-to-r transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
					<button
						onClick={() => setIsMinimized(false)}
						className="hover:text-primary-200 absolute top-1/2 right-2 -translate-y-1/2 transform text-xs text-white"
					>
						↓
					</button>
				</div>
			) : (
				// Full view
				<div className="flex h-full items-center justify-between px-4">
					{/* Left side - Track info and controls */}
					<div className="flex min-w-0 flex-1 items-center space-x-4">
						{/* Play/Pause */}
						<Button variant="ghost" onClick={togglePlay} className="shrink-0">
							{isPlaying ? <Pause size={16} /> : <Play size={16} />}
						</Button>

						{/* Previous/Next */}
						<div className="flex items-center space-x-1">
							<Button
								variant="ghost"
								onClick={prevTrack}
								disabled={playlist.length === 0}
								className="p-1"
							>
								<SkipBack size={14} />
							</Button>
							<Button
								variant="ghost"
								onClick={nextTrack}
								disabled={playlist.length === 0}
								className="p-1"
							>
								<SkipForward size={14} />
							</Button>
						</div>

						{/* Track info */}
						<div className="min-w-0 flex-1">
							<div className="flex items-center space-x-3">
								<div className="min-w-0 flex-1">
									<div className="font-basement text-foreground truncate text-sm">
										{currentTrack.title}
									</div>
									<div className="text-muted-foreground font-kabel truncate text-xs">
										{currentTrack.artist}
									</div>
								</div>
								<div className="text-muted-foreground font-kabel shrink-0 text-xs">
									{formatTime(currentTime)} / {formatTime(duration)}
								</div>
							</div>
						</div>
					</div>

					{/* Center - Visual Equalizer */}
					<div className="flex items-center justify-center space-x-1 px-4">
						{audioData.map((height, index) => (
							<div
								key={index}
								className="from-primary-500 to-secondary-500 w-1 rounded-full bg-linear-to-t transition-all duration-75"
								style={{
									height: `${Math.max(2, height * 0.3)}px`,
									opacity: isPlaying ? 1 : 0.3,
								}}
							/>
						))}
					</div>

					{/* Right side - Volume and controls */}
					<div className="flex shrink-0 items-center space-x-3">
						{/* Volume */}
						<div className="flex items-center space-x-2">
							<Button variant="ghost" onClick={toggleMute} className="p-1">
								{isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
							</Button>
							<div className="bg-muted h-1 w-16 rounded-full">
								<div
									className="bg-primary-500 h-full rounded-full transition-all"
									style={{ width: `${isMuted ? 0 : volume * 100}%` }}
								/>
							</div>
						</div>

						{/* Minimize button */}
						<Button variant="ghost" onClick={() => setIsMinimized(true)} className="p-1">
							<Minimize2 size={14} />
						</Button>
					</div>
				</div>
			)}

			{/* Progress bar at bottom */}
			{!isMinimized && (
				<div className="bg-muted/30 absolute right-0 bottom-0 left-0 h-1">
					<div
						className="from-primary-500 to-secondary-500 h-full bg-linear-to-r transition-all duration-300"
						style={{ width: `${progress}%` }}
					/>
				</div>
			)}
			<audio
				ref={audioRef}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onEnded={handleEnded}
			/>
		</div>
	);
}
