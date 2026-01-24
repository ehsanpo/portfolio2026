import React from "react";
import { cn } from "@/lib/utils";

interface LinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	/** Internal link (uses client-side routing) or external */
	external?: boolean;
}

/**
 * Link - Simple text link component for navigation
 *
 * Use this for inline text links, navigation menus, and footer links.
 * For buttons/CTAs, use the Button component instead.
 *
 * @example
 * <Link href="/about">Learn more</Link>
 * <Link href="https://example.com" external>Visit site</Link>
 */
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
