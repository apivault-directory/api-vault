<div align="center">

<br />

```
 █████╗ ██████╗ ██╗██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗
██╔══██╗██╔══██╗██║██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝
███████║██████╔╝██║██║   ██║███████║██║   ██║██║     ██║   
██╔══██║██╔═══╝ ██║╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║   
██║  ██║██║     ██║ ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║   
╚═╝  ╚═╝╚═╝     ╚═╝  ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   
```

**The developer directory of free AI APIs.**  
Verified weekly · Ranked transparently · Copy-paste code on every page.

<br />

[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-00FF88?style=flat-square)](LICENSE)

<br />

</div>

---

## What is APIVault?

Most "free AI API" lists on the internet are broken, outdated, or just wrong. APIVault is the fix.

Every provider in the directory is **manually verified** — we sign up, hit the endpoint, confirm the free tier actually works, and document the exact limits. Nothing is added on hearsay.

**65 providers.** 8 categories. A transparent 0–100 trust score. No affiliate links, no paid placements.

---

## Features

| Feature | Details |
|---|---|
| 🔍 **Search & Filter** | Filter by category, no credit card, no phone required. Sort by trust score, name, or free tier generosity |
| 📊 **Trust Score** | 0–100 score — reliability (35%) + free tier (30%) + documentation (20%) + popularity (15%) |
| 💻 **Code Snippets** | Python, JavaScript, cURL on every provider page. Copy and paste, nothing to configure |
| 🟢 **Status Page** | Live status of every tracked API — online, degraded, or down |
| 📦 **Collections** | Curated lists: hackathons, Chinese AI APIs, no-CC required, RAG stack, video generation, and more |
| 🔄 **Alternatives** | Side-by-side comparisons to OpenAI, Claude, ElevenLabs, Groq, and others |
| 🌍 **Chinese Providers** | Dedicated coverage of Chinese LLM providers with registration guides |
| 🗺️ **SEO-ready** | Sitemap, robots.txt, JSON-LD schema, Open Graph — all auto-generated |

---

## Provider Stats

```
Total providers   65
LLM providers     38   (including 17 Chinese providers)
No credit card    43
Image             7
Speech / Audio    7
Embeddings        4
Search            2
Video             2
Other             5
```

### Sample Providers

```
● Groq          — 14,400 req/day · 30 req/min · no card     [96]
● Google Gemini — 1,500 req/day · 1M context · no card      [95]
● DeepSeek      — 5M tokens free · $0.14/M after · no card  [93]
● Cerebras      — 1M tokens/day · 2,000 t/s · no card       [93]
● SiliconFlow   — 14M tokens free · no card                  [88]
● ModelScope    — 2,000 req/day · 7,200+ models · no card    [85]
● ...and 59 more
```

---

## Tech Stack

```
Framework    Next.js 15 (App Router) + React 19
Language     TypeScript (strict mode)
Styling      Tailwind CSS 3 with custom design tokens
Icons        Lucide React
Fonts        Space Grotesk · Inter · JetBrains Mono (self-hosted via @fontsource)
Data         Static TypeScript modules in /lib — no database, no ORM
SEO          Auto-generated sitemap.xml, robots.txt, JSON-LD, Open Graph
Analytics    Plausible (optional, privacy-first)
```

No database. No backend. No CMS. Data lives in `/lib` as typed TypeScript — easy to read, easy to edit, easy to migrate.

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/apivault-directory/api-vault.git
cd api-vault

# 2. Install
npm install

# 3. Set env
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_SITE_URL to your domain

# 4. Run
npm run dev
# → http://localhost:3000
```

### Environment Variables

```bash
# .env.local

NEXT_PUBLIC_SITE_URL=https://yourdomain.com       # Your domain (no trailing slash)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com       # Optional — Plausible analytics
```

---

## Project Structure

```
apivault/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage
│   ├── providers/
│   │   ├── page.tsx            # All providers (search + filter)
│   │   └── [slug]/page.tsx     # Individual provider page
│   ├── collections/[slug]/     # Curated lists
│   ├── alternatives/[slug]/    # Competitor comparisons
│   ├── guides/[slug]/          # SEO guides
│   ├── status/                 # Live API status
│   ├── methodology/            # Trust score explained
│   ├── changelog/              # What's new
│   └── submit/                 # Submit a new API
│
├── components/                 # Reusable UI components
│   ├── providers-client.tsx    # Search + filter (client component)
│   ├── provider-card.tsx       # Card on the directory page
│   ├── provider-row.tsx        # Row on the homepage top list
│   ├── nav.tsx                 # Navigation (with mobile menu)
│   ├── footer.tsx              # Footer with newsletter
│   ├── terminal-demo.tsx       # Animated terminal on homepage
│   └── ticker.tsx              # Scrolling status ticker
│
├── lib/                        # All data lives here
│   ├── providers.ts            # ← Add new providers here
│   ├── collections.ts          # ← Add/edit collections here
│   ├── alternatives.ts         # ← Add alternatives here
│   ├── guides.ts               # ← Add guides here
│   ├── changelog.ts            # ← Update changelog here
│   ├── types.ts                # TypeScript interfaces
│   ├── seo.ts                  # JSON-LD generators
│   └── utils.ts                # Helpers (timeAgo, scoreColor, etc.)
│
└── public/                     # Static assets
    ├── favicon.svg
    ├── logo.svg
    └── og.svg                  # Open Graph image
