"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Lock,
  Menu,
  MoreVertical,
  Plus,
  UserRound,
} from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { fadeUp, stagger, inView } from "@/lib/motion";

type Note = {
  label: string;
  src: string;
  tone: "sage" | "cream" | "yellow";
  /** Paper placement/size as percentages of the before board. */
  paper: {
    x: number;
    y: number;
    size: number;
    /** Rotation in degrees. Negative tilts left, positive tilts right. */
    rotate: number;
  };
  /** Handwriting SVG placement/size as percentages inside the paper. */
  text: {
    x: number;
    y: number;
    size: number;
    rotate?: number;
  };
};

/**
 * Before-board coordinates are percentages of the board.
 * Shift everything up so the topmost asset no longer leaves a large
 * empty band above the composition. Tweak this one value to retune.
 */
const BEFORE_Y_SHIFT = 10;

/** Apply the shared vertical shift to a before-board y coordinate. */
function beforeY(y: number) {
  return y - BEFORE_Y_SHIFT;
}

const notes: Note[] = [
  {
    label: "Who is this for?",
    src: "/images/transformation/svg/sticky-who.svg",
    tone: "sage",
    paper: { x: 18, y: 16, size: 18, rotate: -6 },
    text: { x: 11, y: 11, size: 80 },
  },
  {
    label: "Calm, foresty, earthy feel",
    src: "/images/transformation/svg/sticky-calm.svg",
    tone: "cream",
    paper: { x: 42, y: 28, size: 18, rotate: 3 },
    text: { x: 2, y: 2, size: 95 },
  },
  {
    label: "Better intake flow for customers",
    src: "/images/transformation/svg/sticky-better.svg",
    tone: "sage",
    paper: { x: 66, y: 12, size: 18, rotate: 4 },
    text: { x: 8, y: 5, size: 88 },
  },
  {
    label: "Minimal layout, but stronger color",
    src: "/images/transformation/svg/sticky-minimal.svg",
    tone: "cream",
    paper: { x: 22, y: 60, size: 18, rotate: 5 },
    text: { x: 6, y: 6, size: 90 },
  },
  {
    label: "Make services clearer",
    src: "/images/transformation/svg/sticky-make.svg",
    tone: "sage",
    paper: { x: 47, y: 68, size: 18, rotate: 3 },
    text: { x: 7, y: 8, size: 88 },
  },
  {
    label: "Feels warm, not clinical",
    src: "/images/transformation/svg/sticky-feels.svg",
    tone: "cream",
    paper: { x: 78, y: 42, size: 18, rotate: 4 },
    text: { x: 5, y: 3, size: 90 },
  },
  {
    label: "Easy booking",
    src: "/images/transformation/svg/sticky-easy.svg",
    tone: "yellow",
    paper: { x: 72, y: 68, size: 18, rotate: -1 },
    text: { x: 8, y: 5, size: 88 },
  },
];

type BeforeAsset = {
  src: string;
  alt: string;
  x: number;
  y: number;
  width: number;
  rotate: number;
  opacity?: number;
};

type Point = {
  x: number;
  y: number;
};

type BeforeArrow = {
  id: string;
  from: Point;
  to: Point;
  /** Curve handles as percentages of the before board. */
  curve: [Point, Point];
  dashed?: boolean;
  opacity?: number;
  strokeWidth?: number;
};

const beforeAssets: BeforeAsset[] = [
  {
    src: "/images/transformation/svg/forest.svg",
    alt: "",
    x: 0,
    y: 28,
    width: 34,
    rotate: -2,
    opacity: 0.64,
  },
  {
    src: "/images/transformation/svg/site.svg",
    alt: "",
    x: 3,
    y: 66,
    width: 18,
    rotate: -5,
    opacity: 0.58,
  },
  {
    src: "/images/transformation/svg/checkbox.svg",
    alt: "",
    x: 90,
    y: 9,
    width: 14,
    rotate: -7,
    opacity: 0.66,
  },
  {
    src: "/images/transformation/svg/fern.svg",
    alt: "",
    x: 88,
    y: 76,
    width: 18,
    rotate: 7,
    opacity: 0.58,
  },
];

