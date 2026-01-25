import { useEffect, useState } from "react";
import { useGameStore } from "../../game";
import type { UnlockablePage } from "../../game";

const isUnlocked = (href: string, unlocks: Record<UnlockablePage, boolean>) => {
	const key = href as UnlockablePage;
	return unlocks[key] ?? true;
};


let lockStateApplied = false;

const applyLockState = (mode: string, unlocks: Record<UnlockablePage, boolean>) => {
	const anchors = Array.from(
		document.querySelectorAll("[data-game-nav-link]")
	) as HTMLAnchorElement[];
	const handlers: Array<{ el: HTMLAnchorElement; fn: (e: Event) => void }> = [];
	const useCapture = true;

	anchors.forEach((el) => {
		const href = el.dataset.href || el.getAttribute("href") || "";
		const isLife = href === "/life";
		const locked = mode === "active" && href !== "/" && !isUnlocked(href, unlocks);
		const hideLife = isLife && (mode !== "active" || !unlocks["/life"]);

		
		if (hideLife) {
			el.style.display = "none";
			return;
		}

		el.style.display = "";

		
		const originalText = el.textContent?.replace(/🔒\s*/, "") || "";

		if (locked) {
			el.setAttribute("aria-disabled", "true");
			el.title = "Locked - unlock in Shop";
			el.classList.add("pointer-events-none", "opacity-60");

			
			if (!el.textContent?.includes("🔒")) {
				el.textContent = `🔒 ${originalText}`;
			}

			const fn = (e: Event) => {
				e.preventDefault();
				e.stopPropagation();
			};
			el.addEventListener("click", fn, useCapture);
			handlers.push({ el, fn });
		} else {
			el.removeAttribute("aria-disabled");
			el.classList.remove("pointer-events-none", "opacity-60");

			
			if (el.textContent?.includes("🔒")) {
				el.textContent = originalText;
			}
		}
	});

	return () => handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn, useCapture));
};

export function NavLockGuard() {
	const [mounted, setMounted] = useState(false);
	const mode = useGameStore((s) => s.mode);
	const unlocks = useGameStore((s) => s.unlocks);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		
		const cleanup = applyLockState(mode, unlocks);
		lockStateApplied = true;

		return cleanup;
	}, [mounted, mode, unlocks]);

	return null;
}
