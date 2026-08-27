import type { ReactNode } from "react";
import { contactEmail } from "@/lib/data";

/**
 * Shared layout for the legal pages (`/privacy-policy`, `/terms`).
 *
 * A legal page is mostly prose, and prose in a 1360px container reads as a
 * narrow strip stranded beside dead space. These bands use the house split
 * instead: a numbered heading introduces on the left while the copy keeps a
 * comfortable measure on the right, and the heading sticks as its own section
 * scrolls so the reader always knows which clause they are in.
 *
 * Pass `wide` when the body is cards or a grid rather than paragraphs, and
 * `last` on the final band to drop the trailing rule.
 */
export function LegalSection({
  id,
  number,
  label,
  title,
  children,
  wide = false,
  last = false,
}: {
  id?: string;
  number: string;
  label: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
  last?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 bg-ivory py-9 sm:py-12 lg:py-16 ${last ? "" : "border-b border-line/70"}`}
    >
      <div className="container-ck grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-[0.68rem] font-semibold text-ivory sm:h-9 sm:w-9 sm:text-[0.72rem]">
              {number}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
              {label}
            </span>
          </div>
          <h2 className="mt-4 max-w-sm font-serif text-[1.7rem] font-medium leading-[1.15] text-ink sm:mt-5 sm:text-[2.15rem]">
            {title}
          </h2>
          <span
            className="mt-4 block h-px w-10 bg-forest/50 sm:mt-5"
            aria-hidden
          />
        </div>

        <div
          className={`space-y-4 text-[0.95rem] leading-7 text-ink/80 sm:space-y-5 sm:text-base sm:leading-8 ${
            wide ? "" : "max-w-[38rem]"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

/** A single emphasized line, so it reads as a note rather than a paragraph. */
export function LegalCallout({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-forest/25 bg-forest-soft/35 px-4 py-4 text-[0.92rem] leading-7 text-ink sm:px-5 sm:text-[0.97rem]">
      {children}
    </p>
  );
}

/** Strip above the first band carrying the effective date. */
export function LegalUpdatedBar({ date }: { date: string }) {
  return (
    <div className="border-b border-line/70 bg-card/30">
      <div className="container-ck flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-4 sm:justify-start">
        <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-forest">
          Last updated
        </span>
        <span className="text-sm text-muted">{date}</span>
      </div>
    </div>
  );
}

export function LegalEmail() {
  return (
    <a
      className="font-medium text-forest underline decoration-forest/35 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/40"
      href={`mailto:${contactEmail}`}
    >
      {contactEmail}
    </a>
  );
}

/** Bulleted item with a forest marker, matching the policy list styling. */
export function LegalListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-forest"
        aria-hidden
      />
      <span>{children}</span>
    </li>
  );
}
