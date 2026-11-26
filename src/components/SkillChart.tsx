import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface SkillChartProps {
	data: {
		labels: string[];
		data: string[];
		slug: string;
	}[];
	showButtons?: boolean;
	chartData: {
		labels: string[];
		data: string[];
		slug: string;
	};
}

const categoryColors = {
	Overall: {
		bg: "rgba(239, 91, 59, 0.2)",
		border: "#ef5b3b",
		button: "bg-cream text-ink",
	},
	"Front-end": {
		bg: "rgba(118, 160, 226, 0.25)",
		border: "#76a0e2",
		button: "bg-cream text-ink",
	},
	Backend: {
		bg: "rgba(244, 184, 41, 0.25)",
		border: "#f4b829",
		button: "bg-cream text-ink",
	},
	Database: {
		bg: "rgba(147, 211, 176, 0.3)",
		border: "#93d3b0",
		button: "bg-cream text-ink",
	},
	Design: {
		bg: "rgba(35, 30, 22, 0.15)",
		border: "#231e16",
		button: "bg-cream text-ink",
	},
	Cloud: {
		bg: "rgba(244, 184, 41, 0.25)",
		border: "#f4b829",
		button: "bg-cream text-ink",
	},
	DevOps: {
		bg: "rgba(243, 166, 187, 0.3)",
		border: "#f3a6bb",
		button: "bg-cream text-ink",
	},
	Apps: {
		bg: "rgba(118, 160, 226, 0.25)",
		border: "#76a0e2",
		button: "bg-cream text-ink",
	},
	Multimedia: {
		bg: "rgba(239, 91, 59, 0.2)",
		border: "#ef5b3b",
		button: "bg-cream text-ink",
	},
};

const getExpertiseLevel = (level: number): string => {
	if (level === 10) return "Expert";
	if (level >= 7 && level <= 9) return "Advanced";
	if (level >= 4 && level <= 6) return "Professional";
	if (level >= 1 && level <= 3) return "Beginner";
	return "No Experience";
};

const createOverallData = (data: { labels: string[]; data: string[]; slug: string }[]) => {
	const skillMap = new Map<string, number>();

	data.forEach((category) => {
		category.labels.forEach((label, index) => {
			const value = parseInt(category.data[index]);
			const currentValue = skillMap.get(label);
			if (!currentValue || currentValue < value) {
				skillMap.set(label, value);
			}
		});
	});

	return {
		labels: Array.from(skillMap.keys()),
		data: Array.from(skillMap.values()).map(String),
		slug: "Overall",
	};
};

const getCurrentColor = (category: string) => {
	return categoryColors[category as keyof typeof categoryColors] || categoryColors["Overall"];
};

const CategoryButton = ({
	category,
	isActive,
	onClick,
	skillCount,
}: {
	category: string;
	isActive: boolean;
	onClick: () => void;
	skillCount: number;
}) => {
	const categoryColor = categoryColors[category as keyof typeof categoryColors];

	return (
		<button
			type="button"
			className={`key px-3! py-2! text-xs! ${
				isActive ? "bg-ink text-cream" : "bg-cream text-ink"
			}`}
			onClick={onClick}
		>
			<span
				className="size-2 shrink-0 border border-current"
				style={{ backgroundColor: categoryColor.border }}
				aria-hidden="true"
			/>
			<span>{category}</span>
			<span className="opacity-70">({skillCount})</span>
		</button>
	);
};

const SkillCard = ({
	skill,
	index,
	currentCategory,
	currentColor,
}: {
	skill: { name: string; value: number };
	index: number;
	currentCategory: string;
	currentColor: { bg: string; border: string; button: string };
	isDarkMode?: boolean;
}) => (
	<div
		key={`${currentCategory}-${skill.name}-${index}`}
		className="border-[1.5px] border-ink bg-paper p-4 text-ink"
	>
		<div className="flex items-center justify-between gap-2">
			<h4 className="font-sans text-sm font-bold text-ink">{skill.name}</h4>
			<div className="flex items-center gap-2">
				<span
					className="size-2.5 shrink-0 border border-ink"
					style={{ backgroundColor: currentColor.border }}
					aria-hidden="true"
				/>
				<span className="label-mono text-[10px]! text-ink/80">
					{getExpertiseLevel(skill.value)}
				</span>
			</div>
		</div>
		<div className="mt-2.5">
			<div className="h-2 w-full border border-ink/40 bg-cream">
				<div
					className="h-full transition-all duration-300"
					style={{
						width: `${(skill.value / 10) * 100}%`,
						backgroundColor: currentColor.border,
					}}
				/>
			</div>
		</div>
	</div>
);

const StatisticsCard = ({
	skillsData,
	currentCategory,
}: {
	skillsData: { name: string; value: number }[];
	currentCategory: string;
	currentColor?: { bg: string; border: string; button: string };
	isDarkMode?: boolean;
}) => {
	const averageSkill =
		skillsData.length > 0
			? (skillsData.reduce((sum, skill) => sum + skill.value, 0) / skillsData.length).toFixed(1)
			: "0";
	const expertSkills = skillsData.filter((skill) => skill.value >= 9).length;

	return (
		<div className="mt-8 border-[1.5px] border-ink bg-paper p-6 text-ink">
			<div className="flex items-center justify-between border-b-[1.5px] border-ink/25 pb-3 mb-5">
				<h4 className="label-mono text-ink">
					/ {currentCategory === "Overall" ? "Overall Statistics" : `${currentCategory} Statistics`}
				</h4>
				<span className="size-2 bg-ink" aria-hidden="true" />
			</div>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div className="border-t-[1.5px] border-ink pt-3">
					<div className="font-pixel text-4xl leading-none text-ink">{skillsData.length}</div>
					<div className="label-mono mt-1.5 text-ink/75">Technologies</div>
				</div>
				<div className="border-t-[1.5px] border-ink pt-3">
					<div className="font-pixel text-4xl leading-none text-ink">{averageSkill}</div>
					<div className="label-mono mt-1.5 text-ink/75">Average Expertise</div>
				</div>
				<div className="border-t-[1.5px] border-ink pt-3">
					<div className="font-pixel text-4xl leading-none text-ink">{expertSkills}</div>
					<div className="label-mono mt-1.5 text-ink/75">Expert Level (9-10)</div>
				</div>
			</div>
		</div>
	);
};

