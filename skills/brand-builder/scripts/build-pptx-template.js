/**
 * build-pptx-template.js — Brand template PPTX scaffold (10 slide types)
 *
 * Generates a branded presentation template with 10 slide types using
 * pptxgenjs + html2pptx. Reads brand data from a config object that the
 * brand-builder skill populates during Phase 4.
 *
 * USAGE (from workspace/<client>/build/brand/):
 *   1. Copy this file to your build directory
 *   2. Set BRAND config object with Phase 2/3 outputs
 *   3. node build-pptx-template.js
 *
 * REQUIRES: pptxgenjs, sharp (both in root node_modules)
 */

const path = require('path');
const fs = require('fs');
const { ensureOutputDir } = require('../../../src/workspace');
const html2pptx = require('../../pptx/scripts/html2pptx');
const pptxgen = require('pptxgenjs');

// ============================================================
// BRAND CONFIG — populate from Phase 2/3 brand decisions
// ============================================================
const BRAND = {
  name: 'BRANDNAME',
  tagline: 'Your tagline here',
  domain: 'example.com',
  contact: 'hello@example.com',

  // Colors (from Phase 2 palette — strip # prefix for pptxgenjs)
  colors: {
    dark:       '0B0B0B',   // near-black background
    brand:      '2E5090',   // primary brand color
    accent:     'E67E22',   // accent / CTA color
    brandLight: '5B9BD5',   // lighter brand shade (scales 300-500)
    n800:       '1F2937',   // dark card background
    n600:       '6B7280',   // secondary text (light mode)
    n500:       '9CA3AF',   // tertiary text
    n200:       'E5E7EB',   // borders
    n50:        'F9FAFB',   // light background
    white:      'FFFFFF',   // pure white
  },

  // Fonts (from Phase 2 typography — web-safe only for PPTX)
  fonts: {
    display: 'Georgia',          // serif display (map brand serif to web-safe)
    body:    'Arial',            // sans body
    mono:    'Courier New',      // monospace
  },

  // Industry placeholder content (adjust per brand)
  industry: 'consulting',
};

const C = BRAND.colors;
const F = BRAND.fonts;

// ============================================================
// OUTPUT
// ============================================================
const outputDir = ensureOutputDir(__dirname);
const SLIDES_DIR = path.join(__dirname, 'slides');
const OUTPUT = path.join(outputDir, `${BRAND.name}-Template.pptx`);

// ============================================================
// HELPERS
// ============================================================

/** Base CSS injected into every slide HTML */
function baseCss() {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 720pt; height: 405pt; display: block; overflow: hidden; }
  `;
}

/** Wrap HTML body with base styles + optional background */
function slide(bg, bodyHtml) {
  const bgStyle = bg.startsWith('#')
    ? `background: ${bg};`
    : `background: #${bg};`;
  return `<!DOCTYPE html><html><head><style>${baseCss()}</style></head>
<body style="${bgStyle}">
${bodyHtml}
</body></html>`;
}

/** Standard overline label */
function overline(text, color = C.accent) {
  return `<p style="font-family: ${F.body}; font-size: 10pt; color: #${color};
    text-transform: uppercase; letter-spacing: 0.1em; font-weight: 500;">${text}</p>`;
}

/** Motif line — customize based on Phase 2 motif decision */
function motifLine(width = '100%', color = C.brand) {
  return `<div style="width: ${width}; height: 1.5px; background: #${color}; margin: 8pt 0;"></div>`;
}

/** Footer bar for content slides */
function footer(pageNum) {
  return `
    <div style="position: absolute; bottom: 0; left: 0; width: 720pt; height: 28pt;
      padding: 0 40pt; display: flex; align-items: center; justify-content: space-between;">
      ${motifLine('100%', C.n200)}
    </div>
    <div style="position: absolute; bottom: 6pt; left: 40pt;">
      <p style="font-family: ${F.body}; font-size: 8pt; color: #${C.n500};">${BRAND.name}</p>
    </div>
    <div style="position: absolute; bottom: 6pt; right: 40pt;">
      <p style="font-family: ${F.mono}; font-size: 8pt; color: #${C.n500};">${pageNum}</p>
    </div>`;
}

// ============================================================
// SLIDES
// ============================================================

