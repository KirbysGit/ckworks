"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { featuredCaseStudies, secondaryCaseStudies } from "@/lib/projects";
import { fadeUp, stagger, inView } from "@/lib/motion";

export default function WorkPreview() {
  return (
    <section id="work" className="relative overflow-hidden bg-ivory py-14 lg:py-20">
      <div className="container-ck relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="max-w-[80rem]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-forest">
            Selected Work
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
            A few things I&apos;ve built, designed, or helped bring into shape.
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {featuredCaseStudies.map((study) => (
            <motion.div key={study.slug} variants={fadeUp}>
              <ProjectCard study={study} variant="tile" />
            </motion.div>
          ))}
        </motion.div>

        {secondaryCaseStudies.length > 0 && (
          <div className="mt-14">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="max-w-[80rem]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
                More Things I&apos;ve Built
              </p>
              <h3 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
                More things I&apos;ve built
              </h3>
              <p className="mt-3 max-w-4xl text-base leading-7 text-muted sm:text-lg">
                A few extra builds, experiments, and systems that show the
                range of what I like working on.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {secondaryCaseStudies.map((study) => (
                <motion.div key={study.slug} variants={fadeUp}>
                  <ProjectCard study={study} variant="compact" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
