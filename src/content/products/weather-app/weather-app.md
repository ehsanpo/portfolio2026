---
onHome: false
title: "Weather App"
title2: "Cross-Platform Desktop Weather"
description: "A cross-platform desktop weather application built with Wails v3 that displays real-time weather information in a system tray icon."
date: "2026-01-21"
status: "publish"
permalink: "weather-app"
author: "Ehsan"
type: "product"
agency: "Personal Project"
id: 2002
category:
  - Desktop Apps
  - Go
tag:
  - Go
  - Wails
  - React
  - Weather API
background_image: "demo1.jpg"
logo: "logo.png"
cover: "demo1.jpg"
tagline: "Real-time weather in your system tray"
case_link_url: "https://github.com/ehsanpo/create-wails-app"
client: "Personal Project"
images:
  - "screenshot.png"
---

## Weather App

### Cross-Platform Desktop Weather Application

A lightweight desktop application that provides real-time weather information through a system tray icon, built with modern web technologies and Go.

<div class="my-8">
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-8">
		<div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">System Tray Integration</h3>
			<p class="text-gray-600 dark:text-gray-300">Displays current temperature directly in the system tray with dynamic icon generation for instant weather awareness.</p>
		</div>
		<div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Cross-Platform Support</h3>
			<p class="text-gray-600 dark:text-gray-300">Runs natively on Windows, macOS, and Linux with consistent behavior across all platforms.</p>
		</div>
		<div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Automatic Updates</h3>
			<p class="text-gray-600 dark:text-gray-300">Refreshes weather data automatically at configurable intervals without user intervention.</p>
		</div>
		<div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Simple Configuration</h3>
			<p class="text-gray-600 dark:text-gray-300">Easy-to-use settings window for location and refresh preferences with immediate application.</p>
		</div>
	</div>
</div>

## Technical Foundation

<div class="my-8">
	<div class="clip grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<div
			class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900"
		>
			<div
				class="from-blue-500 to-blue-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg"
			>
				<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Go Backend</h3>
			<p class="text-sm text-slate-600 dark:text-slate-300">Built with Go 1.25+ and Wails v3 for native performance and system integration.</p>
		</div>
		<div
			class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900"
		>
			<div
				class="from-cyan-500 to-cyan-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg"
			>
				<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">React Frontend</h3>
			<p class="text-sm text-slate-600 dark:text-slate-300">Modern UI built with React 18 and Vite for fast development and smooth user experience.</p>
		</div>
		<div
			class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900"
		>
			<div
				class="from-green-500 to-green-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg"
			>
				<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Open-Meteo API</h3>
			<p class="text-sm text-slate-600 dark:text-slate-300">Free weather data and geocoding services with no API keys required.</p>
		</div>
	</div>
</div>

## Who This Is For

<div class="my-8 grid gap-6 md:grid-cols-2">
	<div class="border-blue-500 bg-blue-50 dark:bg-blue-950/30 rounded-r-lg border-l-4 p-6">
		<div class="mb-3 flex items-center gap-3">
			<div class="bg-blue-500 flex h-8 w-8 items-center justify-center rounded-lg">
				<svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</div>
			<h3 class="text-blue-800 dark:text-blue-200 text-lg font-semibold">Desktop Users</h3>
		</div>
		<p class="text-blue-700 dark:text-blue-300">Anyone who spends significant time at their computer and wants quick access to weather information without opening a browser or app.</p>
	</div>
	<div class="border-green-500 bg-green-50 dark:bg-green-950/30 rounded-r-lg border-l-4 p-6">
		<div class="mb-3 flex items-center gap-3">
			<div class="bg-green-500 flex h-8 w-8 items-center justify-center rounded-lg">
				<svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
			</div>
			<h3 class="text-green-800 dark:text-green-200 text-lg font-semibold">Go Developers</h3>
		</div>
		<p class="text-green-700 dark:text-green-300">Developers learning Go who want a practical project combining backend logic with desktop application development.</p>
	</div>
</div>

<div
	class="my-6 flex items-center gap-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30"
>
	<div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
		<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
		</svg>
	</div>
	<p class="text-green-800 dark:text-green-200">
		<span class="font-semibold">Performance Advantage:</span> Single binary deployment with minimal memory footprint and efficient API usage for fast weather updates.
	</p>
</div>

## Why Choose This Weather App

This application focuses on essential weather information delivery through system integration rather than feature complexity. It provides reliable, cross-platform weather monitoring with zero configuration overhead.

<div
	class="my-8 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 p-8 text-center dark:from-primary-950/50 dark:to-secondary-950/50"
>
	<div class="mx-auto max-w-2xl">
		<h3 class="mb-4 text-2xl font-bold">Get Started with Desktop Weather</h3>
		<p class="mb-6 text-lg opacity-90">Download the latest release from GitHub and start monitoring weather from your system tray.</p>
	</div>
</div>
