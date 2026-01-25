import { GAME_STORAGE_KEY, GAME_VERSION } from "./types";
import type { GameState, UnlockablePage, AchievementId } from "./types";

const defaultUnlocks: Record<UnlockablePage, boolean> = {
	"/": true,
	"/portfolio": false,
	"/skills": false,
	"/about": false,
	"/contact": false,
	"/blog": false,
	"/music": false,
	"/cv": false,
	"/life": false,
};

const achievementIds: AchievementId[] = [
	"first-click",
	"shopper",
	"link-liberator",
	"combo-master",
	"afk-tycoon",
	"life-unlocked",
];

const makeAchievements = () =>
	achievementIds.reduce(
		(acc, id) => {
			acc[id] = { unlocked: false, unlockedAt: null };
			return acc;
		},
		{} as GameState["achievements"]
	);

export const createInitialState = (): GameState => ({
	mode: "off",
	coins: 0,
	lifetimeCoins: 0,
	totalClicks: 0,
	clickPower: 1,
	combo: {
		multiplier: 1,
		streak: 0,
		lastClickAt: null,
		windowMs: 2000,
		decayEndsAt: null,
	},
	autoClicker: {
		level: 0,
		intervalMs: 2000,
		amountPerTick: 1,
		lastTickAt: null,
		running: false,
	},
	unlocks: { ...defaultUnlocks },
	achievements: makeAchievements(),
	playerLevel: 1,
	playerXp: 0,
	showHUD: false,
	shopOpen: false,
	toasts: [],
	version: GAME_VERSION,
});

export const STORAGE_KEY = GAME_STORAGE_KEY;

export const migrateState = (raw: unknown): GameState => {
	if (!raw || typeof raw !== "object") return createInitialState();
	const state = raw as Partial<GameState>;
	return {
		...createInitialState(),
		...state,
		combo: { ...createInitialState().combo, ...state.combo },
		autoClicker: { ...createInitialState().autoClicker, ...state.autoClicker },
		unlocks: { ...defaultUnlocks, ...state.unlocks },
		achievements: { ...makeAchievements(), ...state.achievements },
		mode: "off",
		showHUD: false,
		shopOpen: false,
		version: GAME_VERSION,
	};
};
