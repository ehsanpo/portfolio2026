# Plan2.md — Portfolio 2026 Redesign, Motion & Feature Upgrade Execution Plan

> **Audience:** Coding agents executing discrete tasks one at a time.
> **Rule #1:** Do **NOT** guess file paths, component names, or schemas. Every path and contract in this plan has been verified against the repository. Read the listed files before editing.
> **Rule #2:** This is an Astro 5 + React 19 + Tailwind CSS v4 static site (`astro build` outputs to `dist/`). Client-side interactive islands use `client:load` or `client:visible`, and Astro View Transitions (`<ClientRouter />` in `src/layouts/Layout.astro`) require cleanup/re-init on `astro:page-load` and `astro:before-swap`.
> **Rule #3:** Respect `DESIGN.md`, `prefers-reduced-motion`, zero border-radius (`--radius: 0rem`) unless explicitly noted, strict TypeScript (no `any`), and **never** commit secrets, API keys, or mock databases into `src/`.

---

## Global Environment & Verification Standards

Every task MUST finish by running:
```powershell
npm run check
npm run build
```
And verifying visually in a headless or local dev server (`npm run dev` on `http://localhost:4321`) at:
- Mobile (`375px` width)
- Tablet (`768px` width)
- Desktop (`1440px` and `1600px`+ to verify `96rem` max-width)
- Both **Light** (`html.light`) and **Dark** (`html.dark`) themes.

---

## Execution Dependency Graph

Run tasks in the following phases so shared foundations don't collide:

- **Phase 1 (Foundations — do first):**
  - `TASK-01`: Global `max-width: 96rem` container & layout audit
  - `TASK-02`: Museum of Motion library completion (`Unveil`, `Cursor`, `Stack`, `Hover`, `Reveal`, `Marquee`, `Pulse`, `Stacking`)
- **Phase 2 (Card System & Surface Overhaul — parallelizable after Phase 1):**
  - `TASK-03`: Dark Borderless Card System for Awards, Writing/Blog, and Tech Timeline (includes `BlogCard` non-3D refactor)
  - `TASK-04`: `/work` Page Cards (bigger full-bleed images, zero image padding, dark borderless card style)
  - `TASK-05`: `/work/[slug]` (`WorkDetailView.tsx`) surface cleanup (remove cream from Role & Architecture + Sidebar)
  - `TASK-06`: `"Also on the shelf"` `Unveil` scroll animation in `SelectedWorkBlock.astro`
- **Phase 3 (New Sections & Hero Variants — parallelizable):**
  - `TASK-07`: About page `TRUE FIREFOXER` 20+ year section
  - `TASK-08`: Home page full-screen CTA closing section (`aashishthakuri.com/contact`-inspired)
  - `TASK-09`: Home page Hero — Pixelated Dithered Canvas (`PixelFeatureCard` engine + `Klair.co` interactive dot-text) with **4 selectable variants**
- **Phase 4 (`/skills` Page Overhaul — parallelizable sub-tasks):**
  - `TASK-10`: `/skills` page fixes (Mint green section contrast, compact `SkillChart` 1-viewport layout, `RankTimeline` dark/light mode fix)
  - `TASK-11`: GitHub Contributions upgrade using Motion Brew `ActivityGrid` (Total sessions, Longest streak, Current streak)
  - `TASK-12`: Development Process upgrade using Motion Brew `BrandBridge`
  - `TASK-13`: 9router Token Usage section (`30 days` / `60 days`, Input/Output tokens, Top Models) + sync script
- **Phase 5 (Major Page Architecture Upgrades — parallelizable):**
  - `TASK-14`: `/portfolio/[slug]` sticky-sidebar + immediate animated image showcase (`aashishthakuri.com/sola`-inspired)
  - `TASK-15`: `/prompts` -> `/ai-skills` page transformation (`.md` download, `npx skills add`, GitHub repo structure)
  - `TASK-16`: `/roles` interactive explorer + 5 new Uxcel-inspired design roles + portfolio project examples per role

---

## TASK-01: Global `max-width: 96rem` Across Entire Website

### Goal
Increase the site-wide maximum container width on larger screens from `1320px` (`82.5rem`) to `96rem` (`1536px`) so all pages, headers, footers, grids, and sections scale up cleanly on wide displays.

### Read First
- `src/styles/global.css` (lines 290–308: `.container`)
- `src/components/Header.tsx`
- `src/components/footer/Footer.tsx`
- `src/components/SkillChart.tsx` (line 346: `max-w-6xl`)
- `src/components/Beams.tsx` (line 75: `max-w-5xl`)
- `src/pages/blog/[slug].astro` (line 183: `max-w-6xl`, keep `post-prose` narrow for reading comfort)
- `src/pages/prompts/[slug].astro` (line 42: `max-w-5xl`)
- `src/pages/roles/*.astro` (check `max-w-5xl` wrappers)

### Steps
1. In `src/styles/global.css`, update `.container`:
   ```css
   .container {
     width: 100%;
     max-width: 96rem;
     margin-inline: auto;
     padding-inline: 1rem;
   }
   ```
   (Keep existing `@media (min-width: 640px)` and `@media (min-width: 768px)` inline padding rules; optionally add `@media (min-width: 1280px) { .container { padding-inline: 2.5rem; } }`).
2. Search `src/` for hardcoded `max-w-5xl`, `max-w-6xl`, `max-w-7xl`, or `1320px` on **page/section containers** (e.g., `SkillChart.tsx`, `Beams.tsx`, `src/pages/roles/*.astro`, `src/pages/prompts/[slug].astro`, `src/pages/portfolio/index.astro`). Replace outer layout wrappers with `max-w-[96rem]` or rely directly on `.container`.
   - **Exception:** Do **NOT** widen long-form prose reading columns (`max-w-2xl` / `max-w-3xl` on `.post-prose` inside `src/pages/blog/[slug].astro`) beyond readable line length (`65ch–75ch`). Widen the outer grid container (`max-w-6xl` -> `max-w-[96rem]` or `.container`) while keeping the prose column comfortable.
3. Verify `Header.tsx` top bar + nav bar and `Footer.tsx` both use `.container` and align vertically edge-to-edge with page content at `>= 1536px` viewport width.

### Acceptance Criteria
- `.container` computes to `max-width: 96rem` (`1536px`) in DevTools at `1920px` viewport.
- No horizontal overflow (`scrollWidth <= innerWidth`) on mobile (`375px`) or desktop (`1920px`).

---

## TASK-02: Complete Museum of Motion Integration (`src/components/motion/`)

### Reference Repository
- Source repo: `https://github.com/johnpolacek/museum-of-motion`
- Required exhibits:
  1. **Unveil**: `https://tympanus.net/Demos/MuseumOfMotion/exhibits/unveil/` (`lib/motion/recipes/media-effects.ts` -> `imageReveal`, `pourReveal`, `archReveal`)
  2. **Marquee**: `https://tympanus.net/Demos/MuseumOfMotion/exhibits/marquee/` (`lib/motion/recipes/counters-and-marquees.ts`)
  3. **Pulse**: `https://tympanus.net/Demos/MuseumOfMotion/exhibits/pulse/` (`lib/motion/recipes/ambient.ts` -> `ping`, `heartbeat`, `bump`)
  4. **Reveal**: `https://tympanus.net/Demos/MuseumOfMotion/exhibits/reveal/` (`lib/motion/recipes/scroll-effects.ts` -> `revealOnScroll`, `scrubStatement`)
  5. **Stacking**: `https://tympanus.net/Demos/MuseumOfMotion/exhibits/stacking/` (`lib/motion/recipes/scroll-effects.ts` -> `stackCards`)
  6. **Hover**: `https://tympanus.net/Demos/MuseumOfMotion/exhibits/hover/` (`lib/motion/recipes/hover-effects.ts` -> `textRoll`, `underlineSweep`, `jelly`, `imageZoom`, `directionalFill`)
  7. **Cursor**: `https://tympanus.net/Demos/MuseumOfMotion/exhibits/cursor/` (`lib/motion/recipes/pointer-effects.ts` -> `cursorFollower`, `hoverPreview`, `spotlight`)
  8. **Stack**: `https://tympanus.net/Demos/MuseumOfMotion/exhibits/stack/` (`lib/motion/recipes/section-pager.ts` -> `sectionPager` Stack variant & `public/d-stack.html` card deck interaction)

