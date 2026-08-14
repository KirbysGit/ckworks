import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { LaptopFrame, PhoneFrame } from "@/components/ui/DeviceFrame";

/**
 * Renders phase three of the Process page on the same foundation as
 * `GetClearPhase`: the rail and numbered badge are an absolute left-edge
 * detail rather than a grid column, and the copy column is padded past them.
 *
 * The artefact here is a device pair rather than a paper stack, so it sits in
 * its own sand panel with a DESKTOP / MOBILE pair of labels and the build
 * order running underneath. Unlike phase one nothing is clipped — a laptop
 * cropped by the band edge reads as broken hardware, where a cropped sheet of
 * paper reads as a document continuing off-frame.
 *
 * Device shells come from `components/ui/DeviceFrame`, extracted from the Web
 * Design hero so the site keeps one device language.
 *
 * Panel size knobs:
 * - `phoneWidth` — phone column; the laptop takes the remaining width
 * - Keep the laptop lid at aspect-[16/10]; the frame relies on it
 */

const phoneWidth = "w-[23%] min-w-[3.75rem] max-w-[7rem]";

const buildItems = [
  "Real pages",
  "Responsive layouts",
  "Forms & interactions",
  "Integrations",
] as const;

const buildFlow = ["Content", "Layout", "Responsive", "Function"] as const;

const hearth = {
  logo: "/images/services/svg/01-hearth-logo-demo.svg",
  photo: "/images/services/png/01-hearth-home-demo.png",
} as const;

