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

const DEFAULT_INTENSITY = 15;
const DEFAULT_GLOW_COLOR = "rgba(255, 255, 255, 0.3)";
const PERSPECTIVE = 1200;
const SCALE_FACTOR = 1.02;
const GLOW_OFFSET_MULTIPLIER = 20;
const SHINE_POSITION_MULTIPLIER = 50;

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
			className={`group group/card relative w-full cursor-pointer ${className}`}
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
				className="relative h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform"
				style={{
					transformStyle: "preserve-3d",
					transform: `
						rotateX(calc(var(--y, 0) * var(--intensity, 0) * -1deg)) 
						rotateY(calc(var(--x, 0) * var(--intensity, 0) * 1deg))
						scale3d(${SCALE_FACTOR}, ${SCALE_FACTOR}, ${SCALE_FACTOR})
					`,
				}}
			>
				<div
					className="absolute inset-4 rounded-2xl opacity-0 blur-2xl transition-all duration-500 group-hover/card:opacity-50"
					style={{
						transform: "translateZ(-50px)",
						background: glowColor,
						left: `calc(var(--x, 0) * -${GLOW_OFFSET_MULTIPLIER}px)`,
						top: `calc(var(--y, 0) * -${GLOW_OFFSET_MULTIPLIER}px)`,
					}}
				/>

				<div className="relative z-10 h-full w-full" style={{ transformStyle: "preserve-3d" }}>
					<div
						className={cn(
							"bg-opium absolute inset-0 rounded-2xl border border-white/15 bg-linear-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-2xl transition-colors duration-500 dark:bg-transparent",
							childClassName
						)}
					/>

					{/* Radial glow */}
					<div
						className="pointer-events-none absolute inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-30"
						style={{
							background: `radial-gradient(circle at calc(50% + var(--x, 0) * ${SHINE_POSITION_MULTIPLIER}%) calc(50% + var(--y, 0) * ${SHINE_POSITION_MULTIPLIER}%), ${glowColor}, transparent 50%)`,
						}}
					/>

					{/* Shine effect */}
					{shine && (
						<div
							className="pointer-events-none absolute inset-px rounded-2xl opacity-0 blur-sm transition-opacity duration-500 group-hover/card:opacity-10"
							style={{
								background: `linear-gradient(135deg, transparent 10%, white calc(10% + var(--x, 0) * 90%), transparent 65%)`,
							}}
						/>
					)}

					<div
						className="preserve-3d relative z-20 h-full w-full"
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
