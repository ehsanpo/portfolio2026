import React from "react";
import { ExternalLink } from "lucide-react";

interface ProjectLinkProps {
	href: string;
	title: string;
}

export const ProjectLink: React.FC<ProjectLinkProps> = ({ href, title }) => {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-2 text-amber-400 transition-colors hover:text-amber-300"
		>
			<ExternalLink size={16} />
			<span className="underline">{title}</span>
		</a>
	);
};
