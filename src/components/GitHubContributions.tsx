import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import CalendarHeatmap, { type ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface ContributionDay {
	date: string;
	count: number;
	level: number;
}

interface ContributionData {
	total: {
		[year: string]: number;
	};
	contributions: ContributionDay[];
}

interface GitHubContributionsProps {
	username?: string;
	defaultYear?: number;
	className?: string;
}

const GitHubContributions: React.FC<GitHubContributionsProps> = ({
	username = "ehsanpo",
	defaultYear = new Date().getFullYear() - 1,
	className = "",
}) => {
	const [selectedYear, setSelectedYear] = useState(defaultYear);
	const [data, setData] = useState<ContributionData | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchContributions = async (year: number) => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`
			);

			if (!response.ok) {
				throw new Error(`Failed to fetch contributions: ${response.statusText}`);
			}

			const result = await response.json();
			setData(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
			setData(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchContributions(selectedYear);
	}, [selectedYear, username]);

	useEffect(() => {
		if (data) {
			const rects = document.querySelectorAll(".react-calendar-heatmap rect");
			rects.forEach((rect, index) => {
				(rect as SVGRectElement).style.transitionDelay = `${index * 0.002}s`;
				rect.setAttributeNS(null, "rx", "0");
				rect.setAttributeNS(null, "ry", "0");
				rect.setAttributeNS(null, "data-tooltip-id", "tooltip-graph");
			});
		}
	}, [data]);

	const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedYear(parseInt(event.target.value));
	};

	const currentYear = new Date().getFullYear();
	const yearOptions = [];
	for (let year = 2018; year <= currentYear; year++) {
		yearOptions.push(year);
	}

	const heatMapData =
		data?.contributions.map((day) => ({
			date: day.date,
			count: day.count,
		})) || [];

	const totalContributions = data?.total[selectedYear.toString()] || 0;
	const activeDays = data?.contributions.filter((d) => d.count > 0).length || 0;
	const peakDay = data?.contributions.reduce<ContributionDay | null>(
		(max, d) => (!max || d.count > max.count ? d : max),
		null
	);

	return (
		<div className={cn("github-contributions space-y-8", className)}>
			<div className="on-paper hard bg-cream text-ink">
				<div className="flex items-center gap-2.5 border-b-[1.5px] border-ink px-3 py-2 bg-cream">
					<span className="size-2.5 shrink-0 border-[1.5px] border-ink bg-mustard" aria-hidden="true" />
					<span className="stripes h-[11px] flex-1" aria-hidden="true" />
					<span className="font-pixel text-xs leading-none uppercase text-ink">
						GITHUB / @{username} / {selectedYear}
					</span>
				</div>

				<div className="p-6">
					<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h3 className="text-xl font-bold tracking-[-0.02em] text-ink">
								Contribution Heatmap
							</h3>
							<div className="h-5 mt-1">
								{data && !loading && (
									<p className="label-mono text-ink/70">
										{totalContributions} contributions in {selectedYear}
									</p>
								)}
							</div>
						</div>

						<div className="flex items-center gap-3">
							{loading && (
								<span className="label-mono text-ink/70">Loading...</span>
							)}
							<label htmlFor="year-select" className="label-mono text-ink">
								Year:
							</label>
							<select
								id="year-select"
								value={selectedYear}
								onChange={handleYearChange}
								disabled={loading}
								className="border-[1.5px] border-ink bg-paper px-3 py-1.5 font-mono text-sm font-semibold text-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink"
							>
								{yearOptions.reverse().map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="relative">
						{error && (
							<div className="border-[1.5px] border-ink bg-tomato/20 p-4">
								<p className="font-mono text-sm text-ink">
									Error loading contributions: {error}
								</p>
							</div>
						)}

						{data && !error && (
							<div className="w-full overflow-x-auto">
								<style>{`
									.react-calendar-heatmap {
										width: 100% !important;
										min-width: 700px;
									}
									.react-calendar-heatmap .react-calendar-heatmap-month-label {
										font-size: 11px;
										font-family: var(--font-geist-mono);
										fill: #5f5748;
									}
									.react-calendar-heatmap .react-calendar-heatmap-weekday-label {
										font-size: 10px;
										font-family: var(--font-geist-mono);
										fill: #5f5748;
									}
									.react-calendar-heatmap .color-empty {
										fill: #e8e3d6;
									}
									.react-calendar-heatmap .color-scale-1 {
										fill: #93d3b0;
									}
									.react-calendar-heatmap .color-scale-2 {
										fill: #76a0e2;
									}
									.react-calendar-heatmap .color-scale-3 {
										fill: #f4b829;
									}
									.react-calendar-heatmap .color-scale-4 {
										fill: #ef5b3b;
									}
									.react-calendar-heatmap rect {
										transition: fill 0.1s ease-out;
										opacity: 0;
										animation: cellFadeIn 0.1s ease-out both;
									}
									@keyframes cellFadeIn {
										to {
											opacity: 1;
										}
									}
									.react-calendar-heatmap rect:hover {
										stroke: #231e16;
										stroke-width: 1.5;
										cursor: pointer;
									}
								`}</style>
								<div className="heatmap-container">
									<CalendarHeatmap
										startDate={new Date(`${selectedYear}-01-01`)}
										endDate={new Date(`${selectedYear}-12-31`)}
										values={heatMapData}
										classForValue={(value: ReactCalendarHeatmapValue<string> | undefined) => {
											if (!value || value.count === 0) {
												return "color-empty";
											}
											if (value.count >= 1 && value.count <= 3) return "color-scale-1";
											if (value.count >= 4 && value.count <= 6) return "color-scale-2";
											if (value.count >= 7 && value.count <= 9) return "color-scale-3";
											return "color-scale-4";
										}}
										tooltipDataAttrs={(value: ReactCalendarHeatmapValue<string> | undefined) => {
											if (!value) return {};
											return {
												"data-tooltip-content": `${new Date(value.date).toISOString().slice(0, 10)}: ${value.count} contributions`,
											} as Record<string, string>;
										}}
									/>
									<ReactTooltip
										id="tooltip-graph"
										className="!bg-ink !text-cream !border-[1.5px] !border-ink !rounded-none !font-mono !text-xs"
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{data && !error && (
				<dl className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-paper">
					<div className="border-t-[1.5px] border-paper/40 pt-3">
						<dd className="font-pixel text-5xl text-mustard">
							{totalContributions.toLocaleString()}
						</dd>
						<dt className="mt-1.5 text-sm text-paper/80">
							contributions in {selectedYear}
						</dt>
					</div>
					<div className="border-t-[1.5px] border-paper/40 pt-3">
						<dd className="font-pixel text-5xl text-mustard">{activeDays}</dd>
						<dt className="mt-1.5 text-sm text-paper/80">days with at least one</dt>
					</div>
					<div className="border-t-[1.5px] border-paper/40 pt-3">
						<dd className="font-pixel text-5xl text-mustard">{peakDay?.count || 0}</dd>
						<dt className="mt-1.5 text-sm text-paper/80">
							{peakDay?.date ? `peak on ${peakDay.date}` : "peak single day"}
						</dt>
					</div>
				</dl>
			)}
		</div>
	);
};

export default GitHubContributions;
