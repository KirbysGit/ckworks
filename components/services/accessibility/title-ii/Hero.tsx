/**
 * Opens the ADA Title II child page with a public-service journey rather than
 * a compliance score. The legal framing stays brief and points to the DOJ.
 */
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  serviceContainer,
  serviceHeroTitleClassName,
} from "@/components/services/shared/styles";
import PublicJourneyMockup from "./PublicJourneyMockup";

const heroTiming = {
  eyebrow: 0,
  title: 80,
  copy: 170,
  actions: 260,
  visual: 180,
} as const;

export default function AdaTitleIiHero() {
  return (
    <section className="min-h-[calc(100svh-5rem)] overflow-hidden border-b border-line bg-ivory">
      <div
        className={`${serviceContainer} grid min-h-[calc(100svh-5rem)] items-center gap-12 py-10 sm:py-12 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:gap-12 lg:py-16 xl:gap-16`}
      >
        <div className="relative z-10 max-w-[31rem] text-center sm:text-left lg:self-start">
          <p
            className="ck-rise text-xs font-semibold uppercase tracking-[0.28em] text-forest"
            style={{ animationDelay: `${heroTiming.eyebrow}ms` }}
          >
            ADA Title II
          </p>
          <h1
            className={`ck-rise ${serviceHeroTitleClassName}`}
            style={{ animationDelay: `${heroTiming.title}ms` }}
          >
            Digital access for public services.
          </h1>
          <div
            className="ck-rise mx-auto mt-6 max-w-md space-y-3 text-base leading-7 text-ink/78 sm:mx-0 sm:text-[1.05rem]"
            style={{ animationDelay: `${heroTiming.copy}ms` }}
          >
            <p>
              Title II sets an accessibility standard for state and local
              government websites and mobile applications.
            </p>
            <p>
              We help public teams identify barriers, prioritize fixes, and
              plan what to address first.
            </p>
          </div>

          <div
            className="ck-rise mt-7 flex flex-col items-center gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: `${heroTiming.actions}ms` }}
          >
            <Link
              href="#who-is-affected"
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:text-base"
            >
              Who Title II affects
              <ArrowDown className="size-4" aria-hidden />
            </Link>
            <a
              href="https://www.ada.gov/resources/2024-03-08-web-rule/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 py-1 text-sm font-semibold text-forest underline decoration-forest/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-forest/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              Read current DOJ guidance
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>

          <p className="mt-5 text-[0.65rem] leading-4 text-muted">
            Technical accessibility services, not legal advice or compliance
            certification.
          </p>
        </div>

        <div
          className="ck-rise relative z-20 min-w-0 lg:pl-5 xl:pl-8"
          style={{ animationDelay: `${heroTiming.visual}ms` }}
        >
          <PublicJourneyMockup />
        </div>
      </div>
    </section>
  );
}
