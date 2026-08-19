# Design System

## Design Intent

CK Works should feel like a capable independent studio: calm, clear, personal,
and technically grounded. The design favors editorial hierarchy, tactile
details, quiet depth, and simple paths to action.

It should not feel like a generic SaaS dashboard, an oversized agency landing
page, or a template crowded with decorative cards.

## Core Tokens

Use the named Tailwind tokens from `tailwind.config.ts`.

| Token | Value | Role |
| --- | --- | --- |
| `ivory` | `#FAF7F0` | Primary page background |
| `sand` | `#F7F3EA` | Soft alternate surfaces |
| `card` | `#FFFDF8` | Framed cards and papers |
| `ink` | `#1F2420` | Primary text |
| `muted` | `#5F665F` | Supporting text |
| `forest` | `#2F5B3F` | Actions, accents, indicators |
| `forest-soft` | `#DDE8D8` | Low-emphasis green surface |
| `line` | `#DDD6C8` | Borders and dividers |
| `panel` | `#111714` | Rare near-black surface; one use site-wide |

The site is intentionally light-only. Do not add `dark:` variants or a dark
theme to a component unless that becomes an explicit product decision.

One exception exists today: `components/ui/Logo.tsx` uses `dark:hidden` and
`dark:block` to swap between the ink and ivory wordmarks. It predates this rule
and is scoped to the logo asset. Do not treat it as precedent for theming other
components, and do not "fix" it as a side effect of unrelated work.

## Typography

- `font-serif` is Cormorant Garamond. Use it for page headings, section
  headings, thoughtful pull quotes, and a limited number of card titles.
- `font-sans` is Inter. Use it for body copy, labels, navigation, buttons,
  metadata, forms, and interface text.
- `font-display` and `font-source-serif-display` are special-use fonts for
  chapter numerals or intentional editorial details. Use sparingly.
- Headings establish hierarchy through size, line height, and whitespace, not
  excessive font weight.
- Body copy should stay direct and easy to scan. Prefer a short paragraph to a
  stacked wall of marketing language.

## Layout

- Use `.container-ck` for the normal full-page content boundary. It has a
  `1360px` maximum width with responsive side padding.
- Favor a clear left-to-right reading order.
- Common desktop content splits use a calm `0.9fr / 1.35fr` relationship when
  the left side introduces and the right side demonstrates.
- A page band is normally separated by a simple `border-line` rule and
  intentional vertical padding, not a floating outer card.
- Use a constrained measure for paragraph copy even when the visual extends
  wider.

## Components And Surfaces

- Use `Button` for primary actions and the established outlined action pattern
  for secondary actions.
- Use `SectionLabel` and `SectionHeader` for standard section introductions.
- Use `FAQSection` for public FAQs rather than building another accordion.
- Use `ContactCTA` for standard bottom-of-page calls to action. Project-specific
  CTAs may have their own layout when the page needs a stronger visual finish.
- Cards should have a purpose: repeated work, a framed tool, a paper note, a
  modal, or a discrete demo. Avoid card-inside-card compositions.
- Keep borders subtle. Shadows should create a small amount of depth, not a
  floating-dashboard effect.

### Facts, Pills, And Section Labels

Patterns established on the case study pages. Reuse them before inventing
another way to present the same shape of information.

- **A list renders as pills, never as a comma run.** Stack and contribution
  chips in a text grid cell wrapped mid-phrase and read as cramped prose. Two
  pill styles: `bg-forest-soft/70` with forest text for contributions, and
  `border-line bg-card` with muted ink for neutral facts such as a tech stack.
- **Single-value facts stay in a grid**, each with a small forest circle icon,
  an uppercase micro label, and the value beneath.
- **Group related facts in one card with divided tiers** rather than nesting
  cards. The case study facts card runs meta grid, then contributions, then
  stack, separated by `border-line/70`.
- **A repeated section label is an icon in a `bg-forest-soft` circle plus
  uppercase forest text.** When a page stacks many prose sections, give each a
  distinct icon — otherwise the page reads as one undifferentiated document.

