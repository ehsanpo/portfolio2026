import React, { useRef, useEffect } from "react";
import { audioManager } from "@/utils/audioSystem";
import { useAudioStore } from "@/store/useAudioStore";

const AudioVisualizer: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number>();
	const isPlaying = useAudioStore((state) => state.isPlaying);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const container = canvas.parentElement;
		if (!container) return;

		// Use ResizeObserver for robust sizing without clearing the canvas continuously
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				// Only update if dimensions actually changed to avoid clearing context unnecessarily
				if (canvas.width !== width || canvas.height !== height) {
					canvas.width = width;
					canvas.height = height;
				}
			}
		});

		resizeObserver.observe(container);

		return () => {
			resizeObserver.disconnect();
		};
	}, []); // Run once on mount

	// Logo ref
	const logoRef = useRef<SVGSVGElement>(null);

	// Refs for animation state
	const bassSmoothedRef = useRef(0);
	const colorIndexRef = useRef(0);
	const lastTriggerTimeRef = useRef(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		const logo = logoRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Get theme colors from CSS variables
		const styles = getComputedStyle(document.documentElement);
		// Note: oklch colors might not work directly in canvas depending on browser support,
		// but modern browsers support typical CSS color strings.
		// Fallback values just in case.
		const colorPrimary = styles.getPropertyValue("--color-primary") || "rgba(168, 85, 247)";
		const colorSecondary = styles.getPropertyValue("--color-secondary") || "rgba(59, 130, 246)";
		const colorAccent = styles.getPropertyValue("--color-accent") || "rgba(14, 165, 233)";

		// Color palette for rotation
		// Color palette for rotation - Expanded with more shades
		const cP600 = styles.getPropertyValue("--color-primary-600") || "#9333ea";
		const cS600 = styles.getPropertyValue("--color-secondary-600") || "#2563eb";
		const cA300 = styles.getPropertyValue("--color-accent-300") || "#7dd3fc";
		const cA600 = styles.getPropertyValue("--color-accent-600") || "#0284c7";

		const palette = [
			colorPrimary, // Original
			colorSecondary, // Original
			colorAccent, // Original
			cA300, // Light Sky
			cP600, // Dark Purple
			cS600, // Dark Blue
			cA600, // Dark Sky
		];

		const analyser = audioManager.getAnalyser();
		// High resolution FFT
		analyser.fftSize = 4096;
		analyser.smoothingTimeConstant = 0.5; // General smoothing
		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);

		// Circular Waveform with 4-way Symmetry
		const drawWaveRing = (
			ctx: CanvasRenderingContext2D,
			centerX: number,
			centerY: number,
			baseR: number,
			startIdx: number,
			endIdx: number,
			color: string,
			amplitude: number
		) => {
			ctx.beginPath();
			ctx.strokeStyle = color;
			ctx.lineWidth = 3;
			ctx.shadowBlur = 15;
			ctx.shadowColor = color;

			const sliceLen = endIdx - startIdx;
			const totalPoints = sliceLen * 4;

			for (let i = 0; i <= totalPoints; i++) {
				const t = i / totalPoints;
				const angle = t * Math.PI * 2 - Math.PI / 2; // Start top

				// Determine mapped index based on quadrant logic for symmetry
				let idxOfSlice;
				const q = t * 4; // 0-4 range

				if (q < 1) idxOfSlice = Math.floor(q * sliceLen);
				else if (q < 2) idxOfSlice = Math.floor((2 - q) * sliceLen);
				else if (q < 3) idxOfSlice = Math.floor((q - 2) * sliceLen);
				else idxOfSlice = Math.floor((4 - q) * sliceLen);

				// Clamp
				idxOfSlice = Math.min(Math.max(0, idxOfSlice), sliceLen - 1);

				const val = dataArray[startIdx + idxOfSlice];

				// Non-linear boost for visual impact
				const signal = Math.pow(val / 255, 1.8) * amplitude;
				const r = baseR + signal;

				const x = centerX + Math.cos(angle) * r;
				const y = centerY + Math.sin(angle) * r;

				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			}

			ctx.closePath();
			ctx.stroke();
		};

		const draw = () => {
			if (!canvas) return;

			const width = canvas.width;
			const height = canvas.height;
			const centerX = width / 2;
			const centerY = height / 2;

			animationRef.current = requestAnimationFrame(draw);

			analyser.getByteFrequencyData(dataArray);

			// Calculate audio metrics
			let bassSum = 0;
			let subBassSum = 0;
			let midSum = 0;
			let trebleSum = 0;

			// Sub-bass (Very low): bins 0-3
			for (let i = 0; i < 4; i++) {
				subBassSum += dataArray[i];
			}
			// Bass: bins 0-10
			for (let i = 0; i < 10; i++) {
				bassSum += dataArray[i];
			}
			// Mids: bins 40-80
			for (let i = 40; i < 80; i++) {
				midSum += dataArray[i];
			}
			// Treble
			for (let i = 100; i < 150; i++) {
				trebleSum += dataArray[i];
			}

			const subBassAvg = subBassSum / 4;
			const bassAvg = bassSum / 10;
			const midAvg = midSum / 40;
			const trebleAvg = trebleSum / 50;

			// 1. Slow down bass reaction (Linear Interpolation)
			bassSmoothedRef.current += (bassAvg - bassSmoothedRef.current) * 0.1;
			const smoothBass = bassSmoothedRef.current;

			// 2. Sub-bass Trigger Color Rotation
			const now = performance.now();
			if (subBassAvg > 240 && now - lastTriggerTimeRef.current > 400) {
				colorIndexRef.current = (colorIndexRef.current + 1) % palette.length;
				lastTriggerTimeRef.current = now;
			}

			// Get current rotated colors
			const idx = colorIndexRef.current;
			// Rotation logic with dynamic palette length - Reversed to ripple outward!
			const c1 = palette[(idx + 2) % palette.length]; // Start ahead
			const c2 = palette[(idx + 1) % palette.length];
			const c3 = palette[idx % palette.length]; // Start behind

			// Animate Logo: 3D Tilt & Pulse
			if (logo) {
				const scale = 1 + (bassAvg / 255) * 0.4;
				const rotateX = (midAvg / 255 - 0.5) * 30;
				const rotateY = (trebleAvg / 255 - 0.5) * 30;

				logo.style.transform = `perspective(500px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

				const blur = (bassAvg / 255) * 20;
				logo.style.filter = `drop-shadow(0 0 ${blur}px ${c1})`;
			}

			// Trail Logic: Fade out existing content slowly
			ctx.save();
			ctx.globalCompositeOperation = "destination-out";
			ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
			ctx.fillRect(0, 0, width, height);
			ctx.restore();

			const radius = Math.min(width, height) / 8;

			// Bass Ring: c1
			const bassDampener = bassAvg > 0 ? smoothBass / bassAvg : 0;
			drawWaveRing(ctx, centerX, centerY, radius * 0.8, 4, 30, c1, 60 * bassDampener);

			// Mids (Vocals/Snare) -> Middle circle with more gap
			drawWaveRing(ctx, centerX, centerY, radius * 2.0, 30, 100, c2, 80);

			// Highs (Cymbals/Air) -> Large outer ring
			drawWaveRing(ctx, centerX, centerY, radius * 2.8, 100, 300, c3, 100);
		};

		if (isPlaying) {
			audioManager.resume();
			draw();
		} else {
			// Idle animation
			const idx = colorIndexRef.current;
			const c1 = palette[(idx + 2) % palette.length];
			const c2 = palette[(idx + 1) % palette.length];
			const c3 = palette[idx % palette.length];

			if (logo) {
				logo.style.transform = `perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)`;
				logo.style.filter = "none";
			}

			const width = canvas.width;
			const height = canvas.height;
			const centerX = width / 2;
			const centerY = height / 2;
			const baseRadius = Math.min(width, height) / 8;

			// Ensure idle rings use theme colors too
			const drawIdleRing = (r: number, color: string) => {
				ctx.beginPath();
				ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
				ctx.strokeStyle = color;
				ctx.globalAlpha = 0.3; // Dim them
				ctx.lineWidth = 1;
				ctx.stroke();
				ctx.globalAlpha = 1.0;
			};

			// Match playing state proportions
			drawIdleRing(baseRadius * 0.8, c1);
			drawIdleRing(baseRadius * 2.0, c2);
			drawIdleRing(baseRadius * 2.8, c3);
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [isPlaying]);

	return (
		<div className="relative flex h-full min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl p-4">
			<canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-contain" />

			{/* Inline SVG without liquid filters */}
			<svg
				ref={logoRef}
				width="60"
				height="60"
				viewBox="0 0 27.8 26.7"
				className="relative z-10 h-16 w-16 opacity-90 transition-transform duration-75 ease-out"
				style={{ transformStyle: "preserve-3d" }}
			>
				<path
					fill="#efb503"
					d="M0.5,19.4C0.2,19,0,18.7,0,18.2c0-0.4,0.2-0.8,0.5-1.1L17.1,0.5C17.4,0.2,17.8,0,18.2,0c0.4,0,0.8,0.2,1.1,0.5 c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L2.7,19.4c-0.3,0.3-0.7,0.5-1.1,0.5C1.2,19.8,0.8,19.7,0.5,19.4z M12.4,25.6 c-0.3,0.3-0.8,0.6-1.3,0.8s-1,0.3-1.5,0.3c-0.5,0-1.1-0.1-1.6-0.3c-0.5-0.2-1.1-0.5-1.5-1l-2.1-2.1c-0.4-0.4-0.6-0.8-0.5-1.2 c0.1-0.4,0.4-0.8,0.9-1.3L20.6,5c0.3-0.3,0.7-0.5,1.1-0.5c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1 l-15,15L9,23.4c0.2,0.2,0.4,0.2,0.6,0.2c0.2,0,0.5-0.1,0.7-0.4L25.1,8.4C25.4,8.1,25.8,8,26.2,8c0.4,0,0.8,0.2,1.1,0.5 c0.3,0.3,0.5,0.7,0.5,1.1c0,0.4-0.2,0.8-0.5,1.1L12.4,25.6z"
				/>
			</svg>

			{!isPlaying && (
				<div className="font-basement pointer-events-none absolute inset-0 flex items-center justify-center text-xl tracking-widest text-white/20 uppercase">
					Play to Visualize
				</div>
			)}
		</div>
	);
};

export default AudioVisualizer;
