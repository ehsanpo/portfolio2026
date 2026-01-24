import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
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
			// Add staggered animation delays to each cell
			const rects = document.querySelectorAll(".react-calendar-heatmap rect");
			rects.forEach((rect, index) => {
				(rect as SVGRectElement).style.transitionDelay = `${index * 0.002}s`;
				rect.setAttributeNS(null, "rx", "1");
				rect.setAttributeNS(null, "ry", "1");
				rect.setAttributeNS(null, "data-tooltip-id", "tooltip-graph");
			});
		}
	}, [data]);

	const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedYear(parseInt(event.target.value));
	};

	// Generate year options (from 2008 when GitHub was founded to current year)
	const currentYear = new Date().getFullYear();
	const yearOptions = [];
	for (let year = 2018; year <= currentYear; year++) {
		yearOptions.push(year);
	}

	// Transform data for heat map
	const heatMapData =
		data?.contributions.map((day) => ({
			date: day.date,
			count: day.count,
		})) || [];

	const totalContributions = data?.total[selectedYear.toString()] || 0;

	return (
		<div className={`github-contributions min-h-60 ${className}`}>
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
						GitHub Contributions
					</h3>
					<div className="h-6">
						{data && !loading && (
							<p className="text-sm text-gray-600 dark:text-gray-400">
								{totalContributions} contributions in {selectedYear}
							</p>
						)}
					</div>
				</div>

				<div className="flex items-center gap-2">
					{loading && (
						<div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
							<svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							Loading...
						</div>
					)}
					<label
						htmlFor="year-select"
						className="text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						Year:
					</label>
					<select
						id="year-select"
						value={selectedYear}
						onChange={handleYearChange}
						disabled={loading}
						className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
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
					<div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
						<p className="text-sm text-red-600 dark:text-red-400">
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
								font-size: 12px;
								fill: #666;
							}
							.react-calendar-heatmap .react-calendar-heatmap-weekday-label {
								font-size: 10px;
								fill: #666;
							}
							.react-calendar-heatmap .color-empty {
								fill: #ebedf0;
							}
							.react-calendar-heatmap .color-scale-1 {
								fill: #a3d5e8;
							}
							.react-calendar-heatmap .color-scale-2 {
								fill: #6bc4e0;
							}
							.react-calendar-heatmap .color-scale-3 {
								fill: #03aad7;
							}
							.react-calendar-heatmap .color-scale-4 {
								fill: #0377a7;
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
							.heatmap-container {
							}
							.react-calendar-heatmap rect:hover {
								stroke: var(--primary);
								stroke-width: 1;
								cursor: pointer;
							}
							@media (prefers-color-scheme: dark) {
								.react-calendar-heatmap .react-calendar-heatmap-month-label {
									fill: #ccc;
								}
								.react-calendar-heatmap .react-calendar-heatmap-weekday-label {
									fill: #ccc;
								}
								.react-calendar-heatmap .color-empty {
									fill: #374151;
								}
							}
						`}</style>
						<div className="heatmap-container">
							<CalendarHeatmap
								startDate={new Date(`${selectedYear}-01-01`)}
								endDate={new Date(`${selectedYear}-12-31`)}
								values={heatMapData}
								classForValue={(value) => {
									if (!value || value.count === 0) {
										return "color-empty";
									}
									// Map contribution counts to scale levels (1-4)
									if (value.count >= 1 && value.count <= 3) return "color-scale-1";
									if (value.count >= 4 && value.count <= 6) return "color-scale-2";
									if (value.count >= 7 && value.count <= 9) return "color-scale-3";
									return "color-scale-4"; // 10+ contributions
								}}
								tooltipDataAttrs={(value) =>
									({
										"data-tooltip-content": `${new Date(value.date).toISOString().slice(0, 10)} has count: ${value.count}`,
									}) as Record<string, string>
								}
							/>
							<ReactTooltip id="tooltip-graph" />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default GitHubContributions;
