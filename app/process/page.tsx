import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleDot,
  Code2,
  FileText,
  Flag,
  FolderTree,
  Lightbulb,
  PencilLine,
  RefreshCw,
  Rocket,
  Sparkles,
} from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import ContactCTA from "@/components/page/ContactCTA";
import SchemaMarkup from "@/components/page/SchemaMarkup";
import { getCaseStudy } from "@/lib/projects";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

const processDescription =
  "CK Works plans, designs, builds, and improves websites and digital systems through a calm process built around clarity, structure, launch, and ongoing improvement.";

export const metadata: Metadata = createPageMetadata({
  title: "Process",
  description: processDescription,
  path: "/process",
});

type Phase = {
  number: string;
  title: string;
  body: string;
  outcome: string;
  visual: ReactNode;
};

const phases: Phase[] = [
  {
    number: "01",
    title: "Discovery & clarity",
    body:
      "We learn how the business works, what needs to improve, and what the project needs to accomplish. The goal is to turn a loose idea into a clear direction before design or development starts.",
    outcome: "goals, priorities, and project direction",
    visual: <DiscoveryNotesVisual />,
  },
  {
    number: "02",
    title: "Structure & direction",
    body:
      "We shape the pages, user paths, content priorities, and system requirements around the real goal. This gives the project a practical structure before the interface becomes polished.",
    outcome: "sitemap, key flows, and content plan",
    visual: <SitemapVisual />,
  },
  {
    number: "03",
    title: "Design & build",
    body:
      "The direction turns into a responsive interface and working implementation. I move between design details and code so the final site or system feels clear, usable, and reliable.",
    outcome: "designed screens, working code, and tested flows",
    visual: <BuildVisual />,
  },
  {
    number: "04",
    title: "Launch & improve",
    body:
      "Once the project is live, we check the important paths, fix the rough edges, and learn from real usage. The launch is treated as the start of a cleaner operating rhythm, not the end of the work.",
    outcome: "live project, launch checks, and next improvements",
    visual: <LaunchVisual />,
  },
];

const faqs = [
  {
    question: "How long does a project take?",
    answer:
      "A small website or focused landing page can often move faster, while a larger site, system, or integration needs more planning and testing time. After the first conversation, CK Works outlines a practical timeline based on scope, content readiness, feedback cycles, and launch needs.",
  },
  {
    question: "What do I need before starting?",
    answer:
      "You do not need a perfect brief. It helps to bring business context, goals, any current website or tool access, rough content, and examples of what feels right or wrong so the project can start with clear direction.",
  },
  {
    question: "How are feedback and revisions handled?",
    answer:
      "Feedback is organized around clear milestones instead of scattered one-off changes. We review direction, structure, design, and build stages at the right moments so decisions stay focused and the project keeps moving.",
  },
  {
    question: "What happens after launch?",
    answer:
      "After launch, CK Works can help with fixes, updates, analytics checks, SEO and AI-search improvements, integrations, and ongoing support. The goal is to keep the site or system clean as the business changes.",
  },
];

const collaborationRows = [
  ["Business knowledge", "Strategy and structure"],
  ["Content and access", "Design and development"],
  ["Feedback and decisions", "Testing and launch"],
] as const;

