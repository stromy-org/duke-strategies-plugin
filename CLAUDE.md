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
│   ├── brand-builder/        #   Company-agnostic brand identity builder
│   ├── pdf/
│   ├── pptx/
│   ├── docx/
│   ├── xlsx/
│   ├── messaging-framework/  #   Structured messaging architecture
│   ├── press-release/        #   AP-style press releases with governance
│   ├── proposal/
│   └── remotion-video/
├── companies/                # Company brand & content data
│   ├── dukestrategies/       #   Default brand (always present)
│   └── <collab>/             #   Optional collaborative brands
├── src/                      # Shared workspace utilities
├── package.json              # Node.js dependencies
└── pyproject.toml            # Python dependencies
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

## Brand Architecture

This plugin ships with **Duke Strategies as the default brand**. All skills automatically use `companies/dukestrategies/` unless the user explicitly names a different brand.

### Default behavior
- Skills load `companies/dukestrategies/brand/charter.json` without asking
- Company identity, proposal content, and visual assets all come from `companies/dukestrategies/`

### Collaborative / alternate brands
For "Duke x Partner" or other collaborative deliverables:
1. Add the partner brand under `companies/<partner-slug>/` with at minimum `brand/charter.json`
2. Skills will use the named brand's charter, falling back to Duke for any missing fields
3. The user triggers this by naming the brand (e.g., "use Stromy branding", "Duke x Stromy deck")

### Unbranded output
If the user explicitly asks for unbranded output, skills skip all brand integration and use format defaults.

### Brand data sync
Brand data in `companies/dukestrategies/brand/` originates from the `brand-tokens` repo and is synced via `stromy-org/scripts/sync-brand-data.sh`. All brand edits must go through `brand-tokens/` — the sync overwrites local changes.

## Key Rules

- Never reference `.claude/companies/` or `.claude/skills/` — use `companies/` and `skills/` directly
- Node requires must be flat (`require('pkg')` not `require('../../../../node_modules/pkg')`)
- Workspace imports use `require('../../src/workspace')` (2 levels from skill scripts)
- Company data lives at `companies/dukestrategies/` (not `.claude/companies/`)
- `companies/` stays at plugin root — it is cross-cutting data shared by all skills, not a skill itself