### Read First
- `src/components/motion/index.ts`
- `src/components/motion/Unveil.tsx`
- `src/components/motion/Reveal.tsx`
- `src/components/motion/Marquee.tsx`
- `src/components/motion/Pulse.tsx`
- `src/components/motion/hover.ts`
- `src/components/work/stackCards.ts`

### Steps
1. **Upgrade `src/components/motion/Unveil.tsx`**:
   - Currently `Unveil.tsx` runs `gsap.fromTo` immediately on mount, which means below-the-fold elements finish animating before the user scrolls to them!
   - Add `triggerOnView?: boolean` (default `true`), `threshold?: number` (default `0.15`), `variant?: "wipe" | "arch" | "zoom"` (default `"wipe"`), and `innerScale?: number` (default `1.08` — subtle zoom settle on child media/content matching Museum of Motion's `imageReveal`).
   - Use `IntersectionObserver` (matching `Reveal.tsx`) so when `triggerOnView` is `true`, the clip-path wipe (`inset(...)` -> `inset(0% 0% 0% 0%)`) + inner scale settle (`scale(1.08)` -> `scale(1)`) only fires once the element enters the viewport.
   - Always check `prefersReducedMotion()` and clean up `observer.disconnect()` and `ctx?.revert()` on unmount.
   - Also export a small Astro-friendly DOM initializer `initUnveilElements(selector = "[data-unveil]")` so `.astro` components (like `SelectedWorkBlock.astro` and `Gallery.astro`) can trigger `Unveil` without wrapping every card in a heavy React island if desired.
2. **Extend `src/components/motion/hover.ts`**:
   - Keep existing `textRoll`, `underlineSweep`, `jelly`, `prefersReducedMotion`.
   - Port `imageZoom` and `directionalFill` from `johnpolacek/museum-of-motion` `lib/motion/recipes/hover-effects.ts`, following the exact same `own(...)` GSAP context + `hotState(...)` + `snapshotStyles(...)` + `Teardown` pattern already in `hover.ts`.
3. **Create `src/components/motion/CursorFollower.tsx` & `src/components/motion/cursor.ts`**:
   - Port `cursorFollower`, `hoverPreview`, and `spotlight` from `johnpolacek/museum-of-motion` `lib/motion/recipes/pointer-effects.ts` (exclude GSAP paid plugins if not installed — inspect `package.json` first: `gsap` 3.14.2 is installed; `Draggable` is free in GSAP, whereas `InertiaPlugin` was made free in GSAP 3.13+, verify imports work with `npm run check` before relying on `InertiaPlugin`, or use pure GSAP `quickTo` for `cursorFollower`, `hoverPreview`, `spotlight`).
   - Only activate on `(hover: hover) and (pointer: fine)` and when `!prefersReducedMotion()`.
   - Provide an opt-in React component `<CursorSpotlight />` / `data-cursor-preview` hook rather than hijacking the native OS cursor globally everywhere.
4. **Create `src/components/motion/CardStackDeck.tsx` (Stack exhibit)**:
   - Implement an interactive draggable/clickable card stack (`Stack` exhibit) using GSAP (`gsap` / `Draggable` or `motion/react`) with Next/Prev + click-to-cycle + drag-to-flick + keyboard arrow navigation (`ArrowLeft`/`ArrowRight`), zero border-radius, crisp focus states, and `prefersReducedMotion()` fallback.
5. **Update `src/components/motion/index.ts`**:
   - Re-export all 8 exhibit primitives (`Unveil`, `initUnveilElements`, `Reveal`, `Marquee`, `Pulse`, `stackCards`, `initSelectedWorkStack`, `textRoll`, `underlineSweep`, `jelly`, `imageZoom`, `directionalFill`, `cursorFollower`, `hoverPreview`, `spotlight`, `CardStackDeck`, `prefersReducedMotion`).

### Acceptance Criteria
- All 8 Museum of Motion exhibits are exported cleanly from `src/components/motion/index.ts`.
- `Unveil` triggers on scroll into view and respects `prefers-reduced-motion: reduce`.
- No memory leaks or orphaned ScrollTriggers across Astro client router page swaps (`astro:before-swap`).

---

## TASK-03: New Dark Borderless Card Style (Awards, Writing/Blog, Tech Timeline)

### Goal
Redesign the cards in **Awards**, **Writing / Blog**, and **Tech Timeline** to a completely new style:
- **Darker background** (deep espresso/obsidian surface, e.g. `#17140f` / `#1d1912`, hover `#252017`)
- **Crisp white / warm-paper text** (`#ffffff` / `#f2efe7`, secondary `#b8b0a0` ensuring `>= 4.5:1` WCAG AA contrast)
- **NO borders** (`border-0`, NO `1.5px solid var(--ink)`, NO `.hard` offset shadow, NO `.on-paper` cream overrides)
- **Blog post cards MUST NOT use 3D perspective** (remove `Card3D`, `perspective`, `preserve-3d`, `rotateX`, `rotateY`).

### Read First
- `src/blocks/AwardsBlock.astro`
- `src/assets/awards/` (note: `cannen-b.png`, `guldagg-b.png`, `svenskadesign-b.png` AND `cannen.png`, `guldagg.png`, `svenskadesign.png` exist — check which variant has light/transparent pixels suitable for dark `#17140f` background!)
- `src/components/blog/BlogCard.tsx`
- `src/blocks/BlogBlock.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/page/[page].astro`
- `src/components/RankTimeline.jsx`
- `src/components/rank-timeline/RankStoryCard.jsx`
- `src/components/rank-timeline/RankTimelineGrid.jsx`

### Steps
1. **Awards (`src/blocks/AwardsBlock.astro`)**:
   - Remove `<Card3D>` wrapper and `.on-paper` / `border-ink` / `border-b-[1.5px]` / `border-t-[1.5px]`.
   - Style each award card as a dark, borderless editorial monolith:
     - Container: `group relative flex h-full flex-col justify-between bg-[#17140f] p-7 text-white transition-colors duration-200 hover:bg-[#221d16] dark:bg-[#1f1b14] dark:hover:bg-[#2a241b]` (ZERO borders, zero box-shadow).
     - Top metadata row: `HONOR / 0{index + 1}` in `text-white/60` + borderless `WINNER` pill (`bg-mustard text-ink font-pixel text-xs px-2.5 py-0.5`).
     - Image stage: verify visually whether `cannen.png` or `cannen-b.png` (and `guldagg`/`svenskadesign`) looks best on `#17140f` (use whichever is white/gold/high-contrast on dark, or apply clean backgroundless presentation; never put a white box behind it).
     - Title (`text-white`), description (`text-white/75`), and bottom CTA (`View case study ->` with `textRoll` or `underlineSweep` from `hover.ts`, no heavy bordered `.key` box inside if flat borderless look works better, or clean borderless mustard/white pill button).
   - Add `Reveal` or `Unveil` entrance on scroll.
2. **Writing / Blog (`src/components/blog/BlogCard.tsx`)**:
   - **Ensure ZERO 3D perspective**: do NOT import or wrap in `Card3D`, do NOT set `perspective`, `preserve-3d`, `translateZ`, `rotateX`, or `rotateY`.
   - **Ensure ZERO borders**: remove `on-paper`, `hard`, `bg-cream`, `border-ink`, `border-b-[1.5px]`, `border-t-[1.5px]`, and the OS-7 pinstripe titlebar.
   - New flat dark card markup:
     - `<article className="group flex h-full flex-col justify-between bg-[#17140f] text-white transition-colors duration-200 hover:bg-[#211c15] dark:bg-[#1e1a13] dark:hover:bg-[#282219]">`
     - Top cover media (`overflow-hidden bg-[#110e0a]`, `aspect-[16/10]` or `h-52` / `h-64` for `featured`): full-bleed `<img className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />`. No border between image and text. If no cover image, render a dark typographic fallback (`bg-[#221d16]`).
     - Content padding `p-6`:
       - Meta row: date (`text-white/60 label-mono`) + borderless category pills (`bg-white/10 text-white/90 px-2.5 py-0.5 label-mono text-[10px]`).
       - Title: `text-xl md:text-2xl font-bold tracking-[-0.03em] text-white group-hover:text-mustard transition-colors`.
       - Excerpt: `mt-3 line-clamp-3 text-sm leading-relaxed text-white/75`.
     - Footer row (`px-6 pb-6 pt-2 flex items-center justify-between`): `"Read article ->"` in `font-mono text-xs uppercase tracking-widest text-mustard` with `underlineSweep` / arrow shift on hover.
   - Verify `BlogBlock.astro` (home page), `src/pages/blog/index.astro`, and `src/pages/blog/page/[page].astro` all render cleanly with the new `BlogCard` in both Light and Dark themes.
3. **Tech Timeline Cards (`src/components/rank-timeline/RankStoryCard.jsx` & `RankTimelineGrid.jsx`)**:
   - Remove `.on-paper`, `bg-cream`, `bg-paper`, `border-[1.5px] border-ink`, and hard `shadow-[...]` from `RankStoryCard.jsx`.
   - Style each `RankStoryCard` with dark background (`bg-[#17140f] dark:bg-[#1d1912]`, selected state `bg-[#241f17] ring-0` with subtle top accent bar `h-1 bg-mustard` instead of border/shadow!), crisp white text (`text-white`), zero borders on inner rows (`divide-y divide-white/10` or spacing-based rows `bg-white/[0.04]` instead of `border-[1.5px] border-ink`), and borderless category badges (`bg-mint/20 text-mint`, `bg-mustard/20 text-mustard`, etc.).
   - Coordinate with `TASK-10C` for the surrounding `#tech-timeline` section light/dark mode styling.

### Acceptance Criteria
- Awards, Blog (`/` and `/blog`), and Tech Timeline cards all have dark backgrounds, white text, and zero borders (`border-width: 0px`).
- `BlogCard.tsx` has zero 3D perspective transforms.
- WCAG AA text contrast (`>= 4.5:1`) verified on all card labels, dates, excerpts, and badges.

---

## TASK-04: `/work` Page Cards Overhaul

### Goal
Redesign the cards on `http://localhost:4321/work` (`src/pages/work.astro`) so that:
- Images are **much bigger** with **NO padding** around the image (`p-0`, full-bleed cover).
- Card colors match the new dark borderless card aesthetic (darker background, white text, no borders, no OS-7 cream box).

### Read First
- `src/pages/work.astro`
- `src/components/ProjectCard3D.tsx` (note: `/portfolio` also uses `ProjectCard3D`, so do **NOT** break `/portfolio` unless intended; instead create a dedicated `WorkCard` component!)
- `src/data/portfolio-resume.json` (`companies` array — check `image` paths like `/img/company/bb2logo.jpg`, `/img/company/Tlogo.jpg`, etc.)

### Steps
1. Create `src/components/work/WorkCard.tsx` (or `WorkCard.astro`) specifically for `/work`:
   - **Zero borders, zero 3D cream chrome**: `group flex h-full flex-col overflow-hidden bg-[#17140f] text-white transition-colors duration-200 hover:bg-[#221d16] dark:bg-[#1e1a13] dark:hover:bg-[#282219]`.
   - **Bigger full-bleed image stage with ZERO padding**:
     - Container: `relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-[#110e0a] p-0` (no `p-6`, no `p-2`, no `isLogoOrCompany` shrink!).
     - `<img src={image.src} alt={...} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />` (make sure logos/company images fill edge-to-edge cleanly without surrounding padding).
     - Optional subtle dark gradient scrim only at the very bottom edge if needed for a floating year badge, or place year cleanly in the text body below.
   - **Card Body (`p-6 flex flex-1 flex-col justify-between`)**:
     - Position badge (`label-mono text-[11px] text-mustard uppercase`) + Year (`text-white/60 font-mono text-xs`).
     - Company Name (`text-2xl font-bold tracking-[-0.03em] text-white mt-2`).
     - Description (`mt-2 line-clamp-3 text-sm leading-relaxed text-white/75`).
     - Tags (`mt-5 flex flex-wrap gap-1.5` using borderless `bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white/85`).
     - Footer CTA (`mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mustard`).
2. Update `src/pages/work.astro` to replace `<ProjectCard3D ... />` with `<WorkCard ... />` wrapped in `<Reveal>` or `<Unveil>` entrance.
3. Also check `public/img/company/*.jpg` aspect ratios at runtime on `/work` to verify `object-cover` looks sharp and doesn't awkwardly crop text inside company logos (if any logo image is square with tight text, check `object-cover object-center` vs subtle dark matte fallback only if distorted—user explicitly requested **bigger image and no padding around image**, so default to full-bleed `p-0 w-full h-full object-cover`).

### Acceptance Criteria
- On `/work`, card images have zero padding around them and occupy a larger proportion of the card (`aspect-[4/3]` or `aspect-[16/11]`).
- Cards use dark background, white text, and zero borders.

---

## TASK-05: `/work/[slug]` (`WorkDetailView.tsx`) — Remove Cream Backgrounds & Update Sidebar Colors

### Goal
On `/work/bredband2` (and all `/work/[slug]` pages), remove the cream background from `/ Role & architecture` and change the colors of the right sidebar (`STACK & DURATION` and `TEAM ROSTER`).

### Read First
- `src/pages/work/[slug].astro`
- `src/components/work/WorkDetailView.tsx` (lines 97–292)

### Steps
1. In `src/components/work/WorkDetailView.tsx`:
   - **Top Hero (`section.block-mustard`)**: Keep or ensure it pairs well, or keep as poster header while updating the lower 2-column detail area.
   - **Left Column (`/ Role & architecture`, lines 118–138)**:
     - Remove `on-paper hard bg-cream text-ink divide-y-[1.5px] divide-ink`.
     - Replace with dark/surface styling consistent with the new dark card language (or theme-aware dark card):
       - Container: `bg-[#17140f] text-white dark:bg-[#1e1a13] divide-y divide-white/10` (no cream, no borders!).
       - Row index (`01`, `02`, ...): `label-mono text-mustard`.
       - Row text: `text-base leading-relaxed text-white/90`.
   - **Left Column (`/ Focus areas` & `/ Recognition`)**:
     - Update Focus area pills (`bg-cream` -> `bg-[#17140f] text-white` or `bg-card text-foreground` with no cream background) and Recognition cards (`bg-cream` -> `bg-[#17140f] text-white` borderless) so the entire detail body feels cohesive without jarring cream blocks.
   - **Right Sidebar (`lg:col-span-4`, lines 218–288)**:
     - **`STACK & DURATION` panel**:
       - Remove `on-paper hard bg-cream text-ink` and the cream titlebar (`bg-cream`).
       - Style with dark surface `bg-[#17140f] text-white dark:bg-[#1e1a13]` (zero borders; top header strip `bg-[#241f17] px-4 py-3` with accent square `bg-tomato` + `STACK & DURATION` in `font-pixel text-xs text-white`; rows `divide-y divide-white/10` with skill name in `text-white` and duration in `text-mustard font-mono text-xs`).
     - **`TEAM ROSTER` panel**:
       - Remove `on-paper hard bg-cream text-ink` and `bg-cream`.
       - Style with dark surface `bg-[#17140f] text-white dark:bg-[#1e1a13]` (top header strip `bg-[#241f17]`, avatar frame `bg-[#2b251c]` borderless, member name `text-white`, role `text-white/65`).
2. Also check `relatedProjects` (`Shipped at {company.name}`) in `WorkDetailView.tsx` (lines 188–215) so they align cleanly in both light and dark modes.

### Acceptance Criteria
- Visiting `/work/bredband2` shows NO cream background on `/ Role & architecture`, `STACK & DURATION`, or `TEAM ROSTER`.
- Text contrast is crisp in both Light mode and Dark mode.

---

## TASK-06: `"Also on the shelf"` Unveil Animation (`SelectedWorkBlock.astro`)

### Goal
Add the Museum of Motion **Unveil** animation (`clip-path` wipe + settle) to every card in the `"Also on the shelf"` section on the home page.

### Read First
- `src/blocks/SelectedWorkBlock.astro` (lines 151–184)
- `src/components/motion/Unveil.tsx` (updated in `TASK-02`)

### Steps
1. Locate the `"Also on the shelf"` `<ul>` grid in `src/blocks/SelectedWorkBlock.astro` (around lines 154–182).
2. Add Unveil animation to each `<li>` card:
   - Option A (React wrapper): Wrap each card's inner `<a>` or content in `<Unveil client:visible direction="up" delay={idx * 0.08} triggerOnView={true}>...</Unveil>`.
   - Option B (Lighter Astro + GSAP script using `initUnveilElements` from `TASK-02`): Add `data-unveil="up"` and `data-unveil-delay={idx * 0.08}` to each shelf card item and invoke `initUnveilElements("[data-shelf-unveil]")` inside the `<script>` block of `SelectedWorkBlock.astro` (mounting on initial load + `astro:page-load` and reverting on `astro:before-swap`, right alongside `initSelectedWorkStack()`).
3. Ensure:
   - The `clip-path` wipe reveals smoothly (`inset(100% 0% 0% 0%)` -> `inset(0% 0% 0% 0%)`, `power3.out`, staggered by `0.07s–0.08s` per card) ONLY when scrolled into view.
   - `prefers-reduced-motion: reduce` skips the animation and leaves all cards immediately visible (`opacity: 1`, no `clip-path`).
   - Border-collapsed grid lines (`border-r-[1.5px] border-b-[1.5px]`) remain crisp and never flicker during clip-path animation (apply `data-unveil` on the card wrapper or inner block cleanly).

### Acceptance Criteria
- Scrolling down to `"Also on the shelf"` on `/` triggers a staggered Unveil clip-path reveal on the shelf cards.
- Works after Astro View Transition navigation back to `/`.

---

## TASK-07: About Page — New `"TRUE FIREFOXER"` Section (`src/pages/about.astro`)

### Goal
Add a new dedicated section on `/about` titled **TRUE FIREFOXER** celebrating 20+ years of daily Firefox usage, advocacy for the open web, Gecko, privacy, and DevTools mastery.

### Read First
- `src/pages/about.astro` (lines 76–190)
- `DESIGN.md`

### Steps
1. In `src/pages/about.astro`, add `<section id="firefoxer" class="block-ink section">` (or place between `#motivators` and `#tea`, alternating cleanly with `#motivators` [paper] and `#tea` [mint]!).
2. Include the standard editorial top index bar:
   - Left: `<p class="label-mono">/ Browser allegiance</p>`
   - Right: `<p class="label-mono hidden opacity-70 sm:block">20+ years on Gecko</p>` + square marker (`bg-tomato`).
3. Structure the content in a 12-column layout (`grid-cols-1 gap-10 lg:grid-cols-12`):
   - **Left column (`lg:col-span-5`)**:
     - Display heading: `TRUE FIREFOXER.` (`text-4xl md:text-6xl font-bold tracking-[-0.04em] text-paper`).
     - Tactile stat row (`dl`):
       - `20+` (`Years daily driving`)
       - `2004 -> 2026` (`Phoenix to Quantum`)
       - `100%` (`Open-web standards`)
     - Clean custom inline SVG geometric Firefox/fox emblem or retro browser window badge (no external broken image URLs!).
   - **Right column (`lg:col-span-7`)**:
     - Narrative copy written in Ehsan's voice (NO generic AI slop, NO em-dashes):
       - Cover 20+ years starting back in the early 2000s (Phoenix/Firebird -> Firefox 1.0 -> Firebug era -> modern Firefox Developer Edition & Containers).
       - Why it matters to his engineering craft: testing outside Chromium monocultures, CSS Grid/Subgrid & Accessibility inspectors, Multi-Account Containers, custom `userChrome.css`, and backing an independent, privacy-first open web.
     - Compact 3–4 milestone cards/rows (`2004: First Install`, `2008: Firebug & DevTools`, `2017: Quantum & Grid`, `Today: Containers & Daily Driver`) styled in the dark borderless or tactile editorial language.

### Acceptance Criteria
- `/about` displays the `TRUE FIREFOXER` section cleanly between `#motivators` and `#tea`.
- Legible in both Light and Dark mode, responsive on mobile (`375px`) and desktop (`1440px`).

---

## TASK-08: Home Page Full-Screen Call-To-Action Section

### Goal
Add a full-screen closing Call-To-Action section on the home page (`src/pages/index.astro`), inspired by the final section of `https://www.aashishthakuri.com/contact`.

### Reference Pattern (`aashishthakuri.com/contact` final section)
- Full-viewport height (`min-h-[85vh] lg:min-h-screen flex flex-col justify-center`).
- High-contrast dark backdrop (`bg-[#110f0b]` / `block-ink` with generous whitespace).
- Eyebrow line: `A good idea starts with a hello.`
- Stacked large kinetic headline (2–3 lines with clip-window reveal): e.g., `Let's make something` / `worth building.`
- Concise 2-sentence brief: inviting founders, engineering teams, and creative directors to reach out.
- Interactive dual-part rolling CTA tabs (using Museum of Motion `textRoll` from `src/components/motion/hover.ts`):
  - Primary tab: `[ SEND ] [ MAIL ]` -> `mailto:ehsan.po@gmail.com` (from `contact.email` in `portfolio-resume.json`)
  - Secondary tab: `[ OPEN ] [ CONTACT ]` -> `/contact` (or `[ CHAT ] [ LINKEDIN ]` -> `https://www.linkedin.com/in/ehsanp/`)
- Bottom row of clean social icon links (`LinkedIn`, `GitHub`, `SoundCloud`, `Dribbble`, `YouTube` — sourced from `portfolio-resume.json` / `Footer.tsx`).

### Read First
- `src/pages/index.astro`
- `src/blocks/BoringVersionBlock.astro`
- `src/data/portfolio-resume.json` (`basics` & `contact`)
- `src/components/motion/hover.ts` (`textRoll`)

### Steps
1. Create `src/blocks/HomeCtaBlock.astro` (and optional React island `src/components/home/CtaRollButtons.tsx` for `textRoll` + `Reveal` animations).
2. Add `<HomeCtaBlock />` to `src/pages/index.astro` as the final full-screen section (after `<BoringVersionBlock />` and `<ClientMarquee />`, right above `<Footer />`).
3. Include a tactile interactive visual/graphic element alongside or behind the copy (e.g., subtle interactive cursor spotlight or geometric signal/studio-line SVG) without cluttering the full-screen typography.
4. Wire `textRoll` on the split-tab CTA buttons (`SEND` / `MAIL`, `BOOK` / `CALL`) on mount + cleanup.

### Acceptance Criteria
- Home page ends with a full-screen (`min-h-[85vh]`+) dark CTA block before the footer.
- Hovering/focusing the CTA buttons triggers smooth vertical text-roll animation (`prefersReducedMotion` safe).

---

## TASK-09: Home Page Hero — Pixelated Dithered Canvas + Klair Interactive Dot-Text (4 Variants to Choose From)

### Goal
Redesign the Home Page Hero (`src/blocks/HeroBlock.astro`) using:
1. The **pixelated dithered canvas background** engine from `https://motion-brew.com/components/pixel-feature-card` (Bayer 4x4 ordered dithering, drifting value-noise clouds, pointer glow/illumination, click ripple waves — **WITHOUT** the phone or Unsplash image!).
2. Inspired by `https://www.klair.co/` hero: bold oversized display wordmark (`EHSAN`) with interactive dots/pixels that move/react when the mouse hovers!
3. Build **4 selectable variants** so the user can live-preview all 4 on `http://localhost:4321/` and choose the winner.

### Read First
- `src/blocks/HeroBlock.astro`
- `src/components/hero/Island.astro`
- `https://motion-brew.com/r/pixel-feature-card.tsx` (lines 187–766: `BAYER`, `noise`, `fbm`, canvas `requestAnimationFrame` loop, `ripples`, `pointer`)
- `DESIGN.md`

### Steps
1. **Create `src/components/hero/PixelDotCanvas.tsx`**:
   - Extract and adapt the 2D `<canvas>` pixel-cloud engine from `pixel-feature-card.tsx`:
     - Props: `color`, `secondaryColor?`, `cellSize` (default `8`), `shape` (`"square" | "circle" | "cross"`), `speed`, `coverage`, `density`, `interactiveMode` (`"glow" | "repel" | "attract" | "text-mask"`), `wordmarkText?` (e.g. `"EHSAN"`), `className`.
     - **Do NOT render any phone frame or stock photos.**
     - Render full-bleed inside the hero (`absolute inset-0 w-full h-full`).
     - Handle `ResizeObserver`, `devicePixelRatio` scaling, pointer hover (`pointermove`/`pointerleave`), click ripples (`pointerdown`), and `useReducedMotion()` (static frame when reduced motion is enabled).
     - When `wordmarkText` or interactive dot-grid mode is active, sample offscreen `<canvas>` text mask or vector dot coordinates for `"EHSAN"` so dots forming `"EHSAN"` physically displace/spring back (`vx`, `vy` spring physics) or illuminate intensely when the mouse sweeps over them!
2. **Create 4 Hero Variants (`src/components/hero/variants/`)**:
   - **`HeroVariant1.tsx` — Klair Dot-Matrix Wordmark (`"EHSAN"` Interactive Particle Typography)**:
     - Warm `--tomato` (`#ef5b3b`) or `--ink` (`#17140f`) full-width stage.
     - Top/center giant `"EHSAN"` rendered as a high-density interactive pixel/dot matrix layered over subtle drifting Bayer dither clouds; hovering moves/scatters/illuminates the dots forming `"EHSAN"` with spring return, clicking sends a shockwave ripple.
     - Below/beside: role headline, short bio, `See the bench` + `Call the studio` `.key` buttons, and `13+ years` / `60+ projects` counters.
   - **`HeroVariant2.tsx` — Tomato Poster Split + Reactive Bayer Pixel Clouds**:
     - Keeps the crisp 12-col editorial poster split (`lg:col-span-5` copy + CTAs + stats on left) on `--tomato` background, with `PixelDotCanvas` spanning the entire hero background (`--ink` / `--cream` dithered clouds) AND `lg:col-span-7` featuring a large interactive pixel-dot `"EHSAN"` / cursor-reactive terminal frame (no `Island.astro` static illustration, or toggleable).
   - **`HeroVariant3.tsx` — Dark Studio Canvas + Luminous Tomato/Mustard Pixel Field**:
     - Deep dark `#14110c` hero canvas with vibrant `#ef5b3b` (tomato) and `#f4b829` (mustard) Bayer-dithered clouds + cursor spotlight + magnetic `"EHSAN"` dot wordmark in `GeistPixelSquare` / canvas dots + crisp white editorial copy.
   - **`HeroVariant4.tsx` — Blueprint Grid + Dual-Layer Dot Repulsion Poster**:
     - Warm paper/tomato split with a dense architectural dot-grid where cursor hover creates a magnetic repulsion wave and reveals subtle coordinates/pixel clouds behind oversized `"EHSAN"` display type.
3. **Create a Variant Switcher Shell (`src/components/hero/HeroShowcaseSwitcher.tsx`)**:
   - Wire into `src/blocks/HeroBlock.astro` (keeping the bottom ticker marquee intact!).
   - Reads initial variant from URL `?hero=1|2|3|4` (default `1`) or `localStorage("hero-variant")`.
   - Renders a subtle, sleek floating selector bar in the bottom-right corner of the hero (`V1: Klair Dots` | `V2: Poster Split` | `V3: Dark Pixel` | `V4: Blueprint Repel`) so the user can click through all 4 variants live on `localhost:4321` and pick one (once chosen, the winning variant will be locked in and the switcher removed in a follow-up).

### Acceptance Criteria
- All 4 hero variants render smoothly at 60fps on desktop (`requestAnimationFrame` pauses when offscreen via `IntersectionObserver`), have zero phone/stock images, react visibly to mouse hover and clicks, and respect `prefers-reduced-motion`.
- User can switch between Variants 1–4 via `?hero=1..4` or the hero switcher bar.

---

## TASK-10: `/skills` Page Fixes (Mint Green Section, Compact `SkillChart`, Dark/Light `RankTimeline`)

### Goal
Fix three visual/layout issues on `http://localhost:4321/skills`:
1. **Color alternation (`TASK-10A`)**: Currently both Section 1 (`PageHero`) and Section 2 (`TechStackBlock`) are mustard yellow (`block-mustard`). Make one of them mint green (`--mint: #93d3b0` / `.block-mint`).
2. **Skills Chart height (`TASK-10B`)**: Currently `SkillChart.tsx` stacks category buttons + `500px` radar + 3-column skill cards + stats card vertically, overflowing far beyond 1 viewport. Compact and redesign the layout so the full section fits comfortably inside 1 screen!
3. **Tech Timeline dark & light themes (`TASK-10C`)**: Currently `#tech-timeline` has a bright `block-cobalt` background and forced cream `.on-paper` cards. Make the section dark-moody and fix the light mode version so both light and dark modes look sharp and cohesive.

### Read First
- `src/pages/skills.astro`
- `src/components/hero/PageHero.astro`
- `src/blocks/TechStackBlock.astro`
- `src/components/SkillChart.tsx`
- `src/components/RankTimeline.jsx`
- `src/components/rank-timeline/RankStoryCard.jsx`
- `src/components/rank-timeline/RankTimelineGrid.jsx`
- `src/components/rank-timeline/RankTimelinePagination.jsx`
- `src/components/RankTimeline.css`

### Steps
1. **`TASK-10A` — Mint Green First or Second Section**:
   - Add an optional `variant?: "mustard" | "mint" | "cobalt" | "tomato" | "blush" | "ink"` prop to `src/components/hero/PageHero.astro` (default `"mustard"`) OR to `src/blocks/TechStackBlock.astro` (default `"mustard"`).
   - Recommended: Pass `variant="mint"` (`block-mint` using `--mint: #93d3b0`) to `<TechStackBlock showAll variant="mint" />` in `src/pages/skills.astro` (or to `<PageHero variant="mint" />` on `/skills`), so Section 1 is `block-mustard` and Section 2 is `block-mint` (`#93d3b0`) — zero back-to-back mustard!
2. **`TASK-10B` — Compact Single-Viewport `SkillChart.tsx`**:
   - Reduce section padding on `#skills-chart` (`py-10 md:py-14` instead of huge `section` + `mb-10`).
   - Change `SkillChart.tsx` container to `max-w-[96rem]` (per `TASK-01`).
   - Replace the vertical stack with a **compact 12-column side-by-side split** (`grid-cols-1 lg:grid-cols-12 gap-6 items-start`):
     - **Top bar**: Compact single-row scrollable/wrapping category buttons (`px-2.5! py-1.5! text-[11px]!`, `mb-4` instead of `mb-8`).
     - **Left (`lg:col-span-5`)**: Radar chart at `h-[280px] sm:h-[320px]` (down from `500px`!) + compact inline 3-stat strip directly underneath (`Technologies` | `Avg Expertise` | `Expert 9-10` in a tight `grid-cols-3 gap-3 pt-3`).
     - **Right (`lg:col-span-7`)**: Compact 2-column or 3-column mini skill rows (`p-2.5` instead of `p-4`, single-line name + level + thin `h-1.5` bar) so all items + stats + radar sit side-by-side in **<= 520px** height inside the card!
   - Also fix Radar chart colors (`pointLabels`, `ticks`, `grid`, `legend`) so they read cleanly in the chosen card surface.
3. **`TASK-10C` — Tech Timeline Dark & Light Mode Fix**:
   - In `src/pages/skills.astro`, remove `block-cobalt` from `<section id="tech-timeline">`.
   - Use theme-aware section background:
     - Light mode (`default`): subtle warm-charcoal/paper contrast e.g. `bg-[#e5e0d4] text-ink` (or dark `#110f0b text-paper` if always dark-moody, with dark borderless cards `bg-[#17140f] text-white`). Wait — user explicitly said: *"Tech Timeline. has a bright background. make it more darkmody and fix the ligth version for it as well."*
     - Implement **proper theme-aware styling** for `#tech-timeline`:
       - **Dark mode (`.dark`)**: deep obsidian background `dark:bg-[#0e0c09] dark:text-paper`, cards `bg-[#18140f] text-white` (no borders), timeline grid canvas `bg-[#14110d]` with subtle `white/10` grid lines and high-contrast category bars.
       - **Light mode (`.light`)**: moody slate-paper/stone section (`bg-[#e9e4d8] text-ink` — NOT bright cobalt `#76a0e2`!) OR deep charcoal section with crisp dark borderless cards (`bg-[#17140f] text-white`), and make sure `RankTimelinePagination`, `Story Cards` / `Timeline Grid` toggle buttons, `RankTimelineGrid` category filter tabs, sticky year ruler, and `RankTimeline.css` scrollbars all look intentional and high-contrast in **both** light and dark modes (remove `.on-paper`, `bg-cream`, and `border-[1.5px] border-ink` from `RankStoryCard`, `RankTimelineGrid`, `RankTimelinePagination`).

### Acceptance Criteria
- `/skills` has alternating Mustard and Mint (`#93d3b0`) sections at the top.
- `SkillChart` (tabs + radar + skill bars + stats) fits comfortably within a single `1080p` / `900p` desktop viewport without scrolling past the chart to see stats.
- `Tech Timeline` has zero bright cobalt background, uses dark borderless cards with white text, and renders cleanly in both Light and Dark modes.

---

## TASK-11: GitHub Contributions Upgrade (`ActivityGrid` from Motion Brew)

### Goal
Replace the `react-calendar-heatmap` implementation in `src/components/GitHubContributions.tsx` with the animated `ActivityGrid` component from `https://motion-brew.com/components/activity-grid`, displaying real GitHub data for `ehsanpo` plus **Total sessions / contributions**, **Longest streak**, and **Current streak**.

### Read First
- `src/components/GitHubContributions.tsx`
- `src/blocks/GitHubContributionsBlock.astro`
- `https://motion-brew.com/r/activity-grid.tsx`

### Steps
1. Fetch/port `https://motion-brew.com/r/activity-grid.tsx` into `src/components/motion-brew/ActivityGrid.tsx`.
   - Dependencies check: `motion` (`12.29.0`), `clsx`, `tailwind-merge` are already in `package.json` (`clsx` may be transitive — check `package.json` and install `clsx` if not listed directly, or use `@/lib/utils` `cn` + `twMerge`).
   - Adapt styling tokens in `ActivityGrid.tsx` to match the portfolio's aesthetic (`--radius: 0rem` crisp square cells, dark/light theme compatibility, custom `palette` using `--mint`, `--cobalt`, `--mustard`, `--tomato` or Motion Brew's `mint`/`amber` palettes).
