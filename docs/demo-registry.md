# Demo Registry

Fictional brands, people, and data used in CK Works visuals.

Every entity here is invented. None is a client, and none may be presented as
evidence of a real result. This registry exists so agents **reuse the
established demo for a given page instead of inventing another one** — the site
should read as a handful of clear illustrations, not a directory of imaginary
companies.

Verified against the repository on 2026-08-19.

## Rules

1. **Reuse before inventing.** Check this file first. Add a new fictional entity
   only when no existing one fits, and record it here in the same change.
2. **Label it.** Any demo that could be mistaken for real work carries a visible
   illustrative marker — a caption, an eyebrow, or nearby copy. A demo carrying
   invented figures also gets `data-nosnippet` so the numbers stay out of search
   snippets, and `aria-hidden` when the visual is decorative rather than
   informative.
3. **Never claim it.** A demo may not appear in a case study, testimonial,
   client list, statistic, or schema.
4. **Keep it plausible, not impressive.** Demo metrics should look like an
   ordinary small business. Do not invent dramatic growth numbers.
5. **Stay off real identities.** Do not use a real company, person, address,
   phone number, or domain. Demo domains stay illustrative and unlinked.
6. **One brand per page context.** Do not mix demo brands inside a single
   visual story.

## Brands

### Windermere Wellness

- **Represents**: a wellness and therapy practice
- **Used in**: `components/home/Hero.tsx`, `components/home/HeroMockup.tsx`,
  `components/home/TransformationSection.tsx` (homepage)
- **Purpose**: the homepage hero mockup and the before/after transformation
  story
- **Assets**: `public/images/hero/`, `public/images/transformation/`
- **Labeling**: the homepage transformation After mockup (Clear and connected)
  carries an "Illustrative example" caption. The hero mockup is still unlabeled;
  demo copy in the upper homepage DOM remains a topical-signal issue tracked in
  [`backlog.md`](backlog.md).
- **Never imply**: that CK Works serves wellness or therapy clients, or that
  this is a delivered project.

### Riverstone Builders

- **Represents**: a local residential home builder in Orlando
- **Used in**: `components/services/search-visibility/Page.tsx`,
  `components/services/analytics/Page.tsx`, `app/services/page.tsx`
- **Purpose**: demonstrating a search-ready site, local business profile,
  search result, AI Overview, site-context signals, and a sample lead report so
  visitors can see what visibility and measurement work change
- **Assets**: `public/images/services/png/02-riverstone-demo.png`,
  `02-riverstone-demo-2.png`
- **Labeling**: "Illustrative search example", "Illustrative Riverstone
  Builders result", "Illustrative local builder homepage", "Illustrative
  featured project", "Illustrative snapshot — sample data", and "Illustrative
  report — sample data"
- **Never imply**: that CK Works achieved these rankings, that this business
  exists, or that the AI Overview text was produced by a real engine.

### Hearth & Home

- **Represents**: an interior design studio
- **Used in**: `components/services/web-design/Page.tsx`,
  `components/services/support/Page.tsx`, `components/process/StageChain.tsx`,
  `components/process/BuildPhase.tsx`
- **Purpose**: on Web Design, the hero device mockups and the four-stage
  transformation showing an outdated site becoming a launched one. On Ongoing
  Support, the browser preview of a site being actively looked after. On
  Process, the launched stage of the hero progression and the desktop/mobile
  mockups in the "Build it out" phase.
- **Note**: the Process "Build it out" mockup is the artefact a *client* gets,
  so the screen stays Hearth & Home rather than CK Works — the same asset pair
  the Web Design hero uses, and it keeps the phase reading as "the site I build
  for you" instead of "my own site".
- **Assets**: `public/images/services/png/01-hearth-home-demo.png`,
  `public/images/services/svg/01-hearth-logo-demo.svg`
- **Labeling**: framed inside a device or browser mockup as a demonstration;
  the Support preview is captioned "CK Works client site".
- **Never imply**: a real interior-design client, an actual support retainer,
  or a measured redesign outcome.

### Field & Forge

- **Represents**: a general goods and supply shop
- **Used in**: `components/about/AboutHero.tsx`
- **Purpose**: the About hero, where a physical storefront connects to a phone
  running the same shop online. It is the "business comes to life online" story
  the page opens with, so it needs to read as an ordinary local shop rather
  than a studio-flavoured brand.
- **Assets**: `public/images/about/png/about-hero-demo.png`,
  `public/images/about/png/about-hero-mobile-demo.png`
- **Labeling**: the storefront image carries an "Illustrative Field and Forge
  storefront" alt, and the site is framed inside the shared phone shell. The
  `/terms` page also names it as a fictional business.
- **Never imply**: a real retail client, an ecommerce build CK Works shipped, or
  that the free-delivery and pricing details describe a real offer.

### City of Greenridge

- **Represents**: a fictional local government and public-service website
- **Used in**: `components/services/accessibility/Hero.tsx` and
  `components/services/accessibility/OverviewCard.tsx`
- **Purpose**: demonstrating an accessibility review of an important public
  journey through visible labels, keyboard focus, and a recoverable form error
- **Labeling**: the browser visual is captioned "Illustrative accessibility
  review"
- **Never imply**: a real municipality, a completed client audit, a compliance
  determination, or a relationship with a government entity.

## People And Companies In Demo Data

Invented names used inside dashboards, inquiry cards, and activity feeds. Keep
them ordinary and reuse them rather than generating new ones.

| Name | Appears in | Role in the demo |
| --- | --- | --- |
| Jordan Lee | Web Accessibility hero and services-index card | Resident filling in the City of Greenridge contact form |
| Sarah Mitchell | Digital Systems, Ongoing Support | Inbound inquiry, kitchen remodeling |
| Daniel Ortiz | Digital Systems | Second activity row, bathroom remodel |
| Northfield Co. | Analytics | Recent lead |
| Summit Partners | Analytics | Recent lead |
| Hayden Studio | Analytics | Recent lead |
| Brightline Design | Analytics | Recent lead |
| Lumen Architecture | Analytics | Recent lead |
| Staysure | Digital Systems | Invoice activity row |

Demo timestamps ("Just now", "May 3, 2025") and identifiers ("Invoice #1042")
are also fictional. Keep dates internally consistent within a single visual.

## Demo Metrics

Numbers shown in dashboards are illustrative and must stay plausible for a
small business.

- Analytics: 12.6K visits, 228 inquiries, 1.81% conversion, 38% organic share
- Ongoing Support: 99.9% uptime, under 2h typical response
- Digital Systems: 18 new inquiries, 7 ready for review, 5 follow-ups due

These are design placeholders. Do not cite them anywhere as CK Works
performance, client results, or service guarantees, and do not restate them in
prose outside the visual that contains them.

## Third-Party Logos

The Digital Systems tool grid uses real product marks (Gmail, Google Sheets,
Slack, Stripe, Airtable, LinkedIn, Google Calendar) to show what CK Works can
connect to.

- Show a logo only for an integration that is genuinely achievable.
- Do not imply partnership, certification, or endorsement.
- Do not place a logo beside a claimed client outcome.