export default function SkillChart({ data, chartData, showButtons }: SkillChartProps) {
	const [currentChart, setCurrentChart] = React.useState(chartData);
	const [currentCategory, setCurrentCategory] = React.useState("Overall");
	const [isDarkMode, setIsDarkMode] = useState(true);

	useEffect(() => {
		const darkModeEnabled = document.documentElement.classList.contains("dark");
		setIsDarkMode(darkModeEnabled);

		const observer = new MutationObserver(() => {
			const isDark = document.documentElement.classList.contains("dark");
			setIsDarkMode(isDark);
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => {
			observer.disconnect();
		};
	}, []);

	const currentColor = getCurrentColor(currentCategory);

	const chartDatainternal = {
		labels: currentChart.labels,
		datasets: [
			{
				label: `${currentCategory} Skills`,
				data: currentChart.data,
				backgroundColor: currentColor.bg,
				borderColor: currentColor.border,
				borderWidth: 2,
				pointBackgroundColor: currentColor.border,
				pointBorderColor: "#231e16",
				pointHoverBackgroundColor: "#fff4d6",
				pointHoverBorderColor: currentColor.border,
				fill: true,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			r: {
				beginAtZero: true,
				max: 10,
				min: 0,
				angleLines: {
					color: "rgba(35, 30, 22, 0.2)",
				},
				grid: {
					color: "rgba(35, 30, 22, 0.2)",
				},
				pointLabels: {
					color: "#231e16",
					font: {
						size: 14,
						family: "GeistMono, ui-monospace, monospace",
					},
				},
				ticks: {
					color: "#231e16",
					backdropColor: "transparent",
					stepSize: 2,
					font: {
						size: 12,
					},
				},
			},
		},
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					color: "#231e16",
					font: {
						size: 14,
						family: "GeistMono, ui-monospace, monospace",
					},
				},
			},
			tooltip: {
				callbacks: {
					label: function (context: { label: string; parsed: { r: number } }) {
						return `${context.label}: ${getExpertiseLevel(context.parsed.r)}`;
					},
				},
			},
		},
	};

	const onSkillChartLoad = (category: string) => {
		setCurrentCategory(category);

		if (category === "Overall") {
			setCurrentChart(createOverallData(data));
			return;
		}

		const chart = data.find((chart: any) => {
			return chart.slug === category;
		});

		if (!chart) {
			return;
		}

		setCurrentChart(chart);
	};

	const skillsData = currentChart.labels.map((label, index) => ({
		name: label,
		value: parseInt(currentChart.data[index]),
	}));

	return (
		<div className="mx-auto w-full max-w-[96rem] px-4 py-1">
			{showButtons && (
				<div className="mb-8">
					<div className="flex flex-wrap justify-center gap-3">
						{[
							"Overall",
							"Front-end",
							"Backend",
							"Database",
							"Design",
							"Cloud",
							"DevOps",
							"Apps",
							"Multimedia",
						].map((category) => {
							const isActive = currentCategory === category;
							const skillCount =
								category === "Overall"
									? createOverallData(data).labels.length
									: data.find((d) => d.slug === category)?.labels.length || 0;

							return (
								<CategoryButton
									key={category}
									category={category}
									isActive={isActive}
									onClick={() => onSkillChartLoad(category)}
									skillCount={skillCount}
								/>
							);
						})}
					</div>
				</div>
			)}

			<div className="on-paper hard bg-cream text-ink">
				<div className="flex items-center gap-2.5 border-b-[1.5px] border-ink px-3 py-2 bg-cream">
					<span className="size-2.5 shrink-0 border-[1.5px] border-ink bg-tomato" aria-hidden="true" />
					<span className="stripes h-[11px] flex-1" aria-hidden="true" />
					<span className="font-pixel text-xs leading-none uppercase text-ink">
						{currentCategory === "Overall" ? "RADAR / OVERALL" : `RADAR / ${currentCategory}`}
					</span>
				</div>
				<div className="p-6 md:p-8">
					<div className="mb-6">
						<h3 className="mb-2 text-2xl font-bold tracking-[-0.03em] text-ink">
							{currentCategory === "Overall" ? "Overall Skills" : `${currentCategory} Stack`}
						</h3>
						<p className="text-ink/80">
							{currentCategory === "Overall"
								? `Comprehensive view of expertise across ${skillsData.length} technologies from all categories`
								: `Expertise levels for ${skillsData.length} technologies in this category`}
						</p>
					</div>

					<div className="relative" style={{ height: "500px" }}>
						<Radar data={chartDatainternal} options={options} />
					</div>

					<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{skillsData.map((skill, index) => (
							<SkillCard
								key={`${currentCategory}-${skill.name}-${index}`}
								skill={skill}
								index={index}
								currentCategory={currentCategory}
								currentColor={currentColor}
							/>
						))}
					</div>

					<StatisticsCard skillsData={skillsData} currentCategory={currentCategory} />
				</div>
			</div>
		</div>
	);
}
