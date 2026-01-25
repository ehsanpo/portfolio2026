import React from "react";
import { Heading } from "../ui/heading";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Tilt from "react-parallax-tilt";

interface Props {
	agencySlug?: string;
	item: {
		title: string;
		tagline: string;
		client: string;
		agency: string;
		tag: string[];
		category: string[];
		logo: {
			height: number;
			width: number;
			src: string;
		};
		logo2?: {
			height: number;
			width: number;
			src: string;
		};
		background_image: {
			height: number;
			width: number;
			src: string;
		};
		permalink: string;
		images: {
			height: number;
			width: number;
			src: string;
		}[];
		case_link_url?: string;
		content: any;
		date: string;
	};
}

const PortfolioHeader: React.FC<Props> = ({ item, agencySlug }) => {
	const {
		title,
		tagline,
		client,
		agency,
		tag,
		logo,
		logo2,
		background_image,
		images,
		category,
		date,
	} = item;

	return (
		<div className="bg-gray-100 dark:bg-neutral-800">
			<header className="mx-auto max-w-6xl overflow-hidden px-4 py-12">
				<ParallaxProvider>
					<div className="relative container">
						<div className="grid md:grid-cols-2">
							<div className="self-center">
								<Heading
									className="mb-4 text-left!"
									level="h1"
									gradient
									style={{
										viewTransitionName: `portfolio-title-${item.permalink}`,
									}}
								>
									{title}
								</Heading>
								<p
									className="mb-4 text-xl"
									style={{
										viewTransitionName: `portfolio-tagline-${item.permalink}`,
									}}
								>
									{tagline}
								</p>
								<div className="flex flex-col gap-4">
									<div className="flex gap-4">
										<h3 className="text-secondary-400 min-w-20 font-medium uppercase">Client</h3>
										<p className="font-basement text-secondary-400">{client}</p>
									</div>
									<div className="flex gap-4">
										<h3 className="text-secondary-400 min-w-20 font-medium uppercase">Year</h3>
										<p className="font-basement text-secondary-400">{date}</p>
									</div>
									{agency && (
										<div className="flex gap-4">
											<h3 className="min-w-20 font-medium text-yellow-500 uppercase">Agency</h3>
											{agencySlug ? (
												<a
													href={`/work/${agencySlug}`}
													className="font-basement text-yellow-500 hover:underline"
												>
													{agency}
												</a>
											) : (
												<p className="font-basement text-yellow-500">{agency}</p>
											)}
										</div>
									)}

									<div className="flex gap-4">
										<h3 className="text-primary-400 min-w-20 font-medium uppercase">Role</h3>
										<div className="flex flex-wrap gap-2">
											{category.map((categoryTag, index) => (
												<span
													key={index}
													className="clip2 hover:border-primary border-primary-500/30 bg-primary-500/20 text-primary-400 border-l-2 px-3 py-1 text-sm transition-all"
													style={{
														viewTransitionName: `portfolio-category-${item.permalink}-${categoryTag}`,
													}}
												>
													{categoryTag}
												</span>
											))}
										</div>
									</div>
									<div className="flex gap-4">
										<h3 className="min-w-20 font-medium text-gray-500 uppercase dark:text-purple-400">
											Tech
										</h3>
										<div className="flex flex-wrap gap-2">
											{tag.map((techTag, index) => (
												<span
													key={index}
													className="clip2 border-l-2 border-purple-500/30 bg-purple-500/20 px-3 py-1 text-sm text-purple-400 transition-all hover:border-purple-500"
												>
													{techTag}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
							<div className="relative mt-10 flex-1">
								<Tilt perspective={1000} className="portfolio-hero-image-tilt relative">
									<div className="portfolio-hero-image">
										<Parallax speed={-10}>
											<img
												height={logo.height}
												width={logo.width}
												src={logo.src}
												alt="Portfolio Image"
												className="portfolio-hero-box porfolio-hero-large mr-4 rounded-lg object-cover"
											/>
										</Parallax>
									</div>
									{images && images[0] && (
										<div className="portfolio-hero-image absolute top-full left-0 w-full">
											<Parallax speed={10}>
												<img
													height={images[0].height}
													width={images[0].width}
													src={images[0].src}
													alt="Portfolio Image"
													className="portfolio-hero-box porfolio-hero-medium -mr-4 max-h-[20vh] rounded-lg object-cover"
												/>
											</Parallax>
										</div>
									)}

									{logo2 && (
										<div className="portfolio-hero-image absolute top-full left-0 w-full">
											<Parallax speed={5} className="portfolio-hero-box porfolio-hero-small">
												<img
													height={logo2?.height}
													width={logo2?.width}
													src={logo2?.src}
													alt="Portfolio Image"
													className="rounded-lg"
												/>
											</Parallax>
										</div>
									)}
									{background_image && (
										<div className="portfolio-hero-image absolute top-[30%] w-full">
											<Parallax
												speed={5}
												className="portfolio-hero-box porfolio-hero-small--right absolute top-[10%] left-0 w-full"
											>
												<img
													height={background_image.height}
													width={background_image.width}
													src={background_image.src}
													alt="Portfolio Image"
													className="rounded-lg"
													style={{
														viewTransitionName: `portfolio-image-${item.permalink}`,
													}}
												/>
											</Parallax>
										</div>
									)}
								</Tilt>
							</div>
						</div>
					</div>
				</ParallaxProvider>
			</header>
		</div>
	);
};

export default PortfolioHeader;
