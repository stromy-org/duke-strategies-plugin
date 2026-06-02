---
name: nl-parliamentary-positioning
description: "Map Dutch parliamentary positioning and official political posture from nl-gov-data. Use this whenever the user asks which MPs, factions, committees, ministries, votes, questions, motions, debates, petitions, forums, or official bodies are active around a Dutch policy topic. Produces source-backed PA/PR stakeholder maps, faction/MP activity summaries, committee and ministry maps, forum activity tables, engagement signals, and DOCX-ready client analysis. Do not treat this as public sentiment; it is official parliamentary and institutional positioning."
---

# Dutch Parliamentary Positioning (MCP-hosted skill)

This skill's full instructions are hosted on the `nl-gov-data` MCP server. Do not hardcode workflow logic locally — always fetch the live version from the MCP.

## Loading instructions

1. Read the main skill instructions:
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-parliamentary-positioning/SKILL.md")`

2. Discover available reference files via the manifest, then read on demand:
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-parliamentary-positioning/_manifest")`
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-parliamentary-positioning/references/<file>")`

Follow the instructions returned by the MCP resource exactly.
