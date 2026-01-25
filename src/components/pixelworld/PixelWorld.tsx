import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import FireAnimation from "./FireAnimation";
import WeatherSystem from "./WeatherSystem";
import { generateSound } from "../../utils/sounds";

interface PixelWorldProps {
	readonly className?: string;
	readonly height?: number;
}

export default function PixelWorld({ className, height = 320 }: PixelWorldProps) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isDarkMode, setIsDarkMode] = useState(true);
	const [catAnimationDuration, setCatAnimationDuration] = useState(8);
	const [fireClickCount, setFireClickCount] = useState(0);
	const [isHellMode, setIsHellMode] = useState(false);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 2;
			const y = (e.clientY / window.innerHeight - 0.5) * 2;
			setMousePosition({ x, y });
		};

		const checkDarkMode = () => {
			setIsDarkMode(document.documentElement.classList.contains("dark"));
		};

		checkDarkMode();

		const observer = new MutationObserver(checkDarkMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			observer.disconnect();
		};
	}, []);

	const handleCatClick = () => {
		generateSound("cat");
		setCatAnimationDuration(3);
		setTimeout(() => setCatAnimationDuration(8), 1000);
	};

	const handleFireClick = () => {
		generateSound("fire");
		const newCount = fireClickCount + 1;
		setFireClickCount(newCount);

		if (newCount >= 10 && !isHellMode) {
			setIsHellMode(true);
		}
	};

	const themeFolder = isHellMode ? "hell" : isDarkMode ? "dark" : "light";
	return (
		<div
			className={cn("relative mx-auto w-full overflow-hidden", className)}
			style={{ height: `${height}px` }}
		>
			<div
				className="absolute bottom-32 h-32 w-[120%] animate-[slideBG_60s_linear_infinite]"
				style={{
					backgroundImage: `url('/img/px/${themeFolder}/sky.${isHellMode ? "png" : isDarkMode ? "jpg" : "png"}')`,
					backgroundRepeat: "repeat-x",
					backgroundSize: "auto 100%",
					imageRendering: "pixelated",
				}}
			/>

			<div
				className="absolute bottom-[75px] h-32 w-[120%] transition-transform duration-100 ease-out"
				style={{
					backgroundImage: `url('/img/px/${themeFolder}/mountain.png')`,
					backgroundRepeat: "repeat-x",
					backgroundSize: "auto 100%",
					imageRendering: "pixelated",
					transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`,
				}}
			/>

			<div
				className="absolute bottom-8 h-16 w-full"
				style={{
					backgroundImage: `url('/img/px/${themeFolder}/grass.png')`,
					backgroundRepeat: "repeat-x",
					backgroundSize: "auto 100%",
					imageRendering: "pixelated",
				}}
			/>

			<div
				className="absolute bottom-0 z-10 h-8 w-full"
				style={{
					backgroundImage: `url('/img/px/${themeFolder}/ground.${isHellMode ? "png" : isDarkMode ? "jpg" : "png"}')`,
					backgroundRepeat: "repeat-x",
					backgroundSize: "auto 100%",
					imageRendering: "pixelated",
				}}
			/>

			<img
				src={`/img/px/${themeFolder}/tree.png`}
				alt="Tree"
				className="pointer-events-none absolute bottom-8 z-20 h-32"
				style={{
					left: "15%",
					imageRendering: "pixelated",
				}}
			/>

			<img
				src={`/img/px/${themeFolder}/stone.png`}
				alt="Stone"
				className="pointer-events-none absolute bottom-8 z-20 h-20"
				style={{
					left: "60%",
					imageRendering: "pixelated",
				}}
			/>

			<div className="cursor-pointer" onClick={handleFireClick}>
				<FireAnimation className="absolute bottom-6 z-20" style={{ left: "45%" }} />
			</div>

			<div
				className="pointer-events-auto absolute bottom-5 z-10 h-32 w-32 cursor-pointer"
				style={{
					left: "-128px",
					imageRendering: "pixelated",
					animation: `runCat ${catAnimationDuration}s linear infinite`,
				}}
				onClick={handleCatClick}
			>
				<img
					src="/img/banner.gif"
					alt="Running cat"
					className="h-full w-full object-contain"
					style={{ imageRendering: "pixelated" }}
				/>
			</div>
			<WeatherSystem />
		</div>
	);
}
