---
onHome: true
title: Telavox
title2: Smart Telephony.
description: Redesigned Telavox's softphone application with a sleek, modern interface, adding RTL support for Arabic users. Rewrote the application in TypeScript, migrated from MUI4 to Tailwind CSS, and collaborated with UX designers to deliver a scalable, user-friendly solution that boosted performance and engagement.
date: "2024"
status: publish
permalink: telavox
author: Ehsan
type: portfolio
agency: "Telavox"
id: 1339
category:
  - Backend
  - Front-end
  - AI Integration
tag:
  - Tailwind
  - Electron
  - Javascript
  - Java
background_image: "telavox-top.png"
logo: "logo1.png"
logo2: "telavox-logo.png"
cover: "telavoxcv.jpg"
images:
  - "telavox-app.png"
  - "tvx-app.png"

tagline: "Switchboard, chat, meetings, and contact center"
case_link_url: "https://www.telavox.com"
client: "Telavox"
---

<h2>Case Study: Fullstack Developer at Telavox</h2>

<h3>Overview</h3>

<p>At Telavox, I work as a Fullstack Developer with a focus on front-end development. Our team is dedicated to building an Electron and web application for our softphone product, ensuring it meets the highest standards of performance and user experience.</p>

<h3 id="project-1-visual-refresh-rtl-support-typescript">Project 1: Visual Refresh and RTL Support And TypeScript</h3>

<p>The primary goal of this project from the product side, was to update the design of our application with a modern, sleek interface and to introduce Right-to-Left (RTL) support for the Arabic language. This involved a complete rewrite of the application in TypeScript, as well as addressing technical debt by migrating from MUI4 to Tailwind CSS.</p>

<p>The existing application was a 9-year-old JavaScript codebase with mixed code quality—spanning React components, API calls, and auto-generated code from backend services. I led the migration effort to TypeScript, systematically converting and typing thousands of lines of legacy code. This included refactoring outdated patterns, eliminating deprecated libraries, replacing legacy data fetching with TanStack Query for proper caching, and modernizing the Redux state management to efficiently handle frequent WebSocket updates. The result was a robust, type-safe codebase that significantly reduced runtime errors and improved developer experience.</p>

<h3>Key Responsibilities:</h3>

<ul>
    <li>Collaborated closely with a multidisciplinary team of developers and UX designers.</li>
    <li>Guided the UX team to ensure component designs were practical and implementable.</li>
    <li>Rewrote the entire application in TypeScript to enhance maintainability and performance.</li>
    <li>Integrated Tailwind CSS to replace MUI4, simplifying the styling process and improving design consistency.</li>
    <li>Implemented RTL support to make the application accessible to Arabic-speaking users.</li>
</ul>

<h3>Achievements:</h3>

<ul>
    <li>Successfully delivered a modernized application interface that improved user satisfaction and engagement.</li>
    <li>Enhanced the application's maintainability and scalability by leveraging TypeScript and Tailwind CSS.</li>
    <li>Fostered a collaborative environment with the UX team, resulting in well-designed, user-friendly components.</li>
</ul>

---

### Project 2: Chat Microservice & Feature Enhancements

![Chat app](./chat.png)

Following the TypeScript migration, our team separated the chat functionality into its own microservice, enabling more flexible development and faster feature deployment. I led the development of several key features that significantly enhanced user engagement:

#### **New Chat Features:**

- **Message Reactions:** Users can react to messages with emojis displayed beneath the message, adding quick emotional responses to conversations.
- **Quoted Replies:** Implemented reply functionality allowing users to respond to specific messages, maintaining conversation context.
- **Conversation Threads:** Built a slide-in thread panel enabling users to create separate discussions within the same chat group without cluttering the main conversation.
- **Tenor GIF Integration:** Integrated Tenor API via Google Cloud, allowing users to search and send GIFs directly in chat, making conversations more expressive beyond just emojis.
- **Markdown Support:** Added full markdown rendering support for announcements, code sharing, and styled messages. This was particularly valuable for teams using chat groups as announcement channels, providing better formatting options for important communications.

---

### Project 3: AI Integration & Voice Solutions

