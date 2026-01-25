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

	return (
		<article
			className={cn(
				"clip group relative overflow-hidden rounded bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-opium dark:bg-neutral-800",
				featured && "md:col-span-1",
				className
			)}
		>
			<a href={`/blog/${post.slug}`} className="block">
				{post.cover ? (
					<div className={cn("relative overflow-hidden", featured ? "h-64" : "h-48")}>
						<img
							src={post.cover.src}
							alt={post.title}
							className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
					</div>
				) : (
					<div
						className={cn(
							"from-primary-500 to-primary-700 relative bg-gradient-to-br",
							featured ? "h-64" : "h-48"
						)}
					>
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="text-center text-white">
								<svg
									className="mx-auto mb-4 h-16 w-16 opacity-50"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="1"
										d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
									/>
								</svg>
							</div>
						</div>
					</div>
				)}

				<div className="p-6">
					<div className="mb-3 flex flex-wrap items-center gap-2">
						<time dateTime={post.date} className="text-sm text-gray-200 dark:text-gray-400">
							{formatDate(post.date)}
						</time>

						{post.category && post.category.length > 0 && (
							<>
								<span className="text-gray-300 dark:text-gray-600">•</span>
								<div className="flex flex-wrap gap-1">
									{post.category.slice(0, 2).map((cat) => (
										<span
											key={cat}
											className="clip2 bg-primary-600 dark:bg-primary-900 dark:text-primary-200 rounded px-2 py-1 text-xs font-medium text-black"
										>
											{cat}
										</span>
									))}
									{post.category.length > 2 && (
										<span className="clip2 text-xs text-gray-500 dark:text-gray-400">
											+{post.category.length - 2}
										</span>
									)}
								</div>
							</>
						)}
					</div>

					<h3
						className={cn(
							"group-hover:text-primary-600 dark:text-primary-500 dark:group-hover:text-secondary-500 mb-3 font-bold text-gray-900 transition-colors",
							featured ? "text-2xl" : "text-xl"
						)}
					>
						{post.title.length > 60 ? `${post.title.substring(0, 60)}...` : post.title}
					</h3>

					{post.description && (
						<p className="dark:text-accent-200 mb-4 text-gray-100">
							{post.description.length > 120
								? `${post.description.substring(0, 120)}...`
								: post.description}
						</p>
					)}
				</div>

				{featured && (
					<div className="absolute top-4 left-4">
						<span className="bg-primary-600 rounded-full px-3 py-1 text-xs font-medium text-white">
							Featured
						</span>
					</div>
				)}
			</a>
		</article>
	);
};
