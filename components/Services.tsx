"use client";

import { motion } from "framer-motion";
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
    tags: ["Custom Design", "Responsive", "SEO"],
    visual: "website",
  },
  "Digital Systems": {
    tags: ["Dashboards", "Automation", "Workflows"],
    visual: "systems",
    featured: true,
  },
  Integrations: {
    tags: ["APIs", "Zapier", "Data Sync"],
    visual: "integrations",
  },
  "Ongoing Support": {
    tags: ["Maintenance", "Updates", "Support"],
    visual: "support",
  },
};

export default function Services() {
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
          className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {services.map((service) => {
            const { icon: Icon, title, body } = service;
            const details = {
              ...serviceDetails[title],
              tags: service.tags ?? serviceDetails[title].tags,
              visual: service.visual ?? serviceDetails[title].visual,
              featured: service.featured ?? serviceDetails[title].featured,
            };

            return (
              <motion.div key={title} variants={fadeUp} className="h-full">
                <a
                  href="#contact"
                  className={`group relative flex h-full min-h-[27rem] flex-col overflow-hidden rounded-2xl border bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${
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
                <p className="mt-2 min-h-[4.5rem] text-sm leading-relaxed text-muted">
                  {body}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
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

                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-forest">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                </a>
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
      <div className="mt-5 h-32 overflow-hidden rounded-lg border border-line bg-ivory/75">
        <div className="flex h-5 items-center gap-1.5 border-b border-line px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-forest/35" />
          <span className="h-1.5 w-1.5 rounded-full bg-forest/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-forest/20" />
          <span className="ml-auto h-1.5 w-10 rounded-full bg-line" />
          <span className="h-1.5 w-7 rounded-full bg-line" />
        </div>
        <div className="grid gap-2 p-3">
          <div className="space-y-1.5">
            <span className="block h-2 w-16 rounded-full bg-ink/70" />
            <span className="block h-2 w-28 rounded-full bg-line" />
            <span className="block h-2 w-20 rounded-full bg-line" />
          </div>
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
            <div className="h-10 rounded-md bg-forest-soft/70" />
            <div className="h-10 rounded-md bg-sand" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="h-5 rounded-md bg-sand" />
            <span className="h-5 rounded-md bg-sand" />
            <span className="h-5 rounded-md bg-sand" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "systems") {
    return (
      <div className="mt-5 h-32 overflow-hidden rounded-lg border border-line bg-ivory/75 p-3">
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
              {["128", "37", "12"].map((value) => (
                <div key={value} className="rounded-md border border-line bg-card p-2">
                  <p className="text-sm font-semibold text-ink">{value}</p>
                  <span className="block h-1.5 w-10 rounded-full bg-line" />
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-[1.3fr_0.7fr] gap-2">
              <div className="rounded-md border border-line bg-card p-1.5">
                <svg viewBox="0 0 116 44" className="h-9 w-full">
                  <path
                    d="M3 35 C18 15 31 41 45 24 S70 11 86 25 103 28 113 11"
                    fill="none"
                    stroke="#2F5B3F"
                    strokeLinecap="round"
                    strokeWidth="2"
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
      <div className="relative mt-5 h-32 overflow-hidden rounded-lg border border-line bg-ivory/75">
        <svg
          viewBox="0 0 260 150"
          className="absolute inset-0 h-full w-full text-forest"
          aria-hidden
        >
          <path
            d="M55 40 C90 40 87 75 120 75 M55 110 C86 110 85 75 120 75 M205 38 C172 38 172 75 140 75 M205 112 C172 112 172 75 140 75"
            fill="none"
            stroke="currentColor"
            strokeDasharray="4 5"
            strokeLinecap="round"
            strokeOpacity="0.5"
            strokeWidth="2"
          />
        </svg>
        <IntegrationNode className="left-5 top-5" label="Sheet" />
        <IntegrationNode className="bottom-5 left-5" label="CRM" />
        <IntegrationNode className="right-5 top-5" label="Chat" />
        <IntegrationNode className="bottom-5 right-5" label="Mail" />
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-line bg-card shadow-soft">
          <Sparkle className="h-5 w-5 text-forest" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 h-32 overflow-hidden rounded-lg border border-line bg-ivory/75 p-3">
      <p className="text-[11px] font-semibold text-ink">System Status</p>
      <div className="mt-2 rounded-md border border-line bg-card p-2.5">
        <div className="flex items-center gap-2 rounded-md bg-forest-soft/65 px-2.5 py-1.5 text-[10px] font-medium text-forest">
          <CheckCircle2 className="h-3.5 w-3.5" />
          All systems operational
        </div>
        <div className="mt-2.5 space-y-2">
          {["Website", "Automations", "Integrations"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="w-20 text-[10px] font-medium text-ink">
                {item}
              </span>
              <span className="h-1.5 flex-1 rounded-full bg-line" />
              <CheckCircle2 className="h-3.5 w-3.5 text-forest" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IntegrationNode({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <div
      className={`absolute rounded-lg border border-line bg-card px-2.5 py-2 text-[10px] font-semibold text-forest shadow-soft ${className}`}
    >
      {label}
    </div>
  );
}
