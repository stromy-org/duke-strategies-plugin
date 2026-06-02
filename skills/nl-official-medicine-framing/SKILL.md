---
name: nl-official-medicine-framing
description: "Analyze official Dutch government and parliamentary framing of medicines, pharma companies, products, reimbursement, shortages, access, safety and prevention through nl-gov-data. Use this whenever the user asks about Novo Nordisk, GLP-1s, Wegovy, Ozempic, semaglutide, obesity medication, diabetes medication, package management, drug shortages, medicine reputation in official records, or official-source issue framing. Produces narrative analysis, mention/context tables, issue maps, PA/PR implications, and DOCX-ready source appendices."
---

# Dutch Official Medicine Framing (MCP-hosted skill)

This skill's full instructions are hosted on the `nl-gov-data` MCP server. Do not hardcode workflow logic locally — always fetch the live version from the MCP.

## Loading instructions

1. Read the main skill instructions:
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-official-medicine-framing/SKILL.md")`

2. Discover available reference files via the manifest, then read on demand:
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-official-medicine-framing/_manifest")`
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://nl-official-medicine-framing/references/<file>")`

Follow the instructions returned by the MCP resource exactly.
