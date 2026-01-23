---
title: "Music Visualization with Three.js"
description: "Experimenting with WebGL-based music visualization using Three.js. Creating immersive 3D visual experiences that react to audio in real-time."
date: "2022-06-12"
author: "Ehsan Pourhadi"
category: ["Web Development", "Creative Coding"]
tag: ["Three.js", "WebGL", "Music Visualization", "JavaScript", "Audio"]
featured: false
draft: false
cover: "cover.png"
---

I’ve been experimenting with **music visualization** using Three.js and one of my unreleased tracks. It’s basically my love for music + web dev mashed together , creating visuals that **dance to the beat in real-time**.

---

## 🔗 Live Demo

<iframe
  width="100%"
  height="500px"
  src="https://stirring-bienenstitch-82cd5b.netlify.app/"
  style="border: none; border-radius: 8px; margin: 20px 0;"
  title="Music Visualization Demo">
</iframe>

_The visuals respond to the audio frequency , move your mouse, change the song, enjoy the chaos!_

---

## 🛠 Tech Stack

- **Three.js** → 3D graphics & WebGL
- **Web Audio API** → real-time audio analysis
- **Vanilla JS** → keeping it simple

Key features:

- Particle systems reacting to bass, mids, highs
- Color palettes that shift with music energy
- Smooth animations synchronized to beats

---

## 💡 How I Built It

1. **Audio Analysis** → grab frequency data with Web Audio API
2. **3D Scene** → particles in Three.js respond to frequencies
3. **Animation Loop** → update visuals every frame to match audio

---

## 🎨 Creative Decisions

- Cool colors for calm sections, warm colors for intense parts
- Momentum-based particle motion for natural flow
- Less = more , simple effects often look better than over-the-top chaos

---

## ⚡ Challenges

- **Performance** → solved with instanced particles, optimized shaders, adaptive quality
- **Audio sync** → low-latency audio + multiple frequency bands
- **Cross-browser issues** → feature detection & fallbacks

---

## ✨ What I Learned

- Smooth visuals > flashy but laggy
- Frequency analysis reveals hidden patterns in music
- Colors and motion dramatically affect mood
- Interactive elements make people feel connected

---

## 🔮 Future Fun

- VR/AR support for full immersion
- Multi-track visualization for complex songs
- User-customizable colors & effects
- Export features & social sharing

---

This project is my playground where **code meets creativity**. Music visualization isn’t just pretty lights , it’s about **translating audio into emotion**, finding patterns, and creating interactive experiences.

_Code is on GitHub , tweak it, remix it, make your own musical visual world._
