export const GAME_VERSION = 1;
export const GAME_STORAGE_KEY = "astro-game-save-v1";

export type GameMode = "off" | "active";

export type UnlockablePage =
	| "/"
	| "/portfolio"
	| "/skills"
	| "/about"
	| "/contact"
	| "/blog"
	| "/music"
	| "/cv"
	| "/life";

export type ShopItemId =
	| "unlock-portfolio"
	| "unlock-skills"
	| "unlock-about"
	| "unlock-contact"
	| "unlock-blog"
	| "unlock-music"
	| "unlock-cv"
	| "click-power"
	| "combo-extender"
	| "auto-clicker";

export type AchievementId =
	| "first-click"
	| "shopper"
	| "link-liberator"
	| "combo-master"
	| "afk-tycoon"
	| "life-unlocked";

export interface ComboState {
	multiplier: number;
	streak: number;
	lastClickAt: number | null;
	windowMs: number;
	decayEndsAt: number | null;
}

export interface AutoClickerState {
	level: number;
	intervalMs: number;
	amountPerTick: number;
	lastTickAt: number | null;
	running: boolean;
}

export interface AchievementProgress {
	unlocked: boolean;
	unlockedAt: number | null;
}

export interface AchievementDefinition {
	id: AchievementId;
	title: string;
	description: string;
	condition: (state: GameState) => boolean;
}

export interface ShopItemDefinition {
	id: ShopItemId;
	title: string;
	description: string;
	cost: (state: GameState) => number;
	maxLevel?: number;
	type: "unlock" | "upgrade" | "utility";
	target?: UnlockablePage;
}

export interface ToastItem {
	id: string;
	title: string;
	message: string;
	createdAt: number;
}

export interface GameState {
	mode: GameMode;
	coins: number;
	lifetimeCoins: number;
	totalClicks: number;
	clickPower: number;
	combo: ComboState;
	autoClicker: AutoClickerState;
	unlocks: Record<UnlockablePage, boolean>;
	achievements: Record<AchievementId, AchievementProgress>;
	playerLevel: number;
	playerXp: number;
	showHUD: boolean;
	shopOpen: boolean;
	toasts: ToastItem[];
	version: number;
}

export interface GameActions {
	enableGame: () => void;
	exitGame: () => void;
	addClick: (source?: "manual" | "auto") => void;
	addCoins: (amount: number) => void;
	purchaseItem: (id: ShopItemId) => void;
	toggleShop: (open?: boolean) => void;
	ackToast: (id: string) => void;
	setHUD: (visible: boolean) => void;
}

export type GameStore = GameState & GameActions;
