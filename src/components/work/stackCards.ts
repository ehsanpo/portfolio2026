import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type StackCardsOptions = {
	/** Px from the viewport top where the first card pins. */
	top?: number;
	/** Px each later card pins below the one before, so the edges of the deck show. */
	offset?: number;
	/** Scale lost per card stacked on top. */
	shrink?: number;
	scrub?: number | boolean;
};

function prefersReducedMotion(): boolean {
	if (typeof window === "undefined") return true;
	const choice = document.documentElement.dataset.motion;
	if (choice === "reduced") return true;
	if (choice === "full") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Museum of Motion — Exhibit 27: Stacking (`stackCards`).
 * Cards pin one over another into a deck as the page scrolls, shrinking
 * slightly beneath each arriving card, then release together when the last lands.
 */
export function stackCards(
	cards: HTMLElement[],
	{ top = 88, offset = 16, shrink = 0.045, scrub = 0.35 }: StackCardsOptions = {},
): () => void {
	if (prefersReducedMotion() || cards.length < 2) {
		return () => {};
	}

	const mm = gsap.matchMedia();

	mm.add("(min-width: 1024px)", () => {
		const maxCardHeight = Math.max(...cards.map((card) => card.offsetHeight));
		const availableHeight = window.innerHeight - top - offset * (cards.length - 1) - 16;

		// Only pin when cards fit comfortably inside the viewport so content is never clipped.
		if (maxCardHeight > availableHeight) {
			return;
		}

		const last = cards[cards.length - 1]!;
		const pinAt = (i: number) => `top top+=${top + i * offset}`;

		cards.slice(0, -1).forEach((card, i) => {
			ScrollTrigger.create({
				trigger: card,
				start: pinAt(i),
				endTrigger: last,
				end: pinAt(cards.length - 1),
				pin: true,
				pinSpacing: false,
				invalidateOnRefresh: true,
			});

			const buried = cards.length - 1 - i;
			gsap.to(card, {
				scale: 1 - shrink * buried,
				transformOrigin: "50% 0%",
				ease: "none",
				scrollTrigger: {
					trigger: cards[i + 1]!,
					start: "top bottom",
					endTrigger: last,
					end: pinAt(cards.length - 1),
					scrub,
					invalidateOnRefresh: true,
				},
			});
		});
	});

	return () => {
		mm.revert();
	};
}

export function initSelectedWorkStack(): () => void {
	const deck = document.querySelector<HTMLElement>("[data-stack-deck]");
	if (!deck) return () => {};

	const cards = Array.from(deck.querySelectorAll<HTMLElement>("[data-stack-card]"));
	return stackCards(cards);
}
