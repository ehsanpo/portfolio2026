import { Code2, Laptop, Music2, School } from "lucide-react";
import one from "../assets/images/0_1.png";

export const HeroSection = () => {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden">
			<div className="absolute inset-0">
				<img
					src={one.src}
					alt="Hero background"
					className="h-full w-full object-cover opacity-50"
				/>
			</div>
			<div className="relative z-10 text-center text-white">
				<h1 className="mb-4 text-6xl font-bold">My Journey</h1>
				<p className="text-xl opacity-80">From Automation to Software Development</p>
				<div className="mt-12 flex justify-center gap-8">
					<div className="text-center">
						<School size={32} className="mx-auto mb-2" />
						<p>Education</p>
					</div>
					<div className="text-center">
						<Music2 size={32} className="mx-auto mb-2" />
						<p>Music</p>
					</div>
					<div className="text-center">
						<Code2 size={32} className="mx-auto mb-2" />
						<p>Development</p>
					</div>
					<div className="text-center">
						<Laptop size={32} className="mx-auto mb-2" />
						<p>Tech Lead</p>
					</div>
				</div>
			</div>
		</section>
	);
};
