"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(Draggable);

export interface StackCertificate {
	name: string;
	year: string;
	imageSrc: string;
	index: number;
}

interface CertificateStackProps {
	certificates: StackCertificate[];
}

type FlickPose = {
	xPercent: number;
	yPercent: number;
	rotation: number;
	scale: number;
	autoAlpha: number;
};

const FLICK_POSES: FlickPose[] = [
	{ xPercent: 0, yPercent: 0, rotation: 0, scale: 1, autoAlpha: 1 },
	{ xPercent: 24, yPercent: 2, rotation: 8, scale: 0.9, autoAlpha: 1 },
	{ xPercent: 44, yPercent: 6, rotation: 14, scale: 0.8, autoAlpha: 0.85 },
	{ xPercent: 56, yPercent: 8, rotation: 18, scale: 0.65, autoAlpha: 0 },
];

function prefersReducedMotion(): boolean {
	if (typeof window === "undefined") return true;
	const choice = document.documentElement.dataset.motion;
	if (choice === "reduced") return true;
	if (choice === "full") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wrapIndex(index: number, length: number): number {
	return ((index % length) + length) % length;
}

function mix(a: number, b: number, factor: number): number {
	return a + (b - a) * factor;
}

export const CertificateStack: React.FC<CertificateStackProps> = ({ certificates }) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const stackRef = useRef<HTMLUListElement>(null);
	const controlsRef = useRef<{
		next: () => void;
		prev: () => void;
		toIndex: (index: number) => void;
	} | null>(null);

	const [activeIndex, setActiveIndex] = useState(0);
	const total = certificates.length;

	useEffect(() => {
		const root = rootRef.current;
		const stack = stackRef.current;
		if (!root || !stack || total === 0) return;

		const reduced = prefersReducedMotion();
		const cards = Array.from(stack.children).filter(
			(el): el is HTMLElement => el instanceof HTMLElement,
		);
		const n = cards.length;
		if (!n) return;

		const lastPose = FLICK_POSES.length - 1;
		const proxy = document.createElement("div");
		const state = { position: 0 };
		let aim = 0;
		let current = 0;
		let deal: gsap.core.Tween | undefined;

		const render = () => {
			cards.forEach((card, i) => {
				const d = gsap.utils.wrap(-n / 2, n / 2, i - state.position);
				const reach = Math.min(Math.abs(d), lastPose);
				const k = Math.floor(reach);
				const from = FLICK_POSES[k]!;
				const to = FLICK_POSES[Math.min(k + 1, lastPose)]!;
				const f = reach - k;
				const side = d < 0 ? -1 : 1;

				gsap.set(card, {
					xPercent: side * mix(from.xPercent, to.xPercent, f),
					yPercent: mix(from.yPercent, to.yPercent, f),
					rotation: side * mix(from.rotation, to.rotation, f),
					scale: mix(from.scale, to.scale, f),
					autoAlpha: mix(from.autoAlpha, to.autoAlpha, f),
					zIndex: Math.round((lastPose - reach) * 10) + 1,
				});
			});
		};

		const settle = () => {
			const holder = cards.find((card) => card.contains(document.activeElement));
			cards.forEach((card, i) => {
				card.inert = i !== current;
			});
			if (holder && holder.inert) {
				root.focus({ preventScroll: true });
			}
		};

		const go = (target: number) => {
			const next = wrapIndex(target, n);
			const changed = next !== current;
			aim = target;
			current = next;
			settle();
			deal?.kill();

			if (reduced) {
				state.position = target;
				render();
			} else {
				deal = gsap.to(state, {
					position: target,
					duration: 0.75,
					ease: "elastic.out(1, 0.8)",
					overwrite: true,
					onUpdate: render,
				});
			}

			if (changed) {
				setActiveIndex(current);
			}
		};

		const toIndex = (index: number) => {
			go(aim + gsap.utils.wrap(-n / 2, n / 2, wrapIndex(index, n) - current));
		};

		controlsRef.current = {
			next: () => go(aim + 1),
			prev: () => go(aim - 1),
			toIndex,
		};

		const ctx = gsap.context(() => {
			render();
			settle();
		}, root);

		let startX = 0;
		let startPos = 0;
		let lastX = 0;
		let lastT = 0;
		let velocity = 0;
		const distance = 0.45;
		const threshold = 0.15;
		const flickVelocity = 450;

		const [draggable] = Draggable.create(proxy, {
			type: "x",
			trigger: stack,
			inertia: false,
			dragClickables: true,
			zIndexBoost: false,
			onPress() {
				startX = lastX = this.x;
				lastT = performance.now();
				velocity = 0;
			},
			onDragStart() {
				deal?.kill();
				startPos = state.position;
			},
			onDrag() {
				const now = performance.now();
				const x = this.x;
				velocity = ((x - lastX) / Math.max(now - lastT, 8)) * 1000;
				lastX = x;
				lastT = now;
				const width = Math.max(root.clientWidth, 280);
				state.position = startPos + gsap.utils.clamp(-1, 1, -(x - startX) / (width * distance));
				render();
			},
			onDragEnd() {
				if (performance.now() - lastT > 100) velocity = 0;
				const moved = state.position - startPos;
				let step = 0;
				if (Math.abs(velocity) > flickVelocity) {
					step = velocity < 0 ? 1 : -1;
				} else if (Math.abs(moved) > threshold) {
					step = Math.sign(moved);
				}
				go(Math.round(startPos) + step);
			},
			onClick() {
				const event = this.pointerEvent as MouseEvent | TouchEvent | PointerEvent | undefined;
				if (!event) return;
				const point = "changedTouches" in event ? event.changedTouches[0] : event;
				if (!point) return;

				const isInside = (card: HTMLElement) => {
					const box = card.getBoundingClientRect();
					return (
						point.clientX >= box.left &&
						point.clientX <= box.right &&
						point.clientY >= box.top &&
						point.clientY <= box.bottom
					);
				};

				if (isInside(cards[current]!)) return;

				const hit = cards
					.map((card, i) => ({ card, i, z: Number(gsap.getProperty(card, "zIndex")) }))
					.filter(
						({ card, i }) =>
							i !== current && Number(gsap.getProperty(card, "autoAlpha")) > 0.4 && isInside(card),
					)
					.sort((a, b) => b.z - a.z)[0];

				if (hit) toIndex(hit.i);
			},
		});

		return () => {
			controlsRef.current = null;
			deal?.kill();
			draggable?.kill();
			ctx.revert();
			cards.forEach((card) => {
				card.inert = false;
			});
		};
	}, [total]);

	if (total === 0) {
		return null;
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "ArrowRight") {
			event.preventDefault();
			controlsRef.current?.next();
		} else if (event.key === "ArrowLeft") {
			event.preventDefault();
			controlsRef.current?.prev();
		} else if (event.key === "Home") {
			event.preventDefault();
			controlsRef.current?.toIndex(0);
		} else if (event.key === "End") {
			event.preventDefault();
			controlsRef.current?.toIndex(total - 1);
		}
	};

	const activeCert = certificates[activeIndex] ?? certificates[0]!;

	return (
		<div className="mt-10">
			<div
				ref={rootRef}
				role="region"
				aria-roledescription="carousel"
				aria-label="Certifications card stack"
				tabIndex={0}
				onKeyDown={handleKeyDown}
				className="relative overflow-hidden py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:py-10"
			>
				<div className="mx-auto flex max-w-md justify-center">
					<ul
						ref={stackRef}
						className="grid w-full max-w-[340px] cursor-grab list-none p-0 select-none active:cursor-grabbing sm:max-w-[380px]"
						style={{ touchAction: "pan-y" }}
					>
						{certificates.map((cert, i) => (
							<li
								key={`${cert.name}-${cert.index}`}
								className="col-start-1 row-start-1 flex flex-col justify-between border-[1.5px] border-ink bg-cream p-6 text-ink"
							>
								<div className="flex items-center justify-between gap-2">
									<span className="label-mono text-ink/70">
										NO. {String(i + 1).padStart(2, "0")}
									</span>
									<span className="font-pixel border-[1.5px] border-ink bg-paper px-2.5 py-0.5 text-sm">
										{cert.year}
									</span>
								</div>

								<div className="my-6 flex h-36 w-full items-center justify-center border-[1.5px] border-ink/25 bg-paper p-5 sm:h-40">
									<img
										src={cert.imageSrc}
										alt={cert.name}
										loading={i < 3 ? "eager" : "lazy"}
										draggable={false}
										className="max-h-28 w-auto object-contain"
									/>
								</div>

								<div className="border-t-[1.5px] border-ink/25 pt-4">
									<h3 className="text-lg leading-snug font-bold tracking-[-0.02em] text-ink">
										{cert.name}
									</h3>
									<div className="mt-3 flex items-center justify-between">
										<span className="label-mono text-[10px]! text-ink/75">
											STATUS / VERIFIED
										</span>
										<span className="size-2.5 border border-ink bg-mint" aria-hidden="true" />
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="mt-4 flex flex-col items-center justify-between gap-4 border-t-[1.5px] border-ink/30 pt-5 sm:flex-row">
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={() => controlsRef.current?.prev()}
						aria-label="Previous certification"
						className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 border-[1.5px] border-ink bg-cream px-4 py-2 font-mono text-xs font-semibold tracking-wider text-ink uppercase transition-colors hover:bg-mustard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
					>
						<ArrowLeft className="size-4" aria-hidden="true" />
						<span>Prev</span>
					</button>
					<button
						type="button"
						onClick={() => controlsRef.current?.next()}
						aria-label="Next certification"
						className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 border-[1.5px] border-ink bg-cream px-4 py-2 font-mono text-xs font-semibold tracking-wider text-ink uppercase transition-colors hover:bg-mustard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
					>
						<span>Next</span>
						<ArrowRight className="size-4" aria-hidden="true" />
					</button>
				</div>

				<p className="label-mono text-center text-ink/80" aria-live="polite">
					{String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} —{" "}
					<span className="font-semibold text-ink">{activeCert.name}</span>
				</p>

				<p className="label-mono hidden text-ink/80 md:block">Drag, flick, or arrow keys</p>
			</div>
		</div>
	);
};

export default CertificateStack;
