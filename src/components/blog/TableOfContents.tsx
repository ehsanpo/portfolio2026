import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ChevronDown, List } from "lucide-react";

export interface TocHeading {
	depth: number;
	slug: string;
	text: string;
}

interface TableOfContentsProps {
	headings: TocHeading[];
	variant: "desktop" | "mobile";
}

function useActiveHeading(headings: TocHeading[]) {
	const [activeSlug, setActiveSlug] = useState<string>(() => headings[0]?.slug ?? "");

	useEffect(() => {
		if (headings.length === 0) return;

		const elements = headings
			.map((h) => document.getElementById(h.slug))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		setActiveSlug(elements[0].id);

		const visibleIds = new Set<string>();

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						visibleIds.add(entry.target.id);
					} else {
						visibleIds.delete(entry.target.id);
					}
				}

				if (visibleIds.size > 0) {
					const firstVisible = elements.find((el) => visibleIds.has(el.id));
					if (firstVisible) {
						setActiveSlug(firstVisible.id);
					}
					return;
				}

				// Fallback when scrolled between headings: pick the last heading above the fold.
				const offset = 120;
				let current = elements[0].id;
				for (const el of elements) {
					if (el.getBoundingClientRect().top <= offset) {
						current = el.id;
					} else {
						break;
					}
				}
				setActiveSlug(current);
			},
			{
				rootMargin: "-96px 0px -65% 0px",
				threshold: [0, 1],
			}
		);

		for (const el of elements) {
			observer.observe(el);
		}

		const handleScrollBottom = () => {
			const scrolledToBottom =
				window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
			if (scrolledToBottom) {
				const last = elements[elements.length - 1];
				if (last) setActiveSlug(last.id);
			}
		};

		window.addEventListener("scroll", handleScrollBottom, { passive: true });

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", handleScrollBottom);
		};
	}, [headings]);

	return [activeSlug, setActiveSlug] as const;
}

export function TableOfContents({ headings, variant }: TableOfContentsProps) {
	const [activeSlug, setActiveSlug] = useActiveHeading(headings);
	const [isOpen, setIsOpen] = useState(false);
	const panelId = useId();
	const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

	if (headings.length === 0) {
		return null;
	}

	const minDepth = Math.min(...headings.map((h) => h.depth));
	const activeHeading = headings.find((h) => h.slug === activeSlug) ?? headings[0];

	const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
		const target = document.getElementById(slug);
		if (!target) return;

		event.preventDefault();
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		target.scrollIntoView({
			behavior: prefersReducedMotion ? "auto" : "smooth",
			block: "start",
		});
		window.history.replaceState(null, "", `#${slug}`);
		setActiveSlug(slug);

		if (variant === "mobile") {
			setIsOpen(false);
		}
	};

	const handleMobileKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Escape" && isOpen) {
			setIsOpen(false);
			toggleButtonRef.current?.focus();
		}
	};

	if (variant === "mobile") {
		return (
			<div
				className="mb-10 border-[1.5px] border-foreground bg-card lg:hidden"
				onKeyDown={handleMobileKeyDown}
			>
				<button
					ref={toggleButtonRef}
					type="button"
					aria-expanded={isOpen}
					aria-controls={panelId}
					onClick={() => setIsOpen((prev) => !prev)}
					className="flex min-h-[44px] w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring"
				>
					<span className="flex min-w-0 items-center gap-2.5">
						<List className="size-4 shrink-0 text-brand" aria-hidden="true" />
						<span className="label-mono shrink-0">On this page</span>
						{activeHeading && (
							<span className="truncate font-mono text-xs text-muted-foreground">
								/ {activeHeading.text}
							</span>
						)}
					</span>
					<ChevronDown
						className={`size-4 shrink-0 transition-transform duration-150 motion-reduce:transition-none ${
							isOpen ? "rotate-180" : ""
						}`}
						aria-hidden="true"
					/>
				</button>

				{isOpen && (
					<nav
						id={panelId}
						aria-label="Table of contents"
						className="border-t-[1.5px] border-foreground px-3 py-2"
					>
						<ul className="space-y-0.5">
							{headings.map((heading) => {
								const isActive = heading.slug === activeSlug;
								const indentLevel = Math.max(0, heading.depth - minDepth);
								return (
									<li key={heading.slug}>
										<a
											href={`#${heading.slug}`}
											onClick={(e) => handleLinkClick(e, heading.slug)}
											aria-current={isActive ? "location" : undefined}
											style={{ paddingLeft: `${0.75 + indentLevel * 0.85}rem` }}
											className={`flex min-h-[44px] items-center border-l-2 py-2 pr-3 text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
												isActive
													? "border-brand bg-mustard/25 font-semibold text-foreground"
													: "border-transparent text-muted-foreground hover:border-foreground hover:text-foreground"
											}`}
										>
											{heading.text}
										</a>
									</li>
								);
							})}
						</ul>
					</nav>
				)}
			</div>
		);
	}

	return (
		<nav aria-label="Table of contents" className="border-[1.5px] border-foreground bg-card p-4">
			<div className="mb-3 flex items-center justify-between border-b border-border pb-2.5">
				<span className="label-mono text-foreground">/ On this page</span>
				<span className="font-mono text-[11px] text-muted-foreground">{headings.length}</span>
			</div>

			<ul className="max-h-[calc(100vh-11rem)] space-y-0.5 overflow-y-auto pr-1">
				{headings.map((heading) => {
					const isActive = heading.slug === activeSlug;
					const indentLevel = Math.max(0, heading.depth - minDepth);
					return (
						<li key={heading.slug}>
							<a
								href={`#${heading.slug}`}
								onClick={(e) => handleLinkClick(e, heading.slug)}
								aria-current={isActive ? "location" : undefined}
								style={{ paddingLeft: `${0.65 + indentLevel * 0.75}rem` }}
								className={`block border-l-2 py-1.5 pr-2 leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
									indentLevel > 0 ? "text-xs" : "text-[13px]"
								} ${
									isActive
										? "border-brand bg-mustard/25 font-semibold text-foreground"
										: "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
								}`}
							>
								{heading.text}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
