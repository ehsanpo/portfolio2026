import React, { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Card3DProps {
	children: ReactNode;
	className?: string;
	childClassName?: string;
	intensity?: number;
	glowColor?: string;
	shine?: boolean;
}

const DEFAULT_INTENSITY = 10;
const DEFAULT_GLOW_COLOR = "rgba(244, 184, 41, 0.22)";
const PERSPECTIVE = 1200;
const SCALE_FACTOR = 1.015;
const SHINE_POSITION_MULTIPLIER = 45;

export const Card3D: React.FC<Card3DProps> = ({
	children,
	className = "",
	childClassName = "",
	intensity = DEFAULT_INTENSITY,
	glowColor = DEFAULT_GLOW_COLOR,
	shine = true,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;

		const rect = containerRef.current.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width - 0.5;
		const py = (e.clientY - rect.top) / rect.height - 0.5;

		containerRef.current.style.setProperty("--x", (px * 2).toString());
		containerRef.current.style.setProperty("--y", (py * 2).toString());
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		if (containerRef.current) {
			containerRef.current.style.setProperty("--x", "0");
			containerRef.current.style.setProperty("--y", "0");
		}
	};

	const roundedIntensity = intensity * 0.8;

	return (
		<div
			ref={containerRef}
			className={cn("group group/card relative w-full cursor-pointer", className)}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={handleMouseLeave}
			style={
				{
					perspective: `${PERSPECTIVE}px`,
					"--intensity": roundedIntensity,
					"--hover": isHovered ? "1" : "0",
				} as React.CSSProperties
			}
		>
			<div
				className="relative h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform"
				style={{
					transformStyle: "preserve-3d",
					transform: isHovered
						? `
							rotateX(calc(var(--y, 0) * var(--intensity, 0) * -1deg)) 
							rotateY(calc(var(--x, 0) * var(--intensity, 0) * 1deg))
							scale3d(${SCALE_FACTOR}, ${SCALE_FACTOR}, ${SCALE_FACTOR})
						`
						: "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
				}}
			>
				<div className="relative z-10 h-full w-full" style={{ transformStyle: "preserve-3d" }}>
					<div
						className={cn(
							"on-paper bg-cream text-ink absolute inset-0 border-[1.5px] border-ink transition-shadow duration-200",
							childClassName
						)}
						style={{
							boxShadow: isHovered
								? `calc(6px + var(--x, 0) * -4px) calc(6px + var(--y, 0) * -4px) 0px var(--ink)`
								: `4px 4px 0px var(--ink)`,
						}}
					/>

					{/* Crisp 0-radius paper-sheen highlight */}
					<div
						className="pointer-events-none absolute inset-[1.5px] opacity-0 transition-opacity duration-200 group-hover/card:opacity-25"
						style={{
							background: `radial-gradient(circle at calc(50% + var(--x, 0) * ${SHINE_POSITION_MULTIPLIER}%) calc(50% + var(--y, 0) * ${SHINE_POSITION_MULTIPLIER}%), ${glowColor}, transparent 60%)`,
						}}
					/>

					{shine && (
						<div
							className="pointer-events-none absolute inset-[1.5px] opacity-0 transition-opacity duration-300 group-hover/card:opacity-15"
							style={{
								background: `linear-gradient(135deg, transparent 15%, rgba(255, 255, 255, 0.7) calc(15% + var(--x, 0) * 70%), transparent 65%)`,
							}}
						/>
					)}

					<div
						className="preserve-3d on-paper text-ink relative z-20 h-full w-full"
						style={{ transformStyle: "preserve-3d" }}
					>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card3D;
