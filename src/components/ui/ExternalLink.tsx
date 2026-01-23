import React from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExternalLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	showIcon?: boolean;
}

/**
 * ExternalLink - Link component for external URLs with security attributes
 *
 * Automatically adds target="_blank" and rel="noopener noreferrer" for security.
 * Optionally shows an external link icon.
 *
 * @example
 * <ExternalLink href="https://github.com">GitHub</ExternalLink>
 * <ExternalLink href="https://example.com" showIcon={false}>Example</ExternalLink>
 */
export const ExternalLink: React.FC<ExternalLinkProps> = ({
	href,
	children,
	className,
	showIcon = true,
}) => {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"flex items-center gap-1 text-primary underline-offset-4 transition-colors hover:text-secondary hover:underline",
				className
			)}
		>
			{children}
			{showIcon && <ExternalLinkIcon className="h-3 w-3" />}
		</a>
	);
};

export default ExternalLink;
