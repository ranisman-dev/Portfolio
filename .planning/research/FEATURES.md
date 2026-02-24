# Feature Research

**Domain:** Personal creative portfolio — Narrative and Experience Engineer (game design)
**Researched:** 2026-02-24
**Confidence:** HIGH (core features / industry consensus) | MEDIUM (indie internet aesthetic implementation details)
**Platform:** GitHub Pages — static HTML/CSS/JS, no framework, no build tools
**Note on sources:** WebSearch and WebFetch were unavailable in this research session. Findings draw on training knowledge through August 2025, which covers well-established game design portfolio discourse (GDC, narrative design communities, hiring manager feedback circulating through 2024-2025), UX patterns for creative portfolios, and indie web aesthetics. Platform-specific findings updated to reflect the GitHub Pages pivot (away from earlier Squarespace research).

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features every visitor assumes exist. Missing these makes the portfolio feel broken or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Above-the-fold identity statement | Hiring managers spend 10-30 seconds deciding whether to stay. If specialization isn't clear immediately, they leave. "Game designer" is not enough — "narrative/experience designer" who does X must be legible at a glance. | LOW (writing is the hard part, not implementation) | One headline, one sentence, no scroll required on desktop. The philosophy statement ("I design systems that encourage players to reflect on well-being and meaning") IS the identity statement — it should be the H1 or immediately adjacent. |
| Case studies with visible process | Universal hiring manager feedback across indie, AA, and AAA studios: they care about how you think more than what shipped. Screenshots + store link = red flag. No case study = disqualifying at mid level. | HIGH (content, not code) | Minimum 2 complete case studies by v1. "Complete" means: problem stated, constraints visible, decisions explained, reflection honest. |
| At least one playable or viewable artifact | Game design portfolios are expected to show games, not just describe them. Failing this is equivalent to a visual designer whose portfolio has no images. | LOW-MEDIUM | itch.io link, Steam link, or embedded video walkthrough. For narrative design specifically, an inline dialogue excerpt or branching structure screenshot is acceptable when a playable build doesn't exist. |
| Contact pathway accessible within 2 clicks | If a recruiter or collaborator is interested but can't reach you in under 10 seconds, the lead dies. Most common failure in junior portfolios. | VERY LOW | Email link in footer on every page. About page has #contact anchor. Nav includes "Contact" that jumps there. |
| Self-evident navigation | Visitors have different goals. Hiring managers go to Work first. Collaborators go to About or Writing. Clients go to About and Contact. Navigation that requires guessing increases bounce rate. | LOW | 5-item nav: Home, Work, Writing, About, Contact. All labels work on first read. "Contact" as nav anchor (not separate page) is an acceptable and clean pattern. |
| Mobile-readable layout | Hiring managers increasingly review portfolios on phones, especially during GDC, PAX, or remote-first screening. Any portfolio that breaks on mobile signals technical carelessness — especially for a designer whose work involves player experience. | LOW-MEDIUM | GitHub Pages static HTML is mobile-friendly by default. Risk: custom CSS breaks layout at 375px. Every custom CSS addition needs a mobile viewport check. |
| Fast load (under 3 seconds) | Slow portfolio = technical carelessness. For a designer working in experience design, this is an own-goal. | LOW | Image compression is the main lever. No CDN dependency risk on GitHub Pages. Keep GSAP CDN load non-blocking. |
| About page with design philosophy and contact | Clients and collaborators read About before deciding whether to reach out. Studios use it for culture fit and communication style. For a narrative designer, this page is also evaluated as a writing sample. | MEDIUM (writing quality) | Must serve three audiences without explicitly labeling them. Must contain: identity, philosophy, professional background, resume PDF download, contact pathway. |
| Resume PDF download | Hiring managers often want to download the resume and compare candidates offline. If it's missing, they may ask for it — friction that shouldn't exist. | VERY LOW | Link in About page and footer. Use a descriptive filename, not "resume.pdf". |
| No broken links at point of sharing | A portfolio with 404s signals abandonment or carelessness. Every page shared publicly must have complete content and working links. | LOW | Pre-launch checklist requirement: test every link before sharing the URL. Better to launch with 2 complete pages than 8 half-built ones. |

---

### Differentiators (Competitive Advantage)

