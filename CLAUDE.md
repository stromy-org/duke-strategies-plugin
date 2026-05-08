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
Brand data in `companies/dukestrategies/` originates from the `client-data` repo and is synced via `stromy-org/scripts/sync-client-data.sh`. All brand edits must go through `client-data/` — the sync overwrites local changes.

## Workspace Conventions

This plugin does NOT impose a fixed workspace directory. The user chooses where to work.

### Working location

- **Always ask the user** where to put deliverables. Suggest options based on context (next to input files, in a named project folder, etc.)
- **Never assume a default output location** — confirm with the user first
- If the user points to an existing folder that has a `WORKSPACE.md`, read it for background context before starting work

### WORKSPACE.md

A project folder MAY contain a `WORKSPACE.md` — a manifest tracking what has been produced and when. If one exists, read it. If the user establishes a new project folder, create one.

```markdown
# <Project Name>
Context: <one-line description>

## Deliverables
| Deliverable | Format | Last Built |
|-------------|--------|------------|
| stakeholder-deck | PPTX | 2026-05-07 |

## Recent Sessions
- 2026-05-07: Created stakeholder deck (18 slides) from intake articles
```

**Recency**: Recent sessions and deliverables are the most relevant context. Older entries remain as background — they inform scope and history but should not dominate decisions.

After completing work, update the WORKSPACE.md (deliverables table + append to Recent Sessions).

### Build scripts

When skills produce deliverables via build scripts, use `src/workspace.js` (Node) or `src/workspace.py` (Python) with the `outputDir` option set to the user's chosen location.

## Key Rules

- Never reference `.claude/companies/` or `.claude/skills/` — use `companies/` and `skills/` directly
- Node requires must be flat (`require('pkg')` not `require('../../../../node_modules/pkg')`)
- Workspace imports: use walk-up pattern to find `src/workspace` (see workspace resolver)
- Company data lives at `companies/dukestrategies/` (not `.claude/companies/`)
- `companies/` stays at plugin root — it is cross-cutting data shared by all skills, not a skill itself
