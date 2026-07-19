"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "./ui/Logo";
import DrawUnderline from "./ui/DrawUnderline";
import { footerLinks, contactEmail } from "@/lib/data";

export default function Footer() {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <footer className="border-t border-line bg-[#E8EFE3]">
      <div className="container-ck grid gap-10 py-14 md:grid-cols-[1fr_auto_1fr] md:items-start">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Clean websites and practical systems for growing businesses.
          </p>
        </div>

        <nav
          className="flex items-center justify-center self-center"
          aria-label="Footer"
        >
          {footerLinks.map((link) => {
            const isHovered = hoveredHref === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredHref(link.href)}
                onMouseLeave={() => setHoveredHref(null)}
                className="border-r border-line/80 px-5 py-1 font-sans text-sm text-muted transition-colors last:border-r-0 hover:text-ink"
              >
                <span className="relative inline-block">
                  {link.label}
                  <DrawUnderline
                    show={isHovered}
                    className="pointer-events-none absolute -bottom-2 left-1/2 block h-[7px] w-[125%] -translate-x-1/2 overflow-hidden"
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="text-sm md:justify-self-end">
          <p className="text-muted">Say hello</p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-1 inline-block font-medium text-forest hover:text-ink"
          >
            {contactEmail}
          </a>
          <Image
            src="/images/brand/svg/signature-initials.svg"
            alt=""
            width={1805}
            height={1397}
            className="mt-4 h-12 w-auto"
          />
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="container-ck py-6 text-center text-xs text-muted">
          <p>© {new Date().getFullYear()} CK Works. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
