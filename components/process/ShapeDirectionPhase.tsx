import Reveal from "@/components/ui/Reveal";
import { animDelay } from "@/lib/motion";

/**
 * Renders phase two as one direction worksheet and one decision panel.
 * Its desktop split is purpose-built: the worksheet owns 60% of the card and
 * the stage marker sits on that divider before the compact copy panel.
 */

const keyQuestions = [
  "Who are we speaking to?",
  "What should they know?",
  "What action matters?",
] as const;

const priorities = [
  "What matters first",
  "What supports it",
  "What proves it",
  "What comes next",
] as const;

const contentPlan = [
  ["01", "Primary message"],
  ["02", "Supporting proof"],
  ["03", "Clear next step"],
] as const;

const colorSwatches = ["bg-forest", "bg-muted/55", "bg-[#DCC7A7]", "bg-card"] as const;

const decisions = [
  "Key messages",
  "Content order",
  "Visual tone",
  "Style direction",
] as const;

/**
 * Delays measured from the moment this band scrolls in. The worksheet fills in
 * left to right — questions, then the direction they resolve into, then the
 * priority order, then the palette.
 *
 * No `delay` on the Reveal itself: the four bands sit 390-460px of scroll
 * apart, so they never enter together and a stagger between them reads as lag
 * rather than rhythm.
 */
const worksheetTiming = {
  question: 110,
  questionGap: 55,
  typeSpecimen: 260,
  priority: 330,
  priorityGap: 55,
  swatch: 560,
  swatchGap: 45,
} as const;

export default function ShapeDirectionPhase() {
  return (
    <Reveal
      as="article"
      className="overflow-hidden rounded-xl border border-line/75 bg-card/35 shadow-[0_10px_24px_-24px_rgba(31,36,32,0.5)]"
    >
      <div className="grid grid-cols-1 lg:min-h-[21rem] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <DirectionWorksheet />
        <DirectionCopy />
      </div>
    </Reveal>
  );
}

function DirectionWorksheet() {
  return (
    <div className="relative order-2 grid min-w-0 grid-rows-[minmax(0,1fr)_auto] border-t border-line/75 lg:order-1 lg:border-r lg:border-t-0">
      <div className="grid grid-cols-1 divide-y divide-line/75 px-6 py-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-10 sm:py-12 lg:px-10 lg:py-7">
        <section className="py-6 sm:py-0 sm:pr-7" aria-label="Key questions">
          <WorksheetLabel>Key Questions</WorksheetLabel>
          <div className="mt-6 space-y-4 lg:space-y-3.5">
            {keyQuestions.map((question, index) => (
              <div
                key={question}
                className="ck-step flex items-center gap-3 text-sm font-medium text-ink sm:text-[0.97rem]"
                style={animDelay(
                  worksheetTiming.question + index * worksheetTiming.questionGap,
                )}
              >
                <span className="h-4 w-4 shrink-0 rounded-full border-[1.5px] border-forest/80" aria-hidden />
                {question}
              </div>
            ))}
          </div>
        </section>

        <section className="py-6 sm:px-7 sm:py-0" aria-label="Visual direction">
          <WorksheetLabel>Direction</WorksheetLabel>
          <div
            className="ck-step mt-5 flex items-end gap-3 text-ink"
            style={animDelay(worksheetTiming.typeSpecimen)}
          >
            <span className="font-source-serif-display text-[3.5rem] font-semibold leading-none text-forest sm:text-[4rem] lg:text-[3.5rem]">
              Aa
            </span>
            <span className="mb-2 text-2xl font-light text-muted">+</span>
            <span className="font-sans text-[2.8rem] font-medium leading-none sm:text-[3.2rem] lg:text-[2.8rem]">
              Aa
            </span>
          </div>
          <div className="mt-2 flex justify-between gap-3 text-xs font-medium text-ink/78 sm:text-sm">
            <span>Serif for headings</span>
            <span>Sans for body</span>
          </div>
          <span className="mt-5 block h-px bg-line" aria-hidden />
          <div className="mt-3 space-y-1.5">
            {contentPlan.map(([number, label]) => (
              <div
                key={number}
                className="flex items-center gap-2.5 text-[0.72rem] font-medium text-ink/78"
              >
                <span className="font-source-serif-display text-sm font-semibold text-forest/85">
                  {number}
                </span>
                <span>{label}</span>
                <span className="h-px min-w-0 flex-1 bg-line/80" aria-hidden />
              </div>
            ))}
          </div>
        </section>

        <section className="py-6 sm:py-0 sm:pl-7" aria-label="Content priorities">
          <WorksheetLabel>Priorities</WorksheetLabel>
          <ol className="mt-6 space-y-3.5">
            {priorities.map((priority, index) => (
              <li
                key={priority}
                className="ck-step flex items-center gap-4 text-sm font-medium text-ink sm:text-[0.97rem]"
                style={animDelay(
                  worksheetTiming.priority + index * worksheetTiming.priorityGap,
                )}
              >
                <span className="font-source-serif-display text-xl font-semibold tabular-nums text-forest/85">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {priority}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="border-t border-line/75 px-6 py-7 sm:px-10 lg:px-10 lg:py-5">
        <WorksheetLabel>Color Palette</WorksheetLabel>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:gap-5">
          {colorSwatches.map((swatch, index) => (
            <span
              key={index}
              className={`ck-step h-10 rounded-md border border-ink/20 shadow-[0_2px_5px_-3px_rgba(31,36,32,0.48),inset_0_1px_0_rgba(255,255,255,0.4)] sm:h-12 lg:h-9 ${swatch}`}
              style={animDelay(
                worksheetTiming.swatch + index * worksheetTiming.swatchGap,
              )}
              aria-hidden
            />
          ))}
        </div>
      </div>

      {/* The phase marker belongs to the worksheet spine, not the copy block. */}
      <span className="pointer-events-none absolute right-0 top-[27%] z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-forest text-[0.74rem] font-semibold text-ivory shadow-[0_4px_12px_-7px_rgba(31,36,32,0.65)] lg:flex lg:h-11 lg:w-11 lg:text-sm">
        02
      </span>
    </div>
  );
}

function DirectionCopy() {
  return (
    <div className="order-1 flex min-w-0 flex-col justify-center px-7 py-10 sm:px-10 lg:order-2 lg:px-8 lg:py-8 lg:pl-16">
      <div className="flex items-start gap-5 lg:block">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-[0.74rem] font-semibold text-ivory shadow-[0_4px_12px_-7px_rgba(31,36,32,0.65)] lg:hidden">
          02
        </span>
        <div className="min-w-0">
          <h2 className="font-source-serif-display text-[3.25rem] font-semibold leading-[0.96] text-forest sm:text-6xl lg:text-[4.25rem]">
            Set the direction
          </h2>
          <span className="mt-5 block h-px w-10 bg-forest/70" aria-hidden />
        </div>
      </div>

      <p className="mt-6 max-w-[28rem] text-base font-medium leading-7 text-ink/84 sm:text-lg sm:leading-8">
        I turn what we learned into a clear direction for the site: what should
        stand out, how content should flow, and how it should feel.
      </p>

      <div className="mt-6">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-forest">
          We decide:
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.92rem] font-medium leading-6 text-ink/80 sm:text-[0.98rem]">
          {decisions.map((decision, index) => (
            <span key={decision} className="flex items-center gap-x-2.5">
              {index > 0 && (
                <span
                  className="h-1 w-1 shrink-0 rounded-full bg-forest/45"
                  aria-hidden
                />
              )}
              {decision}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorksheetLabel({ children }: { children: string }) {
  return (
    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink">
      {children}
    </p>
  );
}
