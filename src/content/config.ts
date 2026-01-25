import { defineCollection, z } from "astro:content";

const portfolio = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			title2: z.string().optional(),
			description: z.string().optional(),
			tagline: z.string(),
			port_date: z.string(),
			permalink: z.string(),
			client: z.string(),
			agency: z.string(),
			category: z.array(z.string()).optional(),
			tag: z.array(z.string()).optional(),
			case_link_url: z.string().optional(),
			background_image: image().optional(),
			cover: image().optional(),
			logo: image().optional(),
			logo2: image().optional(),
			images: z.array(image()).optional(),
			onHome: z.boolean().optional(),
			type: z.literal("portfolio").optional(),
		}),
});

const products = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			title2: z.string().optional(),
			description: z.string().optional(),
			tagline: z.string(),
			date: z.string(),
			permalink: z.string(),
			client: z.string(),
			agency: z.string(),
			category: z.array(z.string()).optional(),
			tag: z.array(z.string()).optional(),
			case_link_url: z.string().optional(),
			background_image: image().optional(),
			cover: image().optional(),
			logo: image().optional(),
			logo2: image().optional(),
			images: z.array(image()).optional(),
			onHome: z.boolean().optional(),
			type: z.literal("product").optional(),
		}),
});

const blog = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.string(),
			author: z.string().optional(),
			category: z.array(z.string()).optional(),
			tag: z.array(z.string()).optional(),
			cover: image().optional(),
			featured: z.boolean().optional(),
			draft: z.boolean().optional(),
		}),
});

const prompt = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			category: z.string().optional(),
			tags: z.array(z.string()).optional(),
			order: z.number().optional(),
			icon: z.string().optional(),
			image: image().optional(),
		}),
});

export const collections = {
	portfolio,
	products,
	blog,
	prompt,
};
