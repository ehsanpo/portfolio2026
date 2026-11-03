import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.CtNveh2g.js";import{audioManager as X}from"./audioSystem.BLJApxPs.js";import{u as ee,M as oe,S as ae,a as re}from"./useAudioStore.DSVfYJz-.js";import{c as ie}from"./createLucideIcon.p-vPGtMN.js";import{M as se}from"./music.CSikjglT.js";import{P as le,V as ne,a as ce}from"./volume-x.HOqszQL3.js";import{P as ue}from"./play.DL3QVutj.js";import"./react.BOkoJbwI.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]],me=ie("maximize-2",de),fe=()=>{const w=i.useRef(null),x=i.useRef(void 0),d=ee(o=>o.isPlaying);i.useEffect(()=>{const o=w.current;if(!o)return;const t=o.parentElement;if(!t)return;const s=new ResizeObserver(u=>{for(const m of u){const{width:l,height:n}=m.contentRect;(o.width!==l||o.height!==n)&&(o.width=l,o.height=n)}});return s.observe(t),()=>{s.disconnect()}},[]);const h=i.useRef(null),C=i.useRef(0),f=i.useRef(0),c=i.useRef(0);return i.useEffect(()=>{const o=w.current,t=h.current;if(!o)return;const s=o.getContext("2d");if(!s)return;const u=getComputedStyle(document.documentElement),m=u.getPropertyValue("--color-primary")||"rgba(168, 85, 247)",l=u.getPropertyValue("--color-secondary")||"rgba(59, 130, 246)",n=u.getPropertyValue("--color-accent")||"rgba(14, 165, 233)",S=u.getPropertyValue("--color-primary-600")||"#9333ea",U=u.getPropertyValue("--color-secondary-600")||"#2563eb",v=u.getPropertyValue("--color-accent-300")||"#7dd3fc",A=u.getPropertyValue("--color-accent-600")||"#0284c7",b=[m,l,n,v,S,U,A],I=X.getAnalyser();I.fftSize=4096,I.smoothingTimeConstant=.5;const k=I.frequencyBinCount,R=new Uint8Array(k),D=(g,L,_,F,B,O,p,G)=>{g.beginPath(),g.strokeStyle=p,g.lineWidth=3,g.shadowBlur=15,g.shadowColor=p;const y=O-B,P=y*4;for(let z=0;z<=P;z++){const M=z/P,$=M*Math.PI*2-Math.PI/2;let r;const j=M*4;j<1?r=Math.floor(j*y):j<2?r=Math.floor((2-j)*y):j<3?r=Math.floor((j-2)*y):r=Math.floor((4-j)*y),r=Math.min(Math.max(0,r),y-1);const N=R[B+r],T=Math.pow(N/255,1.8)*G,V=F+T,W=L+Math.cos($)*V,Y=_+Math.sin($)*V;z===0?g.moveTo(W,Y):g.lineTo(W,Y)}g.closePath(),g.stroke()},H=()=>{if(!o)return;const g=o.width,L=o.height,_=g/2,F=L/2;x.current=requestAnimationFrame(H),I.getByteFrequencyData(R);let B=0,O=0,p=0,G=0;for(let a=0;a<4;a++)O+=R[a];for(let a=0;a<10;a++)B+=R[a];for(let a=40;a<80;a++)p+=R[a];for(let a=100;a<150;a++)G+=R[a];const y=O/4,P=B/10,z=p/40,M=G/50;C.current+=(P-C.current)*.1;const $=C.current,r=performance.now();y>190&&r-c.current>350&&(f.current=(f.current+1)%b.length,c.current=r);const j=f.current,N=b[(j+2)%b.length],T=b[(j+1)%b.length],V=b[j%b.length];if(t){const a=1+P/255*.4,E=(z/255-.5)*30,Q=(M/255-.5)*30;t.style.transform=`perspective(500px) scale(${a}) rotateX(${E}deg) rotateY(${Q}deg)`;const te=P/255*20;t.style.filter=`drop-shadow(0 0 ${te}px ${N})`}s.save(),s.globalCompositeOperation="destination-out",s.fillStyle="rgba(0, 0, 0, 0.2)",s.fillRect(0,0,g,L),s.restore();const W=Math.min(g,L)/8,Y=P>0?$/P:0;D(s,_,F,W*.8,4,30,N,60*Y),D(s,_,F,W*2,30,100,T,80),D(s,_,F,W*2.8,100,300,V,100)};if(d)X.resume(),H();else{const g=f.current,L=b[(g+2)%b.length],_=b[(g+1)%b.length],F=b[g%b.length];t&&(t.style.transform="perspective(500px) scale(1) rotateX(0deg) rotateY(0deg)",t.style.filter="none");const B=o.width,O=o.height,p=B/2,G=O/2,y=Math.min(B,O)/8,P=(z,M)=>{s.beginPath(),s.arc(p,G,z,0,2*Math.PI),s.strokeStyle=M,s.globalAlpha=.3,s.lineWidth=1,s.stroke(),s.globalAlpha=1};P(y*.8,L),P(y*2,_),P(y*2.8,F)}return()=>{x.current&&cancelAnimationFrame(x.current)}},[d]),e.jsx("div",{className:"relative flex h-full min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#06080e] p-4 shadow-inner",children:e.jsx("canvas",{ref:w,className:"absolute inset-0 h-full w-full object-contain"})})},J=[{id:"dream-wave-photo",name:"Dream Photo",category:"Dream",fragmentShader:`
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
    `},{id:"fractal-continuous-morph",name:"Continuous Morph",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-continuous-lsd",name:"Continuous Acid Trip",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-continuous-dmt",name:"Continuous Hyperspace",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-continuous-hyperspace-core",name:"Hyperspace Core",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-obsidian",name:"Obsidian",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-amethyst",name:"Amethyst",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-cyan-lattice",name:"Cyan Web",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-emerald",name:"Emerald",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-solaris",name:"Solaris",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-vortex",name:"Spiral Fold",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-kaleido",name:"Kaleido Fold",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-monochrome",name:"Ghost Silver",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-crimson",name:"Crimson",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-nebula-core",name:"Deep Core",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-quantum-matrix",name:"Matrix Fold",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-hyper-cube",name:"HyperCube",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-aurora-fold",name:"Aurora Fold",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-electric-blue",name:"Electric Blue",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-golden-ratio",name:"Golden Ratio",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-neon-prism",name:"Neon Prism",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-cyber-cross",name:"Cyber Cross",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-abyss",name:"Abyss",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-supernova",name:"Supernova Fold",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-infinity-pulse",name:"Infinity Pulse",category:"Fractal",fragmentShader:`
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
    `},{id:"winamp-spectrum",name:"Classic EQ",category:"EQ",fragmentShader:`
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
    `},{id:"eq-aura-orange",name:"Dark Aura Orange",category:"EQ",fragmentShader:`
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
    `},{id:"eq-mirror-neon",name:"Mirror EQ",category:"EQ",fragmentShader:`
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
    `},{id:"milkdrop-continuous-morph",name:"Continuous MilkDrop",category:"MilkDrop",fragmentShader:`
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
    `},{id:"milkdrop-classic",name:"MilkDrop",category:"MilkDrop",fragmentShader:`
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
    `},{id:"milkdrop-hyperswirl",name:"MD Swirl",category:"MilkDrop",fragmentShader:`
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
    `},{id:"milkdrop-plasma-vortex",name:"MD Vortex",category:"MilkDrop",fragmentShader:`
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
    `},{id:"milkdrop-electric-roots",name:"MD Electric",category:"MilkDrop",fragmentShader:`
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
    `},{id:"milkdrop-acid-kaleido",name:"MD Kaleido",category:"MilkDrop",fragmentShader:`
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
    `},{id:"milkdrop-chromatic-pulse",name:"MD Chroma",category:"MilkDrop",fragmentShader:`
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
    `},{id:"milkdrop-superluminal",name:"MD Superluminal",category:"MilkDrop",fragmentShader:`
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
    `},{id:"milkdrop-liquid-dream",name:"MD Liquid",category:"MilkDrop",fragmentShader:`
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
    `},{id:"milkdrop-sacred-geometry",name:"MD Sacred",category:"MilkDrop",fragmentShader:`
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
    `},{id:"matrix-stream",name:"Stream",category:"MilkDrop",fragmentShader:`
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
    `},{id:"mastering-vintage-rack",name:"Vintage Master",category:"Mastering",fragmentShader:`
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
    `},{id:"mastering-cyber-minimal",name:"Cyber Analytics",category:"Mastering",fragmentShader:`
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
    `},{id:"fractal-hybrid-dual",name:"Dual Morph",category:"Fractal",fragmentShader:`
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
    `},{id:"fractal-hybrid-hyper-nebula",name:"Hyper Nebula",category:"Fractal",fragmentShader:`
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
    `}],ve=`
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = (position + 1.0) * 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`,xe=({presetId:w="fractal-obsidian",imageUrl:x="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"})=>{const d=i.useRef(null),h=i.useRef(void 0),C=ee(o=>o.isPlaying),f=i.useRef(0),c=i.useRef(0);return i.useEffect(()=>{const o=d.current;if(!o)return;const t=o.parentElement;if(!t)return;const s=new ResizeObserver(u=>{for(const m of u){const{width:l,height:n}=m.contentRect,S=Math.min(window.devicePixelRatio||1,2);(o.width!==Math.floor(l*S)||o.height!==Math.floor(n*S))&&(o.width=Math.floor(l*S),o.height=Math.floor(n*S))}});return s.observe(t),()=>s.disconnect()},[]),i.useEffect(()=>{const o=d.current;if(!o)return;const t=o.getContext("webgl",{alpha:!1,antialias:!0,powerPreference:"high-performance"});if(!t)return;const s=(p,G)=>{const y=t.createShader(p);return y?(t.shaderSource(y,G),t.compileShader(y),t.getShaderParameter(y,t.COMPILE_STATUS)?y:(t.deleteShader(y),null)):null},u=J.find(p=>p.id===w)||J[0],m=s(t.VERTEX_SHADER,ve),l=s(t.FRAGMENT_SHADER,u.fragmentShader);if(!m||!l)return;const n=t.createProgram();if(!n)return;if(t.attachShader(n,m),t.attachShader(n,l),t.linkProgram(n),!t.getProgramParameter(n,t.LINK_STATUS)){t.deleteProgram(n);return}t.useProgram(n);const S=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,S),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),t.STATIC_DRAW);const U=t.getAttribLocation(n,"position");t.enableVertexAttribArray(U),t.vertexAttribPointer(U,2,t.FLOAT,!1,0,0);const v=t.getUniformLocation(n,"u_resolution"),A=t.getUniformLocation(n,"u_time"),b=t.getUniformLocation(n,"u_bass"),I=t.getUniformLocation(n,"u_mid"),k=t.getUniformLocation(n,"u_treble"),R=t.getUniformLocation(n,"u_color_shift"),D=t.getUniformLocation(n,"u_beat_phase"),H=t.getUniformLocation(n,"u_texture");let g=null;if(H){g=t.createTexture(),t.bindTexture(t.TEXTURE_2D,g),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array([30,20,40,255]));const p=new Image;p.crossOrigin="anonymous",p.src=x,p.onload=()=>{!t||!g||(t.bindTexture(t.TEXTURE_2D,g),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,p))}}const L=X.getAnalyser();L.fftSize=1024;const _=L.frequencyBinCount,F=new Uint8Array(_),B=performance.now(),O=()=>{if(!o||!t)return;h.current=requestAnimationFrame(O),L.getByteFrequencyData(F);let p=0,G=0,y=0,P=0;for(let T=0;T<4;T++)p+=F[T];for(let T=0;T<12;T++)G+=F[T];for(let T=20;T<80;T++)y+=F[T];for(let T=100;T<200;T++)P+=F[T];const z=p/4,M=G/12/255,$=y/60/255,r=P/100/255;z>190&&(f.current+=.04);const j=z/255,N=Math.max(0,j-.65);c.current+=3e-4+N*.0018,t.viewport(0,0,o.width,o.height),t.uniform2f(v,o.width,o.height),t.uniform1f(A,(performance.now()-B)*.001),t.uniform1f(b,M),t.uniform1f(I,$),t.uniform1f(k,r),t.uniform1f(R,f.current),D&&t.uniform1f(D,c.current),H&&g&&(t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,g),t.uniform1i(H,0)),t.drawArrays(t.TRIANGLES,0,6)};return C?(X.resume(),O()):(t.viewport(0,0,o.width,o.height),t.clearColor(.005,.008,.012,1),t.clear(t.COLOR_BUFFER_BIT)),()=>{h.current&&cancelAnimationFrame(h.current),t&&g&&t.deleteTexture(g),t&&n&&t.deleteProgram(n),t&&m&&t.deleteShader(m),t&&l&&t.deleteShader(l)}},[C,w,x]),e.jsxs("div",{className:"relative flex h-full w-full min-h-[400px] flex-1 items-center justify-center overflow-hidden bg-[#020408]",children:[e.jsx("canvas",{ref:d,className:"absolute inset-0 h-full w-full object-cover"}),!C&&e.jsx("div",{className:"font-basement pointer-events-none absolute inset-0 flex items-center justify-center text-xl tracking-widest text-white/20 uppercase",children:"Play to Visualize"})]})},K=({className:w})=>e.jsx("div",{className:w,children:e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("g",{filter:"url(#filter0_d_4003_6488)",children:e.jsx("circle",{cx:"6",cy:"6",r:"5",fill:"#363B45"})}),e.jsx("g",{filter:"url(#filter1_di_4003_6488)",children:e.jsx("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.37961 3.78326C5.37961 3.45423 5.64634 3.1875 5.97537 3.1875C6.3044 3.1875 6.57113 3.45423 6.57113 3.78326C6.57113 4.24618 7.07134 4.53631 7.47316 4.30645L7.60896 4.22877C7.89259 4.06652 8.25589 4.16386 8.4204 4.44619C8.58492 4.72851 8.48835 5.08891 8.20472 5.25116L8.18002 5.26528C7.71228 5.53285 7.71228 6.20736 8.18002 6.47492C8.46366 6.63717 8.56022 6.99757 8.39571 7.2799C8.23119 7.56222 7.8679 7.65956 7.58426 7.49731L7.42741 7.40759C7.04597 7.18939 6.57113 7.4648 6.57113 7.90424C6.57113 8.23327 6.3044 8.5 5.97537 8.5C5.64634 8.5 5.37961 8.23327 5.37961 7.90424C5.37961 7.44228 4.88045 7.15276 4.47947 7.38214L4.41637 7.41823C4.13274 7.58048 3.76944 7.48314 3.60493 7.20081C3.44041 6.91849 3.53698 6.55809 3.82061 6.39584C4.22719 6.16326 4.2272 5.57695 3.82061 5.34436L3.79592 5.33024C3.51229 5.16799 3.41572 4.80759 3.58023 4.52527C3.74475 4.24294 4.10805 4.1456 4.39168 4.30785L4.43372 4.33189C4.85508 4.57293 5.37961 4.2687 5.37961 3.78326Z",fill:"#2C3038"})}),e.jsxs("defs",{children:[e.jsxs("filter",{id:"filter0_d_4003_6488",x:"0",y:"0",width:"12",height:"12",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB",children:[e.jsx("feFlood",{"flood-opacity":"0",result:"BackgroundImageFix"}),e.jsx("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),e.jsx("feOffset",{}),e.jsx("feGaussianBlur",{stdDeviation:"0.5"}),e.jsx("feComposite",{in2:"hardAlpha",operator:"out"}),e.jsx("feColorMatrix",{type:"matrix",values:"0 0 0 0 0.14902 0 0 0 0 0.160784 0 0 0 0 0.188235 0 0 0 1 0"}),e.jsx("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow_4003_6488"}),e.jsx("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow_4003_6488",result:"shape"})]}),e.jsxs("filter",{id:"filter1_di_4003_6488",x:"2.5",y:"3.1875",width:"7.00064",height:"7.3125",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB",children:[e.jsx("feFlood",{"flood-opacity":"0",result:"BackgroundImageFix"}),e.jsx("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),e.jsx("feOffset",{dy:"1"}),e.jsx("feGaussianBlur",{stdDeviation:"0.5"}),e.jsx("feComposite",{in2:"hardAlpha",operator:"out"}),e.jsx("feColorMatrix",{type:"matrix",values:"0 0 0 0 0.266667 0 0 0 0 0.290196 0 0 0 0 0.341176 0 0 0 1 0"}),e.jsx("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow_4003_6488"}),e.jsx("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow_4003_6488",result:"shape"}),e.jsx("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),e.jsx("feOffset",{dy:"1"}),e.jsx("feGaussianBlur",{stdDeviation:"0.5"}),e.jsx("feComposite",{in2:"hardAlpha",operator:"arithmetic",k2:"-1",k3:"1"}),e.jsx("feColorMatrix",{type:"matrix",values:"0 0 0 0 0.14902 0 0 0 0 0.160784 0 0 0 0 0.188235 0 0 0 1 0"}),e.jsx("feBlend",{mode:"normal",in2:"shape",result:"effect2_innerShadow_4003_6488"})]})]})]})}),he=[{id:"punch",name:"PUNCH",description:"Tight kick, aggressive snap, moderate glue",threshold:-16,ratio:4,attack:.03,release:.15,knee:6,lowCut:32,highCut:22e3,tubeDrive:40,warmth:45},{id:"transparent",name:"TRANSPARENT",description:"Clean peak control with zero coloration",threshold:-12,ratio:2.2,attack:.015,release:.25,knee:18,lowCut:24,highCut:24e3,tubeDrive:10,warmth:20},{id:"warm_tube",name:"WARM TUBE",description:"Even-order harmonics, rich bass, soft knee",threshold:-20,ratio:3.5,attack:.02,release:.35,knee:24,lowCut:28,highCut:2e4,tubeDrive:65,warmth:75},{id:"gentle_glue",name:"GENTLE GLUE",description:"VCA bus cohesion, smooth dynamic knit",threshold:-14,ratio:2,attack:.025,release:.4,knee:15,lowCut:20,highCut:23e3,tubeDrive:25,warmth:50},{id:"loud_limiter",name:"LOUD LIMITER",description:"Competitive loudness, brickwall ceiling protection",threshold:-24,ratio:10,attack:.002,release:.09,knee:4,lowCut:35,highCut:21500,tubeDrive:50,warmth:35}],q=({label:w,subLabel:x,value:d,min:h,max:C,step:f=1,unit:c="",displayFn:o,onChange:t,accentColor:s="emerald",numDots:u=15,size:m="md",retro:l=!1})=>{const n=i.useRef(!1),S=i.useRef(0),U=i.useRef(d),A=-135+Math.max(0,Math.min(1,(d-h)/(C-h)))*270,b=_=>{n.current=!0,S.current=_.clientY,U.current=d,window.addEventListener("mousemove",I),window.addEventListener("mouseup",k)},I=i.useCallback(_=>{if(!n.current)return;const F=S.current-_.clientY,B=C-h,O=F/140*B;let p=U.current+O;p=Math.max(h,Math.min(C,p)),f&&(p=Math.round(p/f)*f),t(Number(p.toFixed(2)))},[h,C,f,t]),k=i.useCallback(()=>{n.current=!1,window.removeEventListener("mousemove",I),window.removeEventListener("mouseup",k)},[I]);i.useEffect(()=>()=>{window.removeEventListener("mousemove",I),window.removeEventListener("mouseup",k)},[I,k]);const R={emerald:{activeDot:"bg-[#00f5c4] shadow-[0_0_8px_#00f5c4]",line:"#00f5c4",text:"text-[#28ffcd]"},cyan:{activeDot:"bg-[#43e1df] shadow-[0_0_8px_#43e1df]",line:"#43e1df",text:"text-[#62f8f6]"},amber:{activeDot:"bg-[#ffb95f] shadow-[0_0_8px_#ffb95f]",line:"#ffb95f",text:"text-[#ffb95f]"},orange:{activeDot:"bg-[#ff9436] shadow-[0_0_8px_#ff9436]",line:"#ff9436",text:"text-[#ff9436]"},brass:{activeDot:"bg-[#d4af37] shadow-[0_0_8px_#d4af37]",line:"#e6c35c",text:"text-[#e6c35c]"}}[s],D={sm:"w-12 h-12 sm:w-14 sm:h-14",md:"w-16 h-16 sm:w-20 sm:h-20",lg:"w-20 h-20 sm:w-24 sm:h-24 xl:w-28 xl:h-28"}[m],H={sm:"w-8 h-8 sm:w-9 sm:h-9",md:"w-12 h-12 sm:w-14 sm:h-14",lg:"w-16 h-16 sm:w-18 sm:h-18 xl:w-20 xl:h-20"}[m],g=Array.from({length:u}).map((_,F)=>{const B=-135+F/(u-1)*270,O=(B-90)*(Math.PI/180),p=m==="lg"?48:m==="md"?34:24,G=50+p*Math.cos(O),y=50+p*Math.sin(O),P=B<=A+1;return{cx:G,cy:y,isActive:P}}),L=o?o(d):`${d}${c}`;return e.jsxs("div",{className:"flex flex-col items-center select-none group",children:[e.jsx("span",{className:`text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-1 font-mono text-center truncate max-w-full ${l?"text-stone-300":"text-stone-400"}`,children:w}),e.jsxs("div",{className:`relative ${D} flex items-center justify-center cursor-ns-resize touch-none`,onMouseDown:b,title:`${w}: ${L} (Drag up/down)`,role:"slider","aria-valuenow":d,"aria-valuemin":h,"aria-valuemax":C,"aria-label":w,tabIndex:0,onKeyDown:_=>{_.key==="ArrowUp"||_.key==="ArrowRight"?(_.preventDefault(),t(Math.min(C,Number((d+(f||1)).toFixed(2))))):(_.key==="ArrowDown"||_.key==="ArrowLeft")&&(_.preventDefault(),t(Math.max(h,Number((d-(f||1)).toFixed(2)))))},children:[e.jsxs("svg",{viewBox:"0 0 100 100",className:"absolute inset-0 w-full h-full pointer-events-none overflow-visible",children:[e.jsx("circle",{cx:"50",cy:"50",r:m==="lg"?48:m==="md"?34:24,fill:"none",stroke:l?"#3e3223":"#1e2229",strokeWidth:"1.5",strokeDasharray:"2 3"}),g.map((_,F)=>e.jsx("circle",{cx:_.cx,cy:_.cy,r:m==="lg"?2.2:1.6,fill:_.isActive?R.line:l?"#2d2419":"#282c35",style:{filter:_.isActive?`drop-shadow(0 0 2px ${R.line})`:"none"}},F))]}),e.jsxs("div",{className:`${H} rounded-full relative flex items-center justify-center border transition-transform ${l?"shadow-[0_6px_16px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.3)] border-[#4a3b2c]":"shadow-[0_6px_14px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] border-stone-800"}`,style:{background:l?"radial-gradient(circle at 35% 30%, #524738 0%, #262018 65%, #14100c 100%)":"radial-gradient(circle at 35% 30%, #2f3540 0%, #171b22 65%, #0b0e12 100%)",transform:`rotate(${A}deg)`},children:[e.jsx("div",{className:`absolute inset-0.5 rounded-full border pointer-events-none ${l?"border-[#78644e]/40":"border-stone-700/50"}`}),e.jsx("div",{className:`w-1/2 h-1/2 rounded-full border flex items-center justify-center ${l?"border-[#2b2116] shadow-inner":"border-stone-900 shadow-inner"}`,style:{background:l?"linear-gradient(135deg, #3d3224 0%, #1c150e 100%)":"linear-gradient(135deg, #22262e 0%, #111418 100%)"}}),e.jsx("div",{className:"absolute top-1 w-1 rounded-full shadow-[0_0_6px_currentColor]",style:{height:m==="lg"?"14px":m==="md"?"10px":"7px",backgroundColor:R.line,color:R.line}})]})]}),e.jsxs("div",{className:"mt-1 flex flex-col items-center",children:[e.jsx("span",{className:`text-[10px] sm:text-[11px] font-bold font-mono tracking-wider ${R.text}`,children:L}),x&&e.jsx("span",{className:"text-[7px] sm:text-[8px] tracking-wider text-stone-500 font-mono uppercase",children:x})]})]})},Z=({value:w,label:x,unit:d="VU",meterType:h="vu"})=>{const C=Math.max(0,Math.min(1,w)),f=h==="gr"?38-C*76:-42+C*84;return e.jsxs("div",{className:"relative flex flex-col items-center justify-between rounded-md border border-[#4a3d2c] p-2 bg-gradient-to-b from-[#2a2218] via-[#1a140d] to-[#0f0b07] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_2px_4px_rgba(0,0,0,0.6)] w-full overflow-hidden flex-1 min-h-[90px]",children:[e.jsx("div",{className:"absolute inset-x-2 top-0 h-10 bg-amber-400/10 blur-xl pointer-events-none"}),e.jsxs("div",{className:"relative w-full h-16 sm:h-20 flex items-center justify-center overflow-hidden",children:[e.jsxs("svg",{viewBox:"0 0 160 80",className:"w-full h-full max-h-[90px]",children:[e.jsx("path",{d:"M 12 74 A 70 70 0 0 1 148 74",fill:"none",stroke:"#504130",strokeWidth:"1",strokeDasharray:"2 3"}),e.jsx("path",{d:"M 22 74 A 60 60 0 0 1 138 74",fill:"none",stroke:"#877154",strokeWidth:"2"}),h==="vu"&&e.jsx("path",{d:"M 115 74 A 60 60 0 0 1 138 74",fill:"none",stroke:"#d94336",strokeWidth:"3"}),h==="gr"&&e.jsx("path",{d:"M 22 74 A 60 60 0 0 1 55 74",fill:"none",stroke:"#e07128",strokeWidth:"3"}),h==="vu"?e.jsxs(e.Fragment,{children:[e.jsx("text",{x:"20",y:"66",fill:"#8d775c",fontSize:"7",fontFamily:"monospace",children:"-20"}),e.jsx("text",{x:"50",y:"44",fill:"#8d775c",fontSize:"7",fontFamily:"monospace",children:"-7"}),e.jsx("text",{x:"76",y:"34",fill:"#d4af37",fontSize:"7",fontFamily:"monospace",fontWeight:"bold",children:"0"}),e.jsx("text",{x:"110",y:"44",fill:"#d94336",fontSize:"7",fontFamily:"monospace",children:"+1"}),e.jsx("text",{x:"132",y:"66",fill:"#d94336",fontSize:"7",fontFamily:"monospace",children:"+3"})]}):e.jsxs(e.Fragment,{children:[e.jsx("text",{x:"20",y:"66",fill:"#e07128",fontSize:"7",fontFamily:"monospace",children:"-20"}),e.jsx("text",{x:"50",y:"44",fill:"#d4af37",fontSize:"7",fontFamily:"monospace",children:"-10"}),e.jsx("text",{x:"80",y:"34",fill:"#8d775c",fontSize:"7",fontFamily:"monospace",children:"-5"}),e.jsx("text",{x:"114",y:"44",fill:"#8d775c",fontSize:"7",fontFamily:"monospace",children:"-2"}),e.jsx("text",{x:"135",y:"66",fill:"#d4af37",fontSize:"7",fontFamily:"monospace",children:"0"})]}),e.jsxs("g",{style:{transformOrigin:"80px 76px",transform:`rotate(${f}deg)`,transition:"transform 80ms ease-out"},children:[e.jsx("line",{x1:"80",y1:"76",x2:"80",y2:"18",stroke:h==="gr"?"#ff7b39":"#ffb84d",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("circle",{cx:"80",cy:"76",r:"4",fill:"#1b140c",stroke:"#877154",strokeWidth:"1"})]})]}),e.jsx("div",{className:"absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] opacity-80"})]}),e.jsxs("div",{className:"flex w-full items-center justify-between border-t border-[#3b3022] pt-1 px-1",children:[e.jsx("span",{className:"text-[8px] font-bold tracking-widest text-[#cfba97] uppercase font-mono truncate",children:x}),e.jsx("span",{className:"text-[8px] font-mono font-bold text-amber-300",children:h==="gr"?`${(C*20).toFixed(1)} dB`:d})]})]})},ge=({isPlaying:w,bass:x,mid:d,treble:h})=>{const C=i.useRef(null),f=i.useRef(null);return i.useEffect(()=>{const c=C.current,o=f.current;if(!c||!o)return;const t=new ResizeObserver(s=>{for(const u of s){const m=u.contentRect,l=window.devicePixelRatio||1;c.width=Math.max(120,Math.floor(m.width*l)),c.height=Math.max(60,Math.floor((m.height||85)*l))}});return t.observe(o),()=>t.disconnect()},[]),i.useEffect(()=>{const c=C.current;if(!c)return;const o=c.getContext("2d");if(!o)return;let t,s=0;const u=()=>{t=requestAnimationFrame(u);const m=c.width,l=c.height,n=m/2,S=l/2;if(o.fillStyle="rgba(10, 14, 18, 0.25)",o.fillRect(0,0,m,l),o.strokeStyle="rgba(0, 245, 196, 0.15)",o.lineWidth=1,o.beginPath(),o.moveTo(n,0),o.lineTo(n,l),o.moveTo(0,S),o.lineTo(m,S),o.stroke(),o.beginPath(),o.moveTo(0,0),o.lineTo(m,l),o.moveTo(m,0),o.lineTo(0,l),o.strokeStyle="rgba(67, 225, 223, 0.1)",o.stroke(),!w){o.fillStyle="rgba(0, 245, 196, 0.4)",o.beginPath(),o.arc(n,S,3,0,Math.PI*2),o.fill();return}s+=.08;const U=x*.5+d*.35+h*.15,v=Math.min(m,l)*.32,A=32;o.beginPath(),o.strokeStyle="#00f5c4",o.lineWidth=1.4,o.shadowColor="#00f5c4",o.shadowBlur=6;for(let b=0;b<A;b++){const I=b/A*Math.PI*2,k=Math.sin(I*2+s)*(v*.4+U*v*.6),R=Math.cos(I*3-s)*(v*.35+d*v*.5),D=n+(k-R)*.707,H=S-(k+R)*.707;b===0?o.moveTo(D,H):o.lineTo(D,H)}o.closePath(),o.stroke(),o.shadowBlur=0};return u(),()=>cancelAnimationFrame(t)},[w,x,d,h]),e.jsxs("div",{ref:f,className:"flex flex-col items-center justify-between rounded-md bg-[#0a0d12] border border-[#1f2530] p-1.5 shadow-inner w-full flex-1",children:[e.jsxs("div",{className:"flex w-full items-center justify-between text-[8px] font-mono text-stone-400 px-1 border-b border-[#1b2029] pb-0.5 mb-1",children:[e.jsx("span",{children:"PHASE VECTOR (L/R)"}),e.jsx("span",{className:"text-[#00f5c4] font-bold",children:"+0.88 CORR"})]}),e.jsx("canvas",{ref:C,className:"w-full h-20 sm:h-24 md:h-28 rounded bg-[#07090c]"})]})},pe=({lowCut:w,highCut:x,isPlaying:d,bass:h,treble:C})=>{const f=i.useRef(null),c=i.useRef(null);return i.useEffect(()=>{const o=f.current,t=c.current;if(!o||!t)return;const s=new ResizeObserver(u=>{for(const m of u){const l=m.contentRect,n=window.devicePixelRatio||1;o.width=Math.max(120,Math.floor(l.width*n)),o.height=Math.max(60,Math.floor((l.height||85)*n))}});return s.observe(t),()=>s.disconnect()},[]),i.useEffect(()=>{const o=f.current;if(!o)return;const t=o.getContext("2d");if(!t)return;const s=o.width,u=o.height;t.fillStyle="#07090c",t.fillRect(0,0,s,u),t.strokeStyle="#171c24",t.lineWidth=1;const m=Math.max(25,Math.floor(s/8));for(let v=m;v<s;v+=m)t.beginPath(),t.moveTo(v,0),t.lineTo(v,u),t.stroke();t.beginPath(),t.moveTo(0,u/2),t.lineTo(s,u/2),t.strokeStyle="#202733",t.stroke(),t.beginPath(),t.strokeStyle="#43e1df",t.lineWidth=2,t.shadowColor="#43e1df",t.shadowBlur=4;const l=(w-20)/100,n=(x-14e3)/1e4,S=s*(.05+l*.22),U=s*(.7+n*.25);for(let v=0;v<=s;v++){let A=u/2;if(v<S){const b=Math.pow((S-v)/Math.max(1,S),2)*(u/2-2);A+=b}if(v>U){const b=Math.pow((v-U)/Math.max(1,s-U),2)*(u/2-2);A+=b}d&&(v>s*.2&&v<s*.5&&(A-=Math.sin((v-s*.2)/(s*.3)*Math.PI)*(h*(u*.15))),v>s*.6&&v<s*.9&&(A-=Math.sin((v-s*.6)/(s*.3)*Math.PI)*(C*(u*.12)))),v===0?t.moveTo(v,A):t.lineTo(v,A)}t.stroke(),t.shadowBlur=0},[w,x,d,h,C]),e.jsxs("div",{ref:c,className:"flex flex-col items-center justify-between rounded-md bg-[#0a0d12] border border-[#1f2530] p-1.5 shadow-inner w-full flex-1",children:[e.jsxs("div",{className:"flex w-full items-center justify-between text-[8px] font-mono text-stone-400 px-1 border-b border-[#1b2029] pb-0.5 mb-1",children:[e.jsx("span",{children:"MASTER FILTER EQ"}),e.jsxs("span",{className:"text-[#62f8f6]",children:[w,"Hz - ",(x/1e3).toFixed(1),"k"]})]}),e.jsx("canvas",{ref:f,className:"w-full h-20 sm:h-24 md:h-28 rounded bg-[#07090c]"})]})},be=({analyserData:w})=>{const{bass:x,mid:d,treble:h,subBass:C,isPlaying:f}=w,[c,o]=i.useState("DIGITAL"),[t,s]=i.useState(!1),[u,m]=i.useState(-18),[l,n]=i.useState(4),[S,U]=i.useState(.005),[v,A]=i.useState(.25),[b,I]=i.useState(12),[k,R]=i.useState(30),[D,H]=i.useState(22e3),[g,L]=i.useState(35),[_,F]=i.useState(50),[B,O]=i.useState("TRIODE"),[p,G]=i.useState("FAST"),[y,P]=i.useState(!0),[z,M]=i.useState(null),[$,r]=i.useState(0);i.useEffect(()=>{X.setMasteringBypass(t)},[t]),i.useEffect(()=>{X.setCompressorParams(u,l,S,v,b)},[u,l,S,v,b]),i.useEffect(()=>{X.setFilterParams(k,D)},[k,D]),i.useEffect(()=>{let a;const E=()=>{if(a=requestAnimationFrame(E),t)r(0);else{const Q=X.getReduction();r(Math.abs(Q))}};return E(),()=>cancelAnimationFrame(a)},[t]);const j=a=>{M(a.id),m(a.threshold),n(a.ratio),U(a.attack),A(a.release),I(a.knee),R(a.lowCut),H(a.highCut),a.tubeDrive!==void 0&&L(a.tubeDrive),a.warmth!==void 0&&F(a.warmth)},N=f&&!t?(-14+(d*3.5+x*2)).toFixed(1):"-14.0",T=f?(-.5+C*.4).toFixed(2):"-0.50",V=f?Math.min(1,x*.9+d*.4):.02,W=f?Math.min(1,d*.6+h*.7):.02,Y=f&&!t?Math.min(1,$>0?$/15:x*.5+d*.3):0;return e.jsxs("div",{className:`relative flex h-full w-full flex-col justify-between overflow-y-auto overflow-x-hidden rounded-xl p-2.5 sm:p-3 shadow-2xl border font-mono select-none transition-all duration-300 ${c==="DIGITAL"?"bg-gradient-to-b from-[#14171d] via-[#101217] to-[#090b0e] text-stone-200 border-[#272c36]":"bg-gradient-to-b from-[#2b2218] via-[#1c150e] to-[#120d08] text-amber-100 border-[#534330]"}`,children:[e.jsx(K,{className:"absolute top-2 left-2 z-20 pointer-events-none opacity-80"}),e.jsx(K,{className:"absolute top-2 right-2 z-20 pointer-events-none opacity-80"}),e.jsx(K,{className:"absolute bottom-2 left-2 z-20 pointer-events-none opacity-80"}),e.jsx(K,{className:"absolute bottom-2 right-2 z-20 pointer-events-none opacity-80"}),e.jsxs("div",{className:`flex flex-wrap items-center justify-between gap-2 border-b pb-2 px-4 sm:px-6 pt-0.5 ${c==="DIGITAL"?"border-[#232731]":"border-[#4a3a28]"}`,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:`w-2.5 h-2.5 rounded-full transition-colors ${t?"bg-stone-600":c==="DIGITAL"?"bg-[#00f5c4] shadow-[0_0_10px_#00f5c4] animate-pulse":"bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse"}`}),e.jsx("span",{className:`text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase truncate ${c==="DIGITAL"?"text-[#d4ffed]":"text-amber-200"}`,children:c==="DIGITAL"?"DISIBALIST DIGITAL MASTERING RACK":"VINTAGE RETRO ANALOG CONSOLE"})]}),e.jsxs("div",{className:`flex items-center gap-1 p-0.5 rounded-lg border shadow-inner ${c==="DIGITAL"?"bg-[#0b0e12] border-[#20252e]":"bg-[#18110b] border-[#3f3020]"}`,children:[e.jsxs("button",{type:"button",onClick:()=>o("DIGITAL"),className:`px-2.5 sm:px-3 py-1 text-[9px] font-bold tracking-wider rounded transition-all flex items-center gap-1.5 cursor-pointer ${c==="DIGITAL"?"bg-[#272b35] text-[#28ffcd] shadow-md border border-[#00f5c4]/40":"text-stone-500 hover:text-stone-300"}`,children:[e.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${c==="DIGITAL"?"bg-[#00f5c4] shadow-[0_0_6px_#00f5c4]":"bg-stone-700"}`}),"DIGITAL"]}),e.jsxs("button",{type:"button",onClick:()=>o("RETRO"),className:`px-2.5 sm:px-3 py-1 text-[9px] font-bold tracking-wider rounded transition-all flex items-center gap-1.5 cursor-pointer ${c==="RETRO"?"bg-[#3e2e1d] text-amber-300 shadow-md border border-amber-500/50":"text-stone-500 hover:text-amber-200"}`,children:[e.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${c==="RETRO"?"bg-amber-400 shadow-[0_0_6px_#f59e0b]":"bg-stone-700"}`}),"RETRO"]})]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("button",{type:"button",onClick:()=>s(!t),className:`flex items-center gap-1.5 px-3 py-1 rounded text-[9px] font-bold tracking-widest uppercase transition-all shadow-md border cursor-pointer ${t?"bg-red-950/60 text-red-400 border-red-700/80 shadow-[0_0_8px_rgba(239,68,68,0.25)] hover:bg-red-900/60":c==="DIGITAL"?"bg-[#00f5c4]/15 text-[#28ffcd] border-[#00f5c4]/50 shadow-[0_0_8px_rgba(0,245,196,0.25)] hover:bg-[#00f5c4]/25":"bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.25)] hover:bg-amber-500/30"}`,title:"Toggle real Web Audio compressor & filter mastering bypass",children:[e.jsx("span",{className:`w-2 h-2 rounded-full ${t?"bg-red-500 shadow-[0_0_6px_#ef4444]":c==="DIGITAL"?"bg-[#00f5c4] shadow-[0_0_6px_#00f5c4]":"bg-amber-400 shadow-[0_0_6px_#f59e0b]"}`}),t?"BYPASS: DRY":"ACTIVE: WET"]})})]}),e.jsxs("div",{className:`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-1.5 overflow-x-auto border-b ${c==="DIGITAL"?"bg-[#0a0d11]/80 border-[#1a1f28]":"bg-[#18110b]/80 border-[#382b1d]"}`,children:[e.jsx("span",{className:"text-[8px] font-bold tracking-wider text-stone-500 uppercase shrink-0 mr-1",children:"PRESETS:"}),e.jsx("div",{className:"flex items-center gap-1.5 flex-nowrap",children:he.map(a=>{const E=z===a.id;return e.jsx("button",{type:"button",onClick:()=>j(a),title:a.description,className:`px-2.5 py-0.5 text-[8px] sm:text-[9px] font-bold tracking-wider rounded transition-all cursor-pointer whitespace-nowrap border ${E?c==="DIGITAL"?"bg-[#00f5c4]/20 text-[#00f5c4] border-[#00f5c4] shadow-[0_0_8px_rgba(0,245,196,0.3)]":"bg-amber-500/30 text-amber-300 border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.3)]":c==="DIGITAL"?"bg-[#13171e] text-stone-400 border-[#222733] hover:text-stone-200 hover:border-stone-600":"bg-[#231a12] text-stone-400 border-[#423220] hover:text-amber-200 hover:border-[#634b30]"}`,children:a.name},a.id)})})]}),c==="DIGITAL"&&e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 my-2 px-1 flex-1 items-stretch",children:[e.jsxs("div",{className:"flex flex-col justify-between rounded-lg bg-[#0e1116] border border-[#232731] p-2.5 sm:p-3 shadow-inner",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-[#1f242d] pb-1",children:[e.jsx("span",{className:"text-[10px] font-bold tracking-wider text-stone-400 uppercase",children:"DYNAMICS COMPRESSOR"}),e.jsx("span",{className:"text-[8px] font-mono text-[#00f5c4]",children:"REAL DYNAMICS DSP"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 my-2 items-center justify-items-center",children:[e.jsx(q,{label:"THRESHOLD",value:u,min:-40,max:0,step:.5,unit:" dB",accentColor:"emerald",size:"md",onChange:a=>{M(null),m(a)}}),e.jsx(q,{label:"RATIO",value:l,min:1,max:16,step:.2,unit:":1",accentColor:"cyan",size:"md",onChange:a=>{M(null),n(a)}})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 pt-1 border-t border-[#1c212a] items-center justify-items-center",children:[e.jsx(q,{label:"ATTACK",value:S*1e3,min:1,max:50,step:1,unit:" ms",accentColor:"amber",size:"sm",onChange:a=>{M(null),U(a/1e3)}}),e.jsx(q,{label:"RELEASE",value:v*1e3,min:50,max:800,step:10,unit:" ms",accentColor:"orange",size:"sm",onChange:a=>{M(null),A(a/1e3)}})]})]}),e.jsxs("div",{className:"flex flex-col justify-between rounded-lg bg-[#0e1116] border border-[#232731] p-2.5 sm:p-3 shadow-inner",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-[#1f242d] pb-1",children:[e.jsx("span",{className:"text-[10px] font-bold tracking-wider text-stone-400 uppercase",children:"PARAMETRIC FILTERS"}),e.jsxs("div",{className:"flex items-center gap-1 text-[8px] font-mono",children:[e.jsx("span",{className:"text-stone-500",children:"GR:"}),e.jsx("span",{className:"text-red-400 font-bold",children:$>0?`-${$.toFixed(1)} dB`:"0.0 dB"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 my-2 items-center justify-items-center",children:[e.jsx(q,{label:"LOW CUT",value:k,min:20,max:120,step:5,unit:" Hz",accentColor:"cyan",size:"sm",onChange:a=>{M(null),R(a)}}),e.jsx(q,{label:"HIGH CUT",value:D,min:14e3,max:24e3,step:500,unit:" Hz",accentColor:"amber",size:"sm",onChange:a=>{M(null),H(a)}})]}),e.jsx("div",{className:"flex-1 flex flex-col justify-end mt-1 min-h-[90px]",children:e.jsx(pe,{lowCut:k,highCut:D,isPlaying:f,bass:x,treble:h})})]}),e.jsxs("div",{className:"flex flex-col justify-between rounded-lg bg-[#0e1116] border border-[#232731] p-2.5 sm:p-3 shadow-inner md:col-span-2 xl:col-span-1",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-[#1f242d] pb-1",children:[e.jsx("span",{className:"text-[10px] font-bold tracking-wider text-stone-400 uppercase",children:"STEREO PHASE & SPECTRUM"}),e.jsx("span",{className:"text-[8px] font-mono text-cyan-400",children:"GONIOMETER"})]}),e.jsx("div",{className:"my-1 flex-1 flex flex-col min-h-[90px]",children:e.jsx(ge,{isPlaying:f,bass:x,mid:d,treble:h})}),e.jsxs("div",{className:"bg-[#0a0d12] border border-[#1f2530] rounded-md p-1.5 flex flex-col justify-between mt-1",children:[e.jsx("span",{className:"text-[8px] text-stone-400 font-mono mb-1",children:"FREQUENCY SPECTRUM"}),e.jsx("div",{className:"flex items-end justify-between h-9 gap-1 px-1",children:[{label:"32",val:C,col:"bg-amber-400"},{label:"64",val:x*.9,col:"bg-[#00f5c4]"},{label:"125",val:x*1.1,col:"bg-[#00f5c4]"},{label:"250",val:d*.8,col:"bg-[#43e1df]"},{label:"500",val:d*1,col:"bg-[#43e1df]"},{label:"1k",val:d*.9,col:"bg-[#62f8f6]"},{label:"2k",val:h*.7,col:"bg-[#62f8f6]"},{label:"4k",val:h*1,col:"bg-[#ffb95f]"},{label:"8k",val:h*.8,col:"bg-[#ffb95f]"},{label:"16k",val:h*.6,col:"bg-[#ff9436]"}].map((a,E)=>{const Q=f?Math.min(100,Math.max(8,a.val*100)):8;return e.jsxs("div",{className:"flex-1 flex flex-col items-center gap-0.5",children:[e.jsx("div",{className:"w-full bg-[#151a23] h-7 rounded-xs overflow-hidden flex flex-col justify-end",children:e.jsx("div",{className:`w-full ${a.col} transition-all duration-75`,style:{height:`${Q}%`}})}),e.jsx("span",{className:"text-[6px] text-stone-500 font-mono",children:a.label})]},E)})})]})]})]}),c==="RETRO"&&e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5 my-2 px-1 flex-1 items-stretch",children:[e.jsxs("div",{className:"flex flex-col justify-between rounded-lg bg-gradient-to-b from-[#231b12] to-[#15100a] border border-[#534330] p-2.5 sm:p-3 shadow-inner",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-[#443524] pb-1",children:[e.jsx("span",{className:"text-[10px] font-bold tracking-wider text-amber-200 uppercase",children:"DUAL ANALOG VU METERS"}),e.jsx("span",{className:"text-[8px] font-mono text-amber-400",children:"WARM BALLISTICS"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 my-2 flex-1 items-center",children:[e.jsx(Z,{value:V,label:"LEFT CHANNEL",meterType:"vu"}),e.jsx(Z,{value:W,label:"RIGHT CHANNEL",meterType:"vu"})]}),e.jsxs("div",{className:"text-[8px] font-mono text-[#a89379] flex items-center justify-between px-1 border-t border-[#443524] pt-1",children:[e.jsx("span",{children:"0VU = +4dBu / -18dBFS"}),e.jsx("span",{className:"text-amber-400 font-bold",children:f?"SIGNAL PRESENT":"STANDBY"})]})]}),e.jsxs("div",{className:"flex flex-col justify-between rounded-lg bg-gradient-to-b from-[#231b12] to-[#15100a] border border-[#534330] p-2.5 sm:p-3 shadow-inner",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-[#443524] pb-1",children:[e.jsx("span",{className:"text-[10px] font-bold tracking-wider text-amber-200 uppercase",children:"GAIN REDUCTION & CIRCUIT"}),e.jsx("span",{className:"text-[8px] font-mono text-orange-400",children:"OPTO CELL"})]}),e.jsx("div",{className:"my-1 flex-1 flex flex-col justify-center",children:e.jsx(Z,{value:Y,label:"ATTENUATION",meterType:"gr"})}),e.jsxs("div",{className:"bg-[#17100a] border border-[#433322] rounded-md p-1.5 my-1 grid grid-cols-3 gap-1",children:[e.jsxs("button",{type:"button",onClick:()=>O(B==="TRIODE"?"PENTODE":"TRIODE"),className:"flex flex-col items-center justify-center p-1 rounded bg-[#251b12] hover:bg-[#322316] border border-[#52412d] transition-all cursor-pointer text-center",title:"Switch between Triode (warm 2nd harmonic) and Pentode (punchy 3rd harmonic)",children:[e.jsx("span",{className:"text-[7px] text-stone-400 font-mono tracking-wider uppercase",children:"TUBE"}),e.jsxs("div",{className:"flex items-center gap-1 my-0.5",children:[e.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${B==="TRIODE"?"bg-amber-400 shadow-[0_0_6px_#f59e0b]":"bg-orange-500 shadow-[0_0_6px_#f97316]"}`}),e.jsx("span",{className:"text-[8px] font-bold text-amber-200",children:B})]})]}),e.jsxs("button",{type:"button",onClick:()=>{const a=p==="FAST"?"SLOW":"FAST";G(a),a==="SLOW"?(U(.04),A(.5)):(U(.008),A(.18))},className:"flex flex-col items-center justify-center p-1 rounded bg-[#251b12] hover:bg-[#322316] border border-[#52412d] transition-all cursor-pointer text-center",title:"Switch optical cell attack/release speed",children:[e.jsx("span",{className:"text-[7px] text-stone-400 font-mono tracking-wider uppercase",children:"OPTO"}),e.jsxs("div",{className:"flex items-center gap-1 my-0.5",children:[e.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${p==="FAST"?"bg-amber-400 shadow-[0_0_6px_#f59e0b]":"bg-stone-500"}`}),e.jsx("span",{className:"text-[8px] font-bold text-amber-200",children:p})]})]}),e.jsxs("button",{type:"button",onClick:()=>P(!y),className:"flex flex-col items-center justify-center p-1 rounded bg-[#251b12] hover:bg-[#322316] border border-[#52412d] transition-all cursor-pointer text-center",title:"Automatic makeup gain compensation",children:[e.jsx("span",{className:"text-[7px] text-stone-400 font-mono tracking-wider uppercase",children:"AUTO GAIN"}),e.jsxs("div",{className:"flex items-center gap-1 my-0.5",children:[e.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${y?"bg-emerald-400 shadow-[0_0_6px_#10b981]":"bg-stone-600"}`}),e.jsx("span",{className:`text-[8px] font-bold ${y?"text-emerald-300":"text-stone-400"}`,children:y?"ENGAGED":"OFF"})]})]})]}),e.jsxs("div",{className:"flex items-center justify-around border-t border-[#443524] pt-2",children:[e.jsx(q,{label:"RATIO",value:l,min:1.5,max:12,step:.5,unit:":1",accentColor:"brass",size:"sm",retro:!0,onChange:a=>{M(null),n(a)}}),e.jsx(q,{label:"KNEE",value:b,min:0,max:30,step:2,unit:" dB",accentColor:"amber",size:"sm",retro:!0,onChange:a=>{M(null),I(a)}})]})]}),e.jsxs("div",{className:"flex flex-col justify-between rounded-lg bg-gradient-to-b from-[#231b12] to-[#15100a] border border-[#534330] p-2.5 sm:p-3 shadow-inner md:col-span-2 xl:col-span-1",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-[#443524] pb-1",children:[e.jsx("span",{className:"text-[10px] font-bold tracking-wider text-amber-200 uppercase",children:"TUBE SATURATION & TONE"}),e.jsx("span",{className:"text-[8px] font-mono text-amber-400",children:"12AX7 HARMONICS"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 my-2 items-center justify-items-center",children:[e.jsx(q,{label:"TUBE DRIVE",value:g,min:0,max:100,step:1,unit:"%",accentColor:"orange",size:"md",retro:!0,onChange:a=>{M(null),L(a),n(Math.round((2+a/100*8)*10)/10)}}),e.jsx(q,{label:"WARMTH EQ",value:_,min:0,max:100,step:1,unit:"%",accentColor:"amber",size:"md",retro:!0,onChange:a=>{M(null),F(a),I(Math.round(6+a/100*24))}})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2 pt-1 border-t border-[#443524] items-center justify-items-center",children:[e.jsx(q,{label:"THRESHOLD",value:u,min:-40,max:0,step:1,unit:" dB",accentColor:"brass",size:"sm",retro:!0,onChange:a=>{M(null),m(a)}}),e.jsx(q,{label:"LOW CUT",value:k,min:20,max:100,step:5,unit:" Hz",accentColor:"amber",size:"sm",retro:!0,onChange:a=>{M(null),R(a)}})]})]})]}),e.jsxs("div",{className:`border-t px-3 sm:px-4 py-1.5 rounded-lg flex flex-wrap items-center justify-between gap-2 text-[10px] ${c==="DIGITAL"?"border-[#1f242d] bg-[#0a0c10]":"border-[#4a3a28] bg-[#160f09]"}`,children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3 sm:gap-4",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:`w-2 h-2 rounded-full ${f?c==="DIGITAL"?"bg-[#00f5c4] shadow-[0_0_8px_#00f5c4]":"bg-amber-400 shadow-[0_0_8px_#f59e0b]":"bg-stone-700"}`}),e.jsxs("span",{className:"text-stone-400 font-mono",children:["MODE:"," ",e.jsx("span",{className:c==="DIGITAL"?"text-[#28ffcd] font-bold":"text-amber-300 font-bold",children:c})]})]}),e.jsxs("div",{className:"text-stone-400 font-mono",children:["LUFS:"," ",e.jsx("span",{className:c==="DIGITAL"?"text-[#62f8f6] font-bold":"text-amber-200 font-bold",children:N})]}),e.jsxs("div",{className:"text-stone-400 font-mono",children:["TRUE PEAK:"," ",e.jsxs("span",{className:c==="DIGITAL"?"text-[#ffb95f] font-bold":"text-amber-400 font-bold",children:[T," dBFS"]})]}),e.jsxs("div",{className:"text-stone-400 font-mono",children:["STATUS:"," ",e.jsx("span",{className:t?"text-red-400 font-bold":"text-emerald-400 font-bold",children:t?"BYPASS ACTIVE":"REAL-TIME MASTERING"})]})]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs("span",{className:"text-[8px] text-stone-500 font-mono hidden sm:inline",children:["AUDIO ROUTE:"," ",t?"SOURCE -> ANALYSER -> OUT":"SOURCE -> LOWCUT -> HIGHCUT -> COMP -> ANALYSER -> OUT"]})})]})]})},_e=({})=>e.jsxs("div",{className:"decorator absolute inset-0 h-full",children:[e.jsx("div",{className:"absolute top-5 left-[19.5px] h-[92%] w-0 border-l border-gray-300 shadow-sm shadow-gray-300 dark:shadow-gray-800  dark:border-gray-900"}),e.jsx("div",{className:"absolute top-5 right-[19.5px] h-[92%] w-0 border-l border-gray-300 shadow-sm shadow-gray-300 dark:shadow-gray-800  dark:border-gray-900"}),e.jsx("div",{className:"absolute top-[23.5px] left-4 h-0 w-[95%] border-t border-gray-300 shadow-sm shadow-gray-300 dark:shadow-gray-800  dark:border-gray-900"}),e.jsx("div",{className:"absolute bottom-[19.5px] left-4 h-0 w-[95%] border-t border-gray-300 shadow-sm shadow-gray-300 dark:shadow-gray-800  dark:border-gray-900"}),e.jsx(K,{className:"absolute top-4 left-3 z-2"}),e.jsx(K,{className:"absolute top-4 right-3 z-2"}),e.jsx(K,{className:"absolute bottom-3 left-3 z-2"}),e.jsx(K,{className:"absolute right-3 bottom-3 z-2"})]}),Fe=({tracks:w=[]})=>{const{currentTrack:x,isPlaying:d,playTrack:h,pauseTrack:C,resumeTrack:f,setPlaylist:c,nextTrack:o,prevTrack:t,currentTime:s,duration:u,volume:m,isMuted:l,setVolume:n,setMuted:S,requestSeek:U}=ee(),[v,A]=i.useState("shader"),[b,I]=i.useState("fractal-continuous-morph"),[k,R]=i.useState("All"),[D,H]=i.useState(!1),[g,L]=i.useState(!1),_=i.useRef(null),[F,B]=i.useState({bass:0,mid:0,treble:0,subBass:0,isPlaying:!1});i.useEffect(()=>{const r=()=>{L(!!document.fullscreenElement)};return document.addEventListener("fullscreenchange",r),()=>document.removeEventListener("fullscreenchange",r)},[]),i.useEffect(()=>{let r;const j=X.getAnalyser(),N=new Uint8Array(j.frequencyBinCount),T=()=>{r=requestAnimationFrame(T),j.getByteFrequencyData(N);let V=0,W=0,Y=0,a=0;for(let E=0;E<4;E++)V+=N[E];for(let E=0;E<12;E++)W+=N[E];for(let E=20;E<80;E++)Y+=N[E];for(let E=100;E<200;E++)a+=N[E];B({subBass:V/4/255,bass:W/12/255,mid:Y/60/255,treble:a/100/255,isPlaying:d})};return T(),()=>cancelAnimationFrame(r)},[d]),i.useEffect(()=>{if(!D)return;const r=J.filter(N=>N.category==="Fractal");if(r.length===0)return;const j=setInterval(()=>{I(N=>{const V=(r.findIndex(W=>W.id===N)+1)%r.length;return r[V].id})},8500);return()=>clearInterval(j)},[D]);const O=async()=>{if(_.current)if(document.fullscreenElement)try{await document.exitFullscreen()}catch(r){console.error("Exit fullscreen error:",r)}else try{await _.current.requestFullscreen()}catch(r){console.error("Fullscreen error:",r)}},p=i.useMemo(()=>w.map(r=>({id:r.src,title:r.title,artist:r.artist,duration:"0:00",src:r.src})),[w]),G=r=>{if(!Number.isFinite(r)||r<0)return"0:00";const j=Math.floor(r/60),N=Math.floor(r%60);return`${j}:${N.toString().padStart(2,"0")}`},y=r=>{const j={id:r.src,title:r.title,artist:r.artist,duration:"0:00",src:r.src};if(x?.id===r.src&&d){C();return}if(x?.id===r.src){f();return}c(p),h(j)},P=()=>{if(x){d?C():f();return}w.length>0&&y(w[0])},z=u>0?s/u*100:0,M=u>0?G(u):x?.duration||"0:00",$=G(s);return w.length===0?e.jsx("div",{className:"border-accent/50 bg-card rounded-lg border p-8 text-center",children:e.jsx("p",{className:"text-muted-foreground",children:"No local music tracks found"})}):e.jsx("div",{ref:_,className:`mx-auto w-full transition-all duration-300 ${g?"fixed inset-0 z-50 flex h-screen w-screen max-w-none flex-col justify-between bg-[#06080e] p-6":"max-w-5xl"}`,"data-local-music-player":!0,children:e.jsxs("div",{className:`skeu-panel flex flex-col ${g?"h-full flex-1 p-6":"p-6"}`,children:[e.jsxs("div",{className:`flex flex-col gap-4 min-h-0 lg:flex-row ${g?"flex-1":"max-h-[600px]"}`,children:[e.jsxs("div",{className:"flex-1 skeu-inset p-4 flex flex-col relative overflow-hidden",children:[e.jsx(_e,{isOn:d}),e.jsxs("div",{className:"z-20 mb-2 flex flex-col gap-1.5",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-white/5 pb-1",children:[e.jsx("div",{className:"flex items-center gap-1 overflow-x-auto scrollbar-none",children:["All","Fractal","Mastering","Dream","EQ","MilkDrop","Orbit"].map(r=>e.jsx("button",{type:"button",onClick:()=>{R(r),A(r==="Orbit"?"orbit":r==="Mastering"?"mastering":"shader")},className:`rounded px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-all ${k===r?"bg-primary/25 text-primary border border-primary/40 shadow-sm":"text-muted-foreground/70 hover:text-foreground hover:bg-white/5"}`,children:r},r))}),e.jsxs("div",{className:"flex items-center gap-1.5 ml-2",children:[(k==="Fractal"||k==="All")&&v==="shader"&&e.jsx("button",{type:"button",onClick:()=>H(!D),className:`rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase transition-all ${D?"bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]":"bg-background/40 text-muted-foreground/70 hover:text-foreground"}`,title:"Seamlessly cycle between all 20 fractals without breaking",children:D?"Cycle ON":"Cycle OFF"}),e.jsx("button",{type:"button",onClick:O,className:"skeu-button flex items-center gap-1.5 rounded px-2.5 py-0.5 text-xs font-semibold text-muted-foreground hover:text-foreground",title:g?"Exit Fullscreen":"Fullscreen Player",children:g?e.jsxs(e.Fragment,{children:[e.jsx(oe,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"hidden sm:inline text-[11px]",children:"Exit Full"})]}):e.jsxs(e.Fragment,{children:[e.jsx(me,{className:"w-3.5 h-3.5"}),e.jsx("span",{className:"hidden sm:inline text-[11px]",children:"Full Screen"})]})})]})]}),v==="shader"&&k!=="Orbit"&&e.jsx("div",{className:"flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none",children:J.filter(r=>k==="All"||r.category===k).map(r=>{const j=b===r.id;return e.jsx("button",{type:"button",onClick:()=>I(r.id),className:`whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium transition-all ${j?"bg-accent/30 text-accent border border-accent/50 shadow-[0_0_8px_rgba(14,165,233,0.3)]":"bg-background/30 text-muted-foreground/80 hover:bg-background/60 hover:text-foreground"}`,children:r.name},r.id)})})]}),k==="Orbit"&&e.jsx("div",{className:"flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1 pointer-events-none",children:e.jsx("div",{className:`w-28 h-28 rounded-full ${d?"animate-spin":""}`,style:{animationDuration:"3s",background:"conic-gradient(from 0deg, hsl(0 0% 8%), hsl(0 0% 15%), hsl(0 0% 8%), hsl(0 0% 12%), hsl(0 0% 8%))",boxShadow:"0 8px 32px hsl(0 0% 0% / 0.8), inset 0 0 20px hsl(0 0% 0% / 0.5), 0 0 0 4px hsl(0 0% 18%)"},children:e.jsx("div",{className:"w-full h-full rounded-full flex items-center justify-center",style:{background:"radial-gradient(circle at 30% 30%, hsl(0 0% 25%), hsl(0 0% 10%) 60%, hsl(0 0% 5%))"},children:e.jsx("div",{className:"w-10 h-10 rounded-full",style:{background:"linear-gradient(145deg, hsl(45 80% 55%), hsl(45 80% 40%))",boxShadow:"0 2px 8px hsl(45 100% 50% / 0.4)"},children:e.jsx("div",{className:"w-full h-full rounded-full flex items-center justify-center",children:e.jsx("div",{className:"w-3 h-3 rounded-full bg-background"})})})})})}),e.jsx("div",{className:"flex-1 min-h-[320px] flex overflow-hidden rounded-lg",children:k==="Orbit"?e.jsx(fe,{}):k==="Mastering"?e.jsx(be,{analyserData:F}):e.jsx(xe,{presetId:b})}),d&&e.jsx("div",{className:"absolute bottom-10 left-1/4 right-1/4 h-32 pointer-events-none",children:e.jsx("div",{className:"w-full h-full bg-gradient-to-t from-primary/20 to-transparent rounded-full blur-3xl animate-pulse-glow"})})]}),e.jsxs("div",{className:"w-full lg:w-72 skeu-inset flex flex-col",children:[e.jsx("div",{className:"p-4 border-b border-gray-400/30",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(se,{className:"w-4 h-4 text-primary"}),e.jsx("span",{className:"font-semibold text-foreground",children:"Playlist"}),e.jsxs("span",{className:"text-xs text-muted-foreground ml-auto",children:[w.length," tracks"]})]})}),e.jsx("div",{className:"flex-1 overflow-y-auto p-2 space-y-1",children:w.map((r,j)=>{const N=x?.id===r.src;return e.jsxs("button",{onClick:()=>y(r),className:`w-full p-3 flex items-center gap-3 text-left ${N?"skeu-list-item-active":"skeu-list-item"}`,children:[e.jsx("div",{className:`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${N?"skeu-button-primary":"skeu-button"}`,children:N&&d?e.jsxs("div",{className:"flex items-end gap-0.5 h-3",children:[e.jsx("div",{className:"w-0.5 rounded-full animate-pulse",style:{height:"50%",background:N?"hsl(0 0% 5%)":"var(--foreground)"}}),e.jsx("div",{className:"w-0.5 rounded-full animate-pulse",style:{height:"100%",animationDelay:"0.1s",background:N?"hsl(0 0% 5%)":"var(--foreground)"}}),e.jsx("div",{className:"w-0.5 rounded-full animate-pulse",style:{height:"60%",animationDelay:"0.2s",background:N?"hsl(0 0% 5%)":"var(--foreground)"}})]}):e.jsx("span",{className:`text-[10px] font-mono ${N?"text-background":"text-muted-foreground"}`,children:(j+1).toString().padStart(2,"0")})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:`text-sm font-medium truncate ${N?"text-black":"text-foreground"}`,children:r.title}),e.jsx("p",{className:"text-xs text-muted-foreground truncate",children:r.artist})]})]},r.src)})})]})]}),e.jsx("div",{className:"mt-4 skeu-panel p-4",children:e.jsxs("div",{className:"flex flex-col gap-4 lg:flex-row lg:items-center",children:[e.jsx("div",{className:"flex-1 min-w-0",children:e.jsxs("div",{className:"skeu-inset p-3 flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",style:{background:"linear-gradient(145deg, hsl(0 0% 15%), hsl(0 0% 8%))",boxShadow:"inset 0 1px 0 hsl(0 0% 25% / 0.3), 0 2px 4px hsl(0 0% 0% / 0.5)"},children:e.jsx("div",{className:"w-6 h-6 rounded-full",style:{background:"linear-gradient(135deg, hsl(45 80% 55% / 0.4), hsl(215 60% 55% / 0.4))"}})}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"text-sm font-medium text-foreground truncate",children:x?.title||"No song selected"}),e.jsx("p",{className:"text-xs text-muted-foreground truncate",children:x?.artist||"Select a song"})]})]})}),e.jsxs("div",{className:"flex items-center justify-center gap-3",children:[e.jsx("button",{onClick:t,disabled:!x,className:"skeu-button w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed",children:e.jsx(ae,{className:"w-4 h-4"})}),e.jsx("button",{onClick:P,className:`w-14 h-14 flex items-center justify-center ${d?"skeu-button-primary":"skeu-button"}`,children:d?e.jsx(le,{className:"w-5 h-5"}):e.jsx(ue,{className:"w-5 h-5 ml-0.5"})}),e.jsx("button",{onClick:o,disabled:!x,className:"skeu-button w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed",children:e.jsx(re,{className:"w-4 h-4"})})]}),e.jsxs("div",{className:"flex flex-1 items-center gap-2 lg:flex-[2]",children:[e.jsx("span",{className:"text-[10px] text-muted-foreground font-mono w-8 text-right",children:$}),e.jsxs("div",{className:"flex-1 h-2 skeu-track relative",children:[e.jsx("div",{className:"absolute inset-y-0 left-0 rounded-full",style:{width:`${z}%`,background:"linear-gradient(90deg, hsl(45 80% 50%), hsl(45 80% 60%))",boxShadow:"0 0 8px hsl(45 100% 50% / 0.5)"}}),e.jsx("input",{type:"range",min:"0",max:"100",value:z,onChange:r=>{if(u<=0)return;const j=Number(r.target.value);U(j/100*u)},className:"absolute inset-0 w-full h-full opacity-0 cursor-pointer"}),e.jsx("div",{className:"skeu-knob w-4 h-4 absolute top-1/2 -translate-y-1/2 -translate-x-1/2",style:{left:`${z}%`}})]}),e.jsx("span",{className:"text-[10px] text-muted-foreground font-mono w-8",children:M})]}),e.jsxs("div",{className:"flex items-center gap-2 lg:w-28",children:[e.jsx("button",{onClick:()=>S(!l),className:"skeu-button w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground",children:l||m===0?e.jsx(ne,{className:"w-3.5 h-3.5"}):e.jsx(ce,{className:"w-3.5 h-3.5"})}),e.jsxs("div",{className:"flex-1 h-1.5 skeu-track relative",children:[e.jsx("div",{className:"absolute inset-y-0 left-0 rounded-full bg-muted-foreground/60",style:{width:`${l?0:m*100}%`}}),e.jsx("input",{type:"range",min:"0",max:"100",value:l?0:Math.round(m*100),onChange:r=>{n(Number(r.target.value)/100),l&&S(!1)},className:"absolute inset-0 w-full h-full opacity-0 cursor-pointer"}),e.jsx("div",{className:"skeu-knob w-3 h-3 absolute top-1/2 -translate-y-1/2 -translate-x-1/2",style:{left:`${l?0:m*100}%`}})]})]})]})})]})})};export{Fe as default};
