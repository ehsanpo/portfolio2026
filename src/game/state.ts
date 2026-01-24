import { create } from "zustand";
import { persist } from "zustand/middleware";
import { applyPurchase, buildShop } from "./shop";
import { nextCombo } from "./combo";
import { findNewAchievements, markAchievements } from "./achievements";
import { createInitialState, migrateState, STORAGE_KEY } from "./storage";
import type { GameStore, ToastItem } from "./types";

const computeLevel = (xp: number) => {
	const level = Math.max(1, Math.floor(xp / 150) + 1);
	return { level, xp };
};

const pushToasts = (state: GameStore, items: ToastItem[]): ToastItem[] => {
	const existing = state.toasts.slice(-4);
	return [...existing, ...items].slice(-5);
};

export const useGameStore = create<GameStore>()(
	persist(
		(set, get) => ({
			...createInitialState(),
			enableGame: () => {
				set((state) =>
					state.mode === "active" ? state : { ...state, mode: "active", showHUD: true }
				);
			},
			exitGame: () => {
				set((state) => ({
					...state,
					mode: "off",
					showHUD: false,
					shopOpen: false,
					combo: {
						...state.combo,
						streak: 0,
						multiplier: 1,
						decayEndsAt: null,
						lastClickAt: null,
					},
					autoClicker: {
						...state.autoClicker,
						running: false,
						lastTickAt: null,
					},
				}));
			},
			addClick: (source = "manual") => {
				const now = Date.now();
				set((state) => {
					const combo = nextCombo(state.combo, now);
					const gain = Math.max(1, state.clickPower) * combo.multiplier;
					const coins = state.coins + gain;
					const lifetimeCoins = state.lifetimeCoins + gain;
					const totalClicks = state.totalClicks + 1;
					const levelInfo = computeLevel(lifetimeCoins);
					const unlocks = { ...state.unlocks };
					if (levelInfo.level >= 10) {
						unlocks["/life"] = true;
					}
					let next: GameStore = {
						...state,
						coins,
						lifetimeCoins,
						totalClicks,
						combo,
						playerLevel: levelInfo.level,
						playerXp: levelInfo.xp,
						unlocks,
					};

					const fresh = findNewAchievements(next);
					if (fresh.length) {
						const updated = markAchievements(
							next,
							fresh.map((f) => f.id)
						);
						return {
							...next,
							...updated,
							toasts: pushToasts(
								state as GameStore,
								fresh.map((f) => ({
									id: `${f.id}-${now}`,
									title: f.title,
									message: f.description,
									createdAt: now,
								}))
							),
						};
					}

					return next;
				});
			},
			addCoins: (amount: number) => {
				if (!Number.isFinite(amount)) return;
				set((state) => {
					const coins = state.coins + amount;
					const lifetimeCoins = state.lifetimeCoins + amount;
					const levelInfo = computeLevel(lifetimeCoins);
					const unlocks = { ...state.unlocks };
					if (levelInfo.level >= 10) {
						unlocks["/life"] = true;
					}
					let next: GameStore = {
						...state,
						coins,
						lifetimeCoins,
						playerLevel: levelInfo.level,
						playerXp: levelInfo.xp,
						unlocks,
					};
					const fresh = findNewAchievements(next);
					if (fresh.length) {
						const updated = markAchievements(
							next,
							fresh.map((f) => f.id)
						);
						return {
							...next,
							...updated,
							toasts: pushToasts(
								state as GameStore,
								fresh.map((f) => ({
									id: `${f.id}-${Date.now()}`,
									title: f.title,
									message: f.description,
									createdAt: Date.now(),
								}))
							),
						};
					}
					return next;
				});
			},
			purchaseItem: (id) => {
				set((state) => {
					const { next, success } = applyPurchase(state, id);
					if (!success) return state;
					const fresh = findNewAchievements(next);
					if (fresh.length) {
						const updated = markAchievements(
							next,
							fresh.map((f) => f.id)
						);
						return {
							...next,
							...updated,
							toasts: pushToasts(
								state as GameStore,
								fresh.map((f) => ({
									id: `${f.id}-${Date.now()}`,
									title: f.title,
									message: f.description,
									createdAt: Date.now(),
								}))
							),
						};
					}
					return next;
				});
			},
			toggleShop: (open) =>
				set((state) => ({
					...state,
					shopOpen: typeof open === "boolean" ? open : !state.shopOpen,
				})),
			ackToast: (id) =>
				set((state) => ({ ...state, toasts: state.toasts.filter((t) => t.id !== id) })),
			setHUD: (visible) => set((state) => ({ ...state, showHUD: visible })),
		}),
		{
			name: STORAGE_KEY,
			version: 1,
			merge: (persisted, current) => {
				const migrated = migrateState(persisted ?? current);
				return { ...current, ...migrated };
			},
		}
	)
);

export const getShopItems = () => buildShop(useGameStore.getState());
