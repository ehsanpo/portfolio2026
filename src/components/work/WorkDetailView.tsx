"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard3D } from '@/components/ProjectCard3D';
import TeamAvatar from '@/components/TeamAvatar';
import { getTestimonialImage } from '@/utils/testimonialImages';
import { getProjectImage } from '@/utils/projectHelpers';

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
      delayChildren: 0.2
    }
  } as any
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  } as any
};

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  } as any
};

export const WorkDetailView: React.FC<WorkDetailViewProps> = ({ company, relatedProjects, skillDurations }) => {
  const getSkillDuration = (skill: string) => {
    const s = skill.toLowerCase();
    return skillDurations[s] || 
           skillDurations[s + 'js'] || 
           skillDurations[s + ' js'] || 
           '';
  };



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-32">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="relative pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-accent-500/10 to-transparent blur-3xl opacity-20"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Logo/Image */}
          <motion.div 
            variants={itemVariants}
            className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-white/5 border border-white/10 p-4 flex items-center justify-center backdrop-blur-sm shadow-2xl shrink-0 group hover:border-accent-500/50 transition-colors duration-500"
          >
            {company.image ? (
              <img src={company.image} alt={company.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
            ) : (
              <div className="text-4xl font-bold text-white/20 uppercase">{company.name.charAt(0)}</div>
            )}
          </motion.div>

          {/* Info */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium mb-5"
            >
              <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
              {company.year}
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-primary-500 text-4xl md:text-6xl font-bold mb-1 tracking-tight"
            >
              {company.name}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-accent-400/90 font-medium mb-1 uppercase tracking-wider"
            >
              {company.position}
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-slate-400 max-w-2xl leading-relaxed mx-auto lg:mx-0"
            >
              {company.description}
            </motion.p>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Tags */}
          {company.tags && company.tags.length > 0 && (
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <h2 className="font-bold text-white mb-6 uppercase tracking-widest text-sm border-l-4 border-accent-500 pl-4">Focus Areas</h2>
              <div className="flex flex-wrap gap-2">
                {company.softSkills.map((skill, idx) => (
                <motion.span 
                  key={idx}
                  variants={itemVariants}
                  className="px-4 py-2 rounded-xl bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-medium hover:bg-accent-500/20 transition-colors"
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
            <h2 className="font-bold text-white mb-8 border-l-4 border-accent-500 pl-4 uppercase tracking-widest text-sm">Overview</h2>
            <div className="grid grid-cols-1 gap-4">
              {company.detailedDescription.map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-500/30 transition-all duration-300 group"
                >
                  <p className="text-slate-300 leading-6 group-hover:text-white transition-colors">
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
              <h2 className="font-bold text-white mb-8 border-l-4 border-accent-500 pl-4 uppercase tracking-widest text-sm">Awards & Recognition</h2>
              <div className="space-y-4">
                {company.awards.map((award, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center gap-6 p-6 rounded-2xl bg-linear-to-r from-yellow-500/10 to-transparent border border-yellow-500/20"
                  >
                    {award.images && (
                      <img src={award.images} alt={award.name} className="w-16 h-16 object-contain filter drop-shadow-lg" />
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
              <h2 className="font-bold text-white mb-8 border-l-4 border-accent-500 pl-4 uppercase tracking-widest text-sm">Projects & Case Studies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      glowColor='color-mix(in srgb, black 80%, var(--color-accent))'
                    />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}


        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-4 space-y-12">
          
          {/* Skills */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <h2 className="font-bold text-white mb-6 uppercase tracking-widest text-sm border-l-4 border-accent-500 pl-4">Technical Expertise</h2>
            <div className="space-y-3">
              {company.codeSkills.map((skill, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-colors"
                >
                  <span className="text-slate-300 font-medium group-hover:text-accent-400 transition-colors">{skill}</span>
                  <span className="text-xs text-slate-500 font-mono">{getSkillDuration(skill)}</span>
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
              <h2 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Team Members</h2>
              <div className="space-y-4">
                {company.team.map((member, idx) => (
                  <motion.div 
                    key={idx}
                    variants={itemVariants}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700 group-hover:border-accent-500 transition-colors flex items-center justify-center">
                      {member.img ? (
                        <img src={getTestimonialImage(member.img)} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <TeamAvatar name={member.name} size={48} />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm group-hover:text-accent-400 transition-colors">{member.name}</div>
                      <div className="text-slate-500 text-xs">{member.role}</div>
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
