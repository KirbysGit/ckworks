# Agent Workflow

## Before Editing

1. Read `AGENTS.md` and the relevant document in `docs/`.
2. Inspect the target component, its parent, its data source, and the shared
   pattern it should reuse.
3. Check the worktree. Treat unrelated modified files as user work.
4. Decide whether the task is a copy, layout, component, data, route, asset,
   analytics, or discovery change.
5. For a visual request, identify the desktop and mobile behavior before coding.

## While Editing

- Make the smallest coherent change that solves the request.
- Keep a route as composition and move substantial new UI into a focused module.
- Reuse existing components before adding abstractions.
- Keep foundational files focused: global CSS is for shared rules, and shared
  components are not a home for feature-only behavior.
- Use local named tuning constants for a visual that needs iterative placement.
- Keep comments short, conversational, and useful to the next person adjusting
  a mockup.
- Explain a design concern when a requested detail would conflict with the
  established system, then implement the closest coherent version.

## Visual Review

- Check the intended desktop layout and a 390px mobile layout.
- Confirm headings, buttons, and tags do not collide or wrap awkwardly.
- Confirm important imagery is visible, has an appropriate crop, and does not
  block a primary action.
- Confirm expanded panels, menus, modals, carousels, and forms have sensible
  keyboard, focus, and mobile behavior.
- Check reduced-motion behavior when new movement is added.
- Confirm copy is specific, does not repeat itself, and makes no unsupported
  claim.

## Validation

- Run `npx tsc --noEmit --pretty false` after TypeScript changes when possible.
- Run configured lint and focused automated tests when they cover the changed
  behavior.
- During active visual development, do not run `npm run build` unless asked.
- Start or keep only the necessary dev server. Multiple local dev instances use
  additional CPU and memory.
- Report what changed, what was checked, and any remaining limitation.

## When To Extract

Extract a file or module when one of these becomes true:

- A file owns more than one unrelated visual, domain, or interaction concern.
- A route contains enough JSX that its composition is hard to see quickly.
- A shared stylesheet begins receiving page-specific rules.
- A large visual or interaction makes a page difficult to tune in isolation.
- A component is repeated with the same behavior in two meaningful places.

Do not extract only to reduce a line count. The new boundary should make
ownership clearer and future edits safer.

## Documentation Updates

Update `docs/decisions.md` when the change introduces a durable rule, such as a
new shared primitive, page composition pattern, public copy principle, asset
location, or analytics convention. Do not add a decision-log entry for a small
one-off spacing adjustment.

## Commits And Deployment

- Do not commit, push, change DNS, or deploy without a direct request.
- When asked to commit, inspect the diff first and include only the requested
  work plus directly required files.
- Do not stage unrelated user changes.
