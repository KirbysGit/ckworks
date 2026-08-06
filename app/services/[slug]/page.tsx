import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Blocks,
  Boxes,
  Check,
  ChevronDown,
  CircleCheck,
  ClipboardList,
  Database,
  FileCode2,
  FileText,
  Flag,
  Gauge,
  Globe,
  Headphones,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  LayoutTemplate,
  LineChart,
  Mail,
  MapPin,
  MessageSquareText,
  MonitorSmartphone,
  Navigation,
  Paintbrush,
  Pencil,
  PhoneCall,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Settings2,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkle,
  Sprout,
  Table2,
  Tag,
  TrendingUp,
  UserRound,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/page/PageHero";
import ContentSection from "@/components/page/ContentSection";
import ContactCTA from "@/components/page/ContactCTA";
import FAQSection from "@/components/page/FAQSection";
import RelatedProjects from "@/components/page/RelatedProjects";
import RelatedServices from "@/components/page/RelatedServices";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import ServiceViewed from "@/components/ServiceViewed";
import ProjectInquiryTrigger from "@/components/ProjectInquiryTrigger";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";
import { getCaseStudy, type CaseStudy } from "@/lib/projects";
import { getServiceArea, serviceAreas, type ServiceArea } from "@/lib/services";

/** Shared service-page hero title — matches Web Design & Development. */
const serviceHeroTitleClassName =
  "mt-5 font-serif text-[3rem] font-semibold leading-[1.03] tracking-[-0.025em] text-ink sm:text-[3.35rem] lg:text-[4.35rem]";

/**
 * Left-aligned section headers — matches "What this service covers /
 * Everything you need in a website."
 */
const serviceSectionLabelClassName =
  "text-xs font-semibold uppercase tracking-[0.24em] text-muted";
const serviceSectionTitleClassName =
  "mt-4 font-serif text-[2rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[2.35rem]";
const serviceSectionBodyClassName =
  "mt-4 text-sm leading-7 text-ink/75 sm:text-[0.95rem]";

/**
 * Center-aligned section headers — matches "A better website makes a
 * real difference."
 */
const serviceCenterLabelClassName =
  "text-xs font-semibold uppercase tracking-[0.28em] text-forest/80";
const serviceCenterTitleClassName =
  "mt-5 font-serif text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[2.75rem] lg:text-[3.8rem]";