2. Update `src/components/GitHubContributions.tsx` (or create a wrapper) to:
   - Fetch `https://github-contributions-api.jogruber.de/v4/${username}?y=${selectedYear}` (and `"last"` for rolling 365 days / current streak calculation!).
   - Compute accurate metrics from the returned `contributions: { date, count, level }[]` array:
     - **Total contributions / sessions**: `data.total[selectedYear]` (or sum of counts).
     - **Longest streak**: maximum consecutive days with `count > 0` in the dataset.
     - **Current streak**: consecutive days with `count > 0` counting backwards from today (or yesterday if today is 0).
     - **Active days** & **Peak day**.
   - Pass the ordered daily `number[]` array (`oldest -> newest`) and `endDate` into `<ActivityGrid />`, with `unit="contribution"` (or `"commit"`), `showStats={true}`, year selector (`2018..currentYear`), and animated count-up numbers + row/column hover crosshairs from `ActivityGrid`!
   - Keep a clean fallback/loading skeleton state so there is zero layout shift while fetching.

### Acceptance Criteria
- `/skills` GitHub Activity section renders the Motion Brew `ActivityGrid` with sweeping cell animation, row/column hover highlighting, and live stats for **Total contributions**, **Longest streak**, and **Current streak**.
- Works in both Light and Dark modes, and degrades gracefully if the external API is unreachable.

