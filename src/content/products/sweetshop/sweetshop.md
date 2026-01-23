---
title: SweetShop
date: "2025-01-08"
status: publish
permalink: sweetshop
author: Ehsan
type: product
id: 302
agency: Personal
category:
  - E-commerce
  - Full-stack
  - Web App
tag:
  - React
  - TypeScript
  - Stripe
  - Supabase
  - Express
  - TailwindCSS
  - Vite
case_link_url: ""
client: ""
tagline: "Premium Candy Subscription Platform"
background_image: "cover.jpg"
logo: "logo.png"
onHome: false
images:
  - "1.png"
  - "2.png"
  - "3.png"
  - "4.png"
---

A complete subscription platform delivering curated candy boxes monthly. Users select box sizes, manage subscriptions, track deliveries, and process payments through a streamlined interface built for recurring revenue.

## Core Features

<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-8">
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Multi-Step Subscription Flow</h3>
    <p class="text-gray-600 dark:text-gray-300">Three-stage wizard guides users from box selection through shipping details to payment. Each step validates input before progression, storing intermediate state in React Router location state. Users choose between Small ($24.99), Medium ($39.99), or Large ($59.99) boxes, select flavor preferences (Sweet, Sour, Mix), and complete address forms with real-time validation.</p>
  </div>
  
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recurring Payment Processing</h3>
    <p class="text-gray-600 dark:text-gray-300">Stripe subscription engine handles monthly billing automatically. Payment methods attach to customer profiles for seamless recurring charges. The system creates subscription objects with trial periods, proration handling, and 3D Secure support. Webhook endpoints process subscription lifecycle events, updating database records when payments succeed or fail.</p>
  </div>
  
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Delivery Tracking System</h3>
    <p class="text-gray-600 dark:text-gray-300">Box history displays every shipment with status progression from Pending to Shipped to Delivered. Each entry includes delivery dates, tracking numbers, and detailed item lists showing candy contents. Users filter boxes by date ranges or status, with pagination for accounts receiving boxes over extended periods.</p>
  </div>
  
  <div class="clip bg-white dark:bg-neutral-800 rounded-s p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Profile Management Dashboard</h3>
    <p class="text-gray-600 dark:text-gray-300">Centralized profile interface enables address updates, preference editing, and subscription control. Users view active subscription details including next billing date and box configuration. Invoice history provides downloadable receipts for accounting. One-click cancellation initiates termination flow with optional feedback collection.</p>
  </div>
</div>

## Precise Control Features

<div class="my-8">
  <div class="grid gap-4 md:grid-cols-3">
    <div class="clip rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center dark:from-gray-800 dark:to-gray-900">
      <div class="bg-purple-500 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
        <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <h4 class="font-semibold text-gray-900 dark:text-white">Supabase Authentication</h4>
      <p class="m-0 text-sm text-gray-600 dark:text-gray-300">JWT-based sessions with Row Level Security enforce data isolation per user</p>
    </div>
    <div class="clip rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center dark:from-gray-800 dark:to-gray-900">
      <div class="bg-blue-500 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
        <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h4 class="font-semibold text-gray-900 dark:text-white">Admin Dashboard</h4>
      <p class="m-0 text-sm text-gray-600 dark:text-gray-300">Role-based access to user management, subscription stats, and box shipping</p>
    </div>
    <div class="clip rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center dark:from-gray-800 dark:to-gray-900">
      <div class="bg-green-500 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
        <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h4 class="font-semibold text-gray-900 dark:text-white">Webhook Integration</h4>
      <p class="m-0 text-sm text-gray-600 dark:text-gray-300">Real-time subscription updates via Stripe event handlers with signature verification</p>
    </div>
  </div>
</div>

## Technical Foundation

Built with production-grade tools for reliable subscription management and payment processing at scale.

