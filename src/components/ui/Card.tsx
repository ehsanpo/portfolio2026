import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
	title?: string;
	icon?: ReactNode;
	action?: ReactNode;
	children: ReactNode;
	className?: string;
}

export function Card({ title, icon, action, children, className }: CardProps) {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm",
				className
			)}
		>
			{(title || icon || action) && (
				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center gap-3">
						{icon && <div className="shrink-0">{icon}</div>}
						{title && <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>}
					</div>
					{action && <div className="shrink-0">{action}</div>}
				</div>
			)}
			<div className="text-gray-600 dark:text-gray-300">{children}</div>
		</div>
	);
}

export default Card;
