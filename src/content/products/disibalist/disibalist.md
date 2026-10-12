---
title: "Decibelist"
title2: "Acoustic Intelligence & Neural Mastering"
description: "Studio-grade neural mastering engines and forensic acoustic telemetry directly on your local hardware. Zero cloud, zero latency."
date: "2026-03-15"
status: "publish"
permalink: "disibalist"
author: "Ehsan"
type: "product"
id: 318
agency: "Personal Project"
category:
  - Audio
  - Desktop Apps
tag:
  - Audio Mastering
  - DSP
  - Essentia
  - Master_me
  - Phase Limiter
  - Wails 3
  - Go
  - C++
  - Skeuomorphic UI
client: "Self"
tagline: "Studio-Grade AI Mastering. Zero Cloud. Zero Latency."

logo: "appicon.png"
cover: "rack-mastering.png"
images:
  - "rack-mastering.png"
  - "rack-analysis.png"
  - "rack-preview.png"
port_date: "2026"
onHome: true
---

<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

<style>
  /* Material Symbols Font Rule */
  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
  }

  /* Rack Hardware & Recessed Depth Shadows */
  .hardware-recessed {
    box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.85), inset 0 0 1px rgba(0, 0, 0, 0.95);
  }
  .hardware-bezel {
    border-top: 1px solid rgba(255, 255, 255, 0.09);
    border-bottom: 1px solid rgba(0, 0, 0, 0.95);
    border-left: 1px solid rgba(255, 255, 255, 0.04);
    border-right: 1px solid rgba(0, 0, 0, 0.85);
  }
  .neon-glow-primary {
    box-shadow: 0 0 14px rgba(0, 245, 196, 0.35);
  }
  .neon-glow-amber {
    box-shadow: 0 0 14px rgba(245, 158, 11, 0.35);
  }
  .reticle-grid {
    background-size: 24px 24px;
    background-image: 
      linear-gradient(to right, rgba(38, 208, 206, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(38, 208, 206, 0.05) 1px, transparent 1px);
  }
  /* Rotary Knob Skeuomorphic Simulation */
  .rotary-dial {
    background: radial-gradient(circle at 35% 30%, #2a3038 0%, #161b20 65%, #0d1013 100%);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.15);
  }

  /* Decibelist Design System Color Utilities */
  .bg-surface-container-lowest { background-color: #0b0e12 !important; }
  .bg-surface-container-low { background-color: #191c20 !important; }
  .bg-surface-container { background-color: #1d2024 !important; }
  .bg-surface-container-high { background-color: #272a2e !important; }
  .bg-surface-container-highest { background-color: #323539 !important; }
  .bg-surface-variant { background-color: #323539 !important; }
  .bg-primary-container { background-color: #00f5c4 !important; }

  .text-primary-fixed { color: #28ffcd !important; }
  .text-primary-fixed-dim { color: #00e0b3 !important; }
  .text-primary { color: #d4ffed !important; }
  .text-on-primary-container { color: #006b55 !important; }
  .text-secondary { color: #43e1df !important; }
  .text-secondary-fixed { color: #62f8f6 !important; }
  .text-secondary-fixed-dim { color: #3bdbd9 !important; }
  .text-tertiary-fixed-dim { color: #ffb95f !important; }
  .text-on-surface { color: #e1e2e8 !important; }
  .text-on-surface-variant { color: #b9cac2 !important; }
  .text-outline { color: #84948d !important; }
  .text-error { color: #ffb4ab !important; }

  .border-outline-variant { border-color: #3a4a44 !important; }
  . border-gray-800 { border-color: #323539 !important; }
  .border-primary-fixed { border-color: #28ffcd !important; }
  .border-primary-container { border-color: #00f5c4 !important; }
  .border-secondary { border-color: #43e1df !important; }

  /* Typography Scale */
  .font-title-rack { font-family: 'Space Grotesk', sans-serif !important; font-size: 13px; line-height: 16px; letter-spacing: 0.14em; font-weight: 700; }
  .font-headline-lg { font-family: 'Space Grotesk', sans-serif !important; font-size: 30px; line-height: 38px; letter-spacing: -0.02em; font-weight: 700; }
  .font-headline-md { font-family: 'Space Grotesk', sans-serif !important; font-size: 18px; line-height: 24px; letter-spacing: 0.08em; font-weight: 600; }
  .font-body-default { font-family: 'Space Grotesk', sans-serif !important; font-size: 13px; line-height: 18px; letter-spacing: 0.01em; font-weight: 400; }
  .font-label-caps { font-family: 'Space Grotesk', sans-serif !important; font-size: 10px; line-height: 12px; letter-spacing: 0.18em; font-weight: 700; }
  .font-metric-readout { font-family: 'JetBrains Mono', monospace !important; font-size: 13px; line-height: 16px; letter-spacing: 0.02em; font-weight: 600; }
  .font-metric-readout-lg { font-family: 'JetBrains Mono', monospace !important; font-size: 20px; line-height: 24px; letter-spacing: -0.02em; font-weight: 700; }
  .font-label-mono { font-family: 'JetBrains Mono', monospace !important; font-size: 10px; line-height: 12px; letter-spacing: 0.06em; font-weight: 500; }

  /* Spacing helpers */
  .px-space-sm { padding-left: 0.5rem; padding-right: 0.5rem; }
  .px-space-md { padding-left: 0.875rem; padding-right: 0.875rem; }
  .px-space-lg { padding-left: 1.25rem; padding-right: 1.25rem; }
  .py-space-sm { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-space-md { padding-top: 0.875rem; padding-bottom: 0.875rem; }
  .py-space-lg { padding-top: 1.25rem; padding-bottom: 1.25rem; }
  .px-margin-desktop { padding-left: 1.75rem; padding-right: 1.75rem; }
  .py-space-xl { padding-top: 2rem; padding-bottom: 2rem; }
  .landing-page-2 {  }
</style>

<div class="w-full text-on-surface space-y-12 landing-page-2">

  <!-- ========================================================================= -->
  <!-- RACK SUB-NAVIGATION TOOLBAR (In-Page Floating Below Header)               -->
  <!-- ========================================================================= -->
  <div class="flex flex-wrap items-center justify-between gap-4 px-space-lg py-space-sm bg-surface-container-lowest/95 backdrop-blur-md border  border-gray-800 rounded-xl shadow-2xl">
    <!-- Brand Anchor -->
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-sm bg-surface-container-high border border-outline-variant flex items-center justify-center text-primary-fixed">
        <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">graphic_eq</span>
      </div>
      <div class="flex flex-col">
        <span class="font-title-rack tracking-widest text-primary-fixed font-bold flex items-center gap-2">
          DECIBELIST // ACOUSTIC INTELLIGENCE
        </span>
        <span class="font-label-mono text-outline">HARDWARE CHASSIS v0.4 // DSP CORE AIR-GAPPED</span>
      </div>
    </div>
    <!-- Desktop Navigation Links -->
    <nav class="hidden md:flex items-center gap-6">
      <a class="text-primary-fixed border-b-2 border-primary-fixed pb-0.5 font-title-rack tracking-wider" href="#engines">Engines</a>
      <a class="text-outline hover:text-on-surface font-title-rack tracking-wider transition-colors duration-150" href="#telemetry">Telemetry</a>
      <a class="text-outline hover:text-on-surface font-title-rack tracking-wider transition-colors duration-150" href="#racks">Rack Units</a>
      <a class="text-outline hover:text-on-surface font-title-rack tracking-wider transition-colors duration-150" href="#specs">Specs</a>
    </nav>
  </div>

  <!-- ========================================================================= -->
  <!-- HERO SECTION: Master Offline Rack Overview                                -->
  <!-- ========================================================================= -->
  <section class="relative pt-2 pb-4">
    <!-- Machined Top Status Ribbon -->
    <div class="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-surface-container-lowest border border-outline-variant/60 font-label-mono text-primary-fixed mb-6 tracking-widest shadow-inner">
      <span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
      100% AIR-GAPPED &amp; OFFLINE // ZERO TELEMETRY // LOCAL NEURAL ENGINE
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-7 space-y-6">
        <h1 class="font-headline-lg text-on-surface uppercase tracking-tight text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Studio-Grade AI Mastering. <br class="hidden sm:inline"/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">
            Zero Cloud. Zero Latency.
          </span>
        </h1>
        <p class="font-body-default text-outline max-w-2xl text-base leading-relaxed">
          Decibelist brings high-precision neural mastering engines and forensic acoustic telemetry directly to your local hardware. Master commercial-ready tracks without sending a single byte to external servers. Bit-accurate, ultra-low noise floor, and instant hardware execution.
        </p>
        <div class="flex flex-wrap items-center gap-4 pt-2">
          <a class="inline-flex items-center gap-2 px-space-lg py-3 rounded bg-surface-container border  border-gray-800 text-on-surface font-title-rack uppercase tracking-wider hover:border-primary-fixed/50 active:translate-y-px transition-all" href="#racks">
            <span class="material-symbols-outlined text-outline">view_quilt</span>
            Explore Offline Rack
          </a>
        </div>
        <!-- Quick Hardware Status Ticker -->
        <div class="pt-4 grid grid-cols-3 gap-3 max-w-lg hardware-recessed p-3 rounded bg-surface-container-lowest border  border-gray-800/40">
          <div>
            <div class="font-label-mono text-outline">CORE ARCHITECTURE</div>
            <div class="font-metric-readout text-primary-fixed">GO + C++ WAILS 3</div>
          </div>
          <div>
            <div class="font-label-mono text-outline">NETWORK ADAPTER</div>
            <div class="font-metric-readout text-error">DISCONNECTED (SAFE)</div>
          </div>
          <div>
            <div class="font-label-mono text-outline">MAX CEILING</div>
            <div class="font-metric-readout text-secondary">-0.60 dB TRUE PEAK</div>
          </div>
        </div>
      </div>
      <!-- Hero Hardware Rack Visual Embed -->
      <div class="lg:col-span-5 relative">
        <div class="bg-surface-container-lowest hardware-bezel rounded-xl p-3 shadow-2xl relative overflow-hidden group">
          <div class="absolute top-2 left-2 flex gap-1">
            <div class="w-2 h-2 rounded-full bg-outline-variant/60 border border-black/80"></div>
            <div class="w-2 h-2 rounded-full bg-outline-variant/60 border border-black/80"></div>
          </div>
          <div class="absolute top-2 right-2 flex gap-1">
            <div class="w-2 h-2 rounded-full bg-outline-variant/60 border border-black/80"></div>
            <div class="w-2 h-2 rounded-full bg-outline-variant/60 border border-black/80"></div>
          </div>
          <div class="px-3 pt-2 pb-2 border-b  border-gray-800/40 flex items-center justify-between">
            <span class="font-title-rack text-outline uppercase flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              ACTIVE RACK UNIT 01 // MASTERING CONTROLLER
            </span>
            <span class="font-label-mono text-outline">SID: 3883E5B1</span>
          </div>
          <!-- Image Asset Presentation -->
          <div class="relative rounded overflow-hidden hardware-recessed bg-black/80 mt-2">
            <img alt="Decibelist Mastering Rack Interface" class="w-full h-auto object-cover transform hover:scale-[1.01] transition-transform duration-300" src="/img/products/disibalist/rack-mastering.png"/>
          </div>
          <div class="mt-3 flex items-center justify-between px-2 pt-2 border-t  border-gray-800/40">
            <span class="font-label-mono text-primary-fixed font-semibold tracking-wider">
              HYBRID &amp; CLASSIC ALGORITHM STACK
            </span>
            <span class="font-label-mono text-tertiary-fixed-dim">
              4X LINEAR PHASE OVERSAMPLING
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- RACK SELECTOR BAR                                                         -->
  <!-- ========================================================================= -->
  <div class="hardware-recessed bg-surface-container-lowest p-2 rounded-lg border  border-gray-800/40 flex flex-wrap items-center justify-between gap-4" id="racks">
    <div class="flex flex-wrap items-center gap-2">
      <button class="px-space-md py-1.5 rounded bg-surface-container-high border border-primary-container text-primary-fixed font-title-rack tracking-widest uppercase neon-glow-primary">
        Mastering Rack
      </button>
      <button class="px-space-md py-1.5 rounded bg-surface-container border  border-gray-800/60 text-outline hover:text-on-surface font-title-rack tracking-widest uppercase transition-colors">
        Preview Rack
      </button>
      <button class="px-space-md py-1.5 rounded bg-surface-container border  border-gray-800/60 text-outline hover:text-on-surface font-title-rack tracking-widest uppercase transition-colors">
        Analysis Rack
      </button>
      <button class="px-space-md py-1.5 rounded bg-surface-container border  border-gray-800/60 text-outline hover:text-on-surface font-title-rack tracking-widest uppercase transition-colors">
        Jobs Rack
      </button>
    </div>
    <div class="hidden sm:flex items-center gap-4 font-label-mono text-outline pr-2">
      <span class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-primary-container"></span> ENGINE: DUAL DSP READY
      </span>
      <span>BUFFER: 512 SAMPLES</span>
      <span>OFFLINE COMPLIANCE: EBU R128</span>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- FEATURE SHOWCASE 1: Dual AI Mastering Engines (Engines Section)            -->
  <!-- ========================================================================= -->
  <section class="space-y-6" id="engines">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b  border-gray-800/50 pb-4">
      <div>
        <span class="font-label-caps text-primary-fixed uppercase tracking-widest">ARCHITECTURE COMPARISON</span>
        <h2 class="font-headline-md text-on-surface uppercase mt-1">Dual Local AI Mastering Engines</h2>
      </div>
      <div class="font-label-mono text-outline">
        ZERO ROUNDTRIP // 100% C++ DSP NATIVE THREADS
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Hybrid Engine Card -->
      <div class="bg-surface-container hardware-bezel rounded-xl p-6 relative overflow-hidden space-y-5">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-primary-container/5 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-sm bg-surface-container-lowest hardware-recessed flex items-center justify-center text-primary-fixed border border-primary-fixed/30">
              <span class="material-symbols-outlined text-[24px]">neurology</span>
            </div>
            <div>
              <h3 class="font-title-rack text-headline-md text-primary-fixed uppercase font-bold tracking-wider">HYBRID ENGINE</h3>
              <span class="font-label-mono text-outline">ESSENTIA + MASTER_ME INTELLIGENCE</span>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded bg-primary-container/10 border border-primary-container/40 text-primary-fixed font-label-mono">
            DEFAULT
          </span>
        </div>
        <p class="font-body-default text-on-surface-variant">
          Combines deep acoustic descriptor extraction with adaptive feedback dynamic processing. Analyzes spectral flux, harmonic dissonance, and perceived loudness in real-time, sculpting multi-band dynamics automatically.
        </p>
        <div class="hardware-recessed bg-surface-container-lowest p-4 rounded-lg space-y-3 border  border-gray-800/40">
          <div class="font-label-caps text-outline uppercase tracking-wider">DSP Execution Pipeline</div>
          <div class="flex items-center justify-between text-xs font-label-mono text-on-surface">
            <span class="text-outline">01. Feature Extraction</span>
            <span class="text-primary-fixed">Essentia 2.1 C++</span>
          </div>
          <div class="w-full bg-surface-container-highest h-1 rounded overflow-hidden">
            <div class="bg-primary-container h-full w-full"></div>
          </div>
          <div class="flex items-center justify-between text-xs font-label-mono text-on-surface">
            <span class="text-outline">02. Dynamic Leveling</span>
            <span class="text-primary-fixed">Master_me Adaptive AGC</span>
          </div>
          <div class="flex items-center justify-between text-xs font-label-mono text-on-surface">
            <span class="text-outline">03. Harmonic Saturation</span>
            <span class="text-primary-fixed">Odd/Even Tube Topology</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 pt-1">
          <div class="p-2.5 rounded bg-surface-container-low border  border-gray-800/40">
            <div class="font-label-mono text-outline">LATENCY BUDGET</div>
            <div class="font-metric-readout text-primary-fixed">&lt; 12.4 ms (Local)</div>
          </div>
          <div class="p-2.5 rounded bg-surface-container-low border  border-gray-800/40">
            <div class="font-label-mono text-outline">OPTIMAL TARGET</div>
            <div class="font-metric-readout text-on-surface">Modern Pop / Club / EDM</div>
          </div>
        </div>
      </div>
      <!-- Classic Engine Card -->
      <div class="bg-surface-container hardware-bezel rounded-xl p-6 relative overflow-hidden space-y-5">
        <div class="absolute -right-12 -top-12 w-48 h-48 bg-secondary/5 rounded-full blur-2xl pointer-events-none"></div>
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-sm bg-surface-container-lowest hardware-recessed flex items-center justify-center text-secondary border border-secondary/30">
              <span class="material-symbols-outlined text-[24px]">reorder</span>
            </div>
            <div>
              <h3 class="font-title-rack text-headline-md text-secondary uppercase font-bold tracking-wider">CLASSIC ENGINE</h3>
              <span class="font-label-mono text-outline">PHASELIMITER HIGH PRECISION CHAIN</span>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded bg-surface-variant border border-outline-variant text-outline font-label-mono">
            ANALOG PURIST
          </span>
        </div>
        <p class="font-body-default text-on-surface-variant">
          A linear-phase mastering limiter designed for surgical acoustic clarity. Features dedicated lookahead brickwall safety, pristine transient preservation, and zero phase alteration across sensitive stereo soundstages.
        </p>
        <div class="hardware-recessed bg-surface-container-lowest p-4 rounded-lg space-y-3 border  border-gray-800/40">
          <div class="font-label-caps text-outline uppercase tracking-wider">DSP Execution Pipeline</div>
          <div class="flex items-center justify-between text-xs font-label-mono text-on-surface">
            <span class="text-outline">01. Linear Phase Filtering</span>
            <span class="text-secondary">Butterworth 8-Pole</span>
          </div>
          <div class="w-full bg-surface-container-highest h-1 rounded overflow-hidden">
            <div class="bg-secondary h-full w-full"></div>
          </div>
          <div class="flex items-center justify-between text-xs font-label-mono text-on-surface">
            <span class="text-outline">02. Brickwall Ceiling</span>
            <span class="text-secondary">Phaselimiter Lookahead</span>
          </div>
          <div class="flex items-center justify-between text-xs font-label-mono text-on-surface">
            <span class="text-outline">03. Intersample Guard</span>
            <span class="text-secondary">ITU-R BS.1770-4</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 pt-1">
          <div class="p-2.5 rounded bg-surface-container-low border  border-gray-800/40">
            <div class="font-label-mono text-outline">TOTAL DISTORTION</div>
            <div class="font-metric-readout text-secondary">&lt; 0.00012% THD+N</div>
          </div>
          <div class="p-2.5 rounded bg-surface-container-low border  border-gray-800/40">
            <div class="font-label-mono text-outline">OPTIMAL TARGET</div>
            <div class="font-metric-readout text-on-surface">Acoustic / Jazz / Classical</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- FEATURE SHOWCASE 2: Acoustic Analytics & Forensic Console                 -->
  <!-- ========================================================================= -->
  <section class="space-y-6" id="telemetry">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b  border-gray-800/50 pb-4">
      <div>
        <span class="font-label-caps text-primary-fixed uppercase tracking-widest">FORENSIC TELEMETRY</span>
        <h2 class="font-headline-md text-on-surface uppercase mt-1">Deep Acoustic Analytics Console</h2>
      </div>
      <div class="font-label-mono text-tertiary-fixed-dim">
        TRUE PEAK: -0.60 dB // EBU INTEGRATED TARGET: -12.7 dB
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Telemetry UI Screenshot Embed -->
      <div class="lg:col-span-7 bg-surface-container-lowest hardware-bezel rounded-xl p-3 shadow-2xl">
        <div class="px-3 py-2 border-b  border-gray-800/40 flex items-center justify-between">
          <span class="font-title-rack text-outline uppercase flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            ANALYSIS RACK TELEMETRY MATRIX
          </span>
          <span class="font-label-mono text-primary-fixed">STATUS: SUCCEEDED</span>
        </div>
        <div class="hardware-recessed bg-black/90 rounded overflow-hidden mt-2">
          <img alt="Decibelist Analysis Rack Console" class="w-full h-auto object-cover" src="/img/products/disibalist/rack-analysis.png"/>
        </div>
      </div>
      <!-- Telemetry Details & Monospaced Metric Comparisons -->
      <div class="lg:col-span-5 space-y-4">
        <div class="bg-surface-container hardware-bezel rounded-xl p-5 space-y-4">
          <h3 class="font-title-rack text-on-surface uppercase tracking-wider flex items-center gap-2">
            <span class="material-symbols-outlined text-primary-fixed text-[18px]">query_stats</span>
            Golden Reference Matching
          </h3>
          <p class="font-body-default text-outline">
            Our automated acoustic engine calculates your track's mathematical correlation with high-chart mastering references, flagging harmonic anomalies before release.
          </p>
          <!-- Metric Comparative Inset Well -->
          <div class="hardware-recessed bg-surface-container-lowest p-3.5 rounded border  border-gray-800/40 space-y-2.5 font-metric-readout">
            <div class="grid grid-cols-3 text-outline text-[11px] pb-1 border-b  border-gray-800/40 font-label-mono">
              <span>METRIC</span>
              <span class="text-right">ORIGINAL</span>
              <span class="text-right text-primary-fixed">MASTERED</span>
            </div>
            <div class="grid grid-cols-3 items-center">
              <span class="text-on-surface font-medium">Loudness</span>
              <span class="text-right text-outline">-14.0 dB</span>
              <span class="text-right text-primary-fixed">-12.7 dB</span>
            </div>
            <div class="grid grid-cols-3 items-center">
              <span class="text-on-surface font-medium">True Peak</span>
              <span class="text-right text-outline">-1.70 dB</span>
              <span class="text-right text-primary-fixed">-0.60 dB</span>
            </div>
            <div class="grid grid-cols-3 items-center">
              <span class="text-on-surface font-medium">Loudness Range</span>
              <span class="text-right text-outline">5.3 dB</span>
              <span class="text-right text-primary-fixed">6.0 dB</span>
            </div>
            <div class="grid grid-cols-3 items-center">
              <span class="text-on-surface font-medium">Professionality</span>
              <span class="text-right text-outline">48.96 %</span>
              <span class="text-right text-secondary-fixed">58.69 %</span>
            </div>
            <div class="grid grid-cols-3 items-center">
              <span class="text-on-surface font-medium">Acoustic Entropy</span>
              <span class="text-right text-outline">146.53 bit</span>
              <span class="text-right text-primary-fixed">170.74 bit</span>
            </div>
            <div class="grid grid-cols-3 items-center">
              <span class="text-on-surface font-medium">Dissonance</span>
              <span class="text-right text-outline">5.00</span>
              <span class="text-right text-primary-fixed">0.00</span>
            </div>
          </div>
        </div>
        <!-- Forensic Tools List -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-surface-container p-3 rounded hardware-bezel">
            <span class="font-label-mono text-primary-fixed block">SPECTROGRAM FFT</span>
            <span class="font-body-default text-xs text-on-surface-variant mt-1 block">Full 20Hz–22kHz spectral density heatmaps with zoom reticles.</span>
          </div>
          <div class="bg-surface-container p-3 rounded hardware-bezel">
            <span class="font-label-mono text-tertiary-fixed-dim block">LIMITING ERROR MAP</span>
            <span class="font-body-default text-xs text-on-surface-variant mt-1 block">Pinpoint micro-clipping and dynamic crest degradation visually.</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- FEATURE SHOWCASE 3: Real-Time Preview Rack & A/B Testing                  -->
  <!-- ========================================================================= -->
  <section class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b  border-gray-800/50 pb-4">
      <div>
        <span class="font-label-caps text-primary-fixed uppercase tracking-widest">AUDITING &amp; EXPORT</span>
        <h2 class="font-headline-md text-on-surface uppercase mt-1">Real-Time Preview &amp; Hardware A/B</h2>
      </div>
      <div class="font-label-mono text-outline">
        INSTANT CROSSFADE // ZERO-LATENCY BYPASS SWITCH
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <!-- Visual & Feature Embed -->
      <div class="lg:col-span-7 bg-surface-container-lowest hardware-bezel rounded-xl p-3 shadow-2xl order-2 lg:order-1">
        <div class="px-3 py-2 border-b  border-gray-800/40 flex items-center justify-between">
          <span class="font-title-rack text-outline uppercase flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-tertiary-fixed-dim"></span>
            PREVIEW RACK AUDITING BAY
          </span>
          <span class="font-label-mono text-secondary-fixed">DUAL VU NEEDLE ACTIVE</span>
        </div>
        <div class="hardware-recessed bg-black/90 rounded overflow-hidden mt-2">
          <img alt="Decibelist Preview Rack Interface" class="w-full h-auto object-cover" src="/img/products/disibalist/rack-preview.png"/>
        </div>
      </div>
      <!-- Descriptive Hardware Callouts -->
      <div class="lg:col-span-5 space-y-5 order-1 lg:order-2">
        <div class="space-y-3">
          <h3 class="font-headline-md text-on-surface uppercase text-xl font-bold">Instant Blind Auditing</h3>
          <p class="font-body-default text-outline">
            Never let loudness deceive your ears. The Preview Rack features matched-gain A/B comparison and instant bypass routing, ensuring you evaluate harmonic thickness and dynamic balance with clinical honesty.
          </p>
        </div>
        <div class="space-y-3">
          <div class="flex items-start gap-3 p-3 rounded bg-surface-container-low hardware-bezel">
            <div class="w-8 h-8 rounded bg-surface-container-lowest hardware-recessed flex items-center justify-center text-primary-fixed shrink-0">
              <span class="material-symbols-outlined text-[18px]">waves</span>
            </div>
            <div>
              <h4 class="font-title-rack text-on-surface uppercase">Color-Coded Dual Waveform</h4>
              <p class="font-body-default text-xs text-on-surface-variant mt-0.5">Electric Cyan for raw input, Golden Amber for mastered curve. Scannable phase aligned visualization.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded bg-surface-container-low hardware-bezel">
            <div class="w-8 h-8 rounded bg-surface-container-lowest hardware-recessed flex items-center justify-center text-tertiary-fixed-dim shrink-0">
              <span class="material-symbols-outlined text-[18px]">speed</span>
            </div>
            <div>
              <h4 class="font-title-rack text-on-surface uppercase">Skeuomorphic Analog Peak Meters</h4>
              <p class="font-body-default text-xs text-on-surface-variant mt-0.5">Physical ballistic needles calibrated for Left/Right peak tracking with millisecond peak-hold markers.</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded bg-surface-container-low hardware-bezel">
            <div class="w-8 h-8 rounded bg-surface-container-lowest hardware-recessed flex items-center justify-center text-secondary shrink-0">
              <span class="material-symbols-outlined text-[18px]">output</span>
            </div>
            <div>
              <h4 class="font-title-rack text-on-surface uppercase">Multi-Target Export Pipeline</h4>
              <p class="font-body-default text-xs text-on-surface-variant mt-0.5">Deliver 16-bit WAV, 24-bit studio masters, 32-bit float archives, stem packages, and compliance PDFs in a single click.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- FEATURE SHOWCASE 4: Interactive Hardware Potentiometers & Encoders        -->
  <!-- ========================================================================= -->
  <section class="bg-surface-container hardware-bezel rounded-2xl p-6 lg:p-8 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b  border-gray-800/40 pb-4">
      <div>
        <span class="font-label-caps text-primary-fixed uppercase tracking-widest">TACTILE CONTROLS</span>
        <h2 class="font-headline-md text-on-surface uppercase mt-1">Skeuomorphic Hardware Encoders</h2>
      </div>
      <span class="font-label-mono text-outline">STEPPED CALIBRATION // 0.1 dB INCREMENTS</span>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
      <!-- Knob 1: Target Loudness -->
      <div class="bg-surface-container-low hardware-bezel rounded-xl p-4 flex flex-col items-center text-center space-y-3">
        <span class="font-label-caps text-outline uppercase tracking-wider">TARGET LOUDNESS</span>
        <div class="relative w-24 h-24 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-2 border-dashed border-emerald-400/40 animate-[spin_40s_linear_infinite]"></div>
          <div class="w-16 h-16 rounded-full rotary-dial relative flex items-center justify-center cursor-pointer hover:border hover:border-primary-fixed/40 transition-all">
            <div class="w-1 h-3 bg-primary-container rounded-full absolute -top-1"></div>
            <div class="w-6 h-6 rounded-full bg-surface-container-lowest border border-outline-variant/40"></div>
          </div>
        </div>
        <div>
          <div class="font-metric-readout-lg text-primary-fixed font-bold">-6.0 dB</div>
          <span class="font-label-mono text-outline">MAX ENERGY MODE</span>
        </div>
      </div>
      <!-- Knob 2: True Peak Ceiling -->
      <div class="bg-surface-container-low hardware-bezel rounded-xl p-4 flex flex-col items-center text-center space-y-3">
        <span class="font-label-caps text-outline uppercase tracking-wider">CEILING MODE</span>
        <div class="relative w-24 h-24 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-2 border-dashed border-secondary/40"></div>
          <div class="w-16 h-16 rounded-full rotary-dial relative flex items-center justify-center cursor-pointer hover:border hover:border-secondary/40 transition-all">
            <div class="w-1 h-3 bg-secondary rounded-full absolute top-1 right-2"></div>
            <div class="w-6 h-6 rounded-full bg-surface-container-lowest border border-outline-variant/40"></div>
          </div>
        </div>
        <div>
          <div class="font-metric-readout-lg text-secondary font-bold">-0.6 DBFS</div>
          <span class="font-label-mono text-outline">TRUE PEAK LP (15k)</span>
        </div>
      </div>
      <!-- Knob 3: Low Cut Filter -->
      <div class="bg-surface-container-low hardware-bezel rounded-xl p-4 flex flex-col items-center text-center space-y-3">
        <span class="font-label-caps text-outline uppercase tracking-wider">LOW CUT HPF</span>
        <div class="relative w-24 h-24 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-2 border-dashed border-outline-variant/60"></div>
          <div class="w-16 h-16 rounded-full rotary-dial relative flex items-center justify-center cursor-pointer hover:border hover:border-primary-fixed/40 transition-all">
            <div class="w-1 h-3 bg-primary-container rounded-full absolute -top-1"></div>
            <div class="w-6 h-6 rounded-full bg-surface-container-lowest border border-outline-variant/40"></div>
          </div>
        </div>
        <div>
          <div class="font-metric-readout-lg text-on-surface font-bold">40 HZ</div>
          <span class="font-label-mono text-outline">SUB RUMBLE REMOVAL</span>
        </div>
      </div>
      <!-- Knob 4: High Cut Filter -->
      <div class="bg-surface-container-low hardware-bezel rounded-xl p-4 flex flex-col items-center text-center space-y-3">
        <span class="font-label-caps text-outline uppercase tracking-wider">HIGH CUT LPF</span>
        <div class="relative w-24 h-24 flex items-center justify-center">
          <div class="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/40"></div>
          <div class="w-16 h-16 rounded-full rotary-dial relative flex items-center justify-center cursor-pointer hover:border hover:border-amber-400/40 transition-all">
            <div class="w-1 h-3 bg-tertiary-fixed-dim rounded-full absolute -top-1"></div>
            <div class="w-6 h-6 rounded-full bg-surface-container-lowest border border-outline-variant/40"></div>
          </div>
        </div>
        <div>
          <div class="font-metric-readout-lg text-tertiary-fixed-dim font-bold">22000 HZ</div>
          <span class="font-label-mono text-outline">NYQUIST PROTECTION</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- PERFORMANCE & TECH STACK SECTION (Bento Grid)                            -->
  <!-- ========================================================================= -->
  <section class="space-y-6" id="specs">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b  border-gray-800/50 pb-4">
      <div>
        <span class="font-label-caps text-primary-fixed uppercase tracking-widest">TECHNICAL SPECIFICATION</span>
        <h2 class="font-headline-md text-on-surface uppercase mt-1">Native Hardware Performance</h2>
      </div>
      <div class="font-label-mono text-outline">
        ZERO ELECTRON BLOAT // DIRECT HW ACCELERATION
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Bento Card 1: Runtime -->
      <div class="bg-surface-container hardware-bezel rounded-xl p-6 space-y-3">
        <div class="w-10 h-10 rounded bg-surface-container-lowest hardware-recessed flex items-center justify-center text-primary-fixed">
          <span class="material-symbols-outlined">memory</span>
        </div>
        <h3 class="font-title-rack text-on-surface uppercase tracking-wider">Go + Wails 3 Architecture</h3>
        <p class="font-body-default text-on-surface-variant">
          Built from scratch on the next-gen Wails 3 runtime. Uses native Webview2 / WebKit bindings for sub-40MB RAM idle consumption, avoiding heavy Chromium runtimes.
        </p>
        <div class="pt-2 font-label-mono text-primary-fixed">
          RAM USAGE: ~38 MB IDLE
        </div>
      </div>
      <!-- Bento Card 2: DSP Engines -->
      <div class="bg-surface-container hardware-bezel rounded-xl p-6 space-y-3">
        <div class="w-10 h-10 rounded bg-surface-container-lowest hardware-recessed flex items-center justify-center text-secondary">
          <span class="material-symbols-outlined">developer_board</span>
        </div>
        <h3 class="font-title-rack text-on-surface uppercase tracking-wider">C++ Compiled DSP Kernels</h3>
        <p class="font-body-default text-on-surface-variant">
          Embedded native C++ toolchain integrating Essentia algorithms, FFmpeg audio decoding pipelines, and Phaselimiter multi-thread lookahead matrices.
        </p>
        <div class="pt-2 font-label-mono text-secondary">
          AVX2 &amp; NEON INTRINSICS ENABLED
        </div>
      </div>
      <!-- Bento Card 3: Air-Gapped Security -->
      <div class="bg-surface-container hardware-bezel rounded-xl p-6 space-y-3">
        <div class="w-10 h-10 rounded bg-surface-container-lowest hardware-recessed flex items-center justify-center text-tertiary-fixed-dim">
          <span class="material-symbols-outlined">shield</span>
        </div>
        <h3 class="font-title-rack text-on-surface uppercase tracking-wider">Total Offline Isolation</h3>
        <p class="font-body-default text-on-surface-variant">
          Guaranteed zero outbound sockets. Unreleased pre-masters, stems, and album tracks remain safely contained inside your studio facility network.
        </p>
        <div class="pt-2 font-label-mono text-tertiary-fixed-dim">
          ZERO TELEMETRY // NDA SAFE
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================================= -->
  <!-- DOWNLOAD & ACQUISITION TERMINAL SECTION                                  -->
  <!-- ========================================================================= -->
  <section class="bg-surface-container-lowest hardware-bezel rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden" id="download">
    <div class="absolute inset-0 reticle-grid pointer-events-none opacity-40"></div>
    <div class="relative z-10 max-w-3xl mx-auto text-center space-y-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container border border-outline-variant font-label-mono text-primary-fixed uppercase tracking-wider">
        <span class="material-symbols-outlined text-[14px]">terminal</span>
        RELEASE DISTRIBUTION v0.4-STABLE
      </div>
      <h2 class="font-headline-lg text-on-surface uppercase tracking-tight text-2xl sm:text-3xl font-bold">
        Mount Decibelist in Your Studio
      </h2>
      <p class="font-body-default text-outline max-w-xl mx-auto">
        Download the stand-alone desktop rack for your primary operating environment. Comes pre-bundled with all neural weights, feature extractors, and brickwall limiters.
      </p>
      <!-- OS Selection Cluster -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
        <!-- macOS -->
        <div class="bg-surface-container p-4 rounded-lg hardware-bezel hover:border-primary-fixed/60 transition-all cursor-pointer group">
          <div class="flex items-center justify-between">
            <span class="font-title-rack text-on-surface uppercase font-bold">macOS</span>
            <span class="material-symbols-outlined text-outline group-hover:text-primary-fixed text-[20px]">laptop_mac</span>
          </div>
          <div class="font-label-mono text-outline mt-2">Universal (Apple Silicon &amp; Intel)</div>
          <div class="font-label-mono text-primary-fixed mt-1">DMG // 68.4 MB</div>
        </div>
        <!-- Windows -->
        <div class="bg-surface-container p-4 rounded-lg hardware-bezel hover:border-primary-fixed/60 transition-all cursor-pointer group border-primary-fixed/30 bg-surface-container-high">
          <div class="flex items-center justify-between">
            <span class="font-title-rack text-primary-fixed uppercase font-bold">Windows</span>
            <span class="material-symbols-outlined text-primary-fixed text-[20px]">desktop_windows</span>
          </div>
          <div class="font-label-mono text-outline mt-2">Windows 10 / 11 (64-bit)</div>
          <div class="font-label-mono text-primary-fixed mt-1">MSI / EXE // 72.1 MB</div>
        </div>
        <!-- Linux -->
        <div class="bg-surface-container p-4 rounded-lg hardware-bezel hover:border-primary-fixed/60 transition-all cursor-pointer group">
          <div class="flex items-center justify-between">
            <span class="font-title-rack text-on-surface uppercase font-bold">Linux</span>
            <span class="material-symbols-outlined text-outline group-hover:text-primary-fixed text-[20px]">terminal</span>
          </div>
          <div class="font-label-mono text-outline mt-2">Ubuntu / Arch / Debian</div>
          <div class="font-label-mono text-primary-fixed mt-1">AppImage / deb // 64.9 MB</div>
        </div>
      </div>
    </div>
  </section>
</div>
