export interface ShaderPreset {
	id: string;
	name: string;
	category?: "EQ" | "Fractal" | "Mastering" | "Dream" | "MilkDrop";
	fragmentShader: string;
}

export const SHADER_PRESETS: ShaderPreset[] = [
	// ==================== 1. DREAM WAVE PHOTO / ALBUM ART ====================
	{
		id: "dream-wave-photo",
		name: "Dream Photo",
		category: "Dream",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;
      uniform sampler2D u_texture;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv - 0.5;
        p.x *= u_resolution.x / u_resolution.y;
        float r = length(p);
        float a = atan(p.y, p.x);

        // Dynamic vortex swirl + multi-frequency ripple warps
        float twist = (0.5 + u_bass * 1.5) * exp(-r * 2.0) * sin(u_time * 2.0);
        float waveX = sin(uv.y * 14.0 + u_time * 3.0 + u_bass * 5.0) * (0.02 + u_bass * 0.04);
        float waveY = cos(uv.x * 14.0 - u_time * 2.5 + u_mid * 4.0) * (0.02 + u_mid * 0.035);
        float shock = sin(r * 24.0 - u_time * 6.0 + u_bass * 8.0) * (0.015 + u_bass * 0.03);

        vec2 rotP = vec2(cos(a + twist), sin(a + twist)) * r;
        rotP.x /= u_resolution.x / u_resolution.y;
        vec2 distortedUv = rotP + 0.5 + vec2(waveX + shock, waveY + shock);

        // Multi-tap chromatic aberration split
        float split = 0.012 * (u_bass * 1.5 + 0.4);
        vec4 colR = texture2D(u_texture, clamp(distortedUv + vec2(split, 0.0), 0.0, 1.0));
        vec4 colG = texture2D(u_texture, clamp(distortedUv, 0.0, 1.0));
        vec4 colB = texture2D(u_texture, clamp(distortedUv - vec2(split * 0.8, 0.0), 0.0, 1.0));

        vec3 photo = vec3(colR.r, colG.g, colB.b);

        // Psychedelic aura highlights & luminous bloom
        float aura = pow(sin(r * 16.0 - u_time * 4.0 + u_treble * 6.0) * 0.5 + 0.5, 3.0);
        vec3 auraTint = vec3(
          sin(u_time + 0.0 + u_color_shift) * 0.5 + 0.5,
          sin(u_time + 2.0 + u_color_shift) * 0.5 + 0.5,
          sin(u_time + 4.0 + u_color_shift) * 0.5 + 0.5
        );

        vec3 col = mix(photo, photo * 1.4 + auraTint * 0.45, aura * (0.3 + u_mid * 0.6));
        col += vec3(1.0, 0.85, 0.4) * exp(-r * (6.0 - u_bass * 3.0)) * (u_bass * 1.2); // Core flare

        // Cinematic vignette
        float vign = 1.0 - smoothstep(0.35, 1.25, length(uv - 0.5));
        gl_FragColor = vec4(col * vign, 1.0);
      }
    `,
	},

	// ==================== 0. CONTINUOUS MORPHING FRACTAL UNIVERSE (NO RERENDERS) ====================
	{
		id: "fractal-continuous-morph",
		name: "Continuous Morph",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;
      uniform float u_beat_phase;

      // Cosine spectral palette
      vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Slow, centered breathing motion (no aggressive shaking or wandering)
        float wanderX = sin(u_beat_phase * 0.15 + u_time * 0.02) * 0.08;
        float wanderY = cos(u_beat_phase * 0.12 + u_time * 0.015) * 0.05;
        uv += vec2(wanderX, wanderY);

        vec2 uv0 = uv;
        vec3 col = vec3(0.0015, 0.002, 0.005);

        // Continuous mode phase selector synced to sub-bass beat accumulator
        float modeCycle = mod(u_beat_phase, 8.0);
        float modeIndex = floor(modeCycle);
        float morphT = fract(modeCycle);
        morphT = smoothstep(0.0, 1.0, morphT); // Smooth continuous blend between equations

        // Story evolution: complexity blooms with sub bass and morph progression
        // At rest or beginning: only 1 or 2 clean minimalist lines; expands into intricate fractal layers on sub hits
        float complexity = 1.0 + clamp(u_bass * 2.5 + sin(u_beat_phase * 0.8) * 0.8, 0.0, 3.0);

        float scale = 1.08 + u_mid * 0.15;
        float rotA = u_beat_phase * 0.12 + u_time * 0.015 + u_bass * 0.15;
        mat2 rot = mat2(cos(rotA), -sin(rotA), sin(rotA), cos(rotA));

        for (float i = 0.0; i < 4.0; i++) {
          // Cleanly skip outer layers if complexity hasn't bloomed yet
          if (i > complexity) continue;
          float layerWeight = clamp(complexity - i, 0.0, 1.0);

          vec2 uvA;
          vec2 uvB;

          // Mode 0: Standard Domain folding
          uvA = fract(uv * scale) - 0.5;
          // Mode 1: Polar symmetry reflection
          uvB = abs(fract(uv * (scale + 0.1)) - 0.5);

          if (modeIndex >= 1.0 && modeIndex < 2.0) {
            uvA = uvB;
            uvB = abs(uv * rot * 1.25) - (0.3 + u_bass * 0.1); // Mode 2: Box hypercube
          } else if (modeIndex >= 2.0 && modeIndex < 3.0) {
            uvA = abs(uv * rot * 1.25) - (0.3 + u_bass * 0.1);
            uvB = fract(uv * 1.61803) - 0.5; // Mode 3: Golden ratio
          } else if (modeIndex >= 3.0 && modeIndex < 4.0) {
            uvA = fract(uv * 1.61803) - 0.5;
            float a = atan(uv.y, uv.x);
            float r = length(uv);
            uvB = vec2(cos(a * 4.0), sin(a * 4.0)) * fract(r * 1.2); // Mode 4: 4-fold vortex
          } else if (modeIndex >= 4.0 && modeIndex < 5.0) {
            float a = atan(uv.y, uv.x);
            float r = length(uv);
            uvA = vec2(cos(a * 4.0), sin(a * 4.0)) * fract(r * 1.2);
            uvB = fract(uv * (1.15 + sin(uv0.x * 2.5 + u_time * 0.5) * 0.12)) - 0.5; // Mode 5: Sinusoidal wave fold
          } else if (modeIndex >= 5.0 && modeIndex < 6.0) {
            uvA = fract(uv * (1.15 + sin(uv0.x * 2.5 + u_time * 0.5) * 0.12)) - 0.5;
            uvB = min(abs(fract(uv * 1.35) - 0.5), abs(fract(uv.yx * 1.35) - 0.5)); // Mode 6: Cross matrix
          } else if (modeIndex >= 6.0 && modeIndex < 7.0) {
            uvA = min(abs(fract(uv * 1.35) - 0.5), abs(fract(uv.yx * 1.35) - 0.5));
            uvB = fract(uv * (1.38 + u_bass * 0.15)) - 0.5; // Mode 7: Amethyst fold
          } else if (modeIndex >= 7.0) {
            uvA = fract(uv * (1.38 + u_bass * 0.15)) - 0.5;
            uvB = fract(uv * scale) - 0.5; // Back to Mode 0
          }

          vec2 mixedUv = mix(uvA, uvB, morphT);
          // Wide falloff
          float d = length(mixedUv) * exp(-length(uv0) * (0.8 + u_bass * 0.3));
          d = sin(d * 8.0 + u_time * (0.8 + u_bass * 0.8)) / 8.0;
          d = abs(d);

          // Multi-harmonic color palette morphing
          vec3 palA = palette(length(uv0) + i * 0.35 + u_time * 0.12, vec3(0.5, 0.45, 0.6), vec3(0.5, 0.45, 0.5), vec3(1.0, 1.0, 1.0), vec3(0.0, 0.33, 0.67));
          vec3 palB = palette(length(uv0) + i * 0.4 + u_time * 0.15, vec3(0.4, 0.6, 0.5), vec3(0.6, 0.5, 0.5), vec3(1.0, 1.0, 1.0), vec3(0.15, 0.4, 0.8));
          vec3 activeCol = mix(palA, palB, morphT);

          // Deep obsidian black void interval to cleanly cut through lines and prevent screen clutter
          float blackCut = sin(length(uv0) * 5.0 - u_time * 0.8 + i * 1.57 + u_beat_phase * 0.5);
          float blackPass = smoothstep(-0.25, 0.2, blackCut);
          activeCol = mix(vec3(0.0), activeCol, blackPass);

          // Luminous glowing neon lines with high-contrast razor core
          float lineGlow = pow((0.008 + u_treble * 0.015) / max(d, 0.0025), 1.25);
          col += activeCol * lineGlow * layerWeight;
          uv = mixedUv;
        }

        // Subdued dark horizontal scanlines
        float scanline = 0.96 + 0.04 * sin(gl_FragCoord.y * 1.5);
        col *= scanline;

        // Smooth cinematic edge fade
        vec2 normCoord = gl_FragCoord.xy / u_resolution.xy;
        float distEdge = min(min(normCoord.x, 1.0 - normCoord.x), min(normCoord.y, 1.0 - normCoord.y));
        float softFade = smoothstep(0.0, 0.12, distEdge);

        gl_FragColor = vec4(col * softFade, 1.0);
      }
    `,
	},

	// ==================== 0A. CONTINUOUS ACID TRIP (LSD VISUAL MORPH) ====================
	{
		id: "fractal-continuous-lsd",
		name: "Continuous Acid Trip",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;
      uniform float u_beat_phase;

      // Meditative trippy palette: deep electric indigo, ethereal teal, bioluminescent lavender
      vec3 lsdPalette(float t) {
        vec3 a = vec3(0.28, 0.32, 0.55);
        vec3 b = vec3(0.35, 0.45, 0.48);
        vec3 c = vec3(0.8, 0.9, 1.1);
        vec3 d = vec3(0.55, 0.85, 0.72);
        return a + b * cos(6.283185 * (c * t + d + u_color_shift * 0.12));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Liquid fluid breathing warp driven by sub-bass transients
        float fluidBreath = sin(u_beat_phase * 0.25 + u_time * 0.04) * (0.09 + u_bass * 0.06);
        float fluidSwirl = cos(u_beat_phase * 0.2 + u_time * 0.035) * (0.07 + u_bass * 0.05);
        uv += vec2(fluidBreath, fluidSwirl);

        vec2 uv0 = uv;
        vec3 col = vec3(0.001, 0.001, 0.003);

        // 6 Continuous psychoactive topological modes driven by u_beat_phase
        float modeCycle = mod(u_beat_phase * 0.85, 6.0);
        float modeIndex = floor(modeCycle);
        float morphT = smoothstep(0.0, 1.0, fract(modeCycle));

        // Sub-bass bloom dynamics
        float complexity = 1.2 + clamp(u_bass * 2.6 + sin(u_beat_phase * 0.7) * 0.9, 0.0, 3.2);
        float globalRot = u_beat_phase * 0.14 + u_time * 0.03 + u_bass * 0.2;
        mat2 rMat = mat2(cos(globalRot), -sin(globalRot), sin(globalRot), cos(globalRot));

        for (float i = 0.0; i < 4.0; i++) {
          if (i > complexity) continue;
          float layerWeight = clamp(complexity - i, 0.0, 1.0);

          vec2 uvA;
          vec2 uvB;

          float r = length(uv);
          float a = atan(uv.y, uv.x);

          // Topo 0: Hyperbolic Poincaré disk inversion fold
          float pDenom = max(dot(uv, uv) + 0.35 + u_bass * 0.15, 0.001);
          vec2 topo0 = (uv * 1.35) / pDenom;
          topo0 = fract(topo0 * 1.1) - 0.5;

          // Topo 1: Infinite lotus petal fold (sacred mandala)
          float petal = cos(a * 6.0 + u_time * 0.4) * (0.28 + u_mid * 0.2);
          vec2 topo1 = vec2(cos(a + petal), sin(a + petal)) * fract(r * (1.3 + u_bass * 0.2)) - 0.5;

          // Topo 2: Melting kaleidoscopic torus
          float kAngle = mod(a, 3.14159 / 4.0) - (3.14159 / 8.0);
          vec2 kUv = vec2(cos(kAngle), sin(kAngle)) * r;
          vec2 topo2 = fract(kUv * 1.45 + sin(uv0.yx * 3.2 + u_time * 0.6) * 0.15) - 0.5;

          // Topo 3: Liquid feedback vortex
          float twist = (0.7 + u_bass * 1.2) * exp(-r * 1.4) * sin(u_beat_phase * 0.6);
          vec2 topo3 = vec2(cos(a + twist), sin(a + twist)) * fract(r * 1.6 + u_time * 0.1) - 0.5;

          // Topo 4: Sacred merkaba bloom fold
          vec2 m1 = abs(uv * rMat * 1.3) - (0.32 + u_bass * 0.12);
          vec2 m2 = abs(uv * mat2(0.7071, -0.7071, 0.7071, 0.7071) * 1.3) - (0.32 + u_bass * 0.12);
          vec2 topo4 = fract(min(m1, m2) * 1.25) - 0.5;

          // Topo 5: Radiant prismatic iris
          float irisWarp = sin(r * 12.0 - u_time * 1.2 + u_treble * 4.0) * 0.08;
          vec2 topo5 = fract(vec2(r + irisWarp, a / 6.28318) * vec2(2.2, 8.0)) - 0.5;

          if (modeIndex < 1.0) {
            uvA = topo0; uvB = topo1;
          } else if (modeIndex < 2.0) {
            uvA = topo1; uvB = topo2;
          } else if (modeIndex < 3.0) {
            uvA = topo2; uvB = topo3;
          } else if (modeIndex < 4.0) {
            uvA = topo3; uvB = topo4;
          } else if (modeIndex < 5.0) {
            uvA = topo4; uvB = topo5;
          } else {
            uvA = topo5; uvB = topo0;
          }

          vec2 mixedUv = mix(uvA, uvB, morphT);

          // Liquid organic warp distortion
          float d = length(mixedUv) * exp(-length(uv0) * (0.75 + u_bass * 0.35));
          d = sin(d * 9.0 + u_time * (0.9 + u_bass * 1.1) + sin(uv0.x * 4.0 + uv0.y * 4.0) * 0.3) / 9.0;
          d = abs(d);

          // Ethereal bioluminescent color distribution
          float colorParam = length(uv0) * 1.05 + i * 0.35 + u_time * 0.12 + u_beat_phase * 0.06;
          vec3 activeCol = lsdPalette(colorParam);

          // Crisp obsidian black voids cutting through bioluminescence
          float blackWave = sin(length(uv0) * 7.2 - u_time * 0.95 + i * 1.9 + u_beat_phase * 0.65);
          float voidMask = smoothstep(-0.15, 0.32, blackWave);
          activeCol = mix(vec3(0.0), activeCol, voidMask);

          // Glowing neon tendril lines
          float glowCore = pow((0.009 + u_treble * 0.02) / max(d, 0.0022), 1.3);
          col += activeCol * glowCore * layerWeight;
          uv = mixedUv;
        }

        // Chromatic dispersion shimmer
        col.r *= 1.05 + u_bass * 0.1;
        col.b *= 1.08 + u_treble * 0.1;

        // Cinematic edge vignette
        vec2 norm = gl_FragCoord.xy / u_resolution.xy;
        float edge = min(min(norm.x, 1.0 - norm.x), min(norm.y, 1.0 - norm.y));
        float softVignette = smoothstep(0.0, 0.14, edge);

        gl_FragColor = vec4(col * softVignette, 1.0);
      }
    `,
	},

	// ==================== 0B. CONTINUOUS HYPERSPACE (DMT NON-EUCLIDEAN MORPH) ====================
	{
		id: "fractal-continuous-dmt",
		name: "Continuous Hyperspace",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;
      uniform float u_beat_phase;

      // Vivid emerald, amethyst, gold, cyan hyperspace spectral radiance
      vec3 dmtPalette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.55, 0.55, 0.55);
        vec3 c = vec3(1.0, 1.0, 0.9);
        vec3 d = vec3(0.2, 0.75, 0.5); // Emerald-gold-amethyst-cyan bias
        return a + b * cos(6.283185 * (c * t + d + u_color_shift * 0.12));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Crisp non-Euclidean 4D lattice drift
        float driftX = sin(u_beat_phase * 0.18 + u_time * 0.025) * 0.06;
        float driftY = cos(u_beat_phase * 0.15 + u_time * 0.02) * 0.05;
        uv += vec2(driftX, driftY);

        vec2 uv0 = uv;
        vec3 col = vec3(0.001, 0.002, 0.004);

        // 6 Continuous 4D-projection fractal topologies synchronized on u_beat_phase
        float modeCycle = mod(u_beat_phase * 0.9, 6.0);
        float modeIndex = floor(modeCycle);
        float morphT = smoothstep(0.0, 1.0, fract(modeCycle));

        // Sub-bass transient responsiveness
        float complexity = 1.3 + clamp(u_bass * 2.8 + sin(u_beat_phase * 0.75) * 0.85, 0.0, 3.2);
        float rot4D = u_beat_phase * 0.15 + u_time * 0.025 + u_bass * 0.18;
        mat2 rMat = mat2(cos(rot4D), -sin(rot4D), sin(rot4D), cos(rot4D));

        for (float i = 0.0; i < 4.0; i++) {
          if (i > complexity) continue;
          float layerWeight = clamp(complexity - i, 0.0, 1.0);

          vec2 uvA;
          vec2 uvB;

          float r = length(uv);
          float a = atan(uv.y, uv.x);

          // Topo 0: Quaternion Julia 4D slice projection
          vec2 qz = uv * (1.35 + u_mid * 0.2);
          vec2 cJulia = vec2(-0.4 + sin(u_beat_phase * 0.2) * 0.15, 0.6 + cos(u_beat_phase * 0.18) * 0.12);
          vec2 qz2 = vec2(qz.x * qz.x - qz.y * qz.y, 2.0 * qz.x * qz.y) + cJulia;
          vec2 topo0 = fract(qz2) - 0.5;

          // Topo 1: Hyper-rhombus matrix (Aztec/alien glyph lattice)
          vec2 rh = abs(uv * rMat * (1.45 + u_bass * 0.2));
          vec2 topo1 = fract(vec2(rh.x + rh.y, abs(rh.x - rh.y)) * 1.2) - 0.5;

          // Topo 2: Sierpinski octahedral array fold
          vec2 oct = uv;
          oct = abs(oct);
          if (oct.x - oct.y < 0.0) oct = oct.yx;
          oct.x -= 0.45;
          oct = abs(oct);
          vec2 topo2 = fract(oct * 1.5) - 0.5;

          // Topo 3: Golden spiral warp tunnel
          float phi = 1.6180339887;
          float spiralAngle = a * (4.0 / 3.14159) + log(max(r, 0.01)) * phi;
          vec2 topo3 = fract(vec2(cos(spiralAngle), sin(spiralAngle)) * fract(r * 1.8) * 1.3) - 0.5;

          // Topo 4: Sacred labyrinth grid fold (impossible architecture)
          vec2 grid = fract(uv * 1.618) - 0.5;
          vec2 gridRot = fract(uv * rMat * 2.0) - 0.5;
          vec2 topo4 = min(abs(grid), abs(gridRot)) * 1.4 - 0.25;

          // Topo 5: Multidimensional hypercube unfolding
          vec2 hc = abs(uv * rMat * 1.35) - (0.35 + u_bass * 0.15);
          vec2 hcFold = abs(hc * mat2(0.866, -0.5, 0.5, 0.866)) - (0.2 + u_mid * 0.1);
          vec2 topo5 = fract(hcFold * 1.25) - 0.5;

          if (modeIndex < 1.0) {
            uvA = topo0; uvB = topo1;
          } else if (modeIndex < 2.0) {
            uvA = topo1; uvB = topo2;
          } else if (modeIndex < 3.0) {
            uvA = topo2; uvB = topo3;
          } else if (modeIndex < 4.0) {
            uvA = topo3; uvB = topo4;
          } else if (modeIndex < 5.0) {
            uvA = topo4; uvB = topo5;
          } else {
            uvA = topo5; uvB = topo0;
          }

          vec2 mixedUv = mix(uvA, uvB, morphT);

          // Deep mathematical non-Euclidean metric distance
          float d = length(mixedUv) * exp(-length(uv0) * (0.85 + u_bass * 0.4));
          d = sin(d * 10.0 + u_time * (1.0 + u_bass * 1.2)) / 10.0;
          d = abs(d);

          // Emerald / Amethyst / Gold / Cyan spectral radiance
          float paletteParam = length(uv0) * 1.35 + i * 0.42 + u_time * 0.14 + u_beat_phase * 0.1;
          vec3 activeCol = dmtPalette(paletteParam);

          // Deep cosmic black void geometry
          float cosmicVoid = sin(length(uv0) * 7.0 - u_time * 1.0 + i * 2.09 + u_beat_phase * 0.8);
          float voidPass = smoothstep(-0.22, 0.25, cosmicVoid);
          activeCol = mix(vec3(0.0), activeCol, voidPass);

          // Crisp hyper-detailed crystalline razor lines
          float crystalGlow = pow((0.0075 + u_treble * 0.022) / max(d, 0.0018), 1.35);
          col += activeCol * crystalGlow * layerWeight;
          uv = mixedUv;
        }

        // Fine multidimensional crystalline matrix scanlines
        float matrixHolo = 0.95 + 0.05 * sin(gl_FragCoord.y * 2.2 + gl_FragCoord.x * 0.5);
        col *= matrixHolo;

        // Clean cosmic perimeter fade
        vec2 norm = gl_FragCoord.xy / u_resolution.xy;
        float border = min(min(norm.x, 1.0 - norm.x), min(norm.y, 1.0 - norm.y));
        float fade = smoothstep(0.0, 0.12, border);

        gl_FragColor = vec4(col * fade, 1.0);
      }
    `,
	},

	// ==================== 0C. CONTINUOUS HYPERSPACE CORE (SINGLE-CENTER WIDESCREEN PORTAL) ====================
	{
		id: "fractal-continuous-hyperspace-core",
		name: "Hyperspace Core",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;
      uniform float u_beat_phase;

      // Deep cosmic black void with gold, cyan laser accents & diamond white core
      vec3 corePalette(float t) {
        // High contrast gold (1.0, 0.78, 0.28) and electric cyan (0.1, 0.88, 1.0)
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.55, 0.52, 0.58);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.12, 0.55, 0.88);
        return a + b * cos(6.283185 * (c * t + d + u_color_shift * 0.1));
      }

      void main() {
        // Normalized widescreen projection centered strictly at (0, 0)
        // Aspect ratio corrected so single singularity sits dead center and projects outward to screen corners
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        // Radial distance and angle from the single infinite center
        float r = length(p);
        float a = atan(p.y, p.x);

        // Sub-bass transient impact & continuous beat phase rotation
        float beatDrift = u_beat_phase * 0.16 + u_time * 0.035;
        float corePulse = 1.0 + u_bass * 0.45;

        // Monolithic sacred vortex expansion
        float twist = (0.9 + u_bass * 1.4) * exp(-r * 1.8) * sin(u_beat_phase * 0.45);
        float vortexAngle = a + twist + beatDrift;

        // Logarithmic tunnel depth mapping projecting from center to infinite screen corners
        float logR = log(max(r, 0.0008)) * 1.4;
        float tunnelDepth = logR - u_beat_phase * 0.65 - u_time * 0.25;

        vec3 col = vec3(0.0005, 0.001, 0.002);
        float complexity = 1.5 + clamp(u_bass * 2.5 + sin(u_beat_phase * 0.8) * 0.8, 0.0, 3.5);

        // Ray-marched radial hyper-lattice expanding from singularity
        for (float i = 0.0; i < 4.0; i++) {
          if (i > complexity) continue;
          float layerWeight = clamp(complexity - i, 0.0, 1.0);

          // Sacred geometry lattice folds (8-fold / 16-fold radial symmetry around single core)
          float symmetry = 8.0 + i * 4.0;
          float segment = 6.283185 / symmetry;
          float foldA = mod(vortexAngle + i * 0.26, segment) - segment * 0.5;

          // Hyper-lattice coordinates expanding outwards
          vec2 latticeCoord = vec2(
            sin(foldA) * r * (2.0 + i * 0.8) * corePulse,
            fract(tunnelDepth + i * 0.35) - 0.5
          );

          // Metric distance to crystalline razor structures
          float d = abs(sin(latticeCoord.x * 12.0 + latticeCoord.y * 8.0)) / (12.0 + u_bass * 6.0);
          d = min(d, abs(latticeCoord.y) * 0.35);

          // Gold and cyan laser accents
          float colorT = tunnelDepth * 0.45 + i * 0.32 + u_beat_phase * 0.12;
          vec3 laserCol = corePalette(colorT);

          // Deep cosmic black voids cutting between laser lattice beams
          float cosmicVoid = sin(r * 14.0 - u_beat_phase * 1.1 + i * 1.7) * cos(vortexAngle * 4.0);
          float voidPass = smoothstep(-0.15, 0.25, cosmicVoid);
          laserCol = mix(vec3(0.0), laserCol, voidPass);

          // Razor-sharp crystalline glow
          float laserGlow = pow((0.0065 + u_treble * 0.02) / max(d, 0.0012), 1.3);
          col += laserCol * laserGlow * layerWeight;
        }

        // Monolithic Singularity Core Flare (infinite portal center)
        float singularityCore = exp(-r * (12.0 - u_bass * 4.0));
        vec3 goldAccent = vec3(1.0, 0.84, 0.32);
        vec3 cyanAccent = vec3(0.2, 0.9, 1.0);
        vec3 coreColor = mix(goldAccent, cyanAccent, sin(u_beat_phase * 0.5) * 0.5 + 0.5);
        col += coreColor * singularityCore * (2.2 + u_bass * 3.0);

        // Edge-to-edge widescreen radial shockwave rings on sub-bass hits
        float shockwave = sin(r * 22.0 - u_beat_phase * 2.2 - u_time * 2.0);
        float ring = smoothstep(0.85, 0.98, shockwave) * (u_bass * 0.45);
        col += mix(cyanAccent, goldAccent, 0.5) * ring;

        // Subtle widescreen perimeter gradient
        vec2 norm = gl_FragCoord.xy / u_resolution.xy;
        float border = min(min(norm.x, 1.0 - norm.x), min(norm.y, 1.0 - norm.y));
        float fade = smoothstep(0.0, 0.04, border);

        gl_FragColor = vec4(col * fade, 1.0);
      }
    `,
	},

	// ==================== 2. 20 FRACTAL VARIATIONS ====================
	{
		id: "fractal-obsidian",
		name: "Obsidian",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;

      vec3 pal(float t) {
        return vec3(0.08, 0.05, 0.12) + vec3(0.35, 0.25, 0.45) * cos(6.28318 * (vec3(1.0) * t + vec3(0.1, 0.35, 0.7) + u_color_shift * 0.1));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.005, 0.007, 0.012);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.3 + u_mid * 0.35)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * (1.1 + u_bass * 0.5));
          vec3 c = pal(length(uv0) + i * 0.35 + u_time * 0.15);
          d = sin(d * 8.0 + u_time * (1.0 + u_bass * 2.0)) / 8.0;
          d = abs(d);
          col += c * pow((0.008 + u_treble * 0.015) / d, 1.3);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.25, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-amethyst",
		name: "Amethyst",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.01, 0.005, 0.02);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.45 + u_bass * 0.25)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * 1.3);
          d = abs(sin(d * 9.0 + u_time * 1.2)) / 9.0;
          vec3 tint = mix(vec3(0.4, 0.05, 0.8), vec3(0.9, 0.2, 0.9), sin(i + u_time) * 0.5 + 0.5);
          col += tint * pow((0.009 + u_treble * 0.02) / d, 1.25);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-cyan-lattice",
		name: "Cyan Web",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.004, 0.01, 0.016);

        for (float i = 0.0; i < 4.0; i++) {
          uv = abs(fract(uv * (1.35 + u_mid * 0.4)) - 0.5);
          float d = length(uv) * exp(-length(uv0) * (0.9 + u_bass * 0.4));
          d = abs(cos(d * 7.5 - u_time * 1.4)) / 7.5;
          vec3 tint = mix(vec3(0.0, 0.4, 0.8), vec3(0.05, 0.9, 0.75), sin(i * 1.5) * 0.5 + 0.5);
          col += tint * pow((0.007 + u_treble * 0.018) / d, 1.32);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.35, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-emerald",
		name: "Emerald",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.005, 0.015, 0.008);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.28 + u_mid * 0.3)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * 1.2);
          d = abs(sin(d * 10.0 + u_time * 1.8 + u_bass * 2.5)) / 10.0;
          vec3 tint = mix(vec3(0.05, 0.8, 0.35), vec3(0.0, 0.45, 0.25), i / 4.0);
          col += tint * pow((0.008 + u_treble * 0.016) / d, 1.28);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.25, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-solaris",
		name: "Solaris",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.018, 0.008, 0.002);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.2 + u_bass * 0.4)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * (0.8 + u_bass * 0.6));
          d = abs(sin(d * 8.0 + u_time * 2.2)) / 8.0;
          vec3 tint = mix(vec3(0.9, 0.25, 0.02), vec3(1.0, 0.75, 0.05), i / 3.0);
          col += tint * pow((0.009 + u_treble * 0.02) / d, 1.25);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.35, 1.35, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-vortex",
		name: "Spiral Fold",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float a = atan(uv.y, uv.x) + u_time * 0.3;
        float r = length(uv);
        uv = vec2(cos(a), sin(a)) * r;
        vec2 uv0 = uv;
        vec3 col = vec3(0.006, 0.008, 0.015);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.4 + u_mid * 0.35)) - 0.5;
          float d = length(uv) * exp(-r * (1.0 + u_bass * 0.5));
          d = abs(sin(d * 9.0 - u_time * 2.0)) / 9.0;
          vec3 tint = vec3(0.1, 0.6, 0.9) + vec3(0.5, 0.1, 0.6) * i * 0.25;
          col += tint * pow((0.008 + u_treble * 0.015) / d, 1.3);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, r)), 1.0);
      }
    `,
	},
	{
		id: "fractal-kaleido",
		name: "Kaleido Fold",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float a = atan(uv.y, uv.x);
        float seg = 3.14159 / 4.0;
        a = abs(mod(a, seg) - seg * 0.5);
        uv = vec2(cos(a), sin(a)) * length(uv);
        vec2 uv0 = uv;
        vec3 col = vec3(0.008, 0.004, 0.012);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.3 + u_mid * 0.3)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * 1.1);
          d = abs(sin(d * 8.5 + u_time * 1.5 + u_bass * 2.0)) / 8.5;
          vec3 tint = mix(vec3(0.8, 0.1, 0.5), vec3(0.2, 0.7, 1.0), sin(i + u_time) * 0.5 + 0.5);
          col += tint * pow((0.008 + u_treble * 0.016) / d, 1.28);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-monochrome",
		name: "Ghost Silver",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.008);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.35 + u_mid * 0.35)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * (1.2 + u_bass * 0.4));
          d = abs(sin(d * 8.0 + u_time * 1.4)) / 8.0;
          col += vec3(0.85, 0.9, 0.95) * pow((0.007 + u_treble * 0.015) / d, 1.3);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.35, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-crimson",
		name: "Crimson",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.015, 0.003, 0.005);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.3 + u_bass * 0.3)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * (1.0 + u_bass * 0.5));
          d = abs(sin(d * 9.0 + u_time * 1.8)) / 9.0;
          vec3 tint = mix(vec3(0.9, 0.05, 0.15), vec3(1.0, 0.3, 0.0), i / 3.0);
          col += tint * pow((0.008 + u_treble * 0.018) / d, 1.25);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-nebula-core",
		name: "Deep Core",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.005, 0.008, 0.02);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.3 + u_mid * 0.4)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * 1.0);
          d = abs(sin(d * 7.0 - u_time * 1.6 + u_bass * 3.0)) / 7.0;
          vec3 tint = mix(vec3(0.2, 0.3, 0.95), vec3(0.8, 0.15, 0.85), i / 3.0);
          col += tint * pow((0.009 + u_treble * 0.016) / d, 1.3);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-quantum-matrix",
		name: "Matrix Fold",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.004, 0.015, 0.006);

        for (float i = 0.0; i < 4.0; i++) {
          uv = abs(fract(uv * (1.4 + u_bass * 0.2)) - 0.5);
          float d = length(uv) * exp(-length(uv0) * 1.15);
          d = abs(cos(d * 8.0 + u_time * 2.0)) / 8.0;
          vec3 tint = mix(vec3(0.0, 0.9, 0.3), vec3(0.2, 0.8, 1.0), i / 3.0);
          col += tint * pow((0.008 + u_treble * 0.018) / d, 1.28);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-hyper-cube",
		name: "HyperCube",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.008, 0.01, 0.02);

        for (float i = 0.0; i < 4.0; i++) {
          uv = abs(uv * (1.32 + u_mid * 0.35)) - 0.45;
          float d = max(abs(uv.x), abs(uv.y)) * exp(-length(uv0) * 1.0);
          d = abs(sin(d * 8.0 + u_time * 1.8)) / 8.0;
          vec3 tint = mix(vec3(0.1, 0.8, 0.9), vec3(0.9, 0.2, 0.6), i / 3.0);
          col += tint * pow((0.009 + u_treble * 0.02) / d, 1.26);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-aurora-fold",
		name: "Aurora Fold",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.006, 0.012, 0.018);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.28 + u_mid * 0.3)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * (0.9 + u_bass * 0.5));
          d = abs(sin(d * 7.5 + u_time * 1.3 + sin(uv0.x * 4.0))) / 7.5;
          vec3 tint = mix(vec3(0.05, 0.85, 0.6), vec3(0.4, 0.1, 0.9), sin(i * 1.2 + u_time * 0.5) * 0.5 + 0.5);
          col += tint * pow((0.008 + u_treble * 0.016) / d, 1.3);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-electric-blue",
		name: "Electric Blue",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.002, 0.006, 0.018);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.36 + u_mid * 0.3)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * (1.2 + u_bass * 0.4));
          d = abs(sin(d * 9.5 + u_time * 2.2)) / 9.5;
          col += vec3(0.1, 0.55, 1.0) * pow((0.008 + u_treble * 0.018) / d, 1.3);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-golden-ratio",
		name: "Golden Ratio",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.012, 0.008, 0.002);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * 1.61803) - 0.5;
          float d = length(uv) * exp(-length(uv0) * (1.0 + u_bass * 0.5));
          d = abs(sin(d * 8.0 + u_time * 1.5)) / 8.0;
          vec3 tint = mix(vec3(0.95, 0.75, 0.1), vec3(0.7, 0.35, 0.05), i / 3.0);
          col += tint * pow((0.008 + u_treble * 0.015) / d, 1.28);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-neon-prism",
		name: "Neon Prism",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.008);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.3 + u_mid * 0.35)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * 1.1);
          d = abs(sin(d * 8.0 + u_time * 1.8 + i)) / 8.0;
          vec3 tint = vec3(
            sin(i * 1.5 + u_time) * 0.5 + 0.5,
            sin(i * 1.5 + 2.0 + u_time) * 0.5 + 0.5,
            sin(i * 1.5 + 4.0 + u_time) * 0.5 + 0.5
          );
          col += tint * pow((0.008 + u_treble * 0.016) / d, 1.26);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-cyber-cross",
		name: "Cyber Cross",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.005, 0.008, 0.015);

        for (float i = 0.0; i < 4.0; i++) {
          uv = abs(uv * (1.35 + u_bass * 0.3)) - 0.35;
          float d = min(abs(uv.x), abs(uv.y)) * exp(-length(uv0) * 1.1);
          d = abs(sin(d * 8.0 + u_time * 2.0)) / 8.0;
          vec3 tint = mix(vec3(0.1, 0.9, 0.8), vec3(0.8, 0.1, 0.6), i / 3.0);
          col += tint * pow((0.008 + u_treble * 0.018) / d, 1.3);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-abyss",
		name: "Abyss",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.002, 0.004, 0.008);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.4 + u_mid * 0.3)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * (1.4 + u_bass * 0.6));
          d = abs(sin(d * 10.0 + u_time * 1.2)) / 10.0;
          vec3 tint = mix(vec3(0.05, 0.25, 0.65), vec3(0.0, 0.7, 0.85), i / 3.0);
          col += tint * pow((0.007 + u_treble * 0.015) / d, 1.32);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.25, 1.2, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-supernova",
		name: "Supernova Fold",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.015, 0.006, 0.002);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.25 + u_bass * 0.4)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * (0.8 + u_bass * 0.8));
          d = abs(sin(d * 9.0 + u_time * 2.5)) / 9.0;
          vec3 tint = mix(vec3(1.0, 0.35, 0.05), vec3(1.0, 0.9, 0.3), i / 3.0);
          col += tint * pow((0.009 + u_treble * 0.02) / d, 1.25);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.35, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-infinity-pulse",
		name: "Infinity Pulse",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.008, 0.005, 0.015);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.3 + u_mid * 0.35)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * 1.1);
          float pulse = sin(d * 8.0 - u_time * (2.0 + u_bass * 3.0));
          d = abs(pulse) / 8.0;
          vec3 tint = mix(vec3(0.5, 0.1, 0.9), vec3(0.1, 0.8, 1.0), sin(u_time + i) * 0.5 + 0.5);
          col += tint * pow((0.008 + u_treble * 0.017) / d, 1.28);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},

	// ==================== 3. WINAMP EQUALIZERS & MILKDROP ====================
	{
		id: "winamp-spectrum",
		name: "Classic EQ",
		category: "EQ",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec3 col = vec3(0.015, 0.02, 0.035);

        float numBars = 32.0;
        float barIdx = floor(uv.x * numBars);
        float barNorm = barIdx / numBars;
        float withinBar = fract(uv.x * numBars);

        if (withinBar > 0.82) {
          gl_FragColor = vec4(col, 1.0);
          return;
        }

        float freqWeight;
        if (barNorm < 0.25) freqWeight = u_bass * (1.15 - barNorm * 1.5);
        else if (barNorm < 0.65) freqWeight = u_mid * (0.8 + sin(barNorm * 3.1415) * 0.45);
        else freqWeight = u_treble * (0.6 + barNorm * 0.55);

        float noise = sin(barIdx * 0.85 + u_time * 5.0) * 0.04;
        float barHeight = clamp(freqWeight * 0.85 + noise, 0.04, 0.94);

        float numSegments = 28.0;
        float segIdx = floor(uv.y * numSegments);
        float segNorm = segIdx / numSegments;
        float withinSeg = fract(uv.y * numSegments);
        float isLed = step(0.18, withinSeg);

        float peakY = barHeight + 0.05 + sin(barIdx * 1.2 + u_time * 2.0) * 0.015;
        float isPeak = step(abs(uv.y - peakY), 0.009);

        if (uv.y <= barHeight && isLed > 0.5) {
          vec3 ledColor;
          if (segNorm < 0.55) ledColor = vec3(0.05, 0.95, 0.2);
          else if (segNorm < 0.80) ledColor = vec3(0.98, 0.85, 0.05);
          else ledColor = vec3(1.0, 0.15, 0.05);
          ledColor *= 0.85 + withinSeg * 0.35;
          col = ledColor;
        } else if (isPeak > 0.5 && withinBar < 0.82) {
          col = vec3(0.3, 0.85, 1.0);
        } else {
          if (isLed > 0.5 && withinBar < 0.82) col = vec3(0.03, 0.04, 0.055);
        }

        col -= sin(uv.y * u_resolution.y * 1.5) * 0.06;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "eq-aura-orange",
		name: "Dark Aura Orange",
		category: "EQ",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec3 col = vec3(0.012, 0.007, 0.003); // Dark amber-black chassis

        float numBars = 36.0;
        float barIdx = floor(uv.x * numBars);
        float barNorm = barIdx / numBars;
        float withinBar = fract(uv.x * numBars);

        if (withinBar > 0.8) {
          gl_FragColor = vec4(col, 1.0);
          return;
        }

        float energy = (barNorm < 0.25) ? u_bass * 1.25 : ((barNorm < 0.65) ? u_mid * 1.05 : u_treble * 1.15);
        float barHeight = clamp(energy * 0.88 + sin(barIdx * 0.45 + u_time * 5.0) * 0.04, 0.06, 0.94);

        // Segmented discrete blocks
        float numSegments = 26.0;
        float segIdx = floor(uv.y * numSegments);
        float segNorm = segIdx / numSegments;
        float withinSeg = fract(uv.y * numSegments);
        float isLed = step(0.2, withinSeg);

        // Peak hold
        float peakY = barHeight + 0.045 + sin(barIdx * 1.1 + u_time * 2.5) * 0.015;
        float isPeak = step(abs(uv.y - peakY), 0.008);

        if (uv.y <= barHeight && isLed > 0.5) {
          // Dark aura orange to fiery gold gradient
          vec3 auraOrange = mix(vec3(0.9, 0.25, 0.02), vec3(1.0, 0.6, 0.05), segNorm);
          if (segNorm > 0.82) auraOrange = vec3(1.0, 0.9, 0.35); // White hot peak
          col = auraOrange * (1.2 + u_bass * 0.4);
        } else if (isPeak > 0.5 && withinBar < 0.8) {
          col = vec3(1.0, 0.9, 0.5); // Peak cap
        } else {
          if (isLed > 0.5 && withinBar < 0.8) col = vec3(0.035, 0.015, 0.005);
        }

        // Horizontal amber scanlines
        float scan = sin(uv.y * u_resolution.y * 1.4) * 0.08;
        col -= scan;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "eq-mirror-neon",
		name: "Mirror EQ",
		category: "EQ",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float centerDist = abs(uv.y - 0.5) * 2.0;
        vec3 col = vec3(0.01, 0.015, 0.025);

        float numBars = 40.0;
        float barIdx = floor(uv.x * numBars);
        float barNorm = barIdx / numBars;
        float withinBar = fract(uv.x * numBars);

        if (withinBar > 0.8) {
          gl_FragColor = vec4(col, 1.0);
          return;
        }

        float weight = (barNorm < 0.3) ? u_bass : ((barNorm < 0.7) ? u_mid : u_treble);
        float h = clamp(weight * 0.9 + sin(barIdx * 0.5 + u_time * 4.0) * 0.05, 0.05, 0.95);

        float withinSeg = fract(centerDist * 20.0);
        float isLed = step(0.2, withinSeg);

        if (centerDist <= h && isLed > 0.5) {
          col = mix(vec3(0.0, 0.9, 1.0), vec3(1.0, 0.1, 0.8), centerDist) * (1.0 + u_bass * 0.5);
        } else if (isLed > 0.5) {
          col = vec3(0.02, 0.03, 0.04);
        }

        if (abs(uv.y - 0.5) < 0.005) col = vec3(1.0);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	// ==================== MILKDROP CONTINUOUS MORPH (NO RERENDERS) ====================
	{
		id: "milkdrop-continuous-morph",
		name: "Continuous MilkDrop",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;
      uniform float u_beat_phase;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        float r = length(uv);
        float a = atan(uv.y, uv.x);

        // Continuous mode phase selector synced to sub-bass beat accumulator
        float modeCycle = mod(u_beat_phase, 5.0);
        float modeIndex = floor(modeCycle);
        float morphT = fract(modeCycle);
        morphT = smoothstep(0.0, 1.0, morphT);

        // Slow cinematic floating warp
        float driftTime = u_time * 0.4 + u_beat_phase * 0.1;
        vec2 drift = vec2(sin(driftTime * 0.7), cos(driftTime * 0.5)) * 0.08;
        vec2 p = uv + drift;

        // --- Equation 0: Supersymmetric Feedback Zoom & Twist ---
        float twist0 = 0.6 * sin(r * 4.5 - u_time * 2.2 + u_bass * 3.5);
        float zoom0 = 1.0 - 0.22 * sin(u_time * 1.6 + u_bass * 4.0);
        vec2 p0 = vec2(cos(a + twist0), sin(a + twist0)) * pow(max(r, 0.01), zoom0);
        p0 = abs(fract(p0 * 1.8) - 0.5);
        float v0 = sin(p0.x * 10.0 + u_time * 2.0) + sin(p0.y * 10.0 + u_time * 2.5) + sin((p0.x + p0.y) * 12.0 + u_bass * 5.0);
        v0 /= 3.0;

        // --- Equation 1: Radial Tunnel Warp Spiral ---
        float spiral1 = a * 4.0 + r * (7.0 + u_bass * 5.0) - u_time * 2.8;
        vec2 p1 = vec2(cos(spiral1), sin(spiral1)) * sqrt(max(r, 0.01));
        float v1 = sin(p1.x * 12.0 + u_time * 1.5) * cos(p1.y * 12.0 - u_mid * 4.0);

        // --- Equation 2: 8-Fold Acid Kaleidoscope Waves ---
        float segs = 8.0;
        float ka = abs(mod(a, 6.28318 / segs) - 3.14159 / segs);
        vec2 p2 = vec2(cos(ka), sin(ka)) * r;
        float v2 = sin(p2.x * 11.0 + u_time * 2.2) * cos(p2.y * 11.0 - u_bass * 4.5);

        // --- Equation 3: Metaball Fluid Vortices ---
        float v3 = sin(r * 10.0 - u_time * 2.5 + a * 5.0 + u_bass * 4.5);
        v3 += cos((uv.x + uv.y) * 7.5 + u_mid * 3.5);
        v3 *= 0.5;

        // --- Equation 4: Liquid Plasma Harmonic Drift ---
        vec2 p4 = uv;
        float pt = u_time * 1.4;
        p4.x += 0.22 * sin(3.0 * p4.y + pt + u_bass * 2.2);
        p4.y += 0.22 * cos(3.0 * p4.x + pt + u_mid * 2.2);
        float v4 = sin(length(p4) * 8.0 - pt * 1.2 + u_bass * 3.0);

        // Seamless continuous equation morphing
        float valA = v0;
        float valB = v1;
        if (modeIndex >= 1.0 && modeIndex < 2.0) {
          valA = v1;
          valB = v2;
        } else if (modeIndex >= 2.0 && modeIndex < 3.0) {
          valA = v2;
          valB = v3;
        } else if (modeIndex >= 3.0 && modeIndex < 4.0) {
          valA = v3;
          valB = v4;
        } else if (modeIndex >= 4.0) {
          valA = v4;
          valB = v0;
        }

        float val = mix(valA, valB, morphT);

        // Neon cyan, electric magenta & amber fluid palette
        vec3 colCyan = vec3(0.05, 0.9, 1.0);
        vec3 colMagenta = vec3(1.0, 0.1, 0.7);
        vec3 colAmber = vec3(1.0, 0.75, 0.2);

        float palT = val * 2.5 + u_time * 0.3 + u_color_shift;
        vec3 fluidCol = mix(colCyan, colMagenta, sin(palT) * 0.5 + 0.5);
        fluidCol = mix(fluidCol, colAmber, clamp(sin(palT * 1.4 + 2.0) * 0.6 + 0.2, 0.0, 1.0));

        // Clean obsidian black contrast gaps
        float contrastBand = sin(val * 4.0 + r * 3.0 - u_time * 0.8 + u_beat_phase * 0.5);
        float blackGap = smoothstep(-0.2, 0.3, contrastBand);
        fluidCol = mix(vec3(0.0), fluidCol, blackGap);

        // Luminous high-energy fluid trails & sharp bloom
        vec3 col = fluidCol * (0.6 + u_bass * 0.8);
        col += mix(colCyan, vec3(1.0), 0.5) * pow(abs(val), 6.0) * (0.8 + u_treble * 2.2);
        col += colAmber * exp(-r * (4.5 - u_bass * 2.0)) * (u_bass * 1.2);

        // Radial boundary falloff
        col *= exp(-r * 0.95);

        // Soft edge vignette
        vec2 normCoord = gl_FragCoord.xy / u_resolution.xy;
        float distEdge = min(min(normCoord.x, 1.0 - normCoord.x), min(normCoord.y, 1.0 - normCoord.y));
        float softFade = smoothstep(0.0, 0.12, distEdge);

        gl_FragColor = vec4(col * softFade, 1.0);
      }
    `,
	},
	{
		id: "milkdrop-classic",
		name: "MilkDrop",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float r = length(uv);
        float a = atan(uv.y, uv.x);

        float zoom = 1.0 - 0.18 * sin(u_time * 1.5 + u_bass * 3.0);
        float twist = 0.45 * sin(r * 5.0 - u_time * 2.0 + u_mid * 3.0);
        vec2 p = vec2(cos(a + twist), sin(a + twist)) * pow(r, zoom);

        p = abs(fract(p * 1.8) - 0.5);
        float v1 = sin(p.x * 10.0 + u_time * 2.0);
        float v2 = sin(p.y * 10.0 + u_time * 2.5);
        float v3 = sin((p.x + p.y) * 12.0 + u_bass * 4.0);
        float val = (v1 + v2 + v3) / 3.0;

        vec3 col = vec3(
          sin(val * 3.1415 + u_color_shift + 0.0) * 0.5 + 0.5,
          sin(val * 3.1415 + u_color_shift + 2.0) * 0.5 + 0.5,
          sin(val * 3.1415 + u_color_shift + 4.0) * 0.5 + 0.5
        );

        col *= pow(1.0 - clamp(r * 0.6, 0.0, 1.0), 1.8);
        col += vec3(0.05, 0.7, 1.0) * pow(abs(val), 8.0) * (0.8 + u_treble * 2.0);
        col *= (0.4 + u_bass * 1.4);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "milkdrop-hyperswirl",
		name: "MD Swirl",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float r = length(uv);
        float a = atan(uv.y, uv.x);

        float spiral = a * 4.0 + r * (8.0 + u_bass * 6.0) - u_time * 3.0;
        vec2 p = vec2(cos(spiral), sin(spiral)) * sqrt(r);

        float pattern = sin(p.x * 14.0 + u_time) * cos(p.y * 14.0 - u_mid * 4.0);
        vec3 col = vec3(
          sin(pattern * 2.0 + u_color_shift) * 0.5 + 0.5,
          sin(pattern * 2.0 + 2.1 + u_color_shift) * 0.5 + 0.5,
          sin(pattern * 2.0 + 4.2 + u_color_shift) * 0.5 + 0.5
        );

        col *= exp(-r * 1.4);
        col += vec3(1.0, 0.2, 0.7) * pow(abs(pattern), 5.0) * u_treble;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "milkdrop-plasma-vortex",
		name: "MD Vortex",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float r = length(uv);
        float a = atan(uv.y, uv.x);

        float v = sin(r * 12.0 - u_time * 3.0 + a * 6.0 + u_bass * 5.0);
        v += cos((uv.x + uv.y) * 8.0 + u_mid * 4.0);

        vec3 col = vec3(
          sin(v * 2.0 + u_color_shift) * 0.5 + 0.5,
          sin(v * 2.0 + 1.8 + u_color_shift) * 0.5 + 0.5,
          sin(v * 2.0 + 3.6 + u_color_shift) * 0.5 + 0.5
        );

        col *= exp(-r * 1.6);
        col += vec3(0.1, 0.9, 0.8) * pow(abs(v * 0.5), 6.0) * (0.8 + u_treble * 2.0);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "milkdrop-electric-roots",
		name: "MD Electric",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec3 finalCol = vec3(0.008, 0.01, 0.02);

        for (float i = 1.0; i <= 3.0; i++) {
          uv = abs(uv * 1.4) - (0.35 + u_bass * 0.15);
          float d = length(uv);
          float lightning = sin(d * 18.0 - u_time * 6.0 * i + u_mid * 5.0);
          float intensity = pow(0.02 / (abs(lightning) + 0.01), 1.2);
          finalCol += vec3(0.2, 0.6, 1.0) * intensity * (0.4 / i);
        }

        finalCol += vec3(0.9, 0.1, 0.6) * u_bass * 0.6;
        gl_FragColor = vec4(finalCol, 1.0);
      }
    `,
	},
	{
		id: "milkdrop-acid-kaleido",
		name: "MD Kaleido",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float a = atan(uv.y, uv.x);
        float r = length(uv);

        float segments = 8.0;
        a = abs(mod(a, 6.28318 / segments) - 3.14159 / segments);
        vec2 p = vec2(cos(a), sin(a)) * r;

        float k = sin(p.x * 12.0 + u_time * 2.0) * cos(p.y * 12.0 - u_bass * 4.0);
        vec3 col = vec3(0.01);
        col += vec3(0.8, 0.1, 0.9) * (sin(k * 4.0) * 0.5 + 0.5);
        col += vec3(0.1, 0.9, 0.3) * pow(abs(k), 4.0) * (1.0 + u_treble * 2.0);
        col *= exp(-r * 1.5);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "milkdrop-chromatic-pulse",
		name: "MD Chroma",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float r = length(uv);

        float shift = 0.03 * (u_bass + 0.2);
        float rGlow = sin((r - shift) * 16.0 - u_time * 4.0);
        float gGlow = sin(r * 16.0 - u_time * 4.0);
        float bGlow = sin((r + shift) * 16.0 - u_time * 4.0);

        vec3 col = vec3(pow(abs(rGlow), 4.0), pow(abs(gGlow), 4.0), pow(abs(bGlow), 4.0));
        col *= exp(-r * 2.0) * (1.2 + u_treble * 1.8);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "milkdrop-superluminal",
		name: "MD Superluminal",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float a = atan(uv.y, uv.x);
        float r = length(uv);

        float beams = sin(a * 14.0 + u_time * 2.0 + sin(r * 10.0));
        float blast = pow(abs(beams), 6.0) / (r * 2.0 + 0.1);

        vec3 col = vec3(0.2, 0.4, 1.0) * blast * (0.8 + u_mid);
        col += vec3(1.0, 0.9, 0.3) * exp(-r * 6.0) * (2.0 + u_bass * 4.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "milkdrop-liquid-dream",
		name: "MD Liquid",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;
      uniform float u_color_shift;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float t = u_time * 1.5;

        for (int i = 1; i <= 3; i++) {
          uv.x += 0.25 / float(i) * sin(float(i) * 3.0 * uv.y + t + u_bass * 2.0);
          uv.y += 0.25 / float(i) * cos(float(i) * 3.0 * uv.x + t + u_mid * 2.0);
        }

        float r = length(uv);
        vec3 col = vec3(
          sin(r * 8.0 + u_color_shift) * 0.5 + 0.5,
          sin(r * 8.0 + 2.0 + u_color_shift) * 0.5 + 0.5,
          sin(r * 8.0 + 4.0 + u_color_shift) * 0.5 + 0.5
        );

        col *= exp(-r * 1.2);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "milkdrop-sacred-geometry",
		name: "MD Sacred",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float a = atan(uv.y, uv.x);
        float r = length(uv);

        float petals = 6.0;
        float shape = cos(a * petals + u_time * 1.8) * (0.2 + u_bass * 0.15) + 0.45;
        float diff = abs(r - shape);

        vec3 col = vec3(0.01);
        col += vec3(0.0, 0.9, 0.8) * exp(-diff * 25.0) * (1.2 + u_treble * 2.0);
        col += vec3(0.9, 0.1, 0.6) * exp(-abs(r - shape * 0.6) * 30.0);
        col += vec3(1.0) * exp(-r * 10.0) * u_bass;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "matrix-stream",
		name: "Stream",
		category: "MilkDrop",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      float hash(float n) { return fract(sin(n) * 43758.5453123); }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec3 col = vec3(0.008, 0.012, 0.015);

        float columns = 48.0;
        float colIdx = floor(uv.x * columns);
        float withinCol = fract(uv.x * columns);

        if (withinCol > 0.75) {
          gl_FragColor = vec4(col, 1.0);
          return;
        }

        float colRand = hash(colIdx * 19.34);
        float fallSpeed = 0.6 + colRand * 1.2 + u_bass * 1.8;
        float yPos = fract(uv.y + u_time * fallSpeed);

        float cellY = floor(uv.y * 36.0);
        float glyphNoise = hash(colIdx + cellY * 7.13 + floor(u_time * (4.0 + u_treble * 8.0)));

        float trail = pow(yPos, 3.8);
        float head = exp(-(1.0 - yPos) * 28.0) * 3.0;

        vec3 streamColor = vec3(0.05, 0.95, 0.35);
        vec3 cyanGlitch = vec3(0.1, 0.85, 1.0);
        vec3 activeColor = mix(streamColor, cyanGlitch, step(0.82, colRand));

        col += activeColor * trail * glyphNoise * (1.0 + u_mid * 1.5);
        col += vec3(0.8, 1.0, 0.9) * head * (1.5 + u_bass * 2.0);
        col -= sin(uv.y * u_resolution.y * 1.8) * 0.08;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},

	// ==================== 4. MASTERING & MULTI-BAND ANALYTICS ====================
	{
		id: "mastering-vintage-rack",
		name: "Vintage Master",
		category: "Mastering",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec3 col = vec3(0.015, 0.014, 0.012); // Warm vintage chassis

        // Subdivide into 4 studio rack multi-band scopes:
        // Band 0: Sub-bass (20-120Hz), Band 1: Low-Mid (120-1kHz), Band 2: High-Mid (1-6kHz), Band 3: Air (6-20kHz)
        float bandIdx = floor(uv.y * 4.0);
        float localY = fract(uv.y * 4.0) * 2.0 - 1.0; // -1 to 1

        // Rack bezel division
        if (abs(localY) > 0.95) {
          col = vec3(0.035, 0.03, 0.025);
          gl_FragColor = vec4(col, 1.0);
          return;
        }

        // Phosphor scope graticule lines
        float gridY = step(0.96, fract(localY * 5.0));
        float gridX = step(0.98, fract(uv.x * 20.0));
        col += vec3(0.02, 0.04, 0.02) * max(gridY, gridX);

        // Compute band waveform
        float wave = 0.0;
        vec3 traceColor;
        float rms = 0.0;

        if (bandIdx == 3.0) { // SUB-BASS (Bottom)
          wave = sin(uv.x * 12.0 - u_time * 6.0) * (u_bass * 0.75) + sin(uv.x * 24.0) * (u_bass * 0.2);
          traceColor = vec3(1.0, 0.45, 0.1); // Amber red
          rms = u_bass;
        } else if (bandIdx == 2.0) { // LOW-MID
          wave = sin(uv.x * 28.0 - u_time * 8.0) * (u_mid * 0.6) + cos(uv.x * 14.0) * 0.15;
          traceColor = vec3(0.95, 0.8, 0.15); // Warm yellow
          rms = u_mid * 0.85;
        } else if (bandIdx == 1.0) { // HIGH-MID
          wave = sin(uv.x * 55.0 - u_time * 12.0) * (u_mid * 0.5) + sin(uv.x * 110.0) * (u_treble * 0.2);
          traceColor = vec3(0.2, 0.95, 0.4); // Phosphor green
          rms = (u_mid + u_treble) * 0.5;
        } else { // AIR / HIGH (Top)
          wave = sin(uv.x * 90.0 - u_time * 16.0) * (u_treble * 0.65) + cos(uv.x * 180.0) * (u_treble * 0.3);
          traceColor = vec3(0.2, 0.85, 1.0); // Cyan
          rms = u_treble;
        }

        // Glowing phosphor oscilloscope trace
        float dist = abs(localY - wave);
        float beam = exp(-dist * 28.0) * 1.5;
        float core = exp(-dist * 120.0) * 2.5;
        col += traceColor * (beam + core);

        // Analog VU meter bar on right edge (x: 0.88 - 0.98)
        if (uv.x > 0.88 && uv.x < 0.98) {
          float vuNorm = (uv.x - 0.88) / 0.1;
          if (vuNorm <= rms) {
            vec3 vuCol = vuNorm < 0.7 ? vec3(0.1, 0.9, 0.2) : (vuNorm < 0.88 ? vec3(0.9, 0.8, 0.1) : vec3(1.0, 0.2, 0.1));
            col = mix(col, vuCol, 0.85);
          }
        }

        // CRT scanline and glass vignette
        col -= sin(uv.y * u_resolution.y * 1.5) * 0.05;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},
	{
		id: "mastering-cyber-minimal",
		name: "Cyber Analytics",
		category: "Mastering",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec3 col = vec3(0.005, 0.008, 0.012); // Jet obsidian dark

        // Hairline futuristic grid (ultra-thin 1px)
        vec2 grid = fract(uv * vec2(12.0, 8.0));
        float lines = step(0.97, grid.x) + step(0.96, grid.y);
        col += vec3(0.015, 0.03, 0.05) * lines;

        // Thin multi-band phase & frequency ribbons:
        // Ribbon 1: Sub/Bass (Low frequency wave)
        float w1 = sin(uv.x * 8.0 - u_time * 4.0) * (u_bass * 0.28) + 0.3;
        float d1 = abs(uv.y - w1);
        col += vec3(0.0, 0.8, 1.0) * exp(-d1 * 180.0) * 1.4;

        // Ribbon 2: Mid Harmonic (Mid frequency complex wave)
        float w2 = sin(uv.x * 24.0 + u_time * 5.0) * (u_mid * 0.22) + cos(uv.x * 12.0) * 0.05 + 0.5;
        float d2 = abs(uv.y - w2);
        col += vec3(0.7, 0.2, 1.0) * exp(-d2 * 200.0) * 1.3;

        // Ribbon 3: Treble / Phase Correlation (High frequency laser ribbon)
        float w3 = sin(uv.x * 60.0 - u_time * 8.0) * (u_treble * 0.18) + 0.7;
        float d3 = abs(uv.y - w3);
        col += vec3(1.0, 0.1, 0.5) * exp(-d3 * 220.0) * 1.5;

        // Digital HUD readouts & peak tick marks
        // Bottom audio telemetry line
        if (abs(uv.y - 0.08) < 0.002) col += vec3(0.2, 0.5, 0.8) * 0.6;
        if (abs(uv.y - 0.92) < 0.002) col += vec3(0.2, 0.5, 0.8) * 0.6;

        // Digital peak ticks along top HUD
        float ticks = step(0.85, fract(uv.x * 48.0)) * step(0.91, uv.y) * step(uv.y, 0.93);
        col += vec3(0.0, 0.9, 1.0) * ticks * (0.5 + u_treble);

        // Center correlation crosshair
        float chX = exp(-abs(uv.x - 0.5) * 400.0) * step(0.42, uv.y) * step(uv.y, 0.58);
        float chY = exp(-abs(uv.y - 0.5) * 400.0) * step(0.46, uv.x) * step(uv.x, 0.54);
        col += vec3(0.9, 0.9, 1.0) * (chX + chY) * 0.8;

        // True digital peak readouts on right side
        if (uv.x > 0.94) {
          float dbBar = uv.y;
          float curLevel = (u_bass * 0.5 + u_mid * 0.3 + u_treble * 0.2);
          if (dbBar <= curLevel) {
            col = mix(col, vec3(0.0, 0.9, 0.8), 0.9);
          }
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `,
	},

	// ==================== 5. HYBRID COMBINED FRACTALS ====================
	{
		id: "fractal-hybrid-dual",
		name: "Dual Morph",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.004, 0.006, 0.012);

        // Morph between Amethyst domain folding and Cyan web via harmonic balance
        float morph = sin(u_time * 0.4 + u_bass * 1.5) * 0.5 + 0.5;

        for (float i = 0.0; i < 4.0; i++) {
          // Fractal 1: Domain-scale Amethyst
          vec2 uvA = fract(uv * (1.35 + u_mid * 0.35)) - 0.5;
          float dA = length(uvA) * exp(-length(uv0) * (1.1 + u_bass * 0.4));
          dA = abs(sin(dA * 8.0 + u_time * 1.4)) / 8.0;

          // Fractal 2: Polar-box Kaleido fold
          vec2 uvB = abs(fract(uv * 1.45) - 0.5);
          float dB = length(uvB) * exp(-length(uv0) * 1.25);
          dB = abs(cos(dB * 7.5 - u_time * 1.2)) / 7.5;

          float d = mix(dA, dB, morph);
          vec3 tintA = mix(vec3(0.5, 0.05, 0.9), vec3(0.9, 0.1, 0.6), i / 3.0);
          vec3 tintB = mix(vec3(0.0, 0.6, 0.9), vec3(0.05, 0.95, 0.7), i / 3.0);
          vec3 tint = mix(tintA, tintB, morph);

          col += tint * pow((0.008 + u_treble * 0.016) / d, 1.28);
          uv = mix(uvA, uvB, morph);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.3, 1.3, length(uv0))), 1.0);
      }
    `,
	},
	{
		id: "fractal-hybrid-hyper-nebula",
		name: "Hyper Nebula",
		category: "Fractal",
		fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_bass;
      uniform float u_mid;
      uniform float u_treble;

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 uv0 = uv;
        vec3 col = vec3(0.006, 0.004, 0.015);

        // Composite of Obsidian recursive iteration + continuous sinusoidal plasma feedback
        float t = u_time * 0.6;
        float plasma = sin(uv.x * 5.0 + t) + cos(uv.y * 5.0 - t) + sin((uv.x + uv.y) * 4.0 + u_bass * 3.0);

        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * (1.28 + plasma * 0.08 + u_mid * 0.3)) - 0.5;
          float d = length(uv) * exp(-length(uv0) * (0.95 + u_bass * 0.5));
          d = abs(sin(d * 8.5 + u_time * 1.5 + plasma * 0.5)) / 8.5;
          
          vec3 c = vec3(
            sin(i * 1.2 + u_time * 0.4) * 0.5 + 0.5,
            sin(i * 1.2 + 2.0) * 0.35 + 0.35,
            sin(i * 1.2 + 4.0) * 0.5 + 0.5
          );
          col += c * pow((0.008 + u_treble * 0.018) / d, 1.26);
        }

        gl_FragColor = vec4(col * (1.0 - smoothstep(0.35, 1.35, length(uv0))), 1.0);
      }
    `,
	},
];
