import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { TimelineSection } from "./TimelineSection";

interface LifeItem {
	year: string;
	title: string;
	org: string;
	description: string;
	image: string;
	tags: string[];
	project?: any;
	awards?: any;
	team?: any;
	highlighted?: boolean;
}

interface Props {
	lifeData: LifeItem[];
}

const TimelineLife: React.FC<Props> = ({ lifeData }) => {
	return (
		<ParallaxProvider>
			{lifeData.map((item, index) => (
				<TimelineSection
					key={index}
					year={item.year}
					title={item.title}
					company={item.org}
					description={item.description}
					image={item.image}
					technologies={item.tags}
					project={item.project || null}
					awards={item.awards || null}
					team={item.team || null}
					reverse={index % 2 === 0}
				/>
			))}
		</ParallaxProvider>
	);
};

export default TimelineLife;
