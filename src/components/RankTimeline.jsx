import React, { useState, useRef, useMemo, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import "./RankTimeline.css";
import { getPortfolioData } from "../utils/client-data.ts";
import {
	START_YEAR,
	END_YEAR,
	YEARS,
	categoryBadgeStyles,
	categoryColors,
	defaultBadgeStyle,
	defaultColor,
	getEraGlowColor,
	calculateRowPositions,
} from "./rank-timeline/constants";
import { RankTimelinePagination } from "./rank-timeline/RankTimelinePagination";
import { RankStoryCard } from "./rank-timeline/RankStoryCard";
import { RankTimelineGrid } from "./rank-timeline/RankTimelineGrid";

const RankTimeline = () => {
	const portfolioData = getPortfolioData();
	const timelineData = portfolioData.timeline;
	const highlightsMap = portfolioData.timelineHighlights || {};

	const [viewMode, setViewMode] = useState("cards"); // 'cards' | 'timeline'
	const [activeYear, setActiveYear] = useState(2026);
	const [activeCategory, setActiveCategory] = useState("All");
	const scrollContainerRef = useRef(null);
	const gridScrollRef = useRef(null);

	// Precompute year data with Top 5 tools
	const yearCards = useMemo(() => {
		return YEARS.map((year) => {
			const activeTools = timelineData.filter((item) => {
				const [s, e] = item.duration.split("-").map(Number);
				return year >= s && year <= e;
			});

			const topNames = highlightsMap[String(year)] || [];
			const top5Tools = topNames
				.map((name) => timelineData.find((t) => t.name === name))
				.filter(Boolean);

			// Supporting tools are active tools not in top 5
			const supportingTools = activeTools.filter(
				(item) => !topNames.includes(item.name)
			);

			return {
				year,
				top5: top5Tools,
				supporting: supportingTools,
				totalActive: activeTools.length,
				glowColor: getEraGlowColor(year),
			};
		});
	}, [timelineData, highlightsMap]);

	// Extract unique categories dynamically from the JSON file for Timeline Grid
	const categories = useMemo(() => {
		const cats = Array.from(
			new Set(timelineData.map((item) => item.category).filter(Boolean))
		);
		return ["All", ...cats];
	}, [timelineData]);

	// Filter items by category for classic Timeline Grid view
	const displayedTimelineItems = useMemo(() => {
		if (activeCategory === "All") {
			const distinctCats = Array.from(
				new Set(timelineData.map((item) => item.category).filter(Boolean))
			);
			let globalRowOffset = 0;
			const result = [];

			distinctCats.forEach((cat) => {
				const catItems = timelineData.filter((i) => i.category === cat);
				const positioned = calculateRowPositions(catItems);
				const catMaxRow =
					positioned.length === 0
						? 0
						: Math.max(...positioned.map((i) => i.adjustedRowIndex)) + 1;

				positioned.forEach((item) => {
					result.push({
						...item,
						adjustedRowIndex: item.adjustedRowIndex + globalRowOffset,
					});
				});

				globalRowOffset += catMaxRow;
			});

			return result;
		}

		const filtered = timelineData.filter(
			(item) => item.category === activeCategory
		);
		return calculateRowPositions(filtered);
	}, [activeCategory, timelineData]);

	const totalTimelineRows = useMemo(() => {
		if (displayedTimelineItems.length === 0) return 0;
		return (
			Math.max(...displayedTimelineItems.map((item) => item.adjustedRowIndex)) + 1
		);
	}, [displayedTimelineItems]);

	// Start from the end (2026) so the user immediately sees the latest year first
	useEffect(() => {
		const timer = setTimeout(() => {
			if (viewMode === "cards" && scrollContainerRef.current) {
				scrollContainerRef.current.scrollTo({
					left: scrollContainerRef.current.scrollWidth,
					behavior: "instant",
				});
			} else if (viewMode === "timeline" && gridScrollRef.current) {
				gridScrollRef.current.scrollTo({
					left: gridScrollRef.current.scrollWidth,
					behavior: "instant",
				});
			}
		}, 80);
		return () => clearTimeout(timer);
	}, [viewMode]);

	const scrollToYear = (year) => {
		setActiveYear(year);
		if (!scrollContainerRef.current) return;
		const targetCard = scrollContainerRef.current.querySelector(
			`[data-year="${year}"]`
		);
		if (targetCard) {
			const prefersReduced =
				typeof window !== "undefined" &&
				window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			targetCard.scrollIntoView({
				behavior: prefersReduced ? "auto" : "smooth",
				inline: "center",
				block: "nearest",
			});
		}
	};

	const scrollStep = (direction) => {
		const currentIndex = YEARS.indexOf(activeYear);
		const nextIndex = Math.min(
			Math.max(currentIndex + direction, 0),
			YEARS.length - 1
		);
		const targetYear = YEARS[nextIndex];
		scrollToYear(targetYear);
	};

	return (
		<div
			className="ranktimeline w-full mt-8 select-none"
			style={{
				"--col-width": "24px",
				"--row-height": "40px",
				"--year-height": "40px",
			}}
		>
			{/* Top Bar: View Mode Switcher */}
			<div className="flex items-center justify-between gap-4 flex-wrap mb-6">
				<div className="flex items-center gap-3" role="group" aria-label="Timeline view mode">
					<button
						type="button"
						aria-pressed={viewMode === "cards"}
						onClick={() => setViewMode("cards")}
						className={`key min-h-[44px] px-4! py-2.5! text-xs! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
							viewMode === "cards"
								? "bg-ink text-cream"
								: "bg-cream text-ink hover:bg-mustard"
						}`}
					>
						Story Cards
					</button>
					<button
						type="button"
						aria-pressed={viewMode === "timeline"}
						onClick={() => setViewMode("timeline")}
						className={`key min-h-[44px] px-4! py-2.5! text-xs! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
							viewMode === "timeline"
								? "bg-ink text-cream"
								: "bg-cream text-ink hover:bg-mustard"
						}`}
					>
						Timeline Grid
					</button>
				</div>

				<div className="label-mono text-ink/85 hidden sm:block">
					{viewMode === "cards"
						? "Interactive evolution by year (2010 to 2026)"
						: "Chronological succession tracks"}
				</div>
			</div>

			{/* ========================================================================= */}
			{/* MODE 1: Story Cards View                                                  */}
			{/* ========================================================================= */}
			{viewMode === "cards" && (
				<>
					<RankTimelinePagination
						activeYear={activeYear}
						years={YEARS}
						onSelectYear={scrollToYear}
						onPrev={() => scrollStep(-1)}
						onNext={() => scrollStep(1)}
						startYear={START_YEAR}
						endYear={END_YEAR}
					/>

					{/* Track Wrapper */}
					<div className="on-paper hard relative border-[1.5px] border-ink bg-paper">
						<div
							ref={scrollContainerRef}
							className="ranktimeline-wrap relative overflow-x-auto py-6 px-6 sm:px-10 md:px-14 flex gap-6 sm:gap-8 snap-x snap-mandatory scroll-smooth motion-reduce:scroll-auto"
						>
							{yearCards.map((card) => (
								<RankStoryCard
									key={card.year}
									card={card}
									isSelected={activeYear === card.year}
									onSelect={() => setActiveYear(card.year)}
									categoryBadgeStyles={categoryBadgeStyles}
									defaultBadgeStyle={defaultBadgeStyle}
								/>
							))}
						</div>
					</div>
				</>
			)}

			{/* ========================================================================= */}
			{/* MODE 2: Classic Timeline Grid View                                        */}
			{/* ========================================================================= */}
			{viewMode === "timeline" && (
				<RankTimelineGrid
					categories={categories}
					activeCategory={activeCategory}
					onSelectCategory={setActiveCategory}
					timelineData={timelineData}
					displayedTimelineItems={displayedTimelineItems}
					totalTimelineRows={totalTimelineRows}
					categoryColors={categoryColors}
					defaultColor={defaultColor}
					years={YEARS}
					gridScrollRef={gridScrollRef}
				/>
			)}

			{/* Global React Tooltip Component */}
			<Tooltip
				id="timeline-tooltip"
				className="!z-50 !bg-ink !text-cream !border-[1.5px] !border-ink !rounded-none !px-3 !py-2 !shadow-[3px_3px_0_var(--mustard)] !font-mono !text-xs"
			/>
		</div>
	);
};

export default RankTimeline;
