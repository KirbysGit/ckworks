"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Logo from "../ui/Logo";
import WhatsAppContactLink from "../contact/WhatsAppContactLink";
import { trackEvent } from "@/lib/analytics";
import { contactEmail, contactLinkedInUrl } from "@/lib/data";
import { footerGroups } from "@/lib/navigation";

const footerLabelOverrides = new Map([
  ["/services/web-design-development", "Web Design"],
  ["/services/search-ai-visibility", "Search & AI"],
  ["/services/analytics-lead-tracking", "Analytics & Leads"],
  ["/services/digital-systems-integrations", "Systems & Integrations"],
  ["/services/ongoing-support", "Ongoing Support"],
  ["/privacy-policy", "Privacy"],
]);

const displayFooterGroups = footerGroups.map((group) => ({
  ...group,
  links: group.links.map((link) => ({
    ...link,
    label: footerLabelOverrides.get(link.href) ?? link.label,
  })),
}));

export default function Footer() {
  return (
    <footer className="border-t border-line/70 bg-[#E8EFE3] text-ink [color-scheme:only_light]">
      <div className="container-ck py-6 md:py-8 lg:py-10">
        <div className="flex flex-col items-center text-center md:hidden">
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
              className="text-sm font-semibold text-forest transition-colors hover:text-ink"
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
            className="mt-4 h-10 w-auto opacity-90"
          />
        </div>

        <div className="hidden md:block">
          <div className="grid items-start gap-x-8 gap-y-8 lg:grid-cols-[minmax(17rem,1.15fr)_minmax(12rem,0.95fr)_minmax(8rem,0.62fr)_minmax(6rem,0.5fr)_minmax(19rem,1.1fr)] xl:gap-x-12">
            <div className="max-w-sm">
              <Logo size="md" />
              <p className="mt-5 max-w-xs text-base leading-7 text-ink/78">
                Clean websites and practical systems for growing businesses.
              </p>
            </div>

            <nav
              className="grid gap-x-8 gap-y-8 sm:grid-cols-3 lg:contents"
              aria-label="Footer"
            >
              {displayFooterGroups.map((group) => (
                <FooterColumn key={group.title} title={group.title}>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="whitespace-nowrap text-[15px] leading-7 text-ink/80 transition-colors hover:text-forest"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </FooterColumn>
              ))}
            </nav>

            <FooterColumn title="Connect" className="sm:col-span-3 lg:col-auto">
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  onClick={() =>
                    trackEvent("email_clicked", {
                      location: "desktop_footer",
                    })
                  }
                  className="whitespace-nowrap text-base font-bold text-forest transition-colors hover:text-ink"
                >
                  {contactEmail}
                </a>
              </li>
              <li className="pt-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-base font-semibold text-forest">
                  <SocialLink
                    href={contactLinkedInUrl}
                    label="LinkedIn"
                    location="desktop_footer"
                  />
                  <span className="h-7 w-px bg-forest/20" aria-hidden />
                  <WhatsAppContactLink
                    location="desktop_footer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                    iconClassName="h-5 w-5"
                  >
                    <span>WhatsApp</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </WhatsAppContactLink>
                </div>
              </li>
            </FooterColumn>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-forest/20 pt-5">
            <p className="text-sm text-ink/75">
              &copy; {new Date().getFullYear()} CK Works. All rights reserved.
            </p>
            <Image
              src="/images/brand/svg/signature-initials.svg"
              alt=""
              width={1805}
              height={1397}
              className="h-10 w-auto opacity-95"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="text-xs font-bold uppercase tracking-[0.28em] text-forest">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
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
          : "inline-flex items-center gap-2 whitespace-nowrap transition-colors hover:text-ink"
      }
    >
      <FaLinkedin className={compact ? "h-3.5 w-3.5" : "h-5 w-5"} />
      <span>{label}</span>
      {!compact && <ArrowUpRight className="h-4 w-4" />}
    </a>
  );
}
