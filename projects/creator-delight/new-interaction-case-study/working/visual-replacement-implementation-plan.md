# BetaTrends visual replacement implementation plan

## Goal

Replace misleading, noisy, or unreadable visuals in `case-study.md` with focused evidence from the latest Figma case study and the strongest existing videos. Preserve all original source assets, label prototypes honestly, and keep unsupported outcome claims out of the visual story.

## Source of truth

- Story and claims: `case-study.md`, `source-inventory.md`, and `working/evidence-gaps.md`
- Visual decisions: `working/visual-content-audit.md`
- Design source: BetaTrends Figma file `LqERXlVTXQhWCPq0Ij2B1b`
- Existing motion sources: files already stored in `images/` plus the linked Maze and refinement recordings

Figma is the visual source, not the publication layout. Export only the relevant product frames or evidence; do not copy the long Figma presentation sections as screenshots.

## Publication gate

Before publishing—not before preparing the private draft—confirm permission to display:

- BetaTrends product UI and prototypes;
- Hotjar interface, observations, account details, and author names;
- Maze recordings and reports;
- collaborator names and any participant information.

All Hotjar material must be cropped and redacted in the working draft. Quantitative outcome graphics remain excluded unless the measurement definitions and source data are recovered.

## Target visual sequence

| Order | Story purpose | Final treatment | Source | New asset target |
|---:|---|---|---|---|
| 1 | Show the transformation | Clean still of the selected creator workspace | Figma node `1:328` | `images/hero-selected-workspace.png` |
| 2 | Demonstrate the core interaction | 8–12 second silent loop showing an edit reflected in preview | Existing selected-direction/full-prototype footage | `images/hero-workspace-loop.mp4` and `.webm`; poster from hero still |
| 3 | Explain the two-sided product | Retain audience-side video and poster | Existing local media | Existing `03-audience-interaction.*` |
| 4 | Establish journey-level friction | Legible overview plus one focused annotated crop | Figma journey-map content around node `1:260` | `images/journey-overview.png`, `images/journey-friction-detail.png` |
| 5 | Show inherited interaction problems | Two short, consistently framed “before” clips | Existing long-form and modal footage | Revised versions of `05-old-long-form.mp4` and `06-old-modal-flow.mp4`, preserving originals |
| 6 | Ground the behavioural review | Two or three relevant, redacted highlight cards with synthesis | Figma node `1:298` / source Hotjar capture | `images/hotjar-relevant-highlights-redacted.png` |
| 7 | Demonstrate exploration | Equal-scale A/B/C comparison with selected direction marked | Figma node `1:322` | `images/concept-options-comparison.png` |
| 8 | Explain the structural decision | Simplified old-versus-new flow with one change highlighted per panel | Figma node `1:270` | `images/flow-old-vs-guided.png` |
| 9 | Show the selected direction in motion | Focused walkthrough of steps, editing, preview, and price context | Existing selected-direction footage; Figma node `1:328` for poster | Revised `10-selected-direction.mp4`, `.webm`, and poster |
| 10 | Establish the testing turn | One primary Maze test clip with a clear poster; reports as secondary links | Existing linked recordings / Figma test section | `images/maze-test-poster.jpg`; local clip only if publication rights permit |
| 11 | Connect findings to changes | Three consistent video cards: incomplete steps, question management, CTA hierarchy | Figma node `1:382` and linked recordings | Three local clips/posters if rights permit; otherwise linked videos with local stills |
| 12 | Close with the complete design | Concise end-to-end final walkthrough | Existing final walkthrough | Final video/poster, avoiding footage duplicated in the hero |

## Markdown modifications

### 1. Opening

- Replace `images/01-hero-new-interaction.png` with `images/hero-selected-workspace.png`.
- Keep the existing creator-workspace caption only after verifying it matches the new export.
- Replace the current long opening walkthrough with the short hero loop.
- Preserve the complete walkthrough for the final outcome section.
- Do not reuse the old hero as a workspace image; it may appear only in the audience-context section if it adds information beyond the audience video.

### 2. Product context

- Retain the audience-side video.
- Add a poster caption that explicitly says it is the respondent-facing prototype.
- Remove the old hero entirely if this section already communicates the same state.

### 3. Problem and discovery

- Replace the single unreadable journey-map image with an overview followed by an annotated detail.
- Replace the Markdown table containing the two inherited videos with two sequential visual blocks. This keeps the intended reading order on mobile.
- Replace `07-hotjar-recordings.png` with the cropped/redacted highlight visual.
- Update its alt text and caption to name the two or three observations shown; do not claim the screenshot represents a complete or quantified analysis.

### 4. Concepts and decision

- Replace the three-image Markdown table with one unified comparison export.
- Label concepts A, B, and C inside the visual and mark the selected direction without implying who made the final decision.
- Replace `03-flow-before-after.png` with the simplified flow visual.
- Keep the selected-direction video directly after the decision rationale.

### 5. Testing and refinement

