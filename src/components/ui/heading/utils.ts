import type { HeadingStyles } from "./types";

export function getHeadingClass({ gradient, shadow, floating }: HeadingStyles): string {
	const baseClasses = ["font-bold", "text-gray-900", "text-white", "transition-all"];

	if (gradient) {
		baseClasses.push("!text-primary-500");
	}

	if (floating) {
		baseClasses.push("hover:-translate-y-1", "hover:drop-shadow-xl", "duration-300");
	}

	return baseClasses.join(" ");
}
