"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionLabel from "./ui/SectionLabel";
import ProjectCard from "./ProjectCard";
import { featuredCaseStudies, secondaryCaseStudies } from "@/lib/projects";
import { fadeUp, stagger, inView } from "@/lib/motion";

export default function WorkPreview() {
  return (
    <section id="work" className="bg-sand py-20 lg:py-28">
      <div className="container-ck">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              A few things I&apos;ve built, designed, or helped bring into
              shape.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:text-ink"
          >
            View all work <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Featured case studies */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {featuredCaseStudies.map((study) => (
            <motion.div key={study.slug} variants={fadeUp}>
              <ProjectCard study={study} />
            </motion.div>
          ))}
        </motion.div>

        {/* More technical work */}
        {secondaryCaseStudies.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-14"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-muted"
            >
              More technical work
            </motion.p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {secondaryCaseStudies.map((study) => (
                <motion.div key={study.slug} variants={fadeUp}>
                  <ProjectCard study={study} variant="compact" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
