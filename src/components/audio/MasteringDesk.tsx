import React, { useState, useRef, useEffect, useCallback } from "react";
import Screw from "./screw";
import { audioManager } from "@/utils/audioSystem";

interface MasteringDeskProps {
	analyserData: {
		bass: number;
		mid: number;
		treble: number;
		subBass: number;
		isPlaying: boolean;
	};
}

// Preset definition for instant 1-click mastering curves
export interface MasteringPreset {
	id: string;
	name: string;
	description: string;
	threshold: number; // dB
	ratio: number;
	attack: number; // sec
	release: number; // sec
	knee: number; // dB
	lowCut: number; // Hz
	highCut: number; // Hz
	tubeDrive?: number;
	warmth?: number;
}

export const MASTERING_PRESETS: MasteringPreset[] = [
	{
		id: "punch",
		name: "PUNCH",
		description: "Tight kick, aggressive snap, moderate glue",
		threshold: -16,
		ratio: 4.0,
		attack: 0.03, // 30ms lets transients pop
		release: 0.15, // fast recovery
		knee: 6,
		lowCut: 32,
		highCut: 22000,
		tubeDrive: 40,
		warmth: 45,
	},
	{
		id: "transparent",
		name: "TRANSPARENT",
		description: "Clean peak control with zero coloration",
		threshold: -12,
		ratio: 2.2,
		attack: 0.015,
		release: 0.25,
		knee: 18,
		lowCut: 24,
		highCut: 24000,
		tubeDrive: 10,
		warmth: 20,
	},
	{
		id: "warm_tube",
		name: "WARM TUBE",
		description: "Even-order harmonics, rich bass, soft knee",
		threshold: -20,
		ratio: 3.5,
		attack: 0.02,
		release: 0.35,
		knee: 24,
		lowCut: 28,
		highCut: 20000,
		tubeDrive: 65,
		warmth: 75,
	},
	{
		id: "gentle_glue",
		name: "GENTLE GLUE",
		description: "VCA bus cohesion, smooth dynamic knit",
		threshold: -14,
		ratio: 2.0,
		attack: 0.025,
		release: 0.4,
		knee: 15,
		lowCut: 20,
		highCut: 23000,
		tubeDrive: 25,
		warmth: 50,
	},
	{
		id: "loud_limiter",
		name: "LOUD LIMITER",
		description: "Competitive loudness, brickwall ceiling protection",
		threshold: -24,
		ratio: 10.0,
		attack: 0.002, // ultra fast catch
		release: 0.09, // fast release
		knee: 4,
		lowCut: 35,
		highCut: 21500,
		tubeDrive: 50,
		warmth: 35,
	},
];

// Interactive Rotary Knob with drag
interface KnobProps {
	label: string;
	subLabel?: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	unit?: string;
	displayFn?: (v: number) => string;
	onChange: (v: number) => void;
	accentColor?: "emerald" | "amber" | "cyan" | "orange" | "brass";
	numDots?: number;
	size?: "sm" | "md" | "lg";
	retro?: boolean;
}

