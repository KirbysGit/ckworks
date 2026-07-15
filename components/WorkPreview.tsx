"use client";

import { motion } from "framer-motion";
import SectionHeader from "./ui/SectionHeader";
import ProjectCard from "./ProjectCard";
import { featuredCaseStudies, secondaryCaseStudies } from "@/lib/projects";
import { fadeUp, stagger, inView } from "@/lib/motion";

export default function WorkPreview() {
  return (
    <section id="work" className="bg-sand py-14 lg:py-20">
      <div className="container-ck">
        <SectionHeader
          label="Selected Work"
          title="A few things I've built, designed, or helped bring into shape."
        />

        {/* Featured case studies */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredCaseStudies.map((study) => (
            <motion.div key={study.slug} variants={fadeUp}>
              <ProjectCard study={study} variant="tile" />
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