---

## TASK-12: Development Process Upgrade (`BrandBridge` from Motion Brew)

### Goal
Replace `<ProcessFlowDiagram />` (`src/components/Beams.tsx`) in the `#development-process` section of `src/pages/skills.astro` with an adapted **`BrandBridge`** component from `https://motion-brew.com/components/brand-bridge` to tell the story of how Ehsan works.

### Read First
- `src/pages/skills.astro` (lines 58–72)
- `src/components/Beams.tsx`
- `https://motion-brew.com/r/brand-bridge.tsx`

### Steps
1. Port `https://motion-brew.com/r/brand-bridge.tsx` into `src/components/motion-brew/BrandBridge.tsx`.
2. Customize the `BrandBridge` configuration for Ehsan's **Development Process** (`src/components/skills/DevelopmentProcessBridge.tsx`):
   - **Left Column (Inputs & Discovery — 4 nodes)**:
     1. `Product Specs` (Jira / RFCs / Problem Definition — `#ef5b3b`)
     2. `UI/UX Design` (Figma / Design Systems — `#f3a6bb`)
     3. `Architecture` (APIs / Data Models — `#76a0e2`)
     4. `AI Tooling` (Skills / Agents / Prototyping — `#f4b829`)
   - **Center Hub (`HUB`)**:
     - Ehsan's monogram mark + `"BUILD"` / `"CORE"` label with rotating color ring that pulses as comets land.
   - **Right Column (Execution & Delivery — 4 nodes)**:
     5. `TypeScript & UI` (React / Astro / Accessible Frontend — `#93d3b0`)
     6. `Backend & APIs` (Node / Go / Rails / DBs — `#f4b829`)
     7. `Testing & QA` (Typecheck / Audits / Edge Cases — `#76a0e2`)
     8. `Ship & Monitor` (CI/CD / Cloud / Production — `#ef5b3b`)
   - **Interactive Story Copy**: When a user clicks or hovers any node on the bridge, show a crisp 1-line explanation underneath of how that stage works in Ehsan's process (plus `autoplay={true}` so nodes connect one-by-one on scroll into view and shoot glowing gradient comets into the center hub!).
