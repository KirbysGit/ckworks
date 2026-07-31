"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Logo from "./ui/Logo";
import DrawUnderline from "./ui/DrawUnderline";
import WhatsAppContactLink from "./WhatsAppContactLink";
import { trackEvent } from "@/lib/analytics";
import { contactEmail, contactLinkedInUrl, footerLinks } from "@/lib/data";

export default function Footer() {
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  return (
    <footer className="border-t border-line bg-[#E8EFE3]">
      <div className="container-ck flex flex-col items-center py-6 text-center md:hidden">
        <Logo size="md" />
        <p className="mt-4 max-w-[18rem] text-sm leading-6 text-ink/70">
          Clean websites and practical systems, built with care.
        </p>
        <div className="mt-4 flex flex-col items-center gap-3">
          <a
            href={`mailto:${contactEmail}`}
            onClick={() =>
              trackEvent("email_clicked", {
                location: "mobile_footer",
              })
            }
            className="text-sm font-medium text-forest hover:text-ink"
          >
            {contactEmail}
          </a>
          <div className="flex items-center gap-2">
            <SocialLink
              href={contactLinkedInUrl}
              label="LinkedIn"
              location="mobile_footer"
              compact
            />
            <WhatsAppContactLink
              location="mobile_footer"
              className="inline-flex items-center gap-1.5 rounded-full bg-ivory/60 px-3 py-1.5 text-xs font-semibold text-forest shadow-[0_1px_0_rgba(47,91,63,0.12)] transition-colors hover:text-ink"
              iconClassName="h-3.5 w-3.5"
            >
              WhatsApp
            </WhatsAppContactLink>
          </div>
        </div>
        <Image
          src="/images/brand/svg/signature-full.svg"
          alt=""
          width={1805}
          height={1397}
          className="mt-4 h-12 w-auto opacity-90"
        />
        <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-forest/75">
          CK Works
        </p>
      </div>

      <div className="container-ck hidden gap-12 py-14 md:grid md:grid-cols-[minmax(16rem,1fr)_auto_minmax(18rem,1fr)] md:items-center lg:py-16">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-7 max-w-xs text-base leading-8 text-muted">
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
                className="border-r border-forest/20 px-6 py-2 font-sans text-base text-ink/80 transition-colors last:border-r-0 hover:text-forest"
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

        <div className="md:justify-self-end">
          <div className="w-full min-w-[20rem] max-w-[24rem]">
            <a
              href={`mailto:${contactEmail}`}
              onClick={() =>
                trackEvent("email_clicked", {
                  location: "desktop_footer",
                })
              }
              className="block text-base font-semibold text-forest transition-colors hover:text-ink"
            >
              {contactEmail}
            </a>
            <div className="mt-8 flex items-center gap-5 text-base font-semibold text-forest">
              <SocialLink
                href={contactLinkedInUrl}
                label="LinkedIn"
                location="desktop_footer"
              />
              <span className="h-6 w-px bg-forest/20" aria-hidden />
              <WhatsAppContactLink
                location="desktop_footer"
                className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                iconClassName="h-5 w-5"
              >
                <span>WhatsApp</span>
                <ArrowUpRight className="h-4 w-4" />
              </WhatsAppContactLink>
            </div>
            <div className="mt-5 border-t border-forest/20 pt-4">
              <Image
                src="/images/brand/svg/signature-initials.svg"
                alt=""
                width={1805}
                height={1397}
                className="mx-auto h-12 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="container-ck py-5 text-center text-xs text-muted md:py-6">
          <p>© {new Date().getFullYear()} CK Works. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  location,
  compact = false,
}: {
  href: string;
  label: string;
  location: string;
  compact?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open CK Works on ${label}`}
      onClick={() =>
        trackEvent("linkedin_clicked", {
          location,
        })
      }
      className={
        compact
          ? "inline-flex items-center gap-1.5 rounded-full bg-ivory/60 px-3 py-1.5 text-xs font-semibold text-forest shadow-[0_1px_0_rgba(47,91,63,0.12)] transition-colors hover:text-ink"
          : "inline-flex items-center gap-2 transition-colors hover:text-ink"
      }
    >
      <FaLinkedin className={compact ? "h-3.5 w-3.5" : "h-5 w-5"} />
      <span>{label}</span>
      {!compact && <ArrowUpRight className="h-4 w-4" />}
    </a>
  );
}
