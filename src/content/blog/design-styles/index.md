---
title: "UI ‘Isms’ Explained by Me Poking Buttons"
description: "Breaking a tiny interface in six ways to understand what makes each style tick"
date: "2026-02-06"
author: "Ehsan Pourhadi"
category: ["Design", "Frontend"]
tag: ["HTML", "UI", "CSS", "Design Systems", "UX"]
featured: false
draft: false
cover: cover.png
---


Alright, this one started as a couple of bookmarks… and then somehow turned into a tiny design museum I built in my browser at 1:47am.

I kept seeing these words everywhere — *glassmorphism*, *neubrutalism*, *claymorphism* — and my brain did that thing where it nods confidently while understanding absolutely nothing. So instead of reading another “Top UI Trends” post, I did what usually works for me:
I opened an empty HTML file and started breaking things until the vibes made sense.

Whats is this "ism" thing?
In the context of design and art, adding "-ism" to the end of a word turns a specific technique or philosophy into a distinct movement or category. In the digital design world, new trends pop up every few years. To make them easier to discuss, designers give them a name ending in "-ism" (or "-morphism" for form/shape).

This post is that experiment.
Not definitions-from-a-podium, but *touch it, poke it, feel why it feels that way*.

We’re going to build **tiny ui element per design style**, tweak a couple of properties, and watch the personality change in real time.

Think of it like switching CSS environments and noticing how your app’s mood changes.

Design styles aren’t decorations.
They’re **constraint systems** — opinions about depth, hierarchy, feedback, and affordances.

So instead of talking about styles abstractly, I built the same small UI _six times_.
Same intent. Same structure.
Different rules.


---
## Glassmorphism — UI as atmosphere

Glassmorphism works when the interface feels like a _layer_, not a surface.
It only works if there’s something *behind* it. Otherwise, it’s just a semi-transparent rectangle having an identity crisis.
The moment contrast drops too far or blur gets lazy, the UI collapses into fog.

The real levers here are:

- opacity
- background blur
- tint color
- stroke strength

### Interactive demo

<style>
.h3 {
  color: #333!important;
}
.glass-demo {
  --blur: 16px;
  --opacity: 0.25;
  --stroke: 1px;
  --tint: 255,255,255;
  color: #111;
  padding: 40px;
  background: linear-gradient(120deg, #7f7fd5, #86a8e7, #91eae4);
   background: url("https://picsum.photos/400/300") center / cover;
  font-family: system-ui;
}

.glass-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  padding: 8px;
}

.glass-panel {
  backdrop-filter: blur(var(--blur));
  background: rgba(var(--tint), var(--opacity));
  border: var(--stroke) solid rgba(255,255,255,0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 24px;
}

.glass-ui {
  display: grid;
  gap: 20px;
}

.glass-btn,
.glass-input,
.glass-select {
  background: rgba(255,255,255,0.35);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 14px;
  padding: 10px 14px;
}

.glass-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.glass-card {
  border-radius: 18px;
  overflow: hidden;
    backdrop-filter: blur(var(--blur));
  background: rgba(var(--tint), var(--opacity));
}

.glass-card-media {
  height: 120px;
  background: url("https://picsum.photos/400/300") center / cover;
}

.glass-card-body {
  padding: 14px;
}
.glass-card-body h3  {
  color: #111!important;
}



.glass-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  display: grid;
  place-items: center;
}
</style>
<section class="glass-demo">
  <div class="glass-controls glass-card">
    <div>
      <label>Blur</label>
      <input  type="range" min="0" max="30" value="16"
        oninput="this.closest('.glass-demo').style.setProperty('--blur', this.value + 'px')">
    </div>
    <div>
      <label>Opacity</label>
      <input type="range" min="0.1" max="0.6" step="0.05" value="0.25"
        oninput="this.closest('.glass-demo').style.setProperty('--opacity', this.value)">
    </div>
    <div>
      <label>Stroke</label>
      <input type="range" min="0" max="3" value="1"
        oninput="this.closest('.glass-demo').style.setProperty('--stroke', this.value + 'px')">
    </div>
  </div>

  <div class="glass-panel glass-ui">
    <div>
      <button class="glass-btn">Primary</button>
      <button class="glass-btn">Secondary</button>
      <select class="glass-select"><option>Option</option></select>
    </div>
    <div class="glass-cards">
      <div class="glass-card">
        <div class="glass-card-media"></div>
        <div class="glass-card-body">
          <h3>Glass Card</h3>
          <p>Layered UI</p>
        </div>
      </div>
      <div class="glass-card">
        <div class="glass-card-body">
          <h3>No Image</h3>
          <p>Still translucent</p>
        </div>
      </div>
      <div class="glass-card">
        <div class="glass-card-media"></div>
        <div class="glass-card-body">
          <h3>BG Image</h3>
          <p>Light leaks through</p>
        </div>
      </div>
    </div>
    <input class="glass-input" placeholder="Name">
    <input class="glass-input" placeholder="Email">
    <input class="glass-input" placeholder="Password">
    <div class="glass-icon">★</div>
  </div>
