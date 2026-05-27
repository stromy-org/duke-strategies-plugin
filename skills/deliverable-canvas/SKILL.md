---
name: deliverable-canvas
description: "Protocol for collaborating with the user on a structured deliverable (proposal, messaging-framework, press-release, brief) through an MCP-backed canvas. Use whenever a strategic skill produces a multi-section document that downstream formatters (pptx, docx, pdf) will consume. Open or resume a canvas first, update sections turn by turn, finalize before handing off to a formatter."
---

# Deliverable Canvas Protocol (MCP-hosted skill)

This skill's full instructions are hosted on the `deliverable-canvas` MCP server. Do not hardcode workflow logic locally — always fetch the live version from the MCP.

## Loading instructions

1. Read the main skill instructions:
   → `ReadMcpResourceTool(server="deliverable-canvas", uri="skill://deliverable-canvas/SKILL.md")`

2. Discover available reference files via the manifest, then read on demand:
   → `ReadMcpResourceTool(server="deliverable-canvas", uri="skill://deliverable-canvas/_manifest")`
   → `ReadMcpResourceTool(server="deliverable-canvas", uri="skill://deliverable-canvas/references/<file>")`

Follow the instructions returned by the MCP resource exactly.
