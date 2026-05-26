# Canvas → Slide Mapping

How each canvas `template_id` maps to slide layouts. The pptx formatter reads
this when invoked with `{envelope}`.

## `proposal_v1`

Source: `MCPs/deliverable-canvas-mcp/components/resources/templates/proposal_v1.json`.

| Canvas section | Slide(s) | Layout |
|---|---|---|
| `context`    | 1 | Title slide (proposal title + client name + date) |
| `approach`   | 3 | Section divider + 2 content slides (split body by `\n\n---\n\n` markers; if none, 1 slide) |
| `scope`      | 1 | Table slide — bullet body or markdown table |
| `timeline`   | 1 | Gantt-style slide (use brand accent for phase bars) |
| `pricing`    | 1 | Pricing table (parse markdown table; if absent, render as bullet list with bold amounts) |
| `risks`      | 1 | Two-column comparison (Risk / Mitigation pairs, parsed from `- Risk: ... Mitigation: ...` lines) |
| `next_steps` | 1 | CTA slide (numbered list, finishing with a contact block from `companies/<client_id>/profile.json`) |

Minimum slide count for a fully populated proposal canvas: **8** (counted: 1 + 3 + 1 + 1 + 1 + 1 + 1 = 9; the approach can collapse to 1 if body has no splits — minimum 7).

## Adding a new template

When a new canvas template is added under
`MCPs/deliverable-canvas-mcp/components/resources/templates/<template_id>.json`:

1. Add a section in this file with the same column structure.
2. Define each section's slide count and layout.
3. If the layout needs new brand-driven primitives, add them to
   `build-branded.js` (the pptx scaffold script).
4. Run the formatter against a fixture envelope to verify the output.

## Defaults

- Brand tokens come from `companies/<client_id>/charter.json`. The pptx skill
  reads `client_id` from `envelope.client_id` (top-level, not nested under
  `meta`) and resolves the charter accordingly.
- If a section body is empty, the slide is rendered with the section title and
  a placeholder "(empty)" line — the formatter does not skip empty sections
  silently (the slide deck must reflect the structure the strategic skill
  chose to keep visible).