</section>

🧠 *Mental model*: glassmorphism is like a variable that never quite resolves, it always depends on context.

🧰 Tool to use: https://hype4.academy/tools/glassmorphism-generator

---

## Neumorphism / skeuomorphism — memory as affordance

Skeuomorphism doesn’t want you to *learn* the interface.

It wants your muscle memory from real life.

It’s about **borrowing trust** from physical experience.

Textures. Shadows. Materials. Stuff that looks touchable even when it’s not, all doing one job:

> “You’ve used something like this before.”


### Interactive demo

<style>
.skeuo-demo {
  --depth: 8px;
  --distance: 8px;

  padding: 40px;
  background: #e0e0e0;
  color:black;
  font-family: system-ui;
}

.skeuo-controls {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.skeuo-btn,
.skeuo-input,
.skeuo-select {
  background: linear-gradient(#fafafa, #cfcfcf);
  border-radius: 8px;
  border: 1px solid #999;
  padding: 10px 14px;
  box-shadow:
    inset 0 var(--depth) calc(var(--depth) * -1) rgba(255,255,255,0.6),
    inset 0 calc(var(--depth) * -1) var(--depth) rgba(0,0,0,0.35);
}

.skeuo-ui {
  display: grid;
  gap: 24px;
}

.skeuo-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.skeuo-card {
  background: linear-gradient(#f4f4f4, #c9c9c9);
  border-radius: 10px;
  background: #e0e0e0;
box-shadow:  var(--distance) var(--distance) calc(var(--distance) * 2) #b8b8b8,
             calc(var(--distance) * -1) calc(var(--distance) * -1) calc(var(--distance) *2) #ffffff;
}

.skeuo-card-media {
  height: 120px;
  background: url("https://picsum.photos/400/300") center / cover;
  border-bottom: 1px solid #aaa;
}

.skeuo-card-body {
  padding: 14px;
}
.skeuo-card-body h3  {
  color: #111!important;
}

.skeuo-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(circle at top, #fff, #aaa);
  box-shadow:
    inset 0 4px 6px rgba(255,255,255,0.6),
    inset 0 -6px 10px rgba(0,0,0,0.4);
  display: grid;
  place-items: center;
}
</style>
<section class="skeuo-demo">
  <div class="skeuo-controls">
    Depth <input type="range" min="2" max="16" value="8"
      oninput="this.closest('.skeuo-demo').style.setProperty('--depth', this.value + 'px')">
      Distans <input type="range" min="0" max="16" value="8"
      oninput="this.closest('.skeuo-demo').style.setProperty('--distance', this.value + 'px')">
  </div>
  <div class="skeuo-ui">
    <div>
      <button class="skeuo-btn">Primary</button>
      <button class="skeuo-btn">Secondary</button>
      <select class="skeuo-select"><option>Option</option></select>
    </div>
    <div class="skeuo-cards">
      <div class="skeuo-card">
        <div class="skeuo-card-media"></div>
        <div class="skeuo-card-body">
          <h3>Skeuo Card</h3>
          <p>Tactile UI</p>
        </div>
      </div>
      <div class="skeuo-card">
        <div class="skeuo-card-body">
          <h3>No Image</h3>
          <p>Still physical</p>
        </div>
      </div>
      <div class="skeuo-card">
        <div class="skeuo-card-media"></div>
        <div class="skeuo-card-body">
          <h3>BG Image</h3>
          <p>Material illusion</p>
        </div>
      </div>
    </div>
    <input class="skeuo-input" placeholder="Name">
    <input class="skeuo-input" placeholder="Email">
    <input class="skeuo-input" placeholder="Password">
    <div class="skeuo-icon">⚙</div>
  </div>
</section>

**What to notice**

If the shadows don’t imply weight, the illusion breaks.

Skeuomorphism fails quietly, it just starts feeling fake.

🧠 *Mental model*: skeuomorphism is backwards compatibility for humans.

🧰 Tool to use: https://neumorphism.io

---

## Neobrutalism — clarity through aggression

Neobrutalism has no interest in being polite.

Hard edges.
Bold colors.
Zero blur.
Drop shadows that refuse to be subtle.

The goal isn’t beauty.
It’s **unambiguous intent**.

Controls here focus on:

- shadow offset
- border thickness
- contrast

### Interactive demo

<style>
.brutal-demo {
  --border: 4px;
  --shadow-x: 8px;
  --shadow-y: 8px;

  padding: 40px;
  color: black;
  background: #fefefe;
  font-family: system-ui;
}

.brutal-controls {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.brutal-btn,
.brutal-input,
.brutal-select {
  background: #ffdd00;
  border: var(--border) solid black;
  padding: 10px 14px;
  box-shadow: var(--shadow-x) var(--shadow-y) 0 black;
}

.brutal-ui {
  display: grid;
  gap: 24px;
}

.brutal-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.brutal-card {
  border: var(--border) solid black;
  box-shadow: var(--shadow-x) var(--shadow-y) 0 black;
  background: white;
}

.brutal-card-media {
  height: 120px;
  background: url("https://picsum.photos/400/300") center / cover;
  border-bottom: var(--border) solid black;
}

.brutal-card-body {
  padding: 14px;
}
.brutal-card-body h3  {
  color: #111!important;
}

.brutal-icon {
  width: 56px;
  height: 56px;
  background: #00f0ff;
  border: var(--border) solid black;
  box-shadow: var(--shadow-x) var(--shadow-y) 0 black;
  display: grid;
  place-items: center;
}
</style>
<section class="brutal-demo">
  <div class="brutal-controls">
    Border <input type="range" min="2" max="8" value="4"
      oninput="this.closest('.brutal-demo').style.setProperty('--border', this.value + 'px')">
    Shadow <input type="range" min="0" max="16" value="8"
      oninput="
        this.closest('.brutal-demo').style.setProperty('--shadow-x', this.value + 'px');
        this.closest('.brutal-demo').style.setProperty('--shadow-y', this.value + 'px');
      ">
  </div>
  <div class="brutal-ui">
    <div>
      <button class="brutal-btn">Primary</button>
      <button class="brutal-btn">Secondary</button>
      <select class="brutal-select"><option>Option</option></select>
    </div>
    <div class="brutal-cards">
      <div class="brutal-card">
        <div class="brutal-card-media"></div>
        <div class="brutal-card-body">
          <h3>Brutal Card</h3>
          <p>No subtlety</p>
        </div>
      </div>
      <div class="brutal-card">
        <div class="brutal-card-body">
          <h3>No Image</h3>
          <p>Pure hierarchy</p>
        </div>
      </div>
      <div class="brutal-card">
        <div class="brutal-card-media"></div>
        <div class="brutal-card-body">
          <h3>BG Image</h3>
          <p>Hard edges</p>
        </div>
      </div>
    </div>
    <input class="brutal-input" placeholder="Name">
    <input class="brutal-input" placeholder="Email">
    <input class="brutal-input" placeholder="Password">
    <div class="brutal-icon">!</div>
  </div>
</section>

**What to notice**

Remove the shadow and everything flattens into ambiguity.

Neobrutalism lives or dies by separation.

🧠 *Mental model*: neobrutalism is like skipping abstraction layers and talking straight to the hardware.

🧰Tool: https://www.neobrutalism.dev/

---

## Claymorphism — volume-first UI

Claymorphism feels like neumorphism that discovered depth sliders and never looked back.

Everything feels inflated.

Heavy.

Touchable.

The best explanation I’ve found:

> Inflate neumorphism until it becomes adorable.

The real controls:

- corner radius
- vertical lift

### Interactive demo

<style>
.clay-demo {
  --radius: 28px;
  --lift: 26px;

  background: #f3f4f6;
  color: #111;
  padding: 40px;
  font-family: system-ui;
}

.clay-controls {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.clay-surface {
  display: grid;
  gap: 24px;
}

.clay-btn,
.clay-input,
.clay-select {
  border-radius: var(--radius);
  padding: 12px 16px;
  border: none;
  background: #ffb703;
  box-shadow:
    0 var(--lift) calc(var(--lift) * 1.2) rgba(0,0,0,0.25),
    inset 0 -12px 20px rgba(0,0,0,0.15);
}

.clay-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.clay-card {
  border-radius: var(--radius);
  background: rgb(255, 183, 3);
  overflow: hidden;
  box-shadow:
    0 var(--lift) calc(var(--lift) * 1.3) rgba(0,0,0,0.25) , inset calc(var(--lift) * -1.3) -calc(var(--lift) * -1.3) 16px 0px rgba(255, 217, 3, 0.6);
}

.clay-card-media {
  height: 140px;
  background: url("https://picsum.photos/400/300") center / cover;
}

.clay-card-body {
  padding: 16px;
}
.clay-card-body h3  {
  color: #111!important;
}

.clay-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #ffb703;
  box-shadow:
    0 16px 24px rgba(0,0,0,0.25);
}
</style>
<section class="clay-demo">
  <div class="clay-controls">
    Radius
    <input type="range" min="16" max="48" value="28"
      oninput="this.closest('.clay-demo').style.setProperty('--radius', this.value + 'px')">
    Lift
    <input type="range" min="10" max="40" value="26"
      oninput="this.closest('.clay-demo').style.setProperty('--lift', this.value + 'px')">
  </div>
  <div class="clay-surface">
    <div>
      <button class="clay-btn">Primary</button>
      <button class="clay-btn">Secondary</button>
      <select class="clay-select"><option>Option</option></select>
    </div>
    <div class="clay-cards">
      <div class="clay-card">
        <div class="clay-card-media"></div>
        <div class="clay-card-body">
          <h3>Clay Card</h3>
          <p>Volume does the explaining.</p>
          <button class="clay-btn">Open</button>
        </div>
      </div>
      <div class="clay-card">
        <div class="clay-card-body">
          <h3>No Image</h3>
          <p>Still feels touchable.</p>
          <button class="clay-btn">Open</button>
        </div>
      </div>
      <div class="clay-card">
        <div class="clay-card-media"></div>
        <div class="clay-card-body">
          <h3>Background Image</h3>
          <p>Depth carries hierarchy.</p>
          <button class="clay-btn">Open</button>
        </div>
      </div>
    </div>
    <div class="clay-icon">★</div>
  </div>
</section>

**What to notice**

Lower the lift too much and the UI loses authority.
Clay needs weight to feel believable.

🧠 *Mental model*: claymorphism is depth without sharpness — like rendering UI in a softer physics engine.

🧰 Tool to use: https://hype4.academy/tools/claymorphism-generator

---

## Minimalism — hierarchy without decoration

Minimalism isn’t about removing things.
It’s about removing excuses.

When borders, colors, and shadows disappear,

**spacing becomes your strongest primitive**.

There’s only one honest control here:

- spacing

### Interactive demo

<style>
.min-demo {
  --gap: 32px;

  background: white;
  padding: 80px;
  font-family: system-ui;
  color: #111;
}

.min-controls {
  margin-bottom: 40px;
}

.min-surface {
  display: grid;
  gap: var(--gap);
}

.min-btn,
.min-input,
.min-select {
  background: none;
  border: 1px solid #ddd;
  padding: 10px 12px;
}

.min-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap);
}

.min-card {
  border-top: 1px solid #eee;
  padding-top: 16px;
}

.min-card-media {
  height: 140px;
  background: #f4f4f5;
  margin-bottom: 12px;
}

.min-icon {
  margin-top: 32px;
}
</style>

<section class="min-demo">
  <div class="min-controls">
    Spacing
    <input type="range" min="12" max="64" value="32"
      oninput="this.closest('.min-demo').style.setProperty('--gap', this.value + 'px')">
  </div>

  <div class="min-surface">
    <div>
      <button class="min-btn">Primary</button>
      <button class="min-btn">Secondary</button>
      <select class="min-select"><option>Option</option></select>
    </div>
    <div class="min-cards">
      <div class="min-card">
        <div class="min-card-media"></div>
        <h3>Minimal Card</h3>
        <p>Nothing extra. Nothing missing.</p>
      </div>
      <div class="min-card">
        <h3>No Image</h3>
        <p>Hierarchy through spacing.</p>
      </div>
      <div class="min-card">
        <div class="min-card-media"></div>
        <h3>Background Image</h3>
        <p>Still restrained.</p>
      </div>
    </div>
    <input class="min-input" placeholder="Name">
    <input class="min-input" placeholder="Email">
    <input class="min-input" placeholder="Password">
    <div class="min-icon">★</div>
  </div>
</section>

**What to notice**

If spacing becomes arbitrary, hierarchy collapses instantly.

Minimalism is unforgiving — which is why it’s powerful.

🧠 *Mental model*: minimalism is aggressive refactoring of UI.

---

## Terminalism (I made this up my self) — information over comfort 

Terminal-style UI isn’t cosplay.

It’s what happens when the interface stops trying to be friendly and starts trying to be _honest_.

This style assumes a few things up front:

- the user cares more about **state** than aesthetics
- density is a feature, not a bug
- text _is_ the interface

There’s no depth here. No illusion of touch.

Everything is explicit, linear, and slightly uncomfortable — on purpose.

The constraints are brutal but clarifying:

- monospace typography
- limited color palette
- visible focus
- zero decoration that doesn’t carry meaning

When people say “this feels like a real tool”, this is usually what they mean.

The only real levers you get are:

- **density** (line height + spacing)
- **contrast** (readability vs eye strain)

Push either too far and the UI becomes unusable.

That tension is the whole lesson.

---

## Terminalism  — Interactive Demo (HTML + CSS + JS)

<style>
.term-demo {
  --line-height: 1.5;
  --fg: #33ff66;
  --bg: #0b0f0c;

  background: var(--bg);
  color: var(--fg);
  padding: 40px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

.term-controls {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.term-panel {
  border: 1px solid var(--fg);
  padding: 24px;
}

.term-ui {
  display: grid;
  gap: 16px;
  line-height: var(--line-height);
}

.term-btn,
.term-input,
.term-select {
  background: transparent;
  color: var(--fg);
  border: 1px solid var(--fg);
  padding: 8px 10px;
  font-family: inherit;
}

.term-btn:focus,
.term-input:focus,
.term-select:focus {
  outline: 2px dashed var(--fg);
  outline-offset: 2px;
}

.term-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.term-card {
  border: 1px solid var(--fg);
  padding: 12px;
}

.term-card-media {
  height: 80px;
  background:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      var(--fg) 4px,
      var(--fg) 5px
    );
  margin-bottom: 8px;
}

.term-card-title {
  font-weight: bold;
}

.term-card-text {
  opacity: 0.85;
}

.term-icon {
  width: 56px;
  height: 56px;
  border: 1px solid var(--fg);
  display: grid;
  place-items: center;
}
</style>

<section class="term-demo">
  <div class="term-controls">
    Density
    <input type="range" min="1.1" max="2" step="0.1" value="1.5"
      oninput="this.closest('.term-demo').style.setProperty('--line-height', this.value)">
    Contrast
    <input type="range" min="120" max="255" value="255"
      oninput="this.closest('.term-demo').style.setProperty('--fg', `rgb(51, ${this.value}, 102)`)">
  </div>
  <div class="term-panel term-ui">
    <div>
      <button class="term-btn">EXEC</button>
      <button class="term-btn">ABORT</button>
      <select class="term-select">
        <option>MODE_A</option>
        <option>MODE_B</option>
      </select>
    </div>
    <div class="term-cards">
      <div class="term-card">
        <div class="term-card-media"></div>
        <div class="term-card-title">PROCESS_01</div>
        <div class="term-card-text">status: running</div>
      </div>
      <div class="term-card">
        <div class="term-card-title">PROCESS_02</div>
        <div class="term-card-text">status: idle</div>
      </div>
      <div class="term-card">
        <div class="term-card-media"></div>
        <div class="term-card-title">PROCESS_03</div>
        <div class="term-card-text">status: blocked</div>
      </div>
    </div>
    <input class="term-input" placeholder="username">
    <input class="term-input" placeholder="access_key">
    <input class="term-input" placeholder="command">
    <div class="term-icon">▮</div>
  </div>
</section>

---

### Why this one earns its place

When you put this next to:

- glassmorphism
- liquid glass
- claymorphism

…the contrast is almost uncomfortable.

And that’s the point.

This style makes something very clear, very fast:

> Most interfaces are just structured text wearing expensive clothes.

Terminalisum strips the clothes off and asks whether the structure still holds.

That’s a lesson worth keeping in the set.

---

## The takeaway (this surprised me)

Once you apply the **same UI intent** to every style,

something interesting happens:

Some styles are generous.

Others are strict.

Some forgive mistakes.

Others amplify them.

Design systems aren’t just visual languages.

They’re **behavioral contracts** between your UI and your user.

And once you feel that difference in your hands,

no style ever feels like a vibe again.

---

## Where this goes next

This whole article could easily turn into:

- a single playground with a style switcher
- shared HTML + per-style CSS variables
- a repo for learning design systems by breaking them

But even as-is, the lesson sticks:

> Real design styles reveal themselves only when you force them to solve real UI problems.

That’s where the truth leaks out.
