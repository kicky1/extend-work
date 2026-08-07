# Extend Career — System Architecture

This document describes the high-level architecture of the Extend Career
platform, an AI-powered career platform for managing an entire job search.

## Overview

Extend Career is a **Next.js 16** single-page application (React 19,
TypeScript) that provides a set of job-search management tools backed by
Supabase for authentication and data, Stripe for payments, and the Vercel AI
SDK (Anthropic) for AI features.

## High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (Client)                      │
│  Next.js 16 App Router · React 19 · Tailwind CSS 4           │
│  Framer Motion · Zustand (client state) · TipTap (editor)    │
└───────────────┬───────────────────────────────┬─────────────┘
                │                               │
        ┌───────▼────────┐             ┌────────▼─────────┐
        │  Next.js API   │             │  AI SDK (Vercel) │
        │  Routes / SSR  │             │  Anthropic       │
        └───────┬────────┘             └────────┬─────────┘
                │                               │
        ┌───────▼───────────────────────────────▼─────────┐
        │              External Services                   │
        │  Supabase (auth + database)                      │
        │  Stripe (payments)                               │
        │  UploadThing (file uploads)                      │
        │  Gmail / Outlook (email sync)                    │
        └──────────────────────────────────────────────────┘
```

## Tech Stack

| Layer        | Technology                                        |
| ------------ | ------------------------------------------------- |
| Framework    | Next.js 16 (App Router)                           |
| UI           | React 19, Tailwind CSS 4, shadcn/ui, Base UI      |
| State        | Zustand (client), React Server Components (server)|
| Styling      | Tailwind CSS 4, Framer Motion, tw-animate-css     |
| Editor       | TipTap (rich text), docx / jspdf (export)         |
| Auth & Data  | Supabase (SSR + supabase-js)                      |
| Payments     | Stripe                                            |
| AI           | Vercel AI SDK (`ai`, `@ai-sdk/anthropic`)         |
| File uploads | UploadThing                                       |
| Validation   | Zod                                                |
| Drag & drop  | dnd-kit                                           |

## Core Modules

- **CV Builder** — Create ATS-friendly resumes with 100+ templates and live
  preview. Uses TipTap for editing and `docx`/`jspdf`/`html-to-image` for
  export.
- **Smart Job Matching** — AI-powered match scoring to surface relevant
  opportunities. Uses the AI SDK with Anthropic.
- **Email Management** — Centralized inbox for job-search communications with
  Gmail/Outlook sync.
- **Interview Tracker** — Calendar integration with reminders and AI interview
  prep.

## Data & Persistence

- **Supabase** provides authentication and the primary database. The app uses
  `@supabase/ssr` for server-side rendering integration and
  `@supabase/supabase-js` for the client.
- **Zustand** is used for lightweight client-side state that does not need to
  be persisted server-side.

## AI Integration

AI features (job matching, interview prep, CV assistance) are powered by the
Vercel AI SDK (`ai` + `@ai-sdk/anthropic`). Streaming responses are rendered
with `streamdown` and `use-stick-to-bottom` for chat-style UX.

## Payments

Stripe (`stripe` v17) handles subscription and payment flows.

## Development

```bash
npm install
npm run dev      # start development server
npm run build    # production build
npm run lint     # run ESLint
```

## Deployment

The app is a standard Next.js deployment (build + start). Environment
variables are required for Supabase, Stripe, Anthropic, and UploadThing
credentials.
