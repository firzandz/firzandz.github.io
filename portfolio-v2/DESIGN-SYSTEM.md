# Firzan Portfolio Design System

This package captures the visual language of the accepted `portfolio-v2` homepage so future pages can look related without copying the homepage file.

## Files

| File | Purpose |
| --- | --- |
| `design-system/tokens.css` | Semantic color, type, spacing, radius, layout, and motion tokens. |
| `design-system/components.css` | Reusable page shell, typography, cards, writing rows, form, theme switcher, and footer. |
| `design-system/behaviors.js` | Optional typing headline and live local greeting. |
| `design-system/starter.html` | Copy-ready page scaffold using the system. |
| `design-system/case-study.css` | Shared case-study layout, typography, navigation, sections, and responsive rules. |
| `design-system/case-study.js` | Shared case-study navigation, progressive disclosure, and anchor behavior. |
| `design-system/bridex-case-study.css` | Visual treatments used only by the BRIdex story. |
| `index.html` | The accepted homepage and visual reference. It now consumes the shared tokens and behaviors. |

## Setup for a new page

Use the same font request, then load tokens before components:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&amp;family=Inter:wght@400..600&amp;family=Jacquard+24&amp;family=Noto+Sans+Javanese:wght@400..700&amp;display=swap" rel="stylesheet" />
<link rel="stylesheet" href="design-system/tokens.css" />
<link rel="stylesheet" href="design-system/components.css" />
```

Add `design-system/behaviors.js` only when the page uses the typing headline or local greeting.

## Foundations

### Design principles

1. **Editorial first.** Content and hierarchy do most of the visual work.
2. **Quiet structure.** Borders, surfaces, and spacing separate content without loud decoration.
3. **One expressive moment.** Jacquard is reserved for the main headline; Inter carries the interface.
4. **Selective emphasis.** Underline only the phrases that communicate the decision or evidence.
5. **Motion with purpose.** Motion reveals focus: typing introduces the thesis, and sibling items dim on hover.
6. **Dark and light are peers.** New components must be checked in both themes.

### Color roles

Use semantic names rather than raw values inside components.

| Token | Role |
| --- | --- |
| `--background` | Page canvas and inset card edge. |
| `--surface` | Cards, fields, and elevated regions. |
| `--surface-hover` | Hover state and subtle stripe construction. |
| `--line` | Component borders and stronger dividers. |
| `--line-soft` | Section and list separators. |
| `--text` | Primary copy and titles. |
| `--text-secondary` | Paragraphs and descriptions. |
| `--text-tertiary` | Section labels, years, and quiet metadata. |
| `--accent` | Focus rings, placeholder action, and exceptional emphasis. |
| `--accent-soft` | Focus halo. |

The light values are switched by the existing checkbox pattern or by setting `data-theme="light"` on an ancestor.

### Typography

| Role | Family | Size / leading | Use |
| --- | --- | --- | --- |
| Display | Jacquard 24 | `--type-display` / 1 | One page thesis only. |
| Body | Inter | 14 / 20 | Navigation, labels, and compact UI copy. |
| Editorial copy | Inter | 14 / 23 | Openings and explanatory paragraphs. |
| Supporting copy | Inter | 13 / 18 | Card descriptions and article summaries. |
| Technical accent | DM Mono | 12–13 | Small indexes or schematic artwork. |
| Cultural footer | Noto Sans Javanese | Fluid | Oversized footer artwork only. |

Weights stay restrained: 460 for body and 500 for emphasis. Avoid bold blocks.

### Spacing and layout

- Content width: `650px`.
- Desktop side clearance: `20px`; mobile: `16px`.
- Standard grid gap: `14px`.
- Component padding: `18px` or `24px`.
- Section rhythm: `116px`; first section after the header: `96px`.
- Mobile section rhythm: `88px`; first section: `72px`.
- Card radius: `15px`; nested visual radius: `13px`; controls: `8px`.

Do not tighten paragraph line-height to solve vertical spacing. Adjust paragraph margin and section rhythm separately.

## Components

### Theme switcher

Classes: `.theme-toggle-input`, `.theme-toggle`, `.theme-icon`.

The checkbox changes semantic tokens through `:has()`. Keep it near the start of `<body>` so it can theme the whole page.

### Identity and page opening

Classes: `.profile`, `.profile-copy`, `.profile-name`, `.profile-role`, `.hero-headline`, `.intro`.

- Identity is quiet and precedes the expressive headline.
- The headline should be a short thesis and remain one line at portfolio width.
- The opening uses two or three paragraphs, with one idea per paragraph.
- Use `.intro-emphasis` sparingly and `.text-link` for evidence or external context.

### Section

Classes: `.section`, `.section-heading`.

The heading is intentionally tertiary. It labels content rather than competing with it.

### Project grid and card

Classes: `.projects-grid`, `.project-card`, `.project-visual`, `.placeholder-visual`, `.project-title`, `.project-description`.

- Desktop uses a two-column grid; mobile collapses to one column.
- Cards dim their siblings on hover/focus to make the selected work clearer.
- The visual region is larger than the copy region.
- Until final artwork exists, use the same neutral placeholder structure for every project.
- Add `.project-card--coming-soon` for unavailable work.

Sticker variants:

| Class | Meaning |
| --- | --- |
| `.project-sticker` | New or primary release. |
| `.project-sticker--strategy` | Design strategy. |
| `.project-sticker--ecosystem` | Ecosystem scope. |
| `.project-sticker--incoming` | Coming soon; dashed to distinguish availability. |

### Writing list

Classes: `.writing-list`, `.writing-item`, `.writing-title`, `.writing-summary`, `.writing-year`.

Keep titles and summaries left aligned and years quiet on the right. The same sibling-dimming behavior as projects is intentional; do not add a second orange hover treatment.

### Notes card

Classes: `.notes-card`, `.signup`, `.form-note`.

The card uses neutral radial light rather than an orange gradient. Inputs use the background token; focus is the only accented state.

### Case study components

Classes: `.case-study-highlight`, `.case-decision-label`, `.case-study-card`.

- Use `.case-study-highlight` for the single framing question or pivotal insight. It combines an accent edge with `--accent-soft`; do not use it for ordinary paragraphs.
- Use `.case-decision-label` for compact decision indexes. Decision labels use Inter—not DM Mono—so they remain part of the editorial narrative.
- Use `.case-study-card` for reflection, learning, and closing synthesis. It is intentionally plain: a solid surface, one-pixel border, six-pixel radius, and no homepage notes-card glow.
- Keep homepage `.notes-card` and `.case-study-card` separate. They serve different contexts and should not be visually merged.

### Footer

Classes: `.footer`, `.footer-javanese`; behavior attribute: `data-local-greeting`.

- Greeting is centered and updates in the visitor's local time.
- Javanese lettering is an outlined, oversized crop.
- The lower letters fade with a mask; this is a fade, not a drop shadow.
- The footer sits flush with the page bottom.

## Behaviors

### Typing headline

```html
<h1 class="hero-headline" aria-label="Designing clarity in chaos.">
  <span data-typing-text="Designing clarity in chaos.">Designing clarity in chaos.</span>
  <span class="typing-caret" aria-hidden="true"></span>
