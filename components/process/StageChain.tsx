import type { CSSProperties } from "react";
import { ArrowRight, Menu } from "lucide-react";

/**
 * Hero progression for /process: one project moving from a rough sketch to a
 * launched site. The four stages mirror the four phases detailed below the
 * fold, so the chain reads as a preview of the page rather than a second story.
 *
 * Deliberately unbranded. The process page tells a Tizirsso-flavoured story in
 * its phase visuals, and `docs/demo-registry.md` rule 6 keeps one brand per
 * page context — so the launched card earns its "finished" read through colour
 * arriving after three monochrome stages, not through a demo brand or photo.
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
    </div>
  );
}

/** 01 — paper, marker, and an image box that is still just a box. */
function SketchStage() {
  return (
    <div className="flex h-full flex-col bg-[#F4EFE3] p-3">
      <p className="rotate-[-1.6deg] font-serif text-[0.9rem] font-medium uppercase tracking-[0.08em] text-ink/70">
        Home
      </p>

      <svg
        viewBox="0 0 100 60"
        className="mt-2.5 w-full"
        fill="none"
        stroke="#55534B"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M2 3 L98 2 L97 58 L3 57 Z" />
        <path d="M3 3 L97 57 M97 3 L3 57" />
      </svg>

      <div className="mt-auto space-y-2.5 pt-3">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full border border-ink/40" />
            <svg
              viewBox="0 0 120 6"
              className="h-1.5 w-full"
              fill="none"
              stroke="#55534B"
              strokeWidth="1.3"
              strokeLinecap="round"
              preserveAspectRatio="none"
            >
              <path d="M0 3 Q 7.5 0.5, 15 3 T 30 3 T 45 3 T 60 3 T 75 3 T 90 3 T 105 3 T 120 3" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 02 — the same content, now with a shape. */
function StructureStage() {
  return (
    <div className="flex h-full flex-col items-center bg-card p-3">
      <span className="rounded border border-line bg-ivory px-2.5 py-1 text-[0.55rem] font-medium text-ink">
        Home
      </span>
      <span className="h-2.5 w-px bg-line" />
      <span className="h-px w-2/3 bg-line" />

      <div className="grid w-full grid-cols-3 gap-1.5">
        {["About", "Services", "Contact"].map((page) => (
          <div key={page} className="flex flex-col items-center">
            <span className="h-2.5 w-px bg-line" />
            <span className="w-full truncate rounded border border-line bg-ivory px-1 py-1 text-center text-[0.45rem] text-ink">
              {page}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto w-full space-y-2 pt-3">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-1.5">
            <span className="h-3 w-2.5 shrink-0 rounded-[1px] border border-line bg-ivory" />
            <span className="h-1.5 flex-1 rounded-full bg-line/80" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** 03 — hierarchy and spacing resolve, still deliberately colourless. */
function DesignStage() {
  return (
    <div className="flex h-full flex-col gap-2 bg-card p-2.5">
      <div className="flex items-center justify-between">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <div className="flex gap-1">
          {[0, 1, 2].map((dash) => (
            <span key={dash} className="h-1 w-3 rounded-full bg-line" />
          ))}
        </div>
      </div>

      <span className="h-[34%] w-full rounded bg-line/75" />

      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((tile) => (
          <span key={tile} className="h-7 rounded bg-line/55" />
        ))}
      </div>

      <div className="mt-auto space-y-1.5">
        <span className="block h-1.5 w-full rounded-full bg-line/70" />
        <span className="block h-1.5 w-4/5 rounded-full bg-line/70" />
        <span className="block h-1.5 w-3/5 rounded-full bg-line/70" />
      </div>
    </div>
  );
}

/** 04 — the payoff. Colour arrives only here, which is what sells "finished". */
function LiveStage() {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex items-center gap-1.5 border-b border-line bg-ivory px-2 py-1.5">
        {["#E06C60", "#E3B341", "#5FA46B"].map((tone) => (
          <span
            key={tone}
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: tone }}
          />
        ))}
        <span className="ml-1 h-1.5 flex-1 rounded-full bg-line/70" />
        <Menu className="h-2.5 w-2.5 text-muted" />
      </div>

      <div
        className="flex flex-1 flex-col justify-end p-2.5"
        style={{
          background:
            "linear-gradient(158deg, #3C6E4E 0%, #2F5B3F 46%, #16301F 100%)",
        }}
      >
        <p className="font-serif text-[0.78rem] font-medium leading-[1.2] text-ivory">
          Built with purpose.
          <br />
          Designed to last.
        </p>
        <span className="mt-2 inline-flex w-fit items-center gap-1 rounded bg-ivory px-1.5 py-1 text-[0.45rem] font-semibold text-forest">
          Get in touch
          <ArrowRight className="h-2 w-2" />
        </span>
      </div>
    </div>
  );
}
