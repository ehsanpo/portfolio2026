# Modern Portfolio with Astro, React, and TailwindCSS

![PixelWorld Demo](https://github.com/ehsanpo/astro-template/blob/main/demo/pxworld.png?raw=true)

A modern, responsive portfolio website built with Astro, React, and TailwindCSS.

## 🚀 Features

- ⚡️ Lightning fast performance with Astro
- 🎨 Beautiful UI with TailwindCSS
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🔍 SEO optimized
- 🎮 Interactive PixelWorld component with weather effects
- 🔊 Dynamic sound generation system
- 📊 Portfolio showcase
- 💼 Services section
- 📝 Skills & Experience
- 📬 Contact form

## 🛠️ Tech Stack

- [Astro](https://astro.build)
- [React](https://reactjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [PhotoSwipe](https://photoswipe.com)

## 📁 Project Structure

```
/
├── public/          # Static assets
│   └── img/px/      # PixelWorld assets (light/dark themes)
├── src/
│   ├── components/  # UI components
│   │   ├── pixelworld/  # PixelWorld components
│   │   │   ├── PixelWorld.tsx
│   │   │   ├── FireAnimation.tsx
│   │   │   ├── WeatherSystem.tsx
│   │   │   └── index.ts
│   │   └── ...
│   ├── content/     # Portfolio content (MD files)
│   ├── data/        # JSON data files
│   ├── layouts/     # Page layouts
│   ├── pages/       # Route pages
│   ├── styles/      # Global styles
│   ├── types/       # TypeScript types
│   ├── utils/       # Utility functions
│   │   └── sounds.ts # Sound generation utilities
│   └── ...
└── package.json
```

## 🎯 Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 🎮 PixelWorld Component

An interactive pixel art world featuring:

- **Dynamic Weather System**: Rain, snow, fog effects with particle animations
- **Theme-aware Assets**: Automatically switches between light/dark themed pixel art
- **Interactive Elements**: Clickable animated cat with sound effects
- **Fire Animation**: Sprite-based campfire with looping animation
- **Parallax Effects**: Mouse-responsive background layers
- **Sound Generation**: Procedural audio for interactive elements

### Usage

```tsx
import { PixelWorld } from "./components/pixelworld";

<PixelWorld className="border-t border-neutral-800/50" height={320} />;
```

### Assets Structure

```
public/img/px/
├── dark/           # Dark theme assets
│   ├── sky.jpg
│   ├── mountain.png
│   ├── grass.png
│   ├── ground.jpg
│   ├── tree.png
│   └── stone.png
├── light/          # Light theme assets
│   ├── sky.png
│   ├── mountain.png
│   ├── grass.png
│   ├── ground.png
│   ├── tree.png
│   └── stone.png
└── fire/           # Fire animation sprites
    ├── CampFire1.png
    ├── CampFire2.png
    ├── ...
    └── fire_spritesheet.png
```

## 📝 Content Management

All content is managed through:

- `src/data/portfolio-resume.json` - Main data file
- `src/content/portfolio/` - Portfolio case studies (Markdown)

## 🎨 Customization

1. **Colors**: Edit `tailwind.config.mjs`
2. **Typography**: Update fonts in `Layout.astro`
3. **Content**: Modify `portfolio-resume.json` and Markdown files in `src/content/`
4. **PixelWorld**:
   - Replace assets in `public/img/px/`
   - Modify weather effects in `WeatherSystem.tsx`
   - Customize sounds in `utils/sounds.ts`
   - Adjust animations in CSS files

## 📄 Page Structure

- `/` - Homepage
- `/work` - Work showcase
- `/portfolio` - Portfolio showcase
- `/skills` - Skills & expertise
- `/about` - About information
- `/contact` - Contact form
- `/styleguide` - Component library (hidden)
- `/plan` - Improvement plan and roadmap
