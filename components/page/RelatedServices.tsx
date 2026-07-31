import ServiceCard from "./ServiceCard";
import {
  getServiceArea,
  type ServiceArea,
  type ServiceSlug,
} from "@/lib/services";

export default function RelatedServices({ slugs }: { slugs: ServiceSlug[] }) {
  const services = slugs
    .map((slug) => getServiceArea(slug))
    .filter((service): service is ServiceArea => Boolean(service));

  if (services.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
