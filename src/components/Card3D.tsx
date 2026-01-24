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

/**
 * Card3D: A high-performance 3D tilt component driven by CSS variables.
 * Offloading the transform calculations to CSS ensures smooth interactions
 * without React render-cycle lag.
 */
export const Card3D: React.FC<Card3DProps> = ({
	children,
	className = "",
	childClassName = "",
	intensity = 15,
	glowColor = "rgba(255, 255, 255, 0.3)",
	shine = true,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return;

		const { left, top, width, height } = containerRef.current.getBoundingClientRect();

		// Calculate mouse position as a percentage from center (-0.5 to 0.5)
		const px = (e.clientX - left) / width - 0.5;
		const py = (e.clientY - top) / height - 0.5;

		// Set CSS variables for the tilt
		containerRef.current.style.setProperty("--x", (px * 2).toString()); // -1 to 1
		containerRef.current.style.setProperty("--y", (py * 2).toString()); // -1 to 1
	};

	const roundedIntensity = intensity * 0.8;

	return (
		<div
			ref={containerRef}
			className={`group group/card relative w-full cursor-pointer ${className}`}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false);
				if (containerRef.current) {
					containerRef.current.style.setProperty("--x", "0");
					containerRef.current.style.setProperty("--y", "0");
				}
			}}
			style={
				{
					perspective: "1200px",
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
            scale3d(1.02, 1.02, 1.02)
          `,
				}}
			>
				{/* Dynamic Shadow - Tilts with card */}
				<div
					className="absolute inset-4 rounded-[16px] opacity-0 blur-[40px] transition-all duration-500 group-hover/card:opacity-50"
					style={{
						transform: "translateZ(-50px)",
						background: glowColor,
						left: "calc(var(--x, 0) * -20px)",
						top: "calc(var(--y, 0) * -20px)",
					}}
				/>

				{/* Content Container */}
				<div className="relative z-10 h-full w-full" style={{ transformStyle: "preserve-3d" }}>
					{/* Base Card Layer - Single source of border and radius */}
					<div
						className={cn(
							"absolute inset-0 rounded-[16px] border border-white/15 bg-linear-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-2xl",
							childClassName
						)}
					/>

					{/* Glow Layer */}
					<div
						className="pointer-events-none absolute inset-px rounded-[16px] opacity-0 transition-opacity duration-300 group-hover/card:opacity-30"
						style={{
							background: `radial-gradient(circle at calc(50% + var(--x, 0) * 50%) calc(50% + var(--y, 0) * 50%), ${glowColor}, transparent 50%)`,
						}}
					/>

					{/* Shine Layer - Subtle and narrowed */}
					{shine && (
						<div
							className="pointer-events-none absolute inset-px rounded-[16px] opacity-0 blur-sm transition-opacity duration-500 group-hover/card:opacity-10"
							style={{
								background: `linear-gradient(135deg, transparent 10%, white calc(10% + var(--x, 0) * 90%), transparent 65%)`,
							}}
						/>
					)}

					{/* Final Content */}
					<div className="relative z-20 h-full w-full" style={{ transformStyle: "preserve-3d" }}>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card3D;
