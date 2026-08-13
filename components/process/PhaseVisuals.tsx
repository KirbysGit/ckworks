import Image from "next/image";
import { Check } from "lucide-react";

/**
 * The four illustrations beside the process phases.
 *
 * These sit below the fold inside a `Reveal` (see `PhaseSection` in
 * `app/process/page.tsx`), so they are deliberately static — a `ck-*` primitive
 * nested in a `Reveal` runs and finishes while the section is still off-screen.
 *
 * Stage 03 uses the Hearth & Home demo already registered for this page in
 * `docs/demo-registry.md`, framed inside device mockups so it reads as an
 * illustration rather than a delivered project.
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

function CheckDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-forest ${className}`}
    >
      <Check className="h-2.5 w-2.5 text-ivory" strokeWidth={3.5} />
    </span>
  );
}

/** 01 — the brief: what we need to know before anything gets designed. */
export function BriefVisual() {
  return (
    <div className="relative" aria-hidden>
      {/* Second sheet peeking out behind, so the brief reads as paper. */}
      <span className="absolute inset-y-6 right-0 w-[14%] rounded-r-xl border border-line bg-[#DDE2D8]" />

      <div className="relative mr-[6%] rounded-xl border border-line bg-card px-5 py-6 shadow-[0_2px_4px_rgba(31,36,32,0.05),0_20px_40px_-32px_rgba(31,36,32,0.5)] sm:px-7 sm:py-8">
        {/* Paperclip */}
        <svg
          className="absolute -top-4 right-7 h-11 w-6 text-muted/70"
          viewBox="0 0 24 44"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M17 12v18a7 7 0 0 1-14 0V10a5 5 0 0 1 10 0v19a3 3 0 0 1-6 0V13" />
        </svg>

        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">
          Project Brief
        </p>

        <div className="mt-6 space-y-4">
          {briefRows.map((row) => (
            <div key={row} className="flex items-center gap-3">
              <CheckDot />
              <span className="whitespace-nowrap text-sm text-ink/85">
                {row}
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 02 — the same content, now with a shape: one page tree, one plan. */
export function SitemapVisual() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-card shadow-[0_2px_4px_rgba(31,36,32,0.05),0_20px_40px_-32px_rgba(31,36,32,0.5)]"
      aria-hidden
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        {["#C87264", "#D8A847", "#5F9C69"].map((tone) => (
          <span
            key={tone}
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: tone }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center px-4 py-7 sm:px-6">
        <span className="rounded-md bg-forest px-6 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ivory">
          Home
        </span>

        {/* Trunk, then a rail spanning the outer children, then one drop each. */}
        <span className="h-5 w-px bg-line" />
        <span className="h-px w-[75%] bg-line" />

        <div className="grid w-full grid-cols-4 gap-2 sm:gap-3">
          {sitemapPages.map((page) => (
            <div key={page} className="flex flex-col items-center">
              <span className="h-5 w-px bg-line" />
              <span className="w-full truncate rounded border border-line bg-ivory px-1 py-1.5 text-center text-[0.6rem] font-medium uppercase tracking-[0.08em] text-ink">
                {page}
              </span>

              <div className="mt-3 w-full space-y-1.5 rounded border border-line bg-ivory/60 px-2 py-2.5">
                <span className="block h-1 w-full rounded-full bg-line" />
                <span className="block h-1 w-4/5 rounded-full bg-line/80" />
                <span className="block h-1 w-3/5 rounded-full bg-line/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** 03 — design and build: the plan becomes a real, responsive interface. */
export function BuildVisual() {
  return (
    <div className="relative pb-4 pr-[14%]" aria-hidden>
      {/* Laptop */}
      <div className="relative">
        <div className="rounded-t-xl bg-[linear-gradient(150deg,#2A312B,#171D18)] p-2 shadow-[0_24px_44px_-30px_rgba(17,23,20,0.75)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-card">
            <Image
              src="/images/services/png/01-hearth-home-demo.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 540px, 92vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <div className="mx-[-6%] h-3 rounded-b-xl bg-[linear-gradient(180deg,#6B766C,#2A312B)] shadow-[0_14px_24px_-18px_rgba(17,23,20,0.8)]">
          <span className="mx-auto block h-1 w-[18%] rounded-b bg-black/25" />
        </div>
      </div>

      {/* Phone, overlapping the laptop's lower-right corner */}
      <div className="absolute bottom-0 right-0 w-[26%] min-w-[5.5rem] max-w-[8rem]">
        <div className="rounded-[1.1rem] bg-[linear-gradient(150deg,#2A312B,#171D18)] p-1.5 shadow-[0_20px_36px_-24px_rgba(17,23,20,0.85)]">
          <div className="relative aspect-[9/17] overflow-hidden rounded-[0.75rem] bg-card">
            {/* `sizes` has to describe the source width object-cover needs, not
                the phone's own width: a landscape screenshot filling a 9/17
                frame is scaled to cover the *height*, so a 140px variant would
                land ~2.8x upscaled. */}
            <Image
              src="/images/services/png/01-hearth-home-demo.png"
              alt=""
              fill
              sizes="420px"
              className="object-cover object-left-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** 04 — launch: what gets checked, and the moment it goes live. */
export function LaunchVisual() {
  return (
    <div className="relative" aria-hidden>
      {/* Tape strip, so the checklist reads as something pinned up. */}
      <span className="absolute -top-3 left-6 z-10 h-6 w-20 -rotate-6 bg-[#E4D9BE]/80 shadow-[0_2px_4px_rgba(31,36,32,0.08)]" />

      <div className="grid overflow-hidden rounded-xl border border-line bg-card shadow-[0_2px_4px_rgba(31,36,32,0.05),0_20px_40px_-32px_rgba(31,36,32,0.5)] sm:grid-cols-[1.35fr_1fr]">
        <div className="px-5 py-6 sm:px-6">
          <p className="border-b border-line pb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">
            Launch Checklist
          </p>
          <div className="mt-4 space-y-3">
            {launchChecklist.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckDot />
                <span className="text-[0.8rem] text-ink/85">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 border-t border-line px-5 py-7 text-center sm:border-l sm:border-t-0">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-forest text-forest">
            <Check className="h-7 w-7" strokeWidth={2} />
          </span>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">
            Live
          </p>
          <p className="max-w-[9rem] text-xs leading-5 text-muted">
            Your site is live and ready.
          </p>
        </div>
      </div>
    </div>
  );
}
