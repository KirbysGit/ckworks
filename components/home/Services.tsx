"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  animate,
  motion,
  useInView as useMotionInView,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ChartNoAxesColumn,
  Filter,
  Search,
  Sparkle,
  Target,
  UserRound,
} from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import {
  SupportServiceVisual,
  SystemsServiceVisual,
} from "./ServiceWideVisuals";
import { trackEvent } from "@/lib/analytics";
import { fadeUp, stagger, inView } from "@/lib/motion";
import { serviceAreas, type ServiceSlug } from "@/lib/services";

type VisualKind =
  | "website"
  | "search"
  | "systems"
  | "integrations"
  | "support";

/**
 * `tall` cards stack icon over copy and sit three across. `wide` cards put the
 * icon beside the copy and take half the row, which gives their multi-panel
 * visuals room to breathe.
 */
type CardLayout = "tall" | "wide";

type HomeServiceConfig = {
  slug: ServiceSlug;
  description?: string;
  tags: string[];
  visual: VisualKind;
  layout: CardLayout;
};

// Homepage cards stay deliberately brief; each leads to the fuller service page.
const homeServiceCards: HomeServiceConfig[] = [
  {
    slug: "web-design-development",
    description:
      "Clear, responsive websites that explain what your business does, build confidence quickly, and make the next step easy to take.",
    tags: ["Websites", "Mobile-ready", "Messaging"],
    visual: "website",
    layout: "tall",
  },
  {
    slug: "search-ai-visibility",
    tags: ["SEO", "Local search", "AI visibility"],
    visual: "search",
    layout: "tall",
  },
  {
    slug: "analytics-lead-tracking",
    tags: ["Analytics", "Tracking", "Reporting"],
    visual: "systems",
    layout: "tall",
  },
  {
    slug: "digital-systems-integrations",
    tags: ["Dashboards", "Automation", "APIs"],
    visual: "integrations",
    layout: "wide",
  },
  {
    slug: "ongoing-support",
    tags: ["Updates", "Fixes", "Improvements"],
    visual: "support",
    layout: "wide",
  },
];

const homeServices = homeServiceCards.map((config) => {
  const service = serviceAreas.find((area) => area.slug === config.slug);

  if (!service) {
    throw new Error(`Missing service configuration for ${config.slug}`);
  }

  return { ...service, ...config };
});

