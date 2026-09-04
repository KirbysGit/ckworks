/**
 * Closing CTA for the ADA Title II page.
 *
 * The primary action names the audience and the deliverable rather than the
 * rule, so the sales action reads as a service and not as a compliance claim.
 *
 * Carries the `public-entity` inquiry intent, which prefills the form with the
 * ADA framing. That intent existed but had no caller once the parent page's
 * public-entity band was repointed at this page, so this is where it lands.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import Reveal from "@/components/ui/Reveal";
import { serviceContainer } from "@/components/services/shared/styles";

export default function AdaTitleIiBottomCta() {
  return (
    <section className="bg-ivory py-16 sm:py-20 lg:py-24">
      <div className={serviceContainer}>
        <Reveal className="flex flex-col gap-5 rounded-xl border border-line bg-card px-6 py-7 text-center shadow-soft sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
          <div className="mx-auto max-w-xl lg:mx-0">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
              Public-entity accessibility
            </p>
            <h2 className="mt-3 font-serif text-[1.85rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.15rem]">
              Start with a focused review.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-ink/75 sm:text-[0.95rem] lg:mx-0">
              Share the public services, pages, documents, or systems that
              matter most. We&apos;ll help define a practical technical review
              scope and determine the appropriate next step.
            </p>
          </div>

          <div className="mx-auto flex w-fit shrink-0 flex-col items-stretch gap-4 lg:mx-0">
            <ProjectInquiryTrigger
              source="ada_title_ii_bottom_cta"
              intent="public-entity"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
            >
              Request a public-entity accessibility review
              <ArrowRight className="h-4 w-4" />
            </ProjectInquiryTrigger>

            <Link
              href="/services/web-accessibility"
              className="py-1 text-center text-sm font-semibold text-forest underline decoration-forest/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-forest/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              Explore the general accessibility service
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
