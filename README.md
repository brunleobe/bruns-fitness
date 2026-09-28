# Bruns Fitness

Marketing site and member/trainer portal for a gym, built with Next.js 16 (App Router), React 19 and Tailwind CSS 4.

> Next.js 16 has breaking changes from older versions. Check `node_modules/next/dist/docs/` before using an API you're unsure of (see `AGENTS.md`).

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # type-check + production build
```

## Roles (demo)

There is no real login yet. The **Guest / Member / Trainer** switcher in the Navbar stores the role in a cookie (`bf-role`), and pages read it on the server to decide what to render.

| Page         | Guest                | Member                         | Trainer                  |
| ------------ | -------------------- | ------------------------------ | ------------------------ |
| `/`          | Marketing home       | Hero, week stats, bookings     | Hero, today's sessions   |
| `/classes`   | JOIN → plan modal    | BOOK → saved to cookie         | "Managing", no filters   |
| `/trainers`  | "Members only" box   | Request a 1-on-1 session       | Same as guest            |
| `/pricing`   | Plans                | Plans                          | Redirects to `/`         |
| `/dashboard` | Redirects to `/`     | My Apex (stats, bookings, billing) | Trainer portal (placeholder) |

Demo state lives in cookies: `bf-role`, `bf-bookings-v2`, `bf-session-requests-v1`. To wipe everyone's demo data, bump the version suffix in `src/lib/bookings.ts` or `src/lib/sessionRequests.ts`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx              Root HTML, fonts, global CSS
│   └── (site)/                 Every page — shares Navbar + Footer via layout.tsx
│       ├── page.tsx            Home (switches on role)
│       ├── classes/            page.tsx + GuestClasses / MemberClasses client wrappers
│       ├── trainers/           page.tsx + MemberTrainers client wrapper
│       ├── pricing/            page.tsx + PricingView
│       └── dashboard/          page.tsx (member + trainer)
├── components/
│   ├── layout/                 Navbar, Footer
│   ├── ui/                     Generic building blocks (RoleHero, StatCards)
│   ├── guest/                  Guest home sections (Hero, ApexMethod, Schedule, ...)
│   ├── member/                 Member-only sections
│   ├── trainer/                Trainer-only sections
│   ├── classes/                ClassesSection (guest/member/trainer views)
│   ├── trainers/               TrainersSection
│   └── pricing/                PricingSection, PlanModal
├── data/                       Static/mock data (*Data.ts) — swap for an API later
└── lib/
    ├── role.ts, bookings.ts,   Pure types + helpers, safe to import anywhere
    │   sessionRequests.ts
    └── server/                 Server-only: cookie readers + server actions
```

## Conventions

- **Pages decide, components render.** A `page.tsx` reads the role/cookies and picks what to show. Components receive data via props and don't read cookies themselves.
- **Shared page, role variants.** When a page differs slightly per role, pass a `view` prop (see `ClassesSection`) instead of copying the component.
- **Client wrappers live next to their page** (e.g. `classes/MemberClasses.tsx`). They hold client state like optimistic updates and call server actions.
- **Anything using `cookies()` or `'use server'` goes in `lib/server/`.** Client components must not import from there, except server actions from `lib/server/actions.ts`.
- **Guard pages in the page itself** (`redirect()` in `page.tsx`), not in a layout: layouts render in parallel with pages and don't protect them.
- **Mock data is fictional.** Never put real customer names, emails or other personal data in `src/data/`.
- Imports use the `@/` alias (`@/components/...`, `@/lib/...`).

## Typography

Three fonts, loaded in `src/app/layout.tsx` and mapped to Tailwind in `globals.css`:

| Class          | Font           | Use for                                                   |
| -------------- | -------------- | --------------------------------------------------------- |
| `font-display` | Oswald         | Headings (`h1`–`h3` get it automatically), buttons, nav links, big numbers and prices |
| `font-sans`    | Inter          | Body text (the default, no class needed)                  |
| `font-mono`    | JetBrains Mono | Small uppercase labels, dates, times, status badges, tags |

Oswald's heaviest weight is 700, so `font-black` on display text renders as bold.
