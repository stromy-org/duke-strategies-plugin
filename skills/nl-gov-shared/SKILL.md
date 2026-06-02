---
name: nl-gov-shared
description: "References hub for the Dutch government data skill family (nl-gov-data, tensions, nl-policy-legislative-landscape, nl-parliamentary-positioning, nl-official-medicine-framing). Not invoked directly — exists to host canonical specs (portal docs, tool reference, output contract, evidence rules) cited by all sibling skills."
---

# nl-gov-shared (MCP-hosted skill)

This skill's full instructions are hosted on the `nl-gov-data` MCP server. Do not hardcode workflow logic locally — always fetch the live version from the MCP.

## Loading instructions

1. Read the main skill instructions:
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-gov-shared/SKILL.md")`

2. Discover available reference files via the manifest, then read on demand:
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-gov-shared/_manifest")`
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-gov-shared/references/<file>")`

Follow the instructions returned by the MCP resource exactly.
