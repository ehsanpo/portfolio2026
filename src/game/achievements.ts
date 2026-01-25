import type { AchievementDefinition, AchievementId, GameState } from "./types";

export const achievementDefinitions: AchievementDefinition[] = [
	{
		id: "first-click",
		title: "First Click",
		description: "Earn your first coin.",
		condition: (state) => state.totalClicks >= 1,
	},
	{
		id: "shopper",
		title: "Shopper",
		description: "Make your first purchase.",
		condition: (state) => state.lifetimeCoins > state.coins,
	},
	{
		id: "link-liberator",
		title: "Link Liberator",
		description: "Unlock three header links.",
		condition: (state) => Object.values(state.unlocks).filter(Boolean).length >= 4,
	},
	{
		id: "combo-master",
		title: "Combo Master",
		description: "Reach a 5x combo multiplier.",
		condition: (state) => state.combo.multiplier >= 5,
	},
	{
		id: "afk-tycoon",
		title: "AFK Tycoon",
		description: "Earn 1,000 lifetime coins.",
		condition: (state) => state.lifetimeCoins >= 1000,
	},
	{
		id: "life-unlocked",
		title: "Life Unlocked",
		description: "Reach Level 10.",
		condition: (state) => state.playerLevel >= 10,
	},
];

export const findNewAchievements = (state: GameState): AchievementDefinition[] => {
	return achievementDefinitions.filter(
		(def) => !state.achievements[def.id]?.unlocked && def.condition(state)
	);
};

export const markAchievements = (state: GameState, ids: AchievementId[]): GameState => {
	const next = { ...state, achievements: { ...state.achievements } };
	const now = Date.now();
	ids.forEach((id) => {
		next.achievements[id] = { unlocked: true, unlockedAt: now };
	});
	return next;
};
