# Refined Betatrends case study

The main route `/projects/creator-delight/` now uses the editorial case-study starter. The former `/projects/creator-delight/full/` route redirects to it with a canonical URL and a reader-facing fallback link. The sitemap includes only the main study.

## Source and fidelity

The approved source is `Reducing Effort for Market Research Interaction-v5-preview.html`. Its title, eight-section story sequence, evidence, emphasis, lists, captions, illustrative identification, metrics and qualifications are retained. The user subsequently authorised small wording and placement adaptations to support UX Case Study Studio principles. The current opening names role and product earlier and groups the original problem paragraph with context; the approved adaptations are recorded in the content contract. Preview version chrome is removed. Back to top is retained alongside Back to projects. The duplicate mobile results representation is consolidated into one semantic table containing all original values and labels.

The source file and external media directories were left unchanged. Forty-eight referenced media files, including original-video downloads, were copied byte for byte into `projects/creator-delight/refined-assets/`. Image dimensions were read from those originals. The content contract in `scripts/fixtures/betatrends-refined-content.json` records approved text nodes, emphasis, the source checksum, and media checksums; the editorial audit checks them.

## Deliberate layout choices

- All main figures and comparisons use the centred reading width, including the staged interface and selected workspace screenshots. No width exception remains. Full-size links preserve access to dense evidence.
- Original side narratives follow their section's last related fragment in DOM order and use `cse-pair` / `cse-note`; the testing illustration remains immediately after the findings it explains. On smaller screens notes follow their fragments.
- The overview uses verified facts and preserves contribution scope and joint-decision attribution. Its four facts and small wording adaptations are documented below; the period comes from the existing project Markdown.
- Native disclosures retain the exact source summaries and optional supporting content. Their surface and spacing reuse shared tokens.
- Video wrappers, portrait-video sizing and table scrolling are scoped in `css/betatrends-refined.css`. The audience demonstration uses the shared phone-scale 320px cap; its existing hardware remains in the original recording. All videos retain controls, posters, metadata preload, playback labels and original order.
- A page-scoped strong-weight rule preserves source emphasis because exported Webflow CSS otherwise resets `strong` to weight 400. Shared foundation styles are unchanged.
- Results use one accessible table with column and row headers, a labelled scroll region and a smaller caption-scale font below 768px. This avoids duplicate content for screen readers.
- Section navigation uses concise labels while every story heading remains exact. Source section IDs are retained.

## Verification

The existing publish audit passed before implementation. After implementation:

- Design foundation audit and all five foundation guard tests passed.
- Site consistency audit passed with zero errors and zero warnings, including the retired-route redirect contract. Root-relative assets now resolve from the site root in this audit.
- Publish audit passed. Editorial route checks cover 390, 767, 768, 1023, 1024, 1439, 1440 and 2008px, keyboard navigation, reduced motion, note placement, anchor clearance, mobile menu priority, and no-JavaScript navigation. Other legacy case-study checks remain in place.
- Source-to-page comparisons verified ordered story text, emphasis, media, alt text, posters, playback labels, video controls, and original-video download links.
- Media checksums match the supplied files. All images load; expanded disclosures produce no horizontal overflow at 390, 768, 1024 and 1440px.
- Desktop and mobile screenshots were inspected for opening hierarchy, comparisons and result readability. All ten videos loaded and advanced during playback in installed Chrome. Headless Chromium geometry tests do not establish codec playback; Chrome was used separately for that check.
- Browser navigation from the old full route reaches the main study.

The original media total approximately 275 MiB including downloads. Media has been preserved rather than transcoded. Production network performance was not measured. Existing public-route indexing intent is retained. No deployment, push or commit was performed.

## Updated design-system components

The study now inherits the revised heading (`--ds-text-heading`, warm cream) and narrative (`--ds-text`, neutral light grey) roles through the shared editorial stylesheet. The closing learning block uses the revised open callout with its slim evidence rule and body-sized heading.

The creation-time evaluation uses `cse-result`, `cse-result-title`, `cse-result-headline`, `cse-results-grid`, `cse-result-value` and `cse-result-source`. Its original wording, metric labels, values and method qualification remain unchanged at the same point in the story. Obsolete page-specific evaluation styling was removed.

