/**
 * Explains who the Title II web rule applies to and the two compliance dates.
 * The building sketch sits beside the timeline and overlaps the bar, so the
 * line reads as coming out of the building rather than starting at its edge.
 */
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { serviceContainer } from "@/components/services/shared/styles";

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
 *   width    — rendered width of the SVG
 *   height   — rendered height. Taller than the native 3:2 canvas so
 *              object-cover trims side padding and the sketch reads larger.
 *   overlap  — how far the right side covers the timeline bar
 *   offsetX  — extra shift. Positive = right
 *   offsetY  — extra vertical nudge. Negative = up
 */
const buildingGraphic = {
  width: 520,
  height: 410,
  overlap: 72,
  offsetX: 0,
  offsetY: 0,
} as const;

export default function WhoIsAffected() {
  const { width, height, overlap, offsetX, offsetY } = buildingGraphic;

  return (
    <section
      id="who-is-affected"
      className="scroll-mt-24 border-b border-line bg-ivory py-16 sm:py-20 lg:py-24"
    >
      <div
        className={`${serviceContainer} grid items-center gap-12 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-6 xl:gap-8`}
      >
        <div className="max-w-[29rem] text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
            Who is affected and when
          </p>
          <h2 className="mt-5 font-serif text-[2.7rem] font-semibold leading-[1.03] tracking-[-0.025em] text-ink sm:text-[3.35rem]">
            A shared standard, with different timelines.
          </h2>
          <p className="mx-auto mt-6 max-w-[27rem] text-sm leading-7 text-ink/78 sm:mx-0 sm:text-base">
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
        </div>

        <div className="min-w-0">
          <div
            className="relative flex items-center [--bar-start:0px] lg:[--bar-start:var(--building-overlap)]"
            style={
              {
                "--building-overlap": `-${overlap}px`,
              } as CSSProperties
            }
          >
            <div
              className="pointer-events-none relative z-10 hidden shrink-0 lg:block"
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
                className="absolute right-0 top-[7.55rem] hidden h-px bg-forest sm:block"
                style={{ left: "var(--bar-start)" }}
                aria-hidden="true"
              />
              <div className="relative grid gap-7 sm:grid-cols-2 sm:gap-10 lg:flex lg:justify-end lg:gap-10 xl:gap-12">
                {complianceDates.map((item) => (
                  <div
                    key={item.dateTime}
                    className="relative rounded-xl border border-line bg-card px-6 py-6 text-center shadow-soft sm:rounded-none sm:border-0 sm:bg-transparent sm:px-4 sm:py-0 sm:shadow-none lg:w-[12rem] lg:shrink-0"
                  >
                    <time
                      dateTime={item.dateTime}
                      className="block font-serif font-semibold leading-none text-forest"
                    >
                      <span className="block text-[1.55rem] tracking-[0.02em] sm:text-[1.8rem]">
                        {item.monthDay}
                      </span>
                      <span className="mt-2 block text-[2.6rem] tracking-[-0.025em] sm:text-[3rem]">
                        {item.year}
                      </span>
                    </time>
                    <span
                      className="relative z-10 mx-auto mt-7 hidden size-4 rounded-full bg-forest ring-4 ring-ivory sm:block"
                      aria-hidden="true"
                    />
                    <p className="mx-auto mt-5 max-w-[14rem] text-sm font-medium leading-6 text-ink sm:mt-7 sm:text-base">
                      {item.audience}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-xs leading-5 text-muted sm:mt-12 sm:text-right sm:text-sm">
            Population and entity type determine the applicable compliance
            date.
          </p>
        </div>
      </div>
    </section>
  );
}
