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
			targetCard.scrollIntoView({
				behavior: "smooth",
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
			className="ranktimeline w-full my-8 select-none"
			style={{
				"--col-width": "24px",
				"--row-height": "40px",
				"--year-height": "40px",
			}}
		>
			{/* Top Bar: View Mode Switcher */}
			<div className="flex items-center justify-between gap-4 flex-wrap mb-5 px-1">
				<div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/40 border border-white/40">
					<button
						type="button"
						onClick={() => setViewMode("cards")}
						className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
							viewMode === "cards"
								? "bg-primary text-primary-foreground shadow-sm"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						✨ 3D Story Cards
					</button>
					<button
						type="button"
						onClick={() => setViewMode("timeline")}
						className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
							viewMode === "timeline"
								? "bg-primary text-primary-foreground shadow-sm"
								: "text-muted-foreground hover:text-foreground"
						}`}
					>
						📊 Timeline Grid
					</button>
				</div>

				<div className="text-sm font-medium text-muted-foreground hidden sm:block">
					{viewMode === "cards"
						? "Interactive evolution by year (2010 – 2026)"
						: "Chronological succession tracks"}
				</div>
			</div>

			{/* ========================================================================= */}
			{/* MODE 1: 3D Story Cards View                                               */}
			{/* ========================================================================= */}
			{viewMode === "cards" && (
				<>
					{/* Production Soft Pagination Bar */}
					<RankTimelinePagination
						activeYear={activeYear}
						years={YEARS}
						onSelectYear={scrollToYear}
						onPrev={() => scrollStep(-1)}
						onNext={() => scrollStep(1)}
						startYear={START_YEAR}
						endYear={END_YEAR}
					/>

					{/* 3D Track Wrapper with Left & Right Gradient Blur Fade */}
					<div className="relative">
						{/* Left Edge Overlay Blur Fade */}
						<div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-background via-background/70 to-transparent z-20 backdrop-blur-[2px] rounded-l-2xl" />

						{/* Right Edge Overlay Blur Fade */}
						<div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-background via-background/70 to-transparent z-20 backdrop-blur-[2px] rounded-r-2xl" />

						{/* Scroll Track with generous side padding, wide spacious cards, and spacing */}
						<div
							ref={scrollContainerRef}
							className="ranktimeline-wrap relative overflow-x-auto pb-10 pt-3 px-12 sm:px-24 md:px-36 flex gap-8 sm:gap-10 snap-x snap-mandatory scroll-smooth"
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
				className="!z-50 !bg-neutral-900/95 !text-white !border !border-white/15 !rounded-xl !px-3.5 !py-2.5 !shadow-2xl !text-sm !backdrop-blur-md"
			/>
		</div>
	);
};

export default RankTimeline;
