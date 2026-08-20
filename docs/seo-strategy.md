# Search And Answer-Engine Strategy

This document holds the intentional strategy behind CK Works discovery work.
[`content-discovery.md`](content-discovery.md) covers execution standards for
copy, metadata, schema, and analytics. This file covers what to target, in what
order, and what is deliberately off-limits.

The short version: **organize the business so search engines, answer engines,
and customers can understand it; build the pages and evidence that make it
discoverable; measure whether that visibility becomes qualified work.** SEO here
is not keyword insertion, and AEO is not a separate discipline requiring special
files or markup.

## Core Principles

### One URL, one primary intent

Every public page owns a single primary search intent. Related phrasing appears
naturally in the copy; it does not get its own page.

| Route | Primary intent |
| --- | --- |
| `/` | Orlando web design and development |
| `/services` | Overview of website and digital services |
| `/services/web-design-development` | Custom websites, redesigns, development |
| `/services/search-ai-visibility` | SEO, local search, AI visibility |
| `/services/analytics-lead-tracking` | Analytics, attribution, lead tracking |
| `/services/digital-systems-integrations` | Dashboards, APIs, workflows, integrations |
| `/services/ongoing-support` | Website maintenance and continued improvement |
| `/work` | Portfolio and proof |
| `/process` | How a project actually runs |
| `/about` | CK Works, Colin, experience, Orlando identity |
| `/contact` | Project inquiries and conversion |
| `/[slug]` project pages | Evidence supporting the relevant service |

A page that cannot state its one intent in a sentence is not ready to ship.

### Modular pages beat one strong homepage

Answer engines commonly run several related searches before composing a single
response. A connected set of service pages gives CK Works multiple retrievable
sources for different parts of one question. This is the main structural reason
the service pages exist as separate routes rather than homepage sections.

### The same foundations serve both

Pages must be crawlable, indexed, internally linked, and genuinely useful. There
is no separate AI schema, hidden AI file, or parallel technical requirement.
Treat `llms.txt` and similar as low priority relative to pages, crawling,
internal links, proof, and authority.

## Local Positioning: The Orlando Ladder

CK Works should not open by competing for broad national terms such as
"web designers." The realistic progression is:

1. `CK Works` (brand)
2. `Orlando web designer`
3. `small-business web design Orlando`
4. `website redesign Orlando`
5. Web design for a specific business type
6. `website analytics and lead tracking`
7. Broader regional and national service searches

### What must be true before emphasizing local

Local claims must be truthful and consistent, or they damage the entity signal
they are meant to build.

- Only state a service area CK Works genuinely serves.
- Do not imply a storefront, office, or team that does not exist.
- Keep name, service description, email, and phone identical across the site,
  Google Business Profile, Bing Places, LinkedIn, and structured data.
- Do not claim local clients, local reviews, or local rankings without evidence.
  See "Evidence Requirements" below.

Google weighs relevance, distance, and prominence for local results. Complete
and accurate information helps relevance; reviews, links, and real recognition
build prominence. Neither is fixed by adding a city name to a title tag.

### Current status

As of 2026-08-07, "Orlando" does not appear anywhere in the codebase. Adding
truthful Orlando positioning to the homepage title, description, hero eyebrow,
and introduction is tracked in [`backlog.md`](backlog.md).

## Query Groups

Write for these groups. Do not stuff them.

**Core commercial** — closest to hiring intent: web designer Orlando, web design
Orlando, website designer Orlando, website development Orlando, small business
web design Orlando, custom web design Orlando, website redesign Orlando.

**Service-specific**: website analytics setup, website lead tracking, SEO for
small businesses Orlando, AI search visibility services, website conversion
tracking, custom business dashboard development, website maintenance Orlando.

**Problem-based** — the visitor may not know the service name yet: why is my
business website not getting leads, how do I know where website leads come from,
does my business website need a redesign, why is my business not appearing on
Google, how do I track phone calls from my website, how can AI understand my
business website.

**Buyer questions** — valuable for both search and answer engines: how much does
a small business website cost, how long does a website redesign take, what
should be included in a business website, do web designers handle SEO, should I
use a template builder or hire a designer, who owns the website after it is
built, what analytics should a business website track.

## FAQ Guidance

FAQs are a primary AEO surface. Each service page carries a small set of real
buyer questions, in accessible HTML, using the shared `FAQSection`.

- Write questions a prospect would actually ask out loud. Do not invent a
  question because it contains a keyword.
