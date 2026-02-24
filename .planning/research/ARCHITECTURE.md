# Architecture Research: Game Design Portfolio

> Research basis: Industry conventions for game/narrative design portfolios, Squarespace platform capabilities,
> UX and information architecture principles. Applied to the Origami Games portfolio context.
> Date: 2026-02-23

---

## Site Structure

A game design portfolio serves three distinct visitor types simultaneously: hiring managers who scan quickly for evidence of craft and shipping experience; collaborators who want to understand how you think; and freelance clients who need to trust you with their vision. The page inventory below is organized around that reality — every page has a primary job.

### Page Inventory

| Page | Type | Primary Job | Primary Audience |
|------|------|-------------|-----------------|
| Home | Landing | Establish identity + philosophy + draw visitors into work | All |
| Work (index) | Gallery/Index | Surface the range of shipped games and case studies as a curated set | Studios, clients |
| Project page (per project) | Detail | Prove design thinking through one project in depth | Studios, collaborators |
| Writing | Index or Folder | Demonstrate craft at the sentence and systems level | Studios, collaborators |
| Earlier Work / Retrospectives | Index or Folder | Show growth, self-awareness, and the ability to critique your own work | Studios, collaborators |
| About | Single page | Make the human legible — story, throughline, values | All |
| Contact | Single page or section | Remove friction from reaching out | All |

### Purpose Detail Per Section

**Home / Landing**
The home page is doing the hardest job on the site: converting a stranger into someone who wants to read more. For a narrative/experience designer, the home page must communicate the design philosophy — not just "I make games" but "I make games that do this specific thing in the world" — before the visitor clicks anything. This means the above-the-fold moment carries a thesis, not just a name and job title. Featured project cards below serve as proof, not a full catalogue.

Typical structure: hero (name + philosophy statement) → 2–3 featured project cards → brief identity bridge (1–2 sentences toward About) → footer.

**Work (Index)**
The work index is a curated gallery, not an exhaustive archive. Industry convention for game design portfolios is to show 3–6 projects rather than everything. Quantity signals volume; quality and selection signal judgment. Each card shows: game title, role, platform/format, and a single evocative image. Optionally a one-line hook.

