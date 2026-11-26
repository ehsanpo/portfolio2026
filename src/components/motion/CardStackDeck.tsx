import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type KeyboardEvent,
	type PointerEvent as ReactPointerEvent,
	type ReactNode,
} from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "./hover";

export interface CardStackItem {
	id: string;
	content: ReactNode;
	label?: string;
}

export interface CardStackDeckProps {
	items: CardStackItem[];
	initialIndex?: number;
	className?: string;
	cardClassName?: string;
	showControls?: boolean;
	showCounter?: boolean;
	ariaLabel?: string;
	onActiveChange?: (index: number, item: CardStackItem) => void;
}

const MAX_VISIBLE_LAYERS = 4;
const DRAG_THRESHOLD_PX = 80;

/**
 * Museum of Motion — Stack exhibit (`CardStackDeck`).
 * Interactive card deck with click-to-cycle, pointer drag-to-flick, Next/Prev controls,
 * keyboard arrow navigation, zero border-radius, and `prefers-reduced-motion` fallback.
 */
export function CardStackDeck({
	items,
	initialIndex = 0,
	className,
	cardClassName,
	showControls = true,
	showCounter = true,
	ariaLabel = "Interactive card stack",
	onActiveChange,
}: CardStackDeckProps) {
	const count = items.length;
	const safeInitial = count > 0 ? ((initialIndex % count) + count) % count : 0;
	const [activeIndex, setActiveIndex] = useState(safeInitial);

	const topCardRef = useRef<HTMLDivElement>(null);
	const dragState = useRef<{
		pointerId: number | null;
		startX: number;
		startY: number;
		dx: number;
		dy: number;
		moved: boolean;
		animating: boolean;
	}>({
		pointerId: null,
		startX: 0,
		startY: 0,
		dx: 0,
		dy: 0,
		moved: false,
		animating: false,
	});

	const step = useCallback(
		(delta: 1 | -1) => {
			if (count <= 1) return;
			setActiveIndex((prev) => {
				const next = (prev + delta + count) % count;
				const nextItem = items[next];
				if (nextItem) onActiveChange?.(next, nextItem);
				return next;
			});
		},
		[count, items, onActiveChange]
	);

	const flyAndStep = useCallback(
		(direction: 1 | -1) => {
			if (count <= 1 || dragState.current.animating) return;
			const el = topCardRef.current;
			if (!el || prefersReducedMotion()) {
				step(direction);
				return;
			}

			dragState.current.animating = true;
			const exitX = direction === 1 ? -Math.max(el.offsetWidth * 0.75, 220) : Math.max(el.offsetWidth * 0.75, 220);
			gsap.to(el, {
				x: exitX,
				y: -12,
				rotation: direction === 1 ? -6 : 6,
				opacity: 0,
				duration: 0.28,
				ease: "power2.in",
				onComplete: () => {
					gsap.set(el, { clearProps: "transform,opacity" });
					dragState.current.animating = false;
					step(direction);
				},
			});
		},
		[count, step]
	);

	useEffect(() => {
		const el = topCardRef.current;
		return () => {
			if (el) gsap.killTweensOf(el);
		};
	}, [activeIndex]);

	const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (count <= 1 || dragState.current.animating) return;
		if (event.button !== 0 && event.pointerType === "mouse") return;
		const target = event.target as HTMLElement | null;
		if (target?.closest("a, button, input, textarea, select")) return;

		dragState.current.pointerId = event.pointerId;
		dragState.current.startX = event.clientX;
		dragState.current.startY = event.clientY;
		dragState.current.dx = 0;
		dragState.current.dy = 0;
		dragState.current.moved = false;
		event.currentTarget.setPointerCapture(event.pointerId);
	};

	const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (dragState.current.pointerId !== event.pointerId) return;
		const dx = event.clientX - dragState.current.startX;
		const dy = event.clientY - dragState.current.startY;
		dragState.current.dx = dx;
		dragState.current.dy = dy;
		if (Math.hypot(dx, dy) > 6) {
			dragState.current.moved = true;
		}
		const el = topCardRef.current;
		if (!el || prefersReducedMotion()) return;
		gsap.set(el, {
			x: dx,
			y: dy * 0.25,
			rotation: gsap.utils.clamp(-10, 10, dx * 0.04),
		});
	};

	const settleDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (dragState.current.pointerId !== event.pointerId) return;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
		const { dx, moved } = dragState.current;
		dragState.current.pointerId = null;

		if (!moved) {
			flyAndStep(1);
			return;
		}

		if (Math.abs(dx) >= DRAG_THRESHOLD_PX) {
			flyAndStep(dx < 0 ? 1 : -1);
			return;
		}

		const el = topCardRef.current;
		if (el && !prefersReducedMotion()) {
			gsap.to(el, {
				x: 0,
				y: 0,
				rotation: 0,
				duration: 0.45,
				ease: "elastic.out(1, 0.55)",
				clearProps: "transform",
			});
		}
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "ArrowRight" || event.key === "ArrowDown") {
			event.preventDefault();
			flyAndStep(1);
		} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
			event.preventDefault();
			flyAndStep(-1);
		}
	};

	if (count === 0) return null;

	const visibleCount = Math.min(count, MAX_VISIBLE_LAYERS);
	const orderedLayers = Array.from({ length: visibleCount }, (_, offset) => {
		const index = (activeIndex + offset) % count;
		const item = items[index]!;
		return { item, index, offset };
	}).reverse();

	return (
		<div
			role="region"
			aria-roledescription="card deck"
			aria-label={ariaLabel}
			tabIndex={0}
			onKeyDown={handleKeyDown}
			className={cn(
				"relative flex flex-col gap-4 outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
				className
			)}
		>
			<div className="relative grid min-h-[260px] select-none pb-8">
				{orderedLayers.map(({ item, offset }) => {
					const isTop = offset === 0;
					const translateY = offset * 10;
					const scale = 1 - offset * 0.04;
					const opacity = Math.max(0.35, 1 - offset * 0.18);

					return (
						<div
							key={item.id}
							ref={isTop ? topCardRef : undefined}
							aria-hidden={!isTop}
							onPointerDown={isTop ? handlePointerDown : undefined}
							onPointerMove={isTop ? handlePointerMove : undefined}
							onPointerUp={isTop ? settleDrag : undefined}
							onPointerCancel={isTop ? settleDrag : undefined}
							style={{
								gridArea: "1 / 1",
								zIndex: visibleCount - offset,
								transform: isTop
									? undefined
									: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
								opacity: isTop ? 1 : opacity,
								touchAction: isTop ? "pan-y" : undefined,
							}}
							className={cn(
								"rounded-none border-[1.5px] border-foreground bg-card text-card-foreground transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none",
								isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
								cardClassName
							)}
						>
							{item.content}
						</div>
					);
				})}
			</div>

			{(showControls || showCounter) && count > 1 && (
				<div className="flex items-center justify-between gap-4">
					{showCounter ? (
						<p className="label-mono text-muted-foreground" aria-live="polite">
							{String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
							{items[activeIndex]?.label ? ` — ${items[activeIndex].label}` : ""}
						</p>
					) : (
						<span />
					)}

					{showControls && (
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => flyAndStep(-1)}
								aria-label="Previous card"
								className="key bg-cream text-ink"
							>
								Prev
							</button>
							<button
								type="button"
								onClick={() => flyAndStep(1)}
								aria-label="Next card"
								className="key bg-ink text-cream"
							>
								Next
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
