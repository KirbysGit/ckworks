import ProjectCard from "@/components/ProjectCard";
import { getCaseStudy, type CaseStudy } from "@/lib/projects";

export default function RelatedProjects({ slugs }: { slugs: string[] }) {
  const projects = slugs
    .map((slug) => getCaseStudy(slug))
    .filter((project): project is CaseStudy => Boolean(project));

  if (projects.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} study={project} variant="compact" />
      ))}
    </div>
  );
}
