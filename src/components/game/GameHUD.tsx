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
			{/* Click animations */}
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
					className="text-xl font-bold text-yellow-400"
					data-game-ignore
				>
					+{Math.floor(anim.amount)}💰
					{anim.combo > 1 && (
						<span className="ml-1 text-sm text-cyan-300">x{anim.combo.toFixed(1)}</span>
					)}
				</div>
			))}
			<div className="wires fixed top-[80px] right-0 left-0 z-40 m-auto flex w-80 justify-between">
				<svg
					className="fill-primary-700 relative top-[-33px] w-20"
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					viewBox="-5.0 -10.0 110.0 135.0"
				>
					<path d="m65.625 74.664c-2.9062 2.3203-7.7422 3.4492-13.27 3.0977-6.7461-0.42969-13.996-2.9375-20.969-7.2578-0.30078-0.1875-0.65625-0.26172-1.0078-0.21094-1.3086 0.19141-2.2422 0.77734-2.7773 1.7461-0.42578 0.76563-0.5 1.5938-0.5625 2.3242-0.10156 1.1406-0.19141 1.3945-0.5625 1.5938-0.47266 0.25391-0.77344 0.73828-0.78906 1.2734-0.015625 0.53516 0.25391 1.0391 0.71094 1.3203 8.293 5.1367 17.059 8.1289 25.355 8.6562 0.86719 0.054688 1.7383 0.082031 2.582 0.082031 3.4141 0 6.6172-0.44141 9.5195-1.3164 2.957-0.89062 5.5391-2.207 7.6758-3.9141 2.7891-2.2266 4.75-5.1055 5.6641-8.3164 0.95313-3.3477 0.78906-6.9258-0.48437-10.637-1.0195-2.9688-2.5742-5.4062-4.6133-7.2422-1.8477-1.6641-4.125-2.8555-6.7656-3.5469-4.3359-1.1328-9.0508-0.80078-13.609-0.48047-10.098 0.71094-14.082 0.38672-15.832-5.875-1.3867-4.9531 0.45312-9.6992 5.4688-14.109 4.2422-3.7305 9.1875-5.8008 9.3008-5.8477 2.0391-0.82812 3.1914-2.9336 2.9062-5.0195l8.9727-3.8164c0.76172-0.32422 1.1172-1.2031 0.79297-1.9688-0.32422-0.76172-1.2031-1.1172-1.9688-0.79297l-9.125 3.8789c-1.3047-1.3125-3.3203-1.793-5.1406-1.0586-0.25781 0.10547-6.3477 2.5977-11.852 7.3906-3.4062 2.9648-5.918 6.2148-7.4609 9.6602-2.043 4.5547-2.3828 9.3438-1.0156 14.234 0.91797 3.2812 2.4062 5.9844 4.418 8.0391 1.8633 1.9023 4.2031 3.2773 6.957 4.0859 4.5195 1.3281 9.4648 0.98047 14.246 0.64062 3.9727-0.28125 7.7227-0.54297 10.551 0.19531 2.5273 0.66016 3.8789 1.9805 4.8164 4.707 1.2109 3.5352 0.49609 6.3867-2.1328 8.4844zm5.4023-2.9062c0.51562-2.0039 0.37109-4.2031-0.43359-6.5391-1.2617-3.6719-3.3906-5.7188-6.8945-6.6328-3.3047-0.86328-7.2969-0.58203-11.52-0.28516-4.5156 0.31641-9.1875 0.64453-13.188-0.52734-2.2539-0.66016-4.1562-1.7734-5.6562-3.3047-1.6562-1.6914-2.8906-3.9609-3.6719-6.75-1.1758-4.1953-0.88281-8.3008 0.86328-12.199 1.3672-3.0469 3.6172-5.9492 6.6953-8.625 5.1289-4.4648 10.77-6.7734 11.008-6.8711 0.88672-0.35938 1.8984 0.070312 2.2578 0.95703s-0.070312 1.8984-0.95703 2.2578c0 0-0.003906 0-0.003906 0.003907-0.22266 0.089843-5.4883 2.2773-10.145 6.3711-2.9141 2.5625-4.9414 5.3008-6.0156 8.1406-1.1016 2.9141-1.2266 5.9492-0.36328 9.0312 1.1602 4.1406 3.3477 6.5703 6.8789 7.6406 3.1406 0.94922 7.1445 0.76172 12.051 0.41797 4.3164-0.30469 8.7852-0.61719 12.641 0.39062 2.1719 0.56641 4.0273 1.5352 5.5156 2.875 1.6562 1.4922 2.9297 3.5078 3.7812 5.9883 1.0703 3.1172 1.2188 6.0898 0.4375 8.8398-0.74219 2.6094-2.3516 4.9609-4.6484 6.7969-3.6953 2.9492-9.1367 4.5742-15.324 4.5742-0.78516 0-1.5898-0.027344-2.3945-0.078125-7.2969-0.46484-15.02-2.9766-22.426-7.2891 0.37891-0.79297 0.45312-1.6406 0.51172-2.3008 0.074218-0.83203 0.11328-1.1211 0.31641-1.2461 7.2266 4.375 14.762 6.9219 21.82 7.3711 0.71484 0.046875 1.4219 0.066406 2.1172 0.066406 5.3945 0 10.133-1.3516 13.215-3.8125 1.8203-1.4609 3.0078-3.2305 3.5312-5.2617z" />
				</svg>
				<svg
					className="fill-primary-800 relative top-[-62px] w-16 rotate-180"
					xmlns="http://www.w3.org/2000/svg"
					version="1.1"
					viewBox="-5.0 -10.0 110.0 135.0"
				>
					<path d="m65.625 74.664c-2.9062 2.3203-7.7422 3.4492-13.27 3.0977-6.7461-0.42969-13.996-2.9375-20.969-7.2578-0.30078-0.1875-0.65625-0.26172-1.0078-0.21094-1.3086 0.19141-2.2422 0.77734-2.7773 1.7461-0.42578 0.76563-0.5 1.5938-0.5625 2.3242-0.10156 1.1406-0.19141 1.3945-0.5625 1.5938-0.47266 0.25391-0.77344 0.73828-0.78906 1.2734-0.015625 0.53516 0.25391 1.0391 0.71094 1.3203 8.293 5.1367 17.059 8.1289 25.355 8.6562 0.86719 0.054688 1.7383 0.082031 2.582 0.082031 3.4141 0 6.6172-0.44141 9.5195-1.3164 2.957-0.89062 5.5391-2.207 7.6758-3.9141 2.7891-2.2266 4.75-5.1055 5.6641-8.3164 0.95313-3.3477 0.78906-6.9258-0.48437-10.637-1.0195-2.9688-2.5742-5.4062-4.6133-7.2422-1.8477-1.6641-4.125-2.8555-6.7656-3.5469-4.3359-1.1328-9.0508-0.80078-13.609-0.48047-10.098 0.71094-14.082 0.38672-15.832-5.875-1.3867-4.9531 0.45312-9.6992 5.4688-14.109 4.2422-3.7305 9.1875-5.8008 9.3008-5.8477 2.0391-0.82812 3.1914-2.9336 2.9062-5.0195l8.9727-3.8164c0.76172-0.32422 1.1172-1.2031 0.79297-1.9688-0.32422-0.76172-1.2031-1.1172-1.9688-0.79297l-9.125 3.8789c-1.3047-1.3125-3.3203-1.793-5.1406-1.0586-0.25781 0.10547-6.3477 2.5977-11.852 7.3906-3.4062 2.9648-5.918 6.2148-7.4609 9.6602-2.043 4.5547-2.3828 9.3438-1.0156 14.234 0.91797 3.2812 2.4062 5.9844 4.418 8.0391 1.8633 1.9023 4.2031 3.2773 6.957 4.0859 4.5195 1.3281 9.4648 0.98047 14.246 0.64062 3.9727-0.28125 7.7227-0.54297 10.551 0.19531 2.5273 0.66016 3.8789 1.9805 4.8164 4.707 1.2109 3.5352 0.49609 6.3867-2.1328 8.4844zm5.4023-2.9062c0.51562-2.0039 0.37109-4.2031-0.43359-6.5391-1.2617-3.6719-3.3906-5.7188-6.8945-6.6328-3.3047-0.86328-7.2969-0.58203-11.52-0.28516-4.5156 0.31641-9.1875 0.64453-13.188-0.52734-2.2539-0.66016-4.1562-1.7734-5.6562-3.3047-1.6562-1.6914-2.8906-3.9609-3.6719-6.75-1.1758-4.1953-0.88281-8.3008 0.86328-12.199 1.3672-3.0469 3.6172-5.9492 6.6953-8.625 5.1289-4.4648 10.77-6.7734 11.008-6.8711 0.88672-0.35938 1.8984 0.070312 2.2578 0.95703s-0.070312 1.8984-0.95703 2.2578c0 0-0.003906 0-0.003906 0.003907-0.22266 0.089843-5.4883 2.2773-10.145 6.3711-2.9141 2.5625-4.9414 5.3008-6.0156 8.1406-1.1016 2.9141-1.2266 5.9492-0.36328 9.0312 1.1602 4.1406 3.3477 6.5703 6.8789 7.6406 3.1406 0.94922 7.1445 0.76172 12.051 0.41797 4.3164-0.30469 8.7852-0.61719 12.641 0.39062 2.1719 0.56641 4.0273 1.5352 5.5156 2.875 1.6562 1.4922 2.9297 3.5078 3.7812 5.9883 1.0703 3.1172 1.2188 6.0898 0.4375 8.8398-0.74219 2.6094-2.3516 4.9609-4.6484 6.7969-3.6953 2.9492-9.1367 4.5742-15.324 4.5742-0.78516 0-1.5898-0.027344-2.3945-0.078125-7.2969-0.46484-15.02-2.9766-22.426-7.2891 0.37891-0.79297 0.45312-1.6406 0.51172-2.3008 0.074218-0.83203 0.11328-1.1211 0.31641-1.2461 7.2266 4.375 14.762 6.9219 21.82 7.3711 0.71484 0.046875 1.4219 0.066406 2.1172 0.066406 5.3945 0 10.133-1.3516 13.215-3.8125 1.8203-1.4609 3.0078-3.2305 3.5312-5.2617z" />
				</svg>
			</div>
			<div
				className="pointer-events-none fixed top-[86px] left-1/2 z-[9996] flex -translate-x-1/2 flex-col gap-2 text-white"
				data-game-ignore
			>
				<div className="clip pointer-events-auto relative flex items-center gap-3 rounded-sm bg-white/90 px-5 py-3 text-sm shadow-lg backdrop-blur dark:bg-neutral-900/80">
					<BlinkingLED className="absolute -top-1 left-2 -translate-y-1/2" color="#ce8b00" />
					<BlinkingLED className="absolute -top-1 right-2 -translate-y-1/2" color="#ce8b00" />
					<div className="font-semibold">Coins: {format(coins)}</div>
					<div className="text-xs text-amber-200">Lvl {playerLevel}</div>
					<div className="text-xs text-green-200">Power {clickPower}x</div>
					<div
						className={`text-xs transition-all duration-200 ${combo.multiplier > 1 ? "scale-110 font-bold text-cyan-400" : "text-cyan-200"}`}
					>
						Combo {combo.multiplier.toFixed(1)}x
					</div>
					<div className="text-xs text-purple-200">Auto {auto.level}</div>
					<button
						onClick={() => toggleShop(true)}
						className="bg-primary-500 rounded-full px-3 py-1 text-xs font-semibold text-black shadow"
						data-game-ignore
					>
						Shop
					</button>
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
