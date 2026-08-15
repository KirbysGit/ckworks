import Image from "next/image";
import { Check, RefreshCw } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { animDelay } from "@/lib/motion";

/**
 * Renders phase four on the same height band as the earlier cards.
 * The main row is launch confirmation + copy; refine lives in a smaller
 * bottom strip so "improve" does not inflate the title or the card.
 */

const beforeLaunch = ["Mobile", "Forms", "Content", "Tracking"] as const;

const refineLoop = ["Launch", "Learn", "Refine"] as const;

const liveDemoImage = "/images/services/png/01-hearth-home-demo.png";
const liveDemoLogo = "/images/services/svg/01-hearth-logo-demo.svg";

const trustPills = ["Warm spaces", "Refined detail", "Easy inquiry"] as const;

/**
 * Delays measured from the moment this band scrolls in. The site sits behind
 * its wash, the confirmation resolves out of focus onto it, then the loop
 * beneath steps through.
 *
 * `ck-resolve` is the one beat that is not a fade: blur into focus is the
 * closest primitive to a site coming up. It is applied to an inner wrapper
 * rather than the overlay, because the overlay owns the `backdrop-blur` and
 * stacking a `filter` on the same element muddies it.
 *
 * No `delay` on the Reveal itself — the four bands sit 390-460px of scroll
 * apart, so they never enter together and a stagger between them reads as lag.
 */
const launchTiming = {
  confirmation: 240,
  refineIntro: 620,
  refineStep: 700,
  refineGap: 70,
} as const;

export default function LaunchImprovePhase() {
  return (
    <Reveal
      as="article"
      className="overflow-hidden rounded-xl border border-line/75 bg-card/35 shadow-[0_10px_24px_-24px_rgba(31,36,32,0.5)]"
    >
      <div className="grid min-h-[21rem] grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <LaunchArtefact />
        <LaunchCopy />
      </div>

      <RefineStrip />
    </Reveal>
  );
}

function LaunchArtefact() {
  return (
    <div className="relative order-2 flex min-w-0 items-center justify-center border-t border-line/75 px-5 py-7 sm:px-8 sm:py-8 lg:order-1 lg:border-r lg:border-t-0 lg:px-8 lg:py-7">
      <LiveSiteWindow />

      <span className="pointer-events-none absolute right-0 top-[42%] z-10 hidden h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-forest text-[0.74rem] font-semibold text-ivory shadow-[0_4px_12px_-7px_rgba(31,36,32,0.65)] lg:flex lg:h-11 lg:w-11 lg:text-sm">
        04
      </span>
    </div>
  );
}