3. Replace `<ProcessFlowDiagram client:load />` in `src/pages/skills.astro` with `<DevelopmentProcessBridge client:visible />`.
4. Ensure responsive scaling (`W=480, H=300` stage scales cleanly on `375px` mobile without horizontal page overflow) and crisp legibility in both Light and Dark modes.

### Acceptance Criteria
- `#development-process` on `/skills` uses `BrandBridge` with interactive clickable tiles, gradient comet beams, background particle field, and clear storytelling of Ehsan's workflow.

---

## TASK-13: Token Usage Section on `/skills` (9router 30-Day / 60-Day Analytics)

### Goal
Add a new **Token Usage** section on `/skills` showing **30 days / 60 days** toggleable metrics: **Total Input Tokens**, **Total Output Tokens**, and **Top Models**, sourced from the locally installed **9router** SQLite database, with smooth animations.

### Verified Data Source (`9router` SQLite DB)
- Database path: `C:\Users\ep\AppData\Roaming\9router\db\data.sqlite`
- Verified tables:
  - `usageDaily (dateKey TEXT PK, data TEXT JSON)` — daily rollups containing `requests`, `promptTokens`, `completionTokens`, `cachedTokens`, `cost`, and `byModel` (map of `model|provider` -> `{ requests, promptTokens, completionTokens, cachedTokens, rawModel, provider }`).
  - `usageHistory (id, timestamp, provider, model, connectionId, apiKey, endpoint, promptTokens, completionTokens, cost, status, tokens, meta)` — currently 35,825 rows spanning `2026-10-13` to `2026-11-26`.
