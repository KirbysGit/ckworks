/**
 * The practical opening moves for a public entity, drawn from the DOJ's own
 * "first steps" guidance for the Title II web rule.
 *
 * Deliberately the plainest band on the page: no mockups, no artwork. It comes
 * after the content-and-exceptions section, where a reader who has just been
 * told the rule is complicated needs somewhere concrete to start.
 *
 * The numerals sit on a rule that runs the width of the row, so the four steps
 * read as one sequence rather than four cards. The rule is decoration, and the
 * ordered list carries the sequence for assistive technology.
 */
import { ArrowUpRight } from "lucide-react";
import {
  serviceCenterLabelClassName,
  serviceCenterTitleClassName,
  serviceContainer,
} from "@/components/services/shared/styles";

const steps = [
  {
    number: "01",
    title: "Assign ownership",
    body: "Name the teams responsible for websites, content, procurement, and accessibility.",
  },
  {
    number: "02",
    title: "Build an inventory",
    body: "List websites, applications, documents, public workflows, and vendor platforms.",
  },
  {
    number: "03",
    title: "Set priorities",
    body: "Begin with essential and frequently used public services.",
  },
  {
    number: "04",
    title: "Make it repeatable",
    body: "Carry accessibility into publishing, procurement, training, and maintenance.",
  },
] as const;

export default function FirstSteps() {
  return (
    <section
      id="first-steps"
      className="scroll-mt-24 border-b border-line bg-ivory py-16 sm:py-20 lg:py-24"
    >
      <div className={serviceContainer}>
        <div className="mx-auto max-w-5xl text-center">
          <p className={serviceCenterLabelClassName}>
            Preparing your organization
          </p>
          <h2 className={serviceCenterTitleClassName}>
            A practical place to begin.
          </h2>
        </div>

        <ol className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
          {steps.map(({ number, title, body }) => (
            <li key={number} className="min-w-0 text-center">
              <div className="flex items-center">
                <span className="h-px flex-1 bg-line" aria-hidden />
                <span className="px-5 font-serif text-[2.5rem] font-medium leading-none text-forest sm:text-[2.9rem]">
                  {number}
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden />
              </div>

              <h3 className="mt-6 font-serif text-[1.5rem] font-medium leading-tight tracking-[-0.015em] text-ink sm:text-[1.65rem]">
                {title}
              </h3>
              <p className="mx-auto mt-4 max-w-[17rem] text-[0.95rem] font-medium leading-[1.75] text-ink/80">
                {body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 text-center lg:mt-16">
          <a
            href="https://www.ada.gov/resources/web-rule-first-steps/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 py-1 text-sm font-semibold text-forest underline decoration-forest/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-forest/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            See the DOJ&apos;s complete First Steps guidance
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
          <p className="mx-auto mt-3 max-w-[34rem] text-xs leading-6 text-muted sm:text-[0.8rem]">
            These are practical starting points; each public entity may require
            additional preparation.
          </p>
        </div>
      </div>
    </section>
  );
}
