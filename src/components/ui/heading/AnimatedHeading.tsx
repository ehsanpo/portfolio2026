import { motion } from "framer-motion";
import type { HeadingLevel, HeadingStyles } from "./types";
import { getHeadingClass } from "./utils";

interface AnimatedHeadingProps extends HeadingStyles {
	level?: HeadingLevel;
	children: React.ReactNode;
	className?: string;
}

export function AnimatedHeading({
	level: Tag = "h2",
	gradient,
	shadow,
	floating,
	className = "",
	children,
}: AnimatedHeadingProps) {
	const headingClass = getHeadingClass({ gradient, shadow, floating });

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<Tag className={`${headingClass} ${className}`}>{children}</Tag>
		</motion.div>
	);
}
