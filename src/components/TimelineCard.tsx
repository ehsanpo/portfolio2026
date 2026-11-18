import React from "react";

interface TimelineCardProps {
	title: string;
	subTitle: string;
	date: string;
	type: "work" | "education";
	delay?: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ title, subTitle, date, type }) => {
	return (
		<div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-[9rem_1fr] md:gap-6 md:p-5">
			<span className="font-mono text-sm tabular-nums text-ink/75 md:pt-0.5">{date}</span>
			<div>
				<h3 className="text-lg font-bold leading-snug tracking-[-0.02em] text-ink md:text-xl">
					{title}
				</h3>
				<p className="mt-0.5 flex items-center gap-2 text-sm text-ink/80">
					<span
						className={`size-2 shrink-0 border border-ink ${type === "work" ? "bg-tomato" : "bg-cobalt"}`}
						aria-hidden="true"
					/>
					<span>{subTitle}</span>
					<span className="label-mono text-[10px]! text-ink/60">
						{type === "work" ? "Work" : "Study"}
					</span>
				</p>
			</div>
		</div>
	);
};

export default TimelineCard;
