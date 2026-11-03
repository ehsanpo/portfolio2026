import React, { useRef, useEffect } from "react";
import { audioManager } from "@/utils/audioSystem";
import { useAudioStore } from "@/store/useAudioStore";
import { SHADER_PRESETS } from "./shaderPresets";

const vertexShaderSource = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = (position + 1.0) * 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

interface CyberShaderVisualizerProps {
	presetId?: string;
	imageUrl?: string;
}

const CyberShaderVisualizer: React.FC<CyberShaderVisualizerProps> = ({
	presetId = "fractal-obsidian",
	imageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number | undefined>(undefined);
	const isPlaying = useAudioStore((state) => state.isPlaying);
	const colorShiftRef = useRef(0);
	const beatPhaseRef = useRef(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const container = canvas.parentElement;
		if (!container) return;

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				const dpr = Math.min(window.devicePixelRatio || 1, 2);
				if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
					canvas.width = Math.floor(width * dpr);
					canvas.height = Math.floor(height * dpr);
				}
			}
		});

		resizeObserver.observe(container);
		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const gl = canvas.getContext("webgl", {
			alpha: false,
			antialias: true,
			powerPreference: "high-performance",
		});
		if (!gl) return;

		const compileShader = (type: number, src: string) => {
			const shader = gl.createShader(type);
			if (!shader) return null;
			gl.shaderSource(shader, src);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				gl.deleteShader(shader);
				return null;
			}
			return shader;
		};

		const preset = SHADER_PRESETS.find((p) => p.id === presetId) || SHADER_PRESETS[0];

		const vert = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
		const frag = compileShader(gl.FRAGMENT_SHADER, preset.fragmentShader);
		if (!vert || !frag) return;

		const program = gl.createProgram();
		if (!program) return;
		gl.attachShader(program, vert);
		gl.attachShader(program, frag);
		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			gl.deleteProgram(program);
			return;
		}

		gl.useProgram(program);

		const quadBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
			gl.STATIC_DRAW
		);

		const posLoc = gl.getAttribLocation(program, "position");
		gl.enableVertexAttribArray(posLoc);
		gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

		const uResolution = gl.getUniformLocation(program, "u_resolution");
		const uTime = gl.getUniformLocation(program, "u_time");
		const uBass = gl.getUniformLocation(program, "u_bass");
		const uMid = gl.getUniformLocation(program, "u_mid");
		const uTreble = gl.getUniformLocation(program, "u_treble");
		const uColorShift = gl.getUniformLocation(program, "u_color_shift");
		const uBeatPhase = gl.getUniformLocation(program, "u_beat_phase");
		const uTextureLoc = gl.getUniformLocation(program, "u_texture");

		// Texture setup for Dream Wave Photo mode
		let glTexture: WebGLTexture | null = null;
		if (uTextureLoc) {
			glTexture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, glTexture);
			// Placeholder 1x1 pixel while loading
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				gl.RGBA,
				1,
				1,
				0,
				gl.RGBA,
				gl.UNSIGNED_BYTE,
				new Uint8Array([30, 20, 40, 255])
			);

			const image = new Image();
			image.crossOrigin = "anonymous";
			image.src = imageUrl;
			image.onload = () => {
				if (!gl || !glTexture) return;
				gl.bindTexture(gl.TEXTURE_2D, glTexture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
			};
		}

		const analyser = audioManager.getAnalyser();
		analyser.fftSize = 1024;
		const bufferLength = analyser.frequencyBinCount;
		const freqData = new Uint8Array(bufferLength);

		const startTime = performance.now();

		const render = () => {
			if (!canvas || !gl) return;

			animationRef.current = requestAnimationFrame(render);
			analyser.getByteFrequencyData(freqData);

			let subSum = 0;
			let bassSum = 0;
			let midSum = 0;
			let trebleSum = 0;

			for (let i = 0; i < 4; i++) subSum += freqData[i];
			for (let i = 0; i < 12; i++) bassSum += freqData[i];
			for (let i = 20; i < 80; i++) midSum += freqData[i];
			for (let i = 100; i < 200; i++) trebleSum += freqData[i];

			const subAvg = subSum / 4;
			const bassNorm = bassSum / 12 / 255;
			const midNorm = midSum / 60 / 255;
			const trebleNorm = trebleSum / 100 / 255;

			if (subAvg > 190) {
				colorShiftRef.current += 0.04;
			}

			// Sub-bass beat synchronization: slow progression with ~15-20s narrative arc per fractal mode
			const subEnergy = subAvg / 255;
			const subKick = Math.max(0, subEnergy - 0.65);
			// Extremely smooth, measured progression
			beatPhaseRef.current += 0.0003 + subKick * 0.0018;

			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.uniform2f(uResolution, canvas.width, canvas.height);
			gl.uniform1f(uTime, (performance.now() - startTime) * 0.001);
			gl.uniform1f(uBass, bassNorm);
			gl.uniform1f(uMid, midNorm);
			gl.uniform1f(uTreble, trebleNorm);
			gl.uniform1f(uColorShift, colorShiftRef.current);
			if (uBeatPhase) {
				gl.uniform1f(uBeatPhase, beatPhaseRef.current);
			}

			if (uTextureLoc && glTexture) {
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, glTexture);
				gl.uniform1i(uTextureLoc, 0);
			}

			gl.drawArrays(gl.TRIANGLES, 0, 6);
		};

		if (isPlaying) {
			audioManager.resume();
			render();
		} else {
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.clearColor(0.005, 0.008, 0.012, 1.0);
			gl.clear(gl.COLOR_BUFFER_BIT);
		}

		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
			if (gl && glTexture) gl.deleteTexture(glTexture);
			if (gl && program) gl.deleteProgram(program);
			if (gl && vert) gl.deleteShader(vert);
			if (gl && frag) gl.deleteShader(frag);
		};
	}, [isPlaying, presetId, imageUrl]);

	return (
		<div className="relative flex h-full w-full min-h-[400px] flex-1 items-center justify-center overflow-hidden bg-[#020408]">
			<canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />
			{!isPlaying && (
				<div className="font-basement pointer-events-none absolute inset-0 flex items-center justify-center text-xl tracking-widest text-white/20 uppercase">
					Play to Visualize
				</div>
			)}
		</div>
	);
};

export default CyberShaderVisualizer;
