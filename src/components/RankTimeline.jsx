import React, { useState, useRef, useMemo, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import "./RankTimeline.css";
import { getPortfolioData } from "../utils/client-data.ts";
import Card3D from "./Card3D";

const START_YEAR = 2010;
const END_YEAR = 2026;
const TOTAL_YEARS = END_YEAR - START_YEAR;
const YEARS = Array.from({ length: TOTAL_YEARS + 1 }, (_, i) => START_YEAR + i);

const categoryBadgeStyles = {
	Frontend: "bg-teal-500/15 text-teal-400 border-teal-500/30",
	Backend: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
	Database: "bg-amber-500/15 text-amber-400 border-amber-500/30",
	DevOps: "bg-sky-500/15 text-sky-400 border-sky-500/30",
	Apps: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
	Design: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

const categoryColors = {
	Frontend: "bg-teal-400 text-teal-950",
	Backend: "bg-emerald-400 text-emerald-950",
	Database: "bg-amber-300 text-amber-950",
	DevOps: "bg-sky-400 text-sky-950",
	Apps: "bg-indigo-300 text-indigo-950",
	Design: "bg-purple-300 text-purple-950",
};

const defaultBadgeStyle = "bg-muted/50 text-muted-foreground border-white/40";
const defaultColor = "bg-teal-300 text-teal-950";

// Color glow accents per era to make it flashy and 3D
const getEraGlowColor = (year) => {
	if (year <= 2013) return "rgba(45, 212, 191, 0.4)"; // Teal glow
	if (year <= 2017) return "rgba(245, 158, 11, 0.4)"; // Amber/gold glow
	if (year <= 2020) return "rgba(56, 189, 248, 0.4)"; // Sky blue glow
	if (year <= 2023) return "rgba(168, 85, 247, 0.45)"; // Violet glow
	return "rgba(236, 72, 153, 0.45)"; // Pink/Rose modern glow
};

const calculateDurationYears = (durationStr) => {
	if (!durationStr) return "";
	const [s, e] = durationStr.split("-").map(Number);
	const yrs = e - s;
	return `${yrs} ${yrs === 1 ? "year" : "years"}`;
};

const calculateRowPositions = (items) => {
	const occupied = [];
	return items.map((item) => {
		const start = parseInt(item.duration.split("-")[0], 10) - START_YEAR;
		const end = parseInt(item.duration.split("-")[1], 10) - START_YEAR;
		let r = 0;

		while (occupied.some(([s, e, row]) => start < e && end > s && r === row)) {
			r++;
		}

		occupied.push([start, end, r]);
		return { ...item, start, end, adjustedRowIndex: r };
	});
};

// Soft, responsive pagination calculator (never overflows, no horizontal scrolling)
const getPaginationItems = (active, allYears) => {
	const total = allYears.length;
	const first = allYears[0];
	const last = allYears[total - 1];

	let left = active - 1;
	let right = active + 1;

	if (active <= first + 2) {
		left = first;
		right = Math.min(first + 3, last);
	} else if (active >= last - 2) {
		left = Math.max(last - 3, first);
		right = last;
	}

	const range = [];
	const items = [];
	let prev;

	for (let i = 0; i < total; i++) {
		const y = allYears[i];
		if (y === first || y === last || (y >= left && y <= right)) {
			range.push(y);
		}
	}

	for (const y of range) {
		if (prev !== undefined) {
			if (y - prev === 2) {
				items.push(prev + 1);
			} else if (y - prev > 2) {
				items.push(`ellipsis-${prev}`);
			}
		}
		items.push(y);
		prev = y;
	}

	return items;
};

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

	// Responsive soft pagination items
	const paginationItems = useMemo(
		() => getPaginationItems(activeYear, YEARS),
		[activeYear]
	);

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

	const fromDate = (item) => parseInt(item.duration.split("-")[0], 10);
	const toDate = (item) => parseInt(item.duration.split("-")[1], 10);

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
						className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
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
						className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
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
					{/* Production Soft Pagination Bar (Responsive, Non-scrolling) */}
					<div className="flex items-center justify-center w-full mb-6 px-1">
						<nav
							aria-label="Timeline Pagination"
							className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-card/70 dark:bg-neutral-900/60 border border-white/40 backdrop-blur-md shadow-xs max-w-full"
						>
							{/* Previous Button */}
							<button
								type="button"
								onClick={() => scrollStep(-1)}
								disabled={activeYear === START_YEAR}
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
										onClick={() => scrollToYear(year)}
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
								onClick={() => scrollStep(1)}
								disabled={activeYear === END_YEAR}
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
							{yearCards.map((card) => {
								const isSelected = activeYear === card.year;
								return (
									<div
										key={card.year}
										data-year={card.year}
										onClick={() => setActiveYear(card.year)}
										className="w-[88vw] max-w-[480px] sm:w-[440px] md:w-[480px] flex-shrink-0 snap-center transition-all duration-300 "
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
											<div className="flex flex-col justify-between h-full p-6 preserve-3d" >
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
							})}
						</div>
					</div>
				</>
			)}

			{/* ========================================================================= */}
			{/* MODE 2: Classic Timeline Grid View                                        */}
			{/* ========================================================================= */}
			{viewMode === "timeline" && (
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
								onClick={() => setActiveCategory(cat)}
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
								{YEARS.map((year, index) => (
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
								{YEARS.map((year, index) => (
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
