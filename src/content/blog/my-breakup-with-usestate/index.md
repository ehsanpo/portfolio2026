---
title: "My Breakup with useState"
description: "How a talk by David Khourshid at React Miami completely changed my perspective on state management in React, and why useState might not be the answer to everything."
date: "2025-03-20"
author: "Ehsan Pourhadi"
category: ["React", "Frontend"]
tag: ["React", "useState", "State Management", "Hooks"]
featured: false
draft: false
cover: "cover.png"
---

OMG, so you know how you have that one thing you use all the time, even when you know there are better options out there? For me, and apparently a lot of other devs, that thing is `useState` in React. I mean, it's the first hook you learn, right? It's so easy! You're just like, `const [count, setCount] = useState(0);`, and boom, you have state. Woohoo!

But then I watched this insane talk by David Khourshid at React Miami, called "Goodbye, useState," and my mind was totally blown. Seriously, I went in thinking, "This guy is probably gonna tell me to stop using my favorite hook," and he pretty much did. But in a cool, "hey, let's learn something new" kind of way.

_The spaghetti diagram David showed that blew my mind_

## The useState Problem

He basically said that `useState` is great for simple stuff, but for anything even a little bit complex, it's a "foot gun." He showed this crazy diagram of how `useState` and `useEffect` can get all tangled up, like a bowl of spaghetti. It becomes this mess where one thing changes, and it triggers a chain reaction of re-renders, and you're just like, "What even is happening?!" It's a nightmare to debug, and I've definitely been there, pulling my hair out trying to figure out why my component is re-rendering for the fifth time.

## The Better Alternatives

So, what's a self-taught dev to do? David had some amazing suggestions that I'm totally going to try.

### 1. Don't need a re-render? Use useRef!

This was such a "duh" moment for me. If I have some data I need to keep track of that doesn't affect the UI, like a click counter that just logs to the console, I can just use `useRef` instead of `useState`. It's like a secret hiding spot for my data, and React doesn't even know about it. So smart!

```javascript
// Instead of this useState mess...
const [clickCount, setClickCount] = useState(0);

const handleClick = () => {
	setClickCount((prev) => prev + 1);
	console.log(clickCount); // Still shows old value!
};

// Use useRef for non-UI state!
const clickCountRef = useRef(0);

const handleClick = () => {
	clickCountRef.current += 1;
	console.log(clickCountRef.current); // Always current!
};
```

### 2. Put state in the URL

Okay, this is so cool. I never thought about it, but you can actually put your filters or sorting preferences right in the URL. That way, if you refresh the page or send the link to a friend, all your settings are saved. No more getting frustrated when I lose my progress. It's so simple, yet so powerful.

```javascript
// Instead of useState for filters...
const [filter, setFilter] = useState("all");

// Use URL search params!
const searchParams = new URLSearchParams(window.location.search);
const filter = searchParams.get("filter") || "all";
```

### 3. Stop using useState for forms and fetching

I'm so guilty of this. I've been creating a `useState` for every single input on my forms, and then another one for `isLoading`, and `error`, and `data`... it's a mess! David said we should just use native browser APIs for forms and libraries like TanStack Query for data fetching. I'm all about using the right tool for the job, and if a library can handle all that messy stuff better than I can, I'm totally on board.

_Old way vs. new way of handling forms_

```javascript
// Instead of this useState nightmare...
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

// Use FormData and proper form handling!
const handleSubmit = (event) => {
	event.preventDefault();
	const formData = new FormData(event.target);
	const name = formData.get("name");
	const email = formData.get("email");
	// Much cleaner!
};
```

### 4. Use useReducer for complex stuff

This one scares me a little, I'm not gonna lie. It seems way more complicated than `useState`. But David made a good point: when your logic is complex, like for a shopping cart, `useReducer` is better. It gives you a clear log of what's happening and makes your code more organized. I'm a little nervous to try it, but I'm a big believer in "just do it," so I'm gonna give it a shot.

```javascript
// Instead of multiple useState calls...
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
const [discount, setDiscount] = useState(0);

// Use useReducer for related state!
const [cart, dispatch] = useReducer(cartReducer, initialCart);

const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: item });
const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
```

## The Philosophy Shift

The whole talk really made me rethink how I approach state in React. It's easy to just stick with what you know, but as a self-taught dev who loves to tinker and experiment, I know that's not how you grow. The final takeaway from the talk was that **simple is better than easy**. And that's a philosophy I can totally get behind.

`useState` is _easy_ - you can slap it anywhere and it works. But these alternatives are _simple_ - they solve the right problem with the right tool, making your code cleaner and more maintainable in the long run.

## Moving Forward

Now, if you'll excuse me, I'm off to rewrite some of my GitHub projects. My code needs a serious glow-up after this talk!

Here's my plan:

- ✅ Replace unnecessary `useState` with `useRef` for non-UI state
- ✅ Move filter/search state to URL parameters
- ✅ Try TanStack Query for data fetching
- ⏳ Learn `useReducer` for complex state logic

Anyone else had a similar "aha moment" with React hooks? I'd love to hear about your experiences breaking up with old patterns and embracing better alternatives!

---

_P.S. - If you haven't watched David Khourshid's "Goodbye, useState" talk, do yourself a favor and check it out. It's a game-changer!_
