# Phase 1: Foundation - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up all infrastructure that every subsequent phase depends on: platform configured, design tokens defined, GSAP loaded, nav structure in place, Git repo initialized. Nothing visual yet — just the bones everything builds on.

</domain>

<decisions>
## Implementation Decisions

### Platform (CRITICAL CHANGE — Roadmap update required)
- **Platform changed from Squarespace Business to GitHub Pages (free static hosting)**
- User has domain registration (formerly Google Domains, now via Squarespace DNS) but no Squarespace hosting plan
- Host on GitHub Pages; switch to Netlify if GitHub Pages causes issues (Netlify connects to same GitHub repo)
- Stack: Raw HTML/CSS/JS files — no static site generator for now
- Edit locally → commit → push to GitHub → GitHub Pages auto-deploys
- **IMPORTANT: ROADMAP.md was written for Squarespace 7.1 Business. All Squarespace-specific tasks (code injection, AJAX pattern, sqs-* selectors, template selection test) are no longer relevant. Roadmap phases need to be updated for a static HTML site before planning begins.**

### Design tokens / Aesthetic direction
- Color direction: warm neutrals as base (paper-like, off-whites/warm grays) + indie internet personality
- "Indie internet" = tumblr/pixel art culture, personal blogs with fun animations, handmade feel — NOT corporate, NOT agency-polished, NOT Cargo-style templates
- Reference feel: game UI with keyboard navigation hints overlaid (control hints on screen, playful, clean) — cozy/relaxed
- Naming convention: semantic (`--color-text`, `--color-bg-surface`, `--color-accent`) — named by role, not value
- Typography: Claude's discretion — propose a pairing that fits warm/cozy/indie feel; user will review after first draft

### Git workflow
- GitHub Pages: `main` branch = live site
- Local structure: `/css/`, `/js/`, `/pages/` (or equivalent static structure)
- Plain files — no build tools, no npm, no bundler in Phase 1

### Nav structure
- **Final nav: Home | Work | Writing | About | Contact**
- "Contact" is an anchor link (`/about#contact`) — not a separate page
- "Earlier Work" section: code stubbed as a hidden page, NOT in nav — added in Phase 6
- Placeholder pages in Phase 1: **minimal real structure** — correct HTML skeleton (header, main, footer, CSS class hooks) with placeholder text, not empty files
- Footer on every page: email/contact link (ever-present contact fallback)

### Phase 1 scope (what "done" means)
- GitHub Pages repo configured and serving the domain
- All 5 nav destinations exist as HTML files with correct skeleton structure
- CSS custom properties file in place with color tokens, spacing, type scale (even if values are provisional)
- GSAP 3 + ScrollTrigger loaded via CDN in the base HTML template
- Footer present on all pages (even if minimal — email link as placeholder)
- Earlier Work page stubbed but hidden

### Claude's Discretion
- Exact typography pairing (propose and show before committing)
- GSAP version pinning strategy (latest stable vs. locked version)
- Specific CSS folder/file organization within the repo
- Whether to use a base HTML template file or repetition across pages for Phase 1

</decisions>

<specifics>
## Specific Ideas

- "Indie internet" aesthetic reference: personal web / tumblr / pixel art culture energy — the feeling of someone's actual website, not a portfolio template
- Reference interaction: game UI with keyboard control hints on screen (like a game showing "WASD to move") — playful, clean, UI-forward
- Warm paper tones as color base, but with quirky personality layered on top
- "It's MY website and it represents ME" — this is the guiding principle for all aesthetic decisions

</specifics>

<deferred>
## Deferred Ideas

- Template selection (Paloma vs. Hester) — no longer relevant; platform changed to GitHub Pages
- Squarespace AJAX re-init pattern — no longer relevant; no Squarespace AJAX navigation
- Static site generator (Eleventy/Jekyll) — deferred; start with raw HTML and add if repetition becomes a problem
- Netlify deployment — start with GitHub Pages; switch if needed

## Critical Follow-up Before Planning
- **ROADMAP.md must be updated to reflect the GitHub Pages platform change before `/gsd:plan-phase 1` is run**
- All Squarespace-specific deliverables in Phase 1 and downstream phases need to be replaced with static site equivalents
- Suggest: run `/gsd:new-project` or manually edit ROADMAP.md to update Phase 1 deliverables and review Phases 2–10 for Squarespace-specific assumptions

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-02-24*
