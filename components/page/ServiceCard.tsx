import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServiceArea } from "@/lib/services";

export default function ServiceCard({ service }: { service: ServiceArea }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-forest/35 hover:shadow-lift"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-soft text-forest">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-forest">
        {service.eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-ink">
        {service.title}
      </h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted">
        {service.description}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest">
        View service
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