export default function ProcessPage() {
  const tizirsso = getCaseStudy("tizirsso");

  return (
    <SiteLayout>
      <SchemaMarkup
        id="process-schema"
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "CK Works Process",
              url: absoluteUrl("/process"),
              description: processDescription,
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ],
        }}
      />

      <section className="bg-ivory py-12 sm:py-14 lg:py-20">
        <div className="container-ck">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(26rem,0.8fr)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                The Approach
              </p>
              <h1 className="mt-5 max-w-3xl font-serif text-[3rem] font-medium leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
                A calm way projects take shape.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                CK Works plans, designs, builds, and improves websites and
                digital systems through a focused process that keeps decisions
                clear and the work moving.
              </p>
            </div>

            <RoadmapVisual />
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-ck">
          <div className="space-y-10 border-t border-line/70 py-10 lg:space-y-16 lg:py-16">
            {phases.map((phase, index) => (
              <PhaseSection key={phase.number} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-12 lg:py-16">
        <div className="container-ck">
          <div className="rounded-2xl border border-line bg-card p-6 shadow-soft sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              Working Together
            </p>
            <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div>
                <h2 className="font-serif text-3xl font-medium text-ink">
                  You bring
                </h2>
                <ul className="mt-5 space-y-4">
                  {collaborationRows.map(([client]) => (
                    <li
                      key={client}
                      className="flex items-center gap-3 text-base text-muted"
                    >
                      <CircleDot className="h-4 w-4 text-forest" />
                      {client}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-3xl font-medium text-ink">
                  CK Works handles
                </h2>
                <ul className="mt-5 space-y-4">
                  {collaborationRows.map(([, studio]) => (
                    <li
                      key={studio}
                      className="flex items-center gap-3 text-base text-muted"
                    >
                      <CheckCircle2 className="h-4 w-4 text-forest" />
                      {studio}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-8 max-w-3xl border-t border-line/70 pt-6 text-base leading-8 text-ink/82">
              Communication stays organized through clear milestones, review
              points, and next steps.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-12 lg:py-16">
        <div className="container-ck grid gap-8 lg:grid-cols-[minmax(16rem,0.45fr)_minmax(0,1fr)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
              FAQ
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              The deeper details, without the word wall.
            </h2>
          </div>
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-5 open:bg-ivory/45">
                <summary className="cursor-pointer list-none font-medium text-ink marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-forest transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {tizirsso && (
        <section className="bg-ivory py-12 lg:py-16">
          <div className="container-ck">
            <div className="rounded-2xl border border-line bg-card p-6 shadow-soft sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                Process In Practice
              </p>
              <div className="mt-6 grid items-center gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.8fr)]">
                <div>
                  <h2 className="font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
                    {tizirsso.name}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
                    From organizing the story and sponsorship goals to
                    designing, developing, and launching the final site.
                  </p>
                  <Link
                    href={`/${tizirsso.slug}`}
                    className="group mt-6 inline-flex items-center gap-2 border-b border-forest pb-1 text-sm font-semibold text-forest transition-colors hover:text-ink"
                  >
                    View project
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
                {tizirsso.coverImage && (
                  <Link
                    href={`/${tizirsso.slug}`}
                    className={`group relative block aspect-[16/9] overflow-hidden rounded-xl border border-line bg-gradient-to-br ${tizirsso.accent}`}
                  >
                    <Image
                      src={tizirsso.coverImage.src}
                      alt={tizirsso.coverImage.alt}
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <ContactCTA
        title="Have a project that needs a clearer path?"
        description="Send a note with where things stand now, and I will help you sort the next practical step."
      />
    </SiteLayout>
  );
}

function PhaseSection({ phase, index }: { phase: Phase; index: number }) {
  const visualFirst = index % 2 === 1;

  return (
    <article className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(24rem,1fr)] lg:gap-12">
      <div className={visualFirst ? "lg:order-2" : ""}>
        <p className="font-serif text-3xl font-medium text-[#A8713B]">
          {phase.number}
        </p>
        <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
          {phase.title}
        </h2>
        <p className="mt-5 max-w-xl text-base leading-8 text-muted">
          {phase.body}
        </p>
        <p className="mt-5 max-w-xl rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-forest shadow-[0_8px_22px_-18px_rgba(31,36,32,0.45)]">
          Typical outcome: {phase.outcome}
        </p>
      </div>
      <div className={visualFirst ? "lg:order-1" : ""}>{phase.visual}</div>
    </article>
  );
}

function RoadmapVisual() {
  const steps = [
    { label: "Clarify", icon: Lightbulb },
    { label: "Shape", icon: FolderTree },
    { label: "Build", icon: Code2 },
    { label: "Launch", icon: Rocket },
  ];

  return (
    <div className="rounded-2xl border border-line bg-card p-5 shadow-soft sm:p-6">
      <div className="grid gap-3">
        {steps.map(({ label, icon: Icon }, index) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-soft text-forest">
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <span className="font-serif text-2xl font-medium text-ink">
              {label}
            </span>
            {index < steps.length - 1 && (
              <ArrowRight className="ml-auto h-4 w-4 text-muted" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-ivory/65 px-4 py-3 text-forest">
        <RefreshCw className="h-4 w-4" />
        <span className="text-sm font-semibold">Improve after launch</span>
      </div>
    </div>
  );
}

function VisualFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4 shadow-soft sm:p-5">
      <div className="grid-texture relative min-h-[20rem] overflow-hidden rounded-xl border border-line bg-ivory/80">
        {children}
      </div>
    </div>
  );
}

function DiscoveryNotesVisual() {
  const notes = [
    ["Goals", "Clearer story for sponsors"],
    ["Audience", "Fans, partners, teams"],
    ["Priority", "Make the next step obvious"],
  ];

  return (
    <VisualFrame>
      <div className="absolute inset-0 p-5">
        <div className="rounded-xl border border-line bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
              Discovery Notes
            </p>
            <PencilLine className="h-4 w-4 text-forest" />
          </div>
          <div className="mt-5 space-y-4">
            {notes.map(([label, text]) => (
              <div key={label} className="grid grid-cols-[5rem_1fr] gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">
                  {label}
                </span>
                <span className="rounded-lg border border-line bg-ivory/70 px-3 py-2 text-sm text-muted">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-6 right-7 w-40 rotate-[-4deg] rounded-lg border border-line bg-[#F7F0D8] p-4 shadow-soft">
          <Sparkles className="h-4 w-4 text-forest" />
          <p className="mt-3 font-serif text-xl leading-tight text-ink">
            What should this help people understand?
          </p>
        </div>
      </div>
    </VisualFrame>
  );
}

function SitemapVisual() {
  const pages = ["Home", "Services", "Work", "Contact"];

  return (
    <VisualFrame>
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mx-auto flex w-32 items-center justify-center rounded-lg border border-forest/35 bg-card px-4 py-3 text-sm font-semibold text-ink shadow-soft">
            Website
          </div>
          <div className="mx-auto h-10 w-px bg-line" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {pages.map((page) => (
              <div key={page} className="relative">
                <div className="absolute -top-5 left-1/2 h-5 w-px -translate-x-1/2 bg-line" />
                <div className="rounded-lg border border-line bg-card px-3 py-3 text-center text-sm font-medium text-ink shadow-soft">
                  {page}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7 rounded-xl border border-line bg-card p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
              Flow Notes
            </p>
            <div className="mt-3 space-y-2">
              <span className="block h-2 w-full rounded-full bg-line" />
              <span className="block h-2 w-5/6 rounded-full bg-line" />
              <span className="block h-2 w-2/3 rounded-full bg-line" />
            </div>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

function BuildVisual() {
  return (
    <VisualFrame>
      <div className="absolute inset-0 p-5">
        <div className="grid h-full gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-card p-4 shadow-soft">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
              <FileText className="h-4 w-4" />
              Wireframe
            </p>
            <div className="mt-5 space-y-3">
              <span className="block h-5 w-4/5 rounded bg-line/70" />
              <span className="block h-3 w-full rounded bg-line/70" />
              <span className="block h-3 w-5/6 rounded bg-line/70" />
              <div className="grid grid-cols-2 gap-3 pt-3">
                <span className="h-20 rounded-lg border border-dashed border-muted/35" />
                <span className="h-20 rounded-lg border border-dashed border-muted/35" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-line bg-card shadow-soft">
            <div className="flex h-8 items-center gap-1.5 border-b border-line px-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C87264]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#D8A847]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#5F9C69]" />
            </div>
            <div className="p-4">
              <p className="font-serif text-2xl leading-none text-ink">
                Clear message.
                <br />
                Real action.
              </p>
              <p className="mt-3 text-xs leading-5 text-muted">
                Working interface with responsive structure and clean calls to
                action.
              </p>
              <span className="mt-5 inline-flex rounded-md bg-forest px-4 py-2 text-xs font-semibold text-ivory">
                Start here
              </span>
            </div>
          </div>
        </div>
        <ArrowRight className="absolute left-1/2 top-1/2 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card p-1 text-forest shadow-soft sm:block" />
      </div>
    </VisualFrame>
  );
}

function LaunchVisual() {
  return (
    <VisualFrame>
      <div className="absolute inset-0 p-5">
        <div className="relative h-full rounded-xl border border-line bg-card shadow-soft">
          <div className="flex h-8 items-center gap-1.5 border-b border-line px-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C87264]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#D8A847]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#5F9C69]" />
            <span className="ml-auto text-[10px] font-medium text-muted">
              live site
            </span>
          </div>
          <div className="grid h-[calc(100%-2rem)] grid-cols-[1fr_0.9fr] gap-5 p-5">
            <div>
              <p className="font-serif text-3xl leading-none text-ink">
                Launched,
                <br />
                checked,
                <br />
                improving.
              </p>
              <p className="mt-4 text-xs leading-5 text-muted">
                The important paths are tested and the next improvements are
                visible.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-md bg-forest px-4 py-2 text-xs font-semibold text-ivory">
                <Flag className="h-3.5 w-3.5" />
                Live
              </span>
            </div>
            <div className="rounded-lg bg-[linear-gradient(135deg,#EAE0CE,#B9C8B4)]" />
          </div>
          <div className="absolute bottom-6 right-6 w-44 rounded-xl border border-line bg-ivory/95 p-4 shadow-lift">
            <p className="flex items-center gap-2 text-xs font-semibold text-ink">
              <BarChart3 className="h-4 w-4 text-forest" />
              Launch Signals
            </p>
            <div className="mt-4 space-y-3">
              <Metric label="Inquiries" value="+18%" />
              <Metric label="Key paths checked" value="4/4" />
              <Metric label="Next fix" value="Queued" />
            </div>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-xs">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-forest">{value}</span>
    </div>
  );
}
