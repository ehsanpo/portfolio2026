---
title: "Building Audio Tools: Three Apps, One Passion"
description: "OMG so I went totally overboard and built THREE audio visualization tools! From trippy shaders to professional goniometers to 3D cymatics - here's my wild journey into making sound visible."
date: "2025-12-25"
author: "Ehsan Pourhadi"
category: ["Web Development", "Creative Coding", "Audio"]
tag: ["Three.js", "React", "WebGL", "Audio Visualization", "TypeScript", "Web Audio API"]
featured: false
draft: false
cover: "cover.jpg"
---

Ok so... I might have gotten a little carried away 😅

What started as "let me build one simple audio thing" turned into **THREE completely different audio visualization tools**. And honestly? I'm not even mad about it. Sometimes you just gotta follow the hyperfocus where it takes you!

Let me tell you about my latest obsession: **Audio Tools** - a collection that's part trippy art project, part professional audio engineering, part physics demonstration. Because why pick one vibe when you can have ALL the vibes?

---

## 🌈 The Shader Playground (aka "Pretty Colors Go Brrrr")

First up: **Custom Audio Reactive Shaders**. This one's pure eye candy and I'm not ashamed to admit it!

Picture this: 19 different shader effects that literally dance to your music. We're talking plasma waves, fractals, particle galaxies - stuff that makes your brain go "ooooh shiny" while your ears are having a good time.

The coolest part? Each shader reacts differently to frequency ranges. Bass hits make some effects pulse like a heartbeat, while treble creates these tiny sparkly details that are just _chef's kiss_ perfect.

<video controls preload="metadata" playsinline style="width:100%; height:auto; background:#000">
    <source src="/video/audioTool1-2025-12-14%2016-09-45.mp4" type="video/mp4" />
    Your browser does not support the video tag.
</video>

**What I learned building this:**

- WebGL shaders are intimidating until they're not
- There's something magical about seeing math become art in real-time
- Auto-cycling through effects every 25 seconds = instant screensaver vibes
- My neighbors probably think I've lost it from all the "testing" at 2 AM 😂

Tech stack: React + Three.js + a LOT of fragment shaders that I definitely didn't understand at first but somehow work beautifully.

---

## 📊 The Professional Tool (Getting Serious For A Sec)

Then I thought... "what if I made something actually useful for audio people?" Enter the **Audio Goniometer**.

This one's for the audio engineers, podcasters, and anyone who's ever wondered "wait, what's actually happening between my left and right channels???"

It visualizes stereo width, phase correlation, and all those technical things that make good mixes sound... well, good! Plus it has these gorgeous Lissajous patterns that are both functional AND mesmerizing.

<video controls preload="metadata" playsinline style="width:100%; height:auto; background:#000">
    <source src="/video/audioTool2-2025-12-14%2016-17-59.mp4" type="video/mp4" />
    Your browser does not support the video tag.
</video>

**Real talk moment:** I spent WAY too much time making the visualization smooth because I got obsessed with 60fps updates. Was it necessary? Probably not. Did it feel amazing? Absolutely.

The phase correlation meter alone taught me more about stereo imaging than years of just mixing by ear. Sometimes you need to SEE the problem to really understand it, you know?

Tech highlights: Web Audio API doing heavy lifting + Canvas 2D for that butter-smooth rendering.

---

## 🌀 The Mind-Melting Physics Demo (Science Is Cool!)

Last but definitely not least: **Real-Time Sound-Reactive 3D Cymatics**. This one broke my brain in the best way possible.

<div class="flex justify-center gap-2">
<div>
Ever heard of cymatics? It's this wild physics phenomenon where sound frequencies create geometric patterns in sand or particles. Like, certain frequencies make perfect circles, others create complex interference patterns. It's literally the visual language of sound!

So naturally I had to recreate this in 3D with up to 20,000 particles dancing in real-time. Because why not turn your browser into a physics laboratory? 🧪

</div>

<video controls preload="metadata"  style=" height:300px; margin:0px;">
    <source src="/video/audioTool3-2025-12-14%2015-57-50.mp4" type="video/mp4" />
    Your browser does not support the video tag.
</video>

</div>

**The rabbit holes I fell into:**

- Learning about Ernst Chladni (the OG sound visualization guy from the 1700s!)
- Implementing particle systems that don't melt your GPU
- Color schemes that feel both scientific AND beautiful
- Preset saving because once you find the perfect config, you NEED to keep it

The Chladni plate mode is my favorite - watching geometric patterns emerge from chaos feels like witnessing some secret mathematical truth about the universe.

---

## 🤔 Why Three Apps Though?

Honestly? I couldn't decide what I wanted to build!

Each tool scratches a different itch:

- **Shaders** = pure creative expression
- **Goniometer** = professional utility
- **Cymatics** = educational wonder

Plus they each taught me different things about audio processing, visual programming, and finding that sweet spot between "functional" and "beautiful."

Also... I may have ADHD and this is how I roll. Start with one idea, end up with three apps. Classic me! 🤷‍♂️

---

## 🛠 The Technical Journey

Building all three really pushed my understanding of:

**Web Audio API**: FFT analysis, frequency binning, real-time processing. This API is SO powerful once you get the hang of it.

**Three.js**: Shader programming, particle systems, performance optimization. Going from "what's a vertex shader?" to building complex visual effects was quite the journey.

**TypeScript**: Type safety saved my butt SO many times when passing audio data between components.

**Performance**: 60fps with thousands of particles? Yeah, that required some creativity and a lot of profiling.

---

## 🎯 What's Next?

These tools are fully open source (because knowledge should be shared!), and I'm already getting ideas for v2:

- VR support for the cymatics tool (imagine being INSIDE the sound patterns!)
- More shader effects (I found this cool paper on quantum visualization...)
- MIDI control integration
- Maybe a fourth tool? (Someone stop me please 😅)

---

## 🎵 Try Them Yourself!

Each tool runs directly in your browser - no installation, no setup, just pure audio-visual magic. Whether you're a music producer, a developer curious about audio programming, or just someone who likes pretty things that respond to sound, there's omething here for you.

The code's all on GitHub if you want to peek under the hood or build something even cooler. And if you do, please share it! I love seeing what people create with this stuff.

Now excuse me while I go "test" the shader effects with my entire music library for the 47th time today... you know, for quality assurance 😉

Peace! ✨🎧
