import { useEffect } from "react";
import { useGameStore } from "../../game";

export default function LifeGuard() {
	useEffect(() => {
		const mode = useGameStore.getState().mode;
		const unlocked = useGameStore.getState().unlocks["/life"];

		
		if (mode !== "active" || !unlocked) {
			window.location.href = "/";
		}
	}, []);

	return null;
}
