import React from "react";
import { ParallaxBanner, Parallax } from "react-scroll-parallax";
import { Award } from "lucide-react";
import { Project } from "./Project";
import { TechTags } from "./TechTags";
import TeamSection from "../team/TeamSection";

interface TimelineSectionProps {
	year: string;
	title: string;
	company: string;
	description: string;
	image: string;
	technologies: string[];
	project?: {
		title: string;
		description: string;
		image?: string;
		link?: {
			href: string;
			title: string;
		};
		github?: string;
		technologies: string[];
	};
	awards?: string[];
	team?: {
		name: string;
		role: string;
		linkedin?: string;
		img?: string;
	}[];
	reverse?: boolean;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
	year,
	title,
	company,
	description,
	image,
	technologies,
	project,
	awards,
	team,
	reverse = false,
}) => {
	return (
		<section className={`relative ${reverse ? "clip -my-2" : ""}`}>
			<ParallaxBanner
				layers={[
					{
						image,
						speed: -20,
						opacity: [0.8, 1],
					},
				]}
				className="relative"
			>
				<div className="inset-0 bg-black/50 py-16">
					<Parallax speed={-25}>
						<div
							className={`font-basement text-secondary-500 absolute right-[5%] left-[5%] container text-8xl ${
								reverse ? "text-left" : "text-right"
							}`}
						>
							{year}
						</div>
					</Parallax>

					<div
						className={`container mx-auto flex h-full items-center ${
							reverse ? "justify-end" : "justify-start"
						}`}
					>
						<div
							className={`max-w-xl ${
								reverse ? "ml-auto" : "mr-auto"
							} rounded-lg border border-white/10 bg-black/40 p-8 text-white backdrop-blur-md`}
						>
							<h2 className="text-primary-500 mb-1 text-xl font-bold md:text-4xl">{company}</h2>
							<h3 className="text-secondary-500/90 mb-2 text-base md:text-2xl">{title}</h3>
							<p className="mb-4 leading-relaxed text-white/80">{description}</p>

							<TechTags technologies={technologies} />

							{project && Object.keys(project).length > 0 && <Project {...project} />}

							{awards && awards.length > 0 && (
								<div className="mb-4 space-y-2">
									<div className="mt-6 flex items-center gap-2 text-amber-400">
										<Award size={20} />
										<span className="font-semibold">Awards</span>
									</div>
									{awards.map((award, index) => (
										<div key={index} className="ml-7 text-sm text-white/70">
											{award}
										</div>
									))}
								</div>
							)}

							{team && team.length > 0 && <TeamSection team={team} />}
						</div>
					</div>
				</div>
			</ParallaxBanner>
		</section>
	);
};
