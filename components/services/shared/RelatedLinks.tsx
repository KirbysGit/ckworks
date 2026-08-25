import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

/**
 * Contextual links out of a page, placed before its closing CTA.
 *
 * The anchor text is a descriptive phrase, not "Explore service" — the label
 * should say what is on the other side, since that is what tells a reader and
 * a crawler how the two pages relate. Repeating a generic label across every
 * page teaches neither anything.
 *
 * The nav and footer already link everything; this is for the relationships
 * that only make sense in the context of the page you are on.
 */
export type RelatedLink = {
  /** Descriptive phrase. Say what the destination covers. */
  label: string;
  href: string;
  /** One short line of context under the label. */
  note: string;
};

export default function RelatedLinks({
  heading = "Where this connects",
  links,
  compactMobile = false,
}: {
  heading?: string;
  links: RelatedLink[];
  compactMobile?: boolean;
}) {
  if (links.length === 0) return null;

  return (
    <Reveal as="section" className="border-t border-line/70 pt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
        {heading}
      </p>
      <div
        className={
          compactMobile
            ? "mt-4 max-sm:divide-y max-sm:divide-line sm:mt-5 sm:grid sm:grid-cols-2 sm:gap-3"
            : "mt-5 grid gap-3 sm:grid-cols-2"
        }
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              compactMobile
                ? "group flex flex-col py-3.5 transition-colors duration-200 hover:text-ink sm:rounded-xl sm:border sm:border-line sm:bg-card sm:px-5 sm:py-4 sm:shadow-soft sm:hover:border-forest/40 sm:hover:bg-forest-soft/30"
                : "group flex flex-col rounded-xl border border-line bg-card px-5 py-4 shadow-soft transition-colors duration-200 hover:border-forest/40 hover:bg-forest-soft/30"
            }
          >
            <span
              className={`inline-flex items-center gap-2 text-sm font-semibold text-forest ${
                compactMobile ? "justify-between sm:justify-start" : ""
              }`}
            >
              {link.label}
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
            <span
              className={`mt-1.5 text-[0.85rem] leading-6 text-muted ${
                compactMobile ? "hidden sm:block" : ""
              }`}
            >
              {link.note}
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
