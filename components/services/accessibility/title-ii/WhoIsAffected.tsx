/**
 * Explains who the Title II web rule applies to and the two compliance dates.
 *
 * From lg the section is a two-row grid. The copy and the timeline share the
 * first row and centre against each other; the compliance-date footnote takes
 * the second on its own. The DOJ link stays with the paragraph it follows.
 * The building sketch sits beside the timeline and overlaps the bar, so the
 * line reads as coming out of the building rather than starting at its edge.
 */
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { serviceContainer } from "@/components/services/shared/styles";
import Reveal from "@/components/ui/Reveal";

const complianceDates = [
  {
    monthDay: "APR 26",
    year: "2027",
    dateTime: "2027-04-26",
    audience: "50,000 or more people",
  },
  {
    monthDay: "APR 26",
    year: "2028",
    dateTime: "2028-04-26",
    audience: "0–49,999 people and special district governments",
  },
] as const;

/**
 * Government-building sketch. Desktop only; the copy and dates carry the
 * meaning on smaller screens.
 *
 * Shown from xl, not lg. The sketch plus two 12rem date columns needs about
 * 830px of row; between 1024 and 1280 the row is narrower than that, and since
 * the sketch paints above the timeline it covered the first date entirely.
 *
 *   width    — rendered width of the SVG
 *   height   — rendered height. Taller than the native 3:2 canvas so
 *              object-cover trims side padding and the sketch reads larger.
 *   overlap  — how far the right side covers the timeline bar
 *   barTuck  — extra px the bar runs on behind the sketch. The box is wider
 *              than the drawing inside it, so matching `overlap` alone left
 *              the bar starting at the drawn edge rather than behind it
 *   offsetX  — extra shift. Positive = right
 *   offsetY  — extra vertical nudge. Negative = up
 */
const buildingGraphic = {
  width: 490,
  height: 386,
  overlap: 84,
  barTuck: 130,
  offsetX: -60,
  offsetY: 0,
} as const;

export default function WhoIsAffected() {
  const { width, height, overlap, barTuck, offsetX, offsetY } = buildingGraphic;

  return (
    <section
      id="who-is-affected"
      className="scroll-mt-24 border-b border-line bg-ivory py-16 sm:py-20 lg:py-24"
    >
      <div
        className={`${serviceContainer} grid items-center gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:gap-x-6 lg:gap-y-8 xl:gap-x-8 min-[1360px]:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]`}
      >
        <Reveal className="max-w-[32rem] text-center sm:text-left lg:col-start-1 lg:row-start-1">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
            Who is affected and when
          </p>
          <h2 className="mt-5 font-serif text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[3.1rem]">
            <span className="block">A shared standard,</span>
            <span className="block">different timelines.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[30rem] text-sm leading-7 text-ink/78 sm:mx-0 sm:text-base">
            Title II applies to state and local government entities. The rule
            names WCAG 2.1 Level AA as the technical standard for covered web
            content and mobile applications.
          </p>
          <a
            href="https://www.ada.gov/resources/2024-03-08-web-rule/"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 py-1 text-sm font-semibold text-forest underline decoration-forest/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-forest/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Read current DOJ guidance
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </Reveal>

        <div className="min-w-0 lg:contents">
        <Reveal delay={120} className="min-w-0 lg:col-start-2 lg:row-start-1">
          <div
            className="relative flex items-center [--bar-start:0px] xl:[--bar-start:var(--bar-tuck)]"
            style={
              {
                "--building-overlap": `-${overlap}px`,
                "--bar-tuck": `-${overlap + barTuck}px`,
              } as CSSProperties
            }
          >
            <div
              className="pointer-events-none relative z-10 hidden shrink-0 xl:block"
              style={{
                width,
                height,
                marginRight: -overlap,
                transform: `translate(${offsetX}px, ${offsetY}px)`,
              }}
              aria-hidden="true"
            >
              <Image
                src="/images/services/svg/ada-building-graphic.svg"
                alt=""
                fill
                sizes={`${width}px`}
                className="object-cover object-center"
              />
            </div>

            <div className="relative z-0 min-w-0 flex-1">
              <span
                className="ck-draw-x absolute right-0 top-[7.55rem] hidden h-px bg-forest sm:block"
                style={
                  {
                    left: "var(--bar-start)",
                    "--ck-anim-delay": "260ms",
                  } as CSSProperties
                }
                aria-hidden="true"
              />
              <div className="relative grid gap-5 pl-10 max-sm:auto-rows-fr sm:grid-cols-2 sm:gap-10 sm:pl-0 lg:flex lg:justify-end lg:gap-10 xl:gap-12">

                {complianceDates.map((item, index) => (
                  <div
                    key={item.dateTime}
                    className="ck-step relative rounded-xl border border-line bg-card px-5 py-5 text-left shadow-soft sm:rounded-none sm:border-0 sm:bg-transparent sm:px-4 sm:py-0 sm:text-center sm:shadow-none lg:w-[12rem] lg:shrink-0"
                    style={
                      {
                        "--ck-anim-delay": `${560 + index * 140}ms`,
                      } as CSSProperties
                    }
                  >
                    {/* Below sm the horizontal bar and its dots are hidden,
                        which left the two dates as unrelated boxes. This is the
                        same timeline turned on its side. The card starts 40px
                        in and the rail sits at 15px, so both centre 25px back
                        from the card's edge.

                        The rail is a segment per card rather than one span on
                        the container: it runs from this dot to the next one
                        (the 20px gap plus the 50px inset of the next dot), so
                        it stays correct however the audience lines wrap. The
                        cards are equal-height below sm (`auto-rows-fr`), which
                        keeps that inset the same in both. */}
                    {index < complianceDates.length - 1 && (
                      <span
                        className="absolute -bottom-[4.375rem] -left-[1.5625rem] top-[3.125rem] w-px -translate-x-1/2 bg-line sm:hidden"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className="absolute -left-[1.5625rem] top-[2.75rem] size-3 -translate-x-1/2 rounded-full bg-forest ring-4 ring-ivory sm:hidden"
                      aria-hidden="true"
                    />
                    <time
                      dateTime={item.dateTime}
                      className="flex items-baseline gap-2.5 font-serif font-semibold leading-none text-forest lining-nums sm:block"
                    >
                      <span className="block text-[1.1rem] tracking-[0.06em] text-forest/75 sm:text-[1.8rem] sm:tracking-[0.02em] sm:text-forest">
                        {item.monthDay}
                      </span>
                      <span className="block text-[2.35rem] tracking-[-0.025em] sm:mt-2 sm:text-[3rem]">
                        {item.year}
                      </span>
                    </time>
                    <span
                      className="relative z-10 mx-auto mt-7 hidden size-4 rounded-full bg-forest ring-4 ring-ivory sm:block"
                      aria-hidden="true"
                    />
                    <p className="mt-4 max-w-[14rem] border-t border-line pt-3 text-sm font-medium leading-6 text-ink sm:mx-auto sm:mt-7 sm:border-t-0 sm:pt-0 sm:text-base">
                      {item.audience}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Reveal>
          <Reveal
            as="p"
            delay={260}
            className="mt-8 text-center text-xs leading-5 text-muted sm:mt-10 sm:text-sm lg:col-start-2 lg:row-start-2 lg:mt-0"
          >
            Population and entity type determine the applicable compliance
            date.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
