import React from "react";
import type { HeadingLevel } from "./types";
import { cn } from "@/lib/utils";

interface Props {
	level?: HeadingLevel;
	subtitle?: string;
	gradient?: boolean;
	shadow?: boolean;
	floating?: boolean;
	className?: string;
	children?: React.ReactNode;
	backplate?: boolean;
	style?: React.CSSProperties;
}

const Heading: React.FC<Props> = ({
	level = "h2",
	subtitle,
	gradient: _gradient = false,
	shadow: _shadow = false,
	floating = false,
	className = "",
	children,
	backplate: _backplate,
	style,
}) => {
	const Tag = level || "h2";

	return (
		<Tag
			className={cn(
				"font-sans font-bold tracking-[-0.04em] leading-[1.02] text-current text-3xl md:text-5xl",
				floating && "transition-transform duration-150 hover:-translate-y-0.5",
				className
			)}
			style={style}
		>
			<span className="relative z-10">{children}</span>

			{subtitle && (
				<span className="mt-3 block font-mono text-xs font-normal tracking-[0.14em] uppercase text-muted-foreground">
					{subtitle}
				</span>
			)}
		</Tag>
	);
};

export default Heading;
