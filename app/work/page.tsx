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
      <WorkServicesSection />
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
    <section className="border-b border-line/70 bg-ivory py-12 sm:py-14 lg:py-16">
      <div className={workPageContainer}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,1fr)]">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                Selected Work
              </p>
              <h1 className="mt-5 max-w-4xl font-serif text-[2.5rem] font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[4rem]">
                A few things I&apos;ve built, designed, or helped bring into
                shape.
              </h1>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink/76 sm:text-lg">
              Websites, products, systems, and the experiments in between.
              Here&apos;s a selection of work I&apos;m proud of and the problems
              I set out to solve.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {featuredCaseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/${study.slug}`}
                className="group relative aspect-square overflow-hidden rounded-lg border border-line shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-lift"
              >
                {study.coverImage ? (
                  <Image
                    src={study.coverImage.src}
                    alt={study.coverImage.alt}
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    style={{
                      objectPosition: study.coverImage.position ?? "center",
                    }}
                  />
                ) : (
                  <div className={`grid-texture h-full w-full bg-gradient-to-br ${study.accent}`} />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
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

function WorkServicesSection() {
  const services = workServiceLinks
    .map((slug) => serviceAreas.find((service) => service.slug === slug))
    .filter(Boolean);

  return (
    <section className="border-t border-line/70 bg-ivory py-10 sm:py-12 lg:py-14">
      <div className={workPageContainer}>
        <div className="grid gap-8 lg:grid-cols-[minmax(16rem,0.42fr)_minmax(0,1fr)]">
          <SectionIntro
            label="How The Work Connects"
            title="The projects point back to practical services."
            description="This keeps the page useful for visitors and search without turning it into a long sales page."
          />

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {services.map((service) => {
              if (!service) return null;
              const Icon = service.icon;

              return (
                <Link
                  key={service.slug}
                  href={service.href}
                  className="group rounded-xl border border-line bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-lift"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-soft text-forest">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold leading-snug text-ink">
                    {service.shortTitle}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-forest">
                    View service
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MoreWorkSection() {
  return (
    <section className="border-t border-line/70 bg-ivory py-10 sm:py-12 lg:py-14">
      <div className={workPageContainer}>
        <SectionIntro
          label="More Builds"
          title="Smaller experiments and technical work."
          description="A few additional projects that round out the range without needing the same visual weight as the featured work."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {secondaryCaseStudies.map((study) => (
            <SmallWorkCard key={study.slug} study={study} />
          ))}
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

function SmallWorkCard({ study }: { study: CaseStudy }) {
  const Icon = secondaryIcons[study.slug] ?? groupIcons[study.group];

  return (
    <Link
      href={`/${study.slug}`}
      className="group flex min-h-64 flex-col rounded-xl border border-line bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-lift"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-soft text-forest">
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </span>
        <span className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-medium text-forest">
          {study.badge}
        </span>
      </div>

      <h3 className="mt-5 font-serif text-2xl font-medium leading-tight text-ink">
        {study.name}
      </h3>
      <p className="mt-2 text-xs font-semibold leading-5 text-forest">
        {cleanText(study.category)}
      </p>
      <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted">
        {study.teaser}
      </p>

      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-forest">
        View project
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function cleanText(value: string) {
  return value.replaceAll("Â·", "·").replaceAll("â€”", "—");
}
