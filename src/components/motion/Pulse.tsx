import { cn } from "@/lib/utils";

export interface PulseProps {
	className?: string;
	colorClassName?: string;
	label?: string;
}

export function Pulse({ className, colorClassName = "bg-tomato", label }: PulseProps) {
	return (
		<span className={cn("relative inline-flex size-2 shrink-0 items-center justify-center", className)}>
			<span
				className={cn(
					"absolute inline-flex size-full animate-ping opacity-75 motion-reduce:hidden",
					colorClassName
				)}
				aria-hidden="true"
			/>
			<span className={cn("relative inline-flex size-2", colorClassName)} aria-hidden="true" />
			{label ? <span className="sr-only">{label}</span> : null}
		</span>
	);
}
