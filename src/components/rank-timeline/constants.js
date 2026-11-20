export const START_YEAR = 2010;
export const END_YEAR = 2026;
export const TOTAL_YEARS = END_YEAR - START_YEAR;
export const YEARS = Array.from({ length: TOTAL_YEARS + 1 }, (_, i) => START_YEAR + i);

export const categoryBadgeStyles = {
	Frontend: "bg-mint text-ink border-ink",
	Backend: "bg-mustard text-ink border-ink",
	Database: "bg-cream text-ink border-ink",
	DevOps: "bg-cobalt text-ink border-ink",
	Apps: "bg-tomato text-ink border-ink",
	Design: "bg-blush text-ink border-ink",
};

export const categoryColors = {
	Frontend: "bg-mint text-ink",
	Backend: "bg-mustard text-ink",
	Database: "bg-cream text-ink",
	DevOps: "bg-cobalt text-ink",
	Apps: "bg-tomato text-ink",
	Design: "bg-blush text-ink",
};

export const defaultBadgeStyle = "bg-paper text-ink border-ink";
export const defaultColor = "bg-mint text-ink";

// Color glow accents per era to make it flashy and 3D
export const getEraGlowColor = (year) => {
	if (year <= 2013) return "rgba(45, 212, 191, 0.4)";
	if (year <= 2017) return "rgba(245, 158, 11, 0.4)";
	if (year <= 2020) return "rgba(56, 189, 248, 0.4)";
	if (year <= 2023) return "rgba(168, 85, 247, 0.45)";
	return "rgba(236, 72, 153, 0.45)";
};

export const calculateDurationYears = (durationStr) => {
	if (!durationStr) return "";
	const [s, e] = durationStr.split("-").map(Number);
	const yrs = e - s;
	return `${yrs} ${yrs === 1 ? "year" : "years"}`;
};

export const calculateRowPositions = (items) => {
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
export const getPaginationItems = (active, allYears) => {
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
