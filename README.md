# Duke Strategies Deliverables

Claude Code plugin for producing branded deliverables for Duke Strategies.

## Skills Included

| Skill | Command | Description |
|-------|---------|-------------|
| pdf | `/duke-strategies:pdf` | Create branded PDFs |
| pptx | `/duke-strategies:pptx` | Create branded presentations |
| docx | `/duke-strategies:docx` | Create branded documents |
| xlsx | `/duke-strategies:xlsx` | Create branded spreadsheets |
| proposal | `/duke-strategies:proposal` | Build consulting proposals |
| remotion-video | `/duke-strategies:remotion-video` | Create branded videos |

## Installation

### Prerequisites

- Claude Code v2.1.49+ (with plugin support)
- Node.js 18+
- Python 3.11+ with [uv](https://docs.astral.sh/uv/) (for xlsx/pdf scripts)

### Setup

1. Add the private marketplace:
   ```
   /plugin marketplace add stromy-org/client-plugins-marketplace
   ```

2. Install the plugin:
   ```
   /plugin install duke-strategies@stromy-org/client-plugins-marketplace
   ```

3. Install dependencies (first time only):
   ```bash
   cd ~/.claude/plugins/cache/duke-strategies
   npm install
   uv sync
   ```

### Local Development

```bash
claude --plugin-dir /path/to/duke-strategies-plugin
```

## Usage

Start Claude Code in any project directory and use the plugin skills:

- All output uses Duke Strategies branding (colors, fonts, logo) automatically
- Skills are accessed as `/duke-strategies:<skill-name>`

## MCP Server

The plugin includes a `dukestrategies-mcp` server for strategy analysis tools. It expects a local clone of the MCP repo as a sibling:

```bash
# Clone the MCP server alongside the plugin
git clone git@github.com:stromy-org/dukestrategies-mcp.git ../MCPs/dukestrategies-mcp
cd ../MCPs/dukestrategies-mcp && uv sync
```

The `.mcp.json` config uses `${CLAUDE_PLUGIN_ROOT}` to locate the server relative to the plugin.

## Company Data

Brand data is in `companies/dukestrategies/brand/charter.json` and includes:
- Color palette (primary, secondary, accent)
- Typography (heading, body, monospace fonts)
- Logo files and paths

## Updating

```
/plugin update duke-strategies
```

Or pull the latest version:
```bash
cd ~/.claude/plugins/cache/duke-strategies
git pull
npm install
uv sync
```

## Version History

See [CHANGELOG.md](CHANGELOG.md) for version history.
