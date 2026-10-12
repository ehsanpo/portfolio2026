import { useEffect, useMemo, useRef, useState, type TouchEvent, type WheelEvent } from "react";
import {
	ArrowUpDown,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Copy,
	ExternalLink,
	GitFork,
	Grid3X3,
	ImageIcon,
	Link2,
	Maximize,
	Minimize,
	Music2,
	Pause,
	Play,
	RotateCcw,
	Star,
	Volume2,
	VolumeX,
	X,
} from "lucide-react";
import Masonry from "react-layout-masonry";
import type { SocialPost, SocialPostKind } from "@/types/social";

interface SocialGridFeedProps {
	posts: SocialPost[];
	initialPostSlug?: string;
	startInFeed?: boolean;
	postsPerPage?: number;
}

const WHEEL_LOCK_MS = 260;
const SWIPE_THRESHOLD = 50;

const postTypeLabel: Record<SocialPostKind, string> = {
	image: "Image",
	video: "Video",
	link: "Link",
	tiktok: "TikTok",
	github: "GitHub",
};

const GitHubIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
	</svg>
);

const TikTokIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
	<svg
		className={className}
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46 6.27 6.27 0 0 0 1.88-4.48V8.33a8.27 8.27 0 0 0 4.89 1.57V6.69z" />
	</svg>
);

const getPostIcon = (kind: SocialPostKind) => {
	if (kind === "video") return Play;
	if (kind === "link") return Link2;
	if (kind === "tiktok") return TikTokIcon;
	if (kind === "github") return GitHubIcon;
	return ImageIcon;
};

const fallbackGradient =
	"bg-linear-to-br from-secondary-700 via-accent-700 to-primary-500 dark:from-secondary-900 dark:via-accent-900 dark:to-primary-800";

