---
title: "My TypeScript Adventures: Excess Props, `object` vs `{}`, and Why My Code Sometimes Explodess"
description: "Tripped over excess property checks in TypeScript , sharing what I learned so you don’t."
date: "2025-09-24"
author: "Ehsan Pourhadi"
category: ["TypeScript", "Best Practices"]
tag: ["TypeScript", "JavaScript", "Development", "Code Quality"]
featured: false
draft: false
cover: "cover.png"
---

Hey friends , I’ve been fiddling with TypeScript lately, trying to understand all those little gotchas. One thing that kept biting me was **excess property checks**, plus the difference between `object`, `{}`, `Object` types. I want to share what I learned, because earlier I was confused, maybe you will too, and maybe this helps you avoid stepping on the same banana peel 🍌.

---

### What even _are_ excess property checks?

So imagine I define:

```ts
type Person = { firstName: string; age: number };

function logPerson(person: Person) {
	console.log(person);
}
```

Then I try

```ts
const person2: Person = { firstName: "potato", age: 21, extraProp: "hello!" }; // <-- error
```

At first I was like “wtf, I thought TypeScript was structural, isn’t extraProp ok if it has all the required ones?” But no , TS is stricter when you assign an _object literal_ directly to a typed variable (or pass literal directly to a function). It checks: “does this literal have any properties I don’t know about (i.e. not in the target type)?” If yes → error. That’s the “excess property check.” ([TypeScript][1])

But then, I did this:

```ts
const person3: Person = {
	firstName: "potato",
	age: 21,
	...{ extraProp: "hello!" },
}; // fine
```

AND it passed. And I was like “omg why?” 🤔 Turns out: because of how TS handles spreads and variables/inference. If you spread in extra props, or assign literal to a variable first, TS doesn’t always trigger that excess prop check. The literal isn’t “fresh” in a sense, so TS is more forgiving. ([allthingstypescript.dev][2])

---

### Why this behavior exists (and my struggle)

- It’s super helpful for catching little mistakes: typos, misspelling property names, etc. For example, you meant `color` but typed `colour`, TS might warn. ([TypeScript][1])
- But the inconsistency annoyed me. I kept wondering: “why does doing `.push(...)` in one case break, but in another, no?” Or “why does spreading let me sneak extra props in?”
- Eventually I saw: TS is structural (duck typing), but it gives special treatment to object _literals_ when creating or assigning them. If something has already been inferred (object assigned to a variable first), then “excess property” checks are often skipped. ([allthingstypescript.dev][2])

So yeah, it feels inconsistent if you don’t know the rules. But once you know them, you can predict what will happen. (Still sometimes surprises me, don’t lie.)

---

### `object` vs `{}` vs `Object` , my head almost exploded

While learning excess props, I also got confused about these three. They seem like they'd be the same, but noooo. TS is picky in its own special way. Here’s how I think of them (after many StackOverflow lurks + making tiny example code to test) :

| let foo: object;                                                                                                                             | let foo : {};                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| <br>foo = { hello: 0}; ✅<br>foo = []; ✅<br>foo = false;❌<br>foo = null;❌<br>foo = undefined; ❌<br>foo = 42;❌<br>foo = 'bar';❌<br><br> | <br>foo = { hello: 0}; ✅<br>foo = [];✅<br>foo = false;✅<br>foo = null;❌<br>foo = undefined;❌<br>foo = 42; ✅<br>foo = 'bar'✅ |
|                                                                                                                                              |                                                                                                                                    |