<div class="my-8">
  <div class="clip grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900">
      <div class="from-blue-500 to-blue-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
        <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">React 18 + TypeScript</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">Component architecture with hooks and custom state management ensures type safety across the subscription lifecycle</p>
    </div>
    <div class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900">
      <div class="from-indigo-500 to-indigo-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
        <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Express.js API</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">RESTful backend handles subscription creation, cancellation, status checks, and webhook event processing</p>
    </div>
    <div class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900">
      <div class="from-emerald-500 to-emerald-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
        <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Supabase PostgreSQL</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">Managed database with Row Level Security, real-time subscriptions, and automatic backups for user data</p>
    </div>
    <div class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900">
      <div class="from-purple-500 to-purple-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
        <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Stripe Subscriptions</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">PCI-compliant recurring billing with Elements integration, customer management, and automated invoice generation</p>
    </div>
    <div class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900">
      <div class="from-cyan-500 to-cyan-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
        <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">TailwindCSS</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">Utility-first styling with responsive design patterns and dark mode support across all interfaces</p>
    </div>
    <div class="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center dark:from-slate-800 dark:to-slate-900">
      <div class="from-violet-500 to-violet-600 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
        <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-slate-900 dark:text-white">Vite Build System</h3>
      <p class="text-sm text-slate-600 dark:text-slate-300">Fast hot module replacement during development with optimized production builds and API proxy configuration</p>
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
    <span class="font-semibold">Performance Advantage:</span> Vite provides sub-second hot module replacement during development. Production builds leverage tree-shaking and code-splitting, while API requests proxy through Vite's dev server to eliminate CORS configuration complexity.
  </p>
</div>

## Database Architecture

Four PostgreSQL tables manage the complete subscription lifecycle with Row Level Security enforcing user data isolation.

**user_profiles** stores shipping addresses and preferences in JSONB columns, enabling flexible schema updates without migrations. **subscriptions** tracks active status, Stripe IDs, and next delivery dates with foreign keys to auth.users. **received_boxes** maintains delivery history with status progression tracking. **box_items** details individual candy contents per shipment.

Cascading deletes ensure data cleanup when users terminate accounts. Indexes on user_id and stripe_subscription_id optimize query performance for dashboard views and webhook processing.

## Who This Is For

<div class="my-8 grid gap-6 md:grid-cols-2">
  <div class="border-purple-500 bg-purple-50 dark:bg-purple-950/30 rounded-r-lg border-l-4 p-6">
    <div class="mb-3 flex items-center gap-3">
      <div class="bg-purple-500 flex h-8 w-8 items-center justify-center rounded-lg">
        <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h3 class="text-purple-800 dark:text-purple-200 text-lg font-semibold">Subscription Business Founders</h3>
    </div>
    <p class="text-purple-700 dark:text-purple-300">Entrepreneurs launching recurring revenue models need complete subscription infrastructure without building from scratch. This platform demonstrates user onboarding, payment automation, delivery tracking, and customer management patterns applicable to subscription boxes, memberships, or SaaS products.</p>
  </div>
  
  <div class="border-blue-500 bg-blue-50 dark:bg-blue-950/30 rounded-r-lg border-l-4 p-6">
    <div class="mb-3 flex items-center gap-3">
      <div class="bg-blue-500 flex h-8 w-8 items-center justify-center rounded-lg">
        <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
      <h3 class="text-blue-800 dark:text-blue-200 text-lg font-semibold">Full-Stack Developers</h3>
    </div>
    <p class="text-blue-700 dark:text-blue-300">Engineers building e-commerce applications benefit from seeing production-ready implementations of Stripe subscriptions, webhook handling, database schema design, and authentication flows. The codebase shows React state management, Express API architecture, and TypeScript patterns without unnecessary abstraction.</p>
  </div>
  
  <div class="border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 rounded-r-lg border-l-4 p-6">
    <div class="mb-3 flex items-center gap-3">
      <div class="bg-emerald-500 flex h-8 w-8 items-center justify-center rounded-lg">
        <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 class="text-emerald-800 dark:text-emerald-200 text-lg font-semibold">Payment Integration Learners</h3>
    </div>
    <p class="text-emerald-700 dark:text-emerald-300">Developers implementing Stripe for the first time encounter practical examples of payment method attachment, subscription lifecycle management, webhook signature verification, and error handling. The implementation demonstrates real-world patterns beyond basic documentation examples.</p>
  </div>
  
  <div class="border-amber-500 bg-amber-50 dark:bg-amber-950/30 rounded-r-lg border-l-4 p-6">
    <div class="mb-3 flex items-center gap-3">
      <div class="bg-amber-500 flex h-8 w-8 items-center justify-center rounded-lg">
        <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h3 class="text-amber-800 dark:text-amber-200 text-lg font-semibold">Product Managers</h3>
    </div>
    <p class="text-amber-700 dark:text-amber-300">Teams planning subscription features gain insight into technical complexity, data requirements, and user experience considerations. Understanding the complete flow from signup through recurring billing to cancellation informs product roadmap decisions and engineering resource allocation.</p>
  </div>
