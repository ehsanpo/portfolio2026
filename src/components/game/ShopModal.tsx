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
				className="flex flex-col gap-2 border-[1.5px] border-ink bg-paper p-3 text-sm text-ink"
				data-game-ignore
			>
				<div className="flex items-start justify-between gap-3">
					<div>
						<p className="font-bold tracking-tight text-ink">{item.title}</p>
						<p className="mt-0.5 font-mono text-xs text-ink/75">{item.description}</p>
					</div>
					<div className="shrink-0 font-mono text-xs font-bold text-ink">{format(cost)} coins</div>
				</div>
				<div className="flex items-center justify-between border-t border-ink/20 pt-2">
					<span className="label-mono text-[10px]! text-ink/70">{helper}</span>
					<button
						type="button"
						onClick={() => purchase(item.id)}
						disabled={disabled}
						className={clsx(
							"key px-3! py-1! text-[11px]! shadow-[2px_2px_0_var(--ink)]!",
							disabled
								? "cursor-not-allowed bg-paper text-ink/40 opacity-60"
								: "bg-mustard text-ink"
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
			className="fixed inset-0 z-[9997] flex items-center justify-center bg-ink/80 p-4"
			data-game-ignore
		>
			<div className="on-paper hard w-full max-w-md bg-cream text-ink">
				<div className="flex items-center gap-3 border-b-[1.5px] border-ink px-3 py-2">
					<span className="size-3 shrink-0 border-[1.5px] border-ink bg-tomato" aria-hidden="true" />
					<span className="stripes h-[13px] flex-1" aria-hidden="true" />
					<h2 className="font-pixel text-sm leading-none">GAME SHOP</h2>
					<span className="stripes h-[13px] flex-1" aria-hidden="true" />
					<button
						type="button"
						onClick={() => toggleShop(false)}
						className="key bg-paper px-2! py-0.5! text-[10px]! text-ink shadow-[2px_2px_0_var(--ink)]!"
						data-game-ignore
					>
						Close
					</button>
				</div>
				<div className="p-4">
					<p className="mb-3 font-mono text-xs text-ink/80">
						Spend coins to unlock links and upgrades.
					</p>
					<ul className="flex max-h-[55vh] flex-col gap-3 overflow-auto pr-1" data-game-ignore>
						{items.map(renderItem)}
					</ul>
					<div
						className="mt-4 flex items-center justify-between border-[1.5px] border-ink bg-paper px-3 py-2.5 text-sm text-ink"
						data-game-ignore
					>
						<div className="flex flex-col">
							<span className="font-mono text-xs font-bold">Exit game mode</span>
							<span className="font-mono text-[11px] text-ink/75">
								Pause HUD, stop auto-click, close shop.
							</span>
						</div>
						<button
							type="button"
							onClick={() => {
								exitGame();
							}}
							className="key bg-tomato px-3! py-1! text-[11px]! text-ink shadow-[2px_2px_0_var(--ink)]!"
							data-game-ignore
						>
							Exit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
