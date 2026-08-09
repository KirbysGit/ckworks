/** Renders the bespoke Ongoing Support service experience. */
import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bell,
  Box,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock,
  Database,
  Eye,
  FileCode2,
  FileText,
  Flag,
  Gauge,
  Globe,
  Headphones,
  Home,
  LayoutDashboard,
  LayoutTemplate,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
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
  ShieldCheck,
  Smartphone,
  Sparkle,
  Store,
  Tag,
  TrendingUp,
  UserRound,
  Wrench,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import {
  SiAirtable,
  SiGooglecalendar,
  SiGooglesheets,
  SiStripe,
} from "react-icons/si";
import FAQSection from "@/components/page/FAQSection";
import Reveal from "@/components/ui/Reveal";
import ProjectInquiryTrigger from "@/components/inquiry/ProjectInquiryTrigger";
import { getCaseStudy, type CaseStudy } from "@/lib/projects";
import type { ServiceArea } from "@/lib/services";
import ServiceFrame from "../shared/ServiceFrame";
import ProjectWorkCard from "../shared/ProjectWorkCard";
import {
  serviceCenterLabelClassName,
  serviceCenterTitleClassName,
  serviceContainer,
  serviceHeroTitleClassName,
  serviceSectionBodyClassName,
  serviceSectionLabelClassName,
  serviceSectionTitleClassName,
} from "../shared/styles";
const supportStats = [
  { icon: ShieldCheck, label: "Site health", value: "Healthy", accent: true },
  { icon: Calendar, label: "Last check", value: "May 3, 2025", accent: false },
  { icon: Box, label: "Uptime", value: "99.9%", accent: false },
  { icon: Clock, label: "Response time", value: "< 2h", accent: false },
] as const;

const supportUpdates = [
  "Updated team page content",
  "Fixed mobile spacing issue",
  "Improved Core Web Vitals",
] as const;

const supportWhyItMatters = [
  {
    icon: RefreshCw,
    title: "Stay current",
    body: "Content, tools, and integrations stay up to date.",
  },
  {
    icon: Wrench,
    title: "Fix problems early",
    body: "Small issues are addressed before they become bigger.",
  },
  {
    icon: TrendingUp,
    title: "Improve when it matters",
    body: "Changes are prioritized based on impact and timing.",
  },
] as const;

const supportIncludes = [
  {
    title: "Website care",
    body: "Keep your site updated, secure, and working as it should.",
  },
  {
    title: "Fixes and troubleshooting",
    body: "Investigate issues and make clarifications to get things back on track.",
  },
  {
    title: "Content and small improvements",
    body: "Update content and make useful changes to keep things clear and effective.",
  },
  {
    title: "Performance and measurement checks",
    body: "Check speed, tracking, and metrics to ensure things are performing well.",
  },
] as const;

const supportRequests = [
  { icon: Pencil, label: "Update a service or team page" },
  { icon: Smartphone, label: "Fix a mobile layout issue" },
  { icon: Mail, label: "Add a new form field or notification" },
  { icon: Megaphone, label: "Publish a project or announcement" },
  { icon: BarChart3, label: "Investigate a tracking problem" },
  { icon: Gauge, label: "Improve a slow or confusing section" },
] as const;

