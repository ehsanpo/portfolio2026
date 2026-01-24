import { useEffect } from "react";
import { decayCombo } from "./combo";
import { getAutoAmount, getAutoInterval } from "./autoclicker";
import { useGameStore } from "./state";

export const useGameEngine = () => {
	const mode = useGameStore((s) => s.mode);
	const auto = useGameStore((s) => s.autoClicker);
	const addClick = useGameStore((s) => s.addClick);

	useEffect(() => {
		if (mode !== "active") return;
		const id = setInterval(() => {
			useGameStore.setState((state) => ({
				...state,
				combo: decayCombo(state.combo, Date.now()),
			}));
		}, 300);
		return () => clearInterval(id);
	}, [mode]);

	useEffect(() => {
		if (mode !== "active" || auto.level <= 0) return;
		const tick = () => addClick("auto");
		const id = setInterval(tick, getAutoInterval(auto));
		return () => clearInterval(id);
	}, [mode, auto.level, auto.intervalMs, addClick]);
};
