# Web Accessibility Service Plan

**Status:** Approved planning direction. The central service entry, generic
service route, navigation plumbing, homepage card, services-index showcase, and
homepage schema are now present. The bespoke service page described below has
not been implemented.

**Read with:** `AGENTS.md`, `docs/architecture.md`,
`docs/content-discovery.md`, `docs/design-system.md`, `docs/decisions.md`, and
`docs/accessibility-audit.md`.

## Service Model

Web Accessibility is the permanent sixth CK Works service. It extends the
studio's existing promise of making websites clearer and easier to use. The
service is for disabled users first; broader improvements to usability,
clarity, and maintainability are additional benefits.

ADA Title II is the first focused outreach opportunity, not the name or full
definition of the service.

```text
/services/web-accessibility
  /ada-title-ii                    future, when outreach justifies it
  /pdf-document-accessibility     possible later specialization
  /ongoing-accessibility-support  possible later specialization
```

V1 publishes only `/services/web-accessibility`. It contains a prominent but
contained public-entity section. Do not publish a child page until it has a
distinct audience or search intent, substantial unique information, a focused
CTA, and a real CK Works delivery process behind it.

## Positioning And Boundaries

The public service name is **Web Accessibility**. Do not use `Accessibility`,
`ADA Compliance`, `ADA Website Compliance`, or `WCAG Compliance` as the parent
service name.

The initial offer is a flexible progression:

1. **Review** representative pages, templates, and important user journeys.
2. **Prioritize** confirmed barriers by impact and practical order.
3. **Improve** issues CK Works can responsibly remediate.
4. **Maintain** accessibility as content, components, documents, and vendors
   change.

Use **accessibility review** as the default term. Do not advertise a formal
audit until CK Works has defined sampling, applicable criteria, test
environments, assistive technologies, reporting, and retesting. Do not invent
fixed packages, prices, or timelines before the delivery model is proven.

Never promise or imply:

- legal, complete, certified, or guaranteed compliance;
- protection from claims or the removal of all legal risk;
- that an automated scan determines whether a site is accessible;
- that a widget repairs the underlying website, documents, or workflows;
- that every historical PDF is covered or exempt; or
- legal advice from CK Works.

Preferred language includes `improve accessibility`, `identify accessibility
barriers`, `work toward WCAG 2.1 Level AA`, `review representative pages and
user journeys`, and `support Title II preparation`.

## V1 Page Skeleton

The approved reference direction is a long-form editorial service page using
the existing ivory, forest, serif, border, and restrained-shadow system. It
uses practical interface examples rather than legal imagery or a generic
accessibility symbol. The hierarchy below preserves the reference's strongest
ideas while keeping each band responsible for one visitor question.

### 1. Hero: What is this service?

- Eyebrow: `Accessibility`
- H1 direction: `Web Accessibility`
- Lead direction: `Make your website easier for more people to use.`
- Supporting copy: reviews and practical improvements for businesses and
  public organizations; mention WCAG and Title II only as supporting context.
- Primary CTA: `Request an accessibility review`
- Secondary CTA: `See what gets reviewed`, anchored to the review scope.
- Visual: an illustrative public-service form with visible labels, focus,
  errors, and an important user journey. Mark it clearly as illustrative.

The hero explains the broad service. It must not lead with a deadline, lawsuit,
penalty, compliance score, or municipality-only message.

### 2. Different Ways Of Using The Same Website

Introduce keyboard navigation, screen readers, zoom and reflow, captions, and
voice controls in plain language. This section explains why accessibility
exists without reducing disability access to generic usability.

### 3. What CK Works Reviews

Group the scope around user outcomes rather than a wall of WCAG criteria:

- **Move through the website:** navigation, keyboard access, focus order,
  headings, and landmarks.
- **Understand and complete actions:** form labels, instructions, errors,
  controls, and important journeys.
- **See, hear, and adapt content:** contrast, zoom and reflow, alternative
  text, captions, and motion.
- **Reach supporting content and systems:** documents, downloads, embeds,
  videos, portals, and third-party tools.

State that each engagement defines the representative pages, templates,
documents, systems, and journeys included. Do not imply exhaustive testing of
every page by default.

### 4. From Barriers To Practical Improvements

Show the four-stage service progression: Review, Prioritize, Improve, Maintain.
Pair it with a small illustrative findings panel. Findings need meaningful text
and must not exist only inside a visual.

### 5. How These Tools Help

Contrast automated checks with manual evaluation:

- scanners can flag detectable patterns and objective failures;
- human judgment is needed for focus order, meaningful alternatives,
  instructions, recoverable errors, and complete journeys; and
- widgets and overlays do not replace evaluation and source-level remediation.

Keep this technically neutral. Do not name or attack vendors.

### 6. New And Existing Websites

Provide two paths:

- **Build accessibility in** during information architecture, component design,
  content modeling, implementation, and launch review.
- **Improve what already exists** through a scoped review, prioritized guidance,
  remediation, retesting, and continued support.

This band should link naturally to Web Design & Development and Ongoing
Support without duplicating those service pages.

### 7. Public Entities And ADA Title II

Use one visually distinct forest band relatively high on the page, after the
general capability has been established. Include only what a public-entity
visitor needs to decide whether to continue:

- state and local government context;
- WCAG 2.1 Level AA as the technical standard for covered web content and
  mobile applications;
- the currently verified deadline tiers: April 26, 2027 for entities with a
  population of 50,000 or more, and April 26, 2028 for entities below 50,000
  and special district governments;
