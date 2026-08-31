/** Closing CTA on the Web Accessibility page. */
import { ArrowRight } from "lucide-react";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import Reveal from "@/components/ui/Reveal";

export default function AccessibilityBottomCta() {
  return (
    <Reveal className="mt-10 flex flex-col gap-5 rounded-xl border border-line bg-card px-6 py-7 text-center shadow-soft sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
      <div className="mx-auto max-w-xl lg:mx-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
          Web Accessibility
        </p>
        <h2 className="mt-3 font-serif text-[1.85rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.15rem]">
          Make the next step easier for more people.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-ink/75 sm:text-[0.95rem] lg:mx-0">
          Send over your site and a little context about who uses it, and
          I&apos;ll suggest a practical starting point.
        </p>
      </div>

      <div className="mx-auto flex w-fit shrink-0 flex-col items-stretch gap-4 lg:mx-0">
        <ProjectInquiryTrigger
          source="accessibility_service_bottom_cta"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
        >
          Request an accessibility review
          <ArrowRight className="h-4 w-4" />
        </ProjectInquiryTrigger>
      </div>
    </Reveal>
  );
}
