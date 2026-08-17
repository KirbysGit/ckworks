import type { LucideIcon } from "lucide-react";
import { PenLine, Share2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { animDelay } from "@/lib/motion";

/**
 * "Creative + technical split" band for /about, sitting under `WhySection`.
 *
 * Desktop is three parts: an outer Creative column, the Venn, an outer
 * Technical column. The circles only hold the side questions plus the
 * overlap copy; titles and trait lists sit outside so the lens can stay
 * quiet. Mobile stacks the same content.
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
 * Overlap width is `2 * radius - centerGap`. That is the middle column.
 * Raising `radius` while holding or slightly dropping `centerGap` widens the
 * lens; scaling both together just enlarges the drawing. Keep `centerGap`
 * between roughly 1.3x and 1.7x `radius`: tighter and the lens swallows the
 * circles, wider and they pull apart into two separate rings.
 *
 * `leftQuestions` places the three Creative questions in the left crescent.
 * `x` / `y` are CSS lengths. `y` is from the top of the diagram. Positive `x`
 * moves toward the outer rim; the Technical side uses `-x` and the same `y`.
 */

const venn = {
  radius: 110,
  centerGap: 140,
  leftQuestions: [
    { x: "-2rem", y: "22%" },
    { x: "-0.2rem", y: "50%" },
    { x: "-2rem", y: "78%" },
  ],
} as const;

const vennWidth = venn.centerGap + venn.radius * 2; // 360
const vennHeight = venn.radius * 2; // 220
const leftCx = venn.radius; // 110
const rightCx = venn.radius + venn.centerGap; // 250
const overlapWidth = venn.radius * 2 - venn.centerGap; // 80
const sideColumn = vennWidth - venn.radius * 2; // 140

type Side = {
  key: string;
  icon: LucideIcon;
  title: string;
  traits: readonly string[];
  questions: readonly string[];
};

const sides: readonly [Side, Side] = [
  {
    key: "creative",
    icon: PenLine,
    title: "Creative",
    traits: ["Message", "Tone", "Clarity", "Hierarchy"],
    questions: [
      "How should this feel?",
      "What matters first?",
      "How can it be clearer?",
    ],
  },
  {
    key: "technical",
    icon: Share2,
    title: "Technical",
    traits: ["Structure", "Function", "Integrations", "Reliability"],
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
    <section className="border-b border-line/70 bg-ivory py-12 lg:py-16">
      <div className="container-ck">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Creative + Technical Split
            </p>
            <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl lg:text-[3.35rem]">
              I do both sides of the work.
            </h2>
          </div>

          {/* Phone and tablet get the same content stacked. The outer columns
              plus two overlapping circles need horizontal room; below lg
              there is none, and shrinking the diagram makes the text
              illegible. */}
          <div className="mt-10 space-y-3 lg:hidden">
            <div
              className="ck-step rounded-2xl border border-line bg-card px-6 py-7 text-center"
              style={animDelay(stackDelay(0))}
            >
              <OuterColumn side={sides[0]} />
              <CircleQuestions questions={sides[0].questions} className="mt-5" />
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
              <OuterColumn side={sides[1]} />
              <CircleQuestions questions={sides[1].questions} className="mt-5" />
            </div>
          </div>

          <div className="mt-12 hidden items-center gap-8 lg:mt-14 lg:grid lg:grid-cols-[minmax(8rem,0.7fr)_minmax(0,1.5fr)_minmax(8rem,0.7fr)] lg:gap-12">
            <div
              className="ck-step justify-self-end pb-10"
              style={animDelay(splitTiming.creative)}
            >
              <OuterColumn side={sides[0]} />
            </div>

            <div
              className="relative mx-auto w-full max-w-[40rem] overflow-visible"
              style={{ aspectRatio: `${vennWidth} / ${vennHeight}` }}
            >
              <svg
                viewBox={`0 0 ${vennWidth} ${vennHeight}`}
                className="absolute inset-0 h-full w-full overflow-visible"
                overflow="visible"
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
                    strokeWidth={1.25}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {/* Columns match the geometry exactly: left-only region, lens,
                  right-only region. */}
              <div
                className="absolute inset-0 grid"
                style={{
                  gridTemplateColumns: `${sideColumn}fr ${overlapWidth}fr ${sideColumn}fr`,
                }}
              >
                <div
                  className="ck-step relative h-full text-center"
                  style={animDelay(splitTiming.creative)}
                >
                  <CircleQuestions
                    questions={sides[0].questions}
                    compact
                    side="left"
                  />
                </div>

                <div
                  className="ck-step flex min-w-0 items-center justify-center text-center"
                  style={animDelay(splitTiming.meeting)}
                >
                  <MeetingContent compact />
                </div>

                <div
                  className="ck-step relative h-full text-center"
                  style={animDelay(splitTiming.technical)}
                >
                  <CircleQuestions
                    questions={sides[1].questions}
                    compact
                    side="right"
                  />
                </div>
              </div>
            </div>

            <div
              className="ck-step justify-self-start pb-10"
              style={animDelay(splitTiming.technical)}
            >
              <OuterColumn side={sides[1]} />
            </div>
          </div>

          <p className="mt-10 text-center text-lg font-semibold text-ink sm:mt-12 sm:text-lg">
            Most projects need some of both.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function OuterColumn({ side }: { side: Side }) {
  const Icon = side.icon;

  return (
    <div className="text-center">
      <Icon
        className="mx-auto h-7 w-7 text-forest"
        strokeWidth={1.45}
        aria-hidden
      />
      <p className="mt-2.5 font-serif text-[1.65rem] font-semibold tracking-[-0.02em] text-forest lg:text-[1.85rem]">
        {side.title}
      </p>
      <span className="mx-auto mt-2 block h-px w-9 bg-forest/50" aria-hidden />
      <ul className="mt-6 text-[0.95rem] leading-none text-ink">
        {side.traits.map((trait, index) => (
          <li key={trait} className="flex flex-col items-center">
            <span>{trait}</span>
            {index < side.traits.length - 1 ? (
              <span
                className="my-5 size-1 rounded-full bg-forest/50"
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function invertX(value: string) {
  const trimmed = value.trim();
  if (trimmed === "0" || /^0(?:px|rem|em|%)$/.test(trimmed)) return trimmed;
  return trimmed.startsWith("-") ? trimmed.slice(1) : `-${trimmed}`;
}

function CircleQuestions({
  questions,
  compact = false,
  side,
  className = "",
}: {
  questions: readonly string[];
  compact?: boolean;
  side?: "left" | "right";
  className?: string;
}) {
  if (!compact || !side) {
    return (
      <ul
        className={`space-y-3 text-[0.95rem] font-medium leading-7 text-ink ${className}`}
      >
        {questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`absolute inset-0 text-ink ${className}`}>
      {questions.map((question, index) => {
        const place = venn.leftQuestions[index];
        if (!place) return null;
        const x = side === "left" ? invertX(place.x) : place.x;

        return (
          <li
            key={question}
            className="absolute left-1/2 whitespace-nowrap text-[0.86rem] font-medium leading-snug text-ink [text-shadow:0_0_6px_#FAF7F0,0_0_10px_#FAF7F0] lg:text-[0.95rem]"
            style={{
              top: place.y,
              transform: `translate(calc(-50% + ${x}), -50%)`,
            }}
          >
            {question}
          </li>
        );
      })}
    </ul>
  );
}

function VennMark({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={`mx-auto text-forest ${compact ? "h-3.5 w-[1.35rem]" : "h-4 w-6"}`}
      fill="none"
      aria-hidden
    >
      <circle
        cx="8.6"
        cy="8"
        r="6.2"
        stroke="currentColor"
        strokeWidth="1.45"
      />
      <circle
        cx="15.4"
        cy="8"
        r="6.2"
        stroke="currentColor"
        strokeWidth="1.45"
      />
    </svg>
  );
}

function MeetingContent({ compact = false }: { compact?: boolean }) {
  return (
    <div className="text-center">
      <VennMark compact={compact} />
      <p
        className={`mt-3.5 font-medium text-ink ${
          compact
            ? "text-[0.8rem] leading-[1.85] lg:text-[0.9rem]"
            : "text-[0.95rem] leading-[1.9]"
        }`}
      >
        Where
        <br />
        great work
        <br />
        comes
        <br />
        together.
      </p>
    </div>
  );
}