```

---

## Adding a New Provider

Open `lib/providers.ts` and add a new object to the `providers` array:

```typescript
{
  slug: "your-provider",           // URL: /providers/your-provider
  name: "Your Provider",
  logoText: "YP",                  // 1–3 chars shown in the logo box
  domain: "yourprovider.com",
  tagline: "Short one-liner about the free tier.",
  description: "Longer description for the provider page.",
  category: "LLM",                 // LLM | Image | Speech | Embeddings | Search | Video | Code | Vision
  website: "https://yourprovider.com",
  docsUrl: "https://docs.yourprovider.com",
  apiUrl: "https://api.yourprovider.com/v1",

  // Trust score components (0–100)
  apivaultScore: 85,
  reliabilityScore: 88,
  documentationScore: 82,
  freeTierScore: 86,
  popularityScore: 78,

  status: "online",                // online | degraded | down | unknown
  lastVerified: "2026-06-08",

  freeTierSummary: "1k req/day · no card",   // shown on cards
  freeTierDetails: {
    monthlyRequests: "1,000 requests/day",
    monthlyTokens: "500K tokens/month",       // optional
    rateLimit: "10 requests/minute",          // optional
    models: "Model A, Model B, Model C",      // shown as chips on detail page
  },

  requiresCreditCard: false,
  requiresPhone: false,

  tags: ["OpenAI-compatible", "Streaming", "Function calling"],

  snippets: [
    {
      language: "python",
      label: "Python",
      code: `# your code here`,
    },
    {
      language: "curl",
      label: "cURL",
      code: `# curl example`,
    },
  ],

  pros: ["Great free tier", "OpenAI-compatible API"],
  cons: ["Limited model selection", "Rate limits during peak hours"],
  useCases: ["Chatbots", "Code generation"],

  changelog: [
    { date: "2026-06-08", type: "added", title: "Added to APIVault" },
  ],

  isFeatured: false,               // true = appears in terminal demo on homepage
  foundedYear: 2023,
  headquarters: "San Francisco, CA",
}
```

The new provider page is **automatically available** at `/providers/your-provider` via `generateStaticParams` — no routing config needed.

The same pattern applies to `lib/collections.ts`, `lib/alternatives.ts`, and `lib/guides.ts`.

---

## Design System

The UI uses a custom dark-mode design token system built on Tailwind:

```
Background   bg-0 (#0A0B0D)  →  bg-3 (#22262D)   darkest to lightest
Foreground   fg-0 (#F5F6F7)  →  fg-3 (#4A5058)   primary to muted
Accent       #00FF88 (green) — used for scores, highlights, CTAs
Borders      line (#262A31) · line-2 (#353B44)
Status       ok · warn · err · info
Fonts        display (Space Grotesk) · sans (Inter) · mono (JetBrains Mono)
```

### Background Layers

Three calm layers in `app/globals.css` — nothing busy:

1. **`.bg-dots`** — faint static dot grid, masked to fade downward
2. **`.bg-glow`** — single accent glow, breathes slowly (12s cycle)
3. **`.bg-noise`** — grain at 0.03 opacity to kill gradient banding

All animations respect `prefers-reduced-motion`.

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add env variables in the Vercel dashboard
4. Deploy — done

### Self-hosted

```bash
npm run build
npm run start
# Runs on port 3000
```

### Scripts

```bash
npm run dev          # Dev server with hot reload
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint
```

---

## Contributing

1. **New provider** — edit `lib/providers.ts`, follow the schema above
2. **New collection** — edit `lib/collections.ts`
3. **Bug or design fix** — open a PR
4. **Don't know where to start** — [open an issue](https://github.com/apivault-directory/api-vault/issues)

All submissions are verified before merging. If you're adding a provider, include the signup URL and confirm the free tier is currently active.

---

## License

MIT — do whatever you want with it.

---

<div align="center">

Built for developers who are tired of searching.

**[apivault.dev](https://apivault.dev)** · [Submit an API](https://apivault.dev/submit) · [Status](https://apivault.dev/status)

</div>
