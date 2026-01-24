import type { CSSProperties } from "react";

interface BlinkingLEDProps {
	color?: string;
	size?: number;
	height?: number;
	width?: number;
	durationSec?: number;
	className?: string;
}

export function BlinkingLED({
	color = "#efb503",
	size = 10,
	height = 1,
	width = 100,
	durationSec = 2,
	className,
}: BlinkingLEDProps) {
	const style: CSSProperties = {
		width: width,
		height: height,
		color,
		backgroundColor: "currentColor",
		borderRadius: 9999,
		boxShadow: `0 0 ${Math.max(4, size)}px ${Math.max(1, Math.floor(size / 3))}px currentColor`,
		opacity: 1,
		animation: `blink-led ${durationSec}s ease-in-out infinite`,
		pointerEvents: "none",
	};

	return (
		<>
			<style>
				{`
          @keyframes blink-led {
            0% { opacity: 0.25; }
            35% { opacity: 0.9; }
            55% { opacity: 1; }
            60% { opacity: 1; }
            75% { opacity: 0.6; }
            100% { opacity: 0; }
          }
        `}
			</style>
			<div className={className} style={style} aria-hidden="true" />
		</>
	);
}
