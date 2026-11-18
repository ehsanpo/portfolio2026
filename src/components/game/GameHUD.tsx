import { useEffect, useState } from "react";
import { useGameStore, useGameEngine } from "../../game";
import { AchievementToast } from "./AchievementToast";
import { ShopModal } from "./ShopModal";
import { BlinkingLED } from "./BlinkingLED";
import { generateSound } from "../../utils/sounds";

const format = (value: number) => Math.floor(value).toLocaleString();

interface ClickAnimation {
	id: number;
	x: number;
	y: number;
	amount: number;
	combo: number;
}

export function GameHUD() {
	const [mounted, setMounted] = useState(false);
	const [clickAnimations, setClickAnimations] = useState<ClickAnimation[]>([]);
	const mode = useGameStore((s) => s.mode);
	const coins = useGameStore((s) => s.coins);
	const clickPower = useGameStore((s) => s.clickPower);
	const combo = useGameStore((s) => s.combo);
	const playerLevel = useGameStore((s) => s.playerLevel);
	const auto = useGameStore((s) => s.autoClicker);
	const showHUD = useGameStore((s) => s.showHUD);
	const toasts = useGameStore((s) => s.toasts);
	const toggleShop = useGameStore((s) => s.toggleShop);
	const addClick = useGameStore((s) => s.addClick);

	useGameEngine();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted || mode !== "active") return;
		const handler = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null;
			if (target?.closest("[data-game-ignore]")) return;

			try {
				generateSound("click");
			} catch (error) {
				console.warn("Could not play click sound:", error);
			}

			const id = Date.now() + Math.random();
			const amount = clickPower * combo.multiplier;
			setClickAnimations((prev) => [
				...prev,
				{
					id,
					x: event.clientX,
					y: event.clientY,
					amount,
					combo: combo.multiplier,
				},
			]);

			setTimeout(() => {
				setClickAnimations((prev) => prev.filter((a) => a.id !== id));
			}, 1000);

			addClick("manual");
		};
		window.addEventListener("click", handler, false);
		return () => window.removeEventListener("click", handler, false);
	}, [mounted, mode, addClick, clickPower, combo.multiplier]);

	if (!mounted) return null;
	if (!showHUD) return null;

	return (
		<>
			{clickAnimations.map((anim) => (
				<div
					key={anim.id}
					style={{
						position: "fixed",
						left: anim.x,
						top: anim.y,
						pointerEvents: "none",
						zIndex: 9999,
						transform: "translate(-50%, -50%)",
						animation: "float-up 1s ease-out forwards",
					}}
					className="border-[1.5px] border-ink bg-mustard px-2 py-0.5 font-mono text-sm font-bold text-ink shadow-[2px_2px_0_var(--ink)]"
					data-game-ignore
				>
					+{Math.floor(anim.amount)}
					{anim.combo > 1 && (
						<span className="ml-1 font-pixel text-xs text-tomato">x{anim.combo.toFixed(1)}</span>
					)}
				</div>
			))}
			<div
				className="pointer-events-none fixed top-[92px] left-1/2 z-[9996] flex -translate-x-1/2 flex-col gap-2"
				data-game-ignore
			>
				<div className="on-paper hard pointer-events-auto relative bg-cream text-ink">
					<div className="flex items-center gap-2 border-b-[1.5px] border-ink px-2.5 py-1">
						<BlinkingLED className="shrink-0" color="#ef5b3b" />
						<span className="stripes h-[10px] flex-1" aria-hidden="true" />
						<span className="font-pixel text-[11px] leading-none">ARCADE DECK</span>
						<span className="stripes h-[10px] flex-1" aria-hidden="true" />
						<BlinkingLED className="shrink-0" color="#f4b829" />
					</div>
					<div className="flex flex-wrap items-center gap-3 px-3.5 py-2 font-mono text-xs text-ink">
						<div className="font-bold">Coins: {format(coins)}</div>
						<div className="border-l-[1.5px] border-ink/30 pl-3">Lvl {playerLevel}</div>
						<div className="border-l-[1.5px] border-ink/30 pl-3">Power {clickPower}x</div>
						<div
							className={`border-l-[1.5px] border-ink/30 pl-3 transition-transform duration-200 ${combo.multiplier > 1 ? "scale-105 font-bold text-tomato" : ""}`}
						>
							Combo {combo.multiplier.toFixed(1)}x
						</div>
						<div className="border-l-[1.5px] border-ink/30 pl-3">Auto {auto.level}</div>
						<button
							type="button"
							onClick={() => toggleShop(true)}
							className="key bg-mustard px-2.5! py-1! text-[11px]! text-ink shadow-[2px_2px_0_var(--ink)]!"
							data-game-ignore
						>
							Shop
						</button>
					</div>
				</div>
				<div
					className="pointer-events-none flex flex-col gap-2"
					aria-live="polite"
					data-game-ignore
				>
					{toasts.map((toast) => (
						<div key={toast.id} className="pointer-events-auto" data-game-ignore>
							<AchievementToast toast={toast} />
						</div>
					))}
				</div>
			</div>
			<ShopModal />
		</>
	);
}