export default function Services() {
  return (
    <section id="what-i-do" className="bg-ivory py-12 md:py-14 lg:py-20">
      <div className="container-ck">
        <SectionHeader
          label="What I Do"
          title="A few ways I can help your business."
          subtitle="From websites and search visibility to reporting, systems, and ongoing support, I help make the digital side of your business easier to run."
          className="text-center md:text-left [&_h2]:mx-auto [&_p]:mx-auto md:[&_h2]:mx-0 md:[&_p]:mx-0"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-8 space-y-3 md:hidden"
        >
          {homeServices.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.slug}
                variants={fadeUp}
                className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-shadow duration-200 hover:shadow-lift"
              >
                <Link
                  href={service.href}
                  onClick={() =>
                    trackEvent("service_viewed", {
                      service: service.title,
                      surface: "homepage-mobile",
                    })
                  }
                  className="flex items-center gap-4 p-4 text-left"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-forest-soft/75">
                    <Icon className="h-6 w-6 text-forest" strokeWidth={1.8} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-[1.45rem] font-semibold leading-tight text-ink">
                      {service.title}
                    </span>
                    {/* Clamped, not shortened. The full description still
                        ships in the HTML — it also feeds each service page's
                        meta description and the OfferCatalog schema — so the
                        card can show two lines without costing anything. The
                        whole card links onward, which is the "read more". */}
                    {/* No `block` here: `line-clamp-2` needs
                        `display: -webkit-box`, and a `block` utility on the
                        same element wins the cascade and silently disables it. */}
                    <span className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted">
                      {service.description}
                    </span>
                  </span>

                  <ArrowRight className="h-5 w-5 shrink-0 text-forest" />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-6"
        >
          {homeServices.map((service, index) => {
            const Icon = service.icon;
            const isWide = service.layout === "wide";
            // The two wide cards take half the row each; index 4 still centers
            // itself at `md`, where it is the odd card on its own line.
            const cardPlacement =
              index === 3
                ? "xl:col-span-3"
                : index === 4
                  ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.5rem)] xl:col-span-3 xl:mx-0 xl:w-auto"
                  : "xl:col-span-2";

            return (
              <motion.div
                key={service.slug}
                variants={fadeUp}
                className={`h-full ${cardPlacement}`}
              >
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-forest/30 hover:shadow-lift ${
                    isWide ? "" : "min-h-[26rem]"
                  }`}
                >
                  <div className={isWide ? "flex items-start gap-4" : "flex flex-col"}>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-soft">
                      <Icon className="h-5 w-5 text-forest" />
                    </span>

                    <div className={isWide ? "min-w-0 flex-1" : "mt-5"}>
                      <h3 className="font-serif text-[1.7rem] font-semibold leading-tight text-ink">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {service.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-forest-soft/75 px-2.5 py-1 text-[11px] font-medium text-forest"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ServiceVisual kind={service.visual} />

                  <div className="mt-auto pt-5">
                    <Link
                      href={service.href}
                      onClick={() =>
                        trackEvent("service_viewed", {
                          service: service.title,
                          surface: "homepage-desktop",
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors duration-200 hover:text-ink"
                    >
                      Explore service
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// Shared height keeps the top-row service previews visually level.
const homepageVisual = {
  height: "h-44",
} as const;

type TwinHills = {
  /** Half-width of each hill. */
  halfWidth: number;
  /** Left peak y — lower = taller. */
  leftPeakY: number;
  /** Right peak y — lower = taller. */
  rightPeakY: number;
  /** Center x of the left hill. */
  leftCenter: number;
  /** Center x of the right hill. */
  rightCenter: number;
  /** Vertical inset for crest + trough Q shoulders (same rounding both ways). */
  round: number;
  opacity: number;
};

/**
 * One silhouette: two isosceles hills joined by a rounded trough.
 * Crest Q control = geometric tip; trough Q control = slope intersection
 * (inverse of the crest) so every curve matches the slope it flows into.
 */
function buildTwinHillsPath({
  halfWidth: w,
  leftPeakY: p1,
  rightPeakY: p2,
  leftCenter: c1,
  rightCenter: c2,
  round,
}: TwinHills) {
  const baseY = 72;
  const h1 = baseY - p1;
  const h2 = baseY - p2;

  // Trough where the inner slopes would meet (handles unequal peak heights).
  const span = c2 - c1;
  const troughY =
    (span / w + p1 / h1 + p2 / h2) / (1 / h1 + 1 / h2);
  const troughX = c1 + w * ((troughY - p1) / h1);

  const onSlope = (
    center: number,
    peakY: number,
    height: number,
    side: 1 | -1,
    y: number,
  ) => {
    const t = (y - peakY) / height;
    return [center + side * w * t, y] as const;
  };

  const crest1 = Math.min(round, (troughY - p1) * 0.45);
  const crest2 = Math.min(round, (troughY - p2) * 0.45);
  const troughRound = Math.min(
    round,
    (troughY - p1) * 0.45,
    (troughY - p2) * 0.45,
  );

  const p1Y = p1 + crest1;
  const [p1l, p1r] = [
    onSlope(c1, p1, h1, -1, p1Y),
    onSlope(c1, p1, h1, 1, p1Y),
  ];

  const tY = troughY - troughRound;
  const [tL, tR] = [
    onSlope(c1, p1, h1, 1, tY),
    onSlope(c2, p2, h2, -1, tY),
  ];

  const p2Y = p2 + crest2;
  const [p2l, p2r] = [
    onSlope(c2, p2, h2, -1, p2Y),
    onSlope(c2, p2, h2, 1, p2Y),
  ];

  return [
    `M${c1 - w} ${baseY}`,
    `L${p1l[0]} ${p1l[1]}`,
    `Q${c1} ${p1} ${p1r[0]} ${p1r[1]}`,
    `L${tL[0]} ${tL[1]}`,
    `Q${troughX} ${troughY} ${tR[0]} ${tR[1]}`,
    `L${p2l[0]} ${p2l[1]}`,
    `Q${c2} ${p2} ${p2r[0]} ${p2r[1]}`,
    `L${c2 + w} ${baseY}`,
    "Z",
  ].join(" ");
}

// These controls keep the miniature website composition easy to tune in one place.
const websiteVisual = {
  // bottom-0 keeps the mountain base flush with the image panel.
  imageInset: "inset-x-2.5 top-2 bottom-0",
  // Twin hills as one flowing outline (rounded crests + inverse trough).
  mountains: {
    halfWidth: 38,
    leftPeakY: 12,
    rightPeakY: 26,
    leftCenter: 34,
    rightCenter: 86,
    round: 9,
    opacity: 0.5,
  } satisfies TwinHills,
  sun: { cx: 104, cy: 14, r: 6.5 },
} as const;

const mountainShape = buildTwinHillsPath(websiteVisual.mountains);

function ServiceVisual({ kind }: { kind: VisualKind }) {
  if (kind === "website") {
    return (
      <div
        className={`relative mt-5 flex ${homepageVisual.height} shrink-0 flex-col overflow-hidden rounded-lg border border-line bg-ivory/75`}
        aria-hidden
        data-nosnippet
      >
        <motion.span
          className="pointer-events-none absolute inset-y-0 z-20 w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          initial={{ x: "-140%" }}
          whileInView={{ x: "520%" }}
          viewport={inView}
          transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          aria-hidden
        />
        <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-line bg-sand/85 px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D86E5E]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#DDAE4B]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#6D9B70]" />
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-[1.1fr_0.9fr] gap-3.5 p-3.5">
          <div className="relative overflow-hidden rounded-md bg-gradient-to-br from-forest-soft/65 via-forest-soft/40 to-sand">
            <svg
              viewBox="0 0 120 72"
              preserveAspectRatio="xMidYMax meet"
              className={`absolute ${websiteVisual.imageInset} text-forest/45`}
              aria-hidden
            >
              <circle
                cx={websiteVisual.sun.cx}
                cy={websiteVisual.sun.cy}
                r={websiteVisual.sun.r}
                fill="currentColor"
                opacity={websiteVisual.mountains.opacity}
              />
              <path
                d={mountainShape}
                fill="currentColor"
                opacity={websiteVisual.mountains.opacity}
              />
            </svg>
          </div>
          <div className="flex min-w-0 flex-col justify-center">
            <AnimatedBar className="block h-1.5 rounded-full bg-ink/70" width="76%" delay={0.12} />
            <div className="mt-2.5 flex flex-col gap-1.5">
              <AnimatedBar className="block h-1.5 rounded-full bg-line" width="97%" delay={0.22} />
              <AnimatedBar className="block h-1.5 rounded-full bg-line" width="88%" delay={0.3} />
              <AnimatedBar className="block h-1.5 rounded-full bg-line" width="72%" delay={0.36} />
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <motion.span
                className="inline-flex h-4 w-10 rounded-sm bg-forest/75"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={inView}
                transition={{ duration: 0.45, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="inline-flex h-4 w-7 rounded-sm bg-line/80"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={inView}
                transition={{ duration: 0.45, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>
        <div className="h-10 shrink-0 overflow-hidden border-t border-line bg-card/70 px-3 pt-2">
          <div className="grid h-12 grid-cols-3 gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="h-full rounded-t-md border border-line/55 bg-line/45"
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{
                duration: 0.45,
                delay: 0.48 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "search") {
    return <SearchServiceVisual />;
  }

  if (kind === "systems") {
    const metrics = [
      { label: "Visitors", value: 2356, change: "12%" },
      { label: "Leads", value: 143, change: "18%" },
      { label: "Forms", value: 87, change: "15%" },
    ];
    const analyticsNav = [ChartNoAxesColumn, UserRound, Filter, Target];

    return (
      <div
        className={`mt-5 flex ${homepageVisual.height} shrink-0 flex-col overflow-hidden rounded-lg border border-line bg-ivory/75`}
        aria-hidden
        data-nosnippet
      >
        <div className="grid h-full grid-cols-[2.25rem_1fr]">
          <div className="flex flex-col items-center gap-3 border-r border-line bg-sand/55 pt-3 text-forest">
            {analyticsNav.map((NavIcon, index) => (
              <span
                key={NavIcon.displayName ?? index}
                className={index === 0 ? "rounded-md bg-forest-soft/70 p-1" : ""}
              >
                <NavIcon
                  className={index === 0 ? "h-3.5 w-3.5" : "h-3.5 w-3.5 text-ink/65"}
                  strokeWidth={index === 0 ? 2.1 : 1.8}
                />
              </span>
            ))}
          </div>
          <div className="min-w-0 p-3">
            <p className="text-[10px] font-semibold text-ink">Overview</p>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {metrics.map((metric, index) => (
                <div key={metric.label} className="rounded-md border border-line bg-card px-2 py-1.5">
                  <p className="truncate text-[8px] font-medium text-muted">
                    {metric.label}
                  </p>
                  <p className="mt-0.5 flex items-end justify-between gap-1 leading-none">
                    <span className="text-[0.9rem] font-semibold text-ink">
                      <AnimatedNumber
                        value={metric.value}
                        delay={0.2 + index * 0.12}
                      />
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-0.5 text-[8px] font-semibold text-forest">
                      <ArrowUp className="h-2.5 w-2.5" strokeWidth={2.25} />
                      {metric.change}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-2 border-t border-line/80 pt-1.5">
              <svg viewBox="0 0 220 48" className="h-[3.35rem] w-full" aria-hidden>
                <path
                  d="M0 39 H220 M0 20 H220"
                  fill="none"
                  stroke="#DDD6C8"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <motion.path
                  d="M8 37 C18 28 27 19 38 24 S58 36 70 29 S91 14 103 17 S125 28 136 22 S157 7 169 12 S187 25 196 20 S207 9 212 7"
                  fill="none"
                  stroke="#2F5B3F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0.45 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={inView}
                  transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
                {[
                  [8, 37],
                  [38, 24],
                  [70, 29],
                  [103, 17],
                  [136, 22],
                  [169, 12],
                  [196, 20],
                  [212, 7],
                ].map(([cx, cy]) => (
                  <circle
                    key={`${cx}-${cy}`}
                    cx={cx}
                    cy={cy}
                    r="2.2"
                    fill="#FFFDF8"
                    stroke="#2F5B3F"
                    strokeWidth="1.7"
                  />
                ))}
              </svg>
              <div className="flex justify-between px-1 text-[7px] font-medium text-muted">
                <span>May 1</span>
                <span>May 8</span>
                <span>May 15</span>
                <span>May 22</span>
                <span>May 29</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "integrations") {
    return <SystemsServiceVisual />;
  }

  return <SupportServiceVisual />;
}

/** Line widths as % of the result column / AI card. Height stays uniform. */
const searchVisual = {
  line: "h-1.5 rounded-full",
  results: [
    { width: "72%", tone: "bg-forest" },
    { width: "94%", tone: "bg-line" },
    { width: "78%", tone: "bg-line" },
    { width: "56%", tone: "bg-line" },
    { width: "62%", tone: "bg-[#8BB4E8]" },
    { width: "84%", tone: "bg-line" },
    { width: "46%", tone: "bg-line" },
  ],
  overview: {
    summary: "90%",
    line: "70%",
    bullets: ["78%", "56%"],
  },
} as const;

function SearchServiceVisual() {
  return (
    <div
      className={`mt-5 flex ${homepageVisual.height} shrink-0 flex-col overflow-hidden rounded-lg border border-line bg-ivory/75 p-3`}
      aria-hidden
    >
      <div className="flex h-7 shrink-0 items-center justify-end rounded-full border border-line bg-card px-2.5">
        <Search className="h-3.5 w-3.5 text-muted/70" strokeWidth={1.8} />
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-[1.2fr_0.95fr] items-stretch gap-2.5">
        <div className="flex flex-col justify-between py-0.5">
          {searchVisual.results.map((result, index) => (
            <AnimatedBar
              key={`${result.tone}-${result.width}`}
              className={`${searchVisual.line} ${result.tone}`}
              width={result.width}
              delay={0.14 + index * 0.05}
            />
          ))}
        </div>

        <motion.div
          className="flex h-full flex-col justify-between rounded-md border border-line bg-card px-2.5 py-2"
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="flex items-center gap-1 text-[8px] font-semibold tracking-tight text-ink">
            <Sparkle
              className="h-2.5 w-2.5 fill-[#6B9AE8] text-[#6B9AE8]"
              strokeWidth={1.4}
            />
            AI Overview
          </span>
          <AnimatedBar
            className={`${searchVisual.line} bg-forest/40`}
            width={searchVisual.overview.summary}
            delay={0.38}
          />
          <AnimatedBar
            className={`${searchVisual.line} bg-line`}
            width={searchVisual.overview.line}
            delay={0.44}
          />
          {searchVisual.overview.bullets.map((width, index) => (
            <span key={width} className="flex w-full items-center gap-1.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
              <AnimatedBar
                className={`${searchVisual.line} min-w-0 bg-line`}
                width={width}
                delay={0.5 + index * 0.08}
              />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedBar({
  className,
  width,
  delay = 0,
}: {
  className: string;
  width: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`block ${className}`}
      initial={{ width: 0, opacity: 0.45 }}
      whileInView={{ width, opacity: 1 }}
      viewport={inView}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    />
  );
}

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useMotionInView(ref, { once: true, amount: 0.7 });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1.1,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        if (ref.current) {
          ref.current.textContent = Math.round(latest).toString();
        }
      },
    });

    return () => controls.stop();
  }, [delay, isInView, value]);

  return <span ref={ref}>0</span>;
}
