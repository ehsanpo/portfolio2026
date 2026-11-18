import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
	href?: string;
	text?: string | React.ReactNode;
	children?: React.ReactNode;
	className?: string;
	target?: "_blank" | "_self" | "_parent" | "_top";
	variant?: "primary" | "secondary" | "ghost";
	onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
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
	disabled,
}) => {
	const getVariantClasses = () => {
		if (variant === "secondary") {
			return "key bg-cream text-ink";
		}
		if (variant === "ghost") {
			return "key bg-transparent text-current";
		}
		return "key bg-ink text-cream";
	};

	const Tag = href ? "a" : "button";
	const content = children ?? text;

	return (
		<Tag
			{...(Tag === "a" ? { href, target } : { type, disabled })}
			onClick={onClick as any}
			className={twMerge(
				getVariantClasses(),
				"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
				disabled && "pointer-events-none cursor-not-allowed opacity-50",
				className
			)}
		>
			{content}
		</Tag>
	);
};

export default Button;
