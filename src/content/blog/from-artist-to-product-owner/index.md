---
title: "From Artist to Product Owner: How My Work With AI Has Changed"
description: "A personal look at five roles I move between as I bring AI into coding, music, and the way I build software."
date: "2026-11-04"
category: ["AI", "Personal"]
tag: ["AI", "Software Development", "Music", "Creative Process"]
featured: false
draft: false
cover: "cover.png"
---


Working with AI looked like learning a new tool, at first, it feels like you're just learning a new tool. 🛠️ But the further down the rabbit hole you go, the more you realise that the biggest change isn't really about the tool itself. It's about how *you* approach making things.

I've started thinking about this as a personal journey through five different roles: **Artist, Producer, Director, Architect**, and eventually, **Product Owner**. Each step completely shifts where you put your attention, what you hold onto, and what you finally let go of.
This isn't a story about becoming a "prompt engineering wizard." 🧙‍♂️ It's about changing your relationship with control.🎛️

## 🔍 It starts with curiosity (and a bit of hype)

My own journey into AI got serious when I was preparing for a job interview at Axis Communications in Lund, Sweden, for a *Software Engineer – AI Tools* position. I started diving deep into the ecosystem, partly because I wanted to truly understand the tech for the interview, and partly because I was genuinely curious about how it might change the way we build software.

At first, it was the classic experience we've all had. You hear people hyping up a new tool online, see a mind-blowing demo on X or GitHub, sign up, and start playing around with it. 🚀 You try a few prompts, ask it random questions, generate some boilerplate code, and think, *"Woah, everything is possible!"* You start imagining all the crazy projects you could build if the technology actually worked as well as people claimed.

Then... reality kicks in. 💀

You ask it to do something specific for a real project, and the result isn't quite what you expected. Maybe the code is subtly broken, the architecture is super generic, or it confidently hallucinates a library method that doesn't even exist. You try again. You tweak the prompt. You add more details. Sometimes it gets better; sometimes it gets way worse.

Eventually, you hit a wall and think: *"Okay, this is cool and all, but it can't really do what I do."*

I think this is the exact spot where a lot of developers get stuck.

## 😬 The uncomfortable part: losing control

There's a very real psychological reason why working with AI feels frustrating, especially if you've spent years grinding and developing your skills in a craft.

When you're writing software yourself, you live inside a predictable feedback loop:

1. You understand the system.
2. You make a change and run it.
3. You inspect the result and adjust.

Over the years, you build a solid mental model of how things work. That predictability gives you a deep sense of control. You know *why* something works, or at least you know which file to open when everything catches fire.

AI completely breaks that relationship.

You can give the exact same prompt twice and get two totally different results. Sometimes it reads your mind; other times it goes off the rails in a completely unexpected direction. You might get code that looks technically impressive at first glance, yet is completely wrong for your specific architecture.

Suddenly, the feedback loop is unpredictable. And let's be honest, that can make you feel less competent, even though your actual engineering skills haven't changed at all!

There's also a huge element of identity tied up in this. If you've spent years becoming great at writing code, designing interfaces, or making music by hand, watching a machine spit out parts of that work in seconds challenges how you see your own value. It's super easy to experience that as a threat rather than an opportunity.

Psychologically, that's **loss aversion** at play. We naturally value what we already know how to do, and we hate giving up control over the parts of a process where we feel like experts. So, we judge AI by the strict standards of our existing workflow, expecting it to behave like a deterministic compiler when it's actually working in a completely different way.

But at some point, if you stick with it, a switch flips in your brain. 💡

Instead of looking at a weird, imperfect result and thinking, *"Ugh, this thing doesn't work,"* you pause and ask: **"Wait... why did it do that?"**

That tiny shift in attitude changes everything. You stop treating every unexpected output as a failure and start treating it as a clue. You inspect the output, figure out what context was missing, adjust your framing, and see where the next iteration takes you. You start learning from the interaction itself.

And that's when the real journey begins.

## 🎨 1. The Artist: Still doing the work

The first role is the **Artist**. This is where almost all of us start, and it's definitely where we feel safest.

Here, we are still the sole creators. We write the code, design the UI, make the music, debug the edge cases, and make every micro-decision along the way. AI is just a slightly smarter tool in the belt, like autocomplete on steroids. Maybe it helps write a quick utility function, explains a confusing regex, or gets us unstuck on a weird bug. 🐛

* **Where control sits:** At the implementation level.
* **The mindset:** We decide what to do, how to write it, and what every line should look like. We're still holding the brush.

There is zero shame in staying in this stage for a bit! In fact, having deep hands-on craft is essential, you need real experience to recognize good architecture, spot subtle hallucinations, and smell when an AI-generated solution is heading toward a dead end.

However, if you stay strictly in Artist mode forever, you miss out on a massive shift: realizing that **you don't always need to build the first version yourself.**

