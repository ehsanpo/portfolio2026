import React, { useMemo, useState, useRef, useEffect } from "react";
import { Disc3, Music, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2, Sparkles } from "lucide-react";
import AudioVisualizer from "@/components/audio/AudioVisualizer";
import CyberShaderVisualizer from "@/components/audio/CyberShaderVisualizer";
import MasteringDesk from "@/components/audio/MasteringDesk";
import { SHADER_PRESETS } from "@/components/audio/shaderPresets";
import { audioManager } from "@/utils/audioSystem";
import { useAudioStore } from "@/store/useAudioStore";

interface MusicTrack {
	filename: string;
	title: string;
	artist: string;
	src: string;
}

interface LocalMusicPlayerProps {
	tracks?: MusicTrack[];
}

const LocalMusicPlayer: React.FC<LocalMusicPlayerProps> = ({ tracks = [] }) => {
	const {
		currentTrack,
		isPlaying,
		playTrack,
		pauseTrack,
		resumeTrack,
		setPlaylist,
		nextTrack,
		prevTrack,
		currentTime,
		duration,
		volume,
		isMuted,
		setVolume,
		setMuted,
		requestSeek,
	} = useAudioStore();
	const [visualizerMode, setVisualizerMode] = useState<"orbit" | "shader" | "mastering">("shader");
	const [selectedPresetId, setSelectedPresetId] = useState<string>("fractal-continuous-morph");
	const [shaderCategory, setShaderCategory] = useState<"All" | "Mastering" | "Fractal" | "Dream" | "EQ" | "MilkDrop" | "Orbit">("All");
	const [autoCycleFractal, setAutoCycleFractal] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const playerContainerRef = useRef<HTMLDivElement>(null);

	// Real-time audio telemetry for mastering desk meters and displays
	const [analyserData, setAnalyserData] = useState({
		bass: 0,
		mid: 0,
		treble: 0,
		subBass: 0,
		isPlaying: false,
	});

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(Boolean(document.fullscreenElement));
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
	}, []);

	// Live audio sampling loop
	useEffect(() => {
		let animId: number;
		const analyser = audioManager.getAnalyser();
		const buffer = new Uint8Array(analyser.frequencyBinCount);

		const sample = () => {
			animId = requestAnimationFrame(sample);
			analyser.getByteFrequencyData(buffer);

			let sub = 0;
			let b = 0;
			let m = 0;
			let t = 0;

			for (let i = 0; i < 4; i++) sub += buffer[i];
			for (let i = 0; i < 12; i++) b += buffer[i];
			for (let i = 20; i < 80; i++) m += buffer[i];
			for (let i = 100; i < 200; i++) t += buffer[i];

			setAnalyserData({
				subBass: sub / 4 / 255,
				bass: b / 12 / 255,
				mid: m / 60 / 255,
				treble: t / 100 / 255,
				isPlaying,
			});
		};

		sample();
		return () => cancelAnimationFrame(animId);
	}, [isPlaying]);

	// Auto cycle between fractals seamlessly without breaking
	useEffect(() => {
		if (!autoCycleFractal) return;
		const fractals = SHADER_PRESETS.filter((p) => p.category === "Fractal");
		if (fractals.length === 0) return;

		const interval = setInterval(() => {
			setSelectedPresetId((prev) => {
				const currIdx = fractals.findIndex((f) => f.id === prev);
				const nextIdx = (currIdx + 1) % fractals.length;
				return fractals[nextIdx].id;
			});
		}, 8500);

		return () => clearInterval(interval);
	}, [autoCycleFractal]);

	const toggleFullscreen = async () => {
		if (!playerContainerRef.current) return;
		if (!document.fullscreenElement) {
			try {
				await playerContainerRef.current.requestFullscreen();
			} catch (err) {
				console.error("Fullscreen error:", err);
			}
		} else {
			try {
				await document.exitFullscreen();
			} catch (err) {
				console.error("Exit fullscreen error:", err);
			}
		}
	};

	const storePlaylist = useMemo(
		() =>
			tracks.map((track) => ({
				id: track.src,
				title: track.title,
				artist: track.artist,
				duration: "0:00",
				src: track.src,
			})),
		[tracks]
	);

	const formatTime = (seconds: number) => {
		if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const handleSongSelect = (track: MusicTrack) => {
		const trackData = {
			id: track.src,
			title: track.title,
			artist: track.artist,
			duration: "0:00",
			src: track.src,
		};

		if (currentTrack?.id === track.src && isPlaying) {
			pauseTrack();
			return;
		}

		if (currentTrack?.id === track.src) {
			resumeTrack();
			return;
		}

		setPlaylist(storePlaylist);
		playTrack(trackData);
	};

	const handlePlayPause = () => {
		if (currentTrack) {
			if (isPlaying) {
				pauseTrack();
			} else {
				resumeTrack();
			}
			return;
		}

		if (tracks.length > 0) {
			handleSongSelect(tracks[0]);
		}
	};

	const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
	const totalTimeLabel = duration > 0 ? formatTime(duration) : currentTrack?.duration || "0:00";
	const currentTimeLabel = formatTime(currentTime);


	if (tracks.length === 0) {
		return (
			<div className="on-paper hard bg-cream p-8 text-center text-ink">
				<p className="label-mono">No local music tracks found</p>
			</div>
		);
	}

	const categories = ["All", "Fractal", "Mastering", "Dream", "EQ", "MilkDrop", "Orbit"] as const;

	return (
		<div
			ref={playerContainerRef}
			className={`mx-auto w-full transition-all duration-300 ${
				isFullscreen
					? "fixed inset-0 z-50 flex h-screen w-screen max-w-none flex-col justify-between bg-ink p-6"
					: "max-w-5xl"
			}`}
			data-local-music-player
		>
			<div className={`on-paper hard flex flex-col bg-cream text-ink ${isFullscreen ? "h-full flex-1" : ""}`}>
				<div className="flex items-center gap-3 border-b-[1.5px] border-ink px-2.5 py-1.5">
					<span
						className={`size-3 shrink-0 border-[1.5px] border-ink ${isPlaying ? "animate-pulse bg-tomato" : "bg-paper"}`}
						aria-hidden="true"
					/>
					<span className="stripes h-[13px] flex-1" aria-hidden="true" />
					<span className="font-pixel text-sm leading-none">STUDIO BOOTH / LOCAL DECK</span>
					<span className="stripes h-[13px] flex-1" aria-hidden="true" />
				</div>

				<div className={`flex flex-col gap-4 p-4 ${isFullscreen ? "min-h-0 flex-1" : ""}`}>
					<div className={`flex min-h-0 flex-col gap-4 lg:flex-row ${isFullscreen ? "flex-1" : "max-h-[600px]"}`}>
						{/* Left: visualizer */}
						<div className="relative flex flex-1 flex-col overflow-hidden border-[1.5px] border-ink bg-paper p-3">
							<div className="z-20 mb-2 flex flex-col gap-2">
								<div className="flex items-center justify-between gap-2 border-b-[1.5px] border-ink/20 pb-2">
									<div className="scrollbar-none flex items-center gap-1 overflow-x-auto" role="tablist" aria-label="Visualizer category">
										{categories.map((cat) => (
											<button
												key={cat}
												type="button"
												role="tab"
												aria-selected={shaderCategory === cat}
												onClick={() => {
													setShaderCategory(cat);
													if (cat === "Orbit") {
														setVisualizerMode("orbit");
													} else if (cat === "Mastering") {
														setVisualizerMode("mastering");
													} else {
														setVisualizerMode("shader");
													}
												}}
												className={`label-mono shrink-0 border-[1.5px] px-2 py-0.5 text-[10px]! transition-colors ${
													shaderCategory === cat
														? "border-ink bg-mustard text-ink"
														: "border-transparent text-ink/70 hover:border-ink hover:text-ink"
												}`}
											>
												{cat}
											</button>
										))}
									</div>

									<div className="flex shrink-0 items-center gap-1.5">
										{(shaderCategory === "Fractal" || shaderCategory === "All") && visualizerMode === "shader" && (
											<button
												type="button"
												onClick={() => setAutoCycleFractal(!autoCycleFractal)}
												aria-pressed={autoCycleFractal}
												className={`key px-2! py-0.5! text-[10px]! shadow-[2px_2px_0_var(--ink)]! ${
													autoCycleFractal ? "bg-mint text-ink" : "bg-paper text-ink"
												}`}
												title="Cycle between all fractals without breaking"
											>
												{autoCycleFractal ? "Cycle on" : "Cycle off"}
											</button>
										)}

										<button
											type="button"
											onClick={toggleFullscreen}
											className="key bg-paper px-2! py-0.5! text-[10px]! text-ink shadow-[2px_2px_0_var(--ink)]!"
											title={isFullscreen ? "Exit fullscreen" : "Fullscreen player"}
										>
											{isFullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
											<span className="hidden sm:inline">{isFullscreen ? "Exit full" : "Full screen"}</span>
										</button>
									</div>
								</div>

								{visualizerMode === "shader" && shaderCategory !== "Orbit" && (
									<div className="scrollbar-none flex items-center gap-1 overflow-x-auto pb-1">
										{SHADER_PRESETS.filter(
											(preset) => shaderCategory === "All" || preset.category === shaderCategory
										).map((preset) => {
											const isActive = selectedPresetId === preset.id;
											return (
												<button
													key={preset.id}
													type="button"
													onClick={() => setSelectedPresetId(preset.id)}
													aria-pressed={isActive}
													className={`shrink-0 whitespace-nowrap border-[1.5px] px-2 py-0.5 font-mono text-[11px] font-semibold transition-colors ${
														isActive
															? "border-ink bg-ink text-cream"
															: "border-ink/30 bg-cream text-ink hover:border-ink hover:bg-mustard"
													}`}
												>
													{preset.name}
												</button>
											);
										})}
									</div>
								)}
							</div>

							{shaderCategory === "Orbit" && (
								<div className="pointer-events-none absolute top-1/2 left-1/2 mt-1 flex -translate-x-1/2 -translate-y-1/2 justify-center">
									<div
										className={`flex size-28 items-center justify-center border-[1.5px] border-ink bg-mustard ${isPlaying ? "animate-spin" : ""}`}
										style={{ animationDuration: "3s" }}
									>
										<div className="flex size-10 items-center justify-center border-[1.5px] border-ink bg-tomato">
											<div className="size-3 bg-cream" />
										</div>
									</div>
								</div>
							)}

							<div className="flex min-h-[320px] flex-1 overflow-hidden border-[1.5px] border-ink bg-ink">
								{shaderCategory === "Orbit" ? (
									<AudioVisualizer />
								) : shaderCategory === "Mastering" ? (
									<MasteringDesk analyserData={analyserData} />
								) : (
									<CyberShaderVisualizer presetId={selectedPresetId} />
								)}
							</div>
						</div>

						{/* Right: playlist */}
						<div className="flex w-full flex-col border-[1.5px] border-ink bg-paper lg:w-72">
							<div className="flex items-center gap-2 border-b-[1.5px] border-ink px-3 py-2">
								<Music className="size-4" />
								<span className="label-mono">Playlist</span>
								<span className="label-mono ml-auto text-ink/70">{tracks.length} tracks</span>
							</div>

							<div className="max-h-[360px] flex-1 divide-y-[1.5px] divide-ink/15 overflow-y-auto lg:max-h-none">
								{tracks.map((song, index) => {
									const isActive = currentTrack?.id === song.src;
									return (
										<button
											key={song.src}
											type="button"
											onClick={() => handleSongSelect(song)}
											aria-pressed={isActive}
											className={`flex w-full items-center gap-3 p-3 text-left transition-colors ${
												isActive ? "bg-mustard text-ink" : "bg-transparent text-ink hover:bg-cream"
											}`}
										>
											<div className="flex size-7 shrink-0 items-center justify-center border-[1.5px] border-ink bg-paper">
												{isActive && isPlaying ? (
													<div className="flex h-3 items-end gap-0.5">
														<div className="w-0.5 animate-pulse bg-ink" style={{ height: "50%" }} />
														<div className="w-0.5 animate-pulse bg-ink" style={{ height: "100%", animationDelay: "0.1s" }} />
														<div className="w-0.5 animate-pulse bg-ink" style={{ height: "60%", animationDelay: "0.2s" }} />
													</div>
												) : (
													<span className="font-mono text-[10px] font-semibold">
														{(index + 1).toString().padStart(2, "0")}
													</span>
												)}
											</div>

											<div className="min-w-0 flex-1">
												<p className="truncate font-mono text-sm font-bold">{song.title}</p>
												<p className="truncate font-mono text-xs text-ink/70">{song.artist}</p>
											</div>
										</button>
									);
								})}
							</div>
						</div>
					</div>

					{/* Transport */}
					<div className="border-[1.5px] border-ink bg-paper p-3">
						<div className="flex flex-col gap-4 lg:flex-row lg:items-center">
							<div className="min-w-0 flex-1">
								<div className="flex items-center gap-3 border-[1.5px] border-ink bg-cream p-2.5">
									<div className="flex size-10 shrink-0 items-center justify-center border-[1.5px] border-ink bg-tomato">
										<Disc3 className={`size-5 text-ink ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
									</div>
									<div className="min-w-0">
										<p className="truncate font-mono text-sm font-bold text-ink">
											{currentTrack?.title || "No song selected"}
										</p>
										<p className="truncate font-mono text-xs text-ink/70">
											{currentTrack?.artist || "Select a song"}
										</p>
									</div>
								</div>
							</div>

							<div className="flex items-center justify-center gap-3">
								<button
									type="button"
									onClick={prevTrack}
									disabled={!currentTrack}
									aria-label="Previous track"
									className="key size-10 bg-paper p-0! text-ink disabled:cursor-not-allowed disabled:opacity-40"
								>
									<SkipBack className="size-4" />
								</button>
								<button
									type="button"
									onClick={handlePlayPause}
									aria-label={isPlaying ? "Pause" : "Play"}
									className={`key size-14 p-0! text-ink ${isPlaying ? "bg-tomato" : "bg-mustard"}`}
								>
									{isPlaying ? <Pause className="size-5" /> : <Play className="ml-0.5 size-5" />}
								</button>
								<button
									type="button"
									onClick={nextTrack}
									disabled={!currentTrack}
									aria-label="Next track"
									className="key size-10 bg-paper p-0! text-ink disabled:cursor-not-allowed disabled:opacity-40"
								>
									<SkipForward className="size-4" />
								</button>
							</div>

							<div className="flex flex-1 items-center gap-2 lg:flex-[2]">
								<span className="w-8 text-right font-mono text-[10px] font-semibold text-ink">
									{currentTimeLabel}
								</span>
								<div className="relative h-3 flex-1 border-[1.5px] border-ink bg-cream">
									<div className="absolute inset-y-0 left-0 bg-tomato" style={{ width: `${progress}%` }} />
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
										className="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-ink bg-mustard"
										style={{ left: `${progress}%` }}
									/>
								</div>
								<span className="w-8 font-mono text-[10px] font-semibold text-ink">{totalTimeLabel}</span>
							</div>

							<div className="flex items-center gap-2 lg:w-32">
								<button
									type="button"
									onClick={() => setMuted(!isMuted)}
									aria-label={isMuted ? "Unmute" : "Mute"}
									className="key size-8 shrink-0 bg-paper p-0! text-ink"
								>
									{isMuted || volume === 0 ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
								</button>
								<div className="relative h-2.5 flex-1 border-[1.5px] border-ink bg-cream">
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
											setVolume(Number(e.target.value) / 100);
											if (isMuted) setMuted(false);
										}}
										aria-label="Volume"
										className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LocalMusicPlayer;
