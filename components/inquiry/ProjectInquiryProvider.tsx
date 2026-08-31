"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ProjectInquiryModal from "./ProjectInquiryModal";
import type { InquiryIntent } from "@/lib/inquiry";
import type { ServiceSlug } from "@/lib/services";
import { trackEvent } from "@/lib/analytics";

type InquiryContextValue = {
  openInquiry: (
    source?: string,
    opener?: HTMLElement | null,
    service?: ServiceSlug,
    intent?: InquiryIntent,
  ) => void;
  closeInquiry: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function ProjectInquiryProvider({ children }: { children: ReactNode }) {
  const openerRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>();
  const [service, setService] = useState<ServiceSlug | undefined>();
  const [intent, setIntent] = useState<InquiryIntent | undefined>();
  const [debugSuccess, setDebugSuccess] = useState(false);

  const openInquiry = useCallback(
    (
      nextSource?: string,
      opener?: HTMLElement | null,
      nextService?: ServiceSlug,
      nextIntent?: InquiryIntent,
    ) => {
      openerRef.current = opener ?? null;
      setDebugSuccess(false);
      setSource(nextSource);
      setService(nextService);
      setIntent(nextIntent);
      trackEvent("project_inquiry_opened", {
        source: nextSource ?? "unknown",
        service: nextService ?? "not_provided",
        intent: nextIntent ?? "not_provided",
      });
      setIsOpen(true);
    },
    [],
  );

  const closeInquiry = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => {
      openerRef.current?.focus();
      openerRef.current = null;
    }, 220);
  }, []);

  // Dev helper: visit /?inquirySuccess=1 to preview the completion screen
  // without submitting the form / sending email.
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("inquirySuccess") !== "1") return;

    setDebugSuccess(true);
    setSource("debug-success");
    setIsOpen(true);
  }, []);

  return (
    <InquiryContext.Provider value={{ openInquiry, closeInquiry }}>
      {children}
      <ProjectInquiryModal
        isOpen={isOpen}
        source={source}
        service={service}
        intent={intent}
        debugSuccess={debugSuccess}
        onClose={closeInquiry}
      />
    </InquiryContext.Provider>
  );
}

export function useProjectInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error(
      "useProjectInquiry must be used inside ProjectInquiryProvider",
    );
  }
  return context;
}
