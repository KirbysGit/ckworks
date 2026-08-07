# Architecture

## Current Stack

- Next.js App Router with TypeScript
- Tailwind CSS for styling
- `next/image` for local visual assets
- Framer Motion for interactive animation
- Lucide and React Icons for interface icons
- Vercel Analytics plus Google Tag Manager events
- Resend-backed inquiry API at `app/api/inquiry/route.ts`

## Ownership Map

```text
app/                    Route entry points, metadata, API routes, global CSS
components/ui/          Small reusable visual primitives
components/page/        Reusable public-page sections and SEO-adjacent pieces
components/             Homepage and cross-feature compositions
lib/                    Content data, SEO helpers, navigation, motion, analytics
public/images/          Versioned production assets organized by feature
docs/                   Durable decisions and agent guidance
.agents/                Reusable task briefs for agent handoffs

components/services/    TARGET, does not exist yet. See "Service Page
                        Modularization Plan" below.
```

`components/services/` is the intended destination for service-specific page
experiences. As of 2026-08-07 it has not been created: every custom service
page still lives in `app/services/[slug]/page.tsx`. Create the folder as part
of a deliberate extraction, not as a side effect of an unrelated task.

## Route Responsibilities

Routes should stay thin. A route owns:

- Route parameters and `notFound` behavior
- Page metadata and structured data composition
- Data lookup from `lib/`
- Selecting the appropriate page-level feature component

Routes should not own a whole visual system, large SVG markup, mockup
implementation, or repeated page bands.

## Component Boundaries

### Shared UI

Use `components/ui/` for compact primitives with broad reuse. Current contents:

- `Button`
- `Card`
- `DrawUnderline`
- `Logo`
- `Reveal`
- `SectionHeader`
- `SectionLabel`

Keep these focused. They should not know page copy or service-specific data.

### Shared Page Sections

Use `components/page/` for a repeatable public-page pattern. Current contents:

- `Breadcrumbs`
- `ContactCTA`
- `ContentSection`
- `FAQSection`
- `PageHero`
- `RelatedProjects`
- `RelatedServices`
- `SchemaMarkup`
- `SectionHeading`
- `ServiceCard`

Prefer configuring these components with data and children before duplicating
their behavior on a single page.

### Known Naming Ambiguity

`components/page/SectionHeading.tsx` and `components/ui/SectionHeader.tsx` are
near-identical names in different folders. This violates the naming rule below
and should be resolved in a dedicated cleanup pass.

Until then: check which one a page already imports before adding another
section heading, and do not rename either file as a side effect of unrelated
work — both are used in production markup.

### Feature Modules

Use a dedicated folder for a page with a distinct visual story, interaction,
or several unique sections. Keep the folder name short and direct.

```text
components/services/
  web-design/
    Page.tsx
    Hero.tsx
    Includes.tsx
    Transformation.tsx
    Process.tsx
    Work.tsx
    data.ts
    visuals/
      Laptop.tsx
      Phone.tsx
      Browser.tsx
  search-visibility/
    Page.tsx
    Hero.tsx
    Benefits.tsx
    Scope.tsx
    Signals.tsx
    visuals/
      SearchResult.tsx
      AiOverview.tsx
```

Use a subfolder only when it gives the filename context. Inside
`web-design/`, `Hero.tsx` is clearer than `WebDesignServiceHero.tsx`.

## Service Page Modularization Plan

`app/services/[slug]/page.tsx` currently contains several custom service
experiences and is too large to be an easy editing surface. Extract it in
small, non-breaking steps.

1. Keep route lookup, metadata, `ServiceViewed`, and service selection in the
   route file.
2. Move each top-level service page into `components/services/<slug>/Page.tsx`.
3. Move each visible band into a direct child component only when it has its
   own layout, visual, or meaningful amount of copy.
4. Move visual mockups into `visuals/` when they are reused by that service or
   distract from the section's layout code.
5. Leave shared FAQ, CTA, schema, button, and logo patterns in their existing
   shared locations.
6. After each service extraction, type-check and compare the desktop and mobile
   page before moving the next service.

Suggested extraction order:

1. `web-design-development` because it has the most visual code.
2. `search-ai-visibility` because it establishes the newer modular pattern.
3. `analytics-lead-tracking`.
4. `digital-systems-integrations`.
5. `ongoing-support`.

## Data Boundaries

Current `lib/` modules and what each owns:

| Module | Owns |
| --- | --- |
| `lib/services.ts` | Service titles, descriptions, FAQs, paths, related services |
| `lib/projects.ts` | Project and case-study facts (the public source of truth) |
| `lib/data.ts` | Contact details and company-wide content |
| `lib/site.ts` | Canonical site URL, name, tagline, description |
| `lib/seo.ts` | Metadata helpers such as `createPageMetadata` and `absoluteUrl` |
| `lib/navigation.ts` | Primary navigation structure |
| `lib/analytics.ts` | Client analytics event names and payloads |
| `lib/motion.ts` | Shared Framer Motion variants for homepage compositions |
| `lib/heroMockupLayout.ts` | Tuning values for the homepage hero mockup |

- Layout tuning that belongs to one visual stays next to that visual in a
  clearly named `const`. `lib/heroMockupLayout.ts` is the exception, kept
  separate because several homepage components read the same values.
- Narrative project context that is not a public fact belongs in
  `docs/project-registry.md`, not in `lib/projects.ts`.

Do not duplicate service facts inside a visual component unless they are
deliberately illustrative demo copy.

## Foundational File Limits

Foundational files should be stable and easy to reason about. They must not
become a convenient place to put every new rule.

- `app/globals.css` owns global resets, root variables, scroll behavior,
  selection, shared animation definitions, and truly reusable CSS utilities.
- Page-specific layout, one-off browser-frame fixes, and service visuals belong
  in their feature component through Tailwind classes or a co-located visual
  module.
- `tailwind.config.ts` owns named design tokens and broad theme extensions, not
  temporary per-page values.
- A `lib/` module owns one domain. Split a data file by domain when it begins
  mixing unrelated concepts such as projects, service definitions, and form
  processing.
- A shared component owns one reusable behavior. Do not add a feature-only
  branch to it when a local feature component would be clearer.

There is no magic line count, but 300-500 focused lines is a useful review
signal. Extract when a file gains a second unrelated responsibility, becomes
hard to navigate, or makes Fast Refresh unnecessarily expensive.

## Naming Rules

- Name files for the main thing they render: `Hero`, `Flow`, `Signals`, `Faq`.
- Name values for the object they control: `phoneLayout`, `chartPoints`,
  `signalConnector`.
- Avoid filler words such as `New`, `Final`, `Updated`, `Component`, `Helper`,
  and `Section` when folder location already says enough.
- Use a descriptive name when it prevents ambiguity, especially for shared
  exports.

## Comments And File Headers

For a non-trivial file, use a short ownership note at the top:

```tsx
/**
 * Renders the Web Design service hero and its device mockups.
 * Keeps all visual tuning local to this service.
 */
```

For a client component, preserve the directive first:

```tsx
"use client";

/** Handles the expandable FAQ interaction for public pages. */
```

Use inline comments to mark a visual grouping or explain a tuning decision.
Keep them casual and practical:

```tsx
// Let the phone overlap the browser without covering the primary CTA.
const phoneLayout = { right: "4%", bottom: "-3%" } as const;
```
