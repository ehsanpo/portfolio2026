import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import type { BlogPost } from "./client-data";


export type { BlogPost };
export {
	getPortfolioData,
	calculateYearsOfExperience,
	findTimelineMatch,
	getRoles,
} from "./client-data";

export const getPortfolioItems = async () => {
	const portfolioEntries = await getCollection("portfolio");

	return portfolioEntries.map((entry: CollectionEntry<"portfolio">) => ({
		...entry.data,
		slug: entry.slug,
		background_image: entry.data.background_image,
		logo: entry.data.logo,
		bilder: entry.data.images,
		content: entry,
	}));
};

export const getProductItems = async () => {
	const productEntries = await getCollection("products");

	return productEntries.map((entry: CollectionEntry<"products">) => ({
		...entry.data,
		slug: entry.slug,
		background_image: entry.data.background_image,
		logo: entry.data.logo,
		bilder: entry.data.images,
		content: entry,
	}));
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
	const blogEntries = await getCollection("blog", ({ data }) => {
		return data.draft !== true;
	});

	return blogEntries
		.map(
			(entry: CollectionEntry<"blog">): BlogPost => ({
				title: entry.data.title,
				description: entry.data.description,
				date: entry.data.date,
				author: entry.data.author,
				category: entry.data.category,
				tag: entry.data.tag,
				cover: entry.data.cover,
				featured: entry.data.featured,
				slug: entry.slug,
				content: entry,
			})
		)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPrompts = async () => {
	const promptEntries = await getCollection("prompt");

	return promptEntries
		.map((entry: CollectionEntry<"prompt">) => ({
			title: entry.data.title,
			description: entry.data.description,
			category: entry.data.category,
			tags: entry.data.tags,
			order: entry.data.order,
			icon: entry.data.icon,
			image: entry.data.image?.src,
			slug: entry.slug,
			content: entry,
		}))
		.sort((a, b) => (a.order || 999) - (b.order || 999));
};
