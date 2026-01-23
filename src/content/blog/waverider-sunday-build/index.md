---
title: "WaveRider: Built in One Sunday"
description: "A one-day build log of WaveRider from idea to deployment with AI-assisted tooling and Supabase backend. "
date: "2025-12-08"
author: Ehsan
category:
  - Development
  - Project Breakdown
tag:
  - React Native
  - Expo
  - AI Development
  - Game Design
  - Supabase
  - Audio Analysis
status: publish
cover: "./cover2.jpg"
---

<p>It all started 7:30 in the morning. Sunday. I made my breakfast, egg 🥚 in a butty and a cup ☕ of Cardemon Ahmed tea. Peak comfort. Peak genius mode. I was lurking around the internet like a bored raccoon trying to catch what's new, scrolling, scrolling, scrolling, until my brain suddenly went "yo... build something". And of course I listen to that voice, because that voice has gotten me into some pretty fun trouble before. I wanted to code something new, something silly, something cool, something that would make me go "🤣🤣 look at this weird thing I made".</p>

<p>And then the idea 💡 came back to me, like an old meme you forgot but still love. Ride inside my music. I have tons of unreleased tracks 😎 just sitting on my hard drive collecting dust like ancient artifacts, so why not use those. And I knew Expo and React Native already so boom, decision made. Web, Android, iOS, full cross platform madness. I also wanted tilt controls. Tilt on phone. Mouse on web. Tilt on browser mobile too because why not. Full chaos.</p>

<p>So I opened bolt.new because they support Expo and it gives you a nice base to work with, like a boilerplate but with vibes. I asked it to help me setup the project and even in the very first step I added collision detection because I knew I was going to need it later anyway. Felt good to have that in place early instead of trying to duct tape it at the end like I usually do 😭.</p>

<h2>🔊 Audio Analysis: Scan First, Upload Later</h2>

<p>The plan was very clear:</p>

<ol>
    <li>Analyze my tracks locally</li>
    <li>Extract all the frequency bands, envelopes, beats, bpm</li>
    <li>Save that analysis into a database, So the game never analyzes audio again</li>
    <li>Instant geometry loading everywhere</li>
</ol>

<p>Bolt.new helped me configure <strong>Supabase</strong>. When everything was ready, I simply <strong>changed the database owner</strong> to my own Supabase project and it migrated automatically. Honestly one of the smoothest "move to my account plz" moments I've ever had.</p>

<p>Then me and my AI helper gremlins wrote a local script to:</p>

<ul>
    <li>analyze each track</li>
    <li>generate geometry data</li>
    <li>upload that data to Supabase</li>
</ul>

<p>Only <strong>after</strong> the analysis finished did the script upload the actual audio files to Supabase Storage. Correct order. Everything clean and organized (for once 😭).</p>

<p>This whole pipeline took maybe 2 hours and suddenly I had a full library of levels ready.</p>

<hr>

<h2>🌀 Drawing the Level: Frequency Torture Testing</h2>

<p>Next I had to use the analyzed data to actually shape the tunnel. This part took a lot of testing:</p>

<ul>
    <li>some frequencies made the tunnel too chaotic</li>
    <li>some were too soft</li>
    <li>some made everything look like melted spaghetti</li>
</ul>

<p>But bolt.new made testing super fast , push code, it rebuilds, test instantly via Expo QR or web preview. After tweaking values on different tracks, I finally found combinations I liked:</p>

<ul>
    <li>bass = big movement</li>
    <li>kicks = tunnel squeeze</li>
    <li>treble = tiny flicks</li>
    <li>quiet moments = wide open space</li>
</ul>

<p>When it started to look and feel fun, I knew I was on the right path.</p>

<hr>

<h2>🎮 Game Logic, Pages, UI , The Gameplay Skeleton</h2>

<p>After the tunnel felt good, I moved on to building:</p>

<ul>
    <li>main menu</li>
    <li>game screen</li>
    <li>scoring</li>
    <li>movement</li>
    <li>collision updates</li>
    <li>restart logic</li>
    <li>loading screen</li>
    <li>small UI fixes</li>
</ul>

