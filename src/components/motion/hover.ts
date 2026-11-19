// Adapted from johnpolacek/museum-of-motion (lib/motion/recipes/hover-effects.ts).
// Transform-only hover treatments with unified mouse + :focus-visible hotState and full teardown.
import gsap from "gsap";

export function prefersReducedMotion(): boolean {
	if (typeof window === "undefined") return true;
	const choice = document.documentElement.dataset.motion;
	if (choice === "reduced") return true;
	if (choice === "full") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const ROLL = { duration: 0.35, ease: "power3.out" } as const;
const SWEEP = { duration: 0.3, ease: "power2.out" } as const;

export type Teardown = () => void;
type Register = (fn: () => void) => void;

/**
 * Runs setup in a GSAP context. `dispose` stops writers and listeners before the revert;
 * `after` restores once it is done. Teardown runs once and rolls back a setup that threw.
 */
function own(setup: (dispose: Register, after: Register) => void): Teardown {
	const ctx = gsap.context(() => {});
	const disposers: Array<() => void> = [];
	const restores: Array<() => void> = [];
	let done = false;
	const teardown = () => {
		if (done) return;
		done = true;
		let failure: unknown;
		const attempt = (fn: () => void) => {
			try {
				fn();
			} catch (error) {
				failure ??= error;
			}
		};
		disposers.splice(0).reverse().forEach(attempt);
		attempt(() => ctx.revert());
		restores.splice(0).reverse().forEach(attempt);
		if (failure) throw failure;
	};
	let failure: { error: unknown } | undefined;
	ctx.add(() => {
		try {
			setup(
				(fn) => disposers.push(fn),
				(fn) => restores.push(fn)
			);
		} catch (error) {
			failure = { error };
		}
	});
	if (failure) {
		teardown();
		throw failure.error;
	}
	return teardown;
}

const MOTION_PROPS = ["transform", "translate", "rotate", "scale", "opacity", "visibility"];

function snapshotStyles(elements: HTMLElement[], props = MOTION_PROPS): () => void {
	const saved = elements.map((element) =>
		props.map((prop) => [element.style.getPropertyValue(prop), element.style.getPropertyPriority(prop)] as const)
	);
	return () =>
		elements.forEach((element, i) => {
			gsap.set(element, { clearProps: props.filter((prop) => !prop.startsWith("--")).join(",") });
			props.forEach((prop, j) => {
				const [value, priority] = saved[i]?.[j] ?? ["", ""];
				if (value) element.style.setProperty(prop, value, priority);
				else element.style.removeProperty(prop);
			});
		});
}

function listen<K extends keyof HTMLElementEventMap>(
	dispose: Register,
	target: HTMLElement,
	type: K,
	handler: (event: HTMLElementEventMap[K]) => void
): void {
	target.addEventListener(type, handler as EventListener);
	dispose(() => target.removeEventListener(type, handler as EventListener));
}

type HotHandlers = { on: () => void; off: () => void };

/**
 * Mouse hover (`pointerType === "mouse"`) and `:focus-visible` share one hot state;
 * touch/pen/click-derived focus never stick after a tap unless `touch` is enabled.
 */
function hotState(dispose: Register, control: HTMLElement, { on, off }: HotHandlers, touch = false): void {
	let hovered = false;
	let focused = false;
	let pressed = false;
	let hot = false;
	const update = () => {
		const next = hovered || focused || pressed;
		if (next === hot) return;
		hot = next;
		(hot ? on : off)();
	};
	listen(dispose, control, "pointerenter", (event) => {
		if (event.pointerType !== "mouse") return;
		hovered = true;
		update();
	});
	listen(dispose, control, "pointerleave", (event) => {
		if (event.pointerType !== "mouse") return;
		hovered = false;
		update();
	});
	if (touch) {
		listen(dispose, control, "pointerdown", (event) => {
			if (event.pointerType === "mouse") return;
			pressed = true;
			update();
		});
		const lift = (event: PointerEvent) => {
			if (event.pointerType === "mouse" || !pressed) return;
			pressed = false;
			update();
		};
		listen(dispose, control, "pointerup", lift);
		listen(dispose, control, "pointercancel", lift);
	}
	listen(dispose, control, "focusin", () => {
		if (!control.matches(":focus-visible")) return;
		focused = true;
		update();
	});
	listen(dispose, control, "focusout", (event) => {
		if (control.contains(event.relatedTarget as Node | null)) return;
		focused = false;
		update();
	});
}

function crossing(target: HTMLElement, event: PointerEvent | null) {
	const box = target.getBoundingClientRect();
	return {
		box,
		x: event ? event.clientX - box.left : box.width / 2,
		y: event ? event.clientY - box.top : box.height / 2,
	};
}

type LiquidHandlers = {
	on: (event: PointerEvent | null) => void;
	off: (event: PointerEvent | null) => void;
	move?: (event: PointerEvent) => void;
};

function liquidState(dispose: Register, control: HTMLElement, { on, off, move }: LiquidHandlers, touch = false): void {
	let hovered = false;
	let focused = false;
	let pressed = false;
	let hot = false;
	const update = (event: PointerEvent | null) => {
		const next = hovered || focused || pressed;
		if (next === hot) return;
		hot = next;
		(hot ? on : off)(event);
	};
	listen(dispose, control, "pointerenter", (event) => {
		if (event.pointerType !== "mouse") return;
		hovered = true;
		update(event);
	});
	listen(dispose, control, "pointerleave", (event) => {
		if (event.pointerType !== "mouse") return;
		hovered = false;
		update(event);
	});
	if (move) {
		listen(dispose, control, "pointermove", (event) => {
			if (event.pointerType === "mouse" && hovered) move(event);
		});
	}
	if (touch) {
		listen(dispose, control, "pointerdown", (event) => {
			if (event.pointerType === "mouse") return;
			pressed = true;
			update(event);
		});
		const lift = (event: PointerEvent) => {
			if (event.pointerType === "mouse" || !pressed) return;
			pressed = false;
			update(event);
		};
		listen(dispose, control, "pointerup", lift);
		listen(dispose, control, "pointercancel", lift);
	}
	listen(dispose, control, "focusin", () => {
		if (!control.matches(":focus-visible")) return;
		focused = true;
		update(null);
	});
	listen(dispose, control, "focusout", (event) => {
		if (control.contains(event.relatedTarget as Node | null)) return;
		focused = false;
		update(null);
	});
}

export type TextRollOptions = {
	/** The text element to roll; defaults to `[data-roll-label]` inside the control, else the control itself. */
	label?: HTMLElement | null;
	duration?: number;
	touch?: boolean;
};

/**
 * Museum of Motion `textRoll`: rolls the label vertically to an aria-hidden duplicate on hover/focus-visible.
 */
export function textRoll(
	control: HTMLElement,
	{ label, duration = ROLL.duration, touch = false }: TextRollOptions = {}
): Teardown {
	if (prefersReducedMotion()) return () => {};
	return own((dispose, after) => {
		const target = label ?? control.querySelector<HTMLElement>("[data-roll-label]") ?? control;
		const mask = document.createElement("span");
		const line = document.createElement("span");
		const copy = document.createElement("span");
		const nodes = Array.from(target.childNodes);
		mask.dataset.rollMask = "";
		line.dataset.rollLine = "";
		copy.dataset.rollCopy = "";
		copy.setAttribute("aria-hidden", "true");
		mask.style.cssText = "display:inline-grid;align-items:center;overflow:visible clip";
		line.style.cssText = "grid-area:1/1;display:inline-flex;align-items:center;gap:inherit";
		copy.style.cssText = "grid-area:1/1;display:inline-flex;align-items:center;gap:inherit;user-select:none";
		copy.append(...nodes.map((node) => node.cloneNode(true)));
		copy.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
		target.insertBefore(mask, nodes[0] ?? null);
		line.append(...nodes);
		mask.append(line, copy);
		after(() => mask.replaceWith(...Array.from(line.childNodes)));
		dispose(() => gsap.killTweensOf([line, copy]));

		const clearance = () => {
			const lineHeight = line.getBoundingClientRect().height;
			if (!lineHeight) return 100;
			const ink = document.createRange();
			ink.selectNodeContents(line);
			const room = Math.max(0, (ink.getBoundingClientRect().height - lineHeight) / 2);
			mask.style.paddingBlock = `${room}px`;
			mask.style.marginBlock = `${-room}px`;
			return (100 * mask.getBoundingClientRect().height) / lineHeight;
		};
		gsap.set(copy, { yPercent: clearance() });
		const roll = (hot: boolean) => {
			const travel = clearance();
			gsap.to(line, { yPercent: hot ? -travel : 0, duration, ease: ROLL.ease, overwrite: "auto" });
			gsap.to(copy, { yPercent: hot ? 0 : travel, duration, ease: ROLL.ease, overwrite: "auto" });
		};
		hotState(dispose, control, { on: () => roll(true), off: () => roll(false) }, touch);
	});
}

export type UnderlineSweepOptions = {
	touch?: boolean;
};

export function underlineSweep(link: HTMLElement, { touch = false }: UnderlineSweepOptions = {}): Teardown {
	const reduced = prefersReducedMotion();
	return own((dispose, after) => {
		const line = document.createElement("span");
		line.dataset.underline = "";
		line.setAttribute("aria-hidden", "true");
		line.style.cssText =
			"position:absolute;left:0;right:0;bottom:var(--underline-offset,0);height:var(--underline-thickness,1.5px);" +
			"background:var(--underline-color,currentColor);pointer-events:none";
		after(snapshotStyles([link], ["position"]));
		if (getComputedStyle(link).position === "static") link.style.position = "relative";
		link.append(line);
		after(() => line.remove());
		dispose(() => gsap.killTweensOf(line));
		const rtl = getComputedStyle(link).direction === "rtl";
		const start = rtl ? "100% 50%" : "0% 50%";
		const end = rtl ? "0% 50%" : "100% 50%";
		gsap.set(line, { scaleX: 0, transformOrigin: start });

		const sweep = (hot: boolean) => {
			if (Number(gsap.getProperty(line, "scaleX")) === (hot ? 0 : 1)) {
				gsap.set(line, { transformOrigin: hot ? start : end });
			}
			gsap.to(line, {
				scaleX: hot ? 1 : 0,
				duration: reduced ? 0 : SWEEP.duration,
				ease: SWEEP.ease,
				overwrite: "auto",
			});
		};
		hotState(dispose, link, { on: () => sweep(true), off: () => sweep(false) }, touch);
	});
}

export type JellyOptions = {
	highlight?: string;
	touch?: boolean;
};

export function jelly(
	button: HTMLElement,
	{ highlight = "rgb(255 255 255 / 0.35)", touch = false }: JellyOptions = {}
): Teardown {
	if (prefersReducedMotion()) return () => {};
	return own((dispose, after) => {
		const glow = document.createElement("span");
		glow.setAttribute("aria-hidden", "true");
		const size = Math.max(button.offsetHeight * 1.6, 48);
		glow.style.cssText = `position:absolute;left:0;top:0;width:${size}px;height:${size}px;border-radius:50%;pointer-events:none;background:radial-gradient(closest-side, ${highlight}, transparent);opacity:0`;
		after(snapshotStyles([button], [...MOTION_PROPS, "position", "overflow", "isolation"]));
		if (getComputedStyle(button).position === "static") button.style.position = "relative";
		button.style.overflow = "hidden";
		button.style.isolation = "isolate";
		button.prepend(glow);
		after(() => glow.remove());
		dispose(() => gsap.killTweensOf([button, glow]));
		const aim = (event: PointerEvent | null) => {
			const { x, y } = crossing(button, event);
			gsap.to(glow, { x: x - size / 2, y: y - size / 2, duration: 0.25, ease: "power3.out", overwrite: "auto" });
		};
		liquidState(
			dispose,
			button,
			{
				on(event) {
					aim(event);
					gsap.to(glow, { opacity: 1, duration: 0.3 });
					gsap.timeline()
						.to(button, { scaleX: 1.05, scaleY: 0.9, duration: 0.14, ease: "power2.out", overwrite: "auto" })
						.to(button, { scaleX: 1, scaleY: 1, duration: 1, ease: "elastic.out(1, 0.32)" });
				},
				off() {
					gsap.to(glow, { opacity: 0, duration: 0.3 });
					gsap.timeline()
						.to(button, { scaleX: 0.97, scaleY: 1.05, duration: 0.12, ease: "power2.out", overwrite: "auto" })
						.to(button, { scaleX: 1, scaleY: 1, duration: 0.8, ease: "elastic.out(1, 0.35)" });
				},
				move: aim,
			},
			touch
		);
	});
}
