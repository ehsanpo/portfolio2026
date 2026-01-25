import React from "react";
import { cn } from "@/lib/utils";

interface LinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;

	external?: boolean;
}

export const Link: React.FC<LinkProps> = ({ href, children, className, external = false }) => {
	const isExternal = external || href.startsWith("http") || href.startsWith("//");

	return (
		<a
			href={href}
			className={cn(
				"text-primary hover:text-secondary underline-offset-4 transition-colors hover:underline",
				className
			)}
			{...(isExternal
				? {
						target: "_blank",
						rel: "noopener noreferrer",
					}
				: {})}
		>
			{children}
		</a>
	);
};

export default Link;
