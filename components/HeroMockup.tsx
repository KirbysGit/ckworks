"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Check,
  ClipboardList,
  HeartHandshake,
  LayoutDashboard,
  Lock,
  MoreVertical,
  Plus,
  Star,
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

const projectSteps = ["Discovery", "Strategy", "Design", "Development", "Launch"];

const systems = [
  { icon: ClipboardList, label: "Forms & Intake" },
  { icon: LayoutDashboard, label: "Client Dashboard" },
  { icon: Zap, label: "Automations" },
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

            {/* Dashboard side panel — tucked behind the browser's right edge */}
            <motion.div
              variants={floatIn}
              initial="hidden"
              animate="show"
              transition={{ delay: cards.dashboard.delay }}
              style={cardPlacementStyle(cards.dashboard)}
              className="absolute z-0 hidden rounded-xl border border-line bg-card p-3.5 shadow-soft lg:block"
            >
              <p className="text-[10px] font-semibold text-ink">Client Dashboard</p>
              <svg viewBox="0 0 100 30" className="mt-2 w-full" aria-hidden>
                <polyline
                  points="0,26 15,20 30,23 45,13 60,17 78,7 100,4"
                  fill="none"
                  stroke="#2F5B3F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="mt-3 border-t border-line/70 pt-2.5">
                <p className="text-[9px] text-muted">New Intakes</p>
                <div className="flex items-end justify-between">
                  <p className="text-sm font-semibold text-ink">24</p>
                  <p className="text-[9px] font-medium text-forest">+18%</p>
                </div>
                <div className="mt-1.5 flex items-end gap-1" aria-hidden>
                  {[10, 16, 8, 20, 14, 24].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}px` }}
                      className="w-2.5 rounded-sm bg-forest-soft"
                    />
                  ))}
                </div>
              </div>
              <div className="mt-3 border-t border-line/70 pt-2.5">
                <p className="text-[9px] text-muted">Tasks</p>
                <div className="mt-1.5 space-y-1.5" aria-hidden>
                  <span className="block h-1.5 w-full rounded-full bg-sand" />
                  <span className="block h-1.5 w-4/5 rounded-full bg-sand" />
                  <span className="block h-1.5 w-3/5 rounded-full bg-sand" />
                </div>
              </div>
            </motion.div>

            {/* Main browser window */}
            <motion.div
              variants={floatIn}
              initial="hidden"
              animate="show"
              style={{
                // Lay the content out at (slot width / scale), then shrink it
                // back down — the browser gets visually smaller without its
                // internal layout reflowing or overflowing.
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
                    stroke="#DDD6C8"
                    strokeWidth={2}
                    strokeDasharray="0.1 6"
                    strokeLinecap="round"
                  />
                  {dots.map((p, j) => (
                    <circle
                      key={j}
                      cx={p.x}
                      cy={p.y}
                      r={4}
                      fill="#FFFDF8"
                      stroke="#2F5B3F"
                      strokeOpacity={0.5}
                      strokeWidth={2}
                    />
                  ))}
                </svg>
              );
            })}
          </div>

          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="show"
            transition={{ delay: cards.projectOverview.delay }}
            style={cardPlacementStyle(cards.projectOverview)}
            className="absolute z-20 hidden rounded-xl border border-line bg-card p-4 shadow-float sm:block"
          >
            <p className="text-xs font-semibold text-ink">Project overview</p>
            <ul className="mt-3 space-y-2">
              {projectSteps.map((s) => (
                <li key={s} className="flex items-center gap-2 text-[11px] text-muted">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-forest-soft">
                    <Check className="h-2.5 w-2.5 text-forest" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="show"
            transition={{ delay: cards.systems.delay }}
            style={cardPlacementStyle(cards.systems)}
            className="absolute z-20 hidden rounded-xl border border-line bg-card p-4 shadow-float md:block"
          >
            <p className="text-xs font-semibold text-ink">Systems that scale</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {systems.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex flex-col gap-1.5 rounded-lg bg-sand px-2.5 py-2"
                >
                  <Icon className="h-3.5 w-3.5 text-forest" />
                  <span className="text-[10px] leading-tight text-muted">
                    {label}
                  </span>
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="show"
            transition={{ delay: cards.code.delay }}
            style={cardPlacementStyle(cards.code)}
            className="absolute z-20 hidden overflow-hidden rounded-xl border border-panel/40 bg-panel shadow-float lg:block"
          >
            <div className="flex gap-3 border-b border-white/10 px-3.5 py-2 text-[10px] text-white/50">
              <span className="text-white/90">HTML</span>
              <span>CSS</span>
              <span>JS</span>
            </div>
            <pre className="px-3.5 py-3 text-[10px] leading-relaxed text-[#d9e2da]">
              <code>
                <span className="text-[#8fd0a8]">&lt;section</span>{" "}
                <span className="text-[#e6c17e]">class=&quot;hero&quot;</span>
                <span className="text-[#8fd0a8]">&gt;</span>
                {"\n  "}
                <span className="text-[#8fd0a8]">&lt;div</span>{" "}
                <span className="text-[#e6c17e]">class=&quot;container&quot;</span>
                <span className="text-[#8fd0a8]">&gt;</span>
                {"\n    "}
                <span className="text-[#8fd0a8]">&lt;h1&gt;</span>
                Clarity. Trust. Real change.
                <span className="text-[#8fd0a8]">&lt;/h1&gt;</span>
                {"\n    "}
                <span className="text-[#8fd0a8]">&lt;a</span>{" "}
                <span className="text-[#e6c17e]">class=&quot;btn&quot;</span>
                <span className="text-[#8fd0a8]">&gt;</span>
                Book a call
                <span className="text-[#8fd0a8]">&lt;/a&gt;</span>
                {"\n  "}
                <span className="text-[#8fd0a8]">&lt;/div&gt;</span>
                {"\n"}
                <span className="text-[#8fd0a8]">&lt;/section&gt;</span>
              </code>
            </pre>
          </motion.div>

          <motion.div
            variants={floatIn}
            initial="hidden"
            animate="show"
            transition={{ delay: cards.stat.delay }}
            style={cardPlacementStyle(cards.stat)}
            className="absolute z-20 flex items-center gap-3.5 rounded-xl border border-line bg-card px-5 py-3.5 shadow-float"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-ivory">
              <TrendingUp className="h-5 w-5" />
            </span>
            <div>
              <p className="text-base font-semibold text-ink">+38%</p>
              <p className="text-xs text-muted">increase in leads</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
