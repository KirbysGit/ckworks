import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
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
        <section className="container-ck pb-12 pt-10 lg:pt-14">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-forest"
          >
            <ArrowLeft className="h-4 w-4" /> Selected work
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

            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex flex-col gap-1 rounded-xl border border-line bg-card px-4 py-3 text-sm shadow-soft transition-colors duration-200 hover:border-forest/40 hover:bg-forest-soft/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-muted">Live project</span>
                <span className="inline-flex items-center gap-2 break-all font-medium text-forest">
                  {study.liveUrl}
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </span>
              </a>
            )}
          </div>

          <div
            className={`relative mx-auto mt-10 aspect-[16/8] w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-gradient-to-br shadow-soft ${study.accent}`}
          >
            {study.coverImage ? (
              <Image
                src={study.coverImage.src}
                alt={study.coverImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-contain"
                style={{ objectPosition: study.coverImage.position ?? "center" }}
              />
            ) : (
              <>
                <div className="grid-texture absolute inset-0 opacity-25" />
                <p className="absolute bottom-4 right-5 text-xs text-ivory/70">
                  Screenshot coming soon
                </p>
              </>
            )}
          </div>
        </section>

        <article className="container-ck pb-16">
          <div className="mx-auto max-w-3xl">
            <Section label="The short version" paragraphs={study.shortVersion} />
            <Section label="The problem" paragraphs={study.problem} />

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
          </div>

          <ProjectPageCta />
        </article>
      </main>
      <Footer />
    </>
  );
}

function ProjectPageCta() {
  return (
    <section className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-line bg-card px-6 py-8 shadow-soft sm:px-8 lg:px-10 lg:py-10">
      <div className="grid items-center gap-6 sm:grid-cols-[7.5rem_1fr] sm:gap-8">
        <div className="flex justify-center sm:justify-start">
          <Image
            src="/images/cta/svg/sticky-note-cta.svg"
            alt=""
            width={220}
            height={220}
            className="h-auto w-28 rotate-[-3deg] drop-shadow-[0_18px_18px_rgba(31,36,32,0.16)] sm:w-32"
            aria-hidden="true"
          />
        </div>

        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
            Let&apos;s Talk
          </p>
          <h2 className="mt-3 font-serif text-2xl font-medium leading-tight text-ink sm:text-3xl">
            Want something like this for your business?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Whether it&apos;s a website, a system, or an idea that still feels a
            little messy, I can help you figure out what makes sense next.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-start">
            <Button href="/#contact" className="min-w-44">
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/#contact" variant="secondary" className="min-w-44">
              Send me a note
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
