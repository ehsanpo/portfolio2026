import { useState, type ReactNode } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import Button from "../ui/Button";

interface PromptDetailProps {
	children: ReactNode;
	className?: string;
}

export function PromptDetail({ children, className }: PromptDetailProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		const contentElement = document.querySelector(".prompt-content");
		if (contentElement) {
			try {
				await navigator.clipboard.writeText(contentElement.textContent || "");
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch (err) {
				console.error("Failed to copy:", err);
			}
		}
	};

	return (
		<div className={cn("", className)}>
			<div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
				<div className="flex items-start gap-2">
					<svg
						className="mr-3 mt-0.5 h-6 w-6 text-blue-600 dark:text-blue-400"
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
						<h3 className="mb-2 text-base font-semibold text-blue-800 dark:text-blue-300">
							How to use this prompt
						</h3>
						<p className="text-sm text-blue-700 dark:text-blue-400">
							Copy the prompt above and paste it into your favorite AI assistant (ChatGPT, Claude,
							Gemini, etc.). You can customize it based on your specific needs.
						</p>
					</div>
					<div className="flex justify-end">
						<Button
							onClick={handleCopy}
							variant="secondary"

						>
							<div className="flex items-center gap-2">
								{copied ? (
									<>
										<Check className="h-4 w-4" />
										Copied!
									</>
								) : (
									<>
										<Copy className="h-4 w-4" />
										Copy Prompt
									</>
								)}


							</div>

						</Button>
					</div>
				</div>
			</div>
			<div className="relative mb-8">
				<div className="prompt-content prose prose-lg max-w-none rounded-xl border border-gray-200 bg-white p-8 dark:prose-invert dark:border-gray-800 dark:bg-gray-900">
					{children}
				</div>
			</div>
		</div>
	);
}