- **SECURITY REQUIREMENT:** `usageDaily.data` and `usageHistory` contain `apiKey`, `connectionId`, and `byAccount` IDs. The sync script MUST **strip** `apiKey`, `connectionId`, `byAccount`, `byApiKey`, and `cost` (unless user wants cost — prompt only asked for Input Tokens, Output Tokens, Top Models!).

### Read First
- `src/pages/skills.astro`
- `package.json`

### Steps
1. **Create Sync Script (`scripts/sync-9router-usage.mjs` or `.py`)**:
   - Reads `C:\Users\ep\AppData\Roaming\9router\db\data.sqlite` (read-only mode `file:...?mode=ro` so it never locks or conflicts with running 9router!).
   - Determines anchor date (`MAX(dateKey)` in `usageDaily`, e.g. `2026-11-26`, or `new Date()`).
   - Aggregates two windows:
     - `30d`: last 30 calendar days from anchor date
     - `60d`: last 60 calendar days from anchor date (if fewer than 60 calendar days exist in DB, record `availableDays` honestly — e.g. `45 days available` — never pad with fake data!)
   - For each window (`30d`, `60d`), output:
     - `totalInputTokens` (sum of `promptTokens`)
     - `totalOutputTokens` (sum of `completionTokens`)
     - `totalCachedTokens` (sum of `cachedTokens`)
     - `totalRequests` (sum of `requests`)
     - `activeDays` (days with `requests > 0`)
     - `dailySeries`: array of `{ date, inputTokens, outputTokens, requests }` sorted ascending
     - `topModels`: top 6–8 models sorted by `(promptTokens + completionTokens)` descending, containing `{ model: rawModel, provider, requests, inputTokens, outputTokens, sharePercent }` (normalized cleanly, zero keys/account IDs!).
   - Write output to `src/data/token-usage.json`.
   - Add `"sync:tokens": "python scripts/sync-9router-usage.py"` (or node script) to `package.json` and run it once immediately so `src/data/token-usage.json` exists for static `astro build`!
