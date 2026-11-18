import React from "react";
import Card3D from "./Card3D";

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

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
	image,
	icon,
	title,
	description,
	date,
	categories,
	tags = [],
	className = "",
	glowColor = "rgba(244, 184, 41, 0.22)",
	href,
}) => {
	const categoryList = Array.isArray(categories) ? categories : categories ? [categories] : [];
	const displayTags = tags.slice(0, 3);

	const isLogoOrCompany =
		image?.src &&
		(image.src.includes("/companies/") ||
			image.src.toLowerCase().includes("logo") ||
			image.src.endsWith(".svg"));

	const CardContent = (
		<div
			className="on-paper text-ink relative flex h-full w-full flex-col"
			style={{ transformStyle: "preserve-3d", WebkitFontSmoothing: "antialiased" }}
		>
			{/* Top OS-7 window header bar */}
			<div className="border-ink bg-cream text-ink flex items-center gap-2.5 border-b-[1.5px] px-3 py-2">
				<span
					className="border-ink bg-tomato size-2.5 shrink-0 border-[1.5px]"
					aria-hidden="true"
				/>
				<span className="stripes h-[11px] flex-1" aria-hidden="true" />
				{date && <span className="font-pixel text-ink text-xs leading-none">{date}</span>}
			</div>

			{/* Image / Logo stage with 3D Z-lift */}
			<div
				className={`border-ink bg-paper relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border-b-[1.5px] transition-transform duration-300 ${
					isLogoOrCompany ? "p-6" : "p-0"
				}`}
				style={{
					transform: "translateZ(calc(var(--hover, 0) * 28px))",
				}}
			>
				{image ? (
					<img
						src={image.src}
						alt={image.alt || title}
						width={image.width}
						height={image.height}
						loading="lazy"
						className={
							isLogoOrCompany
								? "max-h-full max-w-full object-contain p-2 transition-transform duration-300 group-hover/card:scale-105"
								: "h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
						}
					/>
				) : icon ? (
					<div
						className="text-6xl transition-transform duration-300"
						style={{ transform: "translateZ(20px)" }}
					>
						{icon}
					</div>
				) : (
					<div className="font-pixel text-ink/40 text-xl uppercase">{title.slice(0, 3)}</div>
				)}
			</div>

			{/* Body area with layered 3D Z-depth */}
			<div
				className="bg-cream text-ink flex flex-1 flex-col justify-between gap-4 p-5"
				style={{ transformStyle: "preserve-3d" }}
			>
				<div style={{ transformStyle: "preserve-3d" }}>
					{categoryList.length > 0 && (
						<div
							className="flex flex-wrap gap-1.5 transition-transform duration-300"
							style={{ transform: "translateZ(calc(var(--hover, 0) * 35px))" }}
						>
							{categoryList.slice(0, 2).map((cat, idx) => (
								<span
									key={idx}
									className="border-ink bg-mustard label-mono text-ink inline-block border-[1.5px] px-2 py-0.5 text-[10px]!"
								>
									{cat}
								</span>
							))}
						</div>
					)}

					<h3
						className="text-ink mt-2.5 text-2xl font-bold tracking-[-0.03em] transition-transform duration-300"
						style={{
							transform: "translateZ(calc(var(--hover, 0) * 45px))",
							backfaceVisibility: "hidden",
						}}
					>
						{title}
					</h3>

					{description && (
						<p
							className="text-ink/80 mt-2 line-clamp-3 text-sm leading-relaxed transition-transform duration-300"
							style={{
								transform: "translateZ(calc(var(--hover, 0) * 30px))",
							}}
						>
							{description}
						</p>
					)}
				</div>

				<div
					className="border-ink/20 mt-4 flex flex-wrap items-center justify-between gap-2 border-t-[1.5px] pt-3 transition-transform duration-300"
					style={{ transform: "translateZ(calc(var(--hover, 0) * 25px))" }}
				>
					<div className="flex flex-wrap gap-1.5">
						{displayTags.map((tag, idx) => (
							<span
								key={idx}
								className="border-ink bg-paper text-ink border px-2 py-0.5 font-mono text-[11px] font-medium"
							>
								{tag}
							</span>
						))}
					</div>
					<span className="text-ink font-mono text-xs font-bold uppercase group-hover/card:underline">
						Inspect -&gt;
					</span>
				</div>
			</div>
		</div>
	);

	return (
		<Card3D className={className} glowColor={glowColor} intensity={10}>
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
