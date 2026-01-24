export interface Resume {
    basics: {
        name: string;
        title: string;
        image: string;
        email: string;
        location: string;
        website: string;
        linkedin: string;
        about: string;
    };
    experience: {
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string[];
        tags: string[];
    }[];
    education: {
        institution: string;
        degree: string;
        startDate: string;
        endDate: string;
        description: string[];
    }[];
    certificates: {
        name: string;
        year: string;
    }[];
    skills: string[];
    languages: string[];
}