## Visual Assets And Mockups

- Use `next/image` for raster images and give it accurate `sizes` values.
- Keep production assets in `public/images/<feature>/<type>/`.
- Use actual product, project, or client-relevant visuals instead of generic
  stock imagery when an image represents real work.
- Reuse established mockups before creating a near-duplicate. Laptop and phone
  shells live in `components/ui/DeviceFrame.tsx`; reach for those first. The
  homepage phone frame remains the visual reference the shells are drawn from.
- Browser frames, phones, and laptops need physical logic: sensible aspect
  ratios, clear edge layering, restrained highlights, and no clipped status UI.
- Demo content should be visibly illustrative when it is not a client project.

### Sizing A Mockup

Two failures show up repeatedly. Both are silent — the page looks fine at the
width you designed at and degrades somewhere else.

**Give a device its aspect ratio, never a fixed height.** A phone whose height
comes from `min-h` keeps that height as its column narrows and flattens into a
squat rectangle. Set `aspect-[9/18.5]` on the screen and let width drive it.

**Size the contents in container units, not `rem`.** A mockup is a whole page
shrunk into a frame, so its type has to scale with the frame. Mark the screen
`[container-type:inline-size]` and size type, padding, and radii in `cqw`. Fixed
type that reads correctly in a 430px lid will swamp the same lid at 145px. This
also applies to frame details: the phone notch's flanking corner curves are
drawn with fixed-pixel box shadows, so `DeviceFrame` omits them at `size="sm"`.

**A third trap, on `next/image` `sizes`.** When `object-cover` puts a landscape
source into a cell taller than it is wide, the image is scaled to cover the
*height*. `sizes` must describe the source width that requires, not the cell's
own width — otherwise the browser picks a variant that lands visibly upscaled.
Verify by comparing `naturalWidth` against the rendered box rather than trusting
the number.

## Responsive Behavior

- Desktop and mobile are related designs, not the same layout at different
  widths.
- Preserve rich desktop split layouts through medium screens when space allows.
  Recompose at phone widths rather than shrinking everything into a narrow row.
- Mobile prioritizes a readable hierarchy, one clear visual at a time, generous
  touch targets, and intentional center or left alignment based on the section.
- Prevent title fragments such as "show up" from breaking across lines when the
  phrase needs to read together.
- Check 390px mobile and a normal desktop viewport for every meaningful public
  layout change.

## Motion

- Motion should clarify sequence, state, or cause and effect.
- Keep most transitions within roughly 200-600ms and use calm easing.
- Animate `transform` and `opacity`. Avoid animating layout properties such as
  height, width, top, or margin for entrances; they cost layout work and cause
  cumulative layout shift.
- Honor `prefers-reduced-motion` for every new animation.
- For complex visual demos, place tuning constants next to the component so an
  agent can adjust position, scale, timing, and overlap without hunting through
  JSX.

### The Rendering Rule

This is a correctness constraint, not a style preference.

**Above the fold, use CSS animation.** CSS animations run at first paint, so
content is never waiting on hydration. A visitor on a slow device sees the
page immediately.

**Below the fold, use `Reveal`.** `components/ui/Reveal.tsx` renders children
with no hiding class, then after mount hides only elements still off-screen and
restores them through an IntersectionObserver. It stays visible when reduced
motion is set, when IntersectionObserver is unavailable, and when the element
was already on screen or scrolled past at mount.

**Never gate content on hydration.** Do not use the Framer Motion
`initial={{ opacity: 0 }}` plus `whileInView` pattern for meaningful page
content. Server-rendered HTML must be readable with JavaScript disabled — for
slow devices, failed script loads, and crawlers alike. Verify by confirming
`ck-reveal` does not appear in the server HTML response.

Framer Motion remains appropriate for orchestrated, interaction-driven, or
decorative sequences that enhance already-visible content.

### Entrance Primitives

Defined in `app/globals.css`. All are disabled under `prefers-reduced-motion`.

