# Refined Arium case study

The main route `/projects/gamers_compete_with_ease/` uses the editorial starter.
The former `/full/` route redirects to it with a canonical URL and a readable
fallback link. Only the main study remains in the sitemap. No deployment was
performed.

## Governing principles and content fidelity

The user-approved refined HTML is the content source. User instructions and
source fidelity govern first, then UX Case Study Studio's audience, credibility,
storytelling, visual-evidence and integrity principles. The portfolio template
supplies implementation components rather than a compulsory story structure.

The refined title, story headings, paragraphs, emphasis, contribution wording,
captions, disclosure labels, metrics, source links and media remain in source
order. The opening retains its previews, product-introduction link and four
verified facts in their original positions. No duration or other old-page facts
were imported. The source prototype was not edited.

The content contract in `scripts/fixtures/arium-refined-content.json` records
the original HTML checksum, 113 source text blocks, emphasis, story links, media
attributes and ordering, section IDs, and checksums for 39 referenced files.
The editorial audit verifies this contract against the rendered page and copied
assets. Original images, posters, recordings and full-size originals were copied
byte for byte into the project's `refined-assets` directory.

## Deliberate presentation choices

- The supplied title and its capitalisation are preserved instead of replacing
  them with the template's project-name title. The supplied opening metadata and
  final identity line retain their punctuation for source fidelity.
- Facts use `cse-facts`, keeping the source labels My role, Team, Scope and
  Delivery after the opening media. The story sequence takes priority over the
  starter's illustrative arrangement.
- All primary evidence remains at the centred reading width. No `cse-wide`
  exception was needed; dense boards and specifications retain full-size links.
- The desktop/mobile previews share a figure and source caption. Their grid uses
  a 1:.3 ratio to accommodate different intrinsic proportions and remains side
  by side at every width, as explicitly requested by the user. They use the
  shared desktop and phone device components without cropping the recordings.
  The preview media and videos use a light 4px corner radius, as requested by
  the user. The phone frame uses 8px padding and a 14px outer radius, becoming
  4px padding and an 8px radius on mobile. Its outline uses the existing quieter
  case-border colour with a deliberate 0.5px thickness; the speaker line is 2px
  tall. These project-specific geometry exceptions implement the user's request
  for a thinner frame, finer line and less-rounded silhouette.
  At mobile widths, shell padding and phone corners use smaller existing tokens
  to preserve screen space. Other portrait recordings retain their plain 320px cap.
- The four user groups use headings and prose in a two-column grid, stacking on
  small screens. Their text and ordering are unchanged.
- Existing optional research, design exploration and documentation groups use
  project-scoped native inline disclosures at every width, matching the refined
  source and the user's explicit instruction. They start closed and follow their
  related primary content in source order. Expanded evidence uses the disclosure's
  reading column, preserving figures, captions, proportions and full-size links.
  Arium does not use side notes or compact margin galleries; this is an intentional
  exception to the editorial template's supporting-content recipe. Closing a
  disclosure pauses its video. The left reading navigator remains unchanged.
- The source's handoff CSS crops are removed. Complete intrinsic image
  proportions and original full-size links preserve the evidence.
- Arium's independently reported metrics use one `cse-result`, retaining their
  original descriptions, periods and source links. Semantic metric labels are
  added before the values without changing claims or implying causation.
- Shared site chrome and section navigation replace prototype chrome. Native
  controls, durations, posters and fallback recording links remain. At the user's
  explicit request, the seven demonstrations marked automatic in the refined source autoplay silently in a loop when at least
  55% visible at every viewport size. This overrides the template's default of
  manual playback for these two videos only. Offscreen/background playback pauses,
  manual pauses persist, reduced motion disables autoplay, and blocked autoplay
  leaves native controls available. Other videos remain manual.
- Below 768px, a transparent accessible button over the preview picture requests
  fullscreen from a user gesture. The bottom 48px stays uncovered for native
  controls. At 768px and above, the button is hidden and playback/fullscreen use
  native controls. Standard fullscreen and iOS native-video fullscreen APIs are
  supported; unavailable fullscreen falls back to native inline playback.
