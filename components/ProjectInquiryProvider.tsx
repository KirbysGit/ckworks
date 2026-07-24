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

type InquiryContextValue = {
  openInquiry: (source?: string, opener?: HTMLElement | null) => void;
  closeInquiry: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function ProjectInquiryProvider({ children }: { children: ReactNode }) {
  const openerRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>();
  const [debugSuccess, setDebugSuccess] = useState(false);

  const openInquiry = useCallback(
    (nextSource?: string, opener?: HTMLElement | null) => {
      openerRef.current = opener ?? null;
      setDebugSuccess(false);
      setSource(nextSource);
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
