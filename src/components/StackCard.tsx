import { findTimelineMatch } from "../utils/client-data";

interface StackCardProps {
	readonly slug: string;
	readonly labels: string[];
	readonly icon: string;
	readonly data: string[];
}

function getExpertiseIndicatorClass(level: number): string {
	if (level >= 8) return "bg-tomato";
	if (level >= 6) return "bg-cobalt";
	if (level >= 4) return "bg-mint";
	return "bg-mustard";
}

function getExpertiseLevel(level: number): string {
	if (level === 10) return "Expert";
	if (level >= 7 && level <= 9) return "Advanced";
	if (level >= 4 && level <= 6) return "Pro";
	if (level >= 1 && level <= 3) return "Init";
	return "N/A";
}

export default function StackCard({ slug, labels, icon, data }: StackCardProps) {
	return (
		<div className="on-paper hard bg-cream text-ink flex h-full flex-col justify-between">
			<div>
				<div className="flex items-center gap-2.5 border-b-[1.5px] border-ink px-3 py-2 bg-cream">
					<img src={icon} alt="" className="size-4 shrink-0 object-contain" aria-hidden="true" />
					<h3 className="font-pixel text-sm leading-none uppercase text-ink">{slug}</h3>
					<span className="stripes h-[11px] flex-1" aria-hidden="true" />
				</div>

				<ul className="divide-y divide-ink/20 px-4 py-1">
					{labels.map((label, index) => {
						const score = parseInt(data[index] || "0", 10) || 0;
						const timelineMatch = findTimelineMatch(label);
						const yearsOfExperience = timelineMatch?.yearsOfExperience;

						return (
							<li key={label} className="py-2.5">
								<div className="flex items-baseline justify-between gap-2">
									<span className="flex items-center gap-2 font-sans text-sm font-semibold text-ink">
										<span
											className={`size-2 shrink-0 border border-ink ${getExpertiseIndicatorClass(score)}`}
											aria-hidden="true"
										/>
										<span>{label}</span>
									</span>
									<span className="font-mono text-xs text-ink/75 tabular-nums">
										{yearsOfExperience ? `${yearsOfExperience}y` : `${score}/10`}
									</span>
								</div>
								<div className="mt-1 flex items-center justify-between gap-2 pl-4">
									<div className="h-1.5 flex-1 border border-ink/40 bg-paper">
										<div
											className="h-full bg-ink"
											style={{ width: `${Math.min(100, Math.max(10, score * 10))}%` }}
										/>
									</div>
									<span className="label-mono text-[10px]! text-ink/70">
										{getExpertiseLevel(score)}
									</span>
								</div>
							</li>
						);
					})}
				</ul>
			</div>

			<div className="border-t-[1.5px] border-ink/25 px-4 py-2 flex items-center justify-between bg-paper/60">
				<span className="label-mono text-[10px]! text-ink/70">Modules</span>
				<span className="font-mono text-xs font-semibold text-ink">{labels.length} indexed</span>
			</div>
		</div>
	);
}
