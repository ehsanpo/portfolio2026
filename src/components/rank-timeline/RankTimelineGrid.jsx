import React from "react";
import { calculateDurationYears } from "./constants";

const fromDate = (item) => parseInt(item.duration.split("-")[0], 10);
const toDate = (item) => parseInt(item.duration.split("-")[1], 10);

export const RankTimelineGrid = ({
	categories,
	activeCategory,
	onSelectCategory,
	timelineData,
	displayedTimelineItems,
	totalTimelineRows,
	categoryColors,
	defaultColor,
	years,
	gridScrollRef,
}) => {
	return (
		<div className="flex flex-col gap-5">
			{/* Category Filter Tabs */}
			<div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filter timeline by category">
				{categories.map((cat) => {
					const isActive = activeCategory === cat;
					const count =
						cat === "All"
							? timelineData.length
							: timelineData.filter((i) => i.category === cat).length;

					return (
						<button
							key={cat}
							type="button"
							aria-pressed={isActive}
							className={`min-h-[44px] px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard cursor-pointer ${
								isActive
									? "bg-mustard text-ink"
									: "bg-[#17140f] text-white/85 hover:bg-[#252017] hover:text-white dark:bg-[#1d1912] dark:hover:bg-[#2a241b]"
							}`}
							onClick={() => onSelectCategory(cat)}
						>
							{cat}
							<span className="ml-1.5 opacity-80">({count})</span>
						</button>
					);
				})}
			</div>

			{/* Timeline Grid Container with Max Height and Sticky Ruler */}
			<div
				ref={gridScrollRef}
				className="ranktimeline-wrap relative overflow-auto bg-[#17140f] text-white dark:bg-[#14110d]"
				style={{
					maxHeight: "calc(var(--row-height) * 15 + var(--year-height))",
				}}
			>
				<div
					className="relative"
					style={{
						width: "calc(var(--col-width) * 12 * 16)",
						minWidth: "calc(var(--col-width) * 12 * 16)",
					}}
				>
					{/* Top Year Header Ruler - Sticky when scrolling vertically */}
					<div className="flex h-10 sticky top-0 z-30 select-none bg-[#211c15] text-white">
						{years.map((year, index) => (
							<div
								key={year}
								className={`flex-shrink-0 flex items-center font-mono text-xs font-bold tracking-wider text-white/90 pl-2 ${
									index > 0 ? "border-l border-white/10" : ""
								}`}
								style={{ width: "calc(var(--col-width) * 12)" }}
							>
								<span>{year}</span>
							</div>
						))}
					</div>

					{/* Year Vertical Guide Lines */}
					<div className="absolute top-10 bottom-0 left-0 right-0 pointer-events-none z-0">
						{years.map((year, index) => (
							<div
								key={year}
								className="absolute top-0 bottom-0 border-l border-dashed border-white/10"
								style={{ left: `calc(var(--col-width) * ${index * 12})` }}
							/>
						))}
					</div>

					{/* Timeline Items Grid */}
					<div
						className="relative z-10"
						style={{
							height: `calc(var(--row-height) * ${totalTimelineRows})`,
						}}
					>
						{displayedTimelineItems.map((item) => {
							const colorClass =
								categoryColors[item.category] || defaultColor;
							return (
								<div
									key={item.id + item.name}
									className="absolute group"
									style={{
										left: `calc(var(--col-width) * ${item.start * 12})`,
										width: `calc(var(--col-width) * ${(item.end - item.start) * 12})`,
										height: "var(--row-height)",
										top: `calc(var(--row-height) * ${item.adjustedRowIndex})`,
									}}
								>
									<div
										data-tooltip-id="timeline-tooltip"
										data-tooltip-content={`${item.name} • Active: ${item.duration} (${calculateDurationYears(item.duration)}) • ${item.category}`}
										className={`absolute inset-x-[1px] inset-y-[3px] flex items-center px-2.5 font-mono text-xs font-semibold cursor-pointer transition-transform duration-100 hover:-translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${colorClass}`}
										data-id={item.id}
									>
										<span className="sticky left-2 flex items-center gap-2 whitespace-nowrap truncate max-w-full">
											{item.icon && (
												<img
													src={item.icon}
													alt=""
													className="w-4 h-4 flex-shrink-0 object-contain"
												/>
											)}
											<span className="truncate font-semibold">
												{item.name}
											</span>
											<span className="hidden group-hover:inline opacity-80 font-normal ml-1 flex-shrink-0 text-[11px]">
												— {fromDate(item)}
												{fromDate(item) + 1 === toDate(item)
													? ""
													: `–${toDate(item) - 1}`}
											</span>
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RankTimelineGrid;