Sub-types within Work may include: shipped games (highest credibility), design briefs (shows process when shipped work is limited), and prototypes (used sparingly, only when they illustrate a specific mechanic or intent that shipped work doesn't cover).

**Project Page (Case Study)**
See "Project Page Anatomy" section below for full detail.

**Writing**
Standalone writing samples — narrative design documents, design essays, reflective pieces. These are not attached to a specific project; they exist as independent proof of voice, rigour, and thinking. A writing index may link to PDFs, embedded documents, or project-style single pages with the text inline.

For a narrative designer specifically, this section carries more weight than it would for a systems or level designer. Reviewers in narrative roles expect to be able to read your prose.

**Earlier Work / Retrospectives**
The "What I'd Change" framing is a strong differentiator. Rather than hiding student work (which reviewers can often identify anyway) or presenting it uncritically, the retrospective frame signals maturity, self-awareness, and the ability to learn — qualities explicitly valued in collaborative studio environments.

Structure per retrospective: brief project description → what the project was trying to do → what actually happened → what you would do differently now → what you learned that carried forward. This is not self-deprecation; it is demonstrated critical thinking.

**About**
The About page for a game designer is not a resume page — it is where the philosophy becomes personal. Effective About pages for designers in this space answer: Who shaped how you think? What problems keep pulling you back? What do you stand for when you have to make a hard design call? A throughline (here: well-being, pressure, meaning) should appear explicitly and be traceable back to the work shown.

Resume/CV should be available here — as a downloadable PDF, not inline text. A list of credits or shipped titles may appear as a compact reference block.

**Contact**
Can be a standalone page or a section at the bottom of About. For a portfolio site, standalone pages for contact add unnecessary navigation friction unless the contact form is elaborate. A section at the bottom of About with a simple form or email link is often more effective — it catches visitors who've just finished reading about the person and are ready to reach out.

---

## Navigation Flow

### Primary Navigation (Top-Level)
A game design portfolio's primary nav should be minimal. Recommended max: 5 items.

```
Home  |  Work  |  Writing  |  Earlier Work  |  About
```

Contact can live within About rather than as a top-level nav item, reducing visual noise. If Contact is separate, consider folding Writing and Earlier Work under a single "Words" or "Thinking" umbrella to keep nav at 4–5 items.

### Visitor Paths by Audience Type

**Hiring manager (time-scarce, evaluating fit)**
1. Home — reads the philosophy statement, decides if it's relevant
2. Work index — scans project cards for recognizable titles or roles
3. One or two project pages — looks for evidence of scope, contribution, and process
4. About — checks credits, experience level, location/availability
5. Contact or resume PDF

**Collaborator / indie dev (values-led, looking for thinking partner)**
1. Home — reads the philosophy statement carefully
2. About — wants to understand the person first
3. Writing — looks for voice and the quality of thinking
4. Work — reads 1–2 case studies in depth
5. Contact

**Freelance client (trust-building, looking for reliability)**
1. Home — first impressions, professionalism
2. Work — is there shipped work? Is the quality evident?
3. About — who is this person, can I trust them with my project?
4. Contact

### In-Page Flow Considerations
- Project pages should have clear previous/next navigation if multiple projects are in the same collection — this keeps evaluators moving through the work without returning to the index.
- The home page's featured project cards should link directly to project pages, not to the Work index. Reduce clicks to depth.
- About should link to both the Work index and Contact — it's a natural transition point for engaged visitors.
- Footer navigation should echo the primary nav and add the resume PDF link.

---

## Project Page Anatomy

A single case study page for a game or narrative design project follows a recognizable structure in the industry. The goal is to answer four questions in order: What was this? What did you do? How did you think about it? What happened?

### Standard Structure

**1. Title block**
- Game/project title
- Your role (be specific: "Narrative Designer" not just "Designer")
- Platform, format, release date or status (Shipped / In Development / Prototype)
- Studio or context (solo project, team, jam, client)
- A single hero image or embedded trailer/video

**2. Project summary (2–4 sentences)**
What is the game, and what was your contribution to it? Written for someone who may never play it. Avoid internal jargon. If it's shipped and publicly available, link to it here.

**3. Design challenge / problem statement**
What was the core design problem you were solving? This is where "narrative and experience designer" becomes concrete. What did the player need to feel or understand? What constraint or tension were you working within? This section separates process documentation from a feature list.

**4. Process / approach**
How did you approach the problem? What tools, methods, or frameworks did you use? This section may include:
- Sketches, diagrams, or flowcharts (narrative structure maps, system diagrams)
- Wireframes or paper prototypes
- Documentation excerpts (design briefs, narrative design docs)
- Iteration notes — what you tried first and why you changed it

Keep this honest. Reviewers in game studios have seen enough portfolio case studies to recognize sanitised "it all went perfectly" narratives. Include what didn't work.

**5. Outcome**
What shipped? What changed from your original approach? If there's a playable build, link to it. If there are player responses, reviews, or feedback that speak to the design goal, include them. Quantitative metrics are less important in narrative/experience design than in UX — qualitative evidence (player comments, review excerpts, playtester notes) is appropriate and credible.

**6. Reflection (optional but valuable)**
One paragraph on what you learned or what you'd approach differently. This is especially powerful for studios who want to understand how you grow. For retrospectives, this section expands into the full "What I'd Change" treatment.

**7. Attached writing / documents (project-specific)**
Design briefs, narrative docs, or writing samples that are attached to this project rather than the general Writing section. These can be:
- Embedded PDFs (Squarespace supports PDF embedding via file blocks or embeds)
- Expandable sections / accordions (via custom JS)
- Links to external documents (Google Docs, Notion, itch.io)

**8. Navigation footer**
- Previous project / Next project
- Back to Work index
- Link to About or Contact if appropriate

### What to Omit
- Long lists of features the game has (this is a portfolio, not a press kit)
- Tool/software logos without context ("Made in Unity" on its own tells a reviewer nothing useful)
- Every iteration — show the arc, not every step
- Screenshots without captions — every image should be doing rhetorical work

---

## Information Hierarchy

What visitors should encounter in what order — and why.

### First: Identity + Philosophy (Home, above the fold)

The single most important thing a narrative/experience designer's portfolio must communicate is the "why" behind the work. Before a visitor reads a single case study, they should know: this designer's work is about helping players reflect on well-being, pressure, and meaning. That is a positioning statement that differentiates the portfolio from the vast majority of game design portfolios, which lead with tools and titles.

Practically: the hero section of the home page carries the designer's name, a one-line philosophy statement (not a job title), and possibly a single atmospheric visual that signals the aesthetic register of the work.

Example hierarchy at this level:
1. Name
2. Philosophy statement ("I design game systems that help players reflect on pressure, meaning, and well-being.")
3. Atmospheric image or motion element (origami fold)
4. Featured project cards (proof)

### Second: Proof of Craft (Work / Project pages)

Once identity is established, visitors need evidence. This is where the Work index and project pages operate. The hierarchy within this tier:
1. Shipped work (highest credibility — something existed in the world and players interacted with it)
2. Case studies with visible process (shows how you think)
3. Design briefs (shows what you would have done, useful when shipped work is limited)
4. Prototypes (shows specific mechanic or intent — lower credibility tier, use selectively)

### Third: Voice and Thinking (Writing + Retrospectives)

For a narrative designer, the writing section is not supplementary — it is a second proof layer. Reviewers looking for narrative designers specifically will read the writing. The hierarchy within this tier:
1. Writing that connects to the design philosophy (most powerful)
2. Design essays or reflective writing (demonstrates critical thinking)
3. Retrospectives / "What I'd Change" (demonstrates growth and self-awareness)

### Fourth: The Human (About + Contact)

Visitors who reach the About page are already engaged. They've seen the work. Now they want to understand the person. The About page can be warmer and more personal than the portfolio pages without sacrificing professionalism. By the time a visitor reaches Contact, friction should be near zero.

---

## Build Order

Recommended sequence for building a Squarespace portfolio from scratch. The logic: establish identity and structure first, then add content in order of credibility and visitor priority.

### Phase 1: Foundation (Before any content)
1. **Choose and configure a Squarespace template** — select a template that supports full-bleed hero sections, a clean navigation bar, and portfolio/gallery-style index pages. Squarespace 7.1 templates are all on the same engine, so template choice is primarily aesthetic. Bedford, Avenue, and Brine (7.0) or their 7.1 equivalents suit portfolio sites.
2. **Set up site-wide styles** — typography, color palette, spacing — before building pages. Changing these later cascades through every page. Define: primary font (headers), secondary font (body), background color, text color, accent color.
3. **Configure navigation structure** — add top-level nav items as placeholder pages so the nav bar reflects the final structure even before content exists.
4. **Set up header/footer code injection points** — add GSAP CDN script tag in the header injection area. Establish a custom CSS injection file structure (even if empty). This prevents having to revisit the injection setup mid-build.

### Phase 2: Home Page
5. **Build the hero section** — name, philosophy statement, atmospheric visual. This is the highest-value real estate on the site. Get it right before building anything else, because it sets the visual and tonal register.
6. **Add placeholder featured project cards** — even with placeholder images, establish the layout and spacing of the featured work section. Real images replace placeholders in Phase 4.
7. **Add footer** — contact link, social links, resume PDF link, nav echo.

### Phase 3: Work Index + First Project Page
8. **Create the Work index page** — configure as a Portfolio or Gallery page in Squarespace (see Squarespace Structure section). Add placeholder cards.
9. **Build one complete project page** — the first case study page establishes the template that all subsequent project pages will follow. Choose the strongest shipped project. Build this page fully before creating additional project pages.
10. **Validate the project page template** — share the link with one or two trusted reviewers and get feedback before replicating the structure across all projects.

### Phase 4: About Page
11. **Write and publish the About page** — the About page benefits from knowing the Work is in place, because the About narrative can reference specific projects. Build it after at least one project page is live.
12. **Add resume PDF** — ensure the PDF is formatted to match the site's visual register.

### Phase 5: Writing and Earlier Work
13. **Writing index** — create the Writing section once the Work section is populated. The contrast between the two makes both stronger.
14. **Retrospectives / Earlier Work** — build last among the content sections. These require the most careful framing and benefit from having the rest of the site's identity established first.

### Phase 6: Contact + Polish
15. **Contact page or section** — either a standalone page or a section appended to About.
16. **Cross-linking audit** — ensure every page that should link to another does. Home → Projects. Projects → About. About → Contact. Footer → all.
17. **Mobile review** — Squarespace templates are responsive, but custom CSS and GSAP animations require explicit mobile testing. Review every page on mobile viewport.
18. **Custom domain and SEO basics** — connect domain, set page titles and descriptions, add alt text to images.

### v1 Minimum Viable Site (for "just enough to share")
For the stated v1 goal — structure + 1–2 featured projects, linkable and professional — the minimum is:
- Home page (with philosophy + 1–2 featured project cards)
- 1–2 complete project pages
- About page (can be brief)
- Contact (section within About is sufficient)
- Work index page (even with only 1–2 cards, so the URL structure is correct from the start)

Writing and Earlier Work sections can be added to nav as "Coming Soon" placeholder pages or simply omitted from nav until content is ready.

---

## Squarespace Structure Considerations

### Page Types Available in Squarespace 7.1

| Squarespace Page Type | What It Does | Best Used For |
|----------------------|--------------|---------------|
| Regular Page | Single content page, drag-and-drop blocks | Home, About, Contact, Writing index, individual writing samples |
| Portfolio Page | Index page with cards linking to sub-pages; built for visual project showcasing | Work index — this is the native fit for a portfolio gallery |
| Blog Page | Index of posts in reverse-chronological order; each post is a sub-page | Not recommended for primary portfolio use; lacks gallery-style layout control |
| Folder | Navigation grouping — contains other pages but is not itself a content page | Grouping Writing + Earlier Work under a nav umbrella |
| Link | Nav item that links to an external URL | Resume PDF link, itch.io, external writing |
| Gallery Page | Grid/slider of images; minimal text | Useful for image-heavy showcases, but limited for case studies with text |

### Mapping Portfolio Needs to Squarespace Page Types

**Home page** → Regular Page. Full creative control via blocks. Hero section, featured project cards (using summary blocks linked to Portfolio), about-bridge section.

**Work index** → Portfolio Page. This is Squarespace's native portfolio collection type. Each project is a Portfolio sub-page (its own full-length page). The index displays as a grid of cards. Supports thumbnail images, titles, and excerpts per card.

**Individual project pages** → Portfolio sub-pages within the Work Portfolio Page. Each gets a full-length page with all block types available (text, image, video, embed, file/PDF, code for custom JS).

**Writing section** → Either:
- A Portfolio Page (if you want a visual card-grid with writing thumbnails)
- A Regular Page with a styled list of links (simpler, works well if writing samples are PDFs or external links)
- A Blog Page (if writing will be added frequently and reverse-chronological order makes sense — but this is flagged as out of scope)

**Earlier Work / Retrospectives** → Portfolio Page (separate from Work), or a Folder containing individual Regular Pages. A separate Portfolio Page is preferable — it maintains the same card-grid visual language as Work while being clearly distinct in nav.

**About** → Regular Page. Long-form content, image, resume PDF download.

**Contact** → Either a standalone Regular Page with a Form block, or a section appended to the About page.

### Navigation Configuration in Squarespace
- Main navigation is configured in Pages panel — items can be Regular Pages, Portfolio Pages, Folders, or Links.
- Not Linked pages (pages that exist but are not in the nav) are useful for: pages you're building but not ready to share, project pages accessed only through the Work index, and thank-you pages after form submissions.
- A Folder in the nav creates a dropdown. Use sparingly — dropdowns add interaction friction and are harder to style consistently with custom CSS.
- Squarespace footer navigation is configured separately from the header nav. The footer nav can include items not in the header (e.g., resume PDF, social links).

### Custom CSS + JS in Squarespace
- CSS injection: Design panel → Custom CSS. Applied site-wide.
- JS injection and external script loading (e.g., GSAP CDN): Settings → Advanced → Code Injection → Header.
- Per-page code injection: Available on Business plan and above. Allows page-specific JS for custom animations on specific pages without affecting site-wide performance.
- GSAP loaded via CDN in header injection is available on all pages site-wide once added. Page-specific GSAP ScrollTrigger setups can be initialized in per-page code injection or gated with URL checks in a site-wide script.

### Squarespace Summary Blocks
Summary Blocks are a key structural tool: they display a grid or list of items from another collection (Portfolio, Blog) on any Regular Page. This is how the Home page can show featured project cards pulled from the Work Portfolio collection — without manually duplicating content. The featured cards on Home are a Summary Block pointed at the Work Portfolio, filtered or ordered to show only featured items.

### Squarespace Portfolio Sub-Page URLs
By default, Portfolio sub-page URLs follow the pattern `/work/project-name`. This is clean and appropriate. If the Work Portfolio page slug is set to `/work`, all project pages will be at `/work/[project-slug]`. Set the Work page slug deliberately before publishing — changing it later breaks any external links to project pages.

---

## Notes for Roadmap

The following architectural insights should directly inform phase planning:

**1. Identity-first, evidence-second is the right phase order.**
Phase 1 of the build is the home page and its philosophy statement — not the project pages. Visitors need to understand the "why" before the "what." This means the Home page is not a wrapper to be built last; it's the first thing to get right.

**2. One complete project page before replicating.**
Build one case study page fully before creating additional project pages. The first project page is the template. Validate it before scaling. This avoids reworking the same structural decisions six times.

**3. The Work Portfolio page slug must be set before any project is published.**
`/work` as the slug should be locked in at the start of Phase 3. Changing the parent Portfolio page slug after project sub-pages are live changes all their URLs.

**4. Writing and Earlier Work are Phase 5, not Phase 1.**
These sections have the most complex framing requirements (especially retrospectives) and the least urgency for v1. They should be scaffolded (nav items that say "Coming soon" or simply hidden from nav) while Work and About are built out.

**5. The retrospectives frame is a structural differentiator.**
"What I'd Change" as a section is not common in game design portfolios. It requires its own section — not a footnote in the Work section — because the framing is doing active rhetorical work. It tells visitors: this designer is self-aware and has a growth mindset. That is worth a dedicated place in the nav, not just a paragraph in About.

**6. Mobile must be validated during build, not at the end.**
GSAP animations and custom CSS transforms (especially 3D origami folds) often break on mobile viewports or have performance issues. Each phase that adds animation should include a mobile check step, not a single mobile review at the end.

**7. Contact friction should be near zero.**
For a v1 "just enough to share" site, Contact can live as a section within About. Adding it as a standalone page adds a nav item and a click without proportionally increasing conversions. Revisit once the site is live and you understand how visitors are arriving.

**8. Featured project cards on Home should use Summary Blocks.**
Do not manually duplicate project information on the Home page. Use Squarespace Summary Blocks pointed at the Work Portfolio collection. This ensures that updating a project page automatically updates its card on the Home page — one source of truth.

**9. Writing samples attached to projects vs. standalone.**
Some writing will live on project pages (attached narrative docs, design briefs specific to a project). Some will live in the Writing section (standalone essays, voice samples). Decide which writing belongs where at the content inventory stage — before building — to avoid duplicating or misplacing content.

**10. v1 is a URL, not a finished site.**
The success condition for v1 is a linkable, professional URL with correct structure and 1–2 complete projects. The navigation can include placeholder sections. The site's job at v1 is to not embarrass itself when someone clicks through from a job application — not to be comprehensive. Scope accordingly.
