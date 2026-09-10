# BetaTrends “New Interaction” — visual-content audit

## Recommendation

The case study should use the Figma file as its primary visual source, but it should not reproduce the Figma page wholesale. The strongest portfolio story is built from authentic product UI and short interaction clips: the selected three-column workspace, the three concept directions, the old-versus-new creation flow, and the three post-test refinements.

The current opening image must be replaced. It depicts the audience-facing A/B voting screen, while its caption describes the creator workspace. That mismatch weakens trust at the most prominent point in the story.

## Proposed visual narrative

1. **Hero — selected creator workspace**  
   Export the selected concept shown in Figma node `1:328`. Use a clean, high-resolution still showing the steps panel, editing area, live preview, and price estimate. Follow it with a short 8–12 second loop demonstrating one meaningful edit updating the preview.

2. **Problem — evidence, not decoration**  
   Use a tightly cropped and redacted subset of the Hotjar highlights shown in Figma node `1:298`. Show only the two or three observations that drove this project. Add a written synthesis beside the crop; do not expect viewers to read a full analytics dashboard.

3. **Why the flow changed**  
   Rebuild the useful content from Figma node `1:270` as two compact figures: “old interrupted flow” and “new guided flow.” Highlight the removed context switch and delayed preview. Do not export the whole tall section.

4. **Exploration — three concepts**  
   Export Figma node `1:322` as a consistent comparison strip. Keep all concepts at equal scale, label them A/B/C, and state the selection criteria and why one direction won.

5. **Selected direction — interaction evidence**  
   Use the selected-direction video as the main process visual. Trim it to the moment that demonstrates the unified workflow. Its poster should come from node `1:328`, not from a generic or unrelated screen.

6. **Testing and iteration — finding → response → effect**  
   Use the three refinement examples from Figma node `1:382`: CTA clarity, question management, and step completion. Each should contain one short clip or before/after pair, one finding, and one design response. This is stronger than a decorative feedback summary.

7. **Final experience**  
   Keep one concise end-to-end walkthrough. Avoid repeating the same footage at both the opening and ending: the opening clip should explain the core interaction; the final clip should show the complete flow.

## Current asset decisions

| Current visual | Decision | Reason / replacement |
|---|---|---|
| `01-hero-new-interaction.png` | **Remove from hero** | It shows the audience voting view, not the creator workspace described by the caption. It may be reused later only when explaining the respondent experience. Replace with a clean export from Figma node `1:328`. |
| Full-prototype opening video | **Keep, shorten** | Authentic interaction evidence, but too broad for the opening. Use a short core-action loop and a Figma-derived poster. |
| Audience-interaction video | **Keep, reposition** | Useful for clarifying the two-sided product. Place it in product context, clearly labelled as a prototype. |
| Journey map | **Keep, redesign** | It is genuine discovery evidence, but the full map is unreadable at portfolio scale. Use an overview plus one annotated zoom tied to the chosen problem. |
| Old long-form and modal videos | **Keep** | Strong “before” evidence. Present side by side in a responsive module rather than a Markdown table, with captions explaining the specific friction. |
| `07-hotjar-recordings.png` | **Replace with cropped evidence** | The current full dashboard contains tiny text, navigation noise, an author name, and unrelated highlights. Crop/redact two or three relevant cards from the source in Figma node `1:298`; confirm public-use permission. |
| Three concept-option images | **Keep, re-export** | They communicate breadth and decision-making. Export them together from Figma node `1:322` for consistent size and quality, and visibly mark the selected concept. |
| First-redesign video | **Keep selectively** | It shows progression, but browser chrome and length dilute the point. Trim to the exact behavior being evaluated. |
| Before/after flow diagram | **Keep, rebuild** | The reasoning is valuable, but the current dense image is hard to scan. Recreate it from the relevant content in Figma node `1:270` with a single highlighted change per panel. |
| Selected-direction video | **Promote** | This is one of the strongest visuals because it connects the structural decision to a working interaction. Use it near the concept-selection rationale. |
| Maze test/report links | **Consolidate** | Keep one primary test clip inline. Move detailed reports to optional links and use consistent Figma-derived poster frames. |
| Three refinement clips | **Promote** | These are the clearest demonstrations of design responding to evidence. Structure them as three compact finding–response modules based on Figma node `1:382`. |
| Final walkthrough | **Keep** | Use as the payoff, provided it does not duplicate the opening clip. Caption it as a prototype/final design, not as shipped product unless verified. |

## Figma content not recommended for the public story

- The puzzle-piece “Creator’s Delight” artwork is visually polished but metaphorical. It does not show the product problem or the design contribution clearly enough for the case-study hero.
- The decorative cartoon in the outcome section does not add evidence and should be omitted.
- The two Hotjar recording-list screenshots should not be used as outcome proof without verified cohorts, dates, sample sizes, calculation method, and permission.
- The `47%`, `100%`, `77% → 21.1%`, and session-duration claims visible in Figma should remain excluded until their definitions and sources are documented. Visual polish must not turn provisional numbers into apparent facts.

## Visual-system rules for the redesign

- Prefer real interface stills and short videos over newly illustrated summaries.
- Give every visual one job: context, evidence, alternative, decision, iteration, or outcome.
- Use a clean still from the same clip as its poster, so the page does not promise different content from what plays.
- Keep videos short, muted by default, captioned, keyboard-operable, and accompanied by a meaningful still/alt description.
- Crop browser and tool chrome unless it is necessary to establish the research method.
- Redact participant, author, account, and confidential product data before publication.
- Do not embed important comparison videos in narrow tables; use stacked responsive cards on smaller screens.
- Label fidelity and status honestly: sketch, concept, prototype, tested redesign, or shipped experience.

## Priority order

1. Replace the incorrect hero and caption.
2. Build the Figma-derived hero + short interaction loop.
3. Replace the full Hotjar dashboard with focused, redacted evidence.
4. Re-export the concept comparison and selected direction from Figma.
5. Reframe the three refinement clips as the central iteration story.
6. Rebuild the dense flow and journey visuals for portfolio-scale readability.
7. Remove or quarantine unsupported outcome graphics and metrics.

## Audit status

The current visual story is **not publication-ready** because the hero misidentifies the screen and the Hotjar visual exposes unnecessary dashboard context. The raw Figma material is substantially stronger than the current visual selection, but it needs editorial extraction, cropping, redaction, and evidence-safe captions rather than direct full-section exports.
