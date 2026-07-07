"use client";

import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import Button from "./ui/Button";
import { fadeUp, inView } from "@/lib/motion";

export default function CTA() {
  return (
    <section id="contact" className="container-ck py-20 lg:py-28">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="relative overflow-hidden rounded-3xl border border-forest/20 bg-forest px-8 py-16 text-center shadow-lift sm:px-16"
      >
        {/* soft green corner detail */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5" />
        <Leaf
          className="pointer-events-none absolute right-8 top-8 h-10 w-10 rotate-12 text-white/20"
          aria-hidden
        />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-serif text-4xl font-medium text-ivory sm:text-5xl">
            Ready to build something better?
          </h2>
          <p className="mt-4 text-lg text-ivory/80">
            Let&apos;s talk about your project and what&apos;s possible.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href="mailto:hello@ckworks.co"
              variant="secondary"
              className="border-transparent"
            >
              Start a project <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
