# CLAUDE.md

Claude Code entry point for this repository.

**The canonical instruction set is [`AGENTS.md`](AGENTS.md). Read it first and
follow it in full.** This file is a bridge, not a second rulebook — nothing here
overrides or restates `AGENTS.md`.

## Reading Order

1. [`AGENTS.md`](AGENTS.md) — operating rules for all agents
2. [`docs/README.md`](docs/README.md) — index and reading order for deeper context
3. The specific `docs/` file for the task at hand

## Quick Routing

| Task | Read |
| --- | --- |
| Current state, what is in flight | [`docs/BREAKDOWN.md`](docs/BREAKDOWN.md) |
| Structure, extraction, file ownership | [`docs/architecture.md`](docs/architecture.md) |
| Visuals, typography, motion, responsive | [`docs/design-system.md`](docs/design-system.md) |
| Public copy, metadata, schema, analytics | [`docs/content-discovery.md`](docs/content-discovery.md) |
| Search and answer-engine strategy | [`docs/seo-strategy.md`](docs/seo-strategy.md) |
| Fictional brands and people in demos | [`docs/demo-registry.md`](docs/demo-registry.md) |
| Real projects and what may be claimed | [`docs/project-registry.md`](docs/project-registry.md) |
| Known issues and next work | [`docs/backlog.md`](docs/backlog.md) |
| How to execute and review a task | [`docs/agent-workflow.md`](docs/agent-workflow.md) |
| Durable decisions not to reverse | [`docs/decisions.md`](docs/decisions.md) |
| Handing off a new task | [`.agents/brief-template.md`](.agents/brief-template.md) |

## Notes For Claude Code

- `AGENTS.md` is discovered natively by Codex. This file exists so Claude Code
  loads the same guidance. Keep the two in sync by editing `AGENTS.md` only.
- Verify claims against the repository before writing them into documentation or
  public copy. Do not record a suspicion as a confirmed fact.
- Do not run a production build, commit, or push unless Colin asks.
