# Static assets (`/public`)

Everything in this folder is served from the site root. A file at
`public/work/ironwood.jpg` is referenced in code as `/work/ironwood.jpg`
(never include `public` in the path).

## Folder layout

| Folder     | What goes here                                             | Example reference          |
| ---------- | --------------------------------------------------------- | -------------------------- |
| `work/`    | Project / case-study images & mockups                     | `/work/ironwood.jpg`       |
| `founder/` | Colin's portrait for the founder note                     | `/founder/colin.jpg`       |
| `brand/`   | Logo files, clover mark, favicon source                   | `/brand/logo.svg`          |
| `og/`      | Social share images (Open Graph / Twitter cards)          | `/og/default.jpg`          |

Root-level files like `favicon.ico` also live directly in `public/`.

## Suggested filenames (match the data in `lib/data.ts`)

- `work/ironwood.jpg`      — Ironwood Cabinetry
- `work/northbridge.jpg`   — Northbridge Wellness
- `work/ledger-lane.jpg`   — Ledger Lane
- `founder/colin.jpg`      — founder portrait
- `og/default.jpg`         — 1200×630 social preview

## Recommended formats & sizes

- **Photos / mockups:** `.webp` or `.jpg`, ~1600px wide max, compressed.
- **Logos / icons:** `.svg` (scales cleanly, tiny file size).
- **OG image:** exactly **1200×630 px**.