</h1>
```

The visible fallback remains in the HTML. Reduced-motion users see it immediately.

### Live greeting

```html
<span data-local-greeting>It’s a good time to say hello.</span>
```

The script updates every 30 seconds using the visitor's device time.

## Building a new page

1. Copy `design-system/starter.html` beside the new page.
2. Fix relative paths if the new page sits in a subfolder.
3. Keep the page shell, theme switcher, identity, and footer stable.
4. Compose the middle from existing section, card, list, and notes patterns.
5. Add a new component only if the existing patterns cannot express the content.
6. Validate desktop and mobile, then dark and light themes.
7. Confirm keyboard focus and reduced-motion behavior.

## Maintaining case studies

`case-study-template.html` is a starter, not a second source of styling. The actual case-study pages and the starter all consume the same shared files.

| What you want to change | Edit here |
| --- | --- |
| Layout, typography, section rhythm, navigation, or responsive behavior across every case study | `design-system/case-study.css` |
| Section navigation, “full story” disclosure, active section, or anchor scrolling across every case study | `design-system/case-study.js` |
| BRIdex-specific diagrams, carousels, workshop evidence, or visual storytelling | `design-system/bridex-case-study.css` |
| BRIdex copy and project-specific structure | `bridex-case-study.html` |
| Default content and structure for the next case study | `case-study-template.html` |

To create another case study:

1. Copy `case-study-template.html` and rename the copy for the project.
2. Replace the project content in the new HTML file.
3. Keep `tokens.css`, `components.css`, `case-study.css`, and `case-study.js` linked.
4. Add a project-specific stylesheet only when the story needs visuals that should not appear elsewhere.
5. Link the relevant homepage card to the new page.

Do not copy shared CSS or JavaScript back into a case-study HTML file. A shared system update should require one edit in `case-study.css` or `case-study.js`, not one edit per project.

## Change contract

For future iterations, define:

- **Target:** exact element or component.
- **Change:** one specific adjustment.
- **Preserve:** approved qualities that must remain.
- **Reference:** the exact property being borrowed, such as fade, crop, or spacing.
- **Done when:** a visible acceptance criterion.

When a new decision is accepted, update this document and the reusable component first, then use it in pages.
