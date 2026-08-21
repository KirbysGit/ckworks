# Content, SEO, And AEO

## Content Standard

CK Works speaks plainly about websites, systems, integrations, visibility, and
ongoing support. Copy should be grounded in what Colin can actually deliver.

- Lead with the practical business outcome, then explain the work.
- Use concrete words before agency language: website, workflow, dashboard,
  form, search visibility, inquiry, maintenance, and launch.
- Keep service descriptions modest. Do not imply a large agency, guaranteed
  rankings, or unverified outcomes.
- State uncertainty honestly when discussing scope, pricing, timelines, or
  search performance.

## Writing Without Generic AI Language

Good CK Works copy is specific, calm, and easy to challenge. It should make a
business owner understand what changes and why it matters.

- Prefer a concrete outcome over a broad promise.
- Avoid vague phrases such as "seamless experience," "innovative solution,"
  "tailored approach," "elevate your brand," or "unlock your potential."
- Do not repeat a claim just because it appears in a hero, card, CTA, or FAQ.
- Keep sentences direct. A short useful sentence is stronger than a stacked
  list of adjectives.
- When a claim needs evidence, link to a relevant project, explain the scope,
  or make the illustration status clear.
- Before publishing, ask whether another agency could use the same sentence
  without changing it. If so, add real CK Works context or remove it.

## Voice: I, CK Works, And We

CK Works is a one-person studio. Pronouns should not imply a team.

- Use **CK Works** for positioning and capabilities: what the studio builds,
  who it works with, what a service includes.
- Use **I** for the working relationship: how Colin starts, shares work, builds,
  launches, and stays involved after.
- Use **we** only when it means Colin and the client together: deciding
  direction, reviewing milestones, or refining after launch.
- Do not use **we** for studio capability ("We build websites…"). That reads as
  a larger agency.
- "Let's" and "we'll take it from there" are fine when the next step is shared.

## SEO Foundations

For each public page:

1. Use one descriptive H1 and a meaningful heading hierarchy.
2. Create a unique title, description, and canonical URL with
   `createPageMetadata` in `lib/seo.ts`.
3. Write human-readable copy that naturally includes the real service, audience,
   and location context when relevant.
4. Link to relevant services, work, process, and contact pages where that helps
   the visitor.
5. Provide useful image alt text when the image carries meaning. Use empty alt
   text for purely decorative artwork.
6. Keep public pages in `app/sitemap.ts` and review `app/robots.ts` when a new
   indexable route is introduced.

## AEO And AI Discovery

Answer engines understand pages best when information is explicit, structured,
and supported by real context.

- Give each service page clear definitions, inclusions, process explanations,
  FAQs, and an obvious contact path.
- Keep useful answers in accessible HTML, not only in screenshots, SVGs, or
  animated visuals.
- Use descriptive labels and headings rather than vague phrases such as
  "solutions" or "everything you need."
- Use `SchemaMarkup` for truthful structured data such as ProfessionalService,
  Service, BreadcrumbList, FAQPage, and case-study context when appropriate.
- Mark illustrative examples clearly. Do not make an AI or search demo look
  like evidence of a real client ranking or result.
- Avoid keyword stuffing and unsupported claims. Clarity, specific context, and
  proof beat volume.

## Schema And Metadata

- Site-wide organization and website schema live in `app/layout.tsx`.
- Service and breadcrumb schema should be composed on service pages through the
  shared `SchemaMarkup` component.
- Match structured data to visible page content.
- Do not add review, aggregate-rating, ranking, or client-result schema without
  valid source data.
- Update metadata when a page's public promise materially changes.

## Analytics

Client event names are declared in `lib/analytics.ts` and sent through
`trackEvent`. Current meaningful events include:

- `project_inquiry_opened`
- `contact_form_started`
- `contact_form_submitted`
- `email_clicked`
- `whatsapp_clicked`
- `linkedin_clicked`
- `service_viewed`
- `case_study_viewed`

When adding an event:

1. Add it to the event-name union.
2. Send only useful, non-sensitive payload data.
3. Create the matching GTM custom event trigger and GA4 event tag.
4. Verify the event in GTM Preview or GA4 DebugView when access is available.

Never send inquiry message content, email addresses, phone numbers, or other
personally identifiable form data into analytics.

GTM starts after the visitor's first pointer, keyboard, or scroll interaction,
with a five-second fallback. Clarity should not use an All Pages trigger; its
GTM tag should use the `ck_clarity_ready` custom event, queued after ten seconds.

## Inquiry And Contact

There are two surfaces: the contact page form and the `Start a project` modal.
They ask for different amounts of detail on purpose — the modal is
quick-capture fired mid-browse, the page is the considered version — but they
must not diverge on anything else.

- Option lists come from `lib/inquiry.ts`. Never hand-write a service list in a
  form; it is the same `serviceAreas` the nav and sitemap read.
- Both surfaces send `readAttribution()` from `lib/attribution.ts`. A lead that
  cannot report its source is not worth much, and answer-engine referrals such
  as `utm_source=chatgpt.com` arrive through this path as ordinary UTM values.
- The budget question asks how settled the budget is, not how large. Dollar
  bands went away because they advertised a floor the work does not justify and
  would need revisiting whenever rates change.
- The inquiry form is a lead path, not an analytics demo.
- Preserve honeypot and timing checks in `app/api/inquiry/route.ts`.
- Do not expose Resend credentials or change recipient behavior without an
  explicit request.
- Use the existing email, LinkedIn, and WhatsApp helpers rather than duplicating
  contact URLs across components.

## Server-Side Safety

- Validate and normalize all public request data at the API boundary.
- Set reasonable maximum lengths before an email, database write, or third-party
  call is attempted.
- Return a clear, safe client error without revealing implementation details.
- Keep anti-spam controls close to the route that enforces them.
- Keep secrets in environment variables and document only their names in
  `.env.example`.
