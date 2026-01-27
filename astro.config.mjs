// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from 'vite-plugin-compression';

export default defineConfig({
	site: "https://ehsan-pourhadi.com/",
	base: "",
	vite: {
		    plugins: [tailwindcss(), compress({ ext: '.br', algorithm: 'brotliCompress' }), compress({ ext: '.gz', algorithm: 'gzip' })],
		ssr: {
			noExternal: ["gsap"],
		},
	},
	integrations: [react(), mdx(), sitemap()],
});
