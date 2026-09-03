# CK Works Documentation

These notes turn the site's established visual and engineering choices into a
shared working system for coding agents and future contributors.

## Reading Order

1. Start with [`../AGENTS.md`](../AGENTS.md) for the operating rules.
   [`../CLAUDE.md`](../CLAUDE.md) is a thin adapter that points to the same set.
2. Skim [BREAKDOWN.md](BREAKDOWN.md) for current state and active work.
3. Read [architecture.md](architecture.md) before restructuring code.
4. Read [design-system.md](design-system.md) before changing UI or motion.
5. Read [content-discovery.md](content-discovery.md) before updating public
   copy, metadata, schema, analytics, or discovery content.
6. Read [seo-strategy.md](seo-strategy.md) before search, AEO, or local
   positioning work.
7. Use [agent-workflow.md](agent-workflow.md) for task execution and review.
8. Check [decisions.md](decisions.md) for choices that should not be
   rediscovered or silently reversed.
9. Read [web-accessibility-service.md](web-accessibility-service.md) before
   planning or implementing the Web Accessibility service or its future Title
   II child page.

## Reference Files

- [BREAKDOWN.md](BREAKDOWN.md) - current project state and active work
- [backlog.md](backlog.md) - verified issues, investigations, and next work
- [demo-registry.md](demo-registry.md) - fictional brands, people, and demo data
- [project-registry.md](project-registry.md) - real builds and allowed claims
- [accessibility-audit.md](accessibility-audit.md) - the site's own WCAG audit,
  what is fixed, and what is still unverified
- [web-accessibility-service.md](web-accessibility-service.md) - approved
  service model, V1 page skeleton, future Title II split, and integration map

Before writing about a project, check `project-registry.md`. Before adding a
fictional business to a mockup, check `demo-registry.md` and reuse what is
already there.

## Keeping This Useful

These documents are decision tools, not a second copy of the codebase.

- Add a note when a choice will affect future pages or agents.
- Keep the language specific enough to guide implementation.
- Replace obsolete guidance instead of collecting conflicting rules.
- Put page-specific tuning near the component, not here.
