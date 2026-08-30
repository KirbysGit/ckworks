"use client";

/**
 * Owns the compact visuals used by the Digital Systems & Integrations and
 * Ongoing Support cards in the homepage services grid.
 *
 * Both are illustrative product sketches, not real client data, so they carry
 * `aria-hidden` and `data-nosnippet` — screen readers and search snippets get
 * the card copy instead of invented workflow steps and activity dates.
 */

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  Blocks,
  CheckCircle2,
  ChevronRight,
  FileText,
  LayoutDashboard,
  Mail,
  UserRound,
  Workflow,
} from "lucide-react";
import { inView } from "@/lib/motion";

// Match the preview height shared by the other homepage service cards.
const wideVisual = {
  frame:
    "mt-5 h-44 overflow-hidden rounded-lg border border-line bg-ivory/75",
  panelLabel: "text-[11px] font-semibold text-ink",
  rowLabel: "text-[10px] font-medium",
};

const systemsNav = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Workflows", icon: Workflow },
  { label: "Forms", icon: FileText },
  { label: "Integrations", icon: Blocks },
];

// The last step resolves green so the chain reads as "finished", not "pending".
const workflowSteps = [
  { label: "Form submitted", icon: FileText },
  { label: "Welcome email", icon: Mail },
  { label: "Added to CRM", icon: UserRound },
  { label: "Team notified", icon: CheckCircle2, resolved: true },
];

// Only logos already used elsewhere on the site — no CRM marks we can't back up.
// Sized to fill ~53% of a 49px tile.
const integrationLogos = [
  { label: "Sheets", src: "/images/services/svg/excel-logo.svg", size: 24 },
  { label: "AI", src: "/images/services/svg/openai-logo.svg", size: 24 },
  { label: "Chat", src: "/images/services/svg/slack-logo.svg", size: 24 },
  { label: "Mail", src: "/images/services/svg/gmail-logo.svg", size: 24 },
];