I contributed to multiple AI-powered features that enhanced the platform's capabilities and user experience:

#### **Translation Pipeline:**

Our application serves users in multiple languages. While I didn't develop the core translation tool (which replaced our third-party translation service), I was instrumental in:

- Reviewing and testing the translation implementation
- Integrating it into our CI/CD pipeline
- Migrating it from OpenAI to Google Gemini for improved performance and cost efficiency

#### **AI Agent Profile:**

Built a profile page for AI agents with minimal statistics and monitoring capabilities:

- AI agent profile pages displaying key statistics for superuser monitoring
- Call history tracking and visualization
- Real-time status indicators for active AI calls

<div class="flex gap-4">
<div>

#### **Text-to-Speech (TTS):**

Implemented a TTS feature using ElevenLabs API that transformed how users create queue messages:

- Instead of uploading audio files for different queue stages, users can now write text and convert it directly to audio
- Multi-language and multi-voice support for diverse user needs
- Seamless in-app audio generation and deployment

</div>

![TTS](./ts.png)

</div>

---

### Project 4: Video Conferencing Integration

This project began with our team member architecting the backend infrastructure for video conferencing. After six months of development by a consulting firm that added core features, I joined to finalize and productize the solution.

#### **My Role:**

I took ownership of transforming the existing codebase into a production-ready product integrated into our main application. This involved:

- Analyzing and understanding code written by multiple developers with different approaches
- Removing debugging code and development artifacts to prepare for production
- Implementing proper naming conventions, color schemes, and UI consistency
- Building the complete chat functionality for video calls
- Integrating the video conferencing feature seamlessly into the existing application
- Ensuring the product met quality standards for end-user release

#### **Key Features:**

- **Real-Time Chat:** Built a complete chat interface for text communication during video calls
- **Adaptive Video Quality:** The platform adjusts video quality based on network conditions for optimal performance

#### **Technical Stack:**

- **Frontend:** TypeScript, TailwindCSS
- **Backend:** Mediasoup (WebRTC-based conferencing with SFU architecture)
- **Custom JS SDK** for frontend-backend communication

#### **Challenges:**

The main challenge was inheriting a codebase developed by different teams and turning it into a polished, production-ready product. This required deep code analysis, refactoring for consistency, and building new features while maintaining compatibility with the existing architecture. Successfully integrating video conferencing into our application gave users a complete communication solution within a single platform.

---

### Project 5: Feature Flag Management System

A robust, full-stack feature flag management system built with modern web technologies, enabling teams to control feature rollouts and manage account-specific settings with precision and ease.
Technical Overview

Built with a cutting-edge tech stack:

- Frontend: Next.js 13+ with TypeScript and App Router
- Backend: Node.js with PostgreSQL
- ORM: Drizzle ORM for type-safe database operations
- UI: Tailwind CSS with shadcn/ui components
- State Management: React Hook Form for form handling
- Theme: Dark/Light mode with system preference detection

Key Features

- Feature Flag Management
  - Create and manage feature flags with version control
  - Set minimum client version requirements
  - Configure user update permissions
  - Real-time status monitoring

- Account-Level Controls
  - Granular feature toggle management per account
  - Customer-specific feature settings
  - Bulk feature management capabilities

- User Experience
  - Responsive, accessible interface
  - Dark/Light theme support
  - Real-time updates
  - Comprehensive error handling
  - Loading states for optimal UX

Technical Highlights

- Database Architecture
  - Optimized schema design with proper relationships
  - Connection pooling for enhanced performance
  - Type-safe database operations

- API Design
  - RESTful endpoints for all CRUD operations
  - Proper error handling and status codes
  - Efficient data fetching patterns

- Security & Performance
  - Type-safe operations throughout the stack
  - Optimized database queries
  - Form validation and sanitization
  - Protected API endpoints

This project demonstrates expertise in:

- Full-stack TypeScript development
- Modern React patterns and best practices
- Database design and optimization
- UI/UX design principles
- Production-grade error handling
- Performance optimization
- Theme system implementation

The system is designed to scale, making it suitable for both startups and enterprise-level applications requiring sophisticated feature flag management.