- websites, mobile apps, documents, forms, portals, and vendor-managed systems
  as areas that may require review;
- a link to official DOJ guidance;
- one concise technical-services/not-legal-advice disclaimer; and
- CTA: `Request a public-entity accessibility review` using the existing
  inquiry experience with a distinct analytics source.

Regulatory statements and dates are time-sensitive. Reverify them against
official DOJ sources immediately before publishing. Do not explain every
exception on the parent page or determine a visitor's legal obligations.

Current primary references:

- [DOJ Title II web rule fact sheet](https://www.ada.gov/resources/2024-03-08-web-rule/)
- [DOJ Small Entity Compliance Guide](https://www.ada.gov/resources/small-entity-compliance-guide/)
- [DOJ first steps for the Title II web rule](https://www.ada.gov/resources/web-rule-first-steps/)
- [W3C accessibility evaluation overview](https://www.w3.org/WAI/test-evaluate/)

### 8. FAQ And Scope Guidance

Minimum useful questions:

- What is included in an accessibility review?
- Do you fix the issues you find?
- Can automated tools find every issue?
- Does an accessibility widget make a website accessible?
- Can accessibility be included in a new website?
- Do you review PDFs and downloadable documents?
- What standards do you use?
- Do you certify compliance or provide legal advice?
- How are scope, timing, and cost determined?
- Can you work with another developer or vendor?

Answers must not invent methodology, tooling, pricing, timing, or scope that CK
Works has not finalized.

### 9. Related Services And Closing CTA

Prioritize Web Design & Development and Ongoing Support. Digital Systems &
Integrations is the third relationship when a third link is useful. Close with
`Make the next step easier for more people` and the accessibility-review CTA.

## Later ADA Title II Child Page

Create `/services/web-accessibility/ada-title-ii` when municipal outreach is
meaningful enough that visitors need a direct, audience-specific destination.
The child page should add, rather than repeat:

- who the rule generally covers and how the deadline tier is determined;
- a prominent, currently verified deadline table;
- detailed treatment of web content, mobile apps, documents, public workflows,
  vendor-managed content, and conditional exceptions;
- examples such as agendas, minutes, permit forms, applications, policies,
  reports, notices, portals, and scanned records;
- the public-entity review process and its defined deliverable;
- what CK Works can and cannot remediate directly;
- public-sector FAQs and a dedicated inquiry source; and
- visible citations to current DOJ primary sources.

Keep a concise public-entity summary on the parent after the child launches.
Link the two pages in both directions and avoid duplicating whole sections.

## Visual And Responsive Direction

- Preserve the reference's editorial pacing, alternating open bands and
  lightly framed tools, and one strong forest public-entity band.
- Do not turn every band into a card. Cards are appropriate for grouped review
  areas, paired service paths, FAQ, and compact illustrative tools.
- Use real HTML text for definitions, findings, dates, and FAQs. Visuals support
  the explanation; they do not carry it alone.
- The hero visual should simplify intentionally on mobile. An annotated form
  and journey panel may become one focused form state rather than shrinking the
  full desktop composition.
- Avoid a wheelchair icon, courthouse, warning triangle, lawsuit imagery,
  accessibility-widget icon, or fake `100% compliant` score.
- Any motion should demonstrate focus, sequence, or remediation, remain
  optional, and honor `prefers-reduced-motion`.

## Confirmed Repository Integration

Adding a `ServiceArea` in `lib/services.ts` currently propagates automatically
to:

- header navigation children and footer links through `lib/navigation.ts`;
- contact and inquiry service options through `lib/inquiry.ts`;
- `/services` index content;
- static service route generation and route metadata;
- service and breadcrumb schema through `ServiceFrame`;
- the homepage `OfferCatalog` service list; and
- sitemap service URLs.

Manual implementation work remains for:

- `components/services/accessibility/Page.tsx` and band-level components;
- registering the bespoke page in `app/services/[slug]/page.tsx`;
- accessibility-specific CTA preselection and analytics source properties; and
- final responsive verification of the six-item navigation and services-index
  layouts as part of the accessibility page launch pass.

Nested child pages do not fit the current single-segment `[slug]` route. When
the Title II page is justified, give it an explicit nested route under
`app/services/web-accessibility/ada-title-ii/` or introduce a deliberate nested
service routing model. Do not force it into `ServiceSlug` as though it were
another top-level service.

## Delivery Decisions Still Needed Before Final Copy

- Is the initial review page-, template-, or journey-based?
- Which automated checks, browsers, keyboard tests, screen readers, zoom,
  reflow, reduced-motion, and form tests can CK Works consistently provide?
- What report, severity, WCAG mapping, screenshots, code guidance, estimate,
  and retest are included?
- Which CMSs and third-party systems can CK Works remediate?
- When are PDFs, mobile applications, authenticated areas, or specialist work
  excluded or separately scoped?
- What does ongoing review include, and how often does it occur?

These questions constrain promises and pricing, but they do not block a
carefully scoped introductory service page.

## Launch Gate

Before publishing, address or explicitly document the confirmed issues in
`docs/accessibility-audit.md`, then perform the live and manual checks listed
there. At minimum, verify keyboard navigation, visible focus, form labels and
errors, heading and landmark structure, contrast, zoom/reflow, reduced motion,
the inquiry modal, important mobile flows, images, and downloadable documents.

The goal is a credible, honest V1—not a claim that the CK Works site or every
future client site is perfect.
