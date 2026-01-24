import React from "react";
import "./RankTimeline.css";
import { getPortfolioData } from "../utils/client-data.ts";

const RankTimeline = () => {
	const portfolioData = getPortfolioData();
	const timelineData = portfolioData.timeline;
	const colorClasses = [
		"bg-teal-300",
		"bg-indigo-300",
		"bg-blue-500",
		"bg-violet-300",
		"bg-purple-300",
	];

	const fromDate = (item) => parseInt(item.split("-")[0]);
	const toDate = (item) => parseInt(item.split("-")[1]);
	return (
		<div className="ranktimeline">
			<div className="ranktimeline-wrap">
				<div className="ranktimeline-year-lines">
					{[...Array(16)].map((_, index) => (
						<div
							className="ranktimeline-year-line"
							style={{ left: `calc(var(--col-width) * ${index * 12})` }}
							key={index}
						></div>
					))}
				</div>
				<div className="ranktimeline-years">
					{[...Array(16)].map((_, index) => (
						<div
							className="ranktimeline-year !text-xl"
							style={{ width: `calc(var(--col-width) * 12)` }}
							key={index}
						>
							<span>{2010 + index}</span>
						</div>
					))}
				</div>
				<div className="ranktimeline-chart" style={{ height: "calc(var(--row-height) * 15)" }}>
					{calculateRowPositions(timelineData).map((item, itemIndex) => (
						<div
							className="ranktimeline-item-wrap"
							style={{
								left: `calc(var(--col-width) * ${
									(parseInt(item.duration.split("-")[0]) - 2010) * 12
								})`,
								width: `calc(var(--col-width) * ${
									(parseInt(item.duration.split("-")[1]) - parseInt(item.duration.split("-")[0])) *
									12
								})`,
								height: "var(--row-height)",
								top: `calc(var(--row-height) * ${item.adjustedRowIndex})`,
							}}
							key={itemIndex}
						>
							<div
								className={`ranktimeline-item group text-black ${
									colorClasses[itemIndex % colorClasses.length]
								}`}
								data-id={item.id}
							>
								<span>
									{item.icon && <img src={item.icon} alt={item.name} />}
									{item.name}{" "}
									<p className="hidden group-hover:inline">
										- {fromDate(item.duration)}
										{fromDate(item.duration) + 1 === toDate(item.duration)
											? ""
											: ` - ${toDate(item.duration) - 1}`}
									</p>
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const calculateRowPositions = (items) => {
	let occupied = [];
	return items.map((item) => {
		let start = parseInt(item.duration.split("-")[0]) - 2010;
		let end = parseInt(item.duration.split("-")[1]) - 2010;
		let adjustedRowIndex = 0;

		while (occupied.some(([s, e, r]) => start < e && end > s && adjustedRowIndex === r)) {
			adjustedRowIndex++;
		}

		occupied.push([start, end, adjustedRowIndex]);
		return { ...item, adjustedRowIndex };
	});
};

export default RankTimeline;
