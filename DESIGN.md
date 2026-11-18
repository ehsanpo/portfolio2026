# DESIGN.md - Klair.co Editorial & Tactile Hardware Design System

> Reading this as: Full-stack engineering & music production portfolio for technical hiring leads, creative directors, and product founders, in a Klair.co warm newsprint & tactile poster/OS-7 hardware language, dial `ENERGY 3 / RHYTHM 3 / MOTION 2`.

## 1. Identity & Direction

- **Personality**: Tactile, editorial, mechanical, unpolished-on-purpose craft. Inspired by printed technical manuals, mid-century poster blocks, and classic Macintosh System 7 window chrome.
- **Dials**: `ENERGY 3 / RHYTHM 3 / MOTION 2`
  - **ENERGY 3 (Bold)**: Full-bleed poster color blocks (`tomato`, `mustard`, `cobalt`, `blush`, `mint`, `ink`), oversized pixel-grid display wordmarks, and crisp `1.5px` solid ink borders with hard offset shadows (`3px 3px 0` and `4px 4px 0`).
  - **RHYTHM 3 (Varied)**: Sections alternate asymmetrically between full-bleed poster chapters, 12-column technical showcase tables (`Fig. 01` to `Fig. 04`), border-collapsed index shelves, and dark espresso ink (`#231e16`) editorial spreads.
  - **MOTION 2 (Balanced)**: Snappy `80ms` mechanical button depressions (`.key`), continuous ticker marquees, and interactive 3D/audio hardware decks without gratuitous floating blobs or stacked fade-ins.

## 2. Color Palette & Atmospheric Polarity

### Core Tokens (Light Mode / Default Warm Newsprint)
- `--ink: #231e16` (Deep espresso-black ink for typography, structural rules, and hard offset shadows)
- `--paper: #f2efe7` (Warm newsprint default page canvas)
- `--cream: #fff4d6` (High-contrast warm card surface for `.on-paper` panels and tactile keys)
- `--tomato: #ef5b3b` (Primary poster block for the hero chapter and active status accents)
- `--mustard: #f4b829` (Technical specification block, selection highlight, and interactive hover surface)
- `--mint: #93d3b0` (Secondary project showcase block)
- `--cobalt: #76a0e2` (Editorial dispatch and showcase accent block)
- `--blush: #f3a6bb` (Credentials and certification chapter block)
- `--shadow-blue: #41538f` (Deep structural accent tone)
- `--brand: #d4411f` (Editorial rule accent, link underline, and section slash marker)
- `--muted-foreground: #5f5748` (Secondary metadata and caption ink on light surfaces, >4.5:1 AA contrast)
- `--border: #231e163d` (Subtle internal table dividers; primary structural frames use `1.5px solid var(--ink)`)

### Dark Mode Tokens (`.dark`)
- `--background: #17140f` (Deep espresso night canvas)
- `--foreground: #f2efe7` (Warm newsprint text)
- `--card: #201c15` (Elevated dark surface)
- `--secondary: #2b261d` (Secondary dark surface)
- `--muted: #2b261d` (Muted dark surface)
- `--muted-foreground: #b0a795` (Warm stone secondary text, >4.5:1 AA contrast on `#17140f`)
- `--brand: #f2674f` (Luminous tomato accent for dark surfaces)
- `--border: #f2efe733` (Subtle warm paper divider rule)

### Surface Invariance (`.on-paper` & `.block-*`)
- Poster blocks (`.block-tomato`, `.block-mustard`, `.block-mint`, `.block-cobalt`, `.block-blush`) and `.on-paper` cards lock `--foreground` and `color` to `#231e16` (`--ink`) across both light and dark themes so warm poster chapters and cream cards always maintain crisp, high-contrast ink legibility (R-25, R-34).

## 3. Typography & Scannable Hierarchy

- **Primary Sans (`GeistSans` / `--font-sans`)**:
  - Body copy: `400` weight, `-0.011em` tracking, optimized for editorial readability on warm paper.
  - Headings (`h1` to `h6`): `700` bold weight, `-0.04em` tight tracking, `1.02` to `1.05` line-height, `text-wrap: balance`.
- **Technical Mono (`GeistMono` / `--font-mono`)**:
  - Used for `.label-mono` (`11px`, `500` weight, uppercase, `0.14em` letter-spacing), `.key` mechanical buttons (`0.75rem`, `600` weight, uppercase, `0.1em` tracking), figure numbers (`Fig. 01`), and project specification tables (`dl`).
- **Display Pixel (`GeistPixelSquare` / `--font-pixel`)**:
  - Used for the top `EHSAN` wordmark, retro OS window titlebars (`ON AIR / STUDIO DECK`), and large numerical counters.
- **Legacy Font Aliases**:
  - `--font-kabel` and `--font-basement` map directly to `GeistSans` so all inner pages and legacy components inherit the Klair typographic voice automatically.

## 4. Explicit 1-Line Reasons for Every Visual Technique (R-31)

- **Warm Newsprint & Ink Palette (`#f2efe7` / `#231e16`)**: Replaces sterile pure-white/pure-black defaults with the warmth of physical print and archival technical manuals (R-01, R-29).
- **Full-Bleed Poster Chapters (`.block-tomato`, `.block-mustard`, `.block-ink`, `.block-blush`, `.block-cobalt`)**: Establishes unmistakable chapter breaks and high-contrast RHYTHM 3 pacing across long-form portfolio content without relying on generic card grids (R-01, R-05).
- **Geist Sans + Geist Mono + Geist Pixel Square Trio**: Separates narrative prose (`GeistSans`), structured engineering metadata (`GeistMono`), and hardware/display identity (`GeistPixelSquare`) into three distinct functional voices (R-06).
- **Hard Offset Shadows (`.hard`: `4px 4px 0 var(--ink)` & `.key`: `3px 3px 0 var(--ink)`)**: Marks interactive cards and mechanical buttons as physical, pressable objects resting above the page plane rather than floating in blurry glassmorphic space (R-12).
- **Zero Border Radius (`--radius: 0rem`)**: Enforces crisp architectural alignment where table cells, figure frames, and OS window bars lock together edge-to-edge without pill-shaped AI defaults (R-11).
- **Horizontal Pinstripe Bars (`.stripes`)**: Evokes classic Macintosh System 7 draggable titlebars to visually anchor interactive hardware widgets like the Studio Audio Deck and Game HUD (R-07, R-20).
- **Fixed SVG Fractal Noise Grain (`body::after` at `0.22` opacity, `mix-blend-mode: multiply`)**: Unifies flat poster fills and cream cards with a subtle tactile paper tooth so large color blocks feel ink-printed rather than digital plastic (R-07).
- **Section Top Index Rules (`/ Section label` + `size-2` square registration mark)**: Provides a consistent editorial index system modeled on technical blueprints so readers always know which chapter they are scanning (R-20).
