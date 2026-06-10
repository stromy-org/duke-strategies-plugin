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

## Canvas UX

Strategic skills (`proposal`, `messaging-framework`, `press-release`) draft the in-progress deliverable in a single **chat markdown artifact** — the deliverable canvas. Each section (Context, Approach, Pricing, etc.) is iterated in that artifact: you give feedback in chat, the agent revises and re-emits the same artifact. The canvas — not chat scroll-back — is the source of truth for the document.

Only after you explicitly sign off on the canvas does the agent hand the finalized sections to a formatter (`pptx`, `docx`, `pdf`) to render the branded document. No server or extra setup is involved — the canvas lives entirely in the chat. One chat = one canvas; to revise later, reopen the chat or paste the markdown into a new one.

## Prerequisites

| Requirement | Version | Why |
|-------------|---------|-----|
| Claude Code | v2.1.49+ | Plugin runtime (CLI or Desktop Code tab) |
| Node.js | 18+ | PPTX, DOCX, Remotion skills |
| Python | 3.11+ | PDF, XLSX skills |
| [uv](https://docs.astral.sh/uv/) | latest | Python dependency manager |

## Installation

### Option A: Via Marketplace (recommended)

See the [marketplace README](https://github.com/stromy-org/duke-strategies-marketplace) for full instructions. Quick version:

```bash
# Add marketplace + install (one-time)
claude plugin marketplace add stromy-org/duke-strategies-marketplace
claude plugin install duke-strategies@duke-strategies-marketplace

# Install dependencies (one-time)
cd ~/.claude/plugins/cache/duke-strategies-marketplace/duke-strategies/0.1.0
npm install
uv sync
```

### Option B: Local development

```bash
git clone https://github.com/stromy-org/duke-strategies-plugin.git
cd duke-strategies-plugin
npm install && uv sync
claude --plugin-dir .
```

## Where skills work

| Interface | Skills available? | Notes |
|-----------|:-:|-------|
| **Claude Code CLI** | Yes | Terminal — full plugin support |
| **Desktop app — Code tab** | Yes | Same runtime as CLI |
| **Desktop app — Cowork tab** | Pending | Known limitation; expected to be resolved |

## Architecture

This plugin delivers **skills** (procedural knowledge — how to create branded deliverables). The companion [dukestrategies-mcp](https://github.com/stromy-org/dukestrategies-mcp) server delivers **tools** (callable functions — strategy analysis, priority scoring).

- **Plugin** = skills + brand data + company info
- **MCP** = tools + prompts + resources

## Updating

```bash
claude plugin update duke-strategies@duke-strategies-marketplace
cd ~/.claude/plugins/cache/duke-strategies-marketplace/duke-strategies/0.1.0
npm install && uv sync
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