const beforeArrows: BeforeArrow[] = [
  {
    id: "who-to-calm",
    from: { x: 38, y: 20 },
    curve: [
      { x: 42, y: 16 },
      { x: 48, y: 18 },
    ],
    to: { x: 48, y: 25 },
    opacity: 0.72,
  },
  {
    id: "calm-to-better",
    from: { x: 53, y: 26 },
    curve: [
      { x: 55, y: 16 },
      { x: 60, y: 13},
    ],
    to: { x: 64, y: 16 },
    opacity: 0.72,
  },
  {
    id: "calm-to-feels",
    from: { x: 62, y: 36 },
    curve: [
      { x: 93, y: 37 },
      { x: 48, y: 46 },
    ],
    to: { x: 76, y: 50 },
    dashed: true,
    opacity: 0.58,
  },
  {
    id: "site-to-make",
    from: { x: 22, y: 88 },
    curve: [
      { x: 25, y: 92 },
      { x: 35, y: 94 },
    ],
    to: { x: 44, y: 86 },
    dashed: true,
    opacity: 0.5,
  },
  {
    id: "make-to-calm",
    from: { x: 56, y: 67 },
    curve: [
      { x: 62, y: 64 },
      { x: 66, y: 60 },
    ],
    to: { x: 60, y: 52 },
    dashed: true,
    opacity: 0.58,
  },
  {
    id: "minimal-to-calm",
    from: { x: 33, y: 58 },
    curve: [
      { x: 40, y: 40 },
      { x: 46, y: 64 },
    ],
    to: { x: 50, y: 51},
    dashed: true,
    opacity: 0.58,
  },
  {
    id: "easy-to-feels",
    from: { x: 70, y: 68 },
    curve: [
      { x: 64, y: 50 },
      { x: 72, y: 53 },
    ],
    to: { x: 76, y: 54},
    dashed: true,
    opacity: 0.58,
  },
  {
    id: "checklist-to-feels",
    from: { x: 92, y: 28 },
    curve: [
      { x: 80, y: 32 },
      { x: 105, y: 37 },
    ],
    to: { x: 88, y: 40 },
    opacity: 0.64,
  },
];

const mobileNotes = notes.slice(0, 6);

const noteTones: Record<Note["tone"], string> = {
  sage: "bg-[#d8d8bd]",
  cream: "bg-[#efe6d3]",
  yellow: "bg-[#ead77e]",
};

const inquirySteps = [
  { label: "Intake form submitted", done: true },
  { label: "Automated welcome sent", done: true },
  { label: "Care team notified", done: true },
  {
    label: "Discovery call booked",
    done: false,
    icon: CalendarCheck,
    badge: "Confirmed",
  },
];


