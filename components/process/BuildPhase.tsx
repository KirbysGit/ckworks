import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { LaptopFrame } from "@/components/ui/DeviceFrame";
import { animDelay } from "@/lib/motion";

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
 * The laptop uses the shared device shell. The phone stays at the Web Design
 * hero's native dimensions and is scaled as one object, which keeps its
 * physical proportions intact inside this smaller card.
 *
 * Panel size knobs:
 * - `phoneWidth` — phone column; the laptop takes the remaining width
 * - Keep the laptop lid at aspect-[16/10]; the frame relies on it
 */

/**
 * Phone column width. Everything inside the phone is sized in container units,
 * so this single value drives the whole device — bezel, notch, and type all
 * scale from it and the mockup never squashes.
 */
const processPhoneLayout = {
  laptopRightInset: "pr-[11%]",
  position: "bottom-0 right-0 z-30",
  footprint: "h-[14rem] w-[6.5rem] sm:h-[15.6rem] sm:w-[7.4rem]",
  transform: "scale-[0.62] sm:scale-[0.7]",
  imageHeight: "h-[7rem]",
} as const;

const buildItems = [
  "Real pages",
  "Responsive layouts",
  "Forms & interactions",
  "Integrations",
] as const;

const buildFlow = ["Content", "Layout", "Responsive", "Function"] as const;

/**
 * Delays measured from the moment this band scrolls in: the desktop build
 * lands, the mobile build follows, then the build order steps across.
 *
 * No `delay` on the Reveal itself — the four bands sit 390-460px of scroll
 * apart, so they never enter together and a stagger between them reads as lag.
 */
const buildTiming = {
  desktop: 110,
  mobile: 290,
  flow: 470,
  flowGap: 65,
} as const;

const hearth = {
  logo: "/images/services/svg/01-hearth-logo-demo.svg",
  photo: "/images/services/png/01-hearth-home-demo.png",
} as const;

