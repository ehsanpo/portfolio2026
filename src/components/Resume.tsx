import { useState, useEffect } from "react";

import { Toolbar } from "@/components/resume/Toolbar";
import { Main } from "@/components/resume/Main";
import { Aside } from "@/components/resume/Aside";
import type { Resume } from "@/types/resume";
import type { Language } from "@/translations/index";
import portfolioData from "@/data/portfolio-resume.json";

interface ClientData {
	name: string;
	type: string;
}

const ResumeCv = () => {
	const [mainColor, setMainColor] = useState("#d4411f");
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
			clients: c.clients,
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

	const clients: ClientData[] = portfolioData.clients || [];
	const headerSkills = ["React", "Node.js", "TypeScript"];

	useEffect(() => {
		document.documentElement.style.setProperty("--main-color", mainColor);
	}, [mainColor]);

	const handleExportPDF = () => {
		window.print();
	};

	return (
		<div className="relative bg-paper text-ink min-h-screen pt-28 pb-20 print:mt-0 print:pt-0 print:pb-0 print:bg-white">
			<div className="container mx-auto px-4 mb-6 print:hidden">
				<div className="flex flex-wrap items-center justify-between gap-4 border-t-[1.5px] border-ink pt-3">
					<p className="label-mono">/ Curriculum vitae &amp; specification sheet</p>
					<div className="flex items-center gap-3">
						<button
							type="button"
							onClick={handleExportPDF}
							className="key bg-ink text-cream px-3! py-2! text-xs!"
						>
							Print / Save PDF
						</button>
					</div>
				</div>
			</div>

			<div className="print:hidden">
				<Toolbar
					onColorChange={setMainColor}
					onLanguageChange={setLanguage}
					onExportPDF={handleExportPDF}
					currentLanguage={language}
				/>
			</div>

			<div className="container mx-auto px-4 print:px-0 print:max-w-none">
				<div className="on-paper hard bg-cream text-ink mx-auto max-w-5xl print:border-0 print:shadow-none print:bg-white">
					<div className="flex items-center gap-2.5 border-b-[1.5px] border-ink px-3 py-2 bg-cream print:hidden">
						<span className="size-2.5 shrink-0 border-[1.5px] border-ink bg-tomato" aria-hidden="true" />
						<span className="stripes h-[11px] flex-1" aria-hidden="true" />
						<span className="font-pixel text-xs leading-none uppercase text-ink">
							DOSSIER / {resumeData.basics.name}
						</span>
					</div>

					<div className="p-6 md:p-10 print:p-4">
						<div className="flex flex-col gap-6 border-b-[1.5px] border-ink pb-8 md:flex-row md:items-center">
							<div className="h-28 w-28 shrink-0 border-[1.5px] border-ink bg-paper overflow-hidden shadow-[3px_3px_0_var(--ink)] print:shadow-none">
								<img
									src="/img/profile.jpg"
									width={112}
									height={112}
									alt={resumeData.basics.name}
									className="h-full w-full object-cover"
								/>
							</div>

							<div className="flex-1">
								<h1
									className="text-4xl font-bold tracking-[-0.04em] leading-[1.02] md:text-5xl"
									style={{ color: mainColor }}
								>
									{resumeData.basics.name}
								</h1>
								<p className="mt-2 text-xl font-medium text-ink md:text-2xl">
									{resumeData.basics.title}
								</p>
								<div className="mt-4 flex flex-wrap gap-2">
									{headerSkills.map((skill, index) => (
										<span
											key={index}
											className="border-[1.5px] border-ink bg-paper px-2.5 py-1 font-mono text-xs font-semibold text-ink"
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						</div>

						<div className="mt-8 flex flex-col gap-8 lg:flex-row print:block print:gap-0 print:space-y-4">
							<div className="w-full lg:w-1/4 shrink-0 print:w-full">
								<Aside data={resumeData} mainColor={mainColor} language={language} />
							</div>
							<div className="flex-1 print:w-full">
								<Main data={resumeData} mainColor={mainColor} language={language} clients={clients} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResumeCv;
