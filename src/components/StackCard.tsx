import React from "react";
import { motion } from "framer-motion";
import { findTimelineMatch } from "../utils/client-data";
import Card3D from "./Card3D";

interface StackCardProps {
	readonly slug: string;
	readonly labels: string[];
	readonly icon: string;
	readonly data: string[];
	readonly parentIndex: number;
}

function getExpertiseColor(level: number): string {
	if (level >= 7) return "bg-green-500";
	if (level >= 4) return "bg-blue-500";
	if (level >= 1) return "bg-yellow-500";
	return "bg-gray-400";
}

export default function StackCard({ slug, labels, icon, data, parentIndex }: StackCardProps) {
	const colors = [
		"from-primary-500/50 to-primary-500",
		"from-primary-500/50 to-primary-500",
		"from-primary-500/50 to-primary-500",

		"from-orange-500/50 to-orange-500 ",
		"from-orange-500/50 to-orange-500",
		"from-orange-500/50 to-orange-500 ",

		"from-blue-500/50 to-secondary-500 ",
		"from-blue-500/50 to-secondary-500 ",
		"from-blue-500/50 to-secondary-500 ",
	];

	const getExpertiseLevel = (level: number): string => {
		if (level === 10) return "Expert";
		if (level >= 7 && level <= 9) return "Advanced";
		if (level >= 4 && level <= 6) return "Professional";
		if (level >= 1 && level <= 3) return "Beginner";
		return "No Experience";
	};

	return (
		<motion.div className={`rounded-lg`} whileHover={{ scale: 1.02 }}>
			<Card3D
				className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-black"
				glowColor="color-mix(in srgb, currentColor 80%, var(--color-accent))"
			>
				<div className="-mb-2.5 flex items-center gap-4 p-3">
					<img src={icon} alt={slug} className="h-12 w-12" />
					<h3 className="font-basement text-xl text-gray-600 dark:text-gray-300">{slug}</h3>
				</div>
				<div className="space-y-4 p-3">
					{labels.map((label, index) => {
						const timelineMatch = findTimelineMatch(label);
						const yearsOfExperience = timelineMatch?.yearsOfExperience;

						return (
							<div key={label} className="group/stat relative">
								<div className="clip2 rounded bg-neutral-700/30 px-2 py-2 transition-all duration-300 group-hover/stat:translate-z-2 group-hover/stat:scale-112 group-hover/stat:shadow-xl">
									<div className="flex justify-between gap-2">
										<span className="text-gray-700 dark:text-gray-300">
											<span
												className={`mr-1 inline-block h-3 w-3 rounded-full ${getExpertiseColor(
													timelineMatch?.stillActive
												)}`}
											></span>
											{label}
											{yearsOfExperience && (
												<span className="text-xs text-gray-500 opacity-0 transition-all duration-300 ease-in-out group-hover/stat:opacity-100 dark:text-gray-400">
													{" "}
													- {yearsOfExperience} Years
												</span>
											)}
										</span>
										<div className="flex items-center gap-2">
											<span className="text-primary-500 opacity-0 transition-all duration-300 ease-in-out group-hover/stat:opacity-100">
												{getExpertiseLevel(parseInt(data[index]))}
											</span>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</Card3D>
		</motion.div>
	);
}
