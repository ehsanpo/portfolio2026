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
	Palette,
	User,
	Briefcase,
	FileText,
	ArrowUp,
	Music,
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
				icon: Pen, // Using Pen as placeholder for Dribbble
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
		<footer className={cn("relative mt-20 border-t border-gray-800", className)}>
			<DuckSprite />
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div className="lg:col-span-1">
						<div className="mb-4 flex items-center space-x-3">
							<div className="from-primary-900 to-secondary-900 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br">
								<svg
									width="48"
									height="48"
									className="text-primary"
									viewBox="0 0 27.8 26.7"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill="currentColor"
										d="M0.5,19.4C0.2,19,0,18.7,0,18.2c0-0.4,0.2-0.8,0.5-1.1L17.1,0.5C17.4,0.2,17.8,0,18.2,0c0.4,0,0.8,0.2,1.1,0.5
                    c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L2.7,19.4c-0.3,0.3-0.7,0.5-1.1,0.5C1.2,19.8,0.8,19.7,0.5,19.4z M12.4,25.6
                    c-0.3,0.3-0.8,0.6-1.3,0.8s-1,0.3-1.5,0.3c-0.5,0-1.1-0.1-1.6-0.3c-0.5-0.2-1.1-0.5-1.5-1l-2.1-2.1c-0.4-0.4-0.6-0.8-0.5-1.2
                    c0.1-0.4,0.4-0.8,0.9-1.3L20.6,5c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1
                    l-15,15L9,23.4c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.5-0.1,0.7-0.4L25.1,8.4C25.4,8.1,25.8,8,26.2,8c0.4,0,0.8,0.2,1.1,0.5
                    c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L12.4,25.6z"
									/>
								</svg>
							</div>
							<div>
								<div className="gradient-text font-basement text-xl font-bold">Ehsan Pourhadi</div>
								<div className="font-kabel text-muted-foreground text-sm">Software Developer</div>
							</div>
						</div>
						<p className="text-muted-foreground font-kabel mb-6 text-sm leading-relaxed">
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

					{showNavigation &&
						navigationSections.map((section) => (
							<div key={section.title}>
								<h3 className="text-foreground font-basement mb-4 text-lg">{section.title}</h3>
								<ul className="space-y-3">
									{section.links.map((link) => {
										const Icon = link.icon;
										return (
											<li key={link.name}>
												{link.href ? (
													<a
														href={link.href}
														target={link.href.startsWith("http") ? "_blank" : "_self"}
														rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
														className="font-kabel group hover:text-primary flex items-center text-sm text-black transition-colors dark:text-gray-400"
													>
														<Icon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
														{link.name}
														{link.href.startsWith("http") && (
															<ExternalLink className="ml-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
														)}
													</a>
												) : (
													<button
														onClick={() => link.id && handleNavigation(link.id)}
														className="text-muted-foreground font-kabel group hover:text-primary flex items-center text-sm transition-colors"
													>
														<Icon className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
														{link.name}
													</button>
												)}
											</li>
										);
									})}
								</ul>
							</div>
						))}
				</div>

				{showStats && (
					<div className="border-border/50 mt-12 border-t border-gray-500/20 pt-8">
						<div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
							<div className="space-y-2">
								<div className="gradient-text font-basement text-2xl font-bold">70+</div>
								<div className="text-muted-foreground font-kabel text-sm">Projects Completed</div>
							</div>

							<div className="space-y-2">
								<div className="gradient-text font-basement text-2xl font-bold">50+</div>
								<div className="text-muted-foreground font-kabel text-sm">Happy Clients</div>
							</div>

							<div className="space-y-2">
								<div className="gradient-text font-basement text-2xl font-bold">12+</div>
								<div className="text-muted-foreground font-kabel text-sm">Years Experience</div>
							</div>

							<div className="space-y-2">
								<div className="gradient-text font-basement text-2xl font-bold">100%</div>
								<div className="text-muted-foreground font-kabel text-sm">Client Satisfaction</div>
							</div>
						</div>
					</div>
				)}

				<div className="border-border/50 mt-12 border-t border-gray-500/20 pt-8">
					<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
						<div className="font-kabel flex items-center space-x-1 text-xs dark:text-gray-100">
							<span>© 2026 Ehsan Pourhadi. All rights reserved.</span>
							<div className="flex items-center space-x-1">
								<span>Made with</span>

								<Heart
									className="h-4 w-4 fill-current text-red-600"
									data-tooltip-id="footer-tt"
									data-tooltip-content="Love and passion"
								/>

								<span>and</span>

								<Coffee
									className="h-4 w-4 text-yellow-500"
									data-tooltip-id="footer-tt"
									data-tooltip-content="Actually tea ☕ - coffee is for emergencies!"
								/>

								<span>using</span>

								<a
									href="/credits"
									className="text-primary hover:text-secondary inline-flex items-center gap-1 align-bottom transition-colors"
									data-tooltip-id="footer-tt"
									data-tooltip-content="See all tools and resources"
								>
									<Zap className="h-4 w-4" />
									<span className="decoration-primary/50 underline underline-offset-2">
										awesome tools
									</span>
								</a>
							</div>
							<Tooltip id="footer-tt" />
						</div>

						<button
							onClick={scrollToTop}
							className="glass-card font-kabel flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-300 hover:scale-105"
						>
							<ArrowUp className="h-4 w-4" />
							Back to Top
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
