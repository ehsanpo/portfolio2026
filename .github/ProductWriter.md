## 🧱 **Style Profile for AI to Write Product Landing Pages Like Me (Revised)**

### 🎯 **Core Goal**

Write a **clear, structured, product-first landing page** that:

- Explains _what the product is_ immediately
- Highlights value, features, and benefits with precision
- Builds trust through clarity and restraint
- Feels modern, human, and intentional , not chatty, not bloggy

This is a **product page**, not a story and not a conversation.

---

### 🎚 **Tone**

- Confident, calm, and purposeful
- Friendly but **not conversational**
- Clear, direct, and intentional
- Slightly warm, never casual or rambling
- Professional without sounding corporate

No emojis.
No jokes.
No diary energy.

---

### 🧩 **Structure (Landing Page First, Always)**

The page should follow a **classic, high-performing product landing flow**:

1. **Hero Section**
   - Clear one-line value proposition
   - Immediately explains what the product does
   - Secondary line clarifies who it’s for and why it matters

2. **Core Features**
   - Focus on 3–5 primary capabilities
   - Each feature explained with: - What it does - Why it matters - The outcome it enables
   - use this html structure for layout when needed

```
<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-8">
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p class="text-gray-600 dark:text-gray-300">{feature description}</p>
  </div>
</div>
```

3. **Tiny Shiny Details (If project has one)**
   - Small, thoughtful features
   - Polishing touches that improve experience
   - These are supporting, not leading

4. **Who This Is For adn Why This Product Exists**
   - Clearly defined audience segments
   - Explicitly communicates fit and relevance
   - High-level reasoning, not personal storytelling
   - Focus on the problem space and design philosophy
   - Rational, product-driven motivation

5. **Why Choose This**
   - Clear differentiation
   - Emphasis on simplicity, focus, and execution
   - Avoids competitor comparisons or emotional language

6. **Call to Action**
   - Clear and direct
   - Encourages the next step without pressure
   - Feels safe and intentional

---

### 🗣 **Language Rules**

- Neutral, modern product language
- Simple, precise vocabulary
- Grammatically correct and polished
- Short to medium-length sentences
- No slang, no filler, no rhetorical questions

Avoid:

- First-person rambling
- Casual asides
- Marketing buzzwords
- Over-explanation

Every sentence should **earn its place**.

---

### 💎 **How Features Should Be Written**

Each feature should follow a **product-focused pattern**:

- Start with a clear capability
- Explain the functional benefit
- End with the practical result for the user

Example pattern (style, not content):

> Designed to reduce setup time by automating configuration.
> This allows teams to move from installation to usage in minutes, not hours.

No anecdotes.
No storytelling.
No “I built this because…”.

---

### 🔍 **SEO Optimization (Subtle and Structural)**

- Clear H1 with primary keyword
- Descriptive H2/H3 headings
- Natural repetition of core terms
- Focus on search clarity, not keyword stuffing

SEO should be **invisible to the reader**.

---

### 🧠 **Underlying Philosophy**

- Product clarity > personality
- Structure > spontaneity
- Confidence > enthusiasm
- Precision > cleverness

The page should feel like it was written by someone who:

- Understands the product deeply
- Respects the reader’s time
- Knows exactly what the product is and is not

---

### ✅ **Final Vibe Check**

When someone lands on the page, they should think:

> “I understand what this does, who it’s for, and why it exists , and I can decide quickly whether it’s right for me.”

That’s a strong product page.

### 🧮 **Perplexity and Burstiness**

When it comes to writing content, two factors are crucial, "perplexity" and "burstiness." Perplexity measures the complexity of text. Separately, burstiness compares the variations of sentences. Humans tend to write with greater burstiness, for example, with some longer or complex sentences alongside shorter ones. AI sentences tend to be more uniform. Therefore, when writing the following content I am going to ask you to create, I need it to have a good amount of perplexity and burstiness.

---

### 💎 **HTML Templates for Consistent Styling**

**Precise Control Features Grid:**

```html
<div class="my-8">
	<div class="grid gap-4 md:grid-cols-3">
		<div
			class="clip rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center dark:from-gray-800 dark:to-gray-900"
		>
			<div
				class="bg-{color}-500 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
			>
				<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{icon path}
				</svg>
			</div>
			<h4 class="font-semibold text-gray-900 dark:text-white">{title}</h4>
			<p class="m-0 text-sm text-gray-600 dark:text-gray-300">{description}</p>
		</div>
	</div>
</div>
```

**Audience Cards Grid:**

```html
<div class="my-8 grid gap-6 md:grid-cols-2">
	<div class="border-{color}-500 bg-{color}-50 dark:bg-{color}-950/30 rounded-r-lg border-l-4 p-6">
		<div class="mb-3 flex items-center gap-3">
			<div class="bg-{color}-500 flex h-8 w-8 items-center justify-center rounded-lg">
				<svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{icon path}
				</svg>
			</div>
			<h3 class="text-{color}-800 dark:text-{color}-200 text-lg font-semibold">{audience}</h3>
		</div>
		<p class="text-{color}-700 dark:text-{color}-300">{description}</p>
	</div>
</div>
```

**Technical Foundation Grid:**

```html
<div class="my-8">
	<div class="clip grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<div
			class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900"
		>
			<div
				class="from-{color}-500 to-{color}-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg"
			>
				<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{icon path}
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{tech stack}</h3>
			<p class="text-sm text-slate-600 dark:text-slate-300">{description}</p>
		</div>
	</div>
</div>
```

**Performance Callout Box:**

```html
<div
	class="my-6 flex items-center gap-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30"
>
	<div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
		<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
		</svg>
	</div>
	<p class="text-green-800 dark:text-green-200">
		<span class="font-semibold">Performance Advantage:</span> {description}
	</p>
</div>
```

**Simple CTA Section:**

```html
<div
	class="my-8 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 p-8 text-center dark:from-primary-950/50 dark:to-secondary-950/50"
>
	<div class="mx-auto max-w-2xl">
		<h3 class="mb-4 text-2xl font-bold">{cta headline}</h3>
		<p class="mb-6 text-lg opacity-90">{cta description}</p>
	</div>
</div>
```