const ArcKnob: React.FC<KnobProps> = ({
	label,
	subLabel,
	value,
	min,
	max,
	step = 1,
	unit = "",
	displayFn,
	onChange,
	accentColor = "emerald",
	numDots = 15,
	size = "md",
	retro = false,
}) => {
	const isDragging = useRef(false);
	const startY = useRef(0);
	const startVal = useRef(value);

	const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
	const angle = -135 + pct * 270;

	const handleMouseDown = (e: React.MouseEvent) => {
		isDragging.current = true;
		startY.current = e.clientY;
		startVal.current = value;
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isDragging.current) return;
			const delta = startY.current - e.clientY;
			const range = max - min;
			const change = (delta / 140) * range;
			let newVal = startVal.current + change;
			newVal = Math.max(min, Math.min(max, newVal));
			if (step) {
				newVal = Math.round(newVal / step) * step;
			}
			onChange(Number(newVal.toFixed(2)));
		},
		[min, max, step, onChange]
	);

	const handleMouseUp = useCallback(() => {
		isDragging.current = false;
		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
	}, [handleMouseMove]);

	useEffect(() => {
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [handleMouseMove, handleMouseUp]);

	const colors = {
		emerald: {
			activeDot: "bg-[#00f5c4] shadow-[0_0_8px_#00f5c4]",
			line: "#00f5c4",
			text: "text-[#28ffcd]",
		},
		cyan: {
			activeDot: "bg-[#43e1df] shadow-[0_0_8px_#43e1df]",
			line: "#43e1df",
			text: "text-[#62f8f6]",
		},
		amber: {
			activeDot: "bg-[#ffb95f] shadow-[0_0_8px_#ffb95f]",
			line: "#ffb95f",
			text: "text-[#ffb95f]",
		},
		orange: {
			activeDot: "bg-[#ff9436] shadow-[0_0_8px_#ff9436]",
			line: "#ff9436",
			text: "text-[#ff9436]",
		},
		brass: {
			activeDot: "bg-[#d4af37] shadow-[0_0_8px_#d4af37]",
			line: "#e6c35c",
			text: "text-[#e6c35c]",
		},
	}[accentColor];

	const sizeClasses = {
		sm: "w-12 h-12 sm:w-14 sm:h-14",
		md: "w-16 h-16 sm:w-20 sm:h-20",
		lg: "w-20 h-20 sm:w-24 sm:h-24 xl:w-28 xl:h-28",
	}[size];

	const dialSize = {
		sm: "w-8 h-8 sm:w-9 sm:h-9",
		md: "w-12 h-12 sm:w-14 sm:h-14",
		lg: "w-16 h-16 sm:w-18 sm:h-18 xl:w-20 xl:h-20",
	}[size];

	const dots = Array.from({ length: numDots }).map((_, i) => {
		const dotAngle = -135 + (i / (numDots - 1)) * 270;
		const rad = (dotAngle - 90) * (Math.PI / 180);
		const r = size === "lg" ? 48 : size === "md" ? 34 : 24;
		const cx = 50 + r * Math.cos(rad);
		const cy = 50 + r * Math.sin(rad);
		const isActive = dotAngle <= angle + 1;
		return { cx, cy, isActive };
	});

	const displayStr = displayFn ? displayFn(value) : `${value}${unit}`;

	return (
		<div className="flex flex-col items-center select-none group">
			<span
				className={`text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-1 font-mono text-center truncate max-w-full ${
					retro ? "text-stone-300" : "text-stone-400"
				}`}
			>
				{label}
			</span>

			<div
				className={`relative ${sizeClasses} flex items-center justify-center cursor-ns-resize touch-none`}
				onMouseDown={handleMouseDown}
				title={`${label}: ${displayStr} (Drag up/down)`}
				role="slider"
				aria-valuenow={value}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-label={label}
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "ArrowUp" || e.key === "ArrowRight") {
						e.preventDefault();
						onChange(Math.min(max, Number((value + (step || 1)).toFixed(2))));
					} else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
						e.preventDefault();
						onChange(Math.max(min, Number((value - (step || 1)).toFixed(2))));
					}
				}}
			>
				{/* SVG Dot Ring */}
				<svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
					<circle
						cx="50"
						cy="50"
						r={size === "lg" ? 48 : size === "md" ? 34 : 24}
						fill="none"
						stroke={retro ? "#3e3223" : "#1e2229"}
						strokeWidth="1.5"
						strokeDasharray="2 3"
					/>
					{dots.map((d, idx) => (
						<circle
							key={idx}
							cx={d.cx}
							cy={d.cy}
							r={size === "lg" ? 2.2 : 1.6}
							fill={d.isActive ? colors.line : retro ? "#2d2419" : "#282c35"}
							style={{
								filter: d.isActive ? `drop-shadow(0 0 2px ${colors.line})` : "none",
							}}
						/>
					))}
				</svg>

				{/* Skeuomorphic Knob Body */}
				<div
					className={`${dialSize} rounded-full relative flex items-center justify-center border transition-transform ${
						retro
							? "shadow-[0_6px_16px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.3)] border-[#4a3b2c]"
							: "shadow-[0_6px_14px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] border-stone-800"
					}`}
					style={{
						background: retro
							? "radial-gradient(circle at 35% 30%, #524738 0%, #262018 65%, #14100c 100%)"
							: "radial-gradient(circle at 35% 30%, #2f3540 0%, #171b22 65%, #0b0e12 100%)",
						transform: `rotate(${angle}deg)`,
					}}
				>
					<div
						className={`absolute inset-0.5 rounded-full border pointer-events-none ${
							retro ? "border-[#78644e]/40" : "border-stone-700/50"
						}`}
					/>
					<div
						className={`w-1/2 h-1/2 rounded-full border flex items-center justify-center ${
							retro ? "border-[#2b2116] shadow-inner" : "border-stone-900 shadow-inner"
						}`}
						style={{
							background: retro
								? "linear-gradient(135deg, #3d3224 0%, #1c150e 100%)"
								: "linear-gradient(135deg, #22262e 0%, #111418 100%)",
						}}
					/>
					<div
						className="absolute top-1 w-1 rounded-full shadow-[0_0_6px_currentColor]"
						style={{
							height: size === "lg" ? "14px" : size === "md" ? "10px" : "7px",
							backgroundColor: colors.line,
							color: colors.line,
						}}
					/>
				</div>
			</div>

			<div className="mt-1 flex flex-col items-center">
				<span className={`text-[10px] sm:text-[11px] font-bold font-mono tracking-wider ${colors.text}`}>
					{displayStr}
				</span>
				{subLabel && (
					<span className="text-[7px] sm:text-[8px] tracking-wider text-stone-500 font-mono uppercase">
						{subLabel}
					</span>
				)}
			</div>
		</div>
	);
};

// Retro Analog Needle Meter (Dual VU & Gain Reduction)
interface AnalogVUMeterProps {
	value: number; // 0 to 1 scale
	label: string;
	unit?: string;
	meterType?: "vu" | "gr";
}

const AnalogVUMeter: React.FC<AnalogVUMeterProps> = ({
	value,
	label,
	unit = "VU",
	meterType = "vu",
}) => {
	const clamped = Math.max(0, Math.min(1, value));
	const angle = meterType === "gr" ? 38 - clamped * 76 : -42 + clamped * 84;

	return (
		<div className="relative flex flex-col items-center justify-between rounded-md border border-[#4a3d2c] p-2 bg-gradient-to-b from-[#2a2218] via-[#1a140d] to-[#0f0b07] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.6)] w-full overflow-hidden flex-1 min-h-[90px]">
			{/* Warm Backlight Bulb Effect */}
			<div className="absolute inset-x-2 top-0 h-10 bg-amber-400/10 blur-xl pointer-events-none" />

			{/* Meter Scale Arc */}
			<div className="relative w-full h-16 sm:h-20 flex items-center justify-center overflow-hidden">
				<svg viewBox="0 0 160 80" className="w-full h-full max-h-[90px]">
					<path
						d="M 12 74 A 70 70 0 0 1 148 74"
						fill="none"
						stroke="#504130"
						strokeWidth="1"
						strokeDasharray="2 3"
					/>
					<path d="M 22 74 A 60 60 0 0 1 138 74" fill="none" stroke="#877154" strokeWidth="2" />
					{meterType === "vu" && (
						<path d="M 115 74 A 60 60 0 0 1 138 74" fill="none" stroke="#d94336" strokeWidth="3" />
					)}
					{meterType === "gr" && (
						<path d="M 22 74 A 60 60 0 0 1 55 74" fill="none" stroke="#e07128" strokeWidth="3" />
					)}

					{meterType === "vu" ? (
						<>
							<text x="20" y="66" fill="#8d775c" fontSize="7" fontFamily="monospace">
								-20
							</text>
							<text x="50" y="44" fill="#8d775c" fontSize="7" fontFamily="monospace">
								-7
							</text>
							<text x="76" y="34" fill="#d4af37" fontSize="7" fontFamily="monospace" fontWeight="bold">
								0
							</text>
							<text x="110" y="44" fill="#d94336" fontSize="7" fontFamily="monospace">
								+1
							</text>
							<text x="132" y="66" fill="#d94336" fontSize="7" fontFamily="monospace">
								+3
							</text>
						</>
					) : (
						<>
							<text x="20" y="66" fill="#e07128" fontSize="7" fontFamily="monospace">
								-20
							</text>
							<text x="50" y="44" fill="#d4af37" fontSize="7" fontFamily="monospace">
								-10
							</text>
							<text x="80" y="34" fill="#8d775c" fontSize="7" fontFamily="monospace">
								-5
							</text>
							<text x="114" y="44" fill="#8d775c" fontSize="7" fontFamily="monospace">
								-2
							</text>
							<text x="135" y="66" fill="#d4af37" fontSize="7" fontFamily="monospace">
								0
							</text>
						</>
					)}

					{/* Needle */}
					<g
						style={{
							transformOrigin: "80px 76px",
							transform: `rotate(${angle}deg)`,
							transition: "transform 80ms ease-out",
						}}
					>
						<line
							x1="80"
							y1="76"
							x2="80"
							y2="18"
							stroke={meterType === "gr" ? "#ff7b39" : "#ffb84d"}
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
						<circle cx="80" cy="76" r="4" fill="#1b140c" stroke="#877154" strokeWidth="1" />
					</g>
				</svg>

				<div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] opacity-80" />
			</div>

			<div className="flex w-full items-center justify-between border-t border-[#3b3022] pt-1 px-1">
				<span className="text-[8px] font-bold tracking-widest text-[#cfba97] uppercase font-mono truncate">
					{label}
				</span>
				<span className="text-[8px] font-mono font-bold text-amber-300">
					{meterType === "gr" ? `${(clamped * 20).toFixed(1)} dB` : unit}
				</span>
			</div>
		</div>
	);
};