## 🎧 2. The Producer: Choosing the direction

Think about how image tools like Midjourney work. You describe a vibe or an idea, and instead of giving you one single image, it gives you four different directions. You look at the grid, pick the one that feels closest to your vision, and spin up variations. You don't need the exact final pixel map in your head before you start, you discover it *through* the process.

When you apply this to your work, you become a **Producer**. 🎛️

You move from being the person who crafts every single detail from scratch to the person who explores, selects, and guides. You let AI generate raw possibilities, and then you bring your own taste, experience, and domain knowledge to decide which path is worth pursuing.

I really felt this click when I was building a music visualisation for my personal website. Instead of trying to spec out the entire mathematical animation perfectly upfront, I let AI pitch different creative directions. I looked at what it rendered on screen, told it what felt cool and what looked terrible, asked for variations, and gradually steered it toward something that felt right. It felt so much more natural, I could react to something real right in front of me!

I went through an even bigger rollercoaster with AI-generated music. 🎵 Initially, it actually killed my motivation. I stopped making as much music because AI could generate full tracks faster, and sometimes cleaner, than I could. It made the whole struggle feel a bit pointless (don't judge me, it was a weird phase! 😅).

Then I flipped the script: *What if I use AI to generate raw material instead of the finished song?*

I started taking my old tracks, generating variations across different genres, exploring wild arrangements, or extracting isolated fragments and stems. Then I pulled those pieces into my DAW, chopped them up, experimented, and assembled something that truly felt like **my** sound. I was still the composer and producer making the intentional choices; AI was just feeding the crate with fresh samples.

I would love to see more coding tools embrace this "Midjourney workflow." Instead of having one agent burn through a massive context window committing to a single heavy implementation, imagine spinning up four lightweight agents to tackle the same problem in four different ways. You inspect the four prototypes, pick the cleanest architecture, and iterate from there.

Suddenly, **taste, selection, and creative direction** become just as vital as raw coding speed.

## 🎬 3. The Director: Working with agents

The next evolution is becoming a **Director**.

At this point, you aren't just asking AI to generate snippets or variations, you're giving it a clear goal and letting it work through the multi-step process required to get there. Welcome to the world of **Agents**. 🤖

A standard chat is linear: you ask, it answers, it stops. An agent runs in an autonomous loop:

**Look 👀 → Ask 🤔 → Act ⚡ → Repeat 🔄 (until the job is done)**

An agent can inspect your codebase, figure out where a change belongs, modify multiple files, run the test suite, read the terminal errors, fix its own bugs, and try again. Does it magically know everything? Definitely not! It can still get stuck in loops or make silly assumptions. But the game-changer is that it works through an *iterative process* rather than throwing a single wall of text over the fence.

I love comparing this to directing a film. 🎥 A movie director doesn't hold every boom mic, adjust every light, or edit every single frame. Instead, the director communicates the vision, coordinates the specialists, and makes sure all the moving parts tell a cohesive story.

When working with agents:

* You define the goal and success criteria.
* You provide the right context and constraints.
* You decide which tools and permissions the agent gets.

You are still 100% responsible for the outcome, even when you aren't writing every line of implementation detail yourself.

## 🏗️ 4. The Architect: Designing the environment

Once you get comfortable directing individual agents, a bigger question pops into your head: *"What happens when I have multiple agents working together?"* 🤯

What if they need to share discoveries, remember architectural decisions from yesterday, use common tools, and learn from each other's mistakes? Now you aren't just directing a single scene,you're designing the studio lot where the work happens. You become an **Architect** (or a World Builder 🌍).

Think about how a real city works. No single mayor controls every conversation or transaction happening on the streets. People and businesses make their own choices, yet the **environment** shapes everything. Roads, zoning laws, public transit, and shared spaces determine whether a city thrives or turns into gridlock.

The exact same principle applies to multi-agent AI systems.

As an Architect, you start obsessing over:

* **Shared Context & Memory:** How is project knowledge indexed, stored, and retrieved so agents don't repeat mistakes?
* **Tooling & Permissions:** What boundaries keep the system safe while allowing autonomy?
* **Feedback Loops:** How do the results of one task automatically enrich the context for the next?

Instead of asking, *"How do I write a better prompt for this task?"* you start asking, **"How do I design an environment where agents automatically become more useful over time?"** You move from scripting a linear workflow to cultivating an ecosystem.

## 🎯 5. The Product Owner: Directing the outcome

This brings us to the fifth stage,and this is what I'm experiencing firsthand right now.

Instead of manually orchestrating every agent, picking which model runs which step, or babysitting handoffs, **I'm building an agent orchestrator that handles that coordination for me.** 🚀

I give the system a high-level goal, equip it with the right memory, skills, and tools, and let the orchestrator break down the work, assign tasks to specialized agents, pick the appropriate models, and gather the results.

My day-to-day role shifts into being a **Product Owner**:

* I define *what* we are building and *why* it matters.
* I set the priorities and quality bars.
* I review what the fleet produces, test the actual user experience, merge the best ideas, and decide what happens next.

And here is a super important realization I've had while building this: **not every job needs a massive, expensive Large Language Model.** 💡

We are now seeing specialized, ultra-compact models designed specifically for bounded decision-making and triage,like **Jev** and **Laya**. Rather than burning tokens asking a giant general-purpose LLM to write a four-paragraph essay evaluating a piece of code, a tiny decision model can step in and make focused, lightning-fast judgments:

* *Does this implementation meet the spec? (Yes/No)*
* *What is the confidence score on this test pass?*
* *Which of these three agent outputs best matches our priority criteria?*

Imagine three worker agents independently implementing a feature in parallel. A review agent steps in, backed by lightweight decision models (like Jev or Laya), to score the outputs against strict quality gates before it ever hits your screen. Meanwhile, smaller, faster local models handle routine file routing and memory noise filtering, saving the heavy reasoning models strictly for the gnarly architectural puzzles. 🧠⚡

Instead of asking, *"Which is the best AI model on the leaderboard?"*, the real engineering question becomes: **"Which model is best suited for this specific job?"**

Of course, decision models aren't magic truth machines,their criteria, confidence thresholds, and outputs still need rigorous testing. Yet they give us an incredible new building block. **The orchestrator coordinates the intelligence; the Product Owner coordinates the vision.**

## 🤝 Bringing this mindset into a team

This progression isn't just for solo tinkering,it matters hugely when introducing AI into a company or engineering team.

A lot of organisations just buy enterprise licenses for a couple of AI tools, drop them in Slack, and expect magic to happen. Spoiler alert: that rarely changes how the company actually works! 😅

People need psychological safety and room to experiment. If I'm bringing AI into a team, here is how I approach it:

1. **Start with high-impact, practical wins:** Skip the flashy sci-fi demos. Find annoying, real-world bottlenecks where AI saves noticeable time right away.
2. **Build a culture of sharing:** Run hands-on workshops, write clear internal docs, and create spaces where people openly share both their cool workflows *and* their hilarious AI fails.


3. **Empower AI Champions:** Have a few curious engineers across different squads who help teammates get unstuck and feed real-world friction back to the tooling builders.
4. **Standardise what works:** Gradually turn successful experiments into shared skills, reusable workflows, and indexed documentation so AI becomes a natural part of the pipeline.

Most importantly, recognize that **not everyone needs to jump straight to Architect or Product Owner.** Some developers will get massive value using AI purely as an Artist's assistant. Others will thrive as Producers or Directors. The goal is helping people discover what unlocks value at *their* step of the journey.

## 🧭 It's not about doing less. It's about controlling something different.

Looking back at this whole evolution, the biggest shift is simply where your control sits:

| Role | Where the Control Sits | What You Actually Do |
| --- | --- | --- |
| **🎨 Artist** | Implementation | Create the work directly using AI as a smart assistant. |
| **🎧 Producer** | Direction | Generate multiple possibilities, curate with taste, and steer variations. |
| **🎬 Director** | Process | Define goals, delegate to autonomous agents, and guide their loops. |
| **🏗️ Architect** | Environment | Design shared memory, tools, rules, and multi-agent ecosystems. |
| **🎯 Product Owner** | Vision & Outcome | Direct orchestrators and specialized models (like Jev & Laya) toward the big picture. |

These roles don't replace each other! Honestly, I still love putting on my Artist hat. I still enjoy writing Rust and TypeScript by hand, tweaking UI animations, and getting my hands dirty in the terminal. 💻✨

The difference now is that I have a full spectrum of gears I can shift between. Sometimes I'll code a module myself. Sometimes I'll act as a Producer and ask for four wild prototypes. And sometimes I'll hand a spec over to my orchestrator, let a fleet of agents and micro-models battle it out, and focus my energy on testing the final product.

The real meta-skill is knowing **when** to use each approach.

James Clear has a famous quote that sums this up perfectly:

> *"You do not rise to the level of your goals. You fall to the level of your systems."*

Maybe that's where this whole AI revolution is actually taking us. First, we learn to use the tool. Then we learn to collaborate with it, direct it, build environments for it, and ultimately design systems that coordinate different kinds of intelligence around things that matter.

I'm currently deep in the trenches building my own local-first agent orchestrator,experimenting with how different agents, vector memory, semantic code intelligence, and decision-making models can work together seamlessly. It's still a work in progress, and I'm breaking things and learning a ton every single day. 🛠️🔥

I'll be sharing a lot more soon about how I'm architecting it under the hood and what I'm discovering along the way. Stay tuned! 👋🚀