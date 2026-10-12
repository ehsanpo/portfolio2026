export const START_YEAR = 2010;
export const END_YEAR = 2026;
export const TOTAL_YEARS = END_YEAR - START_YEAR;
export const YEARS = Array.from({ length: TOTAL_YEARS + 1 }, (_, i) => START_YEAR + i);

export const categoryBadgeStyles = {
	Frontend: "bg-teal-500/15 text-teal-400 border-teal-500/30",
	Backend: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
	Database: "bg-amber-500/15 text-amber-400 border-amber-500/30",
	DevOps: "bg-sky-500/15 text-sky-400 border-sky-500/30",
	Apps: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
	Design: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export const categoryColors = {
	Frontend: "bg-teal-400 text-teal-950",
	Backend: "bg-emerald-400 text-emerald-950",
	Database: "bg-amber-300 text-amber-950",
	DevOps: "bg-sky-400 text-sky-950",
	Apps: "bg-indigo-300 text-indigo-950",
	Design: "bg-purple-300 text-purple-950",
};

export const defaultBadgeStyle = "bg-muted/50 text-muted-foreground border-white/40";
export const defaultColor = "bg-teal-300 text-teal-950";

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
