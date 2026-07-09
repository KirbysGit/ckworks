import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { caseStudies, groups } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by CK Works — client sites, products, systems, and prototypes, written up as honest case studies.",
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main>
        <section className="container-ck py-16 lg:py-20">
          <SectionLabel>Selected Work</SectionLabel>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
            A few things I&apos;ve built, designed, or helped bring into shape.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            These aren&apos;t feature lists. Each one is a short breakdown of
            the problem, the decisions, and what I&apos;d do differently —
            because the thinking matters as much as the output.
          </p>
        </section>

        {groups.map((group) => {
          const items = caseStudies.filter((c) => c.group === group.id);
          if (items.length === 0) return null;

          return (
            <section key={group.id} className="container-ck pb-16 lg:pb-20">
              <div className="border-t border-line pt-10">
                <h2 className="font-serif text-3xl font-medium text-ink">
                  {group.title}
                </h2>
                <p className="mt-2 text-base text-muted">{group.blurb}</p>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {items.map((study) => (
                    <ProjectCard
                      key={study.slug}
                      study={study}
                      variant={study.featured ? "featured" : "compact"}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        <section className="container-ck pb-20 lg:pb-28">
          <div className="rounded-3xl border border-forest/20 bg-forest px-8 py-12 text-center shadow-lift">
            <h2 className="font-serif text-3xl font-medium text-ivory sm:text-4xl">
              Have a project like these in mind?
            </h2>
            <p className="mt-3 text-lg text-ivory/80">
              Let&apos;s talk about it.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/#contact" variant="secondary" className="border-transparent bg-card text-forest">
                Start a project <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
