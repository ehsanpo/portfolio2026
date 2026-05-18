import { getCollection } from "astro:content";
import type { SocialPost } from "@/types/social";

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

				const stats = [
					typeof repo.stargazers_count === "number"
						? `${repo.stargazers_count.toLocaleString()} stars`
						: null,
					typeof repo.forks_count === "number"
						? `${repo.forks_count.toLocaleString()} forks`
						: null,
				].filter(Boolean);

				return {
					id: `github-${repo.full_name.toLowerCase()}`,
					slug: `github-star-${repo.full_name}`,
					permalink: "",
					kind: "github" as const,
					title: repo.full_name,
					caption:
						(repo.description && repo.description.trim().length > 0
							? repo.description.trim()
							: "Repository from my GitHub stars.") +
						(stats.length ? ` (${stats.join(" - ")})` : ""),
					date: item.starred_at ?? repo.updated_at ?? repo.pushed_at,
					order: DEFAULT_GITHUB_ORDER_BASE + index,
				};
			})
			.filter((post): post is SocialPost => Boolean(post));
	} catch (error) {
		console.warn("[social] GitHub stars fetch failed.", error);
		return [];
	}
};

const loadSocialPosts = async (): Promise<SocialPost[]> => {
	const [socialEntries, socialSourceEntries] = await Promise.all([
		getCollection("social"),
		getCollection("socialSources"),
	]);

	const sourceConfig =
		socialSourceEntries.find((entry) => entry.id === "feed") ?? socialSourceEntries[0];

	const manualPosts: SocialPost[] = socialEntries.map((entry) => ({
		id: entry.slug,
		slug: entry.slug,
		permalink: `/social/${entry.slug}`,
		kind: entry.data.kind,
		title: entry.data.title,
		caption: entry.data.caption,
		date: entry.data.date,
		mediaUrl: entry.data.mediaUrl,
		embedUrl: entry.data.embedUrl,
		href: entry.data.href,
		ctaLabel: entry.data.ctaLabel,
		order: entry.data.order ?? DEFAULT_SOCIAL_ORDER,
	}));

	const tiktokPosts: SocialPost[] = (sourceConfig?.data.tiktokEmbeds ?? []).map(
		(item, index) => ({
			id: `tiktok-${item.slug ?? index + 1}`,
			slug: item.slug ?? `tiktok-${item.title}-${item.date}`,
			permalink: "",
			kind: "tiktok",
			title: item.title,
			caption: item.caption ?? "TikTok embed post.",
			date: item.date,
			embedUrl: item.embedUrl,
			href: item.href,
			ctaLabel: item.ctaLabel ?? "Watch on TikTok",
			order: item.order ?? 500 + index,
		})
	);

	const githubPosts = await getGitHubStarPosts(sourceConfig?.data.github);

	return withUniqueSlugs([...manualPosts, ...tiktokPosts, ...githubPosts]).sort((a, b) => {
		if (a.order !== b.order) return a.order - b.order;

		const dateDiff = toDateScore(b.date) - toDateScore(a.date);
		if (dateDiff !== 0) return dateDiff;

		return a.title.localeCompare(b.title);
	});
};

export const getSocialPosts = async (): Promise<SocialPost[]> => {
	if (!cachedSocialPostsPromise) {
		cachedSocialPostsPromise = loadSocialPosts();
	}

	return cachedSocialPostsPromise;
};

