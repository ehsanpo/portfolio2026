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
	embedUrl?: string;
	href?: string;
	ctaLabel?: string;
	order: number;
}
