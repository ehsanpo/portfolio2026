import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

export interface NavLink {
	key: string;
	href: string;
	text: string;
}

export interface HeaderMinimalProps {
	logoText?: string;
	navLinks?: NavLink[];
	url?: string;
	className?: string;
}

export function HeaderMinimal({
	logoText = "Ehsan Pourhadi",
	navLinks = [],
	url = "home",
	className,
}: HeaderMinimalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("dark");
	const Newurl = new URL(url);
	const currentPage = Newurl.pathname.split("/").filter(Boolean)[0] || "/";

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) setIsOpen(false);
		};
		window.addEventListener("resize", handleResize);

		const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
		setTheme(currentTheme);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
			document.documentElement.classList.remove("light");
		} else {
			document.documentElement.classList.remove("dark");
			document.documentElement.classList.add("light");
		}
		localStorage.setItem("theme", newTheme);
	};

	const handleSearchClick = () => {
		const docSearchButton = document.querySelector(".DocSearch-Button") as HTMLElement;
		if (docSearchButton) {
			docSearchButton.click();
			return;
		}

		const event = new KeyboardEvent("keydown", {
			key: "k",
			code: "KeyK",
			ctrlKey: true,
			bubbles: true,
			cancelable: true,
		});
		document.dispatchEvent(event);

		const metaEvent = new KeyboardEvent("keydown", {
			key: "k",
			code: "KeyK",
			metaKey: true,
			bubbles: true,
			cancelable: true,
		});
		document.dispatchEvent(metaEvent);
	};

	return (
		<nav
			className={cn(
				"fixed top-1 left-1/2 z-[100] w-[92%] -translate-x-1/2 transition-all duration-300",
				className
			)}
		>
			<div className="flex items-center justify-between rounded-full border border-black/5 bg-white/80 px-4 py-2.5 shadow-2xl shadow-black/5 backdrop-blur-xl md:px-6 md:py-3 dark:border-white/10 dark:bg-[#050505]/80 dark:shadow-black/50">
				<a
					href="/"
					className="group flex shrink-0 items-center gap-2.5 text-lg font-black tracking-tighter uppercase"
				>
					<svg
						width="36px"
						className="text-primary h-6 w-6"
						data-rellax-speed="-7"
						version="1.1"
						viewBox="0 0 27.8 26.7"
						xmlSpace="preserve"
					>
						<path
							fill="currentColor"
							className="st1"
							d="M0.5,19.4C0.2,19,0,18.7,0,18.2c0-0.4,0.2-0.8,0.5-1.1L17.1,0.5C17.4,0.2,17.8,0,18.2,0c0.4,0,0.8,0.2,1.1,0.5
          c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L2.7,19.4c-0.3,0.3-0.7,0.5-1.1,0.5C1.2,19.8,0.8,19.7,0.5,19.4z M12.4,25.6
          c-0.3,0.3-0.8,0.6-1.3,0.8s-1,0.3-1.5,0.3c-0.5,0-1.1-0.1-1.6-0.3c-0.5-0.2-1.1-0.5-1.5-1l-2.1-2.1c-0.4-0.4-0.6-0.8-0.5-1.2
          c0.1-0.4,0.4-0.8,0.9-1.3L20.6,5c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1
          l-15,15L9,23.4c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.5-0.1,0.7-0.4L25.1,8.4C25.4,8.1,25.8,8,26.2,8c0.4,0,0.8,0.2,1.1,0.5
          c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L12.4,25.6z"
						></path>
					</svg>

					<span className="bg-gradient-to-r from-[#F24E1E] via-[#FFC700] to-[#1ABCFE] bg-clip-text text-base text-neutral-900 transition-all duration-300 group-hover:text-transparent md:text-lg dark:text-white">
						{logoText}
					</span>
				</a>

				<div className="hidden gap-8 font-mono font-medium tracking-widest text-neutral-600 md:flex dark:text-white/70">
					{navLinks.map((link) => (
						<a
							key={link.key}
							href={link.href}
							data-game-nav-link
							className={cn(
								"after:bg-primary relative transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:transition-all hover:text-neutral-900 hover:after:w-full dark:hover:text-white",
								currentPage === link.key ? "text-neutral-900 after:w-full dark:text-white" : ""
							)}
						>
							{link.text}
						</a>
					))}
				</div>

				<div className="flex items-center gap-2">
					<button
						onClick={handleSearchClick}
						className="group relative rounded-full p-2 text-neutral-500 transition-all hover:bg-neutral-100 dark:text-white/70 dark:hover:bg-white/10"
						title="Search (Ctrl+K)"
					>
						<Icons.Search className="h-5 w-5 transition-transform group-hover:scale-110" />
						<span className="sr-only">Search</span>
					</button>

					<button
						onClick={toggleTheme}
						className="group relative overflow-hidden rounded-full p-2 text-neutral-500 transition-all hover:bg-neutral-100 dark:text-white/70 dark:hover:bg-white/10"
						title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
					>
						<div className="relative h-5 w-5">
							<Icons.Sun
								className={cn(
									"absolute h-5 w-5 transform transition-all duration-500",
									theme === "dark"
										? "translate-y-8 rotate-12 opacity-0"
										: "translate-y-0 rotate-0 opacity-100"
								)}
							/>
							<Icons.Moon
								className={cn(
									"absolute h-5 w-5 transform transition-all duration-500",
									theme === "dark"
										? "translate-y-0 rotate-0 opacity-100"
										: "-translate-y-8 -rotate-12 opacity-0"
								)}
							/>
						</div>
						<span className="sr-only">Toggle theme</span>
					</button>

					<button
						onClick={() => setIsOpen(!isOpen)}
						className="rounded-full p-1.5 text-neutral-900 transition-colors hover:bg-neutral-100 active:scale-90 md:hidden dark:text-white/90 dark:hover:bg-white/10"
					>
						{isOpen ? <Icons.X className="h-5 w-5" /> : <Icons.Menu className="h-5 w-5" />}
					</button>
				</div>
			</div>

			<div
				className={cn(
					"absolute top-[calc(100%+12px)] right-0 left-0 origin-top flex-col gap-2 rounded-3xl border border-black/5 bg-white/95 p-4 shadow-2xl ring-1 shadow-black/10 ring-black/5 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-[#0a0a0a]/95 dark:shadow-black/80 dark:ring-white/5",
					isOpen ? "flex scale-100 opacity-100" : "hidden scale-95 opacity-0"
				)}
			>
				{navLinks.map((link) => (
					<a
						key={link.key}
						href={link.href}
						onClick={() => setIsOpen(false)}
						className={cn(
							"group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all",
							currentPage === link.key
								? "bg-neutral-100 text-neutral-900 dark:bg-white/10 dark:text-white"
								: "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
						)}
					>
						{link.text}
						<Icons.ChevronRight className="h-4 w-4 -translate-x-2 text-neutral-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 dark:text-white/50" />
					</a>
				))}
			</div>
		</nav>
	);
}
