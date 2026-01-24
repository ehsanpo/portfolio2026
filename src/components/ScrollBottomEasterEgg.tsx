import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PixelWorld } from "./pixelworld";

export default function ScrollBottomEasterEgg() {
	const [showBanner, setShowBanner] = useState(false);
	const [extraScrollAttempts, setExtraScrollAttempts] = useState(0);
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

			// If scrolled up (using scrollbar or any other method), hide banner
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
			className="pointer-events-auto relative z-40 overflow-hidden hidden"
			id="pixelworld"
			initial={{ y: "100%" }}
			animate={{
				y: showBanner ? "0%" : "100%",
				display: showBanner ? "block" : "none",
				opacity: showBanner ? 1 : 0,
			}}
			transition={{ duration: 0.6, ease: "easeOut" }}
		>
			<PixelWorld className="border-t border-neutral-800/50" />
		</motion.div>
	);
}