export default function BuildPhase() {
  return (
    <Reveal
      as="article"
      className="relative overflow-hidden rounded-xl border border-line/75 bg-card/35 shadow-[0_10px_24px_-24px_rgba(31,36,32,0.5)]"
    >
      {/* Same min-height band as phases 01 / 02 — left copy sets the row
          height on lg; the device panel fills that band instead of growing it. */}
      <div className="grid min-h-[21rem] grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="flex flex-col justify-center px-7 py-12 pl-[6rem] sm:pl-[7.25rem] lg:px-12 lg:py-14 lg:pl-[7.4rem]">
          <h2 className="font-source-serif-display text-[3.25rem] font-semibold leading-[0.96] text-forest sm:text-6xl lg:text-[4.25rem]">
            Build it out
          </h2>
          <span className="mt-5 block h-px w-12 bg-forest/65" aria-hidden />
          <p className="mt-6 max-w-[28rem] text-base font-medium leading-7 text-ink/84 sm:text-lg sm:leading-8">
            Once the direction is clear, I turn it into the real thing:
            pages, content, and the pieces the site needs to work.
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

        {/* Mirrors GetClearPhase: min height on small screens, then on lg the
            column collapses into the copy-driven row and the panel is laid out
            absolutely so the laptop / phone cannot stretch the card. */}
        <div
          className="relative min-h-[20rem] pl-[3.75rem] pr-5 sm:pl-[5.5rem] sm:pr-6 lg:min-h-0 lg:pl-2 lg:pr-9"
          aria-hidden
        >
          <div className="flex h-full items-center py-8 lg:absolute lg:inset-0 lg:py-6 lg:pl-2 lg:pr-9">
            <div className="w-full origin-center lg:scale-[0.9]">
              <div className="w-full rounded-2xl bg-sand px-4 py-4 sm:px-5 sm:py-5">
                {/* The phone overlaps the laptop's bottom-right rather than taking
                    its own column. Side by side, a ~230px panel at phone widths
                    left the phone about 50px wide; overlapping lets the laptop use
                    the full panel and still leaves the phone a readable size. */}
                <div className={`relative ${processPhoneLayout.laptopRightInset}`}>
                  <div className="ck-step" style={animDelay(buildTiming.desktop)}>
                    <PanelLabel>Desktop</PanelLabel>
                    <LaptopFrame className="mt-2">
                      <HearthDesktop />
                    </LaptopFrame>
                  </div>

                  {/* ck-step goes on the footprint, not the scaled phone inside
                      it — a primitive ends at `transform: none` and would wipe
                      the `scale-[0.62]` that keeps the phone in proportion. */}
                  <div
                    className={`ck-step absolute ${processPhoneLayout.position} ${processPhoneLayout.footprint}`}
                    style={animDelay(buildTiming.mobile)}
                  >
                    <div className="absolute inset-x-0 bottom-full mb-2.5">
                      <PanelLabel>Mobile</PanelLabel>
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 origin-bottom-right ${processPhoneLayout.transform}`}
                    >
                      <ProcessHeroPhone />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:mt-6 sm:gap-x-3">
                  {buildFlow.map((step, index) => (
                    <span
                      key={step}
                      className="ck-step flex items-center gap-2 sm:gap-3"
                      style={animDelay(
                        buildTiming.flow + index * buildTiming.flowGap,
                      )}
                    >
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
    <p className="mx-auto w-fit rounded-full bg-card/90 px-2.5 py-1 text-center text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-forest sm:px-3 sm:text-[0.62rem]">
      {children}
    </p>
  );
}

/**
 * Desktop screen: browser chrome, site nav, then a split hero.
 *
 * Sized in `cqw` against the lid, so the whole page scales as one piece.
 * Fixed rem type here meant a 16.8px headline sat correctly in a 430px lid and
 * then swamped a 145px one at phone widths.
 */
function HearthDesktop() {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex shrink-0 items-center gap-[1.2cqw] border-b border-line/80 px-[2cqw] py-[1.4cqw]">
        {["#C87264", "#D8A847", "#5F9C69"].map((tone) => (
          <span
            key={tone}
            className="aspect-square w-[1.4cqw] rounded-full"
            style={{ backgroundColor: tone }}
          />
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-[1.4cqw] border-b border-line/70 px-[3cqw] py-[2cqw]">
        <Image
          src={hearth.logo}
          alt=""
          width={14}
          height={14}
          className="aspect-square w-[3cqw] shrink-0 object-contain"
        />
        <span className="font-serif text-[3cqw] font-semibold tracking-[0.01em] text-ink">
          Hearth &amp; Home
        </span>
        <span className="ml-auto flex items-center gap-[3cqw] text-[1.9cqw] font-semibold uppercase tracking-[0.12em] text-ink/60">
          {["Services", "Projects", "About", "Contact"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[0.54fr_0.46fr]">
        <div className="flex flex-col justify-center px-[4cqw] py-[3cqw]">
          <p className="font-serif text-[5.2cqw] font-medium leading-[1.05] tracking-[-0.01em] text-ink">
            Thoughtful spaces,
            <br />
            built around you.
          </p>
          <p className="mt-[2cqw] text-[2cqw] leading-[1.5] text-muted">
            Interior design for calm, considered homes that work the way you
            live.
          </p>
          <span className="mt-[3cqw] inline-flex w-fit rounded-[0.8cqw] bg-forest px-[2.6cqw] py-[1.5cqw] text-[1.9cqw] font-semibold uppercase tracking-[0.14em] text-ivory">
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

/**
 * Mobile screen: the same page recomposed, not the desktop shot cropped.
 *
 * `aspect-[9/18.5]` is what stops the squashing — height used to come from a
 * fixed `min-h`, so as the column narrowed the screen kept its height and the
 * device turned into a squat rectangle (0.63 aspect against a real phone's
 * ~0.47). Everything inside is `cqw`, so it tracks the device at any width.
 */
function HearthMobile() {
  return (
    <div className="flex h-[19.5rem] w-full flex-col bg-card">
      <div className="flex shrink-0 items-center gap-[2.5cqw] px-[6cqw] pb-[3cqw] pt-[11cqw]">
        <Image
          src={hearth.logo}
          alt=""
          width={12}
          height={12}
          className="aspect-square w-[8cqw] shrink-0 object-contain"
        />
        <span className="truncate font-serif text-[7cqw] font-semibold leading-none text-ink">
          Hearth &amp; Home
        </span>
        <span className="ml-auto flex shrink-0 flex-col gap-[1.4cqw]" aria-hidden>
          <span className="block h-[0.9cqw] w-[6cqw] bg-ink/70" />
          <span className="block h-[0.9cqw] w-[6cqw] bg-ink/70" />
          <span className="block h-[0.9cqw] w-[6cqw] bg-ink/70" />
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between px-[6cqw] pb-[4cqw] pt-[14cqw]">
        <p className="font-serif text-[10.5cqw] font-medium leading-[1.1] text-ink">
          Thoughtful spaces, built around you.
        </p>
        <div>
          <p className="text-[7cqw] leading-[1.45] text-muted">
            Interior design for calm, considered homes.
          </p>
          <span className="mt-[8cqw] inline-flex self-start rounded-[1.8cqw] bg-forest px-[4cqw] py-[2cqw] text-[4.4cqw] font-semibold uppercase tracking-[0.1em] text-ivory">
            View our work
          </span>
        </div>
      </div>

      <div className={`relative mt-[12cqw] shrink-0 overflow-hidden rounded-[1.8cqw] shadow-[0_12px_24px_-18px_rgba(31,36,32,0.75)] ${processPhoneLayout.imageHeight}`}>
        <Image
          src={hearth.photo}
          alt=""
          fill
          sizes="180px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/**
 * Uses the Web Design hero's phone hardware at its native proportions.
 * The parent scales this entire composition down, preserving its bezel,
 * island, side button, and highlight relationships as one object.
 */
function ProcessHeroPhone() {
  return (
    <div className="relative w-[10.5rem] [container-type:inline-size] rounded-[2.3rem] bg-[linear-gradient(145deg,#050605_0%,#181B18_30%,#6F746C_43%,#FFF9EA_49%,#3C423B_56%,#060706_74%,#161A16_100%)] p-[2px] shadow-[0_18px_38px_-18px_rgba(17,23,20,0.7),0_6px_14px_-8px_rgba(17,23,20,0.58)]">
      <span
        className="pointer-events-none absolute inset-[1px] rounded-[2.2rem] bg-[radial-gradient(circle_at_30%_7%,rgba(255,255,255,0.38),transparent_24%),linear-gradient(160deg,rgba(255,255,255,0.16),transparent_35%,rgba(0,0,0,0.42)_74%)] opacity-70"
        aria-hidden
      />
      <span
        className="absolute -right-[2px] top-24 h-11 w-[3px] rounded-r-full bg-[linear-gradient(180deg,#313630,#090A09)]"
        aria-hidden
      />
      <div className="relative rounded-[2.15rem] bg-[linear-gradient(145deg,#030403_0%,#0C0F0C_46%,#252B25_58%,#050605_100%)] p-[4px] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.16),inset_-2px_-2px_4px_rgba(0,0,0,0.82)]">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-card shadow-[inset_0_0_0_1px_rgba(31,36,32,0.05)]">
          <div
            className="pointer-events-none absolute left-1/2 top-[-6px] z-30 h-[20px] w-[62px] -translate-x-1/2"
            aria-hidden
          >
            <div className="relative h-full w-full rounded-b-[8px] bg-[#050605] shadow-[0_1px_0_rgba(5,6,5,0.95)]">
              <span className="absolute -left-[8px] top-0 h-2 w-2 rounded-br-lg shadow-[8px_0_0_0_#050605]" />
              <span className="absolute -right-[8px] top-0 h-2 w-2 rounded-bl-lg shadow-[-8px_0_0_0_#050605]" />
              <span className="absolute left-1/2 top-[9px] h-[2px] w-[22px] -translate-x-1/2 rounded-full bg-white/16" />
            </div>
          </div>
          <HearthMobile />
        </div>
      </div>
    </div>
  );
}
