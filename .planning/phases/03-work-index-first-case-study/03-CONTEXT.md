# Phase 3: Work Index + First Case Study - Context

**Gathered:** 2026-03-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the Work index at `/work/` and one complete 8-section case study page as a validated
template. All content is placeholder — real copy and assets are filled in after the site is
structurally complete. The template case study is the pattern Phase 4 replicates.

</domain>

<decisions>
## Implementation Decisions

### Work Index layout
- Slightly denser feel than the home page featured cards — not the same component reused verbatim
- Single column list (not a 2-column grid) — works identically on mobile, no reflow needed
- Each card shows: project title, specific role, platform/status as a text tag, then a short descriptor sentence
- Minimal page header — just "Work" (no intro paragraph; visitors came to see the work)
- Platform/status rendered as a visible text tag on the card face (not buried in body text)
- Card order = DOM order in `/work/index.html` — reordering means cut/paste the card block, nothing else

### Content and asset strategy
- Template-first: build the full 8-section structure with placeholder content, not real copy
- Image slots use `.thumb-grain` placeholder (crosshatch pattern, same as Phase 2) throughout
- Bracketed placeholder text for all copy fields (e.g. `[Project title]`, `[2–4 sentence summary]`)
- Real content filled in after the site is structurally complete — Phase 3 validates structure only

### Case study page layout
- Narrow reading column: 60–70ch, centered with generous side margins
- Hero (section 1): project title and metadata (role, platform, status) first — image/placeholder below
- Purely vertical scroll — no sticky sidebar, no in-page section nav
- Section separation: small-caps section labels in accent color (game-doc feel) + light origami accent mark between sections (echoes home page diamond geometry)
- Philosophy throughline (REQ-W04 — 1–3 sentences on well-being/pressure/meaning): rendered as a visual callout with terracotta left-border pull-quote treatment, matching home page philosophy statement style

### Project slugs and stubs
- Slugs: `project-1`, `project-2`, `project-3` — generic and rearrangeable; actual project identity noted in HTML comments inside each stub's `index.html`
- `project-1`: the live template case study (full 8-section structure with placeholders)
- `project-2`, `project-3`: stub pages — full HTML shell with placeholder content, accessible at their URLs but their cards are **commented out** in `/work/index.html` until ready
- Work Index includes a code comment block explaining: (a) how to uncomment a card to make it visible, (b) how to add a 4th project (create folder, copy template, add card block)
- Display order is controlled by card order in the HTML — no routing config, no data layer

### Claude's Discretion
- Exact visual weight and spacing of the section labels vs. the origami accent mark
- Stub placeholder content (keep it minimal and clearly labeled — e.g. `[Project 2 — placeholder]`)
- Exact HTML comment format for the "how to add a project" instructions
- Whether the Work Index card component shares CSS classes with the home page cards or gets its own variant classes

</decisions>

<specifics>
## Specific Ideas

- Work Index feel: denser and more archival than the home page teaser — same brand language, different weight
- Case study section labels: game-doc aesthetic — small caps, terracotta or muted accent, slightly separated from body text
- Stub visibility: commented-out cards in HTML (not CSS `display:none`) so intent is obvious when reading source
- "How to add a 4th project" comment: include in the Work Index HTML near the card list, not in a separate doc

</specifics>

<deferred>
## Deferred Ideas

- Sticky in-page section nav (table of contents) — candidate for Phase 9 polish if case studies get long
- Renaming project slugs after public launch requires a Netlify redirect — handle case-by-case, not in Phase 3
- Real project content and actual images — Phase 3 is template only; content fill-in is post-structure work

</deferred>

---

*Phase: 03-work-index-first-case-study*
*Context gathered: 2026-03-08*