Features that set this portfolio apart. Not assumed, but genuinely valued by the target audiences.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Explicit, argued design philosophy | Most game design portfolios show work but don't argue for a worldview. A designer who states and defends a design philosophy occupies a distinct position. For narrative/experience design focused on well-being and meaning, the philosophy IS the product — it can't be inferred from screenshots. | LOW (implementation), HIGH (writing clarity) | Must be written BEFORE any other copy. Every other piece of text on the site flows from it. The statement that "game systems can encourage players to reflect on their well-being and how they navigate pressure and meaning" is not obvious from project images — it must be asserted. |
| "What I'd Change" retrospective framing for earlier work | Rare in game design portfolios. Signals intellectual honesty, growth mindset, self-awareness — qualities studios describe as hard to find. Solves the problem of including student/early work without misrepresenting its quality. | MEDIUM (reflective writing discipline) | The framing must be confident, not apologetic. "Here's how I think about design growth" not "here's my old bad work." The structured format (description → goal → what happened → what I'd change → what carried forward) creates analytical rigor that feels like a designer, not a student. |
| Writing as primary work product | Narrative designers who treat writing as a first-class artifact — not supporting documentation — signal higher craft level. A standalone Writing section with curated samples demonstrates voice, structure, intentionality. | LOW (structure), MEDIUM (curation) | The key is curation: not everything, but pieces that show range. Include: design documents, dialogue excerpts, reflective essays. Inline excerpts (not download-only PDFs) are the table-stakes version of this differentiator. |
| Origami fold transitions as brand expression | A signature interaction that ties to the designer's thematic throughline (transformation, revelation, what lies beneath the fold). Differentiated from generic animation by being semantically connected to the work's meaning. | MEDIUM-HIGH (GSAP + CSS 3D implementation) | Works only if: (a) content loads immediately without animation blocking it, (b) reduced-motion is respected, (c) animation is applied selectively to key navigational moments, not every scroll. Anti-pattern: animation as decoration applied everywhere without semantic intent. |
| Annotated process artifacts | Including actual working documents (mood boards, early dialogue trees, revision histories, playtesting notes) with annotation explaining what they reveal. Raw artifacts without annotation are noise; annotated artifacts are evidence of a working designer's mind. | MEDIUM (curation and writing) | Particularly powerful for experience design — showing how an emotional arc was mapped and revised is rare. Each artifact needs 2-4 sentences of context: "This is an early dialogue branch. Notice the three-option structure was collapsed to two in revision because playtesting showed the third option read as a 'wrong answer' rather than a genuine alternative." |
| Throughline visibility across all projects | Each project explicitly connected to the design philosophy (well-being, pressure, meaning). Not a formulaic sentence at the bottom of every page, but a genuine articulation of how this specific project extends or challenges the designer's thesis. | LOW (implementation), HIGH (writing) | This is what makes the portfolio feel curated rather than assembled. A hiring manager should be able to read three case studies and articulate the designer's worldview — without having read the philosophy statement. |
| Indie internet personality as aesthetic position | A portfolio that feels like a person made it, not a template. Warm, quirky, cozy — stands out in a field of Squarespace grid portfolios and LinkedIn-profile-as-website aesthetics. Signals creative personality and design taste beyond the projects themselves. | MEDIUM (requires deliberate craft choices) | This is a taste signal, not a feature. See Indie Internet section below for specific CSS/interaction patterns. The risk is "cute but hard to read." The goal is "expressive AND legible." |
| Audience-specific information flow without explicit routing | Three audiences (studios, collaborators, clients) each find what they need through good information architecture, without "If you're a recruiter, click here" prompts. Studios scan Work first, then About. Collaborators read Writing, then About. Clients read About, then Contact. | MEDIUM (IA thinking) | This is a sequencing and framing problem, not a feature to build. Achieved through: (a) Work index ordering (most relevant-to-studios first), (b) About page structure (philosophy-first, credits-second, contact-last), (c) home page featuring the work that best demonstrates range. |

---

### Anti-Features (Explicitly Avoid)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Splash / intro animation that blocks content | Feels impressive, signals technical skill, creates "wow" moment | Hiring managers reviewing portfolios under time pressure bounce immediately. Every second of animation before content access is a liability. Common in design school graduates told to show technical sophistication. Consistently frustrates studio reviewers. | Content loads immediately and is fully readable; GSAP animations enhance as the visitor scrolls and explores. Origami fold transitions on navigation are fine; a loading screen before anything is visible is not. |
| Password-protected work without explanation | Protects sensitive work, signals exclusivity | Unexplained password gate signals either the work isn't ready or the designer doesn't trust the audience. Kills unsolicited interest — a recruiter on a Friday afternoon will not email to ask for the password. | If NDA-required: say so explicitly on the project card ("Protected by NDA — available on request") and offer to share in application context. If not NDA-required: publish it. |
| Trailer-only / screenshots-only project pages | Trailers look professional, game images are visually compelling | A game trailer shows the game, not the designer. A list of contributions ("wrote dialogue," "designed quest structure") without elaboration is a resume bullet — it tells the reader nothing about how the designer thinks. | 8-section case study template (see Case Study Structure section). Every project page shows process, not just outcome. |
| Exhaustive work archive with equal weight | Shows the full breadth of experience, feels honest | Curation IS the portfolio. A designer who cannot curate their own work signals a skill gap. Fifteen lightly-documented projects are weaker than three excellent case studies. Visitors cannot assess quality if everything is shown at the same depth. | Curate main Work section to 3-6 projects. Earlier/school work lives in Retrospectives section with different framing. Game jam experiments that don't demonstrate the designer's thesis: omit. |
| Social feed embeds | Shows active online presence, demonstrates community engagement | Hiring managers reviewing portfolios are not in a social media context. Feeds introduce noise the designer cannot control at point of review — can become stale, embarrassing, or broken when platform APIs change. | Link to social profiles in footer. Don't embed feeds on the portfolio itself. |
| Generic About page (resume summary voice) | Feels safe, familiar, professional | For a narrative/experience designer, the About page IS a writing sample. A flat, resume-style About page signals the designer doesn't recognize this. "I am a game designer with X years of experience in Y and Z" is not how a narrative designer should write their own story. | About page written as reflection on design identity — voice, values, what the work is trying to do in the world. Same quality standard as any piece of writing in the Writing section. |
| Work-in-progress site shared publicly | Lets feedback happen early, gets the site "out there" | Placeholder content ("Coming soon," "Check back later") poisons first impressions irreversibly. A hiring manager who sees an incomplete portfolio does not mentally note "this will be better later" — they note "this person shares incomplete work." | v1 scope discipline: launch with fewer complete sections, not more incomplete ones. Hide sections from nav until content is ready. A 2-page site (Home + one Work page + About) with excellent content outperforms a 10-page site with stubs. |
| Overbuilt technical infrastructure | Demonstrates technical sophistication, feels future-proof | For a narrative/experience design portfolio, the technical complexity of the portfolio itself is irrelevant to the audience. Time spent building a custom CMS, SSR framework, or WebGL viewer is time not spent writing better case studies. | GitHub Pages + raw HTML/CSS/JS is appropriately scoped. GSAP for fold transitions is the one justified "extra" because it ties to brand meaning. Everything else: keep it simple. |

---

## Interaction Patterns for Dual Audiences

### Hiring Manager (Quick Scan) Mode

Hiring managers reviewing portfolios behave like skimmers: they decide in 10-30 seconds whether to read further, then in 2-3 minutes whether to shortlist. The interaction pattern that serves them:

**Above-the-fold contract:** The home page hero must answer "who is this, what do they do, should I keep reading?" without a single scroll. Name + role + philosophy statement. Not a mood board. Not an animated logo. Information.

**Work cards as scannable rows:** The Work index functions as a menu. Cards should show: title, role (specific — "Narrative Designer" not "Designer"), platform/format, one strong image. The visitor should be able to scan 5 cards in 20 seconds and decide which to click. Card density matters: too sparse feels thin, too dense creates decision fatigue. 3-6 projects is the correct range.

**Case study hook in the first 200 words:** Hiring managers who click into a project page decide whether to keep reading within the first paragraph. The hook must state: what the project was, what the designer's specific role was, and what design problem they were solving. If the first paragraph is background about the game's genre or setting without a design problem statement, they stop reading.

**Prev/next navigation as scannability aid:** After reading one case study, the natural action is "what else did they do?" Prev/next arrows on project pages are low-friction portfolio scanning. Without them, the visitor has to navigate back to the Work index and reload.

**Resume PDF always one click away:** In the About page, in the footer. Hiring managers who want the resume want it immediately — they're often filling in a spreadsheet, comparing candidates, or forwarding to a colleague.

### Collaborator/Deep-Read Mode

Indie collaborators and potential creative partners behave differently from recruiters: they're looking for a thinking partner, not evaluating credentials. The interaction pattern that serves them:

**Philosophy before projects:** Collaborators want to understand the designer's worldview before evaluating their work. The philosophy statement on the home page is the hook. The About page's deeper articulation is the close. A collaborator who reads the philosophy statement and recognizes it — "yes, I think about design this way too" — is already sold before seeing a single project.

**Writing section as the real portfolio:** For collaborators, the Writing section is often more interesting than the Work section. Design essays, narrative docs, worldbuilding materials — these show how the designer thinks about their craft. The Writing section must have inline excerpts (not download-only) because collaborators will read rather than download.

**Annotations and process notes within case studies:** Collaborators read the reflection sections, the process documentation, the "what didn't work" notes. They're evaluating: "Is this person honest about failure? Do they think in ways compatible with how I work?" A case study that presents only successes is less convincing to a collaborator than one that shows genuine design problem-solving.

**Cross-linking as collaborative invitation:** Links between Writing and Work (this essay is connected to that project) create the impression of a coherent body of work, not a collection of separate things. Collaborators follow links more than hirers do — the cross-linking is for them.

### Design Navigation Implication

The 5-section nav (Home, Work, Writing, About, Contact) serves both audiences correctly:
- Hiring manager path: Home → Work → About → Contact
- Collaborator path: Home → About → Writing → Work → Contact
- Client path: Home → About → Contact

No explicit routing needed. The nav ordering (Work before Writing) correctly prioritizes the hiring manager path — the audience for whom order matters most — while still making Writing accessible.

---

## Case Study Structure: Compelling vs. Mediocre

### What Makes a Case Study Mediocre

A mediocre game design case study does one or more of these:

1. **Leads with the game, not the problem.** First paragraph: "Cozy Cavern is a top-down resource management game set in a whimsical underground world..." The designer's role is not mentioned until paragraph 3.

2. **Describes instead of analyzes.** "I wrote the dialogue for the merchant characters. I designed three quest lines. The game was released on itch.io." No design problem, no decisions explained, no constraint visible.

3. **Shows only successes.** "The game received excellent player feedback. Players loved the dialogue system." No mention of what didn't work, what was cut, what the designer would change.

4. **Uses images without context.** Screenshots appear in the middle of the write-up with no caption explaining what they demonstrate. A visitor who doesn't know the game cannot tell what they're looking at.

5. **The throughline is absent.** The project is documented but not connected to the designer's design philosophy or values. A reader could not explain what this designer cares about based on this case study alone.

6. **Vague role description.** "I was a designer on this project" when the team had six people. What specifically did this person own?

### What Makes a Case Study Compelling

The 8-section structure recommended in REQUIREMENTS.md is correct. Here is the *purpose* of each section — what the hiring manager is looking for, not just what goes there:

**1. Title block with hero image/video**
*Purpose for hirer:* Immediate orientation. Name, platform, designer's role (specific), status (shipped/prototype/concept). The visual establishes the aesthetic register.
*What makes it compelling:* Specific role title. "Led narrative design for the main questline, wrote approximately 8,000 words of branching dialogue" is better than "Narrative Designer."

**2. 2-4 sentence project summary for non-industry readers**
*Purpose for hirer:* They may not know the genre, the platform, or the context. This is not condescending — it's professional.
*What makes it compelling:* One sentence on what the game is. One sentence on who the player is. One sentence on what the designer's contribution was. That's it.

**3. Design challenge / problem statement**
*Purpose for hirer:* This is the hook. "The design problem was X" is what they're evaluating you on.
*What makes it compelling:* A specific, honest problem statement. "The challenge was: how do we design a dialogue system that makes players feel the weight of their choices without creating a 'wrong answer' dynamic that triggers anxiety rather than reflection?" This is better than "I needed to create engaging dialogue."

**4. Process / approach with supporting artifacts**
*Purpose for hirer:* Proof of process. Not just what you made, but how you thought about making it.
*What makes it compelling:* Show the evolution. An early version that didn't work. A decision point where you chose one approach over another and explain why. An artifact (mood board, diagram, draft dialogue, playtesting notes) with annotation. The annotation matters more than the artifact.

**5. Outcome with qualitative evidence where available**
*Purpose for hirer:* Did it work? Do you know if it worked?
*What makes it compelling:* Honest outcome. "The mechanic shipped and player feedback suggested the branching felt meaningful to 80% of playtesters" is better than "the game launched successfully." If there's no data: "We didn't have formal playtesting data — here's what we observed during play sessions" is more credible than inventing numbers.

**6. Reflection paragraph**
*Purpose for hirer:* This is often the most revealing section. What does the designer think now?
*What makes it compelling:* Genuine self-critique. "If I were building this system today, I'd [specific change] because [specific reason]." The designer who can identify their own mistakes is safer to hire than one who presents everything as a success.

**7. Attached writing / documents with inline excerpt**
*Purpose for hirer:* Supporting evidence. The dialogue doc, the design brief, the narrative framework.
*What makes it compelling:* An inline excerpt (2-4 paragraphs) that gives a taste of the document, followed by a download link. Forcing the reader to download a PDF before knowing whether it's worth reading increases friction and reduces read rate.

**8. Prev/next and back to Work navigation**
*Purpose for hirer:* Low-friction continuation. After reading this case study, what next?
*What makes it compelling:* Prev/next with titles, not just arrows. "Next: [project name]" tells the hirer whether it's worth clicking. Back to Work is always visible.

---

## Indie Internet Aesthetic: Technical Implementation Notes

### What "Indie Internet Personality" Means for CSS/Interaction

The aesthetic reference (personal web / tumblr / pixel art culture — cozy, quirky) maps to specific technical choices. These are not just visual preferences; they communicate "a person made this" rather than "a template was purchased."

**Typography choices:**
- Serif or display fonts for headings that feel hand-selected, not default. Google Fonts: Lora, Playfair Display, Libre Baskerville, or a variable serif. Avoid Inter/Roboto/Poppins as body text (too corporate/template).
- Body text that reads like writing, not interface text. Something with personality — Crimson Pro, Source Serif 4, or Merriweather at comfortable size (18px+).
- Font mixing with intention: one quirky display font + one readable serif body = indie personality without chaos.
- No system font stacks as primary choice — the stack should feel chosen, not defaulted.

**Color approach:**
- Warm neutrals as base: parchment/cream (#f5f0e8, #fdf8f0 range), warm grays, aged paper tones. Not pure white (#ffffff) — too clinical.
- Accent colors drawn from warm spectrum: ochre, terracotta, soft sage, dusty rose. These communicate "cozy" without being saccharine.
- Dark mode is NOT expected for indie internet aesthetic — the warmth comes from the light palette.
- Color as ink-on-paper, not screen-on-screen: text should feel like it's sitting on a surface, not floating.

**Layout and spacing:**
- Asymmetry as choice. Grid-perfect alignment on everything reads as template. Small asymmetries (slightly offset pull quotes, varying card widths, one element that bleeds to an edge) read as designed.
- Generous whitespace — but organic, not mathematically equal. Indie internet isn't sparse; it's comfortable.
- Occasional "decorative" elements: small ornamental dividers (typographic: ✦ or —), thin borders on cards that feel like paper frames, subtle texture overlays.
- Max-width for text: 65-75ch for body text (readability). The text block doesn't need to fill the viewport.

**CSS patterns specific to indie internet aesthetic:**
```css
/* Warm base instead of pure white */
:root {
  --color-bg: #fdf8f0;
  --color-text: #2c2420;
  --color-accent: #c4813a;
  --color-muted: #8a7970;
}

/* Paper texture via CSS (no image required) */
body {
  background-color: var(--color-bg);
  background-image:
    radial-gradient(ellipse at 20% 50%, rgba(196, 129, 58, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(196, 129, 58, 0.03) 0%, transparent 40%);
}

/* Typography with personality */
h1, h2 {
  font-family: 'Lora', Georgia, serif;
  font-weight: 600;
  letter-spacing: -0.01em; /* Slightly tight for display sizes — feels considered */
}

body {
  font-family: 'Crimson Pro', 'Georgia', serif;
  font-size: 1.125rem; /* 18px — comfortable for long reads */
  line-height: 1.75;
}

/* Cards that feel like paper/objects */
.project-card {
  background: #fff8f0;
  border: 1px solid rgba(44, 36, 32, 0.12);
  border-radius: 2px; /* Barely rounded — not bubbly, not sharp */
  box-shadow:
    0 1px 3px rgba(44, 36, 32, 0.08),
    0 4px 12px rgba(44, 36, 32, 0.06);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.project-card:hover {
  box-shadow:
    0 2px 6px rgba(44, 36, 32, 0.12),
    0 8px 24px rgba(44, 36, 32, 0.1);
  transform: translateY(-2px); /* Subtle lift — card becomes object */
}
```

**Interaction patterns that feel "indie":**
- Hover states that feel responsive but not aggressive. A card that lifts 2px on hover feels like picking up a piece of paper. A card that dramatically scales 1.05x feels like a button.
- Custom cursor is sometimes used in indie web aesthetic but adds maintenance burden and accessibility concerns — skip for v1.
- Subtle scroll-reveal for sections (not aggressive scroll-jacking). Content that fades or slides in as it enters the viewport feels alive; content that flies in from off-screen feels like a landing page template.
- Link underlines that are decorative, not invisible: colored, dotted, or with a bottom border instead of the browser default. Shows the text was styled, not ignored.
- Focus styles that are visible and styled, not the browser default outline (accessibility + aesthetic simultaneously).

**What makes indie internet feel wrong when implemented poorly:**
- Too many colors (≥4 accent colors reads as uncontrolled).
- Pixel art or icon fonts used decoratively without connecting to content (decoration without meaning).
- Hover animations that are slow (>400ms) — what should feel cozy starts feeling clunky.
- Quirky fonts used for body text (display fonts at paragraph length are unreadable).
- Texture overlays that degrade WCAG contrast below 4.5:1 — accessibility is not an aesthetic choice.

---

## Navigation Patterns for a 5-Section Site

### Confirmed Structure

```
Home | Work | Writing | About | Contact
```

- "Contact" = anchor link to `/about#contact` (not a separate page — reduces structural complexity, contact is always findable within About).
- "Earlier Work" = page exists, hidden from nav until content is ready.

### What Works at This Size

A 5-item primary nav is at the upper bound of comfortable primary navigation. At 6+ items, nav starts to feel overwhelming. At 5, each item should be self-explaining at a glance — no visitor should wonder what "Work" contains.

**Desktop nav pattern:** Horizontal, top-fixed or top-sticky, left-aligned or centered. The logo/site name on the left acts as an implied "Home" even when Home is also listed. For indie internet aesthetic: subtle styling (no heavy background on the nav bar, typography-first rather than button-first).

**Mobile nav pattern:** Hamburger is acceptable at 5 items. Alternative: a simple vertical stack on scroll (top nav collapses to icon + name). Key: the hamburger icon must be labeled or large enough to be obvious. Small unlabeled hamburger menus on mobile are a UX failure.

**Active state:** The current page should be visually indicated in the nav. Options: underline, color change, weight change. This is both accessibility (orientation) and aesthetic.

**Footer nav echo:** Repeat nav links in footer. This serves two purposes: (1) visitors who scroll to the bottom of a long case study can navigate forward without scrolling back to the top, (2) footers with nav + contact create a "landing zone" feeling — the site has been thought through.

### Nav Behavior for Dual Audiences

The order `Work | Writing | About` within the nav reflects audience priority:
- Hiring managers click Work first (ordering Work early reduces friction).
- Collaborators often click About to assess values before looking at Work.
- Clients click About and Contact.

Writing placed between Work and About is correct: it's not the first destination for any audience, but it's reachable from a natural left-to-right scan.

### Contact as Anchor vs. Page

The decision to use `/about#contact` rather than a separate Contact page is correct for a solo designer portfolio. Rationale:
- Contact for a solo designer is typically just an email address and possibly a form — it doesn't need its own page.
- Combining it with About creates a natural "learn about me → reach out" flow that mirrors how hiring decisions actually happen.
- Fewer pages = less nav cognitive load.
- The footer email link + the nav "Contact" anchor creates two contact pathways without any additional pages.

---

## Feature Dependencies

```
Design Philosophy Statement (D1)
    └──must precede──> All other copy (home headline, About page, case study framing)
    └──informs──> Throughline Visibility (D7) across all project pages
    └──informs──> Indie Internet Personality (D8) — even aesthetic choices reflect the designer's values

Case Study Template (first project page)
    └──requires──> Work index page at /work to exist first
    └──validated-before──> Replication to additional project pages
    └──enables──> Home page featured project cards (cards link to project pages that must exist)
    └──enables──> Writing cross-links (linked from project pages)

Writing Section
    └──requires──> Writing samples to exist and be curated
    └──requires──> Inline excerpts written (not just PDFs)
    └──enhanced-by──> Cross-links from project pages (D8)
    └──depends-on──> Work section being populated (so writing can reference projects)

Retrospectives / Earlier Work
    └──requires──> Earlier work documented (even without playable builds)
    └──requires──> Critical reflection written for each entry
    └──requires──> Rest of site identity established (Retrospectives answer "where I came from" — makes sense only once "where I am" is clear)

Origami Fold Transitions (GSAP)
    └──requires──> All content pages complete (animation is added to stable content, not in parallel)
    └──requires──> prefers-reduced-motion implemented
    └──requires──> Mobile fallbacks implemented (opacity/scale fades below 768px)
    └──tested-before──> Site URL shared publicly

Mobile Responsiveness
    └──depends-on──> All custom CSS/JS additions being tested IMMEDIATELY after each phase, not deferred
    └──critical for──> GSAP 3D transforms (known iOS Safari failure mode)

Contact Pathway
    └──no-dependencies — can be built first
    └──should-be-present──> From day 1 of any public URL being shared (footer email minimum)
```

### Dependency Notes

- **Philosophy precedes everything:** The design philosophy must be drafted before any copy is written. Starting with the philosophy statement and then writing the home headline, About page, and case study hooks ensures coherence. Reversing this order produces incoherent sites where the philosophy feels retrofitted.
- **First project page is the template:** Build one, validate with trusted reviewers, then replicate. Building all project pages in parallel without validating the template means reworking all of them if the template needs changes.
- **Animations are additive, not structural:** GSAP fold transitions enhance an already-complete site. Adding animation before content is stable means animating placeholder content, and the animation will need to be recalibrated when content changes.

---

## MVP Definition

### Launch With (v1) — "Linkable and Professional"

- [x] Design philosophy statement written first, before any page copy
- [x] Home page: identity statement above the fold, featured project cards (1-2 is sufficient), philosophy teaser, footer with email and nav
- [x] Work index at /work: 3-6 project cards with title, role, platform, image
- [x] At least 1 complete case study (full 8-section structure, honest reflection, connected to philosophy throughline)
- [x] About page: design philosophy, professional identity, resume PDF download, contact section (#contact anchor)
- [x] Footer on every page: email link, nav echo
- [x] Mobile-readable at 375px and 768px (verified, not assumed)
- [x] No broken links, no placeholder text on any shared page

### Add After Validation (v1.x)

- [ ] Second complete case study — once the template is validated by reviewer feedback
- [ ] Writing section — once 2-3 curated samples with inline excerpts are ready
- [ ] Origami fold GSAP transitions — once all content pages are stable
- [ ] Cross-linking audit (Work ↔ Writing ↔ About)

### Future Consideration (v2+)

- [ ] Earlier Work / Retrospectives section — requires the rest of site identity to be solid first
- [ ] Design briefs as speculative work — strong differentiator but not needed for "linkable" goal
- [ ] Annotated process artifacts in all case studies — time-intensive; add as content becomes available
- [ ] SEO / meta descriptions — game design portfolios are shared directly, not discovered via search
- [ ] Analytics (Plausible or similar) — add once public URL is shared, to understand what gets read
- [ ] Three.js / WebGL demos — assess after v1 is live; not needed for v1 content

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Design philosophy statement (written content) | HIGH | LOW (writing, not code) | P1 |
| Identity statement above the fold | HIGH | LOW | P1 |
| Work index with 3-6 project cards | HIGH | LOW | P1 |
| First complete case study (8-section) | HIGH | HIGH (content) | P1 |
| About page with philosophy + contact | HIGH | MEDIUM | P1 |
| Footer with email + nav | HIGH | LOW | P1 |
| Mobile responsiveness (375px / 768px) | HIGH | LOW-MEDIUM (testing) | P1 |
| Resume PDF download | MEDIUM | VERY LOW | P1 |
| Second complete case study | HIGH | MEDIUM (template reuse) | P2 |
| Writing section with inline excerpts | HIGH (for collaborators) | MEDIUM | P2 |
| Throughline paragraph on each project page | HIGH | LOW (writing) | P2 |
| Prev/next project navigation | MEDIUM | LOW | P2 |
| Origami fold transitions (GSAP) | MEDIUM (brand) | MEDIUM-HIGH | P2 |
| Annotated process artifacts in case studies | MEDIUM | MEDIUM | P2 |
| Earlier Work / Retrospectives section | MEDIUM | MEDIUM | P3 |
| Design briefs as speculative work | MEDIUM | MEDIUM | P3 |
| SEO / meta descriptions | LOW (for portfolio) | LOW | P3 |
| Analytics | LOW-MEDIUM | LOW | P3 |
| Three.js / WebGL interactive demos | LOW (for this role) | HIGH | P3 |
| Social feed embeds | LOW (actively avoid) | LOW | SKIP |
| Splash / intro animation | NEGATIVE | LOW | SKIP |
| Password-protected work (no NDA) | NEGATIVE | LOW | SKIP |

**Priority key:**
- P1: Must have for v1 launch
- P2: Should have — add when content and template are validated
- P3: Future consideration — v2+
- SKIP: Explicitly anti-feature for this portfolio

---

## Reference: Comparable Portfolios (Patterns to Draw From)

The following aesthetic/structural patterns appear in portfolios that successfully hit the "indie internet + hiring manager credible" target. Sources are from training knowledge through August 2025 — specific URLs should be verified if using as direct references.

**What the best examples do:**
- The home page hero is a written statement, not an image carousel. The image is atmospheric (behind the text or beside it), not the hero.
- Case study pages feel like long-form writing, not feature spec sheets. The typography creates a "reading" experience, not a "scanning" experience.
- Project cards on the Work index have personality without clutter: one strong image, a title in a display font, a brief role descriptor. No tag clouds, no rating systems, no filter toggles.
- The About page is first-person, opinionated, and specific. "I make games about the moments between choices" rather than "I am a passionate game designer with a love of storytelling."
- Navigation is one line, no mega-menus, no dropdowns. At 5 items, it fits in one line at all desktop widths.
- Footer is simple and useful: site name, nav echo, email, LinkedIn, resume PDF. Not decorative, not empty.

**What differentiates the memorable from the forgettable:**
- The portfolio has a point of view that's visible before the first project is read.
- The About page takes a position, not just describes a resume.
- At least one piece of writing (in Writing or as a case study) demonstrates voice that matches the stated design philosophy.
- The aesthetic feels chosen, not defaulted. The font, the color, the whitespace — these clearly represent the designer's taste.
- There is evidence of self-awareness: a reflection that says something didn't work, or a retrospective that shows critical thinking about past decisions.

---

## Sources

- Game design portfolio discourse from GDC talks, narrative design community (narrative-design Slack, Writers Guild Game Design community), game design education conversations through August 2025 — table stakes, case study structure, hiring manager expectations (HIGH confidence — consistent across multiple independent sources)
- UX patterns for creative portfolios — information architecture for dual-audience sites, navigation patterns, case study readability (MEDIUM-HIGH confidence — well-established UX principles applied to portfolio context)
- Indie internet aesthetic — CSS patterns, typography choices, interaction patterns (MEDIUM confidence — well-documented in frontend community but specific implementation choices should be tested against actual WCAG AA contrast requirements)
- Requirements.md and PROJECT.md (this project) — feature scope validation, platform constraints, v1 definition (HIGH confidence — primary source)

---

*Feature research for: Origami Games — Narrative and Experience Engineer portfolio*
*Platform: GitHub Pages (static HTML/CSS/JS)*
*Researched: 2026-02-24*
*Updated from 2026-02-23 version: platform corrected (Squarespace → GitHub Pages), expanded case study structure analysis, dual-audience interaction patterns, indie internet technical details, navigation pattern analysis*
