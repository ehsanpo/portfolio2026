"use client";
import {
	Zap,
	Github,
	Linkedin,
	Mail,
	ExternalLink,
	Heart,
	Coffee,
	Code,
	User,
	Briefcase,
	FileText,
	ArrowUp,
	Music,
	Grid3X3,
	Headphones,
	Play,
	Pen,
	Newspaper,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Tooltip } from "react-tooltip";
import DuckSprite from "../DuckSprite";
import DocSearch from "./DocSearch";

interface FooterProps {
	readonly variant?: "default" | "glass" | "gradient" | "minimal";
	readonly showNavigation?: boolean;
	readonly showContact?: boolean;
	readonly showStats?: boolean;
	readonly onSectionChange?: (section: string) => void;
	readonly className?: string;
}

type NavigationLink = {
	name: string;
	icon: typeof Code;
} & ({ id: string; href?: never } | { href: string; id?: never });

const navigationSections: { title: string; links: NavigationLink[] }[] = [
	{
		title: "Portfolio",
		links: [
			{ name: "Work", href: "/work", icon: Briefcase },
			{ name: "Portfolio", href: "/portfolio", icon: Briefcase },
			{ name: "Skills", href: "/skills", icon: Code },
			{ name: "About", href: "/about", icon: User },
			{ name: "Roles", href: "/roles", icon: Briefcase },
		],
	},
	{
		title: "Resources",
		links: [
			{ name: "Music", href: "/music", icon: Music },
			{ name: "Social", href: "/social", icon: Grid3X3 },
			{ name: "Resume", href: "/cv", icon: FileText },
			{ name: "Contact", href: "/contact", icon: Mail },
			{ name: "Blog", href: "/blog", icon: Newspaper },
			{ name: "AI Prompts", href: "/prompts", icon: Zap },
		],
	},
	{
		title: "Connect",
		links: [
			{
				name: "LinkedIn",
				href: "https://www.linkedin.com/in/ehsanp/",
				icon: Linkedin,
			},
			{ name: "GitHub", href: "https://github.com/ehsanpo", icon: Github },
			{
				name: "SoundCloud",
				href: "https://soundcloud.com/eprumental",
				icon: Headphones,
			},
			{
				name: "YouTube",
				href: "https://www.youtube.com/user/ehsanpo/",
				icon: Play,
			},
			{
				name: "Dribbble",
				icon: Pen,
				href: "https://dribbble.com/epo",
			},
		],
	},
];

