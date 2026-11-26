import React from "react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/utils/data";

interface BlogCardProps {
	post: BlogPost;
	featured?: boolean;
	className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false, className }) => {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const sanitize = (text: string) => text.replace(/\s*[—–]\s*/g, ", ");

	return (
		<article
			className={cn(
				"group flex h-full flex-col justify-between bg-[#17140f] text-white transition-colors duration-200 hover:bg-[#211c15] dark:bg-[#1e1a13] dark:hover:bg-[#282219]",
				featured && "md:col-span-1",
				className
			)}
		>
			<div>
				{post.cover?.src ? (
					<a
						href={`/blog/${post.slug}`}
						className={cn(
							"block overflow-hidden bg-[#110e0a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard",
							featured ? "aspect-[16/10] sm:h-64 sm:aspect-auto" : "aspect-[16/10] sm:h-52 sm:aspect-auto"
						)}
					>
						<img
							src={post.cover.src}
							alt={sanitize(post.title)}
							loading="lazy"
							className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
						/>
					</a>
				) : (
					<a
						href={`/blog/${post.slug}`}
						className={cn(
							"flex items-center justify-center bg-[#221d16] p-6 text-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard",
							featured ? "h-64" : "h-52"
						)}
					>
						<span className="font-pixel text-2xl tracking-wider">DISPATCH</span>
					</a>
				)}

				<div className="p-6">
					<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
						<time dateTime={post.date} className="label-mono text-white/70">
							{formatDate(post.date)}
						</time>

						{post.category && post.category.length > 0 && (
							<div className="flex flex-wrap gap-1.5">
								{post.category.slice(0, 2).map((cat) => (
									<span
										key={cat}
										className="label-mono bg-white/10 px-2.5 py-0.5 text-[10px] text-white/90"
									>
										{cat}
									</span>
								))}
							</div>
						)}
					</div>

					<h3
						className={cn(
							"font-bold tracking-[-0.03em] text-white transition-colors group-hover:text-mustard",
							featured ? "text-xl md:text-2xl leading-tight" : "text-xl leading-snug"
						)}
					>
						<a
							href={`/blog/${post.slug}`}
							className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard"
						>
							{sanitize(post.title)}
						</a>
					</h3>

					{post.description && (
						<p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/80">
							{sanitize(post.description)}
						</p>
					)}
				</div>
			</div>

			<div className="flex items-center justify-between px-6 pb-6 pt-2">
				<a
					href={`/blog/${post.slug}`}
					className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-mustard transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mustard"
				>
					<span>Read article</span>
					<span
						className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
						aria-hidden="true"
					>
						&rarr;
					</span>
				</a>
			</div>
		</article>
	);
};

