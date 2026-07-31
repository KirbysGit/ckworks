"use client";

import type { ReactNode } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { trackEvent } from "@/lib/analytics";
import { contactPhoneDisplay, contactWhatsAppUrl } from "@/lib/data";

type WhatsAppContactLinkProps = {
  children?: ReactNode;
  className?: string;
  iconClassName?: string;
  location: string;
};

export default function WhatsAppContactLink({
  children = "WhatsApp",
  className = "",
  iconClassName = "h-4 w-4",
  location,
}: WhatsAppContactLinkProps) {
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
      <FaWhatsapp className={iconClassName} />
      {children}
    </a>
  );
}