function LiveSiteWindow() {
  return (
    <div
      className="w-full max-w-[34rem] overflow-hidden rounded-xl border border-line bg-card shadow-[0_18px_36px_-28px_rgba(31,36,32,0.5)]"
      aria-hidden
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-line bg-card px-4 py-2.5">
        {["#D96859", "#DEA741", "#74A66D"].map((tone) => (
          <span
            key={tone}
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: tone }}
          />
        ))}
        <span className="ml-2 h-1.5 flex-1 rounded-full bg-line/70" />
      </div>

      {/* Site structure sits under a full-bleed blur + confirmation. */}
      <div className="relative min-h-[16.5rem] sm:min-h-[18rem]">
        <div className="flex h-full min-h-[16.5rem] flex-col sm:min-h-[18rem]">
          <div className="flex shrink-0 items-center gap-2 border-b border-line/80 px-3.5 py-2.5">
            <Image
              src={liveDemoLogo}
              alt=""
              width={14}
              height={14}
              className="h-3.5 w-3.5 object-contain"
            />
            <span className="font-serif text-[0.72rem] font-semibold tracking-[0.01em] text-ink">
              Hearth &amp; Home
            </span>
            <span className="ml-auto hidden items-center gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-ink/55 sm:flex">
              {["Services", "Projects", "About", "Contact"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </span>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[0.42fr_0.58fr]">
            <div className="flex flex-col justify-center gap-2 border-r border-line/70 bg-[#243028] px-3.5 py-4 text-ivory">
              <span className="block h-2 w-[88%] rounded-full bg-ivory/50" />
              <span className="block h-2 w-[68%] rounded-full bg-ivory/35" />
              <span className="mt-1 block h-1.5 w-[72%] rounded-full bg-ivory/25" />
              <span className="mt-2 inline-flex w-fit rounded bg-[#174A31] px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-ivory">
                View our work
              </span>
            </div>
            <div className="relative min-h-0 overflow-hidden">
              <Image
                src={liveDemoImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 20rem, 55vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-3 divide-x divide-line border-t border-line bg-[#faf8f4]">
            {trustPills.map((label) => (
              <span
                key={label}
                className="px-1 py-2.5 text-center text-[0.55rem] font-semibold leading-tight text-ink/75 sm:text-[0.6rem]"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Full-site blur — light text over a soft dark wash for contrast. */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#1a2a20]/45 px-5 py-6 text-center backdrop-blur-[2.5px]">
          <div
            className="ck-resolve flex flex-col items-center"
            style={animDelay(launchTiming.confirmation)}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-soft text-forest shadow-[0_10px_22px_-12px_rgba(47,91,63,0.55)] ring-1 ring-ivory/35">
              <Check className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <p className="mt-4 font-source-serif-display text-[1.45rem] font-semibold leading-tight text-ivory sm:text-[1.6rem]">
              Your site is live and ready.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-forest-soft/90 px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-forest">
              <span className="h-1.5 w-1.5 rounded-full bg-forest" />
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LaunchCopy() {
  return (
    <div className="order-1 flex min-w-0 flex-col justify-center px-7 py-10 sm:px-10 lg:order-2 lg:px-8 lg:py-8 lg:pl-16">
      <div className="flex items-start gap-5 lg:block">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-[0.74rem] font-semibold text-ivory shadow-[0_4px_12px_-7px_rgba(31,36,32,0.65)] lg:hidden">
          04
        </span>
        <div className="min-w-0">
          <h2 className="font-source-serif-display text-[3.25rem] font-semibold leading-[0.96] text-forest sm:text-6xl lg:text-[4.25rem]">
            Launch it
          </h2>
          <span className="mt-5 block h-px w-10 bg-forest/70" aria-hidden />
        </div>
      </div>

      <p className="mt-6 max-w-[28rem] text-base font-medium leading-7 text-ink/84 sm:text-lg sm:leading-8">
        We test the important paths, launch with confidence, and hand off a
        site that is ready to use.
      </p>

      <div className="mt-6">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-forest">
          Before launch:
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.92rem] font-medium leading-6 text-ink/80 sm:text-[0.98rem]">
          {beforeLaunch.map((item, index) => (
            <span key={item} className="flex items-center gap-x-2.5">
              {index > 0 && (
                <span
                  className="h-1 w-1 shrink-0 rounded-full bg-forest/45"
                  aria-hidden
                />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Compact loop band — improve lives here so the main card stays in band. */
function RefineStrip() {
  return (
    <div className="flex flex-col gap-3 border-t border-line/75 bg-sand/45 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-10 sm:py-3.5 lg:px-10">
      <div
        className="ck-step flex min-w-0 items-center gap-3"
        style={animDelay(launchTiming.refineIntro)}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-card text-forest">
          <RefreshCw className="h-4 w-4" strokeWidth={1.7} />
        </span>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-forest">
            After launch
          </p>
          <p className="mt-0.5 text-sm font-medium leading-5 text-ink/80">
            Keep refining from real use, feedback, and what the data shows.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        {refineLoop.map((step, index) => (
          <span
            key={step}
            className="ck-step flex items-center gap-2"
            style={animDelay(
              launchTiming.refineStep + index * launchTiming.refineGap,
            )}
          >
            {index > 0 && (
              <span className="text-forest/40" aria-hidden>
                →
              </span>
            )}
            <span className="rounded-full bg-card px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-forest">
              {step}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
