import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { CaseStudy } from "@/lib/projects";

type Props = {
  study: CaseStudy;
  /** featured = large image card; tile = tight homepage card; compact = image row card */
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
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
        <ProjectImage study={study} className="h-32" />
        <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[10px] font-medium text-forest">
          {groupLabels[study.group]}
        </span>

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
          <ProjectActions study={study} className="mt-4" />
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group grid gap-4 rounded-2xl border border-line bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift sm:grid-cols-[9rem_1fr] sm:items-stretch">
        <ProjectImage study={study} className="min-h-28 rounded-xl sm:h-full" />
        <div className="flex flex-col py-1">
          <p className="text-xs font-medium text-forest">{study.category}</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
            {study.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
            {study.teaser}
          </p>
          <ProjectActions study={study} className="mt-5" />
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
      <ProjectImage study={study} className="aspect-[16/9]" />
      <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[11px] font-medium text-forest">
        {study.category}
      </span>

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
            {study.workedOn.join(" / ")}
          </p>
        </div>

        <ProjectActions study={study} className="mt-6" breakdown />
      </div>
    </article>
  );
}

function ProjectActions({
  study,
  className = "",
  breakdown = false,
}: {
  study: CaseStudy;
  className?: string;
  breakdown?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Link
        href={`/${study.slug}`}
        className="inline-flex items-center gap-1.5 rounded-md bg-forest px-3 py-2 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-ink"
      >
        {breakdown ? "Read the breakdown" : "View project"}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
      {study.liveUrl && (
        <a
          href={study.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-card px-3 py-2 text-sm font-medium text-forest transition-colors duration-200 hover:border-forest/40 hover:bg-forest-soft"
        >
          Live site
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </div>
  );
}

function ProjectImage({
  study,
  className,
}: {
  study: CaseStudy;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${study.accent} ${className}`}
    >
      {study.coverImage ? (
        <>
          <Image
            src={study.coverImage.src}
            alt={study.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: study.coverImage.position ?? "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
        </>
      ) : (
        <div className="grid-texture absolute inset-0 opacity-25" />
      )}
    </div>
  );
}
