"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProjectCard3D } from "@/components/ProjectCard3D";
import TeamAvatar from "@/components/TeamAvatar";
import { getTestimonialImage } from "@/utils/testimonialImages";
import { getProjectImage } from "@/utils/projectHelpers";

interface Company {
	id: string;
	name: string;
	position: string;
	year: string;
	image: string;
	description: string;
	detailedDescription: string[];
	tags?: string[];
	awards?: Array<{
		name: string;
		description: string;
		images?: string;
	}>;
	codeSkills: string[];
	softSkills: string[];
	team?: Array<{
		name: string;
		role: string;
		img?: string;
	}>;
}

interface WorkDetailViewProps {
	company: Company;
	relatedProjects: any[];
	skillDurations: Record<string, string>;
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	} as any,
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
	} as any,
};

const heroVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.22, 1, 0.36, 1],
			staggerChildren: 0.1,
		},
	} as any,
};

export const WorkDetailView: React.FC<WorkDetailViewProps> = ({
	company,
	relatedProjects,
	skillDurations,
}) => {
	const getSkillDuration = (skill: string) => {
		const s = skill.toLowerCase();
		return skillDurations[s] || skillDurations[s + "js"] || skillDurations[s + " js"] || "";
	};

	return (
		<div className="mx-auto max-w-7xl px-4 pt-32 pb-32 sm:px-6 lg:px-8">
			{/* Hero Section */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={heroVariants}
				className="relative overflow-hidden pb-20"
			>
				<div className="absolute inset-0 -z-10">
					<div className="from-accent-500/10 absolute top-0 left-1/2 h-full w-full -translate-x-1/2 bg-linear-to-b to-transparent opacity-20 blur-3xl"></div>
				</div>

				<div className="flex flex-col items-center gap-12 lg:flex-row">
					{/* Logo/Image */}
					<motion.div
						variants={itemVariants}
						className="group hover:border-accent-500/50 flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-sm transition-colors duration-500 md:h-48 md:w-48"
					>
						{company.image ? (
							<img
								src={company.image}
								alt={company.name}
								className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
							/>
						) : (
							<div className="text-4xl font-bold text-white/20 uppercase">
								{company.name.charAt(0)}
							</div>
						)}
					</motion.div>

					{/* Info */}
					<div className="flex-1 text-center lg:text-left">
						<motion.div
							variants={itemVariants}
							className="bg-accent-500/10 border-accent-500/20 text-accent-400 mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium"
						>
							<span className="bg-accent-500 h-2 w-2 animate-pulse rounded-full"></span>
							{company.year}
						</motion.div>
						<motion.h1
							variants={itemVariants}
							className="text-primary-500 mb-1 text-4xl font-bold tracking-tight md:text-6xl"
						>
							{company.name}
						</motion.h1>
						<motion.p
							variants={itemVariants}
							className="text-accent-400/90 mb-1 text-xl font-medium tracking-wider uppercase md:text-2xl"
						>
							{company.position}
						</motion.p>
						<motion.p
							variants={itemVariants}
							className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400 lg:mx-0"
						>
							{company.description}
						</motion.p>
					</div>
				</div>
			</motion.section>

			<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
				{/* Left Column: Content */}
				<div className="space-y-12 lg:col-span-8">
					{/* Tags */}
					{company.tags && company.tags.length > 0 && (
						<motion.section
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={containerVariants}
						>
							<h2 className="border-accent-500 mb-6 border-l-4 pl-4 text-sm font-bold tracking-widest text-white uppercase">
								Focus Areas
							</h2>
							<div className="flex flex-wrap gap-2">
								{company.softSkills.map((skill, idx) => (
									<motion.span
										key={idx}
										variants={itemVariants}
										className="bg-accent-500/10 border-accent-500/20 text-accent-400 hover:bg-accent-500/20 rounded-xl border px-4 py-2 text-sm font-medium transition-colors"
									>
										{skill}
									</motion.span>
								))}
							</div>
						</motion.section>
					)}

					{/* Detailed Description */}
					<motion.section
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={containerVariants}
					>
						<h2 className="border-accent-500 mb-8 border-l-4 pl-4 text-sm font-bold tracking-widest text-white uppercase">
							Overview
						</h2>
						<div className="grid grid-cols-1 gap-4">
							{company.detailedDescription.map((item, idx) => (
								<motion.div
									key={idx}
									variants={itemVariants}
									className="hover:border-accent-500/30 group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300"
								>
									<p className="leading-6 text-slate-300 transition-colors group-hover:text-white">
										{item}
									</p>
								</motion.div>
							))}
						</div>
					</motion.section>
					{/* Awards if they exist */}
					{company.awards && company.awards.length > 0 && (
						<motion.section
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={containerVariants}
						>
							<h2 className="border-accent-500 mb-8 border-l-4 pl-4 text-sm font-bold tracking-widest text-white uppercase">
								Awards & Recognition
							</h2>
							<div className="space-y-4">
								{company.awards.map((award, idx) => (
									<motion.div
										key={idx}
										variants={itemVariants}
										className="flex items-center gap-6 rounded-2xl border border-yellow-500/20 bg-linear-to-r from-yellow-500/10 to-transparent p-6"
									>
										{award.images && (
											<img
												src={award.images}
												alt={award.name}
												className="h-16 w-16 object-contain drop-shadow-lg filter"
											/>
										)}
										<div>
											<h3 className="text-xl font-bold text-white">{award.name}</h3>
											<p className="text-yellow-500/80">{award.description}</p>
										</div>
									</motion.div>
								))}
							</div>
						</motion.section>
					)}

					{/* Related Portfolio content */}
					{relatedProjects.length > 0 && (
						<motion.section
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={containerVariants}
						>
							<h2 className="border-accent-500 mb-8 border-l-4 pl-4 text-sm font-bold tracking-widest text-white uppercase">
								Projects & Case Studies
							</h2>
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
								{relatedProjects.map((project, index) => (
									<motion.div key={project.id} variants={itemVariants}>
										<ProjectCard3D
											title={project.data.title}
											description={project.data.tagline}
											date={project.data.date}
											tags={project.data.tag}
											image={getProjectImage(project.data)}
											categories={project.data.category}
											layout={index}
											href={`/portfolio/${project.data.permalink}`}
											glowColor="color-mix(in srgb, black 80%, var(--color-accent))"
										/>
									</motion.div>
								))}
							</div>
						</motion.section>
					)}
				</div>

				{/* Right Column: Sidebar */}
				<div className="space-y-12 lg:col-span-4">
					{/* Skills */}
					<motion.section
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={containerVariants}
					>
						<h2 className="border-accent-500 mb-6 border-l-4 pl-4 text-sm font-bold tracking-widest text-white uppercase">
							Technical Expertise
						</h2>
						<div className="space-y-3">
							{company.codeSkills.map((skill, idx) => (
								<motion.div
									key={idx}
									variants={itemVariants}
									className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
								>
									<span className="group-hover:text-accent-400 font-medium text-slate-300 transition-colors">
										{skill}
									</span>
									<span className="font-mono text-xs text-slate-500">
										{getSkillDuration(skill)}
									</span>
								</motion.div>
							))}
						</div>
					</motion.section>

					{/* Team */}
					{company.team && company.team.length > 0 && (
						<motion.section
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={containerVariants}
						>
							<h2 className="mb-6 text-sm font-bold tracking-widest text-white uppercase">
								Team Members
							</h2>
							<div className="space-y-4">
								{company.team.map((member, idx) => (
									<motion.div
										key={idx}
										variants={itemVariants}
										className="group flex items-center gap-4"
									>
										<div className="group-hover:border-accent-500 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-slate-700 bg-slate-800 transition-colors">
											{member.img ? (
												<img
													src={getTestimonialImage(member.img)}
													alt={member.name}
													className="h-full w-full object-cover"
												/>
											) : (
												<TeamAvatar name={member.name} size={48} />
											)}
										</div>
										<div>
											<div className="group-hover:text-accent-400 text-sm font-medium text-white transition-colors">
												{member.name}
											</div>
											<div className="text-xs text-slate-500">{member.role}</div>
										</div>
									</motion.div>
								))}
							</div>
						</motion.section>
					)}
				</div>
			</div>
		</div>
	);
};
