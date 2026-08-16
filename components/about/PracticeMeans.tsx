import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Database,
  PanelsTopLeft,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { animDelay } from "@/lib/motion";

/**
 * Owns the compact follow-on to the About page Venn: three practical ways
 * CK Works' creative and technical overlap shows up in client work.
 */

const practiceAreas: {
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Websites",
    body: "New sites and redesigns that make your business easier to understand, trust, and contact.",
    linkLabel: "Explore web design",
    href: "/services/web-design-development",
    icon: PanelsTopLeft,
  },
  {
    title: "Digital systems",
    body: "Forms, workflows, dashboards, integrations, and internal tools that save time and reduce friction.",
    linkLabel: "Explore digital systems",
    href: "/services/digital-systems-integrations",
    icon: Database,
  },
  {
    title: "Improvements over time",
    body: "Search visibility, analytics, fixes, updates, and continued refinement as your business grows.",
    linkLabel: "See all services",
    href: "/services",
    icon: ChartNoAxesCombined,
  },
];

export default function PracticeMeans() {
  return (
    <section className="border-b border-line/70 bg-ivory py-12 lg:py-14">
      <div className="container-ck">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
            In practice, this usually means
          </p>

          <div className="mt-8 grid divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:border-y-0">
            {practiceAreas.map(({ title, body, linkLabel, href, icon: Icon }, index) => (
              <article
                key={title}
                className="ck-step flex min-h-[17rem] flex-col px-0 py-8 first:pt-0 last:pb-0 sm:min-h-[18rem] sm:px-9 sm:py-0 first:sm:pl-0 last:sm:pr-0"
                style={animDelay(120 + index * 110)}
              >
                <Icon
                  className="h-11 w-11 text-forest"
                  strokeWidth={1.35}
                  aria-hidden
                />
                <h2 className="mt-5 font-serif text-3xl font-medium leading-tight text-ink lg:text-[2.1rem]">
                  {title}
                </h2>
                <p className="mt-3 max-w-[18rem] text-[0.95rem] leading-7 text-ink/80">
                  {body}
                </p>
                <Link
                  href={href}
                  className="mt-1 inline-flex w-fit items-center gap-3 pt-7 text-sm font-semibold text-forest transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-4"
                >
                  {linkLabel}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </Link>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
