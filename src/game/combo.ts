import type { ComboState } from "./types";

const MAX_MULTIPLIER = 5;

export const nextCombo = (combo: ComboState, now: number): ComboState => {
	const withinWindow = combo.lastClickAt ? now - combo.lastClickAt <= combo.windowMs : false;
	const streak = withinWindow ? combo.streak + 1 : 1;
	const multiplier = Math.min(1 + streak * 0.1, MAX_MULTIPLIER);
	return {
		...combo,
		streak,
		multiplier,
		lastClickAt: now,
		decayEndsAt: now + combo.windowMs,
	};
};

export const decayCombo = (combo: ComboState, now: number): ComboState => {
	if (!combo.lastClickAt || !combo.decayEndsAt) return combo;
	if (now <= combo.decayEndsAt) return combo;
	return {
		...combo,
		streak: 0,
		multiplier: 1,
		lastClickAt: null,
		decayEndsAt: null,
	};
};
