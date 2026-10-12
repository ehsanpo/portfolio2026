export type SocialPostKind = "image" | "video" | "link" | "tiktok" | "github";

export interface SocialPost {
	id: string;
	slug: string;
	permalink: string;
	kind: SocialPostKind;
	title: string;
	caption: string;
	date?: string;
	mediaUrl?: string;
	poster?: string;
	embedUrl?: string;
	href?: string;
	ctaLabel?: string;
	order: number;
	stars?: number;
	forks?: number;
	repoUrl?: string;
	owner?: string;
	repoName?: string;
	published?: boolean;
}
