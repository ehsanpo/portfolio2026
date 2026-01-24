import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface PromptCardProps {
	prompt: {
		title: string;
		description: string;
		slug: string;
		category?: string;
		tags?: string[];
		icon?: string;
		image?: string;
	};
	className?: string;
}

export function PromptCard({ prompt, className }: PromptCardProps) {
	return (
		<motion.a
			href={`/prompts/${prompt.slug}`}
			className={cn(
				"hover:border-primary group relative block overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900",
				className
			)}
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.2 }}
		>
			{/* Image or Icon */}
			{prompt.image ? (
				<div className="relative h-48 w-full overflow-hidden">
					<img
						src={prompt.image}
						alt={prompt.title}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
				</div>
			) : (
				<div className="from-primary/10 to-primary/5 flex h-48 w-full items-center justify-center bg-gradient-to-br">
					<span className="text-6xl">{prompt.icon || "📝"}</span>
				</div>
			)}

			{/* Content */}
			<div className="p-6">
				<div className="mb-4 flex items-start justify-between">
					<h3 className="text-xl font-bold text-gray-900 dark:text-white">{prompt.title}</h3>
					<ArrowRight className="group-hover:text-primary h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1" />
				</div>
				<p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
					{prompt.description}
				</p>{" "}
				{/* Tags */}
				{prompt.tags && prompt.tags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{prompt.tags.slice(0, 3).map((tag) => (
							<span
								key={tag}
								className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
							>
								<Tag className="h-3 w-3" />
								{tag}
							</span>
						))}
						{prompt.tags.length > 3 && (
							<span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
								+{prompt.tags.length - 3}
							</span>
						)}
					</div>
				)}
			</div>
		</motion.a>
	);
}
