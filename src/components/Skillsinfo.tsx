import Button from "./ui/Button";

const SkillsInfo = ({ show: _show }: { show?: boolean }) => {
	return (
		<div className="flex justify-center">
			<div className="group relative m-auto inline-block text-left">
				<Button className="relative overflow-hidden rounded-xl px-6 py-3 text-sm">
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
				</Button>

				<div className="clip invisible absolute bottom-full left-1/2 w-[400px] max-w-[100vw] -translate-x-1/2 translate-y-2 transform opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
					<div className="relative rounded-2xl border bg-gray-300 bg-gradient-to-br p-4 shadow-[0_0_30px_rgba(79,70,229,0.15)] backdrop-blur-md dark:border-white/10 dark:bg-neutral-700">
						<ul className="space-y-2">
							<li>
								<span className="font-basement text-accent">Beginner (1-4): </span>
								XXX I’ve experimented and built something basic for personal use.
							</li>
							<li>
								<span className="font-basement text-primary-300">Professional (5-7): </span>
								I’ve worked with it professionally and deployed it to production.
							</li>
							<li>
								<span className="font-basement text-primary">Advanced (8-9): </span>I have several years
								of experience, regularly working with it in production environments.
							</li>
							<li>
								<span className="font-basement text-secondary-400">Expert (10): </span>: I’m highly
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
