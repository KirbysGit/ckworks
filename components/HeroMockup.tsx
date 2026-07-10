"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  ClipboardList,
  Code2,
  HeartHandshake,
  LayoutDashboard,
  Lightbulb,
  Lock,
  MessageCircle,
  MoreVertical,
  PencilRuler,
  Plus,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
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
  { icon: Rocket, label: "Launch" },
];

const systems = [
  { icon: ClipboardList, label: "Forms & Intake" },
  { icon: Zap, label: "Automations" },
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BarChart3, label: "Reporting" },
];

const features = [
  {
    icon: HeartHandshake,
    title: "Personalized care",
    caption: "Care tailored to your goals, needs, and life.",
  },
  {
    icon: Users,
    title: "Experienced team",
    caption: "Licensed professionals with deep expertise.",
  },
  {
    icon: TrendingUp,
    title: "Lasting results",
    caption: "Tools and support that create real, lasting change.",
  },
];

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
 * Layered hero composition. Card positions and overall scale are controlled
 * in `lib/heroMockupLayout.ts` — edit that file to tune the layout.
 */
export default function HeroMockup() {
  const { scale, stage, texture, cards, connectors, browser, showDebugGrid } =
    heroMockupLayout;

  const showGrid =
    showDebugGrid && process.env.NODE_ENV === "development";

  return (
    <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <div
        className="relative origin-top"
        style={{
          transform: `scale(${scale})`,
          width: scale !== 1 ? `${100 / scale}%` : undefined,
        }}
      >
        <div className="relative pb-16 sm:pb-20 lg:pb-24">
          <div
            className="grid-texture pointer-events-none absolute -z-10 opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]"
            style={{
              inset: `-${texture.insetY}px -${texture.insetX}px`,
            }}
          />

          <div
            className="relative"
            style={{
              paddingTop: stage.paddingTop,
              paddingRight: stage.paddingRight,
              paddingBottom: stage.paddingBottom,
              paddingLeft: stage.paddingLeft,
            }}
          >
            {showGrid && <DebugGrid />}

            {/* Main browser window — inner content unchanged */}
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
              <div className="flex items-center gap-3 border-b border-line/80 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E5766D]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E8B54D]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#58A66B]" />
                </div>
                <div className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-sand px-3 py-1.5 text-xs text-muted">
                  <Lock className="h-3 w-3" />
                  northbridgewellness.com
                </div>
                <Plus className="h-4 w-4 text-muted" />
                <MoreVertical className="h-4 w-4 text-muted" />
              </div>

              <div className="flex items-center justify-between gap-6 px-6 py-5">
                <span className="whitespace-nowrap font-serif text-sm font-semibold text-ink">
                  Northbridge Wellness
                </span>
                <div className="hidden items-center gap-4 text-xs text-muted sm:flex">
                  <span>Services</span>
                  <span>About</span>
                  <span>Resources</span>
                  <span>Contact</span>
                  <span className="rounded-lg bg-forest px-3 py-1.5 text-ivory">
                    Book a call
                  </span>
                </div>
              </div>

              <div className="grid gap-6 px-6 pt-3 sm:grid-cols-[1.05fr_1fr]">
                <div>
                  <p className="font-serif text-2xl font-medium leading-snug text-ink sm:text-2xl">
                    Evidence-based care.
                    <br />
                    Personalized for you.
                  </p>
                  <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted">
                    Therapy and wellness services designed to support real
                    change—at your pace.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="rounded-lg bg-forest px-3.5 py-2 text-xs font-medium text-ivory">
                      Book a call
                    </span>
                    <span className="text-xs font-medium text-ink">
                      Learn more →
                    </span>
                  </div>
                </div>
                <div className="hidden rounded-xl bg-gradient-to-br from-forest-soft via-[#eef2e8] to-[#e7ddc9] sm:block" />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-5 border-t border-line/70 px-6 py-5 lg:gap-6 lg:px-7 lg:py-6">
                {features.map(({ icon: Icon, title, caption }) => (
                  <div key={title} className="text-center">
                    <Icon className="mx-auto h-4 w-4 text-forest" />
                    <p className="mt-1.5 font-serif text-xs font-semibold text-ink">
                      {title}
                    </p>
                    <p className="mt-1 hidden text-[10px] leading-snug text-muted sm:block">
                      {caption}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {connectors.map((connector, i) => {
              const { style, width, height, d, dots } =
                buildConnector(connector);
              return (
                <svg
                  key={i}
                  style={style}
                  width={width}
                  height={height}
                  className="z-[15] hidden overflow-visible xl:block"
                  aria-hidden
                >
                  <path
                    d={d}
                    fill="none"
                    stroke="#2F5B3F"
                    strokeOpacity={0.45}
                    strokeWidth={1.75}
                    strokeDasharray="0.1 7"
                    strokeLinecap="round"
                  />
                  {dots.map((p, j) => (
                    <circle
                      key={j}
                      cx={p.x}
                      cy={p.y}
                      r={3.5}
                      fill="#FFFDF8"
                      stroke="#2F5B3F"
                      strokeOpacity={0.55}
                      strokeWidth={1.75}
                    />
                  ))}
                </svg>
              );
            })}
          </div>

          {/* Project Overview — left middle */}
          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="show"
            transition={{ delay: cards.projectOverview.delay }}
            style={cardPlacementStyle(cards.projectOverview)}
            className="absolute z-20 hidden rounded-2xl border border-line bg-card p-4 shadow-float sm:block"
          >
            <p className="text-xs font-semibold text-ink">Project Overview</p>
            <ul className="mt-3 space-y-2.5">
              {projectSteps.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-[11px] text-muted"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-forest-soft">
                    <Icon className="h-3 w-3 text-forest" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Systems that Scale — right middle, vertical list */}
          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="show"
            transition={{ delay: cards.systems.delay }}
            style={cardPlacementStyle(cards.systems)}
            className="absolute z-20 hidden rounded-2xl border border-line bg-card p-4 shadow-float md:block"
          >
            <p className="text-xs font-semibold text-ink">Systems that Scale</p>
            <ul className="mt-3 space-y-2.5">
              {systems.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-[11px] text-muted"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-forest-soft">
                    <Icon className="h-3 w-3 text-forest" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Code panel — bottom left */}
          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="show"
            transition={{ delay: cards.code.delay }}
            style={cardPlacementStyle(cards.code)}
            className="absolute z-20 hidden overflow-hidden rounded-2xl border border-panel/40 bg-panel shadow-float lg:block"
          >
            <pre className="px-4 py-3.5 text-[10px] leading-relaxed text-[#d9e2da]">
              <code>
                <span className="text-[#8fd0a8]">&lt;section</span>{" "}
                <span className="text-[#e6c17e]">class=&quot;hero&quot;</span>
                <span className="text-[#8fd0a8]">&gt;</span>
                {"\n  "}
                <span className="text-[#8fd0a8]">&lt;h1&gt;</span>
                Clear message.
                <span className="text-[#8fd0a8]">&lt;/h1&gt;</span>
                {"\n  "}
                <span className="text-[#8fd0a8]">&lt;p&gt;</span>
                Calm systems. Confident growth.
                <span className="text-[#8fd0a8]">&lt;/p&gt;</span>
                {"\n"}
                <span className="text-[#8fd0a8]">&lt;/section&gt;</span>
              </code>
            </pre>
          </motion.div>

          {/* Home Base — bottom right */}
          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="show"
            transition={{ delay: cards.homeBase.delay }}
            style={cardPlacementStyle(cards.homeBase)}
            className="absolute z-20 hidden rounded-2xl border border-line bg-card p-4 shadow-float lg:block"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3E6B8]">
              <Sparkles className="h-3.5 w-3.5 text-[#C4A035]" />
            </span>
            <p className="mt-3 font-serif text-sm font-semibold leading-snug text-ink">
              One polished home base
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
              Everything connected.
              <br />
              Everything makes sense.
            </p>
          </motion.div>

          {/* Ongoing support pill — far bottom left */}
          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="show"
            transition={{ delay: cards.support.delay }}
            style={cardPlacementStyle(cards.support)}
            className="absolute z-20 hidden items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 shadow-float lg:inline-flex"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-soft">
              <MessageCircle className="h-3 w-3 text-forest" />
            </span>
            <span className="text-[11px] font-medium text-ink">
              Ongoing support
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
