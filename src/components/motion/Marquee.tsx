import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps {
	children: ReactNode;
	pauseOnHover?: boolean;
	className?: string;
	trackClassName?: string;
}

export function Marquee({
	children,
	pauseOnHover = true,
	className,
	trackClassName,
}: MarqueeProps) {
	return (
		<div
			className={cn(
				"group relative flex overflow-hidden",
				className
			)}
		>
			<div
				className={cn(
					"flex w-max shrink-0 items-center animate-marquee motion-reduce:animate-none",
					pauseOnHover && "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
					trackClassName
				)}
			>
				<div className="flex shrink-0 items-center">{children}</div>
				<div className="flex shrink-0 items-center" aria-hidden="true">
					{children}
				</div>
			</div>
		</div>
	);
}
