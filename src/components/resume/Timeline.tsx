import React from "react";

interface TimelineItem {
	title: string;
	subtitle?: string;
	startDate: string;
	endDate: string;
	description: string[];
	tags?: string[];
}

interface TimelineProps {
	items: TimelineItem[];
	mainColor: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, mainColor }) => {
	function calculateDuration(startDate: string, endDate: string): React.ReactNode {
		// Parse the input dates
		const parseDate = (date: string) => {
			const parts = date.split("-");
			const year = parseInt(parts[0], 10);
			const month = parts.length > 1 ? parseInt(parts[1], 10) - 1 : 0; // Default month to January (0)
			return new Date(year, month);
		};

		const start = parseDate(startDate);
		const end = parseDate(endDate);

		// Calculate difference in years and months
		const yearsDiff = end.getFullYear() - start.getFullYear();
		let monthsDiff = end.getMonth() - start.getMonth();

		// Adjust if monthsDiff is negative
		if (monthsDiff < 0) {
			monthsDiff += 12;
		}

		return (
			<>
				{yearsDiff > 0 && ` ( ${yearsDiff} ${yearsDiff === 1 ? "year" : "years"} `}
				{monthsDiff > 0
					? `${yearsDiff < 0 ? "(" : ""}  ${monthsDiff} ${monthsDiff === 1 ? "month" : "months )"}`
					: yearsDiff > 0 && ")"}
			</>
		);
	}

	return (
		<div>
			{items.map((item, index) => (
				<div
					key={index}
					className="timeline-item relative border-l-2 border-current pb-4 pl-8"
					style={{ color: mainColor }}
				>
					<div className="absolute -left-[11px] top-1 h-4 w-4 rounded-full bg-current" />
					<div className="mb-1 text-black">
						<div className="flex items-baseline justify-between">
							<h3
								className="mb-1 text-lg font-bold print:mb-0 print:text-base"
								style={{ color: mainColor }}
							>
								{item.title}
							</h3>
							<span className="text-sm print:text-xs">
								{item.startDate} - {item.endDate} {calculateDuration(item.startDate, item.endDate)}
							</span>
						</div>
						{item.subtitle && (
							<div className="text-sm font-bold print:text-xs">{item.subtitle}</div>
						)}
					</div>
					<p className="mb-2 text-sm text-black">
						{item.description.map((desc, index) => (
							<li key={index}>{desc}</li>
						))}
					</p>
					{item.tags && (
						<div className="flex flex-wrap gap-2">
							{item.tags.map((tag, tagIndex) => (
								<span
									key={tagIndex}
									style={{ color: mainColor }}
									className="rounded-full bg-gray-100 px-2 py-1 text-xs"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
};
