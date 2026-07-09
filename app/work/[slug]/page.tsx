import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import { caseStudies, getCaseStudy } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.name,
    description: study.oneLiner,
  };
}

/** Small uppercase heading + prose paragraphs. Skips itself when empty. */
function Section({ label, paragraphs }: { label: string; paragraphs: string[] }) {
  if (paragraphs.length === 0) return null;
  return (
    <section className="border-t border-line/70 py-10">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
        {label}
      </h2>
      <div className="mt-5 space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-ink/85 sm:text-lg">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <Header />
      <main>
        {/* 1. Project hero */}
        <section className="container-ck pb-12 pt-10 lg:pt-14">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-forest"
          >
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>

          <div className="mx-auto mt-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
              {study.category}
            </p>
            <h1 className="mt-4 font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
              {study.name}
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-muted">
              {study.oneLiner}
            </p>

            {/* meta card */}
            <div className="mt-8 grid gap-6 rounded-2xl border border-line bg-card p-6 shadow-soft sm:grid-cols-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Role
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink">
                  {study.role}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Stack
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink">
                  {study.stack.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                  Status
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink">
                  {study.status}
                </p>
              </div>
            </div>
          </div>

          {/* large screenshot / mockup placeholder */}
          <div
            className={`relative mx-auto mt-10 aspect-[16/8] w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-gradient-to-br shadow-soft ${study.accent}`}
          >
            <div className="grid-texture absolute inset-0 opacity-25" />
            <p className="absolute bottom-4 right-5 text-xs text-ivory/70">
              Screenshot coming soon
            </p>
          </div>
        </section>

        {/* Article body */}
        <article className="container-ck pb-16">
          <div className="mx-auto max-w-3xl">
            {/* 2. The short version */}
            <Section label="The short version" paragraphs={study.shortVersion} />

            {/* 3. The problem */}
            <Section label="The problem" paragraphs={study.problem} />

            {/* 4. What I built — bullets, for clarity */}
            {study.built.length > 0 && (
              <section className="border-t border-line/70 py-10">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">
                  What I built
                </h2>
                <ul className="mt-5 space-y-3">
                  {study.built.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base leading-relaxed text-ink/85 sm:text-lg"
                    >
                      <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-soft">
                        <Check className="h-3 w-3 text-forest" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 5–9 */}
            <Section label="Design decisions" paragraphs={study.designDecisions} />
            <Section
              label="Technical decisions"
              paragraphs={study.technicalDecisions}
            />
            <Section label="Challenges" paragraphs={study.challenges} />
            <Section label="The outcome" paragraphs={study.outcome} />
            <Section
              label="What I'd improve next"
              paragraphs={study.improveNext}
            />

            {/* closing CTA */}
            <div className="mt-4 rounded-2xl border border-line bg-card p-8 text-center shadow-soft">
              <p className="font-serif text-2xl font-medium text-ink">
                Have a project like this in mind?
              </p>
              <p className="mt-2 text-muted">
                Let&apos;s talk about what&apos;s possible.
              </p>
              <div className="mt-5 flex justify-center">
                <Button href="/#contact">
                  Start a project <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
