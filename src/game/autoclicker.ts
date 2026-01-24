import type { AutoClickerState } from "./types";

export const getAutoInterval = (auto: AutoClickerState) => {
	const step = Math.max(400, auto.intervalMs - auto.level * 75);
	return step;
};

export const getAutoAmount = (auto: AutoClickerState) => {
	return Math.max(0, auto.level) * auto.amountPerTick;
};
