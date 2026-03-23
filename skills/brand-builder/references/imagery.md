# Imagery Direction Reference

## Deriving Imagery Style from Brand Personality

The imagery direction should flow directly from the brand personality — not be an arbitrary aesthetic choice.

| Personality | Imagery direction | Subjects | Treatment |
|------------|------------------|----------|-----------|
| Authoritative / serious | Raw, material, architectural | Concrete, steel, glass, infrastructure | Desaturated, high-contrast, tight crop |
| Modern / clean | Minimal, geometric, spacious | Clean surfaces, organized spaces, light | Bright, low contrast, generous whitespace |
| Bold / disruptive | Dynamic, unexpected, dramatic | Movement, unusual angles, construction | High contrast, deep shadows, strong color |
| Refined / premium | Textured, crafted, detailed | Materials, fabrics, artisan details | Warm tones, soft shadows, shallow depth |
| Technical / systematic | Structured, precise, data-like | Grids, circuits, engineering details | Cool tones, even lighting, clinical |
| Organic / natural | Earthy, growth-oriented | Plants, wood, water, natural textures | Warm, slightly saturated, soft focus |

## Photography Categories

Define 3-4 categories based on usage context:

### Category 1: Textures (backgrounds, dividers)
Full-frame material close-ups. No context needed — pure surface. These become slide backgrounds, report cover images, website section dividers.

### Category 2: Architecture (hero images, feature sections)
Building facades, structural elements, interiors. Provide context and scale while maintaining the brand aesthetic. For website heroes and full-bleed layouts.

### Category 3: Detail shots (thumbnails, accents)
Extreme close-ups of joints, mechanisms, patterns. Small-format usage: blog thumbnails, social media, icon backgrounds.

### Category 4: Abstract / data-as-material (conceptual)
Abstract patterns that suggest data or systems without being literal "tech" imagery. Generative patterns, light trails, structured repetition.

## Photo Processing Recipe

Every sourced image should go through this pipeline to achieve brand cohesion. Adjust values to match the brand's palette:

```
1. Desaturate:    -30% to -50% (more for serious, less for warm brands)
2. Contrast:      +10 to +20
3. Shadows:       -15 to -25 (let darks go deep)
4. Highlights:    +5 to +10 (keep them clean)
5. Color overlay: [brand dark color] at 12-20% opacity, multiply blend
6. Grain:         4-8%, uniform distribution (optional, for editorial feel)
7. Crop:          Tight, geometric. Prefer 16:9, 2:1, or 1:1 ratios
```

The color overlay is the most important step — it tints every image toward the brand palette, creating visual cohesion across diverse sources.

## Sourcing Guide

### Platforms
- **Unsplash** (free, high quality, excellent architecture)
- **Pexels** (free, good variety)
- **Stocksy** (paid, editorial quality, curated)
- **Adobe Stock** (paid, widest selection)
- **Shutterstock** (paid, good for textures specifically)

### Building a Search Term Library

Create 6-8 search terms combining: [material/subject] + [mood/quality] + [specific detail]

Examples for an architectural/raw brand:
- "concrete texture dark minimal"
- "steel glass facade detail"
- "urban architecture geometric"
- "industrial surface close-up"
- "data center corridor dark"
- "bridge cable symmetry"
- "stone texture raw dark"

### Universal Avoids

Regardless of brand personality, always avoid:
- People shaking hands
- People smiling at laptops
- Generic office interiors
- Abstract colored gradients
- Low-resolution or heavily filtered images
- Watermarked stock photos

## SVG Divider Assets

Create these reusable SVG elements based on the brand motif:

### Full-width divider
The motif element spanning the full content width. Used as section separators.

### Short divider
A fixed-width version (60-120px) for section headers and smaller contexts.

### Minimal divider
The smallest practical version for email signatures and tight spaces.

### Pattern tile
A repeating SVG tile (60x60 or 80x80) that can be used as a CSS `background-image` with `background-repeat`. Should be subtle — the brand's dark color as background with very low-opacity geometric lines.

## Imagery Direction Guide (HTML)

The deliverable is a self-contained HTML page that serves as a visual reference. It should include:

1. Hero section with imagery philosophy statement
2. Visual language principles (4 cards: subjects, avoid, composition, treatment)
3. Image categories with placeholder cards showing the aesthetic direction
4. Photo processing recipe in a monospace code block
5. Sourcing platforms and search terms
6. Keyword tag clouds (yes/no with visual differentiation)

This document is meant to be shared with photographers, designers, or anyone sourcing imagery for the brand.
