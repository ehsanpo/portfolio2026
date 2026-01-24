import React from "react";
import { cn } from "../../lib/utils";

interface FireAnimationProps {
	readonly className?: string;
	readonly style?: React.CSSProperties;
}

export default function FireAnimation({ className, style }: FireAnimationProps) {
	return (
		<div
			className={cn("fire-sprite fire-animate", className)}
			style={{
				width: "192px",
				height: "172px",
				backgroundSize: "1344px 172px",
				...style,
			}}
		/>
	);
}
