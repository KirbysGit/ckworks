/**
 * Bespoke Web Accessibility service experience.
 *
 * Built band by band against the skeleton in `docs/web-accessibility-service.md`.
 * TODO(Colin): remaining bands - the contained Title II band and the new-versus-
 * existing-websites band, both of which belong above the FAQ. Do not publish
 * until the launch gate in `docs/accessibility-audit.md` is addressed.
 */
import ServiceFrame from "../shared/ServiceFrame";
import { serviceContainer } from "../shared/styles";
import type { ServiceArea } from "@/lib/services";
import AccessibilityBarriersToImprovements from "./BarriersToImprovements";
import AccessibilityBottomCta from "./BottomCta";
import AccessibilityFaq from "./Faq";
import AccessibilityHero from "./Hero";
import AccessibilityRelated from "./Related";
import AccessibilityToolsAndLimits from "./ToolsAndLimits";
import AccessibilityWaysOfUsing from "./WaysOfUsing";
import AccessibilityWhatGetsReviewed from "./WhatGetsReviewed";

export default function Page({ service }: { service: ServiceArea }) {
  return (
    <ServiceFrame service={service}>
      <AccessibilityHero />
      <section className="bg-ivory pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-16 lg:pt-10">
        <div className={serviceContainer}>
          <AccessibilityWaysOfUsing />
          <AccessibilityWhatGetsReviewed />
          <AccessibilityBarriersToImprovements />
          <AccessibilityToolsAndLimits />
          <AccessibilityFaq />
          <AccessibilityRelated />
          <AccessibilityBottomCta />
        </div>
      </section>
    </ServiceFrame>
  );
}