- The additional preview links and fullscreen instruction were removed at the
  user's request. Their original video fallback links remain in the markup;
  other evidence recordings keep their visible direct links.
- `css/arium-refined.css` scopes media composition, user-group layout,
  specification cues and source emphasis to Arium. Shared editorial styles and
  scripts are unchanged.

## Verification

- Design-foundation audit and all six foundation guard tests passed.
- The complete publish audit passed against the local preview server.
- Site consistency reported zero errors and zero warnings, including both
  retired-study redirect contracts.
- Editorial checks passed at 390, 479, 480, 767, 768, 988, 1023, 1024, 1075,
  1439, 1440 and 2008px, including source fidelity, navigation, keyboard focus,
  support placement, reduced motion and semantic-theme inheritance.
- Computed narrative colour is `rgb(213, 217, 221)` and heading colour is
  `rgb(255, 241, 223)` on mobile and desktop. No horizontal overflow was found.
- Opening, research, design-response, handoff and outcome screenshots were
  inspected at 390px and 1440px. Heading-only and heading-plus-visual scans
  retain the source's problem, contribution, findings, decisions and learning.
- Installed Chrome checks at 390, 768, 1024, 1440 and 2008px verified asset
  access, disclosure defaults and the redirect.
  All nine embedded recordings started playback and could be paused. The
  bundled audit Chromium lacks H.264 support, so it checks layout and controls;
  installed Chrome supplies playback verification.
- Follow-up Chrome checks at 320, 390, 767, 768 and 1440px verified side-by-side
  geometry without overflow, silent visibility autoplay, manual-pause persistence
  after scrolling, mobile-only tap targets, mobile fullscreen and focus return,
  native desktop fullscreen, and reduced-motion playback remaining paused.
- Corner-masking checks at 320, 390, 767, 768, 930 and 1440px verified the video
  bounds, visible overflow, original aspect ratios
  and complete rectangular video bounds inside the outer device shells. The
  native controls still overlay the video when shown, following browser behaviour.
- After the user requested light inner rounding, Chrome checks at 320, 390,
  930 and 1440px verified the final 4px video/media radius, intrinsic proportions
  and no horizontal overflow. Subsequent thinner-frame checks confirmed the
  final padding, outer radii, lighter outline and 2px speaker line on mobile
  and desktop, with the source proportions preserved.
- With JavaScript disabled, all three supporting groups remain accessible through
  their native expandable summaries; all ten section links remain available.
- Inline-support checks at 390, 930, 1096 and 1440px confirmed all three groups
  start closed, expand in the centred reading column and collapse normally.
  Closing the wireframe disclosure paused its playing video in Chrome. The
  publish audit also verifies inline placement at every editorial width and
  keyboard expansion without JavaScript.

Safari, Firefox and hosted byte-range delivery have not been verified. The
local Python preview server returns complete video responses (HTTP 200) for
range requests; Chrome playback still succeeds. Pre-existing changes elsewhere
in the working tree were preserved, including an unrelated trailing blank-line
warning in the Betatrends page.

The user requested looping autoplay for all seven source automatic videos. Clicking a playing video pauses it; that manual pause persists. Wireframes and handoff remain manual, matching the source. Native controls remain available.

The user requested the opening desktop/mobile preview pair and its caption immediately after the subtitle. This approved presentation exception moves source blocks 5–6 before blocks 3–4; all wording and the remaining story order are unchanged. The integrity fixture records that specific order.

The user requested removing the opening “12 seconds · silent” cue and promoting the journey-map figure, with its unchanged caption and full-size links, immediately before the research disclosure. The disclosure label now names only its remaining competitor comparisons. The integrity fixture records these approved adaptations.

The user clarified the journey-map placement: directly after the workshop paragraph (source block 22), before “Four user groups, different needs.” The figure, caption, and full-size links move together; the contract now records this precise location.
