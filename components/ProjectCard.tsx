import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Database,
  ExternalLink,
  Globe2,
  Layers3,
  Monitor,
  Palette,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Workflow,
} from "lucide-react";
import type { CaseStudy } from "@/lib/projects";

type Props = {
  study: CaseStudy;
  /** featured = large image card; tile = selected-work card; compact = horizontal row */
  variant?: "featured" | "tile" | "compact";
};

type MetaItem = {
  label: string;
  icon: typeof Globe2;
};

const groupIcons: Record<CaseStudy["group"], typeof Globe2> = {
  client: Briefcase,
  product: Layers3,
  prototype: Monitor,
};

const displayNames: Record<string, string> = {
  tizirsso: "Tizirsso Racing",
  taylor: "Taylor.io",
  centi: "Centi",
  setlst: "SETLST",
};

const featuredDescriptions: Record<string, string> = {
  tizirsso:
    "Turned a professional karting career into a clearer story for fans, sponsors, and future opportunities.",
  taylor:
    "Built guided resume workflows and structured data to help users create stronger, more targeted resumes.",
  centi:
    "Connected accounts, uploaded transactions, and clearer insights into spending, savings, and financial goals.",
  setlst:
    "Explores how live music activity, workout consistency, and social features can come together in one app.",
};

const cardMeta: Record<string, MetaItem[]> = {
  tizirsso: [
    { label: "Web", icon: Globe2 },
    { label: "2026", icon: Calendar },
  ],
  taylor: [
    { label: "Web", icon: Globe2 },
    { label: "Full-Stack", icon: Layers3 },
    { label: "2026", icon: Calendar },
  ],
  centi: [
    { label: "Web", icon: Globe2 },
    { label: "API Integrations", icon: Database },
    { label: "2025", icon: Calendar },
  ],
  setlst: [
    { label: "Mobile", icon: Smartphone },
    { label: "iOS / Android", icon: Monitor },
    { label: "2026", icon: Calendar },
  ],
};

const compactIcons: Record<string, typeof Globe2> = {
  "ck-dev": Palette,
  "sentiment-trader": TrendingUp,
  "internal-automation-tool": Workflow,
  securescape: ShieldCheck,
};

export default function ProjectCard({ study, variant = "featured" }: Props) {
  if (variant === "compact") {
    return <CompactProjectRow study={study} />;
  }

  return <FeaturedProjectCard study={study} />;
}

function FeaturedProjectCard({ study }: { study: CaseStudy }) {
  const meta = cardMeta[study.slug] ?? [
    { label: study.badge, icon: Briefcase },
  ];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
      <ProjectImage
        study={study}
        className="h-56"
        sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
        showLiveIcon
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 font-serif text-2xl font-semibold leading-tight text-ink">
            {displayNames[study.slug] ?? study.name}
          </h3>
          <ProjectTypePill study={study} />
        </div>
        <p className="mt-2 text-xs font-medium text-forest">
          {study.category}
        </p>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {featuredDescriptions[study.slug] ?? study.teaser}
        </p>

        <ProjectMeta items={meta} />
        <ProjectActions study={study} className="mt-5" />
      </div>
    </article>
  );
}

function CompactProjectRow({ study }: { study: CaseStudy }) {
  const Icon = compactIcons[study.slug] ?? groupIcons[study.group];

  return (
    <article className="group flex h-full min-h-72 flex-col rounded-xl border border-line bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-soft text-forest">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-medium text-forest">
          {study.badge}
        </span>
      </div>

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div>
          <h3 className="font-serif text-xl font-semibold leading-tight text-ink">
            {displayNames[study.slug] ?? study.name}
          </h3>
          <p className="mt-2 text-[11px] font-medium leading-relaxed text-forest">
            {study.category}
          </p>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {study.teaser}
        </p>

        <Link
          href={`/${study.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors duration-200 hover:text-ink"
        >
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

function ProjectMeta({ items }: { items: MetaItem[] }) {
  return (
    <div className="mt-5 flex flex-nowrap items-center justify-center overflow-hidden text-[11px] text-muted">
      {items.map(({ label, icon: Icon }, index) => (
        <span
          key={`${label}-${index}`}
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap border-line pr-2.5 last:pr-0 [&:not(:last-child)]:mr-2.5 [&:not(:last-child)]:border-r"
        >
          <Icon className="h-3 w-3 text-ink/70" />
          {label}
        </span>
      ))}
    </div>
  );
}

function ProjectTypePill({ study }: { study: CaseStudy }) {
  const Icon = groupIcons[study.group];

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-forest-soft/75 px-2.5 py-1 text-[11px] font-medium text-forest">
      <Icon className="h-3 w-3" />
      {study.badge}
    </span>
  );
}

function ProjectActions({
  study,
  className = "",
}: {
  study: CaseStudy;
  className?: string;
}) {
  return (
    <div className={className}>
      <Link
        href={`/${study.slug}`}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-4 py-2.5 text-sm font-medium text-ivory transition-colors duration-200 hover:bg-ink"
      >
        View project
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

function ProjectImage({
  study,
  className,
  sizes,
  showLiveIcon = false,
}: {
  study: CaseStudy;
  className: string;
  sizes: string;
  showLiveIcon?: boolean;
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
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: study.coverImage.position ?? "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
        </>
      ) : (
        <div className="grid-texture absolute inset-0 opacity-25" />
      )}
      {showLiveIcon && study.liveUrl && (
        <a
          href={study.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${study.name} live site`}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ivory/90 text-forest shadow-soft transition-colors duration-200 hover:bg-forest hover:text-ivory"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}