2. **Create `src/components/skills/TokenUsageStats.tsx` & `src/blocks/TokenUsageBlock.astro`**:
   - Interactive `30 Days` / `60 Days` toggle (`motion/react` `layoutId` pill or snappy tab transition).
   - **Animated KPI Counters**:
     - `Total Input Tokens` (formatted e.g. `3.97B` / `3,973,108,822` with count-up animation via `motion/react` `animate()` triggered `useInView`).
     - `Total Output Tokens` (e.g. `10.47M`).
     - `Total Requests` & `Cache Efficiency` (`cachedTokens / inputTokens %`).
   - **Animated Top Models Breakdown**:
     - Ranked horizontal bar rows (`gemini-3.8-flash-medium`, `gemini-3.8-flash-high`, `gemini-3.8-flash-low`, `gemini-4-argon-*`, etc.) with animated width bars (`motion.div` scaleX / width) showing input + output token breakdown and request share %.
   - **Animated Daily Pulse Sparkline / Bar Chart**:
     - Clean SVG or flex bar visualization of daily token volume across the 30d / 60d window with hover tooltips showing exact date + input/output counts.
   - Styled in the dark borderless card aesthetic (`bg-[#17140f] text-white`, zero borders) and placed on `src/pages/skills.astro` right next to/after GitHub Contributions.

### Acceptance Criteria
- `src/data/token-usage.json` contains zero API keys, emails, or connection IDs.
- `/skills` displays real 30d and 60d token usage stats with smooth count-up, toggle, and bar animations.

---

## TASK-14: `/portfolio/[slug]` Redesign (`aashishthakuri.com/sola` Sticky Sidebar Layout + Animated Images)

### Goal
Redesign `http://localhost:4321/portfolio/bredband2` (and all `/portfolio/[slug]` pages) to eliminate the bulky header card collage and long text pushing images far down. Adopt a layout inspired by `https://www.aashishthakuri.com/sola` and the blog post sticky sidebar:
- Clean header/sidebar only on the left so the user can immediately scroll through the visuals.
- Project images appear **right away** at the top of the right column with smooth animations.

### Read First
- `src/pages/portfolio/[slug].astro`
- `src/components/portfolio/PortfolioHeader.tsx`
- `src/components/portfolio/Gallery.astro`
- `src/pages/blog/[slug].astro` (lines 178–300: sticky sidebar grid pattern)

### Steps
1. **Replace `<PortfolioHeader />` + stacked layout in `src/pages/portfolio/[slug].astro`** with a clean 2-column editorial showcase (`container mx-auto pt-24 md:pt-28 pb-20`):
   - **Top minimal breadcrumb bar**: `<- All portfolio` (`/portfolio`) + optional agency link (`/work/${agencySlug}`) + live site button (`item.case_link_url`).
   - **2-Column Main Grid (`grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start`)**:
     - **Left Sticky Sidebar (`lg:col-span-4 lg:sticky lg:top-24 space-y-6`)**:
       - Project Title (`h1`, `text-4xl md:text-5xl font-bold tracking-[-0.04em]`).
       - Tagline (`text-lg text-muted-foreground leading-snug`).
       - Role & Tech tags (compact borderless pills).
       - Compact metadata list (`Client`, `Year`, `Agency` linked to `/work/${agencySlug}`).
       - **Collapsible `<details>` Story Accordions** (like `aashishthakuri.com/sola` `<details name="project-story">`):
         - Accordion 1 (default `open`): `Case Overview & Notes` -> wraps `<Content />` (with styled `.post-prose` inside a scrollable or clean compact container so long markdown never pushes the right-column gallery down!).
         - Accordion 2 (if applicable): `Stack & Specs` -> full tag/category/client metadata.
       - Action buttons (`Launch live project` + `Back to portfolio`).
     - **Right Visual Showcase Column (`lg:col-span-8 space-y-8`)**:
       - **Immediately visible at the top of the page** (no scrolling past long text first!):
       - Render hero/primary `background_image` / `cover` first as `01 / Hero Preview`, followed by every image in `item.bilder` (`item.images`) as numbered plates (`02 / ...`, `03 / ...`).
       - **Image Animations**:
         - Wrap each figure in Museum of Motion **Unveil** (`data-unveil="up"` / `Unveil` on scroll) + subtle hover zoom (`imageZoom` from `hover.ts`) and keep **PhotoSwipe** lightbox click-to-zoom working on every plate!
         - Zero bulky cream `.on-paper` window chrome around every image — let the artwork/screenshots breathe in crisp edge-to-edge frames (`bg-[#17140f]` dark caption bar or clean minimal caption row `01 / Title` underneath, matching `sola`).

### Acceptance Criteria
- On `/portfolio/bredband2`, the hero/gallery images are visible immediately above the fold on desktop alongside the sticky left sidebar.
- Clicking any image opens PhotoSwipe lightbox; scrolling reveals subsequent images with smooth `Unveil` animation.
- Mobile (`375px`) stacks the concise header/sidebar cleanly above the visual plates without excessive height.

---

## TASK-15: `/prompts` -> `AI-Skills` Page (`/ai-skills`) + `.md` Download + `npx skills add` + GitHub Repo Setup

### Goal
Transform `http://localhost:4321/prompts` into an **AI-Skills** hub (`/ai-skills`) structured for future skill expansion, with:
1. A **Download `.md`** button on every skill to download the raw markdown skill file.
2. An **`npx skills add ...`** install command snippet with one-click copy.
3. Clear structure & automation to sync/publish to a dedicated GitHub repository (e.g. `github.com/ehsanpo/ai-skills`).

### Read First
- `src/pages/prompts/index.astro`
- `src/pages/prompts/[slug].astro`
- `src/components/prompts/PromptHeader.tsx`
- `src/components/prompts/PromptDetail.tsx`
- `src/utils/data.ts` (`getPrompts`)
- `src/content/prompt/*.md` (7 existing markdown files)
- `src/components/footer/Footer.tsx` (line 60: `AI Prompts` -> `/prompts`)
- `src/data/portfolio-resume.json` (`navigation.footer`)

### Steps
1. **Routes & Redirects**:
   - Create `src/pages/ai-skills/index.astro` and `src/pages/ai-skills/[slug].astro` (keeping `src/pages/prompts/index.astro` and `src/pages/prompts/[slug].astro` as Astro `Astro.redirect("/ai-skills", 301)` / `/ai-skills/${slug}` so existing bookmarks never break).
   - Update navigation links in `src/components/footer/Footer.tsx` (`AI Skills`, `/ai-skills`) and `src/data/portfolio-resume.json` (`navigation.footer`), and optionally add `AI Skills` to `navigation.main` if desired.
2. **Content & Data Layer (`src/content/prompt/` or `src/content/ai-skills/`)**:
   - Keep existing markdown files or migrate cleanly to `src/content/ai-skills/` (and update `src/content.config.ts` / `getAiSkills()` in `src/utils/data.ts`).
   - Normalize slugs to clean kebab-case (`blog-writer`, `book-summary`, `cover-letter-generator`, `portfolio-writer`, `product-launcher`, `product-writer`, `resume-review-agent`) and read `entry.body` (raw markdown string!) + frontmatter so the exact `SKILL.md` content can be downloaded and exported!
   - Support optional frontmatter fields: `version`, `repo` (default `ehsanpo/ai-skills`), `skillName` (used in `npx skills add ehsanpo/ai-skills --skill <skillName>`).
3. **Download `.md` & `npx skills add` UX**:
   - **Install command bar** (both on cards/quick modal and prominently on `/ai-skills/[slug]`):
     - Shows `npx skills add ehsanpo/ai-skills --skill <slug>` in a dark terminal bar with a one-click **Copy Command** button (`Copied!` feedback).
     - Also show `npx skills add ehsanpo/ai-skills` on the `/ai-skills` index header to install the whole pack.
   - **Download `.md` button**:
     - Generate static `.md` files into `public/skills/<slug>/SKILL.md` (via an Astro build integration or small prebuild script `scripts/export-skills-md.mjs`) **AND/OR** attach a client-side `Blob` download button (`download="${slug}.md"`) containing the full frontmatter + markdown body (`SKILL.md` format). Having `public/skills/<slug>/SKILL.md` also gives direct raw URLs!
4. **GitHub Repo Setup Blueprint (include in `scripts/` + `Plan2.md` checklist)**:
   - Standard `skills.sh` / `npx skills add` repo convention expects a GitHub repo `ehsanpo/ai-skills` with structure:
     ```text
     ehsanpo/ai-skills/
     ├── README.md
     └── skills/
         ├── blog-writer/
         │   └── SKILL.md
         ├── resume-review-agent/
         │   └── SKILL.md
         ...
     ```
   - Create `scripts/export-skills-repo.mjs` that formats `src/content/prompt/*.md` (or `src/content/ai-skills/*.md`) into valid `SKILL.md` format (`name`, `description` YAML frontmatter + instructions) into a staging folder or `public/skills/`, ready to push to `github.com/ehsanpo/ai-skills`.
   - **Action item for user/deployment:** Create public GitHub repo `ehsanpo/ai-skills` and push the exported `skills/<slug>/SKILL.md` directory so `npx skills add ehsanpo/ai-skills` resolves live over GitHub!

