# Duke Strategies Deliverables

Claude Code plugin for producing branded deliverables for Duke Strategies.

## Skills

| Skill | Command | What it does |
|-------|---------|-------------|
| PDF | `/duke-strategies:pdf` | Create, merge, split, fill branded PDFs |
| Presentations | `/duke-strategies:pptx` | Create branded PowerPoint decks |
| Documents | `/duke-strategies:docx` | Create branded Word documents |
| Spreadsheets | `/duke-strategies:xlsx` | Create financial models and data sheets |
| Proposals | `/duke-strategies:proposal` | Full consulting proposal workflow |
| Videos | `/duke-strategies:remotion-video` | Create branded animated videos |

All output uses Duke Strategies branding (colors, fonts, logos, photography) automatically.

## Prerequisites

| Requirement | Version | Why |
|-------------|---------|-----|
| Claude Code or Cowork | v2.1.49+ | Plugin runtime |
| Node.js | 18+ | PPTX, DOCX, Remotion skills |
| Python | 3.11+ | PDF, XLSX skills |
| [uv](https://docs.astral.sh/uv/) | latest | Python dependency manager |
| GitHub access | — | Private repos `stromy-org/duke-strategies-plugin` and `stromy-org/duke-strategies-marketplace` |

## Installation

### Option A: Via Marketplace (recommended for team members)

**Step 1** — Add the marketplace (one-time):

```
/plugin marketplace add stromy-org/duke-strategies-marketplace
```

**Step 2** — Install the plugin:

```
/plugin install duke-strategies
```

**Step 3** — Install dependencies (one-time):

```bash
cd ~/.claude/plugins/cache/duke-strategies
npm install
uv sync
```

You're done. Skills are now available in all sessions.

### Option B: Local development

```bash
# Clone the repo
git clone git@github.com:stromy-org/duke-strategies-plugin.git
cd duke-strategies-plugin

# Install dependencies
npm install
uv sync

# Launch Claude Code with the plugin loaded
claude --plugin-dir .
```

### Where to run these commands

| Interface | Where to type commands |
|-----------|----------------------|
| **Claude Code CLI** | Directly in the terminal |
| **Cowork** (Claude Desktop) | In the Cowork chat input — type `/plugin` |
| **Code Tab** (Claude Desktop) | In the Code Tab chat input — type `/plugin` |

## MCP Server (optional)

The plugin bundles a connection to `dukestrategies-mcp` for strategy analysis tools (SWOT, priority scoring, strategic prompts). This requires the MCP repo to be cloned alongside the plugin:

```bash
git clone git@github.com:stromy-org/dukestrategies-mcp.git
cd dukestrategies-mcp && uv sync
```

The `.mcp.json` uses `${CLAUDE_PLUGIN_ROOT}/../MCPs/dukestrategies-mcp` to locate the server. If the MCP repo is not present, the plugin still works — you just won't have the analysis tools.

## Updating

When a new version is available:

```
/plugin update duke-strategies
```

Then re-install dependencies if they changed:

```bash
cd ~/.claude/plugins/cache/duke-strategies
npm install
uv sync
```

## Company Data

Brand assets in `companies/dukestrategies/`:

| File | Contents |
|------|----------|
| `brand/charter.json` | Colors, fonts, logos, margins, photography, video settings |
| `brand/images/` | Brand photography (4 Dutch bridge images) |
| `profile.json` | Company identity, services, pricing, legal terms |
| `proposals/` | Case studies, team bios, methodologies, testimonials, boilerplate |

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
