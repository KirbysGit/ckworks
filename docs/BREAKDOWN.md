# Project Breakdown

Current state of the CK Works site and what is actively in progress.

Keep this short and dated. Durable rules belong in [`decisions.md`](decisions.md);
verified problems belong in [`backlog.md`](backlog.md).

**Last verified: 2026-08-29**

## What This Is

A marketing and portfolio site for CK Works, Colin Kirby's independent digital
studio. It currently sells web design and development, search and AI visibility,
analytics and lead tracking, digital systems and integrations, and ongoing
support. Web Accessibility is now present as the sixth service across the main
discovery surfaces, and its bespoke long-form page is now built. The site
is also the studio's own proof of capability, so its quality is part of the
pitch.

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

## Discovery State

Closed in the 2026-08-19 pass, so do not re-litigate these:

- `https://www.ckworks.studio` is the canonical host and every signal agrees
  with the redirect. `lib/site.ts` is the only place the domain is written.
- Sitemap `lastmod` is an explicit date per route, never a build timestamp.
- Page titles name what each page is. The homepage H1 is a brand line by
  design, so the title tag carries the service and the city.
- Orlando appears in CK Works own copy: hero eyebrow, About, and Contact.
- Every fictional demo carries a visible "Illustrative example" caption; the
  invented metrics also carry `data-nosnippet`.
- Each service states a timeline; each case study states an outcome, a
  timeframe, and the service it proves, and links to both.

See [`decisions.md`](decisions.md) for the rules behind the first two.

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
| SEO & AI Search Visibility | Google result and AI Overview cards; search-ready site preview |
| Analytics & Lead Tracking | Measurement snapshot with donut; lead report with conversion funnel, source attribution, and inquiry table |
| Digital Systems & Integrations | Inquiry-to-workflow hero; tool grid around a "Your business" hub |
| Ongoing Support | Example support view; request tracker |

Shared idioms across these pages: numbered scope lists, left heading with a
vertical divider and icon rows, sand principle panels, `FAQSection`, and a
closing CTA.

## Recently Completed

- Bespoke designs for all five service pages
- Motion system: CSS entrance primitives in `app/globals.css` plus
  `components/ui/Reveal.tsx`. Now applied to all five service pages — Web
  Design, SEO & AI Search Visibility (`ck-draw-x`, the first reveal-aware
  primitive), Analytics (`ck-draw-arc`, plus a skeleton-to-figures load in the
  hero), Digital Systems (`ck-step`, and the first sequenced flow diagrams),
  and Ongoing Support. The homepage is now the main surface still using
  hydration-gated Framer Motion entrances.
- Agent documentation set: `AGENTS.md`, `CLAUDE.md`, and `docs/`
- First component ownership migration: homepage, layout, inquiry, contact,
  projects, and analytics moved out of the `components/` root
- All five bespoke service pages moved behind a thin service route (60 lines)
  and a shared layout, tracking, and schema frame

## In Progress

- **ADA Title II child page.** The parent Web Accessibility page is built and
  live, including its contained Title II band. The dedicated
  `/services/web-accessibility/ada-title-ii` page is the next piece and is
  scoped in [`web-accessibility-service.md`](web-accessibility-service.md).
  Note it does not fit the single-segment `[slug]` route and needs an explicit
  nested route rather than another `ServiceSlug`.
- **Service section extraction.** Each bespoke service now has its own
  `components/services/<service>/Page.tsx`. The next pass is splitting the
  largest local visual groups into section and `visuals/` files without mixing
  in redesign work.

## Known Constraints

- The service route is now a small metadata and selection layer. The first
  extraction keeps each service page intact inside its own feature folder, so
  the largest modules are still single files: SEO & AI Search Visibility (~1,600
  lines) and Web Design (~1,390). SEO & AI Search Visibility is now the biggest and
  should be split by visible band first. See [`architecture.md`](architecture.md).
- Only one shipped client website exists in the portfolio (Tizirsso Racing), so
  commercial proof is thin. See [`project-registry.md`](project-registry.md).
- Orlando now appears in CK Works own copy, but only as studio location. There
  is no location page and no `LocalBusiness` schema. See
  [`seo-strategy.md`](seo-strategy.md) for the caution around both.
- No ESLint configuration exists despite a `lint` script. See
  [`backlog.md`](backlog.md).

## Local Development

- Dev server on port 3200 via `.claude/launch.json`
- `npx tsc --noEmit --pretty false` after TypeScript changes
- Do not run a production build during active visual work unless asked; it
  rewrites the `include` array in `tsconfig.json`
