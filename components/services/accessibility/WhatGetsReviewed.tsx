/**
 * "What a review looks at" band on the Web Accessibility page.
 *
 * First centered band on the page, so the rhythm reads left hero, left first
 * section, centered from here down.
 *
 * The four groups are user outcomes, not WCAG criteria, per
 * `docs/web-accessibility-service.md`. The scope note below them is not
 * decoration: the page must not imply that every page of a site is tested by
 * default, and this is where that boundary is stated.
 *
 * The id is load-bearing. The hero's secondary CTA links to
 * `#what-gets-reviewed`.
 */
import { Contrast, Files, Info, ListChecks, Route } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import {
  serviceCenterLabelClassName,
  serviceCenterTitleClassName,
} from "../shared/styles";

const reviewAreas = [
  {
    title: "Navigation & Structure",
    body: "Can people find their location and move through the website?",
    checks: [
      "Keyboard access",
      "Navigation and menus",
      "Focus order",
      "Headings and structure",
    ],
    icon: Route,
  },
  {
    title: "Forms & Important Actions",
    body: "Can people understand instructions, correct errors, and complete tasks?",
    checks: [
      "Forms and labels",
      "Instructions and hints",
      "Error messages",
      "Buttons and important journeys",
    ],
    icon: ListChecks,
  },
  {
    title: "Content & Presentation",
    body: "Can people perceive, enlarge, hear, and adapt the content?",
    checks: [
      "Color contrast",
      "Zoom and reflow",
      "Alternative text",
      "Captions and motion",
    ],
    icon: Contrast,
  },
  {
    title: "Documents & Connected Systems",
    body: "Can people use the supporting files, portals, embeds, and third-party tools?",
    checks: [
      "PDFs and documents",
      "Downloads and files",
      "Portals and embeds",
      "Third-party tools",
    ],
    icon: Files,
  },
] as const;

export default function AccessibilityWhatGetsReviewed() {
  return (
    <section
      id="what-gets-reviewed"
      className="scroll-mt-24 border-b border-line py-14 lg:py-16"
    >
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>What CK Works reviews</p>
        <h2 className={serviceCenterTitleClassName}>
          Four areas of the website experience.
        </h2>
      </Reveal>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4">
        {reviewAreas.map(({ title, body, checks, icon: Icon }, index) => (
          <Reveal
            as="article"
            key={title}
            delay={index * 80}
            className={`flex h-full flex-col items-start border-line px-5 py-8 text-left first:pt-0 last:pb-0 sm:px-7 sm:py-2 sm:first:pt-2 sm:last:pb-2 lg:px-8 ${
              index > 0 ? "border-t sm:border-t-0" : ""
            } ${index >= 2 ? "sm:border-t sm:pt-8 lg:border-t-0 lg:pt-2" : ""} ${
              index % 2 === 1 ? "sm:border-l" : ""
            } ${index > 0 ? "lg:border-l" : "lg:border-l-0"}`}
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest-soft/60 text-forest">
              <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
            </span>
            <h3 className="mt-5 max-w-[16rem] font-serif text-[1.35rem] font-semibold leading-[1.08] tracking-[-0.015em] text-ink sm:h-14 sm:text-[1.5rem]">
              {title}
            </h3>
            <p className="mt-3 flex w-full max-w-[16rem] items-center border-y border-line/80 py-3 text-sm font-medium leading-6 text-ink/80 sm:h-[6.75rem]">
              {body}
            </p>
            <ul className="mt-5 w-full max-w-[16rem] space-y-2 text-left text-[0.82rem] leading-5 text-ink/75">
              {checks.map((check) => (
                <li key={check} className="flex gap-2.5">
                  <span className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-forest" aria-hidden />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className="mx-auto mt-8 block max-w-4xl sm:mt-10">
        <p className="flex items-start justify-center gap-3 bg-forest-soft/25 px-5 py-3.5 text-sm leading-6 text-ink/75 sm:items-center sm:text-center">
          <Info className="mt-0.5 size-5 shrink-0 rounded-full border border-forest text-forest sm:mt-0" strokeWidth={1.6} aria-hidden />
          <span>The exact pages, templates, documents, systems, and user journeys included are defined before each review.</span>
        </p>
      </Reveal>
    </section>
  );
}
