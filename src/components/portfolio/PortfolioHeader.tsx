import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Tilt from "react-parallax-tilt";

interface Props {
	agencySlug?: string;
	backHref?: string;
	backLabel?: string;
	item: {
		title: string;
		tagline: string;
		client?: string;
		agency?: string;
		tag?: string[];
		category?: string[];
		logo?: {
			height: number;
			width: number;
			src: string;
		};
		logo2?: {
			height: number;
			width: number;
			src: string;
		};
		background_image?: {
			height: number;
			width: number;
			src: string;
		};
		permalink: string;
		images?: {
			height: number;
			width: number;
			src: string;
		}[];
		case_link_url?: string;
		content?: any;
		port_date?: string;
		date?: string;
	};
}

const PortfolioHeader: React.FC<Props> = ({
	item,
	agencySlug,
	backHref = "/portfolio",
	backLabel = "Back to archive",
}) => {
	const {
		title,
		tagline,
		client,
		agency,
		tag = [],
		logo,
		logo2,
		background_image,
		images,
		category = [],
		port_date,
		date,
	} = item;

	const displayDate = port_date || date;

	return (
		<header className="block-cobalt border-ink overflow-hidden border-b-[1.5px] pt-28 pb-12 md:pt-32 md:pb-16">
			<ParallaxProvider>
				<div className="container mx-auto px-4">
					<div className="border-ink mb-6 flex items-center justify-between border-t-[1.5px] pt-3">
						<p className="label-mono text-ink">/ Case study</p>
						<div className="flex items-center gap-3">
							{(displayDate || client) && (
								<p className="label-mono text-ink hidden opacity-80 sm:block">
									{displayDate || client}
								</p>
							)}
							<span className="bg-ink size-2" aria-hidden="true" />
						</div>
					</div>

					<a href={backHref} className="key bg-cream text-ink mb-6">
						{backLabel}
					</a>

					<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
						<div className="lg:col-span-6">
							<h1
								className="text-ink text-4xl leading-[1.02] font-bold tracking-[-0.04em] md:text-6xl"
								style={{
									viewTransitionName: `portfolio-title-${item.permalink}`,
								}}
							>
								{title}
							</h1>
							{tagline && (
								<p
									className="text-ink/90 mt-4 text-xl leading-snug"
									style={{
										viewTransitionName: `portfolio-tagline-${item.permalink}`,
									}}
								>
									{tagline}
								</p>
							)}

							<div className="on-paper hard bg-cream text-ink mt-8">
								<div className="border-ink bg-cream text-ink flex items-center gap-2.5 border-b-[1.5px] px-3 py-2">
									<span
										className="border-ink bg-tomato size-2.5 shrink-0 border-[1.5px]"
										aria-hidden="true"
									/>
									<span className="stripes h-[11px] flex-1" aria-hidden="true" />
									<span className="font-pixel text-ink text-xs leading-none">SPECIFICATIONS</span>
								</div>
								<dl className="divide-ink/20 divide-y p-5">
									{client && (
										<div className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
											<dt className="label-mono text-ink/70 shrink-0">Client</dt>
											<dd className="text-ink text-right font-mono text-sm font-semibold">
												{client}
											</dd>
										</div>
									)}
									{displayDate && (
										<div className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
											<dt className="label-mono text-ink/70 shrink-0">Year</dt>
											<dd className="text-ink text-right font-mono text-sm font-semibold">
												{displayDate}
											</dd>
										</div>
									)}
									{agency && (
										<div className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
											<dt className="label-mono text-ink/70 shrink-0">Agency</dt>
											<dd className="text-ink text-right font-mono text-sm font-semibold">
												{agencySlug ? (
													<a
														href={`/work/${agencySlug}`}
														className="text-brand underline underline-offset-4 hover:opacity-80"
													>
														{agency}
													</a>
												) : (
													agency
												)}
											</dd>
										</div>
									)}
									{category.length > 0 && (
										<div className="flex items-start justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
											<dt className="label-mono text-ink/70 shrink-0 pt-1">Role</dt>
											<dd className="flex flex-wrap justify-end gap-1.5">
												{category.map((categoryTag, index) => (
													<span
														key={index}
														className="border-ink bg-mustard label-mono text-ink border-[1.5px] px-2 py-0.5 text-[10px]!"
														style={{
															viewTransitionName: `portfolio-category-${item.permalink}-${categoryTag}`,
														}}
													>
														{categoryTag}
													</span>
												))}
											</dd>
										</div>
									)}
									{tag.length > 0 && (
										<div className="flex items-start justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
											<dt className="label-mono text-ink/70 shrink-0 pt-1">Tech</dt>
											<dd className="flex flex-wrap justify-end gap-1.5">
												{tag.map((techTag, index) => (
													<span
														key={index}
														className="border-ink bg-paper text-ink border px-2 py-0.5 font-mono text-xs font-medium"
													>
														{techTag}
													</span>
												))}
											</dd>
										</div>
									)}
								</dl>
							</div>
						</div>

						<div className="relative mt-6 lg:col-span-6 lg:mt-0">
							<Tilt perspective={1000} className="portfolio-hero-image-tilt relative">
								{logo && (
									<div className="portfolio-hero-image">
										<Parallax speed={-10}>
											<img
												height={logo.height}
												width={logo.width}
												src={logo.src}
												alt={title}
												className="portfolio-hero-box porfolio-hero-large border-ink bg-cream mr-4 border-[1.5px] object-cover shadow-[4px_4px_0_var(--ink)]"
											/>
										</Parallax>
									</div>
								)}
								{images && images[0] && (
									<div className="portfolio-hero-image absolute top-[50%] left-0 w-full">
										<Parallax speed={8}>
											<img
												height={images[0].height}
												width={images[0].width}
												src={images[0].src}
												alt={`${title} detail`}
												className="portfolio-hero-box porfolio-hero-medium border-ink bg-cream -mr-4 max-h-[20vh] border-[1.5px] object-cover shadow-[4px_4px_0_var(--ink)]"
											/>
										</Parallax>
									</div>
								)}

								{logo2 && (
									<div className="portfolio-hero-image absolute top-[50%] left-0 w-full">
										<Parallax speed={5} className="portfolio-hero-box porfolio-hero-small">
											<img
												height={logo2?.height}
												width={logo2?.width}
												src={logo2?.src}
												alt={`${title} mark`}
												className="border-ink bg-cream border-[1.5px] shadow-[4px_4px_0_var(--ink)]"
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
												alt={`${title} preview`}
												className="border-ink bg-cream border-[1.5px] shadow-[4px_4px_0_var(--ink)]"
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
	);
};

export default PortfolioHeader;
