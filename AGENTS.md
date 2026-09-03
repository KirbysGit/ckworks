# CK Works Agent Guide

## Purpose

CK Works is Colin Kirby's small digital studio. The site should feel calm,
considered, practical, and genuinely useful to a prospective client. Build
clear websites and systems, not generic agency marketing or dashboard UI.

Read this file before making changes. For deeper context, use the documents in
`docs/`.

## Start Here

1. Read the task and inspect the relevant component, route, and nearby shared
   primitives before editing.
2. Check `docs/design-system.md` for visual work, `docs/architecture.md` for
   structural work, and `docs/content-discovery.md` for public-page copy.
3. Preserve existing user changes. Do not revert unrelated work.
4. Keep changes focused. Explain an important design tradeoff before changing
   direction from an established pattern.

## Code Shape

- Use TypeScript, Next.js App Router, Tailwind, and the `@/` import alias.
- Keep route files focused on metadata, data lookup, and composition.
- Put a custom page experience in its own feature folder under
  `components/<feature>/` or `components/services/<service>/`.
- Keep page bands, complex visuals, and interaction islands in separate files.
- Reuse `components/ui/` and `components/page/` before making another shared
  primitive. Make a new shared component only when it removes real duplication.
- Use direct names. Folder context carries meaning: prefer
  `components/services/web-design/Hero.tsx` over
  `WebDesignServiceHeroSectionComponent.tsx`.
- Keep content and domain data in `lib/`, especially `lib/services.ts`,
  `lib/projects.ts`, `lib/data.ts`, and `lib/navigation.ts`.
- Do not grow another multi-thousand-line page file. Extract by visual section
  or feature before a route becomes difficult to scan.
- Keep foundational files narrow in purpose. `app/globals.css` owns resets,
  tokens, shared utilities, and site-wide motion; it does not own page-specific
  layouts or one-off visual fixes.
- Treat roughly 300-500 focused lines, or a second unrelated responsibility, as
  a prompt to extract a module. Use judgment rather than splitting a coherent
  small file into fragments.

## File Notes And Tunables

- New or substantially reorganized non-trivial `.ts` and `.tsx` files begin
  with a short docblock stating what the file owns. Client files keep
  `"use client";` as the first statement, then place the docblock before
  imports.
- Use casual inline comments for visual intent, sequencing, or a non-obvious
  decision. Explain why a value exists, not what obvious JSX does.
- Put editable visual controls in a small named `const` near the component.
  Name knobs plainly, such as `phoneLayout`, `signalConnector`, or
  `heroSpacing`.
- Do not leave a long narrative inside a component. Move durable reasoning to
  `docs/decisions.md`.

## Visual Rules

- The base language is warm ivory, dark forest green, editorial serif headings,
  clean sans-serif body copy, subtle borders, and generous but intentional
  spacing.
- Preserve the existing light-only experience. Do not introduce a new dark
  theme without an explicit request.
- Use the real site tokens and shared primitives before adding ad hoc colors,
  shadows, font choices, or button styles.
- Desktop may use rich split layouts and layered visuals. Mobile should be
  intentionally redesigned for clarity, not merely compressed.
- Do not turn every section into a card. Avoid nested cards and decorative
  visual noise. Cards are for discrete repeated items, framed tools, and modals.
- Use existing device mockups and visual patterns before recreating a phone,
  laptop, browser frame, FAQ, CTA, or section heading.
- Match reference images by hierarchy, spacing, and feel. Do not copy every
  literal detail when it conflicts with the CK Works system.
- Motion should be calm, functional, and optional. Respect
  `prefers-reduced-motion`; favor transform and opacity animation.

## Writing Quality

- Write for a skeptical business owner who may ask, "What does that actually
  mean?" The next sentence should answer them.
- Lead with specific nouns and verbs. Prefer website, workflow, form, search,
  inquiry, and launch over vague agency language.
- Avoid filler such as "seamless," "innovative," "tailored solutions,"
  "elevate," and "unlock" unless the words carry a concrete meaning.
- Do not repeat the same promise across a hero, card, CTA, and FAQ.
- If another studio could paste a sentence onto its site unchanged, rewrite it
  with CK Works-specific context or remove it.

## Accessibility And Performance

- Use semantic HTML. Actions are buttons; navigation is links; headings stay in
  a sensible hierarchy.
- Give every interactive control a keyboard path, visible focus state, and
  accessible name. Modals must manage focus and be dismissible by keyboard.
- Use meaningful alt text for informative images and empty alt text for purely
  decorative artwork.
- Use `next/image` with accurate `sizes`, appropriately sized source assets,
  and modern formats where practical.
- Lazy-load interaction-heavy client components or libraries when they are not
  needed initially. Do not lazy-load ordinary server-rendered page bands merely
  to chase a performance metric.
- Keep visual assets and animation code proportionate to the value they add.

## Full-Stack Boundaries

- Validate public API input on the server, cap field lengths, and return useful
  error states. Never trust values only because a client form validated them.
- Preserve spam protection on public forms. Add rate limiting only when real
  volume or abuse warrants it.
- Never expose secrets, send personal form content to analytics, or duplicate
  contact configuration in multiple components.

## Public Content, SEO, And AEO

- Every public page needs a clear, truthful H1, useful headings, and copy that
  names the actual service, audience, and outcome without keyword stuffing.
- Use `createPageMetadata`, canonical URLs, and `SchemaMarkup` for public route
  metadata and structured data. Keep sitemap and robots behavior in mind when
  adding a public route.
- FAQs must be concise, accessible HTML content, not text baked into an image.
- Use internal links where they genuinely help a visitor move between services,
  work, process, and contact.
- Do not claim rankings, client results, integrations, or case-study outcomes
  that cannot be verified. Mark fictional demonstrations as illustrative.
- Write for people and answer systems at the same time: explicit services,
  direct answers, real context, and proof when available.
- Track a new meaningful conversion or engagement action through
  `lib/analytics.ts` and the matching GTM configuration.

## Validation And Safety

- For visual changes, check the intended desktop and mobile layout before
  calling work complete.
- Run `npx tsc --noEmit --pretty false` after TypeScript changes when practical.
- Run `npm run lint` and focused tests when a change touches their scope. The
  repository lints with zero errors; keep it that way. The remaining warnings
  are pre-existing `no-img-element` cases, one of which is a false positive in
  `app/opengraph-image.tsx`, where `ImageResponse` requires a raw `<img>`.
- Do not run `npm run build` during active local visual work unless Colin asks.
- Do not modify `.env.local`, secrets, production settings, analytics
  configuration, or unrelated files without an explicit reason.
- Do not make a commit or push unless asked.

## Useful References

- `docs/BREAKDOWN.md` - current project state and active work
- `docs/architecture.md` - component ownership and modularization plan
- `docs/design-system.md` - CK Works visual language, motion, responsive behavior
- `docs/content-discovery.md` - page content, SEO, AEO, schema, and analytics
- `docs/seo-strategy.md` - search and answer-engine strategy, local positioning
- `docs/demo-registry.md` - fictional brands, people, and demo data
- `docs/project-registry.md` - real builds, allowed claims, and limitations
- `docs/backlog.md` - verified issues, investigations, and next work
- `docs/agent-workflow.md` - how to work through a task safely
- `docs/decisions.md` - current durable design and product decisions

`CLAUDE.md` is a thin adapter pointing Claude Code at this file. Edit `AGENTS.md`
only; do not duplicate rules into `CLAUDE.md`.
