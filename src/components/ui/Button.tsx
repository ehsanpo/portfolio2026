import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
	href?: string;
	text?: string | React.ReactNode;
	children?: React.ReactNode;
	className?: string;
	target?: "_blank" | "_self" | "_parent" | "_top";
	variant?: "primary" | "secondary";
	onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
	href,
	text,
	children,
	className,
	target = "_self",
	variant = "primary",
	onClick,
	type = "button",
}) => {
	const getColorClasses = () => {
		if (variant === "secondary") {
			return "from-accent via-accent-500 to-accent-600 hover:to-secondary-600 focus:outline-secondary-600 outline-accent-600 hover:outline-accent-500";
		}
		return "from-primary via-from-primary-600 to-secondary-500 hover:to-accent-600 focus:outline-accent-600 outline-secondary-600 hover:outline-accent-600";
	};

	const Tag = href ? "a" : "button";
	const content = children ?? text;

	return (
		<Tag
			{...(Tag === "a" ? { href, target } : { type })}
			onClick={onClick as any}
			className={twMerge(
				`group oultine-offset-base-900 relative inline-flex h-12 items-center justify-center rounded-xl bg-linear-to-tr/oklch px-8 py-3 text-center text-lg font-medium text-black outline transition-all duration-400 ease-in-out focus:outline-2 focus:outline-offset-4 focus-visible:outline-none`,
				getColorClasses(),
				className
			)}
		>
			<div className="font-basement relative flex items-center justify-center overflow-hidden px-4 pt-[11px] pb-2">
				<div className="relative z-20">
					<div className="transform transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-10">
						{content}
					</div>
					<div className="absolute top-10 left-0 transition-all duration-300 group-hover:top-0">
						{content}
					</div>
				</div>
			</div>
		</Tag>
	);
};

export default Button;
