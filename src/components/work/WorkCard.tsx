import React from "react";

export interface WorkCardImage {
	src: string;
	alt: string;
	width?: number;
	height?: number;
}

export interface WorkCardProps {
	title: string;
	position?: string;
	year?: string;
	description?: string;
	tags?: string[];
	image?: WorkCardImage;
	href: string;
	className?: string;
}

export const WorkCard: React.FC<WorkCardProps> = ({
	title,
	position,
	year,
	description,
	tags = [],
	image,
	href,
	className = "",
}) => {
	const displayTags = tags.slice(0, 4);

	return (
		<article
			className={`group flex h-full flex-col border-0 bg-[#17140f] text-white transition-colors duration-200 hover:bg-[#221d16] dark:bg-[#1e1a13] dark:hover:bg-[#282219] ${className}`}
		>
			<a
				href={href}
				className="focus-visible:outline-mustard flex h-full w-full flex-col no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
			>
				<div className="relative aspect-[16/11] w-full overflow-hidden bg-[#110e0a] p-0 sm:aspect-[4/3]">
					{image ? (
						<img
							src={image.src}
							alt={image.alt || title}
							width={image.width ?? 800}
							height={image.height ?? 600}
							loading="lazy"
							decoding="async"
							className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-[#221d16]">
							<span className="font-pixel text-2xl tracking-wider text-white/35 uppercase">
								{title.slice(0, 3)}
							</span>
						</div>
					)}
				</div>

				<div className="flex flex-1 flex-col justify-between p-6">
					<div>
						<div className="flex flex-wrap items-center justify-between gap-2">
							{position ? (
								<span className="label-mono text-mustard text-[11px]! uppercase">{position}</span>
							) : null}
							{year ? (
								<span className="font-mono text-xs text-white/60 tabular-nums">{year}</span>
							) : null}
						</div>

						<h3 className="group-hover:text-mustard mt-2 text-2xl font-bold tracking-[-0.03em] text-white transition-colors duration-200">
							{title}
						</h3>

						{description ? (
							<p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/75">
								{description}
							</p>
						) : null}
					</div>

					<div className="mt-5 flex flex-col gap-5">
						{displayTags.length > 0 ? (
							<div className="flex flex-wrap gap-1.5">
								{displayTags.map((tag) => (
									<span
										key={tag}
										className="bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/85"
									>
										{tag}
									</span>
								))}
							</div>
						) : null}

						<span className="text-mustard inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase group-hover:underline">
							<span>Inspect</span>
							<span
								aria-hidden="true"
								className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
							>
								-&gt;
							</span>
						</span>
					</div>
				</div>
			</a>
		</article>
	);
};

export default WorkCard;
