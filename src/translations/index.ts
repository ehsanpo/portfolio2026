export const translations = {
	en: {
		sections: {
			about: "About",
			contact: "Contact",
			experience: "Experience",
			education: "Education",
			certificates: "Certificates",
			skills: "Skills",
			languages: "Languages",
		},
	},
	sv: {
		sections: {
			about: "Om mig",
			contact: "Kontakt",
			experience: "Erfarenhet",
			education: "Utbildning",
			certificates: "Certifikat",
			skills: "Kompetenser",
			languages: "Språk",
		},
	},
} as const;

export type Language = keyof typeof translations;
export type SectionKey = keyof (typeof translations)["en"]["sections"];
