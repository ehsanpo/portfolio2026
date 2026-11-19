import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { jelly, textRoll } from "@/components/motion/hover";

interface ButtonProps {
	href?: string;
	text?: string | React.ReactNode;
	children?: React.ReactNode;
	className?: string;
	target?: "_blank" | "_self" | "_parent" | "_top";
	variant?: "primary" | "secondary" | "ghost";
	hoverEffect?: "roll" | "jelly" | "none";
	onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	"aria-label"?: string;
}

const Button: React.FC<ButtonProps> = ({
	href,
	text,
	children,
	className,
	target = "_self",
	variant = "primary",
	hoverEffect = "roll",
	onClick,
	type = "button",
	disabled,
	"aria-label": ariaLabel,
}) => {
	const controlRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

	useEffect(() => {
		const el = controlRef.current;
		if (!el || disabled || hoverEffect === "none") return;

		if (hoverEffect === "jelly") {
			return jelly(el);
		}
		return textRoll(el);
	}, [disabled, hoverEffect]);

	const getVariantClasses = () => {
		if (variant === "secondary") {
			return "key bg-cream text-ink";
		}
		if (variant === "ghost") {
			return "key bg-transparent text-current";
		}
		return "key bg-ink text-cream";
	};

	const content = children ?? text;
	const sharedClassName = twMerge(
		getVariantClasses(),
		"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
		disabled && "pointer-events-none cursor-not-allowed opacity-50",
		className
	);

	const inner = (
		<span data-roll-label className="inline-flex items-center justify-center gap-2">
			{content}
		</span>
	);

	if (href) {
		return (
			<a
				ref={controlRef}
				href={href}
				target={target}
				rel={target === "_blank" ? "noopener noreferrer" : undefined}
				onClick={onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
				className={sharedClassName}
				aria-label={ariaLabel}
			>
				{inner}
			</a>
		);
	}

	return (
		<button
			ref={controlRef}
			type={type}
			disabled={disabled}
			onClick={onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
			className={sharedClassName}
			aria-label={ariaLabel}
		>
			{inner}
		</button>
	);
};

export { Button };
export default Button;
