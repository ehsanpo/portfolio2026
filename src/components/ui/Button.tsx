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
        `group inline-flex relative transition-all text-center items-center 
        justify-center duration-400 ease-in-out outline focus:outline-offset-4 oultine-offset-base-900 font-medium 
        focus-visible:outline-none focus:outline-2 text-black bg-linear-to-tr/oklch
        h-12 px-8 py-3 text-lg rounded-xl`,
        getColorClasses(),
        className,
      )}
    >
      <div className="relative flex items-center justify-center overflow-hidden px-4 pb-2 pt-[11px] font-basement">
        <div className="relative z-20">
          <div className="duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] transform transition-transform group-hover:-translate-y-10">
            {content}
          </div>
          <div className="duration-300 absolute left-0 top-10 transition-all group-hover:top-0">
            {content}
          </div>
        </div>
      </div>
    </Tag>
  );
};

export default Button;
