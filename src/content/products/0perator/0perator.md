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
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

<style>
  .operator-page .material-symbols-outlined {
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

  .operator-page .bg-surface { background-color: #111722 !important; }
  .operator-page .bg-surface-dim { background-color: #0D1118 !important; }
  .operator-page .bg-surface-elevated { background-color: #151C28 !important; }
  .operator-page .bg-surface-container-lowest { background-color: #080B10 !important; }
  .operator-page .bg-surface-container-low { background-color: #0D1118 !important; }
  .operator-page .bg-surface-container { background-color: #111722 !important; }
  .operator-page .bg-surface-container-high,
  .operator-page .bg-surface-container-highest { background-color: #151C28 !important; }
  .operator-page .bg-primary-container,
  .operator-page .bg-secondary-container { background-color: #34D399 !important; }
  .operator-page .bg-info-soft,
  .operator-page .bg-success-soft { background-color: #0D2C24 !important; }
  .operator-page .bg-warning-soft { background-color: #451A03 !important; }
  .operator-page .bg-danger-soft { background-color: #450A0A !important; }

  .operator-page .text-text-primary { color: #EDEDED !important; }
  .operator-page .text-text-secondary { color: #CED5DE !important; }
  .operator-page .text-text-tertiary { color: #AEB8C5 !important; }
  .operator-page .text-text-muted { color: #8B95A5 !important; }
  .operator-page .text-primary-foreground { color: #080B10 !important; }
  .operator-page .text-primary,
  .operator-page .text-secondary-container,
  .operator-page .text-info,
  .operator-page .text-success { color: #34D399 !important; }
  .operator-page .text-warning { color: #FBBF24 !important; }
  .operator-page .text-danger { color: #F87171 !important; }

  .operator-page .border-border { border-color: #202936 !important; }
  .operator-page .border-border-strong { border-color: #2B3544 !important; }
  .operator-page .border-info,
  .operator-page .border-secondary-container,
  .operator-page .border-success { border-color: #34D399 !important; }
  .operator-page .border-warning { border-color: #FBBF24 !important; }
  .operator-page .border-danger { border-color: #F87171 !important; }
  .operator-page .hover\:border-info:hover { border-color: #34D399 !important; }

  .operator-page {
    background-color: #080B10;
    color: #EDEDED;
    font-family: 'JetBrains Mono', monospace;
  }
  .operator-page .font-mono { font-family: 'JetBrains Mono', monospace !important; }
  .operator-page .font-headline-xl { font-family: 'Rajdhani', sans-serif !important; font-size: 32px; line-height: 40px; letter-spacing: -0.02em; font-weight: 700; }
  .operator-page .font-headline-lg { font-family: 'Rajdhani', sans-serif !important; font-size: 24px; line-height: 32px; letter-spacing: -0.01em; font-weight: 700; }
  .operator-page .font-headline-md { font-family: 'Rajdhani', sans-serif !important; font-size: 18px; line-height: 26px; letter-spacing: -0.005em; font-weight: 600; }
  .operator-page .font-headline-sm { font-family: 'Rajdhani', sans-serif !important; font-size: 14px; line-height: 20px; letter-spacing: 0em; font-weight: 600; }
  .operator-page .font-body-lg { font-family: 'JetBrains Mono', monospace !important; font-size: 16px; line-height: 24px; font-weight: 400; }
  .operator-page .font-body-md { font-family: 'JetBrains Mono', monospace !important; font-size: 14px; line-height: 20px; font-weight: 400; }
  .operator-page .font-body-sm { font-family: 'JetBrains Mono', monospace !important; font-size: 12px; line-height: 18px; font-weight: 400; }
  .operator-page .font-label-lg { font-family: 'JetBrains Mono', monospace !important; font-size: 13px; line-height: 18px; letter-spacing: 0.02em; font-weight: 500; }
  .operator-page .font-label-md { font-family: 'JetBrains Mono', monospace !important; font-size: 12px; line-height: 16px; letter-spacing: 0.04em; font-weight: 500; }
  .operator-page .font-label-sm { font-family: 'JetBrains Mono', monospace !important; font-size: 11px; line-height: 14px; letter-spacing: 0.05em; font-weight: 600; }
</style>

<div class="operator-page w-full text-text-primary space-y-12 py-4">

  <!-- Operational Air-Gap Banner Strip -->
  <aside aria-label="System status" class="w-full bg-surface-container-lowest border border-border rounded-lg py-2 px-4 md:px-6 flex flex-wrap items-center justify-between text-label-sm font-label-sm gap-2">
    <div class="flex items-center gap-2 text-secondary-container">
      <span class="inline-block w-2 h-2 rounded-full bg-secondary-container animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.35)]"></span>
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
          <span class="text-[10px] font-label-sm text-text-muted tracking-wider leading-none">DISPATCH ENGINE v3.2 · RELEASE 1.0.1</span>
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
    <div class="max-w-6xl mx-auto">
      <!-- Hero Header Cluster -->
      <div class="text-center max-w-4xl mx-auto mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded bg-info-soft border border-info text-info text-label-sm font-label-sm mb-6">
          <span class="inline-block w-2 h-2 rounded-full bg-info animate-ping"></span>
          <span>BUILT FOR HIGH-TEMPO DISPATCH OPERATIONS • 100% LOCAL-FIRST</span>
        </div>
        <h1 class="text-headline-xl font-headline-xl text-text-primary mb-6 leading-tight text-3xl sm:text-4xl md:text-5xl">
          Local-First Delivery Operations Hub with <span class="text-secondary-container">Zero Telemetry</span>
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
      <div class="relative rounded-xl border border-border-strong bg-surface shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65)] overflow-hidden">
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
      <div class="text-label-sm font-label-sm text-info uppercase tracking-wider mb-2">Application Security Assessment</div>
      <h2 class="text-headline-lg font-headline-lg text-text-primary text-2xl md:text-3xl mb-3">Local Database Security Review</h2>
      <p class="text-text-muted text-body-lg font-body-lg">
        The operational database uses SQLCipher. OPlane's assessment identified unresolved findings, so this review is not a certification or a guarantee that the application is free of vulnerabilities.
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
              <h4 class="font-headline-sm text-headline-sm text-text-primary">Security Reviewed by OPlane</h4>
            </div>
            <svg class="h-6 w-auto text-text-primary" viewBox="0 0 3334 900" role="img" aria-labelledby="oplane-logo-title" xmlns="http://www.w3.org/2000/svg">
              <title id="oplane-logo-title">OPlane</title>
              <g fill="currentColor" fill-rule="nonzero">
                <path d="M1190.625,670.708c-107.708,0 -183.083,-82.875 -183.083,-204.917c0,-122.042 75.333,-204.917 183.083,-204.917c107.75,0 183.042,82.875 183.042,204.917c0,122.042 -75.333,204.917 -183.042,204.917Zm0,-58c69.292,0 114.5,-57.25 114.5,-146.917c0,-89.667 -45.208,-147.667 -114.5,-147.667c-69.292,0 -114.5,57.25 -114.5,147.667c0,90.417 45.208,146.917 114.5,146.917Z"/>
                <path d="M1489.708,605.167l0,150.417l-67.792,0l0,-487.167l67.792,0l0,57.25c23.375,-38.417 67.042,-64.792 122.042,-64.792c109.25,0 171.75,92.667 171.75,204.917c0,112.25 -62.5,204.917 -171.75,204.917c-55,0 -98.667,-26.375 -122.042,-65.542Zm-1.5,-125.042c0,90.375 55.75,131.083 111.458,131.083c73.833,0 115.25,-61.042 115.25,-145.417c0,-84.375 -41.417,-145.375 -115.25,-145.375c-55.75,0 -111.458,39.917 -111.458,131.833l0,27.875Z"/>
                <rect x="1831.75" y="177.75" width="67.792" height="484.667"/>
                <path d="M1943.958,556.208c0,-78.333 61.042,-110.75 149.167,-128.833l95.667,-19.583l0,-16.583c0,-45.208 -24.875,-70.833 -77.583,-70.833c-49.708,0 -79.125,23.375 -91.167,67.042l-64.042,-16.583c18.833,-64.042 76.833,-110 157.458,-110c88.125,0 142.375,42.958 142.375,127.333l0,192.083c0,25.625 15.833,33.875 42.208,27.875l0,54.25c-60.292,7.542 -94.917,-6.792 -103.208,-44.458c-24.125,30.875 -67.792,51.25 -121.292,51.25c-71.583,0 -129.583,-42.167 -129.583,-113l-0,0.042Zm244.833,-95.667l-76.833,16.583c-60.25,12.042 -100.958,28.625 -100.958,76.083c0,38.417 27.875,61 70.833,61c58,0 106.958,-35.417 106.958,-85.875l0,-67.792Z"/>
                <path d="M2333.417,268.417l67.792,0l0,53.5c22.625,-32.375 61.75,-61.042 117.5,-61.042c83.625,0 131.083,58 131.083,141.625l0,259.875l-67.792,0l0,-241.833c0,-55 -23.375,-96.417 -82.125,-96.417c-49,0 -98.708,37.667 -98.708,103.208l0,235.042l-67.792,0l0,-394l0.042,0.042Z"/>
                <path d="M2693.5,465.792c0,-117.5 74.583,-204.917 181.542,-204.917c106.958,0 168,83.625 168,192.833l0,22.625l-284.75,0c3.75,82.875 51.25,135.583 119.792,135.583c52.75,0 90.417,-28.625 102.458,-75.333l59.5,21.083c-24.125,70.083 -83.625,113 -161.958,113c-109.208,0 -184.583,-83.625 -184.583,-204.917l-0,0.042Zm68.583,-41.417l212.458,0c-1.5,-55.75 -31.625,-105.458 -100.208,-105.458c-57.25,0 -100.208,38.417 -112.25,105.458Z"/>
              </g>
              <g fill="currentColor" fill-rule="nonzero">
                <path d="M387.292,466.583l137.375,94.167c27.458,18.833 63.708,18.833 91.167,0l137.375,-94.167l-136.958,-94.042c-27.708,-19.042 -64.25,-19.042 -91.958,0l-136.958,94.042l-0.042,0Z"/>
                <path d="M570.25,261.833c104.083,0 189.958,77.708 202.958,178.25l62.958,-43.167c18.917,-13 18.958,-40.917 0,-53.917l-219.958,-151c-27.708,-19.042 -64.25,-19.042 -91.958,0l-219.75,150.875c-19,13.042 -19,41.125 0,54.167l62.75,43c13,-100.542 98.875,-178.25 202.958,-178.25l0.042,0.042Z"/>
                <path d="M570.25,671.292c-104,0 -189.875,-77.583 -202.958,-178.042l-62.792,43.125c-19,13.042 -19,41.125 0,54.167l220.125,150.917c27.458,18.833 63.708,18.833 91.167,0l220.333,-151.042c18.917,-13 18.958,-40.917 0,-53.917l-63,-43.25c-13.083,100.458 -98.917,178.042 -202.958,178.042l0.083,-0Z"/>
                <path d="M387.292,466.583l136.917,93.875c27.75,19 64.333,19 92.083,0l136.917,-93.875l-136.875,-93.958c-27.75,-19.042 -64.417,-19.042 -92.167,0l-136.875,93.958Z"/>
              </g>
            </svg>
          </div>
          <p class="text-body-md font-body-md text-text-muted mb-4">
            OPlane completed an application security assessment. Its report includes unresolved findings. This assessment is not a certification or a guarantee that 0perator is free of vulnerabilities.
          </p>
          <div class="mt-4 flex flex-wrap items-center gap-3 text-label-sm font-label-sm text-text-muted">
            <span class="text-success">Vulnerability surface assessed</span>
            <span class="text-border">|</span>
            <span class="text-success">Architectural risks assessed</span>
            <span class="text-border">|</span>
            <span class="text-warning">Unresolved findings remain</span>
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

</div>
