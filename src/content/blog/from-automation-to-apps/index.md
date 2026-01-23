---
title: "From Automation to Apps"
description: "How PLC logic accidentally taught me React state management. Turns out, industrial automation and React aren't that different after all."
date: "2025-12-12"
author: "Ehsan Pourhadi"
category: ["Web Development", "Learning"]
tag: ["React", "PLC", "State Management", "Automation"]
featured: false
draft: false
cover: "cover.jpg"
---

So… funny story.

A while ago I was playing with **PLCs**. Yep. Industrial stuff. Sensors, relays, ladders, blinking lights. Very _factory-core_. At the time I didn't think much of it, I was just trying to understand how machines think without exploding 💥 (spoiler: they're very unforgiving).

Fast-forward to me learning **React**, sitting in front of my laptop at 2am, te cold, brain fried, staring at `useState` like it personally offended me.

And then…
💡 _WAIT A SECOND._

This feels… familiar???

---

## 🏭 PLC brain activated

If you've ever touched PLC programming (ladder logic, function blocks, whatever flavor), you know the deal:

- Inputs come in (buttons, sensors, signals)
- Logic runs every cycle
- Outputs change based on the current state
- Everything is **predictable**, **reactive**, and **stateful**

Back then I didn't call it "state".
I called it "why is this motor still ON???" 😭

But yeah, PLCs are basically:

> **Infinite loops that react to changes**

Sound familiar yet?

---

## ⚛️ Enter React (aka "PLC but with JSX")

When I first learned React, I was like:

> "Why is my UI not updating??
> Why is this state stale??
> Why is everything re-rendering?? omg"

Classic beginner pain. Been there. Still there sometimes.

Then I realized something embarrassing:

**React is just automation logic wearing a hoodie.**

Hear me out 👇

---

## 🔁 PLC Scan Cycle = React Render Cycle

In PLCs:

1. Read inputs
2. Execute logic
3. Update outputs
4. Repeat forever ♾️

In React:

1. State/props change
2. Component re-renders
3. UI updates
4. Repeat forever ♾️

BRO.

Same movie. Different actors.

Except React yells at you if you mutate state
and PLCs yell at you by breaking real machines 🫠

---

## 🧠 State is just memory (stop overthinking it)

In PLC land:

- You store flags
- You latch bits
- You remember what happened last cycle

In React:

- `useState`
- `useReducer`
- `useRef` (aka "pls don't re-render" button)

Same idea.
Different syntax.
More memes.

Once I stopped treating React state like magic and started treating it like **PLC memory**, everything clicked.

Like:

- A button click = digital input
- `setState` = coil energizing
- Conditional rendering = contacts opening/closing

I felt so smart for like 3 minutes 😂

---

## 🎮 Building an interactive story (because why not?)

So naturally, instead of just understanding this quietly like a normal person…

I built a tiny interactive thing.

An app where:

- Inputs toggle state
- Logic decides what happens next
- UI reacts visually

Basically a **PLC simulator disguised as a React app**.

Was it overkill? Yes.
Did it help me learn? BIG YES.
Did I push it to GitHub at 3am with a messy commit message? Absolutely.

---

## 😵 My struggles (aka honesty time)

Let's be real:

- I broke stuff
- I misunderstood hooks
- I forgot dependencies in `useEffect` (don't judge me)
- I re-rendered the universe by accident

Multiple times.

But that's kinda the point, right?
I'm just a curious dev smashing concepts together and seeing what survives 🔥

---

## 🚀 Why this mindset helped me

Thinking in **automation logic** made React less scary.

Instead of:

> "React is confusing"

It became:

> "Oh, this is just reactive logic with prettier outputs"

And that mindset shift?
Game changer.

If you come from:

- PLCs
- Arduino
- Game dev
- Even Excel formulas 😅

You already understand React more than you think.

---

## 💬 Final thoughts (before I overthink this)

If you're learning React and feel stuck:

- Build weird things
- Compare it to stuff you already know
- Don't wait to "feel ready"

Just do it™️.

Worst case?
You learn something.
Best case?
You accidentally connect factories to frontends and feel like a wizard 🧙‍♂️✨

Alright, I'll stop here before this turns into a book.
Thanks for reading, Now go break something and learn 💙
