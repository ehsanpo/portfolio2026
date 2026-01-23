---
title: "Product Launch Kit"
description: "A comprehensive guide and toolkit for successfully launching your product, including marketing strategies, content creation, and community engagement."
category: "Product"
tags: ["product", "launch", "marketing"]
order: 5
icon: "🛍️"
image: "img/agents/7.jpeg"
---

## 1. One Core Narrative (everything fans out from this)

### Prompt: Product Core Statement

```
You are a product marketing strategist for developer tools.

Product name:
One-line description:
Personal Story behind it:
- why did i made it:
- lessons learned:
- Include at least one mistake, tradeoff, or wrong assumption:
- One thing that worked better than expected:
- Stack used:


Write:
1. A brutally clear one-sentence value proposition
2. A short “why this exists” paragraph (3–4 lines, human tone, no buzzwords)
```

This output feeds **everything else**: blog post, Product Hunt, README, LinkedIn, Reddit.

---

## 2. GitHub README (this is marketing too)

### Prompt: GitHub README Generator

```
You are optimizing a GitHub README for developer adoption.

Generate:
- Short intro paragraph
- An image logo
- “Why this exists” section
- Installation section (placeholder-friendly)
- Example usage section (pseudo-code allowed)
- Clear links section (Docs, Website, Blog)
- Tech used
- Insperation
- A Contributing section. “Issues and PRs welcome”
- A License section. MIT
- Screenshots


Audience: experienced developers with limited time.
```

---

## 2. Product Page Copy (you’ll write it, this guides you)

[[ProductWriter]]

## 3. Blog Post (launch blog, not a tutorial)

[[blogWriter]]

## 3.1A DEV.to

```

You are an experienced software developer writing on dev.to.

Write a dev.to post about a product you just shipped, but do NOT write a launch announcement.

The headline:
Generate 10 dev.to-style headlines for a post about building and shipping a developer product.
Rules:
- No hype words
- No “I built X” announcements
- Focus on learning, mistakes, or tradeoffs
- Sound like something a senior dev would click


The Post content should
- Focus on 1–2 concrete lessons learned while building the product
- Include at least one mistake, tradeoff, or wrong assumption
- Briefly describe what the product does only for context
- Avoid marketing language entirely
- End with a reflective takeaway, not a CTA

Tags:
main language,#indiehackers or #opensource (if true),  One process tag (#learning, #productdev, #devlife)


Tone:
Same as Blog post


```

---

## Hacker News

Not a marketing post. A discussion starter.
Where: Show HN

### Prompt: Hacker News Post

```
Write a Show HN post for a developer tool.

Rules:
- Straightforward title
- One-paragraph explanation of the problem
- What the tool does
- One technical decision worth discussing
- No hype, no emojis, no marketing tone
```

---

## 5. Reddit Post (no pitch, or you’ll be eaten alive)

Reddit hates marketing. Reddit loves **stories and lessons learned**.

### Prompt: Reddit Launch Post

```
You are posting on Reddit as an indie developer.

Write a post that:
- Starts with a personal problem you faced
- Explains what you built to solve it
- Shares 1–2 lessons learned while building it
- Casually links to the product at the end

Tone:
Curious, humble, non-promotional.
No emojis. No hype.
```

---

## 6. LinkedIn Post (professional but human)

### Prompt: LinkedIn Launch Post

```
Write a LinkedIn post announcing a new product.

Structure:
- Short hook about a common industry frustration
- What you decided to build
- Who it helps
- What you learned building it
- One clean link at the end

Tone:
Professional, reflective, confident but not salesy.
```

Whitespace matters. Short lines breathe better on LinkedIn.

---

## 7. Product Hunt (the final boss)

### Prompt: Product Hunt Listing

```
You are preparing a Product Hunt launch.

Generate:
- Tagline (60 characters max)
- Short description (2–3 sentences)
- 3 key features
- “Who it’s for” section
- Maker comment (friendly, grateful, concise)

Tone:
Clear, helpful, confident.
Audience: developers and founders.
```

Reply to comments quickly on launch day. Momentum is a social phenomenon.

---

## 8. Launch Day Order (simple, repeatable)

Use this every time:

1. Publish product page + GitHub README
2. Publish blog post
3. Product Hunt launch
4. LinkedIn post
5. Reddit post (after some traction exists)
