import { useEffect, useRef } from "react";
import "@docsearch/css";

interface DocSearchProps {
	appId: string;
	apiKey: string;
	indexName: string;
}

const style = `
	#docsearch-input:focus-visible {
		outline: none !important;
        box-shadow: none !important;
	}
	.DocSearch-Button {
		margin-left: 0 !important;
	}
`;

export default function DocSearch({ appId, apiKey, indexName }: DocSearchProps) {
	const searchButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const htmlElement = document.documentElement;
		const isDark = htmlElement.classList.contains("dark") || prefersDark;

		import("@docsearch/js").then(({ default: docsearch }) => {
			docsearch({
				container: searchButtonRef.current!,
				appId,
				apiKey,
				indexName,
				placeholder: "Search...",
				translations: {
					button: {
						buttonText: "Search",
						buttonAriaLabel: "Search",
					},
				},
			});
		});

		if (isDark) {
			htmlElement.setAttribute("data-theme", "dark");
		}

		const observer = new MutationObserver(() => {
			const isDarkNow = htmlElement.classList.contains("dark");
			htmlElement.setAttribute("data-theme", isDarkNow ? "dark" : "light");
		});

		observer.observe(htmlElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, [appId, apiKey, indexName]);

	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: style }} />
			<div ref={searchButtonRef} />
		</>
	);
}
