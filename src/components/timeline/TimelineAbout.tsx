import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { TimelineSection } from "./TimelineSection";
import { getPortfolioData } from "../../utils/client-data";

const { companies, education } = getPortfolioData();

const sortetExperience = [
	...companies.map((c: any) => ({
		year: c.year,
		title: c.position,
		org: c.name,
		description: c.description,
		image: c.image,
		tags: c.tags,
		awards: c.awards?.map((a: any) => a.name),
		team: c.team,
		project: c.projects?.[0],
	})),
	...education
		.filter((e: any) => e.highlighted)
		.map((e: any) => ({
			year: e.year,
			title: e.degree || e.title,
			org: e.institution,
			description: e.description,
			image: e.image,
			tags: e.tags,
			awards: e.awards?.map((a: any) => a.name),
			team: e.team,
			project: e.projects?.[0],
		})),
].sort((a, b) => {
	const yearA = parseInt(a.year.split("-")[0]);
	const yearB = parseInt(b.year.split("-")[0]);
	return yearB - yearA;
});

const TimelineAbout: React.FC = () => {
	return (
		<ParallaxProvider>
			{sortetExperience.map((item, index) => (
				<TimelineSection
					key={index}
					year={item.year}
					title={item.title}
					company={item.org}
					description={item.description}
					image={item.image}
					technologies={item.tags}
					project={item.project}
					awards={item.awards}
					team={item.team}
					reverse={index % 2 === 0}
				/>
			))}
		</ParallaxProvider>
	);
};

export default TimelineAbout;