export function SystemsServiceVisual() {
  return (
    <div className={wideVisual.frame} aria-hidden data-nosnippet>
      <div className="grid h-full grid-cols-1 xl:grid-cols-[6.5rem_minmax(0,1fr)]">
        {/* Give every navigation label enough room to render in full. The rail
            still drops away in the narrower two-column grid. */}
        <div className="hidden flex-col justify-center gap-1.5 border-r border-line bg-sand/55 py-2 xl:flex">
          {systemsNav.map((item, index) => {
            const NavIcon = item.icon;
            const active = index === 0;
            return (
              <motion.span
                key={item.label}
                // Active row: 2px rule + 6px padding lines its text up with the
                // 8px inset of the inactive rows.
                className={`flex items-center gap-1.5 py-1.5 ${
                  active
                    ? "mr-1 rounded-r-md border-l-2 border-forest bg-forest-soft/70 pl-1.5 pr-1 text-forest"
                    : "px-1.5 text-ink/65"
                }`}
                initial={{ opacity: 0, x: -4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{
                  duration: 0.4,
                  delay: 0.12 + index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <NavIcon
                  className="h-3.5 w-3.5 shrink-0"
                  strokeWidth={active ? 2.1 : 1.8}
                />
                <span className={`${wideVisual.rowLabel} whitespace-nowrap`}>
                  {item.label}
                </span>
              </motion.span>
            );
          })}
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="flex min-h-0 flex-1 flex-col px-2.5 pb-2 pt-2.5">
            <p className={wideVisual.panelLabel}>Workflow: New Lead</p>

            <div className="mt-1.5 flex flex-1 items-center gap-0.5">
              {workflowSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <Fragment key={step.label}>
                    <motion.span
                      className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md border px-1 py-1.5 ${
                        step.resolved
                          ? "border-forest/30 bg-forest-soft/30"
                          : "border-line bg-card"
                      }`}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={inView}
                      transition={{
                        duration: 0.45,
                        delay: 0.24 + index * 0.13,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <StepIcon
                        className="h-4 w-4 shrink-0 text-forest"
                        strokeWidth={1.9}
                      />
                      <span className="text-center text-[8px] font-medium leading-[1.2] text-muted">
                        {step.label}
                      </span>
                    </motion.span>

                    {index < workflowSteps.length - 1 ? (
                      <motion.span
                        className="shrink-0 text-forest/70"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={inView}
                        transition={{
                          duration: 0.35,
                          delay: 0.32 + index * 0.13,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <ChevronRight className="h-3 w-3" strokeWidth={2.6} />
                      </motion.span>
                    ) : null}
                  </Fragment>
                );
              })}
            </div>
          </div>

          {/* Give the integrations the full content width instead of squeezing
              them into a narrow side panel. */}
          <div className="grid h-12 shrink-0 grid-cols-[auto_repeat(4,minmax(0,1fr))] items-center gap-1.5 border-t border-line bg-sand/35 px-2.5">
            <p className="mr-1 text-[9px] font-semibold text-ink">Integrations</p>
            {integrationLogos.map((logo, index) => (
              <motion.span
                key={logo.label}
                className="flex h-8 min-w-0 items-center justify-center rounded-md border border-line bg-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={inView}
                transition={{
                  duration: 0.42,
                  delay: 0.3 + index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <img
                  src={logo.src}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="object-contain"
                  style={{ width: logo.size - 4, height: logo.size - 4 }}
                />
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const statusRows = ["Website", "Forms", "Integrations"];

// Relative labels instead of fixed dates so the card never reads as stale.
const recentActivity = [
  { label: "Plugin update", when: "2 days ago" },
  { label: "Security scan", when: "5 days ago" },
  { label: "Backup completed", when: "1 week ago" },
];

export function SupportServiceVisual() {
  return (
    <div className={wideVisual.frame} aria-hidden data-nosnippet>
      <div className="grid h-full grid-cols-1 xl:grid-cols-[1.3fr_1fr]">
        <div className="flex min-w-0 flex-col p-3">
          <p className={wideVisual.panelLabel}>System Status</p>

          {/* Swaps from "checking" to "operational" once, as the card scrolls in. */}
          <div className="relative mt-2 h-8 shrink-0 overflow-hidden rounded-md bg-forest-soft/65 text-[11px] font-medium text-forest">
            <motion.span
              className="absolute inset-0 flex items-center gap-2 px-2.5"
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 0, y: -8 }}
              viewport={inView}
              transition={{ duration: 0.28, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Checking systems
              <LoadingDots />
            </motion.span>
            <motion.span
              className="absolute inset-0 flex items-center gap-2 px-2.5"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.38, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              All systems operational
            </motion.span>
          </div>

          {/* No inner card on this side: rows sit straight on the panel, split
              by rules. Each row is flex-1 so the rules land at even intervals,
              and `px-2.5` matches the status bar's inset so labels line up. */}
          <div className="mt-1 flex flex-1 flex-col divide-y divide-line">
            {statusRows.map((row, index) => (
              <motion.span
                key={row}
                className="flex flex-1 items-center gap-2 px-2.5"
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{
                  duration: 0.4,
                  delay: 1 + index * 0.13,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className={`${wideVisual.rowLabel} flex-1 truncate text-ink`}>
                  {row}
                </span>
                <span className="text-[10px] text-muted">Operational</span>
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-forest" />
              </motion.span>
            ))}
          </div>
        </div>

        {/* Both halves share the frame background so the only division is the
            rule between them — this side is the one that gets the inner card. */}
        <div className="hidden flex-col border-l border-line p-3 xl:flex">
          <p className={wideVisual.panelLabel}>Recent Activity</p>
          <div className="mt-2 flex flex-1 flex-col justify-around rounded-md border border-line bg-card px-2.5 py-1.5">
            {recentActivity.map((item, index) => (
              <motion.span
                key={item.label}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 4 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{
                  duration: 0.4,
                  delay: 0.9 + index * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest" />
                <span className={`${wideVisual.rowLabel} min-w-0 flex-1 truncate text-ink`}>
                  {item.label}
                </span>
                <span className="shrink-0 text-[9px] text-muted">{item.when}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1">
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
            repeat: 1,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}
