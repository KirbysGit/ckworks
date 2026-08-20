import type { ReactNode } from "react";
import ServiceViewed from "@/components/analytics/ServiceViewed";
import SiteLayout from "@/components/layout/SiteLayout";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { absoluteUrl, organizationRef } from "@/lib/seo";
import type { ServiceArea } from "@/lib/services";

/** Wraps every bespoke service experience with stable layout, tracking, and schema. */
export default function ServiceFrame({
  service,
  children,
}: {
  service: ServiceArea;
  children: ReactNode;
}) {
  return (
    <SiteLayout>
      <ServiceViewed name={service.title} slug={service.slug} />
      <ServiceSchema service={service} />
      {children}
    </SiteLayout>
  );
}

function ServiceSchema({ service }: { service: ServiceArea }) {
  return (
    <SchemaMarkup
      id={`${service.slug}-schema`}
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            name: service.title,
            url: absoluteUrl(service.href),
            description: service.description,
            provider: organizationRef,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Services",
                item: absoluteUrl("/services"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: service.title,
                item: absoluteUrl(service.href),
              },
            ],
          },
        ],
      }}
    />
  );
}