| Type                     | What it allows                                                                                                           | What it forbids                                                                                            | When I might use it                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `object` (lowercase)     | non-primitive things: objects, arrays, functions etc. ([DEV Community][3])                                               | primitives like number, string, boolean, symbol etc. ([DEV Community][3])                                  | When I really want “this must be an object (or array etc.), not just a string or number”       |
| `{}` (empty object type) | almost everything except `null` or `undefined` , yes you can pass string, number, bool etc. ([Type-Level TypeScript][4]) | basically only `null` and `undefined` are excluded (if `strictNullChecks` on) ([Type-Level TypeScript][4]) | When I don’t care much about structure, or I want super loose type (but that’s dangerous)      |
| `Object` (capital O)     | similar to `{}`, lots of overlap; but has some weirdness, prototypical methods etc. ([jser.dev][5])                      | maybe stricter in some built-in method typings; also semantically confusing (some people avoid using it)   | I try to avoid; if I use it, it’s for “just anything with the base Object” but clarity suffers |

So: if I want more type safety, `object` is usually safer than `{}` in my code. `{}` is too broad; you can accidentally pass a `"hello"` or `123` and TS won’t complain. (Yes, I tested this.) ([Type-Level TypeScript][4])

---

### That “array union” snippet & mutation weirdness

You also gave the snippet:

```ts
const foo: string[] = ["1", "2"];

function bar(things: (number | string)[]) {
	things.push(3); // passes type check
}
bar(foo);
```

I remember doing similar stupid stuff. What’s going on:

- `foo` is `string[]`
- `bar` wants `(number|string)[]`
- Because every `string` is acceptable where `(number|string)` is expected, `string[]` is assignable to `(string|number)[]`. (Covariance in this context)
- So TS lets you call `bar(foo)`. Then inside `bar`, pushing `3` (a number) is allowed because the type of `things` is `(string|number)[]`. So at runtime, you end up with a mix. Type safety is “ok” by TS’s rules, but logically your `foo` array has now numbers in it (which you might not expect). Scary.

So TS gives you power, but also begs you to pay attention. If I want safer, I might use `readonly string[]` or avoid that mutation. (One of my dev regrets: I didn’t use readonly arrays earlier.)

---

### My “aha!” moments & little tips

Here are some bits I picked up that really helped me stop banging my head:

- If you want to catch extra props always, try to annotate variables explicitly rather than letting TS infer, especially with literals. The moment you introduce a variable, sometimes the excess check is skipped.
- Use **spreads** carefully. Spreads sometimes “hide” excess props, which might be what you want, but sometimes what you _don’t want_, so know when it happens.
- Consider tools / lint rules. There are TS/ESLint rules that enforce stricter property checks, type assertions policies etc. These help keep things consistent.
- Be conservative with `object`, `{}` etc. If you know your data shape, define interface/type. Don’t default to “anything goes.” Saves future debugging.

---

### Final thoughts (because I'm still learning!)

Honestly, understanding these quirks felt like unlocking secret levels in TS. Sometimes I feel TS is beautiful, other times it's like one more trap waiting. But the more I write, experiment, make mistakes (omg so many), the more these behavior patterns stick.

If you’re a beginner: don’t let it discourage you. It’s OK to get weird errors. Try small isolated examples like above. Try modifying them and see what TS complains about. Throw in a spread, move to variable first, assign literal, pass directly to function , see where TS flips. That kind of play is what taught me.

If you want, I can write up a mini-cheat sheet you can keep open, with all these “when does excess prop check happen / when not / object vs {} etc.” Want me to drop that?

[1]: https://www.typescriptlang.org/docs/handbook/2/objects.html?utm_source=chatgpt.com "Documentation - Object Types"
[2]: https://www.allthingstypescript.dev/p/mid-week-scoop-understanding-excess/comments?utm_source=chatgpt.com "Mid-week Scoop: Understanding Excess Property Checking in ..."
[3]: https://dev.to/dipakahirav/differences-between-object-and-object-in-typescript-4cca?utm_source=chatgpt.com "Differences Between Object, {}, and object in TypeScript"
[4]: https://type-level-typescript.com/articles/difference-between-object-types-in-typescript?utm_source=chatgpt.com "what's the difference between object and {} in TypeScript?"
[5]: https://jser.dev/typescript/2023/01/12/typescript-object-Object/?utm_source=chatgpt.com "`{}` vs `object` vs `Object` in TypeScript."
