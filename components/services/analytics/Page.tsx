/** Renders the bespoke Analytics and Lead Tracking service experience. */
import { type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  Calendar,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Database,
  FileText,
  Gauge,
  LayoutDashboard,
  LayoutTemplate,
  LineChart,
  Mail,
  MapPin,
  Search,
  Send,
  Star,
  TrendingUp,
} from "lucide-react";
import FAQSection from "@/components/page/FAQSection";
import Reveal from "@/components/ui/Reveal";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import ServiceTimeline from "@/components/services/shared/ServiceTimeline";
import { getCaseStudy, type CaseStudy } from "@/lib/projects";
import type { ServiceArea } from "@/lib/services";
import ServiceFrame from "../shared/ServiceFrame";
import RelatedLinks from "../shared/RelatedLinks";
import {
  serviceCenterLabelClassName,
  serviceCenterTitleClassName,
  serviceContainer,
  serviceHeroTitleClassName,
  serviceSectionBodyClassName,
  serviceSectionTitleClassName,
} from "../shared/styles";
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

/** One concise report should point to decisions, not recreate an admin dashboard. */
const analyticsReportSources = [
  { label: "Organic Search", inquiries: 10, width: "100%" },
  { label: "Google Business Profile", inquiries: 6, width: "60%" },
  { label: "Direct", inquiries: 4, width: "40%" },
  { label: "Referral", inquiries: 3, width: "30%" },
  { label: "Paid Search", inquiries: 1, width: "12%" },
] as const;

const analyticsReportJourney = [
  { label: "Search", stage: "Entry source", icon: Search },
  { label: "Kitchen Remodeling", stage: "Landing page", icon: LayoutTemplate },
  { label: "Request an Estimate", stage: "Primary CTA", icon: FileText },
  { label: "Inquiry submitted", stage: "Conversion", icon: Send },
] as const;

const analyticsReportTakeaways = [
  {
    title: "Keep building around organic search",
    body: "It is driving the most inquiries this month.",
  },
  {
    title: "Strengthen the pages already working",
    body: "Kitchen Remodeling is the top performer.",
  },
  {
    title: "Keep the next step obvious",
    body: "Request an Estimate is converting well.",
  },
] as const;

const analyticsReportLayout = {
  /**
   * Shared column template so the KPI strip lines up with Lead sources /
   * Lead journey / What stood out below. Inquiries + Change share col 1.
   */
  detailColumns: "lg:grid-cols-[1fr_1fr_1.12fr]",
} as const;

const analyticsScope = [
  {
    title: "Tracking foundations",
    body: "Set up analytics, important events, and consent tracking cleanly from the start.",
  },
  {
    title: "Lead-source clarity",
    body: "Connect forms, calls, and CTAs back to the sources bringing in qualified inquiries.",
  },
  {
    title: "Conversion measurement",
    body: "Track the actions that matter, from smaller interactions to completed inquiries.",
  },
  {
    title: "Focused reporting",
    body: "Turn the important numbers into simple reports that support better decisions.",
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
      "Yes. If GA4, Search Console, or event tracking are already in place, I can audit what exists, fix gaps or double-counting, and reorganize it into reporting you can actually read.",
  },
  {
    question: "Can leads be connected to their original source?",
    answer:
      "In most cases, yes. By capturing landing page, referrer, and UTM details when an inquiry comes in, I can tie a lead back to the campaign, search, or page that produced it — so you know what is working.",
  },
  {
    question: "Do you build custom dashboards?",
    answer:
      "When it is useful. Many businesses are well served by clean GA4 reporting to start. If you outgrow that, a simple custom dashboard can bring the numbers that matter into one view — often as part of Digital Systems & Integrations.",
  },
] as const;

const analyticsProjectSlugs = ["centi", "internal-automation-tool"] as const;

