"use client";

import React from "react";
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
		link?: string;
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
		<div>
			<section className="block-mustard border-b-[1.5px] border-ink pt-28 pb-12 md:pt-32 md:pb-16">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between border-t-[1.5px] border-ink pt-3">
						<p className="label-mono">/ Work / {company.name}</p>
						<div className="flex items-center gap-3">
							<p className="label-mono">{company.year}</p>
							<span className="size-2 bg-ink" aria-hidden="true" />
						</div>
					</div>

					<div className="mt-6">
						<a href="/work" className="key bg-cream text-ink mb-6">
							Back to work
						</a>
					</div>

					<div className="mt-2 flex flex-col items-start gap-8 md:flex-row md:items-center">
						<div className="on-paper hard bg-cream p-4 border-[1.5px] border-ink h-28 w-28 md:h-36 md:w-36 flex items-center justify-center shrink-0">
							{company.image ? (
								<img
									src={company.image}
									alt={company.name}
									className="h-full w-full object-contain"
								/>
							) : (
								<div className="font-pixel text-4xl text-ink uppercase">
									{company.name.charAt(0)}
								</div>
							)}
						</div>

						<div className="flex-1">
							<h1 className="text-4xl md:text-6xl font-bold tracking-[-0.04em] text-ink leading-[1.02]">
								{company.name}.
							</h1>
							<p className="label-mono mt-3 inline-block border-[1.5px] border-ink bg-cream px-2.5 py-1 text-ink">
								{company.position}
							</p>
							<p className="mt-4 max-w-2xl text-lg leading-snug text-ink/90">
								{company.description}
							</p>
						</div>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 py-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
				<div className="lg:col-span-8 space-y-12">
					{company.softSkills && company.softSkills.length > 0 && (
						<section>
							<div className="flex items-center justify-between border-t-[1.5px] border-current pt-3 mb-6">
								<p className="label-mono">/ Focus areas</p>
								<span className="size-2 bg-current" aria-hidden="true" />
							</div>
							<div className="flex flex-wrap gap-2.5">
								{company.softSkills.map((skill, idx) => (
									<span
										key={idx}
										className="on-paper border-[1.5px] border-ink bg-cream px-3 py-1.5 font-mono text-xs font-semibold text-ink shadow-[2px_2px_0_var(--ink)]"
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}

					{company.detailedDescription && company.detailedDescription.length > 0 && (
						<section>
							<div className="flex items-center justify-between border-t-[1.5px] border-current pt-3 mb-6">
								<p className="label-mono">/ Role &amp; architecture</p>
								<span className="size-2 bg-current" aria-hidden="true" />
							</div>
							<div className="on-paper hard bg-cream text-ink divide-y-[1.5px] divide-ink">
								{company.detailedDescription.map((item, idx) => (
									<div
										key={idx}
										className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-[3.5rem_1fr] sm:items-baseline"
									>
										<span className="label-mono text-muted-foreground">
											{String(idx + 1).padStart(2, "0")}
										</span>
										<p className="text-base leading-relaxed text-ink">{item}</p>
									</div>
								))}
							</div>
						</section>
					)}

					{company.awards && company.awards.length > 0 && (
						<section>
							<div className="flex items-center justify-between border-t-[1.5px] border-current pt-3 mb-6">
								<p className="label-mono">/ Recognition</p>
								<span className="size-2 bg-current" aria-hidden="true" />
							</div>
							<div className="space-y-4">
								{company.awards.map((award, idx) => (
									<div
										key={idx}
										className="on-paper hard bg-cream text-ink flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
									>
										<div className="flex items-center gap-5">
											{award.images && (
												<div className="flex h-16 w-16 shrink-0 items-center justify-center border-[1.5px] border-ink bg-paper p-2">
													<img
														src={award.images}
														alt={award.name}
														className="h-full w-full object-contain"
													/>
												</div>
											)}
											<div>
												<span className="font-pixel text-xs border border-ink bg-mustard px-2 py-0.5 text-ink">
													HONOR
												</span>
												<h3 className="mt-1.5 text-xl font-bold tracking-[-0.02em] text-ink">
													{award.name}
												</h3>
												<p className="mt-1 text-sm leading-snug text-ink/80">
													{award.description}
												</p>
											</div>
										</div>
										{award.link && (
											<a
												href={award.link.startsWith("/") ? award.link : `/${award.link}`}
												className="key bg-ink text-cream shrink-0"
											>
												Case study
											</a>
										)}
									</div>
								))}
							</div>
						</section>
					)}

					{relatedProjects.length > 0 && (
						<section>
							<div className="flex items-center justify-between border-t-[1.5px] border-current pt-3 mb-6">
								<p className="label-mono">/ Shipped at {company.name}</p>
								<div className="flex items-center gap-3">
									<p className="label-mono hidden opacity-70 sm:block">
										{relatedProjects.length} case {relatedProjects.length === 1 ? "study" : "studies"}
									</p>
									<span className="size-2 bg-current" aria-hidden="true" />
								</div>
							</div>
							<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
								{relatedProjects.map((project, index) => (
									<ProjectCard3D
										key={project.id}
										title={project.data.title}
										description={project.data.tagline}
										date={project.data.port_date || project.data.date}
										tags={project.data.tag}
										image={getProjectImage(project.data)}
										categories={project.data.category}
										layout={index}
										href={`/portfolio/${project.data.permalink || project.slug}`}
									/>
								))}
							</div>
						</section>
					)}
				</div>

				<div className="lg:col-span-4 space-y-12">
					{company.codeSkills && company.codeSkills.length > 0 && (
						<section className="on-paper hard bg-cream text-ink">
							<div className="flex items-center gap-2.5 border-b-[1.5px] border-ink px-3 py-2 bg-cream">
								<span className="size-2.5 shrink-0 border-[1.5px] border-ink bg-tomato" aria-hidden="true" />
								<span className="stripes h-[11px] flex-1" aria-hidden="true" />
								<h2 className="font-pixel text-xs leading-none uppercase text-ink">
									STACK &amp; DURATION
								</h2>
							</div>
							<dl className="divide-y divide-ink/20 px-4 py-1">
								{company.codeSkills.map((skill, idx) => {
									const duration = getSkillDuration(skill);
									return (
										<div
											key={idx}
											className="flex items-baseline justify-between gap-4 py-2.5"
										>
											<dt className="font-sans text-sm font-semibold text-ink">
												{skill}
											</dt>
											<dd className="font-mono text-xs text-ink/75 tabular-nums">
												{duration || "Active"}
											</dd>
										</div>
									);
								})}
							</dl>
						</section>
					)}

					{company.team && company.team.length > 0 && (
						<section className="on-paper hard bg-cream text-ink">
							<div className="flex items-center gap-2.5 border-b-[1.5px] border-ink px-3 py-2 bg-cream">
								<span className="size-2.5 shrink-0 border-[1.5px] border-ink bg-mint" aria-hidden="true" />
								<span className="stripes h-[11px] flex-1" aria-hidden="true" />
								<h2 className="font-pixel text-xs leading-none uppercase text-ink">
									TEAM ROSTER
								</h2>
							</div>
							<ul className="divide-y divide-ink/20 p-4">
								{company.team.map((member, idx) => (
									<li
										key={idx}
										className="flex items-center gap-3.5 py-2.5 first:pt-0 last:pb-0"
									>
										<div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border-[1.5px] border-ink bg-paper">
											{member.img ? (
												<img
													src={getTestimonialImage(member.img)}
													alt={member.name}
													className="h-full w-full object-cover"
												/>
											) : (
												<TeamAvatar name={member.name} size={44} />
											)}
										</div>
										<div className="min-w-0 flex-1">
											<div className="truncate font-sans text-sm font-bold text-ink">
												{member.name}
											</div>
											<div className="label-mono truncate text-[10px]! text-ink/70">
												{member.role}
											</div>
										</div>
									</li>
								))}
							</ul>
						</section>
					)}
				</div>
			</div>
		</div>
	);
};
