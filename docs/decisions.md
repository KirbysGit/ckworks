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

- Above-the-fold entrances use the CSS primitives in `app/globals.css`
  (`ck-rise`, `ck-fade`, `ck-lift`, `ck-wipe`, `ck-pop`, `ck-loadbar`) because
  CSS animation runs at first paint.
- Below-the-fold entrances use `components/ui/Reveal.tsx`, which keeps content
  visible until JavaScript confirms the element is off-screen.
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
- The existing large `app/services/[slug]/page.tsx` should be extracted in
  stages, starting with Web Design and Search & AI Visibility.

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
