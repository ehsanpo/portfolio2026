---
title: "0perator"
title2: "Local Delivery Operations Hub"
description: "A local-first delivery operations hub with zero telemetry, encrypted at rest with SQLCipher AES-256 and powered by Wails v3 + Go."
date: "2026-03-20"
status: "publish"
permalink: "0perator"
author: "Ehsan"
type: "product"
id: 319
agency: "Personal Project"
category:
  - Desktop Apps
  - Logistics
  - Go
tag:
  - Go
  - Wails v3
  - SQLCipher
  - SQLite
  - Air-Gapped
  - Logistics
  - Route Optimization
  - Prophet AI
client: "Self"
tagline: "Local-First Delivery Operations Hub with Zero Telemetry"
background_image: "warehouse.png"
logo: "logo.png"
cover: "ticket.png"
images:
  - "routeplaner.png"
  - "warehouse.png"
  - "ticket.png"
  - "brain.png"
  - "reports.png"
  - "contacts.png"
  - "meny.png"
  - "add.png"
port_date: "2026"
onHome: true
---

<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet"/>
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

  /* Technical Grid Sub-styling */
  .tech-grid {
    background-size: 32px 32px;
    background-image: 
      linear-gradient(to right, rgba(51, 65, 85, 0.25) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(51, 65, 85, 0.25) 1px, transparent 1px);
  }

  /* 0perator Color Palette Overrides */
  .bg-surface { background-color: #111827 !important; }
  .bg-surface-dim { background-color: #0c1321 !important; }
  .bg-surface-elevated { background-color: #1F2937 !important; }
  .bg-surface-container-lowest { background-color: #070e1c !important; }
  .bg-surface-container-low { background-color: #151b2a !important; }
  .bg-surface-container { background-color: #19202e !important; }
  .bg-surface-container-high { background-color: #232a39 !important; }
  .bg-surface-container-highest { background-color: #2e3544 !important; }
  .bg-primary-container { background-color: #60a5fa !important; }
  .bg-secondary-container { background-color: #00d2ff !important; }
  .bg-info-soft { background-color: #082F49 !important; }
  .bg-warning-soft { background-color: #451A03 !important; }
  .bg-success-soft { background-color: #052E16 !important; }
  .bg-danger-soft { background-color: #450A0A !important; }

  .text-text-primary { color: #F8FAFC !important; }
  .text-text-secondary { color: #E2E8F0 !important; }
  .text-text-tertiary { color: #CBD5E1 !important; }
  .text-text-muted { color: #94A3B8 !important; }
  .text-primary-foreground { color: #0F172A !important; }
  .text-secondary-container { color: #00d2ff !important; }
  .text-info { color: #38BDF8 !important; }
  .text-success { color: #22C55E !important; }
  .text-warning { color: #FBBF24 !important; }
  .text-danger { color: #F87171 !important; }

  .border-border { border-color: #334155 !important; }
  .border-border-strong { border-color: #475569 !important; }
  .border-info { border-color: #38BDF8 !important; }
  .border-success { border-color: #22C55E !important; }
  .border-warning { border-color: #FBBF24 !important; }
  .border-danger { border-color: #F87171 !important; }
  .border-secondary-container { border-color: #00d2ff !important; }

  /* Typography Scale */
  .font-headline-xl { font-family: 'JetBrains Mono', monospace !important; font-size: 32px; line-height: 40px; letter-spacing: -0.02em; font-weight: 700; }
  .font-headline-lg { font-family: 'JetBrains Mono', monospace !important; font-size: 24px; line-height: 32px; letter-spacing: -0.01em; font-weight: 700; }
  .font-headline-md { font-family: 'JetBrains Mono', monospace !important; font-size: 18px; line-height: 26px; letter-spacing: -0.005em; font-weight: 600; }
  .font-headline-sm { font-family: 'JetBrains Mono', monospace !important; font-size: 14px; line-height: 20px; letter-spacing: 0em; font-weight: 600; }
  .font-body-lg { font-family: 'Inter', sans-serif !important; font-size: 16px; line-height: 24px; font-weight: 400; }
  .font-body-md { font-family: 'Inter', sans-serif !important; font-size: 14px; line-height: 20px; font-weight: 400; }
  .font-body-sm { font-family: 'Inter', sans-serif !important; font-size: 12px; line-height: 18px; font-weight: 400; }
  .font-label-lg { font-family: 'JetBrains Mono', monospace !important; font-size: 13px; line-height: 18px; letter-spacing: 0.02em; font-weight: 500; }
  .font-label-md { font-family: 'JetBrains Mono', monospace !important; font-size: 12px; line-height: 16px; letter-spacing: 0.04em; font-weight: 500; }
  .font-label-sm { font-family: 'JetBrains Mono', monospace !important; font-size: 11px; line-height: 14px; letter-spacing: 0.05em; font-weight: 600; }
</style>

<div class="w-full text-text-primary space-y-12 tech-grid py-4">

  <!-- Operational Air-Gap Banner Strip -->
  <aside aria-label="System status" class="w-full bg-surface-container-lowest border border-border rounded-lg py-2 px-4 md:px-6 flex flex-wrap items-center justify-between text-label-sm font-label-sm gap-2">
    <div class="flex items-center gap-2 text-secondary-container">
      <span class="inline-block w-2 h-2 rounded-full bg-secondary-container animate-pulse shadow-[0_0_8px_rgba(0,210,255,0.7)]"></span>
      <span class="tracking-widest uppercase">LOCAL AIR-GAP READY / ZERO CLOUD DEPENDENCY</span>
    </div>
    <div class="hidden sm:flex items-center gap-4 text-text-muted">
      <span>SQLCipher AES-256 WAL: <strong class="text-success font-normal">ENCRYPTED</strong></span>
      <span class="text-border">|</span>
      <span>DAEMON: <strong class="text-text-primary font-normal">BACKGROUND TRAY ACTIVE</strong></span>
    </div>
  </aside>

  <!-- In-Page Sticky Tactical Navigation Bar -->
  <div class="sticky top-20 z-40 w-full border border-border bg-surface-container-lowest/95 backdrop-blur-md px-4 md:px-6 py-3 rounded-xl shadow-xl">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <!-- Brand Logo / Product Name -->
      <div class="flex items-center gap-3">
        <div class="relative w-8 h-8 rounded bg-surface border border-border flex items-center justify-center overflow-hidden">
          <img alt="0perator System Emblem" class="w-6 h-6 object-contain" src="/img/products/0perator/logo.png">
        </div>
        <div class="flex flex-col">
          <span class="text-headline-md font-headline-md tracking-tight font-bold text-text-primary">0perator</span>
          <span class="text-[10px] font-label-sm text-text-muted tracking-wider leading-none">DISPATCH ENGINE v3.2</span>
        </div>
      </div>
      <!-- Desktop Navigation Links -->
      <nav class="hidden lg:flex items-center space-x-6 text-label-md font-label-md">
        <a class="text-secondary-container font-medium border-b-2 border-secondary-container pb-1 transition-all duration-150" href="#core-engine">Operations Core</a>
        <a class="text-text-muted hover:text-text-primary transition-colors py-1" href="#route-planner">Architecture</a>
        <a class="text-text-muted hover:text-text-primary transition-colors py-1" href="#security-specs">Security Specs</a>
        <a class="text-text-muted hover:text-text-primary transition-colors py-1" href="#comparison">Comparison</a>
      </nav>
    </div>
  </div>

  <!-- Hero Section: Tactical Mission Control -->
  <section class="relative pt-4 pb-8 overflow-hidden">
    <!-- Glow Gradients -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary-container/10 blur-[130px] pointer-events-none rounded-full"></div>
    <div class="max-w-6xl mx-auto">
      <!-- Hero Header Cluster -->
      <div class="text-center max-w-4xl mx-auto mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-info-soft border border-info text-info text-label-sm font-label-sm mb-6">
          <span class="inline-block w-2 h-2 rounded-full bg-info animate-ping"></span>
          <span>BUILT FOR HIGH-TEMPO DISPATCH OPERATIONS • 100% LOCAL-FIRST</span>
        </div>
        <h1 class="text-headline-xl font-headline-xl text-text-primary mb-6 leading-tight text-3xl sm:text-4xl md:text-5xl">
          Local-First Delivery Operations Hub with <span class="text-transparent bg-clip-text bg-gradient-to-r from-secondary-container via-info to-primary-container">Zero Telemetry</span>
        </h1>
        <p class="text-body-lg font-body-lg text-text-muted max-w-3xl mx-auto mb-8">
          Engineered for dispatchers, couriers, and warehouse managers who demand absolute privacy, zero cloud subscription fees, and microsecond desktop responsiveness. Encrypted at rest with SQLCipher AES-256.
        </p>
        <!-- CTAs & Platforms -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a class="inline-flex items-center gap-2 px-5 py-3.5 bg-surface border border-border text-text-secondary font-headline-sm rounded hover:bg-surface-elevated hover:border-border-strong transition-all active:scale-95" href="#security-specs">
            <span class="material-symbols-outlined text-info" data-icon="data_object">data_object</span>
            <span>Explore Architecture Docs</span>
          </a>
        </div>
        <!-- Specs Ticker Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-2 bg-surface-container-low border border-border rounded text-label-sm font-label-sm text-text-secondary">
          <div class="flex items-center justify-center gap-1.5 px-3 py-1 bg-surface rounded">
            <span class="text-success material-symbols-outlined text-sm" data-icon="bolt">bolt</span>
            <span>0ms Cloud Latency</span>
          </div>
          <div class="flex items-center justify-center gap-1.5 px-3 py-1 bg-surface rounded">
            <span class="text-info material-symbols-outlined text-sm" data-icon="shield">shield</span>
            <span>Zero Telemetry</span>
          </div>
          <div class="flex items-center justify-center gap-1.5 px-3 py-1 bg-surface rounded">
            <span class="text-warning material-symbols-outlined text-sm" data-icon="key">key</span>
            <span>SQLCipher AES-256</span>
          </div>
          <div class="flex items-center justify-center gap-1.5 px-3 py-1 bg-surface rounded">
            <span class="text-secondary-container material-symbols-outlined text-sm" data-icon="password">password</span>
            <span>Argon2id Master PIN</span>
          </div>
          <div class="flex items-center justify-center gap-1.5 px-3 py-1 bg-surface rounded col-span-2 sm:col-span-1">
            <span class="text-primary-container material-symbols-outlined text-sm" data-icon="memory">memory</span>
            <span>Wails v3 + Go Core</span>
          </div>
        </div>
      </div>
      <!-- High-Fidelity Hero Workstation Mockup (Dispatch Console) -->
      <div class="relative rounded-xl border border-border-strong bg-surface shadow-[0_25px_50px_-12px_rgba(2,6,23,0.85)] overflow-hidden">
        <!-- Mockup Title Bar -->
        <div class="h-10 bg-surface-container-lowest border-b border-border flex items-center justify-between px-4 text-label-sm font-label-sm select-none">
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1.5 mr-2">
              <span class="w-3 h-3 rounded-full bg-danger border border-danger/60 inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-warning border border-warning/60 inline-block"></span>
              <span class="w-3 h-3 rounded-full bg-success border border-success/60 inline-block"></span>
            </div>
            <div class="flex items-center gap-1 text-text-muted">
              <img alt="0perator" class="w-3.5 h-3.5 inline-block opacity-80" src="/img/products/0perator/logo.png">
              <span class="text-text-secondary">0perator Client Workstation</span>
              <span class="text-border">/</span>
              <span class="text-text-muted">Central Hub Stockholm South</span>
            </div>
          </div>
          <div class="flex items-center gap-3 text-text-muted">
            <span class="flex items-center gap-1 text-success">
              <span class="w-1.5 h-1.5 rounded-full bg-success"></span>
              <span>DAEMON SYNC 100%</span>
            </span>
            <span class="bg-surface-elevated px-2 py-0.5 rounded text-[10px] text-text-secondary border border-border">PID: 40924</span>
          </div>
        </div>
        <!-- Real Screenshot Display -->
        <div class="bg-surface-container-lowest p-2">
          <img src="/img/products/0perator/routeplaner.png" alt="0perator Dispatch Console Workstation Interface" class="w-full h-auto object-cover rounded border border-border shadow-inner" />
        </div>
      </div>
    </div>
  </section>

  <!-- Core Capabilities Matrix (6-Grid Bento) -->
  <section class="py-12 border-t border-border bg-surface-container-lowest/60 rounded-2xl p-6" id="core-engine">
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-10">
      <div>
        <div class="text-label-sm font-label-sm text-secondary-container uppercase tracking-wider mb-2">Instrument-Grade Control</div>
        <h2 class="text-headline-lg font-headline-lg text-text-primary text-2xl md:text-3xl">Complete Operational Dispatch Subsystems</h2>
      </div>
      <p class="text-text-muted max-w-md mt-4 md:mt-0 text-body-md font-body-md">
        Purpose-built for zero-friction distribution centers. No cloud sync hangs, no web browser bloat, no subscription locks.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <article class="bg-surface p-5 rounded-xl border border-border hover:border-info transition-all duration-200 flex flex-col justify-between overflow-hidden">
        <div>
          <div class="w-10 h-10 rounded bg-info-soft border border-info flex items-center justify-center text-info mb-4">
            <span class="material-symbols-outlined" data-icon="scale">scale</span>
          </div>
          <h3 class="text-headline-md font-headline-md text-text-primary mb-2">Warehouse &amp; Packing Conversion</h3>
          <p class="text-body-md font-body-md text-text-muted mb-4">
            Dual stock tracking bridges the gap between bulk storage and field dispatch. Real-time yield calculators (1 kg → 143 bags) automatically update driver stashes and prevent phantom inventory drift.
          </p>
        </div>
        <div class="rounded overflow-hidden mb-3 border border-border bg-surface-container-lowest">
          <img src="/img/products/0perator/warehouse.png" alt="Warehouse Subsystem" class="w-full h-36 object-cover object-top hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="p-2.5 bg-surface-container rounded border border-border font-label-sm text-label-sm text-secondary-container">
          • Auto Yield Reconciliation • Immutable Driver Stashes
        </div>
      </article>
      <!-- Card 2 -->
      <article class="bg-surface p-5 rounded-xl border border-border hover:border-info transition-all duration-200 flex flex-col justify-between overflow-hidden" id="route-planner">
        <div>
          <div class="w-10 h-10 rounded bg-info-soft border border-info flex items-center justify-center text-info mb-4">
            <span class="material-symbols-outlined" data-icon="alt_route">alt_route</span>
          </div>
          <h3 class="text-headline-md font-headline-md text-text-primary mb-2">Route Planner &amp; 2-Opt TSP</h3>
          <p class="text-body-md font-body-md text-text-muted mb-4">
            Native traveling salesperson problem (TSP) algorithm with 2-Opt heuristic. Features offline Swedish address autocomplete, driver rest break insertions (10/20/30m), and dynamic real-time ETA recalculations.
          </p>
        </div>
        <div class="rounded overflow-hidden mb-3 border border-border bg-surface-container-lowest">
          <img src="/img/products/0perator/routeplaner.png" alt="Route Planner Subsystem" class="w-full h-36 object-cover object-top hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="p-2.5 bg-surface-container rounded border border-border font-label-sm text-label-sm text-secondary-container">
          • 2-Opt Sub-second Recalculation • Street Index Cache
        </div>
      </article>
      <!-- Card 3 -->
      <article class="bg-surface p-5 rounded-xl border border-border hover:border-info transition-all duration-200 flex flex-col justify-between overflow-hidden">
        <div>
          <div class="w-10 h-10 rounded bg-info-soft border border-info flex items-center justify-center text-info mb-4">
            <span class="material-symbols-outlined" data-icon="mark_chat_unread">mark_chat_unread</span>
          </div>
          <h3 class="text-headline-md font-headline-md text-text-primary mb-2">Signal &amp; WhatsApp Ticket Inbox</h3>
          <p class="text-body-md font-body-md text-text-muted mb-4">
            Unified dispatch messaging console that respects disappearing timers on customer channels while maintaining permanent encrypted dispatcher notes. One-click conversion from direct message to manifest order.
          </p>
        </div>
        <div class="rounded overflow-hidden mb-3 border border-border bg-surface-container-lowest">
          <img src="/img/products/0perator/ticket.png" alt="Ticket Inbox Subsystem" class="w-full h-36 object-cover object-top hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="p-2.5 bg-surface-container rounded border border-border font-label-sm text-label-sm text-secondary-container">
          • Disappearing Timer Sync • 1-Click Manifest Gen
        </div>
      </article>
      <!-- Card 4 -->
      <article class="bg-surface p-5 rounded-xl border border-border hover:border-info transition-all duration-200 flex flex-col justify-between overflow-hidden">
        <div>
          <div class="w-10 h-10 rounded bg-info-soft border border-info flex items-center justify-center text-info mb-4">
            <span class="material-symbols-outlined" data-icon="psychology">psychology</span>
          </div>
          <h3 class="text-headline-md font-headline-md text-text-primary mb-2">Brain 2.0 AI Forecasting</h3>
          <p class="text-body-md font-body-md text-text-muted mb-4">
            Embedded local Facebook Prophet time-series engine. Predicts stockout depletion velocity and courier load using a 7-day blended moving average—all evaluated on bare-metal Go without external API calls.
          </p>
        </div>
        <div class="rounded overflow-hidden mb-3 border border-border bg-surface-container-lowest">
          <img src="/img/products/0perator/brain.png" alt="Brain AI Forecasting" class="w-full h-36 object-cover object-top hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="p-2.5 bg-surface-container rounded border border-border font-label-sm text-label-sm text-secondary-container">
          • Embedded Prophet Model • Zero External API Latency
        </div>
      </article>
      <!-- Card 5 -->
      <article class="bg-surface p-5 rounded-xl border border-border hover:border-info transition-all duration-200 flex flex-col justify-between overflow-hidden">
        <div>
          <div class="w-10 h-10 rounded bg-info-soft border border-info flex items-center justify-center text-info mb-4">
            <span class="material-symbols-outlined" data-icon="dock">dock</span>
          </div>
          <h3 class="text-headline-md font-headline-md text-text-primary mb-2">System Tray &amp; Background Daemons</h3>
          <p class="text-body-md font-body-md text-text-muted mb-4">
            Designed to run silently in the system tray. Closing the window minimizes to tray; background daemons continue batch message transmissions with jitter throttling to prevent carrier IP blacklists.
          </p>
        </div>
        <div class="rounded overflow-hidden mb-3 border border-border bg-surface-container-lowest">
          <img src="/img/products/0perator/meny.png" alt="System Tray Menu" class="w-full h-36 object-cover object-top hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="p-2.5 bg-surface-container rounded border border-border font-label-sm text-label-sm text-secondary-container">
          • Minimize-to-Tray Daemon • Adaptive Broadcast Jitter
        </div>
      </article>
      <!-- Card 6 -->
      <article class="bg-surface p-5 rounded-xl border border-border hover:border-info transition-all duration-200 flex flex-col justify-between overflow-hidden">
        <div>
          <div class="w-10 h-10 rounded bg-info-soft border border-info flex items-center justify-center text-info mb-4">
            <span class="material-symbols-outlined" data-icon="payments">payments</span>
          </div>
          <h3 class="text-headline-md font-headline-md text-text-primary mb-2">Cash Drops &amp; Kassa Settlement</h3>
          <p class="text-body-md font-body-md text-text-muted mb-4">
            End-of-shift physical cash accounting. Immutable double-entry audit trails verify driver drops, tally item commissions in SEK, and produce encrypted export slips for offline accounting safes.
          </p>
        </div>
        <div class="rounded overflow-hidden mb-3 border border-border bg-surface-container-lowest">
          <img src="/img/products/0perator/reports.png" alt="Cash Drops and Reports" class="w-full h-36 object-cover object-top hover:scale-105 transition-transform duration-300" />
        </div>
        <div class="p-2.5 bg-surface-container rounded border border-border font-label-sm text-label-sm text-secondary-container">
          • Strict SEK Reconciliation • Audit-Proof Ledger Entries
        </div>
      </article>
    </div>
  </section>

  <!-- Security & Architecture Deep Dive -->
  <section class="py-12 border-t border-border" id="security-specs">
    <div class="max-w-3xl mb-10">
      <div class="text-label-sm font-label-sm text-info uppercase tracking-wider mb-2">Hardened Runtime Defense</div>
      <h2 class="text-headline-lg font-headline-lg text-text-primary text-2xl md:text-3xl mb-3">Zero Trust, Local Cipher, Zero Cloud Leaks</h2>
      <p class="text-text-muted text-body-lg font-body-lg">
        0perator treats the internet as hostile territory. The system operates strictly within an air-gapped mental model, encrypting all disk blocks before they hit your NVMe drive.
      </p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Code Architecture Visual Tree -->
      <div class="lg:col-span-5 bg-surface border border-border rounded-xl p-5 font-headline-sm text-body-sm overflow-x-auto">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-border text-label-sm font-label-sm">
          <span class="text-text-secondary">0perator Core File Hierarchy</span>
          <span class="text-info font-mono">Go 1.22 + Wails v3</span>
        </div>
        <div class="space-y-1.5 text-text-muted font-mono text-[13px]">
          <div class="text-text-primary font-bold">0perator-engine/</div>
          <div class="pl-4 text-secondary-container">└── app/main.go <span class="text-text-muted text-[11px]">// Window lifecycle &amp; tray hook</span></div>
          <div class="pl-4 text-text-secondary">└── internal/core/</div>
          <div class="pl-8 text-primary">│&nbsp;&nbsp;└── db.go <span class="text-text-muted text-[11px]">// SQLCipher cipher_version 4.x</span></div>
          <div class="pl-8 text-primary">│&nbsp;&nbsp;└── database_service.go <span class="text-text-muted text-[11px]">// AES-256 WAL transaction lock</span></div>
          <div class="pl-8 text-text-secondary">│&nbsp;&nbsp;└── tsp_router.go <span class="text-text-muted text-[11px]">// 2-Opt route optimizer in Go</span></div>
          <div class="pl-8 text-warning">│&nbsp;&nbsp;└── brain_service.go <span class="text-text-muted text-[11px]">// Prophet time-series algorithm</span></div>
          <div class="pl-4 text-text-secondary">└── internal/messaging/</div>
          <div class="pl-8 text-info">│&nbsp;&nbsp;└── signal_service.go <span class="text-text-muted text-[11px]">// Signal protocol IPC pipe</span></div>
          <div class="pl-8 text-success">│&nbsp;&nbsp;└── whatsapp_service.go <span class="text-text-muted text-[11px]">// Local QR Multi-device daemon</span></div>
          <div class="pl-4 text-text-secondary">└── storage/</div>
          <div class="pl-8 text-danger">└── operator.db.enc <span class="text-text-muted text-[11px]">// AES-256 SQLCipher encrypted payload</span></div>
        </div>
        <div class="mt-4 pt-3 border-t border-border flex items-center justify-between text-label-sm font-label-sm text-text-muted">
          <span>ZERO NETWORK SOCKETS BIND TO CLOUD</span>
          <span class="text-success font-bold">100% AIR-GAP</span>
        </div>
      </div>
      <!-- Cryptographic Details & Backup Architecture -->
      <div class="lg:col-span-7 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Detail Card 1 -->
          <div class="bg-surface p-5 rounded-xl border border-border">
            <div class="flex items-center gap-2 text-warning mb-2">
              <span class="material-symbols-outlined text-lg" data-icon="lock">lock</span>
              <h4 class="font-headline-sm text-headline-sm text-text-primary">Argon2id Master PIN</h4>
            </div>
            <p class="text-body-sm font-body-sm text-text-muted">
              Passphrase hashing configured with 64 MB memory cost, 4 parallel threads, and 3 iterations. Resists GPU and ASIC brute-force rainbow tables.
            </p>
            <div class="mt-3 text-[11px] font-label-sm text-warning bg-warning-soft px-2 py-1 rounded border border-warning/40">
              Memory-Hard KDF Verification
            </div>
          </div>
          <!-- Detail Card 2 -->
          <div class="bg-surface p-5 rounded-xl border border-border">
            <div class="flex items-center gap-2 text-info mb-2">
              <span class="material-symbols-outlined text-lg" data-icon="database">database</span>
              <h4 class="font-headline-sm text-headline-sm text-text-primary">SQLCipher WAL Mode</h4>
            </div>
            <p class="text-body-sm font-body-sm text-text-muted">
              Write-Ahead Logging provides microsecond disk transactions without read locks. Zero plaintext leakage to swap space or operating system memory dumps.
            </p>
            <div class="mt-3 text-[11px] font-label-sm text-info bg-info-soft px-2 py-1 rounded border border-info/40">
              Page-level HMAC Checksumming
            </div>
          </div>
        </div>
        <!-- Security Review Section -->
        <div class="bg-surface-elevated p-6 rounded-xl border border-border">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-2 text-info">
              <span class="material-symbols-outlined" data-icon="verified_user">verified_user</span>
              <h4 class="font-headline-sm text-headline-sm text-text-primary">Security Reviewed</h4>
            </div>
            <span class="text-label-sm font-label-sm text-info font-mono bg-info-soft px-2.5 py-1 rounded border border-info/40">Security analysis by Oplane</span>
          </div>
          <p class="text-body-md font-body-md text-text-muted mb-4">
            We take application security seriously. Our app has been security-scanned using Oplane to help identify potential vulnerabilities and assess architectural risks. This is part of our commitment to building a more secure, reliable, and trustworthy product.
          </p>
          <div class="mt-4 flex flex-wrap items-center gap-3 text-label-sm font-label-sm text-text-muted">
            <span class="text-success">✓ Vulnerability Surface Assessment</span>
            <span class="text-border">|</span>
            <span class="text-success">✓ Architectural Risk Analysis</span>
            <span class="text-border">|</span>
            <span class="text-success">✓ Continuous Security Commitment</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Local-First vs Cloud Dispatch SaaS Table -->
  <section class="py-12 border-t border-border bg-surface-container-lowest/60 rounded-2xl p-6" id="comparison">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <div class="text-label-sm font-label-sm text-secondary-container uppercase tracking-wider mb-2">Direct Architecture Comparison</div>
      <h2 class="text-headline-lg font-headline-lg text-text-primary text-2xl md:text-3xl mb-3">0perator vs. Monolithic Cloud SaaS</h2>
      <p class="text-text-muted text-body-md font-body-md">
        Compare our local-first dispatch client against mainstream delivery SaaS providers.
      </p>
    </div>
    <div class="overflow-x-auto rounded-xl border border-border">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-surface-dim border-b border-border text-label-sm font-label-sm text-text-muted uppercase">
            <th class="p-4">Operational Dimension</th>
            <th class="p-4 bg-surface-elevated/50 text-secondary-container">0perator Desktop (v3.2)</th>
            <th class="p-4">Standard Cloud Dispatch SaaS</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border border-border text-body-md font-body-md">
          <tr class="hover:bg-surface-elevated transition-colors">
            <td class="p-4 font-medium text-text-primary flex items-center gap-2">
              <span class="material-symbols-outlined text-info text-base" data-icon="paid">paid</span>
              Software Licensing &amp; Monthly Fees
            </td>
            <td class="p-4 font-headline-sm text-success font-bold bg-surface-elevated/30">
              $0 / Month (100% Free &amp; Open Source)
            </td>
            <td class="p-4 text-text-muted">
              $399 - $899+ / Month per dispatcher
            </td>
          </tr>
          <tr class="hover:bg-surface-elevated transition-colors">
            <td class="p-4 font-medium text-text-primary flex items-center gap-2">
              <span class="material-symbols-outlined text-info text-base" data-icon="hard_drive">hard_drive</span>
              Data Storage &amp; Master Ledger
            </td>
            <td class="p-4 font-headline-sm text-text-primary bg-surface-elevated/30">
              100% On-Disk Encrypted (SQLCipher AES-256)
            </td>
            <td class="p-4 text-text-muted">
              Third-party multi-tenant AWS / GCP cluster
            </td>
          </tr>
          <tr class="hover:bg-surface-elevated transition-colors">
            <td class="p-4 font-medium text-text-primary flex items-center gap-2">
              <span class="material-symbols-outlined text-info text-base" data-icon="cloud_off">cloud_off</span>
              Network Outage &amp; ISP Downtime
            </td>
            <td class="p-4 font-headline-sm text-success font-bold bg-surface-elevated/30">
              Zero Interruption (Fully Functional Offline)
            </td>
            <td class="p-4 text-danger">
              Total Operational Halt (Web App Unusable)
            </td>
          </tr>
          <tr class="hover:bg-surface-elevated transition-colors">
            <td class="p-4 font-medium text-text-primary flex items-center gap-2">
              <span class="material-symbols-outlined text-info text-base" data-icon="speed">speed</span>
              Interface Latency &amp; Dispatch Velocity
            </td>
            <td class="p-4 font-headline-sm text-secondary-container font-bold bg-surface-elevated/30">
              &lt; 1 millisecond (Native Wails v3 + Go)
            </td>
            <td class="p-4 text-text-muted">
              450ms - 1,800ms HTTP REST Latency
            </td>
          </tr>
          <tr class="hover:bg-surface-elevated transition-colors">
            <td class="p-4 font-medium text-text-primary flex items-center gap-2">
              <span class="material-symbols-outlined text-info text-base" data-icon="fingerprint">fingerprint</span>
              Customer Phone Numbers &amp; Telemetry
            </td>
            <td class="p-4 font-headline-sm text-success font-bold bg-surface-elevated/30">
              Strict Zero Telemetry &amp; RAM-only Redaction
            </td>
            <td class="p-4 text-warning">
              Aggregated, analyzed, &amp; logged by vendor
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- Download Release & SHA-256 Verification Call To Action -->
  <section class="py-12 border-t border-border" id="download">
    <div class="rounded-2xl border border-border-strong bg-surface p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      <div class="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container border border-border font-label-sm text-info uppercase tracking-wider">
          <span class="material-symbols-outlined text-[14px]">terminal</span>
          RELEASE DISTRIBUTION v3.2-STABLE
        </div>
        <h2 class="font-headline-lg text-text-primary text-2xl sm:text-3xl font-bold">
          Deploy 0perator to Your Dispatch Center
        </h2>
        <p class="text-body-md font-body-md text-text-muted max-w-xl mx-auto">
          Download the stand-alone desktop client for your primary operating environment. Pre-bundled with embedded SQLite/SQLCipher database drivers and 2-Opt route solvers.
        </p>
        <!-- OS Selection Cluster -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
          <!-- Windows -->
          <div class="bg-surface-container p-4 rounded-xl border border-info/40 bg-surface-container-high transition-all cursor-pointer">
            <div class="flex items-center justify-between">
              <span class="font-headline-sm text-info uppercase font-bold">Windows</span>
              <span class="material-symbols-outlined text-info text-[20px]">desktop_windows</span>
            </div>
            <div class="font-label-sm text-text-muted mt-2">Windows 10 / 11 (64-bit)</div>
            <div class="font-label-sm text-info mt-1 font-mono">MSI / EXE // 42.1 MB</div>
          </div>
          <!-- macOS -->
          <div class="bg-surface-container p-4 rounded-xl border border-border hover:border-info/60 transition-all cursor-pointer">
            <div class="flex items-center justify-between">
              <span class="font-headline-sm text-text-primary uppercase font-bold">macOS</span>
              <span class="material-symbols-outlined text-text-muted text-[20px]">laptop_mac</span>
            </div>
            <div class="font-label-sm text-text-muted mt-2">Universal (Apple Silicon &amp; Intel)</div>
            <div class="font-label-sm text-text-primary mt-1 font-mono">DMG // 38.4 MB</div>
          </div>
          <!-- Linux -->
          <div class="bg-surface-container p-4 rounded-xl border border-border hover:border-info/60 transition-all cursor-pointer">
            <div class="flex items-center justify-between">
              <span class="font-headline-sm text-text-primary uppercase font-bold">Linux</span>
              <span class="material-symbols-outlined text-text-muted text-[20px]">terminal</span>
            </div>
            <div class="font-label-sm text-text-muted mt-2">Ubuntu / Arch / Debian</div>
            <div class="font-label-sm text-text-primary mt-1 font-mono">AppImage / deb // 34.9 MB</div>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>
