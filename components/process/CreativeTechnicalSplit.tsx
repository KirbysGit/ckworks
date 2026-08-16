import type { LucideIcon } from "lucide-react";
import { CodeXml, Leaf, PenLine } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { animDelay } from "@/lib/motion";

/**
 * "Creative + technical split" band for /process: a Venn whose overlap is the
 * point of the section.
 *
 * The diagram is one SVG behind a three-column grid, both driven by the same
 * geometry below, so the tinted lens and the middle text column can never
 * drift apart. The lens is the right-hand circle clipped to the left-hand one
 * — the only reliable way to fill an intersection, since two overlapping divs
 * cannot produce a lens shape.
 *
 * Geometry knobs (SVG user units):
 * - `radius`   circle size
 * - `centerGap` distance between the two centres
 *
 * Overlap width is `2 * radius - centerGap`. Keep `centerGap` between roughly
 * 1.3x and 1.7x `radius`: tighter and the lens swallows the circles, wider and
 * they pull apart into two separate rings.
 *
 * `sideTextPad` keeps the side text off the curve. A column is a rectangle but
 * a circle is not: text centred vertically sits at the widest point, yet its
 * first and last lines reach out to where the circle has already narrowed. So
 * each side column is padded asymmetrically — hard on the outer edge, light on
 * the lens side — which lands the text block just inside the arc at its
 * corners and leaves a gap before the overlap begins.
 *
 * Filling the column edge to edge puts every corner outside the circle.
 */
const venn = {
  radius: 100,
  centerGap: 144,
  sideTextPad: { outer: "24%", inner: "6%" },
} as const;

const vennWidth = venn.centerGap + venn.radius * 2; // 344
const vennHeight = venn.radius * 2; // 200
const leftCx = venn.radius; // 100
const rightCx = venn.radius + venn.centerGap; // 244
const overlapWidth = venn.radius * 2 - venn.centerGap; // 56
const sideColumn = vennWidth - venn.radius * 2; // 144

type Side = {
  key: string;
  icon: LucideIcon;
  title: string;
  questions: readonly string[];
};

const sides: readonly [Side, Side] = [
  {
    key: "creative",
    icon: PenLine,
    title: "Creative",
    questions: [
      "How should this feel?",
      "What matters first?",
      "How can it be clearer?",
    ],
  },
  {
    key: "technical",
    icon: CodeXml,
    title: "Technical",
    questions: [
      "How should this work?",
      "What needs to connect?",
      "How do we keep it reliable?",
    ],
  },
] as const;

/**
 * The diagram reads outside-in — both sides land, then the overlap between
 * them. Stacked on phones there is no "between", so that order would fire the
 * bottom card before the middle one; the stack runs plainly top to bottom.
 */
const splitTiming = {
  creative: 140,
  technical: 240,
  meeting: 380,
  stackStart: 140,
  stackGap: 110,
} as const;

const stackDelay = (index: number) =>
  splitTiming.stackStart + index * splitTiming.stackGap;

