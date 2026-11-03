import React, { useMemo, useState, useRef, useEffect } from "react";
import { Disc3, Music, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2, Sparkles } from "lucide-react";
import AudioVisualizer from "@/components/audio/AudioVisualizer";
import CyberShaderVisualizer from "@/components/audio/CyberShaderVisualizer";
import MasteringDesk from "@/components/audio/MasteringDesk";
import { SHADER_PRESETS } from "@/components/audio/shaderPresets";
import { audioManager } from "@/utils/audioSystem";
import { useAudioStore } from "@/store/useAudioStore";
import Decorator from "./Decorator";

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
			<div className="border-accent/50 bg-card rounded-lg border p-8 text-center">
				<p className="text-muted-foreground">No local music tracks found</p>
			</div>
		);
	}

	return (
		<div
			ref={playerContainerRef}
			className={`mx-auto w-full transition-all duration-300 ${
				isFullscreen
					? "fixed inset-0 z-50 flex h-screen w-screen max-w-none flex-col justify-between bg-[#06080e] p-6"
					: "max-w-5xl"
			}`}
			data-local-music-player
		>
			<div className={`skeu-panel flex flex-col ${isFullscreen ? "h-full flex-1 p-6" : "p-6"}`}>
				<div className={`flex flex-col gap-4 min-h-0 lg:flex-row ${isFullscreen ? "flex-1" : "max-h-[600px]"}`}>
					{/* Left - Visualizer */}
					<div className="flex-1 skeu-inset p-4 flex flex-col relative overflow-hidden">

						<Decorator isOn={isPlaying} /> 

						{/* Unified Category & Preset Controls Toolbar (No redundant shader titles) */}
						<div className="z-20 mb-2 flex flex-col gap-1.5">
							<div className="flex items-center justify-between border-b border-white/5 pb-1">
								{/* Category tabs */}
								<div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
									{(["All", "Fractal", "Mastering", "Dream", "EQ", "MilkDrop", "Orbit"] as const).map((cat) => (
										<button
											key={cat}
											type="button"
											onClick={() => {
												setShaderCategory(cat as any);
												if (cat === "Orbit") {
													setVisualizerMode("orbit");
												} else if (cat === "Mastering") {
													setVisualizerMode("mastering" as any);
												} else {
													setVisualizerMode("shader");
												}
											}}
											className={`rounded px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-all ${
												shaderCategory === cat
													? "bg-primary/25 text-primary border border-primary/40 shadow-sm"
													: "text-muted-foreground/70 hover:text-foreground hover:bg-white/5"
											}`}
										>
											{cat}
										</button>
									))}
								</div>

								{/* Right-aligned action buttons: Auto Cycle + Fullscreen */}
								<div className="flex items-center gap-1.5 ml-2">
									{(shaderCategory === "Fractal" || shaderCategory === "All") && visualizerMode === "shader" && (
										<button
											type="button"
											onClick={() => setAutoCycleFractal(!autoCycleFractal)}
											className={`rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase transition-all ${
												autoCycleFractal
													? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
													: "bg-background/40 text-muted-foreground/70 hover:text-foreground"
											}`}
											title="Seamlessly cycle between all 20 fractals without breaking"
										>
											{autoCycleFractal ? "Cycle ON" : "Cycle OFF"}
										</button>
									)}

									<button
										type="button"
										onClick={toggleFullscreen}
										className="skeu-button flex items-center gap-1.5 rounded px-2.5 py-0.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
										title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Player"}
									>
										{isFullscreen ? (
											<>
												<Minimize2 className="w-3.5 h-3.5" />
												<span className="hidden sm:inline text-[11px]">Exit Full</span>
											</>
										) : (
											<>
												<Maximize2 className="w-3.5 h-3.5" />
												<span className="hidden sm:inline text-[11px]">Full Screen</span>
											</>
										)}
									</button>
								</div>
							</div>

							{/* Presets list (when in Shader or EQ or MilkDrop mode) */}
							{visualizerMode === "shader" && shaderCategory !== "Orbit" && (
								<div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
									{SHADER_PRESETS.filter(
										(preset) => shaderCategory === "All" || preset.category === shaderCategory
									).map((preset) => {
										const isActive = selectedPresetId === preset.id;
										return (
											<button
												key={preset.id}
												type="button"
												onClick={() => setSelectedPresetId(preset.id)}
												className={`whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium transition-all ${
													isActive
														? "bg-accent/30 text-accent border border-accent/50 shadow-[0_0_8px_rgba(14,165,233,0.3)]"
														: "bg-background/30 text-muted-foreground/80 hover:bg-background/60 hover:text-foreground"
												}`}
											>
												{preset.name}
											</button>
										);
									})}
								</div>
							)}
						</div>

						{/* Spinning Disc (Only in Orbit mode) */}
						{shaderCategory === "Orbit" && (
							<div className="flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1 pointer-events-none">
								<div
									className={`w-28 h-28 rounded-full ${isPlaying ? "animate-spin" : ""}`}
									style={{
										animationDuration: "3s",
										background:
											"conic-gradient(from 0deg, hsl(0 0% 8%), hsl(0 0% 15%), hsl(0 0% 8%), hsl(0 0% 12%), hsl(0 0% 8%))",
										boxShadow:
											"0 8px 32px hsl(0 0% 0% / 0.8), inset 0 0 20px hsl(0 0% 0% / 0.5), 0 0 0 4px hsl(0 0% 18%)",
									}}
								>
									<div
										className="w-full h-full rounded-full flex items-center justify-center"
										style={{
											background:
												"radial-gradient(circle at 30% 30%, hsl(0 0% 25%), hsl(0 0% 10%) 60%, hsl(0 0% 5%))",
										}}
									>
										<div
											className="w-10 h-10 rounded-full"
											style={{
												background: "linear-gradient(145deg, hsl(45 80% 55%), hsl(45 80% 40%))",
												boxShadow: "0 2px 8px hsl(45 100% 50% / 0.4)",
											}}
										>
											<div className="w-full h-full rounded-full flex items-center justify-center">
												<div className="w-3 h-3 rounded-full bg-background" />
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Screen Center Visualizer Render Area */}
						<div className="flex-1 min-h-[320px] flex overflow-hidden rounded-lg">
							{shaderCategory === "Orbit" ? (
								<AudioVisualizer />
							) : shaderCategory === "Mastering" ? (
								<MasteringDesk analyserData={analyserData} />
							) : (
								<CyberShaderVisualizer presetId={selectedPresetId} />
							)}
						</div>

						{/* Ambient glow */}
						{isPlaying && (
							<div className="absolute bottom-10 left-1/4 right-1/4 h-32 pointer-events-none">
								<div className="w-full h-full bg-gradient-to-t from-primary/20 to-transparent rounded-full blur-3xl animate-pulse-glow" />
							</div>
						)}
					</div>

					{/* Right - Playlist */}
					<div className="w-full lg:w-72 skeu-inset flex flex-col">
						{/* Playlist Header */}
						<div className="p-4 border-b border-gray-400/30">
							<div className="flex items-center gap-2">
								<Music className="w-4 h-4 text-primary" />
								<span className="font-semibold text-foreground">Playlist</span>
								<span className="text-xs text-muted-foreground ml-auto">
									{tracks.length} tracks
								</span>
							</div>
						</div>

						{/* Song List */}
						<div className="flex-1 overflow-y-auto p-2 space-y-1">
							{tracks.map((song, index) => {
								const isActive = currentTrack?.id === song.src;
								return (
									<button
										key={song.src}
										onClick={() => handleSongSelect(song)}
										className={`w-full p-3 flex items-center gap-3 text-left ${
											isActive ? "skeu-list-item-active" : "skeu-list-item"
										}`}
									>
										<div
											className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
												isActive ? "skeu-button-primary" : "skeu-button"
											}`}
										>
											{isActive && isPlaying ? (
												<div className="flex items-end gap-0.5 h-3">
													<div
														className="w-0.5 rounded-full animate-pulse"
														style={{
															height: "50%",
															background: isActive ? "hsl(0 0% 5%)" : "var(--foreground)",
														}}
													/>
													<div
														className="w-0.5 rounded-full animate-pulse"
														style={{
															height: "100%",
															animationDelay: "0.1s",
															background: isActive ? "hsl(0 0% 5%)" : "var(--foreground)",
														}}
													/>
													<div
														className="w-0.5 rounded-full animate-pulse"
														style={{
															height: "60%",
															animationDelay: "0.2s",
															background: isActive ? "hsl(0 0% 5%)" : "var(--foreground)",
														}}
													/>
												</div>
											) : (
												<span
													className={`text-[10px] font-mono ${
														isActive ? "text-background" : "text-muted-foreground"
													}`}
												>
													{(index + 1).toString().padStart(2, "0")}
												</span>
											)}
										</div>

										<div className="flex-1 min-w-0">
											<p
												className={`text-sm font-medium truncate ${
													isActive ? "text-black" : "text-foreground"
												}`}
											>
												{song.title}
											</p>
											<p className="text-xs text-muted-foreground truncate">{song.artist}</p>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				{/* Bottom Controls */}
				<div className="mt-4 skeu-panel p-4">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-center">
						{/* Song Info */}
						<div className="flex-1 min-w-0">
							<div className="skeu-inset p-3 flex items-center gap-3">
								<div
									className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
									style={{
										background: "linear-gradient(145deg, hsl(0 0% 15%), hsl(0 0% 8%))",
										boxShadow:
											"inset 0 1px 0 hsl(0 0% 25% / 0.3), 0 2px 4px hsl(0 0% 0% / 0.5)",
									}}
								>
									<div
										className="w-6 h-6 rounded-full"
										style={{
											background:
												"linear-gradient(135deg, hsl(45 80% 55% / 0.4), hsl(215 60% 55% / 0.4))",
										}}
									/>
								</div>
								<div className="min-w-0">
									<p className="text-sm font-medium text-foreground truncate">
										{currentTrack?.title || "No song selected"}
									</p>
									<p className="text-xs text-muted-foreground truncate">
										{currentTrack?.artist || "Select a song"}
									</p>
								</div>
							</div>
						</div>

						{/* Playback Controls */}
						<div className="flex items-center justify-center gap-3">
							<button
								onClick={prevTrack}
								disabled={!currentTrack}
								className="skeu-button w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
							>
								<SkipBack className="w-4 h-4" />
							</button>
							<button
								onClick={handlePlayPause}
								className={`w-14 h-14 flex items-center justify-center ${
									isPlaying ? "skeu-button-primary" : "skeu-button"
								}`}
							>
								{isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
							</button>
							<button
								onClick={nextTrack}
								disabled={!currentTrack}
								className="skeu-button w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
							>
								<SkipForward className="w-4 h-4" />
							</button>
						</div>

						{/* Progress */}
						<div className="flex flex-1 items-center gap-2 lg:flex-[2]">
							<span className="text-[10px] text-muted-foreground font-mono w-8 text-right">
								{currentTimeLabel}
							</span>
							<div className="flex-1 h-2 skeu-track relative">
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
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								/>
								<div
									className="skeu-knob w-4 h-4 absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
									style={{ left: `${progress}%` }}
								/>
							</div>
							<span className="text-[10px] text-muted-foreground font-mono w-8">
								{totalTimeLabel}
							</span>
						</div>

						{/* Volume */}
						<div className="flex items-center gap-2 lg:w-28">
							<button
								onClick={() => setMuted(!isMuted)}
								className="skeu-button w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
							>
								{isMuted || volume === 0 ? (
									<VolumeX className="w-3.5 h-3.5" />
								) : (
									<Volume2 className="w-3.5 h-3.5" />
								)}
							</button>
							<div className="flex-1 h-1.5 skeu-track relative">
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
										setVolume(Number(e.target.value) / 100);
										if (isMuted) setMuted(false);
									}}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								/>
								<div
									className="skeu-knob w-3 h-3 absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
									style={{ left: `${isMuted ? 0 : volume * 100}%` }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LocalMusicPlayer;
