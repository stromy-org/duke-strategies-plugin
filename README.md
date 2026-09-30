# Duke Strategies Deliverables

Claude plugin for Duke Strategies: branded deliverables (decks, documents, PDFs, charts, video), Dutch public-affairs research, and the strategic skills that draft proposals, press releases and messaging in Duke's voice. All output uses Duke Strategies branding (colours, fonts, logo, bridge photography) automatically — the brand overlay ships inside the plugin.

## Installation

**In Claude (desktop or web — Cowork, Claude for Work / Team):**

1. Open **Settings → Plugins** (or **Connectors & plugins**).
2. **Add marketplace** → enter `stromy-org/duke-strategies-marketplace`.
3. Click **Duke Strategies** → **Install**.
4. In **Settings → Connectors**, switch on the two Stromy connectors the plugin uses: **stromy-format** (rendering) and **nl-gov-data** (Dutch government data). In a chat, the **`+` menu → Connectors** shows which ones are on for that conversation.

Then say `/duke-strategies:getting-started` in any chat — the guide walks through the setup, the two snags people hit, and which skill answers which question.

**From the Claude Code CLI:**

```bash
claude plugin marketplace add stromy-org/duke-strategies-marketplace
claude plugin install duke-strategies@duke-strategies-marketplace
# one-time dependencies for the local (non-MCP) skills
cd ~/.claude/plugins/cache/duke-strategies-marketplace/duke-strategies/<version>
npm install && uv sync
```

**Local development:**

```bash
git clone https://github.com/stromy-org/duke-strategies-plugin.git
cd duke-strategies-plugin
npm install && uv sync
claude --plugin-dir .
```

## Where skills work

| Interface | Skills available? | Notes |
|-----------|:-:|-------|
| **Claude desktop / web — Cowork, Claude for Work** | Yes | Install via **Settings → Plugins**; connectors via **Settings → Connectors** |
| **Claude Code CLI** | Yes | Terminal — full plugin support |
| **Claude desktop — Code tab** | Yes | Same runtime as the CLI |

## Skills

Invoke any skill as `/duke-strategies:<skill>`. Most skills are **hosted** on a Stromy connector and fetched live, so they update without reinstalling the plugin; the strategic skills and the guide ship inside the plugin.

### Start here

| Skill | What it does |
|-------|--------------|
| `getting-started` | Install your plugin, switch on your tools, and find your way to the right guide. |
| `format-guide` | How the rendering connector works and which format skill to reach for. |
| `nl-guide` | How the Dutch government-data connector works and which research skill to reach for. |
| `asset-guide` | How the shared workspace and asset tools work. |
| `wf-guide` | How the workflow skills (stakeholder analysis) work. |

### Strategic deliverables (drafted in Duke's voice, on the deliverable canvas)

| Skill | What it does |
|-------|--------------|
| `proposal` | Full consulting proposal workflow — context, approach, team, pricing, terms. |
| `messaging-framework` | Build a messaging house: core narrative, pillars, proof points, audience variants. |
| `press-release` | Draft a press release with quotes, boilerplate and notes to editors. |
| `organic-social-campaign` | Plan and write an organic social campaign across LinkedIn and beyond. |

### Branded documents, decks and media (stromy-format connector)

| Skill | What it does |
|-------|--------------|
| `format-prepare-document` | Start here for any substantial document: plan the structure together, then produce it in the right format. |
| `format-pptx-hd` | Create a new on-brand PowerPoint deck from scratch, in your own fonts and colours. |
| `format-pptx` | Edit, review or analyse an existing PowerPoint file, including comments and speaker notes. |
| `format-docx` | Create or edit Word documents, including tables of contents, headers and letterheads. |
| `format-pdf-hd` | Produce a polished, on-brand PDF such as a proposal, report or one-pager, ready to send. |
| `format-pdf` | Work with existing PDF files: pull out text and tables, merge, split, or fill in forms. |
| `format-xlsx` | Create or analyse spreadsheets, with formulas, formatting and charts. |
| `format-chart` | Turn your numbers into a clean, on-brand chart you can drop into any deliverable. |
| `format-diagram` | Draw a process, structure or relationship as an on-brand diagram for your documents. |
| `format-mermaid` | Sketch a quick diagram for documentation or a wiki, written as text rather than drawn by hand. |
| `format-html-hd` | Build a polished slide deck as a single web page that opens offline and shares as one file. |
| `format-html-reveal` | Build a shareable web-based slide deck you can click through in any browser, offline. |
| `format-motion` | Add restrained, on-brand animation to a deck or web page so movement adds meaning, not noise. |
| `format-video-hd` | Produce a short branded explainer video with animated titles, visuals and optional voiceover. |
| `format-i18n` | Keep a deliverable's language versions in step — translate only what changed. |
| `format-workspace-memory` | Keep a shared record of a project so work picks up where it left off instead of re-briefing. |

