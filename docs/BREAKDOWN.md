# Project Breakdown

Current state of the CK Works site and what is actively in progress.

Keep this short and dated. Durable rules belong in [`decisions.md`](decisions.md);
verified problems belong in [`backlog.md`](backlog.md).

**Last verified: 2026-08-08**

## What This Is

A marketing and portfolio site for CK Works, Colin Kirby's independent digital
studio. It sells web design and development, search and AI visibility, analytics
and lead tracking, digital systems and integrations, and ongoing support. The
site is also the studio's own proof of capability, so its quality is part of
the pitch.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Framer Motion for orchestrated animation; CSS utilities plus `Reveal` for
  page entrances
- Lucide and React Icons
- `next/image` for local assets
- Vercel Analytics plus Google Tag Manager and GA4 events
- Resend-backed inquiry API at `app/api/inquiry/route.ts`

## Routes

| Route | Notes |
| --- | --- |
| `/` | Homepage; the heaviest client-side page |
| `/services` | Service hub |
| `/services/[slug]` | Five services, each with a bespoke page |
| `/work` | Portfolio index |
| `/[slug]` | Individual project case studies |
| `/about` | Founder and studio |
| `/process` | How projects run |
| `/contact` | Inquiry path |
| `/privacy-policy`, `/terms` | Legal |
| `/api/inquiry` | Inquiry submission endpoint |

Supporting routes: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`,
`app/icon.png`, `app/apple-icon.png`.

## Homepage Composition

`Header → Hero → TransformationSection → Services → WorkPreview → Process →
FounderNote → CTA → Footer`

Homepage sections are client components using Framer Motion. This is the main
page still using hydration-gated entrances.

## Component Ownership Migration

The `components/` root is intentionally empty. Each component now has a
feature or shared-layer owner, so a page-specific file does not have to sit
next to unrelated site-wide work.

| Area | Location | Status |
| --- | --- | --- |
| Homepage composition | `components/home/` | Moved 2026-08-07 |
| Header, footer, route shell | `components/layout/` | Moved 2026-08-07 |
| Inquiry modal and trigger | `components/inquiry/` | Moved 2026-08-07 |
| Contact form and WhatsApp link | `components/contact/` | Moved 2026-08-07 |
| Project cards and page-view event | `components/projects/` | Moved 2026-08-07 |
| Service page-view event | `components/analytics/` | Moved 2026-08-07 |
| Shared public-page sections | `components/page/` | Existing shared layer |
| Shared visual primitives | `components/ui/` | Existing shared layer |
| Bespoke service experiences | `components/services/` | Moved 2026-08-07 |

This is a file-ownership migration only. Keep visual redesign and copy changes
out of these moves so regressions stay easy to isolate.

## Service Pages

All five have custom designs. A generic template fallback remains in the route
for any service without a bespoke branch.

| Service | Signature visual |
| --- | --- |
| Web Design & Development | Hearth & Home laptop and phone mockups; four-stage transformation |
| Search & AI Visibility | Google result and AI Overview cards; search-ready site preview |
| Analytics & Lead Tracking | Measurement snapshot with donut; lead report with conversion funnel, source attribution, and inquiry table |
| Digital Systems & Integrations | Inquiry-to-workflow hero; tool grid around a "Your business" hub |
| Ongoing Support | Example support view; request tracker |

Shared idioms across these pages: numbered scope lists, left heading with a
vertical divider and icon rows, sand principle panels, `FAQSection`, and a
closing CTA.

## Recently Completed

- Bespoke designs for all five service pages
- Motion system: CSS entrance primitives in `app/globals.css` plus
  `components/ui/Reveal.tsx`. Applied in full to Web Design and, on
  2026-08-08, Search & AI Visibility (which also added `ck-draw-x`, the first
  reveal-aware primitive). Analytics, Systems, and Support still have none.
- Agent documentation set: `AGENTS.md`, `CLAUDE.md`, and `docs/`
- First component ownership migration: homepage, layout, inquiry, contact,
  projects, and analytics moved out of the `components/` root
- All five bespoke service pages moved behind a thin service route (60 lines)
  and a shared layout, tracking, and schema frame

## In Progress

- **Service section extraction.** Each bespoke service now has its own
  `components/services/<service>/Page.tsx`. The next pass is splitting the
  largest local visual groups into section and `visuals/` files without mixing
  in redesign work.

## Known Constraints

- The service route is now a small metadata and selection layer. The first
  extraction keeps each service page intact inside its own feature folder, so
  the largest modules are still single files: Search & AI Visibility (~1,600
  lines) and Web Design (~1,390). Search & AI Visibility is now the biggest and
  should be split by visible band first. See [`architecture.md`](architecture.md).
- Only one shipped client website exists in the portfolio (Tizirsso Racing), so
  commercial proof is thin. See [`project-registry.md`](project-registry.md).
- The site has no Orlando positioning yet. See [`seo-strategy.md`](seo-strategy.md).
- No ESLint configuration exists despite a `lint` script. See
  [`backlog.md`](backlog.md).

## Local Development

- Dev server on port 3200 via `.claude/launch.json`
- `npx tsc --noEmit --pretty false` after TypeScript changes
- Do not run a production build during active visual work unless asked; it
  rewrites the `include` array in `tsconfig.json`
