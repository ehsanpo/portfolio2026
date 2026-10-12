---
title: "Chef (FP-24)"
title2: "1981 Game & Watch Handheld Classic"
description: "A faithful modern recreation of Nintendo's legendary 1981 Game & Watch Chef (FP-24) wide screen handheld, featuring authentic LCD physics and chiptune audio."
date: "2026-02-25"
status: "publish"
permalink: "chef"
author: "Ehsan"
type: "product"
id: 320
agency: "Personal Project"
category:
  - Game
  - Desktop Apps
  - Retro
tag:
  - React 18
  - Wails v3
  - Go
  - Web Audio API
  - Game & Watch
  - Retro Gaming
  - TypeScript
  - Tailwind CSS
client: "Self"
tagline: "The 1981 Game & Watch classic reborn with authentic LCD optics and chiptune audio"
background_image: "bg.png"
logo: "appicon.png"
cover: "screen.png"
images:
  - "screen.png"
  - "bg.png"
port_date: "2026"
onHome: true
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&family=Outfit:wght@400;500;600;700;800;900&family=Press+Start+2P&display=swap" rel="stylesheet">

<style>
  /* Typography Scale */
  .font-pixel { font-family: 'Press Start 2P', monospace !important; }
  .font-lcd { font-family: 'VT323', monospace !important; }
  .font-sans-retro { font-family: 'Outfit', sans-serif !important; }

  /* Vintage Scanline and LCD Texture */
  .scanlines {
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 255, 0, 0.03));
    background-size: 100% 3px, 6px 100%;
  }
  .lcd-grid {
    background-color: #bcc594;
    background-image: radial-gradient(#97a36c 15%, transparent 16%);
    background-size: 6px 6px;
  }
  .shadow-retro-edge {
    box-shadow: inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.5), 0 10px 25px rgba(0,0,0,0.4);
  }
  .shadow-gamepad {
    box-shadow: 0 6px 0 #1b1616, 0 10px 15px rgba(0,0,0,0.3);
  }
  .shadow-button-red {
    box-shadow: 0 5px 0 #54111c, 0 8px 12px rgba(0,0,0,0.35);
  }
</style>

