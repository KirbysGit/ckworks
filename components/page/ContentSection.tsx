import type { ReactNode } from "react";
import SectionHeading from "./SectionHeading";

type ContentSectionProps = {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export default function ContentSection({
  label,
  title,
  description,
  children,
  className = "",
}: ContentSectionProps) {
  return (
    <section className={`border-t border-line/70 py-12 ${className}`}>
      <div className="container-ck">
        <SectionHeading label={label} title={title} description={description} />
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
