"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useInView as useMotionInView,
} from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkle } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { services } from "@/lib/data";
import { fadeUp, stagger, inView } from "@/lib/motion";

type VisualKind = "website" | "systems" | "integrations" | "support";

type ServiceDetails = {
  tags: string[];
  visual: VisualKind;
  featured?: boolean;
};

const serviceDetails: Record<string, ServiceDetails> = {
  "Web Design": {
    tags: ["Websites", "Mobile-ready", "Messaging"],
    visual: "website",
  },
  "Digital Systems": {
    tags: ["Dashboards", "Internal tools", "Workflows"],
    visual: "systems",
    featured: true,
  },
  Integrations: {
    tags: ["Forms", "APIs", "Email + SMS"],
    visual: "integrations",
  },
  "Ongoing Support": {
    tags: ["Updates", "Fixes", "Improvements"],
    visual: "support",
  },
};

const serviceIncludes: Record<string, string[]> = {
  "Web Design": [
    "Landing pages, portfolio sites, and small business websites",
    "Page structure, layout, and visual direction",
    "Mobile-friendly responsive design",
    "Clear calls-to-action and content organization",
  ],
  "Digital Systems": [
    "Internal dashboards and admin views",
    "Workflow cleanup for repetitive tasks",
    "Simple tools for tracking, organizing, or managing information",
    "Systems designed around how the business actually works",
  ],
  Integrations: [
    "Form submissions routed to the right place",
    "API connections between tools or databases",
    "Auth, accounts, or data connection flows where needed",
    "Email or SMS notifications for important actions",
  ],
  "Ongoing Support": [
    "Website updates and small content changes",
    "Bug fixes and technical cleanup",
    "Post-launch testing and improvements",
    "Ongoing adjustments as the business grows",
  ],
};

// Integration card tuning: move boxes with x/y, move connectors with lines,
// and nudge logos inside their squares with iconOffsetX/iconOffsetY.
const integrationLayout = {
  viewBox: "0 0 260 150",
  lines: {
    path: "M42 45 C92 45 80 72 130 72 M42 105 C92 105 80 78 130 78 M218 45 C168 45 180 72 130 72 M218 105 C168 105 180 78 130 78",
    x: 0,
    y: 0,
    scale: 1,
    strokeWidth: 2,
    strokeOpacity: 0.5,
    dash: "4 5",
  },
  center: {
    x: "41.5%",
    y: "32%",
    size: 48,
    iconSize: 20,
    iconOffsetX: 0,
    iconOffsetY: 0,
  },
  nodes: [
    {
      label: "Sheets",
      icon: "/images/services/svg/excel-logo.svg",
      x: "8%",
      y: "18%",
      size: 40,
      iconSize: 30,
      iconOffsetX: -1,
      iconOffsetY: 0,
      delay: 0.28,
    },
    {
      label: "AI",
      icon: "/images/services/svg/openai-logo.svg",
      x: "8%",
      y: "58%",
      size: 40,
      iconSize: 20,
      iconOffsetX: 0,
      iconOffsetY: 0,
      delay: 0.4,
    },
    {
      label: "Chat",
      icon: "/images/services/svg/slack-logo.svg",
      x: "77%",
      y: "18%",
      size: 40,
      iconSize: 20,
      iconOffsetX: 0,
      iconOffsetY: 0,
      delay: 0.52,
    },
    {
      label: "Mail",
      icon: "/images/services/svg/gmail-logo.svg",
      x: "77%",
      y: "58%",
      size: 40,
      iconSize: 20,
      iconOffsetX: 0,
      iconOffsetY: 0,
      delay: 0.64,
    },
  ],
};

