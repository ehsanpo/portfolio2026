import React from "react";

interface TagProps {
	children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ children }) => {
	return <span className="rounded-full bg-gray-100 px-3 py-1">{children}</span>;
};
