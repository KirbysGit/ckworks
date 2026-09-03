# Backlog

Verified issues, open investigations, and technical debt.

Only record something here after confirming it in the repository. Note what was
checked so the next agent does not have to rediscover it. Move durable rules to
[`decisions.md`](decisions.md); remove an entry once it is genuinely resolved.

**Last verified: 2026-08-20**

## Discovery And Positioning

### Demo copy dominates the homepage DOM

**Verified.** Windermere Wellness copy renders roughly four times on the
homepage (desktop hero, mobile hero, desktop transformation, mobile
transformation). In the rendered text order it is the largest body of prose in
the upper half of the page, appearing before the real "What I do" service
content.

**Partly addressed 2026-08-20.** Every demo now carries a visible
"Illustrative example" caption, and the bottom-row service visuals are
`aria-hidden` with `data-nosnippet`. The hero and transformation mockups still
render their prose roughly four times in the DOM, so the volume problem stands
even though the labelling one does not. Coordinate with the duplicate-DOM item
below.

### Commercial proof is thin

**Verified.** `lib/projects.ts` contains one shipped client website (Tizirsso
Racing). Everything else is a personal product, concept, internship build, or
prototype.

This limits what service pages can honestly claim. Strengthening it needs real
work: completed client sites, permissioned testimonials, and measured outcomes.
Not a code fix. See [`project-registry.md`](project-registry.md).

## Architecture

### `app/services/[slug]/page.tsx` is oversized

**Verified.** 4,499 lines holding all five bespoke service experiences plus
their visual mockups, against a stated 300-500 line review signal.

Extraction plan and ordering are in [`architecture.md`](architecture.md). Not
urgent for correctness, but every service edit widens the gap and slows Fast
Refresh.

### `SectionHeading` and `SectionHeader` name collision

**Verified.** `components/page/SectionHeading.tsx` and
`components/ui/SectionHeader.tsx` both exist and are used in production markup.

Needs a deliberate cleanup pass: decide which survives, migrate usages, then
rename. Do not rename either as a side effect of unrelated work.

### Duplicate mobile and desktop DOM

**Verified.** `components/home/Hero.tsx` renders the H1 text twice — once in a
`block md:hidden` span and once in a `hidden md:inline` span.
`components/home/TransformationSection.tsx` ships a mobile swipe carousel and a
separate desktop board with overlapping content.

Costs: duplicated text for crawlers, larger DOM, and extra hydration work on
slow devices. One fix serves both the SEO and performance goals. This is a
structural change, so it should be its own task.

## Performance

### Homepage entrances are hydration-gated

**Verified.** Homepage sections use the Framer Motion
`initial` plus `whileInView` pattern, so content starts invisible and is only
revealed after the JavaScript bundle loads and hydrates. On a slow device the
hero headline and CTA are blank until then.

Service pages are unaffected: they are server components using the CSS
primitives and `Reveal`.

Note that removing homepage animation would not shrink the bundle — Framer
Motion is already site-wide through `Header` and `FAQSection`. The value is in
removing the visibility gate, not the dependency.

Suggested order: fix the above-the-fold hero first, convert below-fold sections
opportunistically, and treat the duplicate-DOM item separately.

### No production performance baseline

**Open investigation.** Dev-server timing is not representative: `next dev`
serves unminified React, compiles on demand, and skips image optimization.

Nothing has been measured against a production build. Before further
optimization, run `next build` plus `next start` with a throttled mobile
Lighthouse pass and record LCP, CLS, and TBT here. Vercel Analytics provides
real-user vitals once deployed.

## Tooling

### Production builds rewrite `tsconfig.json`

**Verified.** Running `next build` with a custom `NEXT_DIST_DIR` causes Next.js
to append that directory's types path to the `include` array and re-sort the
existing entries. This produced an unrequested `tsconfig.json` diff on
2026-08-07, since reverted.

`include` currently carries `.next-preview`, `.next`, `.vercel-check`, and
`.reorg-check` entries from earlier builds. They are harmless but accumulate.
This is why `AGENTS.md` says not to run a production build during active visual
work.

## Open Questions

### Inquiry recipient domain

**Needs confirmation, not a bug.** `.env.example` line 11 sets
`CKWORKS_INQUIRY_TO_EMAIL=hello@ckworks.co`, while every public surface
(`lib/data.ts`, `lib/site.ts`, `app/opengraph-image.tsx`) uses
`hello@ckworks.studio`.

This is a private routing value, not a public identity leak, and `.co` may be a
deliberate mailbox choice. Confirm with Colin before changing anything.

## Recently Resolved

- **2026-08-31** — ESLint is configured. `eslint.config.mjs` uses the flat
  config with `next/core-web-vitals` and `next/typescript`, and the `lint`
  script calls the ESLint CLI directly rather than the deprecated `next lint`.
  The repository lints with zero errors.
- **2026-08-31** — The accessibility findings in `accessibility-audit.md` are
  resolved and a live axe-core scan passes on every route. See that file for
  what is still outstanding: a screen reader pass and a zoom/reflow check.
- **2026-08-20** — Orlando positioning now appears in CK Works own content:
  the homepage hero eyebrow, the About hero, the contact page, and the
  homepage title. It is no longer only the Riverstone demo carrying a local
  signal.
- **2026-08-20** — Homepage title leads with the service and the city rather
  than the tagline. Every other page title names what the page is, and case
  studies use `metaTitle` instead of a bare project name.

- **2026-08-07** — `excel-logo.svg` reduced from roughly 349KB to 6.4KB. All
  SVGs under `public/images/services/svg/` are now 21KB or smaller. The asset is
  used by `components/home/Services.tsx` on the homepage, so the reduction
  mattered.
- **2026-08-07** — Reverted the `.check-anim/types/**/*.ts` entry that a
  production build added to `tsconfig.json`; the file now matches `HEAD`.