const supportTrackerSteps = [
  { label: "Received", date: "May 3" },
  { label: "In review", date: "May 3" },
  { label: "In progress", date: "May 4" },
  { label: "Completed", date: "May 4" },
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

export default function Page({ service }: { service: ServiceArea }) {
  return (
    <ServiceFrame service={service}><section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={serviceContainer}>
          <SupportHero />
          <SupportWhyItMatters />
          <SupportIncludes />
          <SupportRequests />
          <SupportPrinciple />
          <SupportProcess />
          <SupportFaq />
          <SupportRebuildNote />
          <SupportBottomCta />
        </div>
      </section>
    </ServiceFrame>
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
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-forest/40 hover:text-forest"
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
      className="scroll-mt-28 rounded-2xl border border-line bg-card shadow-[0_26px_54px_-34px_rgba(31,36,32,0.5)]"
    >
      <div className="relative flex items-center border-b border-line px-4 py-2.5">
        <span className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#C87264]" />
          <span className="h-2 w-2 rounded-full bg-[#D8A847]" />
          <span className="h-2 w-2 rounded-full bg-[#5F9C69]" />
        </span>
        <p className="absolute left-1/2 -translate-x-1/2 font-sans text-[0.78rem] font-semibold text-ink">
          Example support view
        </p>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {supportStats.map(({ icon: Icon, label, value, accent }) => (
            <div
              key={label}
              className="rounded-xl border border-line p-3.5 text-center"
            >
              <span
                className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                  accent
                    ? "bg-forest text-ivory"
                    : "bg-forest-soft/60 text-forest"
                }`}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
              </span>
              <p className="mt-2.5 text-[0.62rem] font-medium text-muted">
                {label}
              </p>
              <p
                className={`mt-0.5 text-[0.82rem] font-semibold ${
                  accent ? "text-forest" : "text-ink"
                }`}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-line px-4 py-3.5">
          <p className="text-[0.7rem] font-semibold text-ink">Recent updates</p>
          <ul className="mt-1 divide-y divide-line/70">
            {supportUpdates.map((update) => (
              <li key={update} className="flex items-center gap-3 py-2.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full border border-line bg-sand"
                  aria-hidden
                />
                <span className="min-w-0 flex-1 truncate text-[0.74rem] font-medium text-ink/85">
                  {update}
                </span>
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-muted/70"
                  strokeWidth={2}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SupportWhyItMatters() {
  return (
    <section className="grid gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.9fr)_1px_minmax(0,1.1fr)] lg:gap-12 lg:py-16">
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          Why it matters
        </p>
        <h2 className={serviceSectionTitleClassName}>
          Keep what you built working well.
        </h2>
        <p className={serviceSectionBodyClassName}>
          Support is useful when the site needs to stay current, small issues
          need attention, or improvements make more sense over time than
          through another full rebuild.
        </p>
      </div>

      <span className="hidden w-px bg-line lg:block" aria-hidden />

      <div className="divide-y divide-line lg:self-center">
        {supportWhyItMatters.map(({ icon: Icon, title, body }) => (
          <article key={title} className="flex gap-5 py-5 first:pt-0 last:pb-0">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-soft/60 text-forest">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="font-serif text-xl font-medium leading-snug text-ink">
                {title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SupportIncludes() {
  return (
    <section
      id="support-includes"
      className="scroll-mt-24 border-b border-line py-14 lg:py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className={serviceCenterLabelClassName}>What support can include</p>
        <h2 className="mt-4 font-serif text-[2rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.45rem]">
          Practical support for the things that keep your site or system
          running smoothly.
        </h2>
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {supportIncludes.map(({ title, body }, index) => (
          <article
            key={title}
            className="rounded-2xl border border-line bg-card p-5 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-soft/60 font-source-serif-display text-[0.82rem] font-semibold tabular-nums text-forest"
                style={{ fontVariationSettings: '"opsz" 16' }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[0.95rem] font-semibold leading-snug text-ink">
                {title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SupportRequests() {
  return (
    <section className="py-12 lg:py-14">
      <div className="flex items-center gap-5">
        <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.24em] text-muted">
          Examples of common requests
        </p>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {supportRequests.map(({ icon: Icon, label }) => (
          <article
            key={label}
            className="flex items-center gap-3.5 rounded-xl border border-line bg-card px-4 py-3.5 shadow-soft"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center text-forest">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <p className="text-sm font-medium text-ink/85">{label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SupportPrinciple() {
  return (
    <section className="pb-12 lg:pb-14">
      <div className="grid items-center gap-8 rounded-2xl border border-line bg-sand px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_1px_minmax(0,0.7fr)] lg:gap-10 lg:px-10 lg:py-9">
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

        <span className="hidden self-stretch bg-line/80 lg:block" aria-hidden />

        <div className="hidden -rotate-2 lg:block">
          <p className="font-serif text-[1.55rem] italic leading-snug text-forest">
            Right amount of support
            <br />
            at the right time.
          </p>
          <Image
            src="/images/hero/svg/underline.svg"
            alt=""
            width={3785}
            height={429}
            className="mt-1.5 h-auto w-40"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}

function SupportProcess() {
  return (
    <section
      id="support-process"
      className="grid scroll-mt-24 gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14 lg:py-16"
    >
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          How requests are handled
        </p>
        <h2 className={serviceSectionTitleClassName}>
          A simple path from request to resolution.
        </h2>
        <div className="mt-7 divide-y divide-line">
          {supportProcess.map(({ step, title, body }) => (
            <article key={title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-soft/70 font-source-serif-display text-[0.85rem] font-semibold tabular-nums text-forest"
                style={{ fontVariationSettings: '"opsz" 16' }}
              >
                {step}
              </span>
              <div>
                <h3 className="text-[0.95rem] font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm leading-6 text-muted">
          You receive a clear understanding of what is being changed, what it
          will require, and what happens next.
        </p>
      </div>

      <SupportRequestTracker />
    </section>
  );
}

/** "Support request" tracker — how-requests-are-handled visual. */
function SupportRequestTracker() {
  return (
    <div className="rounded-2xl border border-line bg-card p-4 shadow-[0_26px_54px_-34px_rgba(31,36,32,0.5)] sm:p-5">
      <p className="font-sans text-sm font-semibold text-ink">
        Support request
      </p>

      <div className="mt-3 flex items-center gap-3 rounded-xl border border-line bg-ivory/60 p-3.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-forest">
          <FileText className="h-4 w-4" strokeWidth={1.7} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.8rem] font-semibold text-ink">
            Update contact form confirmation message
          </span>
          <span className="block text-[0.66rem] text-muted">
            Submitted May 3, 2025 · via email
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-forest-soft px-2.5 py-1 text-[0.62rem] font-semibold text-forest">
          Completed
        </span>
      </div>

      <div className="relative mt-6 px-1">
        <span
          className="absolute left-[12.5%] right-[12.5%] top-3 h-px bg-forest/40"
          aria-hidden
        />
        <div className="relative grid grid-cols-4">
          {supportTrackerSteps.map((step) => (
            <div key={step.label} className="flex flex-col items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-ivory ring-4 ring-card">
                <Check className="h-3 w-3" strokeWidth={2.8} />
              </span>
              <span className="text-center text-[0.66rem] font-semibold leading-tight text-ink">
                {step.label}
              </span>
              <span className="-mt-1 text-[0.6rem] text-muted">
                {step.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-xl bg-forest-soft/50 p-4">
        <CircleCheck
          className="mt-0.5 h-5 w-5 shrink-0 fill-forest text-ivory"
          strokeWidth={2.2}
        />
        <div>
          <p className="text-[0.78rem] font-semibold text-ink">
            Completed May 4, 2025
          </p>
          <p className="mt-1 text-[0.72rem] leading-5 text-muted">
            Confirmation message updated and tested on desktop and mobile. You
            can view the change on your site.
          </p>
        </div>
      </div>
    </div>
  );
}

function SupportFaq() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <FAQSection
        faqs={[...supportFaqs]}
        description="Common questions about ongoing support, how requests work, and what to expect."
      />
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
