# Project Registry

Context for the real builds behind CK Works work and proof.

**`lib/projects.ts` is the source of truth for public facts** — names, slugs,
categories, roles, stacks, status strings, live URLs, and case-study copy. Do
not restate those facts here or let the two drift.

This file adds what an agent needs and the data file does not carry: what each
project actually demonstrates, which service it supports, what may be claimed,
and what must never be implied. Narrative background lives in the root
`projects.md`.

Verified against `lib/projects.ts` on 2026-08-07.

## How To Use This

Before referencing a project in public copy:

1. Read its entry in `lib/projects.ts` for the facts.
2. Read its entry here for allowed claims and limitations.
3. If a claim is not supported by either, do not make it.

The general rule: CK Works may describe **what was built, designed, and
decided**. It may not describe **business outcomes** — revenue, rankings, hiring
rates, user growth — without measured evidence. Most of these projects are
personal or in-progress builds, so they prove capability, not commercial
traction.

## Status Vocabulary

Status strings come from `lib/projects.ts` and carry real meaning:

| Status | Means |
| --- | --- |
| Client Work / Live V1 | Real client, shipped, publicly reachable |
| Client Work / Brand Phase | Real client, brand stage, not a shipped site |
| Personal Product / Early Release | Colin's own product, live, early and imperfect |
| Personal Product / Working Build | Colin's own product, functional, not a commercial launch |
| Collaborative Product Concept / In Progress | Built with someone else, still in development |
| Professional Work / Generalized | Internship work, described generically |
| Personal Project / Data Collection in Progress | Ongoing personal research build |
| Personal Portfolio / Archived | Earlier work, no longer maintained |
| Senior Design Prototype | University capstone, demo-grade |

## Client Work

### Tizirsso Racing (`tizirsso`)

- **Status**: Client Work / Live V1 — live at `tizianorossoorcel.com`
- **Supports**: Web Design & Development, Search & AI Visibility, Ongoing Support
- **Demonstrates**: brand direction, web design, development, content structure,
  and hosting for a real client, delivered through several rounds of feedback
- **Allowed claims**: a real client website; CK Works handled design,
  development, brand direction, and hosting; the site organizes a racing career
  for fans, sponsors, and future opportunities
- **Limitations**: this is the only shipped client website in the portfolio
- **Never imply**: sponsorship secured, traffic gains, ranking improvements, or
  revenue attributable to the site
- **Source**: `lib/projects.ts`, `projects.md`

### Halo Reserve (`halo-reserve`)

- **Status**: Client Work / Brand Phase — `hidden: true` in `lib/projects.ts`
- **Demonstrates**: brand design and art direction for a wellness and recovery
  concept
- **Handling**: hidden from public listings. Do not surface it on a public page,
  in schema, or in a related-work module without an explicit request.
- **Never imply**: a launched website or a completed engagement
- **Source**: `lib/projects.ts`

## Personal Products

### Taylor.io (`taylor`)

- **Status**: Personal Product / Early Release — live at `trytaylor.io`
- **Supports**: Digital Systems & Integrations, Web Design & Development
- **Demonstrates**: product strategy, full-stack architecture, AI workflow
  design, structured-data modeling, guided multi-step flows, document export
- **Allowed claims**: Colin designed and built it end to end; it grew out of a
  resume-tailoring workflow he repeated more than 150 times during his own job
  search; it is an early release with known rough edges
- **Limitations**: personal product, early stage, no commercial traction data
- **Never imply**: job-placement outcomes, interview or hiring-rate
  improvements, user counts, revenue, or that it is a mature commercial
  platform
- **Source**: `lib/projects.ts`, `projects.md`

### Centi (`centi`)

- **Status**: Personal Product / Working Build — live at `centi.dev`
- **Supports**: Analytics & Lead Tracking, Digital Systems & Integrations
- **Demonstrates**: full-stack development, dashboard UX, Plaid integration,
  data modeling, authentication — organizing connected accounts and uploaded
  transactions into a readable view
- **Allowed claims**: Colin's first full-stack application outside school; built
  after Mint shut down to get clearer insight into his own spending; real
  third-party financial API integration
