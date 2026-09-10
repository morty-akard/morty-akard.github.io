# BetaTrends case study — website implementation handoff

## Purpose

Use this document when implementing the BetaTrends New Interaction case study in Morty’s portfolio website. The case-study story and visual selection are complete. The website work should focus on integrating the content into the existing portfolio system, presenting the evidence clearly, and making the page responsive, accessible, and fast.

## Source of truth

Use these files in this order:

1. `case-study.md` — canonical published story, headings, captions, links, and content order.
2. `visual-plan.md` — why each visual is included and what it should communicate.
3. `working/visual-manifest.md` — asset lineage, formats, and media status.
4. `source-inventory.md` — factual support and attribution.
5. `images/` — local image and video assets.

Do not restore older disclaimers or superseded claims from working drafts and audits. Morty has confirmed that the redesigns were released, he and Pieter made the final design choice together, and his usability testing showed a 47% reduction in completion time.

Do not rewrite the story into generic portfolio language. Preserve Morty’s direct, first-person voice and the meaning of the current headings, captions, and outcome statements.

## Page objective

A hiring manager should be able to understand the following quickly:

- BetaTrends was a market-research platform.
- Morty redesigned its complicated New Interaction creation flow.
- The redesign was released.
- Morty owned journey mapping, Hotjar review, workshops, three concepts, prototyping, Maze testing, iteration, and developer handoff.
- Morty and Pieter chose the final direction together.
- Usability testing showed a 47% reduction in completion time.

## Recommended page structure

Follow the order in `case-study.md`:

1. Outcome-led title and one-paragraph introduction.
2. Released workspace hero and short interaction loop.
3. Project facts: role, period, collaborator, contribution, and status.
4. Explanation of an Interaction and the audience-side video.
5. Journey-level problem and inherited-flow videos.
6. Hotjar observations and prioritisation.
7. Three design options and the joint decision with Pieter.
8. First redesign, selected direction, and flow comparison.
9. Maze findings and three finding-to-change videos.
10. Released result, 47% completion-time reduction, and reflection.
11. Back-to-projects and next-project navigation.

## Existing-site integration

Before editing the portfolio:

- identify the framework, route system, content format, image pipeline, tokens, reusable components, and deployment process;
- inspect existing case-study pages and follow their navigation and design conventions;
- preserve unrelated pages and existing user changes;
- use existing typography, spacing, colour, breakpoint, media, and navigation components where they already work;
- avoid adding a new framework or large dependency for this page;
- keep project content separate from reusable presentation components when the architecture supports it.

## Content implementation rules

- Preserve the current facts, attribution, metric, and release status.
- Keep “I” for Morty’s work and “we” for team decisions.
- Keep captions and alt text separate. Alt text describes the visual; captions explain why it matters.
- Render project facts as semantic HTML, not as an image.
- Preserve the heading hierarchy from the Markdown.
- Avoid hiding important evidence inside tabs, carousels, hover states, or accordions.
- Do not add invented testimonials, quotes, metrics, personas, outcomes, or project details.
- Do not reintroduce the decorative test-feedback illustration, decorative cartoons, full Hotjar dashboard, or old incorrect hero.

## Layout and visual hierarchy

- Keep the body copy to a comfortable reading width; allow product images, diagrams, and videos to break into a wider evidence column.
- Make the released product workspace the main visual focus. Decorative framing must remain secondary.
- Show the outcome, role, product, and 47% result near the opening.
- Use consistent spacing and caption treatment for every media block.
- Use BetaTrends blue as a project accent only if it works with the portfolio’s existing design system.
- The product interface should remain more visually prominent than page decoration.
- Avoid heavy animation, parallax, mock-device effects, or transitions that slow down reading.

## Responsive requirements

### Wide screens

- Use the available width for major product evidence and selected comparisons.
- Keep paragraphs from stretching across the full viewport.
- The project-facts block may use a compact grid if the existing system supports it.

### Intermediate widths

- Keep captions attached to their visual.
- Let wide media become full-column before text or controls become cramped.
- Check that the three-concept comparison remains understandable.

### Narrow screens

- Use a single reading column and preserve the story order.
- Convert project facts into readable rows or cards.
- Stack all comparison content rather than shrinking it until text becomes illegible.
- Do not crop horizontal videos. Letterbox them if necessary.
- Keep the portrait audience video at its natural aspect ratio.
- Provide an open/zoom treatment for the journey map and concept comparison.
- Avoid horizontal scrolling for ordinary page content.
- Make media controls and navigation easy to tap.

Use the portfolio’s existing breakpoints. If they do not cover this page well, add behavior where the content begins to fail instead of choosing device-specific breakpoints arbitrarily.

## Media implementation

### Hero

- Still: `images/hero-selected-workspace.png`
- Motion: `images/hero-workspace-loop.webm` with `images/hero-workspace-loop.mp4` fallback
- Poster: `images/hero-selected-workspace.png`
- The loop is ten seconds and silent.
- Do not autoplay it when `prefers-reduced-motion: reduce` is active. The still must communicate the same idea.

### Local videos

