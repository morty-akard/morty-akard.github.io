# Portfolio voice and content system

## Purpose

This portfolio should sound like Morty explaining real design work: direct,
specific, evidence-aware, and human. It should not read like a generic UX
case-study template or an AI-polished portfolio.

This guide applies to every public page: the home page, projects index, case
studies (short and full versions), articles index, about page, contact page,
and any future project page.

## The standard in one sentence

Write in calm sentence case, say what actually happened, and let the work—not
decorative labels or dramatic framing—create the hierarchy.

## Non-negotiable style rules

### Sentence case, not all caps

Use sentence case for headings, section labels, fact labels, card metadata,
buttons, and calls to action. Avoid CSS `text-transform: uppercase` for
editorial copy and avoid wide tracking used to simulate an all-caps portfolio
label.

Allowed exceptions are real acronyms and proper names, such as `UX`, `UI`,
`AI`, `MUI`, `Figma`, `Hotjar`, or the name of a published article.

### Do not use template separators as decoration

Do not introduce the following patterns unless the punctuation carries a real
meaning that cannot be expressed more clearly:

- numbered-slash labels: `01 / engagement`, `02 / case study`
- dot-stacked metadata: `Arium · UX/UI design · 3 months`
- decorative numbering on cards or sections
- arrows as the only CTA language: `Read more →`

Prefer a plain descriptive label, a short sentence, or a clearly labelled
fact list. For example, use `Tournament experience` instead of
`01 / engagement`, and place role and duration in the project facts rather
than repeating them above the title.

### Headings must earn their drama

Headings should name the actual finding, decision, outcome, or question in the
section. Use normal sentence case and vary their construction naturally.

Good:

- `Players could not tell what action was available`
- `Putting the rules near the join action reduced the search`
- `What I changed after usability testing`
- `The final tournament flow`

Avoid generic or formulaic constructions such as:

- `Making X easier to Y, Z, and scale`
- `Connecting a fragmented X flow`
- `From X to Y`
- `One connected X experience`
- `What the work delivered—and what it did not measure`
- `The strategy was to X, not Y`
- `A clear design outcome, without overstating impact`

Those phrases are not forbidden because of their grammar; they are avoided
because repeated use makes different projects sound interchangeable.

### Write from evidence and ownership

Use a clear subject when it improves accountability: `I mapped`, `we tested`,
`the recordings showed`, or `the prototype revealed`. Distinguish work you
did, work the team did, and conclusions that are still uncertain.

Do not inflate outcomes. If a metric is not directly attributable to the work,
say so briefly and plainly. Do not use defensive, legalistic wording to make
that point.

## Page patterns

### Case-study hero

Use this structure:

1. Project name as the page title.
2. One concise sentence that says what the work was about or what changed.
3. A short first-person or team-context paragraph.
4. A quiet facts list for role, duration, team, platforms, and scope.

Do not place a top all-caps eyebrow above every hero. If context is essential,
use one sentence-case line such as `Arium tournament project`; otherwise omit
it and let the title and facts do the work.

### Case-study sections

Most sections need only a heading and content. Add a small sentence-case label
only when it materially improves navigation, such as `Research`, `Testing`, or
`What changed`.

Use chronological or causal order where possible:

1. Context and problem
2. Research or evidence
3. Options and decisions
4. Testing and revisions
5. Outcome, limits, and next step

Numbering is acceptable when it represents a real sequence that readers need
to follow. It is not a decoration.

### Project cards and project index

Project cards should contain:

- a plain type label only when useful: `Case study`, `Article`, or `External case study`
- a specific project title
- one evidence-based summary sentence

Do not prefix card types with `01 /`, and do not transform them to uppercase.
The project selector can retain 01, 02, and 03 only if those numbers have a
clear collection-order purpose; they should not be repeated in each card.

### Article cards

Published article titles are titles and must remain exact, including their
capitalisation. Do not rewrite an external publication title merely to satisfy
this guide. Supporting labels should still use sentence case: `Article`,
`Design systems`, and `Read on Medium`.

