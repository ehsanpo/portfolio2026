import { useEffect, useMemo, useRef, useState, type TouchEvent, type WheelEvent } from "react";
import {
	ChevronDown,
	ChevronUp,
	ExternalLink,
	Github,
	Grid3X3,
	ImageIcon,
	Link2,
	Music2,
	Play,
	X,
} from "lucide-react";
import type { SocialPost, SocialPostKind } from "@/types/social";

interface SocialGridFeedProps {
	posts: SocialPost[];
	initialPostSlug?: string;
	startInFeed?: boolean;
	initialGridCount?: number;
	gridBatchSize?: number;
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

const getPostIcon = (kind: SocialPostKind) => {
	if (kind === "video") return Play;
	if (kind === "link") return Link2;
	if (kind === "tiktok") return Music2;
	if (kind === "github") return Github;
	return ImageIcon;
};

const fallbackGradient =
	"bg-linear-to-br from-secondary-700 via-accent-700 to-primary-500 dark:from-secondary-900 dark:via-accent-900 dark:to-primary-800";

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

const renderPostMedia = (post: SocialPost, mode: "grid" | "feed") => {
	const Icon = getPostIcon(post.kind);
	const fallback = (
		<div
			className={`flex h-full w-full items-center justify-center ${fallbackGradient} text-white`}
			aria-label={`${post.title} placeholder`}
		>
			<div className="flex flex-col items-center gap-3">
				<Icon className="h-10 w-10 opacity-90" />
				<span className="px-6 text-center text-sm font-semibold">{post.title}</span>
			</div>
		</div>
	);

	if (post.kind === "tiktok") {
		if (mode === "feed" && post.embedUrl) {
			return (
				<iframe
					src={post.embedUrl}
					title={post.title}
					className="h-full w-full border-0 bg-black"
					allowFullScreen
					allow="fullscreen"
					loading="lazy"
				/>
			);
		}

		return fallback;
	}

	if (post.kind === "github") {
		return (
			<div className="h-full w-full bg-neutral-950 p-5 text-white">
				<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wide">
					<Github className="h-3.5 w-3.5" />
					GitHub Star
				</div>
				<h4 className="line-clamp-2 text-lg font-semibold">{post.title}</h4>
				<p className="mt-2 line-clamp-7 text-sm text-white/80">{post.caption}</p>
			</div>
		);
	}

	if (!post.mediaUrl) {
		return fallback;
	}

	if (post.kind === "video") {
		return (
			<video
				src={post.mediaUrl}
				className="h-full w-full object-cover"
				autoPlay
				loop
				muted
				playsInline
				preload={mode === "feed" ? "metadata" : "none"}
			/>
		);
	}

	return <img src={post.mediaUrl} alt={post.title} className="h-full w-full object-cover" />;
};

export default function SocialGridFeed({
	posts,
	initialPostSlug,
	startInFeed = false,
	initialGridCount = 8,
	gridBatchSize = 6,
}: SocialGridFeedProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [visibleCount, setVisibleCount] = useState(() => Math.max(initialGridCount, 1));
	const wheelLockedRef = useRef(false);
	const touchStartYRef = useRef<number | null>(null);
	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	const activePost = activeIndex === null ? null : posts[activeIndex];
	const disableOutboundActions = activePost?.kind === "tiktok" || activePost?.kind === "github";
	const visiblePosts = useMemo(
		() => posts.slice(0, Math.min(visibleCount, posts.length)),
		[posts, visibleCount]
	);

	const closeFeed = (mode: "push" | "replace" = "push") => {
		setActiveIndex(null);
		setPath("/social", mode);
	};

	const openFeedAt = (index: number, mode: "push" | "replace" = "push") => {
		if (index < 0 || index >= posts.length) return;
		setActiveIndex(index);
		setPath(`/social/${posts[index].slug}`, mode);
	};

	const navigate = (direction: 1 | -1) => {
		if (activeIndex === null) return;
		const nextIndex = Math.max(0, Math.min(posts.length - 1, activeIndex + direction));
		if (nextIndex === activeIndex) return;
		openFeedAt(nextIndex, "push");
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

	useEffect(() => {
		if (!posts.length) return;

		const pathSlug = getSlugFromPath();
		const preferredSlug = pathSlug || initialPostSlug || null;

		if (!preferredSlug) {
			setActiveIndex(startInFeed ? 0 : null);
			return;
		}

		const nextIndex = posts.findIndex((post) => post.slug === preferredSlug);
		if (nextIndex !== -1) {
			setActiveIndex(nextIndex);
			return;
		}

		if (startInFeed) {
			setActiveIndex(0);
			setPath(`/social/${posts[0].slug}`, "replace");
		}
	}, [posts, initialPostSlug, startInFeed]);

	useEffect(() => {
		const onPopState = () => {
			const pathSlug = getSlugFromPath();
			if (!pathSlug) {
				setActiveIndex(null);
				return;
			}

			const nextIndex = posts.findIndex((post) => post.slug === pathSlug);
			if (nextIndex !== -1) {
				setActiveIndex(nextIndex);
			}
		};

		window.addEventListener("popstate", onPopState);
		return () => window.removeEventListener("popstate", onPopState);
	}, [posts]);

	useEffect(() => {
		if (activeIndex === null) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeFeed("push");
			if (event.key === "ArrowDown" || event.key.toLowerCase() === "j") navigate(1);
			if (event.key === "ArrowUp" || event.key.toLowerCase() === "k") navigate(-1);
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [activeIndex, posts]);

	useEffect(() => {
		if (activeIndex === null) return;

		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, [activeIndex]);

	useEffect(() => {
		if (activeIndex !== null) return;
		if (visibleCount >= posts.length) return;
		const node = loadMoreRef.current;
		if (!node) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries[0]?.isIntersecting) return;
				setVisibleCount((count) => Math.min(posts.length, count + gridBatchSize));
			},
			{ root: null, rootMargin: "220px" }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [activeIndex, visibleCount, posts.length, gridBatchSize]);

	if (!posts.length) {
		return (
			<div className="rounded-2xl border border-black/10 p-8 text-center dark:border-white/10">
				<p className="text-neutral-600 dark:text-neutral-300">No social posts added yet.</p>
			</div>
		);
	}

	return (
		<>
			<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
				<h2 className="font-basement text-3xl text-neutral-900 dark:text-white">Latest posts</h2>
				<p className="text-sm text-neutral-600 dark:text-neutral-300">
					Open any card and navigate post-by-post with wheel/swipe/arrow keys.
				</p>
			</div>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{visiblePosts.map((post, index) => {
					const Icon = getPostIcon(post.kind);

					return (
						<button
							key={post.id}
							type="button"
							onClick={() => openFeedAt(index, "push")}
							className="group relative overflow-hidden rounded-3xl border border-black/10 bg-black text-left shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl dark:border-white/10"
						>
							<div className="aspect-[9/16] overflow-hidden">
								{renderPostMedia(post, "grid")}
								{post.kind === "link" && (
									<div className="pointer-events-none absolute inset-0 bg-black/25" />
								)}
							</div>

							<div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-black to-transparent p-3 text-white">
								<div className="flex items-center justify-between">
									<span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/30 px-2 py-1 text-[11px] uppercase">
										<Icon className="h-3.5 w-3.5" />
										{postTypeLabel[post.kind]}
									</span>
								</div>
								<p className="line-clamp-2 text-sm leading-snug font-semibold">{post.title}</p>
								{post.date && (
									<p className="text-[11px] text-white/75">{formatPostDate(post.date)}</p>
								)}
							</div>
						</button>
					);
				})}
			</div>

			{visibleCount < posts.length && (
				<div className="mt-8 flex justify-center">
					<div ref={loadMoreRef} className="h-8 w-full" aria-hidden="true" />
					<button
						type="button"
						onClick={() => setVisibleCount((count) => Math.min(posts.length, count + gridBatchSize))}
						className="rounded-full border border-black/15 bg-white/80 px-4 py-2 text-sm font-semibold text-black backdrop-blur dark:border-white/20 dark:bg-black/40 dark:text-white"
					>
						Load more posts
					</button>
				</div>
			)}

			{activePost && (
				<div
					className="fixed inset-0 z-[200] bg-black"
					onWheel={handleWheel}
					onTouchStart={handleTouchStart}
					onTouchEnd={handleTouchEnd}
				>
					<div className="pointer-events-none absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
						<button
							type="button"
							onClick={() => closeFeed("push")}
							className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"
						>
							<Grid3X3 className="h-4 w-4" />
							Back to grid
						</button>
						<button
							type="button"
							onClick={() => closeFeed("push")}
							className="pointer-events-auto rounded-full border border-white/25 bg-black/60 p-2 text-white backdrop-blur-sm"
							aria-label="Close feed"
						>
							<X className="h-5 w-5" />
						</button>
					</div>

					<div className="absolute inset-0 overflow-hidden">
						{activePost.mediaUrl ? (
							<img
								src={activePost.mediaUrl}
								alt=""
								aria-hidden="true"
								className="h-full w-full scale-110 object-cover opacity-30 blur-3xl"
							/>
						) : (
							<div aria-hidden="true" className={`h-full w-full ${fallbackGradient}`} />
						)}
						<div className="absolute inset-0 bg-black/65" />
					</div>

					<div className="relative flex h-full items-center justify-center p-4 sm:p-6">
						<div className="relative w-full max-w-[430px]">
							<div className="relative aspect-[9/16] overflow-hidden rounded-[2.25rem] border border-white/15 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
								{renderPostMedia(activePost, "feed")}
								{activePost.kind === "link" && (
									<div className="pointer-events-none absolute inset-0 bg-black/30" />
								)}

								<div className="absolute inset-x-0 bottom-0 space-y-3 bg-gradient-to-t from-black via-black/70 to-transparent p-5 text-white">
									<div className="flex items-center justify-between">
										<span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-black/40 px-2 py-1 text-[11px] uppercase tracking-wide">
											{(() => {
												const Icon = getPostIcon(activePost.kind);
												return <Icon className="h-3.5 w-3.5" />;
											})()}
											{postTypeLabel[activePost.kind]}
										</span>
										<div className="text-right">
											{activePost.date && (
												<div className="text-xs text-white/70">
													{formatPostDate(activePost.date)}
												</div>
											)}
											<div className="text-xs text-white/70">
												{activeIndex + 1}/{posts.length}
											</div>
										</div>
									</div>

									<h3 className="font-basement text-3xl leading-tight">{activePost.title}</h3>
									<p className="text-sm leading-relaxed text-white/90">{activePost.caption}</p>

									{!disableOutboundActions && (
										<div className="flex flex-wrap gap-2">
											<a
												href={activePost.permalink}
												className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black/60"
											>
												Post link
												<Link2 className="h-4 w-4" />
											</a>

											{activePost.href && (
												<a
													href={activePost.href}
													target="_blank"
													rel="noreferrer"
													className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
												>
													{activePost.ctaLabel ?? "Open link"}
													<ExternalLink className="h-4 w-4" />
												</a>
											)}
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-3 sm:flex">
							<button
								type="button"
								onClick={() => navigate(-1)}
								disabled={activeIndex <= 0}
								className="pointer-events-auto rounded-full border border-white/25 bg-black/50 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
								aria-label="Previous post"
							>
								<ChevronUp className="h-5 w-5" />
							</button>
							<button
								type="button"
								onClick={() => navigate(1)}
								disabled={activeIndex >= posts.length - 1}
								className="pointer-events-auto rounded-full border border-white/25 bg-black/50 p-2 text-white disabled:cursor-not-allowed disabled:opacity-40"
								aria-label="Next post"
							>
								<ChevronDown className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
