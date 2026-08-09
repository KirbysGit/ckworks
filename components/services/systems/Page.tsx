/** Renders the bespoke Digital Systems and Integrations service experience. */
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
const systemsInquirySteps = [
  { label: "Form received", time: "Just now" },
  { label: "Contact validated", time: "1 min ago" },
  { label: "Lead added", time: "2 min ago" },
  { label: "Team notified", time: "2 min ago" },
] as const;

const systemsWorkflowRail = [
  { icon: FileText, label: "Website form" },
  { icon: Database, label: "Client records" },
  { icon: Bell, label: "Team notification" },
] as const;

const systemsWhyItMatters = [
  {
    icon: RefreshCw,
    title: "Less repeated work",
    body: "Information is entered once instead of copied between tools.",
  },
  {
    icon: Bell,
    title: "Fewer missed steps",
    body: "Notifications and follow-ups happen when they should.",
  },
  {
    icon: Eye,
    title: "A clearer view",
    body: "Important records and statuses stay visible in one place.",
  },
] as const;

/**
 * Tool cards for the integration diagram. Gmail/Slack use full-color SVGs
 * from public/images/services/svg; the rest use brand-tinted react-icons.
 * Drop an official SVG into that folder and switch an entry to upgrade it.
 */
const systemsTools: { name: string; use: string; logo: ReactNode }[] = [
  {
    name: "Gmail",
    use: "Lead notifications",
    logo: (
      <Image
        src="/images/services/svg/gmail-logo.svg"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />
    ),
  },
  {
    name: "Google Sheets",
    use: "Records and tracking",
    logo: <SiGooglesheets className="h-7 w-7" color="#34A853" />,
  },
  {
    name: "Slack",
    use: "Team updates",
    logo: (
      <Image
        src="/images/services/svg/slack-logo.svg"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />
    ),
  },
  {
    name: "Stripe",
    use: "Payment sync",
    logo: <SiStripe className="h-7 w-7" color="#635BFF" />,
  },
  {
    name: "Airtable",
    use: "Project management",
    logo: <SiAirtable className="h-7 w-7" color="#18BFFF" />,
  },
  {
    name: "LinkedIn",
    use: "Lead capture",
    logo: <FaLinkedin className="h-7 w-7" color="#0A66C2" />,
  },
  {
    name: "Website Forms",
    use: "Client intake",
    logo: <FileText className="h-7 w-7 text-ink/80" strokeWidth={1.4} />,
  },
  {
    name: "Google Calendar",
    use: "Scheduling",
    logo: <SiGooglecalendar className="h-7 w-7" color="#4285F4" />,
  },
];

const systemsHowSteps = [
  {
    step: "01",
    title: "Understand",
    body: "Map the current workflow and find repeated or delayed steps.",
  },
  {
    step: "02",
    title: "Build and connect",
    body: "Create the dashboard, form, database, or integration.",
  },
  {
    step: "03",
    title: "Test and improve",
    body: "Check the system with real use and refine it.",
  },
] as const;

const systemsOpsStats = [
  { label: "New inquiries", value: "18", delta: "+12%" },
  { label: "Ready for review", value: "7", delta: "+8%" },
  { label: "Follow-up due", value: "5", delta: "+20%" },
] as const;

const systemsOpsActivity = [
  { label: "Sarah Mitchell – Kitchen remodeling", time: "Just now" },
  { label: "Daniel Ortiz – Bathroom remodel", time: "10 min ago" },
  { label: "New website inquiry", time: "1 hr ago" },
  { label: "Invoice collected – Staysure remodel", time: "2 hrs ago" },
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
  {
    question: "Who maintains the system after launch?",
    answer:
      "Whatever fits how you work. Many businesses pair systems work with Ongoing Support so updates and small improvements are handled for them; others take a documented handoff and run it themselves. Either way, nothing is locked in.",
  },
] as const;

const systemsProjectSlugs = ["internal-automation-tool", "centi"] as const;

export default function Page({ service }: { service: ServiceArea }) {
  const projects = systemsProjectSlugs
    .map((projectSlug) => getCaseStudy(projectSlug))
    .filter((project): project is CaseStudy => Boolean(project));

  return (
    <ServiceFrame service={service}><section className="bg-ivory py-10 sm:py-12 lg:py-16">
        <div className={serviceContainer}>
          <SystemsHero />
          <SystemsWhyItMatters />
          <SystemsToolGrid />
          <SystemsHowItWorks />
          <SystemsWork projects={projects} />
          <SystemsFaq />
          <SystemsBottomCta />
        </div>
      </section>
    </ServiceFrame>
  );
}

