/**
 * "How the work happens" band on the Web Accessibility page.
 *
 * Left heading column, four stages as a bordered quadrant grid on the right.
 * The band answers the question a buyer does not ask out loud: whether they are
 * paying for a report or for changes.
 *
 * Copy constraints from `docs/web-accessibility-service.md` that should survive
 * future edits:
 *   - Improve names its own limit. CK Works fixes what it can reach and writes
 *     guidance for the rest; it must never read as "everything gets fixed".
 *   - Review claims automated checks plus hands-on testing, and no specific
 *     assistive technology. Which screen readers, browsers, and test passes CK
 *     Works can consistently provide is still an open delivery decision.
 *   - Maintain is an offer, not a guarantee.
 */
import type { CSSProperties } from "react";
import { List, RefreshCw, Search, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { serviceSectionTitleClassName } from "../shared/styles";
import AccessibilityReviewScanGraphic from "./ReviewScanGraphic";

const stages = [
  {
    title: "Review",
    body: "We work through the pages, templates, and journeys that matter most, combining automated checks with hands-on testing to confirm what is genuinely a barrier.",
    icon: Search,
  },
  {
    title: "Prioritize",
    body: "Each confirmed barrier is ranked by how many people it affects and how much it blocks them, so the fixes that matter are obvious instead of buried in a long list.",
    icon: List,
  },
  {
    title: "Improve",
    body: "We fix what we can reach directly in the code, and write plain guidance for anything owned by a vendor, a content editor, or another team.",
    icon: Wrench,
  },
  {
    title: "Maintain",
    body: "Accessibility slips as content and components change. We can stay involved to check new work before it ships and keep the ground you gained.",
    icon: RefreshCw,
  },
] as const;

export default function AccessibilityBarriersToImprovements() {
  return (
    <section
      id="how-the-work-happens"
      className="scroll-mt-24 border-b border-line py-14 lg:py-16"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-rows-[auto_auto] lg:gap-x-12 lg:gap-y-8">
        <Reveal className="max-w-md lg:col-start-1 lg:row-start-1 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
            How the work happens
          </p>
          <h2 className={serviceSectionTitleClassName}>
            From review to practical improvements.
          </h2>
          <p className="mt-4 text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
            We find meaningful barriers, prioritize what matters, and help
            improve the experience. Knowing what to fix first is usually more
            useful than knowing everything at once.
          </p>

        </Reveal>

        <ol className="grid sm:grid-cols-2 sm:border-l sm:border-line lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {stages.map(({ title, body, icon: Icon }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={index * 80}
              className={`border-line py-6 max-sm:border-t max-sm:first:border-t-0 sm:p-7 lg:p-8 ${
                index % 2 === 1 ? "sm:border-l" : ""
              } ${index > 1 ? "sm:border-t" : ""}`}
            >
              <div className="flex items-center gap-6 sm:gap-8">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-soft/60 font-source-serif-display text-sm font-semibold tabular-nums text-forest"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon
                  className="h-7 w-7 shrink-0 text-forest"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
              <h3 className="mt-5 font-serif text-2xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-[1.7rem]">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-muted">{body}</p>
            </Reveal>
          ))}
        </ol>

        {/* Third in the DOM so mobile reads heading, stages, then graphic; the
            explicit placement keeps it under the copy on desktop. */}
        <div
          className="ck-step lg:col-start-1 lg:row-start-2"
          style={{ "--ck-anim-delay": "180ms" } as CSSProperties}
        >
          <AccessibilityReviewScanGraphic />
        </div>
      </div>
    </section>
  );
}
