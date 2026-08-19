import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/**
 * Hero progression for /process: one project moving from a rough sketch to a
 * launched site. The four stages mirror the four phases detailed below the
 * fold, so the chain reads as a preview of the page rather than a second story.
 *
 * Stages 01–03 stay unbranded (sketch → wireframe → monochrome design). Stage
 * 04 resolves into the Hearth & Home demo used on Web Design and Support —
 * colour + brand arrive together as the "finished" read. See
 * `docs/demo-registry.md`.
 *
 * Sequenced left to right per the "Sequencing A Flow" section of
 * `docs/design-system.md`: each card lands, then the arrow leading out of it,
 * then the next card. This sits above the fold, so these are plain CSS
 * animations rather than `Reveal`.
 *
 * Delays continue the hero rhythm in `app/process/page.tsx` — the last copy
 * element lands at 250ms and the first card follows at 340ms. `ck-step` and
 * `ck-draw-x` read `--ck-anim-delay`, not `animationDelay`.
 */
const stageTiming = {
  card: [340, 560, 780, 1000],
  arrow: [500, 720, 940],
} as const;

const stageAssets = {
  current: "/images/process/svg/process-demo-1.svg",
  liveImage: "/images/services/png/01-hearth-home-demo.png",
  liveLogo: "/images/services/svg/01-hearth-logo-demo.svg",
} as const;

const stageVisuals = {
  currentInset: "0.68rem",
  currentColor: "#8B9086",
  currentOpacity: 0.55,
} as const;

const delay = (ms: number) => ({ "--ck-anim-delay": `${ms}ms` }) as CSSProperties;

const stages = [
  {
    number: "01",
    label: "Current",
    title: "Unclear",
    body: "Scattered ideas, no clear direction.",
  },
  {
    number: "02",
    label: "Structure",
    title: "Organized",
    body: "Content is sorted, priorities are clear.",
  },
  {
    number: "03",
    label: "Design",
    title: "Designed",
    body: "Layout and visuals take shape.",
  },
  {
    number: "04",
    label: "Live",
    title: "Launched",
    body: "Tested and live, ready for your audience.",
  },
] as const;

export default function StageChain() {
  const visuals = [
    <SketchStage key="sketch" />,
    <StructureStage key="structure" />,
    <DesignStage key="design" />,
    <LiveStage key="live" />,
  ];

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
      {stages.map((stage, index) => (
        <div
          key={stage.label}
          className="ck-step flex flex-col"
          style={delay(stageTiming.card[index])}
        >
          <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-forest px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-ivory">
            <span className="text-ivory/55">{stage.number}</span>
            {stage.label}
          </span>

          <div className="relative mt-2.5">
            <div
              className="aspect-[3/4] overflow-hidden rounded-lg border border-line bg-card shadow-[0_1px_3px_rgba(31,36,32,0.05),0_14px_28px_-24px_rgba(31,36,32,0.42)]"
              aria-hidden
            >
              {visuals[index]}
            </div>

            {/* Arrow lives in the gap after its card. The wrapper owns the
                positioning transform so the icon is free to carry ck-step —
                two transforms on one element would cancel the offset. */}
            {index < stages.length - 1 && (
              <span
                className="absolute left-full top-1/2 hidden -translate-y-1/2 pl-1 lg:block"
                aria-hidden
              >
                <ArrowRight
                  className="ck-step h-4 w-4 text-forest/75"
                  style={delay(stageTiming.arrow[index])}
                />
              </span>
            )}
          </div>

          <h3 className="mt-3 text-sm font-semibold text-ink">{stage.title}</h3>
          <p className="mt-1 text-xs leading-5 text-muted">{stage.body}</p>
        </div>
      ))}

      {/* One caption for the whole chain: the stage cells are fixed-aspect and
          far too small to carry a label each. */}
      <p className="col-span-2 text-center text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted lg:col-span-4">
        Illustrative website concept
      </p>
    </div>
  );
}

