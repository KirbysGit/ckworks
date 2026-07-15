"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Code2,
  FlaskConical,
  Heart,
  Lightbulb,
  Lock,
  Menu,
  MoreVertical,
  PencilRuler,
  Plus,
  Rocket,
  Search,
  Sprout,
  Users,
} from "lucide-react";
import {
  buildConnector,
  cardPlacementStyle,
  heroMockupLayout,
} from "@/lib/heroMockupLayout";
import { floatIn } from "@/lib/motion";

const projectSteps = [
  { icon: Search, label: "Discovery" },
  { icon: Lightbulb, label: "Strategy" },
  { icon: PencilRuler, label: "Design" },
  { icon: Code2, label: "Development" },
  { icon: FlaskConical, label: "Testing" },
  { icon: Rocket, label: "Launch" },
];

const features = [
  {
    icon: Sprout,
    title: "Personalized care",
    caption: "Thoughtful support tailored to you.",
  },
  {
    icon: Users,
    title: "Experienced team",
    caption: "Licensed professionals you can trust.",
  },
  {
    icon: Heart,
    title: "Lasting results",
    caption: "Tools and guidance for real change.",
  },
];

const monthlyStats = [
  { label: "New Inquiries", value: "28", delta: "24%", spark: "0,16 5,15 10,12 15,14 20,9 25,11 31,7 36,10 42,6 48,4 54,7 60,3" },
  { label: "Sessions Completed", value: "96", delta: "18%", spark: "0,15 6,16 11,12 17,13 23,8 29,12 35,7 41,9 47,5 53,6 60,2" },
  { label: "Client Satisfaction", value: "98%", delta: "6%", spark: "0,14 6,13 12,15 18,11 24,12 30,7 36,9 42,5 48,6 54,4 60,2" },
];

function getCurrentMonthLabel() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function getRecentMonthLabels() {
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short" });
  const current = new Date();

  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(current.getFullYear(), current.getMonth() - 4 + index, 1);
    return formatter.format(date);
  });
}

/** Small caps Windermere Wellness brand lockup (leaf + stacked wordmark). */
function WindermereBrand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Image
        src="/svg/hero-demo-logo.svg"
        alt=""
        width={242}
        height={385}
        className={compact ? "h-4 w-auto" : "h-6 w-auto"}
      />
      <span
        className={`font-serif font-semibold leading-tight tracking-[0.22em] text-ink ${
          compact ? "text-[6px]" : "text-[9px]"
        }`}
      >
        WINDERMERE
        <br />
        WELLNESS
      </span>
    </span>
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

function DebugGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-50 opacity-40"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(47, 91, 63, 0.35) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(47, 91, 63, 0.35) 1px, transparent 1px)
        `,
        backgroundSize: "8px 8px",
      }}
    />
  );
}

/**
 * Layered hero composition: Windermere Wellness browser + Project Overview,
 * phone, Monthly Overview dashboard, and post-it. All geometry lives in
 * `lib/heroMockupLayout.ts`. Floating cards render at lg+ only — below
 * that the browser stands alone.
 */
export default function HeroMockup() {
  const {
    scale,
    stage,
    texture,
    cards,
    connectors,
    connectorTiming,
    browser,
    showDebugGrid,
  } = heroMockupLayout;

  const showGrid = showDebugGrid && process.env.NODE_ENV === "development";
  const currentMonth = getCurrentMonthLabel();
  const chartMonths = getRecentMonthLabels();

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <div
        className="relative origin-top"
        style={{
          transform: `scale(${scale})`,
          width: scale !== 1 ? `${100 / scale}%` : undefined,
        }}
      >
        <div className="relative">
          <div
            className="grid-texture pointer-events-none absolute -z-10 opacity-70 [mask-image:radial-gradient(circle_at_center,black_35%,transparent_96%)]"
            style={{
              inset: `-${texture.insetY}px -${texture.insetX}px`,
            }}
          />

          {/* Stage paddings apply at lg+ (via CSS vars); on mobile the
              floating cards are hidden so the browser needs no margins. */}
          <div
            className="relative lg:pb-[var(--spb)] lg:pl-[var(--spl)] lg:pr-[var(--spr)] lg:pt-[var(--spt)]"
            style={
              {
                "--spt": `${stage.paddingTop}px`,
                "--spr": `${stage.paddingRight}px`,
                "--spb": `${stage.paddingBottom}px`,
                "--spl": `${stage.paddingLeft}px`,
              } as React.CSSProperties
            }
          >
            {showGrid && <DebugGrid />}

            {/* ── Main browser: Windermere Wellness ─────────────────── */}
            <motion.div
              variants={floatIn}
              initial="hidden"
              animate="show"
              style={{
                width: `calc((100% + ${browser.expandX}px) / ${browser.scale})`,
                marginLeft: -(browser.expandX / 2),
                transform: `scale(${browser.scale})`,
                transformOrigin: "top left",
              }}
              className="relative z-10 overflow-hidden rounded-2xl border border-line bg-card shadow-float"
            >
              {/* chrome */}
              <div className="flex items-center gap-3 border-b border-line/80 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E5766D]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E8B54D]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#58A66B]" />
                </div>
                <div className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-sand px-3 py-1.5 text-xs text-muted">
                  <Lock className="h-3 w-3" />
                  windermerewellness.com
                </div>
                <Plus className="h-4 w-4 text-muted" />
                <MoreVertical className="h-4 w-4 text-muted" />
              </div>

              {/* site nav */}
              <div className="flex items-center justify-between gap-6 px-6 py-4">
                <WindermereBrand />
                <div className="hidden items-center gap-4 text-[11px] text-muted sm:flex">
                  {["Services", "About", "Approach", "Resources", "Contact"].map(
                    (item) => (
                      <span
                        key={item}
                        className="cursor-pointer transition-colors duration-150 hover:text-ink"
                      >
                        {item}
                      </span>
                    ),
                  )}
                  <span className="cursor-pointer rounded-md bg-forest px-3 py-1.5 text-ivory transition-all duration-150 hover:-translate-y-px hover:bg-[#3D6E4F] hover:shadow-sm">
                    Book a call
                  </span>
                </div>
              </div>

              {/* in-page hero */}
              <div className="grid gap-6 px-6 pb-2 pt-2 sm:grid-cols-[1.1fr_0.95fr]">
                <div>
                  <p className="font-serif text-[23px] font-medium leading-snug text-ink">
                    Care that feels personal. Support that fits{" "}
                    <em className="italic">your life</em>.
                  </p>
                  <p className="mt-3 max-w-[240px] text-[11px] leading-relaxed text-muted">
                    Compassionate therapy and wellness services for individuals
                    and couples in Windermere and the surrounding communities.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="cursor-pointer rounded-md bg-forest px-3.5 py-2 text-[11px] font-medium text-ivory transition-all duration-150 hover:-translate-y-px hover:bg-[#3D6E4F] hover:shadow-sm">
                      Book a call
                    </span>
                    <span className="group cursor-pointer text-[11px] font-medium text-ink transition-colors duration-150 hover:text-forest">
                      Learn more{" "}
                      <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </div>
                <div className="relative hidden min-h-[190px] overflow-hidden rounded-xl sm:block">
                  <Image
                    src="/png/hero-demo-graphic.png"
                    alt=""
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* feature row */}
              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-line/70 px-6 py-5">
                {features.map(({ icon: Icon, title, caption }) => (
                  <div
                    key={title}
                    className="group relative -my-1.5 overflow-hidden rounded-lg px-1 py-1.5 text-center"
                  >
                    {/* green wash: fades in fast (300ms), dissolves slowly
                        (1200ms) after the cursor leaves */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-forest-soft/90 via-forest-soft/35 to-transparent opacity-0 transition-opacity duration-[1200ms] group-hover:opacity-100 group-hover:duration-300"
                      aria-hidden
                    />
                    <div className="relative">
                      <Icon className="mx-auto h-4 w-4 text-forest transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-125" />
                      <p className="mt-1.5 font-serif text-xs font-semibold text-ink">
                        {title}
                      </p>
                      <p className="mx-auto mt-1 hidden max-w-[130px] text-[10px] leading-snug text-muted sm:block">
                        {caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Connectors ──────────────────────────────────────────
                Lines draw in AFTER the cards land: the dotted path is
                always full, but an animated mask (a solid stroke growing
                along the same path) reveals it from start to end. Node
                dots pop in as the line reaches them. Timing lives in
                heroMockupLayout.connectorTiming. */}
            {connectors.map((connector, i) => {
              const { style, width, height, d, dots } =
                buildConnector(connector);
              const { delay, duration } = connectorTiming;
              return (
                /* opacity-0 class keeps pre-hydration frames clean; the
                   fade lifts it right as the branch-out starts */
                <motion.svg
                  key={i}
                  style={style}
                  width={width}
                  height={height}
                  className="z-[15] hidden opacity-0 overflow-visible lg:block"
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: Math.max(0, connectorTiming.delay - 0.05),
                    duration: 0.2,
                  }}
                >
                  <defs>
                    {/* userSpaceOnUse: a straight line has a zero-area
                        bounding box, which breaks the default mask units */}
                    <mask
                      id={`hero-conn-${i}`}
                      maskUnits="userSpaceOnUse"
                      x={-8}
                      y={-8}
                      width={width + 16}
                      height={height + 16}
                    >
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="#fff"
                        strokeWidth={14}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay, duration, ease: "easeInOut" }}
                      />
                    </mask>
                  </defs>
                  <path
                    d={d}
                    fill="none"
                    stroke="#B0A78D"
                    strokeWidth={2}
                    strokeDasharray="0.1 6"
                    strokeLinecap="round"
                    mask={`url(#hero-conn-${i})`}
                  />
                  {dots.map((p, j) => (
                    <motion.circle
                      key={j}
                      cx={p.x}
                      cy={p.y}
                      r={4}
                      fill="#FFFDF8"
                      stroke="#2F5B3F"
                      strokeOpacity={0.7}
                      strokeWidth={2}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay:
                          delay +
                          (dots.length > 1 ? (j / (dots.length - 1)) * duration : 0),
                        duration: 0.25,
                      }}
                    />
                  ))}
                </motion.svg>
              );
            })}

            {/* ── Project Overview — left edge ───────────────────────── */}
            <motion.div
              variants={floatIn}
              initial="hidden"
              animate="show"
              transition={{ delay: cards.projectOverview.delay }}
              style={cardPlacementStyle(cards.projectOverview)}
              className="pointer-events-auto absolute z-20 hidden rounded-xl border border-line bg-card p-3.5 shadow-float lg:block"
            >
              <p className="text-[11px] font-semibold text-ink">
                Project Overview
              </p>
              <ul className="mt-2.5 space-y-2">
                {projectSteps.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="group/step -mx-1.5 flex items-center gap-2 rounded-md px-1.5 py-0.5 text-[10px] text-muted transition-colors duration-200 hover:bg-sand/60 hover:text-ink"
                  >
                    {/* icon chip inverts: sand → forest, icon → ivory */}
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sand transition-colors duration-200 group-hover/step:bg-forest">
                      <Icon className="h-3 w-3 text-forest transition-colors duration-200 group-hover/step:text-ivory" />
                    </span>
                    <span className="transition-transform duration-200 group-hover/step:translate-x-0.5">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── Phone — right edge, overlapping the browser ────────── */}
            <motion.div
              variants={floatIn}
              initial="hidden"
              animate="show"
              transition={{ delay: cards.phone.delay }}
              style={cardPlacementStyle(cards.phone)}
              className="pointer-events-auto absolute z-30 hidden lg:block"
            >
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
                    {/* Dynamic Island — pill + ear fillets into the bezel */}
                    <div
                      className="pointer-events-none absolute left-1/2 top-[-7px] z-30 h-[21px] w-[70px] -translate-x-1/2"
                      aria-hidden
                    >
                      <div className="relative h-full w-full rounded-b-[8px] bg-[#050605] shadow-[0_1px_0_rgba(5,6,5,0.95)]">
                        {/* Ears — same 8px radius as the bottom corners, no top ledge */}
                        <span className="absolute -left-[9px] top-0 h-2 w-2 rounded-br-lg shadow-[8px_0_0_0_#050605]" />
                        <span className="absolute -right-[9px] top-0 h-2 w-2 rounded-bl-lg shadow-[-8px_0_0_0_#050605]" />
                        <span className="absolute left-1/2 top-[9px] h-[2.5px] w-[23px] -translate-x-1/2 rounded-full bg-white/18" />
                      </div>
                    </div>
                    <div className="relative min-h-[348px] bg-card">
                      <PhoneStatusBar />

                      <div className="flex items-center justify-between px-3.5 pt-1">
                        <WindermereBrand compact />
                        <Menu className="h-3.5 w-3.5 text-muted" />
                      </div>

                      <div className="px-3.5 pb-3.5 pt-2">
                        <p className="font-serif text-[11px] font-medium leading-snug text-ink">
                          Care that feels personal. Support that fits{" "}
                          <em className="italic">your life</em>.
                        </p>
                        <span className="mt-2 inline-block cursor-pointer rounded bg-forest px-2 py-1 text-[7px] font-medium text-ivory shadow-[0_4px_10px_-6px_rgba(47,91,63,0.8)] transition-colors duration-150 hover:bg-[#3D6E4F]">
                          Book a call
                        </span>
                        <div className="relative mt-2.5 h-36 overflow-hidden rounded-lg shadow-[0_10px_22px_-18px_rgba(31,36,32,0.7)]">
                          <Image
                            src="/png/hero-demo-graphic.png"
                            alt=""
                            fill
                            sizes="160px"
                            className="object-cover"
                          />
                        </div>
                        <div className="mt-2.5 rounded-xl border border-line/60 bg-[#FBF8F0] p-2 shadow-[0_10px_22px_-20px_rgba(31,36,32,0.55)]">
                          <Sprout className="h-3 w-3 text-forest" />
                          <p className="mt-1 text-[7px] font-semibold text-ink">
                            Personalized care
                          </p>
                          <p className="text-[6px] leading-snug text-muted">
                            Thoughtful support tailored to you.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Monthly Overview — below the browser ───────────────── */}
            <motion.div
              variants={floatIn}
              initial="hidden"
              animate="show"
              transition={{ delay: cards.monthly.delay }}
              style={cardPlacementStyle(cards.monthly)}
              className="pointer-events-auto absolute z-10 hidden rounded-xl border border-line bg-card p-4 shadow-float lg:block"
            >
              <div className="flex items-baseline justify-between">
                <p className="text-[13px] font-semibold text-ink">
                  Monthly Overview
                </p>
                <p className="text-[9px] text-muted" suppressHydrationWarning>
                  {currentMonth}
                </p>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {monthlyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden rounded-lg border border-line/60 bg-sand/50 p-2 transition-colors duration-200 hover:border-forest/30"
                  >
                    {/* soft wash, slow dissolve on leave */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-forest-soft/70 to-transparent opacity-0 transition-opacity duration-[1200ms] group-hover:opacity-100 group-hover:duration-300"
                      aria-hidden
                    />
                    <div className="relative">
                      <p className="truncate text-[8px] text-muted">
                        {stat.label}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-ink">
                        {stat.value}{" "}
                        <span className="text-[8px] font-medium text-forest">
                          ↑ {stat.delta}
                        </span>
                      </p>
                      {/* sparkline redraws itself on hover */}
                      <svg viewBox="0 0 60 20" className="mt-1 h-4 w-full" aria-hidden>
                        <polyline
                          points={stat.spark}
                          pathLength={1}
                          fill="none"
                          stroke="#2F5B3F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="[stroke-dasharray:1] group-hover:animate-[spark-draw_0.8s_ease-out]"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className="group/chart mt-3 border-t border-line/60 pt-2.5">
                <p className="text-[9px] font-semibold text-ink">
                  Inquiries Over Time
                </p>
                <svg viewBox="0 0 368 96" className="mt-1 w-full" aria-hidden>
                  <defs>
                    <linearGradient id="heroArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#2F5B3F" stopOpacity="0.28" />
                      <stop offset="1" stopColor="#2F5B3F" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="heroAreaDeep" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#2F5B3F" stopOpacity="0.5" />
                      <stop offset="1" stopColor="#2F5B3F" stopOpacity="0.04" />
                    </linearGradient>
                  </defs>
                  {/* y labels */}
                  <text x="2" y="22" fontSize="7" fill="#5F665F">40</text>
                  <text x="2" y="52" fontSize="7" fill="#5F665F">20</text>
                  <text x="6" y="82" fontSize="7" fill="#5F665F">0</text>
                  {/* area + hover-deepened area + line (redraws on hover) */}
                  <path
                    d="M18,74 C46,68 62,58 92,61 C122,64 137,50 166,52 C196,54 200,38 228,38 C254,38 260,26 289,28 C316,30 320,42 342,35 C348,33 353,31 356,30 L356,84 L18,84 Z"
                    fill="url(#heroArea)"
                  />
                  <path
                    d="M18,74 C46,68 62,58 92,61 C122,64 137,50 166,52 C196,54 200,38 228,38 C254,38 260,26 289,28 C316,30 320,42 342,35 C348,33 353,31 356,30 L356,84 L18,84 Z"
                    fill="url(#heroAreaDeep)"
                    className="opacity-0 transition-opacity duration-[1200ms] group-hover/chart:opacity-100 group-hover/chart:duration-500"
                  />
                  <path
                    d="M18,74 C46,68 62,58 92,61 C122,64 137,50 166,52 C196,54 200,38 228,38 C254,38 260,26 289,28 C316,30 320,42 342,35 C348,33 353,31 356,30"
                    fill="none"
                    stroke="#2F5B3F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    className="[stroke-dasharray:1] group-hover/chart:animate-[spark-draw_1.1s_ease-out]"
                  />
                  {/* x labels */}
                  <text x="14" y="94" fontSize="7" fill="#5F665F" suppressHydrationWarning>{chartMonths[0]}</text>
                  <text x="90" y="94" fontSize="7" fill="#5F665F" suppressHydrationWarning>{chartMonths[1]}</text>
                  <text x="174" y="94" fontSize="7" fill="#5F665F" suppressHydrationWarning>{chartMonths[2]}</text>
                  <text x="259" y="94" fontSize="7" fill="#5F665F" suppressHydrationWarning>{chartMonths[3]}</text>
                  <text x="344" y="94" fontSize="7" fill="#5F665F" suppressHydrationWarning>{chartMonths[4]}</text>
                </svg>
              </div>
            </motion.div>

            {/* ── Post-it — bottom right, blank foundation ───────────── */}
            <motion.div
              variants={floatIn}
              initial="hidden"
              animate="show"
              transition={{ delay: cards.postIt.delay }}
              style={cardPlacementStyle(cards.postIt)}
              className="pointer-events-auto absolute z-20 hidden lg:block"
            >
              {/* hover deepens the tilt a touch — feels like nudging paper */}
              <div className="relative aspect-[0.92] w-full -rotate-2 rounded-xl border border-[#EDE6D0]/65 bg-gradient-to-br from-[#FEFCF5] via-[#FBF7EB] to-[#F5EFD9] shadow-float transition-transform duration-300 hover:-rotate-3">
                {/* subtle top "adhesive strip" */}
                <div className="absolute inset-x-0 top-0 h-5 rounded-t-xl bg-white/30" />
                {
                  <Image
                    src="/svg/hero-postit.svg"
                    alt=""
                    fill
                    className="object-contain px-1"
                  />
                }
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
