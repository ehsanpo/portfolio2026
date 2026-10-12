import React from "react";
import Card3D from "../Card3D";
import { calculateDurationYears } from "./constants";

export const RankStoryCard = ({
	card,
	isSelected,
	onSelect,
	categoryBadgeStyles,
	defaultBadgeStyle,
}) => {
	return (
		<div
			data-year={card.year}
			onClick={onSelect}
			className="w-[88vw] max-w-[480px] sm:w-[440px] md:w-[480px] flex-shrink-0 snap-center transition-all duration-300"
		>
			<Card3D
				intensity={-10}
				glowColor={card.glowColor}
				shine={true}
				className="h-full"
				childClassName={`h-full p-6 sm:p-9 rounded-3xl border transition-all duration-300 ${
					isSelected
						? "border-primary/70 shadow-2xl ring-2 ring-primary/40 bg-card/95 dark:bg-neutral-900/95"
						: "border-white/15 dark:border-neutral-800/80 bg-card/60 dark:bg-neutral-900/60 hover:border-primary/40 hover:shadow-xl"
				} backdrop-blur-2xl`}
			>
				<div className="flex flex-col justify-between h-full p-6 preserve-3d">
					<div className="preserve-3d">
						{/* Year Card Header (Site's Basement font, no "Era" label) */}
						<div
							className="preserve-3d flex flex-col items-center justify-center text-center border-b border-white/10 dark:border-neutral-800/80 pb-5 mb-5"
							style={{ transform: "translateZ(30px)" }}
						>
							<span className="text-4xl sm:text-3xl font-black tracking-tight text-foreground font-['Basement',sans-serif]">
								{card.year}
							</span>
							<span className="text-xs sm:text-sm font-semibold uppercase tracking-wider px-3.5 py-1 rounded clip2 bg-white/10 dark:bg-neutral-800/80 text-muted-foreground border border-white/10 mt-2.5">
								{card.totalActive} active stack tools
							</span>
						</div>

						{/* Top 5 Primary Focus Technologies */}
						<div className="mb-5 preserve-3d">
							<div
								className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2"
								style={{ transform: "translateZ(20px)" }}
							>
								<span className="w-2.5 h-2.5 rounded-full bg-primary inline-block shadow-xs shadow-primary animate-pulse"></span>
								<span>Top 5 Focus Technologies</span>
							</div>

							<div className="flex flex-col gap-2.5 preserve-3d">
								{card.top5.map((tool) => {
									const badgeStyle =
										categoryBadgeStyles[tool.category] ||
										defaultBadgeStyle;
									return (
										<div
											key={tool.name}
											data-tooltip-id="timeline-tooltip"
											data-tooltip-content={`${tool.name} • Active: ${tool.duration} (${calculateDurationYears(tool.duration)}) • ${tool.category}`}
											className="preserve-3d group/item flex items-center justify-between p-2 rounded bg-white/[0.06] hover:bg-white/[0.14] dark:bg-neutral-800/40 dark:hover:bg-neutral-800/90 border border-white/20 hover:border-primary/50 transition-all duration-200 shadow-xs cursor-pointer hover:translate-z-5 hover:scale-105 hover:shadow-md hover:border-2"
											style={{ transform: "translateZ(25px)" }}
										>
											<div className="flex items-center gap-3.5 min-w-0 preserve-3d">
												{tool.icon && (
													<img
														src={tool.icon}
														alt=""
														className="w-6 h-6 flex-shrink-0 object-contain drop-shadow-md group-hover/item:scale-125 group-hover/item:rotate-6 transition-transform duration-200"
													/>
												)}
												<span className="font-semibold text-sm text-foreground truncate group-hover/item:text-primary transition-colors">
													{tool.name}
												</span>
											</div>
											<span
												className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badgeStyle} flex-shrink-0 ml-2 group-hover/item:shadow-xs transition-transform duration-200`}
											>
												{tool.category}
											</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					{/* Supporting Active Tools (Spacious, Zero Scrollbar) */}
					<div
						className="pt-4 border-t border-white/10 dark:border-neutral-800/80 mt-2"
						style={{ transform: "translateZ(15px)" }}
					>
						<div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground/80 mb-2.5 flex items-center justify-between">
							<span>Other Active Tools</span>
							<span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/5 dark:bg-neutral-800/60 text-muted-foreground border border-white/10">
								{card.supporting.length}
							</span>
						</div>

						<div className="ranktimeline-icons-drawer flex flex-wrap gap-2 max-h-[140px] overflow-y-auto scrollbar-none p-2.5 rounded-2xl bg-black/10 dark:bg-neutral-950/30 border border-white/5">
							{card.supporting.map((tool) => (
								<div
									key={tool.name}
									data-tooltip-id="timeline-tooltip"
									data-tooltip-content={`${tool.name} (${tool.duration}) • ${tool.category}`}
									className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-primary/25 dark:bg-neutral-800/50 dark:hover:bg-primary/30 border border-white/10 hover:border-primary/50 flex items-center justify-center transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md shadow-xs cursor-pointer flex-shrink-0"
								>
									{tool.icon ? (
										<img
											src={tool.icon}
											alt={tool.name}
											className="w-5 h-5 object-contain"
										/>
									) : (
										<span className="text-xs font-bold text-muted-foreground">
											{tool.name.slice(0, 2)}
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</Card3D>
		</div>
	);
};

export default RankStoryCard;
