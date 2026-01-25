import React from "react";
import type { HeadingLevel } from "./types";
import { getHeadingClass } from "./utils";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { motion } from "motion/react";

interface Props {
	level?: HeadingLevel;
	subtitle?: string;
	gradient?: boolean;
	shadow?: boolean;
	floating?: boolean;
	className?: string;
	children?: React.ReactNode;
	backplate?: boolean;
	style?: React.CSSProperties;
}

const Heading: React.FC<Props> = ({
	level = "h2",
	subtitle,
	gradient = false,
	shadow = false,
	floating = false,
	className = "",
	children,
	backplate,
	style,
}) => {
	const Tag = level || "h2";
	const headingClass = getHeadingClass({
		gradient,
		shadow,
		floating,
	});

	return (
		<ParallaxProvider>
			<Tag
				className={`relative pt-12 text-center text-3xl lg:text-7xl ${className} ${
					backplate ? "pb-12" : ""
				}`}
				style={style}
			>
				{backplate && (
					<Parallax
						speed={5}
						className="absolute top-[-10%] left-0 z-10 w-full overflow-hidden text-4xl font-bold opacity-10 blur-sm lg:text-9xl"
					>
						<motion.div
							className="select-none"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: false }}
						>
							{children}
						</motion.div>
					</Parallax>
				)}

				<span className={`${headingClass} text-center1 relative z-20`}>{children}</span>

				{subtitle && (
					<>
						<br />
						<div className="my-3 text-lg">{subtitle}</div>
					</>
				)}
			</Tag>
		</ParallaxProvider>
	);
};

export default Heading;