function SystemsHero() {
  return (
    <div className="grid items-center gap-10 border-b border-line pb-11 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14 lg:pb-14">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-forest">
          Digital Systems &amp; Integrations
        </p>
        <h1 className={serviceHeroTitleClassName}>
          Custom systems that keep the work moving.
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-ink/78 sm:text-[1.05rem]">
          We build internal dashboards, connected forms, workflow automations,
          and integrations that bring your tools and information together.
        </p>
        <p className="mt-4 max-w-md text-base leading-7 text-ink/78 sm:text-[1.05rem]">
          The goal is simple: less copying, fewer missed steps, and a clearer
          view of what&apos;s happening.
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
            href="#how-it-works"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-forest/40 hover:text-forest"
          >
            See how it works
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <SystemsInquiryDemo />
    </div>
  );
}

/** Hero visual: inquiry card → dotted connector → connected-workflow rail. */
function SystemsInquiryDemo() {
  return (
    <div>
      <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1.22fr)_2rem_minmax(0,0.88fr)] lg:gap-0">
        <div className="rounded-2xl border border-line bg-card shadow-[0_26px_54px_-34px_rgba(31,36,32,0.5)]">
          <div
            className="flex items-center gap-1.5 border-b border-line px-4 py-2.5"
            aria-hidden
          >
            <span className="h-2 w-2 rounded-full bg-[#C87264]" />
            <span className="h-2 w-2 rounded-full bg-[#D8A847]" />
            <span className="h-2 w-2 rounded-full bg-[#5F9C69]" />
          </div>
          <div className="p-5">
            <p className="font-sans text-[0.95rem] font-semibold text-ink">
              New website inquiry
            </p>
            <div className="mt-3.5 flex items-center gap-3 rounded-xl border border-line bg-ivory/60 p-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-[0.72rem] font-semibold text-ivory">
                SM
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">
                  Sarah Mitchell
                </span>
                <span className="block truncate text-xs text-muted">
                  Kitchen remodeling
                </span>
                <span className="block truncate text-xs text-muted">
                  Orlando, FL
                </span>
              </span>
            </div>
            <ul className="mt-2 divide-y divide-line/70">
              {systemsInquirySteps.map((step) => (
                <li key={step.label} className="flex items-center gap-2.5 py-2.5">
                  <CircleCheck
                    className="h-4 w-4 shrink-0 fill-forest text-ivory"
                    strokeWidth={2.4}
                  />
                  <span className="min-w-0 flex-1 truncate text-[0.8rem] font-medium text-ink">
                    {step.label}
                  </span>
                  <span className="shrink-0 text-[0.66rem] text-muted">
                    {step.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <span
          className="hidden self-center border-t border-dashed border-line lg:block"
          aria-hidden
        />

        <div className="rounded-2xl border border-line bg-card p-5 shadow-soft">
          <p className="text-center text-[0.82rem] font-semibold text-ink">
            Connected workflow
          </p>
          <div className="mt-4 flex flex-col items-center">
            {systemsWorkflowRail.map(({ icon: Icon, label }, index) => (
              <Fragment key={label}>
                {index > 0 && (
                  <ArrowDown
                    className="my-2 h-4 w-4 text-muted/60"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                )}
                <span className="flex flex-col items-center gap-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-soft/70 text-forest">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="text-xs font-medium text-ink/80">
                    {label}
                  </span>
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted">
        Illustrative example
      </p>
    </div>
  );
}

function SystemsWhyItMatters() {
  return (
    <section className="grid gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.9fr)_1px_minmax(0,1.1fr)] lg:gap-12 lg:py-16">
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          Why it matters
        </p>
        <h2 className={serviceSectionTitleClassName}>
          Keep information moving without the manual handoffs.
        </h2>
        <p className={serviceSectionBodyClassName}>
          As businesses grow, information spreads across forms, spreadsheets,
          inboxes, and disconnected tools.
        </p>
        <p className="mt-3 text-sm leading-7 text-ink/75 sm:text-[0.95rem]">
          We connect the pieces so your team can move faster with confidence.
        </p>
      </div>

      <span className="hidden w-px bg-line lg:block" aria-hidden />

      <div className="divide-y divide-line lg:self-center">
        {systemsWhyItMatters.map(({ icon: Icon, title, body }) => (
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

function SystemsToolGrid() {
  const topRow = systemsTools.slice(0, 4);
  const bottomRow = systemsTools.slice(4);

  return (
    <section className="border-b border-line py-14 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className={serviceCenterLabelClassName}>
          What this service can include
        </p>
        <h2 className={serviceCenterTitleClassName}>
          Connect the tools you already use.
        </h2>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <SystemsToolRow tools={topRow} />
        <div className="my-3 flex flex-col items-center lg:my-0">
          <span
            className="hidden h-4 border-l border-dashed border-line lg:block"
            aria-hidden
          />
          <div className="flex items-center gap-3 rounded-xl bg-forest px-6 py-4 shadow-[0_18px_38px_-18px_rgba(47,91,63,0.6)]">
            <Store className="h-6 w-6 shrink-0 text-ivory" strokeWidth={1.6} />
            <span className="font-sans text-lg font-semibold leading-none text-ivory">
              Your business
            </span>
          </div>
          <span
            className="hidden h-4 border-l border-dashed border-line lg:block"
            aria-hidden
          />
        </div>
        <SystemsToolRow tools={bottomRow} />
      </div>
    </section>
  );
}

function SystemsToolRow({ tools }: { tools: typeof systemsTools }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:flex lg:items-stretch lg:gap-0">
      {tools.map((tool, index) => (
        <Fragment key={tool.name}>
          {index > 0 && (
            <span
              className="hidden self-center border-t border-dashed border-line lg:block lg:flex-1"
              aria-hidden
            />
          )}
          <article className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-card px-3 py-5 text-center shadow-soft lg:w-44 lg:shrink-0">
            <span className="flex h-9 items-center justify-center">
              {tool.logo}
            </span>
            <h3 className="text-sm font-semibold text-ink">{tool.name}</h3>
            <p className="text-xs leading-4 text-muted">{tool.use}</p>
          </article>
        </Fragment>
      ))}
    </div>
  );
}

function SystemsHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="grid scroll-mt-24 gap-10 border-b border-line py-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14 lg:py-16"
    >
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-forest">
          How it works
        </p>
        <h2 className={serviceSectionTitleClassName}>
          Start with the workflow, not the software.
        </h2>
        <div className="mt-7 divide-y divide-line">
          {systemsHowSteps.map((step) => (
            <article
              key={step.title}
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-soft/70 font-source-serif-display text-[0.82rem] font-semibold tabular-nums text-forest"
                style={{ fontVariationSettings: '"opsz" 16' }}
              >
                {step.step}
              </span>
              <div>
                <h3 className="text-[0.95rem] font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted">{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <SystemsOperationsCard />
    </section>
  );
}

/** Light "Operations" dashboard — how-it-works visual. */
function SystemsOperationsCard() {
  return (
    <div className="rounded-2xl border border-line bg-card shadow-[0_26px_54px_-34px_rgba(31,36,32,0.5)]">
      <div
        className="flex items-center gap-1.5 border-b border-line px-4 py-2.5"
        aria-hidden
      >
        <span className="h-2 w-2 rounded-full bg-[#C87264]" />
        <span className="h-2 w-2 rounded-full bg-[#D8A847]" />
        <span className="h-2 w-2 rounded-full bg-[#5F9C69]" />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-sans text-sm font-semibold text-ink">Operations</p>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-ivory px-2.5 py-1.5 text-[0.68rem] font-medium text-muted">
            This week
            <ChevronDown className="h-3 w-3" strokeWidth={2} />
          </span>
        </div>

        <div className="mt-3.5 grid grid-cols-3 gap-2.5">
          {systemsOpsStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-line p-3"
            >
              <p className="text-[0.62rem] font-medium text-muted">
                {stat.label}
              </p>
              <div className="mt-1.5 flex items-baseline justify-between gap-2">
                <p className="font-sans text-[1.15rem] font-semibold leading-none tracking-[-0.01em] text-ink">
                  {stat.value}
                </p>
                <p className="text-[0.62rem] font-semibold text-forest">
                  {stat.delta}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Recent activity
        </p>
        <ul className="mt-1 divide-y divide-line/70">
          {systemsOpsActivity.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 py-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-forest-soft/50 text-forest">
                <FileText className="h-3.5 w-3.5" strokeWidth={1.7} />
              </span>
              <span className="min-w-0 flex-1 truncate text-[0.72rem] font-medium text-ink">
                {item.label}
              </span>
              <span className="shrink-0 text-[0.62rem] text-muted">
                {item.time}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-xl border border-line bg-sand/60 px-4 py-3">
          {systemsWorkflowRail.map(({ icon: Icon }, index) => {
            const labels = ["Form submitted", "Record created", "Team notified"];
            return (
              <Fragment key={labels[index]}>
                {index > 0 && (
                  <ArrowRight
                    className="h-3.5 w-3.5 text-muted/60"
                    strokeWidth={1.8}
                    aria-hidden
                  />
                )}
                <span className="flex items-center gap-1.5 text-[0.68rem] font-medium text-ink/80">
                  <Icon className="h-3.5 w-3.5 text-forest" strokeWidth={1.7} />
                  {labels[index]}
                </span>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SystemsWork({ projects }: { projects: CaseStudy[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="border-b border-line py-12 lg:py-14">
      <h2 className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.025em] text-ink sm:text-[2.3rem]">
        Relevant work
      </h2>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 sm:gap-6">
        {projects.map((project) => (
          <ProjectWorkCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function SystemsFaq() {
  return (
    <section className="border-b border-line py-12 lg:py-14">
      <FAQSection
        faqs={[...systemsFaqs]}
        description="Common questions about connecting tools, automating steps, and keeping systems running."
      />
    </section>
  );
}

function SystemsBottomCta() {
  return (
    <div className="mt-10 rounded-2xl border border-line bg-sand px-6 py-8 shadow-soft sm:px-8 sm:py-9 lg:px-10">
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
