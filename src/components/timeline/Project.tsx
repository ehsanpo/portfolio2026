import { ProjectLink } from "./ProjectLink";
import { Parallax } from "react-scroll-parallax";

interface ProjectProps {
	title: string;
	description: string;
	image?: string;
	link?: {
		href: string;
		title: string;
	};
	github?: string;
	technologies: string[];
}

export const Project: React.FC<ProjectProps> = ({
	title,
	description,
	image,
	link,
	github,
	technologies,
}) => {
	return (
		<Parallax translateY={[-2, 4]}>
			<div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
				<h4 className="mb-2 text-lg font-semibold text-amber-400">{title}</h4>
				<p className="mb-4 text-sm text-white/70">{description}</p>

				{image && (
					<img src={image} alt={title} className="mb-4 h-32 w-full rounded-md object-cover" />
				)}

				<div className="mb-4 flex flex-wrap gap-2">
					{technologies.map((tech, index) => (
						<span
							key={index}
							className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-xs text-white/70"
						>
							{tech}
						</span>
					))}
				</div>

				{link && (
					<div className="mb-3 flex gap-4">
						<ProjectLink {...link} />
					</div>
				)}
			</div>
		</Parallax>
	);
};
