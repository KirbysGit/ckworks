import { serviceAreas } from "@/lib/services";

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
