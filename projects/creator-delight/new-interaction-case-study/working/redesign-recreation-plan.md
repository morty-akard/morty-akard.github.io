# BetaTrends case-study redesign and recreation plan

## Objective

Recreate the BetaTrends New Interaction case study as a concise, credible, video-led portfolio story for Product Design and UX Design hiring managers. The page should demonstrate Morty’s reasoning, interaction-design craft, use of evidence, iteration, collaboration, and handoff without overstating implementation or impact.

This plan covers three connected artifacts:

1. the canonical evidence-backed story in Markdown;
2. a redesigned case-study page in Figma;
3. a later responsive website implementation based on the approved Figma design.

The Figma redesign and website implementation are separate production stages. Content and evidence should be approved before either stage is treated as final.

## Success criteria

A hiring reader scanning for two minutes should be able to answer:

- What was BetaTrends and what did an Interaction do?
- What was difficult about creating one?
- What did Morty personally own?
- What evidence changed the design direction?
- What were the three most important design decisions?
- What was delivered, and what remains unverified?

The finished page should:

- lead with the final design and strongest supportable outcome;
- use motion to explain behaviour, not decorate the page;
- reduce the latest Figma page’s long chronological structure;
- avoid repeated “First Attempt” and “Second Attempt” labels;
- preserve uncertainty around release and quantitative results;
- remain understandable when videos are not played;
- work across desktop and mobile without sacrificing media legibility;
- load progressively without autoplaying large files.

## Recommended narrative

Use an outcome-first opening followed by Context–Struggle–Transformation. The turning point is prototype testing: the broad layout redesign improved orientation but still left late validation, question management, and action hierarchy unresolved.

### Proposed page architecture

#### 1. Hero: a complex setup became a guided workspace

Purpose: establish the transformation and Morty’s relevance immediately.

Content:

- working title: **Making a complex research setup easier to understand**;
- one-sentence product and problem explanation;
- one-sentence role and contribution summary;
- large final-design poster or short silent loop;
- compact metadata: role, period, collaboration, scope, status;
- explicit status label: **Design and handoff completed; production impact unconfirmed**.

Primary motion: the full prototype walkthrough, edited or chaptered so the first useful interaction appears immediately.

#### 2. Product context: what creators were building

Purpose: make “Interaction” understandable without a fictional persona sequence.

Content:

- explain that creators configured content, questions, screening, demographics, pricing, and preview;
- show the audience-side Interaction video;
- use one short caption connecting creator inputs to the experience an audience member receives.

Remove:

- the decorative Pardis character sequence;
- generic B2B/B2C labels unless they materially help the target reader;
- repeated product definitions.

#### 3. The problem crossed the whole journey

Purpose: replace a list of UI complaints with a system-level diagnosis.

Content:

- the journey map, with a legible cropped or annotated presentation;
- side-by-side inherited long-form and modal animations;
- three concise friction statements: weak orientation, delayed feedback, fragmented preview/cost context;
- an evidence note that the journey map included existing information and assumptions.

Motion sequence: **long form → modal interruption → journey-level insight**.

#### 4. Behavioural review focused the redesign

Purpose: show why another design pass was necessary.

Content:

- Morty recommended and reviewed Hotjar recordings for `/newTrend`;
- one carefully cropped recording-list image or short Hotjar-review clip;
- explain what the evidence was used for without presenting session duration as completion time;
- make the evidence boundary visible in the caption.

Remove:

- the current page’s unexplained spreadsheet screenshot unless its rows and provenance can be documented;
- unsupported claims that the limited launch or Hotjar analysis proves impact.

#### 5. Three options made the trade-offs discussable

Purpose: demonstrate exploration and collaboration without implying sole authority.

Content:

- three concept thumbnails at equal scale;
- a compact comparison using recoverable criteria: orientation, preview visibility, cost visibility, question separation, and layout complexity;
- state that Morty created and presented the options and worked primarily with Pieter;
- identify final selection authority as unconfirmed unless Morty clarifies it.

Primary motion: first redesign followed by the selected-direction walkthrough.

#### 6. The selected direction joined progress, work, and preview

Purpose: explain the central information-architecture decision.

Content:

- before/after flow diagram;
- final three-column screen;
- three annotations only: staged progress, active editing area, persistent preview/cost context;
- explain the consequence of each decision rather than describing visible pixels.

