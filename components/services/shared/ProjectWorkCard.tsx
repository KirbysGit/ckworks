import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/projects";

/** Compact project card shared by the Analytics and Systems service pages. */
export default function ProjectWorkCard({ project }: { project: CaseStudy }) {
  return (
    <Link
      href={`/${project.slug}`}
      className="group flex overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/30 hover:shadow-lift"
    >
      <div className="relative min-h-[10.5rem] w-[38%] shrink-0 overflow-hidden bg-sand">
        {project.coverImage ? (
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            sizes="(min-width: 640px) 22vw, 40vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <TableMock />
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6">
        <h3 className="font-serif text-[1.4rem] font-medium leading-tight text-ink">
          {project.name}
        </h3>
        <p className="mt-1 text-[0.72rem] font-medium text-muted">
          {project.category}
        </p>
        <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-muted">
          {project.teaser}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest">
          View project
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function TableMock() {
  return (
    <div className="absolute inset-0 flex flex-col gap-1.5 bg-[#f3f0e8] p-3">
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-forest/60" />
        <span className="h-1 w-10 rounded-full bg-ink/25" />
        <span className="ml-auto h-1 w-6 rounded-full bg-ink/15" />
      </div>
      <div className="mt-1 flex-1 space-y-1.5 rounded-md border border-ink/10 bg-card/70 p-2">
        {[0, 1, 2, 3, 4].map((row) => (
          <div key={row} className="flex items-center gap-1.5">
            <span className="h-1 w-1/3 rounded-full bg-ink/20" />
            <span className="h-1 w-1/4 rounded-full bg-ink/12" />
            <span className="ml-auto h-1 w-6 rounded-full bg-forest/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
