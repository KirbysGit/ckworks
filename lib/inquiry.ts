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
 * TODO(Colin): these bands anchor low for the work they describe. A build
 * quoted at 6-10 weeks does not belong in the same range as "Under $1,500",
 * and "$5,000+" puts a small site and a large one in one bucket. Raise the
 * floor and split the top once you have settled pricing.
 */
export const budgetOptions = [
  "Not sure yet",
  "Under $1,500",
  "$1,500-$3,000",
  "$3,000-$5,000",
  "$5,000+",
];
