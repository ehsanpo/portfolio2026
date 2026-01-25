---
title: WaveRider
date: "2025-12-08"
status: publish
permalink: waverider
author: Ehsan
type: product
id: 315
agency: Freelance
category:
  - Game
tag:
  - React Native
  - Expo
  - TypeScript
  - Audio Analysis
  - Game Design
  - Supabase
  - Signal Processing
client: Self
tagline: "Play inside the sound of your music"
onHome: false
background_image: "Mockups_iPhone_15_Pro2.jpg"
logo: "Mockups_iPhone_15_Pro.jpg"
logo2: "icon.png"
images:
  - "iPhone_14_Pro_Max_14.jpg"
  - "Mockups_iPhone_15_Pro.jpg"
  - "Mockups_iPhone_15_Pro2.jpg"
  - "gameover.png"
  - "gameplay.png"
  - "leaderboard.png"
  - "levels.png"
  - "settings.png"
  - "ship-insop.png"

port_date: "2025"
---

<h2>The Origin Story:</h2>

At 2 AM, hunched over a MacBook like a possessed gremlin, tilting it left and right to play _Tunnel_ by Uri. No keyboard. No mouse. Just pure physical movement and one devastating realization: **What if I could play this inside my own music?**

The idea wouldn't leave. Weeks of thinking. Studio sessions layering kicks, sculpting reverb tails. A producer's life is built on digital signal processing,FFT analysis, spectral bands, RMS curves, transient detection. These tools shape sound. What if they shaped _geometry_ instead?

What if the music _was_ the level itself?

<h2>The Concept:</h2>

WaveRider is a hybrid experience at the intersection of music production and game design. It's not a game with a soundtrack. It's not a visualizer with gameplay. It's a **portal into the sonic worlds created through music**.

Every track is analyzed to extract:

- Frequency bands (bass, mids, treble)
- Amplitude envelopes
- BPM and beat timestamps
- Over 4,000 analysis points per song

These sonic details become tunnel geometry:

- 🥁 **Beats** make the tunnel pulse and narrow
- 🔊 **Bass** creates massive left-right movements
- ✨ **Treble** adds micro-wiggles and twitchy details
- 🌫 **Quiet moments** let the world open up and breathe

<br />

<h2>Technical Architecture:</h2>

<ul>
  <li>
    <h3>Audio Analysis Pipeline:</h3>
    Custom signal processing extracts frequency bands, amplitude envelopes, and beat timestamps from unreleased tracks. Pre-analysis generates 4,000+ analysis points per song, creating rich geometric data.
  </li>
  <li>
    <h3>Game Engine:</h3>
    Built with <strong>React Native</strong> and <strong>Expo</strong> for cross-platform mobile deployment. Custom SVG-based tunnel renderer runs at 60 FPS with real-time collision detection and accelerometer-based steering.
  </li>
  <li>
    <h3>Backend Infrastructure:</h3>
    <strong>Supabase</strong> serves as the backbone: Auth for player accounts, Storage for music uploads, Database for levels, scores, and pre-generated geometry. Pre-analysis prevents runtime generation overhead,everything is instant on every device.
  </li>
  <li>
    <h3>Game Systems:</h3>
    Real collision detection, accelerometer-based steering, unlockable ships, power-ups and enemies, endless looping gameplay, and live online leaderboards. The tunnel scrolls smoothly at 60 FPS with zero loading delays.
  </li>
  <li>
    <h3>Development Optimization:</h3>
    Pre-analyzed geometry is uploaded once to Supabase and instantly playable across all devices. No runtime generation. No battery drain. Pure responsiveness.
  </li>
</ul>

<br />

<h2>The Experience:</h2>

You're holding your phone. Tilt slightly left. The neon tunnel curves with you,smooth, responsive, _alive_. A kick drum hits. The tunnel _contracts_ around you like a heartbeat. Tilt right to dodge the narrowing walls. A bass drop throws you sideways. You're fighting to stay centered.

Treble kicks in,tiny, flickering movements, micro-adjustments you feel in your fingertips. You're not listening to music anymore.

**You're inside it.**

The tunnel isn't random. It's the producer's sound. Every twist, every pulse, every moment of space or chaos,a direct reflection of the music created. You're not playing a game with a soundtrack. You're falling into a wormhole made of sound.

<br />

<iframe width="100%" height="600" style="border-radius: 8px; margin: 2rem 0;" src="https://www.youtube.com/embed/laWv14Y59hg" title="WaveRider Gameplay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

<br />

<h2>Why This Matters:</h2>

For years, people said the music felt "dimensional" or "cinematic." They said it sounds like another place. So the challenge became simple: stop describing that place and build it.

WaveRider is the bridge between two worlds that shouldn't have been separate:

- **Music Producer** (signal processing, sound design, artistic vision)
- **Software Developer** (architecture, systems design, technical execution)

The result is something that can only exist at that intersection,a game designed entirely from the language of sound itself.

<br />

<h2>Outcome:</h2>

WaveRider successfully transforms abstract audio data into playable, engaging geometry. Players aren't just experiencing another playlist or game. They're riding inside the sonic architecture of unreleased tracks, tasting the producer's creative decisions through gameplay. Every kick drum, bass drop, and harmonic shimmer becomes tactile.

When someone tilts their phone, dodging neon walls sculpted from unreleased music, riding the bass drops and feeling the kick drums contract space around them,they're experiencing the same magic felt that night tilting a MacBook in the dark.

Except now, they're not just playing a game.

**They're riding inside the sound.**

🚀🎶🌌
