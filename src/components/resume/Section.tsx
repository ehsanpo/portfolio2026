import React from "react";

interface SectionProps {
	title: string;
	mainColor: string;
	children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, mainColor, children }) => {
	return (
		<section>
			<h2 className="mb-4 text-2xl font-bold" style={{ color: mainColor }}>
				{title}
			</h2>
			{children}
		</section>
	);
};
