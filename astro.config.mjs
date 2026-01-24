// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://ehsan-pourhadi.com/",
	base: "",
	vite: {
		plugins: [tailwindcss()],
		ssr: {
			noExternal: ["gsap"],
		},
	},

	integrations: [react(), mdx(), sitemap()],
});
