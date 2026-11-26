import React from "react";
import { calculateDurationYears } from "./constants";

const DARK_BADGE_STYLES = {
	Frontend: "bg-mint/20 text-mint",
	Backend: "bg-mustard/20 text-mustard",
	Database: "bg-cream/15 text-cream",
	DevOps: "bg-cobalt/20 text-cobalt",
	Apps: "bg-tomato/20 text-tomato",
	Design: "bg-blush/20 text-blush",
};

const DEFAULT_DARK_BADGE = "bg-white/15 text-white/90";

export const RankStoryCard = ({ card, isSelected, onSelect }) => {
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
			className={`relative w-[84vw] max-w-[440px] sm:w-[400px] md:w-[430px] flex-shrink-0 snap-center flex flex-col justify-between text-white p-5 sm:p-6 cursor-pointer transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard ${
				isSelected
					? "bg-[#241f17] dark:bg-[#282219]"
					: "bg-[#17140f] hover:bg-[#211c15] dark:bg-[#1d1912] dark:hover:bg-[#252017]"
			}`}
		>
			{isSelected && (
				<span
					className="absolute inset-x-0 top-0 h-1 bg-mustard"
					aria-hidden="true"
				/>
			)}

			<div>
				{/* Card Header */}
				<div className="flex items-start justify-between gap-3 pb-4 mb-5">
					<div>
						<span
							className={`label-mono block ${
								isSelected ? "text-mustard" : "text-white/70"
							}`}
						>
							{isSelected ? "ACTIVE ERA" : "ARCHIVE ERA"}
						</span>
						<h3 className="mt-1 font-pixel text-4xl sm:text-5xl font-bold tracking-tight text-white">
							{card.year}
						</h3>
					</div>

					<span
						className={`px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider ${
							isSelected
								? "bg-mustard text-ink"
								: "bg-white/10 text-white/90"
						}`}
					>
						{card.totalActive} tools
					</span>
				</div>

				{/* Top 5 Focus Technologies */}
				<div className="mb-5">
					<div className="label-mono text-white/75 mb-3 flex items-center gap-2">
						<span
							className="size-2 shrink-0 bg-tomato"
							aria-hidden="true"
						/>
						<span>Top 5 Focus Technologies</span>
					</div>

					<div className="bg-white/[0.04] divide-y divide-white/10">
						{card.top5.map((tool) => {
							const badgeStyle =
								DARK_BADGE_STYLES[tool.category] || DEFAULT_DARK_BADGE;
							return (
								<div
									key={tool.name}
									data-tooltip-id="timeline-tooltip"
									data-tooltip-content={`${tool.name} • Active: ${tool.duration} (${calculateDurationYears(tool.duration)}) • ${tool.category}`}
									className="group/item flex items-center justify-between gap-2 px-3 py-2.5 transition-colors hover:bg-white/[0.08] motion-reduce:transition-none"
								>
									<div className="flex items-center gap-3 min-w-0">
										{tool.icon && (
											<img
												src={tool.icon}
												alt=""
												className="w-5 h-5 flex-shrink-0 object-contain"
											/>
										)}
										<span className="font-semibold text-sm text-white truncate">
											{tool.name}
										</span>
									</div>
									<span
										className={`px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider flex-shrink-0 ${badgeStyle}`}
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
			<div className="pt-4 mt-1">
				<div className="mb-2.5 flex items-center justify-between">
					<span className="label-mono text-white/75">Other Active Tools</span>
					<span className="bg-white/10 px-2 py-0.5 font-mono text-[11px] font-bold text-white">
						{card.supporting.length}
					</span>
				</div>

				<div className="ranktimeline-icons-drawer flex flex-wrap gap-1.5 max-h-[132px] overflow-y-auto p-2.5 bg-white/[0.04]">
					{card.supporting.map((tool) => (
						<div
							key={tool.name}
							data-tooltip-id="timeline-tooltip"
							data-tooltip-content={`${tool.name} (${tool.duration}) • ${tool.category}`}
							className="size-8 bg-white/[0.07] hover:bg-mustard/25 flex items-center justify-center transition-colors motion-reduce:transition-none flex-shrink-0"
						>
							{tool.icon ? (
								<img
									src={tool.icon}
									alt={tool.name}
									className="w-5 h-5 object-contain"
								/>
							) : (
								<span className="font-mono text-[10px] font-bold text-white/90">
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
