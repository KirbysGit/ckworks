import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  ExternalLink,
  Layers3,
  MonitorSmartphone,
  Palette,
  ShieldCheck,
  TrendingUp,
  Workflow,
} from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import ContactCTA from "@/components/page/ContactCTA";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import {
  caseStudies,
  featuredCaseStudies,
  secondaryCaseStudies,
  type CaseStudy,
} from "@/lib/projects";
import { serviceAreas, type ServiceSlug } from "@/lib/services";

export const metadata: Metadata = createPageMetadata({
  title: "Selected Work",
  description:
    "A clean portfolio of CK Works websites, products, systems, integrations, and prototypes built around clearer business goals.",
  path: "/work",
});

const workPageContainer =
  "mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-7 2xl:px-8";

const workServiceLinks: ServiceSlug[] = [
  "web-design-development",
  "search-ai-visibility",
  "analytics-lead-tracking",
  "digital-systems-integrations",
  "ongoing-support",
];

const groupLabels: Record<CaseStudy["group"], string> = {
  client: "Client Work",
  product: "Product / System",
  prototype: "Prototype",
};

const groupIcons: Record<CaseStudy["group"], LucideIcon> = {
  client: BriefcaseBusiness,
  product: Layers3,
  prototype: MonitorSmartphone,
};

const secondaryIcons: Record<string, LucideIcon> = {
  "ck-dev": Palette,
  "sentiment-trader": TrendingUp,
  "internal-automation-tool": Workflow,
  securescape: ShieldCheck,
};

export default function WorkPage() {
  return (
    <SiteLayout>
      <SchemaMarkup
        id="work-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "CK Works Selected Work",
          description:
            "Selected websites, products, systems, and prototypes by CK Works.",
          url: absoluteUrl("/work"),
          mainEntity: {
            "@type": "ItemList",
            itemListElement: caseStudies.map((study, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "CreativeWork",
                name: study.name,
                url: absoluteUrl(`/${study.slug}`),
                description: study.oneLiner,
              },
            })),
          },
        }}
      />

      <WorkHero />
      <FeaturedWorkSection />
      <MoreWorkSection />
      <ContactCTA
        title="Have something that needs to work better?"
        description="Send a note with the site, system, or idea you are working through, and I will help you shape the next step."
      />
    </SiteLayout>
  );
}

function WorkHero() {
  return (
    <section className="overflow-hidden border-b border-line/70 bg-ivory py-12 sm:py-14 lg:py-16">
      <div className={workPageContainer}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(28rem,1.06fr)] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Selected Work
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[4rem]">
              A few things I&apos;ve built, designed, or helped bring into
              shape.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/76 sm:text-lg">
              Websites, products, systems, and the experiments in between.
              Here&apos;s a selection of work I&apos;m proud of and the problems
              I set out to solve.
            </p>
          </div>

          <WorkLogoStack />
        </div>
      </div>
    </section>
  );
}

const workHeroLogoCards = [
  {
    slug: "tizirsso",
    number: "01",
    type: "Brand Identity",
    src: "/images/projects/png/tizi-logo.png",
    alt: "Tizirsso Racing",
    meta: ["Client Work", "Live"],
    className:
      "left-[13%] top-[3%] z-20 w-[50%] rotate-[-2.2deg] sm:w-[47%]",
    logoClassName: "p-5 sm:p-6",
    background: "linear-gradient(140deg, #E10600 0%, #7d0400 55%, #160404 100%)",
  },
  {
    slug: "taylor",
    number: "02",
    type: "Product",
    src: "/images/projects/png/taylor-logo.png",
    alt: "Taylor.io",
    meta: ["Personal Project", "Early Build"],
    className:
      "right-[7%] top-[28%] z-30 w-[37%] rotate-[3.5deg] sm:w-[34%]",
    logoClassName: "p-4 sm:p-5",
    background:
      "radial-gradient(55% 48% at 22% 20%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%), radial-gradient(42% 38% at 82% 78%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 55%), linear-gradient(155deg, #D65656 0%, #AF3E48 55%, #7f2c37 100%)",
  },
  {
    slug: "setlst",
    number: "03",
    type: "Platform Concept",
    src: "/images/projects/png/setlst-logo.png",
    alt: "SETLST",
    meta: ["Product Concept", "In Progress"],
    className:
      "bottom-[8%] left-[6%] z-10 w-[43%] rotate-[2.4deg] sm:w-[40%]",
    logoClassName: "p-5 sm:p-6",
    background: "linear-gradient(135deg, #2EF2C3 0%, #8B5CF6 100%)",
  },
  {
    slug: "centi",
    number: "04",
    type: "Fintech Product",
    src: "/images/projects/png/centi-logo.png",
    alt: "Centi",
    meta: ["Personal Project", "Working Build"],
    className:
      "bottom-[4%] right-[19%] z-20 w-[39%] rotate-[-1.2deg] sm:w-[37%]",
    logoClassName: "p-4 sm:p-5",
    background: "linear-gradient(135deg, #0d6efd 0%, #198754 100%)",
  },
] as const;

