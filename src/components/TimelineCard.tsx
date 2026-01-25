import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Card3D from "./Card3D";

interface TimelineCardProps {
	title: string;
	subTitle: string;
	date: string;
	type: "work" | "education";
	delay?: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ title, subTitle, date, type, delay = 0 }) => {
	const Icon = type === "work" ? Briefcase : GraduationCap;

	const iconSettings =
		type === "work"
			? { bg: "rgba(231, 74, 131, 0.1)", color: "#e74a83", glow: "rgba(231, 74, 131, 0.3)" }
			: { bg: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", glow: "rgba(59, 130, 246, 0.3)" };

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay }}
			className="w-full"
		>
			<Card3D
				intensity={10}
				glowColor={iconSettings.glow}
				shine={true}
				className="w-full"
				childClassName="bg-white/90 dark:bg-neutral-900/80 border-neutral-200/50 dark:border-neutral-800/50 shadow-xl"
			>
				<div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:items-center md:gap-6 md:p-6">
					<div
						className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14"
						style={{ backgroundColor: iconSettings.bg }}
					>
						<Icon size={24} style={{ color: iconSettings.color }} strokeWidth={2.5} />
					</div>

					<div className="flex flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-center">
						<div className="flex flex-col gap-0.5">
							<h3 className="font-basement text-lg font-bold tracking-tight text-neutral-900 md:text-xl dark:text-neutral-100">
								{title}
							</h3>
							<p className="font-medium text-neutral-600 dark:text-neutral-400">{subTitle}</p>
						</div>

						<div className="flex flex-col sm:text-right">
							<div className="flex items-center gap-1.5 sm:justify-end">
								<Calendar size={14} className="text-neutral-400" />
								<span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
									{date}
								</span>
							</div>
						</div>
					</div>
				</div>
			</Card3D>
		</motion.div>
	);
};

export default TimelineCard;
