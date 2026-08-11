# Decisions

This log records decisions that should survive individual design sessions. Add
a short dated entry when a choice changes how future pages or agents should
work.

## 2026-08-07: Agent Documentation System

- `AGENTS.md` is the primary repository instruction file for coding agents.
- `CLAUDE.md` is a thin adapter that points Claude Code at `AGENTS.md`. It must
  not duplicate the instruction set; edit `AGENTS.md` only.
- `docs/` provides the deeper architecture, design, discovery, and workflow
  context without turning the root guide into an essay.
- `.agents/brief-template.md` is the preferred starting point for a new design
  or implementation handoff.
- Documentation records verified repository state. Confirm a claim before
  writing it down, and mark an unconfirmed item as an open investigation rather
  than a fact.

## 2026-08-07: Strategy And Registry Documents

- `docs/seo-strategy.md` owns intentional search and answer-engine strategy:
  one URL per primary intent, the Orlando positioning ladder, query groups,
  FAQ coverage, prohibited page patterns, `LocalBusiness` schema caution, and
  evidence requirements.
- `docs/demo-registry.md` is the single list of fictional brands, people, and
  demo metrics. Reuse an existing demo entity before inventing another.
- `docs/project-registry.md` records what each real build demonstrates, its
  allowed claims, and what it must never imply. `lib/projects.ts` remains the
  source of public facts.
- `docs/BREAKDOWN.md` holds current state; `docs/backlog.md` holds verified
  issues and open investigations.

## 2026-08-07: Motion Rendering Rule

- Above-the-fold entrances use the CSS primitives in `app/globals.css` because
  CSS animation runs at first paint. `design-system.md` holds the current
  table; check there before using one.
- Below-the-fold entrances use `components/ui/Reveal.tsx`, which keeps content
  visible until JavaScript confirms the element is off-screen.
- `Reveal` is a single-step CSS *transition*, so it cannot drive multi-step
  motion, and a plain `ck-*` animation placed inside one runs at first paint
  and finishes off-screen.

## 2026-08-08: Reveal-Aware Primitives

- A primitive that must wait for scroll is defined three times: base (runs on
  load), `.ck-reveal .x` (held), and `.ck-reveal.is-in .x` (runs on reveal).
  `ck-step` and `ck-draw-x` follow this contract.
- This is how a below-the-fold sequence is built: one `Reveal` around the
  whole visual, then a `--ck-anim-delay` per moving part. Do not nest a
  `Reveal` around every element — that is one IntersectionObserver each.
- Every held state needs a matching `prefers-reduced-motion` reset, or the
  element stays stuck in its "before" state when the animation is cancelled.
- Do not hold a property that the element also sets as an SVG presentation
  attribute; CSS outranks it and reduced motion cannot recover the real value.
  `ck-draw-arc` is intentionally not reveal-aware for this reason.
- Where a visual represents a flow, sequence it in the order the work happens
  rather than revealing it all at once, and keep the delays in a named timing
  constant beside the component.
- Meaningful server-rendered content is never gated on hydration. The Framer
  Motion `initial` plus `whileInView` pattern is not used for page content.
- Framer Motion remains appropriate for orchestrated or interaction-driven
  animation layered over already-visible content.

## 2026-08-07: Service Page Modularity

- Service routes should select and compose feature modules, not contain every
  visual section for every service.
- New service work belongs under `components/services/<service>/`.
- Shared public-page patterns remain in `components/page/`; compact reusable UI
  remains in `components/ui/`.
- The route extraction is complete: `app/services/[slug]/page.tsx` is now a
  thin selection and metadata layer, and all five bespoke pages live in their
  own feature folders. Remaining work is splitting each `Page.tsx` by visible
  band, which happens inside that service folder.

## 2026-08-07: Visual Language

- CK Works remains a light-only experience built from ivory, sand, card, ink,
  forest, forest-soft, and line tokens.
- The visual voice is editorial and warm, with Cormorant Garamond for headings
  and Inter for interface/body text.
- Reference images guide composition and pacing; they should not replace the
  site's established system.
- Desktop retains layered split layouts where useful. Phone layouts are
  intentionally simplified rather than mechanically compressed.

## 2026-08-07: Public Claims And Discovery

- Pages describe practical services with clear, grounded language.
- Illustrative visual demos must not be presented as client proof or rankings.
- SEO and AEO work prioritizes truthful visible content, meaningful hierarchy,
  internal links, metadata, structured data, and accessible FAQs.

## 2026-08-07: Quality And Maintainability

- Write public copy with concrete, CK Works-specific language. Avoid generic
  agency language and unsupported claims.
- Accessibility, reduced motion, semantic controls, focus behavior, and useful
  alt text are required parts of public UI work.
- Global CSS, theme configuration, shared primitives, and data modules must
  remain narrowly owned. Page-specific rules belong with the feature that uses
  them.
- Validate public API requests on the server and keep personal information out
  of analytics.
