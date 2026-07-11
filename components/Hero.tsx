"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import HeroMockup from "./HeroMockup";
import { fadeUp, stagger } from "@/lib/motion";
import { trustChips } from "@/lib/data";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container-ck grid items-start gap-4 pb-16 pt-6 sm:pt-8 lg:grid-cols-[0.8fr_1fr] lg:gap-4 lg:pb-20 lg:pt-10">
        {/* Left: copy */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-2xl lg:pt-10"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-forest"
          >
            Web Design &amp; Digital Systems
          </motion.span>

          {/* Fixed 4-line break on sm+; below that the brs vanish and it wraps naturally */}
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-serif text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-[3.5rem]"
          >
            Websites and systems{" "}
            <br className="hidden sm:block" />
            that help your business{" "}
            <br className="hidden sm:block" />
            <em className="italic text-forest">show up</em> the way it{" "}
            <br className="hidden sm:block" />
            was{" "}
            <span className="relative inline-block">
              meant to
              <Image
                src="/svg/hero-underline.svg"
                alt=""
                width={3785}
                height={429}
                className="absolute -bottom-2 left-0 w-full sm:-bottom-3"
              />
            </span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[85%] text-lg leading-relaxed text-muted"
          >
            I help businesses clean up their websites, sharpen how they come
            across, and build the systems behind the scenes so everything feels
            easier to run.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="#contact">
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#what-i-do" variant="secondary">
              See what I do
            </Button>
          </motion.div>

          {/* three chips spanning the full column width */}
          <motion.ul
            variants={fadeUp}
            className="mt-9 grid gap-2.5 sm:grid-cols-3"
          >
            {trustChips.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm text-ink"
              >
                <Icon className="h-4 w-4 text-forest" />
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right: layered mockup. min-w-0 lets this column shrink below its
            content's natural width (the fr split can't be honored without
            it); floating cards overlap outward instead of blocking the grid. */}
        <div className="min-w-0">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
