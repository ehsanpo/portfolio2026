---
title: FakeRing
date: "2026-01-16"
status: publish
permalink: fakering
author: Ehsan
type: product
id: 318
agency: Personal
category:
  - Desktop Apps
  - Tools
  - Open Source
tag:
  - Go
  - Wails
  - Windows API
  - Win32
  - React
case_link_url: "https://github.com/ehsanpo/fakering"
client: Self
tagline: "A virtual ring light for your desktop, built with Go and Win32 magic"
background_image: "cover.png"
logo: "logo.png"
---

FakeRing is a lightweight desktop utility that transforms your computer monitors into a powerful, software-based ring light. Designed for remote workers and developers, it solves the problem of poor video lighting without the need for additional hardware.

Standard webcams often struggle with auto-exposure in dimly lit rooms, leaving users in shadow during critical meetings. While a physical ring light is the traditional solution, it occupies desk space and adds to the clutter. FakeRing leverages the luminosity of your display panels to provide consistent, adjustable illumination directly from your workspace.

The application integrates deeply with the Windows operating system to create a non-intrusive, high-performance overlay. By utilizing native Win32 APIs, FakeRing ensures that its lighting effects are both powerful and completely transparent to your existing workflow.

## Core Features

<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-8">
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Multi-Monitor Support</h3>
    <p class="text-gray-600 dark:text-gray-300">Automatically detects all connected displays using EnumDisplayMonitors. The software creates independent lighting layers for each monitor, ensuring uniform coverage across your entire visual field.</p>
  </div>
  
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Click-Through Transparency</h3>
    <p class="text-gray-600 dark:text-gray-300">Implemented via WS_EX_TRANSPARENT, the lighting overlay remains completely non-interactive. Mouse events pass through the ring light to underlying applications, allowing for uninterrupted productivity.</p>
  </div>
  
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Subtractive Geometry</h3>
    <p class="text-gray-600 dark:text-gray-300">Advanced GDI drawing techniques create a "donut" effect. By subtracting an inner rectangle from the screen's workspace, the center remains clear while the edges provide maximum illumination.</p>
  </div>
  
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Zero-Latency Rendering</h3>
    <p class="text-gray-600 dark:text-gray-300">Built with the Wails v3 framework and native GDI+ drawing. The application avoids the performance overhead of traditional web-based overlays by communicating directly with the OS graphics layers.</p>
  </div>
</div>

## Technical Foundation

The architecture of FakeRing balances modern web UI with low-level systems programming. The frontend, built with React, provides a sleek control interface, while the Go backend handles the complex interactions with the Windows API.

<div class="my-8">
  <div class="clip grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900">
      <div class="from-blue-500 to-blue-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
        <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Go & Wails v3</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">Lightweight binary with native OS hooks</p>
    </div>
    <div class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900">
      <div class="from-yellow-500 to-yellow-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
        <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Win32 GDI+</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">Direct-to-hardware graphics rendering</p>
    </div>
    <div class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900">
      <div class="from-cyan-500 to-cyan-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
        <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">React Controls</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">Seamless real-time parameter tuning</p>
    </div>
  </div>
</div>

<div class="my-6 flex items-center gap-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
	<div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
		<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
		</svg>
	</div>
	<p class="text-green-800 dark:text-green-200">
		<span class="font-semibold">Performance Advantage:</span> Utilizes debounced configuration updates and native OS thread locking (runtime.LockOSThread) to maintain 60fps UI performance while preserving system resources.
	</p>
</div>

## Who This Is For

<div class="my-8 grid gap-6 md:grid-cols-2">
	<div class="border-blue-500 bg-blue-50 dark:bg-blue-950/30 rounded-r-lg border-l-4 p-6">
		<div class="mb-3 flex items-center gap-3">
			<div class="bg-blue-500 flex h-8 w-8 items-center justify-center rounded-lg">
				<svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
				</svg>
			</div>
			<h3 class="text-blue-800 dark:text-blue-200 text-lg font-semibold">Remote Professionals</h3>
		</div>
		<p class="text-blue-700 dark:text-blue-300">Maintain a professional presence in video calls, even in environments with unpredictable or poor lighting conditions.</p>
	</div>
    <div class="border-purple-500 bg-purple-50 dark:bg-purple-950/30 rounded-r-lg border-l-4 p-6">
		<div class="mb-3 flex items-center gap-3">
			<div class="bg-purple-500 flex h-8 w-8 items-center justify-center rounded-lg">
				<svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
				</svg>
			</div>
			<h3 class="text-purple-800 dark:text-purple-200 text-lg font-semibold">Open Source Developers</h3>
		</div>
		<p class="text-purple-700 dark:text-purple-300">A practical demonstration of Go and Wails v3's capabilities in high-performance desktop application development.</p>
	</div>
</div>

## Why This Exists

FakeRing was born from a common frustration: the failure of webcam auto-exposure in dark rooms. While traditional lighting solutions work, they are often bulky and inconvenient for mobile or minimalist setups. Following a successful experiment with a blank browser tab, the project evolved into a dedicated tool designed to optimize this "accidental" discovery.

The design philosophy focuses on "invisible utility." A product of this nature must provide its benefit without demanding the user's attention or interfering with their tools. By solving the geometric challenge of drawing non-blocking rings over multiple displays, FakeRing achieves a level of polish that simple browser-based solutions cannot match.

## Why Choose This

FakeRing offers a zero-footprint alternative to hardware ring lights. It consumes no desk space, requires no USB ports, and is powered entirely by the hardware you already own. Its implementation in Go ensures a small binary size and rapid startup times, making it a frictionless addition to any setup.

Unlike generic "white screen" applications, FakeRing is purpose-built for video conferencing. It understands monitor geometry, respects the OS work area, and stays out of your way while you work. It is a focused solution for a specific problem, executed with technical precision.

<div class="my-8 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 p-8 text-center dark:from-primary-950/50 dark:to-secondary-950/50">
	<div class="mx-auto max-w-2xl">
		<h3 class="mb-4 text-2xl font-bold">Elevate Your Video Presence</h3>
		<p class="mb-6 text-lg opacity-90">Download FakeRing and experience professional illumination without the hardware clutter.</p>
	</div>
</div>