/**
 * Hero entrance choreography (ms). The snapshot loads the way a real dashboard
 * does: the panel arrives empty, holds a brief skeleton, then the figures
 * resolve and populate — deltas, then the source donut sweeping on, then the
 * lead rows. Measurement is the subject, so the panel filling in is the point.
 *
 * CSS animation delays only (runs on first paint, no hydration wait).
 * The envelope matches `webDesignHeroTiming` and
 * `searchVisibilityHeroTiming` so the service pages stay siblings.
 */
const analyticsHeroTiming = {
  eyebrow: 0,
  title: 80,
  leadCopy: 170,
  actions: 310,
  panel: 260,
  panelHeader: 420,
  skeleton: 520,
  /** Figures resolve as the skeleton clears. */
  figures: 980,
  deltas: 1120,
  /** Added per delta chip. */
  deltaStep: 70,
  arcs: 1180,
  /** Added per donut segment, largest share first. */
  arcStep: 90,
  legend: 1260,
  /** Added per legend row. */
  legendStep: 60,
  leads: 1380,
  /** Added per lead row. */
  leadStep: 80,
} as const;

function AnalyticsRelated() {
  return (
    <RelatedLinks
      compactMobile
      links={[
        {
          label: "See where the traffic comes from",
          href: "/services/search-ai-visibility",
          note: "SEO and AI visibility bring the visitors this reporting measures.",
        },
        {
          label: "Connect lead tracking to your workflow",
          href: "/services/digital-systems-integrations",
          note: "Route a tracked inquiry into the tools your team already works in.",
        },
      ]}
    />
  );
}

export default function Page({ service }: { service: ServiceArea }) {
  const projects = analyticsProjectSlugs
    .map((projectSlug) => getCaseStudy(projectSlug))
    .filter((project): project is CaseStudy => Boolean(project));

  return (
    <ServiceFrame service={service}><section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={serviceContainer}>
          <AnalyticsHero timeline={service.timeline} />
          <AnalyticsWhyMeasurement />
          <AnalyticsReportingSection />
          <AnalyticsScope />
          <AnalyticsWork projects={projects} />
          <AnalyticsFaq />
          <AnalyticsRelated />
          <AnalyticsBottomCta />
        </div>
      </section>
    </ServiceFrame>
  );
}

