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
		<div className="flex flex-col gap-4">
			{/* Category Filter Tabs */}
			<div className="flex items-center gap-2 flex-wrap">
				{categories.map((cat) => (
					<button
						key={cat}
						type="button"
						className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
							activeCategory === cat
								? "bg-primary text-primary-foreground shadow-sm"
								: "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
						onClick={() => onSelectCategory(cat)}
					>
						{cat}
						<span className="ml-1.5 opacity-70 text-xs">
							(
							{cat === "All"
								? timelineData.length
								: timelineData.filter((i) => i.category === cat).length}
							)
						</span>
					</button>
				))}
			</div>

			{/* Timeline Grid Container with Max Height and Sticky Ruler */}
			<div
				ref={gridScrollRef}
				className="ranktimeline-wrap relative overflow-auto rounded-xl border border-white/40 bg-card/30"
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
					<div className="flex h-10 border-b border-white/40 sticky top-0 z-30 select-none bg-card/90 dark:bg-neutral-900/90 backdrop-blur-md">
						{years.map((year, index) => (
							<div
								key={index}
								className="flex-shrink-0 flex items-center text-sm font-mono font-bold text-muted-foreground pl-2"
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
								className="absolute top-0 bottom-0 border-l border-dashed border-white/20"
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
										className={`absolute inset-x-[1px] inset-y-[2px] rounded-md flex items-center px-2.5 text-sm font-medium cursor-pointer transition-opacity duration-150 hover:opacity-90 ${colorClass}`}
										data-id={item.id}
									>
										<span className="sticky left-2 flex items-center gap-2 whitespace-nowrap truncate max-w-full">
											{item.icon && (
												<img
													src={item.icon}
													alt=""
													className="w-4 h-4 flex-shrink-0"
												/>
											)}
											<span className="truncate font-semibold">
												{item.name}
											</span>
											<span className="hidden group-hover:inline opacity-75 font-normal ml-1 flex-shrink-0 text-xs">
												- {fromDate(item)}
												{fromDate(item) + 1 === toDate(item)
													? ""
													: ` - ${toDate(item) - 1}`}
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
