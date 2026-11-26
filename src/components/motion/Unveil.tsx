import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "./hover";

export type UnveilDirection = "up" | "down" | "left" | "right";
export type UnveilVariant = "wipe" | "arch" | "zoom";

export interface UnveilProps {
	children: ReactNode;
	direction?: UnveilDirection;
	variant?: UnveilVariant;
	duration?: number;
	delay?: number;
	triggerOnView?: boolean;
	threshold?: number;
	innerScale?: number;
	once?: boolean;
	className?: string;
}

export interface InitUnveilOptions {
	direction?: UnveilDirection;
	variant?: UnveilVariant;
	duration?: number;
	threshold?: number;
	innerScale?: number;
}

const CLIP_FROM: Record<UnveilDirection, string> = {
	up: "inset(100% 0% 0% 0%)",
	down: "inset(0% 0% 100% 0%)",
	left: "inset(0% 0% 0% 100%)",
	right: "inset(0% 100% 0% 0%)",
};

const CLIP_TO = "inset(0% 0% 0% 0%)";
const ARCH_FROM = "inset(100% 0% 0% 0% round 50% 50% 0% 0%)";
const ARCH_TO = "inset(0% 0% 0% 0% round 0% 0% 0% 0%)";
const ZOOM_FROM = "inset(12% 12% 12% 12%)";

function getClipKeyframes(variant: UnveilVariant, direction: UnveilDirection): { from: string; to: string } {
	if (variant === "arch") {
		return { from: ARCH_FROM, to: ARCH_TO };
	}
	if (variant === "zoom") {
		return { from: ZOOM_FROM, to: CLIP_TO };
	}
	return { from: CLIP_FROM[direction], to: CLIP_TO };
}

function isUnveilDirection(value: string | undefined): value is UnveilDirection {
	return value === "up" || value === "down" || value === "left" || value === "right";
}

function isUnveilVariant(value: string | undefined): value is UnveilVariant {
	return value === "wipe" || value === "arch" || value === "zoom";
}

function animateUnveilElement(
	el: HTMLElement,
	options: {
		direction: UnveilDirection;
		variant: UnveilVariant;
		duration: number;
		delay: number;
		innerScale: number;
	}
): void {
	const { from, to } = getClipKeyframes(options.variant, options.direction);
	const inner = options.innerScale !== 1 ? el.firstElementChild : null;

	gsap.fromTo(
		el,
		{ clipPath: from, opacity: 0.01 },
		{
			clipPath: to,
			opacity: 1,
			duration: options.duration,
			delay: options.delay,
			ease: "power3.out",
			overwrite: "auto",
			clearProps: "clipPath,opacity",
		}
	);

	if (inner instanceof HTMLElement) {
		gsap.fromTo(
			inner,
			{ scale: options.innerScale },
			{
				scale: 1,
				duration: options.duration * 1.15,
				delay: options.delay,
				ease: "power3.out",
				overwrite: "auto",
				clearProps: "transform",
			}
		);
	}
}

export function Unveil({
	children,
	direction = "up",
	variant = "wipe",
	duration = 0.65,
	delay = 0,
	triggerOnView = true,
	threshold = 0.15,
	innerScale = 1.08,
	once = true,
	className,
}: UnveilProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el || prefersReducedMotion()) return;

		const { from } = getClipKeyframes(variant, direction);
		const inner = innerScale !== 1 ? el.firstElementChild : null;
		let played = false;

		const ctx = gsap.context(() => {
			if (triggerOnView && typeof IntersectionObserver !== "undefined") {
				gsap.set(el, { clipPath: from, opacity: 0.01 });
				if (inner instanceof HTMLElement) {
					gsap.set(inner, { scale: innerScale });
				}
			}
		}, el);

		const play = () => {
			if (once && played) return;
			played = true;
			ctx.add(() => {
				animateUnveilElement(el, { direction, variant, duration, delay, innerScale });
			});
		};

		if (!triggerOnView || typeof IntersectionObserver === "undefined") {
			play();
			return () => ctx.revert();
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					play();
					if (once) observer.disconnect();
				}
			},
			{ threshold }
		);
		observer.observe(el);

		return () => {
			observer.disconnect();
			ctx.revert();
		};
	}, [direction, variant, duration, delay, triggerOnView, threshold, innerScale, once]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}

/**
 * Astro-friendly DOM initializer for Museum of Motion `Unveil` clip-path reveals.
 * Reads optional attributes:
 * - `data-unveil` / `data-unveil-direction`: "up" | "down" | "left" | "right"
 * - `data-unveil-variant`: "wipe" | "arch" | "zoom"
 * - `data-unveil-delay`: number (seconds)
 * - `data-unveil-duration`: number (seconds)
 * - `data-unveil-scale`: number (inner child scale settle, defaults to 1)
 */
export function initUnveilElements(
	selector = "[data-unveil]",
	defaults: InitUnveilOptions = {}
): () => void {
	if (typeof window === "undefined" || prefersReducedMotion()) {
		return () => {};
	}

	const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
	if (elements.length === 0) {
		return () => {};
	}

	const defaultDirection = defaults.direction ?? "up";
	const defaultVariant = defaults.variant ?? "wipe";
	const defaultDuration = defaults.duration ?? 0.65;
	const defaultThreshold = defaults.threshold ?? 0.15;
	const defaultInnerScale = defaults.innerScale ?? 1;

	const configs = new Map<
		HTMLElement,
		{
			direction: UnveilDirection;
			variant: UnveilVariant;
			duration: number;
			delay: number;
			innerScale: number;
		}
	>();

	const ctx = gsap.context(() => {
		for (const el of elements) {
			const rawDirection = el.dataset.unveilDirection || el.getAttribute("data-unveil") || el.getAttribute(selector.replace(/^\[|\]$/g, "")) || undefined;
			const direction = isUnveilDirection(rawDirection) ? rawDirection : defaultDirection;
			const variant = isUnveilVariant(el.dataset.unveilVariant) ? el.dataset.unveilVariant : defaultVariant;
			const parsedDelay = Number.parseFloat(el.dataset.unveilDelay ?? "");
			const parsedDuration = Number.parseFloat(el.dataset.unveilDuration ?? "");
			const parsedScale = Number.parseFloat(el.dataset.unveilScale ?? "");

			const config = {
				direction,
				variant,
				delay: Number.isFinite(parsedDelay) ? parsedDelay : 0,
				duration: Number.isFinite(parsedDuration) ? parsedDuration : defaultDuration,
				innerScale: Number.isFinite(parsedScale) ? parsedScale : defaultInnerScale,
			};
			configs.set(el, config);

			const { from } = getClipKeyframes(config.variant, config.direction);
			gsap.set(el, { clipPath: from, opacity: 0.01 });
			if (config.innerScale !== 1 && el.firstElementChild instanceof HTMLElement) {
				gsap.set(el.firstElementChild, { scale: config.innerScale });
			}
		}
	});

	if (typeof IntersectionObserver === "undefined") {
		ctx.add(() => {
			configs.forEach((config, el) => animateUnveilElement(el, config));
		});
		return () => ctx.revert();
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				const el = entry.target as HTMLElement;
				const config = configs.get(el);
				if (!config) continue;
				observer.unobserve(el);
				ctx.add(() => {
					animateUnveilElement(el, config);
				});
			}
		},
		{ threshold: defaultThreshold }
	);

	elements.forEach((el) => observer.observe(el));

	return () => {
		observer.disconnect();
		ctx.revert();
	};
}
