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
import { Check, Search } from "lucide-react";
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
            className="ck-step min-w-0"
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
            <ScanDiagram />
          </div>

          <div
            className="ck-step min-w-0 lg:border-l lg:border-line lg:pl-10"
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
            <ul className="mt-6 space-y-3">
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
            className="ck-step min-w-0 lg:border-l lg:border-line lg:pl-10"
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

/**
 * A scan running across a page, with one block flagged. Decorative: the columns
 * beside it carry the point, so it holds no text.
 *
 * From `lg` up, the negative bottom margin pulls the panel's own height up past
 * the diagram, so the frame keeps painting downward and the panel's
 * `overflow-hidden` clips it at the card edge. The bottom border is dropped at
 * the same breakpoint: the page should read as continuing past the cut, not as
 * a box that happens to end there.
 *
 * Both are `lg`-only on purpose. Below that the columns stack, so a negative
 * margin would drag the next column up over the diagram instead of running off
 * the card, and a borderless frame would just look unfinished.
 */
function ScanDiagram() {
  return (
    <div className="relative mx-auto mt-5 max-w-[20rem] pr-12 lg:-mb-24" aria-hidden>
      <div className="rounded-[0.3rem] border border-forest/55 lg:rounded-b-none lg:border-b-0">
        <div className="flex items-center gap-1.5 border-b border-forest/55 px-2.5 py-2">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="size-1.5 rounded-full border border-forest/55"
            />
          ))}
        </div>
        <div className="flex items-stretch gap-2 px-2.5 pb-3 pt-3.5">
          <span className="h-10 flex-[1.6] rounded-[0.15rem] bg-line/55" />
          <span className="h-10 flex-1 rounded-[0.15rem] bg-line/55" />
          <span className="h-10 flex-1 rounded-[0.15rem] border border-dashed border-forest" />
          <span className="h-10 flex-1 rounded-[0.15rem] bg-line/55" />
        </div>
        <div className="space-y-2.5 px-2.5 pb-6">
          {["72%", "88%", "56%"].map((width) => (
            <span
              key={width}
              className="block h-1.5 rounded-full bg-line/55"
              style={{ width }}
            />
          ))}
        </div>
      </div>

      {/* Overruns the frame on the left and stops at the lens centre on the
          right, so the scan reads as passing through rather than butting up. */}
      <span className="absolute -left-2.5 right-6 top-[43%] h-px bg-forest/65" />
      <span className="absolute right-0 top-[43%] flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-forest/65 bg-card">
        <Search className="size-4 text-forest" strokeWidth={1.6} />
      </span>
    </div>
  );
}