#### 7. Testing revealed the remaining failures

Purpose: create the story’s turning point.

Content:

- short Maze task clip;
- short report-context clip;
- three findings: late incomplete-state discovery, difficult question management, and competing actions;
- evidence note covering the missing sample, tasks, dates, and raw export.

Do not use the removed illustrated feedback visual. The test and report recordings are the primary evidence.

#### 8. Three findings became three interaction changes

Purpose: make reasoning and craft easy to scan.

Use three repeated “finding → response → intended consequence” modules:

1. **Late validation → visible incomplete-step states → creators can identify remaining work before finalisation.**
2. **Question-management difficulty → accordion and reordering → creators can scan and modify a larger question set.**
3. **Competing actions → clearer hierarchy and finalisation path → the expected next action is more distinct.**

Each module should use one focused video, a poster frame, a short caption, and no more prose than needed to explain the decision.

#### 9. Outcome: a coherent design package, with impact still to verify

Purpose: end with demonstrated value and intellectual honesty.

Content:

- final-flow video;
- concise list of delivered design coverage and developer-handoff material;
- strongest supported outcome: a test-informed, staged design and completed handoff;
- visible evidence boundary for implementation, release, and post-launch impact;
- one meaningful reflection and a future measurement plan.

Do not use 47%, 100% success, misclick reduction, eliminated drop-off, or improved satisfaction as public results until the underlying evidence is recovered.

## Content refinement work

### Keep

- the new evidence-backed opening;
- confirmed first-person contribution;
- direct collaboration with Pieter;
- the journey-level framing;
- the real second iteration prompted by testing;
- the three finding-to-response pairs;
- explicit distinction between designed, handed off, implemented, and measured.

### Rewrite

- shorten the opening to one headline, one deck, and two compact paragraphs;
- replace method headings with conclusions;
- condense Hotjar explanation to the evidence that influenced decisions;
- add clearer transition from first redesign to prototype findings;
- turn the final reflection into Morty’s verified voice after confirmation;
- replace “What I would carry forward” if Morty provides a more specific lesson.

### Remove or archive from the main story

- “Creator’s Delight” as the primary headline unless it is retained as a campaign-style cover only;
- duplicate “Second Attempt” labels;
- the UX-checklist section unless it demonstrates a decision unique to this project;
- decorative cartoons and generic brainstorming illustrations;
- duplicate screenshots that show the same state;
- generic deliverables lists;
- unsupported claims of cost reduction, satisfaction, implementation, or causal impact.

## Video and motion strategy

### Motion hierarchy

Use no more than one primary video per narrative section. Additional evidence should appear as optional links or expandable details.

| Priority | Asset | Purpose | Treatment |
|---:|---|---|---|
| 1 | Full prototype | Opening transformation | Prominent player or concise edited loop; no autoplay with sound |
| 2 | Audience Interaction | Explain the product | Vertical player beside short product explanation |
| 3 | Old long form and modal GIFs | Establish the inherited problem | Synchronized before pair or converted to lightweight MP4/WebM |
| 4 | First redesign | Show the first structural response | Short player with one conclusion-led caption |
| 5 | Selected direction | Explain the chosen model | Primary evidence beside before/after flow |
| 6 | Maze task and reports | Establish the turning point | One primary clip; secondary reports as optional detail |
| 7 | CTA, question, and completion clips | Map findings to changes | Three consistent modules with poster frames |
| 8 | Final flow | Close the story | Short recap clip, not a repeat of the entire opening video |

### Video production requirements

- review each recording and trim idle time, browser loading, repeated states, and unnecessary cursor movement;
- create descriptive poster frames rather than relying on arbitrary first frames;
- mute by default and never autoplay audio;
- add captions or a concise transcript for every spoken video;
- include a text explanation that stands without playback;
- export web versions in MP4 and WebM where supported;
- lazy-load below-the-fold players;
- preserve original files separately;
- record edits, crops, and publication permission in the visual plan.

## Visual redesign direction

### Information hierarchy

- one restrained display style for major conclusions;
- readable body column of roughly 68–74 characters;
- wider breakout column for UI, flows, and video;
- compact evidence/status labels near claims that need qualification;
- consistent caption placement below every visual or video;
- one accent colour used for decisions, active states, and section markers.

### Recommended visual character

