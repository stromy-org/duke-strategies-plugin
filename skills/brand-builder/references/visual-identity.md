# Visual Identity Reference

## Logo Development

### Concept Strategies

Develop 2-3 distinct logo concepts. Each should take a different approach:

| Strategy | What it does | Best for |
|----------|-------------|----------|
| **Wordmark + motif** | Name in custom type with a small visual accent | Most brands — versatile, scales well |
| **Lettermark + icon** | Initial(s) in a distinctive container | Brands with long names or strong initials |
| **Abstract mark** | Geometric or organic shape + wordmark | Tech brands, brands seeking universal recognition |
| **Typographic pure** | Wordmark only, distinctive through type choice | Luxury, editorial, consulting brands |

### Wordmark Typography

- **Serif** (editorial authority): Instrument Serif, Playfair Display, EB Garamond, Cormorant Garamond, Libre Baskerville
- **Geometric sans** (modern precision): DM Sans, Inter, Outfit, Plus Jakarta Sans, General Sans
- **Humanist sans** (approachable): Source Sans 3, Nunito Sans, Work Sans, Lato
- **Display/distinctive**: Syne, Space Grotesk, Clash Display, Cabinet Grotesk

### Logo Technical Requirements

For each concept, show:
1. Primary lockup on dark background
2. Primary lockup on light background
3. Primary lockup on brand-color background
4. Monochrome / watermark version
5. With-tagline variant
6. Icon mark at 48px, 32px, 20px, 16px
7. Scale test from hero to minimum size

Render all logo concepts as SVG within HTML documents so the user can see them directly.

### Motif Extraction

After the user picks a logo direction, identify the repeatable motif — the element that will extend into the design system:

- A distinctive line or rule (score line, double rule, angled slash)
- A dot or geometric accent
- A border treatment (thick left border, corner mark)
- A typographic element (the initial letter, a ligature)

The motif should work at any scale and serve as: section dividers, footer rules, bullet replacement, decorative accents, loading indicators.

## Color Palette Construction

### Step 1: Primary palette (3 colors)

| Role | Purpose | Selection criteria |
|------|---------|-------------------|
| **Dark** | Backgrounds, primary text | Near-black or very dark brand color. Never pure #000000 — always warm (#0B0B0B) or cool (#0A0F14) |
| **Brand** | Identity, headers, buttons | The core brand color. Must work as both bg and text |
| **Accent** | CTAs, highlights, alerts | High contrast against both dark and brand colors. Used sparingly |

### Step 2: Extended scales (per primary color)

Build 6-7 stops per color: 50 (lightest) to 900 (darkest). Each stop should be usable:
- **50**: Light backgrounds, subtle tints
- **100-200**: Tags, badges, hover states
- **300**: Secondary text on dark, links
- **500**: The primary shade (= brand color)
- **700**: Buttons, headers, strong elements
- **900**: Text on light fills, darkest shade

### Step 3: Neutral scale

8 stops from near-black to near-white. Always warm (#F2F0EA parchment) or cool (#F0F2F5 ice) — never pure #FFFFFF or #000000.

### Step 4: Semantic colors

- **Success**: Derived from brand green, or a complementary green
- **Warning**: Derived from accent if warm, otherwise amber
- **Error**: Red that works with the palette (not generic #FF0000)
- **Info**: Blue that works with the palette

### Color Rules to Codify

Always define explicit rules about color usage. Common rules:
- "Accent is never a background" (if accent is strong)
- "[Warm color] replaces pure white" (for editorial brands)
- "[Dark color] replaces pure black" (for refined brands)
- "Green-on-black is the signature combination" (for specific identity)

## Typography System

### Type Stack (always 3 typefaces)

| Role | When to use | Selection criteria |
|------|------------|-------------------|
| **Display** | Headlines, titles, hero | Distinctive, high personality. Sets the brand's typographic tone |
| **Body** | Everything else | Neutral, high readability, many weights available |
| **Mono** | Data, code, metadata | Clean, even spacing. Used for technical credibility |

### Recommended Pairings

| Brand feel | Display | Body | Mono |
|-----------|---------|------|------|
| Editorial / authoritative | Instrument Serif | DM Sans | IBM Plex Mono |
| Modern / clean | Plus Jakarta Sans | Inter | JetBrains Mono |
| Bold / expressive | Syne | Work Sans | Space Mono |
| Luxury / refined | Cormorant Garamond | Source Sans 3 | Fira Code |
| Technical / systematic | Space Grotesk | Nunito Sans | IBM Plex Mono |

### Type Scale

Define sizes for these roles (all in px with rem equivalents):

```
Display XL:  48px / 3rem      — hero text, cover pages
Display LG:  36px / 2.25rem   — report titles
Display MD:  24px / 1.5rem    — section titles
Display SM:  20px / 1.25rem   — card titles
Heading:     18px / 1.125rem  — content headings
Body:        15px / 0.9375rem — paragraphs
Body SM:     13px / 0.8125rem — captions, secondary
Overline:    11px / 0.6875rem — section labels (uppercase)
Micro:       10px / 0.625rem  — legal, fine print
```

### Weight Restrictions

Most brands should use only 3 weights:
- **Regular (400)** — body text
- **Medium (500)** — headings, UI labels
- **Bold (700)** — emphasis, callouts (use sparingly)

Never use thin/light (too fragile) or black/heavy (too aggressive) unless the brand personality demands it.