function AnalyticsHero({ timeline }: { timeline: ServiceArea["timeline"] }) {
  return (
    <div className="grid items-start gap-10 border-b border-line pb-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
      <div className="max-w-xl text-center sm:text-left">
        <p
          className="ck-rise text-xs font-semibold uppercase tracking-[0.26em] text-forest"
          style={{ animationDelay: `${analyticsHeroTiming.eyebrow}ms` }}
        >
          Measurement
        </p>
        <h1
          className={`ck-rise ${serviceHeroTitleClassName}`}
          style={{ animationDelay: `${analyticsHeroTiming.title}ms` }}
        >
          Analytics &amp;{" "}
          <br />
          Lead Tracking
        </h1>
        <p
          className="ck-rise mx-auto mt-6 max-w-md text-base leading-7 text-ink/78 sm:mx-0 sm:text-[1.05rem]"
          style={{ animationDelay: `${analyticsHeroTiming.leadCopy}ms` }}
        >
          Clean measurement that shows you what&apos;s working. CK Works tracks
          traffic, forms, CTAs, search activity, and lead sources — so you can
          make confident decisions.
        </p>
        <ServiceTimeline
          timeline={timeline}
          className="ck-rise mt-4 justify-center sm:mt-7 sm:justify-start"
          style={{ animationDelay: `${analyticsHeroTiming.actions}ms` }}
        />
        <div
          className="ck-rise mx-auto mt-7 flex w-fit flex-row items-center gap-3 sm:mx-0 sm:w-auto"
          style={{ animationDelay: `${analyticsHeroTiming.actions}ms` }}
        >
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
    <div
      className="ck-lift rounded-2xl border border-line bg-card p-4 shadow-[0_26px_54px_-34px_rgba(31,36,32,0.55)] sm:p-5"
      style={{ animationDelay: `${analyticsHeroTiming.panel}ms` }}
      data-nosnippet
    >
      <p
        className="ck-fade mb-3 text-center text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted"
        style={{ animationDelay: `${analyticsHeroTiming.panelHeader}ms` }}
      >
        Illustrative snapshot — sample data
      </p>
      <div
        className="ck-fade flex items-center justify-between gap-3"
        style={{ animationDelay: `${analyticsHeroTiming.panelHeader}ms` }}
      >
        <p className="font-sans text-sm font-semibold text-ink">
          Measurement snapshot
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-ivory px-2.5 py-1.5 text-[0.68rem] font-medium text-muted">
          Last 30 days
          <ChevronDown className="h-3 w-3" strokeWidth={2} />
        </span>
      </div>

      {/* The panel arrives empty and fills: skeleton clears as figures resolve. */}
      <div className="relative">
        <div
          className="ck-skeleton pointer-events-none absolute inset-0 z-10 bg-card"
          style={
            {
              "--ck-anim-delay": `${analyticsHeroTiming.skeleton}ms`,
            } as CSSProperties
          }
          aria-hidden
        >
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-line bg-sand/50 p-3"
              >
                <div className="ck-skeleton-block h-2 w-[62%] rounded-full bg-line/70" />
                <div className="ck-skeleton-block mt-2.5 h-3 w-[48%] rounded-full bg-line/80" />
                <div className="ck-skeleton-block mt-2.5 h-2 w-[38%] rounded-full bg-line/60" />
              </div>
            ))}
          </div>
          <div className="mt-2.5 grid gap-2.5 sm:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
            <div className="h-[7.75rem] rounded-xl border border-line bg-sand/50" />
            <div className="hidden h-[7.75rem] rounded-xl border border-line bg-sand/50 lg:block" />
          </div>
        </div>

        <div
          className="ck-resolve"
          style={
            {
              "--ck-anim-delay": `${analyticsHeroTiming.figures}ms`,
            } as CSSProperties
          }
        >
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {analyticsSnapshotStats.map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-xl border border-line bg-card p-2.5 lg:p-3"
          >
            <p className="text-[0.64rem] font-medium text-muted">
              {stat.label}
            </p>
            <p className="mt-1 font-sans text-[1.05rem] font-semibold leading-none tracking-[-0.01em] text-ink lg:mt-1.5">
              {stat.value}
            </p>
            {"delta" in stat ? (
              /* The change lands a beat after its figure, so it reads as a result. */
              <p
                className="ck-pop mt-1 inline-flex items-center gap-0.5 text-[0.64rem] font-semibold text-forest lg:mt-1.5"
                style={{
                  animationDelay: `${
                    analyticsHeroTiming.deltas +
                    index * analyticsHeroTiming.deltaStep
                  }ms`,
                }}
              >
                <ArrowUp className="h-3 w-3" strokeWidth={2.4} />
                {stat.delta}
              </p>
            ) : (
              <p
                className="ck-pop mt-1.5 text-[0.64rem] font-medium text-muted"
                style={{
                  animationDelay: `${
                    analyticsHeroTiming.deltas +
                    index * analyticsHeroTiming.deltaStep
                  }ms`,
                }}
              >
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
              {analyticsSourceMix.map((source, index) => (
                <li
                  key={source.label}
                  className="ck-rise flex items-center gap-2 text-[0.64rem]"
                  style={{
                    animationDelay: `${
                      analyticsHeroTiming.legend +
                      index * analyticsHeroTiming.legendStep
                    }ms`,
                  }}
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

        {/* Desktop only. Stacked on a phone the snapshot ran three bordered
            panels deep and read as three unrelated cards rather than one
            dashboard. The stat grid carries the headline figures and Source
            mix carries the insight; a list of fictional company names is the
            one that can go. */}
        <div className="hidden flex-col rounded-xl border border-line p-3.5 lg:flex">
          <p className="text-[0.68rem] font-semibold text-ink">Recent leads</p>
          <ul className="mt-2.5 divide-y divide-line/70">
            {analyticsSnapshotLeads.map((lead, index) => (
              <li
                key={lead.name}
                className="ck-rise flex items-center gap-2.5 py-2 first:pt-0"
                style={{
                  animationDelay: `${
                    analyticsHeroTiming.leads +
                    index * analyticsHeroTiming.leadStep
                  }ms`,
                }}
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
      {segments.map((segment, index) => (
        <circle
          key={segment.label}
          className="ck-draw-arc"
          style={
            {
              "--ck-anim-delay": `${
                analyticsHeroTiming.arcs + index * analyticsHeroTiming.arcStep
              }ms`,
            } as CSSProperties
          }
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
    <section className="grid gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-8 lg:py-16">
      <Reveal className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          Why measurement matters
        </p>
        <h2 className={serviceSectionTitleClassName}>
          Measurement should lead to clearer decisions.
        </h2>
        <p className={serviceSectionBodyClassName}>
          Good data removes guesswork.{" "}
          <span className="hidden sm:inline">
            With the right setup, you&apos;ll understand what drives results,
            how visitors engage, and where opportunities exist.
          </span>
        </p>
      </Reveal>

      <div className="w-full max-w-2xl divide-y divide-line/40 lg:justify-self-end">
        {analyticsWhyRows.map(({ icon: Icon, title, body }, index) => (
          <Reveal
            as="article"
            key={title}
            delay={index * 110}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3.5 gap-y-1.5 py-5 first:pt-0 last:pb-0 sm:grid-cols-[auto_minmax(0,15rem)_minmax(0,1fr)] sm:items-center sm:gap-y-2"
          >
            <span className="row-span-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-soft/60 text-forest sm:row-span-1">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h3 className="font-serif text-[1.3rem] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[1.5rem]">
              {title}
            </h3>
            <p className="text-sm leading-6 text-muted">{body}</p>
          </Reveal>
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
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>
          Illustrative report — sample data
        </p>
        <h2 className={serviceCenterTitleClassName}>
          See what your site is actually producing.
        </h2>
      </Reveal>

      {/*
        A quiet grid gives the report a surface without competing with its data.
        The horizontal bleed must stay within the container's padding at each
        breakpoint, or the page picks up a sideways scroll on narrow screens.
      */}
      <div className="relative mt-6 lg:mt-8">
        <div
          className="grid-texture pointer-events-none absolute inset-x-0 -inset-y-10 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_76%)] sm:-inset-x-4 lg:-inset-x-8"
          aria-hidden
        />

        <Reveal className="relative mx-auto block max-w-6xl">
          {/* Fictional client and fictional figures. `data-nosnippet` keeps the
              invented growth numbers out of search snippets; the visible
              labels above and below keep the example clear for readers. */}
          <div
            className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_28px_58px_-38px_rgba(31,36,32,0.42)]"
            data-nosnippet
          >
            <header className="flex flex-row flex-wrap items-end justify-between gap-3 px-5 pb-4 pt-5 sm:flex-col sm:items-stretch sm:gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-7 lg:pb-5 lg:pt-7">
              <div className="sm:min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
                  Monthly lead report
                </p>
                <p className="mt-1.5 font-serif text-[1.75rem] font-semibold leading-none tracking-[-0.025em] text-ink sm:text-[2.85rem]">
                  Riverstone Builders
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 lg:ml-auto">
                <div className="hidden items-stretch gap-1 rounded-lg border border-line bg-ivory/55 p-1 sm:flex">
                  {[
                    { label: "1Y", change: "+124%", active: false },
                    { label: "3M", change: "+38%", active: false },
                    { label: "1M", change: "+12%", active: true },
                  ].map((range) => (
                    <span
                      key={range.label}
                      className={`inline-flex items-center gap-2 rounded-md px-3 py-2 ${
                        range.active
                          ? "bg-forest text-ivory shadow-soft"
                          : "text-ink/70"
                      }`}
                    >
                      <span className="text-[0.75rem] font-semibold leading-none">
                        {range.label}
                      </span>
                      <span
                        className={`text-[0.75rem] font-semibold leading-none ${
                          range.active ? "text-ivory/90" : "text-forest"
                        }`}
                      >
                        {range.change}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-line bg-ivory/55 px-2 py-1 sm:w-auto sm:px-3.5 sm:py-2.5">
                  <Calendar className="hidden h-4 w-4 shrink-0 text-forest sm:block" strokeWidth={1.8} />
                  <div>
                    <p className="hidden text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-muted sm:block">
                      Reporting period
                    </p>
                    <p className="text-[0.8rem] font-semibold leading-none text-ink sm:mt-0.5 sm:text-sm sm:leading-none">
                      May 1 <span className="sm:hidden">&ndash; 31</span>
                      <span className="hidden sm:inline">&ndash; May 31</span>
                    </p>
                  </div>
                </div>
              </div>
            </header>

            <div
              className={`grid border-y border-line sm:grid-cols-2 ${analyticsReportLayout.detailColumns}`}
            >
              {/* Inquiries + Change share the Lead sources column width */}
              <div className="grid grid-cols-2 divide-x divide-line border-b border-line sm:col-span-2 lg:col-span-1 lg:border-b-0 lg:border-r lg:border-line">
                <ReportMetric icon={Mail} label="Inquiries" value="24" />
                <ReportMetric icon={TrendingUp} label="Change" value="+12%" />
              </div>
              <ReportMetric
                icon={Search}
                label="Top source"
                value="Organic Search"
                className="border-b border-line lg:border-b-0 lg:border-r lg:border-line"
              />
              <ReportMetric
                icon={Star}
                label="Strongest page"
                value="Kitchen Remodeling"
                className="border-b border-line sm:border-b-0"
              />
            </div>

            <div className={`grid ${analyticsReportLayout.detailColumns}`}>
              <section className="px-5 py-4 sm:px-6 sm:py-6 lg:border-r lg:border-line">
                <h3 className="font-sans text-[1.05rem] font-semibold leading-none text-ink sm:text-[1.12rem]">
                  Lead sources
                </h3>
                <ul className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3.5">
                  {analyticsReportSources.map((source) => (
                    <li
                      key={source.label}
                      className="grid grid-cols-[minmax(0,1fr)_minmax(4rem,1.12fr)_1.25rem] items-center gap-3"
                    >
                      <span className="truncate text-[0.75rem] font-medium text-ink/85 sm:text-sm">
                        {source.label}
                      </span>
                      <span className="h-3 overflow-hidden rounded-full bg-line/45">
                        <span
                          className="block h-full rounded-full bg-[linear-gradient(90deg,#A9C19F,#2F5B3F)]"
                          style={{ width: source.width }}
                        />
                      </span>
                      <span className="text-right text-sm font-semibold tabular-nums text-ink">
                        {source.inquiries}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="border-t border-line px-5 py-4 sm:px-6 sm:py-6 lg:border-t-0 lg:border-r">
                <h3 className="font-sans text-[1.05rem] font-semibold leading-none text-ink sm:text-[1.12rem]">
                  Lead journey
                </h3>
                <ol className="relative mt-4 space-y-2.5 sm:mt-5 sm:space-y-3.5">
                  <span
                    className="absolute bottom-3.5 left-3.5 top-3.5 border-l border-dashed border-ink/35"
                    aria-hidden
                  />
                  {analyticsReportJourney.map(
                    ({ label, stage, icon: Icon }, index) => {
                      const isLast =
                        index === analyticsReportJourney.length - 1;

                      return (
                        <li
                          key={label}
                          className="relative flex items-center gap-3"
                        >
                          <span
                            className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                              isLast
                                ? "bg-forest text-ivory"
                                : "bg-forest-soft/75 text-ink/80"
                            }`}
                          >
                            <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                          </span>
                          <span className="min-w-0 flex-1 truncate text-sm font-medium leading-none text-ink/85">
                            {label}
                          </span>
                          <span className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-muted">
                            {stage}
                          </span>
                        </li>
                      );
                    },
                  )}
                </ol>
              </section>

              <section className="border-t border-line px-5 py-4 sm:px-6 sm:py-6 lg:border-t-0">
                <h3 className="font-sans text-[1.05rem] font-semibold leading-none text-ink sm:text-[1.12rem]">
                  What stood out
                </h3>
                <div className="mt-3 rounded-xl border border-line bg-forest-soft/35 px-4 py-3.5 sm:mt-4 sm:px-5 sm:py-4">
                  <p className="font-sans text-[1.15rem] font-semibold leading-snug text-forest sm:text-[1.28rem]">
                    Kitchen Remodeling generated the most inquiries.
                  </p>
                  <div className="mt-3 h-px w-full bg-forest/60" />
                  <p className="mt-3 text-sm leading-5 text-ink/82">
                    That page brought in 8 of the 24 recorded inquiries, with
                    Request an Estimate as the most-used conversion action.
                  </p>
                </div>
              </section>
            </div>

            <section className="flex flex-col gap-2 border-t border-line bg-ivory/35 px-5 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:gap-2.5">
              <div className="flex shrink-0 flex-row items-center gap-1.5">
                <h3 className="font-sans text-[1.05rem] font-semibold leading-snug text-ink sm:text-[1.12rem] lg:whitespace-nowrap">
                  Insights for Riverstone
                </h3>
                <ChevronDown
                  className="h-4 w-4 text-forest/55 lg:hidden"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </div>

              <div
                className="hidden items-center gap-1.5 lg:flex"
                aria-hidden
              >
                <span className="h-8 w-px bg-line" />
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-forest/55"
                  strokeWidth={2.25}
                />
              </div>

              <ul className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:gap-0 sm:divide-x sm:divide-line">
                {analyticsReportTakeaways.map((takeaway, index) => (
                  <li
                    key={takeaway.title}
                    className={`flex min-w-0 flex-1 gap-2.5 sm:px-3 ${
                      index === 0 ? "sm:pl-1.5" : ""
                    } ${
                      index === analyticsReportTakeaways.length - 1
                        ? "sm:pr-0"
                        : ""
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-soft/70 text-forest">
                      <CircleCheck className="h-4 w-4" strokeWidth={1.85} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-5 text-forest">
                        {takeaway.title}
                      </span>
                      <span className="mt-1 block text-[0.78rem] leading-5 text-ink/78">
                        {takeaway.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <p className="mt-4 text-center text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted">
            Sample data shown for illustration
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Compact top-line metrics anchor the fictional report before its detail. */
function ReportMetric({
  icon: Icon,
  label,
  value,
  className = "",
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-w-0 items-center gap-3 px-5 py-3.5 sm:px-6 sm:py-6 ${className}`}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-soft/65 text-forest">
        <Icon className="h-5 w-5" strokeWidth={1.65} />
      </span>
      <span className="min-w-0">
        <span className="block text-[0.72rem] font-semibold text-ink/90">
          {label}
        </span>
        <span className="mt-1 block truncate font-sans text-[1.3rem] font-semibold leading-none text-forest sm:text-[1.45rem]">
          {value}
        </span>
      </span>
    </div>
  );
}

function AnalyticsScope() {
  return (
    <section className="grid gap-8 border-b border-line py-14 pb-8 sm:pb-14 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-16 lg:py-16">
      <Reveal className="max-w-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          Practical scope
        </p>
        <h2 className={serviceSectionTitleClassName}>
          What this service can include.
        </h2>
        <p className={serviceSectionBodyClassName}>
          Every setup is shaped around the business, but most measurement work
          starts with the same core pieces — scoped around what actually helps
          you make better decisions.
        </p>
      </Reveal>
      <div className="min-w-0 border-t border-line lg:pl-4">
        {analyticsScope.map(({ title, body }, index) => (
          <Reveal
            as="article"
            key={title}
            delay={index * 100}
            className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1.5 border-b border-line py-6 last:border-b-0 sm:gap-x-6 sm:py-7 lg:grid-cols-[auto_auto_minmax(0,1fr)] lg:gap-y-0 lg:last:border-b"
          >
            <span
              className="font-source-serif-display text-[1.1rem] font-semibold leading-none tabular-nums text-forest/55"
              style={{ fontVariationSettings: '"opsz" 18' }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {/* nowrap keeps the desktop baseline row aligned; mobile must wrap. */}
            <h3 className="text-[1.02rem] font-semibold leading-tight text-ink lg:whitespace-nowrap lg:leading-none">
              {title}
            </h3>
            <p className="col-start-2 text-sm leading-6 text-muted lg:col-start-auto lg:whitespace-nowrap lg:leading-none">
              {body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const analyticsWorkContent = [
  {
    slug: "centi",
    label: "Featured project",
    labelIcon: LayoutDashboard,
    description:
      "Connected accounts, transaction data, and spending activity organized into one clear reporting view.",
    tags: [
      { icon: LayoutDashboard, label: "Dashboards" },
      { icon: LineChart, label: "Reporting" },
    ],
    tile: "cover",
  },
  {
    slug: "internal-automation-tool",
    label: "Project",
    labelIcon: LineChart,
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
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className={serviceCenterLabelClassName}>Selected work</p>
        <h2 className={serviceCenterTitleClassName}>Measurement in practice.</h2>
        <p className={`mx-auto max-w-xl ${serviceSectionBodyClassName}`}>
          Projects where scattered data became something a team could actually
          read and act on.
        </p>
      </Reveal>
      <div className="mt-8 grid gap-5 sm:mt-12 lg:grid-cols-2 lg:gap-6">
        {analyticsWorkContent.map((content, index) => {
          const project = bySlug.get(content.slug);
          return project ? (
            <Reveal
              key={content.slug}
              delay={index * 120}
              className="h-full min-h-0"
            >
              <AnalyticsProjectCard project={project} content={content} />
            </Reveal>
          ) : null;
        })}
      </div>

      <Reveal className="mt-8 text-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-forest/35 underline-offset-4 transition-colors hover:decoration-forest"
        >
          See all work
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
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
  const LabelIcon = content.labelIcon;

  return (
    <Link
      href={`/${project.slug}`}
      className="group grid grid-cols-1 gap-5 rounded-2xl border border-line bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-lift sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:p-5"
    >
      {content.tile === "cover" && project.coverImage ? (
        <span className="relative hidden min-h-[7rem] overflow-hidden rounded-xl bg-sand sm:block">
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="140px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </span>
      ) : (
        <span className="hidden min-h-[7rem] items-center justify-center rounded-xl border border-line bg-sand text-forest sm:flex">
          <LineChart className="h-8 w-8" strokeWidth={1.4} />
        </span>
      )}

      <span className="flex min-w-0 flex-col">
        <span className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-forest">
          <LabelIcon className="h-3.5 w-3.5 shrink-0 sm:hidden" strokeWidth={1.8} aria-hidden />
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

function AnalyticsFaq() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <Reveal>
        <FAQSection
          faqs={[...analyticsFaqs]}
          description="Common questions about analytics setup, reporting, and what the work helps you see."
        />
      </Reveal>
    </section>
  );
}

function AnalyticsBottomCta() {
  return (
    <Reveal className="mt-10 flex flex-col gap-5 rounded-xl border border-line bg-card px-6 py-7 text-center shadow-soft sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
      <div className="mx-auto max-w-xl lg:mx-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
          Analytics &amp; Lead Tracking
        </p>
        <h2 className="mt-3 font-serif text-[1.85rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.15rem]">
          Want a clearer view of what your site is doing?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-ink/75 sm:text-[0.95rem] lg:mx-0">
          Let&apos;s set up clean tracking and simple reporting so you can make
          confident, informed decisions.
        </p>
      </div>

      <div className="mx-auto flex w-fit shrink-0 flex-col items-stretch gap-4 lg:mx-0">
        <ProjectInquiryTrigger
          source="analytics_service_bottom_cta"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-6 py-3.5 text-sm font-semibold text-ivory shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:shadow-lift"
        >
          Start a project
          <ArrowRight className="h-4 w-4" />
        </ProjectInquiryTrigger>
      </div>
    </Reveal>
  );
}

// ── Digital Systems & Integrations (bespoke page) ─────────────────────────
