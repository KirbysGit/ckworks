# Accessibility Audit — ckworks.studio

**Standard:** WCAG 2.1 Level AA
**Method:** Source review of `components/` and `app/`, plus computed contrast ratios (sRGB relative luminance, WCAG formula) against the palette in `tailwind.config.ts`.
**Date:** 2026-08-27
**Note:** Source review only. A live axe-core scan + manual screen reader pass (NVDA/VoiceOver) is still required before claiming conformance.

---

## Why this exists

We cannot sell WCAG 2.1 AA conformance from a site that does not meet it. Assume a
municipal buyer — or a competitor — runs axe on this domain before replying.

This file is also the template for client audit deliverables. Keep the format.

---

## Passing already

Worth recording so we do not "fix" these later:

- `<main>` landmark present (`components/layout/SiteLayout.tsx`)
- `lang="en"` set on `<html>` (`app/layout.tsx`)
- Inquiry modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, working
  focus trap on Tab, Escape to close, focus moved in on open
- `Reveal.tsx` checks `prefers-reduced-motion` and skips animation entirely
- `@media (prefers-reduced-motion: reduce)` block exists in `globals.css`
- Nav landmarks labelled (`aria-label="Primary"` / `"Mobile"`)
- Mobile menu button has `aria-label` + `aria-expanded`
- Honeypot field correctly `aria-hidden` with an associated label
- Base palette is genuinely good: `ink` 14.74:1, `forest` 7.30:1, `muted` 5.53:1 on `ivory` — all pass

The problems below are almost entirely **opacity modifiers applied to colors that
pass at full strength**. That is a systematic fix, not a redesign.

---

## Findings

### 1. Focus indicator is effectively invisible on form fields — SC 1.4.11, 2.4.7
**Severity: critical**

`components/inquiry/ProjectInquiryModal.tsx:54` and `:408`

```
outline-none ... focus:border-forest focus:ring-2 focus:ring-forest/15
```

`forest/15` composited on ivory = `#dce0d5` → **1.25:1**. Requires 3:1.
Native outline is removed and the replacement cannot be seen. A keyboard user
cannot tell which field they are in.

Inconsistent with the rest of the codebase — `ui/Button.tsx` and
`inquiry/ProjectInquiryTrigger.tsx` correctly use `focus-visible:ring-forest`
at full opacity (7.30:1).

**Fix:** ring `forest` at full opacity with `ring-offset-2 ring-offset-ivory`,
matching the Button pattern. Consider a global `:focus-visible` rule in
`globals.css` so this cannot regress per-component.

---

### 2. Placeholder text fails contrast — SC 1.4.3
**Severity: high**

| Location | Token | Composited | Ratio | Needs |
|---|---|---|---|---|
| `ProjectInquiryModal.tsx:54, :408` | `text-muted/60` | `#9da099` | **2.48:1** | 4.5:1 |
| `contact/ContactForm.tsx:39` | `text-muted/55` | `#a5a7a0` | **2.27:1** | 4.5:1 |
| `ProjectInquiryModal.tsx:~588` (unselected select label) | `text-muted/65` | `#959992` | **2.71:1** | 4.5:1 |

**Fix:** use `muted` at full opacity (5.53:1) for placeholders, or add a
dedicated `--placeholder` token that is tested. Do not rely on opacity.

---

### 3. Form field borders fail non-text contrast — SC 1.4.11
**Severity: high**

The border is the only thing identifying the input's boundary, so it must hit 3:1.

- `fieldBorder = "border-[#cfc5b5]"` → **1.59:1**
- `border-line` (`#DDD6C8`) → **1.35:1**
- `border-forest/35` → **1.77:1**, `border-forest/50` → **2.34:1**

**Fix:** darken the field border token specifically. Around `#8a8375` clears 3:1
on ivory while staying in the warm neutral family.

---

### 4. Services dropdown is unreachable by keyboard — SC 2.1.1, 1.4.13
**Severity: high**

`components/layout/Header.tsx` — the dropdown opens on `onMouseEnter` /
closes on `onMouseLeave` only. A keyboard user tabbing to "Services" sees a
`ChevronDown` promising a menu that will never open for them.

Partially mitigated: every service is reachable from `/services` and the footer.
The affordance is still a broken promise, and 1.4.13 requires hover/focus
content to be dismissible and persistent.

**Fix:** add `onFocus`/`onBlur` alongside the mouse handlers, Escape to dismiss,
and `aria-expanded` on the Services trigger.

---

### 5. Custom select has incomplete listbox semantics — SC 4.1.2
**Severity: medium**

`ProjectInquiryModal.tsx:~579-620` and the same pattern in `ContactForm.tsx:~440`.

`role="listbox"` whose options are `<button role="option">`. Present: ArrowDown to
open, Escape to close. Missing: ArrowUp, Home/End, `aria-activedescendant` or a
roving tabindex, `aria-controls` linking trigger to listbox.

Screen readers will announce these inconsistently.

**Fix (preferred):** replace with a native `<select>` styled to match. These are
short option lists with no search — the custom widget buys very little and costs
real correctness. If it stays, complete the APG combobox pattern.

---

### 6. No skip link — SC 2.4.1
**Severity: medium**

No "Skip to main content". With a sticky header carrying a 5-item nav plus a
5-item services dropdown, a keyboard user traverses the whole nav on every page.

**Fix:** add `id="main"` to `<main>` in `SiteLayout.tsx` and a first-child anchor
in `app/layout.tsx` that is visually hidden until focused.

---

### 7. `scroll-behavior: smooth` is unconditional — SC 2.3.3 (AAA) / best practice
**Severity: low**

`globals.css:18`. Set inside `@media (prefers-reduced-motion: no-preference)`
or override it in the existing reduce block at line 483.

---

## Fix order

1. Focus ring (#1) — smallest change, largest impact, blocks keyboard use
2. Placeholders + field borders (#2, #3) — token-level, fixes every instance at once
3. Skip link (#6) — ten minutes
4. Dropdown keyboard access (#4)
5. Select semantics (#5) — largest, do last, prefer native
6. Smooth scroll (#7)

## Before claiming conformance

- [ ] Live axe-core scan on every route
- [ ] Full keyboard-only pass, no mouse
- [ ] NVDA or VoiceOver pass on the inquiry modal and contact form
- [ ] 200% zoom and 320px reflow check (SC 1.4.10)
- [ ] Confirm every non-decorative image has meaningful alt text