Preserve BetaTrends blue as a project accent, but move away from the current page’s heavy black canvas and orange section labels. Use a neutral light or near-black foundation with higher text contrast, more whitespace, and fewer decorative treatments. The product UI should remain the most colourful element.

The existing puzzle-piece hero can be retained as an optional cover thumbnail, but the case-study hero should foreground the final product rather than a metaphor.

### Responsive behaviour

- desktop: text column plus wide media breakouts;
- tablet: media remains full width, metadata becomes a two-column grid;
- mobile: single-column reading order, vertical audience video at natural proportion, horizontal videos letterboxed rather than cropped;
- charts and journey maps receive zoom/open controls or a mobile summary;
- comparison content stacks in the intended before/after order;
- no essential meaning appears only on hover.

## Execution phases

### Phase 1 — Evidence and publication gate

1. Confirm public-display permission for BetaTrends UI, recordings, Hotjar views, Maze reports, and collaborator names.
2. Confirm feature implementation and release status.
3. Resolve or retire the 47% and other quantitative claims.
4. Confirm final decision authority and other contributors where relevant.
5. Record all answers in the source inventory and evidence-gap file.

Exit condition: every planned public claim and asset has a permission and evidence state.

### Phase 2 — Editorial refinement

1. Create a tighter version of the current Markdown draft using the proposed page architecture.
2. Perform a claim-by-claim evidence check.
3. Run a separate voice pass using Morty’s approved professional writing samples, if supplied.
4. Validate the Markdown and repair all material issues.

Exit condition: the headings and captions alone communicate the complete story; no claim exceeds its evidence.

### Phase 3 — Media preparation

1. Review every local and linked video from beginning to end.
2. Select exact time ranges for the page.
3. Trim and compress copies while preserving originals.
4. Create poster frames, captions/transcripts, alt descriptions, and fallbacks.
5. Update the visual plan with purpose, placement, permission, file size, and edit status.

Exit condition: each media item earns its place and works without autoplay or unexplained context.

### Phase 4 — Figma recreation

1. Duplicate or create a separate redesign page; preserve the current Figma case study unchanged.
2. Establish desktop, tablet, and mobile layout frames and shared styles.
3. Build the hero, metadata, and first narrative section as the visual-system test.
4. Review scanability before building the remaining sections.
5. Assemble one section at a time from the approved Markdown and visual plan.
6. Add poster-frame representations and clear video-play states.
7. Test the full page at realistic viewport sizes.

Exit condition: the Figma page has a coherent scan path, responsive layouts, and no placeholder or unsupported content.

### Phase 5 — Website recreation

Start only after the content and Figma design are approved.

1. Identify the existing portfolio codebase and design-system constraints.
2. Implement the case-study page using semantic HTML and accessible media controls.
3. Add responsive image/video sources, lazy loading, poster frames, and transcripts.
4. Provide keyboard-visible controls and reduced-motion behaviour.
5. Test internal navigation, media playback, mobile layout, performance, and broken links.

Exit condition: the case study is usable without video, keyboard-accessible, responsive, and performant on a typical mobile connection.

### Phase 6 — Hiring-reader QA

1. Run the UX Case Study Builder rubric.
2. Perform a two-minute scan test with a Product/UX hiring reader.
3. Ask the reader to state the problem, Morty’s role, the turning point, three decisions, and the outcome.
4. Revise only where comprehension or credibility breaks.
5. Complete final proofreading and evidence verification.

Exit condition: no automatic blockers remain and the reader can accurately retell the core story.

## Decisions needed from Morty

These do not block drafting, but they affect public release and final positioning:

1. Target role and seniority for the portfolio.
2. Whether BetaTrends assets, Hotjar screens, Maze reports, and Pieter’s name may be shown publicly.
3. Whether any version of the redesign was implemented or released.
4. Whether the original evidence behind the reported metrics can be recovered.
5. Who made the final design/product decision.
6. Whether the dark visual direction should be evolved or replaced.

## Definition of done

The recreation is complete only when:

- the original Figma page and source media remain preserved;
- the canonical story matches the evidence inventory;
- the page clearly separates individual and team contributions;
- every motion asset has a purpose, caption or transcript, fallback, and permission state;
- the selected decorative test-feedback image is absent;
- implementation and quantitative claims are correctly qualified;
- the Figma redesign is responsive and visually verified;
- the website version, if commissioned, passes accessibility, media, link, and performance checks;
- the final rubric contains no automatic blocker.
