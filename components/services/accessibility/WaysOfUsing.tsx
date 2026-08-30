/**
 * "Different ways of using the same website" band on the Web Accessibility page.
 *
 * This is the section that explains why accessibility exists, so the text has to
 * carry the meaning on its own: the icons are decorative and the markup is a real
 * definition list. Below `lg` the five items stack as left-aligned rows rather
 * than shrinking into columns, because five does not divide into two or three
 * without leaving an orphan.
 */
import { AArrowUp, AudioLines, Captions, Keyboard, Mic } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import {
  serviceCenterLabelClassName,
  serviceCenterTitleClassName,
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
      className="scroll-mt-24 border-b border-line py-14 lg:py-16"
    >
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>What accessibility means</p>
        <h2 className={serviceCenterTitleClassName}>
          Different ways of using the same website.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ink/75 sm:text-[0.95rem] sm:leading-8">
          Web accessibility means removing barriers that prevent disabled people
          from navigating, understanding, and using a website. People reach the
          same information and complete the same tasks in different ways.
        </p>
      </Reveal>

      <Reveal delay={110} className="mt-10 block sm:mt-12">
        <dl className="grid lg:grid-cols-5">
          {accessMethods.map(({ term, definition, icon: Icon }) => (
            <div
              key={term}
              className="border-t border-line py-5 first:border-t-0 first:pt-0 last:pb-1 lg:border-l lg:border-t-0 lg:px-5 lg:py-1 lg:text-center lg:first:border-l-0 lg:first:pt-1 lg:last:pb-1"
            >
              <dt className="flex items-center gap-3.5 lg:flex-col lg:gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-soft/60 text-forest"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="font-serif text-[1.15rem] font-medium leading-tight tracking-[-0.015em] text-ink lg:text-[1.2rem]">
                  {term}
                </span>
              </dt>
              <dd className="mt-1.5 pl-[3.6rem] text-sm leading-6 text-ink/75 lg:mt-3 lg:pl-0 lg:text-[0.85rem]">
                {definition}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
