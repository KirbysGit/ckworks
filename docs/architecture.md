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
components/home/        Homepage-only sections and mockups
components/layout/      Header, footer, and shared route shell
components/inquiry/     Project inquiry modal, provider, and triggers
components/contact/     Contact form and contact-channel helpers
components/projects/    Project cards and case-study page instrumentation
components/analytics/   Small client-side analytics view events
components/page/        Reusable public-page sections and SEO-adjacent pieces
components/process/     Process-page hero chain and the four phase bands
components/ui/          Small reusable visual primitives
lib/                    Content data, SEO helpers, navigation, motion, analytics
public/images/          Versioned production assets organized by feature
docs/                   Durable decisions and agent guidance

components/services/    Bespoke service experiences plus small shared service pieces
```

The `components/` root is deliberately empty. A component belongs in the
smallest folder that accurately describes its owner. Do not reintroduce root
files just to avoid deciding where a component belongs.

`components/services/` owns bespoke service experiences. As of 2026-08-07,
the five top-level page experiences live there and
`app/services/[slug]/page.tsx` only owns route resolution and metadata.

## Current Feature Ownership

| Folder | Owns | Does not own |
| --- | --- | --- |
| `components/home/` | Landing-page bands and homepage-specific mockups | Reusable page patterns or other route content |
| `components/layout/` | Site navigation, footer, and the standard route shell | Page sections and page data |
| `components/inquiry/` | Inquiry state, modal presentation, and open triggers | General contact-page fields |
| `components/contact/` | Contact form and reusable communication links | Inquiry modal state |
| `components/projects/` | Portfolio cards and project-view instrumentation | Project facts, which stay in `lib/projects.ts` |
| `components/analytics/` | Small client event emitters | GTM configuration or analytics event names, which stay in `lib/analytics.ts` |
| `components/page/` | Repeatable public-page sections | Feature-specific visual systems |
| `components/process/` | The `/process` hero chain and one file per phase band | Phase copy that belongs to the route, or device shells, which live in `components/ui/` |
| `components/ui/` | Compact visual primitives with broad reuse | Feature-specific copy, layout, or data |

`components/process/` is the worked example of the extraction rule below: each
phase band is its own file (`GetClearPhase`, `ShapeDirectionPhase`,
`BuildPhase`, `LaunchImprovePhase`) because each owns a distinct artefact, and
`app/process/page.tsx` keeps only the route shell, hero copy, and band order.

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
- `DeviceFrame`
- `DrawUnderline`
- `Logo`
- `Reveal`
- `SectionHeader`
- `SectionLabel`

Keep these focused. They should not know page copy or service-specific data.

`DeviceFrame` exports `LaptopFrame` and `PhoneFrame` — bezel shells only, with
the screen passed as children. It carries the Web Design hero's original
treatment as `size="lg"` and a `size="sm"` tuned for a device inside a card.
The small variant sizes its radii, bezel, and notch in container units, so a
device stays in proportion at any column width. Reach for this before drawing
another laptop or phone; the Web Design hero still has its own inline copy and
should adopt this when that page is next touched.

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
  search-visibility/
    Page.tsx
  analytics/
    Page.tsx
  systems/
    Page.tsx
  support/
    Page.tsx
  shared/
    ServiceFrame.tsx
    GenericServicePage.tsx
    ProjectWorkCard.tsx
    ServiceTimeline.tsx
    styles.ts
```

Use a subfolder only when it gives the filename context. Inside
`web-design/`, `Hero.tsx` is clearer than `WebDesignServiceHero.tsx`.

The `Page.tsx` files are the first extraction boundary, not the final desired
size. Split a local page by its visible bands and visual systems when working
in that service: `Hero.tsx`, `Transformation.tsx`, and `Faq.tsx` are good next
moves. Do not extract a file merely to satisfy a directory diagram.

The device-preview extraction this section used to suggest now exists as
`components/ui/DeviceFrame.tsx`. Use it rather than adding another local
laptop or phone.

## Service Page Modularization Plan

`app/services/[slug]/page.tsx` is now a route shell. The five bespoke pages
were extracted in a behavior-preserving pass, so the next work happens inside
the relevant service folder.

1. Keep route lookup, metadata, and service selection in the route file.
2. Keep layout, service-view tracking, and schema in `shared/ServiceFrame.tsx`.
3. Move each visible band into a direct child component only when it has its
   own layout, visual, or meaningful amount of copy.
4. Move visual mockups into `visuals/` when they are reused by that service or
   distract from the section's layout code.
5. Leave shared FAQ, CTA, schema, button, and logo patterns in their existing
   shared locations.
6. After each service extraction, type-check and compare the desktop and mobile
   page before moving the next service.

Suggested second-pass extraction order, largest module first (line counts as
of 2026-08-08):

1. `search-ai-visibility` (~1,600 lines) — now the largest, and it carries the
   most self-contained visual demos to lift out.
2. `web-design-development` (~1,390 lines).
3. `analytics-lead-tracking` (~910 lines).
4. `digital-systems-integrations` (~670 lines).
5. `ongoing-support` (~640 lines).

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
| `lib/inquiry.ts` | Option lists shared by the contact form and the inquiry modal |
| `lib/attribution.ts` | Lead-source fields both inquiry surfaces send |

- The two inquiry surfaces ask for different amounts of detail on purpose, but
  they must offer the same vocabulary and report the same attribution. Both
  drifted once — the modal invented its own service categories and sent no UTM
  data at all — which is why these two modules exist rather than local copies.

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
