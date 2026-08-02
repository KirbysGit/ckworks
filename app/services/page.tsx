import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
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
} from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { createPageMetadata, absoluteUrl } from "@/lib/seo";
import { serviceAreas, type ServiceArea, type ServiceSlug } from "@/lib/services";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
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
      "We help your business show up more clearly in search results and AI-driven discovery.",
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
      "We handle updates, maintenance, fixes, and improvements so your site and systems stay secure, fast, and effective after launch.",
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
          <div className="max-w-5xl">
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
              How we can help
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          <div
            id="services-list"
            className="mt-8 grid scroll-mt-28 gap-4 lg:grid-cols-2 lg:gap-5 xl:gap-6"
          >
            {serviceCards.map((card) => (
              <ServiceOverviewCard
                key={card.slug}
                card={card}
                service={getService(card.slug)}
              />
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-4 rounded-xl border border-line bg-card px-5 py-5 shadow-soft sm:px-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-sand text-forest">
                <CircleHelp className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <div>
                <h2 className="font-serif text-2xl font-medium text-ink">
                  Not sure where to start?
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted">
                  Tell me a bit about your goals and I&apos;ll help you figure
                  out the right service.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-16 items-center justify-center gap-3 rounded-xl bg-ink px-8 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest hover:shadow-lift"
            >
              Help me decide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 rounded-xl bg-panel p-6 text-ivory shadow-float sm:p-8">
            <div className="grid items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)_auto]">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#9A7A3D]/65 text-[#C7A35C]">
                <ShieldCheck className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <div>
                <h2 className="font-serif text-3xl font-medium leading-tight sm:text-4xl">
                  Let&apos;s build something clear and effective.
                </h2>
                <p className="mt-2 text-sm leading-6 text-ivory/72 sm:text-base">
                  Book a quick call and let&apos;s talk about your goals.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-ivory px-7 py-4 text-sm font-semibold text-ink shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-card"
              >
                Book a discovery call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
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
  return (
    <article
      className={`group grid min-h-[19.25rem] overflow-hidden rounded-xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-lift md:grid-cols-[minmax(11.5rem,0.48fr)_minmax(0,1.12fr)] xl:grid-cols-[minmax(12rem,0.45fr)_minmax(0,1.2fr)] ${
        card.className ?? ""
      }`}
    >
      <div className="flex min-w-0 flex-col px-5 py-5 sm:p-6 md:pr-3">
        <span className="font-serif text-2xl font-medium leading-none text-[#A8713B]">
          {card.number}
        </span>
        <h2 className="mt-3 max-w-[15rem] font-serif text-[1.75rem] font-medium leading-[1.05] text-ink sm:text-[1.95rem]">
          {service.title}
        </h2>
        <p className="mt-3 max-w-[14rem] text-sm leading-7 text-ink/78">
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

      <div className="flex min-h-[16rem] min-w-0 items-center justify-center px-5 pb-5 pt-1 sm:px-6 sm:pb-6 md:px-4 md:py-5 lg:px-5">
        <ServiceVisual kind={card.visual} />
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
            <p className="mt-1.5 whitespace-nowrap font-sans text-[0.66rem] font-semibold leading-tight text-forest">
              Custom Home Builder in Orlando
            </p>
            <p className="mt-2.5 font-sans text-[0.68rem] leading-[1.55] text-ink/85">
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

  // Denser point set so the leads curve reads more active / detailed.
  const points = [
    [36, 82],
    [50, 70],
    [64, 58],
    [78, 64],
    [92, 78],
    [106, 90],
    [120, 84],
    [134, 62],
    [148, 48],
    [162, 56],
    [176, 68],
    [190, 74],
    [204, 66],
    [218, 80],
    [232, 92],
    [246, 86],
    [260, 70],
    [274, 54],
    [288, 60],
    [302, 72],
    [316, 78],
    [330, 64],
    [344, 52],
    [358, 44],
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
          className="mt-1.5 aspect-[400/132] w-full"
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
            strokeWidth="2.5"
          />
          {points.map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="2.4"
              fill="#3B82C4"
              stroke="#FFFDF8"
              strokeWidth="1.25"
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

function SystemsVisual() {
  const topNodes = [
    ["Website Form", FileText],
    ["CRM", UserRound],
    ["Email Automation", Mail],
  ] as const;
  const bottomNodes = [
    ["Payment Processor", CreditCard],
    ["Internal Workflow", CheckCircle2],
  ] as const;

  return (
    <div className="relative w-full py-1">
      <svg
        viewBox="0 0 520 248"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Solid top-row arrows: Form -> CRM -> Email */}
        <g
          fill="none"
          stroke="#5F665F"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M158 54 H188" />
          <path d="M182 49 L190 54 L182 59" />
          <path d="M330 54 H360" />
          <path d="M354 49 L362 54 L354 59" />
        </g>

        {/* Dashed bus: top nodes down into shared rail, then into bottom systems */}
        <g
          fill="none"
          stroke="#8A918A"
          strokeWidth="1.45"
          strokeDasharray="3.5 3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M86 108 V148" />
          <path d="M260 108 V148" />
          <path d="M434 108 V148" />
          <path d="M86 148 H434" />

          {/* Brace-style junctions into each bottom node */}
          <path d="M140 148 C152 148 156 156 156 168" />
          <path d="M172 148 C160 148 156 156 156 168" />
          <path d="M156 168 V196" />

          <path d="M348 148 C360 148 364 156 364 168" />
          <path d="M380 148 C368 148 364 156 364 168" />
          <path d="M364 168 V196" />
        </g>

        {/* Solid arrowheads into bottom nodes */}
        <g
          fill="none"
          stroke="#5F665F"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M151 190 L156 198 L161 190" />
          <path d="M359 190 L364 198 L369 190" />
        </g>
      </svg>

      <div className="relative z-10 grid grid-cols-3 gap-5">
        {topNodes.map(([label, Icon]) => (
          <FlowNode key={label} label={label} Icon={Icon} />
        ))}
      </div>
      <div className="relative z-10 mt-14 grid grid-cols-2 gap-12 px-[12%]">
        {bottomNodes.map(([label, Icon]) => (
          <FlowNode key={label} label={label} Icon={Icon} />
        ))}
      </div>
    </div>
  );
}

function FlowNode({
  label,
  Icon,
}: {
  label: string;
  Icon: typeof FileText;
}) {
  return (
    <div className="flex min-h-[6.75rem] flex-col items-center justify-center rounded-lg border border-line bg-card px-3 py-4 text-center shadow-soft">
      <Icon className="h-7 w-7 text-ink/80" strokeWidth={1.55} />
      <span className="mt-2 text-xs font-semibold leading-4 text-ink">
        {label}
      </span>
    </div>
  );
}

function SupportVisual() {
  return (
    <div className="grid w-full gap-0 overflow-hidden rounded-lg border border-line bg-ivory/75 shadow-[0_18px_35px_-26px_rgba(31,36,32,0.55)] md:grid-cols-[1fr_0.75fr_1.4fr]">
      <div className="border-b border-line p-4 md:border-b-0 md:border-r">
        <p className="text-xs font-semibold text-ink">Site Health</p>
        <p className="mt-4 flex items-center gap-2 text-sm text-ink">
          <CheckCircle2 className="h-5 w-5 text-forest" />
          All Systems Operational
        </p>
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-[10px] text-muted">Uptime (30 days)</p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <p className="font-serif text-3xl text-ink">99.9%</p>
            <svg viewBox="0 0 120 42" className="h-10 flex-1">
              <polyline
                points="0,32 12,22 24,26 36,20 48,24 60,12 72,28 84,14 96,20 108,8 120,15"
                fill="none"
                stroke="#5F9C69"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="border-b border-line p-4 md:border-b-0 md:border-r">
        <p className="text-xs font-semibold text-ink">Backups</p>
        <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-ink/85">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-forest" />
          Last backup
          <br />
          Today, 2:13 AM
        </p>
        <span className="mt-5 inline-flex rounded-md border border-line bg-card px-4 py-2 text-xs font-semibold text-ink">
          View backups
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold text-ink">Recent Activity</p>
        <div className="mt-4 space-y-3">
          {[
            ["Plugin updates completed", "May 20, 9:12 AM"],
            ["Theme updated to v2.4.1", "May 19, 4:38 PM"],
            ["Uptime check passed", "May 19, 9:01 AM"],
          ].map(([item, time]) => (
            <div key={item} className="flex items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-xs text-ink/85">
                <span className="h-2 w-2 rounded-full bg-[#69A96F]" />
                {item}
              </p>
              <span className="hidden text-[10px] text-muted sm:inline">
                {time}
              </span>
            </div>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-2 border-b border-[#A8713B] pb-1 text-xs font-semibold text-ink">
          View all activity
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