| Class | Motion | Typical use |
| --- | --- | --- |
| `ck-rise` | Fade up 16px, 500ms | Headings, copy, stacked text |
| `ck-fade` | Opacity only, 420ms | Secondary chrome and labels |
| `ck-lift` | Fade up 22px, 620ms | Device frames and larger cards |
| `ck-resolve` | Blur 7px into focus, 680ms | A screen or result settling into view |
| `ck-pop` | Scale 0.86 to 1, 460ms | Buttons and small badges |
| `ck-step` | Fade up 6px, 420ms | One item in a sequence — a chain of icons |
| `ck-draw-x` | `scaleX` 0 to 1 from the left, 550ms | Rules, connectors, flow lines |
| `ck-draw-elbow` | `clip-path` across, then down, 820ms | An elbow connector drawing itself |
| `ck-draw-arc` | `stroke-dasharray` 0 to its own value, 700ms | SVG donut segments |
| `ck-loadbar` | Sweep left to right, then fade, 920ms | Browser progress bar |
| `ck-boot-screen` | Hold opaque, then fade, 1000ms | White splash over a loading screen |
| `ck-boot-spin` | One 360° turn, 700ms | Clover (or mark) inside a boot splash |
| `ck-skeleton` | Fade in, hold, fade out, 900ms | Placeholder shown while "loading" |
| `ck-skeleton-block` | Looping shimmer sweep | Individual skeleton bars |

`ck-resolve`, `ck-loadbar`, `ck-boot-screen`, `ck-boot-spin`, `ck-skeleton`, `ck-step`, `ck-draw-x`,
`ck-draw-elbow`, and `ck-draw-arc` take their delay from a `--ck-anim-delay`
custom property rather than `animationDelay`, because they set
`animation-delay` themselves. The others take a plain `animationDelay`.
`lib/motion.ts` exports `animDelay(ms)` for the former group.

`ck-draw-elbow` is for the one shape a transform cannot animate: a box showing
only its top and right borders, so the line runs across and then turns down.
A border cannot be drawn progressively, and the element's position comes from
its own edges, so it clips instead — full width as a thin strip first, then the
strip's bottom edge drops to reveal the vertical run. Set `--ck-elbow-strip` to
at least the border's *rendered* width and err high: browsers round sub-pixel
border widths down, and a strip that is too small clips the horizontal stroke
visibly. Above-the-fold only, like `ck-draw-arc`.

Sequence with a named timing constant near the component (for example
`webDesignHeroTiming` or `searchVisibilityHeroTiming`) rather than scattering
literal delays.

`ck-loadbar` and `ck-boot-screen` start at `opacity: 0` so they stay hidden if
the animation never runs. Keep that pattern for any primitive whose resting
state should be invisible.

An element carrying `ck-resolve` or a long delay may be the LCP element. Keep
its reveal early and mark the underlying image `priority`.

### Combining Primitives With `Reveal`

These two systems do not compose the way you might expect. `Reveal` is a CSS
**transition** on a wrapper — a single fade plus a 16px translate — so it can
stagger siblings but cannot drive multi-step motion. The `ck-*` primitives are
CSS **animations** that start at first paint, so one placed inside a `Reveal`
runs and finishes while the section is still off-screen.

Two rules follow:

- Inside a `Reveal`, use a **reveal-aware primitive** (below) or `Reveal`
  itself. A plain primitive nested in a `Reveal` will have finished before the
  reader ever sees it.
- Never put a transform-animating primitive on an element that already carries
  its own `transform` for layout. The animation ends at `transform: none` and
  silently discards the offset. Put the entrance on a wrapper, or move the
  layout transform to an inner element.
- **This applies to hover transforms too, and permanently.** Every primitive
  runs with `both` fill, so after it finishes the element *keeps*
  `transform: none` — and an animation's filled value outranks a normal
  declaration in the cascade. An element carrying an entrance will therefore
  ignore `hover:-translate-y-*` forever, not just during the animation. When a
  card needs an entrance, a resting tilt, and a hover lift, that is three
  transforms and needs two elements: the outer one owns the entrance, the inner
  one owns tilt plus hover. Tailwind composes tilt and hover safely because they
  are separate custom properties (`--tw-rotate`, `--tw-translate-y`). The hero
  folders in `app/work/page.tsx` are the reference implementation.

