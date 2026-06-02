---
name: tensions
description: "Detect contradictions, said-vs-did gaps, and non-obvious tensions in Dutch public policy using the nl-gov-data MCP. Produces structured, source-cited tension reports for public-affairs consultants — dormant dossiers, expired motions, taxonomy absences, coalition flips, ministerial commitments not kept, claim-vs-structure mismatches. Use this skill whenever the user asks about tensions, contradictions, gaps, what's not adding up, said-vs-spent, said-vs-done, what the minister promised vs delivered, where a policy is stuck, why something hasn't moved, or angles for a roundtable on a Dutch policy topic. Do NOT trigger for monitoring ('what's happening on X' goes to nl-gov-data) or strategy ('what should we recommend' — out of scope). Output is evidence-and-structure only; never recommendations."
---

# Tensions (MCP-hosted skill)

This skill's full instructions are hosted on the `nl-gov-data` MCP server. Do not hardcode workflow logic locally — always fetch the live version from the MCP.

## Loading instructions

1. Read the main skill instructions:
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://tensions/SKILL.md")`

2. Discover available reference files via the manifest, then read on demand:
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://tensions/_manifest")`
   → `ReadMcpResourceTool(server="nl-gov-data", uri="skill://tensions/references/<file>")`

Follow the instructions returned by the MCP resource exactly.
