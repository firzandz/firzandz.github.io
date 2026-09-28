# Shared Project Placeholder — Figma Specification

Use one identical placeholder for every Selected work card while evaluating the grid. Project-specific artwork can replace this component later without changing card dimensions.

## 1. Grid frame

- Page content width: `650 px`.
- Columns: `2` equal columns.
- Column and row gap: `14 px`.
- Approximate desktop card width: `318 px`.
- Card radius: `15 px`.
- Card padding: `18 px`.
- Artwork area: full card width × `150 px`.
- Artwork divider: `1 px` along the bottom.
- Mobile: one column; keep artwork height at `150 px`.

## 2. Shared placeholder component

Create one Figma component named `Project Placeholder`.

- Outer visual: `170 × 104 px`.
- Center it horizontally and vertically inside the `150 px` artwork area.
- Outer border: `1 px`, dashed, muted-text color.
- Outer radius: `13 px`.
- Clip content: on.
- Background: alternating diagonal lines every `12 px`.
- Inner frame inset: `12 px` on every side.
- Inner frame border: `1 px` solid line token.
- Inner frame radius: `8 px`.

### Center marker

- Size: `32 × 32 px`.
- Shape: circle.
- Border: `1 px` coral.
- Fill: surface token.
- Character: `+` using DM Mono Regular, `13 px`.
- Align exactly to the center of the placeholder.

### Caption lines

- First line: left `24 px`, right `24 px`, bottom `22 px`, height `1 px`.
- Second line: left `24 px`, right `50%`, bottom `16 px`, height `1 px`.
- Fill both lines with the line token.

## 3. Theme tokens

| Token | Dark | Light |
| --- | --- | --- |
| Page background | `#101010` | `#F3F0E9` |
| Surface | `#141414` | `#EBE7DE` |
| Surface alternate | `#181818` | `#E4DED3` |
| Line | `#292929` | `#D0C9BE` |
| Text | `#F0EEE9` | `#191815` |
| Muted text | `#73716D` | `#8A847A` |
| Coral | `#FF8A65` | `#E9633A` |

Build `Theme=Dark` and `Theme=Light` variants using variables rather than separate geometry.

## 4. Status badges

Badges are separate from the shared placeholder and stay pinned to the card.

- Position: top `14 px`, right `16 px`.
- Horizontal padding: `9 px`.
- Vertical padding: `4 px` top and `5 px` bottom.
- Radius: `999 px`.
- Border: `2 px` warm white (`#F7EFE4`).
- New: `#FF9F43`, rotate `-5°`.
- Ecosystem: `#B8DFD0`, rotate `2°`.
- Design Strategy: `#D8C9FF`, rotate `-2°`.
- Coming soon: transparent surface, dashed coral border, rotate `4°`.

## 5. Figma component structure

```text
Project Card
├── Artwork Area
│   └── Project Placeholder
│       ├── Diagonal Background
│       ├── Inner Frame
│       ├── Center Marker
│       └── Caption Lines
├── Status Badge
└── Copy
    ├── Project Title
    └── Description
```

Create these properties:

- `Theme`: Dark / Light.
- `Badge`: New / Ecosystem / Design Strategy / Coming soon.
- `Status`: Available / Coming soon.

The Coming-soon card may use a dashed card border, but its placeholder geometry must remain identical to the other three cards.

## 6. Export handoff

- No export is required while this remains CSS-based.
- When replacing it with final artwork, export at `636 × 300 px` (`2×`) as WebP or preserve the `318 × 150 px` aspect ratio in SVG.
- Keep the same artwork height so the grid does not reflow.
