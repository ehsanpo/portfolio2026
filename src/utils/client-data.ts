import portfolioData from "../data/portfolio-resume.json";

// Type for blog posts (used by client components)
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
	content: any; // Use any here to avoid importing CollectionEntry
}

export const getPortfolioData = () => {
	return portfolioData;
};

// Calculate years of experience from duration string
export const calculateYearsOfExperience = (duration: string): number => {
	const [startYear, endYear] = duration.split("-").map((year) => parseInt(year));
	const currentYear = new Date().getFullYear();
	const actualEndYear = endYear <= currentYear ? endYear : currentYear;
	return actualEndYear - startYear;
};

// Mapping object to handle name variations between stacks and timeline
const TECH_NAME_MAPPING: { [key: string]: string } = {
	// Front-end stack mappings
	React: "ReactJS",
	Gatsby: "Gatsby",
	"Next.js": "Next.js",
	TypeScript: "TypeScript",
	Sass: "Sass", // Not in timeline

	// Backend stack mappings
	"Node.js": "Node.js",
	PHP: "PHP",
	"Ruby on Rails": "Ruby on Rails",
	"Rest API": "Rest API", // Not in timeline
	GraphQL: "GraphQL",

	// Database stack mappings
	MySQL: "MySQL",
	PostgreSQL: "PostgreSQL",
	MongoDB: "MongoDB", // Not in timeline
	Redis: "Redis", // Not in timeline
	Elasticsearch: "Elasticsearch", // Not in timeline

	// Design stack mappings
	UI: "UX Design", // Maps to UX Design in timeline
	UX: "UX Design",
	"Adobe XD": "Adobe XD",
	Photoshop: "Photoshop",
	"Motion Graphics": "Motion Graphics", // Not in timeline

	// Cloud stack mappings (most not in timeline)
	"AWS API Gateway": "AWS",
	Lambda: "AWS",
	DynamoDB: "AWS",
	S3: "AWS",
	CloudFront: "AWS",

	// DevOps stack mappings (most not in timeline)
	Linux: "Linux", // Not in timeline
	Docker: "Docker", // Not in timeline
	Nginx: "Nginx", // Not in timeline
	"Shell Script": "Shell Script", // Not in timeline
	"Github Actions": "Github Actions", // Not in timeline

	// Apps stack mappings
	"Electron js": "Electron JS",
	Typescript: "TypeScript",
	Tailwind: "Tailwind",
	Vite: "Vite", // Not in timeline
	"React Native": "React Native", // Not in timeline

	// Multimedia stack mappings
	"Reason Studios": "Reason Studios", // Not in timeline
	Cubase: "Cubase", // Not in timeline
	FFmpeg: "FFmpeg", // Not in timeline
	"After Effects": "After Effects", // Not in timeline
};

const calculateStatus = (duration: string): number => {
	const [startYear, endYear] = duration.split("-").map((year) => parseInt(year));
	const currentYear = new Date().getFullYear();
	if (endYear > currentYear) {
		return 10; // Still active
	} else if (endYear === currentYear) {
		return 7; // Just ended this year
	} else if (currentYear - endYear <= 2) {
		return 5; // Ended within the last 2 years
	} else {
		return 2; // Ended more than 2 years ago
	}
};

// Find matching timeline entry for a stack label
export const findTimelineMatch = (stackLabel: string) => {
	const timelineData = portfolioData.timeline;

	// Direct mapping lookup
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

	// Fallback: exact match
	const exactMatch = timelineData.find((item) => item.name === stackLabel);
	if (exactMatch) {
		return {
			...exactMatch,
			yearsOfExperience: calculateYearsOfExperience(exactMatch.duration),
			stillActive: calculateStatus(exactMatch.duration),
		};
	}

	// Fallback: case-insensitive partial match
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
