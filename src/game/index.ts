// Barrel export to ensure all types are available during bundling
export type {
	GameMode,
	UnlockablePage,
	ShopItemId,
	AchievementId,
	ComboState,
	AutoClickerState,
	AchievementProgress,
	AchievementDefinition,
	ShopItemDefinition,
	ToastItem,
	GameState,
	GameActions,
	GameStore,
} from "./types";

export { GAME_VERSION, GAME_STORAGE_KEY } from "./types";
export { useGameStore } from "./state";
export { useGameEngine } from "./engine";
export { buildShop, applyPurchase } from "./shop";
export { findNewAchievements } from "./achievements";
