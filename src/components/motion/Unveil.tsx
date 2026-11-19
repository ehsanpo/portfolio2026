import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./hover";

export interface UnveilProps {
	children: ReactNode;
	direction?: "up" | "down" | "left" | "right";
	duration?: number;
	delay?: number;
	className?: string;
}

const CLIP_FROM: Record<NonNullable<UnveilProps["direction"]>, string> = {
	up: "inset(100% 0% 0% 0%)",
	down: "inset(0% 0% 100% 0%)",
	left: "inset(0% 0% 0% 100%)",
	right: "inset(0% 100% 0% 0%)",
};

export function Unveil({
	children,
	direction = "up",
	duration = 0.65,
	delay = 0,
	className,
}: UnveilProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || prefersReducedMotion()) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				el,
				{ clipPath: CLIP_FROM[direction], opacity: 0.01 },
				{
					clipPath: "inset(0% 0% 0% 0%)",
					opacity: 1,
					duration,
					delay,
					ease: "power3.out",
					clearProps: "clipPath,opacity",
				}
			);
		}, el);

		return () => ctx.revert();
	}, [direction, duration, delay]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