- `03-audience-interaction.mp4`
- `05-old-long-form.mp4`
- `06-old-modal-flow.mp4`
- `08-first-redesign.mp4`
- `10-selected-direction.mp4`

Implementation requirements:

- use native controls and `playsinline`;
- keep audio muted by default where the source does not require sound;
- provide a poster and descriptive fallback link;
- define width and aspect ratio to prevent layout movement;
- lazy-load videos below the opening;
- do not autoplay multiple videos;
- do not crop essential UI;
- provide a concise transcript or text alternative if speech communicates information not already in the page.

### YouTube videos

The Markdown currently contains YouTube iframes and direct links for:

- Maze usability-test excerpt;
- incomplete-step feedback;
- question-management changes;
- CTA and finalisation changes;
- final-flow walkthrough.

Replace the fixed `height="480"` iframes with the website’s responsive video component. Preserve the title and direct-link fallback. Lazy-load the embeds or use a privacy-conscious click-to-load poster if the existing site supports it.

### Images and diagrams

- Keep intrinsic dimensions or an explicit aspect ratio.
- Generate responsive sizes when the website’s image pipeline supports them.
- Do not serve the full-resolution desktop asset to every small screen.
- Preserve redactions in every optimized derivative.
- Do not rasterize the two SVG explanation diagrams unless the target pipeline cannot render them correctly.
- Provide zoom/open behavior for `02-creator-journey-map.jpg` and `concept-options-comparison.png`.

## Active visual assets

- `hero-selected-workspace.png`
- `hero-workspace-loop.webm`
- `hero-workspace-loop.mp4`
- `03-audience-interaction-poster.jpg`
- `03-audience-interaction.mp4`
- `02-creator-journey-map.jpg`
- `journey-friction-detail.svg`
- `05-old-long-form.mp4`
- `06-old-modal-flow.mp4`
- `hotjar-relevant-highlights-redacted.png`
- `concept-options-comparison.png`
- `08-first-redesign-poster.jpg`
- `08-first-redesign.mp4`
- `flow-old-vs-guided.svg`
- `10-selected-direction-poster.jpg`
- `10-selected-direction.mp4`

Do not use these archived assets on the final page:

- `01-hero-new-interaction.png`
- `07-hotjar-recordings.png`
- `03-flow-before-after.png`
- the three separate concept images in place of the unified comparison
- decorative feedback or outcome illustrations

## Accessibility requirements

- Use semantic page landmarks and one logical `h1`.
- Maintain the existing heading order without skipping levels for styling.
- Preserve useful alt text from the Markdown.
- Keep captions programmatically associated with their media, preferably with `figure` and `figcaption`.
- Ensure keyboard access and visible focus for navigation, video controls, zoom controls, and external links.
- Meet the site’s contrast standard in body text, captions, metadata, and accent treatments.
- Do not communicate completion states or comparison meaning with colour alone.
- Support text zoom and browser font resizing.
- Respect reduced-motion preferences.
- Avoid hover-only information or controls.

## Performance requirements

- Prioritize the title, introduction, metadata, and hero still.
- Do not preload every video.
- Lazy-load below-the-fold images, videos, and YouTube embeds.
- Reserve media space to avoid layout shift.
- Use responsive images or generated sizes where supported.
- Avoid unnecessary animation libraries, scripts, fonts, and third-party embeds.
- Check the total initial page weight and make sure videos are not downloaded before the reader requests them.

## Privacy and publication gate

The case study is written as released work. Public-display permission is a separate concern from release status.

Before publishing, Morty should confirm that the portfolio can publicly display:

- BetaTrends interface screens and recordings;
- the cropped Hotjar-informed problem list;
- Maze recordings and reports;
- Pieter’s name and role.

Keep the current Hotjar crop. Do not substitute the full dashboard, which contains unnecessary account and author context.

## Required checks before handoff

Run the project’s normal checks:

- formatting;
- linting;
- type checking;
- unit or component tests where relevant;
- production build;
- route and asset verification.

Inspect the rendered page at representative narrow, intermediate, and wide widths. Also run:

- heading-only scan: the headings should explain the complete project arc;
- heading-plus-visual scan: headings, visuals, captions, and the 47% result should tell the broad story without reading every paragraph;
- keyboard navigation check;
- reduced-motion check;
- image zoom and media playback check;
- broken-link and missing-asset check;
- performance check using the production build.

## Acceptance criteria

The implementation is ready for review when:

- the page uses the portfolio’s existing visual system and routing conventions;
- the released workspace, Morty’s role, and 47% test result are clear near the opening;
- the complete story remains understandable without playing a video;
- images and videos are sharp, correctly proportioned, and captioned;
- journey and comparison visuals remain usable on mobile;
- media does not create avoidable layout shifts or large initial downloads;
- all controls work by keyboard and reduced-motion behavior is respected;
- no inactive or excluded visual has been reintroduced;
- the page passes the project’s production build and relevant checks;
- the rendered page has been inspected—not only the source code.

## Deployment boundary

Implementation does not authorize deployment. Do not publish or replace the live portfolio page unless Morty explicitly asks for deployment after reviewing the completed page.
