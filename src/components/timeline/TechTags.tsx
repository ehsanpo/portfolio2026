import React from "react";

interface TechTagsProps {
	technologies: string[];
}

export const TechTags: React.FC<TechTagsProps> = ({ technologies }) => {
	return (
		<div className="my-4 flex flex-wrap gap-2">
			{technologies.map((tech, index) => (
				<span
					key={index}
					className="rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs text-white/70"
				>
					{tech}
				</span>
			))}
		</div>
	);
};
