import React from "react";
import { Download, Languages } from "lucide-react";

interface ToolbarProps {
	onColorChange: (color: string) => void;
	onLanguageChange: (lang: "en" | "sv") => void;
	onExportPDF: () => void;
	currentLanguage: "en" | "sv";
}

export const Toolbar: React.FC<ToolbarProps> = ({
	onColorChange,
	onLanguageChange,
	onExportPDF,
	currentLanguage,
}) => {
	const colors = ["#0891b2", "#4f46e5", "#059669", "#db2777", "#d97706"];

	return (
		<div className="fixed top-16 right-0 left-0 z-50 bg-white shadow-md print:hidden">
			<div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						{colors.map((color) => (
							<button
								key={color}
								onClick={() => onColorChange(color)}
								className="h-6 w-6 rounded-full border-2 border-gray-200"
								style={{ backgroundColor: color }}
							/>
						))}
					</div>

					<button
						onClick={() => onLanguageChange(currentLanguage === "en" ? "sv" : "en")}
						className="rounded-lg p-2 hover:bg-gray-100"
					>
						<Languages className="text-primary-500 h-5 w-5" />
					</button>
				</div>
				<button onClick={onExportPDF} className="rounded-lg bg-slate-300 p-2 hover:bg-gray-100">
					<Download className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};
