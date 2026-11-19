import { useMemo, useState } from "react";
import { ArrowUpRight, GitFork, Layers, Search, Star, X } from "lucide-react";
import type { SocialPost, SocialPostKind } from "@/types/social";

interface SocialBookmarksFeedProps {
	posts: SocialPost[];
}

type SortOption = "newest" | "oldest" | "stars" | "alpha";

const PAGE_SIZE = 24;

const KIND_LABELS: Record<SocialPostKind, string> = {
	github: "GitHub",
	tiktok: "TikTok",
	link: "Links",
	video: "Video",
	image: "Images",
};

const KIND_ORDER: SocialPostKind[] = ["github", "tiktok", "link", "video", "image"];

function formatNumber(num: number): string {
	if (num >= 1000) {
		return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
	}
	return num.toLocaleString();
}

function formatDate(value?: string): string | null {
	if (!value) return null;
	const parsed = Date.parse(value);
	if (Number.isNaN(parsed)) return value;
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(new Date(parsed));
}

function getDisplayHost(post: SocialPost): string {
	const rawUrl = post.href || post.repoUrl || post.embedUrl;
	if (!rawUrl) return KIND_LABELS[post.kind];
	try {
		const url = new URL(rawUrl);
		return url.hostname.replace(/^www\./, "");
	} catch {
		return KIND_LABELS[post.kind];
	}
}

function getTargetUrl(post: SocialPost): { href: string; external: boolean } {
	const externalUrl = post.href || post.repoUrl;
	if (externalUrl) {
		return { href: externalUrl, external: true };
	}
	return { href: post.permalink, external: false };
}

function BookmarkCard({ post }: { post: SocialPost }) {
	const { href, external } = getTargetUrl(post);
	const host = getDisplayHost(post);
	const formattedDate = formatDate(post.date);

	return (
		<a
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			className="group flex h-full flex-col gap-3 border-[1.5px] border-foreground bg-card p-4 transition-colors hover:bg-mustard hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
		>
			<span className="flex items-center justify-between gap-3">
				<span className="label-mono truncate opacity-70">{host}</span>
				<span className="flex shrink-0 items-center gap-2">
					{typeof post.stars === "number" && (
						<span className="inline-flex items-center gap-1 font-mono text-[11px] font-medium opacity-80">
							<Star className="size-3.5" aria-hidden="true" />
							{formatNumber(post.stars)}
						</span>
					)}
					<ArrowUpRight
						className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
						aria-hidden="true"
					/>
				</span>
			</span>

			<span className="line-clamp-2 text-lg leading-snug font-bold tracking-tight">
				{post.title}
			</span>

			{post.caption && (
				<span className="line-clamp-3 text-sm leading-relaxed opacity-75">
					{post.caption}
				</span>
			)}

			<span className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 pt-2">
				<span className="flex items-center gap-3 font-mono text-[11px] opacity-70">
					{formattedDate && <span>{formattedDate}</span>}
					{typeof post.forks === "number" && post.forks > 0 && (
						<span className="inline-flex items-center gap-1">
							<GitFork className="size-3" aria-hidden="true" />
							{formatNumber(post.forks)}
						</span>
					)}
				</span>

				<span className="border border-current/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider opacity-80">
					{KIND_LABELS[post.kind]}
				</span>
			</span>
		</a>
	);
}

