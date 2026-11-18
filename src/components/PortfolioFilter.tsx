import { useState } from "react";
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
		<div className="mb-10 flex flex-wrap gap-2.5">
			<button
				type="button"
				onClick={() => filterPortfolio("all")}
				className={clsx(
					"key px-3! py-2! text-xs! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
					selectedCategory === "all" ? "bg-ink text-cream" : "bg-cream text-ink"
				)}
				aria-label="Show all categories"
			>
				All
			</button>
			{categories.map((category) => (
				<button
					type="button"
					key={category}
					onClick={() => filterPortfolio(category)}
					className={clsx(
						"key px-3! py-2! text-xs! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
						selectedCategory === category ? "bg-ink text-cream" : "bg-cream text-ink"
					)}
					aria-label={`Filter by ${category}`}
				>
					{category}
				</button>
			))}
		</div>
	);
}
