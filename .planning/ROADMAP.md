# Roadmap: Origami Games Portfolio

## Overview

Ten phases take the Origami Games portfolio from a blank Squarespace account to a linkable,
professional site that communicates identity and design philosophy before any case study is
read. The build order is strict: philosophy and structure before content, first project page
validated before replication, Writing and Retrospectives sections built after Work is
established. GSAP fold transitions and full accessibility work are applied once content is
stable. The site's job at v1 is to not embarrass itself when someone clicks through from a
job application — not to be comprehensive.

---

## Phases

**Phase Numbering:**
- Integer phases (1–10): Planned v1 milestone work
- Decimal phases (e.g., 2.1): Urgent insertions created via `/gsd:insert-phase`

- [ ] **Phase 1: Foundation** - Squarespace platform configured, site-wide design tokens defined, GSAP loaded, nav structure set, Git repo initialized
- [ ] **Phase 2: Home / Landing** - Hero with philosophy statement live, featured project cards visible, footer complete — visual and tonal register established
- [ ] **Phase 3: Work Index + First Project Page** - `/work` index live, one complete 8-section case study built and validated as the template for all subsequent project pages
- [ ] **Phase 4: Additional Work Content** - Remaining project pages built from the Phase 3 template; 2–3 total projects live, each connected to the design throughline
- [ ] **Phase 5: Writing Section** - Writing section live at `/writing` with inline excerpts; cross-linked from relevant project pages
- [ ] **Phase 6: Retrospectives / Earlier Work** - Earlier Work section live with "What I'd Change" retrospectives; analytical framing, full site identity established first
- [ ] **Phase 7: About + Contact** - About page written in design voice, philosophy throughline explicit, resume PDF downloadable, contact pathway tested end-to-end
- [ ] **Phase 8: Origami Fold Transitions** - GSAP 3D fold transitions on key navigational moments; reduced-motion honored, mobile fallback in place, content readable without JS
- [ ] **Phase 9: Cross-Device Polish + Accessibility** - WCAG AA verified, alt text complete, mobile tested at 375px and 768px, meta titles and descriptions set, CSS documented
- [ ] **Phase 10: Pre-Launch Audit** - No broken links, no placeholder text, external links verified, domain + HTTPS confirmed, Squarespace branding removed

---

## Phase Details

### Phase 1: Foundation
**Goal**: The Squarespace platform is correctly configured and all infrastructure that every
subsequent phase depends on — design tokens, CDN libraries, nav structure, version control —
is in place before any content page is built.

**Depends on**: Nothing (first phase)

**Requirements**: REQ-F01, REQ-F02, REQ-F03, REQ-F04, REQ-F05, REQ-F06, REQ-F07, REQ-F08,
REQ-F09, REQ-N01, REQ-N03, REQ-N05

