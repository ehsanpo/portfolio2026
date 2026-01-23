---
title: "Building ChillInVR: Trying to Teleport to My Brother's Trip (Sort Of)"
description: "My brother went on this insane multi-month trip. I'm stuck at home. So naturally, I decided to build a VR app to teleport there. Spoiler: React 360 is dead, phone panoramas are imperfect, and I learned a lot."
date: "2024-12-14"
author: "Ehsan Pourhadi"
category: ["Web Development", "VR"]
tag: ["VR", "A-Frame", "Three.js", "JavaScript", "React", "Side Project"]
featured: false
draft: false
cover: "cover.jpg"
---

## The "Why Did I Think This Would Be Easy?" Moment

My brother Soroush went on this insane multi-month trip, Kazakhstan, Vietnam, Thailand. While he was out there living his best life, he sent me these panorama photos from his phone like "look at this mountain" or "check out this temple." And I'm sitting here in my apartment thinking... what if I could actually _be_ there?

Not like, physically. But VR, right? Just throw on a headset and suddenly I'm standing in the same spot he was. How hard could it be?

## The Idea That Started Everything

So here's the thing, I'm a self-taught developer. I've built websites, messed around with APIs, made a few apps that actually work. But VR? Never touched it. Still, I had this vision: take Soroush's phone panoramas, throw them into some kind of VR viewer, maybe later add some ambient sounds (imagine hearing the market noise in Vietnam or wind in the mountains), and boom, instant teleportation.

I told Soroush to just take panoramas with his phone's built-in feature. Easy peasy. He did. I downloaded them. Looked at the files. 36 panorama JPEGs sitting in a folder on my desktop.

Now what?

## Down the React 360 Rabbit Hole (Oops)

First instinct: Google "how to make VR panorama viewer." Found React 360. Perfect! It's React, I know React, this'll be quick.

Started setting it up... and then realized React 360's GitHub repo had this fun little banner: **"This repository has been archived by the owner on Dec 15, 2020."**

Dead. Deprecated. Abandoned.

_Great start, Ehsan._

I spent like an hour trying to make it work anyway (because why learn from other people's mistakes when you can make them yourself?). Dependencies broke. Nothing would run. The internet collectively shrugged at me.

## Enter A-Frame (And Claude)

This is where I did what every modern developer does: I asked an AI for help. Specifically Claude Sonnet 4.5, because I'm not too proud to admit when I need a coding buddy who doesn't judge me.

"Hey Claude, React 360 is dead, what should I use instead?"

"Try A-Frame."

A-Frame turned out to be _perfect_. It's a web framework for VR built on top of Three.js, actively maintained, has actual documentation. Within like 30 minutes I had a basic HTML file running with my first panorama loaded. Saw Soroush's mountain photo wrapped around me in 360°.

I literally said "YES!" out loud to my empty apartment.

## Then Reality Hit: Quality & Cuts

Here's where things got messy.

**Problem 1: The image quality was... not good.** Like, really not good. Blurry, washed out, looked like I was viewing everything through dirty glasses. I thought maybe my code was wrong? Nope. Turns out:

- Phone panoramas are compressed JPEGs (to save space)
- A-Frame was doing additional texture downsampling
- Color space stuff was making everything look washed out and shiny

I spent _hours_ tweaking texture settings. LinearFilter vs NearestFilter. Anisotropic filtering. MipMaps. sRGB encoding vs Linear encoding. Felt like I was playing with magic spells I didn't understand.

Claude helped me push the quality settings to the max, 8K canvas resolution, maximum anisotropic filtering, high-precision shaders. It got better, but still not perfect. Because ultimately, you can't magically enhance source image quality.

**Problem 2: The seam.** Phone panoramas aren't true 360° spherical images. They're wide horizontal strips. And because of how Soroush took them (just moving his phone in an arc), some had this weird _cut_ in the middle where the image doesn't perfectly loop.

I tried using a cylinder instead of a sphere. Worse.

I tried different texture wrapping modes. Helped a bit, but the seam was still there.

I adjusted rotation angles. Made it less noticeable but never fully gone.

Eventually I had to accept: phone panoramas just have limitations. They're not shot on a fancy 360° camera. They're good enough, not perfect.

## What Actually Worked

After all the struggling, here's what I ended up with:

- **A-Frame** for the VR framework (way better than React 360)
- **Simple HTML + JavaScript**, no fancy build process, just one file
- **Manual texture loading** with Three.js to control quality settings
- **Previous/Next buttons** to switch between panoramas
- **Keyboard controls** (arrow keys) because why not
- **High-quality texture settings** pushed as far as my GPU allows
- **Accept the imperfections**, the seam exists, quality is limited, and that's okay

The whole thing runs in a browser. No installs, no VR headset required (though it works with one if you have it). Just open `index.html` and you're teleported.

## Lessons I Didn't Expect to Learn

1. **Dead tech is everywhere.** React 360 looked perfect in search results, but it's been dead for 5 years. Always check if a project is maintained before diving in.

2. **Phone panoramas ≠ VR panoramas.** They're different formats. Phone panoramas are convenient but not designed for spherical projection. If I want perfect VR, I'd need proper 360° camera footage.

3. **Image quality is hard.** You can't just "enhance" low-res compressed JPEGs. Texture filtering, color spaces, GPU capabilities, there's a whole world of graphics programming I barely scratched the surface of.

4. **AI coding assistants are actually helpful.** Claude didn't write all my code, but it helped me debug, suggested alternatives when I hit dead ends, and explained concepts I didn't know. It's like pair programming with someone patient.

5. **Shipping something imperfect is better than not shipping.** The seam bugs me. The quality isn't pristine. But it _works_. I can click through Soroush's trip and see what he saw. That's the whole point.

## If You're Trying Something Similar

Listen, if you're reading this and thinking "I want to try building something with VR" or "I want to experiment with something I've never done before," here's my advice:

**Just start.** Even if you don't know what you're doing. Even if your first choice is wrong (RIP React 360). Even if your images look kinda bad and there's a weird seam.

**Ask for help.** Use AI, Google, Stack Overflow, whatever. No one expects you to know everything. I sure didn't.

**Accept imperfection.** Your first version won't be perfect. It might not even be _good_. But it'll be _done_, and that's infinitely better than a perfect project that only exists in your head.

**Iterate later.** Right now, ChillInVR loads panoramas and lets you look around. Cool. Later, I want to add ambient sounds, maybe AI-generated audio based on the location. Then maybe add info overlays, or clickable hotspots. But I shipped the basic version _first_.

## What's Next

I'm gonna keep adding to this. Ambient sounds are next, imagine hearing market chatter in Vietnam or wind in the mountains. Maybe some subtle background music. Maybe let users upload their own panoramas.

But for now? It works. I can put on a headset (or just use my browser) and stand where Soroush stood. That's pretty cool.

If you've ever tried building something outside your comfort zone, or if you're thinking about it, I'd love to hear your story. What'd you build? What went wrong? What surprised you?

It's messy out here. But it's fun. 🏔️

---

**Try it live:** [ehsanpo.github.io/chillInVR](https://ehsanpo.github.io/chillInVR/)  
**Check out the code:** [github.com/ehsanpo/chillInVR](https://github.com/ehsanpo/chillInVR)  
**Tech used:** A-Frame, Three.js, vanilla JavaScript, Claude Sonnet 4.5 for debugging help

_And if you're reading this, Soroush, take more panoramas. Better quality this time. 😄_