function slideTitleCover() {
  return slide(C.dark, `
    <div style="position: absolute; top: 0; left: 0; width: 720pt; height: 4pt; background: #${C.brand};"></div>
    <div style="position: absolute; top: 120pt; left: 60pt; width: 600pt;">
      ${overline('PRESENTATION TITLE')}
      <h1 style="font-family: ${F.display}; font-size: 36pt; color: #${C.white};
        margin-top: 12pt; line-height: 1.15;">${BRAND.name} Template</h1>
      ${motifLine('120pt')}
      <p style="font-family: ${F.body}; font-size: 12pt; color: #${C.n500}; margin-top: 16pt;">
        Prepared by ${BRAND.name} &middot; ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
    </div>
    <div style="position: absolute; bottom: 30pt; right: 40pt;">
      <p style="font-family: ${F.mono}; font-size: 9pt; color: #${C.brandLight};">${BRAND.domain}</p>
    </div>
  `);
}

function slideContents() {
  const sections = [
    { num: '01', title: 'Executive Summary', desc: 'Key findings and strategic overview' },
    { num: '02', title: 'Market Analysis', desc: 'Competitive landscape and opportunities' },
    { num: '03', title: 'Strategic Recommendations', desc: 'Prioritized actions and timelines' },
    { num: '04', title: 'Implementation Plan', desc: 'Phased approach with milestones' },
  ];
  const items = sections.map(s => `
    <div style="display: flex; align-items: baseline; padding: 10pt 0;
      border-bottom: 1px solid #${C.n200};">
      <p style="font-family: ${F.display}; font-size: 24pt; color: #${C.brandLight};
        width: 50pt;">${s.num}</p>
      <div>
        <p style="font-family: ${F.display}; font-size: 14pt; color: #${C.dark};">${s.title}</p>
        <p style="font-family: ${F.body}; font-size: 10pt; color: #${C.n600}; margin-top: 2pt;">${s.desc}</p>
      </div>
    </div>
  `).join('');

  return slide(C.n50, `
    <div style="position: absolute; top: 40pt; left: 60pt; width: 600pt;">
      ${overline('CONTENTS')}
      <h2 style="font-family: ${F.display}; font-size: 24pt; color: #${C.dark}; margin-top: 8pt;">
        Table of Contents</h2>
      <div style="margin-top: 20pt;">${items}</div>
    </div>
    ${footer(2)}
  `);
}

function slideSectionDivider(num, title, subtitle) {
  return slide(C.brand, `
    <div style="position: absolute; top: 100pt; left: 60pt; width: 600pt;">
      <p style="font-family: ${F.display}; font-size: 56pt; color: #${C.white}40;">${num}</p>
      <h1 style="font-family: ${F.display}; font-size: 32pt; color: #${C.white};
        margin-top: 8pt;">${title}</h1>
      ${motifLine('80pt', C.white)}
      <p style="font-family: ${F.body}; font-size: 14pt; color: #${C.white}CC;
        margin-top: 12pt;">${subtitle}</p>
    </div>
  `);
}

function slideKeyMetrics() {
  const metrics = [
    { value: '23%', label: 'Revenue Growth', delta: '+5pp YoY' },
    { value: '4.2x', label: 'ROI Achieved', delta: 'vs. 2.8x target' },
    { value: '98%', label: 'Client Retention', delta: 'Top quartile' },
    { value: '147', label: 'Projects Delivered', delta: 'Since 2020' },
  ];
  const cards = metrics.map(m => `
    <div style="width: 140pt; background: #${C.n800}; border-radius: 4px; padding: 16pt;
      border-top: 3px solid #${C.accent};">
      <p style="font-family: ${F.display}; font-size: 28pt; color: #${C.white};">${m.value}</p>
      <p style="font-family: ${F.body}; font-size: 10pt; color: #${C.n500};
        margin-top: 6pt;">${m.label}</p>
      <p style="font-family: ${F.mono}; font-size: 8pt; color: #${C.brandLight};
        margin-top: 4pt;">${m.delta}</p>
    </div>
  `).join('');

  return slide(C.dark, `
    <div style="position: absolute; top: 40pt; left: 60pt;">
      ${overline('KEY METRICS')}
      <h2 style="font-family: ${F.display}; font-size: 24pt; color: #${C.white}; margin-top: 8pt;">
        Performance at a Glance</h2>
    </div>
    <div style="position: absolute; top: 120pt; left: 60pt; display: flex; gap: 12pt;">
      ${cards}
    </div>
  `);
}

function slideTwoColumn() {
  return slide(C.white, `
    <div style="position: absolute; top: 40pt; left: 60pt; width: 300pt;">
      ${overline('ANALYSIS')}
      <h2 style="font-family: ${F.display}; font-size: 22pt; color: #${C.dark}; margin-top: 8pt;">
        Two-Column Layout</h2>
      ${motifLine('60pt')}
      <p style="font-family: ${F.body}; font-size: 12pt; color: #${C.n600}; margin-top: 12pt;
        line-height: 1.6;">
        Use the left column for narrative text with key findings, analysis, or strategic
        recommendations. Keep paragraphs short and scannable.
      </p>
    </div>
    <div style="position: absolute; top: 40pt; right: 60pt; width: 260pt; height: 280pt;
      background: #${C.n50}; border-radius: 6px; border: 1px solid #${C.n200};
      display: flex; align-items: center; justify-content: center;">
      <p style="font-family: ${F.mono}; font-size: 10pt; color: #${C.n500};">Visual / Chart Area</p>
    </div>
    ${footer(5)}
  `);
}

