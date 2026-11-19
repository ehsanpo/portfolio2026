import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./hover";

export interface RevealProps {
	children: ReactNode;
	y?: number;
	duration?: number;
	delay?: number;
	once?: boolean;
	className?: string;
}

export function Reveal({
	children,
	y = 18,
	duration = 0.55,
	delay = 0,
	once = true,
	className,
}: RevealProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || prefersReducedMotion()) return;

		let ctx: gsap.Context | null = null;
		const play = () => {
			ctx = gsap.context(() => {
				gsap.fromTo(
					el,
					{ y, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						duration,
						delay,
						ease: "power3.out",
						clearProps: "transform,opacity",
					}
				);
			}, el);
		};

		if (typeof IntersectionObserver === "undefined") {
			play();
			return () => ctx?.revert();
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					play();
					if (once) observer.disconnect();
				}
			},
			{ threshold: 0.12 }
		);
		observer.observe(el);

		return () => {
			observer.disconnect();
			ctx?.revert();
		};
	}, [y, duration, delay, once]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