export default function TransformationSection() {
  return (
    <section className="overflow-hidden bg-ivory pb-14 pt-6 lg:pb-20 lg:pt-8">
      <div className="container-ck">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.div variants={fadeUp}>
            <SectionHeader
              label="The Difference"
              title="From scattered ideas to a clearer digital presence."
              subtitle="We turn ideas into intentional, calming experiences that connect with your audience and drive real results."
            />
          </motion.div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_3.5rem_minmax(0,1.05fr)] xl:items-start">
            <motion.div variants={fadeUp}>
              <BeforeBoard />
            </motion.div>
            <motion.div variants={fadeUp}>
              <BetweenArrow />
            </motion.div>
            <motion.div variants={fadeUp}>
              <AfterBoard />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BeforeBoard() {
  return (
    <div className="mx-auto max-w-[44rem]">
      <div>
        <h3 className="font-serif text-4xl font-medium leading-none text-ink sm:text-5xl">
          Before
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-forest">
          The starting point
        </p>
      </div>

      <div className="mt-0 grid gap-1 sm:hidden">
        {mobileNotes.map((note) => (
          <PostIt key={note.label} note={note} compact />
        ))}
      </div>

      <div className="relative mt-3 hidden h-[31.5rem] sm:block">
        {beforeAssets.map((asset) => (
          <BeforeAssetImage key={asset.src} asset={asset} />
        ))}

        <BeforeArrows />

        {notes.map((note) => (
          <PostIt key={note.label} note={note} />
        ))}
      </div>
    </div>
  );
}

function BeforeAssetImage({ asset }: { asset: BeforeAsset }) {
  return (
    <img
      src={asset.src}
      alt={asset.alt}
      className="pointer-events-none absolute h-auto select-none"
      style={{
        left: `${asset.x}%`,
        top: `${beforeY(asset.y)}%`,
        width: `${asset.width}%`,
        opacity: asset.opacity ?? 0.62,
        transform: `rotate(${asset.rotate}deg)`,
      }}
    />
  );
}

function BetweenArrow() {
  return (
    <div className="hidden h-full min-h-[34rem] items-center justify-center xl:flex">
      <div className="flex h-full min-h-[28rem] flex-col items-center justify-center text-forest">
        <span className="w-px flex-1 border-l-2 border-dotted border-forest/45" />
        <span className="my-4 flex h-8 w-8 items-center justify-center rounded-full border border-forest/25 bg-ivory shadow-soft">
          <ArrowRight className="h-4 w-4" />
        </span>
        <span className="w-px flex-1 border-l-2 border-dotted border-forest/45" />
      </div>
    </div>
  );
}

function PostIt({ note, compact = false }: { note: Note; compact?: boolean }) {
  const { paper, text } = note;

  return (
    <div
      className={`${compact ? "relative" : "absolute z-20"} ${
        noteTones[note.tone]
      } group aspect-square w-full max-w-[8.5rem] rounded-[3px] shadow-[0_2px_4px_rgba(31,36,32,0.07),0_14px_18px_-17px_rgba(31,36,32,0.62)]`}
      style={
        compact
          ? undefined
          : {
              left: `${paper.x}%`,
              top: `${beforeY(paper.y)}%`,
              width: `${paper.size}%`,
              transform: `rotate(${paper.rotate}deg)`,
            }
      }
      aria-label={note.label}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[3px] bg-[linear-gradient(140deg,rgba(255,255,255,0.22),transparent_38%,rgba(31,36,32,0.055)_100%)]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-3 rounded-t-[3px] bg-[linear-gradient(180deg,rgba(31,36,32,0.055),transparent)]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-[-0.32rem] left-[14%] right-[14%] h-3 rounded-[50%] bg-ink/15 blur-md"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute bottom-[-1px] left-[10%] right-[20%] h-4 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(31,36,32,0.1),transparent_68%)] blur-sm"
        aria-hidden
      />
      <span
        className="absolute bottom-0 right-0 h-5 w-5 rounded-tl-sm bg-[linear-gradient(135deg,rgba(31,36,32,0.14),rgba(255,255,255,0.36)_48%,rgba(255,255,255,0.02)_50%)]"
        aria-hidden
      />

      <span
        className="pointer-events-none absolute z-10 flex items-center justify-center"
        style={{
          left: `${text.x}%`,
          top: `${text.y}%`,
          width: `${text.size}%`,
          height: `${text.size}%`,
          transform: `rotate(${text.rotate ?? 0}deg)`,
        }}
        aria-hidden
      >
        <img
          src={note.src}
          alt=""
          className="h-full w-full select-none object-contain"
        />
      </span>
    </div>
  );
}

function BeforeArrows() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full text-forest"
      aria-hidden
    >
      <defs>
        <marker
          id="before-arrowhead"
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="7"
          refY="4"
          viewBox="0 0 8 8"
        >
          <path
            d="M0.8 0.7 7.2 4 0.8 7.3 2.2 4Z"
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.35"
          />
        </marker>
      </defs>
      {beforeArrows.map((arrow) => {
        const d = arrowPathD(arrow);
        const dash = arrow.dashed ? "1.45 1.25" : undefined;
        const strokeWidth = arrow.strokeWidth ?? 0.68;

        return (
          <g key={arrow.id}>
            <path
              d={d}
              fill="none"
              stroke="#FAF7F0"
              strokeDasharray={dash}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.9"
              strokeWidth={strokeWidth + 0.5}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={d}
              fill="none"
              markerEnd="url(#before-arrowhead)"
              stroke="currentColor"
              strokeDasharray={dash}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity={Math.max(arrow.opacity ?? 0.72, 0.72)}
              strokeWidth={strokeWidth}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}

function arrowPathD(arrow: BeforeArrow) {
  const [c1, c2] = arrow.curve;

  return `M ${arrow.from.x} ${beforeY(arrow.from.y)} C ${c1.x} ${beforeY(c1.y)} ${c2.x} ${beforeY(c2.y)} ${arrow.to.x} ${beforeY(arrow.to.y)}`;
}

function AfterBoard() {
  return (
    <div className="mx-auto max-w-[49rem]">
      <div className="xl:pl-5">
        <h3 className="font-serif text-4xl font-medium leading-none text-ink sm:text-5xl">
          After
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-forest">
          Clear and connected
        </p>
      </div>

      <div className="relative mt-3 min-h-[29.5rem] sm:min-h-[31rem]">
        <div className="relative z-10 sm:pr-[3.6rem] lg:pr-[4rem]">
          <BrowserPreview />
        </div>
        <AfterConnector />
        <InquiryCard />
        <PhonePreview />
      </div>

    </div>
  );
}

function BrowserPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-card shadow-float">
      <div className="flex items-center gap-3 border-b border-line/80 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5766D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8B54D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#58A66B]" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-sand px-3 py-1.5 text-[10px] text-muted">
          <Lock className="h-3 w-3" />
          windermerewellness.com
        </div>
        <Plus className="hidden h-4 w-4 text-muted sm:block" />
        <MoreVertical className="hidden h-4 w-4 text-muted sm:block" />
      </div>

      <div className="flex items-center justify-between gap-6 px-5 py-3.5">
        <MiniBrand />
        <div className="hidden items-center gap-3 text-[10px] text-muted md:flex">
          {["Services", "About", "Approach", "Resources", "Contact"].map(
            (item) => (
              <span key={item}>{item}</span>
            ),
          )}
          <span className="rounded-md bg-forest px-3 py-1.5 text-ivory">
            Book a call
          </span>
        </div>
      </div>

      <div className="relative min-h-[18.35rem] overflow-hidden">
        <Image
          src="/images/transformation/png/after-demo.png"
          alt=""
          fill
          sizes="560px"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,#FFFDF8_0%,rgba(255,253,248,0.96)_25%,rgba(255,253,248,0.72)_48%,rgba(255,253,248,0.1)_72%,transparent_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-y-0 left-0 w-2/3 bg-[radial-gradient(circle_at_28%_42%,rgba(255,253,248,0.9),rgba(255,253,248,0)_58%)]"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[15rem] max-w-[18.5rem] flex-col justify-center px-5 py-5">
          <h4 className="font-serif text-2xl font-medium leading-tight text-ink sm:text-[2.3rem]">
            Calm. Clarity. Real change.
          </h4>
          <p className="mt-4 max-w-[15rem] text-xs leading-5 text-ink/75 sm:text-sm sm:leading-6">
            Whole-person care for stress, sleep, and everyday balance.
          </p>
          <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-md bg-forest px-4 py-2.5 text-xs font-medium text-ivory shadow-soft">
            Book a call
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function InquiryCard() {
  return (
    <div className="absolute left-[-1.5rem] top-[22.35rem] z-30 hidden w-[13.5rem] rounded-xl border border-line bg-card/95 p-3 shadow-float backdrop-blur sm:block">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <UserRound className="h-3.5 w-3.5 shrink-0 text-ink/70" />
          <p className="text-[10px] font-semibold text-ink">New inquiry</p>
        </div>
        <span className="shrink-0 rounded-full bg-forest-soft px-2 py-1 text-[8px] font-semibold text-forest">
          Received
        </span>
      </div>

      <div className="mt-2.5 border-t border-line/80" />

      <ul className="mt-2.5 space-y-2">
        {inquirySteps.map(({ label, done, icon: Icon, badge }) => (
          <li key={label} className="grid grid-cols-[1rem_1fr_auto] items-center gap-x-2">
            {done ? (
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-forest">
                <Check className="h-2.5 w-2.5 text-ivory" strokeWidth={3} />
              </span>
            ) : Icon ? (
              <Icon className="h-4 w-4 text-ink/55" strokeWidth={1.75} />
            ) : (
              <span className="h-4 w-4" />
            )}
            <span className="truncate text-[9px] font-medium leading-none text-ink/80">
              {label}
            </span>
            {badge ? (
              <span className="rounded-full bg-forest-soft px-2 py-0.5 text-[8px] font-semibold text-forest">
                {badge}
              </span>
            ) : (
              <span />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * After connector (dotted L from inquiry card → phone).
 * Tune with these — units are rem unless noted.
 */
const afterConnectorLayout = {
  /** Overall size multiplier (1 = current base size) */
  scale: 0.82,
  /** Extra offset down from the base top (rem) */
  offsetY: 5.25,
  /** Extra offset right from the base left (rem) */
  offsetX: 0,
  /** Base position before offsets (rem) */
  left: 8.7,
  top: 17.1,
  /** Base box size before scale (rem) */
  width: 8.7,
  height: 7.4,
} as const;

function AfterConnector() {
  const { scale, offsetX, offsetY, left, top, width, height } =
    afterConnectorLayout;

  return (
    <svg
      viewBox="0 0 138 118"
      className="pointer-events-none absolute z-[1] hidden text-forest sm:block"
      style={{
        left: `${left + offsetX}rem`,
        top: `${top + offsetY}rem`,
        width: `${width * scale}rem`,
        height: `${height * scale}rem`,
      }}
      aria-hidden
    >
      <path
        d="M1 116H82C112 116 116 96 116 74V1"
        fill="none"
        stroke="currentColor"
        strokeDasharray="1 7"
        strokeLinecap="round"
        strokeWidth="2"
        opacity="0.55"
      />
    </svg>
  );
}


function CellularSignal() {
  return (
    <span className="flex h-[6px] items-end gap-px" aria-hidden>
      {[1.5, 2.5, 3.5, 5].map((height, index) => (
        <span
          key={height}
          className="w-px rounded-full bg-ink"
          style={{ height, opacity: index === 3 ? 0.85 : 1 }}
        />
      ))}
    </span>
  );
}

function WifiSignal() {
  return (
    <svg
      viewBox="0 0 14 10"
      className="h-[5px] w-[7px] text-ink"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 3.8C4.95 1.75 9.05 1.75 12 3.8"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
      />
      <path
        d="M4.35 6C5.9 4.95 8.1 4.95 9.65 6"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
      />
      <path
        d="M6.5 8C6.8 7.8 7.2 7.8 7.5 8"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <span className="relative inline-flex h-[4px] w-[9px]" aria-hidden>
      <span className="absolute inset-0 rounded-[1px] border border-ink/80" />
      <span className="absolute bottom-[1px] right-[-1.5px] top-[1px] w-px rounded-r bg-ink/70" />
      <span className="absolute bottom-[1px] left-[1px] top-[1px] w-[5.5px] rounded-[0.5px] bg-ink" />
    </span>
  );
}

function PhoneStatusBar() {
  return (
    <div className="relative z-20 flex h-[18px] items-center justify-between px-4 pt-0.5">
      <span className="pl-0.5 text-[5.5px] font-semibold leading-none text-ink">
        9:41
      </span>
      <span className="flex items-center justify-end gap-[1px]">
        <CellularSignal />
        <WifiSignal />
        <BatteryIcon />
      </span>
    </div>
  );
}

function MiniBrand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Image
        src="/images/hero/svg/demo-logo.svg"
        alt=""
        width={242}
        height={385}
        className={compact ? "h-4 w-auto" : "h-5 w-auto"}
      />
      <span
        className={`font-serif font-semibold leading-tight tracking-[0.22em] text-ink ${
          compact ? "text-[6px]" : "text-[8px]"
        }`}
      >
        WINDERMERE
        <br />
        WELLNESS
      </span>
    </span>
  );
}

function PhonePreview() {
  return (
    <div className="absolute right-[-1.1rem] top-[7.45rem] z-40 hidden w-[172px] sm:block lg:right-[-2.15rem]">
      <div className="relative rounded-[36px] bg-[linear-gradient(145deg,#050605_0%,#181B18_30%,#6F746C_43%,#FFF9EA_49%,#3C423B_56%,#060706_74%,#161A16_100%)] p-[2px] shadow-[0_16px_34px_-16px_rgba(17,23,20,0.58),0_5px_12px_-6px_rgba(17,23,20,0.48)]">
        <span
          className="pointer-events-none absolute inset-[1px] rounded-[35px] bg-[radial-gradient(circle_at_28%_7%,rgba(255,255,255,0.38),transparent_22%),linear-gradient(160deg,rgba(255,255,255,0.18),transparent_34%,rgba(0,0,0,0.42)_72%)] opacity-70"
          aria-hidden
        />
        <span
          className="absolute -left-[2px] top-20 h-10 w-[3px] rounded-l-full bg-[linear-gradient(180deg,#2F342F,#080A08)]"
          aria-hidden
        />
        <div className="relative rounded-[34px] bg-[linear-gradient(145deg,#030403_0%,#0C0F0C_45%,#272D27_58%,#050605_100%)] p-[4px] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.16),inset_-2px_-2px_4px_rgba(0,0,0,0.82)]">
          <div className="relative overflow-hidden rounded-[29px] bg-card shadow-[inset_0_0_0_1px_rgba(31,36,32,0.04)]">
            <div
              className="pointer-events-none absolute left-1/2 top-[-7px] z-30 h-[21px] w-[70px] -translate-x-1/2"
              aria-hidden
            >
              <div className="relative h-full w-full rounded-b-[8px] bg-[#050605] shadow-[0_1px_0_rgba(5,6,5,0.95)]">
                <span className="absolute -left-[9px] top-0 h-2 w-2 rounded-br-lg shadow-[8px_0_0_0_#050605]" />
                <span className="absolute -right-[9px] top-0 h-2 w-2 rounded-bl-lg shadow-[-8px_0_0_0_#050605]" />
                <span className="absolute left-1/2 top-[9px] h-[2.5px] w-[23px] -translate-x-1/2 rounded-full bg-white/18" />
              </div>
            </div>

            <div className="relative min-h-[348px] bg-card">
              <PhoneStatusBar />

              <div className="flex items-center justify-between px-3.5 pt-1">
                <MiniBrand compact />
                <Menu className="h-3.5 w-3.5 text-muted" />
              </div>

              <div className="px-3.5 pb-3.5 pt-9">
                <h5 className="font-serif text-[1.4rem] font-medium leading-[0.98] text-ink">
                  Calm. Clarity. Real change.
                </h5>
                <p className="mt-3 text-[7.5px] leading-snug text-ink/75">
                  Whole-person care for stress, sleep, and everyday balance.
                </p>
                <span className="mt-3 block rounded bg-forest px-2 py-1.5 text-center text-[7px] font-medium text-ivory shadow-[0_4px_10px_-6px_rgba(47,91,63,0.8)]">
                  Book a call
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-[116px] overflow-hidden">
                <Image
                  src="/images/transformation/png/after-demo.png"
                  alt=""
                  fill
                  sizes="170px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