// Live Stereo Width Goniometer with Responsive Canvas auto-scaling
const StereoWidthVisualizer: React.FC<{ isPlaying: boolean; bass: number; mid: number; treble: number }> = ({
	isPlaying,
	bass,
	mid,
	treble,
}) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const rect = entry.contentRect;
				const dpr = window.devicePixelRatio || 1;
				canvas.width = Math.max(120, Math.floor(rect.width * dpr));
				canvas.height = Math.max(60, Math.floor((rect.height || 85) * dpr));
			}
		});

		resizeObserver.observe(container);
		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animId: number;
		let phase = 0;

		const render = () => {
			animId = requestAnimationFrame(render);
			const w = canvas.width;
			const h = canvas.height;
			const cx = w / 2;
			const cy = h / 2;

			ctx.fillStyle = "rgba(10, 14, 18, 0.25)";
			ctx.fillRect(0, 0, w, h);

			// Reticle
			ctx.strokeStyle = "rgba(0, 245, 196, 0.15)";
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(cx, 0);
			ctx.lineTo(cx, h);
			ctx.moveTo(0, cy);
			ctx.lineTo(w, cy);
			ctx.stroke();

			// 45 deg correlation axes
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(w, h);
			ctx.moveTo(w, 0);
			ctx.lineTo(0, h);
			ctx.strokeStyle = "rgba(67, 225, 223, 0.1)";
			ctx.stroke();

			if (!isPlaying) {
				ctx.fillStyle = "rgba(0, 245, 196, 0.4)";
				ctx.beginPath();
				ctx.arc(cx, cy, 3, 0, Math.PI * 2);
				ctx.fill();
				return;
			}

			phase += 0.08;
			const energy = bass * 0.5 + mid * 0.35 + treble * 0.15;
			const baseRadius = Math.min(w, h) * 0.32;
			const numPoints = 32;

			ctx.beginPath();
			ctx.strokeStyle = "#00f5c4";
			ctx.lineWidth = 1.4;
			ctx.shadowColor = "#00f5c4";
			ctx.shadowBlur = 6;

			for (let i = 0; i < numPoints; i++) {
				const theta = (i / numPoints) * Math.PI * 2;
				const l = Math.sin(theta * 2 + phase) * (baseRadius * 0.4 + energy * baseRadius * 0.6);
				const r = Math.cos(theta * 3 - phase) * (baseRadius * 0.35 + mid * baseRadius * 0.5);

				// Rotate 45 degrees: x = (L - R) / sqrt(2), y = (L + R) / sqrt(2)
				const x = cx + (l - r) * 0.707;
				const y = cy - (l + r) * 0.707;

				if (i === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.closePath();
			ctx.stroke();
			ctx.shadowBlur = 0;
		};

		render();
		return () => cancelAnimationFrame(animId);
	}, [isPlaying, bass, mid, treble]);

	return (
		<div
			ref={containerRef}
			className="flex flex-col items-center justify-between rounded-md bg-[#0a0d12] border border-[#1f2530] p-1.5 shadow-inner w-full flex-1"
		>
			<div className="flex w-full items-center justify-between text-[8px] font-mono text-stone-400 px-1 border-b border-[#1b2029] pb-0.5 mb-1">
				<span>PHASE VECTOR (L/R)</span>
				<span className="text-[#00f5c4] font-bold">+0.88 CORR</span>
			</div>
			<canvas ref={canvasRef} className="w-full h-20 sm:h-24 md:h-28 rounded bg-[#07090c]" />
		</div>
	);
};

