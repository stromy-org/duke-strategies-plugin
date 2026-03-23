# Templates Reference

## Before Building Any Template

1. Read the relevant skill: the `pptx` skill for presentations, the `docx` skill for documents
2. Dependencies are pre-installed in root `package.json`: `pptxgenjs`, `docx`, `react`, `react-dom`, `react-icons`, `sharp`

## Presentation Template (PPTX)

Build with pptxgenjs (Node.js). 16:9 layout. 10 slide types.

### Slide Architecture

| # | Slide Type | Background | Layout |
|---|-----------|------------|--------|
| 1 | Title | Dark | Overline + large serif title + motif + meta + logo |
| 2 | Contents | Light | Numbered sections with descriptions and separator lines |
| 3 | Section divider | Brand color | Large section number + serif title + subtitle + motif |
| 4 | Key metrics | Dark | 4 stat cards with accent top-borders and large numbers |
| 5 | Two-column | Light | Text left (heading + body) + visual placeholder right |
| 6 | Three-card | Light | 3 numbered cards with title + description |
| 7 | Data table | Light | Branded header row + alternating fills + source citation |
| 8 | Quote/callout | Brand color | Accent left-bar + large serif quote + attribution |
| 9 | Next steps | Light | Numbered action items with timelines + accent bars |
| 10 | Closing | Dark | Centered logo + motif + tagline + domains + contact |

### PPTX Brand Integration

- **Footer on every content slide** (not title/closing): motif line + "BRANDNAME" left + page number right
- **Overlines**: uppercase, wide-tracked, brand accent color, small size (10pt)
- **Section numbers**: serif font, large (56pt on dividers, 24pt on contents), in lighter brand color
- **Tables**: brand-color header row with white text, alternating light fills, mono font for data
- **Never use accent lines under titles** — the pptx skill explicitly prohibits this

### PPTX Color Mapping

Define a color constants object at the top of the script:
```javascript
const C = {
  obsidian:   "0B0B0B",   // dark bg
  brand:      "XXXXXX",   // primary brand color
  accent:     "XXXXXX",   // accent color
  brandLight: "XXXXXX",   // lighter brand shade
  n800:       "XXXXXX",   // dark cards
  n600:       "XXXXXX",   // secondary text (light mode)
  n500:       "XXXXXX",   // tertiary text
  n200:       "XXXXXX",   // borders
  n50:        "XXXXXX",   // light background (parchment)
  white:      "XXXXXX",   // pure light
};
```

### PPTX QA Procedure

After building, always convert to images and visually inspect:
```bash
libreoffice --headless --convert-to pdf template.pptx
pdftoppm -jpeg -r 150 template.pdf slide
```
Then view at least: slide 1 (title), a content slide (4 or 7), and the closing slide. Fix any issues found.

## Report Template (DOCX)

Build with docx-js (Node.js).

### Document Structure

**Section 1: Cover page** (separate section for different margins)
- Large top margin (2" or 2880 DXA)
- Overline: uppercase, wide-tracked, brand color
- Title: display serif, large (28pt / size 56)
- Subtitle: body font, muted color
- Motif element (border-based approximation)
- Metadata: Date, Classification, Prepared for
- Logo + domains at bottom

**Section 2: TOC** (with header/footer)
- TableOfContents element with hyperlinks
- Requires HeadingLevel styles with outlineLevel

**Section 3: Report body** (with header/footer)
- H1: serif, 20pt, with bottom border in brand color
- H2: serif, 14pt, in brand color
- H3: sans bold, 12pt
- Callout boxes: shading fill + left border (green for findings, accent for priority)
- Data tables: brand-color header, alternating rows, mono for numbers
- Source citations: mono italic, muted color

### Header/Footer Pattern

**Header**: Small "BRANDNAME" in serif + motif dot, with subtle bottom border
**Footer**: Brand-color top border + "Confidential" left + page number right (using tab stops)

### DOCX Critical Rules
- Use `WidthType.DXA` for tables, never percentage
- Use `ShadingType.CLEAR`, never SOLID
- Use `LevelFormat.BULLET` for lists, never unicode bullets
- Set page size explicitly (A4: 11906 x 16838 DXA)
- Include `outlineLevel` on heading styles for TOC to work

## Letterhead (DOCX)

Simpler than the report — single section with branded header/footer and pre-formatted fields:
- Date (right-aligned)
- Recipient block (name, company, address)
- Subject line
- Body placeholder
- Signature block (name, title)

## Business Cards (HTML)

Create as visual HTML — not for programmatic generation, but as a design reference the user can give to a printer.

Show two options:
- **Option A**: Dark front / brand-color back
- **Option B**: Light front / brand-color back

Each card: 350x200px (proportional to 85x55mm EU standard). Front shows logo + name + title. Back shows tagline + contact details + motif.

Note: recommend 400gsm uncoated stock for print.

## Email Signature (HTML)

Must work in all major email clients — use table-based layout, inline styles only, no CSS classes.

Structure:
1. Motif element (table-based horizontal line + dot)
2. Name (bold, 14px)
3. Title / Company (12px, muted)
4. Domains (monospace, 11px, brand accent links)
5. Email address (monospace, 11px, muted)
6. Tagline (9px, italic, very muted)

Keep total height under 120px. No images (they get blocked by email clients).
