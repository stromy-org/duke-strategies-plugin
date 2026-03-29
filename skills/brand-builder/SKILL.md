---
name: brand-builder
description: "Build complete brand identity systems from scratch — logo concepts, color palettes, typography, design tokens (CSS), templates (PPTX, DOCX, letterhead, business cards, email signature), imagery direction, and a compiled brand book (PDF). Use this skill whenever the user mentions branding, brand identity, brand kit, visual identity, brand guidelines, brand book, logo design, or wants to establish or refresh a brand. Also trigger when the user says 'build me a brand', 'create brand assets', 'I need a logo and brand', 'design system for my company', or asks for branded templates, corporate identity, or style guides. This skill runs an interactive multi-phase process — it gathers brand context first, then builds deliverables iteratively with the user."
---

# Brand Builder

Build complete, production-ready brand identity systems through an interactive, phased process. The output is a full brand kit: strategy, logo, colors, typography, CSS design tokens, document templates, imagery direction, and a compiled brand book PDF.

## Workflow Overview

The process has 6 phases. Each phase builds on the previous one. Always confirm choices with the user before proceeding to the next phase.

```
Phase 1: Brand Strategy     → name, positioning, tagline, personality, voice
Phase 2: Visual Identity     → logo concepts, color palette, typography
Phase 3: Design System       → CSS tokens, component classes, motif system
Phase 4: Templates           → PPTX, DOCX report, letterhead, business card, email sig
Phase 5: Imagery Direction   → photography style, sourcing guide, SVG assets
Phase 6: Brand Book          → compiled PDF with all guidelines
```

## Company Data Integration

This skill both **consumes** and **produces** company data.

### Rebrand entry point (consuming existing data)

If the user mentions an existing company or wants to refresh a brand, check `companies/<name>/` first:

1. Read `profile.json` for company identity (name, tagline, services, contact)
2. Read `brand/charter.json` for current colors, fonts, logo paths
3. Present current brand state to the user: "You already have brand data for X. Want to start fresh or evolve from here?"
4. If evolving, pre-populate Phase 1/2 decisions from existing data

### Exporting brand outputs (producing company data)

After Phase 3 (design system), offer to export the brand to `companies/<name>/`:

```
companies/<name>/
├── profile.json          <- from Phase 1 (name, tagline, description, contact)
├── brand/
│   ├── charter.json      <- from Phase 2/3 (colors, fonts, logo, presentation, document)
│   ├── logo.png          <- from Phase 2 (primary logo — user must supply final raster)
│   └── images/           <- from Phase 5 (placeholder — user populates with sourced photos)
└── proposals/            <- empty scaffold for future proposal skill use
```

This makes the new brand immediately available to all format skills (the `pptx`, `docx`, `pdf`, and `xlsx` skills all discover `charter.json`).

**charter.json mapping** from brand-builder outputs:

| Brand-builder output | charter.json field |
|---------------------|-------------------|
| Primary palette (dark, brand, accent) | `colors.primary`, `colors.accent`, `colors.text` |
| Neutral scale (n50, white) | `colors.background`, `colors.backgroundAlt` |
| Semantic colors | `colors.success`, `colors.warning`, `colors.error` |
| Display font | `fonts.heading.family` |
| Body font | `fonts.body.family` |
| Mono font | `fonts.mono.family` |
| Logo SVGs | `logo.primary`, `logo.white` |
| Presentation spacing | `presentation.slideMargin`, etc. |

## Phase 0: Brand Discovery

Before building anything, gather enough context. The user may give you everything upfront or almost nothing. Adapt accordingly.

### Required information (must have before Phase 1)
- **Brand name** — exact spelling and casing
- **What the company does** — industry, services, target audience
- **Desired tone** — serious/playful, corporate/startup, minimal/expressive

### Important but can be suggested if missing
- **Name origin / meaning** — often yields visual motifs
- **Domains / URLs** — needed for templates and signatures
- **Competitor/inspiration brands** — "we want to feel like X"
- **Color preferences** — even vague ones ("dark and professional")
- **Founder name(s)** — for templates, email signatures, business cards

### Discovery approach

If the user provides a detailed brief, extract what you need and confirm. If the brief is sparse, ask structured questions:

