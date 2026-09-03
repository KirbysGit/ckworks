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

## 2026-08-18: Canonical Host Is www

- `https://www.ckworks.studio` is the canonical host. `ckworks.studio`
  permanently redirects to it, so every other signal must agree with the
  redirect target.
- `lib/site.ts` is the only place the host is written. Canonicals,
  `metadataBase`, Open Graph URLs, `robots.txt` host and sitemap lines, sitemap
  entries, and the schema `@id` values in `app/layout.tsx` all derive from it.
  Do not hardcode the domain anywhere else.
- `NEXT_PUBLIC_SITE_URL` overrides the constant. It is deliberately unset in
  Vercel so the committed value is authoritative in production. Setting it to a
  non-www host would silently undo this.
- After a deploy that changes host signals, resubmit the sitemap in Search
  Console and request indexing on the priority pages.

## 2026-08-18: Sitemap lastmod Is Explicit

- `app/sitemap.ts` carries a hand-maintained date per route. It must never go
  back to `new Date()`: a build timestamp claims every page changed on every
  deploy, which is a signal Google learns to discount.
- Build-time git dates are not a substitute. Vercel clones shallowly, so
  `git log` on a file returns the deploy commit and the result is the same.
- Bump a route's date when its content meaningfully changes. Cosmetic tweaks do
  not count — the date should track what a returning crawler would find new.
- Initial values were seeded from each route's real last commit date.

## 2026-08-18: Solo Studio Voice

- CK Works is one person. Public copy uses **CK Works** for capabilities,
  **I** for the working relationship, and **we** only when it means Colin plus
  the client.
- Do not use studio-we for positioning ("We turn ideas into…", "We build
  websites…"). That implies a team that is not there.
- The rule lives in `docs/content-discovery.md` under Voice. Apply it to new
  public copy; case-study "we" that genuinely means client collaboration can
  stay.

## 2026-08-20: One Line Per Surface For A Case Study

- A case study says a different thing on each surface. Do not repeat one on
  another.
  - Detail page hero: `oneLiner` describes it, `outcomeLine` proves it.
  - `/work` index: `outcomeLine` only. The teaser used to sit beside it saying
    nearly the same thing; the name and category already establish what the
    project is, so the outcome is the line that differentiates one card from
    the next.
  - Homepage carousel and service-page related cards: teaser, tags, and year.
    These are browse surfaces, not evaluation surfaces, and an outcome line
    clutters them. Their treatment is deliberate, not stale.
- `outcomeLine`, `timeframe`, and `serviceSlug` exist on every case study.
  Rules for writing an outcome live in `project-registry.md`.
- Every case study links to the service it proves and to the next project.
  Before this they reached their service only through the footer and then
  dead-ended, so each was a leaf node.

## 2026-08-29: Web Accessibility Is A Broad Sixth Service

- The permanent service is **Web Accessibility** at
  `/services/web-accessibility`. ADA Title II is the first focused outreach
  angle, not the parent service name or the whole offer.
- V1 is one parent page with a prominent public-entity band. A dedicated
  `/services/web-accessibility/ada-title-ii` child page remains unpublished
  until municipal outreach demonstrates distinct audience and content needs.
- Accessibility receives a full sixth homepage card and normal navigation,
  footer, services-index, inquiry, metadata, schema, sitemap, and analytics
  treatment. It must not look like an experimental legal landing page.
- The default offer is an **accessibility review**, followed by prioritization,
  improvement, and maintenance. Do not call it a formal audit, publish fixed
  packages, or offer a free audit until the methodology and deliverable are
  defined.
- CK Works provides technical accessibility services, not legal advice or
  compliance certification. Copy must not promise legal compliance, protection
  from claims, complete automated coverage, or universal document remediation.
- Regulatory facts belong in a contained Title II section and must be
  reverified against official sources immediately before publication.
- The durable content, visual, route, and launch plan lives in
  `docs/web-accessibility-service.md`; it replaces the earlier Title II-first
  concept.

## 2026-08-31: Service Order Has One Source

- The order of `serviceAreas` in `lib/services.ts` is the single source of
  truth for how services are sequenced everywhere.
- Displayed numbers come from `serviceNumber(slug)`, never hand-written. The
  header dropdown and the services index each carried their own hardcoded set,
  which is how Web Accessibility was labelled "03" in the nav and "05" on the
  index at the same time.
- Reordering means editing that one array. Do not add a number to a component.

## 2026-08-31: A CTA Carries Its Own Context

- `ProjectInquiryTrigger` infers the service from the current
  `/services/<slug>` path, so every CTA on a service page preselects that
  service with no per-button wiring to fall out of sync.
- The slug rides in the `href` as well as through React state, so preselection
  survives cmd-click, no JS, and crawlers.
- The query parameter carries the slug, not the option label. Slugs are stable;
  labels are display copy that can be reworded without anyone thinking about
  links. `serviceOptionForSlug` maps between them.
- Named intents in `lib/inquiry.ts` prefill the message for a known starting
  context, keyed by a short slug so the sentence stays out of the URL and both
  inquiry surfaces resolve the same wording.
- Prefills only ever fill an empty field. A visitor who has started typing is
  never overwritten.

## 2026-08-31: One Select, Not One Per Form

- `components/ui/SelectField.tsx` is the listbox select for the whole site. The
  inquiry modal and the contact form previously carried their own near
  identical copies, and both were incomplete in the same ways.
- It follows the APG listbox pattern with `aria-activedescendant`. Options are
  `li[role="option"]` and are not focusable, so the list is one tab stop rather
  than one per option.
- Styling is passed in; behaviour is not. If a third select appears, use this
  one rather than writing another.

## 2026-08-31: Automated Checks Are A Floor

- A clean axe-core run is the minimum before shipping a page, not evidence of
  conformance. It cannot judge focus order, whether an alternative is
  meaningful, whether an error is recoverable, or whether a journey completes.
- It also does not test SC 1.4.11 non-text contrast at all. The form border
  failure that produced the `field` token was found by hand.
- This matters more here than on most sites, because
  `/services/web-accessibility` makes exactly this argument to visitors.
