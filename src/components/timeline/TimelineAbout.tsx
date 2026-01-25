import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { TimelineSection } from "./TimelineSection";
import { getPortfolioData } from "../../utils/client-data";

const { experience } = await getPortfolioData();
const experienceHighlight = experience.filter((item) => item.highlighted === true);
const sortetExperience = experienceHighlight.sort((a, b) => parseInt(a.year) - parseInt(b.year));

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
