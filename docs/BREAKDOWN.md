# Project Breakdown

Current state of the CK Works site and what is actively in progress.

Keep this short and dated. Durable rules belong in [`decisions.md`](decisions.md);
verified problems belong in [`backlog.md`](backlog.md).

**Last verified: 2026-08-07**

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

## Service Pages

All five have custom designs. A generic template fallback remains in the route
for any service without a bespoke branch.

| Service | Signature visual |
| --- | --- |
| Web Design & Development | Hearth & Home laptop and phone mockups; four-stage transformation |
| Search & AI Visibility | Google result and AI Overview cards; search-ready site preview |
| Analytics & Lead Tracking | Measurement snapshot with donut; tilted reporting dashboard |
| Digital Systems & Integrations | Inquiry-to-workflow hero; tool grid around a "Your business" hub |
| Ongoing Support | Example support view; request tracker |

Shared idioms across these pages: numbered scope lists, left heading with a
vertical divider and icon rows, sand principle panels, `FAQSection`, and a
closing CTA.

## Recently Completed

- Bespoke designs for all five service pages
- Motion system: CSS entrance primitives in `app/globals.css` plus
  `components/ui/Reveal.tsx`, first applied to the Web Design page
- Agent documentation set: `AGENTS.md`, `CLAUDE.md`, and `docs/`

## In Progress

- **Applying motion to the remaining service pages.** Web Design is the pilot;
  the same primitives should extend to the other four.
- **Documentation consolidation.** This pass added strategy, registry, and
  backlog docs.

## Known Constraints

- `app/services/[slug]/page.tsx` is roughly 4,500 lines and holds all five
  service experiences. Extraction is planned but not started; see
  [`architecture.md`](architecture.md).
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
