# GitHub Copilot Instructions

This is a modern portfolio website built with Astro, React, and TailwindCSS. The architecture follows a static site generation (SSG) approach with selective client-side interactivity.

## 🏗️ Architecture Overview

### Dual Development Environment

- **Main Portfolio**: Astro-based SSG with React components (`/src`)
- **AdminPanel**: Separate Vite + React app for content management (`/AdminPanel`)
- Use `npm run dev` in root for portfolio, `cd AdminPanel && npm run dev` for admin

### Component Architecture

- **Blocks** (`src/blocks/`): Page-level components that compose entire sections
- **Components** (`src/components/`): Reusable UI elements with nested organization by feature
- **UI Components** (`src/components/ui/`): Base design system components

### Data Flow Pattern

```
src/data/portfolio-resume.json → utils/data.ts → Astro components → React components
src/content/portfolio/ → Astro Content Collections → Portfolio pages
```

## 🔧 Key Patterns

### Content Management

- **Central Data**: All portfolio data lives in `src/data/portfolio.json` (contact, experience, navigation)
- **Case Studies**: Individual portfolio items in `src/content/portfolio/` as MDX files
- **Access Pattern**: Use `getPortfolioData()` and `getPortfolioItems()` from `utils/data.ts`

### Astro + React Integration

- Astro components for static content, React for client-side interactivity
- Use `client:load` directive for React components requiring browser APIs or user interaction
- GSAP animations require `noExternal: ["gsap"]` in vite config for build compatibility

### Styling System

- **Colors**: Custom palette in `tailwind.config.mjs` with semantic names (`primary`, `secondary`, `opium`)
- **Typography**: Custom font loading in `Layout.astro`
- **Components**: Uses `class-variance-authority` for component variants
- **Animations**: Framer Motion + GSAP for complex animations

## 🛠️ Development Commands

```bash
# Portfolio development
npm run dev          # Start Astro dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Admin panel (separate app)
cd AdminPanel
npm run dev          # Start admin panel dev server
npm run build        # Build admin panel
```

## 📁 File Organization

### Key Files to Know

- `src/data/portfolio.json` - Main content source of truth
- `src/content/config.ts` - Content collection schema definitions
- `src/utils/data.ts` - Data access utilities
- `tailwind.config.mjs` - Extended design system with custom colors

### When Adding New Features

- **New page**: Create in `src/pages/` (auto-routing)
- **Portfolio item**: Add folder + MDX in `src/content/portfolio/`
- **Reusable component**: Add to appropriate `src/components/` subfolder
- **Page section**: Consider using `src/blocks/` for large page segments

## ⚡ Performance Considerations

- Images are optimized automatically by Astro during build
- React components should use `client:load` sparingly (adds JavaScript to static pages)
- GSAP animations are bundled via vite config for static build compatibility
- PhotoSwipe is used for gallery functionality (already integrated)

## 🎨 Design System Usage

- Use semantic color names (`primary`, `secondary`) not hex values
- Component variants follow CVA pattern (see existing components)
- Animations use consistent timing and easing functions
- Responsive design follows mobile-first approach
