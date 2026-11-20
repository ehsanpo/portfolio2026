import React from "react";
import { calculateDurationYears } from "./constants";

export const RankStoryCard = ({
	card,
	isSelected,
	onSelect,
	categoryBadgeStyles,
	defaultBadgeStyle,
}) => {
	const handleKeyDown = (event) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onSelect();
		}
	};

	return (
		<article
			data-year={card.year}
			tabIndex={0}
			aria-current={isSelected ? "true" : undefined}
			aria-label={`Year ${card.year}, ${card.totalActive} active stack tools`}
			onClick={onSelect}
			onKeyDown={handleKeyDown}
			className={`on-paper w-[84vw] max-w-[440px] sm:w-[400px] md:w-[430px] flex-shrink-0 snap-center flex flex-col justify-between border-[1.5px] border-ink bg-cream text-ink p-5 sm:p-6 cursor-pointer transition-[transform,box-shadow] duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
				isSelected
					? "shadow-[6px_6px_0_var(--ink)] -translate-x-0.5 -translate-y-0.5 motion-reduce:translate-x-0 motion-reduce:translate-y-0"
					: "shadow-[3px_3px_0_var(--ink)] hover:shadow-[5px_5px_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0"
			}`}
		>
			<div>
				{/* Card Header */}
				<div className="flex items-start justify-between gap-3 border-b-[1.5px] border-ink pb-4 mb-5">
					<div>
						<span className="label-mono block text-ink/75">
							{isSelected ? "ACTIVE ERA" : "ARCHIVE ERA"}
						</span>
						<h3 className="mt-1 font-pixel text-4xl sm:text-5xl font-bold tracking-tight text-ink">
							{card.year}
						</h3>
					</div>

					<span
						className={`border-[1.5px] border-ink px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink ${
							isSelected ? "bg-mustard" : "bg-paper"
						}`}
					>
						{card.totalActive} tools
					</span>
				</div>

				{/* Top 5 Focus Technologies */}
				<div className="mb-5">
					<div className="label-mono text-ink/80 mb-3 flex items-center gap-2">
						<span
							className="size-2 shrink-0 border border-ink bg-tomato"
							aria-hidden="true"
						/>
						<span>Top 5 Focus Technologies</span>
					</div>

					<div className="border-[1.5px] border-ink bg-paper divide-y-[1.5px] divide-ink">
						{card.top5.map((tool) => {
							const badgeStyle =
								categoryBadgeStyles[tool.category] || defaultBadgeStyle;
							return (
								<div
									key={tool.name}
									data-tooltip-id="timeline-tooltip"
									data-tooltip-content={`${tool.name} • Active: ${tool.duration} (${calculateDurationYears(tool.duration)}) • ${tool.category}`}
									className="group/item flex items-center justify-between gap-2 px-3 py-2 transition-colors hover:bg-mustard motion-reduce:transition-none"
								>
									<div className="flex items-center gap-3 min-w-0">
										{tool.icon && (
											<img
												src={tool.icon}
												alt=""
												className="w-5 h-5 flex-shrink-0 object-contain"
											/>
										)}
										<span className="font-semibold text-sm text-ink truncate">
											{tool.name}
										</span>
									</div>
									<span
										className={`border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider flex-shrink-0 ${badgeStyle}`}
									>
										{tool.category}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Supporting Active Tools */}
			<div className="border-t-[1.5px] border-ink/25 pt-4 mt-1">
				<div className="mb-2.5 flex items-center justify-between">
					<span className="label-mono text-ink/80">Other Active Tools</span>
					<span className="border border-ink bg-paper px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink">
						{card.supporting.length}
					</span>
				</div>

				<div className="ranktimeline-icons-drawer flex flex-wrap gap-1.5 max-h-[132px] overflow-y-auto p-2.5 border-[1.5px] border-ink bg-paper">
					{card.supporting.map((tool) => (
						<div
							key={tool.name}
							data-tooltip-id="timeline-tooltip"
							data-tooltip-content={`${tool.name} (${tool.duration}) • ${tool.category}`}
							className="size-8 border border-ink/40 bg-cream hover:border-ink hover:bg-mustard flex items-center justify-center transition-colors motion-reduce:transition-none flex-shrink-0"
						>
							{tool.icon ? (
								<img
									src={tool.icon}
									alt={tool.name}
									className="w-5 h-5 object-contain"
								/>
							) : (
								<span className="font-mono text-[10px] font-bold text-ink">
									{tool.name.slice(0, 2).toUpperCase()}
								</span>
							)}
						</div>
					))}
				</div>
			</div>
		</article>
	);
};

export default RankStoryCard;