### Calls to action and related work

Use plain, specific actions:

- `Read the full Arium case study`
- `See more project work`
- `Back to projects`

Avoid generic prompts such as `Want the deeper narrative?`, `Explore more`, or
`More work` when a clearer sentence will do.

## Recommended replacements for the current site

| Current pattern | Preferred direction |
| --- | --- |
| `Arium · UX/UI design · 3 months` | Omit it; keep role and duration in facts. If context is needed, use `Arium tournament project`. |
| `Key design decisions` | `What I changed` or a heading that names the decision. |
| `Final direction` | `The final tournament flow` or a project-specific equivalent. |
| `01 / engagement` | `Tournament experience`. |
| `Betatrends · product design case study` | `Betatrends project`, or no label. |
| `My role` | `What I worked on`. |
| `Design output and learning` | `What shipped and what I learned`. |
| `Related work` | `More projects` or a specific recommendation. |

These are directions, not mandatory copy. Always choose wording that is true
to the specific project.

## Technical implementation rules

The shared components currently create much of the unwanted tone. Before
editing individual words, update shared styling so future pages inherit the
right system.

- In `css/case-study.css`, remove uppercase transformation and excessive
  letter spacing from `.cs-eyebrow`, `.cs-fact__label`,
  `.cs-related-card__meta`, `.cs-callout__label`, and summary-list labels.
- In `css/site-chrome.css`, remove uppercase transformation and wide tracking
  from `.project-archive__eyebrow` and `.project-story__index`.
- Keep semantic classes. Do not replace a heading with a styled `div` merely
  to change its appearance.
- Update the markup to remove labels that no longer add information; do not
  leave empty eyebrow elements behind.
- Do not make a shared CSS change without checking every page that uses it.

## Implementation sequence

Follow this order for a site-wide update. Keep changes small enough to review.

1. **Create the typography baseline.** Update shared CSS so labels and facts
   render in sentence case. Confirm that hierarchy, contrast, responsive size,
   and scannability still work.
2. **Simplify shared card metadata.** Remove numbered-slash presentation from
   project cards and simplify article labels and CTAs.
3. **Revise the Arium Tournament short case study.** Use it as the reference
   page for the new system. Replace template labels and headline constructions
   with specific, evidence-led wording.
4. **Apply the same system to the Arium full case study.** Preserve the
   distinction between the short recruiter read and the deeper narrative.
5. **Revise Betatrends short and full case studies.** Keep measured outcomes
   accurate and retain only useful structure.
6. **Revise the Game Room case study.** Change Title Case headings to sentence
   case and keep chapter numbers only if they communicate the research/design
   sequence.
7. **Revise Projects, Home, Articles, About, and Contact.** Remove remaining
   decorative caps, separators, formulaic summaries, and generic CTAs.
8. **Run a final consistency pass.** Review desktop and mobile pages together.

## Agent workflow for a new or revised page

Before writing:

1. Read this guide and inspect an existing page that already follows the new
   system.
2. Identify the reader's question: what was the problem, what did Morty do,
   what evidence supports it, and what changed?
3. Draft plain text before applying visual labels or metadata.
4. Keep externally published titles and source-attributed facts unchanged.

Before finishing:

1. Check that headings are sentence case unless they are proper titles.
2. Remove decorative slashes, dots, arrows, and numbers.
3. Check that every label adds information; delete it if the heading already
   does the job.
4. Replace generic phrasing with the project-specific fact, decision, or
   constraint.
5. Verify responsive layout at desktop and mobile widths.
6. Search the affected files for remaining `text-transform: uppercase`,
   ` / `, and ` · ` usage. Keep only intentional instances.
7. Confirm that claims, metrics, roles, and attribution remain source-backed.

## Completion criteria

The update is complete only when a reader can move through the site without
seeing a repeated all-caps label system, numbered-slash card taxonomy,
dot-stacked project metadata, or interchangeable portfolio-template headings.
The pages should still be easy to scan, and every section should make a
specific, supportable point about the work.

