import { useState } from "react";

interface PromptsViewerProps {
	prompts: Array<{
		title: string;
		description: string;
		slug: string;
		category?: string;
		tags?: string[];
		renderedContent: string;
	}>;
}

export function PromptsViewer({ prompts }: PromptsViewerProps) {
	const [activeSlug] = useState(prompts[0]?.slug);

	const activePrompt = prompts.find((p) => p.slug === activeSlug) || prompts[0];

	const handleCopy = async () => {
		try {
			const promptElement = document.querySelector(".prompt-content");
			if (promptElement) {
				await navigator.clipboard.writeText(promptElement.textContent || "");

				alert("Prompt copied to clipboard!");
			}
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<div className="flex min-h-screen">
			<main className="flex-1 p-6 lg:p-10">
				<div className="mx-auto max-w-4xl">
					<div className="mb-8">
						<h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
							{activePrompt.title}
						</h1>
						<p className="text-lg text-gray-600 dark:text-gray-400">{activePrompt.description}</p>

						{activePrompt.tags && activePrompt.tags.length > 0 && (
							<div className="mt-4 flex flex-wrap gap-2">
								{activePrompt.tags.map((tag) => (
									<span
										key={tag}
										className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
									></span>
								))}
							</div>
						)}
					</div>

					<div className="relative">
						<button
							onClick={handleCopy}
							className="bg-primary hover:bg-primary/90 absolute top-4 right-4 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
							title="Copy prompt to clipboard"
						>
							<svg
								className="mr-2 inline-block h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
							Copy
						</button>

						<div className="prose prose-lg dark:prose-invert max-w-none rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
							<div
								className="prompt-content"
								dangerouslySetInnerHTML={{ __html: activePrompt.renderedContent }}
							/>
						</div>
					</div>

					<div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
						<div className="flex items-start">
							<svg
								className="mt-0.5 mr-3 h-5 w-5 text-blue-600 dark:text-blue-400"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="flex-1">
								<h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
									How to use this prompt
								</h3>
								<p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
									Copy the prompt above and paste it into your favorite AI assistant (ChatGPT,
									Claude, etc.). You can customize it based on your specific needs.
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