The standalone staged interface and selected workspace screenshots use `cse-device--desktop` with `cse-device-shell`, retaining natural proportions and captions outside the decorative frames. Comparison figures retain their simpler presentation for legibility. The audience recording already includes phone hardware, so an additional phone silhouette would duplicate it; illustrated laptop GIFs also keep their supplied hardware. Media files remain byte-identical.

After adoption, the foundation audit and five guard tests passed. The publish audit covered the reference and this study, including exact content/emphasis, asset checksums, palette inheritance, responsive results and device geometry. Mobile (390px) and desktop (1440px) captures of results, desktop figures and the learning callout were visually inspected, with no horizontal overflow. No shared stylesheet, template or reference changes were needed for this adoption.

## Supporting explanations and audience video — 12 October 2026

All six illustrated side explanations now use the current opt-in support pattern: `cse-note cse-support`, labelled native `cse-support-disclosure` / `cse-support-summary`, and `cse-support-content` containing a `cse-support-gallery`. Original note headings become disclosure labels with identical wording; illustrative identification, captions, images and full-size links remain unchanged. The first five sections group their primary fragments in `cse-support-main` so the supporting explanation follows the complete story below 1024px. The testing illustration stays immediately after its original finding list, before the refinements, to preserve the approved story order.

Support stays in the desktop margin and defaults open from 1024px. On smaller layouts it defaults collapsed, with independent reader toggles and compact galleries: two columns at 480–1023px and one below 480px or in the desktop rail. Essential narrative, results and method qualifications remain visible.

Browser Comment 1 is addressed by centring the audience demonstration at a maximum 320px width inside a reading-width figure, with intrinsic video dimensions. The recording already includes a phone silhouette, so a second decorative device shell is intentionally omitted. Native controls and all original media remain intact. The former full-width pair-child rule no longer stretches this media.

The editorial audit's independent-opening assertion now checks the two disclosures actually activated by the test, allowing studies with more than two explanations. The shared support hash handler now reveals only a targeted support aside or a target inside its disclosure; ordinary section hashes do not open nested optional material.

Visual captures were inspected at the commented 887px width and at desktop 1024px. The phone video measured 320px at 390, 887, 1024 and 1440px, with no page overflow; actual playback advanced in Chrome. A direct section hash preserved collapsed support and a direct support hash revealed it. Foundation guard tests and JavaScript syntax checks passed; the publish audit covers exact text/emphasis, media checksums and support interactions on mobile and desktop.

## Overview facts and content flexibility

The overview's role and collaboration now use the starter's semantic `cse-facts` definition list, preserving the source wording, emphasis and order. No unsupported period or duration is added. The reader sees two columns on desktop and a stacked list on mobile.

The user clarified that template adaptation may make small changes to placement or wording while preserving the substance and main story sequence. When a content constraint prevents a useful improvement, report the proposed improvement and tradeoff rather than silently omitting it. The current exact-content contract remains valid for this markup-only change; future approved wording edits should update its corresponding expectations deliberately.

## Complete overview facts

Following the user's component screenshot, the overview now contains Project (BetaTrends New Interaction), Role (Product Designer), Period (2023–2024), and Collaborator (Pieter, founder and product owner), in that order. The period is confirmed by the existing project-detail table in `projects/creator-delight/new-interaction-case-study/case-study.md`, rather than inferred from the example alone. The public label is Project rather than the reference-only Example project.

Responsibility and team-context paragraphs remain immediately beneath the facts. Small wording adaptations fit those paragraphs while retaining creation-flow redesign, usability testing, handoff, the design/development team, and the joint structural decision with Pieter. The content contract records this authorised adaptation; the rest of the story and all media remain unchanged.

## Studio principles govern presentation

The user explicitly prioritised UX Case Study Studio's reading and visual-story principles over a rigid template arrangement. The template remains the source of reusable components, tokens, accessibility and responsive behaviour; it does not dictate the story structure. Preserve verified meaning, qualifiers, authorship and media. Small justified presentation/wording changes are permitted; call out an improvement when a user constraint prevents it.

The opening now follows short orientation → transformation figure and optional walkthrough → verified facts → detailed contribution and context. This applies the Studio's flexible page architecture and heading-plus-visual scan path. It brings the work ahead of metadata while retaining every text block and media asset. The comparison remains at centred reading width for interface legibility; no side-by-side hero or new shared component is introduced. The body story remains in its approved order.

