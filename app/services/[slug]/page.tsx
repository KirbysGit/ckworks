import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnalyticsPage from "@/components/services/analytics/Page";
import SearchVisibilityPage from "@/components/services/search-visibility/Page";
import OngoingSupportPage from "@/components/services/support/Page";
import SystemsPage from "@/components/services/systems/Page";
import GenericServicePage from "@/components/services/shared/GenericServicePage";
import WebDesignPage from "@/components/services/web-design/Page";
import { createPageMetadata } from "@/lib/seo";
import {
  getServiceArea,
  serviceAreas,
  type ServiceArea,
  type ServiceSlug,
} from "@/lib/services";

type Props = {
  params: Promise<{ slug: string }>;
};

type ServiceExperience = ComponentType<{ service: ServiceArea }>;

const bespokePages: Partial<Record<ServiceSlug, ServiceExperience>> = {
  "web-design-development": WebDesignPage,
  "search-ai-visibility": SearchVisibilityPage,
  "analytics-lead-tracking": AnalyticsPage,
  "digital-systems-integrations": SystemsPage,
  "ongoing-support": OngoingSupportPage,
};

export function generateStaticParams() {
  return serviceAreas.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceArea(slug);
  if (!service) return {};

  return createPageMetadata({
    title: service.title,
    description: service.description,
    path: service.href,
  });
}

/** Resolves the service route; bespoke layouts live in their feature folders. */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceArea(slug);
  if (!service) notFound();

  const Experience = bespokePages[service.slug];
  return Experience ? (
    <Experience service={service} />
  ) : (
    <GenericServicePage service={service} />
  );
}