function WorkLogoStack() {
  return (
    <div className="relative mx-auto h-[26rem] w-full max-w-[46rem] lg:mx-0 lg:ml-auto lg:h-[31rem]">
      <span
        className="pointer-events-none absolute bottom-[11%] right-[5%] text-4xl text-muted/35"
        aria-hidden
      >
        *
      </span>

      {workHeroLogoCards.map((card) => (
        <Link
          key={card.slug}
          href={`/${card.slug}`}
          className={`group absolute block transition-transform duration-300 hover:-translate-y-1 ${card.className}`}
        >
          <article className="relative aspect-[1.28/1] overflow-hidden rounded-[0.35rem] border border-line bg-card shadow-[0_2px_5px_rgba(31,36,32,0.07),0_24px_42px_-32px_rgba(31,36,32,0.48)] transition-shadow duration-300 group-hover:shadow-[0_4px_10px_rgba(31,36,32,0.08),0_30px_46px_-30px_rgba(31,36,32,0.62)]">
            <span
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.65),transparent_42%,rgba(31,36,32,0.035))]"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute inset-3 rounded-[0.2rem] border border-line/65"
              aria-hidden
            />

            <div className="relative z-10 flex h-full flex-col px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex items-center justify-between gap-3 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-ink/72 sm:text-[0.62rem]">
                <span>{card.number}</span>
                <span>{card.type}</span>
              </div>

              <div
                className="relative mt-2.5 min-h-0 flex-1 overflow-hidden"
                style={{ background: card.background }}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(min-width: 1024px) 340px, 50vw"
                  className={`relative object-contain transition-transform duration-300 group-hover:scale-[1.035] ${card.logoClassName}`}
                />
              </div>

              <div className="border-t border-line/70" aria-hidden />

              <div className="flex items-center gap-2 pt-2.5 text-[0.55rem] font-medium text-ink/70 sm:text-[0.62rem]">
                {card.meta.map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    {index > 0 && (
                      <span
                        className="h-1 w-1 rounded-full bg-forest"
                        aria-hidden
                      />
                    )}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

function FeaturedWorkSection() {
  return (
    <section className="bg-ivory py-12 sm:py-14 lg:py-16">
      <div className={workPageContainer}>
        <SectionIntro
          label="Featured Work"
          title="Client sites, product ideas, and systems with a little more story."
          description="Each case study keeps the visible summary short, then gives more detail when someone wants the full context."
        />

        <div className="mt-12 space-y-12 sm:space-y-14 lg:space-y-16">
          {featuredCaseStudies.map((study, index) => (
            <EditorialWorkCard
              key={study.slug}
              study={study}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreWorkSection() {
  return (
    <section className="border-t border-line/70 bg-ivory py-10 sm:py-12 lg:py-14">
      <div className={workPageContainer}>
        <div className="grid gap-8 lg:grid-cols-[minmax(22rem,0.4fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
              More Technical Work
            </p>
            <h2 className="mt-5 font-serif text-[2.35rem] font-medium leading-[1.08] tracking-[-0.015em] text-ink sm:text-[3rem] lg:text-[3.15rem]">
              Smaller builds with useful technical range.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-8 text-muted sm:text-lg">
              A selection of experiments, prototypes, and systems that reflect
              how I approach product and engineering problems.
            </p>
          </div>

          <div className="rounded-xl border border-line/70 bg-card/70">
            {secondaryCaseStudies.map((study, index) => (
              <TechnicalWorkRow
                key={study.slug}
                study={study}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
        {label}
      </p>
      <h2 className="mt-4 font-serif text-[2rem] font-medium leading-[1.12] tracking-[-0.015em] text-ink sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        {description}
      </p>
    </div>
  );
}

function EditorialWorkCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const GroupIcon = groupIcons[study.group];
  const isEven = index % 2 === 0;

  return (
    <article className="group">
      <div
        className={`grid gap-6 items-start lg:gap-8 lg:grid-cols-2 ${
          isEven ? "lg:grid-flow-dense" : ""
        }`}
      >
        {/* Text Content */}
        <div className={isEven ? "lg:col-start-2" : ""}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
              {String(index).padStart(2, "0")} {groupLabels[study.group]}
            </p>
            <h3 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-[-0.02em] text-ink">
              {study.name}
            </h3>
          </div>

          <p className="mt-3 text-sm font-semibold leading-6 text-forest">
            {cleanText(study.category)}
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            {study.teaser}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {study.workedOn.slice(0, 4).map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-ivory px-2.5 py-1 text-[11px] font-medium text-ink/76"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${study.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-forest px-4 py-3 text-sm font-semibold text-ivory transition-colors duration-200 hover:bg-ink"
            >
              View project
              <ArrowRight className="h-4 w-4" />
            </Link>
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-forest/45 px-4 py-3 text-sm font-semibold text-forest transition-colors duration-200 hover:bg-forest-soft/45"
              >
                Live site
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Image */}
        <Link
          href={`/${study.slug}`}
          className={`group/image relative min-h-80 overflow-hidden rounded-xl border border-line shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-lift ${
            isEven ? "lg:col-start-1 lg:row-start-1" : ""
          }`}
        >
          {study.coverImage ? (
            <Image
              src={study.coverImage.src}
              alt={study.coverImage.alt}
              fill
              sizes="(min-width: 1280px) 42vw, (min-width: 768px) 48vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover/image:scale-[1.03]"
              style={{
                objectPosition: study.coverImage.position ?? "center",
              }}
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${study.accent}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
        </Link>
      </div>
    </article>
  );
}

const technicalWorkSummaries: Record<
  string,
  { summary: string; stack: string; image?: string }
> = {
  "ck-dev": {
    summary: "Creative frontend portfolio",
    stack: "Frontend · UI experiments",
    image: "/images/projects/png/ck-dev.png",
  },
  "sentiment-trader": {
    summary: "Financial sentiment data pipeline",
    stack: "Python · NLP · Market data",
    image: "/images/projects/png/sentiment-trader.png",
  },
  "internal-automation-tool": {
    summary: "Internal operations platform",
    stack: "Automation · Backend systems",
  },
  securescape: {
    summary: "Hardware/software security prototype",
    stack: "Embedded systems · Computer vision",
    image: "/images/projects/png/secure-scape.png",
  },
};

function TechnicalWorkRow({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const Icon = secondaryIcons[study.slug] ?? groupIcons[study.group];
  const summary = technicalWorkSummaries[study.slug];

  return (
    <Link
      href={`/${study.slug}`}
      className="group grid gap-4 border-b border-line px-4 py-4 transition-colors duration-200 last:border-b-0 hover:bg-forest-soft/18 sm:grid-cols-[3.25rem_10.5rem_minmax(0,1fr)_2rem] sm:items-center sm:px-6"
    >
      <div className="flex items-center gap-3">
        <span className="font-source-serif-display text-lg font-medium tabular-nums text-forest">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className="relative aspect-[1.9/1] overflow-hidden rounded-lg border border-line bg-forest-soft shadow-[0_10px_24px_-20px_rgba(31,36,32,0.6)]">
        {summary?.image ? (
          <Image
            src={summary.image}
            alt=""
            fill
            sizes="170px"
            className="object-cover"
          />
        ) : study.slug === "internal-automation-tool" ? (
          <InternalAutomationThumb />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-forest">
            <Icon className="h-6 w-6" strokeWidth={1.55} />
          </span>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-serif text-[1.4rem] font-medium leading-tight text-ink sm:text-[1.6rem]">
            {study.name}
          </h3>
          <p className="text-[0.72rem] font-semibold leading-5 text-forest sm:text-[0.78rem]">
            {summary?.summary ?? cleanText(study.category)}
          </p>
        </div>
        <p className="mt-1 text-sm leading-6 text-muted sm:text-[0.92rem]">
          {summary?.stack ?? cleanText(study.category)}
        </p>
      </div>

      <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest sm:justify-self-end">
        <span className="sr-only">View {study.name}</span>
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={1.55}
          aria-hidden
        />
      </span>
    </Link>
  );
}

function InternalAutomationThumb() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#111614] p-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="h-1.5 w-8 rounded-full bg-ivory/30" />
        <span className="h-1.5 w-4 rounded-full bg-[#5F9C69]" />
      </div>
      <div className="grid grid-cols-[0.38fr_1fr] gap-2">
        <div className="space-y-1.5">
          {[0, 1, 2, 3].map((item) => (
            <span
              key={item}
              className="block h-1.5 rounded-full bg-ivory/20"
            />
          ))}
        </div>
        <div className="space-y-1.5">
          <span className="block h-4 rounded bg-ivory/12" />
          <span className="block h-1.5 w-4/5 rounded-full bg-ivory/25" />
          <span className="block h-1.5 w-2/3 rounded-full bg-[#5F9C69]/70" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((item) => (
          <span key={item} className="h-3 rounded bg-ivory/12" />
        ))}
      </div>
    </div>
  );
}

function cleanText(value: string) {
  return value.replaceAll("Â·", "·").replaceAll("â€”", "—");
}
