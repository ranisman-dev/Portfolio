---
phase: 01-foundation
plan: "01"
subsystem: css-tokens, directory-structure
tags: [foundation, css, design-tokens, git-config, scaffold]
requirements: [REQ-F03, REQ-F05]

dependency_graph:
  requires: []
  provides:
    - css/tokens.css (design token system — warm paper palette, type scale, spacing, animation timing)
    - css/base.css (reset and body defaults)
    - css/layout.css (page container and grid)
    - css/components.css (nav and footer structural stubs)
    - css/animations.css (Phase 8 stub)
    - Directory scaffold (work/ writing/ about/ earlier-work/ _includes/ js/ assets/images/ assets/pdfs/ css/)
  affects:
    - All subsequent phases read from css/tokens.css
    - Phase 2 populates _includes/ nav.html and footer.html
    - Phase 8 populates css/animations.css

tech_stack:
  added:
    - CSS custom properties (native, no build tool required)
  patterns:
    - Token-first CSS: all design values in tokens.css, all other files consume via var()
    - 5-file CSS split: tokens / base / layout / components / animations
    - Semantic token naming: --color-text, --color-bg-surface, --color-accent (role-based, not value-based)
    - 8px spacing grid (--space-1 through --space-24)
    - Major third (1.25x) type scale (--text-xs through --text-3xl)
    - Directory-per-page site structure (work/ about/ etc.)

key_files:
  created:
    - css/tokens.css (104 lines — full design token set)
    - css/base.css (CSS reset + body defaults, 21 var() references)
    - css/layout.css (page container and grid, var(--max-width-content) used)
    - css/components.css (.site-nav, .site-footer structural stubs)
    - css/animations.css (Phase 8 stub with comment)
    - work/.gitkeep, writing/.gitkeep, about/.gitkeep, earlier-work/.gitkeep
    - _includes/.gitkeep, js/.gitkeep, assets/images/.gitkeep, assets/pdfs/.gitkeep
  modified:
    - .git/config (core.ignorecase = false set)

decisions:
  - "Warm paper palette: --color-bg #fdf8f0, --color-accent #c4614a (terracotta), --color-secondary #f2d5aa (peach)"
  - "Typography: Montserrat Alternates (display) + Source Code Pro (body/mono) — cozy indie feel"
  - "core.ignorecase = false — prevents Windows case-insensitivity masking Linux deploy mismatches on Netlify"
  - "CNAME file treated as read-only — unchanged from original (rebeccaanisman.com)"

metrics:
  duration: 1 minute
  completed_date: "2026-02-25"
  tasks_completed: 2
  tasks_total: 2
  files_created: 13
  files_modified: 0
---

# Phase 1 Plan 01: Directory Scaffold and CSS Token System Summary

**One-liner:** Full directory scaffold and warm-paper CSS token system (Montserrat Alternates + Source Code Pro, terracotta accent) established as single source of truth for all design values.

## What Was Built

Created the entire repository directory structure and the CSS design token layer that every subsequent phase builds on.

**Directory scaffold (9 directories, 8 .gitkeep files):**
- `work/` `writing/` `about/` `earlier-work/` `_includes/` `js/` `assets/images/` `assets/pdfs/` `css/`
- `earlier-work/` is stubbed and hidden from nav until Phase 6
- All lowercase with hyphens — enforces naming convention at the file-system level

**CSS files (5 files, 328 lines total):**

| File | Purpose | Size |
|------|---------|------|
| `css/tokens.css` | All design values — colors, typography, spacing, animation, layout | 104 lines |
| `css/base.css` | CSS reset + body defaults using var() tokens | 21 var() references |
| `css/layout.css` | Page container (.container, .prose) using --max-width-* | stub |
| `css/components.css` | .site-nav and .site-footer structural stubs | stub |
| `css/animations.css` | Phase 8 stub (empty, documented) | comment only |

**Token highlights:**
- Colors: `--color-bg #fdf8f0` (unbleached paper), `--color-accent #c4614a` (terracotta), `--color-secondary #f2d5aa` (warm peach)
- Fonts: `--font-display: 'Montserrat Alternates'`, `--font-body: 'Source Code Pro'`
- Type scale: 8 stops, major third ratio (--text-xs through --text-3xl)
- Spacing: 12-stop 8px grid (--space-1 through --space-24)
- Animation: --duration-fast/base/slow/fold, --ease-out/in-out, --perspective-fold (ready for Phase 8)

**Git configuration:**
- `core.ignorecase = false` set — prevents Windows from silently masking filename case mismatches that would 404 on Netlify's Linux servers

## Commits

| Hash | Task | Description |
|------|------|-------------|
| `6eedb13` | Task 1 | chore(01-01): create directory scaffold and configure git |
| `cfc4215` | Task 2 | feat(01-01): write CSS design token system and layer stubs |

## Verification Results

All plan verification checks passed:
- All 9 directories exist at correct lowercase-hyphen paths
- `git config core.ignorecase` returns `false`
- `css/tokens.css` contains `--color-accent`, `--font-display`, `--space-*`, `--duration-*` (104 lines, min 80)
- `css/base.css` uses `var(--` 21 times (min 5)
- `css/layout.css` contains `var(--max-width-content)` and `var(--max-width-prose)`
- `css/components.css` contains `.site-nav`
- `css/animations.css` is a stub with Phase 8 comment
- CNAME file unchanged: `https://rebeccaanisman.com`
- No hardcoded color or spacing values in any file except `tokens.css`

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

All 14 files verified present on disk. Both commits (`6eedb13`, `cfc4215`) confirmed in git log. `core.ignorecase = false` confirmed in git config.