/** 01 — paper, marker, and an image box that is still just a box. */
function SketchStage() {
  return (
    <div className="relative h-full bg-[#F4EFE3]">
      <span
        className="absolute"
        style={{
          inset: stageVisuals.currentInset,
          backgroundColor: stageVisuals.currentColor,
          opacity: stageVisuals.currentOpacity,
          WebkitMaskImage: `url(${stageAssets.current})`,
          maskImage: `url(${stageAssets.current})`,
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
    </div>
  );
}

/** 02 — the same content, now with a shape. Wireframe only: boxes and lines. */
function StructureStage() {
  return (
    <div className="flex h-full flex-col gap-2 bg-card p-2.5">
      {/* Flat chrome — structure, not polish. */}
      <div className="flex items-center justify-between gap-2">
        <span className="h-1.5 w-8 rounded-sm bg-line/70" />
        <div className="flex gap-1">
          {[0, 1, 2].map((item) => (
            <span key={item} className="h-1 w-3 rounded-sm bg-line/60" />
          ))}
        </div>
      </div>

      <div className="grid flex-1 grid-rows-[1.1fr_0.9fr] gap-1.5">
        <div className="grid grid-cols-[1fr_0.85fr] gap-1.5">
          <div className="flex flex-col justify-center gap-1 rounded-sm border border-dashed border-line/70 bg-ivory/50 px-1.5 py-1.5">
            <span className="block h-1 w-full rounded-sm bg-line/80" />
            <span className="block h-1 w-4/5 rounded-sm bg-line/65" />
            <span className="block h-1 w-3/5 rounded-sm bg-line/55" />
            <span className="mt-1 block h-2.5 w-8 rounded-sm border border-line/65 bg-transparent" />
          </div>
          <span className="rounded-sm border border-dashed border-line/70 bg-line/25" />
        </div>

        <div className="grid grid-cols-3 gap-1">
          {["A", "B", "C"].map((item) => (
            <div
              key={item}
              className="flex flex-col gap-1 rounded-sm border border-dashed border-line/65 bg-ivory/45 px-1 py-1.5"
            >
              <span className="block h-1 w-2/3 rounded-sm bg-line/65" />
              <span className="block h-1 w-full rounded-sm bg-line/50" />
            </div>
          ))}
        </div>
      </div>

      <span className="block h-1 w-[70%] rounded-sm bg-line/55" />
    </div>
  );
}

/** 03 — hierarchy and spacing resolve, still deliberately colourless. */
function DesignStage() {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-7 shrink-0 items-center gap-1 border-b border-line/80 px-2">
        <span className="h-3 w-3 rounded-full bg-line/80" />
        <span className="h-1.5 w-10 rounded-full bg-line/70" />
        <span className="ml-auto flex items-center gap-1">
          {[0, 1, 2].map((dash) => (
            <span key={dash} className="h-1 w-3 rounded-full bg-line/60" />
          ))}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[1.15fr_auto]">
        <div className="grid min-h-0 grid-cols-[0.48fr_0.52fr]">
          <div className="flex flex-col justify-center gap-1.5 bg-ivory/70 px-2 py-2">
            <span className="block h-2 w-[90%] rounded-full bg-line" />
            <span className="block h-2 w-[70%] rounded-full bg-line/80" />
            <span className="mt-0.5 block h-1 w-[75%] rounded-full bg-line/55" />
            <span className="mt-1 inline-block h-3 w-10 rounded bg-line/70" />
          </div>
          <span className="min-h-0 bg-line/40" />
        </div>

        <div className="grid shrink-0 grid-cols-3 divide-x divide-line/70 border-t border-line/80 bg-ivory/50">
          {[0, 1, 2].map((item) => (
            <span key={item} className="flex flex-col items-center gap-1 px-0.5 py-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-line/55" />
              <span className="h-1 w-8 rounded-full bg-line/55" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 04 — a launched-site mock-up. Hearth & Home (same demo as Web Design / Support)
 * fills the structure Design only sketched in grayscale.
 */
function LiveStage() {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-7 shrink-0 items-center gap-1 border-b border-line px-2">
        <Image
          src={stageAssets.liveLogo}
          alt=""
          width={12}
          height={12}
          className="h-3 w-3 shrink-0 object-contain"
        />
        <span className="truncate font-serif text-[0.55rem] font-semibold tracking-[0.01em] text-ink">
          Hearth &amp; Home
        </span>
        <span className="ml-auto hidden items-center gap-1.5 text-[0.42rem] font-semibold text-ink/55 sm:flex">
          {["Services", "Projects", "About"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[1.15fr_auto]">
        <div className="grid min-h-0 grid-cols-[0.48fr_0.52fr]">
          <div className="flex flex-col justify-center bg-[#243028] px-2 py-2 text-ivory">
            <p className="font-serif text-[0.68rem] font-medium leading-[1.08]">
              Thoughtful spaces, built around you.
            </p>
            <p className="mt-1 text-[0.4rem] leading-[1.35] text-ivory/78">
              Interior design for calm, considered homes.
            </p>
            <span className="mt-1.5 inline-flex w-fit rounded bg-[#174A31] px-1.5 py-0.5 text-[0.38rem] font-semibold text-ivory">
              View our work
            </span>
          </div>
          <div className="relative min-h-0 overflow-hidden">
            <Image
              src={stageAssets.liveImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 120px, 40vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-3 divide-x divide-line border-t border-line bg-[#faf8f4]">
          {["Warm spaces", "Refined detail", "Easy inquiry"].map((label) => (
            <span
              key={label}
              className="px-0.5 py-1.5 text-center text-[0.38rem] font-semibold leading-tight text-ink/75"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
