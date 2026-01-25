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
import SkillsInfo from "./Skillsinfo";

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
		bg: "rgba(34, 197, 94, 0.2)",
		border: "rgba(34, 197, 94, 1)",
		button: "bg-primary-500 text-primary-900",
	},
	"Front-end": {
		bg: "rgba(168, 85, 247, 0.2)",
		border: "rgba(168, 85, 247, 1)",
		button: "bg-purple-400 text-purple-900",
	},
	Backend: {
		bg: "rgba(251, 146, 60, 0.2)",
		border: "rgba(251, 146, 60, 1)",
		button: "bg-yellow-500 text-yellow-900",
	},
	Database: {
		bg: "rgba(59, 130, 246, 0.2)",
		border: "rgba(59, 130, 246, 1)",
		button: "bg-blue-500 text-cyan-900",
	},
	Design: {
		bg: "rgba(107, 114, 128, 0.2)",
		border: "rgba(107, 114, 128, 1)",
		button: "bg-white text-gray-900",
	},
	Cloud: {
		bg: "rgba(251, 146, 60, 0.2)",
		border: "rgba(251, 146, 60, 1)",
		button: "bg-orange-400 text-orange-900",
	},
	DevOps: {
		bg: "rgba(244, 63, 94, 0.2)",
		border: "rgba(244, 63, 94, 1)",
		button: "bg-rose-400 text-rose-900",
	},
	Apps: {
		bg: "rgba(20, 184, 166, 0.2)",
		border: "rgba(20, 184, 166, 1)",
		button: "bg-teal-500 text-teal-900",
	},
	Multimedia: {
		bg: "rgba(217, 70, 239, 0.2)",
		border: "rgba(217, 70, 239, 1)",
		button: "bg-fuchsia-400 text-fuchsia-900",
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
			className={`font-basement flex w-[200px] items-center justify-center rounded-lg p-2 transition-all duration-200 ${
				isActive
					? "scale-105 transform text-white shadow-lg"
					: `${categoryColor.button} transition-colors hover:bg-white`
			}`}
			style={isActive ? { backgroundColor: categoryColor.border } : {}}
			onClick={onClick}
		>
			<div
				className="mr-2 h-3 w-3 rounded-full"
				style={{ backgroundColor: categoryColor.border }}
			></div>
			{category}
			<span className="ml-2 text-xs opacity-75">({skillCount})</span>
		</button>
	);
};

const SkillCard = ({
	skill,
	index,
	currentCategory,
	currentColor,
	isDarkMode,
}: {
	skill: { name: string; value: number };
	index: number;
	currentCategory: string;
	currentColor: { bg: string; border: string; button: string };
	isDarkMode: boolean;
}) => (
	<div
		key={`${currentCategory}-${skill.name}-${index}`}
		className={`rounded-lg p-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}
	>
		<div className="flex items-center justify-between">
			<h4 className="font-semibold" style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
				{skill.name}
			</h4>
			<div className="flex items-center space-x-2">
				<div
					className="h-3 w-3 rounded-full"
					style={{ backgroundColor: currentColor.border }}
				></div>
				<span className="text-sm font-medium" style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
					{getExpertiseLevel(skill.value)}
				</span>
			</div>
		</div>
		<div className="mt-2">
			<div className={`h-2 w-full rounded-full ${isDarkMode ? "bg-gray-600" : "bg-gray-200"}`}>
				<div
					className="h-2 rounded-full transition-all duration-300"
					style={{
						width: `${(skill.value / 10) * 100}%`,
						backgroundColor: currentColor.border,
					}}
				></div>
			</div>
		</div>
	</div>
);

const StatisticsCard = ({
	skillsData,
	currentCategory,
	currentColor,
	isDarkMode,
}: {
	skillsData: { name: string; value: number }[];
	currentCategory: string;
	currentColor: { bg: string; border: string; button: string };
	isDarkMode: boolean;
}) => {
	const averageSkill =
		skillsData.length > 0
			? (skillsData.reduce((sum, skill) => sum + skill.value, 0) / skillsData.length).toFixed(1)
			: "0";
	const expertSkills = skillsData.filter((skill) => skill.value >= 9).length;

	return (
		<div
			className="mt-8 rounded-lg p-6"
			style={{
				backgroundColor: `${currentColor.bg.replace("0.2", "0.1")}`,
			}}
		>
			<h4
				className="mb-4 text-lg font-semibold"
				style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
			>
				{currentCategory === "Overall" ? "Overall Statistics" : `${currentCategory} Statistics`}
			</h4>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div className="text-center">
					<div className="text-2xl font-bold" style={{ color: currentColor.border }}>
						{skillsData.length}
					</div>
					<div className="text-sm opacity-70" style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
						Technologies
					</div>
				</div>
				<div className="text-center">
					<div className="text-2xl font-bold" style={{ color: currentColor.border }}>
						{averageSkill}
					</div>
					<div className="text-sm opacity-70" style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
						Average Expertise
					</div>
				</div>
				<div className="text-center">
					<div className="text-2xl font-bold" style={{ color: currentColor.border }}>
						{expertSkills}
					</div>
					<div className="text-sm opacity-70" style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
						Expert Level (9-10)
					</div>
				</div>
			</div>
		</div>
	);
};

export default function SkillChart({ data, chartData, showButtons }: SkillChartProps) {
	const [currentChart, setCurrentChart] = React.useState(chartData);
	const [currentCategory, setCurrentCategory] = React.useState("Overall");
	const [isDarkMode, setIsDarkMode] = useState(false);

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
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
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
					color: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
				},
				grid: {
					color: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
				},
				pointLabels: {
					color: isDarkMode ? "#ffffff" : "#000000",
					font: {
						size: 14,
						family: "Basement, sans-serif",
					},
				},
				ticks: {
					color: isDarkMode ? "#ffffff" : "#000000",
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
					color: isDarkMode ? "#ffffff" : "#000000",
					font: {
						size: 14,
						family: "Basement, sans-serif",
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
		<div className="mx-auto w-full max-w-6xl px-4 py-1">
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

			<div className={`rounded-xl p-8 shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
				<div className="mb-6">
					<h3
						className="mb-2 text-2xl font-bold"
						style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
					>
						{currentCategory === "Overall" ? "Overall Skills" : `${currentCategory} Stack`}
					</h3>
					<p className="opacity-80" style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
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
							isDarkMode={isDarkMode}
						/>
					))}
				</div>

				<StatisticsCard
					skillsData={skillsData}
					currentCategory={currentCategory}
					currentColor={currentColor}
					isDarkMode={isDarkMode}
				/>
			</div>
		</div>
	);
}
