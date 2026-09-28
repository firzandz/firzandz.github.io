# Firzan’s portfolio

The current portfolio lives at the repository root. The previous design is preserved in `archive/v1/`.

**[Current website](https://firzandz.github.io/)** · **[Archived website](https://firzandz.github.io/archive/v1/)**

## Find the right version

| Version | Start here | Status |
| --- | --- | --- |
| Current portfolio (v2) | [index.html](./index.html) | Main site; make new changes here |
| Previous portfolio (v1) | [archive/v1/index.html](./archive/v1/index.html) | Historical reference |
| Previous v2 URLs | `portfolio-v2/` | Redirects only; edit the root files |

## Repository map

```text
index.html                     Current homepage
bridex-case-study.html          Current BRIdex case study
ovo-nabung-case-study.html      Current OVO Nabung case study
case-study-template.html       Starting point for a new case study
assets/                        Current site images
design-system/                 Current shared CSS, JavaScript, and starter page
docs/                          Design guidance and content review drafts
archive/v1/                    Previous homepage, case studies, CSS, and images
portfolio-v2/                  Redirects for previously published v2 page URLs
ovo-nabung.html                 Redirect to the current OVO case study
superbank.html                  Redirect to the archived Superbank case study
```

The archive has its own assets so it can be browsed independently. Images used by both versions are deliberately retained in both asset folders.

## Where to edit

| Change | File or folder |
| --- | --- |
| Homepage copy and layout | [index.html](./index.html) |
| BRIdex story | [bridex-case-study.html](./bridex-case-study.html) |
| OVO Nabung story | [ovo-nabung-case-study.html](./ovo-nabung-case-study.html) |
| Shared colors, typography, spacing | [design-system/tokens.css](./design-system/tokens.css) |
| Shared case-study styling | [design-system/case-study.css](./design-system/case-study.css) |
| Shared interactions | [design-system/behaviors.js](./design-system/behaviors.js) and [design-system/case-study.js](./design-system/case-study.js) |
| Design guidance | [docs/DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) |
| OVO content review | [docs/ovo-nabung-case-study-content.md](./docs/ovo-nabung-case-study-content.md) |
| Earlier placeholder specifications | [docs/PROJECT-VISUAL-SPECS.md](./docs/PROJECT-VISUAL-SPECS.md) |

The HTML pages are the published content. Markdown review drafts are working material.

## Preview locally

This is a static HTML, CSS, and JavaScript site with no build step or package installation.

From the repository root:

```sh
python3 -m http.server 8000
```

Open [the current site](http://localhost:8000/) or [the archive](http://localhost:8000/archive/v1/).

Before publishing, check homepage → case study → Back on desktop and mobile, both themes, images, and any old URLs affected by the change. Run `git diff --check` to catch whitespace errors.

## Publishing and compatibility

The repository uses GitHub Pages. Keep `main` as the main branch and publish from its root so `index.html` is the default homepage. Changes become public after they reach `main` and the Pages deployment succeeds.

Old `portfolio-v2/*.html` page links redirect to the current root pages and preserve query strings and section anchors. The old `ovo-nabung.html` link opens the current case study. The old `superbank.html` link opens the preserved case study because the current Superbank project is still marked coming soon.

## Archive and recovery

The v1 homepage was recovered from the commit immediately before `d3535cc`, which first promoted v2. Its case studies and assets were moved intact into [archive/v1/](./archive/v1/). The previous editing guide is preserved in [archive/v1/CLAUDE.md](./archive/v1/CLAUDE.md).

Keep new work in the current site. To undo the reorganization, revert its Git commit; the archive remains available for reference.