export function Footer({
	showNavigation = true,
	showStats = true,
	onSectionChange,
	className,
}: FooterProps) {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleNavigation = (id: string) => {
		if (onSectionChange) {
			onSectionChange(id);
		}
	};

	return (
		<footer className={cn("block-ink relative border-t-[1.5px] border-ink", className)}>
			<DuckSprite />
			<div className="container py-14 md:py-20">
				<div className="mb-8 flex items-center justify-between border-t-[1.5px] border-paper/25 pt-3">
					<p className="label-mono">/ Directory</p>
					<div className="flex items-center gap-3">
						<p className="label-mono hidden opacity-70 sm:block">Sign-off &amp; index</p>
						<span className="size-2 bg-mustard" aria-hidden="true" />
					</div>
				</div>

				<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
					<div className="lg:col-span-5">
						<div className="mb-4 flex items-center gap-3">
							<svg
								width="28"
								height="28"
								className="size-7 shrink-0 text-mustard"
								viewBox="0 0 27.8 26.7"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									fill="currentColor"
									d="M0.5,19.4C0.2,19,0,18.7,0,18.2c0-0.4,0.2-0.8,0.5-1.1L17.1,0.5C17.4,0.2,17.8,0,18.2,0c0.4,0,0.8,0.2,1.1,0.5 c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L2.7,19.4c-0.3,0.3-0.7,0.5-1.1,0.5C1.2,19.8,0.8,19.7,0.5,19.4z M12.4,25.6 c-0.3,0.3-0.8,0.6-1.3,0.8s-1,0.3-1.5,0.3c-0.5,0-1.1-0.1-1.6-0.3c-0.5-0.2-1.1-0.5-1.5-1l-2.1-2.1c-0.4-0.4-0.6-0.8-0.5-1.2 c0.1-0.4,0.4-0.8,0.9-1.3L20.6,5c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1 l-15,15L9,23.4c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.5-0.1,0.7-0.4L25.1,8.4C25.4,8.1,25.8,8,26.2,8c0.4,0,0.8,0.2,1.1,0.5 c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L12.4,25.6z"
								/>
							</svg>
							<div>
								<div className="font-pixel text-3xl leading-none">EHSAN</div>
								<div className="label-mono mt-1 text-paper/70">Software Developer</div>
							</div>
						</div>
						<p className="mb-6 max-w-sm text-sm leading-relaxed text-paper/80">
							Experienced software developer passionate about creating impactful digital experiences
							with modern web technologies and thoughtful design.
						</p>

						<div className="mt-2">
							<DocSearch
								appId="0DAQDYSKFQ"
								apiKey="c8c883e13001397dffa296b48dd5edac"
								indexName="Portfolio"
							/>
						</div>
					</div>

					{showNavigation && (
						<div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-7">
							{navigationSections.map((section) => (
								<div key={section.title}>
									<h3 className="label-mono mb-4 text-mustard">{section.title}</h3>
									<ul className="space-y-2.5">
										{section.links.map((link) => {
											const Icon = link.icon;
											return (
												<li key={link.name}>
													{link.href ? (
														<a
															href={link.href}
															target={link.href.startsWith("http") ? "_blank" : "_self"}
															rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
															className="group flex items-center font-mono text-sm text-paper/80 underline-offset-4 transition-colors hover:text-mustard hover:underline"
														>
															<Icon className="mr-2 size-3.5 shrink-0 opacity-75" />
															<span>{link.name}</span>
															{link.href.startsWith("http") && (
																<ExternalLink className="ml-1 size-3 opacity-60 transition-opacity group-hover:opacity-100" />
															)}
														</a>
													) : (
														<button
															type="button"
															onClick={() => link.id && handleNavigation(link.id)}
															className="group flex items-center font-mono text-sm text-paper/80 underline-offset-4 transition-colors hover:text-mustard hover:underline"
														>
															<Icon className="mr-2 size-3.5 shrink-0 opacity-75" />
															<span>{link.name}</span>
														</button>
													)}
												</li>
											);
										})}
									</ul>
								</div>
							))}
						</div>
					)}
				</div>

				{showStats && (
					<div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
						<div className="border-t-[1.5px] border-paper/25 pt-3">
							<div className="font-pixel text-4xl text-mustard">70+</div>
							<div className="label-mono mt-1 text-paper/70">Projects Completed</div>
						</div>

						<div className="border-t-[1.5px] border-paper/25 pt-3">
							<div className="font-pixel text-4xl text-mustard">50+</div>
							<div className="label-mono mt-1 text-paper/70">Happy Clients</div>
						</div>

						<div className="border-t-[1.5px] border-paper/25 pt-3">
							<div className="font-pixel text-4xl text-mustard">12+</div>
							<div className="label-mono mt-1 text-paper/70">Years Experience</div>
						</div>

						<div className="border-t-[1.5px] border-paper/25 pt-3">
							<div className="font-pixel text-4xl text-mustard">100%</div>
							<div className="label-mono mt-1 text-paper/70">Client Satisfaction</div>
						</div>
					</div>
				)}

				<div className="mt-12 border-t-[1.5px] border-paper/25 pt-8">
					<div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
						<div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-paper/80">
							<span>© 2026 Ehsan Pourhadi. All rights reserved.</span>
							<div className="flex items-center gap-1.5">
								<span>Made with</span>

								<Heart
									className="size-3.5 fill-current text-tomato"
									data-tooltip-id="footer-tt"
									data-tooltip-content="Love and passion"
								/>

								<span>and</span>

								<Coffee
									className="size-3.5 text-mustard"
									data-tooltip-id="footer-tt"
									data-tooltip-content="Actually tea - coffee is for emergencies!"
								/>

								<span>using</span>

								<a
									href="/credits"
									className="inline-flex items-center gap-1 text-mustard underline underline-offset-4 transition-colors hover:text-paper"
									data-tooltip-id="footer-tt"
									data-tooltip-content="See all tools and resources"
								>
									<Zap className="size-3.5" />
									<span>awesome tools</span>
								</a>
							</div>
							<Tooltip id="footer-tt" />
						</div>

						<button
							type="button"
							onClick={scrollToTop}
							className="key bg-cream text-ink"
						>
							<ArrowUp className="size-3.5" />
							<span>Back to Top</span>
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
