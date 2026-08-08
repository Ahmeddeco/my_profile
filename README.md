# Ahmed Abdelfattah — Personal Portfolio & Agentic AI Platform

![Ahmed Abdelfattah Portfolio](public/images/heroSection.webp)

## Full-Stack Web Development & Agentic AI Integration

A modern, highly scalable full-stack personal portfolio and AI workspace built with Next.js 16 (App Router), React 19, Mastra AI Agent Framework, Prisma ORM, and Tailwind CSS v4.

## Overview

This repository contains the official personal platform for Ahmed Abdelfattah (Agentic AI Engineer & Full-Stack Developer). The project serves as a practical showcase of modern web architecture, integrating type-safe server workflows, scalable database operations, interactive client interfaces, and autonomous AI agents capable of contextual tool execution and workflow orchestration.

## Architecture & Advanced Next.js Features

This project utilizes the latest paradigms introduced in Next.js 16 and React 19, maximizing performance, SEO, and developer experience:

- **Next.js `<Form>` Component:** Integrated for handling search, filtering, and mutation forms with automatic URL parameter synchronization, smooth navigation, and progressive enhancement.
- **Optimized `<Link>` Component:** Utilized across the application for client-side route prefetching and zero-latency page transitions.
- **Explicit Cache Directive (`'use cache'`):** Implemented alongside `cacheLife` and `cacheTag` to fine-grain control Server Action caching, database query memoization, and targeted cache revalidation.
- **Server Actions & Server Components:** Built with React 19 Server Components to execute backend operations securely, reducing client-side JavaScript bundles.
- **Progressive Web App (PWA):** Configured via `@ducanh2912/next-pwa` for offline readiness, asset caching, and mobile installability.

---

## Why Next.js & Mastra AI?

### Key Advantages of Next.js 16

1. **Unified Server/Client Execution:** Allows direct database calls via Prisma inside Server Components, reducing API overhead and eliminating client-side data fetching waterfalls.
2. **Advanced Caching Capabilities:** The `'use cache'` directive provides granular control over dynamic data fetching, ensuring fast load times while maintaining real-time data accuracy through tags (`cacheTag`).
3. **Enhanced Form & Navigation Primitives:** Native support for optimistic UI updates, Server Actions, and integrated `<Form>` handling provides clean fallback mechanisms even when JavaScript is disabled or loading.
4. **Turbopack Compiler:** Speeds up local development feedback loops and production builds significantly.

### Key Advantages of Mastra AI Engine

1. **Autonomous Agent Architecture:** Provides a structured, framework-native solution to create, manage, and execute complex LLM agents in Node.js/Next.js environments.
2. **Context & Memory Management:** Built-in support for vector stores (`@mastra/pg`, `@mastra/libsql`) and conversation memory, enabling contextual awareness across multi-turn interactions.
3. **Type-Safe Tool Integration:** Seamlessly connects backend utility functions, APIs, and databases as executable tools for agents using Zod schema definitions.
4. **Local & Cloud LLM Flexibility:** Works with local models via Ollama (`ollama-ai-provider-v2`) as well as cloud-hosted LLM providers with unified API interfaces.

---

## Complete Tech Stack & Dependencies

### Core Frameworks & Runtime

- **Framework:** Next.js 16.2 (App Router)
- **UI Runtime:** React 19.2
- **Language:** TypeScript 5.9

### AI & Agentic Systems

- **Agent Framework:** Mastra AI Suite (`@mastra/core`, `@mastra/memory`, `@mastra/pg`, `@mastra/libsql`)
- **Vercel AI SDK:** `ai` v7 & `@ai-sdk/react`
- **LLM Integrations:** Ollama Provider (`ollama-ai-provider-v2`), TokenLens

### Database & Authentication

- **ORM:** Prisma ORM 7.9 (`@prisma/client`, `@prisma/adapter-pg`)
- **Database Driver:** PostgreSQL (`pg`)
- **Authentication:** Better Auth 1.6 (`better-auth`)

### State Management & Validation

- **State Management:** Zustand 5.0
- **Form Validation:** Conform (`@conform-to/react`, `@conform-to/zod`)
- **Schema Validation:** Zod 3.25

### UI & Styling

- **CSS Framework:** Tailwind CSS v4, PostCSS
- **UI Components:** Radix UI, Base UI, Shadcn UI
- **Animations:** Motion (Framer Motion), Rive WebGL (`@rive-app/react-webgl2`)
- **Rich Text Editor:** TipTap (`@tiptap/react`)
- **Charts & Graphs:** Recharts
- **Icons:** Lucide React, React Icons