</div>

## Why This Product Exists

Living between Sweden and the UK created a simple tradition. My wife visits from the UK, we explore Swedish candy shops together, filling bags with salty licorice and unique Scandinavian treats. She brings British sweets back chewy wine gums, proper chocolate bars, flavors unavailable in Sweden.

These exchanges became routine. Friends asked for specific items. We'd compile lists, make extra purchases, ship packages. The pattern repeated: people wanted cross-border candy access without traveling.

Subscription boxes solve logistics problems. Instead of coordinating individual requests, a recurring service handles selection, packaging, and delivery systematically. Customers receive curated boxes monthly without managing international shipping themselves.

Building this platform addressed technical curiosity alongside practical need. Implementing Stripe subscriptions with webhook handling, designing multi-step user flows, and architecting recurring payment systems required understanding subscription business models deeply.

The result is infrastructure supporting recurring revenue models beyond candy. The authentication patterns, payment processing, delivery tracking, and admin management systems apply to any subscription-based product requiring customer lifecycle management.

## Why Choose This Approach

Subscription platforms require specific technical capabilities: recurring billing, customer lifecycle management, delivery tracking, and administrative oversight. Traditional e-commerce solutions focus on one-time transactions, lacking subscription-first architecture.

This implementation demonstrates targeted design choices:

**Stripe Subscriptions Over Manual Billing**: Automated monthly charging eliminates manual invoice generation. Payment method storage enables seamless renewals without customer intervention. Webhook events provide real-time subscription status updates.

**Supabase Instead of Custom Auth**: Managed authentication with Row Level Security removes identity infrastructure overhead. JWT tokens and session management work without building authentication systems from scratch. Database access controls enforce user data isolation automatically.

**Multi-Step Wizard Over Single Form**: Breaking signup into box selection, shipping, and payment reduces cognitive load. Users complete small focused tasks rather than overwhelming forms. State preservation between steps allows editing previous choices without data loss.

**PostgreSQL Over Document Databases**: Relational structure ensures referential integrity between users, subscriptions, and delivery records. Foreign key constraints prevent orphaned data. Complex queries join related entities efficiently for reporting and analytics.

**React Router State Over Redux**: Built-in location state handles wizard progression without external state management libraries. Navigation guards protect routes requiring authentication. The pattern scales adequately for application complexity without additional dependencies.

The architecture prioritizes proven subscription patterns over custom implementations, reducing development time while maintaining reliability.

<div class="my-8 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 p-8 text-center dark:from-primary-950/50 dark:to-secondary-950/50">
  <div class="mx-auto max-w-2xl">
    <h3 class="mb-4 text-2xl font-bold">Cross-Border Commerce Simplified</h3>
    <p class="mb-6 text-lg opacity-90">SweetShop demonstrates how subscription infrastructure enables international product delivery without complex logistics management. The platform handles recurring payments, customer management, and delivery tracking, proving that modern web technologies make subscription businesses accessible to small-scale entrepreneurs.</p>
  </div>
</div>