function slideThreeCard() {
  const cards = [
    { num: '01', title: 'Discovery', desc: 'Stakeholder interviews, data audit, and current-state assessment' },
    { num: '02', title: 'Analysis', desc: 'Gap analysis, benchmarking, and opportunity identification' },
    { num: '03', title: 'Delivery', desc: 'Strategic roadmap, implementation plan, and change support' },
  ];
  const html = cards.map(c => `
    <div style="width: 190pt; background: #${C.white}; border: 1px solid #${C.n200};
      border-radius: 6px; padding: 20pt;">
      <p style="font-family: ${F.display}; font-size: 20pt; color: #${C.brandLight};">${c.num}</p>
      <p style="font-family: ${F.display}; font-size: 14pt; color: #${C.dark};
        margin-top: 8pt;">${c.title}</p>
      <p style="font-family: ${F.body}; font-size: 10pt; color: #${C.n600};
        margin-top: 6pt; line-height: 1.5;">${c.desc}</p>
    </div>
  `).join('');

  return slide(C.n50, `
    <div style="position: absolute; top: 40pt; left: 60pt;">
      ${overline('APPROACH')}
      <h2 style="font-family: ${F.display}; font-size: 22pt; color: #${C.dark}; margin-top: 8pt;">
        Our Three-Phase Approach</h2>
    </div>
    <div style="position: absolute; top: 120pt; left: 60pt; display: flex; gap: 12pt;">
      ${html}
    </div>
    ${footer(6)}
  `);
}