<p>Eventually switched from bolt.new to VS Code when I needed fine control over spacing, padding, margins, and a preloader.</p>

<hr>

<h2>🧠 Using Multi Agents in VS Code for the First Time</h2>

<p>This was the first time I really used <strong>multi-agent workflows</strong> in VS Code, and honestly it clicked for me in a cool way.</p>

<p>I learned:</p>

<p>👉 One agent can "hold the context" for a task<br>
👉 If I needed something totally different, I could open a new agent<br>
👉 That way I didn't confuse a single agent by jumping topics</p>

<p>So I had different agents working on:</p>

<ul>
    <li>Agent 1: handling gameplay logic</li>
    <li>Agent 2: adjusting projectile speeds and physics</li>
    <li>Agent 3: fixing UI spacing</li>
    <li>Agent 4: generating helper components</li>
    <li>Agent 5: working on enemy patterns</li>
</ul>

<p>It ended up feeling like I had a tiny chaotic dev team living inside my editor. Except nobody complained. And nobody asked for coffee ☕🤣</p>

<hr>

<h2>🎨 Getting Graphics: Enter Gemini Nanobanana 🍌✨</h2>

<p>Time for visuals. I can't draw anything, so I used <strong>Gemini Nanobanana</strong> to:</p>

<ol>
    <li>generate a color palette</li>
    <li>generate assets using that palette</li>
    <li>export everything</li>
    <li>clean up in Photoshop (crop, resize, remove backgrounds)</li>
    <li>ask VS Code agents to replace placeholder SVGs with the new PNGs</li>
</ol>

<p>Suddenly the whole game became alive. Colorful. A little too neon. Just how I like it.</p>

![Game Assets](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xu9gl7ulse1q3lu0p1e1.png)

<hr>

<h2>⚡ Adding Enemies, Powerups, Shields and Other Fun Stuff</h2>

<p>Once the graphics looked good, it was time for more gameplay elements:</p>

<ul>
    <li>enemies</li>
    <li>powerups</li>
    <li>shields</li>
    <li>visual effects</li>
    <li>hit reactions</li>
    <li>tiny details everywhere</li>
</ul>

<p>Every time I thought "ok done", my brain quietly said<br>
"hmmm… but what if… more stuff?"<br>
and then I added more stuff.</p>

<hr>

<h2>🏆 Leaderboard Time</h2>

<p>Since levels are endless (the music loops), I wanted high scores and user profiles.</p>

<p>I went back to bolt.new, asked it to set up <strong>Supabase Auth</strong>, made a few policy changes, and soon:</p>

<ul>
    <li>users got auto-created</li>
    <li>they could update their display name</li>
    <li>leaderboard worked great</li>
</ul>

<p>One of the easiest setups of the whole day thanks to AI helping me config everything.</p>

<hr>

<h2>🚀 Final Build, Deploy and Bedtime</h2>

<p>Once everything worked:</p>

<ul>
    <li>built the app</li>
    <li>pushed to GitHub</li>
    <li>deployed the web version on GitHub Pages</li>
    <li>tested on phone</li>
    <li>fixed small bugs</li>
</ul>

<p>By the time I finished, it was already 22:00. I was tired, happy, a bit confused how fast the day went. I tried the game a few times in bed, smiled at my own weird creation, and fell asleep 😴</p>

<hr>

<h2>Final thoughts</h2>

<p>Could I spend more time polishing? Yes.<br>
Fix rendering and loading issues? Sure.<br>
Add more ships, enemies, power-ups? Absolutely.<br>
Turn it into a full commercial game? Maybe one day.</p>

<p>But for a <strong>single Sunday coding session</strong>, this is insane.</p>

<p>And honestly, I'm super happy with what I built. AI didn't replace me, it amplified me. Gave me momentum. Removed boring stuff. Let me stay in "flow mode."</p>

<p>This Sunday was one of my most fun coding days in a long time.<br>
And now I can literally ride inside my own music.</p>

<p>Life = good ❤️🎧🚀</p>

<iframe width="100%" height="600" style="border-radius: 8px; margin: 2rem 0;" src="https://www.youtube.com/embed/laWv14Y59hg" title="WaveRider Gameplay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
