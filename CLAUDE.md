# CLAUDE.md

This file provides guidance for AI assistants working in this repository.

## About the Owner

**Firzan is a product designer with no coding background.** When making changes or explaining anything technical:

- **Explain every change in plain language** — what it does and why, not just what it is.
- **Break changes into small steps** — one thing at a time, not several things at once.
- **Avoid jargon** — if a technical term is necessary, briefly define it in parentheses.
- **Describe the visual outcome** — e.g. "this will make the button move up by 8 pixels" rather than "margin-top: -8px".
- **Confirm before touching multiple files** — ask before making changes that span more than one file.

## Project Overview

This is a personal portfolio website for **Firzan** (Firzandi Aulia), a Product Designer with 8+ years of experience in fintech and banking. The site is hosted on GitHub Pages at `firzandz.github.io`.

**Stack**: Pure vanilla HTML5 + CSS3. No JavaScript, no build tools, no package manager, no CSS preprocessor.

## Repository Structure

```
firzandz.github.io/
├── index.html              # Main portfolio page (markup only)
├── README.md               # Project notes
├── CLAUDE.md               # This file
└── assets/
    ├── css/
    │   └── style.css       # All shared styles (linked from every page)
    ├── evaluate-icon.svg
    ├── explore-icon.svg
    ├── problem-icon.svg
    ├── thumb-bridex.png    # 2400×1500px project thumbnail
    └── thumb-ovo.png       # 2400×1500px project thumbnail
```

### Adding a new page (e.g. a case study)

Create a new `.html` file at the repo root and link the shared stylesheet:

```html
<link rel="stylesheet" href="assets/css/style.css" />
```

Page-specific styles that don't belong in the shared stylesheet can go in a `<style>` block within that page's `<head>`.

## Development Workflow

There is no build step. The workflow is:

1. Edit files directly (`index.html`, `assets/css/style.css`, or any new page)
2. Open the file in a browser to preview (no server needed)
3. Commit and push to deploy via GitHub Pages

**No commands to run.** There are no `npm install`, `npm run build`, `make`, or any other setup steps.

## Page Sections (in order)

1. **Hero** — Name, availability badge, headline, bio
2. **Marquee** — Scrolling skill tags (infinite CSS animation)
3. **Manifesto** — Design philosophy in 2-column grid
4. **Process** — 3-step card layout with SVG icons
5. **Projects** — 2-column project card grid
6. **Contact** — Email, LinkedIn, Substack links
7. **Footer** — Copyright and tagline

## Design System

### Color Variables (defined in `:root`)

| Variable    | Value     | Usage                    |
|-------------|-----------|--------------------------|
| `--bg`      | `#000000` | Main background          |
| `--bg2`     | `#080808` | Secondary background     |
| `--bg3`     | `#0e0e0e` | Tertiary background      |
| `--border`  | `#1e1e1e` | Default borders          |
| `--border2` | `#2a2a2a` | Secondary borders        |
| `--text`    | `#9e9a92` | Body text (muted tan)    |
| `--muted`   | `#404040` | Muted elements           |
| `--muted2`  | `#585852` | Secondary muted          |
| `--white`   | `#edeae2` | Headings, highlights     |
| `--accent`  | `#c8f04a` | Lime green accent color  |

### Typography

| Font        | Weights      | Usage                         |
|-------------|--------------|-------------------------------|
| Jacquard 24 | 400          | Display headlines (gothic)    |
| DM Sans     | 300, 400, 500| Body text, descriptions       |
| DM Mono     | 400          | Labels, buttons, nav, tags    |

Fonts are loaded via Google Fonts CDN in the `<head>`.

### Responsive Breakpoints

| Breakpoint | Behavior                                              |
|------------|-------------------------------------------------------|
| `>1024px`  | Full desktop layout                                   |
| `≤768px`   | Single-column layouts, padding 52px → 28px            |
| `≤480px`   | Tighter spacing, smaller font sizes, padding → 20px   |

## CSS Conventions

- **CSS custom properties** for all colors and reused values — never hardcode color hex values inline.
- **BEM-like naming**: base class (`hero-top`) with double-dash modifiers (`project-card--soon`).
- **Section comments** use `/* ── SECTION NAME ── */` format as dividers in `style.css`.
- All `@keyframes` animations live at the bottom of `style.css`.
- Media queries are grouped at the end of `style.css`, not scattered per-component.
- Styles shared across pages belong in `assets/css/style.css`. Styles unique to a single page can live in a `<style>` block in that page's `<head>`.

## HTML Conventions

- Semantic HTML5 elements (`<section>`, `<footer>`, `<header>`).
- Images use `alt` text.
- "Coming soon" project cards use the modifier class `project-card--soon` and have reduced opacity (`0.5`) with `pointer-events: none`.
- Commented-out images use `<!-- -->` wrappers with a visible placeholder `<div>` as fallback.

## Assets

- **Stylesheets** live in `assets/css/`. Currently only `style.css` exists and is shared by all pages.
- **SVG icons** go in `assets/` and are referenced with relative paths (`assets/icon-name.svg`).
- **Project thumbnails** should be 2400×1500px PNGs for consistency with existing images.
- All images on the page currently use `filter: grayscale(100%)`.

## Planned Future Work (from README)

- Individual case study pages for OVO Nabung and BRIdex Design System projects
- Password protection for confidential case studies
- Additional project entries as work is published

## Key Constraints

