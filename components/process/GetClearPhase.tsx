import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { animDelay } from "@/lib/motion";

/**
 * Renders phase one of the Process page as a standalone paper-brief scene.
 * It intentionally does not use the shared phase layout because the left rail
 * and clipped document stack are unique to this opening stage.
 *
 * Brief size knobs (keep aspect-[0.83] so it stays page-shaped):
 * - `briefWidth` — max width of the front sheet; height scales with it
 * - The outer band stays shorter than the sheet so `overflow-hidden`
 *   cuts the page — only the top of the brief should read as in-frame
 */

const briefWidth = "w-[min(92%,22rem)]";
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
      className="relative overflow-hidden rounded-xl border border-line/75 bg-card/35 shadow-[0_10px_24px_-24px_rgba(31,36,32,0.5)]"
    >
      <div className="grid min-h-[21rem] grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="flex flex-col justify-center px-7 py-12 pl-[6rem] sm:pl-[7.25rem] lg:px-12 lg:py-14 lg:pl-[7.4rem]">
          <h2 className="font-source-serif-display text-[3.25rem] font-semibold leading-[0.96] text-forest sm:text-6xl lg:text-[4.25rem]">
            Get clear
          </h2>
          <p className="mt-6 max-w-[28rem] text-base font-medium leading-7 text-ink/84 sm:text-lg sm:leading-8">
            First, I want to understand what you&apos;re trying to do, what
            already exists, and what feels like it needs work. That gives us a
            clear starting point.
          </p>
          <div className="mt-8 max-w-[28rem]">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-forest">
              We sort out:
            </p>
            <p className="mt-2.5 text-[0.92rem] font-medium leading-6 text-ink/80 sm:text-[0.98rem]">
              {sortOutItems.map((item, index) => (
                <span key={item}>
                  {index > 0 && (
                    <span className="mx-2 text-forest/45" aria-hidden>
                      •
                    </span>
                  )}
                  {item}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="relative min-h-[20rem] lg:min-h-0" aria-hidden>
          {/* Sheets are taller than the band; the article clips them so only
              the top of the brief stays in view. Stack builds back → front.
              Back sheets stay blank — only the front card is the Project Brief. */}
          <span
            className={`absolute right-[31%] top-[6.1rem] z-0 aspect-[0.83] ${briefBackWidth} origin-top-right rotate-[10deg] rounded-[0.7rem] border border-[#b7c9b4]/55 bg-[#d8e5d4] shadow-[0_10px_22px_-18px_rgba(31,36,32,0.45)]`}
          />
          <span
            className={`absolute right-[34%] top-[4.9rem] z-0 aspect-[0.83] ${briefBackWidth} origin-top-right rotate-[6.5deg] rounded-[0.7rem] border border-[#d4c7a3]/60 bg-[#eee3c4] shadow-[0_12px_24px_-18px_rgba(31,36,32,0.42)]`}
          />
          <span
            className={`absolute right-[37%] top-[3.75rem] z-0 aspect-[0.83] ${briefBackWidth} origin-top-right rotate-[3.5deg] rounded-[0.7rem] border border-line/70 bg-[#f3efe6] shadow-[0_14px_28px_-20px_rgba(31,36,32,0.4)]`}
          />

          <div
            className={`absolute right-[40%] top-[2.85rem] z-10 aspect-[0.83] ${briefWidth} origin-top-right rotate-[2deg] rounded-[0.7rem] border border-line bg-card px-5 py-6 shadow-[0_8px_16px_-12px_rgba(31,36,32,0.35),0_28px_48px_-28px_rgba(31,36,32,0.55),0_2px_4px_rgba(31,36,32,0.06)] sm:px-6 sm:py-7`}
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
        className="pointer-events-none absolute bottom-0 left-8 top-0 w-px bg-line/80 sm:left-12 lg:left-[3.5rem]"
        aria-hidden
      />
      <span className="pointer-events-none absolute left-8 top-[30%] z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-forest text-[0.74rem] font-semibold text-ivory shadow-[0_4px_12px_-7px_rgba(31,36,32,0.65)] sm:left-12 lg:left-[3.5rem] lg:h-11 lg:w-11 lg:text-sm">
        01
      </span>
    </Reveal>
  );
}