- **Limitations**: personal-use build, not a commercial finance product
- **Never imply**: real users, handling of other people's financial data,
  regulatory compliance, or security certification
- **Source**: `lib/projects.ts`, `projects.md`

### SETLST (`setlst`)

- **Status**: Collaborative Product Concept / In Progress
- **Supports**: product and mobile design range
- **Demonstrates**: product design, brand direction, and frontend prototyping
  for a music-driven gym companion built with a friend
- **Allowed claims**: an in-progress collaborative concept; explores live music
  activity, workout consistency, and social features
- **Limitations**: concept stage, not shipped
- **Never imply**: an available app, a release date, downloads, or users
- **Source**: `lib/projects.ts`, `projects.md`

## Professional And Research Work

### Internal Automation Tool (`internal-automation-tool`)

- **Status**: Professional Work / Generalized
- **Supports**: Digital Systems & Integrations, Analytics & Lead Tracking
- **Demonstrates**: backend APIs, automation, dashboards, monitoring, and
  deployment on an internal platform giving recurring scripts and their results
  one shared interface
- **Allowed claims**: built during a software engineering internship;
  intentionally described in generalized terms
- **Limitations**: deliberately generic. Colin contributed to it; he did not own
  it outright.
- **Never imply**: sole authorship, and never name the employer, expose
  proprietary architecture, internal metrics, or screenshots of real internal
  data
- **Source**: `lib/projects.ts`

### SentimentTrader (`sentiment-trader`)

- **Status**: Personal Project / Data Collection in Progress
- **Supports**: Analytics & Lead Tracking, Digital Systems & Integrations
- **Demonstrates**: data engineering, machine learning groundwork, and system
  design — a growing dataset connecting online market discussion, search
  interest, and market behavior
- **Allowed claims**: an ongoing personal research pipeline building structured
  features for future machine-learning work
- **Limitations**: data collection stage; no validated model
- **Never imply**: trading performance, predictive accuracy, financial returns,
  or investment advice. This is especially important — CK Works does not give
  financial advice.
- **Source**: `lib/projects.ts`

## Earlier Work

### CK Dev (`ck-dev`)

- **Status**: Personal Portfolio / Archived — at `colinkirby.dev`
- **Demonstrates**: design and frontend development; a CSS playground that
  became a portfolio through repeated styling experiments
- **Allowed claims**: an earlier personal portfolio; a record of how Colin
  learned frontend design; intentionally experimental
- **Limitations**: archived and no longer maintained; does not reflect current
  CK Works standards
- **Never imply**: current work or a client project
- **Source**: `lib/projects.ts`, `projects.md`

### SecureScape (`securescape`)

- **Status**: Senior Design Prototype
- **Demonstrates**: mobile development, backend development, and system
  integration across embedded camera nodes, on-device detection, a mobile app,
  and near real-time alerts
- **Allowed claims**: a UCF senior design capstone; hardware and software
  integrated into one working live demonstration
- **Limitations**: demo-grade prototype, not a product
- **Never imply**: a security product, commercial availability, reliability
  guarantees, or suitability for real security use
- **Source**: `lib/projects.ts`

## Mapping Projects To Services

Use the strongest honest match. Do not attach a project to a service it does not
actually demonstrate.

| Service | Lead proof | Supporting |
| --- | --- | --- |
| Web Design & Development | Tizirsso Racing | Taylor.io, Centi |
| Search & AI Visibility | Tizirsso Racing | CK Dev |
| Analytics & Lead Tracking | Centi | Internal Automation Tool, SentimentTrader |
| Digital Systems & Integrations | Internal Automation Tool | Centi, Taylor.io |
| Ongoing Support | Tizirsso Racing | Centi, Taylor.io |

The honest gap: only Tizirsso Racing is a shipped client website. The other
entries prove technical and design range, not repeated commercial delivery.
Strengthening that evidence base is tracked in [`backlog.md`](backlog.md).

## Adding A Project

1. Add the public facts to `lib/projects.ts`.
2. Add an entry here with status, what it demonstrates, allowed claims,
   limitations, and prohibited implications.
3. Add narrative background to `projects.md` if useful.
4. Confirm the claims on any page referencing it match this entry.
