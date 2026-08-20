import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  CreditCard,
  FileText,
  Hammer,
  Home,
  Link as LinkIcon,
  Mail,
  Search,
  ShieldCheck,
  Sparkle,
  UserRound,
  Waypoints,
} from "lucide-react";
import SiteLayout from "@/components/layout/SiteLayout";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import Reveal from "@/components/ui/Reveal";
import { createPageMetadata, absoluteUrl } from "@/lib/seo";
import { serviceAreas, type ServiceArea, type ServiceSlug } from "@/lib/services";

export const metadata: Metadata = createPageMetadata({
  title: "Web Design & Digital System Services",
  description:
    "Websites, search visibility, analytics, digital systems, integrations, and ongoing support for businesses that need a clearer digital foundation.",
  path: "/services",
});

type ServiceCardConfig = {
  slug: ServiceSlug;
  number: string;
  className?: string;
  visual: "website" | "search" | "analytics" | "systems" | "support";
  description: string;
};

const servicesPageContainer =
  "mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-7 2xl:px-8";

const serviceCards: ServiceCardConfig[] = [
  {
    slug: "web-design-development",
    number: "01",
    visual: "website",
    description:
      "Clean, responsive websites designed around what your customers need to understand and do.",
  },
  {
    slug: "search-ai-visibility",
    number: "02",
    visual: "search",
    description:
      "CK Works helps your business show up more clearly in search results and AI-driven discovery.",
  },
  {
    slug: "analytics-lead-tracking",
    number: "03",
    visual: "analytics",
    description:
      "Understand what's working and track inquiries, calls, and conversions that drive growth.",
  },
  {
    slug: "digital-systems-integrations",
    number: "04",
    visual: "systems",
    description:
      "Connect forms, CRM, email, payments, and workflows so your tools work together cleanly.",
  },
  {
    slug: "ongoing-support",
    number: "05",
    visual: "support",
    className: "lg:col-span-2",
    description:
      "I handle updates, maintenance, fixes, and improvements so your site and systems stay secure, fast, and effective after launch.",
  },
];

function getService(slug: ServiceSlug): ServiceArea {
  const service = serviceAreas.find((item) => item.slug === slug);
  if (!service) {
    throw new Error(`Missing service area for ${slug}`);
  }
  return service;
}

