import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { Pulse } from "@/components/motion/Pulse";
import { underlineSweep } from "@/components/motion/hover";

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

const SCROLL_THRESHOLD = 24;

export function HeaderMinimal({
	logoText = "EHSAN",
	navLinks = [],
	url = "/",
	className,
}: HeaderMinimalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const navRef = useRef<HTMLElement>(null);

	const pathname = url.startsWith("http")
		? new URL(url).pathname
		: new URL(url, "https://localhost").pathname;
	const currentPage = pathname.split("/").filter(Boolean)[0] || "/";

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) setIsOpen(false);
		};
		const handleScroll = () => {
			setScrolled(window.scrollY > SCROLL_THRESHOLD);
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		const currentTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
		setTheme(currentTheme);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const navEl = navRef.current;
		if (!navEl) return;
		const links = Array.from(navEl.querySelectorAll<HTMLElement>("a[data-nav-sweep]"));
		const teardowns = links.map((link) => underlineSweep(link));
		return () => {
			teardowns.forEach((teardown) => teardown());
		};
	}, [navLinks]);

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

	const brandLabel = logoText === "Ehsan Pourhadi" ? "EHSAN" : logoText;

	return (
		<header className={cn("fixed inset-x-0 top-0 z-50", className)}>
			<div
				aria-hidden={scrolled}
				className={cn(
					"block-ink grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
					scrolled ? "pointer-events-none grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
				)}
			>
				<div className="overflow-hidden">
					<div className="container flex h-8 items-center justify-between gap-4">
						<p className="label-mono flex items-center gap-2 text-[10px]!">
							<Pulse colorClassName="bg-tomato" />
							On air
							<span className="hidden opacity-70 sm:inline">Open to interesting problems</span>
						</p>
						<a
							className="label-mono text-[10px]! underline underline-offset-4 hover:text-mustard"
							href="/contact"
							tabIndex={scrolled ? -1 : undefined}
						>
							Say hello
						</a>
					</div>
				</div>
			</div>

			<div
				className={cn(
					"transition-colors duration-200 motion-reduce:transition-none",
					!scrolled && currentPage === "/"
						? "bg-transparent text-ink"
						: "bg-paper/95 text-ink backdrop-blur-xs dark:bg-background/95 dark:text-foreground"
				)}
			>
				<div
					className={cn(
						"container flex items-center justify-between gap-4 transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
						scrolled ? "py-2.5" : "py-3 md:py-4"
					)}
				>
					<div className="flex items-center gap-3">
						<a
							className="font-pixel group relative inline-flex items-center gap-2.5 leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
							href="/"
							aria-label={brandLabel}
						>
							<svg
								width="24"
								height="24"
								className={cn(
									"shrink-0 text-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
									scrolled ? "size-5 scale-100" : "size-7 scale-100 md:size-9"
								)}
								viewBox="0 0 27.8 26.7"
								aria-hidden="true"
							>
								<path
									fill="currentColor"
									d="M0.5,19.4C0.2,19,0,18.7,0,18.2c0-0.4,0.2-0.8,0.5-1.1L17.1,0.5C17.4,0.2,17.8,0,18.2,0c0.4,0,0.8,0.2,1.1,0.5 c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L2.7,19.4c-0.3,0.3-0.7,0.5-1.1,0.5C1.2,19.8,0.8,19.7,0.5,19.4z M12.4,25.6 c-0.3,0.3-0.8,0.6-1.3,0.8s-1,0.3-1.5,0.3c-0.5,0-1.1-0.1-1.6-0.3c-0.5-0.2-1.1-0.5-1.5-1l-2.1-2.1c-0.4-0.4-0.6-0.8-0.5-1.2 c0.1-0.4,0.4-0.8,0.9-1.3L20.6,5c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1 l-15,15L9,23.4c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.5-0.1,0.7-0.4L25.1,8.4C25.4,8.1,25.8,8,26.2,8c0.4,0,0.8,0.2,1.1,0.5 c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L12.4,25.6z"
								/>
							</svg>
							<span
								className={cn(
									"relative inline-grid items-center overflow-hidden transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
									scrolled ? "h-6" : "h-[clamp(2.25rem,6.5vw,4.75rem)]"
								)}
							>
								<span
									aria-hidden={scrolled}
									className={cn(
										"col-start-1 row-start-1 origin-left whitespace-nowrap text-[clamp(2.25rem,6.5vw,4.75rem)] leading-[0.88] tracking-[-0.04em] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
										scrolled
											? "pointer-events-none scale-[0.35] opacity-0 select-none"
											: "scale-100 opacity-100"
									)}
								>
									{brandLabel}
								</span>
								<span
									aria-hidden={!scrolled}
									className={cn(
										"col-start-1 row-start-1 origin-left whitespace-nowrap text-xl leading-none tracking-tight transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
										scrolled
											? "scale-100 opacity-100"
											: "pointer-events-none scale-125 opacity-0 select-none"
									)}
								>
									EP
								</span>
							</span>
						</a>
					</div>

					<nav ref={navRef} className="hidden items-center gap-7 md:flex" aria-label="Main">
						{navLinks.map((link) => (
							<a
								key={link.key}
								href={link.href}
								data-game-nav-link
								data-nav-sweep
								className={cn(
									"label-mono relative py-0.5 underline-offset-4",
									currentPage === link.key ? "underline decoration-brand decoration-2" : ""
								)}
							>
								{link.text}
							</a>
						))}
					</nav>

					<div className="flex items-center gap-1 md:gap-2">
						<button
							type="button"
							onClick={handleSearchClick}
							className="inline-flex size-10 items-center justify-center text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
							title="Search (Ctrl+K)"
							aria-label="Search (Ctrl+K)"
						>
							<Icons.Search className="size-4 shrink-0" />
						</button>

						<button
							type="button"
							onClick={toggleTheme}
							className="inline-flex size-10 items-center justify-center text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
							title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
							aria-label="Toggle theme"
						>
							{theme === "dark" ? (
								<Icons.Moon className="size-4 shrink-0" />
							) : (
								<Icons.Sun className="size-4 shrink-0" />
							)}
						</button>

						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="inline-flex size-10 items-center justify-center text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:hidden"
							aria-label={isOpen ? "Close menu" : "Open menu"}
							aria-expanded={isOpen}
						>
							{isOpen ? (
								<Icons.X className="size-4 shrink-0" />
							) : (
								<Icons.Menu className="size-4 shrink-0" />
							)}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="container md:hidden">
					<div className="on-paper hard bg-cream mt-2 flex flex-col divide-y-[1.5px] divide-ink">
						<div className="flex items-center gap-3 border-b-[1.5px] border-ink px-2.5 py-1.5">
							<span className="size-2.5 shrink-0 border-[1.5px] border-ink bg-tomato" aria-hidden="true" />
							<span className="stripes h-[11px] flex-1" aria-hidden="true" />
							<span className="font-pixel text-xs leading-none">DIRECTORY</span>
							<span className="stripes h-[11px] flex-1" aria-hidden="true" />
						</div>
						{navLinks.map((link) => (
							<a
								key={link.key}
								href={link.href}
								data-game-nav-link
								onClick={() => setIsOpen(false)}
								className={cn(
									"label-mono flex items-center justify-between px-4 py-3.5 text-ink transition-colors hover:bg-mustard",
									currentPage === link.key ? "bg-mustard font-bold" : ""
								)}
							>
								<span>{link.text}</span>
								<Icons.ArrowUpRight className="size-3.5 shrink-0" />
							</a>
						))}
					</div>
				</div>
			)}
		</header>
	);
}
