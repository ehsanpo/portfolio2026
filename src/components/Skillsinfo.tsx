const SkillsInfo = ({ show: _show }: { show?: boolean }) => {
	return (
		<details className="group relative inline-block text-left">
			<summary className="key bg-cream text-ink list-none [&::-webkit-details-marker]:hidden">
				<span className="size-2 bg-tomato border border-ink" aria-hidden="true" />
				<span>Rating scale</span>
			</summary>

			<div className="on-paper hard bg-cream text-ink z-30 mt-2 w-80 sm:w-96 p-4 lg:absolute lg:right-0 lg:mt-2">
				<div className="flex items-center justify-between border-b-[1.5px] border-ink pb-2 mb-3">
					<span className="label-mono">Proficiency index</span>
					<span className="font-pixel text-xs">1 TO 10</span>
				</div>
				<ul className="space-y-2.5 text-sm leading-snug text-ink">
					<li className="flex items-start gap-2.5">
						<span className="mt-1 size-2.5 shrink-0 border border-ink bg-mustard" aria-hidden="true" />
						<div>
							<span className="font-mono text-xs font-bold uppercase">Init (1-3): </span>
							<span>Experimented and built prototypes for personal use.</span>
						</div>
					</li>
					<li className="flex items-start gap-2.5">
						<span className="mt-1 size-2.5 shrink-0 border border-ink bg-mint" aria-hidden="true" />
						<div>
							<span className="font-mono text-xs font-bold uppercase">Pro (4-6): </span>
							<span>Worked with it professionally and shipped to production.</span>
						</div>
					</li>
					<li className="flex items-start gap-2.5">
						<span className="mt-1 size-2.5 shrink-0 border border-ink bg-cobalt" aria-hidden="true" />
						<div>
							<span className="font-mono text-xs font-bold uppercase">Advanced (7-9): </span>
							<span>Several years of production experience across multiple systems.</span>
						</div>
					</li>
					<li className="flex items-start gap-2.5">
						<span className="mt-1 size-2.5 shrink-0 border border-ink bg-tomato" aria-hidden="true" />
						<div>
							<span className="font-mono text-xs font-bold uppercase">Expert (10): </span>
							<span>Deep architectural mastery, mentoring teams and leading migrations.</span>
						</div>
					</li>
				</ul>
			</div>
		</details>
	);
};

export default SkillsInfo;