export default function ServicesPage() {
  return (
    <SiteLayout>
      <SchemaMarkup
        id="services-schema"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "CK Works Services",
          url: absoluteUrl("/services"),
          hasPart: serviceAreas.map((service) => ({
            "@type": "Service",
            name: service.title,
            url: absoluteUrl(service.href),
            description: service.description,
          })),
        }}
      />

      <section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={servicesPageContainer}>
          <Reveal className="max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest/85">
              Services
            </p>
            <h1 className="mt-4 max-w-5xl font-serif text-[2.15rem] font-medium leading-[1.12] text-ink sm:text-4xl lg:text-[2.75rem]">
              Websites, visibility, and systems built around how your business
              actually works.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-ink/78 sm:text-lg">
              CK Works helps businesses get found, look professional, and run
              more smoothly through clearer websites, search visibility,
              analytics, smart systems, and ongoing support.
            </p>
            <a
              href="#services-list"
              className="group mt-6 inline-flex items-center gap-2 border-b border-forest pb-1 text-sm font-semibold text-ink transition-colors hover:text-forest"
            >
              How I can help
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </Reveal>

          <div
            id="services-list"
            className="mt-8 grid scroll-mt-28 gap-4 lg:grid-cols-2 lg:gap-5 xl:gap-6"
          >
            {serviceCards.map((card, index) => (
              <Reveal
                key={card.slug}
                delay={index * 90}
                className={`min-w-0 ${card.className ?? ""}`}
              >
                <ServiceOverviewCard
                  card={card}
                  service={getService(card.slug)}
                />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-5 flex flex-col gap-6 rounded-xl border border-line bg-card px-6 py-7 shadow-soft sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-xl">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Not sure which service fits?
              </p>
              <h2 className="mt-3 font-serif text-[1.85rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.15rem]">
                Tell me what you&apos;re working on.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
                Share a little about your business, what you&apos;re working
                with now, and what you&apos;d like to improve.
              </p>
            </div>

            <div className="flex w-fit shrink-0 flex-col items-stretch gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
              >
                Start a project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/process"
                className="group inline-flex items-center justify-center gap-1.5 border-b border-forest pb-1.5 text-sm font-semibold text-forest transition-colors hover:text-ink"
              >
                See how the process works
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function ServiceOverviewCard({
  card,
  service,
}: {
  card: ServiceCardConfig;
  service: ServiceArea;
}) {
  const isSupport = card.visual === "support";

  if (isSupport) {
    return (
      <article className="group/card grid h-full min-h-[18rem] overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-lift md:grid-cols-[minmax(18rem,0.86fr)_minmax(0,2.44fr)]">
        <div className="relative flex min-w-0 flex-col border-b border-line px-6 py-7 sm:px-8 sm:py-8 md:border-b-0">
          <span
            className="pointer-events-none absolute inset-y-8 right-0 hidden w-px bg-line md:block"
            aria-hidden
          />
          <span className="font-serif text-2xl font-medium leading-none tracking-[-0.02em] text-[#A8713B]">
            {card.number}
          </span>
          <h2 className="mt-6 max-w-[21rem] font-serif text-[2.25rem] font-medium leading-[1.02] tracking-[-0.02em] text-ink sm:text-[2.55rem]">
            {service.title}
          </h2>
          <p className="mt-6 max-w-[26rem] text-base leading-8 text-ink/78 md:text-[0.95rem] md:leading-7">
            {card.description}
          </p>
          <Link
            href={service.href}
            className="group/link mt-9 inline-flex w-fit items-center gap-2 border-b border-[#A8713B] pb-0.5 text-base font-semibold text-forest transition-colors hover:text-ink md:mt-auto"
          >
            View service
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>

        {/* Support gets its own full-bleed layout, so it needs the same
            labelling the shared card path applies to the other four. */}
        <div className="flex min-w-0 flex-col justify-center" data-nosnippet>
          <SupportVisual />
          <p className="px-5 pb-5 pt-3 text-center text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Illustrative website concept
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group/card grid h-full min-h-[19.25rem] overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-lift md:grid-cols-[minmax(13.25rem,0.58fr)_minmax(0,0.98fr)] xl:grid-cols-[minmax(14.25rem,0.56fr)_minmax(0,1.05fr)]">
      <div className="flex min-w-0 flex-col px-5 py-5 sm:p-6 md:pr-3">
        <span className="font-serif text-2xl font-medium leading-none tracking-[-0.02em] text-[#A8713B]">
          {card.number}
        </span>
        <h2 className="mt-3 max-w-[17rem] font-serif text-[1.75rem] font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-[1.95rem]">
          {service.title}
        </h2>
        <p className="mt-3 max-w-[16rem] text-sm leading-7 text-ink/78">
          {card.description}
        </p>
        <Link
          href={service.href}
          className="group/link mt-6 inline-flex w-fit items-center gap-2 border-b border-[#A8713B] pb-0.5 text-sm font-semibold text-ink transition-colors hover:text-forest md:mt-auto"
        >
          View service
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>

      {/* Every card visual is a fictional Riverstone Builders mock-up — a site,
          a search result with an AI Overview, and invented traffic figures.
          Labelling and `data-nosnippet` sit here so all five are covered at
          once rather than per-visual. */}
      <div
        className="flex min-h-[16rem] min-w-0 flex-col items-center justify-center px-5 pb-5 pt-1 sm:px-6 sm:pb-6 md:px-4 md:py-5 lg:px-5"
        data-nosnippet
      >
        <div className="flex w-full max-w-[96%] origin-center scale-[0.925] items-center justify-center transform-gpu transition-transform duration-300 ease-out group-hover/card:scale-[0.95]">
          <ServiceVisual kind={card.visual} />
        </div>
        <p className="mt-2 text-center text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted">
          {card.visual === "search"
            ? "Illustrative search example"
            : card.visual === "analytics"
              ? "Illustrative reporting example"
              : card.visual === "systems"
                ? "Illustrative workflow example"
                : "Illustrative website concept"}
        </p>
      </div>
    </article>
  );
}

function ServiceVisual({ kind }: { kind: ServiceCardConfig["visual"] }) {
  if (kind === "website") return <WebsiteVisual />;
  if (kind === "search") return <SearchVisual />;
  if (kind === "analytics") return <AnalyticsVisual />;
  if (kind === "systems") return <SystemsVisual />;
  return <SupportVisual />;
}

function BrowserShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-line bg-ivory/70 shadow-[0_18px_35px_-24px_rgba(31,36,32,0.45)]">
      <div className="flex h-8 items-center gap-1.5 border-b border-line px-4">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C87264]" />
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D8A847]" />
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#5F9C69]" />
        <span className="ml-3 flex h-4 w-[70%] items-center justify-center rounded-full border border-line/70 bg-card/70 px-3 text-center text-[7px] font-medium tracking-[0.04em] text-muted">
          riverstonebuilders.com
        </span>
      </div>
      {children}
    </div>
  );
}

