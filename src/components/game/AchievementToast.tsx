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
			className="pointer-events-auto rounded-lg border border-amber-200/40 bg-amber-500/15 px-4 py-3 text-sm text-amber-50 shadow-lg shadow-amber-500/20 backdrop-blur"
			data-game-ignore
		>
			<div className="flex items-center gap-2 font-semibold">
				<span aria-hidden="true" role="img">
					🏆
				</span>
				<span>{toast.title}</span>
			</div>
			<p className="mt-1 text-amber-50/90">{toast.message}</p>
			<button
				onClick={() => ack(toast.id)}
				className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-100 underline"
				data-game-ignore
			>
				<span aria-hidden="true" role="img">
					✨
				</span>
				<span>Dismiss</span>
			</button>
		</div>
	);
}
