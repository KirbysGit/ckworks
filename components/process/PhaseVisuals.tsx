import type { ReactNode } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

/**
 * The four illustrations beside the process phases.
 *
 * Deliberately restrained. `docs/design-system.md` warns against decorative
 * cards and card-inside-card compositions, so each of these is a single framed
 * surface sitting directly on the page band — no outer wrapper, no props
 * (paperclips, tape, stacked sheets), and no colour outside the tokens.
 *
 * 02 and 03 share one `BrowserFrame`: the same window holding a wireframe and
 * then a finished site is the rough-to-clean story told properly, and it keeps
 * the section from inventing a second device language. The near-black device
 * bezel used earlier is gone — `panel` is reserved for one use site-wide.
 *
 * These sit below the fold inside a `Reveal` (see `PhaseSection`), so they are
 * static: a `ck-*` primitive nested in a `Reveal` runs and finishes while the
 * section is still off-screen.
 *
 * Stage 03 uses the Hearth & Home demo registered for this page in
 * `docs/demo-registry.md`; the browser frame is its illustrative marker.
 */

const briefRows = [
  "Business goals",
  "Target audience",
  "Current site review",
  "Top priorities",
  "Success metrics",
] as const;

const sitemapPages = ["About", "Services", "Work", "Contact"] as const;

const launchChecklist = [
  "Cross-browser testing",
  "Mobile responsiveness",
  "Performance checks",
  "SEO basics",
  "Forms & integrations",
  "Analytics & tracking",
  "Final review",
] as const;

/** Shared surface. Matches `components/ui/Card` without the extra nesting. */
function Surface({ children }: { children: ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft"
      aria-hidden
    >
      {children}
    </div>
  );
}

/** Neutral window chrome. No traffic-light colours — they sit outside the palette. */
function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <Surface>
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="h-1.5 w-1.5 rounded-full bg-line" />
        ))}
        <span className="ml-2 h-1.5 w-24 rounded-full bg-line/60" />
      </div>
      {children}
    </Surface>
  );
}

function CheckRow({ label, rule = false }: { label: string; rule?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Check className="h-3.5 w-3.5 shrink-0 text-forest" strokeWidth={2.5} />
      <span className="whitespace-nowrap text-sm text-ink/85">{label}</span>
      {rule && <span className="h-px flex-1 bg-line" />}
    </div>
  );
}

/** 01 — the brief: what we need to know before anything gets designed. */
export function BriefVisual() {
  return (
    <Surface>
      <div className="px-6 py-7 sm:px-8 sm:py-9">
        <p className="border-b border-line pb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
          Project Brief
        </p>
        <div className="mt-6 space-y-4">
          {briefRows.map((row) => (
            <CheckRow key={row} label={row} rule />
          ))}
        </div>
      </div>
    </Surface>
  );
}

/** 02 — the same content, now with a shape: one page tree, one plan. */
export function SitemapVisual() {
  return (
    <BrowserFrame>
      <div className="flex flex-col items-center px-5 py-8 sm:px-8">
        <span className="rounded-md border border-forest/30 bg-forest-soft/60 px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-forest">
          Home
        </span>

        {/* Trunk, then a rail spanning the outer children, then one drop each. */}
        <span className="h-6 w-px bg-line" />
        <span className="h-px w-[75%] bg-line" />

        <div className="grid w-full grid-cols-4 gap-2 sm:gap-4">
          {sitemapPages.map((page) => (
            <div key={page} className="flex flex-col items-center">
              <span className="h-6 w-px bg-line" />
              <span className="w-full truncate rounded border border-line px-1 py-2 text-center text-[0.6rem] font-medium uppercase tracking-[0.08em] text-muted">
                {page}
              </span>
              <div className="mt-3 w-full space-y-2">
                <span className="block h-px w-full bg-line" />
                <span className="block h-px w-4/5 bg-line" />
                <span className="block h-px w-3/5 bg-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

/** 03 — design and build: the plan becomes a real, responsive interface. */
export function BuildVisual() {
  return (
    <BrowserFrame>
      <div className="relative aspect-[16/10]">
        <Image
          src="/images/services/png/01-hearth-home-demo.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 780px, 92vw"
          className="object-cover object-top"
        />
      </div>
    </BrowserFrame>
  );
}

/** 04 — launch: what gets checked, and the moment it goes live. */
export function LaunchVisual() {
  return (
    <Surface>
      <div className="grid sm:grid-cols-[1.4fr_1fr]">
        <div className="px-6 py-7 sm:px-8 sm:py-9">
          <p className="border-b border-line pb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
            Launch Checklist
          </p>
          <div className="mt-6 space-y-3.5">
            {launchChecklist.map((item) => (
              <CheckRow key={item} label={item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 border-t border-line px-6 py-8 text-center sm:border-l sm:border-t-0">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-forest/40 text-forest">
            <Check className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">
            Live
          </p>
          <p className="max-w-[9rem] text-xs leading-5 text-muted">
            Your site is live and ready.
          </p>
        </div>
      </div>
    </Surface>
  );
}
