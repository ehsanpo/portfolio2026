import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface PortfolioFilterProps {
	categories: string[];
	category: string;
	onCategoryChange?: (category: string) => void;
}

export default function PortfolioFilter({
	categories,
	category: initialCategory,
	onCategoryChange,
}: PortfolioFilterProps) {
	const [selectedCategory, setSelectedCategory] = useState(initialCategory);

	const filterPortfolio = (category: string) => {
		setSelectedCategory(category);
		if (onCategoryChange) {
			onCategoryChange(category);
		}

		const portfolioCards = document.querySelectorAll("[data-categories]");

		portfolioCards.forEach((card) => {
			const categories = JSON.parse(card.getAttribute("data-categories") || "[]");

			if (category === "all" || categories.includes(category)) {
				(card as HTMLElement).style.display = "block";
			} else {
				(card as HTMLElement).style.display = "none";
			}
		});
	};

	return (
		<div className="mb-8 flex flex-wrap gap-4">
			<motion.button
				onClick={() => filterPortfolio("all")}
				className={clsx(
					"clip2 rounded px-4 py-2 transition-colors",
					selectedCategory === "all" ? "bg-primary-500 text-black" : "text-light bg-neutral-800/50"
				)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				aria-label="Show all categories"
			>
				All
			</motion.button>
			{categories.map((category) => (
				<motion.button
					key={category}
					onClick={() => filterPortfolio(category)}
					className={clsx(
						"clip2 rounded px-4 py-2 transition-colors",
						selectedCategory === category
							? "bg-primary-500 text-black"
							: "text-light bg-neutral-800/50"
					)}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					aria-label={`Filter by ${category}`}
				>
					{category}
				</motion.button>
			))}
		</div>
	);
}
