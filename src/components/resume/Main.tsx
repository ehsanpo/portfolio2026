import React from "react";
import { Timeline } from "./Timeline";
import type { Resume } from "@/types/resume";
import { Section } from "./Section";
import { translations, type Language } from "@/translations";

interface ClientData {
	name: string;
	type: string;
}

interface MainProps {
	data: Resume;
	mainColor: string;
	language: Language;
	clients?: ClientData[];
}

export const Main: React.FC<MainProps> = ({ data, mainColor, language, clients = [] }) => {
	const t = translations[language].sections;

	return (
		<main className="space-y-8 lg:col-span-3">
			<Section title={t.experience} mainColor={mainColor}>
				<Timeline
					items={data.experience.map((exp) => ({
						title: exp.company,
						subtitle: exp.position,
						startDate: exp.startDate,
						endDate: exp.endDate,
						description: exp.description,
						tags: exp.tags,
						clients: exp.clients,
					}))}
					mainColor={mainColor}
				/>
				<div className="dvidePage" />
			</Section>

			<Section title={t.education} mainColor={mainColor}>
				<Timeline
					items={data.education.map((edu) => ({
						title: edu.institution,
						subtitle: edu.degree,
						startDate: edu.startDate,
						endDate: edu.endDate,
						description: edu.description,
					}))}
					mainColor={mainColor}
				/>
			</Section>

			<Section title={t.certificates} mainColor={mainColor}>
				<ul className="space-y-2">
					{data.certificates.map((cert, index) => (
						<li key={index} className="flex items-baseline justify-between">
							<span className="font-medium">{cert.name}</span>
							<span className="text-sm text-gray-600">{cert.year}</span>
						</li>
					))}
				</ul>
			</Section>

			{clients && clients.length > 0 && (
				<Section title="Clients" mainColor={mainColor}>
					<div className="grid grid-cols-2 gap-3">
						{clients.map((client, index) => (
							<div key={index} className="border-l-4 pl-3" style={{ borderColor: mainColor }}>
								<p className="font-medium">{client.name}</p>
								<p className="text-sm text-gray-600">{client.type}</p>
							</div>
						))}
					</div>
				</Section>
			)}
		</main>
	);
};