### Acceptance Criteria
- `/ai-skills` and `/ai-skills/[slug]` render all skills cleanly; `/prompts` redirects to `/ai-skills`.
- Clicking **Download .md** downloads a valid `.md` file with frontmatter and instructions.
- Clicking **Copy `npx skills add`** copies `npx skills add ehsanpo/ai-skills --skill <slug>` to clipboard.

---

## TASK-16: `/roles` Interactive Redesign + 5 Uxcel Design Roles + Portfolio Examples per Role

### Goal
Replace the hated static grid on `https://ehsan-pourhadi.com/roles/` (`src/pages/roles/index.astro`) with a **highly interactive Role Explorer**, add **5 new design roles** modeled on Uxcel Career Paths (`ui-designer`, `ux-ui-designer`, `ux-designer`, `product-designer`, `service-designer`), and attach **real portfolio item examples** to **every role**.

### Reference Roles to Add
1. `UI Designer` (`ui-designer`) — ref `https://app.uxcel.com/career-paths/ui-designer` (visual hierarchy, design systems, typography, color tokens, micro-interactions, component specs)
2. `UX/UI Designer` (`ux-ui-designer`) — ref `https://app.uxcel.com/career-paths/ux-ui-designer` (end-to-end user flows, wireframing to high-fidelity UI, responsive interaction design, prototyping)
3. `UX Designer` (`ux-designer`) — ref `https://app.uxcel.com/career-paths/ux-designer` (user research, information architecture, usability testing, accessibility WCAG AA, journey mapping)
4. `Product Designer` (`product-designer`) — ref `https://app.uxcel.com/career-paths/product-designer` (product strategy, problem framing, outcome-driven UX, design-to-code handoff, KPI iteration)
5. `Service Designer` (`service-designer`) — ref `https://app.uxcel.com/career-paths/service-designer` (service blueprints, omnichannel customer journeys, self-service portals, cross-touchpoint orchestration)

### Verified Existing Portfolio Slugs for Mapping (`src/content/portfolio/`)
Use ONLY verified existing slugs from `src/content/portfolio/`:
- `Senior Software Engineer` (`senior-software-engineer`): `telavox`, `bredband2`, `mekonomen`
- `Product Engineer` (`product-engineer`): `bredband2`, `zhowtime`, `toolpool`
- `Engineering Manager` (`engineering-manager`): `telavox`, `guts-glory`, `whitespaces` -> verify exact folder name: `whitespace`, `bredband2`
- `DevOps Cloud Engineer` (`devops-cloud-engineer`): `clx-network`, `kammarkollegiet`, `telenor`
- `Music Production Technologist` (`music-production-technologist`): `040-fm`, `muslimix`, `thefanclub`
- `UI Designer` (`ui-designer`): `triwa`, `wilfa`, `malmo-saluhall`
- `UX/UI Designer` (`ux-ui-designer`): `pinchis`, `holy-greens`, `zest`
- `UX Designer` (`ux-designer`): `skaneleden`, `digital-matchningstjanst`, `bredband2`
- `Product Designer` (`product-designer`): `zhowtime`, `mekonomen-group`, `roofit`
- `Service Designer` (`service-designer`): `bredband2`, `stadshubbsalliansen`, `motesplatsip`
*(Agent MUST verify each slug exists in `getPortfolioItems()` when building and adjust if any slug's `permalink` differs from its folder name!)*

### Read First
- `src/pages/roles/index.astro`
- `src/pages/roles/product-engineer.astro` (and the other 4 files in `src/pages/roles/`)
- `src/data/portfolio-resume.json` (`roles` array)
- `src/utils/client-data.ts` (`getRoles`)
- `src/utils/roleImageMap.ts`

### Steps
1. **Extend `src/data/portfolio-resume.json` (`roles` array)**:
   - Add `track` (`"Engineering" | "Design" | "Leadership" | "Audio"`), `competencies` (4–6 core skills with proficiency 1–10), `deliverables` (3–4 bullet strings), and `portfolioSlugs` (2–3 verified portfolio slugs) to all 5 existing roles.
   - Add the **5 new design roles** (`ui-designer`, `ux-ui-designer`, `ux-designer`, `product-designer`, `service-designer`) with full `title`, `slug`, `track: "Design"`, `description`, `tags`, `competencies`, `deliverables`, and `portfolioSlugs`.
   - For `image` on the 5 new roles: check `src/utils/roleImageMap.ts` — if no custom PNG exists in `src/assets/roles/`, use clean vector/icon badges or reuse/create clean editorial visuals without broken image links.
2. **Create Interactive Role Explorer (`src/components/roles/InteractiveRolesExplorer.tsx`)**:
   - Replace the static 3-column `ProjectCard3D` grid on `src/pages/roles/index.astro`.
   - Interactive UI architecture (dark borderless or tactile split workbench):
     - **Track Filter Tabs**: `All (10)` | `Engineering & Cloud` | `Design & Product` | `Leadership & Audio`
     - **Left Interactive Role Selector List (`lg:col-span-5`)**:
       - Clickable/keyboard-navigable list of roles (numbered `01`..`10`), active indicator (`bg-mustard text-ink` or highlighted dark row), showing track tag & competency count.
     - **Right Live Interactive Role Stage (`lg:col-span-7`)**:
       - Animated transition (`motion/react` `AnimatePresence`) when switching roles:
         - Role title, track badge, description, core competencies with animated proficiency bars, key deliverables.
         - **Embedded Portfolio Examples Grid**: displays the 2–3 real mapped portfolio projects (with cover thumbnail, title, client, year, and direct link to `/portfolio/${slug}`).
         - Primary CTA button: `Open ${role.title} Deep-Dive ->` (`/roles/${role.slug}`).
     - Also include a **Role Comparison / Matrix Drawer or Toggle** (`List Explorer` vs `Interactive Card Stack` using `CardStackDeck` from `TASK-02`) for extra interactivity!
3. **Create Dynamic Route `src/pages/roles/[slug].astro`** (or update the 5 existing `.astro` files + add `[slug].astro` for the 5 new design roles):
   - Best approach: Keep existing custom rich content for the 5 engineering roles (or unify into `src/pages/roles/[slug].astro` with role-specific data sections) AND ensure **every** role page (`/roles/ui-designer`, `/roles/ux-ui-designer`, `/roles/ux-designer`, `/roles/product-designer`, `/roles/service-designer`, plus the original 5) renders a dedicated **Selected Portfolio Examples** section pulled dynamically from `getPortfolioItems()` using `role.portfolioSlugs`!

### Acceptance Criteria
- `/roles` renders all 10 roles (5 original + 5 Uxcel-inspired design roles) in an interactive split explorer with track filtering, live competency previews, and clickable portfolio project examples per role.
- Clicking any of the 10 roles opens its full detail page `/roles/<slug>` with real linked portfolio case studies.

---

## Final Cross-Task QA Checklist (Run After All Tasks)
1. `npm run sync:tokens` (regenerates `src/data/token-usage.json` safely without secrets).
2. `npm run check` (0 TypeScript or Astro check errors).
3. `npm run build` (clean static build into `dist/`).
4. Inspect every modified route in Light & Dark modes at `375px`, `768px`, `1440px`, and `1600px`:
   - `/` (4 Hero variants, Selected Work, `"Also on the shelf"` Unveil, Awards dark cards, Blog non-3D dark cards, full-screen CTA)
   - `/work` and `/work/bredband2` (full-bleed no-padding work cards; no cream on Role & Architecture or sidebar)
   - `/skills` (Mint + Mustard alternation, compact 1-screen `SkillChart`, Dark/Light `RankTimeline`, `ActivityGrid` streaks, `BrandBridge` dev process, 9router Token Usage)
   - `/about` (`TRUE FIREFOXER` section)
   - `/portfolio/bredband2` (`sola`-style sticky sidebar + immediate animated images)
   - `/ai-skills` and `/ai-skills/[slug]` (`.md` download + `npx skills add` + `/prompts` redirect)
   - `/roles` and `/roles/product-designer` (interactive explorer + 10 roles + portfolio examples)