function WebsiteVisual() {
  const builderServices = [
    { label: "Custom Homes", icon: Home },
    { label: "Renovations", icon: Hammer },
    { label: "Project Management", icon: ClipboardCheck },
  ] as const;

  return (
    <BrowserShell>
      <div className="grid min-h-[14.5rem] grid-rows-[auto_1fr_auto] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div>
            <p className="font-sans text-[9px] font-bold uppercase leading-tight tracking-[0.16em] text-ink">
              Riverstone
              <br />
              Builders
            </p>
          </div>
          <div className="flex gap-3 text-[7px] font-semibold uppercase tracking-[0.08em] text-ink/70">
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="grid grid-cols-[minmax(11.15rem,0.94fr)_minmax(9.45rem,0.9fr)] gap-3">
          <div className="min-w-0 px-4 py-3 pr-0">
            <p className="font-sans text-[1.16rem] font-medium leading-[1.06] tracking-[-0.005em] text-ink">
              <span className="block whitespace-nowrap">Built with care.</span>
              <span className="block whitespace-nowrap">
                Designed to last.
              </span>
            </p>
            <p className="mt-2.5 max-w-[10.5rem] text-[9px] font-medium leading-[1.45] text-ink/78">
              Custom homes and renovations crafted around you.
            </p>
            <span className="mt-2.5 inline-flex rounded bg-ink px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-ivory">
              View our work
            </span>
          </div>
          <div className="relative my-3 mr-3 overflow-hidden rounded-md border border-line/70 bg-sand">
            <Image
              src="/images/services/png/01-demo.png"
              alt="Modern Riverstone Builders home preview"
              fill
              sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 22vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/5" />
          </div>
        </div>
        <div className="grid grid-cols-3 border-t border-line bg-card/65">
          {builderServices.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 border-r border-line px-2 py-3 text-center last:border-r-0"
            >
              <Icon className="h-4 w-4 text-forest" strokeWidth={1.55} />
              <span className="text-[8px] font-medium text-ink">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserShell>
  );
}

function SearchVisual() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-line bg-card shadow-[0_16px_32px_-28px_rgba(31,36,32,0.45)]">
      <div className="grid min-h-[14.25rem] sm:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] sm:divide-x sm:divide-line">
        <div className="min-w-0 px-3.5 py-4 sm:px-4">
          <p className="font-sans text-[1.18rem] font-medium leading-none tracking-normal">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#DB4437]">o</span>
            <span className="text-[#F4B400]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#0F9D58]">l</span>
            <span className="text-[#DB4437]">e</span>
          </p>

          <div className="mt-3.5 flex items-center gap-2 rounded-full border border-line bg-ivory px-3 py-2">
            <span className="min-w-0 flex-1 truncate font-sans text-[0.72rem] font-medium leading-none text-ink">
              custom home builder Orlando
            </span>
            <Search className="h-4 w-4 shrink-0 text-ink/70" strokeWidth={2} />
          </div>

          <div className="mt-3.5 rounded-lg border border-line bg-card px-3.5 py-3.5">
            <p className="whitespace-nowrap font-sans text-[0.92rem] font-bold leading-tight text-ink">
              Riverstone Builders
            </p>
            <p className="mt-1.5 whitespace-nowrap font-sans text-[0.6rem] font-semibold leading-tight text-forest">
              Custom Home Builder in Orlando
            </p>
            <p className="mt-1.5 font-sans text-[0.68rem] leading-[1.55] text-ink/85">
              Custom homes and renovations with a clear portfolio, services, and
              consultation path.
            </p>
            <div className="mt-3.5 space-y-2.5">
              <span className="block h-1.5 w-full rounded-full bg-line/80" />
              <span className="block h-1.5 w-3/5 rounded-full bg-line/80" />
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col border-t border-line px-3.5 py-4 sm:border-t-0 sm:px-4">
          <p className="flex items-center gap-2.5 whitespace-nowrap font-sans text-[0.9rem] font-bold leading-none text-ink">
            <Sparkle className="h-5 w-5 shrink-0 fill-forest text-forest" strokeWidth={1.2} />
            AI Overview
          </p>
          <p className="mt-5 font-sans text-[0.76rem] leading-[1.85] text-ink">
            Riverstone Builders is positioned as a local residential builder in
            Orlando, known for clear services, project proof, and direct inquiry
            options.
          </p>
          <div className="mt-auto border-t border-line pt-3">
            <div className="flex items-center gap-2.5">
              <span className="font-sans text-[0.76rem] font-semibold text-ink/82">
                Sources
              </span>
              {[0, 1, 2].map((source) => (
                <span
                  key={source}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-forest-soft text-forest"
                >
                  <LinkIcon className="h-3.5 w-3.5" strokeWidth={2.25} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const metrics = [
    { label: "Sessions", value: "8,642", lift: "18%" },
    { label: "Conversions", value: "124", lift: "21%" },
    { label: "Leads", value: "93", lift: "17%" },
    { label: "Conversion Rate", value: "1.07%", lift: "11%" },
  ] as const;

  // ~3/4 of the denser set so the curve stays active without overcrowding.
  const points = [
    [36, 82],
    [50, 70],
    [64, 58],
    [92, 78],
    [106, 90],
    [120, 84],
    [148, 48],
    [162, 56],
    [176, 68],
    [204, 66],
    [218, 80],
    [232, 92],
    [260, 70],
    [274, 54],
    [288, 60],
    [316, 78],
    [330, 64],
    [344, 52],
    [372, 38],
  ] as const;
  const polyline = points.map(([x, y]) => `${x},${y}`).join(" ");
  const xLabels = ["May 1", "May 8", "May 15", "May 22", "May 29"] as const;
  const yLabels = [
    { label: "30", y: 28 },
    { label: "20", y: 52 },
    { label: "10", y: 76 },
    { label: "0", y: 100 },
  ] as const;

  return (
    <div className="w-full rounded-xl border border-line bg-card p-3.5 shadow-[0_16px_32px_-28px_rgba(31,36,32,0.45)] sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-sans text-[0.78rem] font-semibold text-ink">
          Overview
        </p>
        <span className="inline-flex items-center gap-1 rounded-md border border-line bg-ivory px-2 py-1 font-sans text-[0.58rem] font-medium text-ink">
          May 1 - May 31
          <ChevronDown className="h-2.5 w-2.5 text-muted" strokeWidth={2} />
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="min-w-0 rounded-md border border-line bg-card px-2 py-2"
          >
            <p className="truncate font-sans text-[0.46rem] font-medium leading-tight text-muted sm:text-[0.5rem]">
              {metric.label}
            </p>
            <p className="mt-1.5 truncate font-sans text-[0.86rem] font-semibold leading-none tracking-tight text-ink sm:text-[0.95rem]">
              {metric.value}
            </p>
            <p className="mt-1.5 font-sans text-[0.46rem] font-semibold leading-none text-forest sm:text-[0.5rem]">
              + {metric.lift}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3.5 border-t border-line/80 pt-3">
        <p className="font-sans text-[0.78rem] font-semibold text-ink">
          Leads Over Time
        </p>
        <svg
          viewBox="0 0 400 132"
          className="mt-[-1rem] aspect-[400/132] w-full"
          aria-hidden
        >
          {yLabels.map(({ label, y }) => (
            <g key={label}>
              <text
                x="18"
                y={y + 3}
                textAnchor="end"
                className="fill-muted"
                style={{ fontSize: 9, fontFamily: "system-ui, sans-serif" }}
              >
                {label}
              </text>
              <line
                x1="28"
                x2="388"
                y1={y}
                y2={y}
                stroke="#E4DDD0"
                strokeWidth="1"
              />
            </g>
          ))}

          <polyline
            points={polyline}
            fill="none"
            stroke="#3B82C4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            pathLength={1}
            className="[stroke-dasharray:1] [stroke-dashoffset:0] group-hover/card:animate-[spark-draw_1.1s_ease-out_both] motion-reduce:animate-none"
          />
          {points.map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="2.4"
              fill="#3B82C4"
            />
          ))}

          {xLabels.map((label, index) => (
            <text
              key={label}
              x={36 + index * 84}
              y={122}
              textAnchor="middle"
              className="fill-muted"
              style={{ fontSize: 9, fontFamily: "system-ui, sans-serif" }}
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

/**
 * Systems flow graphic tuning knobs.
 * Story: Form -> CRM -> Email; CRM forks down to Payments + Workflow.
 */
const systemsFlowLayout = {
  stroke: "#2F5B3F",
  /** Top row solid arrows */
  topArrow: {
    shaftWidth: "0.95rem",
    headSize: 7,
    nudgeY: "0rem",
  },
  /** Tree fork under CRM */
  fan: {
    /** Distance from each side to the vertical drops (aim at bottom-card centers) */
    branchInset: "25%",
    /** Stem height before the junction dot */
    stemHeight: "1.05rem",
    /** Drop from junction to bottom cards */
    dropHeight: "1.05rem",
    lineWidth: "1.5px",
    junctionSize: "0.4rem",
  },
  /** Bottom pair sits under CRM; widen/narrow this to balance the tree */
  bottomRowWidth: "72%",
} as const;

function SystemsTopArrow() {
  const { stroke, topArrow } = systemsFlowLayout;

  return (
    <div
      className="flex items-center justify-center self-center"
      style={{ transform: `translateY(${topArrow.nudgeY})` }}
      aria-hidden
    >
      <span
        className="block h-[1.5px] rounded-full"
        style={{ width: topArrow.shaftWidth, backgroundColor: stroke }}
      />
      <span
        className="block"
        style={{
          width: 0,
          height: 0,
          marginLeft: -1,
          borderTop: `${topArrow.headSize * 0.42}px solid transparent`,
          borderBottom: `${topArrow.headSize * 0.42}px solid transparent`,
          borderLeft: `${topArrow.headSize}px solid ${stroke}`,
        }}
      />
    </div>
  );
}

function SystemsVisual() {
  const { stroke, fan, bottomRowWidth } = systemsFlowLayout;

  return (
    <div className="w-full rounded-xl bg-[#F7F3EA] px-3 py-4 sm:px-4 sm:py-5">
      {/* Form -> CRM -> Email */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1.08fr)_auto_minmax(0,1fr)] items-center gap-x-1.5 sm:gap-x-2">
        <FlowNode label="Form" Icon={FileText} />
        <SystemsTopArrow />
        <FlowNode label="CRM" Icon={UserRound} featured />
        <SystemsTopArrow />
        <FlowNode label="Email" Icon={Mail} />
      </div>

      {/* Solid tree fork from CRM into Payments / Workflow */}
      <div
        className="relative mx-auto"
        style={{ width: bottomRowWidth }}
        aria-hidden
      >
        <div
          className="relative mx-auto"
          style={{ height: `calc(${fan.stemHeight} + ${fan.dropHeight})` }}
        >
          {/* Stem */}
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 bg-forest"
            style={{
              width: fan.lineWidth,
              height: fan.stemHeight,
              backgroundColor: stroke,
            }}
          />
          {/* Junction dot */}
          <span
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              top: `calc(${fan.stemHeight} - ${fan.junctionSize} / 2)`,
              width: fan.junctionSize,
              height: fan.junctionSize,
              backgroundColor: stroke,
            }}
          />
          {/* Horizontal branch + rounded drops */}
          <span
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: fan.stemHeight,
              width: `calc(100% - 2 * ${fan.branchInset})`,
              height: fan.dropHeight,
              borderLeft: `${fan.lineWidth} solid ${stroke}`,
              borderRight: `${fan.lineWidth} solid ${stroke}`,
              borderTop: `${fan.lineWidth} solid ${stroke}`,
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <FlowNode label="Payments" Icon={CreditCard} />
          <FlowNode label="Workflow" Icon={Waypoints} />
        </div>
      </div>
    </div>
  );
}

function FlowNode({
  label,
  Icon,
  featured = false,
}: {
  label: string;
  Icon: typeof FileText;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex min-h-[5.6rem] flex-col items-center justify-center rounded-xl border bg-card px-2 py-3.5 text-center sm:min-h-[5.9rem] sm:px-3 ${
        featured
          ? "border-forest shadow-[0_10px_28px_-16px_rgba(47,91,63,0.55)]"
          : "border-line shadow-soft"
      }`}
    >
      <span
        className={`relative flex items-center justify-center ${
          featured ? "h-10 w-10" : "h-7 w-7"
        }`}
      >
        {featured && (
          <>
            <span
              className="absolute inset-0 rounded-full bg-forest-soft"
              aria-hidden
            />
            <span
              className="absolute inset-[3px] rounded-full border border-forest/35"
              aria-hidden
            />
          </>
        )}
        <Icon
          className={`relative z-10 text-forest ${
            featured ? "h-5 w-5" : "h-6 w-6"
          }`}
          strokeWidth={1.6}
        />
      </span>
      <span className="mt-2 text-center text-[0.72rem] font-semibold leading-none text-forest sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function SupportStatusCheck({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#5F9C69] text-white ${className}`}
    >
      <Check className="h-[55%] w-[55%]" strokeWidth={3.2} />
    </span>
  );
}

function SupportVisual() {
  const backupDetails = [
    ["Last backup", "Today, 2:13 AM"],
    ["Next backup", "6:00 AM"],
    ["Retention", "30 days"],
  ] as const;

  const activity = [
    ["Plugin updates completed", "May 20, 9:12 AM"],
    ["Theme updated to v2.4.1", "May 19, 4:38 PM"],
    ["Uptime check passed", "May 19, 9:01 AM"],
  ] as const;

  const chartLine =
    "12,68 28,55 44,60 60,43 76,49 92,32 108,41 124,38 140,25 156,35 172,36 188,26 204,22 222,10";
  const chartArea =
    "M12,80 L12,68 L28,55 L44,60 L60,43 L76,49 L92,32 L108,41 L124,38 L140,25 L156,35 L172,36 L188,26 L204,22 L222,10 L222,80 Z";

  return (
    <div className="grid h-full w-full md:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)_minmax(0,1.35fr)] md:items-center">
      {/* Site Health */}
      <div className="relative flex min-h-[15.75rem] flex-col px-6 py-6 sm:px-8 md:min-h-[14.5rem] md:px-7 md:py-5">
        <span
          className="pointer-events-none absolute inset-y-3 right-0 hidden w-px bg-line md:block"
          aria-hidden
        />
        <p className="font-sans text-[1rem] font-semibold text-ink">
          Site Health
        </p>
        <p className="mt-4 flex items-center gap-3 font-sans text-[0.95rem] font-medium text-ink/82">
          <SupportStatusCheck className="h-7 w-7" />
          All Systems Operational
        </p>
        <div className="mt-4 h-px w-full bg-line" />
        <div className="mt-4">
          <p className="font-sans text-[2.65rem] font-semibold leading-none tracking-[-0.04em] text-[#4B7451]">
            99.9%
          </p>
          <p className="mt-2 font-sans text-sm leading-none text-muted">
            Uptime (30 days)
          </p>
        </div>
        <svg
          viewBox="0 0 236 96"
          className="mt-auto h-[5.35rem] w-full"
          aria-hidden
        >
          <defs>
            <linearGradient
              id="support-uptime-fill"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#5F9C69" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#5F9C69" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <line
            x1="36"
            x2="222"
            y1="18"
            y2="18"
            stroke="#D8D0C2"
            strokeDasharray="3 3"
            strokeWidth="1.2"
          />
          <line
            x1="36"
            x2="222"
            y1="80"
            y2="80"
            stroke="#D8D0C2"
            strokeDasharray="3 3"
            strokeWidth="1.2"
          />
          <text
            x="4"
            y="22"
            className="fill-muted"
            style={{ fontSize: 10, fontFamily: "system-ui, sans-serif" }}
          >
            100%
          </text>
          <text
            x="8"
            y="84"
            className="fill-muted"
            style={{ fontSize: 10, fontFamily: "system-ui, sans-serif" }}
          >
            95%
          </text>
          <path d={chartArea} fill="url(#support-uptime-fill)" />
          <polyline
            points={chartLine}
            fill="none"
            stroke="#4B7451"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.8"
            pathLength={1}
            className="[stroke-dasharray:1] [stroke-dashoffset:0] group-hover/card:animate-[spark-draw_0.9s_ease-out_both] motion-reduce:animate-none"
          />
          <circle cx="222" cy="10" r="3.2" fill="#4B7451" />
        </svg>
      </div>

      {/* Backups */}
      <div className="relative flex min-h-[15.75rem] flex-col border-t border-line px-6 py-6 sm:px-8 md:min-h-[14.5rem] md:border-t-0 md:px-7 md:py-5">
        <span
          className="pointer-events-none absolute inset-y-3 right-0 hidden w-px bg-line md:block"
          aria-hidden
        />
        <p className="font-sans text-[1rem] font-semibold text-ink">Backups</p>
        <div className="mt-5 divide-y divide-line">
          {backupDetails.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-5 py-3 first:pt-0"
            >
              <span className="font-sans text-[0.92rem] text-ink/78">
                {label}
              </span>
              <span className="shrink-0 text-right font-sans text-[0.92rem] font-semibold text-ink/85">
                {value}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-line/80">
          <span className="block h-full w-[76%] rounded-full bg-[#4B7451]" />
        </div>
        <span className="mt-auto inline-flex w-fit items-center gap-2 border-b border-[#A8713B] pb-0.5 pt-5 font-sans text-[0.95rem] font-semibold text-forest">
          View backups
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      {/* Recent Activity */}
      <div className="flex min-h-[15.75rem] flex-col border-t border-line px-6 py-6 sm:px-8 md:min-h-[14.5rem] md:border-t-0 md:px-7 md:py-5">
        <p className="font-sans text-[1rem] font-semibold text-ink">
          Recent Activity
        </p>
        <div className="mt-5 divide-y divide-line">
          {activity.map(([item, time]) => (
            <div
              key={item}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 py-3 first:pt-0"
            >
              <p className="flex min-w-0 items-center gap-4 font-sans text-[0.9rem] leading-snug text-ink/82">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#4B7451]" />
                <span className="block truncate">{item}</span>
              </p>
              <span className="shrink-0 font-sans text-[0.82rem] text-muted">
                {time}
              </span>
            </div>
          ))}
        </div>
        <span className="mt-auto inline-flex w-fit items-center gap-2 border-b border-[#A8713B] pb-0.5 pt-5 font-sans text-[0.95rem] font-semibold text-forest">
          View all activity
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
