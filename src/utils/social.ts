import { getCollection } from "astro:content";
import type { SocialPost } from "@/types/social";
import fallbackGitHubStars from "@/data/github-stars-cache.json";

const DEFAULT_SOCIAL_ORDER = 999;
const DEFAULT_GITHUB_ORDER_BASE = 1300;
const DEFAULT_GITHUB_FROM_DATE = "2026-01-01";
const GITHUB_PER_PAGE = 100;

interface GitHubRepoData {
	full_name?: string;
	html_url?: string;
	description?: string | null;
	stargazers_count?: number;
	forks_count?: number;
	updated_at?: string;
	pushed_at?: string;
	fork?: boolean;
}

interface GitHubStarApiItem extends GitHubRepoData {
	starred_at?: string;
	repo?: GitHubRepoData;
}

let cachedSocialPostsPromise: Promise<SocialPost[]> | null = null;

const slugify = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/['"]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

const toDateScore = (value?: string) => {
	if (!value) return Number.NEGATIVE_INFINITY;
	const score = Date.parse(value);
	return Number.isNaN(score) ? Number.NEGATIVE_INFINITY : score;
};

const withUniqueSlugs = (posts: SocialPost[]) => {
	const used = new Set<string>();

	return posts.map((post, index) => {
		const baseSlug = slugify(post.slug) || `post-${index + 1}`;
		let nextSlug = baseSlug;
		let suffix = 2;

		while (used.has(nextSlug)) {
			nextSlug = `${baseSlug}-${suffix}`;
			suffix += 1;
		}

		used.add(nextSlug);

		return {
			...post,
			id: post.id || nextSlug,
			slug: nextSlug,
			permalink: `/social/${nextSlug}`,
		};
	});
};

const getGitHubStarPosts = async (
	githubConfig:
		| {
				enabled?: boolean;
				username: string;
				fromDate?: string;
				includeForks?: boolean;
		  }
		| undefined
): Promise<SocialPost[]> => {
	if (!githubConfig || githubConfig.enabled === false) return [];

	const fromDateRaw = githubConfig.fromDate ?? DEFAULT_GITHUB_FROM_DATE;
	const fromDateScore = Date.parse(fromDateRaw);
	const cutoffScore = Number.isNaN(fromDateScore)
		? Date.parse(DEFAULT_GITHUB_FROM_DATE)
		: fromDateScore;
	const headers: Record<string, string> = {
		Accept: "application/vnd.github.star+json",
		"User-Agent": "portfolio-social-feed",
	};

	const token = import.meta.env.GITHUB_TOKEN;
	if (typeof token === "string" && token.trim().length > 0) {
		headers.Authorization = `Bearer ${token.trim()}`;
	}

	try {
		const starItems: GitHubStarApiItem[] = [];

		for (let page = 1; ; page += 1) {
			const requestUrl = `https://api.github.com/users/${encodeURIComponent(githubConfig.username)}/starred?per_page=${GITHUB_PER_PAGE}&page=${page}`;
			const response = await fetch(requestUrl, { headers });

			if (!response.ok) {
				console.warn(`[social] GitHub stars fetch failed with status ${response.status}`);
				break;
			}

			const pageItems = (await response.json()) as GitHubStarApiItem[];
			if (!Array.isArray(pageItems) || pageItems.length === 0) {
				break;
			}

			starItems.push(...pageItems);

			if (pageItems.length < GITHUB_PER_PAGE) {
				break;
			}
		}

		if (!starItems.length && Array.isArray(fallbackGitHubStars)) {
			starItems.push(...(fallbackGitHubStars as GitHubStarApiItem[]));
		}

		if (!starItems.length) return [];

		return starItems
			.map((item, index) => {
				const repo = item.repo ?? item;
				if (!repo.full_name || !repo.html_url) return null;
				if (githubConfig.includeForks === false && repo.fork) return null;

				const starDateScore = Date.parse(
					item.starred_at ?? repo.updated_at ?? repo.pushed_at ?? ""
				);
				if (Number.isNaN(starDateScore) || starDateScore < cutoffScore) return null;

				const stars =
					typeof repo.stargazers_count === "number" ? repo.stargazers_count : undefined;
				const forks =
					typeof repo.forks_count === "number" ? repo.forks_count : undefined;
				const [owner, repoName] = (repo.full_name ?? "").split("/");

				const post: SocialPost = {
					id: `github-${repo.full_name.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`,
					slug: `github-star-${repo.full_name.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`,
					permalink: `/social/github-star-${repo.full_name.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`,
					kind: "github",
					title: repo.full_name,
					caption:
						repo.description && repo.description.trim().length > 0
							? repo.description.trim()
							: "Repository from my GitHub stars.",
					date: item.starred_at ?? repo.updated_at ?? repo.pushed_at,
					href: repo.html_url,
					ctaLabel: "View on GitHub",
					order: DEFAULT_GITHUB_ORDER_BASE + index,
					stars,
					forks,
					repoUrl: repo.html_url,
					owner: owner || undefined,
					repoName: repoName || repo.full_name,
				};

				return post;
			})
			.filter((post): post is SocialPost => post !== null);
	} catch (error) {
		console.warn("[social] GitHub stars fetch failed, falling back to cached stars.", error);
		if (Array.isArray(fallbackGitHubStars)) {
			return (fallbackGitHubStars as GitHubStarApiItem[])
				.map((item, index) => {
					const repo = item.repo ?? item;
					if (!repo.full_name || !repo.html_url) return null;
					if (githubConfig.includeForks === false && repo.fork) return null;

					const starDateScore = Date.parse(
						item.starred_at ?? repo.updated_at ?? repo.pushed_at ?? ""
					);
					if (Number.isNaN(starDateScore) || starDateScore < cutoffScore) return null;

					const stars =
						typeof repo.stargazers_count === "number" ? repo.stargazers_count : undefined;
					const forks =
						typeof repo.forks_count === "number" ? repo.forks_count : undefined;
					const [owner, repoName] = (repo.full_name ?? "").split("/");

					const post: SocialPost = {
						id: `github-${repo.full_name.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`,
						slug: `github-star-${repo.full_name.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`,
						permalink: `/social/github-star-${repo.full_name.toLowerCase().replace(/[^a-z0-9_-]/g, "-")}`,
						kind: "github",
						title: repo.full_name,
						caption:
							repo.description && repo.description.trim().length > 0
								? repo.description.trim()
								: "Repository from my GitHub stars.",
						date: item.starred_at ?? repo.updated_at ?? repo.pushed_at,
						href: repo.html_url,
						ctaLabel: "View on GitHub",
						order: DEFAULT_GITHUB_ORDER_BASE + index,
						stars,
						forks,
						repoUrl: repo.html_url,
						owner: owner || undefined,
						repoName: repoName || repo.full_name,
					};

					return post;
				})
				.filter((post): post is SocialPost => post !== null);
		}
		return [];
	}
};

/**
 * Extracts creation date from a 64-bit TikTok Snowflake video ID.
 * The upper 32 bits contain the Unix creation timestamp in seconds.
 */
export const getTikTokDateFromId = (videoId: string): string => {
	try {
		const match = videoId.match(/\d{15,22}/);
		const cleanId = match ? match[0] : videoId;
		const timestampSec = Number(BigInt(cleanId) >> 32n);
		const dateObj = new Date(timestampSec * 1000);
		if (!Number.isNaN(dateObj.getTime()) && dateObj.getFullYear() > 2016) {
			return dateObj.toISOString().split("T")[0];
		}
	} catch {
		// fallback
	}
	return "2026-01-01";
};

export interface TikTokSourceItem {
	id?: string;
	slug?: string;
	title?: string;
	date?: string;
	embedUrl?: string;
	mediaUrl?: string;
	href?: string;
	caption?: string;
	ctaLabel?: string;
	order?: number;
}

/**
 * Generates a complete SocialPost from a TikTok video ID or URL.
 * Automatically generates slug, date, embedUrl, href, mediaUrl, and ctaLabel.
 */
export const createTikTokPostFromId = (
	input: string | TikTokSourceItem,
	defaultUsername = "ehsanpourhadi462",
	index = 0
): SocialPost => {
	const raw: TikTokSourceItem = typeof input === "string" ? { id: input } : input;
	const match = (raw.id || raw.href || raw.embedUrl || raw.slug || "").match(/\d{15,22}/);
	const videoId = match ? match[0] : (raw.id || `video-${index + 1}`);

	const userMatch = (raw.href || "").match(/@([a-zA-Z0-9_.-]+)/);
	const username = userMatch ? userMatch[1] : defaultUsername;

	const derivedDate = raw.date || getTikTokDateFromId(videoId);
	const slug = raw.slug || `tiktok-${videoId}`;
	const embedUrl = raw.embedUrl || `https://www.tiktok.com/player/v1/${videoId}`;
	const href = raw.href || `https://www.tiktok.com/@${username}/video/${videoId}`;
	const mediaUrl = raw.mediaUrl || `/social/tiktok/${videoId}.jpg`;

	return {
		id: `tiktok-${videoId}`,
		slug,
		permalink: `/social/${slug}`,
		kind: "tiktok",
		title: raw.title || "TikTok Video",
		caption: raw.caption || "",
		date: derivedDate,
		embedUrl,
		mediaUrl,
		href,
		ctaLabel: raw.ctaLabel || "Watch on TikTok",
		order: raw.order ?? 500 + index,
	};
};

const loadSocialPosts = async (): Promise<SocialPost[]> => {
	const [socialEntries, socialSourceEntries] = await Promise.all([
		getCollection("social"),
		getCollection("socialSources"),
	]);

	const sourceConfig =
		socialSourceEntries.find((entry) => entry.id === "feed") ?? socialSourceEntries[0];

	const manualPosts: SocialPost[] = socialEntries
		.filter((entry) => entry.data.published === true)
		.map((entry) => ({
			id: entry.slug,
			slug: entry.slug,
			permalink: `/social/${entry.slug}`,
			kind: entry.data.kind,
			title: entry.data.title,
			caption: entry.data.caption,
			date: entry.data.date,
			mediaUrl: entry.data.mediaUrl,
			poster: entry.data.poster,
			embedUrl: entry.data.embedUrl,
			href: entry.data.href,
			ctaLabel: entry.data.ctaLabel,
			order: entry.data.order ?? DEFAULT_SOCIAL_ORDER,
			stars: entry.data.stars,
			forks: entry.data.forks,
			repoUrl: entry.data.repoUrl,
			published: entry.data.published,
		}));

	const tiktokConfig = sourceConfig?.data.tiktok;
	const tiktokUsername = tiktokConfig?.username || "ehsanpourhadi462";
	const rawTikTokItems = [
		...(tiktokConfig?.videoIds ?? []),
		...(sourceConfig?.data.tiktokEmbeds ?? []),
	];

	const tiktokPosts: SocialPost[] = rawTikTokItems.map((item, index) =>
		createTikTokPostFromId(item, tiktokUsername, index)
	);

	const githubPosts = await getGitHubStarPosts(sourceConfig?.data.github);

	return withUniqueSlugs([...manualPosts, ...tiktokPosts, ...githubPosts]).sort((a, b) => {
		const dateDiff = toDateScore(b.date) - toDateScore(a.date);
		if (dateDiff !== 0) return dateDiff;

		if (a.order !== b.order) return a.order - b.order;

		return a.title.localeCompare(b.title);
	});
};

export const getSocialPosts = async (): Promise<SocialPost[]> => {
	if (!cachedSocialPostsPromise) {
		cachedSocialPostsPromise = loadSocialPosts();
	}

	return cachedSocialPostsPromise;
};