### Dutch public affairs research (nl-gov-data connector)

| Skill | What it does |
|-------|--------------|
| `nl-policy-legislative-landscape` | Get the full picture of Dutch policy and legislation on a topic, in one report. |
| `nl-dossier-tracker` | Get a deep brief on one Dutch legislative file: where it stands, what happened, and how likely it is to pass. |
| `nl-parliamentary-positioning` | Map who in Dutch politics is active on your topic: MPs, parties, committees and ministries. |
| `nl-issue-framing` | See how your organisation, product or issue is talked about in official Dutch records. |
| `nl-horizon-scan` | Look 6 to 36 months ahead at Dutch policy and regulation likely to affect you. |
| `nl-accountability` | Check what Dutch ministers promised against what was actually delivered, with sources. |
| `nl-tensions` | Find contradictions and said-versus-did gaps in Dutch policy that others have missed. |
| `nl-eu-transposition` | See how an EU directive is being written into Dutch law, and where the gaps and delays are. |
| `nl-evidence-grounding` | Fact-check a Dutch policy claim or figure against the official record. |
| `nl-monitor` | Set up a recurring watch on Dutch parliamentary activity and get a regular briefing. |
| `nl-gov-data` | Ask open questions of the Dutch government record when no other research skill quite fits. |

### Workspace, assets and feedback

| Skill | What it does |
|-------|--------------|
| `wf-stakeholder-analysis` | Map who supports or resists a decision, and what would move them. |
| `asset-workspace-setup` | Set up how your shared workspace is organised, so deliverables land where your team expects them. |
| `asset-editor` | Change your own website content or brand details and send it for review, with no code needed. |
| `asset-feedback` | Tell us what worked and what did not, so the tools and your setup keep improving. |

## Canvas UX

Strategic skills (`proposal`, `messaging-framework`, `press-release`, `organic-social-campaign`) draft the in-progress deliverable in a single **chat markdown artifact** — the deliverable canvas. Each section is iterated in that artifact: you give feedback in chat, the agent revises and re-emits the same artifact. The canvas — not chat scroll-back — is the source of truth for the document.

Only after you explicitly sign off on the canvas does the agent hand the finalised sections to a formatter (`format-pptx-hd`, `format-docx`, `format-pdf-hd`) to render the branded document. One chat = one canvas; to revise later, reopen the chat or paste the markdown into a new one.

## Architecture

This plugin delivers **skills** (procedural knowledge) plus the **Duke Strategies brand and company overlay**. Tools live on two hosted Stromy connectors, declared in `.mcp.json`:

| Connector | What it provides |
|-----------|------------------|
| `stromy-format` | Server-side rendering of decks, documents, PDFs, diagrams, charts and video in the Duke brand, plus the hosted `format-*` skill bodies |
| `nl-gov-data` | Dutch government open data — legislation, parliamentary records, Rijksoverheid documents — plus the hosted `nl-*` skill bodies |

Per-user sign-in on both connectors is via Microsoft Entra ID.

## Company data

The brand and company overlay in `companies/dukestrategies/` is a **generated copy** of the canonical `client-data` record (see `.brand-sync-version.json`); it is refreshed automatically when the canonical data changes. Do not edit it here.

| Path | Contents |
|------|----------|
| `charter.json`, `brand_context.json`, `tokens.css` | Colours, fonts, logo rules, layout, the full brand expression every renderer reads |
| `logos/`, `fonts/`, `assets/` | Logo variants, favicon set, the Montserrat + Space Mono files, motif SVGs |
| `images/` + `images/manifest.json` | The bridge photography library (20 images) with roles, crops and treatments |
| `company_context.json`, `boilerplate.json`, `workspace.json` | Company facts, fixed strings (footers, sign-offs, legal), the SharePoint workspace map |
| `voice/`, `messaging/`, `proposals/`, `press-releases/`, `templates/` | Voice profile, messaging pillars, proposal building blocks, release assets, DOCX/HTML templates |
| `guidelines.md` | The brand guidelines, derived view |

## Maintenance

This plugin is a **product**, not a coding workspace: it ships no agent-instruction files and keeps only `.mcp.json` (+ its `.agents/mcp.json` source) for connector wiring. Maintaining it is an operator task driven by the `plugin-maintain` skill in stromy-org, run against this plugin; skill stubs and the brand overlay are regenerated by stromy-org's sync workflows, never edited here.

## Updating

```bash
claude plugin update duke-strategies@duke-strategies-marketplace
```

In the Claude app, **Settings → Plugins** shows the installed version; update from the marketplace entry there.

## License

See [LICENSE](LICENSE) for terms.
