import type { ReactNode } from "react";
import Breadcrumbs, { type BreadcrumbItem } from "./Breadcrumbs";

type PageHeroProps = {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  align?: "left" | "center";
};

export default function PageHero({
  label,
  title,
  description,
  breadcrumbs,
  align = "left",
}: PageHeroProps) {
  const isCentered = align === "center";

  return (
    <section className="border-b border-line/70 bg-ivory py-14 sm:py-16 lg:py-20">
      <div className="container-ck">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className={isCentered ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-forest">
            {label}
          </p>
          <h1 className="mt-5 font-serif text-[3rem] font-semibold leading-[1.03] tracking-[-0.025em] text-ink sm:text-[3.35rem] lg:text-[4.35rem]">
            {title}
          </h1>
          {description && (
            <p
              className={`mt-5 text-base leading-7 text-muted sm:text-lg ${
                isCentered ? "mx-auto max-w-2xl" : "max-w-2xl"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
