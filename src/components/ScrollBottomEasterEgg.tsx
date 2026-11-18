import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PixelWorld } from "./pixelworld";

export default function ScrollBottomEasterEgg() {
	const [showBanner, setShowBanner] = useState(false);
	const [, setExtraScrollAttempts] = useState(0);
	const [lastWheelTime, setLastWheelTime] = useState(0);
	const [lastScrollPos, setLastScrollPos] = useState(0);

	useEffect(() => {
		let attemptTimeout: NodeJS.Timeout;
		const THROTTLE_MS = 300;

		const handleWheel = (e: WheelEvent) => {
			const now = Date.now();

			if (now - lastWheelTime < THROTTLE_MS) {
				return;
			}
			setLastWheelTime(now);

			const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollPosition = window.scrollY;
			const isAtBottom = scrollPosition >= scrollableHeight - 10;

			if (isAtBottom && e.deltaY > 0) {
				setExtraScrollAttempts((prev) => {
					const newAttempts = prev + 1;

					if (newAttempts > 7) {
						setShowBanner(true);
					}

					return newAttempts;
				});

				clearTimeout(attemptTimeout);
				attemptTimeout = setTimeout(() => {
					setExtraScrollAttempts(0);
				}, 2000);
			} else if (!isAtBottom && e.deltaY < 0) {
				setExtraScrollAttempts(0);
				setShowBanner(false);
			}

			setLastScrollPos(scrollPosition);
		};

		const handleScroll = () => {
			const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollPosition = window.scrollY;
			const isAtBottom = scrollPosition >= scrollableHeight - 10;

			if (!isAtBottom && scrollPosition < lastScrollPos) {
				setExtraScrollAttempts(0);
				setShowBanner(false);
			}

			setLastScrollPos(scrollPosition);
		};

		window.addEventListener("wheel", handleWheel, { passive: true });
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("wheel", handleWheel);
			window.removeEventListener("scroll", handleScroll);
			clearTimeout(attemptTimeout);
		};
	}, [lastWheelTime, lastScrollPos]);

	return (
		<motion.div
			className="on-paper pointer-events-auto relative z-40 hidden overflow-hidden border-t-[1.5px] border-ink bg-cream text-ink"
			id="pixelworld"
			initial={{ y: "100%" }}
			animate={{
				y: showBanner ? "0%" : "100%",
				display: showBanner ? "block" : "none",
				opacity: showBanner ? 1 : 0,
			}}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<div className="flex items-center gap-3 border-b-[1.5px] border-ink bg-cream px-3 py-1.5 text-ink">
				<span className="size-3 shrink-0 border-[1.5px] border-ink bg-mint" aria-hidden="true" />
				<span className="stripes h-[12px] flex-1" aria-hidden="true" />
				<span className="font-pixel text-xs leading-none">PIXEL WORLD / BASEMENT LEVEL</span>
				<span className="stripes h-[12px] flex-1" aria-hidden="true" />
				<button
					type="button"
					onClick={() => setShowBanner(false)}
					className="key bg-paper px-2! py-0.5! text-[10px]! text-ink shadow-[2px_2px_0_var(--ink)]!"
				>
					Close
				</button>
			</div>
			<PixelWorld className="border-t-0" />
		</motion.div>
	);
}
