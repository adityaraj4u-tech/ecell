# GEC Banka E-Cell

[![CI](https://github.com/OWNER/gec-banka-ecell/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/gec-banka-ecell/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

Official website of the **Entrepreneurship Cell**, Government Engineering College Banka (Bihar).

**Live demo:** _deploy to Vercel and replace this line with your URL_

A production-oriented, accessible, dark/light themed marketing site for campus entrepreneurship programs, events, mentors, and outreach.

## Features

- Responsive shell with sticky glass navbar, scroll-spy, and mobile drawer
- Hero with aurora background and animated stat counters
- About (vision / mission / values tabs + milestones)
- Core initiatives bento grid with detail modals
- Partners marquee + mentors grid
- Events timeline with filters, registration modal, and mock API
- Gallery (masonry + lightbox), testimonials carousel, contact form
- Footer with newsletter signup and social links
- SEO: Metadata API, Open Graph, Twitter cards, JSON-LD, sitemap, robots
- Optional Supabase persistence for registrations, contacts, and subscribers

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Theme | next-themes |
| UI primitives | Radix Dialog, CVA, Lucide |
| Forms | react-hook-form + zod |
| Deploy | Vercel (Hobby / free) |

## Folder structure

```
app/                 # Routes, layout, API, SEO (sitemap, robots)
components/
  layout/            # Navbar, Footer, ThemeProvider
  sections/          # Page sections
  ui/                # Button, Card, Modal, Input, …
data/                # Editable content (preferred edit surface)
lib/                 # utils, motion, validators, supabase, rate-limit
public/              # Static assets, OG image
```

## Getting started

```bash
git clone https://github.com/OWNER/gec-banka-ecell.git
cd gec-banka-ecell
npm install
cp .env.example .env.local   # optional
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run build       # production build
npm start           # serve production build
```

## Editing content (`/data`)

Keep marketing copy and lists out of JSX when possible:

| File | Purpose |
|------|---------|
| `data/stats.ts` | Hero counter targets |
| `data/about.ts` | Narrative, tabs, milestones |
| `data/initiatives.ts` | Programs and modal copy |
| `data/events.ts` | ISO dates drive Upcoming vs Past |
| `data/partners.ts` | Marquee partners |
| `data/mentors.ts` | Mentor cards |
| `data/testimonials.ts` | Carousel quotes |
| `data/gallery.ts` | Gallery images and captions |

Unverified entries are marked with `// PLACEHOLDER: replace with verified data`.

Gallery images currently use Unsplash URLs as **placeholders** — replace with campus-owned photos and update `alt` text. OG art: replace `public/og-image.svg` with a 1200×630 `og-image.png` and point metadata at it in `app/layout.tsx`.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL for SEO |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | Server-only inserts (preferred) |

Without Supabase keys, API routes validate input, apply rate limits and honeypots, log to the server console, and return success.

## Supabase setup (optional)

```sql
create table public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  branch text not null,
  year text not null,
  "rollNumber" text not null,
  phone text not null,
  "eventId" text not null,
  "eventTitle" text not null,
  created_at timestamptz not null default now()
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);
```

Set env vars on Vercel and redeploy. Adapter: `lib/supabase.ts`.

## Deploy on Vercel

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. Framework: **Next.js** (auto-detected).
3. Add `NEXT_PUBLIC_SITE_URL` (and optional Supabase keys).
4. Deploy. Pushes to `main` auto-deploy when the project is linked.

Then set the live demo link in this README to your `*.vercel.app` (or custom) domain.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE) © 2026 GEC Banka E-Cell