### Where To Put A `Reveal`

Wrap the **container**, not each item, whenever the children depend on being
siblings. `Reveal` renders a real wrapper element, so one per item silently
breaks `first:`, `last:`, `space-y-*`, and any negative-margin overlap — the
featured stack in `app/work/page.tsx` uses `-mt-5 ... first:mt-0`, and per-card
wrappers collapse it. Per-item `Reveal` with a `delay` stagger is for
independent items in a plain grid or list.

`Reveal` also takes no `style` prop; it spends that slot on its own
`transitionDelay`. An item that needs an inline style must keep it on an inner
element.

Verify any new entrance work with the check in **The Rendering Rule**: fetch the
page and confirm `ck-reveal` is absent from the server HTML.

### Reveal-Aware Primitives

`ck-step` and `ck-draw-x` are reveal-aware. Each is defined three times:

```css
.ck-step                    /* runs on load  — above the fold        */
.ck-reveal .ck-step         /* held at start — off-screen, waiting   */
.ck-reveal.is-in .ck-step   /* runs now      — scrolled into view    */
```

This is what makes a below-the-fold sequence practical: wrap the whole diagram
in **one** `Reveal`, then give each moving part its own `--ck-anim-delay`. The
observer fires once and every delay is measured from that moment, instead of
nesting a `Reveal` around every icon and line.

Two constraints when adding another one:

- **Every held state needs a matching `prefers-reduced-motion` reset.** The
  held rule is what the element falls back to when the animation is cancelled,
  so without a reset it stays stuck in its "before" state — invisible, or
  undrawn.
- **Do not hold a property the element also sets as an SVG presentation
  attribute.** CSS wins over presentation attributes, so the held value cannot
  be cleared by turning the animation off. `ck-draw-arc` is deliberately *not*
  reveal-aware for this reason: holding it needs `stroke-dasharray` in CSS,
  which would strand the arc undrawn under reduced motion.

### Sequencing A Flow

When a visual is a flow — a chain of steps, a diagram with connectors — animate
it in the order the work happens rather than all at once. Two are in use:

- `SystemsWorkflowChain` traces each row icon → arrow → icon → arrow, so the
  chain draws itself left to right.
- `SystemsToolGrid` runs top to bottom: input cards, lines into the hub, the
  hub, lines back out, output cards.

Keep the delays in a named timing constant beside the component
(`systemsWorkflowTiming`, `systemsFlowTiming`) so the rhythm is tunable in one
place. Restraint matters more than coverage: one sequenced diagram per screenful
reads as intent, several at once reads as noise.

## Accessibility

- Start with semantic HTML and native controls before creating custom behavior.
- Keep heading levels meaningful and labels visible where a visitor needs them.
- Interactive elements need keyboard support, a visible focus state, and an
  accessible name that explains the action.
- Modal dialogs need sensible initial focus, focus containment, Escape support,
  and a clear close control.
- Maintain readable contrast for body text, borders, form states, and disabled
  states. Do not rely on color alone to communicate success, error, or status.
- Treat `prefers-reduced-motion` as a required state, not an afterthought.

## Performance Guardrails

- Avoid large source images when the rendered visual is small. Resize and use
  WebP or AVIF for photographic assets when practical.
- Use `next/image` and accurate `sizes` to avoid unnecessary image work.
- Keep global CSS global. Feature styling stays with its component so unrelated
  pages do not inherit a growing collection of one-off rules.
- Defer interaction-heavy client code, such as a modal or complex carousel,
  only when it is not needed for the first meaningful view.

## Reference Images

Use a reference image to understand its hierarchy, density, rhythm, and object
relationships. Do not copy literal content or import a competing visual system.
When a reference and the existing CK Works language disagree, preserve the
existing system and borrow the useful structural idea.
