import React, { useRef, useEffect, useId, useMemo } from "react";
import Card3D from "./Card3D";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCard3DProps {
	image?: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	icon?: string;
	title: string;
	description?: string;
	date?: string;
	categories?: string[] | string;
	tags?: string[];
	className?: string;
	glowColor?: string;
	layout?: number;
	href?: string;
}

const useFilters = (
	layout: number,
	idSuffix: string,
	imageWidth: number,
	maskRef: React.RefObject<SVGCircleElement | null>
) => {
	return useMemo(
		() => [
			<defs key="f1">
				<filter id={`displacementFilter1-${layout}-${idSuffix}`}>
					<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="50"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
				<mask id={`circleMask${layout}-${idSuffix}`}>
					<circle
						ref={maskRef}
						cx="50%"
						cy="50%"
						r="0"
						data-value-final={imageWidth}
						fill="white"
						className="mask"
						style={{ filter: `url(#displacementFilter1-${layout}-${idSuffix})` }}
					/>
				</mask>
			</defs>,
			<defs key="f2">
				<filter id={`displacementFilter2-${layout}-${idSuffix}`}>
					<feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="1" result="noise" />
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						result="displacement"
						scale="100"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
					<feMorphology operator="dilate" radius="2" result="morph" in="displacement" />
				</filter>
				<mask id={`circleMask${layout}-${idSuffix}`}>
					<circle
						ref={maskRef}
						cx="50%"
						cy="50%"
						r="0"
						data-value-final={imageWidth}
						fill="white"
						className="mask"
						style={{ filter: `url(#displacementFilter2-${layout}-${idSuffix})` }}
					/>
				</mask>
			</defs>,
			<defs key="f3">
				<filter id={`displacementFilter4-${layout}-${idSuffix}`}>
					<feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="1" result="noise" />
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="50"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
				<mask id={`circleMask${layout}-${idSuffix}`}>
					<circle
						ref={maskRef}
						cx="50%"
						cy="50%"
						r="0"
						data-value-final={imageWidth}
						fill="white"
						className="mask"
						style={{ filter: `url(#displacementFilter4-${layout}-${idSuffix})` }}
					/>
				</mask>
			</defs>,
			<defs key="f4">
				<filter id={`displacementFilter5-${layout}-${idSuffix}`}>
					<feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="3" result="noise" />
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="150"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
				<mask id={`circleMask${layout}-${idSuffix}`}>
					<circle
						ref={maskRef}
						cx="50%"
						cy="50%"
						r="0"
						data-value-final={imageWidth}
						fill="white"
						className="mask"
						style={{ filter: `url(#displacementFilter5-${layout}-${idSuffix})` }}
					/>
				</mask>
			</defs>,
			<defs key="f5">
				<filter id={`displacementFilter6-${layout}-${idSuffix}`}>
					<feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						result="displacement"
						scale="150"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
					<feGaussianBlur in="displacement" stdDeviation="10" />
				</filter>
				<mask id={`circleMask${layout}-${idSuffix}`}>
					<circle
						ref={maskRef}
						cx="50%"
						cy="50%"
						r="0"
						data-value-final={imageWidth}
						fill="white"
						className="mask"
						style={{ filter: `url(#displacementFilter6-${layout}-${idSuffix})` }}
					/>
				</mask>
			</defs>,
			<defs key="f6">
				<filter id={`displacementFilter7-${layout}-${idSuffix}`}>
					<feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="1" result="noise" />
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="120"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
				<mask id={`circleMask${layout}-${idSuffix}`}>
					<circle
						ref={maskRef}
						cx="50%"
						cy="50%"
						r="0"
						data-value-final={imageWidth}
						fill="white"
						className="mask"
						style={{ filter: `url(#displacementFilter7-${layout}-${idSuffix})` }}
					/>
				</mask>
			</defs>,
		],
		[layout, idSuffix, imageWidth, maskRef]
	);
};

