import { useEffect } from "react";
import { useGameStore } from "../../game";
import type { ToastItem } from "../../game";

interface Props {
	toast: ToastItem;
}

export function AchievementToast({ toast }: Props) {
	const ack = useGameStore((s) => s.ackToast);

	useEffect(() => {
		const id = setTimeout(() => ack(toast.id), 4200);
		return () => clearTimeout(id);
	}, [toast.id, ack]);

	return (
		<div
			className="on-paper hard pointer-events-auto bg-cream text-ink"
			data-game-ignore
		>
			<div className="flex items-center gap-2 border-b-[1.5px] border-ink px-2.5 py-1">
				<span className="size-2.5 shrink-0 border border-ink bg-mustard" aria-hidden="true" />
				<span className="stripes h-[10px] flex-1" aria-hidden="true" />
				<span className="font-pixel text-[11px] leading-none">UNLOCKED</span>
				<span className="stripes h-[10px] flex-1" aria-hidden="true" />
			</div>
			<div className="px-3.5 py-2.5 text-sm text-ink">
				<div className="font-mono text-xs font-bold">{toast.title}</div>
				<p className="mt-1 font-mono text-xs text-ink/80">{toast.message}</p>
				<button
					type="button"
					onClick={() => ack(toast.id)}
					className="key mt-2.5 bg-paper px-2.5! py-1! text-[10px]! text-ink shadow-[2px_2px_0_var(--ink)]!"
					data-game-ignore
				>
					<span>Dismiss</span>
				</button>
			</div>
		</div>
	);
}