- Embed one primary Maze testing clip; retain the summary and breakdown reports as optional text links.
- Replace the three text-only refinement subsections with three matching media modules:
  - finding;
  - focused clip/poster;
  - design response;
  - intended consequence.
- Use the Figma `1:382` visual structure as inspiration, but rewrite captions using only claims supported in the canonical case study.

### 6. Outcome

- Embed the complete final-flow walkthrough here rather than leaving it as an isolated link.
- Clearly caption it as the final design/prototype and handoff package, not a verified shipped experience.
- Do not include Figma’s decorative outcome cartoon, Hotjar recording-list comparison, or unverified percentage graphics.

## Asset-production workflow

### Phase A — Inventory and preservation

1. Record dimensions, duration, codec, file size, and duplication for every current image/video.
2. Preserve current files unchanged; place edited derivatives under new descriptive filenames.
3. Create a visual manifest containing source, Figma node, edit history, publication status, caption, alt text, and final placement.

### Phase B — Figma exports

1. Export node `1:328` at a resolution suitable for a wide hero; remove presentation labels and surrounding decorations.
2. Export node `1:322` as a consistent concept comparison.
3. Extract the useful reasoning from node `1:270`, then recreate it as a readable portfolio diagram rather than using a tall screenshot.
4. Export journey content around node `1:260` as overview/detail views.
5. Crop only relevant highlight cards from node `1:298`; redact author/account/participant information.
6. Capture consistent poster frames for the three refinements represented around node `1:382`.

### Phase C — Video editing

1. Review every candidate clip and identify the exact story-bearing interval.
2. Trim loading, idle cursor movement, repeated states, browser chrome where feasible, and unrelated interaction.
3. Create one hero loop, one selected-direction explanation, three refinement clips, and one final walkthrough with minimal overlap.
4. Export MP4 plus WebM where the publishing target supports both.
5. Add captions or concise transcripts for spoken content; ensure the adjacent text communicates the same conclusion without playback.
6. Generate poster frames from the actual final clips.

### Phase D — Case-study assembly

1. Apply the Markdown replacements in narrative order.
2. Give every visual specific alt text and a conclusion-led caption.
3. Replace visual tables with responsive-friendly sequential blocks.
4. Check that each visual supports exactly one nearby claim and that no caption overstates implementation, research certainty, or outcome.
5. Remove unused derivative assets only after the approved version is complete; retain originals in their source location.

### Phase E — Quality assurance

1. Verify that every local image and video path resolves.
2. Inspect every image at desktop and mobile reading widths; text embedded in visuals must remain legible.
3. Confirm videos are muted by default, user-controlled, keyboard-operable, and do not autoplay audio.
4. Check poster-to-video correspondence and prevent duplicate footage from carrying the same story point twice.
5. Review all frames for browser chrome, notifications, names, account data, and confidential content.
6. Run the case-study validator and resolve visual-link, caption, alt-text, and structural issues.
7. Repeat the UX case-study quality review after assembly.

## Execution order

### Pass 1 — High-value corrections

1. Export and install the correct hero.
2. Replace/redact Hotjar evidence.
3. Replace the concept table with the Figma comparison.
4. Rebuild the old-versus-guided flow.

This pass removes the current credibility blockers even before all video editing is complete.

### Pass 2 — Video-led storytelling

1. Produce the hero loop.
2. Trim the inherited-flow and selected-direction videos.
3. Produce the three finding-to-response media modules.
4. Embed the final walkthrough in the outcome.

### Pass 3 — Readability and polish

1. Rework the journey map into overview/detail views.
2. Standardise visual ratios, poster treatment, captions, and filenames.
3. Test desktop/mobile scanability and media performance.
4. Complete evidence, permission, and accessibility checks.

## Acceptance criteria

- The first visual accurately shows the creator workspace described in the opening.
- A two-minute scan reveals the problem, alternatives, selected direction, three test-driven refinements, and evidence boundary.
- Product UI and interaction footage—not decorative illustrations—carry the story.
- Every visual has a distinct purpose, truthful caption, useful alt text, traceable source, and recorded permission status.
- Hotjar and testing evidence contains no unnecessary personal or account information.
- No quantitative graphic appears without recoverable definitions and source evidence.
- The page remains understandable without playing any video.
- Videos do not repeat one another, and important motion is available in a still or text explanation.
- All paths and external links work, and the case-study validator passes without material warnings.

## Deliverables

- Revised `case-study.md`
- New and edited assets under `images/`, with originals preserved
- Updated `visual-plan.md`
- A visual manifest recording source, edit, permission, caption, and placement
- Validator output and a short final visual QA report

## Decisions still requiring confirmation

- Whether the BetaTrends, Hotjar, and Maze visuals may be published publicly.
- Whether local copies of externally hosted refinement/test videos may be created and embedded.
- Whether the current visual identifies the selected option correctly; recovered evidence confirms that three options existed but not who made the final selection.
- Which publishing target will ultimately provide responsive video components and WebM support.