- **No JavaScript** — the site has zero JS. All motion and interactivity is handled purely with CSS: `@keyframes` for animations (marquee scroll, pulsing dot, grain texture), `:hover` for state changes (card background color, scale transforms), and CSS transitions for smoothness. If a requested feature seems to require JS (e.g. a modal, form validation, theme toggle), find a CSS-only equivalent or flag it as out of scope.

- **No external CSS frameworks** — do not introduce Bootstrap, Tailwind, or any utility/component library. Every style is written by hand using CSS custom properties. Adding a framework would conflict with the existing naming conventions, bloat the file, and contradict the intentional minimalism of the project.

- **No build tooling** — do not create a `package.json`, install npm packages, add a bundler (Webpack, Vite, Parcel, Rollup), or introduce any compilation step. The site is edited and shipped as raw files. Anyone with a text editor can contribute without any environment setup.

- **Shared stylesheet** — all styles used by more than one page live in `assets/css/style.css`. Do not create additional CSS files for shared styles; extend this file instead. Page-specific one-off styles may go in a `<style>` block in that page's own `<head>`. Do not add CSS preprocessors or CSS-in-JS.

- **Dark theme only** — the color system is built entirely around a black background (`--bg: #000`) with no light-mode counterpart. Do not add `prefers-color-scheme` media queries or a theme toggle.

## Deployment

GitHub Pages serves the `master` branch automatically. Pushing to `master` triggers deployment with no additional configuration.

---

## User Profile & Preferences (from Codex memory)

### Who you are

Firzan is pursuing Staff/Principal Product Designer or Product Design Leader growth as a **"Systems-Oriented Product Builder."** You care about design-system leadership, systems thinking, product discovery, honest evidence, and clearer strategic/business communication.

- Your live, private **Career OS** is `/Users/mothership/Documents/OpenKnowledge/Career OS` — separate from this public `firzandz.github.io` portfolio.
- Portfolio v2 / BRIdex should emphasize **governance, adoption, and evidence boundaries**.
- You write **Tinker Trails** as "an insecure designer thinking in public," moving through Self → Craft → Team → System → Business.
- For personalization "based on what you know about me," ground it in validated context such as **"Systems-Oriented Product Builder"**; do not invent biographical claims.

### How you work

- **Career first** — for combined career and portfolio work, keep detailed portfolio critique separate, importing only validated conclusions, missing evidence, and agreed actions.
- **Career OS is not part of portfolio** — inspect confusing or destructive-prone setups first, then delete only after comparison, backlink checks, and a recoverable checkpoint.
- In career coaching, periodically **"break and recap context so far for this staff journey"**; never invent metrics, achievements, feedback, outcomes, or market evidence.
- For iterative portfolio work, use **"Target / Change / Preserve / Reference / Done when"**; make the smallest edit, preserve checkpoints, avoid variants unless asked, separate content from visual revisions, and check both themes.
- For portfolio milestones, use one primary task, explicit Next/In progress/Blocked/Done, concise Done/Blocked/Next updates, and plain-language small-step explanations; ask before multi-file changes.
- For token audits, inventory and map first: "check code base for color," "match with Figma color token," then sync. Don't mark anything deprecated yet without verified usage, cross-platform agreement, and Figma/component evidence.
- Tinker Trails research: return **3–5 ideas** with signal, tension, personal angle, title, why now, and sources. Apply "non ai-slop": genuine uncertainty and rough edges, no invented experiences or machine-smooth prose.
- For sync/account troubleshooting, inspect read-only first; request confirmation before toggling settings, moving, or deleting user data.
- Keep personal agent skills out of website repositories: "use this files only for web development"; report the exact global path and verification after relocation.

### Research stance

- Begin research with a **plan first**: research question, sampling, evidence standards, limitations, and intended decision before collecting sources.
- For public-web workshop research, retain audience/tenure classifications and describe purposive scans as **non-representative**; validate a proposed promise with concrete attendee episodes.
- For BRIdex, distinguish **implemented, piloted, researched, proposed, hypothesized, and unmeasured** work. Cloud tasks cannot verify or edit uncommitted local files without GitHub sync or supplied source.
- `career-os` is an instruction layer; private Career OS documents are live evidence. Re-run the OpenKnowledge audit after batch writes because indexing can temporarily show dead links.

### Budget & tooling notes

- Portfolio repo is vanilla HTML/CSS: browser-check rendering, links, images, metadata, responsive/theme/keyboard/reduced-motion behavior; preserve uncommitted checkpoints before broad edits.
- Managed desktop fallback: if `npx` is unavailable, use bundled Node plus fallback `pnpm dlx`; compare global skill copies with `diff -qr` and retain a recovery backup before moving originals.

---

## Cross-agent skills available in this repo

When working here, the following skills may be loaded for specific tasks. Each is invoked explicitly, not assumed:

- **career-os** — Staff Product Designer coaching; use `$career-os` for Staff-growth work
- **research** — investigate against primary sources, write findings to Markdown (includes arxiv, competitor-news-monitor, grounded-citations, llm-wiki sub-skills)
- **better-interface** — cross-discipline interface review (accessibility, layout, writing, typography, color, UI)
- **interface-review** — change-scoped review of branches, PRs, uncommitted diffs
- **code-review** — two-axis review (Standards + Spec) of code changes
- **domain-modeling** — build/sharpen project domain model, ADRs
- **handoff** — transfer context between agents or sessions
- **writing-for-agents** — write documents that agents can act on
