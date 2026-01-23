---
title: "My First Machine Learning Project"
description: "A beginner's journey into machine learning and computer vision. Learning about image classification, data preparation, and the challenges of training your first AI model from scratch."
date: "2019-04-12"
author: "Ehsan Pourhadi"
category: ["Machine Learning", "AI"]
tag: ["AI", "ML", "Python", "Computer Vision", "TensorFlow", "Learning"]
featured: false
draft: false
cover: "./ml-cover.jpg"
---

Lately, I’ve been diving into AI and ML. Big companies like Google and Microsoft are everywhere with it, and I’ve played with Google Vision for fun. But making my own ML stuff? That felt scary.

I work as a **full-stack developer** at [Guts & Glory](http://gutsglory.se/) in Sweden , mostly building WordPress sites from designs. I’m not a hardcore programmer, but I love GitHub. If there’s a repo with a solid README, I can usually clone it, run it, and tweak things until it works.

---

## The Crazy Idea 💡

Everyone talks about AI taking over jobs… so I thought: _maybe I can build the AI that takes over mine!_

Step 1: AI looks at a design → slices it into sections → detects elements (text, images, colors, spacing) → uses pre-written HTML/CSS to build a WordPress site.

Step 2: Realize that’s waaaay too ambitious for a first ML project 😅

So I needed a side project to **train on something simpler**. Inspiration hit while watching _Silicon Valley_ , the “hotdog or not” AI. My brain immediately went:

> “I’ll build an AI that rates how hot faces are! Don’t judge me!”

---

## Finding the Code 🐍

I found some Python/TensorFlow/OpenCV repos:

- [Hotdog Classification](https://github.com/hayzamjs/Hotdog-Classification)
- [Guide on TensorFlow Hotdogs](https://aboveintelligent.com/using-tensorflow-to-classify-hotdogs-8494fb85d875)

Problem: I don’t know Python 😅. Spent ~2 hours fixing versions and missing models. Finally got it running!

---

## Gathering Data 🖼️

First attempt: Google image search for “pretty girls” vs. “ugly girls” and download with **Fatkun Batch**.

Problem: I only want **faces**, not the whole picture.

Solution: Use a face-cropping script:

- [Face Cropping GitHub](https://github.com/icchi-h/face-cropping)

After cleaning up wrong detections, I had ~1,000 “pretty” and ~400 “ugly” faces.

---

## Training & Testing 🏋️

After training, I tested:

- **Kate Upton** → hot 0.96 ✅
- **Rihanna** → hot 0.99 ✅
- **Miley Cyrus** → hot 0.72 🤷‍♂️
- **Hillary Clinton** → hot 0.40 😅
- **My own face** → hot 0.52 😎

Not perfect, but honestly, I’m kinda impressed for a first try.

---

## Lessons Learned 💡

1. GitHub + good READMEs = life saver
2. Python + TensorFlow + OpenCV version hell is real
3. Data quality matters , garbage in, garbage out
4. Start small, test a lot, embrace happy accidents

---

## Next Steps

I’d love feedback from other devs and eventually try my **dream project**: AI that turns a wireframe/design into a WordPress site automatically.

---

## Just Do It! 🚀

If you want to learn AI or coding: you can. Copy code, run it, tweak it, break it, learn. Patience is everything. If I can do it, you can too.

_P.S. This is my first article ever, so sorry for my English 😅 , writing it helps me learn!_
