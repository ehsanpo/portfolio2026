import { useState, type ReactNode } from "react";
import { cn } from "../../lib/utils";

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
		<div className={cn("space-y-8", className)}>
			<div className="on-paper hard flex flex-col items-start justify-between gap-4 bg-cream p-5 text-ink sm:flex-row sm:items-center">
				<div>
					<p className="label-mono">/ Usage instructions</p>
					<p className="mt-1 text-sm leading-relaxed opacity-85">
						Copy the prompt specification below and paste it into your preferred model, customizing
						parameters to fit your project.
					</p>
				</div>
				<button type="button" onClick={handleCopy} className="key shrink-0 bg-ink text-cream">
					{copied ? "Copied to clipboard" : "Copy prompt"}
				</button>
			</div>

			<div className="on-paper hard bg-cream text-ink">
				<div className="flex items-center justify-between gap-3 border-b-[1.5px] border-ink px-3 py-2">
					<div className="flex flex-1 items-center gap-3">
						<span className="size-3 shrink-0 border-[1.5px] border-ink" aria-hidden="true" />
						<span className="stripes h-[13px] flex-1" aria-hidden="true" />
						<span className="font-pixel text-xs leading-none">PROMPT.MD</span>
						<span className="stripes h-[13px] flex-1" aria-hidden="true" />
					</div>
					<button
						type="button"
						onClick={handleCopy}
						className="key bg-mustard px-2.5! py-1! text-[10px]! text-ink"
					>
						{copied ? "Copied" : "Copy"}
					</button>
				</div>

				<div className="prompt-content prose prose-base max-w-none p-6 md:p-8 prose-headings:font-bold prose-headings:tracking-[-0.03em] prose-headings:text-ink prose-p:text-ink/90 prose-li:text-ink/90 prose-strong:text-ink prose-code:text-ink prose-pre:rounded-none prose-pre:border-[1.5px] prose-pre:border-ink prose-pre:bg-paper prose-pre:text-ink">
					{children}
				</div>
			</div>
		</div>
	);
}

