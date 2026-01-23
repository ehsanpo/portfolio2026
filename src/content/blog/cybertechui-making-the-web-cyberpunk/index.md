---
title: "Making the Web Cyberpunk: CSS Shapes and the Figma Pipeline"
description: "Building CyberTechUI - a high-tech UI library using CSS shapes, and discovering that Firefox doesn't support the future"
date: "2026-01-14"
author: "Ehsan Pourhadi"
category: ["UI/UX", "Design Systems"]
tag: ["CSS", "React", "Tailwind", "Design", "Figma", "shadcn"]
featured: true
draft: false
cover: "logo.png"
---

## The Web Is Made of Rectangles (and I hate that)

I'm obsessed with cyberpunk UI. The angled corners, irregular shapes, neon borders, HUD-style interfaces that look like they're from Blade Runner or Cyberpunk 2077.

My portfolio has it. Every side project I make, I try to sneak it in. That high-tech, sci-fi aesthetic that somehow still works for real content.

But here's the reality: CSS was built for rectangles. Making anything else functional for actual web content means fighting the browser every step of the way.

## First Try: augmented-ui

A few years back I found [augmented-ui](https://github.com/propjockey/augmented-ui). Finally, a tool built for this exact aesthetic.

It worked beautifully for gaming cards and flashy UI elements. But when I tried building actual page layouts? The abstraction started breaking down. I spent hours making things that looked cool but didn't quite fit how I wanted to structure content.

The tool wasn't the problem. I was trying to force it into a workflow it wasn't designed for.

## The Custom Solution: clip-path Hell

For my own site, I took inspiration from augmented-ui and hand-coded 3-4 custom clip-path CSS classes. Spent time converting everything from percentage values to fit my 8-point grid. Made them reusable across cards and sections.

It works. I like how it looks. It's unique because most people don't bother with this level of customization.

But it's locked to my site. Not shareable, not scalable.

## Finding CSS Shapes

Then I discovered [CSS shapes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/shape).

I keep a bookmark collection ([check it out here](https://bookmark-0s4v.onrender.com/)) and while digging through it, I found this [Figma file](https://www.figma.com/community/file/921630016386632325) full of cyberpunk UI shapes.

Downloaded it. Tried copying shapes directly. Figma's groups weren't flat vectors, and flattening them changed the geometry.

Time to figure out a real workflow.

## The Pipeline

After some searching, I found a clean 3-step process:

1. **Export to SVG** from Figma
2. **Flatten the SVG** with [lean-svg.netlify.app](https://lean-svg.netlify.app/)
3. **Convert to CSS** using [css-generators.com/svg-to-css](https://css-generators.com/svg-to-css/)

The output was clean, production-ready CSS shapes. No manual polygon point calculation. No guessing.

That's when I decided to build a full UI library.

## Understanding CSS Shapes vs clip-path

Let's see the difference. Here's a simple clip-path approach:

```css
/* Traditional clip-path - manual polygon points */
.cyber-card {
	clip-path: polygon(
		0 8px,
		8px 0,
		calc(100% - 8px) 0,
		100% 8px,
		100% calc(100% - 8px),
		calc(100% - 8px) 100%,
		8px 100%,
		0 calc(100% - 8px)
	);
}
```

Versus a CSS shape from the pipeline:

```css
/* CSS shape - generated from vector */
.cyber-card {
	clip-path: path("M8,0 L200,0 L208,8 L208,200 L200,208 L8,208 L0,200 L0,8 Z");
}
```

<div class="demo-container" style="margin: 2rem 0;">
  <style>
    .shape-demo {
      display: inline-block;
      width: 120px;
      height: 120px;
      margin: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
    }
    .clip-poly {
      clip-path: polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px));
    }
    .clip-path {
      clip-path: path('M8,0 L112,0 L120,8 L120,112 L112,120 L8,120 L0,112 L0,8 Z');
    }
    .demo-label {
      text-align: center;
      font-size: 0.875rem;
      color: #666;
      margin-top: 0.5rem;
    }
  </style>
  <div style="display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
    <div>
      <div class="shape-demo clip-poly"></div>
      <div class="demo-label">clip-path: polygon()</div>
    </div>
    <div>
      <div class="shape-demo clip-path"></div>
      <div class="demo-label">clip-path: path()</div>
    </div>
  </div>
</div>

The polygon approach requires manual calculation for responsive designs. The path approach lets you design in Figma, export, and get precise, scalable shapes.

## Building CyberTechUI

![CyberTechUI](./demo1.png)

I built a complete UI library with this workflow. Cards, buttons, inputs, tabs - everything with cyberpunk shapes baked in.

Integrated with shadcn/ui so you can install components with one command. Each component includes the CSS shapes directly, no external dependencies.

**Check it out:**

- Demo: [https://ehsanpo.github.io/CyberTechUI/](https://ehsanpo.github.io/CyberTechUI/)
- GitHub: [https://github.com/ehsanpo/CyberTechUI](https://github.com/ehsanpo/CyberTechUI)

**Stack:**

- Figma → lean-svg → css-generators (the pipeline)
- React + Tailwind + shadcn/ui

## What I Learned

### Firefox Doesn't Support CSS Shapes

Safari supports it. Chrome supports it. Firefox doesn't.
This is the first time I've found a CSS feature that Safari ships before Firefox. The web platform is weird sometimes.
There's a fallback - it just shows rectangles in Firefox. Not ideal, but functional.

### Building Components in Isolation Breaks Integration

I made each component separately. They all looked great individually.

Then I tried putting them together in a real layout. Spacing was off. Visual weight didn't balance. Components that looked perfect alone didn't play well with each other.
Spent hours adjusting. The tabs component was the worst - I gave each tab state its own unique shape (7 different shapes total). Each one needed to feel distinct but cohesive.

![CyberTechUI](demo2.png)

In hindsight, I should've built one complete page layout first, then extracted the components. Design systems work better when you start with real use cases.

### The Border Problem (and Solution)

Borders don't work with clip-path. The border gets clipped along with everything else.

The solution? Nested divs with the same shape. The outer div is the "border" color, the inner div is the background, sized slightly smaller using `calc()`.

Here's the actual checkbox implementation from CyberTechUI:

```tsx
const CLIP_PATH = "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)";

// Outer div - the "border"
<div className="bg-primary h-5 w-5" style={{ clipPath: CLIP_PATH }}>
	{/* Inner div - the background, 2px smaller */}
	<div
		className="bg-background h-[calc(100%-2px)] w-[calc(100%-2px)]"
		style={{ clipPath: CLIP_PATH }}
	>
		{/* Content goes here */}
	</div>
</div>;
```

Both divs use the same clip-path. The inner one is `calc(100% - 2px)` on both dimensions, creating a 2px "border" effect. The outer div's background color becomes the visible border.

Works perfectly with Tailwind's utility classes. No pseudo-elements needed, just straightforward nested structure.

<div class="my-8">
  <div class="flex justify-center items-center gap-8">
    <div 
      class="inline-block bg-primary-600 p-2 w-20 h-20 m-4 cursor-pointer transition-all hover:scale-105 "
      style="clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);"
    >
      <div 
        class="bg-secondary-400 flex items-center justify-center"
        style="width: 100% ; height: 100%; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);"
      ></div>
    </div>
  </div>
  <p class="text-center text-sm text-gray-600 mt-4">
    Hover to see the 3px "border" - outer div (purple) + inner div (dark)
  </p>
</div>

## What Worked Better Than Expected

**shadcn Integration:** Components install with one command and work immediately. The CSS shapes are scoped to each component, no global styles to manage.

**aspect-ratio for Responsive:** CSS `aspect-ratio` keeps shapes looking correct across screen sizes without complex calc() math. Set the ratio, the browser handles the rest.

**The Pipeline Itself:** Going from Figma to production CSS in 3 steps, no manual work, is incredibly fast. I can design 10 shapes in Figma, convert them all in minutes, and have a new component variant ready to ship.

## What's Next

This was a website UI kit. But the same technique works for:

- Game HUDs
- Dashboard interfaces
- Data visualization overlays
- AR/VR UI concepts
- Anything that needs to look like it's from 2077

Taking vector shapes from Figma and getting clean, production-ready CSS opens up a lot of design possibilities that used to require images or SVG imports.

## Try It

[CyberTechUI](https://ehsanpo.github.io/CyberTechUI/)

Or make your own shapes:

1. Design in Figma
2. Export to SVG
3. Flatten at [lean-svg.netlify.app](https://lean-svg.netlify.app/)
4. Convert at [css-generators.com/svg-to-css](https://css-generators.com/svg-to-css/)

The web doesn't have to be rectangles.
