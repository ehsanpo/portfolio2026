import React from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExternalLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	showIcon?: boolean;
}

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
				"text-primary hover:text-secondary flex items-center gap-1 underline-offset-4 transition-colors hover:underline",
				className
			)}
		>
			{children}
			{showIcon && <ExternalLinkIcon className="h-3 w-3" />}
		</a>
	);
};

export default ExternalLink;
