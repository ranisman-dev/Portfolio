---
phase: "01"
plan: "02"
subsystem: "html-scaffold"
tags: [html, navigation, includes, url-structure, netlify]
dependency_graph:
  requires: ["01-01"]
  provides: ["html-pages", "nav-includes", "url-structure"]
  affects: ["01-03", "01-04", "all-pages"]
tech_stack:
  added: []
  patterns: ["fetch-inject nav/footer", "root-relative paths", "directory-per-page URL structure"]
key_files:
  created:
    - index.html
    - work/index.html
    - writing/index.html
    - about/index.html
    - earlier-work/index.html
    - _includes/nav.html
    - _includes/footer.html
  modified: []
decisions:
  - "root-relative paths (/css/tokens.css) used on all pages — not relative — ensures sub-pages work correctly"
  - "earlier-work/index.html exists as a file but is absent from _includes/nav.html and _includes/footer.html — hidden until Phase 6"
  - "Contact nav link targets /about#contact anchor, not a separate page"
  - "CNAME treated as read-only — untouched"
metrics:
  duration: "1 min"
  completed: "2026-02-25"
  tasks_completed: 2
  files_created: 7
  files_modified: 0
---

# Phase 1 Plan 02: HTML Skeleton Pages and Nav Includes Summary

Five HTML skeleton pages at correct URL paths plus single-source nav/footer includes that any future phase writes into without restructuring.

## What Was Built

**Task 1 — Five HTML placeholder pages** (commit `8910281`)

All five pages use the base template with root-relative CSS/JS paths, `id="site-nav"` and `id="site-footer"` injection hooks (for Plan 03's `nav.js`), GSAP CDN scripts with `defer`, and page-specific body classes:

| Page | Path | Body Class | Key Detail |
|------|------|------------|------------|
| Home | `index.html` | `page-home` | Title: "Origami Games — Narrative & Experience Engineer" |
| Work | `work/index.html` | `page-work` | URL locked before any project sub-pages (REQ-F07) |
| Writing | `writing/index.html` | `page-writing` | Placeholder; content in Phase 5 |
| About | `about/index.html` | `page-about` | Includes `<section id="contact">` anchor for /about#contact |
| Earlier Work | `earlier-work/index.html` | `page-earlier-work` | File exists; absent from nav/footer until Phase 6 |

**Task 2 — `_includes/nav.html` and `_includes/footer.html`** (commit `8fbe80b`)

- `_includes/nav.html`: HTML fragment (no DOCTYPE) with 5 nav destinations — Home, Work, Writing, About, Contact. Contact links to `/about#contact`. `/earlier-work/` is intentionally absent.
- `_includes/footer.html`: HTML fragment with nav echo (same 5 links), `mailto:hello@rebeccaanisman.com`, LinkedIn, and `/assets/pdfs/resume.pdf` download link. Both email and LinkedIn are placeholder values easily updated in one file.

## Decisions Made

1. **Root-relative paths everywhere** — `/css/tokens.css` not `../css/tokens.css`. Sub-pages like `/work/index.html` resolve correctly; relative paths would break one directory deep.
2. **`earlier-work` hidden by omission** — The page file exists at `earlier-work/index.html` but is not linked from `_includes/nav.html` or `_includes/footer.html`. Nav omission is the mechanism. Added a comment in `<main>` documenting the intent.
3. **Contact as anchor link** — `/about#contact` links to `<section id="contact">` in `about/index.html`. No separate contact page.
4. **Email/LinkedIn as updateable placeholders** — Both values live in one file (`_includes/footer.html`). Confirmed domain from CNAME: `rebeccaanisman.com`.
5. **CNAME untouched** — Treated as read-only infrastructure per plan requirement.

## Deviations from Plan

None — plan executed exactly as written.

## Requirements Satisfied

| Requirement | Status | Evidence |
|-------------|--------|----------|
| REQ-F02 | Done | All pages have `id="site-nav"` and `id="site-footer"` hooks |
| REQ-F06 | Done | `_includes/nav.html` has 5 destinations; Contact = /about#contact |
| REQ-F07 | Done | `work/index.html` created before any project sub-pages |
| REQ-F08 | Done | All page `<title>` tags contain "Origami Games" |
| REQ-N01 | Done | Nav labels: Home, Work, Writing, About, Contact — plain English |
| REQ-N03 | Done | Footer has nav echo + mailto + LinkedIn + resume PDF |

## Self-Check: PASSED

All 7 created files confirmed present on disk. Both task commits (`8910281`, `8fbe80b`) confirmed in git log. SUMMARY.md exists at `.planning/phases/01-foundation/01-02-SUMMARY.md`.