export default function SocialBookmarksFeed({ posts }: SocialBookmarksFeedProps) {
	const [query, setQuery] = useState("");
	const [selectedKind, setSelectedKind] = useState<"all" | SocialPostKind>("all");
	const [sortBy, setSortBy] = useState<SortOption>("newest");
	const [groupByKind, setGroupByKind] = useState(false);
	const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);

	const kindCounts = useMemo(() => {
		const counts = new Map<SocialPostKind, number>();
		for (const post of posts) {
			counts.set(post.kind, (counts.get(post.kind) ?? 0) + 1);
		}
		return counts;
	}, [posts]);

	const availableKinds = useMemo(
		() => KIND_ORDER.filter((kind) => (kindCounts.get(kind) ?? 0) > 0),
		[kindCounts]
	);

	const filteredPosts = useMemo(() => {
		const trimmed = query.trim().toLowerCase();

		const matching = posts.filter((post) => {
			if (selectedKind !== "all" && post.kind !== selectedKind) {
				return false;
			}
			if (!trimmed) return true;

			const haystack = [
				post.title,
				post.caption,
				post.href ?? "",
				post.repoUrl ?? "",
				post.owner ?? "",
				post.repoName ?? "",
				KIND_LABELS[post.kind],
			]
				.join(" ")
				.toLowerCase();

			return haystack.includes(trimmed);
		});

		const sorted = [...matching];
		sorted.sort((a, b) => {
			if (sortBy === "alpha") {
				return a.title.localeCompare(b.title);
			}
			if (sortBy === "stars") {
				const starDiff = (b.stars ?? -1) - (a.stars ?? -1);
				if (starDiff !== 0) return starDiff;
			}
			const dateA = a.date ? Date.parse(a.date) : 0;
			const dateB = b.date ? Date.parse(b.date) : 0;
			const safeA = Number.isNaN(dateA) ? 0 : dateA;
			const safeB = Number.isNaN(dateB) ? 0 : dateB;
			if (sortBy === "oldest") {
				return safeA - safeB;
			}
			return safeB - safeA;
		});

		return sorted;
	}, [posts, query, selectedKind, sortBy]);

	const visiblePosts = useMemo(() => {
		if (groupByKind) return filteredPosts;
		return filteredPosts.slice(0, visibleLimit);
	}, [filteredPosts, groupByKind, visibleLimit]);

	const groupedSections = useMemo(() => {
		if (!groupByKind) return [];
		return availableKinds
			.map((kind) => ({
				kind,
				label: KIND_LABELS[kind],
				items: filteredPosts.filter((p) => p.kind === kind),
			}))
			.filter((group) => group.items.length > 0);
	}, [availableKinds, filteredPosts, groupByKind]);

	const resetFilters = () => {
		setQuery("");
		setSelectedKind("all");
		setSortBy("newest");
		setVisibleLimit(PAGE_SIZE);
	};

	const remainingCount = Math.max(0, filteredPosts.length - visiblePosts.length);

	return (
		<div className="space-y-6">
			<div className="sticky top-[56px] z-10 space-y-4 border-b border-border bg-background/95 pt-2 pb-4 backdrop-blur-sm supports-backdrop-filter:bg-background/80">
				<div className="relative">
					<Search
						className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
						aria-hidden="true"
					/>
					<input
						type="search"
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setVisibleLimit(PAGE_SIZE);
						}}
						aria-label="Search bookmarks and social items"
						placeholder="Search by title, caption, repo, or URL..."
						className="flex h-11 w-full border-[1.5px] border-foreground bg-card pr-10 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
					/>
					{query.length > 0 && (
						<button
							type="button"
							onClick={() => setQuery("")}
							aria-label="Clear search"
							className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
						>
							<X className="size-4" aria-hidden="true" />
						</button>
					)}
				</div>

				<div className="flex flex-wrap items-center gap-3">
					<label htmlFor="social-sort" className="sr-only">
						Sort items
					</label>
					<select
						id="social-sort"
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value as SortOption)}
						className="h-11 border-[1.5px] border-foreground bg-card px-3 font-mono text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
					>
						<option value="newest">Newest first</option>
						<option value="oldest">Oldest first</option>
						<option value="stars">Most starred</option>
						<option value="alpha">Title (A–Z)</option>
					</select>

					<button
						type="button"
						aria-pressed={groupByKind}
						onClick={() => setGroupByKind((prev) => !prev)}
						className={`inline-flex min-h-[44px] items-center gap-2 border-[1.5px] border-foreground px-3 font-mono text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
							groupByKind
								? "bg-mustard text-ink"
								: "bg-card text-foreground hover:bg-mustard hover:text-ink"
						}`}
					>
						<Layers className="size-3.5" aria-hidden="true" />
						Group by type
					</button>

					<p className="ml-auto font-mono text-xs text-muted-foreground">
						{filteredPosts.length} {filteredPosts.length === 1 ? "item" : "items"} found
					</p>
				</div>

				{availableKinds.length > 1 && (
					<div className="space-y-2">
						<p className="label-mono text-muted-foreground">Filter by type</p>
						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								aria-pressed={selectedKind === "all"}
								onClick={() => {
									setSelectedKind("all");
									setVisibleLimit(PAGE_SIZE);
								}}
								className={`min-h-[36px] cursor-pointer border-[1.5px] border-foreground px-2.5 py-1 font-mono text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
									selectedKind === "all"
										? "bg-mustard text-ink"
										: "bg-card text-foreground hover:bg-mustard hover:text-ink"
								}`}
							>
								All ({posts.length})
							</button>

							{availableKinds.map((kind) => {
								const count = kindCounts.get(kind) ?? 0;
								const isActive = selectedKind === kind;
								return (
									<button
										key={kind}
										type="button"
										aria-pressed={isActive}
										onClick={() => {
											setSelectedKind(kind);
											setVisibleLimit(PAGE_SIZE);
										}}
										className={`min-h-[36px] cursor-pointer border-[1.5px] border-foreground px-2.5 py-1 font-mono text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
											isActive
												? "bg-mustard text-ink"
												: "bg-card text-foreground hover:bg-mustard hover:text-ink"
										}`}
									>
										{KIND_LABELS[kind]} ({count})
									</button>
								);
							})}
						</div>
					</div>
				)}
			</div>

			{filteredPosts.length === 0 ? (
				<div className="border-[1.5px] border-foreground bg-card p-8 text-center">
					<p className="font-mono text-sm font-semibold">No matching items found.</p>
					<p className="mt-1 text-sm text-muted-foreground">
						Try clearing your search query or switching the type filter.
					</p>
					<button
						type="button"
						onClick={resetFilters}
						className="key mt-5 bg-ink text-cream"
					>
						Reset filters
					</button>
				</div>
			) : groupByKind ? (
				<div className="space-y-12">
					{groupedSections.map((group) => (
						<section key={group.kind} aria-label={group.label} className="space-y-4">
							<div className="flex items-center justify-between border-t-[1.5px] border-foreground pt-3">
								<h2 className="label-mono text-foreground">/ {group.label}</h2>
								<span className="font-mono text-xs text-muted-foreground">
									{group.items.length}
								</span>
							</div>
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
								{group.items.map((post) => (
									<BookmarkCard key={post.id} post={post} />
								))}
							</div>
						</section>
					))}
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
						{visiblePosts.map((post) => (
							<BookmarkCard key={post.id} post={post} />
						))}
					</div>

					{remainingCount > 0 && (
						<div className="flex justify-center pt-4">
							<button
								type="button"
								onClick={() => setVisibleLimit((prev) => prev + PAGE_SIZE)}
								className="key bg-card text-foreground"
							>
								Load more ({remainingCount} remaining)
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