export default function BuildPhase() {
  return (
    <Reveal
      as="article"
      delay={140}
      className="relative overflow-hidden rounded-xl border border-line/75 bg-card/35 shadow-[0_10px_24px_-24px_rgba(31,36,32,0.5)]"
    >
      <div className="grid min-h-[21rem] grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="flex flex-col justify-center px-7 py-12 pl-[6rem] sm:pl-[7.25rem] lg:px-12 lg:py-14 lg:pl-[7.4rem]">
          <h2 className="font-source-serif-display text-[3.25rem] font-semibold leading-[0.96] text-forest sm:text-6xl lg:text-[4.25rem]">
            Build it out
          </h2>
          <span className="mt-5 block h-px w-12 bg-forest/65" aria-hidden />
          <p className="mt-6 max-w-[28rem] text-base font-medium leading-7 text-ink/84 sm:text-lg sm:leading-8">
            Once the direction is clear, I start turning it into the real thing.
            I build the pages, bring in the actual content, make sure everything
            works across devices, and connect the pieces the site needs to
            function.
          </p>
          <div className="mt-8 max-w-[28rem]">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-forest">
              We build:
            </p>
            <p className="mt-2.5 text-[0.92rem] font-medium leading-6 text-ink/80 sm:text-[0.98rem]">
              {buildItems.map((item, index) => (
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

        {/* Only needs to clear the rail, not match the copy column's indent —
            at phone widths that extra 96px was squeezing the laptop to 113px. */}
        <div
          className="flex min-w-0 items-center pb-10 pl-[3.75rem] pr-5 sm:pl-[5.5rem] sm:pr-6 lg:py-9 lg:pl-2 lg:pr-9"
          aria-hidden
        >
          <div className="w-full rounded-2xl bg-sand px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex items-end gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <PanelLabel>Desktop</PanelLabel>
                <LaptopFrame className="mt-3">
                  <HearthDesktop />
                </LaptopFrame>
              </div>

              <div className={`${phoneWidth} shrink-0`}>
                <PanelLabel>Mobile</PanelLabel>
                <PhoneFrame className="mt-3">
                  <HearthMobile />
                </PhoneFrame>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:mt-8 sm:gap-x-3">
              {buildFlow.map((step, index) => (
                <span key={step} className="flex items-center gap-2 sm:gap-3">
                  {index > 0 && (
                    <ArrowRight className="h-3 w-3 shrink-0 text-forest/55" />
                  )}
                  <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-forest sm:text-[0.66rem]">
                    {step}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Same left-edge rail as phase one — the process reads down one line. */}
      <span
        className="pointer-events-none absolute bottom-0 left-8 top-0 w-px bg-line/80 sm:left-12 lg:left-[3.5rem]"
        aria-hidden
      />
      <span className="pointer-events-none absolute left-8 top-[30%] z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-forest text-[0.74rem] font-semibold text-ivory shadow-[0_4px_12px_-7px_rgba(31,36,32,0.65)] sm:left-12 lg:left-[3.5rem] lg:h-11 lg:w-11 lg:text-sm">
        03
      </span>
    </Reveal>
  );
}

function PanelLabel({ children }: { children: string }) {
  return (
    <p className="text-center text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-forest/80 sm:text-[0.62rem]">
      {children}
    </p>
  );
}

/** Desktop screen: browser chrome, site nav, then a split hero. */
function HearthDesktop() {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex shrink-0 items-center gap-1 border-b border-line/80 px-2 py-1.5">
        {["#C87264", "#D8A847", "#5F9C69"].map((tone) => (
          <span
            key={tone}
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: tone }}
          />
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-1.5 border-b border-line/70 px-3 py-2">
        <Image
          src={hearth.logo}
          alt=""
          width={14}
          height={14}
          className="h-3 w-3 shrink-0 object-contain"
        />
        <span className="font-serif text-[0.6rem] font-semibold tracking-[0.01em] text-ink">
          Hearth &amp; Home
        </span>
        {/* Hidden at phone widths, where the lid is too narrow to hold four
            items without pushing past the card — same call as the Web Design
            hero's chrome nav. */}
        <span className="ml-auto hidden items-center gap-3 text-[0.42rem] font-semibold uppercase tracking-[0.12em] text-ink/60 sm:flex">
          {["Services", "Projects", "About", "Contact"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[0.54fr_0.46fr]">
        <div className="flex flex-col justify-center px-4 py-3">
          <p className="font-serif text-[1.05rem] font-medium leading-[1.05] tracking-[-0.01em] text-ink">
            Thoughtful spaces,
            <br />
            built around you.
          </p>
          <p className="mt-2 text-[0.42rem] leading-[1.5] text-muted">
            Interior design for calm, considered homes that work the way you
            live.
          </p>
          <span className="mt-3 inline-flex w-fit rounded bg-forest px-2.5 py-1.5 text-[0.4rem] font-semibold uppercase tracking-[0.14em] text-ivory">
            View our work
          </span>
        </div>

        {/* Cell is taller than it is wide, so object-cover scales this
            landscape shot to match its height — `sizes` reflects that. */}
        <div className="relative min-h-0 overflow-hidden">
          <Image
            src={hearth.photo}
            alt=""
            fill
            sizes="(min-width: 1024px) 420px, 45vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

/** Mobile screen: the same page recomposed, not the desktop shot cropped. */
function HearthMobile() {
  return (
    <div className="flex min-h-[10.5rem] flex-col bg-card">
      <div className="flex shrink-0 items-center gap-1 px-2 pb-1.5 pt-[13px]">
        <Image
          src={hearth.logo}
          alt=""
          width={10}
          height={10}
          className="h-2 w-2 shrink-0 object-contain"
        />
        <span className="truncate font-serif text-[0.38rem] font-semibold text-ink">
          Hearth &amp; Home
        </span>
        <span className="ml-auto space-y-[1.5px]" aria-hidden>
          <span className="block h-px w-2 bg-ink/70" />
          <span className="block h-px w-2 bg-ink/70" />
          <span className="block h-px w-2 bg-ink/70" />
        </span>
      </div>

      <div className="px-2 pb-2">
        <p className="font-serif text-[0.52rem] font-medium leading-[1.12] text-ink">
          Thoughtful spaces, built around you.
        </p>
        <p className="mt-1 text-[0.3rem] leading-[1.5] text-muted">
          Interior design for calm, considered homes.
        </p>
        <span className="mt-1.5 inline-flex rounded bg-forest px-1.5 py-[3px] text-[0.28rem] font-semibold uppercase tracking-[0.12em] text-ivory">
          View our work
        </span>
      </div>

      <div className="relative mt-auto h-[3.75rem] shrink-0 overflow-hidden">
        <Image
          src={hearth.photo}
          alt=""
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
