# APIVault

> The developer directory of free AI APIs. Verified weekly, ranked transparently, with copy-paste code on every page.

## What's in this repo

- **20 AI APIs** with real free tiers, fully documented
- **6 collections** curated by use case
- **5 alternatives** pages (OpenAI, Claude, etc.)
- **4 SEO guides** (in-depth comparisons)
- **Trust score** with transparent formula
- **Status page** with live status of all providers
- **Full SEO** setup: sitemap, robots, JSON-LD, OpenGraph
- **Dark-mode design** with a clean terminal aesthetic: a static dot-grid, a single slow "breathing" glow (12s), and faint grain — calm, not busy

## Stack

- **Next.js 15** (App Router) + React 19
- **TypeScript** (strict)
- **Tailwind CSS 3** (custom design tokens)
- **Lucide Icons**
- **Fonts via `next/font/google`** — Space Grotesk (display), Inter (body), JetBrains Mono (code). No external font package required.
- **No database** — data lives in `/lib` as typed TypeScript modules (easy to swap to a DB later)

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Run production build
npm run lint         # ESLint
npm run type-check   # TypeScript check
```

## The "clean" background

The animated background is intentionally minimal. It is built from three calm layers in `app/globals.css`:

1. `.bg-dots` — a faint **static** dot grid, masked so it fades out toward the bottom.
2. `.bg-glow` — a single soft accent glow that **breathes** very slowly (`breathe` keyframe, 12s).
3. `.bg-noise` — a barely-there grain (opacity 0.03) to kill gradient banding.

No moving particles, no fast pulsing, and everything is disabled under `prefers-reduced-motion`.

To make it calmer/livelier, edit the `breathe` keyframe in `app/globals.css` and `tailwind.config.ts` (change the `12s` duration or the opacity range).

## Adding a new provider

1. Open `lib/providers.ts`
2. Add a new object to the `providers` array (copy an existing one as a template).
3. The new page is automatically available at `/providers/<slug>` via `generateStaticParams`.

The same pattern applies to `lib/collections.ts`, `lib/alternatives.ts`, and `lib/guides.ts` — routes are auto-generated.

## Deployment

### Vercel (recommended)

```bash
vercel
```

### Other platforms

```bash
npm run build
npm run start
```

## Customization

### Accent color

Edit `tailwind.config.ts` → `colors.accent`.

### Fonts

Edit the `next/font/google` imports in `app/layout.tsx`.

## License

MIT
