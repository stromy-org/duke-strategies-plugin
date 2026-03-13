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
| Claude Code | v2.1.49+ | Plugin runtime (CLI or Desktop Code tab) |
| Node.js | 18+ | PPTX, DOCX, Remotion skills |
| Python | 3.11+ | PDF, XLSX skills |
| [uv](https://docs.astral.sh/uv/) | latest | Python dependency manager |
| GitHub access | — | Collaborator on `stromy-org/duke-strategies-plugin` (private) |

## Installation

### Option A: Via Marketplace (recommended for team members)

> **Important:** This plugin repo is private. Installation must be done from the **CLI** (terminal), not from the Cowork desktop UI. The Cowork "Browse plugins" UI cannot access private repos. See the [marketplace README](https://github.com/stromy-org/duke-strategies-marketplace) for full setup instructions including GitHub token configuration.

```bash
# 0. Set up GitHub token (one-time, see marketplace README)
gh auth login
echo 'export GITHUB_TOKEN=$(gh auth token)' >> ~/.zshrc && source ~/.zshrc

# 1. Add marketplace (one-time)
claude plugin marketplace add stromy-org/duke-strategies-marketplace

# 2. Install plugin
claude plugin install duke-strategies@duke-strategies-marketplace

# 3. Install dependencies (one-time)
cd ~/.claude/plugins/cache/duke-strategies-marketplace/duke-strategies/0.1.0
npm install
uv sync
```

Skills are now available in all Claude Code sessions (CLI and Desktop Code tab).

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

### Where skills work

| Interface | Skills available? | Notes |
|-----------|:-:|-------|
| **Claude Code CLI** | Yes | Terminal — full plugin support |
| **Desktop app — Code tab** | Yes | Same runtime as CLI |
| **Desktop app — Cowork tab** | No | Different runtime, does not load Claude Code plugins |
| **Desktop app — Chat tab** | No | Web chat, no plugin support |

## Updating

```bash
claude plugin update duke-strategies@duke-strategies-marketplace
```

Then re-install dependencies if they changed:

```bash
cd ~/.claude/plugins/cache/duke-strategies-marketplace/duke-strategies/0.1.0
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
