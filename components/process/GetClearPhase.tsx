import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { animDelay } from "@/lib/motion";

/**
 * Renders phase one of the Process page as a standalone paper-brief scene.
 * It intentionally does not use the shared phase layout because the left rail
 * and clipped document stack are unique to this opening stage.
 *
 * Brief size knobs (keep aspect-[0.83] so it stays page-shaped):
 * - `briefWidth` (lg and up) sets the front sheet; height scales with it
 * - The outer band stays shorter than the sheet so `overflow-hidden`
 *   cuts the page — only the top of the brief should read as in-frame
 */

const briefWidth = "lg:w-[min(92%,22rem)]";
const briefBackWidth = "w-[min(88%,21rem)]";

/**
 * Delays measured from the moment this band scrolls in. The brief fills itself
 * out line by line, which is the phase made literal.
 *
 * The sheets themselves are not animated: they carry `rotate`/`origin-top-right`
 * for layout, and every entrance primitive ends at `transform: none`, so one
 * would silently flatten the stack.
 */
const briefTiming = {
  heading: 120,
  firstRow: 250,
  rowGap: 70,
} as const;

const briefRows = [
  "Business goals",
  "Target audience",
  "Current site review",
  "Top priorities",
  "Success metrics",
] as const;

const sortOutItems = [
  "Goals",
  "Priorities",
  "Existing content",
  "What’s not working",
] as const;

export default function GetClearPhase() {
  return (
    <Reveal
      as="article"
      className="relative overflow-hidden rounded-xl border border-line bg-card/35 shadow-[0_4px_12px_-10px_rgba(31,36,32,0.3)]"
    >
      <div className="grid min-h-[21rem] grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="flex flex-col justify-center px-5 py-8 sm:px-7 sm:py-10 lg:px-12 lg:py-14 lg:pl-[7.4rem]">
          <div className="flex items-center gap-3.5 lg:block">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-[0.8rem] font-semibold text-ivory shadow-[0_4px_12px_-7px_rgba(31,36,32,0.65)] lg:hidden">
              01
            </span>
            <h2 className="font-source-serif-display text-[2.2rem] font-semibold leading-[0.96] text-forest sm:text-[2.9rem] lg:text-[4.25rem]">
              Get clear
            </h2>
          </div>
          <p className="mt-6 max-w-[28rem] text-base font-medium leading-7 text-ink/84 sm:text-lg sm:leading-8">
            First, I want to understand what you&apos;re trying to do, what
            already exists, and what feels like it needs work. That gives us a
            clear starting point.
          </p>
          <div className="mt-8 max-w-[28rem]">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-forest">
              We sort out:
            </p>
            <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.92rem] font-medium leading-6 text-ink/80 sm:text-[0.98rem]">
              {sortOutItems.map((item, index) => (
                <span key={item} className="whitespace-nowrap">
                  {item}
                  {index < sortOutItems.length - 1 && (
                    <span className="ml-2 text-forest/45" aria-hidden>
                      •
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="relative h-[19.5rem] sm:h-[21rem] lg:h-auto lg:min-h-0" aria-hidden>
          {/* Sheets are taller than the band; the article clips them so only
              the top of the brief stays in view. Stack builds back → front.
              Back sheets stay blank — only the front card is the Project Brief. */}
          <span
            className={`absolute right-[31%] top-[6.1rem] z-0 aspect-[0.83] ${briefBackWidth} hidden origin-top-right rotate-[10deg] lg:block rounded-[0.7rem] border border-[#b7c9b4]/55 bg-[#d8e5d4] shadow-[0_10px_22px_-18px_rgba(31,36,32,0.45)]`}
          />
          <span
            className={`absolute right-3 top-14 z-0 aspect-[0.83] ${briefBackWidth} origin-bottom-right rotate-[2deg] sm:right-2 lg:right-[34%] lg:top-[4.9rem] lg:origin-top-right lg:rotate-[6.5deg] rounded-[0.7rem] border border-[#d4c7a3]/60 bg-[#eee3c4] shadow-[0_12px_24px_-18px_rgba(31,36,32,0.42)]`}
          />
          <span
            className={`absolute right-4 top-11 z-0 aspect-[0.83] ${briefBackWidth} origin-bottom-right rotate-[1deg] sm:right-3 lg:right-[37%] lg:top-[3.75rem] lg:origin-top-right lg:rotate-[3.5deg] rounded-[0.7rem] border border-line/70 bg-[#f3efe6] shadow-[0_14px_28px_-20px_rgba(31,36,32,0.4)]`}
          />

          <div
            className={`absolute inset-x-5 top-7 z-10 aspect-[0.83] origin-top rotate-[1.5deg] rounded-[0.7rem] border border-line bg-card px-5 py-6 sm:inset-x-7 shadow-[0_8px_16px_-12px_rgba(31,36,32,0.35),0_28px_48px_-28px_rgba(31,36,32,0.55),0_2px_4px_rgba(31,36,32,0.06)] sm:px-6 sm:py-7 lg:left-auto lg:right-[40%] lg:top-[2.85rem] ${briefWidth} lg:origin-top-right lg:rotate-[2deg]`}
          >
            <svg
              className="absolute -top-5 right-7 h-16 w-8"
              viewBox="0 0 32 64"
              fill="none"
            >
              <defs>
                <linearGradient id="process-brief-clip" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C6CAC3" />
                  <stop offset="45%" stopColor="#9BA098" />
                  <stop offset="100%" stopColor="#7C817A" />
                </linearGradient>
              </defs>
              <path
                d="M22 17v29a8 8 0 0 1-16 0V14a6 6 0 0 1 12 0v30a3.4 3.4 0 0 1-6.8 0V19"
                stroke="url(#process-brief-clip)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <p
              className="ck-step text-[0.82rem] font-bold uppercase tracking-[0.16em] text-ink sm:text-[0.88rem]"
              style={animDelay(briefTiming.heading)}
            >
              Project Brief
            </p>
            <span
              className="ck-draw-x mt-3 block h-px w-12 bg-line"
              style={animDelay(briefTiming.heading + 60)}
            />

            <div className="mt-6 space-y-4">
              {briefRows.map((row, index) => (
                <div
                  key={row}
                  className="ck-step grid grid-cols-[1.125rem_minmax(0,1fr)_minmax(3.25rem,1fr)] items-center gap-x-3"
                  style={animDelay(
                    briefTiming.firstRow + index * briefTiming.rowGap,
                  )}
                >
                  <span className="flex size-[1.125rem] shrink-0 items-center justify-center rounded-full bg-forest">
                    <Check className="size-2.5 text-ivory" strokeWidth={3} />
                  </span>
                  <span className="whitespace-nowrap text-[0.76rem] font-semibold text-ink/88 sm:text-[0.8rem]">
                    {row}
                  </span>
                  <span className="h-px w-full bg-line" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The rail is a left-edge detail, matching the opening point of the
          process rather than dividing the text from its visual. */}
      <span
        className="pointer-events-none absolute bottom-0 left-8 top-0 hidden w-px bg-line/80 sm:left-12 lg:left-[3.5rem] lg:block"
        aria-hidden
      />
      <span className="pointer-events-none absolute left-8 top-[30%] z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-forest text-[0.74rem] font-semibold text-ivory shadow-[0_4px_12px_-7px_rgba(31,36,32,0.65)] sm:left-12 lg:left-[3.5rem] lg:flex lg:h-11 lg:w-11 lg:text-sm">
        01
      </span>
    </Reveal>
  );
}