## Studio review and rebuild — 12 October 2026

This review used the Studio's opening and scanability, course principles, visual-evidence, page-architecture, accessibility and web quality references. The three material findings were:

1. The opening delayed product/role orientation and the transformation behind several paragraphs. The contribution sentence now names BetaTrends and Product Designer, the original problem paragraph sits with context, and the transformation visual is loaded eagerly with high priority. The facts directly follow the figure; the optional evolution walkthrough follows context. The published source title remains intact.
2. Six supporting testing/refinement/report recordings made the reading path longer before readers reached decisions and results. Their original playback labels now act as native disclosure summaries. Essential findings, the three design responses, participant differences, results and limitations stay visible. The redesigned-workspace demonstration remains in the main flow because it explains the central design response. Every recording and poster is retained, with intrinsic dimensions; all four original MOV links are now reachable outside video fallback content.
3. Decorative monitor frames used space needed by interface evidence. The staged interface and selected workspace now use simple figures and deliberate `cse-wide` widths, retaining full-size links and natural proportions. Other figures retain the default reading width. The opening comparison stays above facts in one column: splitting this already dense comparison beside prose would make its interface details smaller, especially with the desktop reading rails. This is a legibility judgment, rather than a compulsory template arrangement.

The existing eight-section sequence, all substantive source blocks, emphasis, figures, measurements, qualifiers and illustrative identification remain. The single revised opening sentence and permitted opening reorder are recorded in the content contract; its checksums still protect all 48 supplied assets. Two additional PNGs are first-frame derivatives of the supplied GIFs, selected only for reduced-motion preference through native `picture` sources. The supplied GIFs and their full-size links are unchanged. Back to projects provides a direct continuation path beside Back to top.

No shared foundation, template, reference, or unrelated project files were edited for this rebuild. Earlier device-frame and opening-order notes above describe prior versions; this section records the current decisions.

Verification for this rebuild: design-foundation audit and all six current guard tests passed. The final publish audit passed, including source text/emphasis and asset integrity, navigation, no-JavaScript access, semantic colours, redirect verification, and responsive checks at twelve widths from 390 to 2008px. Separate Chrome checks inspected 390, 768, 887, 1024 and 1440px, exercised the recording disclosures by keyboard, confirmed no overflow with every disclosure expanded, checked static GIF selection under reduced motion, and played all ten recordings with matching intrinsic dimensions. All four original MOV links are reachable. Opening and testing screenshots were visually reviewed on mobile and desktop.

The first full audit encountered an unrelated Arium source-link contract mismatch. That page/contract subsequently matched without changes by this rebuild, and the final full run passed. Original media size and production network-performance limitations noted above still apply. No deployment was performed.

## Phone-video corners

Following the browser comment, the audience recording's `.bt-portrait` wrapper clips its outer corners at the existing 64px spacing token, matching the supplied phone silhouette at its 320px display width. This page-specific radius deliberately differs from the shared card radius; the wrapper's extra border and surface are removed. The video inherits the curve without changing aspect ratio, cropping the interface viewport, or editing the media file. Chrome captures at 390 and 1096px confirmed the appearance, visible native playback controls, working playback, and no horizontal overflow. The design-foundation audit passed.

The user's in-app browser was subsequently found to be holding an older stylesheet (14px radius, 360px wrapper). The page-specific stylesheet link now carries `v=20261012-phone-corners` to fetch the current file. After reloading the actual user tab, computed styles confirmed a 64px radius, 320px video width and hidden corner overflow; a browser screenshot verified the result.

## Screenshot width refinement

Following the two browser comments, `cse-wide` was removed from the staged interface and selected workspace figures. Both now align with the standard centred reading column and surrounding narrative. Images, intrinsic proportions, captions and full-size links remain unchanged. This supersedes the earlier wide-figure decision.

## Case-study card image

The opening transformation image, `refined-assets/banner-for-all-simple.png`, is now used for every Betatrends case-study card: one on Home and three card representations on Projects, including the project-selector story. Old thumbnail `srcset` entries were removed so responsive selection cannot restore the previous visual. The supplied image is reused with its intrinsic 3038×2160 dimensions, lazy loading and descriptive alt text. Company banners remain company-level visuals. The foundation and site-consistency audits passed; local browser checks confirmed all card images load at mobile and desktop widths.
