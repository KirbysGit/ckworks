import { type ReactNode } from "react";
import SectionLabel from "./SectionLabel";

/**
 * ── Section header line-widths (the easy knobs) ──────────────────────────
 * Max width of the title / subtitle, in rem. Change these two numbers to
 * retune how wide headers get across EVERY section at once.
 *   • bigger title number  → title wraps to fewer, longer lines
 *   • closer the two numbers are → title & subtitle look more aligned
 * For a one-off, pass `titleWidth` / `subtitleWidth` on a single <SectionHeader>.
 *
 * (Applied via inline maxWidth rather than Tailwind's max-w-* so any value
 * works — Tailwind only ships the class names it sees at build time.)
 */
export const sectionWidths = {
  title: 80, // rem  (56 = old max-w-4xl)
  subtitle: 50, // rem  (48 = old max-w-3xl)
};

type Props = {
  /** Optional uppercase eyebrow above the title. */
  label?: string;
  title: ReactNode;
  /** Optional supporting line under the title. */
  subtitle?: ReactNode;
  className?: string;
  /** Per-section width overrides in rem (default: sectionWidths above). */
  titleWidth?: number;
  subtitleWidth?: number;
};

/**
 * Shared left-aligned section header (label · title · subtitle).
 * Title uses a wide measure so large serif headings stay 1–2 short lines;
 * the subtitle a slightly narrower one. Tune via `sectionWidths` above.
 */
export default function SectionHeader({
  label,
  title,
  subtitle,
  className = "",
  titleWidth,
  subtitleWidth,
}: Props) {
  return (
    <div className={className}>
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2
        style={{ maxWidth: `${titleWidth ?? sectionWidths.title}rem` }}
        className={`font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl ${
          label ? "mt-4" : ""
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{ maxWidth: `${subtitleWidth ?? sectionWidths.subtitle}rem` }}
          className="mt-3 text-base leading-7 text-muted sm:text-lg"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
