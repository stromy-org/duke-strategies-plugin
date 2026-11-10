---
name: intel-ask
description: "Answer a question about an engagement's media, stakeholder, issue and regulatory intelligence from the Stromy Intel connector: resolve the engagement, read its card, then route to a tested recipe, a governed metric, searchable evidence, an actor or issue profile, or the right government-data server for the engagement's jurisdictions. Every answer states period, sample size, method and sources. Use for 'what is the share of voice', 'who opposes whom', 'what are people saying about X', 'where does this bill stand'. Not for building a branded document (intel-brief) or finding your way around (intel-guide)."
metadata:
  stromy-client-summary: "Ask a question about your engagement and get a sourced answer with the period, sample size and method stated."
---
<!--
  GENERATED FILE — DO NOT EDIT.
  Owner:       scripts/sync-mcp-skill-stubs.py (via sync-on-mcp-skill-change.yml)
  Source:      MCPs/stromy-intel-mcp/skills/intel-ask/SKILL.md
  This workflow pushes DIRECT to this repo's main — a local edit here will be
  overwritten or rejected non-fast-forward. Edit the source, push, then:
    gh workflow run sync-on-mcp-skill-change.yml -R stromy-org/stromy-org
  Hand-authored skill? Set `_local: true` in frontmatter instead.
-->

# Ask the engagement (MCP-hosted skill)

This skill's full instructions are hosted on the `stromy-intel` MCP server. Do not hardcode workflow logic locally — always fetch the live version from the MCP.

## Loading instructions

1. Read the main skill instructions:
   → call the `fs_read` tool on the `stromy-intel` MCP with `path="skills/intel-ask/SKILL.md"`.

   **Read it to the end.** `fs_read` returns one page at a time. If the result's `next_offset_chars` is not null — or the returned text ends in a `<<< PARTIAL READ … >>>` block — the body is incomplete: call `fs_read` again with `offset_chars` set to that value and concatenate, repeating until it comes back null. Do **not** start work on a partial skill body. Hard rules and anti-patterns often sit in the final third, and a partial read fails silently — it looks like a complete skill.

2. Discover reference files (and any other skill assets), then read on demand:
   → call `fs_list` with `path="skills/intel-ask"` (and `path="skills/intel-ask/references"`),
   → call `fs_read` with `path="skills/intel-ask/references/<file>"`.

Follow the instructions returned by the MCP exactly.

## This MCP is the only correct path

Produce this skill's output **only** by following the live SKILL.md fetched above and calling the `stromy-intel` MCP's own tools. Do **not** substitute a local or identically-named base skill from elsewhere, and do **not** invent your own output path. A locally-produced or unbranded artifact is **wrong output, not a fallback** — it bypasses the server-side brand and quality gates.
