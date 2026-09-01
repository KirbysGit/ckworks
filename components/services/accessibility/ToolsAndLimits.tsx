/**
 * "How these tools help" band on the Web Accessibility page.
 *
 * Sits between the process band and the Title II band to answer the objection a
 * public-entity buyer will have already met, which is an overlay product
 * promising compliance for a monthly fee. Without it, the reader's takeaway from
 * a deadline is to buy a widget.
 *
 * The two verdict pills carry the argument: what a scanner finds on its own, and
 * what only a person can judge. The overlay note is deliberately a footnote in
 * the third column rather than a peer column, because it is a caveat about a
 * product category, not a third way of evaluating a site.
 *
 * Stays technically neutral per `docs/web-accessibility-service.md`. Describe
 * where the category operates and what it does not change. Do not name or attack
 * vendors, and do not reach for a warning triangle or a failure score.
 */
import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const automatedFinds = [
  { term: "Labels", detail: "Fields with no programmatic name" },
  { term: "Contrast", detail: "Text below the minimum ratio" },
  { term: "Structure", detail: "Heading order and landmarks" },
] as const;

export default function AccessibilityToolsAndLimits() {
  return (
    <section className="border-b border-line py-10 lg:py-12">
      <Reveal className="block overflow-hidden rounded-2xl border border-line bg-card px-6 py-7 sm:px-8 sm:py-8 lg:px-10 shadow-soft">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.96fr)_minmax(0,0.96fr)] lg:gap-10">
          <div
            className="ck-step min-w-0 text-center sm:text-left"
            style={{ "--ck-anim-delay": "0ms" } as CSSProperties}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
              How these tools help
            </p>
            <h2 className="mt-3.5 font-serif text-[1.9rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.1rem]">
              A scan is a starting point, not a verdict.
            </h2>
            <p className="mt-3.5 text-sm leading-7 text-muted sm:text-[0.95rem]">
              Automated checks can surface patterns quickly. Understanding
              whether someone can complete a real task still requires human
              judgment.
            </p>
          </div>

          <div
            className="ck-step min-w-0 text-center sm:text-left lg:border-l lg:border-line lg:pl-10"
            style={{ "--ck-anim-delay": "110ms" } as CSSProperties}
          >
            <VerdictPill>Finds patterns</VerdictPill>
            <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug tracking-[-0.01em] text-ink">
              Automated checks
            </h3>
            <p className="mt-2.5 text-sm leading-6 text-muted">
              Find detectable, objective failures quickly, and catch regressions
              over time.
            </p>
            <ul className="mx-auto mt-6 w-fit space-y-3 text-left sm:mx-0 sm:w-auto">
              {automatedFinds.map(({ term, detail }) => (
                <li
                  key={term}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3 text-sm leading-6"
                >
                  <Check
                    className="size-4 translate-y-0.5 text-forest"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="font-medium text-ink">{term}</span>
                    <span className="text-muted"> {detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="ck-step min-w-0 text-center sm:text-left lg:border-l lg:border-line lg:pl-10"
            style={{ "--ck-anim-delay": "220ms" } as CSSProperties}
          >
            <VerdictPill>Needs context</VerdictPill>
            <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug tracking-[-0.01em] text-ink">
              Human judgment
            </h3>
            <p className="mt-2.5 text-sm leading-6 text-muted">
              Focus order, meaningful alternatives, clear instructions,
              recoverable errors, and complete journeys still need a person.
            </p>
            <p className="mt-6 border-t border-line pt-5 text-sm leading-6 text-muted/85">
              Overlays sit on top. They do not repair the underlying website.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function VerdictPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-forest-soft/80 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-forest">
      {children}
    </span>
  );
}
