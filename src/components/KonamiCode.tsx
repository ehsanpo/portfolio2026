import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useGameStore } from "../game";

const KONAMI_CODE = [
	"ArrowUp",
	"ArrowUp",
	"ArrowDown",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowLeft",
	"ArrowRight",
	"b",
	"a",
];

export default function KonamiCode() {
	const [mounted, setMounted] = useState(false);
	const [keys, setKeys] = useState<string[]>([]);
	const [activated, setActivated] = useState(false);
	const enableGame = useGameStore((s) => s.enableGame);
	const setHUD = useGameStore((s) => s.setHUD);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			setKeys((prevKeys) => {
				const newKeys = [...prevKeys, e.key].slice(-10);


				const matches = KONAMI_CODE.every((key, i) => key === newKeys[i]);

				if (matches && !activated) {
					setActivated(true);
					triggerEasterEgg();
					enableGame();
					setHUD(true);

					setTimeout(() => {
						setActivated(false);
						setKeys([]);
					}, 5000);
				}

				return newKeys;
			});
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [mounted, activated, enableGame, setHUD]);

	const triggerEasterEgg = () => {

		const duration = 3000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

		const randomInRange = (min: number, max: number) => {
			return Math.random() * (max - min) + min;
		};

		const interval = setInterval(() => {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);

			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			});
		}, 250);

		// Log message to console
		console.log(
			"%c🎮 KONAMI CODE ACTIVATED! 🎮",
			"font-size: 24px; font-weight: bold; color: #ff6b6b; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
		);
		console.log("%cYou found the secret! 🎉", "font-size: 16px; color: #4ecdc4;");
	};

	if (!mounted) return null;

	return (
		<>
			{activated && (
				<div className="pointer-events-none fixed inset-0 z-[9998] flex items-center justify-center">
					<div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-600 opacity-20"></div>
					<div className="relative animate-bounce rounded-lg bg-primary-600 px-8 py-4 shadow-2xl">
						<h2 className="text-4xl font-bold text-white">🎮 KONAMI CODE! 🎮</h2>
						<p className="mt-2 text-xl text-white">GAME MODE ACTIVATED!!! 🎉</p>
					</div>
				</div>
			)}
		</>
	);
}
