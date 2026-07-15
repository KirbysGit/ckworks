import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/projects";

type Props = {
  study: CaseStudy;
  /** featured = large image card; tile = tight homepage card; compact = text-only row card */
  variant?: "featured" | "tile" | "compact";
};

const groupLabels: Record<CaseStudy["group"], string> = {
  client: "Client Work",
  product: "Product",
  prototype: "Prototype",
};

export default function ProjectCard({ study, variant = "featured" }: Props) {
  if (variant === "tile") {
    return (
      <Link
        href={`/${study.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
      >
        <div className={`relative h-32 bg-gradient-to-br ${study.accent}`}>
          <div className="grid-texture absolute inset-0 opacity-25" />
          <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[10px] font-medium text-forest">
            {groupLabels[study.group]}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-[11px] font-medium text-forest">
            {study.category}
          </p>
          <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-ink">
            {study.name}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
            {study.teaser}
          </p>
          <p className="mt-4 text-[11px] font-medium text-ink/80">
            {study.workedOn.slice(0, 2).join(" / ")}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest">
            View project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/${study.slug}`}
        className="group flex flex-col rounded-2xl border border-line bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
      >
        <p className="text-xs font-medium text-forest">{study.category}</p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
          {study.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {study.teaser}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-forest">
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/${study.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
    >
      {/* image / mockup placeholder */}
      <div className={`relative aspect-[16/9] bg-gradient-to-br ${study.accent}`}>
        <div className="grid-texture absolute inset-0 opacity-25" />
        <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] font-medium text-forest">
          {study.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-serif text-2xl font-semibold text-ink">
          {study.name}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted">
          {study.teaser}
        </p>

        <div className="mt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            What I worked on
          </p>
          <p className="mt-1.5 text-sm text-ink">
            {study.workedOn.join(" · ")}
          </p>
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-forest">
          Read the breakdown
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
