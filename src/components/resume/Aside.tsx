import React from "react";
import type { Resume } from "@/types/resume";
import { translations, type Language } from "@/translations";
import { MapPin, Mail, Globe, Linkedin } from "lucide-react";
import { Section } from "./Section";
import { Tag } from "./Tag";

interface AsideProps {
	data: Resume;
	mainColor: string;
	language: Language;
}

export const Aside: React.FC<AsideProps> = ({ data, mainColor, language }) => {
	const t = translations[language].sections;

	return (
		<aside className="space-y-6 lg:col-span-1">
			<div>
				<h2 className="mb-2 text-xl font-semibold" style={{ color: mainColor }}>
					{t.about}
				</h2>
				<p className="text-sm">{data.basics.about}</p>
			</div>

			<div>
				<h2 className="mb-2 text-xl font-semibold" style={{ color: mainColor }}>
					{t.contact}
				</h2>
				<div className="space-y-2 text-sm print:grid print:grid-cols-2 print:gap-x-4 print:gap-y-1 print:space-y-0">
					<p className="flex items-center gap-2">
						<MapPin size={16} style={{ color: mainColor }} />
						{data.basics.location}
					</p>
					<p className="flex items-center gap-2">
						<Mail size={16} style={{ color: mainColor }} />
						{data.basics.email}
					</p>
					<a
						href={data.basics.website}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 hover:underline"
					>
						<Globe size={16} style={{ color: mainColor }} />
						{data.basics.website}
					</a>
					<a
						href={data.basics.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 hover:underline"
					>
						<Linkedin size={16} style={{ color: mainColor }} />
						{data.basics.linkedin}
					</a>
				</div>
			</div>

			<Section title={t.skills} mainColor={mainColor}>
				<div className="flex flex-wrap gap-2">
					{data.skills.map((skill, index) => (
						<Tag key={index}>{skill}</Tag>
					))}
				</div>
			</Section>

			<Section title={t.languages} mainColor={mainColor}>
				<div className="mb-16 flex flex-wrap gap-2">
					{data.languages.map((lang, index) => (
						<Tag key={index}>{lang}</Tag>
					))}
				</div>
			</Section>
		</aside>
	);
};
