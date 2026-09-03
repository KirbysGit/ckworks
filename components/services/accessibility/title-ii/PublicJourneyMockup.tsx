/**
 * Illustrative resident-services journey for the ADA Title II hero.
 * It stays decorative: the real page copy carries the meaning, while this
 * mockup shows why a complete public workflow matters.
 */
import Image from "next/image";
import { ChevronRight, LockKeyhole, MoreVertical, Search } from "lucide-react";

const residentServices = [
  "Pay a utility bill",
  "Apply for a permit",
  "Request public records",
  "Report a problem",
] as const;

const journeySteps = [
  "Find the service",
  "Complete the request",
  "Receive confirmation",
] as const;

/**
 * Line from "Apply for a permit" (left dot) to "Complete the request" (right
 * dot). Coordinates are SVG px inside `width` × `height`. Negative `end.y`
 * draws above the box — the SVG overflows so the line can reach the panel.
 *
 *   right     — more negative = further into the journey column
 *   offsetY   — px from the permit-row center. Negative = up
 *   start/end — the two dots; move `end` to aim at "Complete the request"
 *   bendX     — elbow between them. Closer to start.x = tighter corner
 */
const journeyConnector = {
  width: 72,
  height: 48,
  right: -68,
  offsetY: 0,
  start: { x: -10, y: 24 },
  end: { x: 54, y: -8 },
  bendX: 22,
  dotRadius: 2.5,
  strokeWidth: 1.5,
} as const;

/**
 * Handwritten "Start with…" note in the hero gap. Position is relative to
 * the mockup; the arrow should land on "Apply for a permit".
 *
 *   left/top  — box origin on the mockup. Negative left hangs into the gap
 *   offsetX/Y — extra px after that. Negative = left / up
 */
const startWithNote = {
  width: 200,
  height: 140,
  left: -118,
  top: "48%",
  offsetX: 0,
  offsetY: 0,
} as const;

export default function PublicJourneyMockup() {
  return (
    <figure
      className="relative mx-auto w-full max-w-[56rem]"
      aria-label="Illustration of a resident finding and completing a public service online"
    >
      <StartWithNote />
      <div
        className="overflow-hidden rounded-[1.2rem] border border-line bg-card shadow-lift"
        aria-hidden="true"
      >
        <div className="flex h-10 items-center gap-2 border-b border-line bg-sand/45 px-4">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ee5c4d]" />
            <span className="size-2.5 rounded-full bg-[#f1bd42]" />
            <span className="size-2.5 rounded-full bg-[#58b64b]" />
          </div>
          <div className="mx-auto flex h-6 w-[58%] items-center justify-center gap-2 rounded-md bg-white/55 text-[0.6rem] tracking-[0.01em] text-muted sm:text-[0.68rem]">
            <LockKeyhole className="size-3" strokeWidth={1.8} />
            cityofgreenridge.gov/services
          </div>
          <MoreVertical className="size-4 text-ink/75" />
        </div>

        <div className="flex h-14 items-center border-b border-line px-5 sm:px-7">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-ink sm:text-base">
            <span className="grid size-7 place-items-center overflow-hidden rounded-full bg-[#fbfbfb]">
              <Image
                src="/images/services/svg/accessiblity-demo-logo.svg"
                alt=""
                width={35}
                height={35}
                className="max-h-none max-w-none -translate-x-[3px] -translate-y-px"
              />
            </span>
            City of Greenridge
          </div>
          <div className="ml-auto hidden items-center gap-7 text-[0.65rem] font-medium text-ink/80 md:flex">
            <span>Services</span>
            <span>Departments</span>
            <span>News</span>
            <span>About</span>
            <Search className="size-4 text-ink" />
          </div>
        </div>

        <div className="grid sm:grid-cols-[minmax(0,1fr)_14.5rem]">
          <div className="px-5 py-7 sm:border-r sm:border-line sm:px-8 sm:py-8">
            <p className="text-xs font-medium text-forest">
              Home <span className="text-muted">/ Services</span>
            </p>
            <p className="mt-3 text-[1.65rem] font-semibold leading-[1.06] tracking-[-0.025em] text-ink sm:text-[2rem]">
              How can we help today?
            </p>

            <div className="mt-6 border border-line">
              {residentServices.map((service, index) => (
                <div
                  key={service}
                  className={`relative flex min-h-14 items-center border-t border-line px-4 first:border-t-0 sm:min-h-[4.15rem] sm:px-5 ${
                    index === 1 ? "bg-forest-soft/65" : "bg-card"
                  }`}
                >
                  <span className="text-sm font-medium text-ink sm:text-base">
                    {service}
                  </span>
                  <ChevronRight className="ml-auto size-5 shrink-0 text-ink" />
                  {index === 1 ? <JourneyConnector /> : null}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden flex-col sm:flex">
            <div className="px-7 pb-8 pt-10">
              <p className="text-base font-semibold leading-tight tracking-[-0.01em] text-ink">
                A complete public journey.
              </p>
              <ol className="mt-6 border-b border-line">
                {journeySteps.map((step, index) => (
                  <li
                    key={step}
                    className="grid grid-cols-[1.5rem_1fr] items-center gap-3 border-t border-line py-5 first:border-t-0 first:pt-0"
                  >
                    <span className="text-lg font-semibold text-forest">
                      {index + 1}
                    </span>
                    <span className="text-xs leading-5 text-ink">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* The question the three steps are there to raise. `mt-auto`
                drops it to the foot of the column, so it fills the space the
                list leaves rather than floating under it, and the panel's own
                overflow clips it into the rounded corner. */}
            <div className="mt-auto border-t border-line bg-forest-soft/45 px-7 py-7">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-forest">
                Accessibility check
              </p>
              <p className="mt-3 border-l-2 border-forest/70 pl-3 font-serif text-[1.05rem] italic leading-[1.35] text-ink">
                Can every resident complete this journey?
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

function StartWithNote() {
  const { width, height, left, top, offsetX, offsetY } = startWithNote;

  return (
    <span
      className="ck-pop pointer-events-none absolute z-10 hidden xl:block"
      style={{
        width,
        height,
        left,
        top,
        transform: `translate(${offsetX}px, ${offsetY}px)`,
      }}
      aria-hidden="true"
    >
      <Image
        src="/images/services/svg/ada-hero-graphic.svg"
        alt=""
        fill
        sizes={`${width}px`}
        className="object-contain"
      />
    </span>
  );
}

function JourneyConnector() {
  const { width, height, right, offsetY, start, end, bendX, dotRadius, strokeWidth } =
    journeyConnector;
  const lineStartX = start.x + dotRadius;

  return (
    <span
      className="pointer-events-none absolute z-10 hidden overflow-visible sm:block"
      style={{
        width,
        height,
        right,
        top: "50%",
        transform: `translateY(calc(-50% + ${offsetY}px))`,
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
      >
        <circle
          cx={start.x}
          cy={start.y}
          r={dotRadius}
          fill="currentColor"
          className="text-forest"
        />
        <path
          d={`M${lineStartX} ${start.y} C${bendX} ${start.y} ${bendX} ${end.y} ${end.x} ${end.y}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-forest"
        />
        <circle
          cx={end.x}
          cy={end.y}
          r={dotRadius}
          fill="currentColor"
          className="text-forest"
        />
      </svg>
    </span>
  );
}
