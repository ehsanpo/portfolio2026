import portfolioData from "../data/portfolio-resume.json";

export interface BlogPost {
	title: string;
	description: string;
	date: string;
	author?: string;
	category?: string[];
	tag?: string[];
	cover?: {
		height?: number;
		width?: number;
		src?: string;
		format?: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
	};
	featured?: boolean;
	slug: string;
	content: any;
}

export const getPortfolioData = () => {
	return portfolioData;
};

export const calculateYearsOfExperience = (duration: string): number => {
	const [startYear, endYear] = duration.split("-").map((year) => parseInt(year));
	const currentYear = new Date().getFullYear();
	const actualEndYear = endYear <= currentYear ? endYear : currentYear;
	return actualEndYear - startYear;
};

export const calculatePreciseDuration = (startDate: string, endDate?: string): string => {
	if (!startDate) return "";

	const start = new Date(startDate);
	const end = endDate && endDate !== "Present" ? new Date(endDate) : new Date();

	let years = end.getFullYear() - start.getFullYear();
	let months = end.getMonth() - start.getMonth();

	if (months < 0) {
		years--;
		months += 12;
	}

	const parts = [];
	if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
	if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);

	return parts.join(" ");
};

const TECH_NAME_MAPPING: { [key: string]: string } = {
	React: "ReactJS",
	Gatsby: "Gatsby",
	"Next.js": "Next.js",
	TypeScript: "TypeScript",
	Sass: "Sass",

	"Node.js": "Node.js",
	PHP: "PHP",
	"Ruby on Rails": "Ruby on Rails",
	"Rest API": "Rest API",
	GraphQL: "GraphQL",

	MySQL: "MySQL",
	PostgreSQL: "PostgreSQL",
	MongoDB: "MongoDB",
	Redis: "Redis",
	Elasticsearch: "Elasticsearch",

	UI: "UX Design",
	UX: "UX Design",
	"Adobe XD": "Adobe XD",
	Photoshop: "Photoshop",
	"Motion Graphics": "Motion Graphics",

	"AWS API Gateway": "AWS",
	Lambda: "AWS",
	DynamoDB: "AWS",
	S3: "AWS",
	CloudFront: "AWS",

	Linux: "Linux",
	Docker: "Docker",
	Nginx: "Nginx",
	"Shell Script": "Shell Script",
	"Github Actions": "Github Actions",

	"Electron js": "Electron JS",
	Typescript: "TypeScript",
	Tailwind: "Tailwind",
	Vite: "Vite",
	"React Native": "React Native",

	"Reason Studios": "Reason Studios",
	Cubase: "Cubase",
	FFmpeg: "FFmpeg",
	"After Effects": "After Effects",
};

const calculateStatus = (duration: string): number => {
	const [, endYear] = duration.split("-").map((year) => parseInt(year));
	const currentYear = new Date().getFullYear();
	if (endYear > currentYear) {
		return 10;
	} else if (endYear === currentYear) {
		return 7;
	} else if (currentYear - endYear <= 2) {
		return 5;
	} else {
		return 2;
	}
};

export const findTimelineMatch = (stackLabel: string) => {
	const timelineData = portfolioData.timeline;

	const mappedName = TECH_NAME_MAPPING[stackLabel];
	if (mappedName) {
		const match = timelineData.find((item) => item.name === mappedName);
		if (match) {
			return {
				...match,
				yearsOfExperience: calculateYearsOfExperience(match.duration),
				stillActive: calculateStatus(match.duration),
			};
		}
	}

	const exactMatch = timelineData.find((item) => item.name === stackLabel);
	if (exactMatch) {
		return {
			...exactMatch,
			yearsOfExperience: calculateYearsOfExperience(exactMatch.duration),
			stillActive: calculateStatus(exactMatch.duration),
		};
	}

	const partialMatch = timelineData.find(
		(item) =>
			item.name.toLowerCase().includes(stackLabel.toLowerCase()) ||
			stackLabel.toLowerCase().includes(item.name.toLowerCase())
	);

	if (partialMatch) {
		return {
			...partialMatch,
			yearsOfExperience: calculateYearsOfExperience(partialMatch.duration),
			stillActive: calculateStatus(partialMatch.duration),
		};
	}

	return null;
};

export const getRoles = () => {
	return portfolioData.roles;
};
