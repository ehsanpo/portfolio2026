import React, { useMemo } from "react";
import { getPaginationItems } from "./constants";

export const RankTimelinePagination = ({
	activeYear,
	years,
	onSelectYear,
	onPrev,
	onNext,
	startYear,
	endYear,
}) => {
	const paginationItems = useMemo(
		() => getPaginationItems(activeYear, years),
		[activeYear, years]
	);

	return (
		<div className="flex items-center justify-center w-full mb-6">
			<nav
				aria-label="Timeline Pagination"
				className="on-paper hard inline-flex flex-wrap items-center justify-center gap-1 border-[1.5px] border-ink bg-cream p-1.5 max-w-full"
			>
				{/* Previous Button */}
				<button
					type="button"
					onClick={onPrev}
					disabled={activeYear === startYear}
					aria-label="Previous year"
					className="inline-flex items-center justify-center gap-1.5 px-3 min-h-[44px] min-w-[44px] font-mono text-xs font-semibold uppercase tracking-wider text-ink border-[1.5px] border-transparent hover:border-ink hover:bg-mustard disabled:opacity-35 disabled:pointer-events-none transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer"
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="square"
						strokeLinejoin="miter"
						aria-hidden="true"
					>
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
					<span className="hidden sm:inline">Prev</span>
				</button>

				{/* Page Number Buttons */}
				{paginationItems.map((item) => {
					if (typeof item === "string" && item.startsWith("ellipsis")) {
						return (
							<span
								key={item}
								aria-hidden="true"
								className="w-7 min-h-[44px] flex items-center justify-center font-mono text-xs font-bold text-ink/60 select-none"
							>
								...
							</span>
						);
					}

					const year = item;
					const isSelected = activeYear === year;
					return (
						<button
							key={year}
							type="button"
							onClick={() => onSelectYear(year)}
							aria-current={isSelected ? "page" : undefined}
							className={`min-h-[44px] min-w-[44px] px-2.5 font-mono text-xs font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer border-[1.5px] ${
								isSelected
									? "bg-ink text-cream border-ink"
									: "text-ink border-transparent hover:border-ink hover:bg-mustard"
							}`}
						>
							{year}
						</button>
					);
				})}

				{/* Next Button */}
				<button
					type="button"
					onClick={onNext}
					disabled={activeYear === endYear}
					aria-label="Next year"
					className="inline-flex items-center justify-center gap-1.5 px-3 min-h-[44px] min-w-[44px] font-mono text-xs font-semibold uppercase tracking-wider text-ink border-[1.5px] border-transparent hover:border-ink hover:bg-mustard disabled:opacity-35 disabled:pointer-events-none transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer"
				>
					<span className="hidden sm:inline">Next</span>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="square"
						strokeLinejoin="miter"
						aria-hidden="true"
					>
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
			</nav>
		</div>
	);
};

export default RankTimelinePagination;
