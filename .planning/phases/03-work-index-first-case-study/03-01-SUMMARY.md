---
phase: 03-work-index-first-case-study
plan: "01"
subsystem: ui

tags: [html, css, navigation, case-study, work-index]

# Dependency graph
requires:
  - phase: 02-home-landing
    provides: CSS token system, component patterns (thumb-grain, project-card hover DNA), nav/footer fetch-inject pattern

provides:
  - Work Index page at /work/ — single-column .work-card list with one visible card and two commented-out stubs
  - Case study template — full 8-section article (project-1) with philosophy callout and case-study-nav footer
  - Stub pages at /work/project-2/ and /work/project-3/ — accessible but clearly placeholder
  - nav.js startsWith active state — Work nav link highlights on all /work/* sub-pages
  - Home page hrefs fixed — card links point to real /work/project-*/ directories

affects:
  - phase-04-additional-work-content (replicates 8-section template from project-1)
  - phase-05-writing (cross-links to Writing section from case study Section 7)
  - phase-09-cross-device-polish (case study reading column, work-card mobile stacking)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Case study 8-section article structure with .case-study__label section headers
    - Philosophy callout blockquote echoing hero__statement visual DNA (terracotta left-border, italic, Montserrat Alternates)
    - .work-card horizontal row layout (thumb left, body right) — standalone class separate from .project-card
    - nav.js startsWith active state matching for section sub-pages with root '/' guard
    - HTML-comment stub visibility pattern (comment out entire <li>, never CSS display:none)

key-files:
  created:
    - work/index.html (already existed from prior commit — confirmed correct structure)
    - work/project-1/index.html (already existed from prior commit — complete 8-section template)
    - work/project-2/index.html (already existed from prior commit — stub shell, STUB comment fixed)
    - work/project-3/index.html (already existed from prior commit — stub shell, STUB comment fixed)
    - .planning/phases/03-work-index-first-case-study/03-01-SUMMARY.md
  modified:
    - js/nav.js (startsWith active state)
    - index.html (home page card hrefs)

key-decisions:
  - "nav.js startsWith matching: root '/' uses exact match only; all section links (/work/, /writing/, etc.) use currentPath.startsWith(linkHref) so sub-pages correctly activate parent nav link"
  - "STUB comment placement: inside <body> as first child (not between </head> and <body> which is non-conforming HTML)"
  - "Home page card hrefs use generic slugs /work/project-1/ etc. — rename on launch per MEMORY.md decision"

patterns-established:
  - "Case study 8-section template: hero / summary / challenge / process / outcome / reflection / writing / nav-footer"
  - "philosophy-callout in Section 6 (Reflection): connects each project to well-being, pressure, and meaning throughline"
  - "section-divider between every section: single ◆ diamond in peach, aria-hidden"
  - "case-study-nav footer: back-to-work + prev/next siblings with MAINTENANCE comment for reordering"

requirements-completed: [REQ-W01, REQ-W02, REQ-W03, REQ-W04, REQ-W05, REQ-W06, REQ-W07, REQ-W08]

# Metrics
duration: 8min
completed: 2026-03-08
---

# Phase 3 Plan 01: Work Index + First Case Study Summary

**Work Index at /work/ with single-column .work-card list, 8-section case study template at /work/project-1/ with philosophy callout, stub pages for projects 2-3, and nav.js startsWith active state for all /work/* sub-pages**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-03-08T08:02:17Z
- **Completed:** 2026-03-08T08:10:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Verified complete 8-section case study template at `work/project-1/index.html` with all sections labeled, philosophy callout in Reflection, and case-study-nav footer with prev/next and back-to-work link
- Extended `js/nav.js` with startsWith matching so Work nav link activates on `/work/project-1/` and all other `/work/*` sub-pages; root `/` guard prevents false matches
- Fixed home page card hrefs (`/work/wellbeing-game/` → `/work/project-1/` etc.) eliminating 404s
- Fixed non-conforming HTML in project-2 and project-3 stubs (STUB comment moved inside `<body>`)

## Task Commits

Each task was committed atomically:

1. **Task 1: Work Index HTML and directory structure** - `3549dca` (feat — prior commit, verified correct)
2. **Task 1 auto-fix: STUB comment position** - `526c5d8` (fix — Rule 1 HTML conformance)
3. **Task 2: Fix home page hrefs and extend nav.js** - `2461ae1` (feat)

**Plan metadata:** (final docs commit — see below)

## Files Created/Modified

- `work/index.html` — Single-column .work-list with one visible .work-card and two HTML-commented stubs; maintainability comment block
- `work/project-1/index.html` — Complete 8-section `<article class="case-study">` with all .case-study__label headers, philosophy-callout blockquote in Reflection, case-study-nav footer
- `work/project-2/index.html` — 8-section stub shell; STUB comment fixed to inside `<body>`
- `work/project-3/index.html` — 8-section stub shell; STUB comment fixed to inside `<body>`
- `js/nav.js` — navReady listener updated: startsWith matching for section links, exact match for root `/`
- `index.html` — Home page card hrefs updated to `/work/project-1/`, `/work/project-2/`, `/work/project-3/`

## Decisions Made

- nav.js uses `currentPath.startsWith(linkHref)` for section links. Root `/` is guarded with exact match to avoid activating the Home link on every page.
- STUB comment belongs inside `<body>` as first child — HTML comments between `</head>` and `<body>` are non-conforming and may be moved by parsers.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] STUB comment in non-conforming HTML position**
- **Found during:** Task 1 (verifying project-2 and project-3 stub files)
- **Issue:** The `<!-- STUB: ... -->` comment was placed between `</head>` and `<body>`, which is non-conforming HTML; browsers may reparse or move such comments
- **Fix:** Moved comment to first line inside `<body>` as specified in the plan
- **Files modified:** `work/project-2/index.html`, `work/project-3/index.html`
- **Verification:** Confirmed correct position with grep; valid HTML structure
- **Committed in:** `526c5d8`

---

**Total deviations:** 1 auto-fixed (Rule 1 - HTML conformance bug)
**Impact on plan:** Minor fix — no scope creep. STUB comment is now inside `<body>` as the plan specified.

## Issues Encountered

Most work was already committed in prior commit `3549dca feat(03-01): work index, case study template, and stub pages`. This execution focused on verifying correctness, fixing the stub comment position, updating nav.js, and committing the home page href fixes that were in the working tree but uncommitted.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Work Index and case study template fully validated — Phase 4 replicates the project-1 8-section template for 2-3 additional projects
- Stub pages at /work/project-2/ and /work/project-3/ are accessible and ready to receive real content
- CSS is complete: `.work-card`, `.case-study__*`, `.philosophy-callout`, `.section-divider`, `.case-study-nav` all styled
- nav.js active state works correctly for all existing and future `/work/*` sub-pages
- Pre-existing uncommitted change in `css/components.css` (`.work-card__body` left padding) not included in this plan's commits — deferred to user review

---
*Phase: 03-work-index-first-case-study*
*Completed: 2026-03-08*
