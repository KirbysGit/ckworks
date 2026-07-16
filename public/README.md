# Static assets (`/public`)

Everything in this folder is served from the site root. A file at
`public/images/hero/svg/demo-logo.svg` is referenced in code as
`/images/hero/svg/demo-logo.svg` (never include `public` in the path).

## Folder layout

Images live under `public/images/`, one folder per section of the site,
with a type subfolder (`svg/`, `png/`, `jpg/`) inside each — only the types
that section actually uses.

| Folder                       | What goes here                                    | Used by                  |
| ----------------------------- | -------------------------------------------------- | ------------------------- |
| `images/brand/svg/`           | Logo, wordmarks (light/dark), signatures, shared underline | `ui/Logo.tsx`, `Footer.tsx`, `FounderNote.tsx`, `Process.tsx` |
| `images/nav/svg/`              | Nav hover underline                                | `ui/DrawUnderline.tsx`     |
| `images/hero/svg/`, `png/`     | Hero mockup art (demo logo, postit, underline, photo) | `Hero.tsx`, `HeroMockup.tsx` |
| `images/transformation/svg/`, `png/` | Before/after board art, sticky notes, demo photo | `TransformationSection.tsx` |
| `images/process/svg/`          | Book background, chapter illustrations             | `Process.tsx`              |
| `images/founder/svg/`, `jpg/`  | Note drawing, portrait                             | `FounderNote.tsx`          |
| `images/cta/svg/`               | Left/right flanking art                            | `CTA.tsx`                   |
| `images/_unused/`               | Archived assets not currently referenced anywhere. Safe to delete once you're sure they won't come back — check with a repo-wide grep for the filename first. | — |

**A file used by more than one section** (e.g. the straight underline shared
by Process and Founder) lives in `brand/` rather than being duplicated —
`brand/` means "shared across sections," not strictly logo identity.

## Adding a new image

1. Drop it in the matching section folder (create one if it's a new section).
2. Reference it from the component as `/images/<section>/<type>/<name>.<ext>`.
3. If it's genuinely shared by 2+ sections, put it in `images/brand/` instead.

## Recommended formats & sizes

- **Photos / mockups:** `.jpg` or `.png`, ~1600px wide max, compressed.
- **Illustrations / logos / icons:** `.svg` — scales cleanly, tiny file size.
