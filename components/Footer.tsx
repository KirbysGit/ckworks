"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Logo from "./ui/Logo";
import WhatsAppContactLink from "./WhatsAppContactLink";
import { trackEvent } from "@/lib/analytics";
import { contactEmail, contactLinkedInUrl } from "@/lib/data";
import { footerGroups } from "@/lib/navigation";

export default function Footer() {
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

      <div className="container-ck hidden gap-10 py-14 md:grid md:grid-cols-[minmax(14rem,0.75fr)_minmax(0,1.25fr)] lg:grid-cols-[minmax(14rem,0.85fr)_minmax(28rem,1.3fr)_minmax(18rem,0.9fr)] lg:py-16">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-7 max-w-xs text-base leading-8 text-muted">
            Clean websites and practical systems for growing businesses.
          </p>
        </div>

        <nav className="grid grid-cols-3 gap-8" aria-label="Footer">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm leading-6 text-ink/75 transition-colors hover:text-forest"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="md:col-span-2 md:justify-self-start lg:col-span-1 lg:justify-self-end">
          <div className="w-full min-w-[20rem] max-w-[24rem]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
              Connect
            </p>
            <a
              href={`mailto:${contactEmail}`}
              onClick={() =>
                trackEvent("email_clicked", {
                  location: "desktop_footer",
                })
              }
              className="mt-4 block text-base font-semibold text-forest transition-colors hover:text-ink"
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
