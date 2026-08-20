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
}: {
  heading?: string;
  links: RelatedLink[];
}) {
  if (links.length === 0) return null;

  return (
    <Reveal as="section" className="border-t border-line/70 pt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
        {heading}
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col rounded-xl border border-line bg-card px-5 py-4 shadow-soft transition-colors duration-200 hover:border-forest/40 hover:bg-forest-soft/30"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest">
              {link.label}
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1.5 text-[0.85rem] leading-6 text-muted">
              {link.note}
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