export default function Services() {
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <section id="what-i-do" className="bg-ivory py-14 lg:py-20">
      <div className="container-ck">
        <SectionHeader
          label="What I Do"
          title="A few ways I can help your business."
          subtitle="From clean, conversion-focused websites to smart systems and ongoing support, I build the digital foundation your business can grow on."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {services.map((service) => {
            const { icon: Icon, title, body } = service;
            const isOpen = openService === title;
            const details = {
              ...serviceDetails[title],
              tags: service.tags ?? serviceDetails[title].tags,
              visual: service.visual ?? serviceDetails[title].visual,
              featured: service.featured ?? serviceDetails[title].featured,
            };

            return (
              <motion.div key={title} variants={fadeUp}>
                <article
                  className={`group relative flex min-h-[22.5rem] flex-col overflow-hidden rounded-2xl border bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${
                    details.featured
                      ? "border-forest/60"
                      : "border-line hover:border-forest/30"
                  }`}
                >
                {details.featured && (
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory shadow-soft">
                    <Sparkle className="h-4 w-4" />
                  </span>
                )}

                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-soft">
                  <Icon className="h-5 w-5 text-forest" />
                </span>

                <h3 className="mt-5 font-serif text-2xl font-semibold leading-tight text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {body}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {details.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-forest-soft/75 px-2.5 py-1 text-[11px] font-medium text-forest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <ServiceVisual kind={details.visual} />

                <div className="mt-auto pt-5">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`service-includes-${title}`}
                    onClick={() =>
                      setOpenService((current) =>
                        current === title ? null : title,
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors duration-200 hover:text-ink"
                  >
                    What this includes
                    <motion.span
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`service-includes-${title}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-2 border-t border-line/80 pt-4">
                          {serviceIncludes[title].map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-xs leading-relaxed text-muted"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest/70" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

function ServiceVisual({ kind }: { kind: VisualKind }) {
  if (kind === "website") {
    return (
      <div className="relative mt-5 h-36 overflow-hidden rounded-lg border border-line bg-ivory/75">
        <motion.span
          className="pointer-events-none absolute inset-y-0 z-20 w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          initial={{ x: "-140%" }}
          whileInView={{ x: "520%" }}
          viewport={inView}
          transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          aria-hidden
        />
        <div className="flex h-5 items-center gap-1.5 border-b border-line px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-forest/35" />
          <span className="h-1.5 w-1.5 rounded-full bg-forest/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-forest/20" />
          <AnimatedBar className="ml-auto h-1.5 rounded-full bg-line" width="2.5rem" delay={0.18} />
          <AnimatedBar className="h-1.5 rounded-full bg-line" width="1.75rem" delay={0.26} />
        </div>
        <div className="grid gap-2 p-3">
          <div className="space-y-1.5">
            <AnimatedBar className="block h-2 rounded-full bg-ink/70" width="4rem" delay={0.12} />
            <AnimatedBar className="block h-2 rounded-full bg-line" width="7rem" delay={0.22} />
            <AnimatedBar className="block h-2 rounded-full bg-line" width="5rem" delay={0.32} />
          </div>
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
            <motion.div
              className="h-10 rounded-md bg-forest-soft/70"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={inView}
              transition={{ duration: 0.55, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="h-10 rounded-md bg-sand"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={inView}
              transition={{ duration: 0.55, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((item) => (
              <motion.span
                key={item}
                className="h-5 rounded-md bg-sand"
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{
                  duration: 0.45,
                  delay: 0.56 + item * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "systems") {
    return (
      <div className="mt-5 h-36 overflow-hidden rounded-lg border border-line bg-ivory/75 p-3">
        <div className="grid grid-cols-[1.6rem_1fr] gap-3">
          <div className="space-y-3 border-r border-line pr-2 pt-1">
            {[0, 1, 2].map((item) => (
              <span
                key={item}
                className="block h-2 w-2 rounded-full border border-line bg-card"
              />
            ))}
          </div>
          <div>
            <p className="text-[10px] font-semibold text-ink">Overview</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[128, 37, 12].map((value, index) => (
                <div key={value} className="rounded-md border border-line bg-card p-2">
                  <p className="text-sm font-semibold text-ink">
                    <AnimatedNumber value={value} delay={0.2 + index * 0.12} />
                  </p>
                  <span className="block h-1.5 w-10 rounded-full bg-line" />
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-[1.3fr_0.7fr] gap-2">
              <div className="rounded-md border border-line bg-card p-1.5">
                <svg viewBox="0 0 116 44" className="h-9 w-full">
                  <motion.path
                    d="M3 35 C18 15 31 41 45 24 S70 11 86 25 103 28 113 11"
                    fill="none"
                    stroke="#2F5B3F"
                    strokeLinecap="round"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0.45 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={inView}
                    transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
              </div>
              <div className="space-y-1.5 rounded-md border border-line bg-card p-2">
                {[0, 1, 2].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-forest" />
                    <span className="h-1.5 flex-1 rounded-full bg-line" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "integrations") {
    return (
      <div className="relative mt-5 h-36 overflow-hidden rounded-lg border border-line bg-ivory/75">
        <svg
          viewBox={integrationLayout.viewBox}
          className="absolute inset-0 h-full w-full text-forest"
          aria-hidden
        >
          <motion.path
            d={integrationLayout.lines.path}
            fill="none"
            stroke="currentColor"
            strokeDasharray={integrationLayout.lines.dash}
            strokeLinecap="round"
            strokeOpacity={integrationLayout.lines.strokeOpacity}
            strokeWidth={integrationLayout.lines.strokeWidth}
            transform={`translate(${integrationLayout.lines.x} ${integrationLayout.lines.y}) scale(${integrationLayout.lines.scale})`}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={inView}
            transition={{ duration: 1.15, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        {integrationLayout.nodes.map((node) => (
          <IntegrationNode key={node.label} {...node} />
        ))}
        <motion.div
          className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-line bg-card shadow-soft"
          style={{
            left: integrationLayout.center.x,
            top: integrationLayout.center.y,
            width: integrationLayout.center.size,
            height: integrationLayout.center.size,
          }}
          initial={{ opacity: 0, scale: 0.82 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Sparkle
            className="text-forest"
            style={{
              width: integrationLayout.center.iconSize,
              height: integrationLayout.center.iconSize,
              transform: `translate(${integrationLayout.center.iconOffsetX}px, ${integrationLayout.center.iconOffsetY}px)`,
            }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mt-5 h-36 overflow-hidden rounded-lg border border-line bg-ivory/75 p-3">
      <p className="text-[11px] font-semibold text-ink">System Status</p>
      <div className="mt-2 rounded-md border border-line bg-card p-2.5">
        <div className="relative h-[1.75rem] overflow-hidden rounded-md bg-forest-soft/65 px-2.5 py-1.5 text-[10px] font-medium text-forest">
          <motion.span
            className="absolute inset-0 flex items-center gap-2 px-2.5"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 0, y: -8 }}
            viewport={inView}
            transition={{ duration: 0.28, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            Checking systems
            <LoadingDots />
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center gap-2 px-2.5"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={inView}
            transition={{ duration: 0.38, delay: 1.02, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={inView}
              transition={{ duration: 0.32, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
            </motion.span>
            All systems operational
          </motion.span>
        </div>
        <div className="mt-2.5 space-y-2">
          {["Website", "Automations", "Integrations"].map((item, index) => (
            <div key={item} className="flex items-center gap-3">
              <span className="w-20 text-[10px] font-medium text-ink">
                {item}
              </span>
              <motion.span
                className="h-1.5 flex-1 rounded-full bg-line"
                initial={{ opacity: 0.55, scaleX: 0.7 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={inView}
                transition={{
                  duration: 0.42,
                  delay: 1.12 + index * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "left" }}
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.35, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={inView}
                transition={{
                  duration: 0.38,
                  delay: 1.24 + index * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-forest" />
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-1 w-1 rounded-full bg-forest"
          initial={{ opacity: 0.35, y: 0 }}
          whileInView={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
          viewport={inView}
          transition={{
            duration: 0.55,
            delay: 0.18 + dot * 0.11,
            repeat: 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}

function IntegrationNode({
  label,
  icon,
  x,
  y,
  size,
  iconSize,
  iconOffsetX,
  iconOffsetY,
  delay,
}: {
  label: string;
  icon: string;
  x: string;
  y: string;
  size: number;
  iconSize: number;
  iconOffsetX: number;
  iconOffsetY: number;
  delay: number;
}) {
  return (
    <motion.div
      aria-label={label}
      className="absolute z-10 flex items-center justify-center rounded-lg border border-line bg-card shadow-soft"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0.72 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={inView}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="object-contain"
        style={{
          width: iconSize,
          height: iconSize,
          transform: `translate(${iconOffsetX}px, ${iconOffsetY}px)`,
        }}
      />
    </motion.div>
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