const formatTime = (timeInSeconds: number) => {
	if (Number.isNaN(timeInSeconds) || !Number.isFinite(timeInSeconds)) return "0:00";
	const mins = Math.floor(timeInSeconds / 60);
	const secs = Math.floor(timeInSeconds % 60);
	return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const formatNumber = (num?: number) => {
	if (typeof num !== "number") return null;
	if (num >= 1000) {
		return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
	}
	return num.toLocaleString();
};

const getSlugFromPath = () => {
	if (typeof window === "undefined") return null;

	const parts = window.location.pathname.split("/").filter(Boolean);
	if (parts[0] !== "social") return null;
	if (parts.length < 2) return null;

	return decodeURIComponent(parts[1]);
};

const setPath = (pathname: string, mode: "push" | "replace" = "push") => {
	if (typeof window === "undefined") return;
	const target = pathname.startsWith("/") ? pathname : `/${pathname}`;

	if (mode === "replace") {
		window.history.replaceState({}, "", target);
		return;
	}

	window.history.pushState({}, "", target);
};

const formatPostDate = (value?: string) => {
	if (!value) return null;

	const parsed = Date.parse(value);
	if (Number.isNaN(parsed)) return value;

	return new Intl.DateTimeFormat(undefined, {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(parsed));
};

interface FeedVideoPlayerProps {
	src: string;
	title: string;
	poster?: string;
}

function FeedVideoPlayer({ src, title, poster }: FeedVideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isMuted, setIsMuted] = useState(true);
	const [volume, setVolume] = useState(1);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showCenterIcon, setShowCenterIcon] = useState<"play" | "pause" | null>(null);
	const [showControls, setShowControls] = useState(true);
	const hideTimerRef = useRef<number | null>(null);

	const pokeControls = () => {
		setShowControls(true);
		if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
		hideTimerRef.current = window.setTimeout(() => {
			if (videoRef.current && !videoRef.current.paused) {
				setShowControls(false);
			}
		}, 3500);
	};

	const triggerCenterFeedback = (action: "play" | "pause") => {
		setShowCenterIcon(action);
		window.setTimeout(() => setShowCenterIcon(null), 500);
	};

	const togglePlay = () => {
		const video = videoRef.current;
		if (!video) return;

		if (video.paused) {
			video
				.play()
				.then(() => {
					setIsPlaying(true);
					triggerCenterFeedback("play");
				})
				.catch(() => {});
		} else {
			video.pause();
			setIsPlaying(false);
			triggerCenterFeedback("pause");
		}
		pokeControls();
	};

	const toggleMute = () => {
		const video = videoRef.current;
		if (!video) return;

		const nextMuted = !video.muted;
		video.muted = nextMuted;
		setIsMuted(nextMuted);
		if (!nextMuted && video.volume === 0) {
			video.volume = 0.8;
			setVolume(0.8);
		}
		pokeControls();
	};

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const video = videoRef.current;
		if (!video) return;

		const targetTime = Number(e.target.value);
		video.currentTime = targetTime;
		setCurrentTime(targetTime);
		pokeControls();
	};

	const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const video = videoRef.current;
		if (!video) return;

		const val = Number(e.target.value);
		video.volume = val;
		setVolume(val);
		if (val === 0) {
			video.muted = true;
			setIsMuted(true);
		} else if (isMuted) {
			video.muted = false;
			setIsMuted(false);
		}
		pokeControls();
	};

	const toggleFullscreen = () => {
		const container = containerRef.current || videoRef.current;
		if (!container) return;

		if (!document.fullscreenElement) {
			container
				.requestFullscreen?.()
				.then(() => setIsFullscreen(true))
				.catch(() => {});
		} else {
			document
				.exitFullscreen?.()
				.then(() => setIsFullscreen(false))
				.catch(() => {});
		}
		pokeControls();
	};

	const restart = () => {
		const video = videoRef.current;
		if (!video) return;
		video.currentTime = 0;
		video
			.play()
			.then(() => setIsPlaying(true))
			.catch(() => {});
		pokeControls();
	};

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const onTimeUpdate = () => setCurrentTime(video.currentTime);
		const onLoadedMetadata = () => {
			setDuration(video.duration);
			video
				.play()
				.then(() => setIsPlaying(true))
				.catch(() => setIsPlaying(false));
		};
		const onEnded = () => setIsPlaying(false);

		video.addEventListener("timeupdate", onTimeUpdate);
		video.addEventListener("loadedmetadata", onLoadedMetadata);
		video.addEventListener("ended", onEnded);

		pokeControls();

		return () => {
			video.removeEventListener("timeupdate", onTimeUpdate);
			video.removeEventListener("loadedmetadata", onLoadedMetadata);
			video.removeEventListener("ended", onEnded);
			if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
		};
	}, [src]);

	useEffect(() => {
		const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
		document.addEventListener("fullscreenchange", onFullscreenChange);
		return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
	}, []);

	const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

	return (
		<div
			ref={containerRef}
			className="group relative h-full w-full bg-black select-none"
			onMouseMove={pokeControls}
			onTouchStart={pokeControls}
		>
			<video
				ref={videoRef}
				src={src}
				poster={poster}
				className="h-full w-full object-cover cursor-pointer"
				autoPlay
				loop
				muted={isMuted}
				playsInline
				preload="metadata"
				onClick={togglePlay}
				aria-label={title}
			/>

			{/* Center tap pulse feedback */}
			{showCenterIcon && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md">
						{showCenterIcon === "play" ? (
							<Play className="h-8 w-8 translate-x-0.5 fill-white" />
						) : (
							<Pause className="h-8 w-8 fill-white" />
						)}
					</div>
				</div>
			)}

			{/* Dedicated Video Controls Overlay */}
			<div
				className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-8 transition-opacity duration-300 ${
					showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Scrubber timeline */}
				<div className="relative mb-2.5 flex items-center">
					<input
						type="range"
						min={0}
						max={duration || 100}
						step={0.1}
						value={currentTime}
						onChange={handleSeek}
						className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/25 accent-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
						aria-label="Seek video"
					/>
					<div
						className="pointer-events-none absolute left-0 top-0 h-1.5 rounded-full bg-white"
						style={{ width: `${progressPercent}%` }}
					/>
				</div>

				{/* Control buttons row */}
				<div className="flex items-center justify-between text-xs text-white">
					<div className="flex items-center gap-1.5 sm:gap-2">
						<button
							type="button"
							onClick={togglePlay}
							className="rounded-full p-1.5 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white"
							aria-label={isPlaying ? "Pause video" : "Play video"}
						>
							{isPlaying ? (
								<Pause className="h-4 w-4 fill-white" />
							) : (
								<Play className="h-4 w-4 fill-white translate-x-0.5" />
							)}
						</button>

						<button
							type="button"
							onClick={restart}
							className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
							aria-label="Restart video"
							title="Restart"
						>
							<RotateCcw className="h-3.5 w-3.5" />
						</button>

						<div className="flex items-center gap-1">
							<button
								type="button"
								onClick={toggleMute}
								className="rounded-full p-1.5 text-white transition-colors hover:bg-white/20"
								aria-label={isMuted ? "Unmute audio" : "Mute audio"}
							>
								{isMuted || volume === 0 ? (
									<VolumeX className="h-4 w-4" />
								) : (
									<Volume2 className="h-4 w-4" />
								)}
							</button>
							<input
								type="range"
								min={0}
								max={1}
								step={0.05}
								value={isMuted ? 0 : volume}
								onChange={handleVolume}
								className="hidden sm:inline-block h-1 w-14 cursor-pointer appearance-none rounded bg-white/30 accent-white"
								aria-label="Volume slider"
							/>
						</div>

						<span className="font-mono text-[11px] text-white/80 ml-1">
							{formatTime(currentTime)} / {formatTime(duration)}
						</span>
					</div>

					<div className="flex items-center gap-1">
						<button
							type="button"
							onClick={toggleFullscreen}
							className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
							aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
						>
							{isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const renderPostMedia = (post: SocialPost, mode: "grid" | "feed") => {
	const Icon = getPostIcon(post.kind);
	const fallback = (
		<div
			className={`flex h-full w-full items-center justify-center ${fallbackGradient} text-white`}
			aria-label={`${post.title} placeholder`}
		>
			<div className="flex flex-col items-center gap-3 p-4 text-center">
				<Icon className="h-10 w-10 opacity-90" />
				<span className="px-4 text-sm font-semibold">{post.title}</span>
			</div>
		</div>
	);

	if (post.kind === "tiktok") {
		if (mode === "grid") {
			return (
				<div className="relative h-full w-full bg-black">
					{post.mediaUrl ? (
						<img
							src={post.mediaUrl}
							alt=""
							className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
							loading="lazy"
						/>
					) : (
						<div className={`flex h-full w-full items-center justify-center ${fallbackGradient}`}>
							<TikTokIcon className="h-10 w-10 text-white" />
						</div>
					)}

					{/* Paused Video Play Icon Indicator */}
					<div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
						<div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-sm transition-transform group-hover:scale-110 shadow-lg">
							<Play className="h-5 w-5 translate-x-0.5 fill-white" />
						</div>
					</div>

					{/* Top TikTok badge */}
					<div className="pointer-events-none absolute top-3 left-3 z-10">
						<span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-pink-300">
							<TikTokIcon className="h-3 w-3 fill-current" />
							TikTok
						</span>
					</div>
				</div>
			);
		}

		// Feed / Modal mode for TikTok: embedded player v1 with black background
		return (
			<div className="relative h-full w-full bg-black">
				{post.embedUrl ? (
					<iframe
						src={post.embedUrl}
						title={post.title}
						className="h-full w-full border-0 bg-black"
						allowFullScreen
						allow="autoplay; fullscreen"
						loading="lazy"
					/>
				) : post.mediaUrl ? (
					<img src={post.mediaUrl} alt="" className="h-full w-full object-cover" />
				) : (
					<div className="flex h-full w-full items-center justify-center bg-black">
						<TikTokIcon className="h-12 w-12 text-white" />
					</div>
				)}
			</div>
		);
	}

	if (post.kind === "github") {
		if (mode === "grid") {
			return (
				<div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 p-3.5 sm:p-4 text-white">
					{/* Background watermark */}
					<div className="pointer-events-none absolute -right-6 -bottom-6 opacity-[0.06] text-white">
						<GitHubIcon className="h-32 w-32" />
					</div>

					<div className="relative z-10 space-y-1.5">
						<div className="flex items-center justify-between">
							<span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-white">
								<GitHubIcon className="h-3 w-3" />
								GitHub Star
							</span>
							{post.href && (
								<a
									href={post.href}
									target="_blank"
									rel="noreferrer"
									onClick={(e) => e.stopPropagation()}
									className="rounded-full border border-white/15 bg-white/5 p-1 text-neutral-300 transition-colors hover:border-white/40 hover:bg-white/15 hover:text-white"
									aria-label={`Open ${post.title} on GitHub`}
									title="Open repository"
								>
									<ExternalLink className="h-3 w-3" />
								</a>
							)}
						</div>

						<div>
							<h4 className="line-clamp-1 sm:line-clamp-2 text-xs sm:text-sm font-bold text-white transition-colors group-hover:text-primary-300">
								{post.title}
							</h4>
							<p className="mt-1 line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-neutral-300">
								{post.caption}
							</p>
						</div>
					</div>

					{/* Stars & Forks Stats Bar */}
					<div className="relative z-10 mt-2 flex items-center justify-between gap-1.5 border-t border-white/10 pt-2">
						<div className="flex items-center gap-1.5">
							{typeof post.stars === "number" && (
								<span
									className="inline-flex items-center gap-1 rounded-md border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[11px] font-semibold text-amber-300"
									title={`${post.stars.toLocaleString()} stars`}
								>
									<Star className="h-3 w-3 fill-amber-400 text-amber-400" />
									{formatNumber(post.stars)}
								</span>
							)}
							{typeof post.forks === "number" && (
								<span
									className="inline-flex items-center gap-1 rounded-md border border-sky-400/30 bg-sky-400/10 px-1.5 py-0.5 text-[11px] font-semibold text-sky-300"
									title={`${post.forks.toLocaleString()} forks`}
								>
									<GitFork className="h-3 w-3 text-sky-400" />
									{formatNumber(post.forks)}
								</span>
							)}
						</div>
						{post.href && (
							<span className="flex items-center gap-0.5 text-[10px] font-medium text-neutral-400 transition-colors group-hover:text-white">
								Repo
								<ChevronRight className="h-3 w-3" />
							</span>
						)}
					</div>
				</div>
			);
		}

		// Feed mode for GitHub: rich showcase layout
		return (
			<div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-5 sm:p-6 text-white">
				{/* Background ambient watermark */}
				<div className="pointer-events-none absolute -right-10 -top-10 opacity-[0.05] text-white">
					<GitHubIcon className="h-56 w-56" />
				</div>

				<div className="relative z-10 space-y-3.5">
					<div className="flex items-center justify-between">
						<span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
							<GitHubIcon className="h-3.5 w-3.5" />
							Starred Repository
						</span>
						{post.date && (
							<span className="text-xs text-neutral-400">{formatPostDate(post.date)}</span>
						)}
					</div>

					<div className="space-y-1.5">
						<h3 className="font-basement text-xl sm:text-2xl leading-snug text-white">
							{post.title}
						</h3>
						<p className="line-clamp-3 text-xs sm:text-sm leading-relaxed text-neutral-300">
							{post.caption}
						</p>
					</div>

					{/* Prominent Star & Fork Badges */}
					<div className="grid grid-cols-2 gap-2.5 pt-1">
						<div className="flex items-center gap-2.5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3 backdrop-blur-sm">
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
								<Star className="h-4 w-4 fill-amber-400 text-amber-400" />
							</div>
							<div>
								<div className="text-base font-bold text-white">
									{typeof post.stars === "number" ? post.stars.toLocaleString() : "—"}
								</div>
								<div className="text-[11px] font-medium text-amber-300/90">Stars</div>
							</div>
						</div>

						<div className="flex items-center gap-2.5 rounded-2xl border border-sky-400/25 bg-sky-400/10 p-3 backdrop-blur-sm">
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-400/20 text-sky-300">
								<GitFork className="h-4 w-4 text-sky-400" />
							</div>
							<div>
								<div className="text-base font-bold text-white">
									{typeof post.forks === "number" ? post.forks.toLocaleString() : "—"}
								</div>
								<div className="text-[11px] font-medium text-sky-300/90">Forks</div>
							</div>
						</div>
					</div>
				</div>

				{/* Primary direct link to repo */}
				{post.href && (
					<div className="relative z-10 mt-3 border-t border-white/10 pt-3">
						<a
							href={post.href}
							target="_blank"
							rel="noreferrer"
							className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 shadow-lg transition-transform hover:scale-[1.02] hover:bg-neutral-100"
						>
							<GitHubIcon className="h-4 w-4" />
							{post.ctaLabel || "View Repository on GitHub"}
							<ExternalLink className="h-3.5 w-3.5 opacity-75" />
						</a>
					</div>
				)}
			</div>
		);
	}

	if (post.kind === "link" && !post.mediaUrl) {
		const domain = post.href
			? (() => {
					try {
						return new URL(post.href).hostname.replace(/^www\./, "");
					} catch {
						return null;
					}
				})()
			: null;

		if (mode === "grid") {
			return (
				<div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 p-3.5 sm:p-4 text-white">
					<div className="relative z-10 space-y-1.5">
						<div className="flex items-center justify-between">
							<span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase text-white">
								<Link2 className="h-3 w-3" />
								Link
							</span>
							{post.href && (
								<a
									href={post.href}
									target="_blank"
									rel="noreferrer"
									onClick={(e) => e.stopPropagation()}
									className="rounded-full border border-white/15 bg-white/5 p-1 text-neutral-300 transition-colors hover:border-white/40 hover:bg-white/15 hover:text-white"
									aria-label={`Open ${post.title}`}
									title={post.ctaLabel || "Open link"}
								>
									<ExternalLink className="h-3 w-3" />
								</a>
							)}
						</div>

						<div>
							<h4 className="line-clamp-1 sm:line-clamp-2 text-xs sm:text-sm font-bold text-white transition-colors group-hover:text-primary-300">
								{post.title}
							</h4>
							<p className="mt-1 line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-neutral-300">
								{post.caption}
							</p>
						</div>
					</div>

					<div className="relative z-10 mt-2 flex items-center justify-between gap-1.5 border-t border-white/10 pt-2">
						{domain && (
							<span className="truncate max-w-[150px] font-mono text-[11px] text-neutral-400">
								{domain}
							</span>
						)}
						{post.href && (
							<span className="ml-auto flex items-center gap-0.5 text-[10px] font-medium text-neutral-400 transition-colors group-hover:text-white">
								{post.ctaLabel || "Visit"}
								<ChevronRight className="h-3 w-3" />
							</span>
						)}
					</div>
				</div>
			);
		}

		return (
			<div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-5 sm:p-6 text-white">
				<div className="relative z-10 space-y-3.5">
					<div className="flex items-center justify-between">
						<span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
							<Link2 className="h-3.5 w-3.5" />
							Link Resource
						</span>
						{post.date && (
							<span className="text-xs text-neutral-400">{formatPostDate(post.date)}</span>
						)}
					</div>

					<div className="space-y-1.5">
						<h3 className="font-basement text-xl sm:text-2xl leading-snug text-white">
							{post.title}
						</h3>
						<p className="line-clamp-3 text-xs sm:text-sm leading-relaxed text-neutral-300">
							{post.caption}
						</p>
						{domain && (
							<p className="font-mono text-xs text-primary-400 pt-1">
								{domain}
							</p>
						)}
					</div>
				</div>

				{post.href && (
					<div className="relative z-10 mt-3 border-t border-white/10 pt-3">
						<a
							href={post.href}
							target="_blank"
							rel="noreferrer"
							className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 shadow-lg transition-transform hover:scale-[1.02] hover:bg-neutral-100"
						>
							<ExternalLink className="h-4 w-4" />
							{post.ctaLabel || "Open Link"}
						</a>
					</div>
				)}
			</div>
		);
	}

	if (!post.mediaUrl) {
		return fallback;
	}

	if (post.kind === "video") {
		if (mode === "feed") {
			return <FeedVideoPlayer src={post.mediaUrl} title={post.title} poster={post.poster} />;
		}

		return (
			<div className="relative h-full w-full bg-black">
				{post.poster ? (
					<img
						src={post.poster}
						alt={post.title}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						loading="lazy"
						onError={(e) => {
							(e.target as HTMLElement).style.display = "none";
						}}
					/>
				) : (
					<video
						src={`${post.mediaUrl}#t=0.001`}
						className="h-full w-full object-cover"
						muted
						playsInline
						preload="metadata"
					/>
				)}
				<div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
					<div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-sm transition-transform group-hover:scale-110 shadow-lg">
						<Play className="h-5 w-5 translate-x-0.5 fill-white" />
					</div>
				</div>
			</div>
		);
	}

	return <img src={post.mediaUrl} alt={post.title} className="h-full w-full object-cover" />;
};

type FilterKind = "all" | SocialPostKind;

export default function SocialGridFeed({
	posts,
	initialPostSlug,
	startInFeed = false,
	postsPerPage = 16,
}: SocialGridFeedProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedFilter, setSelectedFilter] = useState<FilterKind>("all");
	const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
	const [copied, setCopied] = useState(false);

	const gridTopRef = useRef<HTMLDivElement | null>(null);
	const wheelLockedRef = useRef(false);
	const touchStartYRef = useRef<number | null>(null);

	// Calculate counts for filters
	const filterCounts = useMemo(() => {
		const res: Record<FilterKind, number> = {
			all: posts.length,
			github: 0,
			video: 0,
			image: 0,
			link: 0,
			tiktok: 0,
		};
		posts.forEach((p) => {
			if (res[p.kind] !== undefined) res[p.kind]++;
		});
		return res;
	}, [posts]);

	// Filtered & sorted posts
	const filteredPosts = useMemo(() => {
		let list = selectedFilter === "all" ? posts : posts.filter((p) => p.kind === selectedFilter);
		if (sortOrder === "asc") {
			return [...list].reverse();
		}
		return list;
	}, [posts, selectedFilter, sortOrder]);

	const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
	const safeCurrentPage = Math.min(currentPage, totalPages);

	const paginatedPosts = useMemo(() => {
		const start = (safeCurrentPage - 1) * postsPerPage;
		return filteredPosts.slice(start, start + postsPerPage);
	}, [filteredPosts, safeCurrentPage, postsPerPage]);

	const handlePageChange = (p: number) => {
		if (p < 1 || p > totalPages || p === safeCurrentPage) return;
		setCurrentPage(p);
		gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const getPageNumbers = () => {
		const pages: (number | "ellipsis")[] = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible + 2) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
			return pages;
		}

		pages.push(1);
		const left = Math.max(2, safeCurrentPage - 1);
		const right = Math.min(totalPages - 1, safeCurrentPage + 1);

		if (left > 2) pages.push("ellipsis");
		for (let i = left; i <= right; i++) pages.push(i);
		if (right < totalPages - 1) pages.push("ellipsis");
		pages.push(totalPages);
		return pages;
	};

	const activePost = activeIndex === null ? null : filteredPosts[activeIndex] ?? null;

	const closeFeed = (mode: "push" | "replace" = "push") => {
		setActiveIndex(null);
		setPath("/social", mode);
	};

	const openFeedAt = (indexOnPage: number, mode: "push" | "replace" = "push") => {
		const globalIndex = (safeCurrentPage - 1) * postsPerPage + indexOnPage;
		if (globalIndex < 0 || globalIndex >= filteredPosts.length) return;
		setActiveIndex(globalIndex);
		setPath(`/social/${filteredPosts[globalIndex].slug}`, mode);
	};

	const navigate = (direction: 1 | -1) => {
		if (activeIndex === null) return;
		const nextIndex = Math.max(0, Math.min(filteredPosts.length - 1, activeIndex + direction));
		if (nextIndex === activeIndex) return;
		setActiveIndex(nextIndex);
		setPath(`/social/${filteredPosts[nextIndex].slug}`, "push");
	};

	const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (wheelLockedRef.current) return;
		if (Math.abs(event.deltaY) < 20) return;

		navigate(event.deltaY > 0 ? 1 : -1);

		wheelLockedRef.current = true;
		window.setTimeout(() => {
			wheelLockedRef.current = false;
		}, WHEEL_LOCK_MS);
	};

	const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
		touchStartYRef.current = event.changedTouches[0]?.clientY ?? null;
	};

	const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
		if (touchStartYRef.current === null) return;
		const touchEndY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
		const delta = touchStartYRef.current - touchEndY;
		touchStartYRef.current = null;
		if (Math.abs(delta) < SWIPE_THRESHOLD) return;
		navigate(delta > 0 ? 1 : -1);
	};

	const copyCurrentUrl = () => {
		if (!activePost) return;
		const url = window.location.href;
		navigator.clipboard.writeText(url).then(() => {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2000);
		});
	};

	useEffect(() => {
		if (!filteredPosts.length) return;

		const pathSlug = getSlugFromPath();
		const preferredSlug = pathSlug || initialPostSlug || null;

		if (!preferredSlug) {
			setActiveIndex(startInFeed ? 0 : null);
			return;
		}

		const nextIndex = filteredPosts.findIndex((post) => post.slug === preferredSlug);
		if (nextIndex !== -1) {
			setActiveIndex(nextIndex);
			return;
		}

		if (startInFeed) {
			setActiveIndex(0);
			setPath(`/social/${filteredPosts[0].slug}`, "replace");
		}
	}, [filteredPosts, initialPostSlug, startInFeed]);

	useEffect(() => {
		const onPopState = () => {
			const pathSlug = getSlugFromPath();
			if (!pathSlug) {
				setActiveIndex(null);
				return;
			}

			const nextIndex = filteredPosts.findIndex((post) => post.slug === pathSlug);
			if (nextIndex !== -1) {
				setActiveIndex(nextIndex);
			}
		};

		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, [filteredPosts]);

	useEffect(() => {
		if (activeIndex === null) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeFeed("push");
			if (event.key === "ArrowDown" || event.key.toLowerCase() === "j") navigate(1);
			if (event.key === "ArrowUp" || event.key.toLowerCase() === "k") navigate(-1);
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [activeIndex, filteredPosts]);

	useEffect(() => {
		if (activeIndex === null) return;

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, [activeIndex]);

	if (!posts.length) {
		return (
			<div className="rounded-2xl border border-black/10 p-8 text-center dark:border-white/10">
				<p className="text-neutral-600 dark:text-neutral-300">No social posts added yet.</p>
			</div>
		);
	}

	const filterKeys: FilterKind[] = ["all", "github", "video", "image", "link", "tiktok"];

	return (
		<>
			<div ref={gridTopRef} className="scroll-mt-8" />

			{/* Controls Bar: Category Filters & Date Sort Toggle */}
			<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				{/* Category Pills */}
				<div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter posts by type">
					{filterKeys
						.filter((key) => key === "all" || filterCounts[key] > 0)
						.map((key) => {
							const isSelected = selectedFilter === key;
							const label = key === "all" ? "All" : postTypeLabel[key];
							const count = filterCounts[key];

							return (
								<button
									key={key}
									type="button"
									role="tab"
									aria-selected={isSelected}
									onClick={() => {
										setSelectedFilter(key);
										setCurrentPage(1);
									}}
									className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
										isSelected
											? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
											: "border border-neutral-300/80 bg-white/70 text-neutral-700 hover:border-neutral-400 hover:bg-white dark:border-white/15 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-white/30 dark:hover:bg-neutral-800"
									}`}
								>
									{label}
									<span
										className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
											isSelected
												? "bg-white/20 text-white dark:bg-black/15 dark:text-neutral-900"
												: "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
										}`}
									>
										{count}
									</span>
								</button>
							);
						})}
				</div>

				{/* Sort Order Toggle */}
				<div className="flex items-center gap-2 self-start sm:self-auto">
					<button
						type="button"
						onClick={() => {
							setSortOrder((curr) => (curr === "desc" ? "asc" : "desc"));
							setCurrentPage(1);
						}}
						className="inline-flex items-center gap-2 rounded-full border border-neutral-300/80 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur transition-all hover:bg-neutral-100 dark:border-white/15 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:bg-neutral-800"
						aria-label={`Sort by date: currently ${sortOrder === "desc" ? "newest first" : "oldest first"}`}
						title="Toggle date sort direction"
					>
						<ArrowUpDown className="h-3.5 w-3.5 text-neutral-500 dark:text-neutral-400" />
						<span>Date: {sortOrder === "desc" ? "Newest First" : "Oldest First"}</span>
					</button>
				</div>
			</div>

			{/* Empty Filter State */}
			{filteredPosts.length === 0 ? (
				<div className="rounded-2xl border border-neutral-200 p-12 text-center dark:border-white/10">
					<p className="text-neutral-600 dark:text-neutral-300">No posts found for this filter.</p>
					<button
						type="button"
						onClick={() => {
							setSelectedFilter("all");
							setCurrentPage(1);
						}}
						className="mt-4 rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-neutral-950"
					>
						Show all posts
					</button>
				</div>
			) : (
				/* Responsive Masonry Layout */
				<Masonry
					columns={{ 0: 2, 640: 2, 768: 3, 1024: 4 }}
					gap={16}
					columnProps={{ className: "min-w-0" }}
				>
					{paginatedPosts.map((post, index) => {
						const Icon = getPostIcon(post.kind);
						const isCompact = post.kind === "github" || post.kind === "link";

						return (
							<button
								key={post.id}
								type="button"
								onClick={() => openFeedAt(index, "push")}
								className="group relative w-full overflow-hidden rounded-3xl border border-black/10 bg-black text-left shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
								aria-label={`Open ${post.title}`}
							>
								<div
									className={`overflow-hidden ${
										isCompact ? "aspect-[9/8]" : "aspect-[9/16]"
									}`}
								>
									{renderPostMedia(post, "grid")}
									{post.kind === "link" && post.mediaUrl && (
										<div className="pointer-events-none absolute inset-0 bg-black/25" />
									)}
								</div>

								{/* Bottom overlay for TikTok: ONLY the Watch on TikTok Link button */}
								{post.kind === "tiktok" ? (
									<div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent p-3.5 text-white">
										{post.href && (
											<a
												href={post.href}
												target="_blank"
												rel="noreferrer"
												onClick={(e) => e.stopPropagation()}
												className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-neutral-950 shadow-md transition-all hover:bg-neutral-100 hover:scale-[1.02]"
											>
												<TikTokIcon className="h-3.5 w-3.5 fill-current" />
												{post.ctaLabel || "Watch on TikTok"}
												<ExternalLink className="h-3 w-3 opacity-70" />
											</a>
										)}
									</div>
								) : (
									/* Bottom overlay for non-github, non-tiktok, and non-no-media-link posts */
									post.kind !== "github" && !(post.kind === "link" && !post.mediaUrl) && (
										<div className="absolute inset-x-0 bottom-0 space-y-1.5 bg-gradient-to-t from-black via-black/80 to-transparent p-3.5 text-white">
											<div className="flex items-center justify-between">
												<span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
													<Icon className="h-3 w-3" />
													{postTypeLabel[post.kind]}
												</span>
											</div>
											<p className="line-clamp-2 text-xs sm:text-sm font-semibold leading-snug text-white">
												{post.title}
											</p>
											{post.date && (
												<p className="text-[11px] text-white/70">{formatPostDate(post.date)}</p>
											)}
										</div>
									)
								)}
							</button>
						);
					})}
				</Masonry>
			)}

			{/* Pagination Controls */}
			{totalPages > 1 && (
				<nav
					aria-label="Social posts pagination"
					className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row dark:border-white/10"
				>
					<p className="text-xs text-neutral-500 dark:text-neutral-400">
						Page <span className="font-semibold text-neutral-900 dark:text-white">{safeCurrentPage}</span> of{" "}
						<span className="font-semibold text-neutral-900 dark:text-white">{totalPages}</span> ({filteredPosts.length} posts)
					</p>

					<div className="flex items-center gap-1.5">
						<button
							type="button"
							onClick={() => handlePageChange(safeCurrentPage - 1)}
							disabled={safeCurrentPage <= 1}
							aria-label="Previous page"
							className="inline-flex h-9 items-center gap-1 rounded-full border border-neutral-300/80 bg-white/80 px-3 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur transition-all hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:bg-neutral-800"
						>
							<ChevronLeft className="h-4 w-4" />
							<span className="hidden sm:inline">Previous</span>
						</button>

						<div className="flex items-center gap-1">
							{getPageNumbers().map((item, idx) =>
								item === "ellipsis" ? (
									<span
										key={`ellipsis-${idx}`}
										className="flex h-9 w-7 items-center justify-center text-xs font-bold text-neutral-400 dark:text-neutral-500"
									>
										…
									</span>
								) : (
									<button
										key={item}
										type="button"
										onClick={() => handlePageChange(item)}
										aria-current={item === safeCurrentPage ? "page" : undefined}
										className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition-all ${
											item === safeCurrentPage
												? "bg-neutral-900 text-white shadow-sm dark:bg-white dark:text-neutral-950 font-bold"
												: "border border-neutral-300/80 bg-white/70 text-neutral-700 hover:border-neutral-400 hover:bg-white dark:border-white/15 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:border-white/30 dark:hover:bg-neutral-800"
										}`}
									>
										{item}
									</button>
								)
							)}
						</div>

						<button
							type="button"
							onClick={() => handlePageChange(safeCurrentPage + 1)}
							disabled={safeCurrentPage >= totalPages}
							aria-label="Next page"
							className="inline-flex h-9 items-center gap-1 rounded-full border border-neutral-300/80 bg-white/80 px-3 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur transition-all hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:bg-neutral-900/80 dark:text-neutral-300 dark:hover:bg-neutral-800"
						>
							<span className="hidden sm:inline">Next</span>
							<ChevronRight className="h-4 w-4" />
						</button>
					</div>
				</nav>
			)}

			{/* Immersive Modal View */}
			{activePost && activeIndex !== null && (
				<div
					className="fixed inset-0 z-[200] bg-black"
					onWheel={handleWheel}
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
				>
					{/* Modal Header Bar */}
					<div className="pointer-events-none absolute top-4 left-4 right-4 z-30 flex items-center justify-between">
						<button
							type="button"
							onClick={() => closeFeed("push")}
							className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/90 focus-visible:ring-2 focus-visible:ring-white"
						>
							<Grid3X3 className="h-4 w-4" />
							Back to grid
						</button>

						<div className="pointer-events-auto flex items-center gap-2">
							<button
								type="button"
								onClick={copyCurrentUrl}
								className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/70 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition-colors hover:bg-black/90 focus-visible:ring-2 focus-visible:ring-white"
								aria-label="Copy share link"
								title="Copy share link"
							>
								{copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
								<span>{copied ? "Copied!" : "Share"}</span>
							</button>

							<button
								type="button"
								onClick={() => closeFeed("push")}
								className="rounded-full border border-white/25 bg-black/70 p-2 text-white backdrop-blur-md transition-colors hover:bg-black/90 focus-visible:ring-2 focus-visible:ring-white"
								aria-label="Close feed"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
					</div>

					{/* Blurred Ambient Background */}
					<div className="absolute inset-0 overflow-hidden">
						{activePost.poster || (activePost.kind === "image" && activePost.mediaUrl) ? (
							<img
								src={activePost.poster || activePost.mediaUrl}
								alt=""
								aria-hidden="true"
								className="h-full w-full scale-110 object-cover opacity-25 blur-3xl"
							/>
						) : (
							<div aria-hidden="true" className={`h-full w-full ${fallbackGradient} opacity-20 blur-3xl`} />
						)}
						<div className="absolute inset-0 bg-black/75" />
					</div>

					{/* Centered Phone / Reel Card Container */}
					<div className="relative flex h-full items-center justify-center p-4 sm:p-6">
						<div
							className={`relative w-full ${
								activePost.kind === "github" || activePost.kind === "link"
									? "max-w-[480px]"
									: "max-w-[440px]"
							}`}
						>
							<div
								className={`relative overflow-hidden rounded-[2.25rem] border border-white/20 bg-neutral-950 shadow-[0_30px_90px_rgba(0,0,0,0.85)] ${
									activePost.kind === "github" || activePost.kind === "link"
										? "aspect-[9/8] sm:aspect-[9/8]"
										: "aspect-[9/16]"
								}`}
							>
								{renderPostMedia(activePost, "feed")}

								{/* For TikTok: show ONLY the Watch on TikTok Link button (NO title, NO caption) */}
								{activePost.kind === "tiktok" && (
									<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 space-y-2 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-5 text-white">
										<div className="pointer-events-auto flex items-center justify-between">
											<span className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-pink-300">
												<TikTokIcon className="h-3.5 w-3.5 fill-current" />
												TikTok
											</span>
											{activePost.date && (
												<div className="text-xs text-white/80">
													{formatPostDate(activePost.date)}
												</div>
											)}
										</div>

										{activePost.href && (
											<div className="pointer-events-auto pt-1">
												<a
													href={activePost.href}
													target="_blank"
													rel="noreferrer"
													className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-black shadow-lg transition-transform hover:scale-[1.02] hover:bg-neutral-200"
												>
													<TikTokIcon className="h-4 w-4 fill-current" />
													{activePost.ctaLabel || "Watch on TikTok"}
													<ExternalLink className="h-3.5 w-3.5" />
												</a>
											</div>
										)}
									</div>
								)}

								{/* For Non-GitHub, non-TikTok, and non-no-media-link posts: show the bottom text & action bar */}
								{activePost.kind !== "github" &&
									activePost.kind !== "tiktok" &&
									!(activePost.kind === "link" && !activePost.mediaUrl) && (
										<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 space-y-2 bg-gradient-to-t from-black via-black/80 to-transparent p-4 sm:p-5 text-white">
										<div className="pointer-events-auto flex items-center justify-between">
											<span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider">
												{(() => {
													const Icon = getPostIcon(activePost.kind);
													return <Icon className="h-3.5 w-3.5" />;
												})()}
												{postTypeLabel[activePost.kind]}
											</span>
											<div className="text-right">
												{activePost.date && (
													<div className="text-xs text-white/80">
														{formatPostDate(activePost.date)}
													</div>
												)}
												<div className="text-[11px] text-white/60">
													{activeIndex + 1} / {filteredPosts.length}
												</div>
											</div>
										</div>

										<h3 className="font-basement text-2xl leading-tight text-white">
											{activePost.title}
										</h3>
										<p className="line-clamp-3 text-sm leading-relaxed text-white/90">
											{activePost.caption}
										</p>

										{/* Outbound Action Buttons */}
										<div className="pointer-events-auto flex flex-wrap gap-2 pt-1">
											{activePost.permalink && (
												<a
													href={activePost.permalink}
													className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-black/75"
												>
													Post Link
													<Link2 className="h-3.5 w-3.5" />
												</a>
											)}

											{activePost.href && (
												<a
													href={activePost.href}
													target="_blank"
													rel="noreferrer"
													className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-neutral-200"
												>
													{activePost.ctaLabel ?? "Open Link"}
													<ExternalLink className="h-3.5 w-3.5" />
												</a>
											)}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Desktop Arrow Navigation */}
						<div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-3 sm:flex">
							<button
								type="button"
								onClick={() => navigate(-1)}
								disabled={activeIndex <= 0}
								className="pointer-events-auto rounded-full border border-white/25 bg-black/60 p-3 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-white"
								aria-label="Previous post"
								title="Previous (or press ↑)"
							>
								<ChevronUp className="h-6 w-6" />
							</button>
							<button
								type="button"
								onClick={() => navigate(1)}
								disabled={activeIndex >= filteredPosts.length - 1}
								className="pointer-events-auto rounded-full border border-white/25 bg-black/60 p-3 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-white"
								aria-label="Next post"
								title="Next (or press ↓)"
							>
								<ChevronDown className="h-6 w-6" />
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