export default function CreativeTechnicalSplit() {
  return (
    <section className="border-t border-line/70 bg-ivory py-14 lg:py-20">
      <div className="container-ck">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Creative + Technical Split
            </p>
            <h2 className="mt-5 font-serif text-[2.35rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem] lg:text-[3.15rem]">
              I do both sides of the work.
            </h2>
          </div>

          {/* Phone widths get the same content stacked. Two overlapping
              circles need horizontal room; below sm there is none, and
              shrinking the diagram makes the text illegible. */}
          {/* Order mirrors the diagram — the meeting sits between the two
              sides, not after them, so both breakpoints read the same way. */}
          <div className="mt-10 space-y-3 sm:hidden">
            <div
              className="ck-step rounded-2xl border border-line bg-card px-6 py-7 text-center"
              style={animDelay(stackDelay(0))}
            >
              <SideContent side={sides[0]} />
            </div>

            <div
              className="ck-step rounded-2xl border border-line bg-[#F0EBE1] px-6 py-7 text-center"
              style={animDelay(stackDelay(1))}
            >
              <MeetingContent />
            </div>

            <div
              className="ck-step rounded-2xl border border-line bg-card px-6 py-7 text-center"
              style={animDelay(stackDelay(2))}
            >
              <SideContent side={sides[1]} />
            </div>
          </div>

          <div className="relative mx-auto mt-12 hidden aspect-[344/200] w-full max-w-[38rem] sm:block lg:mt-14">
            <svg
              viewBox={`0 0 ${vennWidth} ${vennHeight}`}
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
            >
              <defs>
                <clipPath id="ck-venn-left">
                  <circle cx={leftCx} cy={venn.radius} r={venn.radius} />
                </clipPath>
              </defs>

              {/* The lens: right circle clipped to the left one. */}
              <circle
                cx={rightCx}
                cy={venn.radius}
                r={venn.radius}
                fill="#DDD6C8"
                fillOpacity={0.38}
                clipPath="url(#ck-venn-left)"
              />

              {[leftCx, rightCx].map((cx) => (
                <circle
                  key={cx}
                  cx={cx}
                  cy={venn.radius}
                  r={venn.radius}
                  stroke="#DDD6C8"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {/* Columns match the geometry exactly: left-only region, lens,
                right-only region. */}
            <div
              className="absolute inset-0 grid items-center"
              style={{
                gridTemplateColumns: `${sideColumn}fr ${overlapWidth}fr ${sideColumn}fr`,
              }}
            >
              <div
                className="ck-step text-center"
                style={{
                  ...animDelay(splitTiming.creative),
                  paddingLeft: venn.sideTextPad.outer,
                  paddingRight: venn.sideTextPad.inner,
                }}
              >
                <SideContent side={sides[0]} compact />
              </div>

              <div
                className="ck-step min-w-0 text-center"
                style={animDelay(splitTiming.meeting)}
              >
                <MeetingContent compact />
              </div>

              <div
                className="ck-step text-center"
                style={{
                  ...animDelay(splitTiming.technical),
                  paddingLeft: venn.sideTextPad.inner,
                  paddingRight: venn.sideTextPad.outer,
                }}
              >
                <SideContent side={sides[1]} compact />
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-muted sm:mt-12 sm:text-[0.95rem]">
            Most projects need some of both.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SideContent({ side, compact = false }: { side: Side; compact?: boolean }) {
  const Icon = side.icon;

  return (
    <>
      <Icon
        className={`mx-auto text-forest ${compact ? "h-5 w-5" : "h-6 w-6"}`}
        strokeWidth={1.6}
        aria-hidden
      />
      <p
        className={`mt-3 font-serif font-medium text-forest ${
          compact ? "text-[1.45rem] lg:text-[1.7rem]" : "text-[1.6rem]"
        }`}
      >
        {side.title}
      </p>
      <span className="mx-auto mt-2.5 block h-px w-8 bg-forest/45" aria-hidden />
      {/* Sized so the longest question ("How do we keep it reliable?") stays on
          one line. A wrap there makes the two halves visibly uneven and pushes
          the block's corners out toward the arc. */}
      <ul
        className={`mt-4 space-y-2 text-ink/80 ${
          compact
            ? "whitespace-nowrap text-[0.72rem] md:text-[0.78rem] lg:text-[0.86rem]"
            : "text-[0.92rem]"
        }`}
      >
        {side.questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>
    </>
  );
}

function MeetingContent({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <Leaf
        className={`mx-auto text-forest ${compact ? "h-4 w-4" : "h-5 w-5"}`}
        strokeWidth={1.6}
        aria-hidden
      />
      <p
        className={`mt-2.5 font-medium leading-[1.45] text-ink ${
          compact ? "text-[0.8rem] lg:text-[0.9rem]" : "text-[0.95rem]"
        }`}
      >
        Where great work comes together.
      </p>
    </>
  );
}
