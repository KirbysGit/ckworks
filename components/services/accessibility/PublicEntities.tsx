/**
 * Contained ADA Title II context for state and local government visitors.
 *
 * This band gives public entities a clear next step without redefining the
 * broader accessibility service as legal compliance work.
 *
 * Two things here are deliberate and should not be undone:
 *   - The left copy does not list websites, documents, portals and so on. That
 *     inventory lives once, in the right column. Restating it in both places is
 *     what made this band feel cluttered.
 *   - The dates are laid out as grid rows rather than as two self-centering
 *     cards, so both sit on one baseline no matter how the labels wrap.
 *
 * The dates and the standard are time-sensitive. Reverify against the DOJ
 * sources in `docs/web-accessibility-service.md` immediately before publishing.
 *
 * This is the heaviest band on the page, so it arrives line by line rather than
 * as one block: eyebrow, headline, the rule, the ask, the disclaimer, then the
 * dates and the inventory. Beats are declared once in `beat` below. Do not nest
 * a `ck-step` inside another `ck-step` - the opacities multiply and the child
 * reads dim - so a container either animates itself or animates its children,
 * never both.
 */
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  ClipboardList,
  ExternalLink,
  FileText,
  Monitor,
  PanelsTopLeft,
  Smartphone,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const deadlineTiers = [
  {
    audience: "Population 50,000 or more",
    date: "April 26, 2027",
    dateTime: "2027-04-26",
  },
  {
    audience: "Population under 50,000, and special districts",
    date: "April 26, 2028",
    dateTime: "2028-04-26",
  },
] as const;

/** Delay in ms, applied through `--ck-anim-delay` on a `ck-step` element. */
const beat = (ms: number) => ({ "--ck-anim-delay": `${ms}ms` }) as CSSProperties;

const reviewAreas = [
  { label: "Websites", icon: Monitor },
  { label: "Mobile apps", icon: Smartphone },
  { label: "Documents", icon: FileText },
  { label: "Online forms", icon: ClipboardList },
  { label: "Resident portals", icon: PanelsTopLeft },
  { label: "Vendor systems", icon: Blocks },
] as const;

export default function AccessibilityPublicEntities() {
  return (
    <section
      id="ada-title-ii"
      className="scroll-mt-24 border-b border-line py-10 lg:py-12"
    >
      <Reveal className="block overflow-hidden rounded-2xl bg-forest text-ivory shadow-soft">
        <div className="grid lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center">
          <div className="px-6 py-8 sm:px-9 lg:px-10 lg:py-8">
            <p
              className="ck-step text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-ivory/70"
              style={beat(40)}
            >
              For public entities
            </p>
            <h2
              className="ck-step mt-3 max-w-2xl font-serif text-[2rem] font-medium leading-[1.06] tracking-[-0.02em] sm:text-[2.3rem]"
              style={beat(120)}
            >
              Preparing state and local government websites for Title II
              requirements.
            </h2>
            <p
              className="ck-step mt-4 max-w-2xl text-sm leading-6 text-ivory/82"
              style={beat(210)}
            >
              The DOJ rule names WCAG 2.1 Level AA as the technical standard for
              covered web content and mobile applications. We help public
              entities find the barriers and plan the work before the date that
              applies to them.
            </p>

            <div
              className="ck-step mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5"
              style={beat(310)}
            >
              <Link
                href="/services/web-accessibility/ada-title-ii"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-ivory px-5 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-4 focus-visible:ring-offset-forest"
              >
                Explore ADA Title II support
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href="https://www.ada.gov/resources/2024-03-08-web-rule/"
                target="_blank"
                rel="noreferrer"
                className="-my-3 inline-flex items-center gap-2 py-3 text-xs font-semibold text-ivory underline decoration-ivory/40 underline-offset-4 transition-colors hover:decoration-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-4 focus-visible:ring-offset-forest"
              >
                Read the DOJ guidance
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
            <p
              className="ck-step mt-4 max-w-xl text-[0.62rem] leading-4 text-ivory/52"
              style={beat(400)}
            >
              Technical accessibility services, not legal advice or compliance
              certification.
            </p>
          </div>

          <div className="border-t border-ivory/18 px-6 py-7 sm:px-9 lg:border-t-0 lg:px-10 lg:py-8">
            {/* Labels occupy row 1 and dates row 2, so the two dates share a
                baseline even though one label wraps and the other does not. */}
            <p
              className="ck-step mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              style={beat(240)}
            >
              Compliance dates
            </p>
            <div
              className="ck-step rounded-xl bg-ivory px-5 py-5 text-ink shadow-soft sm:px-6"
              style={beat(300)}
            >
              <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)]">
                <p className="order-1 text-[0.72rem] font-semibold leading-4 text-ink sm:order-none">
                  {deadlineTiers[0].audience}
                </p>
                <span className="row-span-2 hidden bg-line sm:block" aria-hidden />
                <p className="order-3 mt-5 border-t border-line pt-5 text-[0.72rem] font-semibold leading-4 text-ink sm:order-none sm:mt-0 sm:border-t-0 sm:pt-0">
                  {deadlineTiers[1].audience}
                </p>
                {deadlineTiers.map((tier, index) => (
                  <time
                    key={tier.dateTime}
                    dateTime={tier.dateTime}
                    className={`${index === 0 ? "order-2" : "order-4"} mt-4 block whitespace-nowrap font-serif text-[1.95rem] font-semibold leading-none tracking-[-0.025em] text-ink lining-nums tabular-nums sm:order-none sm:text-[2.15rem]`}
                  >
                    {tier.date}
                  </time>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p
                className="ck-step text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ivory/70"
                style={beat(420)}
              >
                What may need review
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6">
                {reviewAreas.map(({ label, icon: Icon }, index) => (
                  <li
                    key={label}
                    style={beat(480 + index * 55)}
                    className={`ck-step flex items-center gap-2.5 py-2 text-sm leading-6 text-ivory/85 ${
                      index > 1 ? "border-t border-ivory/18" : ""
                    }`}
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-ivory/75"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
