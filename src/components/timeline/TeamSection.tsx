import React from "react";
import TeamAvatar from "../TeamAvatar";

interface TeamMember {
	name: string;
	role: string;
	linkedin?: string;
	img?: string;
}

interface TeamSectionProps {
	team: TeamMember[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team }) => {
	return (
		<div className="mt-6">
			<h4 className="mb-3 text-sm font-bold tracking-widest text-white uppercase">The Team</h4>
			<div className="flex flex-wrap gap-4">
				{team.map((member, index) => (
					<div key={index} className="group relative flex items-center gap-3">
						<div className="group-hover:border-primary-500 h-10 w-10 overflow-hidden rounded-full border-2 border-white/20 transition-all">
							<TeamAvatar name={member.name} size={40} />
						</div>
						<div className="flex flex-col">
							<span className="text-xs font-bold text-white">{member.name}</span>
							<span className="text-[10px] text-white/50">{member.role}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TeamSection;
