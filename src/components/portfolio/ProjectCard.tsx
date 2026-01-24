"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, Users, Star, Eye, Heart, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";

interface PortfolioItem {
	title?: string;
	title2?: string;
	description?: string;
	tagline?: string;
	date?: string;
	permalink?: string;
	client?: string;
	agency?: string;
	category?: string[];
	tag?: string[];
	case_link_url?: string;
	background_image?: any;
	cover?: any;
	logo?: any;
	logo2?: any;
	images?: any[];
	onHome?: boolean;
	video?: string;
	slug?: string;
	type?: string;
}

interface ProjectCardProps {
	item: PortfolioItem;
	className?: string;
	showShare?: boolean;
}

export function ProjectCard({ item, className, showShare = true }: ProjectCardProps) {
	const [showShareMenu, setShowShareMenu] = useState(false);
	const delay = ["", "delay-75", "delay-100", "delay-150", "delay-200", "delay-300"];

	return (
		<motion.div
			className={cn(
				"clip group relative block min-h-96 overflow-hidden rounded-lg bg-neutral-800",
				className
			)}
			whileHover={{ scale: 1.02 }}
			data-categories={JSON.stringify(item.category)}
		>
			{item.onHome && (
				<div className="absolute left-4 top-4 z-30">
					<span className="inline-flex items-center gap-1 rounded-full bg-primary-500/90 px-3 py-1 text-xs text-primary-900">
						<Star className="h-3 w-3" />
						Featured
					</span>
				</div>
			)}
			<div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-800 to-transparent" />
			<div>
				<img
					src={item.background_image?.src || `/img/${item.background_image}`}
					alt={item.title}
					className="absolute -top-1 z-10 m-auto h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:blur-sm group-hover:brightness-75 group-hover:filter"
					style={{
						viewTransitionName: `portfolio-image-${item.permalink || item.slug}`,
					}}
				/>
			</div>
			<div className="z-25 absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
				<div className="flex items-center space-x-3">
					{item.case_link_url && (
						<button
							onClick={() => window.open(item.case_link_url, "_blank")}
							className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
						>
							<ExternalLink size={16} />
						</button>
					)}
					{item.video && (
						<button
							onClick={() => window.open(item.video, "_blank")}
							className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
						>
							<Eye size={16} />
						</button>
					)}
				</div>
			</div>
			<div className="absolute bottom-0 left-0 right-0 z-20 p-4">
				<div className="mb-3 flex items-center gap-4">
					<div>
						<a
							href={`/${item.type === "product" ? "products" : "portfolio"}/${item.permalink || item.slug}`}
						>
							<h3
								className="font-basement text-xl text-white transition-colors group-hover:text-primary-500"
								style={{
									viewTransitionName: `portfolio-title-${item.permalink || item.slug}`,
								}}
							>
								<div className="hover:text-primary-400">{item.title}</div>
							</h3>
							<p
								className="font-kabel mb-1 leading-tight text-primary-500"
								style={{
									viewTransitionName: `portfolio-tagline-${item.permalink || item.slug}`,
								}}
							>
								{item.tagline || ""}
							</p>
							{item.title2 && <p className="font-kabel text-sm text-gray-300">{item.title2}</p>}
						</a>
					</div>
				</div>

				<div className="mb-4 flex items-center justify-between text-xs text-gray-300">
					<div className="flex items-center space-x-4">
						{item.date && (
							<div className="flex items-center space-x-1">
								<Calendar className="h-3 w-3" />
								<span>{item.date}</span>
							</div>
						)}
						{item.client && (
							<div className="flex items-center space-x-1">
								<Users className="h-3 w-3" />
								<span>{item.client}</span>
							</div>
						)}
					</div>
				</div>

				<div className="flex flex-wrap gap-2 overflow-hidden group-hover:mt-4">
					{item.category?.slice(0, 3).map((cat, index) => (
						<span
							key={cat}
							className={`clip2 invisible h-0 overflow-hidden bg-primary-500/80 px-3 text-sm text-primary-900 transition-all ease-in-out group-hover:visible group-hover:h-7 group-hover:py-1 ${delay[index]}`}
							style={{
								viewTransitionName: `portfolio-category-${item.permalink || item.slug}-${cat}`,
							}}
						>
							{cat}
						</span>
					))}
				</div>

				<div className="flex flex-wrap gap-2 overflow-hidden group-hover:mt-4">
					{item.tag?.slice(0, 3).map((tag, index) => (
						<span
							key={tag}
							className={`${index > 2 ? "hidden" : ""} clip2 invisible h-0 overflow-hidden border-l-2 border-purple-500/30 bg-purple-500/80 px-3 text-sm text-purple-100 transition-all hover:border-purple-500 group-hover:visible group-hover:h-7 group-hover:py-1 ${delay[index]}`}
						>
							{tag}
						</span>
					))}
				</div>
			</div>

			{showShare && (
				<div className="absolute right-4 top-4 z-30">
					<button
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setShowShareMenu(!showShareMenu);
						}}
						className="rounded-full bg-black/20 p-2 text-white opacity-0 backdrop-blur-sm transition-colors hover:bg-black/40 group-hover:opacity-100"
					>
						<MoreHorizontal size={16} />
					</button>

					{showShareMenu && (
						<div className="absolute right-0 top-full mt-2">
							<div className="min-w-[150px] rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
								<div className="space-y-2 text-sm text-white">
									<button
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											navigator.clipboard.writeText(
												window.location.origin + `/portfolio/${item.permalink || item.slug}`
											);
										}}
										className="block w-full text-left hover:text-primary-400"
									>
										Copy Link
									</button>
									<button
										onClick={(e) => {
											e.preventDefault();
											e.stopPropagation();
											const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(item.title || "Check out this project")}&url=${encodeURIComponent(window.location.origin + "/portfolio/" + (item.permalink || item.slug))}`;
											window.open(tweetUrl);
										}}
										className="block w-full text-left hover:text-primary-400"
									>
										Share on X
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
			<div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
		</motion.div>
	);
}
