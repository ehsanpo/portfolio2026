import React from "react";
import { Heading } from "../ui/heading";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Tilt from "react-parallax-tilt";
import { Tag } from "lucide-react";

interface PromptHeaderProps {
	prompt: {
		title: string;
		description: string;
		category?: string;
		tags?: string[];
		icon?: string;
		image?: string;
	};
}

const PromptHeader: React.FC<PromptHeaderProps> = ({ prompt }) => {
	const { title, description, category, tags, icon, image } = prompt;

	return (
		<div className="bg-gray-100 dark:bg-neutral-800">
			<header className="mx-auto max-w-6xl overflow-hidden px-4 py-12">
				<ParallaxProvider>
					<div className="container relative">
						<div className="grid md:grid-cols-2">
							<div className="self-center">
								<Heading className="mb-4 !text-left" level="h1" gradient>
									{title}
								</Heading>
								<p className="mb-4 text-xl">{description}</p>
								<div className="flex flex-col gap-4">
									{category && (
										<div className="flex gap-4">
											<h3 className="min-w-20 font-medium uppercase text-primary-400">Category</h3>
											<span className="clip2 hover:border-primary border-l-2 border-primary-500/30 bg-primary-500/20 px-3 py-1 text-sm text-primary-400 transition-all">
												{category}
											</span>
										</div>
									)}

									{tags && tags.length > 0 && (
										<div className="flex gap-4">
											<h3 className="min-w-20 font-medium uppercase text-purple-400">Tags</h3>
											<div className="flex flex-wrap gap-2">
												{tags.map((tag, index) => (
													<span
														key={index}
														className="clip2 inline-flex items-center gap-1 border-l-2 border-purple-500/30 bg-purple-500/20 px-3 py-1 text-sm text-purple-400 transition-all hover:border-purple-500"
													>
														<Tag className="h-3 w-3" />
														{tag}
													</span>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
							<div className="relative mt-10 flex-1 md:mt-0">
								<Tilt perspective={1000} className="portfolio-hero-image-tilt relative">
									<div className="portfolio-hero-image">
										<Parallax speed={-10}>
											{image ? (
												<img
													src={image}
													alt={title}
													className="portfolio-hero-box porfolio-hero-large mr-4 rounded-lg object-cover shadow-2xl"
												/>
											) : (
												<div className="portfolio-hero-box porfolio-hero-large from-primary/20 to-primary/5 mr-4 flex items-center justify-center rounded-lg bg-gradient-to-br shadow-2xl">
													<span className="text-9xl">{icon || "📝"}</span>
												</div>
											)}
										</Parallax>
									</div>
								</Tilt>
							</div>
						</div>
					</div>
				</ParallaxProvider>
			</header>
		</div>
	);
};

export default PromptHeader;