<div class="w-full text-[#F3EFE6] font-sans-retro space-y-12">

  <!-- TOP VINTAGE ANNOUNCEMENT TICKER -->
  <div class="border border-[#3b322a] bg-[#1e1717] px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider text-[#d4b47a] flex flex-wrap items-center justify-between gap-3 shadow-md">
    <div class="flex items-center gap-2">
      <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
      <span class="font-pixel text-[10px]">GAME &amp; WATCH FP-24 VINTAGE RECREATION</span>
    </div>
    <div class="hidden md:flex items-center gap-6 text-neutral-400">
      <span>★ 1981 HERITAGE</span>
      <span>• 60 FPS ARCADE LOOP</span>
      <span>• NATIVE CHIPTUNE AUDIO</span>
      <span class="text-amber-400 font-semibold">100% OFFLINE DESKTOP</span>
    </div>
    <div class="flex items-center gap-3">
      <span class="px-2 py-0.5 rounded bg-amber-950/70 border border-amber-600/40 text-[10px] text-amber-300 font-pixel">FP-24</span>
    </div>
  </div>

  <!-- IN-PAGE STICKY NAVIGATION -->
  <nav class="sticky top-20 z-40 backdrop-blur-md bg-[#181313]/95 border border-[#2d2420] rounded-xl px-5 py-3 shadow-xl">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <img src="/img/products/chef/appicon.png" alt="Chef App Icon" class="w-10 h-10 rounded-xl shadow-md border border-[#C5A059]/40 object-cover">
        <div>
          <div class="flex items-center gap-2">
            <span class="font-black text-xl tracking-tight text-white flex items-center gap-1.5">
              CHEF <span class="text-[#C5A059] text-xs font-pixel font-normal">[FP-24]</span>
            </span>
          </div>
          <p class="text-[11px] text-neutral-400 font-mono tracking-tight">The 1981 Handheld Remake</p>
        </div>
      </div>
      <div class="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
        <a href="#gameplay" class="hover:text-[#C5A059] transition-colors">How to Play</a>
        <a href="#characters" class="hover:text-[#C5A059] transition-colors">Kitchen Havoc</a>
        <a href="#modes" class="hover:text-[#C5A059] transition-colors">Game Modes</a>
        <a href="#controls" class="hover:text-[#C5A059] transition-colors">Controls</a>
        <a href="#features" class="hover:text-[#C5A059] transition-colors">Hardware Specs</a>
      </div>
      <div class="flex items-center gap-3">
        <a href="#download" class="px-5 py-2 rounded-lg bg-gradient-to-b from-[#8C2333] to-[#5e1520] hover:from-[#a02a3c] hover:to-[#731926] text-white font-bold text-xs uppercase tracking-wider shadow-button-red border border-red-400/30 transition-all hover:-translate-y-0.5 active:translate-y-1">
          Download (.exe)
        </a>
      </div>
    </div>
  </nav>

  <!-- HERO SECTION WITH VINTAGE GAME & WATCH CONSOLE FRAME -->
  <section class="relative pt-4 pb-8 overflow-hidden">
    <!-- Warm vintage atmospheric kitchen glow -->
    <div class="absolute inset-0 -z-10 opacity-20 pointer-events-none rounded-2xl overflow-hidden">
      <img src="/img/products/chef/bg.png" alt="Kitchen backdrop" class="w-full h-full object-cover filter blur-sm">
      <div class="absolute inset-0 bg-gradient-to-b from-[#181313] via-[#181313]/90 to-[#181313]"></div>
    </div>
    <div class="max-w-5xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#30251d] border border-[#765d3d] text-[#e7c788] text-xs font-mono font-medium mb-5 shadow-inner">
          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
          Step into 1981 • Genuine LCD Wide Screen Emulation
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
          Relive the Golden Age of <span class="bg-gradient-to-r from-[#e5be70] via-[#ffd688] to-[#d6983a] bg-clip-text text-transparent">Handheld Gaming.</span>
        </h1>
        <p class="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto font-normal">
          The legendary 1981 Nintendo Game &amp; Watch <strong class="text-amber-200 font-semibold">"Chef"</strong> reborn with authentic dual-tone LCD optics, crisp arcade chiptune bleeps, and frantic 4-lane pan-flipping kitchen action.
        </p>
        <!-- CTA Action Buttons (Windows Download Only) -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#download" class="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-b from-[#8C2333] to-[#59141f] text-white font-extrabold text-sm uppercase tracking-wider shadow-button-red border border-red-300/40 hover:from-[#a0293b] hover:to-[#6d1a27] transition-all hover:-translate-y-0.5 active:translate-y-1">
            <svg class="w-4 h-4 text-[#F4E8C1]" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801"/></svg>
            <span>Download for Windows (.exe)</span>
            <span class="text-[11px] font-mono text-neutral-300 bg-black/40 px-2 py-0.5 rounded">&lt;19MB</span>
          </a>
          <a href="#features" class="flex items-center gap-2 px-6 py-4 rounded-xl bg-[#28211e] hover:bg-[#342b27] border border-[#5d4a3e] text-neutral-200 hover:text-white font-bold text-sm tracking-wide transition-all shadow-md">
            <span>Explore Hardware Specs</span>
          </a>
        </div>
      </div>
      <!-- VINTAGE GAME & WATCH CONSOLE ENCLOSURE -->
      <div class="relative mx-auto max-w-4xl p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#bfa268] via-[#a88a4c] to-[#7f632d] shadow-retro-edge border-4 border-[#503d17]">
        <!-- Screw Rivets for authentic retro toy feel -->
        <div class="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-[#463519] border border-[#d6be8c] shadow-inner flex items-center justify-center text-[8px] text-[#221706] font-mono">+</div>
        <div class="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-[#463519] border border-[#d6be8c] shadow-inner flex items-center justify-center text-[8px] text-[#221706] font-mono">+</div>
        <div class="absolute bottom-4 left-4 w-3.5 h-3.5 rounded-full bg-[#463519] border border-[#d6be8c] shadow-inner flex items-center justify-center text-[8px] text-[#221706] font-mono">+</div>
        <div class="absolute bottom-4 right-4 w-3.5 h-3.5 rounded-full bg-[#463519] border border-[#d6be8c] shadow-inner flex items-center justify-center text-[8px] text-[#221706] font-mono">+</div>
        <!-- Gold Metal Badge Header -->
        <div class="flex items-center justify-between pb-4 mb-3 border-b border-[#5e471d]/40">
          <div class="flex items-center gap-2">
            <span class="font-pixel text-[10px] text-[#36270e] tracking-widest uppercase font-black">Nintendo® Wide Screen</span>
          </div>
          <div class="text-right">
            <span class="font-pixel text-xs text-[#2b1e0a] font-black tracking-wider">CHEF • FP-24</span>
          </div>
        </div>
        <!-- The Dark Bezel Frame -->
        <div class="relative rounded-2xl bg-[#26201f] p-4 sm:p-7 border-4 border-[#171312] shadow-2xl">
          <!-- Inner LCD Display Area: Real Game Screenshot Image -->
          <div class="relative rounded-xl overflow-hidden border-4 border-[#333a26]/60 shadow-inner bg-[#bcc594]">
            <img src="/img/products/chef/screen.png" alt="Chef FP-24 Handheld Game Screen" class="w-full h-auto object-contain mx-auto select-none pointer-events-none rounded" />
          </div>
          <!-- Bottom Console Control Elements (Authentic Game & Watch Buttons) -->
          <div class="mt-6 flex flex-wrap items-center justify-between gap-4 px-2">
            <!-- Left Game Mode / Clock selection -->
            <div class="flex items-center gap-3">
              <div class="text-center">
                <div class="w-7 h-7 rounded-full bg-[#1b1716] border-2 border-[#54443f] text-[9px] font-pixel text-neutral-300 flex items-center justify-center shadow-gamepad">A</div>
                <span class="text-[9px] font-pixel text-neutral-400 mt-1 block">GAME A</span>
              </div>
              <div class="text-center">
                <div class="w-7 h-7 rounded-full bg-[#1b1716] border-2 border-[#54443f] text-[9px] font-pixel text-neutral-300 flex items-center justify-center shadow-gamepad">B</div>
                <span class="text-[9px] font-pixel text-neutral-400 mt-1 block">GAME B</span>
              </div>
              <div class="text-center">
                <div class="w-7 h-7 rounded-full bg-[#1b1716] border-2 border-[#54443f] text-[9px] font-pixel text-neutral-300 flex items-center justify-center shadow-gamepad">⏰</div>
                <span class="text-[9px] font-pixel text-neutral-400 mt-1 block">TIME</span>
              </div>
            </div>
            <!-- Middle Speaker Grill Slots -->
            <div class="flex gap-1.5 items-center justify-center">
              <div class="w-1.5 h-6 rounded-full bg-[#171312] shadow-inner"></div>
              <div class="w-1.5 h-8 rounded-full bg-[#171312] shadow-inner"></div>
              <div class="w-1.5 h-10 rounded-full bg-[#171312] shadow-inner"></div>
              <div class="w-1.5 h-8 rounded-full bg-[#171312] shadow-inner"></div>
              <div class="w-1.5 h-6 rounded-full bg-[#171312] shadow-inner"></div>
            </div>
            <!-- Right Handheld D-Pad / Move Controls -->
            <div class="flex items-center gap-3">
              <div class="px-4 py-2.5 rounded-lg bg-[#691823] border-2 border-[#a73546] shadow-button-red text-white font-pixel text-xs flex items-center gap-2 select-none">
                <span>◀</span> LEFT
              </div>
              <div class="px-4 py-2.5 rounded-lg bg-[#691823] border-2 border-[#a73546] shadow-button-red text-white font-pixel text-xs flex items-center gap-2 select-none">
                RIGHT <span>▶</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HIGHLIGHTS / QUICK STATS BAR -->
  <section class="border border-[#322720] bg-[#1d1616] rounded-2xl py-8">
    <div class="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div class="p-4 rounded-xl bg-[#251e1b] border border-[#48372d]">
        <div class="text-3xl font-black text-[#C5A059] font-lcd">1981</div>
        <div class="text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-1">Era Accurate</div>
        <div class="text-[11px] text-neutral-500 mt-0.5">Wide Screen FP-24 Model</div>
      </div>
      <div class="p-4 rounded-xl bg-[#251e1b] border border-[#48372d]">
        <div class="text-3xl font-black text-emerald-400 font-lcd">60 FPS</div>
        <div class="text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-1">Zero Input Lag</div>
        <div class="text-[11px] text-neutral-500 mt-0.5">Native rAF Game Loop</div>
      </div>
      <div class="p-4 rounded-xl bg-[#251e1b] border border-[#48372d]">
        <div class="text-3xl font-black text-amber-300 font-lcd">4 LANES</div>
        <div class="text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-1">Juggling Chaos</div>
        <div class="text-[11px] text-neutral-500 mt-0.5">Sausages, Fish &amp; Fried Eggs</div>
      </div>
      <div class="p-4 rounded-xl bg-[#251e1b] border border-[#48372d]">
        <div class="text-3xl font-black text-rose-400 font-lcd">&lt; 19 MB</div>
        <div class="text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-1">Self-Contained</div>
        <div class="text-[11px] text-neutral-500 mt-0.5">Single-file Windows Executable</div>
      </div>
    </div>
  </section>

  <!-- STORY & GAMEPLAY MECHANICS -->
  <section id="gameplay" class="py-12 bg-[#161211] rounded-2xl border border-[#2e231c] p-6 sm:p-10">
    <div class="max-w-6xl mx-auto">
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="font-pixel text-[11px] text-[#C5A059] uppercase tracking-wider">The Story &amp; Gameplay</span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white mt-3">Breakfast is in the Air!</h2>
        <p class="text-neutral-400 text-sm mt-3 leading-relaxed">
          You are the head chef in a frantic diner kitchen. Sausages, grilled fish, and sunny-side-up eggs are flying everywhere! Keep every dish airborne with your trusty pan while navigating surprise kitchen hazards.
        </p>
      </div>
      <!-- 3 Key Core Gameplay Pillars -->
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Card 1: 4-Lane Pan Flipping -->
        <div class="rounded-2xl bg-[#211a18] p-7 border border-[#413126] hover:border-[#C5A059]/60 transition-all group flex flex-col justify-between">
          <div>
            <div class="w-14 h-14 rounded-xl bg-amber-950/60 border border-amber-600/40 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
              <img src="/img/products/chef/sausage.png" alt="Sausage" class="w-10 h-10 object-contain">
            </div>
            <h3 class="text-lg font-bold text-white mb-2">4-Lane Pan Flipping</h3>
            <p class="text-sm text-neutral-400 leading-relaxed">
              Slide seamlessly left and right across 4 cooking zones. Time your position to catch ingredients right at pan height before they shatter on the kitchen floor.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-[#362a22] text-xs font-mono text-amber-400/90 flex items-center justify-between">
            <span>DROP SPEED ACCELERATES</span>
            <span class="text-neutral-500">FP-24 RULES</span>
          </div>
        </div>
        <!-- Card 2: Special Powerups (Coffee & Golden Dish) -->
        <div class="rounded-2xl bg-[#211a18] p-7 border border-[#413126] hover:border-[#C5A059]/60 transition-all group flex flex-col justify-between">
          <div>
            <div class="w-14 h-14 rounded-xl bg-red-950/60 border border-red-600/40 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
              <span class="text-2xl">☕</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Chef’s Focus &amp; Golden 2X</h3>
            <p class="text-sm text-neutral-400 leading-relaxed">
              Gulp steaming coffee to engage <strong>bullet-time slow motion</strong> when drops get out of hand. Catch rare golden breakfasts to double your scoring rate for 6 frenetic seconds!
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-[#362a22] text-xs font-mono text-amber-400/90 flex items-center justify-between">
            <span>2X MULTIPLIER / BULLET-TIME</span>
            <span class="text-neutral-500">BONUS</span>
          </div>
        </div>
        <!-- Card 3: Milestone 1-UP Recovery -->
        <div class="rounded-2xl bg-[#211a18] p-7 border border-[#413126] hover:border-[#C5A059]/60 transition-all group flex flex-col justify-between">
          <div>
            <div class="w-14 h-14 rounded-xl bg-emerald-950/60 border border-emerald-600/40 flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform">
              <span class="text-2xl">❤️</span>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">1-UP Milestone Clears</h3>
            <p class="text-sm text-neutral-400 leading-relaxed">
              Every kitchen mistake costs a miss. Rack up <strong class="text-emerald-300">200</strong> and <strong class="text-emerald-300">500 points</strong> to wipe clean all accrued misses and stay alive in high-score contention.
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-[#362a22] text-xs font-mono text-emerald-400/90 flex items-center justify-between">
            <span>CLEAR MISSES AT 200 &amp; 500</span>
            <span class="text-neutral-500">LIVES</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- KITCHEN HAVOC: CHARACTERS & FOOD -->
  <section id="characters" class="py-12 bg-[#1b1514] border border-[#2e231c] rounded-2xl p-6 sm:p-10">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span class="font-pixel text-[11px] text-[#C5A059] uppercase tracking-wider">Meet the Cast</span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white mt-2">Kitchen Mischief &amp; Menus</h2>
        </div>
        <p class="text-neutral-400 text-sm max-w-md mt-4 md:mt-0">
          The kitchen isn't just about hot pans. Watch out for crafty animals who want a slice of your cooking!
        </p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Item 1: Cat on Shelf -->
        <div class="p-6 rounded-2xl bg-[#241c19] border border-[#403024] relative overflow-hidden flex flex-col justify-between">
          <div class="h-28 flex items-center justify-center">
            <img src="/img/products/chef/cat.png" alt="Cat on shelf" class="h-24 w-auto object-contain hover:scale-110 transition-transform">
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-white text-base">The Cat on the Shelf</h3>
              <span class="text-[10px] font-pixel text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">TRAP</span>
            </div>
            <p class="text-xs text-neutral-400 mt-2 leading-relaxed">
              Lurks overhead. Reaches its paw out to snag food mid-air, holds it captive, then releases it unexpectedly!
            </p>
          </div>
        </div>
        <!-- Item 2: The Sneaky Mouse -->
        <div class="p-6 rounded-2xl bg-[#241c19] border border-[#403024] relative overflow-hidden flex flex-col justify-between">
          <div class="h-28 flex items-center justify-center">
            <img src="/img/products/chef/mouse.png" alt="Sneaky mouse" class="h-20 w-auto object-contain hover:scale-110 transition-transform">
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-white text-base">The Sneaky Mouse</h3>
              <span class="text-[10px] font-pixel text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">+50 PTS</span>
            </div>
            <p class="text-xs text-neutral-400 mt-2 leading-relaxed">
              Zips across the floor during rush moments. Catch it for a whopping bonus and watch it frighten the cat away!
            </p>
          </div>
        </div>
        <!-- Item 3: Crispy Breakfast Trio -->
        <div class="p-6 rounded-2xl bg-[#241c19] border border-[#403024] relative overflow-hidden flex flex-col justify-between">
          <div class="h-28 flex items-center justify-center gap-2">
            <img src="/img/products/chef/sausage.png" alt="Sausage" class="w-10 h-10 object-contain hover:rotate-12 transition-transform">
            <img src="/img/products/chef/egg.png" alt="Egg" class="w-10 h-10 object-contain hover:scale-110 transition-transform">
            <img src="/img/products/chef/fish.png" alt="Fish" class="w-10 h-10 object-contain hover:-rotate-12 transition-transform">
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-white text-base">Classic Ingredients</h3>
              <span class="text-[10px] font-pixel text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">FOOD</span>
            </div>
            <p class="text-xs text-neutral-400 mt-2 leading-relaxed">
              Sausages with curved bounces, sizzling eggs with fast vertical drops, and whole grilled fish with wide arcs.
            </p>
          </div>
        </div>
        <!-- Item 4: Master Chef -->
        <div class="p-6 rounded-2xl bg-[#241c19] border border-[#403024] relative overflow-hidden flex flex-col justify-between">
          <div class="h-28 flex items-center justify-center">
            <img src="/img/products/chef/chef_spritesheet.png" alt="Chef sprite" class="max-h-24 w-auto object-contain">
          </div>
          <div class="mt-4">
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-white text-base">The Head Chef</h3>
              <span class="text-[10px] font-pixel text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">HERO</span>
            </div>
            <p class="text-xs text-neutral-400 mt-2 leading-relaxed">
              Equipped with a heavyweight cast-iron skillet and razor-sharp reflexes. Every catch depends on your timing.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- GAME MODES COMPARISON TABLE -->
  <section id="modes" class="py-12 bg-[#161211] border border-[#2e231c] rounded-2xl p-6 sm:p-10">
    <div class="max-w-5xl mx-auto">
      <div class="text-center max-w-xl mx-auto mb-10">
        <span class="font-pixel text-[11px] text-[#C5A059] uppercase tracking-wider">Skill Levels</span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white mt-2">Choose Your Shift</h2>
        <p class="text-neutral-400 text-sm mt-3">From relaxed morning nostalgia to blistering arcade difficulty.</p>
      </div>
      <div class="overflow-x-auto rounded-2xl border border-[#46362b] bg-[#201917] shadow-xl">
        <table class="w-full text-left border-collapse text-sm">
          <thead>
            <tr class="border-b border-[#3b2e25] bg-[#2a211e] text-neutral-300 font-pixel text-[11px]">
              <th class="py-4 px-6 text-[#e0c48e]">MODE</th>
              <th class="py-4 px-6">DESCRIPTION</th>
              <th class="py-4 px-6 text-center">SPEED</th>
              <th class="py-4 px-6 text-center">SPAWNS</th>
              <th class="py-4 px-6 text-center">CAT TRAPS</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#332720] text-neutral-300">
            <tr class="hover:bg-[#28201c] transition-colors">
              <td class="py-5 px-6 font-bold text-emerald-400 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                Easy Mode
              </td>
              <td class="py-5 px-6 text-neutral-300">
                Relaxed drop pacing. Perfect for warming up, casual players, and pure nostalgic leisure.
              </td>
              <td class="py-5 px-6 text-center font-lcd text-2xl text-emerald-300">0.7x</td>
              <td class="py-5 px-6 text-center text-xs font-mono">Relaxed</td>
              <td class="py-5 px-6 text-center text-xs font-mono text-neutral-400">Rare</td>
            </tr>
            <tr class="bg-[#241c19] hover:bg-[#2c221e] transition-colors">
              <td class="py-5 px-6 font-bold text-amber-300 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                Game A (Normal)
              </td>
              <td class="py-5 px-6 text-neutral-200">
                The authentic 1981 FP-24 experience. Standard progressive ramp-up and true-to-era timing.
              </td>
              <td class="py-5 px-6 text-center font-lcd text-2xl text-amber-300">1.0x</td>
              <td class="py-5 px-6 text-center text-xs font-mono text-amber-200">Dynamic</td>
              <td class="py-5 px-6 text-center text-xs font-mono text-amber-300">Moderate</td>
            </tr>
            <tr class="hover:bg-[#28201c] transition-colors">
              <td class="py-5 px-6 font-bold text-rose-400 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                Game B (Hard)
              </td>
              <td class="py-5 px-6 text-neutral-300">
                Arcade veteran gauntlet. Lightning drop speeds, relentless food spawns, and vicious cat ambushes.
              </td>
              <td class="py-5 px-6 text-center font-lcd text-2xl text-rose-300">1.4x</td>
              <td class="py-5 px-6 text-center text-xs font-mono text-rose-300">Rapid</td>
              <td class="py-5 px-6 text-center text-xs font-mono text-rose-400 font-bold">High</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- CONTROLS & MODERN ARCHITECTURE -->
  <section id="controls" class="py-12 bg-[#1a1413] border border-[#31251e] rounded-2xl p-6 sm:p-10">
    <div class="max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Keyboard Controls -->
        <div>
          <span class="font-pixel text-[11px] text-[#C5A059] uppercase tracking-wider">Simple &amp; Instant</span>
          <h2 class="text-3xl font-extrabold text-white mt-2 mb-4">Pick Up &amp; Play Instantly</h2>
          <p class="text-neutral-400 text-sm leading-relaxed mb-8">
            Engineered with zero learning curve. Whether you prefer tactile mechanical keyboard presses, mouse clicks, or handheld arcade controls, the kitchen responds instantly.
          </p>
          <div class="space-y-3 font-mono text-xs">
            <div class="flex items-center justify-between p-3.5 rounded-xl bg-[#231b19] border border-[#3f3026]">
              <span class="text-neutral-300 font-sans-retro font-semibold">Move Skillet Left</span>
              <div class="flex items-center gap-2">
                <kbd class="px-2.5 py-1 rounded bg-[#130f0e] border border-[#4d3a2e] text-[#e3c793] shadow">← Left Arrow</kbd>
                <span class="text-neutral-500">or</span>
                <kbd class="px-2.5 py-1 rounded bg-[#130f0e] border border-[#4d3a2e] text-[#e3c793] shadow">A</kbd>
              </div>
            </div>
            <div class="flex items-center justify-between p-3.5 rounded-xl bg-[#231b19] border border-[#3f3026]">
              <span class="text-neutral-300 font-sans-retro font-semibold">Move Skillet Right</span>
              <div class="flex items-center gap-2">
                <kbd class="px-2.5 py-1 rounded bg-[#130f0e] border border-[#4d3a2e] text-[#e3c793] shadow">→ Right Arrow</kbd>
                <span class="text-neutral-500">or</span>
                <kbd class="px-2.5 py-1 rounded bg-[#130f0e] border border-[#4d3a2e] text-[#e3c793] shadow">D</kbd>
              </div>
            </div>
            <div class="flex items-center justify-between p-3.5 rounded-xl bg-[#231b19] border border-[#3f3026]">
              <span class="text-neutral-300 font-sans-retro font-semibold">Start / Quick Restart</span>
              <div class="flex items-center gap-2">
                <kbd class="px-3 py-1 rounded bg-[#130f0e] border border-[#4d3a2e] text-[#e3c793] shadow">Space</kbd>
                <span class="text-neutral-500">or</span>
                <kbd class="px-2.5 py-1 rounded bg-[#130f0e] border border-[#4d3a2e] text-[#e3c793] shadow">Enter</kbd>
              </div>
            </div>
            <div class="flex items-center justify-between p-3.5 rounded-xl bg-[#231b19] border border-[#3f3026]">
              <span class="text-neutral-300 font-sans-retro font-semibold">Audio Mute / Unmute</span>
              <div class="flex items-center gap-2">
                <kbd class="px-2.5 py-1 rounded bg-[#130f0e] border border-[#4d3a2e] text-[#e3c793] shadow">M</kbd>
                <span class="text-neutral-500">or HUD Icon</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Right: Modern Architecture Badge Box -->
        <div id="features" class="p-8 rounded-3xl bg-gradient-to-br from-[#271e1b] to-[#1c1513] border-2 border-[#544133] shadow-2xl relative">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[#C5A059]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">Modern Engineering</h3>
              <p class="text-xs text-neutral-400 font-mono">React 18 • Vite 5 • Wails v3 (Go)</p>
            </div>
          </div>
          <div class="space-y-4 text-sm text-neutral-300">
            <div class="flex items-start gap-3">
              <span class="text-emerald-400 font-bold">✓</span>
              <div>
                <strong class="text-white">Authentic Segmented LCD Display:</strong>
                <p class="text-xs text-neutral-400 mt-0.5">True-to-hardware segment styling, custom retro score readout, and genuine matte console bezel.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-emerald-400 font-bold">✓</span>
              <div>
                <strong class="text-white">Persistent Local High Scores:</strong>
                <p class="text-xs text-neutral-400 mt-0.5">Independent records maintained across Easy, Game A, and Game B saved right in your local storage.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-emerald-400 font-bold">✓</span>
              <div>
                <strong class="text-white">Zero Bloat Windows Executable:</strong>
                <p class="text-xs text-neutral-400 mt-0.5">Clean, single-file <code class="text-amber-300 bg-black/40 px-1 py-0.5 rounded text-[11px]">ChefGame.exe</code> under 19MB with no installer, no console window, and fixed 16:9 arcade aspect ratio.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <span class="text-emerald-400 font-bold">✓</span>
              <div>
                <strong class="text-white">100% Procedural Chiptune Audio:</strong>
                <p class="text-xs text-neutral-400 mt-0.5">Synthesized retro beeps, catches, miss penalties, and high-score fanfares built on the Web Audio API.</p>
              </div>
            </div>
          </div>
          <!-- Tech Badges -->
          <div class="mt-8 pt-6 border-t border-[#3c2f26] flex flex-wrap gap-2">
            <span class="px-2.5 py-1 rounded bg-[#191412] border border-[#443328] text-[11px] font-mono text-cyan-400">React 18</span>
            <span class="px-2.5 py-1 rounded bg-[#191412] border border-[#443328] text-[11px] font-mono text-indigo-300">Vite 5</span>
            <span class="px-2.5 py-1 rounded bg-[#191412] border border-[#443328] text-[11px] font-mono text-sky-400">Go / Wails v3</span>
            <span class="px-2.5 py-1 rounded bg-[#191412] border border-[#443328] text-[11px] font-mono text-amber-300">WebAudio API</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CALL TO ACTION / DOWNLOAD SECTION (WINDOWS EXECUTABLE) -->
  <section id="download" class="py-16 bg-gradient-to-b from-[#181211] via-[#211816] to-[#140e0d] text-center relative overflow-hidden rounded-2xl border border-[#3b2b22]">
    <!-- Ambient glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8C2333]/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="max-w-4xl mx-auto px-6 relative z-10">
      <img src="/img/products/chef/appicon.png" alt="Chef App Icon" class="w-20 h-20 rounded-2xl mx-auto mb-6 shadow-2xl border-2 border-[#C5A059]/50 object-cover">
      <h2 class="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
        Ready to Flip Breakfast?
      </h2>
      <p class="text-neutral-300 text-base max-w-xl mx-auto mb-8 font-normal leading-relaxed">
        Grab the lightweight standalone Windows edition for offline handheld arcade thrills with zero bloat.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <a href="#" class="px-8 py-4 rounded-xl bg-gradient-to-b from-[#8C2333] to-[#59141f] text-white font-black text-sm uppercase tracking-wider shadow-button-red border border-red-300/40 hover:from-[#a0293b] hover:to-[#6d1a27] transition-all hover:-translate-y-0.5 active:translate-y-1 flex items-center gap-3">
          <svg class="w-5 h-5 text-[#F4E8C1]" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801"/></svg>
          <span>Download Windows Executable (.exe)</span>
          <span class="text-xs text-amber-300 font-mono bg-black/40 px-2 py-0.5 rounded">&lt;19MB</span>
        </a>
      </div>
      <div class="mt-8 text-xs text-neutral-500 font-mono">
        Nintendo® and Game &amp; Watch™ are trademarks of Nintendo Co., Ltd. This is an open-source homage remake for educational and archival preservation.
      </div>
    </div>
  </section>

</div>
