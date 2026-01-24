import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

interface WeatherSystemProps {
	readonly className?: string;
	readonly weatherType?: "clear" | "rain" | "snow" | "fog";
	readonly intensity?: "light" | "medium" | "heavy";
}

export default function WeatherSystem({
	className,
	weatherType = "clear",
	intensity = "medium",
}: WeatherSystemProps) {
	const [currentWeather, setCurrentWeather] = useState(weatherType);
	const [currentIntensity, setCurrentIntensity] = useState(intensity);

	useEffect(() => {
		if (weatherType !== "clear") return;

		const weatherTypes = ["clear", "rain", "snow", "fog"];
		const intensities = ["light", "medium", "heavy"];

		setCurrentWeather(weatherTypes[Math.floor(Math.random() * weatherTypes.length)] as any);
		setCurrentIntensity(intensities[Math.floor(Math.random() * intensities.length)] as any);

		const interval = setInterval(() => {
			setCurrentWeather(weatherTypes[Math.floor(Math.random() * weatherTypes.length)] as any);
			setCurrentIntensity(intensities[Math.floor(Math.random() * intensities.length)] as any);
		}, 15000);

		return () => clearInterval(interval);
	}, [weatherType]);

	const activeWeather = weatherType === "clear" ? currentWeather : weatherType;
	const activeIntensity = weatherType === "clear" ? currentIntensity : intensity;

	const getParticleCount = () => {
		const baseCount = activeIntensity === "light" ? 30 : activeIntensity === "medium" ? 60 : 100;
		return activeWeather === "snow" ? baseCount * 0.7 : baseCount;
	};

	const particleCount = Math.floor(getParticleCount());

	if (activeWeather === "clear") return null;

	return (
		<div className={cn("pointer-events-none absolute inset-0 z-[5] overflow-hidden", className)}>
			{activeWeather === "fog" && (
				<div className="absolute inset-0">
					<div
						className="absolute inset-0 bg-gray-300 opacity-30 dark:bg-gray-600"
						style={{
							mask: `
							linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%),
							linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%),
							radial-gradient(circle at 20% 40%, transparent 20%, black 40%, transparent 60%),
							radial-gradient(circle at 80% 30%, transparent 15%, black 35%, transparent 55%),
							radial-gradient(circle at 40% 70%, transparent 25%, black 45%, transparent 65%),
							radial-gradient(circle at 90% 60%, transparent 20%, black 40%, transparent 60%)
						`,
							maskComposite: "intersect",
						}}
					/>
					<div
						className="absolute inset-0 animate-[fogDrift_20s_linear_infinite] bg-gray-400 opacity-20 dark:bg-gray-500"
						style={{
							mask: `
							linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%),
							linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
							radial-gradient(ellipse at 60% 50%, transparent 30%, black 50%, transparent 70%),
							radial-gradient(ellipse at 30% 40%, transparent 25%, black 45%, transparent 65%)
						`,
							maskComposite: "intersect",
						}}
					/>
				</div>
			)}
			{activeWeather === "rain" && (
				<div
					className="rain-container absolute inset-0"
					style={{
						width: "100%",
						height: "100%",
						pointerEvents: "none",
					}}
				>
					{[...Array(particleCount)].map((_, i) => (
						<div
							key={`rain-${i}`}
							className="w-px animate-[rainFall_0.5s_linear_infinite] bg-blue-400 opacity-70 dark:bg-blue-300"
							style={{
								position: "absolute",
								left: `${Math.random() * 100}%`,
								top: "-20px",
								height: `${8 + Math.random() * 12}px`,
								animationDelay: `${Math.random() * 2}s`,
								animationDuration: `${0.3 + Math.random() * 0.4}s`,
								transform: "translateX(0px) translateY(0px)",
								willChange: "top",
							}}
						/>
					))}
				</div>
			)}
			{activeWeather === "snow" && (
				<div
					className="snow-container absolute inset-0"
					style={{
						width: "100%",
						height: "100%",
						pointerEvents: "none",
					}}
				>
					{[...Array(particleCount)].map((_, i) => (
						<div
							key={`snow-${i}`}
							className="h-1 w-1 animate-[snowFall_3s_linear_infinite] rounded-full bg-white opacity-80"
							style={{
								position: "absolute",
								left: `${Math.random() * 100}%`,
								top: "-10px",
								animationDelay: `${Math.random() * 3}s`,
								animationDuration: `${2 + Math.random() * 4}s`,
								transform: "translateX(0px) translateY(0px)",
								willChange: "top, transform",
							}}
						/>
					))}
				</div>
			)}
			{activeWeather === "rain" && (
				<div className="absolute inset-0 bg-blue-900 opacity-5 dark:bg-blue-800" />
			)}
			{activeWeather === "snow" && (
				<div className="absolute inset-0 bg-blue-50 opacity-10 dark:bg-slate-700" />
			)}
		</div>
	);
}
