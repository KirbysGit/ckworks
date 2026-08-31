import { serviceAreas, type ServiceSlug } from "@/lib/services";

/**
 * Shared option lists for the two inquiry surfaces: the contact page form and
 * the `Start a project` modal.
 *
 * They ask for different amounts of detail on purpose — the modal is
 * quick-capture triggered mid-browse, the page is the considered version — but
 * they must offer the same vocabulary. When they drifted, the modal filed leads
 * under its own invented categories and the two could not be reported together.
 */

/**
 * Both surfaces name the same five services. Do not hand-write this list: it is
 * the same `serviceAreas` the nav, sitemap, and service pages read from.
 */
export const serviceOptions = serviceAreas.map((service) => service.title);

/**
 * Query parameter both inquiry surfaces read to preselect a service.
 *
 * The value is the service slug, not the option label: slugs are stable and
 * already appear in the URL, whereas the labels are display copy that can be
 * reworded without anyone thinking about links.
 */
export const inquiryServiceParam = "service";

/**
 * Option label for a slug, or undefined if the slug is not a service.
 *
 * Returns the label rather than the slug because that is what the two selects
 * hold as their value. Never hand-write a label to match: read it from here so
 * a retitled service cannot silently stop preselecting.
 */
export function serviceOptionForSlug(
  slug: string | null | undefined,
): string | undefined {
  if (!slug) return undefined;
  return serviceAreas.find((service) => service.slug === slug)?.title;
}

/**
 * Named starting contexts that prefill the message field.
 *
 * Keyed by a short slug rather than passing the sentence itself, so the copy
 * lives here instead of in a URL, and so both inquiry surfaces resolve the same
 * wording from one place.
 *
 * Prefills are a head start, not a script: they are written first person, stay
 * factual about who is asking, and are seeded only into an empty field so a
 * visitor who has started typing is never overwritten.
 */
export const inquiryIntents = {
  "public-entity": {
    message:
      "We're a public entity looking at ADA Title II accessibility for our website and digital services.",
  },
} as const;

export type InquiryIntent = keyof typeof inquiryIntents;

/** Query parameter carrying the intent to `/contact`. */
export const inquiryIntentParam = "intent";

/** Prefill message for an intent, or undefined if the value is not one. */
export function inquiryMessageForIntent(
  intent: string | null | undefined,
): string | undefined {
  if (!intent) return undefined;
  return inquiryIntents[intent as InquiryIntent]?.message;
}

/** Slug for a service page pathname, e.g. `/services/web-design-development`. */
export function serviceSlugFromPath(
  pathname: string | null | undefined,
): ServiceSlug | undefined {
  if (!pathname) return undefined;
  const match = /^\/services\/([^/]+)/.exec(pathname);
  const slug = match?.[1];
  return serviceAreas.find((service) => service.slug === slug)?.slug;
}

/** "When do you need this?" — identical wording on both surfaces. */
export const timingOptions = [
  "No rush",
  "Next few weeks",
  "This month",
  "As soon as possible",
];

/** Contact page only. The modal deliberately skips it to stay short. */
export const referralOptions = [
  "Google",
  "LinkedIn",
  "Referral",
  "Past project",
  "Other",
];

/**
 * Modal only — someone opening it has already clicked "Start a project", so a
 * qualifying question is fair there in a way it is not on a cold page.
 *
 * These describe how settled the money is, not how much of it there is. Dollar
 * bands used to sit here and they had two problems: the lowest one advertised
 * a floor no 6-10 week build would ever justify, and every figure would need
 * revisiting as rates change. Readiness answers the question that actually
 * matters — is this someone exploring, or someone able to start — and it stays
 * true whatever CK Works charges next year.
 *
 * Keep these distinct from `timingOptions`: that field is the calendar, this
 * one is the budget.
 */
export const readinessOptions = [
  "Not sure yet",
  "Just exploring",
  "I have a range in mind",
  "Ready to move forward",
];