function slideDataTable() {
  const rows = [
    ['Digital Transformation', 'Q2 2025', 'In Progress', '$1.2M'],
    ['Data Strategy', 'Q3 2025', 'Planned', '$680K'],
    ['Process Optimization', 'Q4 2025', 'Planned', '$450K'],
    ['Change Management', 'Q1 2026', 'Scoping', '$320K'],
  ];
  const headerRow = `
    <div style="display: flex; background: #${C.brand}; padding: 8pt 12pt; border-radius: 4px 4px 0 0;">
      <p style="font-family: ${F.body}; font-size: 10pt; color: #${C.white}; font-weight: bold; width: 200pt;">Initiative</p>
      <p style="font-family: ${F.body}; font-size: 10pt; color: #${C.white}; font-weight: bold; width: 100pt;">Timeline</p>
      <p style="font-family: ${F.body}; font-size: 10pt; color: #${C.white}; font-weight: bold; width: 100pt;">Status</p>
      <p style="font-family: ${F.body}; font-size: 10pt; color: #${C.white}; font-weight: bold; width: 100pt;">Investment</p>
    </div>`;
  const dataRows = rows.map((r, i) => `
    <div style="display: flex; padding: 8pt 12pt; background: ${i % 2 === 0 ? `#${C.n50}` : `#${C.white}`};">
      <p style="font-family: ${F.body}; font-size: 10pt; color: #${C.dark}; width: 200pt;">${r[0]}</p>
      <p style="font-family: ${F.mono}; font-size: 10pt; color: #${C.n600}; width: 100pt;">${r[1]}</p>
      <p style="font-family: ${F.body}; font-size: 10pt; color: #${C.n600}; width: 100pt;">${r[2]}</p>
      <p style="font-family: ${F.mono}; font-size: 10pt; color: #${C.dark}; width: 100pt;">${r[3]}</p>
    </div>
  `).join('');

  return slide(C.white, `
    <div style="position: absolute; top: 40pt; left: 60pt; width: 600pt;">
      ${overline('DATA')}
      <h2 style="font-family: ${F.display}; font-size: 22pt; color: #${C.dark}; margin-top: 8pt;">
        Investment Overview</h2>
      <div style="margin-top: 20pt; border: 1px solid #${C.n200}; border-radius: 4px; overflow: hidden;">
        ${headerRow}${dataRows}
      </div>
      <p style="font-family: ${F.mono}; font-size: 8pt; color: #${C.n500}; margin-top: 6pt;
        font-style: italic;">Source: Internal planning data, March 2025</p>
    </div>
    ${footer(7)}
  `);
}

function slideQuote() {
  return slide(C.brand, `
    <div style="position: absolute; top: 80pt; left: 80pt; width: 560pt;">
      <div style="border-left: 4px solid #${C.accent}; padding-left: 24pt;">
        <h2 style="font-family: ${F.display}; font-size: 22pt; color: #${C.white};
          line-height: 1.4; font-style: italic;">
          &ldquo;The partnership with ${BRAND.name} transformed how we approach
          strategic planning. Their methodology brought clarity to complexity.&rdquo;
        </h2>
        <p style="font-family: ${F.body}; font-size: 12pt; color: #${C.white}CC; margin-top: 16pt;">
          &mdash; Jane Smith, Chief Strategy Officer, Acme Corp
        </p>
      </div>
    </div>
  `);
}

function slideNextSteps() {
  const steps = [
    { num: '1', action: 'Review and approve strategic roadmap', timeline: 'Week 1-2' },
    { num: '2', action: 'Mobilize project team and assign workstreams', timeline: 'Week 3' },
    { num: '3', action: 'Launch Phase 1 discovery workshops', timeline: 'Week 4-6' },
    { num: '4', action: 'First milestone review and course correction', timeline: 'Week 8' },
  ];
  const items = steps.map(s => `
    <div style="display: flex; align-items: flex-start; margin-bottom: 14pt;">
      <div style="width: 28pt; height: 28pt; background: #${C.brand}; border-radius: 50%;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <p style="font-family: ${F.body}; font-size: 12pt; color: #${C.white}; font-weight: bold;">${s.num}</p>
      </div>
      <div style="margin-left: 12pt; flex: 1;">
        <p style="font-family: ${F.body}; font-size: 12pt; color: #${C.dark};">${s.action}</p>
        <p style="font-family: ${F.mono}; font-size: 9pt; color: #${C.accent}; margin-top: 2pt;">${s.timeline}</p>
      </div>
    </div>
  `).join('');

  return slide(C.white, `
    <div style="position: absolute; top: 40pt; left: 60pt; width: 600pt;">
      ${overline('NEXT STEPS')}
      <h2 style="font-family: ${F.display}; font-size: 22pt; color: #${C.dark}; margin-top: 8pt;">
        Recommended Actions</h2>
      <div style="margin-top: 20pt;">${items}</div>
    </div>
    ${footer(9)}
  `);
}

function slideClosing() {
  return slide(C.dark, `
    <div style="position: absolute; top: 0; left: 0; width: 720pt; height: 4pt; background: #${C.brand};"></div>
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
      <h1 style="font-family: ${F.display}; font-size: 32pt; color: #${C.white};">${BRAND.name}</h1>
      ${motifLine('80pt')}
      <p style="font-family: ${F.body}; font-size: 14pt; color: #${C.n500}; margin-top: 12pt;">
        ${BRAND.tagline}</p>
      <p style="font-family: ${F.mono}; font-size: 10pt; color: #${C.brandLight}; margin-top: 20pt;">
        ${BRAND.domain}</p>
      <p style="font-family: ${F.mono}; font-size: 9pt; color: #${C.n600}; margin-top: 4pt;">
        ${BRAND.contact}</p>
    </div>
  `);
}

// ============================================================
// BUILD
// ============================================================

async function build() {
  if (!fs.existsSync(SLIDES_DIR)) fs.mkdirSync(SLIDES_DIR, { recursive: true });

  const slides = [
    { name: 'slide-01-title.html',       html: slideTitleCover() },
    { name: 'slide-02-contents.html',    html: slideContents() },
    { name: 'slide-03-divider.html',     html: slideSectionDivider('01', 'Executive Summary', 'Key findings and strategic overview') },
    { name: 'slide-04-metrics.html',     html: slideKeyMetrics() },
    { name: 'slide-05-twocol.html',      html: slideTwoColumn() },
    { name: 'slide-06-threecard.html',   html: slideThreeCard() },
    { name: 'slide-07-table.html',       html: slideDataTable() },
    { name: 'slide-08-quote.html',       html: slideQuote() },
    { name: 'slide-09-nextsteps.html',   html: slideNextSteps() },
    { name: 'slide-10-closing.html',     html: slideClosing() },
  ];

  // Write HTML files
  for (const s of slides) {
    fs.writeFileSync(path.join(SLIDES_DIR, s.name), s.html, 'utf-8');
    console.log(`  wrote ${s.name}`);
  }

  // Convert to PPTX
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = BRAND.name;
  pptx.subject = `${BRAND.name} Presentation Template`;

  for (const s of slides) {
    console.log(`  converting ${s.name}...`);
    await html2pptx(path.join(SLIDES_DIR, s.name), pptx);
  }

  await pptx.writeFile({ fileName: OUTPUT });
  console.log(`\nDone: ${OUTPUT}`);
}

build().catch(err => { console.error(err); process.exit(1); });
