/**
 * What a public-entity review actually consists of, and the boundary around it.
 *
 * The plan asks this page to cover the review process, its defined deliverable,
 * and what CK Works can and cannot remediate directly. The three steps carry
 * the first two; the note at the foot carries the third, in the same words the
 * hero uses, so the limit is stated once and consistently.
 *
 * This is also the page's link back to the parent service, which the plan
 * requires in both directions.
 */
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { serviceContainer } from "@/components/services/shared/styles";

const steps = [
  {
    number: "01",
    tag: "Scope",
    title: "Review an agreed scope",
    body: "Representative pages, templates, documents, forms, public workflows, and vendor touchpoints are defined before the review begins.",
  },
  {
    number: "02",
    tag: "Impact",
    title: "Organize confirmed barriers",
    body: "Findings identify where a barrier occurs, how it affects access, whether it repeats elsewhere, and what should happen next.",
  },
  {
    number: "03",
    tag: "Next step",
    title: "Support improvements and rechecking",
    body: "CK Works can address issues within its control, provide guidance for other teams or vendors, and recheck completed changes when included in scope.",
  },
] as const;

export default function ReviewProcess() {
  return (
    <section
      id="review-process"
      className="scroll-mt-24 border-b border-line bg-ivory py-16 sm:py-20 lg:py-24"
    >
      <div
        className={`${serviceContainer} grid gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-0`}
      >
        <Reveal className="max-w-[34rem] lg:pr-12 xl:pr-16">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
            Technical accessibility support
          </p>
          <h2 className="mt-5 font-serif text-[2.65rem] font-semibold leading-[1.04] tracking-[-0.025em] text-ink sm:text-[3.25rem] lg:text-[3.55rem]">
            Understand what needs attention, and what to address first.
          </h2>
          <p className="mt-7 max-w-[30rem] text-sm leading-7 text-ink/78 sm:text-base">
            CK Works reviews an agreed portion of the public experience,
            confirms meaningful barriers, and turns the findings into practical
            next steps.
          </p>
          <Link
            href="/services/web-accessibility"
            className="group mt-8 inline-flex items-center gap-2 py-1 text-sm font-semibold text-forest underline decoration-forest/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-forest/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Explore the general accessibility service
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </Reveal>

        <Reveal delay={120} className="min-w-0 lg:border-l lg:border-line lg:pl-12 xl:pl-16">
          <ol>
            {steps.map(({ number, tag, title, body }, index) => (
              <li
                key={number}
                className={`ck-step grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-6 ${
                  index > 0 ? "mt-6 border-t border-line pt-6" : ""
                }`}
                style={
                  { "--ck-anim-delay": `${index * 130}ms` } as CSSProperties
                }
              >
                <span className="font-serif text-[1.3rem] font-medium leading-none text-forest sm:text-[1.45rem]">
                  {number}
                </span>

                <div className="min-w-0">
                  <h3 className="font-serif text-[1.6rem] font-medium leading-tight tracking-[-0.015em] text-ink sm:text-[1.9rem]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-ink/75">
                    {body}
                  </p>
                </div>

                <span className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted sm:block">
                  {tag}
                </span>
              </li>
            ))}
          </ol>

          {/* Same limit the hero states, in the same words. */}
          <p
            className="ck-step mt-7 flex items-start gap-4 rounded-lg border border-forest/20 bg-forest-soft/70 px-5 py-4 text-sm leading-6 text-ink/80"
            style={{ "--ck-anim-delay": "430ms" } as CSSProperties}
          >
            <span
              className="grid size-6 shrink-0 translate-y-[3px] place-items-center rounded-full bg-forest font-serif text-[0.85rem] font-semibold leading-none text-ivory"
              aria-hidden
            >
              i
            </span>
            Technical accessibility support: not legal advice, compliance
            certification, or a guarantee that every barrier has been
            identified.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