const useScrollTriggerAnimation = (
	contentWrapRef: React.RefObject<HTMLDivElement | null>,
	maskRef: React.RefObject<SVGCircleElement | null>,
	imageRef: React.RefObject<SVGImageElement | null>
) => {
	useEffect(() => {
		if (!contentWrapRef.current || !maskRef.current || !imageRef.current) return;

		const isCircle = maskRef.current.tagName.toLowerCase() === "circle";

		const maskAnimation = gsap.fromTo(
			maskRef.current,
			{
				attr: isCircle
					? { r: maskRef.current.getAttribute("r") || 0 }
					: { d: maskRef.current.getAttribute("d") || "" },
			},
			{
				ease: "none",
				attr: isCircle
					? { r: maskRef.current.dataset.valueFinal || 0 }
					: { d: maskRef.current.dataset.valueFinal || "" },
			}
		);

		const st = ScrollTrigger.create({
			trigger: contentWrapRef.current,
			start: "top bottom-=20%",
			end: "+=60%",
			scrub: 1,
			animation: maskAnimation,
		});

		return () => {
			st.kill();
		};
	}, []);
};

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
	image,
	icon,
	title,
	description,
	date,
	categories,
	tags = [],
	className = "",
	glowColor = "rgba(255, 255, 255, 0.2)",
	layout: propLayout = 0,
	href,
}) => {
	const idSuffix = useId().replace(/:/g, "");
	const layout = propLayout % 6;

	const contentWrapRef = useRef<HTMLDivElement>(null);
	const maskRef = useRef<SVGCircleElement>(null);
	const imageRef = useRef<SVGImageElement>(null);
	const imageWidth = image?.width || 300;
	const imageHeight = image?.height || 300;

	const Filters = useFilters(layout, idSuffix, imageWidth, maskRef);
	useScrollTriggerAnimation(contentWrapRef, maskRef, imageRef);

	const categoryList = Array.isArray(categories) ? categories : categories ? [categories] : [];

	const displayTags = tags.slice(0, 3);

	const CardContent = (
		<div
			ref={contentWrapRef}
			className="relative flex h-full w-full flex-col gap-6 p-8"
			style={{ transformStyle: "preserve-3d", WebkitFontSmoothing: "antialiased" }}
		>
			<div
				className="absolute top-4 right-4 flex items-end gap-2"
				style={{
					transform: `translateZ(calc(var(--hover, 0) * 80px))`,
				}}
			>
				{categoryList.map((cat, idx) => (
					<div
						key={idx}
						className="shadow-primary/30 bg-primary/80 border-primary/50 rounded-full border px-4 py-1.5 text-[12px] font-black tracking-widest whitespace-nowrap text-black uppercase opacity-0 backdrop-blur-xl transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:shadow-lg"
					>
						{cat}
					</div>
				))}
			</div>

			<div
				className="relative flex w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 ease-out"
				style={{
					transform:
						"translateZ(calc(var(--hover, 0) * 50px)) scale(calc(1 + var(--hover, 0) * 0.05))",
					boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
				}}
			>
				{image ? (
					<svg
						className={`content__img h-full w-full content__img--${layout}`}
						width={imageWidth}
						height={imageHeight}
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						viewBox={`0 0 ${imageWidth} ${imageHeight}`}
						preserveAspectRatio="none"
					>
						{Filters[layout]}
						<image
							ref={imageRef}
							xlinkHref={image.src}
							x="0"
							y="0"
							width="100%"
							height="100%"
							mask={`url(#circleMask${layout}-${idSuffix})`}
						/>
					</svg>
				) : icon ? (
					<div
						className="text-7xl drop-shadow-2xl transition-all duration-500"
						style={{ transform: "translateZ(20px)" }}
					>
						{icon}
					</div>
				) : (
					<div className="text-7xl opacity-20">📁</div>
				)}
			</div>

			<div className="mt-2 flex flex-col gap-3" style={{ transformStyle: "preserve-3d" }}>
				{date && (
					<span
						className="text-[11px] font-bold tracking-[0.3em] text-white/50 uppercase transition-all duration-500"
						style={{ transform: "translateZ(calc(var(--hover, 0) * 40px))" }}
					>
						{date}
					</span>
				)}

				<h3
					className="group-hover/card:text-primary text-2xl leading-tight font-black text-white transition-all duration-500"
					style={{
						transform: "translateZ(calc(var(--hover, 0) * 60px))",
						textShadow:
							"calc(var(--x, 0) * -0.6rem) calc(var(--y, 0) * 0.6rem) 20px rgba(0,0,0,0.8)",
						backfaceVisibility: "hidden",
					}}
				>
					{title}
				</h3>

				{description && (
					<p
						className="text-base leading-relaxed font-medium text-white/70 transition-all duration-500"
						style={{
							transform: "translateZ(calc(var(--hover, 0) * 40px))",
							textShadow:
								"calc(var(--x, 0) * -0.3rem) calc(var(--y, 0) * 0.3rem) 10px rgba(0,0,0,0.6)",
						}}
					>
						{description}
					</p>
				)}
			</div>

			<div
				className="mt-auto flex items-center justify-between transition-all duration-500"
				style={{ transform: "translateZ(calc(var(--hover, 0) * 40px))" }}
			>
				<div className="flex flex-wrap gap-2">
					{displayTags.map((tag, idx) => (
						<span
							key={idx}
							className="group-hover/card:bg-secondary/10 group-hover/card:border-secondary/20 rounded-lg border-2 border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-white/50 transition-all duration-300 group-hover/card:text-white/90"
						>
							#{tag}
						</span>
					))}
				</div>
			</div>
		</div>
	);

	return (
		<Card3D className={className} glowColor={glowColor} intensity={15}>
			{href ? (
				<a href={href} className="block h-full w-full no-underline transform-3d">
					{CardContent}
				</a>
			) : (
				CardContent
			)}
		</Card3D>
	);
};

export default ProjectCard3D;
