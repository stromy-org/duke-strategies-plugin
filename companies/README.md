# Company Data

Brand, identity, and content library data used by all skills in this plugin.

## Default Brand

`dukestrategies/` is the default brand — skills use it automatically without prompting.

## Structure

```
companies/
├── dukestrategies/              # Default (always present)
│   ├── profile.json             # Company identity, services, pricing, legal
│   ├── brand/
│   │   ├── charter.json         # Colors, fonts, logos, formatting rules
│   │   ├── logo.png             # Primary logo
│   │   ├── logo_white.png       # White variant for dark backgrounds
│   │   └── images/              # Brand photography
│   └── proposals/               # Proposal content library
│       ├── case-studies.json
│       ├── team-bios.json
│       ├── methodologies.json
│       ├── boilerplate.json
│       ├── testimonials.json
│       ├── differentiators.json
│       └── partnerships.json
└── <partner-slug>/              # Optional collaborative brand
    ├── brand/charter.json       # At minimum — colors, fonts, logo
    └── profile.json             # Optional — partner company identity
```

## Adding a Collaborative Brand

For "Duke x Partner" deliverables:

1. Create `companies/<partner-slug>/brand/charter.json` with the partner's colors, fonts, and logo paths
2. Optionally add `profile.json` for company identity (name, tagline)
3. Place logo files in `companies/<partner-slug>/brand/`
4. Skills will use the named brand, falling back to Duke for any missing fields

## Brand Data Sync

Brand data in `dukestrategies/brand/` is synced from the `brand-tokens` repo. Do not edit these files directly — changes will be overwritten on next sync. All brand edits go through `brand-tokens/`.
