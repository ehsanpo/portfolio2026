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
				"on-paper hard flex h-full flex-col justify-between bg-cream text-ink",
				featured && "md:col-span-1",
				className
			)}
		>
			<div>
				<div className="flex items-center gap-3 border-b-[1.5px] border-ink px-2.5 py-1.5">
					<span className="size-3 shrink-0 border-[1.5px] border-ink" aria-hidden="true" />
					<span className="stripes h-[13px] flex-1" aria-hidden="true" />
					<span className="font-pixel text-sm leading-none">
						{featured ? "Featured note" : "Field note"}
					</span>
					<span className="stripes h-[13px] flex-1" aria-hidden="true" />
				</div>

				{post.cover?.src ? (
					<a
						href={`/blog/${post.slug}`}
						className={cn(
							"block overflow-hidden border-b-[1.5px] border-ink bg-paper",
							featured ? "h-60" : "h-48"
						)}
					>
						<img
							src={post.cover.src}
							alt={sanitize(post.title)}
							loading="lazy"
							className="h-full w-full object-cover"
						/>
					</a>
				) : (
					<a
						href={`/blog/${post.slug}`}
						className={cn(
							"flex items-center justify-center border-b-[1.5px] border-ink bg-mustard p-6 text-ink",
							featured ? "h-60" : "h-48"
						)}
					>
						<span className="font-pixel text-2xl">DISPATCH</span>
					</a>
				)}

				<div className="p-5">
					<div className="mb-3 flex flex-wrap items-center justify-between gap-2">
						<time dateTime={post.date} className="label-mono opacity-75">
							{formatDate(post.date)}
						</time>

						{post.category && post.category.length > 0 && (
							<div className="flex flex-wrap gap-1.5">
								{post.category.slice(0, 2).map((cat) => (
									<span
										key={cat}
										className="label-mono border-[1.5px] border-ink bg-paper px-2 py-0.5 text-[10px]"
									>
										{cat}
									</span>
								))}
							</div>
						)}
					</div>

					<h3
						className={cn(
							"font-bold tracking-[-0.03em] text-ink",
							featured ? "text-2xl leading-tight" : "text-xl leading-snug"
						)}
					>
						<a href={`/blog/${post.slug}`} className="hover:underline">
							{sanitize(post.title)}
						</a>
					</h3>

					{post.description && (
						<p className="mt-3 line-clamp-3 text-sm leading-relaxed opacity-85">
							{sanitize(post.description)}
						</p>
					)}
				</div>
			</div>

			<div className="border-t-[1.5px] border-ink p-4">
				<a href={`/blog/${post.slug}`} className="key bg-cream text-ink">
					Read article
				</a>
			</div>
		</article>
	);
};

