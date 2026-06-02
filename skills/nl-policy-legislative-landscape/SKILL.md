---
name: nl-policy-legislative-landscape
description: "Build deep Dutch official-source policy and legislative landscape analyses from the nl-gov-data MCP. Use this whenever the user asks for a policy landscape, legislative scan, dossier map, official activity timeline, regulatory baseline, PA/PR policy baseline, or consulting-style report on a Dutch public-policy topic. The skill is strongest for connecting Tweede Kamer, KOOP, BWB, Wetgevingskalender, Rijksoverheid, ministries, committees, and official bodies into a client-ready landscape with sources, dates, links, implications, and priority reading."
---

# Dutch Policy And Legislative Landscape (MCP-hosted skill)

This skill's full instructions are hosted on the `nl-gov-data` MCP server. Do not hardcode workflow logic locally — always fetch the live version from the MCP.

## Loading instructions

1. Read the main skill instructions:
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-policy-legislative-landscape/SKILL.md")`

2. Discover available reference files via the manifest, then read on demand:
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-policy-legislative-landscape/_manifest")`
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-policy-legislative-landscape/references/<file>")`

Follow the instructions returned by the MCP resource exactly.
