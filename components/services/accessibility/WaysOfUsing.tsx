/**
 * "Different ways of using the same website" band on the Web Accessibility page.
 *
 * Left heading column, open two-column grid of access methods on the right. No
 * rules or dividers: the icons and spacing carry the grouping, so the band stays
 * lighter than the card sections below it.
 *
 * This is the section that explains why accessibility exists, so the text has to
 * carry the meaning on its own: the icons are decorative and the markup is a real
 * definition list.
 */
import { AArrowUp, AudioLines, Captions, Keyboard, Mic } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import {
  serviceSectionBodyClassName,
  serviceSectionTitleClassName,
} from "../shared/styles";

const accessMethods = [
  {
    term: "Keyboard",
    definition: "Use the website without a mouse.",
    icon: Keyboard,
  },
  {
    term: "Screen reader",
    definition: "Hear the content and structure read aloud.",
    icon: AudioLines,
  },
  {
    term: "Zoom & reflow",
    definition: "Enlarge content without breaking the layout.",
    icon: AArrowUp,
  },
  {
    term: "Captions",
    definition: "Access video and audio content.",
    icon: Captions,
  },
  {
    term: "Voice controls",
    definition: "Navigate and complete tasks by voice.",
    icon: Mic,
  },
] as const;

export default function AccessibilityWaysOfUsing() {
  return (
    <section
      id="ways-of-using"
      className="grid scroll-mt-24 gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-16 lg:py-16"
    >
      <Reveal className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          What accessibility means
        </p>
        <h2 className={serviceSectionTitleClassName}>
          Different ways of using the same website.
        </h2>
        <p className={serviceSectionBodyClassName}>
          Web accessibility means removing barriers that prevent disabled people
          from navigating, understanding, and using a website.
        </p>
        {/* Plants the two paths early; the new-vs-existing band covers them. */}
        <p className="mt-5 text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
          It can be built into a new site or improved on an existing one.
        </p>
      </Reveal>

      <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {accessMethods.map(({ term, definition, icon: Icon }, index) => (
          <Reveal
            key={term}
            delay={index * 80}
            className="grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4"
          >
            <dt className="contents">
              <span
                className="row-span-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-soft/60 text-forest"
                aria-hidden
              >
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <span className="min-w-0 text-[0.95rem] font-semibold leading-6 text-ink">
                {term}
              </span>
            </dt>
            <dd className="col-start-2 mt-1.5 text-sm leading-6 text-muted">
              {definition}
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
