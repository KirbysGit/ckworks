/**
 * Bespoke Web Accessibility service experience.
 *
 * Built band by band against the skeleton in `docs/web-accessibility-service.md`.
 * TODO(Colin): remaining bands, in page order - hero, what CK Works reviews,
 * barriers to practical improvements, how these tools help, new and existing
 * websites, the contained Title II band, FAQ, and related services plus the
 * closing CTA. Do not publish until the launch gate in
 * `docs/accessibility-audit.md` is addressed.
 */
import ServiceFrame from "../shared/ServiceFrame";
import { serviceContainer } from "../shared/styles";
import type { ServiceArea } from "@/lib/services";
import AccessibilityWaysOfUsing from "./WaysOfUsing";

export default function Page({ service }: { service: ServiceArea }) {
  return (
    <ServiceFrame service={service}>
      <section className="bg-ivory pb-10 pt-6 sm:pb-12 sm:pt-8 lg:pb-16 lg:pt-10">
        <div className={serviceContainer}>
          <AccessibilityWaysOfUsing />
        </div>
      </section>
    </ServiceFrame>
  );
}
