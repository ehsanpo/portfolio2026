import clsx from "clsx";
import { buildShop, useGameStore } from "../../game";
import type { ShopItemDefinition } from "../../game";

const format = (value: number) => Math.floor(value).toLocaleString();

export function ShopModal() {
	const state = useGameStore((s) => s);
	const toggleShop = useGameStore((s) => s.toggleShop);
	const exitGame = useGameStore((s) => s.exitGame);
	const purchase = useGameStore((s) => s.purchaseItem);
	const items = buildShop(state);

	const renderItem = (item: ShopItemDefinition) => {
		const cost = item.cost(state);
		const alreadyUnlocked = item.target ? state.unlocks[item.target] : false;
		const disabled = state.coins < cost || alreadyUnlocked;
		const helper = item.target ? (alreadyUnlocked ? "Unlocked" : "Locked") : "Upgrade";
		return (
			<li
				key={item.id}
				className="flex flex-col gap-1 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white"
				data-game-ignore
			>
				<div className="flex items-center justify-between">
					<div>
						<p className="font-semibold">{item.title}</p>
						<p className="text-xs text-gray-200">{item.description}</p>
					</div>
					<div className="text-right text-xs text-amber-200">{format(cost)} coins</div>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-[11px] tracking-wide text-gray-300 uppercase">{helper}</span>
					<button
						onClick={() => purchase(item.id)}
						disabled={disabled}
						className={clsx(
							"rounded-md px-3 py-1 text-xs font-semibold transition",
							disabled
								? "cursor-not-allowed bg-white/10 text-gray-300"
								: "bg-primary-500 hover:bg-primary-400 text-black"
						)}
						data-game-ignore
					>
						{alreadyUnlocked ? "Unlocked" : "Buy"}
					</button>
				</div>
			</li>
		);
	};

	if (!state.shopOpen) return null;

	return (
		<div
			className="fixed inset-0 z-[9997] flex items-center justify-center bg-black/70 p-4"
			data-game-ignore
		>
			<div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900/90 p-5 shadow-2xl backdrop-blur">
				<div className="mb-3 flex items-start justify-between text-white">
					<div>
						<h2 className="text-lg font-bold">Game Shop</h2>
						<p className="text-xs text-gray-300">Spend coins to unlock links and upgrades.</p>
					</div>
					<button
						onClick={() => toggleShop(false)}
						className="rounded-full px-2 py-1 text-xs text-gray-200 hover:bg-white/10"
						data-game-ignore
					>
						Close
					</button>
				</div>
				<ul className="flex max-h-[60vh] flex-col gap-3 overflow-auto pr-1" data-game-ignore>
					{items.map(renderItem)}
				</ul>
				<div
					className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
					data-game-ignore
				>
					<div className="flex flex-col">
						<span className="font-semibold">Exit game mode</span>
						<span className="text-[11px] text-gray-300">
							Pause HUD, stop auto-click, close shop.
						</span>
					</div>
					<button
						onClick={() => {
							exitGame();
						}}
						className="rounded-md bg-red-500/90 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-red-400"
						data-game-ignore
					>
						Exit
					</button>
				</div>
			</div>
		</div>
	);
}
