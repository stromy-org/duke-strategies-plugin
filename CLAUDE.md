# CLAUDE.md

Instructions for Claude Code when working in this plugin repo.

## Overview

Duke Strategies Deliverables is a Claude Code plugin that bundles branded deliverable skills for Duke Strategies. It is a **distribution artifact** — skills are authored in Cowork and cherry-picked here for client deployment.

## Repository Structure

```
duke-strategies-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── skills/                   # Deliverable skills (from Cowork)
│   ├── pdf/
│   ├── pptx/
│   ├── docx/
│   ├── xlsx/
│   ├── proposal/
│   └── remotion-video/
├── companies/dukestrategies/  # Brand data (charter, logos, colors)
├── src/                      # Shared workspace utilities
├── package.json              # Node.js dependencies
├── pyproject.toml            # Python dependencies
└── .mcp.json                 # MCP server config
```

## Commands

```bash
# Install dependencies
npm install
uv sync

# Test locally
claude --plugin-dir .

# Validate skill manifests
for d in skills/*/; do [ -f "$d/SKILL.md" ] && echo "OK: $d" || echo "MISSING: $d"; done

# Check for stale Cowork paths (should return nothing)
grep -r '\.claude/companies/' skills/
grep -r '\.claude/skills/' skills/
grep -r "require('../../../../" skills/
```

## Updating Skills

Skills are maintained in Cowork and cherry-picked into this plugin:

1. Update the skill in `Cowork/.claude/skills/<skill-name>/`
2. Copy updated files to `skills/<skill-name>/`
3. Re-apply portability transforms (`.claude/companies/` -> `companies/`, etc.)
4. Validate with the grep checks above
5. Bump version in `package.json` and `pyproject.toml`

## Key Rules

- Never reference `.claude/companies/` or `.claude/skills/` — use `companies/` and `skills/` directly
- Node requires must be flat (`require('pkg')` not `require('../../../../node_modules/pkg')`)
- Workspace imports use `require('../../src/workspace')` (2 levels from skill scripts)
- Company data lives at `companies/dukestrategies/` (not `.claude/companies/`)
