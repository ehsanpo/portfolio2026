import React from "react";

interface PromptHeaderProps {
	prompt: {
		title: string;
		description: string;
		category?: string;
		tags?: string[];
		icon?: string;
		image?: string;
	};
}

const PromptHeader: React.FC<PromptHeaderProps> = ({ prompt }) => {
	const { title, description, category, tags, image } = prompt;

	return (
		<header className="block-mint border-b-[1.5px] border-ink pt-28 pb-12 md:pt-32 md:pb-16">
			<div className="container mx-auto px-4">
				<div className="mb-6">
					<a href="/prompts" className="key bg-cream text-ink">
						Back to prompts
					</a>
				</div>

				<div className="flex items-center justify-between border-t-[1.5px] border-ink pt-3">
					<p className="label-mono">/ Prompt specification</p>
					<div className="flex items-center gap-3">
						{category && <p className="label-mono hidden opacity-75 sm:block">{category}</p>}
						<span className="size-2 bg-ink" aria-hidden="true" />
					</div>
				</div>

				<div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
					<div className="lg:col-span-7">
						<h1 className="text-4xl font-bold tracking-[-0.04em] text-ink md:text-6xl">
							{title}.
						</h1>
						<p className="mt-4 max-w-2xl text-lg leading-snug text-ink/90">{description}</p>

						{(category || (tags && tags.length > 0)) && (
							<div className="mt-6 flex flex-wrap items-center gap-2">
								{category && (
									<span className="label-mono border-[1.5px] border-ink bg-mustard px-2.5 py-1 text-ink">
										{category}
									</span>
								)}
								{tags?.map((tag, index) => (
									<span
										key={index}
										className="on-paper border-[1.5px] border-ink bg-cream px-2.5 py-1 font-mono text-xs font-semibold text-ink"
									>
										#{tag}
									</span>
								))}
							</div>
						)}
					</div>

					<div className="lg:col-span-5">
						<div className="on-paper hard bg-cream p-3 text-ink">
							<div className="mb-3 flex items-center gap-3 border-b-[1.5px] border-ink pb-2">
								<span className="size-3 shrink-0 border-[1.5px] border-ink" aria-hidden="true" />
								<span className="stripes h-[13px] flex-1" aria-hidden="true" />
								<span className="font-pixel text-xs leading-none">PREVIEW</span>
								<span className="stripes h-[13px] flex-1" aria-hidden="true" />
							</div>
							{image ? (
								<img
									src={image}
									alt={title}
									className="aspect-[16/10] w-full border-[1.5px] border-ink object-cover"
								/>
							) : (
								<div className="flex aspect-[16/10] w-full items-center justify-center border-[1.5px] border-ink bg-paper">
									<span className="font-pixel text-2xl text-ink">PROMPT SPEC</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default PromptHeader;

