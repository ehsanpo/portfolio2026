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
		<div className="flex items-center justify-center w-full mb-6 px-1">
			<nav
				aria-label="Timeline Pagination"
				className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-card/70 dark:bg-neutral-900/60 border border-white/40 backdrop-blur-md shadow-xs max-w-full"
			>
				{/* Previous Button */}
				<button
					type="button"
					onClick={onPrev}
					disabled={activeYear === startYear}
					aria-label="Previous year"
					className="inline-flex items-center gap-1 px-2.5 sm:px-3 h-9 rounded-xl text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
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
								className="w-6 h-9 flex items-center justify-center text-xs text-muted-foreground/60 font-bold select-none"
							>
								•••
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
							className={`h-9 min-w-9 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
								isSelected
									? "bg-primary text-primary-foreground font-bold shadow-sm shadow-primary/20 scale-102"
									: "text-muted-foreground hover:text-foreground hover:bg-muted/60"
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
					className="inline-flex items-center gap-1 px-2.5 sm:px-3 h-9 rounded-xl text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
				>
					<span className="hidden sm:inline">Next</span>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
			</nav>
		</div>
	);
};

export default RankTimelinePagination;
