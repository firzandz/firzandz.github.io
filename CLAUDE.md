# CLAUDE.md

This file provides guidance for AI assistants working in this repository.

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

- **Shared stylesheet** — all styles used by more than one page live in `assets/css/style.css`. Do not create additional CSS files for shared styles; extend this file instead. Page-specific one-off styles may go in a `<style>` block in the page's own `<head>`. Do not add CSS preprocessors or CSS-in-JS.

- **Dark theme only** — the color system is built entirely around a black background (`--bg: #000`) with no light-mode counterpart. Do not add `prefers-color-scheme` media queries or a theme toggle.

## Deployment

GitHub Pages serves the `master` branch automatically. Pushing to `master` triggers deployment with no additional configuration.
