const SkillsInfo = ({ show }: { show?: boolean }) => {
	return (
		<div className="flex justify-center">
			<div className="group relative m-auto inline-block text-left">
				<button className="bg-primary-600/90 hover:bg-primary-700/90 focus:ring-primary-500 relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none">
					<div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl transition-opacity group-hover:opacity-75"></div>

					<span className="relative flex items-center gap-2">
						<svg viewBox="0 0 24 24" stroke="currentColor" fill="none" className="h-4 w-4">
							<path
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								strokeWidth="2"
								strokeLinejoin="round"
								strokeLinecap="round"
							></path>
						</svg>
					</span>
				</button>

				<div className="clip invisible absolute bottom-full left-1/2 w-[400px] max-w-[100vw] -translate-x-1/2 translate-y-2 transform opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
					<div className="relative rounded-2xl border bg-gray-300 bg-gradient-to-br p-4 shadow-[0_0_30px_rgba(79,70,229,0.15)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-700">
						<ul className="space-y-2">
							<li>
								<span className="font-basement text-primary/60">Beginner: </span>
								I’ve experimented and built something basic for personal use.
							</li>
							<li>
								<span className="font-basement text-primary/80">Professional: </span>
								I’ve worked with it professionally and deployed it to production.
							</li>
							<li>
								<span className="font-basement text-primary">Advanced: </span>I have several years
								of experience, regularly working with it in production environments.
							</li>
							<li>
								<span className="font-basement text-secondary">Expert: </span>: I’m highly
								confident, capable of mentoring others, and comfortable making architectural
								decisions.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkillsInfo;
