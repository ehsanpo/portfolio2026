import React, { useState, useEffect } from "react";

import { Toolbar } from "@/components/resume/Toolbar";
import { Main } from "@/components/resume//Main";
import { Aside } from "@/components/resume//Aside";
import type { Resume } from "@/types/resume";
import type { Language } from "@/translations/index";
import resumeEn from "@/data/resume-en.json";
import resumeSv from "@/data/resume-sv.json";

interface Props {
	// Define your props here if needed
}

const ResumeCv: React.FC<Props> = () => {
	const [mainColor, setMainColor] = useState("#4f46e5");
	const [language, setLanguage] = useState<Language>("en");
	const resumeData: Resume = language === "en" ? resumeEn : resumeSv;

	useEffect(() => {
		document.documentElement.style.setProperty("--main-color", mainColor);
	}, [mainColor]);

	const handleExportPDF = () => {
		window.print();
	};

	return (
		<div className="relative mt-16 min-h-screen bg-white print:mt-0">
			<Toolbar
				onColorChange={setMainColor}
				onLanguageChange={setLanguage}
				onExportPDF={handleExportPDF}
				currentLanguage={language}
			/>

			<div className="bg-white pt-16 text-gray-900">
				<div className="mx-auto max-w-4xl px-4">
					<div>
						<img
							src="/img/profile.jpg"
							width={100}
							height={100}
							alt={resumeData.basics.name}
							className="mb-4 rounded-full object-cover"
						/>
					</div>

					<div>
						<h1 className="text-6xl font-bold" style={{ color: mainColor }}>
							{resumeData.basics.name}
						</h1>
						<p className="text-4xl">{resumeData.basics.title}</p>
					</div>
				</div>

				<div className="mx-auto flex max-w-4xl gap-8 px-4 py-8 print:block print:gap-0 print:space-y-4">
					<div className="w-1/4 flex-shrink-0 print:w-full">
						<Aside data={resumeData} mainColor={mainColor} language={language} />
					</div>
					<div className="flex-1 print:w-full">
						<Main data={resumeData} mainColor={mainColor} language={language} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResumeCv;
