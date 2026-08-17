"use client";

import type { ReactNode } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { trackEvent } from "@/lib/analytics";
import { contactPhoneDisplay, contactWhatsAppUrl } from "@/lib/data";

type WhatsAppContactLinkProps = {
  children?: ReactNode;
  className?: string;
  iconClassName?: string;
  /** Forest circle behind the icon, matching the contact aside Mail treatment. */
  iconBadge?: boolean;
  location: string;
};

export default function WhatsAppContactLink({
  children = "WhatsApp",
  className = "",
  iconClassName = "h-4 w-4",
  iconBadge = false,
  location,
}: WhatsAppContactLinkProps) {
  const icon = (
    <FaWhatsapp
      className={`${iconClassName}${iconBadge ? " text-ivory" : ""}`}
    />
  );

  return (
    <a
      href={contactWhatsAppUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Message CK Works on WhatsApp at ${contactPhoneDisplay}`}
      title={`Message on WhatsApp: ${contactPhoneDisplay}`}
      onClick={() =>
        trackEvent("whatsapp_clicked", {
          location,
        })
      }
      className={className}
    >
      {iconBadge ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-ivory">
          {icon}
        </span>
      ) : (
        icon
      )}
      {children}
    </a>
  );
}
