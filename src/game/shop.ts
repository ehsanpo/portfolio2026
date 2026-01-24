import type { GameState, ShopItemDefinition, ShopItemId, UnlockablePage } from "./types";

const unlockCosts: Record<UnlockablePage, number> = {
	"/": 0,
	"/portfolio": 60,
	"/skills": 50,
	"/services": 50,
	"/about": 70,
	"/contact": 90,
	"/blog": 110,
	"/music": 100,
	"/cv": 80,
	"/life": 0,
};

const unlockTargets: Record<ShopItemId, UnlockablePage | null> = {
	"unlock-portfolio": "/portfolio",
	"unlock-skills": "/skills",
	"unlock-services": "/services",
	"unlock-about": "/about",
	"unlock-contact": "/contact",
	"unlock-blog": "/blog",
	"unlock-music": "/music",
	"unlock-cv": "/cv",
	"click-power": null,
	"combo-extender": null,
	"auto-clicker": null,
};

export const buildShop = (state: GameState): ShopItemDefinition[] => [
	{
		id: "unlock-portfolio",
		title: "Unlock Work",
		description: "Unlock the Work page in the header.",
		cost: () => unlockCosts["/portfolio"],
		maxLevel: 1,
		type: "unlock",
		target: "/portfolio",
	},
	{
		id: "unlock-skills",
		title: "Unlock Skills",
		description: "Unlock the Skills page in the header.",
		cost: () => unlockCosts["/skills"],
		maxLevel: 1,
		type: "unlock",
		target: "/skills",
	},
	{
		id: "unlock-services",
		title: "Unlock Services",
		description: "Unlock the Services page in the header.",
		cost: () => unlockCosts["/services"],
		maxLevel: 1,
		type: "unlock",
		target: "/services",
	},
	{
		id: "unlock-about",
		title: "Unlock About",
		description: "Unlock the About page in the header.",
		cost: () => unlockCosts["/about"],
		maxLevel: 1,
		type: "unlock",
		target: "/about",
	},
	{
		id: "unlock-contact",
		title: "Unlock Contact",
		description: "Unlock the Contact page in the header.",
		cost: () => unlockCosts["/contact"],
		maxLevel: 1,
		type: "unlock",
		target: "/contact",
	},
	{
		id: "unlock-blog",
		title: "Unlock Blog",
		description: "Unlock the Blog page in the header.",
		cost: () => unlockCosts["/blog"],
		maxLevel: 1,
		type: "unlock",
		target: "/blog",
	},
	{
		id: "unlock-music",
		title: "Unlock Music",
		description: "Unlock the Music page in the header.",
		cost: () => unlockCosts["/music"],
		maxLevel: 1,
		type: "unlock",
		target: "/music",
	},
	{
		id: "unlock-cv",
		title: "Unlock Resume",
		description: "Unlock the Resume page in the header.",
		cost: () => unlockCosts["/cv"],
		maxLevel: 1,
		type: "unlock",
		target: "/cv",
	},
	{
		id: "click-power",
		title: "Click Power",
		description: "Earn more coins per click.",
		cost: () => 20 + state.clickPower * 15,
		type: "upgrade",
	},
	{
		id: "combo-extender",
		title: "Combo Extender",
		description: "Lengthen the combo window.",
		cost: () => 25 + Math.max(0, (state.combo.windowMs - 2000) / 200) * 20,
		type: "utility",
	},
	{
		id: "auto-clicker",
		title: "Auto-Clicker",
		description: "Generate passive coins over time.",
		cost: () => 50 + state.autoClicker.level * 40,
		maxLevel: 10,
		type: "utility",
	},
];

export const getItemDefinition = (state: GameState, id: ShopItemId) =>
	buildShop(state).find((item) => item.id === id);

export const isUnlocked = (state: GameState, target: UnlockablePage | null) => {
	if (!target) return true;
	return Boolean(state.unlocks[target]);
};

export const applyPurchase = (
	state: GameState,
	id: ShopItemId
): { next: GameState; success: boolean; reason?: string } => {
	const def = getItemDefinition(state, id);
	if (!def) return { next: state, success: false, reason: "Item not found" };
	const cost = def.cost(state);
	if (state.coins < cost) return { next: state, success: false, reason: "Not enough coins" };
	if (def.maxLevel && id === "auto-clicker" && state.autoClicker.level >= def.maxLevel) {
		return { next: state, success: false, reason: "Max level reached" };
	}

	let next: GameState = { ...state, coins: state.coins - cost };
	const target = unlockTargets[id];

	switch (id) {
		case "click-power": {
			next.clickPower += 1;
			break;
		}
		case "combo-extender": {
			next.combo = { ...next.combo, windowMs: next.combo.windowMs + 200 };
			break;
		}
		case "auto-clicker": {
			next.autoClicker = { ...next.autoClicker, level: next.autoClicker.level + 1 };
			break;
		}
		default: {
			if (target) {
				if (next.unlocks[target])
					return { next: state, success: false, reason: "Already unlocked" };
				next.unlocks = { ...next.unlocks, [target]: true };
			}
			break;
		}
	}

	return { next, success: true };
};