- Answer directly in the first sentence, then add detail. An answer engine will
  lift the opening sentence.
- Prefer specifics that prove competence: name real tools, real constraints,
  real timelines.
- State uncertainty honestly on cost, timeline, and search outcomes.
- Do not repeat a claim already made in the hero, cards, or CTA.

Suggested coverage per service:

- **Web design**: cost, timeline, redesign of an existing site, what is needed
  from the client, post-launch editing.
- **Search and AI visibility**: what SEO/AEO/GEO mean here, whether rankings are
  guaranteed (they are not), how long results take, platform compatibility.
- **Analytics and lead tracking**: what can be tracked, improving an existing
  setup, connecting leads to their original source, custom dashboards.
- **Digital systems and integrations**: connecting existing tools, whether a
  full system is needed, what can be automated, existing-website compatibility,
  who maintains it after launch.
- **Ongoing support**: supporting sites CK Works did not build, new pages and
  features, monthly versus request-based, response times, required access.

## Answer-First Sections

A page can be visually rich and still lead with a plain answer. Important
sections should open with a directly quotable definition, then elaborate.

> **What is website lead tracking?**
> Website lead tracking connects inquiries, calls, bookings, and other customer
> actions to the source and page that produced them.

This serves a scanning human and a retrieving model with the same sentence.

## Prohibited Patterns

**No thin synonym pages.** One substantial SEO & AI Search Visibility page covers
the related concepts. Do not create `/services/seo`, `/services/aeo`,
`/services/geo`, `/services/ai-seo`, or `/services/search-visibility` as
separate routes. Splitting one topic across near-identical pages divides
authority and produces pages with nothing unique to say.

**No mass-produced city pages.** Do not generate `/orlando-web-design`,
`/winter-park-web-design`, `/oviedo-web-design`, and similar as a set. Orlando
is the primary location. Add a second location page only when it can carry
genuinely unique content: completed work in that area, testimonials from that
area, local photography, or a meaningfully different audience.

**No keyword stuffing**, invented statistics, or fabricated client outcomes.

**No unrequested indexable routes.** A new public route must be intentional and
must be reflected in `app/sitemap.ts`.

## LocalBusiness Schema Caution

CK Works does not publish a physical address. Google's supported
`LocalBusiness` rich-result implementation expects one.

- Do not add `LocalBusiness` markup with a hidden, partial, or invented address.
- Do not publish a private home address to satisfy a schema type.
- Use `ProfessionalService` and `Organization` with truthful `areaServed`
  instead. This is the current implementation in `app/layout.tsx`.
- Do not add review, aggregate-rating, or ranking schema without real source
  data.

Correct structured data helps systems interpret a page and can make it eligible
for supported presentation features. It does not guarantee a ranking change.

## Evidence Requirements

A claim on a public page must be supportable.

| Claim type | Requirement |
| --- | --- |
| Project outcome | Real, attributable, described in scope. See [`project-registry.md`](project-registry.md) |
| Client testimonial | Real, attributed, with permission |
| Traffic or ranking result | Actual measured data with a stated timeframe |
| Local presence | A service area CK Works genuinely serves |
| Integration or capability | Something actually built or clearly framed as achievable |
| Demo brand or screenshot | Labeled illustrative. See [`demo-registry.md`](demo-registry.md) |

Never present an illustrative demo as evidence of a real client result. Never
imply revenue or lead gains from a redesign without attribution data.

## Measurement

Discovery work is judged by qualified inquiries, not impressions.

- Google Search Console and Bing Webmaster Tools for impressions, clicks, and
  query patterns. Bing exposes explicit AI citation reporting; Google currently
  folds AI surfaces into general web reporting.
- ChatGPT referrals arrive with `utm_source=chatgpt.com`.
- GA4 events through `lib/analytics.ts` for on-site actions.
- Separate branded from non-branded discovery before judging progress.

Useful signals to act on: high impressions with low clicks means the title and
description need work; traffic without inquiries means the offer, proof, or CTA
needs work; an indexed page with no impressions needs its intent and internal
links reconsidered.

## Before Building A New Public Page

1. What does this page sell, and to whom?
2. What single search intent does it own?
3. Which existing page would it overlap or weaken?
4. What evidence supports its claims?
5. What is the tracked conversion?
6. Which internal links point to it, and which does it point to?

If questions 2 or 3 cannot be answered cleanly, the content probably belongs in
an existing page.