type Props = {
  params: Promise<{ slug: string }>;
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

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceArea(slug);
  if (!service) notFound();

  if (service.slug === "web-design-development") {
    return <WebDesignServicePage service={service} />;
  }

  if (service.slug === "search-ai-visibility") {
    return <SearchVisibilityServicePage service={service} />;
  }

  if (service.slug === "analytics-lead-tracking") {
    return <AnalyticsServicePage service={service} />;
  }

  if (service.slug === "digital-systems-integrations") {
    return <SystemsServicePage service={service} />;
  }

  if (service.slug === "ongoing-support") {
    return <OngoingSupportServicePage service={service} />;
  }

  return (
    <SiteLayout>
      <ServiceViewed name={service.title} slug={service.slug} />
      <ServiceSchema service={service} />
      <PageHero
        label={service.eyebrow}
        title={service.title}
        description={service.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <ContentSection
        label="Who It Is For"
        title="This is a fit when the business needs practical clarity."
      >
        <div className="grid gap-3 md:grid-cols-3">
          {service.whoFor.map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-2xl border border-line bg-card p-5 shadow-soft"
            >
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-soft">
                <Check className="h-3 w-3 text-forest" />
              </span>
              <p className="text-sm leading-7 text-muted">{item}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        label="Scope Skeleton"
        title="What this service can include."
        description="These are the content blocks to refine as the service pages become more designed and specific."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {service.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-line bg-card p-6 shadow-soft"
            >
              <h2 className="font-serif text-2xl font-semibold leading-tight text-ink">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{section.body}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <ContentSection label="Relevant Work" title="Related examples from CK Works.">
        <RelatedProjects slugs={service.relevantProjectSlugs} />
      </ContentSection>

      <ContentSection label="Related Services" title="Other pieces that may connect.">
        <RelatedServices slugs={service.relatedServiceSlugs} />
      </ContentSection>

      <section className="border-t border-line/70 py-12">
        <div className="container-ck">
          <FAQSection
            faqs={service.faqs}
            description="Common questions about working with CK Works and this service."
          />
        </div>
      </section>

      <ContactCTA
        title={`Need help with ${service.shortTitle.toLowerCase()}?`}
        description="Share where things stand now, and I will help you sort the practical next step."
      />
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
            provider: {
              "@type": "ProfessionalService",
              name: "CK Works",
              url: absoluteUrl("/"),
            },
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

const searchVisibilityContainer =
  "mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8";

const visibilityBenefits = [
  {
    title: "Easier to find",
    body: "Help search engines and AI tools discover your pages.",
    icon: Search,
  },
  {
    title: "Clearer page meaning",
    body: "Structure and signals that explain what each page is about.",
    icon: FileText,
  },
  {
    title: "Practical guidance",
    body: "Actionable recommendations you can use right away.",
    icon: UserRound,
  },
] as const;

const visibilityScope = [
  {
    title: "Technical SEO",
    body: "Improve site structure, speed, and crawlability so search engines can do their job.",
    icon: Settings2,
  },
  {
    title: "Local search visibility",
    body: "Optimize your presence for location-based searches and map results.",
    icon: MapPin,
  },
  {
    title: "Google and Bing indexing",
    body: "Ensure important pages are discoverable and displayed in search results.",
    icon: Search,
  },
  {
    title: "Structured data and schema",
    body: "Add clear markup so search engines better understand your content.",
    icon: FileCode2,
  },
  {
    title: "AI discovery",
    body: "Help answer systems interpret, cite, and understand your content with confidence.",
    icon: Sparkle,
  },
] as const;

const visibilitySignals = [
  {
    title: "Clear service name",
    body: "Helps systems know what you do.",
    icon: Tag,
  },
  {
    title: "Orlando location",
    body: "Signals your service area and relevance.",
    icon: MapPin,
  },
  {
    title: "Project examples",
    body: "Real proof builds trust and context.",
    icon: LayoutTemplate,
  },
  {
    title: "Helpful answers",
    body: "Direct answers help AI tools quote you.",
    icon: MessageSquareText,
  },
  {
    title: "Contact pathway",
    body: "Makes it easy to take the next step.",
    icon: PhoneCall,
  },
] as const;

const searchVisibilityFaqs = [
  {
    question: "What do SEO, AEO, and GEO mean here?",
    answer:
      "The practical goal is the same: make your site easier for search engines, answer tools, and people to understand. CK Works focuses on the useful foundations behind that work, without the jargon-heavy sales pitch.",
  },
  {
    question: "Is this a guarantee of rankings?",
    answer:
      "No. Search visibility is influenced by competition, demand, site history, and many factors outside one website. The work here improves clarity, technical health, discoverability, and measurement so the site has a stronger foundation.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Technical fixes and indexation updates can be visible fairly quickly, while meaningful search growth usually takes time. We start with the changes that make the site easier to understand now, then use real signals to guide what comes next.",
  },
  {
    question: "Do you work with a specific platform?",
    answer:
      "The right approach depends on how your current site is built and what access is available. The first step is reviewing the site, identifying the most useful improvements, and deciding whether the existing setup supports them well.",
  },
] as const;

function SearchVisibilityServicePage({ service }: { service: ServiceArea }) {
  return (
    <SiteLayout>
      <ServiceViewed name={service.title} slug={service.slug} />
      <ServiceSchema service={service} />

      <section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={searchVisibilityContainer}>
          <SearchVisibilityHero />
          <SearchVisibilityBenefits />
          <SearchVisibilityScope />
          <SearchVisibilitySignals />
          <SearchVisibilityFaq />
          <SearchVisibilityCta />
        </div>
      </section>
    </SiteLayout>
  );
}

function SearchVisibilityHero() {
  return (
    <section className="grid items-center gap-10 border-b border-line pb-11 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)] lg:gap-14 lg:pb-14">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
          Visibility
        </p>
        <h1 className={serviceHeroTitleClassName}>
          Search &amp;
          <br />
          AI Visibility
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-ink/78 sm:text-[1.05rem]">
          Search-friendly structure, indexing basics, and clearer content
          signals so people and answer engines can understand your site.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ProjectInquiryTrigger
            source="search_visibility_service_hero"
            className="rounded-md px-5"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </ProjectInquiryTrigger>
          <a
            href="#visibility-explained"
            className="group inline-flex items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-semibold text-forest transition-colors hover:text-ink"
          >
            See how visibility works
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <SearchVisibilityHeroVisual />
    </section>
  );
}

function GoogleMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <Image
      src="/images/services/svg/google-logo.svg"
      alt="Google"
      width={24}
      height={24}
      className={`shrink-0 ${className}`}
    />
  );
}

function SearchBar({
  compact = false,
  query = "custom home builder Orlando",
}: {
  compact?: boolean;
  query?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-full border border-line bg-ivory shadow-[0_8px_18px_-18px_rgba(31,36,32,0.6)] ${
        compact ? "px-3 py-2" : "px-4 py-3"
      }`}
    >
      <span
        className={`min-w-0 flex-1 truncate font-sans font-medium text-ink ${
          compact ? "text-[0.64rem]" : "text-sm"
        }`}
      >
        {query}
      </span>
      <Search
        className={`shrink-0 text-ink/65 ${compact ? "h-3.5 w-3.5" : "h-5 w-5"}`}
        strokeWidth={2}
      />
    </div>
  );
}

function SearchVisibilityHeroVisual() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[minmax(0,1.34fr)_minmax(0,0.92fr)]">
        <GoogleResultCard />
        <AiOverviewCard />
      </div>
      <p className="mt-3 text-[0.58rem] mr-3 font-semibold uppercase text-right tracking-[0.14em] text-muted">
        Illustrative search example
      </p>
    </div>
  );
}

const searchResultActions = [
  { label: "Website", icon: Globe },
  { label: "Call", icon: PhoneCall },
  { label: "Directions", icon: Navigation },
  { label: "Reviews", icon: Flag },
] as const;

function SearchResultCardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-0 rounded-2xl border border-line bg-card px-5 py-5 shadow-[0_22px_46px_-34px_rgba(31,36,32,0.54)] sm:px-6 sm:py-6">
      {children}
    </div>
  );
}

function GoogleResultCard() {
  return (
    <SearchResultCardShell>
      <div className="flex items-center gap-4">
        <GoogleMark className="h-7 w-7 sm:h-8 sm:w-8" />
        <div className="min-w-0 flex-1">
          <SearchBar compact query="Riverstone Builders" />
        </div>
      </div>

      <div className="mt-4 flex border-b border-line text-[0.7rem] font-medium text-muted">
        {["All", "Maps", "Images", "News", "Videos", "More"].map((item) => (
          <span
            key={item}
            className={`relative flex-1 px-1 pb-2.5 text-center first:pl-0 last:pr-0 sm:px-2 ${
              item === "All" ? "font-semibold text-forest" : ""
            }`}
          >
            {item}
            {item === "All" && (
              <span className="absolute inset-x-1 bottom-0 h-0.5 bg-forest sm:inset-x-2" />
            )}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-sans text-[1.02rem] font-semibold leading-tight text-[#1A5FCC]">
              Riverstone Builders
            </p>
            <p className="mt-1 text-[0.76rem] text-ink/78">
              Local residential builder
            </p>
            <p className="mt-1 text-[0.7rem] font-medium text-ink/80">
              5.0 <span className="text-[#D99323]">★★★★★</span> (23) · Builder
            </p>
          </div>
          <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-sand sm:h-16 sm:w-20">
            <Image
              src="/images/services/png/02-riverstone-demo.png"
              alt="Illustrative Riverstone Builders result"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 border-y border-line py-3">
          {searchResultActions.map(({ label, icon: ActionIcon }) => (
            <span
              key={label}
              className="flex min-w-0 flex-col items-center gap-1 text-center text-[0.55rem] font-medium text-ink/78"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line bg-ivory text-forest">
                <ActionIcon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
              <span className="truncate">{label}</span>
            </span>
          ))}
        </div>

        <p className="mt-4 text-[0.72rem] leading-5 text-ink/86">
          Riverstone Builders is a local residential builder specializing in
          custom homes, renovations, and additions. View projects and request a
          quote.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] font-semibold text-[#0B57D0]">
          {["Services", "Projects", "About", "Contact"].map((link, index) => (
            <span key={link} className="flex items-center gap-x-2">
              {index > 0 && (
                <span
                  className="h-1 w-1 rounded-full bg-[#0B57D0]/50"
                  aria-hidden
                />
              )}
              {link}
            </span>
          ))}
        </div>
      </div>
    </SearchResultCardShell>
  );
}

function AiOverviewCard() {
  return (
    <SearchResultCardShell>
      <div className="flex h-full flex-col">
        <p className="flex items-center gap-2.5 font-sans text-[0.9rem] font-bold text-ink">
          <Sparkle
            className="h-5 w-5 shrink-0 fill-forest text-forest"
            strokeWidth={1.25}
          />
          AI Overview
        </p>
        <div className="mt-3 h-px w-full bg-line" aria-hidden />
        <p className="mt-4 text-[0.85rem] leading-6 text-ink/88">
          Riverstone Builders is positioned as a local residential builder that
          focuses on custom homes, renovations, and additions. The site clearly
          outlines services, showcases project proof, and provides direct ways
          to inquire.
        </p>
        <div className="mt-6 divide-y divide-line sm:mt-auto">
          {[
            "Clear services and focus",
            "Project examples and proof",
            "Direct contact and inquiry options",
          ].map((item) => (
            <p
              key={item}
              className="flex items-center gap-2.5 py-3 text-[0.8rem] font-medium text-ink/80 last:pb-0"
            >
              <CircleCheck
                className="h-4 w-4 shrink-0 fill-forest text-ivory"
                strokeWidth={2.4}
              />
              {item}
            </p>
          ))}
        </div>
      </div>
    </SearchResultCardShell>
  );
}

function SearchVisibilityBenefits() {
  return (
    <section
      id="visibility-explained"
      className="scroll-mt-28 border-b border-line py-14 lg:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_auto_minmax(0,1.2fr)] lg:items-center lg:gap-0">
        <div className="max-w-md lg:pr-14">
          <p className={serviceSectionLabelClassName}>
            Why visibility matters
          </p>
          <h2 className={serviceSectionTitleClassName}>
            Built for clarity and findability.
          </h2>
          <p className={`${serviceSectionBodyClassName} max-w-sm`}>
            This service helps your business become easier to find, clearer to
            understand, and more confident about what to improve next.
          </p>
        </div>

        <div
          className="hidden w-px self-stretch bg-line lg:block"
          aria-hidden
        />

        <div className="border-t border-line lg:border-t-0 lg:pl-14">
          {visibilityBenefits.map(({ title, body, icon: Icon }, index) => (
            <article
              key={title}
              className={`flex items-center gap-4 py-5 sm:gap-5 sm:py-6 ${
                index > 0 ? "border-t border-line" : "lg:pt-0"
              } ${
                index === visibilityBenefits.length - 1 ? "lg:pb-0" : ""
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest sm:h-12 sm:w-12">
                <Icon className="h-5 w-5" strokeWidth={1.45} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[0.98rem] font-semibold text-ink sm:text-[1.02rem]">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchVisibilityScope() {
  return (
    <section className="border-b border-line py-14 lg:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>Practical scope</p>
        <h2 className={serviceCenterTitleClassName}>
          What this service can include.
        </h2>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4 lg:gap-5">
        {visibilityScope.map(({ title, body, icon: Icon }) => (
          <article
            key={title}
            className="w-full rounded-2xl border border-line/80 bg-card px-6 py-8 text-center shadow-soft sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest-soft text-forest">
              <Icon className="h-5 w-5" strokeWidth={1.45} />
            </span>
            <h3 className="mt-5 text-[1.02rem] font-semibold leading-snug text-ink">
              {title}
            </h3>
            <p className="mx-auto mt-2.5 max-w-[16rem] text-sm leading-6 text-muted">
              {body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Connector line + dot on the right of each signal row (xl and up).
 * Tune these to line the dots up with the site preview on the right.
 *   length  — how far the line extends toward the preview
 *   height  — thickness (visual weight) of the line
 *   dotSize — diameter of the end dot
 *   gap     — space between the line and its end dot
 *   rows    — individual tuning for the signal rows below
 *
 * `offsetY` moves the complete signal row against the demo preview.
 * Positive values move the icon, text, line, and dots down together.
 * `offsetX` only adjusts how far the connector reaches toward the preview.
 * The rows match `visibilitySignals` in order.
 */
const signalConnector = {
  previewOverlap: "2rem",
  length: "5rem",
  height: "1.5px",
  dotSize: "0.5rem",
  gap: "0rem",
  rows: [
    {
      length: "6rem",
      offsetX: "0.25rem",
      offsetY: "-5.75rem",
    },
    {
      length: "5rem",
      offsetX: "0.25rem",
      offsetY: "-2rem",
    },
    {
      length: "5rem",
      offsetX: "0.25rem",
      offsetY: "6.5rem",
    },
    {
      length: "6rem",
      offsetX: "0.25rem",
      offsetY: "7rem",
    },
    {
      length: "6rem",
      offsetX: "0.25rem",
      offsetY: "7.625rem",
    },
  ],
} as const;

/**
 * Arrows between the site preview and Google / AI cards.
 * Sit in the column gap, vertically centered on each card.
 *   size     — arrow icon size
 *   inset    — how far into the gap from the card's left edge (toward preview)
 *   offsetY  — per-card vertical nudge (0 = dead center of the card)
 */
const signalOutboundArrow = {
  size: "1.15rem",
  inset: "0.35rem",
  cards: [
    { offsetY: "0px" }, // Google result
    { offsetY: "0px" }, // AI Overview
  ],
} as const;

function SearchVisibilitySignals() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <div className="max-w-3xl">
        <p className={serviceSectionLabelClassName}>Page clarity</p>
        <h2 className={serviceSectionTitleClassName}>
          What search systems need to understand.
        </h2>
        <p className={`${serviceSectionBodyClassName} max-w-lg`}>
          Strong visibility begins with pages that state what the business does,
          who it serves, and what a visitor can do next.
        </p>
      </div>

      <div className="mt-9 grid items-center gap-7 xl:grid-cols-[minmax(13rem,0.74fr)_minmax(22rem,1.2fr)_minmax(13rem,0.76fr)] xl:gap-8">
        {/* z-20 keeps connector dots above the site preview they overlap */}
        <div className="relative z-20 space-y-3">
          {visibilitySignals.map(({ title, body, icon: Icon }, index) => {
            const connector =
              signalConnector.rows[index] ?? signalConnector.rows[0];

            return (
              <div
                key={title}
                className="group relative z-20 flex items-center gap-3"
                style={{ transform: `translateY(${connector.offsetY})` }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-soft text-forest">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-ink">{title}</p>
                  <p className="mt-0.5 text-[0.68rem] leading-4 text-muted">{body}</p>
                </div>
                <span
                  className="relative z-30 ml-auto hidden min-w-0 flex-1 items-center xl:flex"
                  style={{
                    gap: signalConnector.gap,
                    marginRight: `calc(-1 * ${signalConnector.previewOverlap})`,
                    transform: `translateX(${connector.offsetX})`,
                  }}
                  aria-hidden
                >
                  <span
                    className="shrink-0 rounded-full bg-forest"
                    style={{
                      width: signalConnector.dotSize,
                      height: signalConnector.dotSize,
                    }}
                  />
                  <span
                    className="min-w-0 flex-1 bg-forest/45"
                    style={{
                      height: signalConnector.height,
                    }}
                  />
                  <span
                    className="shrink-0 rounded-full bg-[rgb(77,146,77)]"
                    style={{
                      width: signalConnector.dotSize,
                      height: signalConnector.dotSize,
                    }}
                  />
                </span>
              </div>
            );
          })}
        </div>

        <SearchReadySitePreview />

        <div className="relative z-20 space-y-4">
          <OutboundSignalCard>
            <SearchResultSnapshot />
          </OutboundSignalCard>
          <OutboundSignalCard offsetY={signalOutboundArrow.cards[1].offsetY}>
            <AiOverviewSnapshot />
          </OutboundSignalCard>
        </div>
      </div>
    </section>
  );
}

function OutboundSignalCard({
  children,
  offsetY = signalOutboundArrow.cards[0].offsetY,
}: {
  children: ReactNode;
  offsetY?: string;
}) {
  return (
    <div
      className="relative"
      style={{
        transform: offsetY === "0px" ? undefined : `translateY(${offsetY})`,
      }}
    >
      {/* Simple arrow in the gap, centered on this card (xl+) */}
      <span
        className="pointer-events-none absolute top-1/2 z-30 hidden -translate-y-1/2 text-forest xl:flex"
        style={{
          right: "100%",
          marginRight: signalOutboundArrow.inset,
        }}
        aria-hidden
      >
        <ArrowRight
          style={{
            width: signalOutboundArrow.size,
            height: signalOutboundArrow.size,
          }}
          strokeWidth={2.2}
        />
      </span>
      {children}
    </div>
  );
}

function SearchReadySitePreview() {
  return (
    <div className="relative z-0 overflow-hidden rounded-xl border border-line bg-card shadow-[0_20px_38px_-30px_rgba(31,36,32,0.5)]">
      <div className="flex h-8 items-center justify-between border-b border-line px-4">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C87264]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#D8A847]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#5F9C69]" />
        </span>
        <span className="font-sans text-[0.57rem] font-medium text-muted">
          riverstonebuilders.com
        </span>
        <span className="w-7" />
      </div>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.12em] text-ink">
          Riverstone Builders
        </p>
        <div className="hidden items-center gap-2.5 text-[0.52rem] font-semibold text-ink/70 sm:flex">
          <span>Services</span>
          <span>Projects</span>
          <span>About</span>
          <span>Blog</span>
          <span>Contact</span>
        </div>
        <span className="shrink-0 rounded bg-[#174A31] px-1.5 py-1 text-[0.5rem] font-semibold text-ivory">
          Request a Quote
        </span>
      </div>
      <div className="relative min-h-[11.5rem] overflow-hidden bg-ink px-5 py-6 text-ivory">
        <Image
          src="/images/services/png/02-riverstone-demo.png"
          alt="Illustrative local builder homepage"
          fill
          sizes="(min-width: 1280px) 32vw, 90vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,9,0.92)_0%,rgba(8,10,9,0.78)_28%,rgba(8,10,9,0.42)_58%,rgba(8,10,9,0.12)_82%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative z-10 max-w-[15rem]">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ivory/80">
            Orlando custom home builder
          </p>
          <h3 className="mt-2.5 font-serif text-[1.55rem] leading-[1.02] tracking-[-0.025em]">
            Custom Homes &amp; Renovations in Orlando, Florida
          </h3>
          <p className="mt-2.5 text-[0.66rem] leading-5 text-ivory/88">
            Thoughtful design, quality craftsmanship, and clear next steps for
            how you live.
          </p>
          <span className="mt-3.5 inline-flex rounded bg-[#174A31] px-3 py-2 text-[0.62rem] font-semibold text-ivory">
            Request a Quote
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-line px-4 py-3">
        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-sand">
          <Image
            src="/images/services/png/02-riverstone-demo-2.png"
            alt="Illustrative featured project"
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-muted">
            Featured project
          </p>
          <p className="mt-0.5 text-[0.72rem] font-semibold leading-tight text-ink">
            Lake Nona Custom Home
          </p>
          <p className="mt-0.5 text-[0.6rem] leading-4 text-ink/70">
            A modern, open-concept home designed for entertaining and everyday
            living.
          </p>
        </div>
        <span className="ml-auto hidden shrink-0 items-center gap-1 text-[0.6rem] font-semibold text-forest sm:flex">
          View
          <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </span>
      </div>
      <div className="border-t border-line px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[0.66rem] font-semibold text-ink">
            How long does a custom home build take?
          </p>
          <Plus className="h-3 w-3 shrink-0 text-ink/50" strokeWidth={2.4} />
        </div>
        <p className="mt-1 text-[0.6rem] leading-4 text-muted">
          Most custom homes take 7–10 months from design approval to move-in,
          depending on scope and materials.
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-line bg-[#faf8f4] px-4 py-3">
        <p className="text-[0.66rem] font-semibold text-ink">
          Ready to build something great?
        </p>
        <span className="shrink-0 rounded bg-[#174A31] px-2.5 py-1 text-[0.58rem] font-semibold text-ivory">
          Contact Us
        </span>
      </div>
    </div>
  );
}

function SearchResultSnapshot() {
  return (
    <div className="rounded-xl border border-line bg-card p-4 shadow-soft">
      <div className="flex items-center gap-2.5">
        <GoogleMark className="h-5 w-5" />
        <div className="min-w-0 flex-1">
          <SearchBar compact />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.67rem] text-forest">
            https://riverstonebuilders.com
          </p>
          <p className="mt-1 text-[0.85rem] font-semibold leading-tight text-[#1A5FCC]">
            Riverstone Builders
          </p>
          <p className="mt-2 text-[0.67rem] leading-4 text-ink/78">
            Custom homes and renovations in Orlando. View projects, services,
            and request a quote.
          </p>
        </div>
        <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-md border border-line bg-sand">
          <Image
            src="/images/services/png/02-riverstone-demo.png"
            alt=""
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="mt-3 flex gap-2 text-[0.62rem] font-medium text-[#1A5FCC]">
        <span>Services</span>
        <span>Projects</span>
        <span>Contact</span>
      </div>
    </div>
  );
}

function AiOverviewSnapshot() {
  return (
    <div className="rounded-xl border border-line bg-[linear-gradient(135deg,rgba(239,244,233,0.76),rgba(255,252,245,0.96))] p-4 shadow-soft">
      <p className="flex items-center gap-2 text-[0.75rem] font-semibold text-ink">
        <Sparkle className="h-4 w-4 fill-forest text-forest" strokeWidth={1.2} />
        AI Overview
      </p>
      <p className="mt-3 text-[0.67rem] leading-4 text-ink/80">
        Riverstone Builders is a custom home builder in Orlando, Florida. The
        site showcases projects, explains services, and provides clear ways to
        request a quote.
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {['Location: Orlando, FL', 'Service: Custom Homes', 'Proof: Project examples'].map(
          (item) => (
            <span
              key={item}
              className="rounded-full bg-forest-soft px-2 py-1 text-[0.55rem] font-semibold text-forest"
            >
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

function SearchVisibilityWork() {
  const project = getCaseStudy("tizirsso");
  if (!project) return null;

  return (
    <section className="border-b border-line py-12 lg:py-14">
      <h2 className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
        Relevant work
      </h2>
      <Link
        href={`/${project.slug}`}
        className="group mt-6 grid overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-lift sm:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] sm:items-center"
      >
        <div className="relative min-h-[9rem] overflow-hidden bg-sand sm:min-h-[8.5rem]">
          {project.coverImage ? (
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              sizes="(min-width: 640px) 30vw, 90vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 sm:pr-8">
          <div className="min-w-0">
            <h3 className="font-serif text-[1.4rem] font-medium leading-tight text-ink">
              {project.name}
            </h3>
            <p className="mt-1 text-[0.72rem] font-medium text-muted">
              {project.badge} · {project.category}
            </p>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted">
              {project.teaser}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-forest">
            View project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </section>
  );
}

function SearchVisibilityFaq() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <FAQSection
        faqs={[...searchVisibilityFaqs]}
        description="Straight answers about search visibility, what the work changes, and what to expect along the way."
      />
    </section>
  );
}

function SearchVisibilityCta() {
  return (
    <section className="py-10 lg:py-12">
      <div className="mt-0 flex flex-col gap-6 rounded-xl border border-line bg-card px-6 py-7 shadow-soft sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-xl">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Search &amp; AI Visibility
          </p>
          <h2 className="mt-3 font-serif text-[1.85rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.15rem]">
            Let&apos;s make your site easier to find and understand.
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
            Send over your site and a little context about what you want to
            improve.
          </p>
        </div>

        <div className="flex w-fit shrink-0 flex-col items-stretch gap-4">
          <ProjectInquiryTrigger
            source="search_visibility_service_cta"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
          >
            Send my site for a visibility review
            <ArrowRight className="h-4 w-4" />
          </ProjectInquiryTrigger>
        </div>
      </div>
    </section>
  );
}

const webDesignContainer =
  "mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8";
const webDesignDemoImage = "/images/services/png/01-hearth-home-demo.png";
const webDesignLogo = "/images/services/svg/01-hearth-logo-demo.svg";

const webDesignIncludes = [
  {
    title: "Custom design",
    body: "A website built around your brand, not a generic template.",
    icon: Paintbrush,
  },
  {
    title: "Responsive everywhere",
    body: "Looks and works cleanly on phones, tablets, and desktops.",
    icon: MonitorSmartphone,
  },
  {
    title: "Clear messaging",
    body: "Pages structured so visitors understand what you do and what to do next.",
    icon: MessageSquareText,
  },
  {
    title: "Fast & reliable",
    body: "Modern builds that load quickly and stay stable over time.",
    icon: Gauge,
  },
  {
    title: "Easy to manage",
    body: "Set up so you can update content yourself, or we can handle it for you.",
    icon: Settings2,
  },
  {
    title: "Built to grow",
    body: "A foundation that can expand as your business and offers evolve.",
    icon: TrendingUp,
  },
] as const;

const webDesignTransformation = [
  {
    step: 1,
    title: "Current site",
    body: "Cramped layout, weak hierarchy, and no clear next step.",
    stage: "current",
  },
  {
    step: 2,
    title: "Better structure",
    body: "The same offer, now with clearer sections and navigation.",
    stage: "structure",
  },
  {
    step: 3,
    title: "Modern design",
    body: "Typography, imagery, and spacing start to feel intentional.",
    stage: "modern",
  },
  {
    step: 4,
    title: "Launched website",
    body: "Polished page with a clear CTA and supporting detail.",
    stage: "launch",
  },
] as const;

const webDesignProcess = [
  {
    title: "Understand the business",
    body: "We learn what you do, who you serve, and what the website needs to accomplish.",
    icon: Search,
  },
  {
    title: "Design and build",
    body: "We shape the structure, design, and development into a clear, modern site.",
    icon: LayoutTemplate,
  },
  {
    title: "Launch and improve",
    body: "We launch carefully, then keep refining based on how the site is used.",
    icon: Rocket,
  },
] as const;

const webDesignFaqs = [
  {
    question: "How much does a business website cost?",
    answer:
      "It depends on scope: pages, content, design depth, and any integrations. After a short discovery call, I can give you a clear range based on what the site actually needs to do.",
  },
  {
    question: "How long does a website project usually take?",
    answer:
      "A focused small-business site often lands in a few weeks. Redesigns, richer content, or custom features take longer. Timeline depends on feedback speed and how ready the content is.",
  },
  {
    question: "Can CK Works redesign my existing website?",
    answer:
      "Yes. We can keep what still works, clean up the structure and messaging, and rebuild the experience so it looks sharper and converts more clearly.",
  },
  {
    question: "What will you need from me during the project?",
    answer:
      "Typically: goals, who you serve, brand assets if you have them, examples you like, and content inputs or access to what already exists. I guide the process so you always know what is needed next.",
  },
  {
    question: "Will I be able to update the website after launch?",
    answer:
      "Yes. We can set it up so you can handle common updates yourself, or keep CK Works involved for ongoing changes, depending on how hands-on you want to be.",
  },
] as const;

const webDesignProjectSlugs = ["tizirsso", "taylor", "centi"] as const;

function WebDesignServicePage({ service }: { service: ServiceArea }) {
  const projects = webDesignProjectSlugs
    .map((projectSlug) => getCaseStudy(projectSlug))
    .filter((project): project is CaseStudy => Boolean(project));

  return (
    <SiteLayout>
      <ServiceViewed name={service.title} slug={service.slug} />
      <ServiceSchema service={service} />
      <section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={webDesignContainer}>
          <WebDesignHero />
          <WebDesignIncludes />
          <WebDesignTransformation />
          <WebDesignProcess />
          <WebDesignWork projects={projects} />
          <WebDesignFaq />
          <WebDesignBottomCta />
        </div>
      </section>
    </SiteLayout>
  );
}

function WebDesignHero() {
  return (
    <div className="grid items-center gap-10 border-b border-line pb-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
          Design
        </p>
        <h1 className={serviceHeroTitleClassName}>
          Web Design & Development
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-ink/78">
          Websites built around what your business needs people to understand
          and do.
        </p>
        <p className="mt-5 max-w-lg text-base leading-7 text-ink/78">
          We plan, design, and build modern websites that look great, work
          everywhere, and make it easy for your customers to take action.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ProjectInquiryTrigger
            source="web_design_service_hero"
            className="rounded-md px-5"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </ProjectInquiryTrigger>
          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-ink transition-colors hover:text-forest"
          >
            View our work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <WebDesignDevicePreview />
    </div>
  );
}

function WebDesignDevicePreview() {
  return (
    <div className="relative min-h-[22rem] sm:min-h-[26rem] lg:min-h-[29rem]">
      <div
        className="pointer-events-none absolute bottom-3 left-8 right-8 h-12 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(31,36,32,0.22),rgba(31,36,32,0.08)_42%,transparent_72%)] blur-xl"
        aria-hidden
      />

      <div className="absolute left-0 top-3 w-[79%] sm:w-[80%]">
        <div className="relative">
          <div className="relative aspect-[16/10] rounded-t-[1.55rem] rounded-b-none bg-[linear-gradient(145deg,#050605_0%,#111511_43%,#252B26_52%,#121712_66%,#080A08_100%)] p-[7px] shadow-[0_28px_58px_-28px_rgba(17,23,20,0.82),0_8px_18px_-10px_rgba(17,23,20,0.5)]">
            <span
              className="pointer-events-none absolute inset-[2px] rounded-t-[1.35rem] rounded-b-none bg-[linear-gradient(165deg,rgba(255,255,255,0.045),transparent_30%,rgba(0,0,0,0.34)_78%)] opacity-45"
              aria-hidden
            />
            <div className="relative h-full overflow-hidden rounded-t-[1.05rem] rounded-b-none border border-black/25 bg-card shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
              <LaptopBrowserContent />
            </div>
          </div>

          {/* Laptop Divider Bar */}
          <div
            className="relative z-10 -mt-px h-[9px] bg-[linear-gradient(180deg,#353C35_0%,#1D241E_42%,#111511_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.11),0_4px_8px_-8px_rgba(0,0,0,0.9)]"
            aria-hidden
          >
            <span className="absolute inset-x-[1px] top-px h-px bg-white/10" />
          </div>

          {/* Laptop Base */}
          <div className="relative z-20 mx-[-7%] -mt-[3px] h-[22px] shadow-[0_18px_32px_-23px_rgba(17,23,20,0.72)]">
            <span
              className="absolute inset-x-0 top-0 h-full rounded-b-[1.45rem] bg-[linear-gradient(180deg,#6B766C_0%,#4A554B_46%,#172018_100%)] shadow-[inset_0_2px_3px_rgba(255,255,255,0.08),inset_0_-4px_7px_rgba(0,0,0,0.36)]"
              aria-hidden
            />
            <span
              className="absolute inset-x-[2.75%] top-0 h-[13px] bg-[linear-gradient(180deg,#A4A99F_0%,#899185_48%,rgba(102,114,104,0)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] [mask-image:linear-gradient(90deg,transparent_0%,black_9%,black_91%,transparent_100%)]"
              aria-hidden
            />
            <span
              className="absolute inset-x-[4%] top-[1px] h-px rounded-full bg-white/28"
              aria-hidden
            />
            <span
              className="absolute left-1/2 top-0 h-[9px] w-[27%] -translate-x-1/2 rounded-b-[0.85rem] bg-[linear-gradient(180deg,#5B625A_0%,#888A80_56%,#B4B2A8_100%)] shadow-[inset_0_-1px_2px_rgba(255,255,255,0.36),inset_0_2px_3px_rgba(0,0,0,0.22),0_6px_12px_-10px_rgba(0,0,0,0.78)]"
              aria-hidden
            />
            <span
              className="absolute inset-x-5 bottom-[2px] h-[2px] rounded-full bg-black/30 blur-[0.5px]"
              aria-hidden
            />
            <span
              className="absolute -bottom-[3px] left-[11%] h-[5px] w-10 rounded-b-md bg-[linear-gradient(180deg,#2A2F29,#070807)] shadow-[0_3px_8px_-4px_rgba(0,0,0,0.9)]"
              aria-hidden
            />
            <span
              className="absolute -bottom-[3px] right-[11%] h-[5px] w-10 rounded-b-md bg-[linear-gradient(180deg,#2A2F29,#070807)] shadow-[0_3px_8px_-4px_rgba(0,0,0,0.9)]"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-[5.65rem] z-20 w-[29%] min-w-[8.4rem] max-w-[10.5rem]">
        <div className="relative rounded-[2.3rem] bg-[linear-gradient(145deg,#050605_0%,#181B18_30%,#6F746C_43%,#FFF9EA_49%,#3C423B_56%,#060706_74%,#161A16_100%)] p-[2px] shadow-[0_18px_38px_-18px_rgba(17,23,20,0.7),0_6px_14px_-8px_rgba(17,23,20,0.58)]">
          <span
            className="pointer-events-none absolute inset-[1px] rounded-[2.2rem] bg-[radial-gradient(circle_at_30%_7%,rgba(255,255,255,0.38),transparent_24%),linear-gradient(160deg,rgba(255,255,255,0.16),transparent_35%,rgba(0,0,0,0.42)_74%)] opacity-70"
            aria-hidden
          />
          <span
            className="absolute -right-[2px] top-24 h-11 w-[3px] rounded-r-full bg-[linear-gradient(180deg,#313630,#090A09)]"
            aria-hidden
          />
          <div className="relative rounded-[2.15rem] bg-[linear-gradient(145deg,#030403_0%,#0C0F0C_46%,#252B25_58%,#050605_100%)] p-[4px] shadow-[inset_1px_1px_1px_rgba(255,255,255,0.16),inset_-2px_-2px_4px_rgba(0,0,0,0.82)]">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-card shadow-[inset_0_0_0_1px_rgba(31,36,32,0.05)]">
              <div
                className="pointer-events-none absolute left-1/2 top-[-6px] z-30 h-[20px] w-[62px] -translate-x-1/2"
                aria-hidden
              >
                <div className="relative h-full w-full rounded-b-[8px] bg-[#050605] shadow-[0_1px_0_rgba(5,6,5,0.95)]">
                  <span className="absolute -left-[8px] top-0 h-2 w-2 rounded-br-lg shadow-[8px_0_0_0_#050605]" />
                  <span className="absolute -right-[8px] top-0 h-2 w-2 rounded-bl-lg shadow-[-8px_0_0_0_#050605]" />
                  <span className="absolute left-1/2 top-[9px] h-[2px] w-[22px] -translate-x-1/2 rounded-full bg-white/16" />
                </div>
              </div>

              <div className="h-[19.5rem] overflow-hidden bg-card">
                <WebDesignPhoneStatusBar />
                <div className="px-4 pb-4 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Image
                        src={webDesignLogo}
                        alt=""
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 object-contain"
                      />
                      <span className="font-serif text-[11px] font-medium tracking-[0.02em] text-ink">
                        Hearth & Home
                      </span>
                    </span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full text-ink">
                      <span className="space-y-[2px]" aria-hidden>
                        <span className="block h-px w-3 bg-ink" />
                        <span className="block h-px w-3 bg-ink" />
                        <span className="block h-px w-3 bg-ink" />
                      </span>
                    </span>
                  </div>
                  <p className="mt-5 font-serif text-[1.42rem] font-medium leading-[1.03] tracking-[-0.02em] text-ink">
                    Spaces that reflect how you live.
                  </p>
                  <p className="mt-2.5 text-[8px] leading-4 text-muted">
                    Full-service interior design from concept to completion.
                  </p>
                  <span className="mt-3.5 inline-flex rounded bg-[#174A31] px-3 py-2 text-[8px] font-semibold text-ivory shadow-[0_8px_18px_-12px_rgba(23,74,49,0.9)]">
                    Book a Consultation
                  </span>
                  <div className="relative mt-3.5 h-[5.2rem] overflow-hidden rounded-lg shadow-[0_12px_24px_-18px_rgba(31,36,32,0.75)]">
                    <Image
                      src={webDesignDemoImage}
                      alt="Mobile interior design website preview"
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LaptopBrowserContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-9 items-center justify-between border-b border-line bg-card px-4">
        <span className="flex items-center gap-1.5">
          <Image
            src={webDesignLogo}
            alt=""
            width={14}
            height={14}
            className="h-3.5 w-3.5 object-contain"
          />
          <span className="font-serif text-[9px] font-medium tracking-[0.02em] text-ink">
            Hearth & Home
          </span>
        </span>
        <div className="hidden gap-5 text-[7px] font-semibold text-ink/70 sm:flex">
          <span>Our Services</span>
          <span>Projects</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <span className="rounded bg-[#174A31] px-2.5 py-1.5 text-[7px] font-semibold text-ivory shadow-[0_6px_16px_-12px_rgba(23,74,49,0.92)]">
          Book a Consultation
        </span>
      </div>
      <div className="relative min-h-0 flex-1 bg-ink">
        <Image
          src={webDesignDemoImage}
          alt="Interior design website preview"
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/72 via-ink/18 to-transparent" />
        <div className="absolute left-7 top-[20%] max-w-[15rem] text-ivory">
          <p className="font-serif text-[2rem] leading-[1.02] tracking-[-0.02em]">
            Thoughtful spaces, built around you.
          </p>
          <p className="mt-4 max-w-[12rem] text-[10px] leading-5 text-ivory/84">
            Interior design for homes that feel calm, comfortable, and
            considered.
          </p>
          <span className="mt-5 inline-flex rounded bg-ivory px-3 py-2 text-[8px] font-semibold text-ink shadow-[0_10px_18px_-14px_rgba(0,0,0,0.7)]">
            View our projects
          </span>
        </div>
      </div>
    </div>
  );
}

function ServiceCellularSignal() {
  return (
    <span className="flex h-[6px] items-end gap-[0.75px]" aria-hidden>
      {[2.5, 3.5, 4.5, 5.5].map((height) => (
        <span
          key={height}
          className="w-px rounded-full bg-ink"
          style={{ height }}
        />
      ))}
    </span>
  );
}

function ServiceWifiSignal() {
  return (
    <svg viewBox="0 0 10 8" className="h-[7px] w-[9px] text-ink" aria-hidden>
      <path
        d="M1.3 2.5C3.4.8 6.6.8 8.7 2.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.1"
      />
      <path
        d="M2.9 4.2C4.1 3.3 5.9 3.3 7.1 4.2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.1"
      />
      <path
        d="M4.5 6C4.8 5.8 5.2 5.8 5.5 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function ServiceBatteryIcon() {
  return (
    <span className="relative inline-flex h-[3.5px] w-[8px] shrink-0" aria-hidden>
      <span className="absolute inset-0 rounded-[1px] border border-ink/80" />
      <span className="absolute bottom-[1px] right-[-1.5px] top-[1px] w-px rounded-r bg-ink/70" />
      <span className="absolute bottom-[1px] left-[1px] top-[1px] w-[4.75px] rounded-[0.5px] bg-ink" />
    </span>
  );
}

function WebDesignPhoneStatusBar() {
  return (
    <div className="relative z-20 flex h-[18px] items-start justify-between px-[15px] pt-[5px]">
      <span className="pl-1.5 text-[6px] font-semibold leading-none text-ink">
        9:41
      </span>
      <span className="flex shrink-0 items-center justify-end gap-[2px]">
        <ServiceCellularSignal />
        <ServiceWifiSignal />
        <ServiceBatteryIcon />
      </span>
    </div>
  );
}

function WebDesignIncludes() {
  return (
    <section className="grid gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-16 lg:py-16">
      <div className="max-w-md">
        <p className={serviceSectionLabelClassName}>
          What this service covers
        </p>
        <h2 className={serviceSectionTitleClassName}>
          Everything you need in a website.
        </h2>
        <p className={serviceSectionBodyClassName}>
          From structure and design to development and launch, we build
          websites that look professional and help your business get results.
        </p>
        <Link
          href="/services"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-forest"
        >
          See all services
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        {webDesignIncludes.map(({ title, body, icon: Icon }) => (
          <article key={title} className="flex gap-4">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center text-ink">
              <Icon className="h-6 w-6" strokeWidth={1.4} />
            </span>
            <div>
              <h3 className="text-[0.95rem] font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WebDesignTransformation() {
  return (
    <section className="border-b border-line py-14 lg:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>
          From outdated to built for today
        </p>
        <h2 className={serviceCenterTitleClassName}>
          A better website makes a real difference.
        </h2>
      </div>

      {/* Mobile / tablet: stacked steps */}
      <div className="mt-8 grid gap-8 md:grid-cols-2 xl:hidden">
        {webDesignTransformation.map((step) => (
          <TransformationStep key={step.title} step={step} />
        ))}
      </div>

      {/* Desktop: equal-width cards. Perspective is per-card (not shared),
          otherwise one camera makes left gaps look huge and right cards stack. */}
      <div className="mt-12 hidden xl:block">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
        >
          {webDesignTransformation.map((step) => (
            <TransformationCardTilt key={step.title}>
              <WebsiteStagePreview step={step} />
            </TransformationCardTilt>
          ))}
        </div>
        <div
          className="mt-7 grid items-stretch"
          style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
        >
          {webDesignTransformation.map((step, index) => (
            <div
              key={step.title}
              className={`relative min-h-[9.5rem] min-w-0 px-7 first:pl-0 last:pr-0 ${
                index > 0 ? "border-l border-line" : ""
              }`}
            >
              <div className="flex min-h-8 items-center justify-between gap-3">
                <h3 className="min-w-0 font-serif text-[1.5rem] font-medium leading-tight tracking-[-0.02em] text-ink">
                  <span className="mr-3 font-sans text-[0.95rem] font-medium tracking-[0.05em] text-forest/75">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  {step.title}
                </h3>
                {index < webDesignTransformation.length - 1 ? (
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-forest/80"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                ) : (
                  <Flag
                    className="h-5 w-5 shrink-0 text-forest/80"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                )}
              </div>
              <div className="mt-5 h-px bg-line" aria-hidden />
              <p className="mt-5 max-w-[15rem] text-sm leading-7 text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Card-shell 3D only — local perspective so every card gets the same tilt + spacing. */
function TransformationCardTilt({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-w-0 w-full"
      style={{
        perspective: "900px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      <div
        className="w-full"
        style={{
          transform: "rotateY(-3.5deg) rotateX(0.8deg)",
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          filter: "blur(0)",
          boxShadow:
            "-18px 16px 32px -16px rgba(31, 36, 32, 0.34), -6px 6px 14px -8px rgba(31, 36, 32, 0.2)",
          borderRadius: "0.375rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function TransformationStep({
  step,
}: {
  step: (typeof webDesignTransformation)[number];
}) {
  return (
    <article className="min-w-0">
      <TransformationCardTilt>
        <WebsiteStagePreview step={step} />
      </TransformationCardTilt>
      <TransformationCaption step={step} className="mt-3" />
    </article>
  );
}

function TransformationCaption({
  step,
  className = "",
}: {
  step: (typeof webDesignTransformation)[number];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-[0.95rem] font-semibold text-ink text-justify">
        <span className="text-muted">{step.step}.</span> {step.title}
      </h3>
      <p className="mt-1 text-xs leading-5 text-muted text-justify pr-[6rem]">{step.body}</p>
    </div>
  );
}

function WebsiteStagePreview({
  step,
}: {
  step: (typeof webDesignTransformation)[number];
}) {
  const isCurrent = step.stage === "current";
  const overlayHeader = step.stage === "modern";

  return (
    <div
      className={`relative flex aspect-[4/3] flex-col overflow-hidden rounded-md border shadow-soft ${
        isCurrent ? "border-ink/35 bg-[#252821] text-ivory" : "border-line bg-card text-ink"
      }`}
    >
      {overlayHeader ? (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <ModernSitePreview />
          </div>
          <div className="absolute inset-x-0 top-0 z-10">
            <StageBrowserHeader isCurrent={isCurrent} stage={step.stage} />
          </div>
        </>
      ) : (
        <>
          <StageBrowserHeader isCurrent={isCurrent} stage={step.stage} />
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {step.stage === "current" && <CurrentSitePreview />}
            {step.stage === "structure" && <StructuredSitePreview />}
            {step.stage === "launch" && <LaunchedSitePreview />}
          </div>
        </>
      )}
    </div>
  );
}

function StageBrowserHeader({
  isCurrent,
  stage,
}: {
  isCurrent: boolean;
  stage: (typeof webDesignTransformation)[number]["stage"];
}) {
  const navItems =
    stage === "current"
      ? ["Home", "Info", "Photos"]
      : ["Home", "Services", "Projects", "Contact"];

  return (
    <div
      className={`relative z-10 flex h-8 shrink-0 items-center gap-2 border-b px-2.5 ${
        stage === "modern"
          ? "border-white/15 bg-ink/45 text-ivory"
          : isCurrent
            ? "border-white/10 bg-black/25"
            : "border-line/70 bg-card"
      }`}
    >
      <span className="flex min-w-0 items-center gap-1">
        <Image
          src={webDesignLogo}
          alt=""
          width={12}
          height={12}
          className={`h-3 w-3 shrink-0 object-contain ${
            stage === "modern" || isCurrent ? "brightness-0 invert opacity-80" : ""
          }`}
        />
        <span
          className={`truncate font-serif text-[10px] font-semibold tracking-[0.01em] ${
            stage === "modern" || isCurrent ? "text-ivory/85" : "text-ink"
          }`}
        >
          Hearth & Home
        </span>
      </span>
      <span
        className={`ml-auto flex min-w-0 items-center justify-end gap-1.5 truncate text-[7.5px] font-semibold ${
          stage === "current"
            ? "gap-1 text-ivory/45"
            : stage === "modern"
              ? "text-ivory/75"
              : "text-ink/60"
        }`}
      >
        {navItems.map((item) => (
          <span key={item} className="shrink-0">
            {item}
          </span>
        ))}
      </span>
      {stage === "launch" && (
        <span className="shrink-0 rounded bg-[#174A31] px-1.5 py-0.5 text-[7px] font-semibold text-ivory">
          Book
        </span>
      )}
    </div>
  );
}

function CurrentSitePreview() {
  return (
    <div className="absolute inset-0 grid grid-cols-[0.44fr_0.56fr] gap-1.5 bg-[#171a16] p-2">
      <div className="flex min-h-0 flex-col gap-1.5">
        <div className="space-y-1 rounded border border-white/10 bg-white/[0.03] p-2">
          <span className="block h-1.5 w-10 rounded-full bg-ivory/35" />
          <span className="block h-1 w-14 rounded-full bg-ivory/20" />
          <span className="block h-1 w-8 rounded-full bg-ivory/15" />
        </div>
        <div className="min-h-0 flex-1 space-y-1 rounded border border-white/10 bg-black/25 p-1.5">
          {["Services", "Rooms", "Gallery", "Contact"].map((item) => (
            <span
              key={item}
              className="block rounded-sm border border-white/8 bg-white/[0.04] px-1.5 py-1 text-[7px] text-ivory/50"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="rounded border border-dashed border-white/15 px-1.5 py-1 text-[7px] text-ivory/40">
          No clear CTA
        </div>
      </div>
      <div className="relative min-h-0 overflow-hidden rounded-sm border border-white/10">
        <Image
          src={webDesignDemoImage}
          alt=""
          fill
          sizes="240px"
          className="object-cover opacity-45 grayscale"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-x-2 bottom-2">
          <p className="text-[10px] font-semibold leading-tight text-ivory/80">
            Interior design services and beautiful homes.
          </p>
          <p className="mt-1 text-[7px] leading-snug text-ivory/45">
            Busy copy with no hierarchy.
          </p>
        </div>
      </div>
    </div>
  );
}

function StructuredSitePreview() {
  return (
    <div className="absolute inset-0 grid grid-cols-[0.54fr_0.46fr] bg-[#f7f4ed]">
      <div className="flex flex-col justify-center px-3 py-2.5">
        <p className="font-serif text-[1.05rem] font-medium leading-[1.08] text-ink">
          Spaces that feel like home.
        </p>
        <p className="mt-2 text-[8.5px] leading-[1.4] text-ink/55">
          Clear headline, short support copy, and one next step.
        </p>
        <span className="mt-2.5 inline-flex w-fit rounded bg-[#174A31] px-2.5 py-1 text-[8px] font-semibold text-ivory">
          Learn more
        </span>
      </div>
      <div className="relative min-h-0 overflow-hidden">
        <Image
          src={webDesignDemoImage}
          alt=""
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function ModernSitePreview() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#243028]">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Image
          src={webDesignDemoImage}
          alt=""
          fill
          sizes="280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/25 to-ink/15" />
        {/* pt-8 matches overlay nav (h-8) so justify-center uses the visible area below it */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-8 text-center text-ivory">
          <p className="font-serif text-[1.05rem] font-medium leading-[1.08]">
            Thoughtful spaces, built around you.
          </p>
          <p className="mt-1.5 max-w-[10.5rem] text-[8.5px] leading-[1.4] text-ivory/80">
            Type, spacing, and imagery start working together.
          </p>
          <span className="mt-2.5 inline-flex rounded border border-ivory/55 bg-ivory/10 px-2.5 py-1 text-[8px] font-semibold text-ivory">
            View our work
          </span>
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-3 border-t border-white/10 bg-ink/90 px-2 py-2 text-[7.5px] font-semibold text-ivory/80">
        {["Services", "Projects", "About"].map((item) => (
          <span key={item} className="flex items-center justify-center gap-0.5">
            {item}
            <ArrowRight className="h-2.5 w-2.5 opacity-60" strokeWidth={1.8} />
          </span>
        ))}
      </div>
    </div>
  );
}

const launchedHighlights = [
  { label: "Warm spaces", icon: Home },
  { label: "Refined detail", icon: Sparkle },
  { label: "Easy inquiry", icon: Mail },
] as const;

function LaunchedSitePreview() {
  return (
    <div className="absolute inset-0 flex flex-col bg-card">
      <div className="grid min-h-0 flex-1 grid-cols-[0.48fr_0.52fr]">
        <div className="flex flex-col justify-center bg-[#243028] px-3 py-2.5 text-ivory">
          <p className="font-serif text-[1.05rem] font-medium leading-[1.08]">
            Homes shaped around everyday calm.
          </p>
          <p className="mt-1.5 text-[8.5px] leading-[1.4] text-ivory/78">
            Finished page with a clear action and room to grow.
          </p>
          <span className="mt-2.5 inline-flex w-fit rounded bg-[#174A31] px-2.5 py-1 text-[8px] font-semibold text-ivory">
            Get in touch
          </span>
        </div>
        <div className="relative min-h-0 overflow-hidden">
          <Image
            src={webDesignDemoImage}
            alt=""
            fill
            sizes="220px"
            className="object-cover"
          />
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-3 divide-x divide-line border-t border-line bg-[#faf8f4]">
        {launchedHighlights.map(({ label, icon: Icon }) => (
          <span
            key={label}
            className="flex flex-col items-center justify-center gap-1 px-1 py-2 text-center text-[7.5px] font-semibold leading-tight text-ink/80"
          >
            <Icon className="h-3.5 w-3.5 text-forest" strokeWidth={1.7} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function WebDesignProcess() {
  return (
    <section className="grid gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-16 lg:py-16">
      <div className="max-w-md">
        <p className={serviceSectionLabelClassName}>How we work</p>
        <h2 className={serviceSectionTitleClassName}>
          A clear path from start to launch.
        </h2>
        <p className={serviceSectionBodyClassName}>
          Each project is different, but the foundation stays simple.
        </p>
        <Link
          href="/process"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-forest"
        >
          View the full process
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div>
        {webDesignProcess.map((step, index) => (
          <article
            key={step.title}
            className={`grid min-h-[8.75rem] grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-4 py-6 sm:py-7 ${
              index > 0 ? "border-t border-line" : ""
            }`}
          >
            <span
              className="font-source-serif-display text-[1.7rem] font-semibold leading-none tracking-tight tabular-nums text-forest/80 sm:text-[2rem]"
              style={{ fontVariationSettings: '"opsz" 20' }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-serif text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[1.85rem]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
                {step.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const webDesignWorkContent = {
  featured: {
    slug: "tizirsso",
    label: "Live client website",
    description:
      "A performance-driven website that clarifies the team's story, showcases results, and makes it easy for partners and fans to get involved.",
    highlights: [
      "Clearer content & hierarchy",
      "Stronger story presentation",
      "Sponsor-friendly structure",
    ],
  },
  secondary: [
    {
      slug: "taylor",
      label: "Product build",
      description:
        "A structured product experience that demonstrates clear flows, interface clarity, and organized user journeys.",
    },
    {
      slug: "centi",
      label: "Finance dashboard",
      description:
        "A personal finance dashboard with connected accounts, clear spending insights, and organized financial data.",
    },
  ],
} as const;

function WebDesignWork({ projects }: { projects: CaseStudy[] }) {
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  const featured = bySlug.get(webDesignWorkContent.featured.slug);

  if (!featured) return null;

  return (
    <section className="border-b border-line py-14 lg:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>Selected work</p>
        <h2 className={serviceCenterTitleClassName}>
          Recent projects, real results.
        </h2>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-4">
        <FeaturedWorkCard
          project={featured}
          content={webDesignWorkContent.featured}
        />
        <div className="grid gap-4">
          {webDesignWorkContent.secondary.map((item) => {
            const project = bySlug.get(item.slug);
            return project ? (
              <SecondaryWorkCard
                key={item.slug}
                project={project}
                content={item}
              />
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkCard({
  project,
  content,
}: {
  project: CaseStudy;
  content: (typeof webDesignWorkContent)["featured"];
}) {
  return (
    <Link
      href={`/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="relative min-h-[12rem] flex-[1.35] overflow-hidden bg-ink sm:min-h-[14rem]">
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 38vw, 90vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid-texture absolute inset-0 opacity-25" />
        )}
      </div>

      <div className="flex shrink-0 flex-col bg-card p-4 text-ink sm:p-5">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-forest">
          {content.label}
        </p>
        <h3 className="mt-1.5 font-serif text-[1.45rem] font-semibold leading-tight sm:text-[1.6rem]">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-[0.8rem] leading-5 text-muted">
          {content.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 border-t border-line pt-3 text-[0.68rem] font-medium text-ink/75">
          {content.highlights.map((highlight, index) => (
            <span key={highlight} className="flex items-center gap-2.5">
              {index > 0 && <span className="h-3 w-px bg-line" aria-hidden />}
              <span className="flex items-center gap-1">
                <CircleCheck
                  className="h-3 w-3 shrink-0 text-forest"
                  strokeWidth={2}
                />
                {highlight}
              </span>
            </span>
          ))}
        </div>

        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest">
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function SecondaryWorkCard({
  project,
  content,
}: {
  project: CaseStudy;
  content: (typeof webDesignWorkContent)["secondary"][number];
}) {
  return (
    <Link
      href={`/${project.slug}`}
      className="group grid min-h-[11.5rem] overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-lift sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
    >
      <div className="relative min-h-[9.5rem] overflow-hidden bg-ink sm:h-full sm:min-h-0">
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 26vw, 90vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid-texture absolute inset-0 opacity-25" />
        )}
      </div>

      <div className="flex flex-col justify-center p-4 sm:p-5">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-forest">
          {content.label}
        </p>
        <h3 className="mt-1 font-serif text-[1.25rem] font-semibold leading-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-[0.8rem] leading-5 text-muted">
          {content.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-forest">
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function WebDesignFaq() {
  return (
    <section className="border-t border-line py-12 pb-8 lg:py-14 lg:pb-8">
      <FAQSection
        faqs={[...webDesignFaqs]}
        description="Common questions about planning, building, and maintaining a CK Works website."
      />
    </section>
  );
}

function WebDesignBottomCta() {
  return (
    <div className="mt-0 flex flex-col gap-6 rounded-xl border border-line bg-card px-6 py-7 shadow-soft sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div className="max-w-xl">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
          Web Design &amp; Development
        </p>
        <h2 className="mt-3 font-serif text-[1.85rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.15rem]">
          Ready to build a website that works for your business?
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
          Let&apos;s create something that looks great and gets results.
        </p>
      </div>

      <div className="flex w-fit shrink-0 flex-col items-stretch gap-4">
        <ProjectInquiryTrigger
          source="web_design_service_bottom_cta"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
        >
          Start a project
          <ArrowRight className="h-4 w-4" />
        </ProjectInquiryTrigger>
        <Link
          href="/process"
          className="group inline-flex items-center justify-center gap-1.5 border-b border-forest pb-1.5 text-sm font-semibold text-forest transition-colors hover:text-ink"
        >
          See how the process works
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

// ── Analytics & Lead Tracking (bespoke page) ──────────────────────────────

const analyticsSnapshotStats = [
  { label: "Visits", value: "12.6K", delta: "18%" },
  { label: "Inquiries", value: "228", delta: "24%" },
  { label: "Conversion Rate", value: "1.81%", delta: "0.32 pp" },
  { label: "Top Source", value: "Organic Search", sub: "38% of visits" },
] as const;

/** Source-mix donut segments, dark → light forest. Shares sum to 100. */
const analyticsSourceMix = [
  { label: "Organic Search", share: 38, color: "#2F5B3F" },
  { label: "Direct", share: 26, color: "#527A62" },
  { label: "Paid Search", share: 18, color: "#7FA089" },
  { label: "Referrals", share: 10, color: "#ADC4B3" },
  { label: "Social", share: 8, color: "#D8E2DA" },
] as const;

const analyticsSnapshotLeads = [
  { name: "Northfield Co.", time: "2h ago" },
  { name: "Summit Partners", time: "6h ago" },
  { name: "Hayden Studio", time: "1d ago" },
] as const;

const analyticsWhyRows = [
  {
    icon: BarChart3,
    title: "Know what is working",
    body: "See which pages, content, and campaigns bring traffic and lead to meaningful actions.",
  },
  {
    icon: MapPin,
    title: "Understand where leads begin",
    body: "Attribute inquiries to their original source and channel to focus on what drives real results.",
  },
  {
    icon: TrendingUp,
    title: "Know what to improve next",
    body: "Identify gaps, drop-offs, and opportunities so every change moves the needle.",
  },
] as const;

const analyticsReportStats = [
  { label: "Visits", value: "12.6K", delta: "18%" },
  { label: "Inquiries", value: "228", delta: "24%" },
  { label: "Conversion Rate", value: "1.81%", delta: "0.32 pp" },
  { label: "Engaged Sessions", value: "3.2K", delta: "16%" },
] as const;

const analyticsTopSources = [
  { label: "Organic Search", sessions: "4.8K", share: 38 },
  { label: "Direct", sessions: "3.3K", share: 26 },
  { label: "Paid Search", sessions: "2.3K", share: 18 },
  { label: "Referrals", sessions: "1.2K", share: 10 },
  { label: "Social", sessions: "1.0K", share: 8 },
] as const;

const analyticsReportLeads = [
  { name: "Northfield Co.", time: "May 18, 2:14 PM" },
  { name: "Summit Partners", time: "May 18, 10:03 AM" },
  { name: "Hayden Studio", time: "May 17, 4:21 PM" },
  { name: "Brightline Design", time: "May 17, 11:47 AM" },
  { name: "Lumen Architecture", time: "May 16, 3:08 PM" },
] as const;

const analyticsChanges = [
  { label: "Organic Search visits", delta: "18%" },
  { label: "Inquiries from Organic", delta: "27%" },
  { label: "Pages per session", delta: "12%" },
] as const;

const analyticsScope = [
  {
    title: "Tracking foundations",
    body: "Implement GA4, event tracking, and consent management with a clean, scalable setup.",
  },
  {
    title: "Lead-source clarity",
    body: "Connect forms, calls, and CTAs to their source so you know what drives qualified inquiries.",
  },
  {
    title: "Conversion measurement",
    body: "Define meaningful events, micro-conversions, and goals aligned to your business outcomes.",
  },
  {
    title: "Focused reporting",
    body: "Build dashboards and reports that surface insights and support better decisions.",
  },
] as const;

const analyticsFaqs = [
  {
    question: "What can CK Works track on my website?",
    answer:
      "The actions that actually matter for your business: form starts and submissions, email and phone clicks, WhatsApp taps, and service or project views — along with the page and source that led to each one. The goal is meaningful events, not vanity metrics.",
  },
  {
    question: "Can you improve an existing analytics setup?",
    answer:
      "Yes. If GA4, Search Console, or event tracking are already in place, we can audit what exists, fix gaps or double-counting, and reorganize it into reporting you can actually read.",
  },
  {
    question: "Can leads be connected to their original source?",
    answer:
      "In most cases, yes. By capturing landing page, referrer, and UTM details when an inquiry comes in, we can tie a lead back to the campaign, search, or page that produced it — so you know what is working.",
  },
  {
    question: "Do you build custom dashboards?",
    answer:
      "When it is useful. Many businesses are well served by clean GA4 reporting to start. If you outgrow that, a simple custom dashboard can bring the numbers that matter into one view — often as part of Digital Systems & Integrations.",
  },
] as const;

const analyticsProjectSlugs = ["centi", "internal-automation-tool"] as const;

/** Traffic-over-time chart geometry (sessions + conversions), module-level. */
const analyticsTraffic = (() => {
  const width = 340;
  const height = 130;
  const max = 1000;
  const toPath = (values: number[]) =>
    values
      .map(
        (value, index) =>
          `${index ? "L" : "M"}${(
            (index / (values.length - 1)) * width
          ).toFixed(1)} ${(height - (value / max) * height).toFixed(1)}`,
      )
      .join(" ");
  const sessions = [
    470, 520, 480, 590, 545, 640, 585, 655, 610, 700, 660, 745, 690, 775, 810,
  ];
  const conversions = [
    85, 105, 92, 128, 110, 142, 120, 150, 132, 158, 140, 170, 152, 178, 190,
  ];
  const sessionsLine = toPath(sessions);
  return {
    width,
    height,
    sessionsLine,
    sessionsArea: `${sessionsLine} L${width} ${height} L0 ${height} Z`,
    conversionsLine: toPath(conversions),
    gridY: [0, 0.25, 0.5, 0.75, 1].map((ratio) => ratio * height),
  };
})();

function AnalyticsServicePage({ service }: { service: ServiceArea }) {
  const projects = analyticsProjectSlugs
    .map((projectSlug) => getCaseStudy(projectSlug))
    .filter((project): project is CaseStudy => Boolean(project));

  return (
    <SiteLayout>
      <ServiceViewed name={service.title} slug={service.slug} />
      <ServiceSchema service={service} />
      <section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={webDesignContainer}>
          <AnalyticsHero />
          <AnalyticsWhyMeasurement />
          <AnalyticsReportingSection />
          <AnalyticsScope />
          <AnalyticsWork projects={projects} />
          <AnalyticsFaq />
          <AnalyticsBottomCta />
        </div>
      </section>
    </SiteLayout>
  );
}

function AnalyticsHero() {
  return (
    <div className="grid items-center gap-10 border-b border-line pb-11 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14 lg:pb-14">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
          Measurement
        </p>
        <h1 className={serviceHeroTitleClassName}>
          Analytics &amp;
          <br />
          Lead Tracking
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-ink/78 sm:text-[1.05rem]">
          Clean measurement that shows you what&apos;s working. We track
          traffic, forms, CTAs, search activity, and lead sources — so you can
          make confident decisions.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ProjectInquiryTrigger
            source="analytics_service_hero"
            className="rounded-md px-5"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </ProjectInquiryTrigger>
          <a
            href="#example-report"
            className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-semibold text-forest underline decoration-forest/35 underline-offset-4 transition-colors hover:decoration-forest"
          >
            See an example report
          </a>
        </div>
      </div>

      <MeasurementSnapshot />
    </div>
  );
}

function MeasurementSnapshot() {
  return (
    <div className="rounded-2xl border border-line bg-card p-4 shadow-[0_26px_54px_-34px_rgba(31,36,32,0.55)] sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-sans text-sm font-semibold text-ink">
          Measurement snapshot
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-ivory px-2.5 py-1.5 text-[0.68rem] font-medium text-muted">
          Last 30 days
          <ChevronDown className="h-3 w-3" strokeWidth={2} />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {analyticsSnapshotStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-line bg-card p-3"
          >
            <p className="text-[0.64rem] font-medium text-muted">
              {stat.label}
            </p>
            <p className="mt-1.5 font-sans text-[1.05rem] font-semibold leading-none tracking-[-0.01em] text-ink">
              {stat.value}
            </p>
            {"delta" in stat ? (
              <p className="mt-1.5 inline-flex items-center gap-0.5 text-[0.64rem] font-semibold text-forest">
                <ArrowUp className="h-3 w-3" strokeWidth={2.4} />
                {stat.delta}
              </p>
            ) : (
              <p className="mt-1.5 text-[0.64rem] font-medium text-muted">
                {stat.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-2.5 grid gap-2.5 sm:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
        <div className="rounded-xl border border-line p-3.5">
          <p className="text-[0.68rem] font-semibold text-ink">Source mix</p>
          <div className="mt-3 flex items-center gap-4">
            <SourceMixDonut />
            <ul className="min-w-0 flex-1 space-y-1.5">
              {analyticsSourceMix.map((source) => (
                <li
                  key={source.label}
                  className="flex items-center gap-2 text-[0.64rem]"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: source.color }}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 truncate font-medium text-ink/80">
                    {source.label}
                  </span>
                  <span className="shrink-0 font-medium tabular-nums text-muted">
                    {source.share}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-line p-3.5">
          <p className="text-[0.68rem] font-semibold text-ink">Recent leads</p>
          <ul className="mt-2.5 divide-y divide-line/70">
            {analyticsSnapshotLeads.map((lead) => (
              <li
                key={lead.name}
                className="flex items-center gap-2.5 py-2 first:pt-0"
              >
                <span className="min-w-0 flex-1 truncate text-[0.72rem] font-semibold text-ink">
                  {lead.name}
                </span>
                <span className="shrink-0 text-[0.62rem] font-medium text-muted">
                  {lead.time}
                </span>
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-2.5 text-[0.7rem] font-semibold text-forest">
            View all leads
            <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </span>
        </div>
      </div>
    </div>
  );
}

/** 5-segment donut; r=15.9155 makes the circumference 100 so shares map 1:1. */
function SourceMixDonut() {
  let cumulative = 0;
  const segments = analyticsSourceMix.map((source) => {
    const segment = { ...source, offset: cumulative };
    cumulative += source.share;
    return segment;
  });

  return (
    <svg
      viewBox="0 0 42 42"
      className="h-[4.75rem] w-[4.75rem] shrink-0 -rotate-90"
      aria-hidden
    >
      {segments.map((segment) => (
        <circle
          key={segment.label}
          cx="21"
          cy="21"
          r="15.9155"
          fill="none"
          stroke={segment.color}
          strokeWidth="6.5"
          strokeDasharray={`${segment.share} ${100 - segment.share}`}
          strokeDashoffset={-segment.offset}
        />
      ))}
    </svg>
  );
}

function AnalyticsWhyMeasurement() {
  return (
    <section className="grid gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16 lg:py-16">
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          Why measurement matters
        </p>
        <h2 className={serviceSectionTitleClassName}>
          Measurement should lead to clearer decisions.
        </h2>
        <p className={serviceSectionBodyClassName}>
          Good data removes guesswork. With the right setup, you&apos;ll
          understand what drives results, how visitors engage, and where
          opportunities exist.
        </p>
      </div>

      <div className="divide-y divide-line">
        {analyticsWhyRows.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className="grid gap-x-6 gap-y-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[auto_minmax(0,11rem)_minmax(0,1fr)] sm:items-center"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-soft/60 text-forest">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h3 className="font-serif text-xl font-medium leading-snug text-ink">
              {title}
            </h3>
            <p className="text-sm leading-6 text-muted">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AnalyticsReportingSection() {
  return (
    <section
      id="example-report"
      className="scroll-mt-28 border-b border-line py-14 lg:py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className={serviceCenterLabelClassName}>Example reporting view</p>
        <h2 className={serviceCenterTitleClassName}>
          See the activity that matters.
        </h2>
      </div>

      {/* Backdrop (grid texture + soft glows) behind the tilted dashboard. */}
      <div className="relative mt-10 lg:mt-14">
        <div
          className="grid-texture pointer-events-none absolute -inset-x-8 -inset-y-10 opacity-45 [mask-image:radial-gradient(ellipse_at_center,black_32%,transparent_78%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-12 top-8 h-52 w-52 rounded-full bg-forest-soft/70 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-4 h-60 w-60 rounded-full bg-forest-soft/80 blur-3xl"
          aria-hidden
        />

        {/* Perspective wrapper — the card leans back like a product shot and
            gently settles flatter on hover. */}
        <div className="relative mx-auto max-w-5xl [perspective:1800px]">
          <div className="rounded-2xl border border-line bg-card p-4 shadow-[0_48px_90px_-42px_rgba(31,36,32,0.5)] transition-transform duration-500 [transform-origin:50%_0%] [transform:rotateX(7deg)] hover:[transform:rotateX(2.5deg)] sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {analyticsReportStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-line p-3.5"
            >
              <p className="text-[0.64rem] font-medium text-muted">
                {stat.label}
              </p>
              <p className="mt-1.5 font-sans text-[1.2rem] font-semibold leading-none tracking-[-0.01em] text-ink">
                {stat.value}
              </p>
              <p className="mt-1.5 inline-flex items-center gap-0.5 text-[0.62rem] font-medium text-muted">
                <ArrowUp
                  className="h-3 w-3 text-forest"
                  strokeWidth={2.4}
                />
                <span className="font-semibold text-forest">{stat.delta}</span>
                vs prior 30 days
              </p>
            </div>
          ))}
        </div>

        <div className="mt-2.5 grid gap-2.5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-xl border border-line p-3.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.72rem] font-semibold text-ink">
                Traffic over time
              </p>
              <span className="flex items-center gap-3 text-[0.58rem] font-medium text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-[2px] w-4 rounded-full bg-forest" />
                  Sessions
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 border-t-2 border-dashed border-ink/40" />
                  Conversions
                </span>
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <div className="flex flex-col justify-between py-px text-right text-[0.55rem] leading-none text-muted">
                {["1K", "750", "500", "250", "0"].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <svg
                  viewBox={`0 0 ${analyticsTraffic.width} ${analyticsTraffic.height}`}
                  className="h-[7.5rem] w-full"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient
                      id="analytics-sessions-area"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#2F5B3F"
                        stopOpacity="0.16"
                      />
                      <stop
                        offset="100%"
                        stopColor="#2F5B3F"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  {analyticsTraffic.gridY.map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2={analyticsTraffic.width}
                      y1={y}
                      y2={y}
                      stroke="#DDD6C8"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  <path
                    d={analyticsTraffic.sessionsArea}
                    fill="url(#analytics-sessions-area)"
                  />
                  <path
                    d={analyticsTraffic.sessionsLine}
                    fill="none"
                    stroke="#2F5B3F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={analyticsTraffic.conversionsLine}
                    fill="none"
                    stroke="#1F2420"
                    strokeOpacity="0.45"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <div className="mt-2 flex justify-between text-[0.55rem] leading-none text-muted">
                  {["Apr 19", "Apr 26", "May 3", "May 10", "May 17"].map(
                    (label) => (
                      <span key={label}>{label}</span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-line p-3.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.72rem] font-semibold text-ink">
                Top traffic sources
              </p>
              <span className="text-[0.58rem] font-medium text-muted">
                Sessions
              </span>
            </div>
            <ul className="mt-3 space-y-2.5">
              {analyticsTopSources.map((source) => (
                <li
                  key={source.label}
                  className="grid grid-cols-[minmax(0,4.9rem)_minmax(0,1fr)_auto_auto] items-center gap-2"
                >
                  <span className="truncate text-[0.62rem] font-medium text-ink/80">
                    {source.label}
                  </span>
                  <span className="h-[5px] overflow-hidden rounded-full bg-line/50">
                    <span
                      className="block h-full rounded-full bg-forest"
                      style={{
                        width: `${(source.share / analyticsTopSources[0].share) * 100}%`,
                      }}
                    />
                  </span>
                  <span className="text-[0.62rem] font-semibold tabular-nums text-ink">
                    {source.sessions}
                  </span>
                  <span className="w-7 text-right text-[0.58rem] font-medium tabular-nums text-muted">
                    {source.share}%
                  </span>
                </li>
              ))}
            </ul>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.7rem] font-semibold text-forest">
              View all sources
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </span>
          </div>

          <div className="flex flex-col rounded-xl border border-line p-3.5">
            <p className="text-[0.72rem] font-semibold text-ink">
              Recent leads
            </p>
            <ul className="mt-1.5 divide-y divide-line/70">
              {analyticsReportLeads.map((lead) => (
                <li
                  key={lead.name}
                  className="flex items-center justify-between gap-2 py-[0.42rem]"
                >
                  <span className="min-w-0 truncate text-[0.66rem] font-semibold text-ink">
                    {lead.name}
                  </span>
                  <span className="shrink-0 text-[0.58rem] font-medium text-muted">
                    {lead.time}
                  </span>
                </li>
              ))}
            </ul>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.7rem] font-semibold text-forest">
              View all leads
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </span>
          </div>
        </div>

        <div className="mt-2.5 flex flex-col gap-3 rounded-xl border border-line bg-ivory/60 px-4 py-3.5 lg:flex-row lg:items-center lg:gap-6">
          <span className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-soft/60 text-forest">
              <Sparkle className="h-4 w-4 fill-forest text-forest" strokeWidth={1.2} />
            </span>
            <span>
              <span className="block text-[0.72rem] font-semibold text-ink">
                What changed
              </span>
              <span className="block text-[0.6rem] text-muted">
                Compared to prior 30 days
              </span>
            </span>
          </span>
          <span className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            {analyticsChanges.map((change) => (
              <span
                key={change.label}
                className="flex items-center gap-1.5 text-[0.64rem] font-medium text-ink/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-forest" aria-hidden />
                {change.label}
                <ArrowUp className="h-3 w-3 text-forest" strokeWidth={2.4} />
                <span className="font-semibold text-forest">
                  {change.delta}
                </span>
              </span>
            ))}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-forest lg:ml-auto">
            View full report
            <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </span>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnalyticsScope() {
  return (
    <section className="grid gap-8 border-b border-line py-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12 lg:py-16">
      <div className="max-w-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          Practical scope
        </p>
        <h2 className={serviceSectionTitleClassName}>
          What this service can include.
        </h2>
        <p className={serviceSectionBodyClassName}>
          Every setup is shaped around the business, but most measurement work
          draws from the same core pieces — scoped to what actually helps you
          decide.
        </p>
      </div>
      <div className="border-t border-line">
        {analyticsScope.map(({ title, body }, index) => (
          <article
            key={title}
            className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-5 gap-y-1.5 border-b border-line py-5 sm:grid-cols-[auto_minmax(0,13rem)_minmax(0,1fr)] sm:gap-x-8"
          >
            <span
              className="font-source-serif-display text-[1.35rem] font-semibold leading-none tabular-nums text-forest/70"
              style={{ fontVariationSettings: '"opsz" 20' }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[1.02rem] font-semibold leading-snug text-ink">
              {title}
            </h3>
            <p className="col-start-2 text-sm leading-6 text-muted sm:col-start-3 sm:pt-0.5">
              {body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

const analyticsWorkContent = [
  {
    slug: "centi",
    label: "Featured project",
    description:
      "Connected accounts, transaction data, and spending activity organized into one clear reporting view.",
    tags: [
      { icon: LayoutDashboard, label: "Dashboards" },
      { icon: LineChart, label: "Reporting" },
    ],
    tile: "wordmark",
  },
  {
    slug: "internal-automation-tool",
    label: "Project",
    description:
      "Run results, usage, and operational data tracked so the team could see adoption and guide decisions.",
    tags: [
      { icon: Gauge, label: "Monitoring" },
      { icon: Database, label: "Data tracking" },
    ],
    tile: "icon",
  },
] as const;

function AnalyticsWork({ projects }: { projects: CaseStudy[] }) {
  const bySlug = new Map(projects.map((project) => [project.slug, project]));

  return (
    <section className="border-b border-line py-14 lg:py-16">
      <h2 className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
        Relevant work
      </h2>
      <div className="mt-7 grid gap-5 lg:grid-cols-2 lg:gap-6">
        {analyticsWorkContent.map((content) => {
          const project = bySlug.get(content.slug);
          return project ? (
            <AnalyticsProjectCard
              key={content.slug}
              project={project}
              content={content}
            />
          ) : null;
        })}
      </div>
    </section>
  );
}

function AnalyticsProjectCard({
  project,
  content,
}: {
  project: CaseStudy;
  content: (typeof analyticsWorkContent)[number];
}) {
  return (
    <Link
      href={`/${project.slug}`}
      className="group grid grid-cols-[7rem_minmax(0,1fr)] gap-5 rounded-2xl border border-line bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-lift sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:p-5"
    >
      {content.tile === "wordmark" ? (
        <span className="flex min-h-[7rem] items-center justify-center rounded-xl bg-[#16281d]">
          <span className="font-serif text-[1.7rem] font-semibold lowercase tracking-tight text-ivory">
            {project.name.toLowerCase()}
          </span>
        </span>
      ) : (
        <span className="flex min-h-[7rem] items-center justify-center rounded-xl border border-line bg-sand text-forest">
          <LineChart className="h-8 w-8" strokeWidth={1.4} />
        </span>
      )}

      <span className="flex min-w-0 flex-col">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-forest">
          {content.label}
        </span>
        <span className="mt-1.5 font-serif text-[1.35rem] font-medium leading-tight text-ink">
          {project.name}
        </span>
        <span className="mt-1.5 text-sm leading-6 text-muted">
          {content.description}
        </span>
        <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-3.5">
          {content.tags.map(({ icon: TagIcon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-[0.66rem] font-medium text-muted"
            >
              <TagIcon className="h-3.5 w-3.5 text-forest/70" strokeWidth={1.7} />
              {label}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-forest">
            View project
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
          </span>
        </span>
      </span>
    </Link>
  );
}

function AnalyticsWorkCard({ project }: { project: CaseStudy }) {
  return (
    <Link
      href={`/${project.slug}`}
      className="group flex overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-lift"
    >
      <div className="relative min-h-[10.5rem] w-[38%] shrink-0 overflow-hidden bg-sand">
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 640px) 22vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <AnalyticsTableMock />
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6">
        <h3 className="font-serif text-[1.4rem] font-medium leading-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-1 text-[0.72rem] font-medium text-muted">
          {project.category}
        </p>
        <p className="mt-2.5 text-sm leading-6 text-muted line-clamp-3">
          {project.teaser}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest">
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function AnalyticsTableMock() {
  return (
    <div className="absolute inset-0 flex flex-col gap-1.5 bg-[#f3f0e8] p-3">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-forest/60" />
        <span className="h-1 w-10 rounded-full bg-ink/25" />
        <span className="ml-auto h-1 w-6 rounded-full bg-ink/15" />
      </div>
      <div className="mt-1 flex-1 space-y-1.5 rounded-md border border-ink/10 bg-card/70 p-2">
        {[0, 1, 2, 3, 4].map((row) => (
          <div key={row} className="flex items-center gap-1.5">
            <span className="h-1 w-1/3 rounded-full bg-ink/20" />
            <span className="h-1 w-1/4 rounded-full bg-ink/12" />
            <span className="ml-auto h-1 w-6 rounded-full bg-forest/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsFaq() {
  return (
    <section className="py-12 lg:py-14">
      <h2 className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
        A few useful questions.
      </h2>
      <div className="mt-6 border-t border-line">
        {analyticsFaqs.map((faq) => (
          <details key={faq.question} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="pr-2 text-[0.95rem] font-medium leading-snug text-ink">
                {faq.question}
              </span>
              <Plus
                className="h-5 w-5 shrink-0 text-ink/55 transition-transform duration-200 group-open:rotate-45"
                strokeWidth={1.7}
              />
            </summary>
            <p className="max-w-3xl pb-5 pr-8 text-sm leading-7 text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function AnalyticsBottomCta() {
  return (
    <div className="rounded-2xl border border-line bg-sand px-6 py-8 shadow-soft sm:px-8 sm:py-9 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <h2 className="font-serif text-[1.85rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[2.15rem]">
            Want a clearer view of what your site is doing?
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
            Let&apos;s set up clean tracking and simple reporting so you can make
            confident, informed decisions.
          </p>
        </div>
        <ProjectInquiryTrigger
          source="analytics_service_bottom_cta"
          className="shrink-0 rounded-md px-6"
        >
          Start a project
          <ArrowRight className="h-4 w-4" />
        </ProjectInquiryTrigger>
      </div>
    </div>
  );
}

// ── Digital Systems & Integrations (bespoke page) ─────────────────────────

const systemsWhoFor = [
  {
    icon: Table2,
    title: "Businesses outgrowing spreadsheets and manual updates",
    body: "When tracking things by hand starts causing errors, delays, or double work.",
  },
  {
    icon: Workflow,
    title: "Teams with tools that don't talk to each other",
    body: "Forms, data, notifications, and accounts that should be working together.",
  },
  {
    icon: Boxes,
    title: "Owners who want practical systems, not complexity",
    body: "The smallest setup that actually removes the busywork — nothing more.",
  },
] as const;

const systemsIncludes = [
  {
    icon: LayoutDashboard,
    title: "Internal dashboards & admin tools",
    body: "Simple views for tracking the records, numbers, and status a business actually uses.",
  },
  {
    icon: Database,
    title: "Forms & databases",
    body: "Capture information cleanly and route it to the right place automatically.",
  },
  {
    icon: Share2,
    title: "APIs & integrations",
    body: "Connect tools, accounts, payments, booking, or notifications so data flows between them.",
  },
  {
    icon: Zap,
    title: "Workflow automation",
    body: "Replace repetitive manual steps with reliable, hands-off processes.",
  },
] as const;

const systemsProcess = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Map the workflow",
    body: "We trace how information moves today and find where it gets stuck or repeated.",
  },
  {
    icon: Blocks,
    step: "02",
    title: "Build & connect",
    body: "We build the dashboard, forms, or integrations and wire your existing tools together.",
  },
  {
    icon: RefreshCw,
    step: "03",
    title: "Automate & maintain",
    body: "Repetitive steps run on their own, with monitoring so the system stays reliable.",
  },
] as const;

const systemsFaqs = [
  {
    question: "Can you connect the tools I already use?",
    answer:
      "Usually, yes. If a tool offers an API or export — think Stripe, Airtable, Google Sheets, Slack, or a CRM — it can typically be connected. The first step is mapping what you use and where information gets stuck.",
  },
  {
    question: "Do I need a full system, or just one integration?",
    answer:
      "Often just one. Many businesses get the most value from a single dashboard or one reliable connection. We start with the piece that removes the most manual work, then grow only if it earns its place.",
  },
  {
    question: "What parts of my process can be automated?",
    answer:
      "Anything repetitive and rule-based: routing form submissions, sending notifications, syncing records between tools, generating simple reports, or updating a status. If you do it the same way every time, it is a candidate.",
  },
  {
    question: "Will this work with my existing website?",
    answer:
      "In most cases, yes. Systems and integrations can sit alongside your current site or connect directly to it. We review how it is built and what access is available before recommending an approach.",
  },
] as const;

const systemsProjectSlugs = ["internal-automation-tool", "centi"] as const;

const systemsNav = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Records", icon: Database, active: false },
  { label: "Automations", icon: Zap, active: false },
  { label: "Settings", icon: Settings2, active: false },
] as const;

const systemsMetrics = [
  { label: "Records", value: "1,248" },
  { label: "Synced", value: "98%" },
  { label: "Uptime", value: "99.9%" },
] as const;

const systemsRecords = [
  { name: "New inquiry", source: "Website form", tone: "active" },
  { name: "Invoice #1042", source: "Stripe", tone: "synced" },
  { name: "Client onboarding", source: "Airtable", tone: "pending" },
  { name: "Support ticket", source: "Email", tone: "active" },
] as const;

const systemsRunSteps = [
  { label: "Form submitted", done: true },
  { label: "Data validated", done: true },
  { label: "Team notified", done: true },
  { label: "Synced to CRM", done: false },
] as const;

function SystemsServicePage({ service }: { service: ServiceArea }) {
  const projects = systemsProjectSlugs
    .map((projectSlug) => getCaseStudy(projectSlug))
    .filter((project): project is CaseStudy => Boolean(project));

  return (
    <SiteLayout>
      <ServiceViewed name={service.title} slug={service.slug} />
      <ServiceSchema service={service} />
      <section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={webDesignContainer}>
          <SystemsHero />
          <SystemsWhoFor />
          <SystemsIncludes />
          <SystemsProcess />
          <SystemsPrinciple />
          <SystemsWork projects={projects} />
          <SystemsFaq />
          <SystemsBottomCta />
        </div>
      </section>
    </SiteLayout>
  );
}

function SystemsHero() {
  return (
    <div className="grid items-center gap-10 border-b border-line pb-11 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14 lg:pb-14">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
          Systems
        </p>
        <h1 className={serviceHeroTitleClassName}>
          Digital Systems
          <br />
          &amp; Integrations
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-ink/78 sm:text-[1.05rem]">
          Digital systems and integrations connect the forms, data, tools, and
          notifications your business already uses — so information moves
          automatically instead of by hand.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ProjectInquiryTrigger
            source="systems_service_hero"
            className="rounded-md px-5"
          >
            Start a project
            <ArrowRight className="h-4 w-4" />
          </ProjectInquiryTrigger>
          <a
            href="#example-system"
            className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-semibold text-forest underline decoration-forest/35 underline-offset-4 transition-colors hover:decoration-forest"
          >
            See an example system
          </a>
        </div>
      </div>

      <SystemsConsole />
    </div>
  );
}

/** Dark "internal system" mockup — the hero centerpiece. */
function SystemsConsole() {
  return (
    <div
      id="example-system"
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-[#141a16] shadow-[0_34px_66px_-30px_rgba(6,10,7,0.9)]"
    >
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
        <span className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </span>
        <span className="mx-auto font-sans text-[0.66rem] font-medium text-ivory/45">
          operations.ckworks
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-forest/40 bg-forest/15 px-2 py-0.5 text-[0.58rem] font-semibold text-[#9BD3AC]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7FBE90]" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)]">
        <aside className="border-r border-white/8 p-3">
          <div className="flex items-center gap-1.5 px-1.5 pb-3">
            <Workflow className="h-4 w-4 text-[#9BD3AC]" strokeWidth={1.8} />
            <span className="font-serif text-[0.82rem] font-medium text-ivory">
              CK Ops
            </span>
          </div>
          <nav className="space-y-0.5">
            {systemsNav.map(({ label, icon: Icon, active }) => (
              <span
                key={label}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[0.66rem] font-medium ${
                  active
                    ? "bg-forest/25 text-ivory"
                    : "text-ivory/55"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.7} />
                <span className="truncate">{label}</span>
              </span>
            ))}
          </nav>
        </aside>

        <div className="min-w-0 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-sans text-[0.82rem] font-semibold text-ivory">
              Operations
            </p>
            <span className="inline-flex items-center gap-1 rounded-md bg-white/8 px-2 py-1 text-[0.6rem] font-semibold text-ivory/70">
              <Plus className="h-3 w-3" strokeWidth={2.2} />
              New
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {systemsMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-2"
              >
                <p className="text-[0.55rem] font-medium uppercase tracking-[0.08em] text-ivory/40">
                  {metric.label}
                </p>
                <p className="mt-1 font-sans text-[0.92rem] font-semibold leading-none text-ivory">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 overflow-hidden rounded-lg border border-white/8">
            <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] gap-2 border-b border-white/8 bg-white/[0.03] px-3 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-ivory/40">
              <span>Record</span>
              <span>Source</span>
              <span className="text-right">Status</span>
            </div>
            {systemsRecords.map((record) => (
              <div
                key={record.name}
                className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_auto] items-center gap-2 border-b border-white/5 px-3 py-2 last:border-b-0"
              >
                <span className="truncate text-[0.68rem] font-medium text-ivory/90">
                  {record.name}
                </span>
                <span className="truncate text-[0.62rem] text-ivory/50">
                  {record.source}
                </span>
                <SystemsStatusPill tone={record.tone} />
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.08em] text-ivory/40">
              Automation run
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {systemsRunSteps.map((runStep, index) => (
                <span key={runStep.label} className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    {runStep.done ? (
                      <CircleCheck
                        className="h-3.5 w-3.5 fill-[#2F5B3F] text-ivory"
                        strokeWidth={2.2}
                      />
                    ) : (
                      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-dashed border-ivory/40">
                        <span className="h-1 w-1 rounded-full bg-ivory/40" />
                      </span>
                    )}
                    <span
                      className={`text-[0.6rem] font-medium ${
                        runStep.done ? "text-ivory/80" : "text-ivory/45"
                      }`}
                    >
                      {runStep.label}
                    </span>
                  </span>
                  {index < systemsRunSteps.length - 1 && (
                    <ArrowRight
                      className="h-3 w-3 text-ivory/25"
                      strokeWidth={2}
                      aria-hidden
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemsStatusPill({ tone }: { tone: "active" | "synced" | "pending" }) {
  const styles = {
    active: "bg-[#2F5B3F]/30 text-[#9BD3AC]",
    synced: "bg-[#2F5B3F]/30 text-[#9BD3AC]",
    pending: "bg-[#8a6d1f]/25 text-[#E4C56A]",
  } as const;
  const label = tone === "pending" ? "Pending" : tone === "synced" ? "Synced" : "Active";

  return (
    <span
      className={`justify-self-end rounded-full px-2 py-0.5 text-[0.55rem] font-semibold ${styles[tone]}`}
    >
      {label}
    </span>
  );
}

function SystemsWhoFor() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <div className="max-w-xl">
        <p className={serviceSectionLabelClassName}>Who it is for</p>
        <h2 className={serviceSectionTitleClassName}>
          When the moving parts stop keeping up.
        </h2>
      </div>

      <div className="mt-9 grid gap-6 lg:grid-cols-3 lg:gap-5">
        {systemsWhoFor.map(({ icon: Icon, title, body }) => (
          <article
            key={title}
            className="rounded-2xl border border-line bg-card p-6 shadow-soft"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-soft text-forest">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h3 className="mt-4 font-serif text-lg font-medium leading-snug text-ink">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SystemsIncludes() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <div className="max-w-sm">
          <p className={serviceSectionLabelClassName}>
            What this service covers
          </p>
          <h2 className={serviceSectionTitleClassName}>
            Built around how you actually work.
          </h2>
          <p className={serviceSectionBodyClassName}>
            From a single admin view to fully connected tools, each piece is
            built only where it removes real work.
          </p>
        </div>

        <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
          {systemsIncludes.map(({ icon: Icon, title, body }) => (
            <article key={title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-sand text-forest">
                <Icon className="h-5 w-5" strokeWidth={1.55} />
              </span>
              <div>
                <h3 className="text-[0.95rem] font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemsProcess() {
  return (
    <section className="py-12 lg:py-14">
      <div className="rounded-[1.5rem] border border-line bg-[linear-gradient(140deg,rgba(221,232,216,0.5),rgba(255,253,248,0.92)_48%,rgba(221,232,216,0.32))] px-5 py-9 shadow-[0_18px_40px_-32px_rgba(31,36,32,0.4)] sm:px-9 sm:py-11 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className={serviceCenterLabelClassName}>
            How a system comes together
          </p>
          <h2 className={serviceCenterTitleClassName}>
            From tangled steps to something that runs itself.
          </h2>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start md:gap-4">
          {systemsProcess.map(({ icon: Icon, step, title, body }, index) => (
            <div key={title} className="contents">
              <article className="mx-auto max-w-xs text-center">
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-line bg-card text-forest shadow-soft">
                  <Icon className="h-7 w-7" strokeWidth={1.35} />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-forest text-[0.62rem] font-semibold text-ivory shadow-soft">
                    {step}
                  </span>
                </span>
                <h3 className="mt-5 text-[1.05rem] font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-muted">{body}</p>
              </article>
              {index < systemsProcess.length - 1 && (
                <div className="hidden items-center justify-center pt-6 text-forest/45 md:flex">
                  <ArrowRight className="h-5 w-5" strokeWidth={1.6} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemsPrinciple() {
  return (
    <section className="pb-12 lg:pb-14">
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-sand px-6 py-7 sm:flex-row sm:items-center sm:gap-7 sm:px-8 lg:px-10">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line bg-card text-forest shadow-soft">
          <Sprout className="h-7 w-7" strokeWidth={1.4} />
        </span>
        <div>
          <h2 className="font-serif text-[1.7rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[2rem]">
            Systems should remove work, not add it.
          </h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-7 text-muted sm:text-[0.95rem]">
            The best system is often the smallest one — a single clean
            dashboard, one reliable integration, or one workflow that quietly
            runs itself. We build only what earns its place.
          </p>
        </div>
      </div>
    </section>
  );
}

function SystemsWork({ projects }: { projects: CaseStudy[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="border-t border-line py-12 lg:py-14">
      <h2 className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
        Relevant work
      </h2>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 sm:gap-6">
        {projects.map((project) => (
          <AnalyticsWorkCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function SystemsFaq() {
  return (
    <section className="border-t border-line py-12 lg:py-14">
      <h2 className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
        Common questions
      </h2>
      <div className="mt-6 space-y-3">
        {systemsFaqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-line bg-card px-5 shadow-soft"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="pr-2 text-[0.95rem] font-medium leading-snug text-ink">
                {faq.question}
              </span>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-ink/60 transition-transform duration-200 group-open:rotate-180"
                strokeWidth={1.8}
              />
            </summary>
            <p className="max-w-3xl pb-5 pr-8 text-sm leading-7 text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function SystemsBottomCta() {
  return (
    <div className="rounded-2xl border border-line bg-sand px-6 py-8 shadow-soft sm:px-8 sm:py-9 lg:px-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <h2 className="font-serif text-[1.85rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[2.15rem]">
            Have a workflow that should run itself?
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
            Tell me where the manual work is, and I&apos;ll help you find the
            simplest system that removes it.
          </p>
        </div>
        <ProjectInquiryTrigger
          source="systems_service_bottom_cta"
          className="shrink-0 rounded-md px-6"
        >
          Start a project
          <ArrowRight className="h-4 w-4" />
        </ProjectInquiryTrigger>
      </div>
    </div>
  );
}

// ── Ongoing Support (bespoke page) ────────────────────────────────────────

const supportUpdates = [
  { label: "Updated team page content", date: "May 3" },
  { label: "Fixed mobile spacing issue", date: "May 2" },
  { label: "Improved Core Web Vitals", date: "Apr 30" },
] as const;

const supportKeepWorking = [
  { icon: CircleCheck, title: "Stay current" },
  { icon: Wrench, title: "Fix problems early" },
  { icon: LineChart, title: "Improve when it matters" },
] as const;

const supportIncludes = [
  {
    title: "Website care",
    body: "Routine updates, technical checks, dependency maintenance, and general cleanup.",
  },
  {
    title: "Fixes and troubleshooting",
    body: "Broken layouts, mobile issues, forms, errors, and unexpected behavior.",
  },
  {
    title: "Content and small improvements",
    body: "New pages, updated information, project additions, and practical interface changes.",
  },
  {
    title: "Performance and measurement checks",
    body: "Occasional reviews of speed, analytics, search visibility, and important customer paths.",
  },
] as const;

const supportRequests = [
  { icon: Pencil, label: "Update a service or team page" },
  { icon: Smartphone, label: "Fix a mobile layout issue" },
  { icon: ClipboardList, label: "Add a new form field or notification" },
  { icon: ImageIcon, label: "Publish a project or announcement" },
  { icon: LineChart, label: "Investigate a tracking problem" },
  { icon: Gauge, label: "Improve a slow or confusing section" },
] as const;

const supportProcess = [
  {
    step: "1",
    title: "Share the issue",
    body: "Send a quick message with what you're seeing or need.",
  },
  {
    step: "2",
    title: "Review and prioritize",
    body: "I review the request, confirm the scope, and outline next steps.",
  },
  {
    step: "3",
    title: "Complete and confirm",
    body: "The work is completed and you receive a summary of what changed.",
  },
] as const;

const supportFaqs = [
  {
    question: "Do you support websites or systems you did not build?",
    answer:
      "Often, yes. It depends on how the site or system is built and what access is available. The first step is a quick review to see what shape it is in and whether ongoing support makes sense, or a bit of cleanup comes first.",
  },
  {
    question: "Can support include new pages or features?",
    answer:
      "Yes. Small additions — a new page, a form field, a section — fit naturally into support. Larger feature work is scoped as its own focused piece so it stays clear and predictable.",
  },
  {
    question: "Is support monthly or request-based?",
    answer:
      "Either. Some businesses prefer a steady monthly arrangement for regular attention; others just reach out when something comes up. We pick whatever matches how often the site actually needs changes.",
  },
  {
    question: "How quickly are support requests handled?",
    answer:
      "It depends on the request and how urgent it is. Small fixes are usually quick; anything larger gets a clear timeline up front. Routine requests typically turn around within a couple of days.",
  },
  {
    question: "What access will CK Works need?",
    answer:
      "Only what the work requires: usually hosting or the code repository, the CMS or admin, and any relevant analytics or domain settings. Access is kept minimal and documented.",
  },
] as const;

function OngoingSupportServicePage({ service }: { service: ServiceArea }) {
  return (
    <SiteLayout>
      <ServiceViewed name={service.title} slug={service.slug} />
      <ServiceSchema service={service} />
      <section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={webDesignContainer}>
          <SupportHero />
          <SupportKeepWorking />
          <SupportIncludes />
          <SupportRequests />
          <SupportPrinciple />
          <SupportProcess />
          <SupportFaq />
          <SupportRebuildNote />
          <SupportBottomCta />
        </div>
      </section>
    </SiteLayout>
  );
}

function SupportHero() {
  return (
    <div className="border-b border-line pb-11 lg:pb-14">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs font-medium text-muted"
      >
        <Link href="/" className="transition-colors hover:text-ink">
          Home
        </Link>
        <span className="text-line" aria-hidden>
          /
        </span>
        <Link href="/services" className="transition-colors hover:text-ink">
          Services
        </Link>
        <span className="text-line" aria-hidden>
          /
        </span>
        <span className="text-ink/80">Ongoing Support</span>
      </nav>

      <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-14">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
            Care
          </p>
          <h1 className={serviceHeroTitleClassName}>
            Ongoing Support
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-ink/78 sm:text-[1.05rem]">
            Updates, fixes, technical cleanup, and continued improvements that
            keep your website or system useful after launch.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ProjectInquiryTrigger
              source="support_service_hero"
              className="rounded-md px-5"
            >
              Request support
              <ArrowRight className="h-4 w-4" />
            </ProjectInquiryTrigger>
            <a
              href="#support-includes"
              className="group inline-flex items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-semibold text-forest transition-colors hover:text-ink"
            >
              See what support can include
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <SupportConsole />
      </div>
    </div>
  );
}

/** "Example support view" status card — the hero centerpiece. */
function SupportConsole() {
  return (
    <div
      id="example-support"
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-card shadow-[0_26px_54px_-34px_rgba(31,36,32,0.5)]"
    >
      <div className="border-b border-line px-5 py-3.5">
        <p className="font-sans text-sm font-semibold text-ink">
          Example support view
        </p>
      </div>

      <div className="grid sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="divide-y divide-line border-b border-line sm:border-b-0 sm:border-r">
          <div className="px-5 py-4">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted">
              Site health
            </p>
            <div className="mt-2.5 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-ivory">
                <Check className="h-4 w-4" strokeWidth={2.6} />
              </span>
              <div>
                <p className="text-[0.95rem] font-semibold text-ink">Healthy</p>
                <p className="text-[0.68rem] text-muted">
                  All systems running normally.
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 py-4">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted">
              Recent updates
            </p>
            <ul className="mt-2.5 space-y-2.5">
              {supportUpdates.map((update) => (
                <li key={update.label} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-forest-soft text-forest">
                    <Check className="h-3 w-3" strokeWidth={2.8} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[0.72rem] font-medium text-ink/85">
                    {update.label}
                  </span>
                  <span className="shrink-0 text-[0.64rem] text-muted">
                    {update.date}
                  </span>
                </li>
              ))}
            </ul>
            <a
              href="#support-process"
              className="mt-3.5 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-forest"
            >
              View all activity
              <ArrowRight className="h-3 w-3" strokeWidth={2} />
            </a>
          </div>
        </div>

        <div className="divide-y divide-line">
          <div className="px-5 py-4">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted">
              Last check
            </p>
            <p className="mt-2 text-[0.95rem] font-semibold text-ink">
              May 3, 2025
            </p>
            <p className="text-[0.68rem] text-muted">10:24 AM</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted">
              Uptime
            </p>
            <p className="mt-2 font-sans text-[1.5rem] font-semibold leading-none text-forest">
              99.9%
            </p>
            <p className="mt-1 text-[0.68rem] text-muted">Last 30 days</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-muted">
              Response time
            </p>
            <p className="mt-2 font-sans text-[1.5rem] font-semibold leading-none text-forest">
              &lt; 2h
            </p>
            <p className="mt-1 text-[0.68rem] text-muted">Typical</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportKeepWorking() {
  return (
    <section className="py-12 lg:py-14">
      <div className="grid gap-8 rounded-2xl border border-line bg-sand px-6 py-9 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:px-10">
        <div className="max-w-md">
          <h2 className="font-serif text-[1.9rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
            Keep what you built working well.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-[0.95rem]">
            Support is useful when the site needs to stay current, small issues
            need attention, or improvements make more sense over time than
            through another full rebuild.
          </p>
        </div>
        <div className="grid grid-cols-3">
          {supportKeepWorking.map(({ icon: Icon, title }, index) => (
            <article
              key={title}
              className={`px-2 text-center sm:px-4 ${
                index > 0 ? "border-l border-line/80" : ""
              }`}
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-line bg-card text-forest">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <p className="mt-3 text-sm font-semibold leading-snug text-ink">
                {title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportIncludes() {
  return (
    <section
      id="support-includes"
      className="scroll-mt-24 border-b border-line py-12 lg:py-14"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
        <div className="max-w-sm">
          <p className={serviceSectionLabelClassName}>
            What support can include
          </p>
          <h2 className={serviceSectionTitleClassName}>
            Practical support for the things that keep your site or system
            running smoothly.
          </h2>
        </div>
        <div className="border-t border-line">
          {supportIncludes.map(({ title, body }, index) => (
            <article
              key={title}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-5 gap-y-1.5 border-b border-line py-5 sm:grid-cols-[auto_minmax(0,13rem)_minmax(0,1fr)] sm:gap-x-8"
            >
              <span
                className="font-source-serif-display text-[1.35rem] font-semibold leading-none tabular-nums text-forest/70"
                style={{ fontVariationSettings: '"opsz" 20' }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[1.02rem] font-semibold leading-snug text-ink">
                {title}
              </h3>
              <p className="col-start-2 text-sm leading-6 text-muted sm:col-start-3 sm:pt-0.5">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportRequests() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
        Examples of common requests
      </p>
      <div className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
        {supportRequests.map(({ icon: Icon, label }, index) => (
          <article
            key={label}
            className={`px-4 text-center lg:px-5 ${
              index > 0 ? "lg:border-l lg:border-line" : ""
            }`}
          >
            <span className="mx-auto flex h-8 items-center justify-center text-forest">
              <Icon className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <p className="mx-auto mt-3 max-w-[9rem] text-xs font-medium leading-5 text-ink/80">
              {label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SupportPrinciple() {
  return (
    <section className="py-12 lg:py-14">
      <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-line bg-sand px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 lg:px-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-card text-forest shadow-soft">
            <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <div>
            <h2 className="font-serif text-[1.7rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[2rem]">
              Support should remove uncertainty.
            </h2>
            <p className="mt-2.5 max-w-xl text-sm leading-7 text-muted sm:text-[0.95rem]">
              The goal is not to create unnecessary monthly work. Support can be
              scoped around a specific need or organized into ongoing care when
              regular attention would genuinely help.
            </p>
          </div>
        </div>
        <SupportPrincipleArt className="hidden justify-self-end lg:block" />
      </div>
    </section>
  );
}

function SupportPrincipleArt({ className = "" }: { className?: string }) {
  const stroke = "#2F5B3F";
  return (
    <svg
      viewBox="0 0 300 170"
      className={`h-auto w-full max-w-[21rem] ${className}`}
      fill="none"
      aria-hidden
    >
      {/* browser window */}
      <rect
        x="20"
        y="28"
        width="184"
        height="116"
        rx="12"
        stroke={stroke}
        strokeOpacity="0.28"
        strokeWidth="2"
      />
      <line
        x1="20"
        y1="52"
        x2="204"
        y2="52"
        stroke={stroke}
        strokeOpacity="0.2"
        strokeWidth="1.5"
      />
      {[34, 43, 52].map((cx) => (
        <circle key={cx} cx={cx} cy="40" r="2.4" fill={stroke} fillOpacity="0.28" />
      ))}
      {[
        { y: 72, x2: 118, o: 0.22 },
        { y: 88, x2: 168, o: 0.14 },
        { y: 104, x2: 150, o: 0.14 },
        { y: 120, x2: 104, o: 0.14 },
      ].map((bar) => (
        <line
          key={bar.y}
          x1="38"
          y1={bar.y}
          x2={bar.x2}
          y2={bar.y}
          stroke={stroke}
          strokeOpacity={bar.o}
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      {/* check badge */}
      <circle cx="196" cy="122" r="16" fill={stroke} />
      <path
        d="M188 122 l6 6 l10 -11"
        stroke="#FAF7F0"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* plant */}
      <path
        d="M256 144 v-26"
        stroke={stroke}
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M256 122 c-12 -1 -19 -10 -18 -22 c12 -1 20 9 18 22 Z"
        stroke={stroke}
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M256 126 c12 -1 19 -10 18 -22 c-12 -1 -20 9 -18 22 Z"
        stroke={stroke}
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M244 144 h24 l-3 16 h-18 Z"
        stroke={stroke}
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SupportProcess() {
  return (
    <section
      id="support-process"
      className="scroll-mt-24 border-b border-line py-12 lg:py-14"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
        How requests are handled
      </p>
      <div className="mt-9 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start md:gap-5">
        {supportProcess.map(({ step, title, body }, index) => (
          <div key={title} className="contents">
            <article className="flex gap-4">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-card font-source-serif-display text-[0.95rem] font-semibold tabular-nums text-forest shadow-soft"
                style={{ fontVariationSettings: '"opsz" 16' }}
              >
                {step}
              </span>
              <div>
                <h3 className="text-[1rem] font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{body}</p>
              </div>
            </article>
            {index < supportProcess.length - 1 && (
              <div className="hidden items-center justify-center pt-3 text-muted/55 md:flex">
                <ArrowRight className="h-5 w-5" strokeWidth={1.6} />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mx-auto mt-9 max-w-2xl text-center text-sm leading-6 text-muted">
        You receive a clear understanding of what is being changed, what it will
        require, and what happens next.
      </p>
    </section>
  );
}

function SupportFaq() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <div className="grid gap-7 lg:grid-cols-[minmax(12rem,0.4fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
            Common questions
          </p>
          <h2 className="mt-4 font-serif text-[2rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
            A few useful questions.
          </h2>
        </div>
        <div className="border-t border-line">
          {supportFaqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="pr-2 text-[0.95rem] font-medium leading-snug text-ink">
                  {faq.question}
                </span>
                <Plus
                  className="h-5 w-5 shrink-0 text-ink/55 transition-transform duration-200 group-open:rotate-45"
                  strokeWidth={1.7}
                />
              </summary>
              <p className="max-w-2xl pb-5 pr-8 text-sm leading-7 text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SupportRebuildNote() {
  return (
    <section className="border-b border-line py-8 text-center">
      <p className="text-sm text-muted">
        Planning a larger rebuild instead?{" "}
        <Link
          href="/services/web-design-development"
          className="group inline-flex items-center gap-1.5 font-semibold text-forest transition-colors hover:text-ink"
        >
          View Web Design &amp; Development
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </p>
    </section>
  );
}

function SupportBottomCta() {
  return (
    <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-line bg-sand px-6 py-7 shadow-soft sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10">
      <div className="flex items-start gap-5 sm:items-center">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-card text-forest shadow-soft">
          <Headphones className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <div>
          <h2 className="font-serif text-[1.7rem] font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[2rem]">
            Need help keeping something current?
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Share the website, system, or issue you&apos;re working with, and
            I&apos;ll help determine the most practical next step.
          </p>
        </div>
      </div>
      <ProjectInquiryTrigger
        source="support_service_bottom_cta"
        className="shrink-0 rounded-md px-6"
      >
        Request support
        <ArrowRight className="h-4 w-4" />
      </ProjectInquiryTrigger>
    </div>
  );
}
