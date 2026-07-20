"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
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

  const openInquiry = useCallback(
    (nextSource?: string, opener?: HTMLElement | null) => {
      openerRef.current = opener ?? null;
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

  return (
    <InquiryContext.Provider value={{ openInquiry, closeInquiry }}>
      {children}
      <ProjectInquiryModal
        isOpen={isOpen}
        source={source}
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