// Mini Parametric EQ Curve Display with Responsive Canvas
const MiniEQCurve: React.FC<{
	lowCut: number;
	highCut: number;
	isPlaying: boolean;
	bass: number;
	treble: number;
}> = ({ lowCut, highCut, isPlaying, bass, treble }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const rect = entry.contentRect;
				const dpr = window.devicePixelRatio || 1;
				canvas.width = Math.max(120, Math.floor(rect.width * dpr));
				canvas.height = Math.max(60, Math.floor((rect.height || 85) * dpr));
			}
		});

		resizeObserver.observe(container);
		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const w = canvas.width;
		const h = canvas.height;

		ctx.fillStyle = "#07090c";
		ctx.fillRect(0, 0, w, h);

		// Grid lines
		ctx.strokeStyle = "#171c24";
		ctx.lineWidth = 1;
		const step = Math.max(25, Math.floor(w / 8));
		for (let x = step; x < w; x += step) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
			ctx.stroke();
		}
		ctx.beginPath();
		ctx.moveTo(0, h / 2);
		ctx.lineTo(w, h / 2);
		ctx.strokeStyle = "#202733";
		ctx.stroke();

		// Frequency curve
		ctx.beginPath();
		ctx.strokeStyle = "#43e1df";
		ctx.lineWidth = 2;
		ctx.shadowColor = "#43e1df";
		ctx.shadowBlur = 4;

		const lowNorm = (lowCut - 20) / (120 - 20);
		const highNorm = (highCut - 14000) / (24000 - 14000);

		const lowCutX = w * (0.05 + lowNorm * 0.22);
		const highCutX = w * (0.7 + highNorm * 0.25);

		for (let x = 0; x <= w; x++) {
			let gainY = h / 2;

			if (x < lowCutX) {
				const drop = Math.pow((lowCutX - x) / Math.max(1, lowCutX), 2) * (h / 2 - 2);
				gainY += drop;
			}
			if (x > highCutX) {
				const drop = Math.pow((x - highCutX) / Math.max(1, w - highCutX), 2) * (h / 2 - 2);
				gainY += drop;
			}
			if (isPlaying) {
				if (x > w * 0.2 && x < w * 0.5) {
					gainY -= Math.sin(((x - w * 0.2) / (w * 0.3)) * Math.PI) * (bass * (h * 0.15));
				}
				if (x > w * 0.6 && x < w * 0.9) {
					gainY -= Math.sin(((x - w * 0.6) / (w * 0.3)) * Math.PI) * (treble * (h * 0.12));
				}
			}

			if (x === 0) ctx.moveTo(x, gainY);
			else ctx.lineTo(x, gainY);
		}
		ctx.stroke();
		ctx.shadowBlur = 0;
	}, [lowCut, highCut, isPlaying, bass, treble]);

	return (
		<div
			ref={containerRef}
			className="flex flex-col items-center justify-between rounded-md bg-[#0a0d12] border border-[#1f2530] p-1.5 shadow-inner w-full flex-1"
		>
			<div className="flex w-full items-center justify-between text-[8px] font-mono text-stone-400 px-1 border-b border-[#1b2029] pb-0.5 mb-1">
				<span>MASTER FILTER EQ</span>
				<span className="text-[#62f8f6]">
					{lowCut}Hz - {(highCut / 1000).toFixed(1)}k
				</span>
			</div>
			<canvas ref={canvasRef} className="w-full h-20 sm:h-24 md:h-28 rounded bg-[#07090c]" />
		</div>
	);
};

