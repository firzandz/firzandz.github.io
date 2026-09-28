# Portfolio editing guide

Firzan is a product designer. Explain changes in plain language and describe the visible outcome.

## Source of truth

Start with [README.md](./README.md) for the repository map and preview instructions. The root HTML files, `assets/`, and `design-system/` are the current portfolio. Keep `archive/v1/` as a historical reference and `portfolio-v2/` as compatibility redirects.

For visual changes, read [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md). Preserve approved tokens and reuse shared case-study styles. Define the target, requested change, preserved properties, reference, and completion criterion before making a visual revision.

The site uses plain HTML, CSS, and JavaScript with no build step. Make current homepage changes only in root `index.html`.

## Editing and verification

- Preserve existing uncommitted work.
- Scope edits to the user’s request and keep case-study claims grounded in supplied evidence.
- Use OpenKnowledge for in-scope Markdown edits when its project integration is active.
- After path changes, verify local links and images, old URL redirects, and homepage → case study → Back.
- For visual or interaction changes, check desktop and mobile, light and dark themes, keyboard use, and reduced motion.
- Run `git diff --check` before finishing.
- Report whether changes are local, pushed, or deployed.
