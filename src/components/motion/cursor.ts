// Adapted from johnpolacek/museum-of-motion (lib/motion/recipes/pointer-effects.ts).
// Pure GSAP quickTo pointer effects guarded by fine-pointer capability and prefers-reduced-motion.
import gsap from "gsap";
import { prefersReducedMotion, type Teardown } from "./hover";

export function supportsFinePointer(): boolean {
	if (typeof window === "undefined") return false;
	if (prefersReducedMotion()) return false;
	return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export interface CursorFollowerOptions {
	/** Scope pointer listeners to a specific container, or default to `window`. */
	container?: HTMLElement | null;
	duration?: number;
	ease?: string;
	offsetX?: number;
	offsetY?: number;
	fadeOnLeave?: boolean;
}

/**
 * Museum of Motion `cursorFollower`: tracks the pointer with GSAP `quickTo` at 60fps.
 * Only activates on `(hover: hover) and (pointer: fine)` when reduced motion is off.
 */
export function cursorFollower(
	follower: HTMLElement,
	{
		container = null,
		duration = 0.28,
		ease = "power3.out",
		offsetX = 0,
		offsetY = 0,
		fadeOnLeave = true,
	}: CursorFollowerOptions = {}
): Teardown {
	if (!supportsFinePointer()) return () => {};

	const ctx = gsap.context(() => {
		gsap.set(follower, {
			xPercent: -50,
			yPercent: -50,
			opacity: fadeOnLeave ? 0 : 1,
			willChange: "transform, opacity",
		});
	});

	const xTo = gsap.quickTo(follower, "x", { duration, ease });
	const yTo = gsap.quickTo(follower, "y", { duration, ease });

	let visible = !fadeOnLeave;

	const show = () => {
		if (visible) return;
		visible = true;
		gsap.to(follower, { opacity: 1, duration: 0.2, ease: "power2.out", overwrite: "auto" });
	};

	const hide = () => {
		if (!fadeOnLeave || !visible) return;
		visible = false;
		gsap.to(follower, { opacity: 0, duration: 0.2, ease: "power2.out", overwrite: "auto" });
	};

	const onMove = (event: PointerEvent) => {
		if (event.pointerType !== "mouse") return;
		if (container) {
			const rect = container.getBoundingClientRect();
			xTo(event.clientX - rect.left + offsetX);
			yTo(event.clientY - rect.top + offsetY);
		} else {
			xTo(event.clientX + offsetX);
			yTo(event.clientY + offsetY);
		}
		show();
	};

	const target: HTMLElement | Window = container ?? window;
	target.addEventListener("pointermove", onMove as EventListener, { passive: true });
	if (container) {
		container.addEventListener("pointerleave", hide);
	} else {
		document.addEventListener("pointerleave", hide);
	}

	return () => {
		target.removeEventListener("pointermove", onMove as EventListener);
		if (container) {
			container.removeEventListener("pointerleave", hide);
		} else {
			document.removeEventListener("pointerleave", hide);
		}
		gsap.killTweensOf(follower);
		ctx.revert();
	};
}

export interface HoverPreviewOptions {
	/** Selector for interactive triggers inside `container`. Defaults to `[data-cursor-preview]`. */
	selector?: string;
	duration?: number;
	ease?: string;
	offsetX?: number;
	offsetY?: number;
	onTargetChange?: (target: HTMLElement | null) => void;
}

/**
 * Museum of Motion `hoverPreview`: floats a preview card beside the pointer when hovering
 * matching `[data-cursor-preview]` triggers inside a container.
 */
export function hoverPreview(
	container: HTMLElement,
	preview: HTMLElement,
	{
		selector = "[data-cursor-preview]",
		duration = 0.26,
		ease = "power3.out",
		offsetX = 24,
		offsetY = -16,
		onTargetChange,
	}: HoverPreviewOptions = {}
): Teardown {
	if (!supportsFinePointer()) return () => {};

	const ctx = gsap.context(() => {
		gsap.set(preview, {
			opacity: 0,
			scale: 0.92,
			pointerEvents: "none",
			willChange: "transform, opacity",
		});
	});

	const xTo = gsap.quickTo(preview, "x", { duration, ease });
	const yTo = gsap.quickTo(preview, "y", { duration, ease });

	let activeTarget: HTMLElement | null = null;

	const setActive = (next: HTMLElement | null) => {
		if (next === activeTarget) return;
		activeTarget = next;
		onTargetChange?.(next);
		if (next) {
			gsap.to(preview, { opacity: 1, scale: 1, duration: 0.24, ease: "power3.out", overwrite: "auto" });
		} else {
			gsap.to(preview, { opacity: 0, scale: 0.92, duration: 0.2, ease: "power2.out", overwrite: "auto" });
		}
	};

	const onMove = (event: PointerEvent) => {
		if (event.pointerType !== "mouse") return;
		const rect = container.getBoundingClientRect();
		xTo(event.clientX - rect.left + offsetX);
		yTo(event.clientY - rect.top + offsetY);

		const el = event.target instanceof HTMLElement ? event.target.closest<HTMLElement>(selector) : null;
		setActive(el && container.contains(el) ? el : null);
	};

	const onLeave = () => {
		setActive(null);
	};

	container.addEventListener("pointermove", onMove, { passive: true });
	container.addEventListener("pointerleave", onLeave);

	return () => {
		container.removeEventListener("pointermove", onMove);
		container.removeEventListener("pointerleave", onLeave);
		gsap.killTweensOf(preview);
		ctx.revert();
	};
}

export interface SpotlightOptions {
	/** Diameter in px of the radial spotlight glow. */
	size?: number;
	/** CSS color of the radial spotlight center. */
	color?: string;
	duration?: number;
	ease?: string;
}

/**
 * Museum of Motion `spotlight`: renders a GPU-friendly radial glow that follows the pointer
 * inside `container` using GSAP `quickTo` on CSS custom properties.
 */
export function spotlight(
	container: HTMLElement,
	{
		size = 420,
		color = "rgba(244, 184, 41, 0.16)",
		duration = 0.25,
		ease = "power3.out",
	}: SpotlightOptions = {}
): Teardown {
	if (!supportsFinePointer()) return () => {};

	const prevPosition = container.style.position;
	const needsPosition = getComputedStyle(container).position === "static";
	if (needsPosition) {
		container.style.position = "relative";
	}

	const layer = document.createElement("div");
	layer.dataset.cursorSpotlight = "";
	layer.setAttribute("aria-hidden", "true");
	layer.style.cssText =
		`position:absolute;inset:0;pointer-events:none;opacity:0;z-index:0;` +
		`background:radial-gradient(${size}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${color}, transparent 75%);` +
		`will-change:opacity`;

	container.prepend(layer);

	const pos = { x: container.clientWidth / 2, y: container.clientHeight / 2 };
	const xTo = gsap.quickTo(pos, "x", {
		duration,
		ease,
		onUpdate: () => {
			layer.style.setProperty("--spotlight-x", `${pos.x}px`);
		},
	});
	const yTo = gsap.quickTo(pos, "y", {
		duration,
		ease,
		onUpdate: () => {
			layer.style.setProperty("--spotlight-y", `${pos.y}px`);
		},
	});

	let active = false;

	const onMove = (event: PointerEvent) => {
		if (event.pointerType !== "mouse") return;
		const rect = container.getBoundingClientRect();
		xTo(event.clientX - rect.left);
		yTo(event.clientY - rect.top);
		if (!active) {
			active = true;
			gsap.to(layer, { opacity: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
		}
	};

	const onLeave = () => {
		if (!active) return;
		active = false;
		gsap.to(layer, { opacity: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
	};

	container.addEventListener("pointermove", onMove, { passive: true });
	container.addEventListener("pointerleave", onLeave);

	return () => {
		container.removeEventListener("pointermove", onMove);
		container.removeEventListener("pointerleave", onLeave);
		gsap.killTweensOf(pos);
		gsap.killTweensOf(layer);
		layer.remove();
		if (needsPosition) {
			container.style.position = prevPosition;
		}
	};
}