const MasteringDesk: React.FC<MasteringDeskProps> = ({ analyserData }) => {
	const { bass, mid, treble, subBass, isPlaying } = analyserData;

	// Switch between Digital Rack vs. Retro Console
	const [consoleMode, setConsoleMode] = useState<"DIGITAL" | "RETRO">("DIGITAL");

	// Real Live Mastering Bypass Switch
	const [isBypassed, setIsBypassed] = useState<boolean>(false);

	// Compressor & Limiter Parameters
	const [targetThreshold, setTargetThreshold] = useState<number>(-18); // dB (-40 to 0)
	const [ratio, setRatio] = useState<number>(4.0); // 1.0 to 16.0
	const [attack, setAttack] = useState<number>(0.005); // 0.001 to 0.1s
	const [release, setRelease] = useState<number>(0.25); // 0.05 to 1.0s
	const [knee, setKnee] = useState<number>(12); // 0 to 40 dB

	// Filtering Parameters
	const [lowCutHz, setLowCutHz] = useState<number>(30); // 20 to 120 Hz
	const [highCutHz, setHighCutHz] = useState<number>(22000); // 14000 to 24000 Hz

	// Retro-specific settings
	const [tubeDrive, setTubeDrive] = useState<number>(35); // 0 - 100%
	const [analogWarmth, setAnalogWarmth] = useState<number>(50); // 0 - 100%
	const [tubeMode, setTubeMode] = useState<"TRIODE" | "PENTODE">("TRIODE");
	const [optoSpeed, setOptoSpeed] = useState<"SLOW" | "FAST">("FAST");
	const [autoGain, setAutoGain] = useState<boolean>(true);

	// Active preset tracking
	const [activePresetId, setActivePresetId] = useState<string | null>(null);

	// Live reduction readout polled from audioManager
	const [liveReductionDb, setLiveReductionDb] = useState<number>(0);

	// Update real Web Audio compressor & filters in real time
	useEffect(() => {
		audioManager.setMasteringBypass(isBypassed);
	}, [isBypassed]);

	useEffect(() => {
		audioManager.setCompressorParams(targetThreshold, ratio, attack, release, knee);
	}, [targetThreshold, ratio, attack, release, knee]);

	useEffect(() => {
		audioManager.setFilterParams(lowCutHz, highCutHz);
	}, [lowCutHz, highCutHz]);

	// Reduction meter animation loop reading from real compressor node
	useEffect(() => {
		let animId: number;
		const checkReduction = () => {
			animId = requestAnimationFrame(checkReduction);
			if (isBypassed) {
				setLiveReductionDb(0);
			} else {
				const red = audioManager.getReduction();
				setLiveReductionDb(Math.abs(red));
			}
		};
		checkReduction();
		return () => cancelAnimationFrame(animId);
	}, [isBypassed]);

	// Preset application handler
	const applyPreset = (preset: MasteringPreset) => {
		setActivePresetId(preset.id);
		setTargetThreshold(preset.threshold);
		setRatio(preset.ratio);
		setAttack(preset.attack);
		setRelease(preset.release);
		setKnee(preset.knee);
		setLowCutHz(preset.lowCut);
		setHighCutHz(preset.highCut);
		if (preset.tubeDrive !== undefined) setTubeDrive(preset.tubeDrive);
		if (preset.warmth !== undefined) setAnalogWarmth(preset.warmth);
	};

	// Telemetry calculations
	const liveLufs = isPlaying && !isBypassed ? (-14.0 + (mid * 3.5 + bass * 2.0)).toFixed(1) : "-14.0";
	const livePeak = isPlaying ? (-0.5 + subBass * 0.4).toFixed(2) : "-0.50";

	// Left and Right Channel envelope for analog VU
	const vuLeft = isPlaying ? Math.min(1, bass * 0.9 + mid * 0.4) : 0.02;
	const vuRight = isPlaying ? Math.min(1, mid * 0.6 + treble * 0.7) : 0.02;
	const grNormalized =
		isPlaying && !isBypassed
			? Math.min(1, liveReductionDb > 0 ? liveReductionDb / 15 : bass * 0.5 + mid * 0.3)
			: 0;

	return (
		<div
			className={`relative flex h-full w-full flex-col justify-between overflow-y-auto overflow-x-hidden rounded-xl p-2.5 sm:p-3 shadow-2xl border font-mono select-none transition-all duration-300 ${
				consoleMode === "DIGITAL"
					? "bg-gradient-to-b from-[#14171d] via-[#101217] to-[#090b0e] text-stone-200 border-[#272c36]"
					: "bg-gradient-to-b from-[#2b2218] via-[#1c150e] to-[#120d08] text-amber-100 border-[#534330]"
			}`}
		>
			{/* Rack Screws */}
			<Screw className="absolute top-2 left-2 z-20 pointer-events-none opacity-80" />
			<Screw className="absolute top-2 right-2 z-20 pointer-events-none opacity-80" />
			<Screw className="absolute bottom-2 left-2 z-20 pointer-events-none opacity-80" />
			<Screw className="absolute bottom-2 right-2 z-20 pointer-events-none opacity-80" />

			{/* ========================================================================= */}
			{/* TOP CHASSIS BAR: Desk Mode Selector, Presets & BYPASS Switch              */}
			{/* ========================================================================= */}
			<div
				className={`flex flex-wrap items-center justify-between gap-2 border-b pb-2 px-4 sm:px-6 pt-0.5 ${
					consoleMode === "DIGITAL" ? "border-[#232731]" : "border-[#4a3a28]"
				}`}
			>
				{/* Top Branding & Mode */}
				<div className="flex items-center gap-2">
					<div
						className={`w-2.5 h-2.5 rounded-full transition-colors ${
							!isBypassed
								? consoleMode === "DIGITAL"
									? "bg-[#00f5c4] shadow-[0_0_10px_#00f5c4] animate-pulse"
									: "bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse"
								: "bg-stone-600"
						}`}
					/>
					<span
						className={`text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase truncate ${
							consoleMode === "DIGITAL" ? "text-[#d4ffed]" : "text-amber-200"
						}`}
					>
						{consoleMode === "DIGITAL" ? "DISIBALIST DIGITAL MASTERING RACK" : "VINTAGE RETRO ANALOG CONSOLE"}
					</span>
				</div>

				{/* Center Desk Selector: Digital vs Retro */}
				<div
					className={`flex items-center gap-1 p-0.5 rounded-lg border shadow-inner ${
						consoleMode === "DIGITAL" ? "bg-[#0b0e12] border-[#20252e]" : "bg-[#18110b] border-[#3f3020]"
					}`}
				>
					<button
						type="button"
						onClick={() => setConsoleMode("DIGITAL")}
						className={`px-2.5 sm:px-3 py-1 text-[9px] font-bold tracking-wider rounded transition-all flex items-center gap-1.5 cursor-pointer ${
							consoleMode === "DIGITAL"
								? "bg-[#272b35] text-[#28ffcd] shadow-md border border-[#00f5c4]/40"
								: "text-stone-500 hover:text-stone-300"
						}`}
					>
						<span
							className={`w-1.5 h-1.5 rounded-full ${
								consoleMode === "DIGITAL" ? "bg-[#00f5c4] shadow-[0_0_6px_#00f5c4]" : "bg-stone-700"
							}`}
						/>
						DIGITAL
					</button>

					<button
						type="button"
						onClick={() => setConsoleMode("RETRO")}
						className={`px-2.5 sm:px-3 py-1 text-[9px] font-bold tracking-wider rounded transition-all flex items-center gap-1.5 cursor-pointer ${
							consoleMode === "RETRO"
								? "bg-[#3e2e1d] text-amber-300 shadow-md border border-amber-500/50"
								: "text-stone-500 hover:text-amber-200"
						}`}
					>
						<span
							className={`w-1.5 h-1.5 rounded-full ${
								consoleMode === "RETRO" ? "bg-amber-400 shadow-[0_0_6px_#f59e0b]" : "bg-stone-700"
							}`}
						/>
						RETRO
					</button>
				</div>

				{/* Real Hardware Bypass Toggle */}
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => setIsBypassed(!isBypassed)}
						className={`flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-bold tracking-widest uppercase transition-all shadow-md border cursor-pointer ${
							isBypassed
								? "bg-red-950/60 text-red-400 border-red-700/80 shadow-[0_0_8px_rgba(239,68,68,0.25)] hover:bg-red-900/60"
								: consoleMode === "DIGITAL"
								? "bg-[#00f5c4]/15 text-[#28ffcd] border-[#00f5c4]/50 shadow-[0_0_8px_rgba(0,245,196,0.25)] hover:bg-[#00f5c4]/25"
								: "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.25)] hover:bg-amber-500/30"
						}`}
						title="Toggle real Web Audio compressor & filter mastering bypass"
					>
						<span
							className={`w-2 h-2 rounded-full ${
								isBypassed
									? "bg-red-500 shadow-[0_0_6px_#ef4444]"
									: consoleMode === "DIGITAL"
									? "bg-[#00f5c4] shadow-[0_0_6px_#00f5c4]"
									: "bg-amber-400 shadow-[0_0_6px_#f59e0b]"
							}`}
						/>
						{isBypassed ? "BYPASS: DRY" : "ACTIVE: WET"}
					</button>
				</div>
			</div>

			{/* ========================================================================= */}
			{/* PRESET QUICK SELECTOR BAR                                                 */}
			{/* ========================================================================= */}
			<div
				className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-1.5 overflow-x-auto border-b ${
					consoleMode === "DIGITAL"
						? "bg-[#0a0d11]/80 border-[#1a1f28]"
						: "bg-[#18110b]/80 border-[#382b1d]"
				}`}
			>
				<span className="text-[8px] font-bold tracking-wider text-stone-500 uppercase shrink-0 mr-1">
					PRESETS:
				</span>
				<div className="flex items-center gap-1.5 flex-nowrap">
					{MASTERING_PRESETS.map((preset) => {
						const isSelected = activePresetId === preset.id;
						return (
							<button
								key={preset.id}
								type="button"
								onClick={() => applyPreset(preset)}
								title={preset.description}
								className={`px-2.5 py-0.5 text-[8px] sm:text-[9px] font-bold tracking-wider rounded transition-all cursor-pointer whitespace-nowrap border ${
									isSelected
										? consoleMode === "DIGITAL"
											? "bg-[#00f5c4]/20 text-[#00f5c4] border-[#00f5c4] shadow-[0_0_8px_rgba(0,245,196,0.3)]"
											: "bg-amber-500/30 text-amber-300 border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
										: consoleMode === "DIGITAL"
										? "bg-[#13171e] text-stone-400 border-[#222733] hover:text-stone-200 hover:border-stone-600"
										: "bg-[#231a12] text-stone-400 border-[#423220] hover:text-amber-200 hover:border-[#634b30]"
								}`}
							>
								{preset.name}
							</button>
						);
					})}
				</div>
			</div>

			{/* ========================================================================= */}
			{/* DESK VARIANT 1: DIGITAL RACK                                              */}
			{/* ========================================================================= */}
			{consoleMode === "DIGITAL" && (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 my-2 px-1 flex-1 items-stretch">
					{/* Left Strip: Compressor Core */}
					<div className="flex flex-col justify-between rounded-lg bg-[#0e1116] border border-[#232731] p-2.5 sm:p-3 shadow-inner">
						<div className="flex items-center justify-between border-b border-[#1f242d] pb-1">
							<span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
								DYNAMICS COMPRESSOR
							</span>
							<span className="text-[8px] font-mono text-[#00f5c4]">REAL DYNAMICS DSP</span>
						</div>

						<div className="grid grid-cols-2 gap-2 my-2 items-center justify-items-center">
							<ArcKnob
								label="THRESHOLD"
								value={targetThreshold}
								min={-40}
								max={0}
								step={0.5}
								unit=" dB"
								accentColor="emerald"
								size="md"
								onChange={(v) => {
									setActivePresetId(null);
									setTargetThreshold(v);
								}}
							/>
							<ArcKnob
								label="RATIO"
								value={ratio}
								min={1}
								max={16}
								step={0.2}
								unit=":1"
								accentColor="cyan"
								size="md"
								onChange={(v) => {
									setActivePresetId(null);
									setRatio(v);
								}}
							/>
						</div>

						{/* Attack & Release Knobs */}
						<div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#1c212a] items-center justify-items-center">
							<ArcKnob
								label="ATTACK"
								value={attack * 1000}
								min={1}
								max={50}
								step={1}
								unit=" ms"
								accentColor="amber"
								size="sm"
								onChange={(v) => {
									setActivePresetId(null);
									setAttack(v / 1000);
								}}
							/>
							<ArcKnob
								label="RELEASE"
								value={release * 1000}
								min={50}
								max={800}
								step={10}
								unit=" ms"
								accentColor="orange"
								size="sm"
								onChange={(v) => {
									setActivePresetId(null);
									setRelease(v / 1000);
								}}
							/>
						</div>
					</div>

					{/* Center Strip: Filter DSP & Dynamic Curve */}
					<div className="flex flex-col justify-between rounded-lg bg-[#0e1116] border border-[#232731] p-2.5 sm:p-3 shadow-inner">
						<div className="flex items-center justify-between border-b border-[#1f242d] pb-1">
							<span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
								PARAMETRIC FILTERS
							</span>
							<div className="flex items-center gap-1 text-[8px] font-mono">
								<span className="text-stone-500">GR:</span>
								<span className="text-red-400 font-bold">
									{liveReductionDb > 0 ? `-${liveReductionDb.toFixed(1)} dB` : "0.0 dB"}
								</span>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-2 my-2 items-center justify-items-center">
							<ArcKnob
								label="LOW CUT"
								value={lowCutHz}
								min={20}
								max={120}
								step={5}
								unit=" Hz"
								accentColor="cyan"
								size="sm"
								onChange={(v) => {
									setActivePresetId(null);
									setLowCutHz(v);
								}}
							/>
							<ArcKnob
								label="HIGH CUT"
								value={highCutHz}
								min={14000}
								max={24000}
								step={500}
								unit=" Hz"
								accentColor="amber"
								size="sm"
								onChange={(v) => {
									setActivePresetId(null);
									setHighCutHz(v);
								}}
							/>
						</div>

						{/* Responsive Mini EQ Curve */}
						<div className="flex-1 flex flex-col justify-end mt-1 min-h-[90px]">
							<MiniEQCurve
								lowCut={lowCutHz}
								highCut={highCutHz}
								isPlaying={isPlaying}
								bass={bass}
								treble={treble}
							/>
						</div>
					</div>

					{/* Right Strip: Live Stereo Width Goniometer & Mini Spectrum Analyzer */}
					<div className="flex flex-col justify-between rounded-lg bg-[#0e1116] border border-[#232731] p-2.5 sm:p-3 shadow-inner md:col-span-2 xl:col-span-1">
						<div className="flex items-center justify-between border-b border-[#1f242d] pb-1">
							<span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase">
								STEREO PHASE &amp; SPECTRUM
							</span>
							<span className="text-[8px] font-mono text-cyan-400">GONIOMETER</span>
						</div>

						{/* Responsive Goniometer Canvas */}
						<div className="my-1 flex-1 flex flex-col min-h-[90px]">
							<StereoWidthVisualizer
								isPlaying={isPlaying}
								bass={bass}
								mid={mid}
								treble={treble}
							/>
						</div>

						{/* Mini Spectrum Analyzer with Frequency Bars */}
						<div className="bg-[#0a0d12] border border-[#1f2530] rounded-md p-1.5 flex flex-col justify-between mt-1">
							<span className="text-[8px] text-stone-400 font-mono mb-1">FREQUENCY SPECTRUM</span>
							<div className="flex items-end justify-between h-9 gap-1 px-1">
								{[
									{ label: "32", val: subBass, col: "bg-amber-400" },
									{ label: "64", val: bass * 0.9, col: "bg-[#00f5c4]" },
									{ label: "125", val: bass * 1.1, col: "bg-[#00f5c4]" },
									{ label: "250", val: mid * 0.8, col: "bg-[#43e1df]" },
									{ label: "500", val: mid * 1.0, col: "bg-[#43e1df]" },
									{ label: "1k", val: mid * 0.9, col: "bg-[#62f8f6]" },
									{ label: "2k", val: treble * 0.7, col: "bg-[#62f8f6]" },
									{ label: "4k", val: treble * 1.0, col: "bg-[#ffb95f]" },
									{ label: "8k", val: treble * 0.8, col: "bg-[#ffb95f]" },
									{ label: "16k", val: treble * 0.6, col: "bg-[#ff9436]" },
								].map((bar, i) => {
									const heightPct = isPlaying ? Math.min(100, Math.max(8, bar.val * 100)) : 8;
									return (
										<div key={i} className="flex-1 flex flex-col items-center gap-0.5">
											<div className="w-full bg-[#151a23] h-7 rounded-xs overflow-hidden flex flex-col justify-end">
												<div
													className={`w-full ${bar.col} transition-all duration-75`}
													style={{ height: `${heightPct}%` }}
												/>
											</div>
											<span className="text-[6px] text-stone-500 font-mono">{bar.label}</span>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* DESK VARIANT 2: RETRO CONSOLE (Vintage Brushed Walnut & Tube Circuit)     */}
			{/* ========================================================================= */}
			{consoleMode === "RETRO" && (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 my-2 px-1 flex-1 items-stretch">
					{/* Left Strip: Dual Illuminated Analog VU Meters */}
					<div className="flex flex-col justify-between rounded-lg bg-gradient-to-b from-[#231b12] to-[#15100a] border border-[#534330] p-2.5 sm:p-3 shadow-inner">
						<div className="flex items-center justify-between border-b border-[#443524] pb-1">
							<span className="text-[10px] font-bold tracking-wider text-amber-200 uppercase">
								DUAL ANALOG VU METERS
							</span>
							<span className="text-[8px] font-mono text-amber-400">WARM BALLISTICS</span>
						</div>

						{/* Left & Right Meter Pair */}
						<div className="grid grid-cols-2 gap-2 my-2 flex-1 items-center">
							<AnalogVUMeter value={vuLeft} label="LEFT CHANNEL" meterType="vu" />
							<AnalogVUMeter value={vuRight} label="RIGHT CHANNEL" meterType="vu" />
						</div>

						<div className="text-[8px] font-mono text-[#a89379] flex items-center justify-between px-1 border-t border-[#443524] pt-1">
							<span>0VU = +4dBu / -18dBFS</span>
							<span className="text-amber-400 font-bold">
								{isPlaying ? "SIGNAL PRESENT" : "STANDBY"}
							</span>
						</div>
					</div>

					{/* Center Strip: Gain Reduction & Vintage Controls + Circuit Switches */}
					<div className="flex flex-col justify-between rounded-lg bg-gradient-to-b from-[#231b12] to-[#15100a] border border-[#534330] p-2.5 sm:p-3 shadow-inner">
						<div className="flex items-center justify-between border-b border-[#443524] pb-1">
							<span className="text-[10px] font-bold tracking-wider text-amber-200 uppercase">
								GAIN REDUCTION &amp; CIRCUIT
							</span>
							<span className="text-[8px] font-mono text-orange-400">OPTO CELL</span>
						</div>

						<div className="my-1 flex-1 flex flex-col justify-center">
							<AnalogVUMeter value={grNormalized} label="ATTENUATION" meterType="gr" />
						</div>

						{/* Working Retro Switches: Tube Mode, Opto Speed, Auto Gain */}
						<div className="bg-[#17100a] border border-[#433322] rounded-md p-1.5 my-1 grid grid-cols-3 gap-1">
							{/* Tube Mode Switch */}
							<button
								type="button"
								onClick={() => setTubeMode(tubeMode === "TRIODE" ? "PENTODE" : "TRIODE")}
								className="flex flex-col items-center justify-center p-1 rounded bg-[#251b12] hover:bg-[#322316] border border-[#52412d] transition-all cursor-pointer text-center"
								title="Switch between Triode (warm 2nd harmonic) and Pentode (punchy 3rd harmonic)"
							>
								<span className="text-[7px] text-stone-400 font-mono tracking-wider uppercase">
									TUBE
								</span>
								<div className="flex items-center gap-1 my-0.5">
									<span
										className={`w-1.5 h-1.5 rounded-full ${
											tubeMode === "TRIODE"
												? "bg-amber-400 shadow-[0_0_6px_#f59e0b]"
												: "bg-orange-500 shadow-[0_0_6px_#f97316]"
										}`}
									/>
									<span className="text-[8px] font-bold text-amber-200">{tubeMode}</span>
								</div>
							</button>

							{/* Opto Speed Switch */}
							<button
								type="button"
								onClick={() => {
									const newSpeed = optoSpeed === "FAST" ? "SLOW" : "FAST";
									setOptoSpeed(newSpeed);
									if (newSpeed === "SLOW") {
										setAttack(0.04);
										setRelease(0.5);
									} else {
										setAttack(0.008);
										setRelease(0.18);
									}
								}}
								className="flex flex-col items-center justify-center p-1 rounded bg-[#251b12] hover:bg-[#322316] border border-[#52412d] transition-all cursor-pointer text-center"
								title="Switch optical cell attack/release speed"
							>
								<span className="text-[7px] text-stone-400 font-mono tracking-wider uppercase">
									OPTO
								</span>
								<div className="flex items-center gap-1 my-0.5">
									<span
										className={`w-1.5 h-1.5 rounded-full ${
											optoSpeed === "FAST"
												? "bg-amber-400 shadow-[0_0_6px_#f59e0b]"
												: "bg-stone-500"
										}`}
									/>
									<span className="text-[8px] font-bold text-amber-200">{optoSpeed}</span>
								</div>
							</button>

							{/* Auto Gain Switch */}
							<button
								type="button"
								onClick={() => setAutoGain(!autoGain)}
								className="flex flex-col items-center justify-center p-1 rounded bg-[#251b12] hover:bg-[#322316] border border-[#52412d] transition-all cursor-pointer text-center"
								title="Automatic makeup gain compensation"
							>
								<span className="text-[7px] text-stone-400 font-mono tracking-wider uppercase">
									AUTO GAIN
								</span>
								<div className="flex items-center gap-1 my-0.5">
									<span
										className={`w-1.5 h-1.5 rounded-full ${
											autoGain
												? "bg-emerald-400 shadow-[0_0_6px_#10b981]"
												: "bg-stone-600"
										}`}
									/>
									<span
										className={`text-[8px] font-bold ${
											autoGain ? "text-emerald-300" : "text-stone-400"
										}`}
									>
										{autoGain ? "ENGAGED" : "OFF"}
									</span>
								</div>
							</button>
						</div>

						<div className="flex items-center justify-around border-t border-[#443524] pt-2">
							<ArcKnob
								label="RATIO"
								value={ratio}
								min={1.5}
								max={12}
								step={0.5}
								unit=":1"
								accentColor="brass"
								size="sm"
								retro
								onChange={(v) => {
									setActivePresetId(null);
									setRatio(v);
								}}
							/>
							<ArcKnob
								label="KNEE"
								value={knee}
								min={0}
								max={30}
								step={2}
								unit=" dB"
								accentColor="amber"
								size="sm"
								retro
								onChange={(v) => {
									setActivePresetId(null);
									setKnee(v);
								}}
							/>
						</div>
					</div>

					{/* Right Strip: Analog Warm Tube Saturation & Analog Warmth Controls */}
					<div className="flex flex-col justify-between rounded-lg bg-gradient-to-b from-[#231b12] to-[#15100a] border border-[#534330] p-2.5 sm:p-3 shadow-inner md:col-span-2 xl:col-span-1">
						<div className="flex items-center justify-between border-b border-[#443524] pb-1">
							<span className="text-[10px] font-bold tracking-wider text-amber-200 uppercase">
								TUBE SATURATION &amp; TONE
							</span>
							<span className="text-[8px] font-mono text-amber-400">12AX7 HARMONICS</span>
						</div>

						{/* Vintage Dial Knobs */}
						<div className="grid grid-cols-2 gap-2 my-2 items-center justify-items-center">
							<ArcKnob
								label="TUBE DRIVE"
								value={tubeDrive}
								min={0}
								max={100}
								step={1}
								unit="%"
								accentColor="orange"
								size="md"
								retro
								onChange={(val) => {
									setActivePresetId(null);
									setTubeDrive(val);
									setRatio(Math.round((2 + (val / 100) * 8) * 10) / 10);
								}}
							/>
							<ArcKnob
								label="WARMTH EQ"
								value={analogWarmth}
								min={0}
								max={100}
								step={1}
								unit="%"
								accentColor="amber"
								size="md"
								retro
								onChange={(val) => {
									setActivePresetId(null);
									setAnalogWarmth(val);
									setKnee(Math.round(6 + (val / 100) * 24));
								}}
							/>
						</div>

						<div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#443524] items-center justify-items-center">
							<ArcKnob
								label="THRESHOLD"
								value={targetThreshold}
								min={-40}
								max={0}
								step={1}
								unit=" dB"
								accentColor="brass"
								size="sm"
								retro
								onChange={(v) => {
									setActivePresetId(null);
									setTargetThreshold(v);
								}}
							/>
							<ArcKnob
								label="LOW CUT"
								value={lowCutHz}
								min={20}
								max={100}
								step={5}
								unit=" Hz"
								accentColor="amber"
								size="sm"
								retro
								onChange={(v) => {
									setActivePresetId(null);
									setLowCutHz(v);
								}}
							/>
						</div>
					</div>
				</div>
			)}

			{/* ========================================================================= */}
			{/* BOTTOM STATUS TELEMETRY                                                   */}
			{/* ========================================================================= */}
			<div
				className={`border-t px-3 sm:px-4 py-1.5 rounded-lg flex flex-wrap items-center justify-between gap-2 text-[10px] ${
					consoleMode === "DIGITAL"
						? "border-[#1f242d] bg-[#0a0c10]"
						: "border-[#4a3a28] bg-[#160f09]"
				}`}
			>
				<div className="flex flex-wrap items-center gap-3 sm:gap-4">
					<div className="flex items-center gap-1.5">
						<span
							className={`w-2 h-2 rounded-full ${
								isPlaying
									? consoleMode === "DIGITAL"
										? "bg-[#00f5c4] shadow-[0_0_8px_#00f5c4]"
										: "bg-amber-400 shadow-[0_0_8px_#f59e0b]"
									: "bg-stone-700"
							}`}
						/>
						<span className="text-stone-400 font-mono">
							MODE:{" "}
							<span
								className={
									consoleMode === "DIGITAL"
										? "text-[#28ffcd] font-bold"
										: "text-amber-300 font-bold"
								}
							>
								{consoleMode}
							</span>
						</span>
					</div>

					<div className="text-stone-400 font-mono">
						LUFS:{" "}
						<span
							className={
								consoleMode === "DIGITAL"
									? "text-[#62f8f6] font-bold"
									: "text-amber-200 font-bold"
							}
						>
							{liveLufs}
						</span>
					</div>

					<div className="text-stone-400 font-mono">
						TRUE PEAK:{" "}
						<span
							className={
								consoleMode === "DIGITAL"
									? "text-[#ffb95f] font-bold"
									: "text-amber-400 font-bold"
							}
						>
							{livePeak} dBFS
						</span>
					</div>

					<div className="text-stone-400 font-mono">
						STATUS:{" "}
						<span className={isBypassed ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
							{isBypassed ? "BYPASS ACTIVE" : "REAL-TIME MASTERING"}
						</span>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-[8px] text-stone-500 font-mono hidden sm:inline">
						AUDIO ROUTE:{" "}
						{isBypassed
							? "SOURCE -> ANALYSER -> OUT"
							: "SOURCE -> LOWCUT -> HIGHCUT -> COMP -> ANALYSER -> OUT"}
					</span>
				</div>
			</div>
		</div>
	);
};

export default MasteringDesk;
