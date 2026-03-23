# Brand Book PDF Reference

## Overview

The brand book is a 14-16 page PDF compiled using Python's reportlab. It is the final, shareable deliverable — the single document a designer, developer, or partner opens to understand the brand.

This document must embody the brand. Every page uses the brand's colors, type choices (via available system fonts mapped to the brand fonts), and motif.

## Dependencies

reportlab is listed in `pyproject.toml`. Install via `uv sync`.

## Page Dimensions

Use A4 (595.27 x 841.89 points) as default. Define consistent margins:
```python
from reportlab.lib.pagesizes import A4
W, H = A4
ML, MR, MT, MB = 50, 50, 60, 60  # left, right, top, bottom
CW = W - ML - MR  # content width
```

## Reportlab Font Mapping

Reportlab ships with standard fonts. Map brand typefaces to the closest available:

| Brand typeface | Reportlab equivalent | Notes |
|---------------|---------------------|-------|
| Instrument Serif / serif display | `Times-Roman` | Closest serif available |
| DM Sans / sans-serif body | `Helvetica` | Standard sans-serif |
| IBM Plex Mono / monospace | `Courier` | Standard monospace |
| Bold variants | `Helvetica-Bold`, `Times-Bold` | |
| Italic variants | `Helvetica-Oblique`, `Times-Italic` | |

The PDF won't have the exact brand fonts, but the structure, colors, and layout will be accurate. Note this in the document: "This PDF uses system fonts for portability. Actual brand fonts are specified in the design tokens."

## Helper Functions

Build these reusable functions:

### `score_line(c, x, y, w, line_color, dot_color, lw, dot_r)`
Draws the brand motif (or equivalent) at any position and size.

### `page_footer(c, page_num, dark=False)`
Standard footer with motif line + "BRAND Brand Guidelines v1.0 Date" + page number.

### `section_overline(c, text, y, color)`
Uppercase tracked label for section identification.

### `section_title(c, text, y, color, size)`
Large serif section heading.

### `body_text(c, text, x, y, max_width, size, color, font, leading)`
Word-wrapped body text. Returns the Y position after the last line — essential for flowing content.

### `swatch(c, x, y, w, h, color, name, hex_val)`
Color swatch with rounded rect, name label, and hex value.

## Page Structure

### Cover (Page 1)
- Full dark background
- Brand color accent bar at top (thin, full-width)
- Logo centered, large serif
- Motif beneath logo
- Tagline in tracked caps
- "Brand Guidelines" subtitle
- Version and date
- Domains at bottom in accent color

### Table of Contents (Page 2)
- Light background
- "CONTENTS" overline
- Numbered sections with titles, descriptions, page numbers
- Separator lines between entries

### Brand Foundation (Page 3)
- Brand essence in slightly larger body text
- Positioning in a tinted box with brand-color left border
- Personality traits as tags (rounded rects with brand tint)
- Tagline in display serif
- Voice description
- Origin story in a muted box (if applicable)

### Logo — Primary (Page 4)
- 2x2 grid: dark bg, light bg, brand-color bg, monochrome
- With-tagline lockup (full-width dark bar)
- Icon marks at descending sizes with annotation

### Logo — Rules (Page 5)
- Clear space description
- Color-by-background table (brand header, alternating rows)
- Don'ts list with accent bullets

### Color Palette (Page 6)
- Primary swatches (large, with names and hex)
- Color scales as horizontal bars with stop labels
- Usage rules in tinted boxes (one green, one accent)

### Color Combinations (Page 7)
- 4 approved combos (logo + tagline on different backgrounds)
- Semantic colors (small swatches with labels)

### Typography — Scale (Page 8)
- Type stack overview (3 cards with font name, usage, fallback)
- Full type scale with specimens (real brand copy, not lorem ipsum)
- Google Fonts import reference box

### Typography — Rules (Page 9)
- Report header simulations (dark and light side by side)
- Hierarchy rules (which font for which context)
- Weight restrictions

### Brand Motif System (Page 10)
- Brand-color background page (to show the system in context)
- Variants table with context, dimensions, colors
- Visual examples at different scales
- CSS implementation code block

### Voice & Tone (Page 11)
- 3 do/don't pairs in side-by-side boxes
- Green left-border for do, accent left-border for don't
- Writing principles as bulleted list

### Imagery Direction (Page 12)
- Subject tags (green tinted)
- Avoid tags (accent tinted, strikethrough)
- Photo processing recipe in a code block
- Composition principles

### Imagery Sourcing (Page 13)
- Category cards (4 categories with subjects and usage)
- Platform list with descriptions
- Search term list in monospace

### Templates Reference (Page 14)
- Card per template: name, filename, description
- All 5 templates documented

### Design Tokens (Page 15)
- Dark background page
- CSS variables displayed in monospace
- Organized by section (colors, typography, spacing, motif)

### Back Cover (Page 16)
- Dark background
- Centered logo + motif + tagline
- Domains in accent color
- Version + date + "Confidential"

## QA

After generating, convert to images and spot-check:
```bash
pdftoppm -jpeg -r 150 -l 5 brand-book.pdf check
```
View cover, a content page, and the back cover at minimum.

## Important Notes

- Never use Unicode subscript/superscript characters in reportlab — they render as black boxes
- `body_text()` must return the final Y position so subsequent content flows correctly
- Color objects: use `HexColor("#XXXXXX")` from `reportlab.lib.colors`
- Rounded rects: `c.roundRect(x, y, w, h, radius, fill=1, stroke=0)`
- Remember Y axis is bottom-up in reportlab (0,0 is bottom-left)
