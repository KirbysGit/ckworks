"use client";

import { motion } from "framer-motion";
import { Check, TrendingUp } from "lucide-react";
import { floatIn } from "@/lib/motion";

const projectSteps = ["Discovery", "Strategy", "Design", "Development", "Launch"];
const systems = ["Forms & Intake", "Client Dashboard", "Automations", "Reporting"];

export default function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* subtle grid texture behind the composition */}
      <div className="grid-texture pointer-events-none absolute -inset-8 -z-10 rounded-3xl opacity-70 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />

      {/* Main browser window */}
      <motion.div
        variants={floatIn}
        initial="hidden"
        animate="show"
        className="overflow-hidden rounded-2xl border border-line bg-card shadow-float"
      >
        {/* browser chrome */}
        <div className="flex items-center gap-4 border-b border-line/80 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </div>
          <div className="flex-1 rounded-md bg-sand px-3 py-1 text-center text-[11px] text-muted">
            northbridgewellness.com
          </div>
        </div>

        {/* site nav */}
        <div className="flex items-center justify-between px-5 py-3">
          <span className="font-serif text-sm font-semibold text-ink">
            Northbridge Wellness
          </span>
          <div className="hidden items-center gap-3 text-[11px] text-muted sm:flex">
            <span>Services</span>
            <span>About</span>
            <span>Resources</span>
            <span className="rounded-full bg-forest px-2.5 py-1 text-ivory">
              Book a call
            </span>
          </div>
        </div>

        {/* hero content */}
        <div className="px-5 pb-5">
          <p className="font-serif text-xl font-medium leading-snug text-ink">
            Evidence-based care,
            <br />
            personalized for you.
          </p>
          <div className="mt-4 h-28 rounded-xl bg-gradient-to-br from-forest-soft via-[#eef2e8] to-[#e7ddc9]" />
        </div>
      </motion.div>

      {/* Floating: Project overview */}
      <motion.div
        variants={floatIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.15 }}
        className="absolute -left-6 top-32 hidden w-52 rounded-xl border border-line bg-card p-4 shadow-float sm:block"
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

      {/* Floating: Systems that scale */}
      <motion.div
        variants={floatIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.25 }}
        className="absolute -right-5 top-16 hidden w-48 rounded-xl border border-line bg-card p-4 shadow-float md:block"
      >
        <p className="text-xs font-semibold text-ink">Systems that scale</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {systems.map((s) => (
            <span
              key={s}
              className="rounded-md bg-sand px-2 py-1.5 text-[10px] leading-tight text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Floating: code panel */}
      <motion.div
        variants={floatIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.35 }}
        className="absolute -bottom-8 -left-4 hidden w-56 overflow-hidden rounded-xl border border-panel/40 bg-panel shadow-float md:block"
      >
        <div className="flex gap-3 border-b border-white/10 px-3 py-2 text-[10px] text-white/50">
          <span className="text-white/90">HTML</span>
          <span>CSS</span>
          <span>JS</span>
        </div>
        <pre className="px-3 py-3 text-[10px] leading-relaxed text-forest-soft">
          <code>{`<section class="hero">
  <h1>Welcome</h1>
  <Button>Book</Button>
</section>`}</code>
        </pre>
      </motion.div>

      {/* Floating: stat card */}
      <motion.div
        variants={floatIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.45 }}
        className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 shadow-float"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-soft">
          <TrendingUp className="h-4 w-4 text-forest" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">+38%</p>
          <p className="text-[11px] text-muted">increase in leads</p>
        </div>
      </motion.div>
    </div>
  );
}