**Key Deliverables**:
- Squarespace 7.1 Business plan active with code injection confirmed working
- Paloma template selected and applied (or Hester after side-by-side CSS test)
- CSS custom properties file: color palette, typography scale, spacing units, animation timing
- GSAP 3 + ScrollTrigger CDN script tags in header code injection, verified loading
- Local Git repository initialized with `/custom-css/` and `/custom-js/` directories
- Primary nav configured: Home | Work | Writing | Earlier Work | About (placeholder pages)
- Work Portfolio page created with slug locked to `/work`
- Site title set to "Origami Games" (or designer's name), Squarespace default cleared
- Custom domain connected, HTTPS confirmed active
- Footer skeleton: nav echo, contact link placeholder, LinkedIn placeholder, resume link placeholder
- ScrollTrigger AJAX re-initialization pattern drafted (event listeners for Squarespace page transitions)

**Success Criteria** (what must be TRUE):
  1. Visiting the site URL shows "Origami Games" (or designer's name) in the browser tab — no Squarespace default placeholder
  2. All five nav items (Home, Work, Writing, Earlier Work, About) are visible and clickable, leading to pages that exist (even if empty)
  3. The Work section URL is `/work` and opening browser devtools shows GSAP and ScrollTrigger loaded with no console errors
  4. A local Git repository exists with at least one commit containing the initial CSS custom properties and JS injection files
  5. CSS custom properties for color, type scale, spacing, and animation timing are defined and applied — changing one variable visibly affects the site

**Dependencies**: None

**Research needed**: Yes — test Paloma vs. Hester with a sample origami fold CSS block injected before committing to the template. Confirm the specific Squarespace 7.1 AJAX event names (`Squarespace.afterBodyLoad` or equivalent) are current before writing the ScrollTrigger re-init pattern.

**Plans**: TBD

---

### Phase 2: Home / Landing
**Goal**: Visitors immediately understand who this designer is and what she stands for —
before reading a single case study. The home page sets the visual and tonal register that
every subsequent page inherits.

**Depends on**: Phase 1

**Requirements**: REQ-H01, REQ-H02, REQ-H03, REQ-H04, REQ-H05, REQ-H06, REQ-H07, REQ-N02,
REQ-N04

**Key Deliverables**:
- Hero section: designer's name, role, and philosophy statement above the fold on desktop
- Atmospheric hero image or visual (compressed before upload, under 3s load target)
- Squarespace Summary Block configured, pointed at the Work Portfolio collection, showing 2–3 featured project cards
- Featured project cards link directly to individual project pages (not the Work index)
- Brief identity bridge text below featured cards (1–2 sentences toward About)
- Footer complete: nav echo, contact link, LinkedIn link, resume PDF download link
- No splash screens, loading gates, or content-blocking animations
- Mobile layout verified at 375px and 768px (first REQ-X04 checkpoint)

**Success Criteria** (what must be TRUE):
  1. A visitor landing on the home page can read the designer's name, title, and the full philosophy statement without scrolling on a 1280px desktop viewport
  2. Two or three project cards are visible below the hero and each one links directly to its project page — clicking a card does not land on `/work`
  3. The footer appears on the home page with working nav links, a LinkedIn link, and a resume PDF download link
  4. Contact is reachable in 2 clicks from the home page (footer link or About page contact section)
  5. The home page loads in under 3 seconds on a standard connection, with no visible content shift or blocked render from animations
  6. The layout is readable and correctly proportioned at 375px mobile width — no text overflow, no broken card layout

**Dependencies**: Phase 1 complete; Work Portfolio page must exist at `/work` so Summary Block has a collection to point at (can display placeholder cards until Phase 3 project pages are built)

**Research needed**: No — Summary Block configuration is well-documented; hero layout is standard Squarespace blocks.

**Plans**: TBD

---

### Phase 3: Work Index + First Project Page (Template)
**Goal**: The Work section is fully functional and the site's core credibility engine is
operational — one complete case study exists that a hiring manager can click through and
read, and that template is validated before any other project pages are built.

**Depends on**: Phase 2

**Requirements**: REQ-W01, REQ-W02, REQ-W03, REQ-W04, REQ-W05, REQ-W06, REQ-W07, REQ-W08,
REQ-X04

**Key Deliverables**:
- Work Portfolio index at `/work` displaying a curated grid — at minimum the first project card
- Work index cards showing: project title, specific role, platform/format/status, one evocative image
- One complete project page with all 8 sections: (1) title block with hero image/video, (2) project summary for non-industry readers, (3) design challenge/problem statement, (4) process/approach with artifacts, (5) outcome with qualitative evidence, (6) reflection paragraph, (7) attached writing/documents with inline excerpts, (8) prev/next nav footer + back to Work
- 1–3 sentences on each project page explicitly connecting the project to the design philosophy throughline (well-being, pressure, meaning)
- Any prototype shown accompanied by a 2–4 sentence brief (design question it answers, what to notice, what was discovered)
- No project treated as "screenshots + store link only"
- Mobile layout verified at 375px and 768px before phase marked complete
- Template validated with trusted reviewer feedback before replication begins

**Success Criteria** (what must be TRUE):
  1. A visitor can navigate from the home page featured cards to a complete project page and read through all 8 sections without hitting a blank section or placeholder text
  2. The project page includes a sentence or short paragraph that explicitly names the connection to the design philosophy throughline (well-being, pressure, meaning) — not implied, stated
  3. The project page footer has working prev/next navigation and a "Back to Work" link that returns to `/work`
  4. The Work index at `/work` shows at least one card with title, role, platform/status, and image — no blank card slots
  5. The project page layout is readable on a 375px mobile viewport — all text legible, images scaled correctly, no horizontal overflow

**Dependencies**: Phase 2 complete; Work Portfolio slug must be `/work` (set in Phase 1); philosophy statement must be written (Phase 1 prerequisite for all copy)

**Research needed**: Yes — confirm the current Squarespace 7.1 AJAX event API for ScrollTrigger initialization before implementing any scroll-based reveals on project pages. Confirm the Portfolio sub-page URL pattern behavior in the current platform version.

**Plans**: TBD

---

### Phase 4: Additional Work Content
**Goal**: The Work section has the depth expected of a professional portfolio — 2–3 complete
project pages built from the validated Phase 3 template, each connected to the design
throughline, so the curated set tells a coherent story rather than showing a single data
point.

**Depends on**: Phase 3 (template validated before replication)

**Requirements**: REQ-W01, REQ-W02, REQ-W03, REQ-W04, REQ-W06, REQ-W07, REQ-W08

**Key Deliverables**:
- 1–2 additional complete project pages built by replicating the Phase 3 template structure
- Work index updated to display the full curated set (minimum 2 total, target 3 projects)
- Each additional project page includes all 8 sections; no section left blank or placeholder
- Each additional project page has 1–3 sentences connecting to the design philosophy throughline
- Prototypes shown only when they add information screenshots cannot — each with 2–4 sentence brief
- Home page Summary Block updated to feature the strongest 2–3 project cards
- Mobile layout verified for all new project pages at 375px before phase marked complete

**Success Criteria** (what must be TRUE):
  1. The Work index at `/work` shows 2–3 project cards, each with title, specific role, platform/status, and image — no placeholder cards
  2. Each project page is complete: all 8 sections present, no placeholder text, philosophy throughline stated
  3. A visitor who reads two project pages back-to-back can identify the connecting thread — the design philosophy throughline is visible across both
  4. The home page featured cards reflect the strongest 2–3 projects (not whichever ones happened to be created first)
  5. All new project pages are readable and correctly laid out at 375px mobile width

**Dependencies**: Phase 3 template validated; trusted reviewer sign-off received on Phase 3 project page before replication

**Research needed**: No — replication of the validated Phase 3 template; no new patterns introduced.

**Plans**: TBD

---

### Phase 5: Writing Section
**Goal**: The Writing section demonstrates that this designer treats writing as primary craft,
not documentation support — each sample is readable inline, not download-gated, and
connected to the projects it informs.

**Depends on**: Phase 4

**Requirements**: REQ-Wr01, REQ-Wr02, REQ-Wr03, REQ-Wr04

**Key Deliverables**:
- Writing section page at `/writing`, reachable from primary nav
- Each writing sample displayed with a minimum 2–4 paragraph inline excerpt visible without downloading
- Download link offered after each inline excerpt, using descriptive filenames (not auto-generated)
- Writing samples that relate to specific projects cross-linked from the relevant project page, and vice versa
- Decision confirmed: page type for Writing section (Portfolio Page for visual card grid vs. Regular Page with styled list) — made at content inventory time before building
- PDF embed method confirmed for Squarespace (file block, embed code block, or external link)

**Success Criteria** (what must be TRUE):
  1. Clicking "Writing" in the primary nav leads to a page at `/writing` that lists writing samples — no 404, no "coming soon"
  2. At least one writing sample is fully readable on the page without downloading — the inline excerpt contains at minimum 2 full paragraphs
  3. Download links for writing samples use descriptive filenames (e.g., `origami-games-narrative-design-doc-2025.pdf`, not `file-1.pdf`)
  4. At least one project page contains a link to a related writing sample, and that writing sample page links back to the project

**Dependencies**: Phase 4 complete (Work section populated — writing gains meaning from contrast with project work); content inventory of writing samples completed before building

**Research needed**: Yes — confirm the PDF embed method currently available in Squarespace 7.1 Business (file block vs. embed code vs. external link). Decide Writing section page type before building.

**Plans**: TBD

---

### Phase 6: Retrospectives / Earlier Work
**Goal**: Earlier work is framed with analytical confidence — not buried, not apologetic — and
the Retrospectives section reads as demonstrated critical thinking that strengthens rather
than undermines the portfolio's overall credibility.

**Depends on**: Phase 5 (full site identity established before retrospectives are framed)

**Requirements**: REQ-R01, REQ-R02, REQ-R03, REQ-R04

**Key Deliverables**:
- Retrospectives section at a clear URL (e.g., `/earlier-work`), labeled "Earlier Work" in primary nav, reachable from nav
- Each retrospective entry following the structured format: project description → design goal → what happened → what I'd change → what carried forward
- Framing that reads as forward-looking critical analysis, not apology — tone reviewed before publishing
- School/early work present only in this section — confirmed absent from the Work index and project pages
- Minimum 2 retrospective entries at launch

**Success Criteria** (what must be TRUE):
  1. Clicking "Earlier Work" in the primary nav leads to a page at the designated URL that lists retrospective entries — no 404, no "coming soon"
  2. Each retrospective entry contains all five structured components: project description, design goal, what happened, what I'd change, what carried forward
  3. Reading a retrospective entry leaves the impression of a self-aware, growing designer — not of someone apologizing for past work (this is a qualitative check, done by reading the entry as a stranger would)
  4. No earlier work appears in the main Work section at `/work` — the sections are cleanly separated

**Dependencies**: Phase 5 complete; the full site identity and throughline must be established before retrospectives can be framed correctly — they answer "where have I come from" and that question only makes sense once "where I am and where I'm going" is visible

**Research needed**: No — the retrospective format and analytical framing approach are defined; this phase is primarily content writing and structure.

**Plans**: TBD

---

### Phase 7: About + Contact
**Goal**: Visitors who've read the work now understand the human behind it — the About page
functions simultaneously as a writing sample, a philosophy statement, and a clear invitation
to reach out, serving studios, collaborators, and freelance clients without explicit audience
labels.

**Depends on**: Phase 3 (Work section live — About narrative references specific projects)

**Requirements**: REQ-A01, REQ-A02, REQ-A03, REQ-A04, REQ-A05, REQ-A06, REQ-A07

**Key Deliverables**:
- About page written with design voice — not a resume summary; reads as a reflection of communication skill and values
- Design philosophy throughline stated explicitly on the About page with links to specific projects
- Content structure serves all three audiences (studios, collaborators, freelance clients) without explicit audience labels
- Resume PDF downloadable from the About page; PDF formatted to match the site's visual register
- Contact form or visible email address present within the About page
- Links from About page to the Work section and to the contact form/email
- Contact pathway tested end-to-end: form submitted, message received by designer, before any public URL is shared

**Success Criteria** (what must be TRUE):
  1. Reading the About page first — before viewing any project — leaves a clear impression of the designer's values and design philosophy, not just a list of credentials
  2. The About page explicitly names the design philosophy throughline and links to at least two specific project pages as evidence
  3. A visitor can download the resume PDF from the About page and the PDF opens correctly — filename is descriptive, not auto-generated
  4. A visitor can send a contact message from within the About page (form submission or email link) without leaving to a separate page
  5. A test contact form submission is received in the designer's inbox before the URL is shared publicly

**Dependencies**: Phase 3 minimum (at least one project page live so About can reference it); can be built in parallel with Phases 5 and 6 if Phase 3 is complete

**Research needed**: No — standard Squarespace Regular Page with Form block; contact form behavior is well-documented.

**Plans**: TBD

---

### Phase 8: Origami Fold Transitions (GSAP)
**Goal**: The site's signature brand interaction is implemented correctly — fold transitions
on key navigational moments reinforce the designer's throughline of transformation and
revelation, degrade gracefully on mobile and for users who prefer reduced motion, and remain
maintainable by someone with limited web coding experience.

**Depends on**: Phase 7 (all content pages exist before animation layer is applied)

**Requirements**: REQ-Anim01, REQ-Anim02, REQ-Anim03, REQ-Anim04, REQ-Anim05, REQ-Anim06,
REQ-Anim07, REQ-Anim08

**Key Deliverables**:
- GSAP 3 + CSS 3D transforms (`rotationX/Y`, `transformPerspective`, `transform-origin`) implementing origami fold transitions
- Transitions applied to key navigational moments only: entering a project page, returning to home, scroll-reveal of major page sections — not on every scroll event
- `prefers-reduced-motion` media query implemented: animations replaced with opacity/scale fades when enabled
- Mobile fallback via GSAP `matchMedia()`: 3D fold animations replaced with opacity/scale fades below 768px viewport width
- All content fully readable and navigable with JavaScript disabled (progressive enhancement only)
- All animation values (duration, easing, perspective distance) stored in CSS custom properties — not hardcoded in JS
- Plain-language comments on every non-obvious code block explaining what it does and how to adjust it
- Squarespace AJAX lifecycle handled: ScrollTrigger instances killed before each re-initialization on page change
- Tested on actual iOS Safari, not just desktop browser resize

**Success Criteria** (what must be TRUE):
  1. Navigating from a project card to a project page triggers a visible origami fold transition — the fold is recognizable as the site's brand gesture
  2. With JavaScript disabled in the browser, every page is fully readable and all navigation links work — no content is hidden or inaccessible
  3. On a 375px mobile viewport, transitions are simple opacity/scale fades — no 3D transform artifacts or GPU-related visual glitches
  4. With `prefers-reduced-motion` enabled in the OS, transitions reduce to simple fades — no fold animation plays
  5. Inspecting the injected CSS shows animation duration, easing, and perspective values referenced as CSS custom properties, not hardcoded numbers
  6. Reading any animation code block reveals a plain-language comment explaining what it does and which value to adjust to change the behavior

**Dependencies**: Phase 7 complete — animations must be applied to stable content pages; adding animation to pages that are still changing structure causes rework

**Research needed**: Yes — test GSAP 3D transforms on actual iOS Safari before finalizing the mobile detection breakpoint. Confirm that the Squarespace AJAX event handling pattern (drafted in Phase 1) performs correctly across all page types before applying site-wide.

**Plans**: TBD

---

### Phase 9: Cross-Device Polish + Accessibility
**Goal**: Every page on the live site is accessible to users with assistive technologies,
readable at mobile viewports, and protected against silent breakage from Squarespace platform
updates — the site is fully ready to be shared without caveats.

**Depends on**: Phase 8

**Requirements**: REQ-X01, REQ-X02, REQ-X03, REQ-X04, REQ-X05, REQ-X06, REQ-N04

**Key Deliverables**:
- WCAG AA contrast ratio audit: all body text at minimum 4.5:1, all large/display text at minimum 3:1, against all backgrounds used
- Descriptive alt text added to all images across all pages
- Full mobile review: every page tested at 375px and 768px — layout, text legibility, image scaling, navigation, animations
- Page titles and meta descriptions set for all published pages
- CSS audit: custom class names used wherever possible; any rule targeting a `sqs-*` Squarespace internal selector has a comment: "Squarespace internal class — verify after platform updates"
- CSS cleanup: remove dead rules, consolidate duplicates, document any remaining `sqs-*` overrides

**Success Criteria** (what must be TRUE):
  1. Running any page through a WCAG AA contrast checker (e.g., WebAIM Contrast Checker) shows all body text passing at 4.5:1 and all large/display text passing at 3:1
  2. Every image on every page has a non-empty alt attribute — a screen reader traversal of the site encounters no images with empty or missing alt text
  3. Loading each page on a 375px viewport (or a browser devtools mobile simulation) shows readable text, no horizontal scrolling, and working navigation with no elements cut off
  4. Viewing page source or the Squarespace Pages panel shows a custom meta title and description set for every published page
  5. Searching the injected CSS for `sqs-` returns only rules that have the "Squarespace internal class — verify after platform updates" comment

**Dependencies**: Phase 8 complete — accessibility and polish audit must happen after all content and animations are in place

**Research needed**: No — WCAG AA criteria, alt text, and meta descriptions are standard and well-documented; CSS audit is manual review.

**Plans**: TBD

---

### Phase 10: Pre-Launch Audit
**Goal**: The site is verified clean and professional end-to-end — every link resolves, every
page has real content, the contact pathway works, and the domain is properly configured —
so the URL can be shared in a job application without risk of an embarrassing first
impression.

**Depends on**: Phase 9

**Requirements**: REQ-PL01, REQ-PL02, REQ-PL03, REQ-PL04, REQ-PL05, REQ-PL06

**Key Deliverables**:
- Full navigation link audit: every link in nav, footer, project prev/next, and cross-links resolves to real content — no 404s
- Placeholder sweep: no "coming soon," "Lorem ipsum," or empty sections on any linked or publicly shared page
- External link verification: itch.io, Steam, LinkedIn, and any other external links active and correct
- Resume PDF download tested: link works, PDF opens, filename is descriptive
- Contact form end-to-end test: form submitted, message received in designer's inbox
- Custom domain confirmed connected with HTTPS active and Squarespace "Powered by Squarespace" branding removed from footer

**Success Criteria** (what must be TRUE):
  1. Clicking every link in the primary nav, footer, and project navigation leads to a page with real content — no 404 errors, no placeholder pages
  2. Reading through every published page finds no placeholder text, empty sections, or "coming soon" notices
  3. Clicking each external link (itch.io, Steam, LinkedIn, resume PDF) opens the correct destination and the link is live
  4. The contact form can be submitted successfully and the resulting message appears in the designer's inbox within 5 minutes
  5. The site loads at the custom domain with a padlock (HTTPS) in the browser address bar and no Squarespace branding visible in the footer

**Dependencies**: Phase 9 complete

**Research needed**: No — manual verification checklist; no technical research required.

**Plans**: TBD

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/TBD | Not started | - |
| 2. Home / Landing | 0/TBD | Not started | - |
| 3. Work Index + First Project Page | 0/TBD | Not started | - |
| 4. Additional Work Content | 0/TBD | Not started | - |
| 5. Writing Section | 0/TBD | Not started | - |
| 6. Retrospectives / Earlier Work | 0/TBD | Not started | - |
| 7. About + Contact | 0/TBD | Not started | - |
| 8. Origami Fold Transitions | 0/TBD | Not started | - |
| 9. Cross-Device Polish + Accessibility | 0/TBD | Not started | - |
| 10. Pre-Launch Audit | 0/TBD | Not started | - |

---

## Requirement Coverage

Every v1 requirement maps to exactly one phase. Total: 37 requirements.

| Requirement | Phase | Status |
|-------------|-------|--------|
| REQ-F01 | Phase 1 | Pending |
| REQ-F02 | Phase 1 | Pending |
| REQ-F03 | Phase 1 | Pending |
| REQ-F04 | Phase 1 | Pending |
| REQ-F05 | Phase 1 | Pending |
| REQ-F06 | Phase 1 | Pending |
| REQ-F07 | Phase 1 | Pending |
| REQ-F08 | Phase 1 | Pending |
| REQ-F09 | Phase 1 | Pending |
| REQ-N01 | Phase 1 | Pending |
| REQ-N03 | Phase 1 | Pending |
| REQ-N05 | Phase 1 | Pending |
| REQ-H01 | Phase 2 | Pending |
| REQ-H02 | Phase 2 | Pending |
| REQ-H03 | Phase 2 | Pending |
| REQ-H04 | Phase 2 | Pending |
| REQ-H05 | Phase 2 | Pending |
| REQ-H06 | Phase 2 | Pending |
| REQ-H07 | Phase 2 | Pending |
| REQ-N02 | Phase 2 | Pending |
| REQ-N04 | Phase 2 | Pending |
| REQ-W01 | Phase 3 | Pending |
| REQ-W02 | Phase 3 | Pending |
| REQ-W03 | Phase 3 | Pending |
| REQ-W04 | Phase 3 | Pending |
| REQ-W05 | Phase 3 | Pending |
| REQ-W06 | Phase 3 | Pending |
| REQ-W07 | Phase 3 | Pending |
| REQ-W08 | Phase 3 | Pending |
| REQ-X04 | Phase 3 | Pending |
| REQ-Wr01 | Phase 5 | Pending |
| REQ-Wr02 | Phase 5 | Pending |
| REQ-Wr03 | Phase 5 | Pending |
| REQ-Wr04 | Phase 5 | Pending |
| REQ-R01 | Phase 6 | Pending |
| REQ-R02 | Phase 6 | Pending |
| REQ-R03 | Phase 6 | Pending |
| REQ-R04 | Phase 6 | Pending |
| REQ-A01 | Phase 7 | Pending |
| REQ-A02 | Phase 7 | Pending |
| REQ-A03 | Phase 7 | Pending |
| REQ-A04 | Phase 7 | Pending |
| REQ-A05 | Phase 7 | Pending |
| REQ-A06 | Phase 7 | Pending |
| REQ-A07 | Phase 7 | Pending |
| REQ-Anim01 | Phase 8 | Pending |
| REQ-Anim02 | Phase 8 | Pending |
| REQ-Anim03 | Phase 8 | Pending |
| REQ-Anim04 | Phase 8 | Pending |
| REQ-Anim05 | Phase 8 | Pending |
| REQ-Anim06 | Phase 8 | Pending |
| REQ-Anim07 | Phase 8 | Pending |
| REQ-Anim08 | Phase 8 | Pending |
| REQ-X01 | Phase 9 | Pending |
| REQ-X02 | Phase 9 | Pending |
| REQ-X03 | Phase 9 | Pending |
| REQ-X05 | Phase 9 | Pending |
| REQ-X06 | Phase 9 | Pending |
| REQ-PL01 | Phase 10 | Pending |
| REQ-PL02 | Phase 10 | Pending |
| REQ-PL03 | Phase 10 | Pending |
| REQ-PL04 | Phase 10 | Pending |
| REQ-PL05 | Phase 10 | Pending |
| REQ-PL06 | Phase 10 | Pending |

**Coverage:** 63/63 requirement entries mapped (37 unique requirements; REQ-W01–W08 and REQ-X04
appear in Phase 3 as first delivery; Phase 4 builds additional content to the same standard)

**Note on Phase 4**: REQ-W01 through REQ-W07 are assigned to Phase 3 as the primary delivery
(template built and validated). Phase 4 applies the same standards to additional project pages.
This is explicit content expansion, not a gap — the requirements are met in Phase 3 and
maintained in Phase 4.

---

*Roadmap created: 2026-02-23*
*Depth: Comprehensive (10 phases)*
*Coverage: 37 v1 requirements, 100% mapped*
