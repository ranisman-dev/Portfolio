# Phase 2: Home / Landing - Context

**Gathered:** 2026-02-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the home page: philosophy statement + name/role in a centered hero above the fold; three project cards linking to project pages; footer with email, LinkedIn, and resume PDF. This page sets the visual and tonal register — warm, indie-internet, cozy — that every subsequent page inherits.

Creating project pages is Phase 3+. Cards in Phase 2 are intentional placeholders with real HTML structure.

</domain>

<decisions>
## Implementation Decisions

### Hero layout
- Philosophy statement appears first (top of hero), name and role/title below it
- Centered alignment on desktop
- Typography: philosophy in italic or light-weight Montserrat Alternates — contemplative, not bold; tone is quiet and reflective, NOT loud or display-huge. Claude should size relative to that mood.
- No explicit scroll CTA or arrow — the background texture provides the directional hint
- Hero flows directly into cards with whitespace only — no border, no rule, no explicit separator

### Hero background
- CSS paper grain texture (SVG filter or CSS noise) as primary approach
- Texture should have a subtle downward-flow quality — not overdone
- Fallback if paper grain doesn't read well: soft radial gradient fading toward bottom

### Project cards
- 3 cards in a horizontal row on desktop
- Each card shows: project title + short descriptor (1–2 lines) + thumbnail area
- Thumbnail area uses a subtle CSS/SVG pattern or texture fill — this is also the global default "no image" fallback for items that will never have a thumbnail (written work, etc.) — should be reusable
- Hover interaction: subtle lift (shadow increase + small translate-up) + CSS paper dog-ear / fold on one corner of the thumbnail — on-brand for Origami Games
- No section heading above the cards — they follow the hero naturally
- Phase 2: 3 hardcoded static cards (refactor to repeatable template in Phase 3 when real content arrives)

### Page structure
- Top-to-bottom: Nav → Hero → Cards → Footer
- No additional sections (no bio block, no teaser)
- Footer content: email link + LinkedIn link + resume PDF download (exactly these three)
- Footer separated from page content by a thin rule / border-top
- Nav: use the Phase 1 shared fetch-injected nav — Claude decides whether to use standard position or transparent-to-solid scroll behavior based on what's simplest while fitting the aesthetic
- Mobile (375px): cards stack to single column, full width

### Visual personality
- Origami-inspired CSS/SVG geometric accents used sparingly — 1–2 spots per page, not cluttered
- Phase 2 home page placements: near hero name/title, corner detail on project cards, near footer
- Accent colors: mix of terracotta (#c4614a) and peach (#f2d5aa) — NOT pixel art (don't imply pixel art is a skill)
- Accents are simple flat geometric fold shapes, not complex illustrations

### Claude's Discretion
- Exact sizing ratio between philosophy statement and name/role (tone-appropriate, not huge)
- Nav scroll behavior (transparent vs static — pick simplest that fits)
- Exact grain parameters for CSS texture
- Spacing and padding values within the token system
- Exact origami accent shapes and precise placements

</decisions>

<specifics>
## Specific Ideas

- "The dog-ear fold on the thumbnail corner feels like you've 'marked' a page" — this is a deliberate reference to physical bookmarking / paper culture
- Philosophy statement tone is quiet and reflective — sizing and weight should feel like a personal statement, not a campaign slogan
- The textured placeholder / no-image fill should be reusable across the site (writing section, any page without a thumbnail image)
- Origami accents: "a little personality" — present but not cluttered. References indie internet / game UI culture without claiming pixel art as a skill.
- CSS paper grain is the first-choice texture; if it doesn't look right after review, swap to soft radial gradient

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-home-landing*
*Context gathered: 2026-02-27*
