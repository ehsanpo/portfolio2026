import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
	cursorFollower,
	spotlight,
	type CursorFollowerOptions,
	type SpotlightOptions,
} from "./cursor";

export interface CursorSpotlightProps extends SpotlightOptions {
	children: ReactNode;
	className?: string;
}

/**
 * Opt-in container that renders a fine-pointer radial spotlight behind its children.
 * Automatically disabled on touch devices and when `prefers-reduced-motion: reduce` is active.
 */
export function CursorSpotlight({
	children,
	className,
	size,
	color,
	duration,
	ease,
}: CursorSpotlightProps) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		return spotlight(el, { size, color, duration, ease });
	}, [size, color, duration, ease]);

	return (
		<div ref={ref} className={cn("relative overflow-hidden", className)}>
			{children}
		</div>
	);
}

export interface CursorFollowerProps extends Omit<CursorFollowerOptions, "container"> {
	children: ReactNode;
	/** Render content inside the floating follower badge. */
	followerContent?: ReactNode;
	className?: string;
	followerClassName?: string;
}

/**
 * Opt-in scoped container with a smooth GSAP `quickTo` cursor follower badge.
 * Never hijacks the global OS cursor outside its container.
 */
export function CursorFollower({
	children,
	followerContent,
	className,
	followerClassName,
	duration,
	ease,
	offsetX,
	offsetY,
	fadeOnLeave = true,
}: CursorFollowerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const followerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		const follower = followerRef.current;
		if (!container || !follower) return;
		return cursorFollower(follower, {
			container,
			duration,
			ease,
			offsetX,
			offsetY,
			fadeOnLeave,
		});
	}, [duration, ease, offsetX, offsetY, fadeOnLeave]);

	return (
		<div ref={containerRef} className={cn("relative", className)}>
			{children}
			<div
				ref={followerRef}
				aria-hidden="true"
				className={cn(
					"pointer-events-none absolute top-0 left-0 z-30 opacity-0",
					followerClassName
				)}
			>
				{followerContent ?? (
					<span className="block size-3 border-[1.5px] border-ink bg-mustard" />
				)}
			</div>
		</div>
	);
}
