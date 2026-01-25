import { useState, useEffect } from "react";

import { Toolbar } from "@/components/resume/Toolbar";
import { Main } from "@/components/resume/Main";
import { Aside } from "@/components/resume/Aside";
import type { Resume } from "@/types/resume";
import type { Language } from "@/translations/index";
import portfolioData from "@/data/portfolio-resume.json";

const ResumeCv = () => {
	const [mainColor, setMainColor] = useState("#4f46e5");
	const [language, setLanguage] = useState<Language>("en");

	const resumeData: Resume = {
		basics: {
			name: portfolioData.basics.name,
			title: portfolioData.basics.title,
			image: portfolioData.basics.image,
			email: portfolioData.basics.email,
			location: portfolioData.basics.location,
			website: portfolioData.basics.website,
			linkedin: portfolioData.basics.linkedin,
			about: portfolioData.basics.about,
		},
		experience: portfolioData.companies.map((c) => ({
			company: c.name,
			position: c.position,
			startDate: c.startDate,
			endDate: c.endDate,
			description: c.detailedDescription,
			tags: c.tags,
		})),
		education: portfolioData.education.map((e) => ({
			institution: e.institution,
			degree: e.degree,
			startDate: e.startDate,
			endDate: e.endDate,
			description: e.detailedDescription,
		})),
		certificates: portfolioData.certifications,
		skills: portfolioData.skills,
		languages: portfolioData.languages.map((l) => l.name),
	};

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
					<div className="w-1/4 shrink-0 print:w-full">
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