```
Question 1: "What best describes your industry?"
  Options: Technology / Professional services / Creative / Finance / Healthcare / Other

Question 2: "What tone should the brand project?"
  Options: Authoritative & serious / Modern & approachable / Bold & disruptive / Refined & premium

Question 3: "Any color direction?"
  Options: Dark & muted / Bright & energetic / Earth tones / Monochrome / Surprise me
```

Always follow up on the name origin — it often unlocks the best visual concepts. Ask: "Is there a story behind the name? Sometimes a name origin inspires the strongest visual ideas."

## Phase 1: Brand Strategy

Read `references/brand-strategy.md` for the full framework.

**Deliverables:**
- Brand essence (one sentence)
- Positioning statement (internal-facing)
- Tagline (3-5 options, user picks)
- Brand personality (5 traits)
- Voice guidelines (how we write / how we don't)

Present tagline options to the user so they can indicate which directions resonate. Then refine the winner.

## Phase 2: Visual Identity

Read `references/visual-identity.md` for logo concept frameworks, color theory, and typography pairing rules.

**Deliverables:**
- 2-3 logo concepts (rendered as SVGs in HTML)
- Color palette with full scales (primary, extended, neutral, semantic)
- Typography system (display, body, mono — with Google Fonts import)
- Icon mark / favicon variants

**Logo process:**
1. Develop 2-3 distinct concepts, each with a different visual strategy
2. Show each on dark, light, and brand-color backgrounds
3. Present scale tests (hero to minimum size)
4. User picks a direction; refine into final lockups

**Color process:**
1. Start from user preferences or brand personality
2. Build a 3-color primary palette (dark, brand color, accent)
3. Extend each into a full scale (50 to 900)
4. Add a neutral scale (warm or cool depending on brand)
5. Define semantic colors (success, warning, error, info)
6. Show brand combinations (logo on each background)

**Typography process:**
1. Select a display typeface (serif for editorial authority, geometric sans for modern, etc.)
2. Pair with a body typeface (always high readability)
3. Add a monospace for data contexts
4. Define the full type scale (display XL to micro)
5. Show specimens with real brand copy

Always confirm palette, typeface, and logo direction with the user before proceeding.

## Phase 3: Design System

Read `references/design-system.md` for the token structure and component patterns.

**Deliverables:**
- `brand-tokens.css` — complete CSS custom properties file
- Utility classes for typography, buttons, cards, badges
- Brand motif component (if the logo has a repeatable element — e.g., a rule, dot, icon)
- `BRAND-Guidelines.md` — text-based brand spec

Use the template in `assets/tokens-template.css` as a starting point. Customize all values to the brand's palette, typography, and spacing decisions from Phase 2.

The brand motif is key — identify any element from the logo that can become a system-wide pattern (divider lines, dot accents, geometric shapes) and codify it as a reusable CSS component.

## Phase 4: Templates

Read `references/templates.md` for build instructions for each template type.

**Deliverables:**
- Presentation template (`.pptx`, 10 slides via pptxgenjs)
- Report template (`.docx` via docx-js)
- Letterhead (`.docx` via docx-js)
- Business cards (`.html` — print-ready visual)
- Email signature (`.html` — paste-ready for email clients)

**Build scaffolds** — start from these rather than writing from scratch:
- **PPTX**: Copy `scripts/build-pptx-template.js` to the workspace build directory, populate the `BRAND` config with Phase 2/3 outputs, customize slide content per brand industry, then run. Uses the `pptx` skill's `html2pptx` converter and `build-branded.js` scaffold pattern.
- **Brand book PDF**: Copy `scripts/build-brand-book.py` to the workspace build directory, populate the `BRAND` config with Phase 1-5 outputs, then run with `uv run python build-brand-book.py`.

**Template design principles:**
- Every template must use brand colors, typography, and motif consistently
- PPTX: 10 slide types — title, contents, section divider, key metrics, two-column, three-card, data table, quote/callout, next steps, closing
- DOCX report: cover page, TOC, styled headings, callout boxes, branded tables, header/footer with logo
- All templates use placeholder text relevant to the brand's industry

**Format skill relationship:** The `pptx` and `docx` skills handle the mechanics of building those file formats. This skill provides the brand-specific content and design decisions that feed into them. For PPTX, the scaffold uses the `pptx` skill's `html2pptx` converter directly. For DOCX, follow the patterns in `references/templates.md` which incorporate the critical rules from the `docx` format (DXA widths, ShadingType.CLEAR, etc.).

**QA is mandatory for PPTX and DOCX.** Convert to images, visually inspect, fix issues, re-verify. See `references/templates.md` for QA procedures.

## Phase 5: Imagery Direction

Read `references/imagery.md` for photography direction frameworks.

**Deliverables:**
- Imagery direction guide (`.html` — visual reference document)
- SVG divider assets (full-width, short, minimal variants using brand motif)
- SVG pattern tile (for backgrounds)
- Curated keyword lists for stock photography sourcing

**Process:**
1. Derive imagery direction from brand personality and industry
2. Define subject categories (what to photograph)
3. Define avoids (what never to use)
4. Write a photo processing recipe (saturation, contrast, overlay, grain, crop)
5. List sourcing platforms and search terms
6. Build SVG assets that extend the brand motif

## Phase 6: Brand Book PDF

Read `references/brand-book.md` for the page structure and reportlab patterns.

**Deliverables:**
- `BRAND-Brand-Book.pdf` — 14-16 page compiled brand guidelines

**Page structure:**
1. Cover (dark, logo centered, tagline, version)
2. Table of contents
3. Brand foundation (essence, positioning, personality, voice, origin)
4. Logo — primary lockups
5. Logo — usage rules, color table, don'ts
6. Color palette — primary + scales
7. Color — combinations + semantic
8. Typography — type stack + scale
9. Typography — pairing rules + hierarchy
10. Brand motif system (the repeatable element)
11. Voice & tone (do/don't pairs)
12. Imagery direction
13. Imagery sourcing + categories
14. Templates reference
15. Design tokens (CSS reference)
16. Back cover

Use reportlab for PDF generation. Apply brand colors throughout — this document IS the brand, so it must embody the visual identity perfectly.

## File Organization

All outputs follow workspace conventions: build scripts in `workspace/<client>/build/brand/`, final deliverables in `workspace/<client>/output/brand/`.

```
workspace/<client>/output/brand/
├── BRAND-Brand-Book.pdf          <- Phase 6
├── BRAND-Brand-Guidelines.md     <- Phase 3
├── BRAND-Imagery-Guide.html      <- Phase 5
├── brand-brandbook.html          <- Phase 3 (interactive reference)
├── logos/
│   ├── brand-logo-primary-light.svg
│   ├── brand-logo-primary-dark.svg
│   ├── brand-logo-tagline-light.svg
│   ├── brand-icon-dark.svg
│   ├── brand-icon-green.svg
│   └── brand-logo-mono-light.svg
├── tokens/
│   └── brand-tokens.css          <- Phase 3
├── templates/
│   ├── pptx/
│   │   └── BRAND-Template.pptx       <- Phase 4
│   ├── docx/
│   │   ├── BRAND-Report-Template.docx
│   │   └── BRAND-Letterhead.docx
│   └── html/
│       ├── brand-business-cards.html
│       └── brand-email-signature.html
└── assets/
    ├── divider-full.svg          <- Phase 5
    ├── divider-short.svg
    └── pattern-tile.svg
```

Replace "BRAND" and "brand" with the actual brand name.

## Key Principles

1. **Always interactive.** Never build 6 phases without checking in. Confirm each phase before moving on.
2. **Show, don't describe.** Render logo concepts and color palettes as HTML/SVG so the user sees the options.
3. **Industry-appropriate.** A law firm brand is not a gaming startup. Let the industry context drive every decision.
4. **The motif is everything.** The strongest brands have one repeatable visual element beyond the logo. Find it early.
5. **Templates must work.** QA every PPTX and DOCX. Convert to images, inspect, fix. A broken template destroys trust.
6. **Respect the user's taste.** If they say "I don't like serif fonts," don't argue. Offer alternatives within their preference.
7. **Use the build scaffolds.** Start from `scripts/build-pptx-template.js` for PPTX and `scripts/build-brand-book.py` for the brand book PDF. These incorporate the format-specific rules so you don't need to reinvent them.

## Dependencies

- **npm** (root `package.json`): `pptxgenjs`, `docx`, `react`, `react-dom`, `react-icons`, `sharp`
- **Python** (`pyproject.toml`): `reportlab` — install via `uv sync`
- **System**: LibreOffice (for PPTX/DOCX to PDF conversion), Poppler (`pdftoppm` for QA)
- **Google Fonts**: loaded via CDN in HTML deliverables; specified by name in PPTX/DOCX
