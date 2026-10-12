# Editorial template verification

Verified locally on 11 October 2026. This phase adds an opt-in template and its reference; no existing case study was migrated and nothing was deployed.

## Existing pages

The baseline was the current working tree, including earlier uncommitted foundation work. SHA-256 comparisons confirmed that all pre-existing public HTML, existing CSS, shared JavaScript, and the general page starter stayed byte-for-byte unchanged during this phase. Only reference/documentation/audit files and the new template family were added or updated.

Captured 12 public entry routes (including redirect aliases) at 390, 768, 1440, and 2008px: 48 before/after computed-style and layout snapshots plus screenshots. Forty-seven were identical. The remaining capture differed only in the home hero image's running animation, by less than 1px; its source and styles were unchanged. All case-study captures were identical. Deterministic captures blocked third-party traffic, so they compare the same font fallback and do not prove successful external font delivery. The production font-loading links are retained.

Capture artifacts, protected-file hashes, contrast calculation, and full logs are local temporary files under `/tmp/cse-foundation`, not a permanent visual-snapshot dependency.

## Template checks

The editorial browser audit passed at 390, 767, 768, 1023, 1024, 1439, 1440, and 2008px. It confirmed centred reading widths, evidence containment, section-specific note placement, unchanged horizontal article geometry after removing notes, complete section links, one active section, visible keyboard focus, full compact labels on hover/focus, scrollable long navigation lists, sticky anchor clearance, reduced-motion scrolling, semantic colour inheritance, valid local assets, and no JavaScript errors.

Native navigation with JavaScript disabled passed at 390, 1200, and 1440px. A populated starter was also tested at 390, 1200, and 1440px through a temporary intercepted browser route, including root-relative styles/media, placeholder replacement, keyboard activation, disclosure closing, and direct deep links. No fixture was published or added to the site.

Visually inspected mobile and desktop reference screenshots for reading hierarchy, media/captions, side notes, and shared chrome. The reference is unlisted, noindex, and linked only from the existing design reference; production navigation and sitemap are unchanged.

The complete publish audit passed: design foundations, site consistency (zero warnings), legacy case-study layout, and editorial-template checks. All five foundation guard tests passed. JavaScript syntax and Git whitespace checks passed.

## Measured colour combinations

Ratios below use the WCAG sRGB relative-luminance formula on explicit solid backgrounds. Normal text requires 4.5:1; focus rings and necessary non-text indicators require 3:1. Primary/muted/link text passes on the documented surfaces; focus and evidence indicators also pass. Hover and selection use the surface background with primary-accent text; normal navigation uses muted text on the page background.

| Role | Page #111315 | Surface #181b1e | Raised surface #202428 |
| --- | ---: | ---: | ---: |
| Heading and result text (#fff1df) | 16.76:1 | 15.56:1 | 14.06:1 |
| Body text (#d5d9dd) | 13.12:1 | 12.19:1 | 11.01:1 |
| Muted text (#aab1b8) | 8.59:1 | 7.98:1 | 7.21:1 |
| Link / selected text (#ffbb69) | 11.14:1 | 10.35:1 | 9.35:1 |
| Focus ring (#ffd2a8) | 13.33:1 | 12.38:1 | 11.18:1 |
| Evidence indicator (#43c0bd) | 8.44:1 | 7.83:1 | 7.08:1 |

The subtle border remains decorative, not the sole indicator of selection or keyboard focus. Selected navigation adds an accent stripe and stronger weight; keyboard focus has a 3px ring. These measurements do not establish whole-site accessibility or contrast inside screenshots, over photography, or within the existing translucent global header. Pre-existing legacy dim-text concerns remain documented in the main design-system guide; they are not used for new editorial body/caption/navigation text.

## Boundaries

The simulated semantic override test establishes that new editorial roles inherit shared values; it is not a finished or verified light theme. Global light/dark switching, project migrations, content rewriting, and deployment remain separate tasks. Human review is still needed for future project evidence accuracy, media legibility, and any new project-specific colour combinations.

## Section navigator refinement

The follow-up replaces per-link tooltips with a reading navigator: inactive desktop sections appear as muted markers, the current section name stays visible, and hovering anywhere or focusing a link reveals the full list. The navigator appears as the main story heading reaches the reading position below the header, and hides at the opening and article boundaries. Focus moves to a visible heading if its control becomes hidden. Hidden controls are inert. The desktop control is fixed to its measured reserved rail, so keyboard reveal and panel expansion preserve article geometry. Intermediate symmetric rails are now 160px to accommodate the current name.

Below 1024px, a 44px section row attaches flush to the header, matching its width and joined corners. It shows the current section and a decorative reading-progress line, with an overlay disclosure rather than a menu that pushes content. Selection focuses the destination heading, native hashes/history remain intact, Escape and outside interaction close the menu, and long lists scroll within the screen. Link names are explicit in the accessibility tree even when their visual labels are collapsed. Normal motion uses shared 160/200ms durations and smooth scrolling; reduced motion disables those transitions and jumps instantly.

The expanded checks cover opening/inert behaviour, all-label reveal, keyboard reading-position preservation, mobile current-section text, Escape, desktop touch expansion/selection, smooth-scroll completion, and browser history. Automated editorial geometry tests block external HTTPS assets and bound font/image waits to 30 seconds; actual rendered font and interaction states were inspected separately in the in-app browser at mobile and 1396px widths. Existing case-study HTML and shared legacy CSS/JavaScript were again verified byte-for-byte unchanged.

The header attachment was inspected at 390px and 928px. Added geometry checks require a flush seam, matching header width, and a closed row no taller than 45px including the border. The primary website menu hides the row immediately and makes it inert until closed. The anchor clearance includes the complete joined header. No shared header or legacy study files changed.

Header-row verification: the foundation audit, all five foundation guard tests, and the full publish audit passed. Editorial checks passed at 390, 767, 768, 1023, 1024, 1439, 1440, and 2008px, including keyboard menu priority, reduced motion, native anchors without JavaScript, touch reveal, and history. Tests wait for the restored row to become visible before focusing it.

## Default visual alignment

Figures now use automatic horizontal margins and fill their assigned column. The starter uses reading-width figures; the reference retains one explicitly described wide comparison example. Ordinary workspace figures and comparison containers use text width. The guide and AGENTS.md document the opt-in wide modifier. The editorial audit now asserts default visual centring and the 760px limit. Foundation checks passed. The publish audit was interrupted after passing 390, 767, and 768px; the remaining responsive checks and visual inspection are pending because the preview browser reconnect was blocked by browser security policy.

## Results component

One flexible `cse-result` group now supplies an optional headline, labelled values, source links, and method/period/limitation notes. The reference uses the existing BetaTrends evaluation; the starter contains placeholders rather than copied results. Existing case-study pages were not edited. Typography and surface/text roles reuse the established editorial and shared tokens.

Foundation checks and all five guard tests passed. The full publish audit passed for the reference and BetaTrends at 390, 767, 768, 988, 1023, 1024, 1439, 1440, and 2008px. Result checks cover centred reading width, labelled groups, value/label correspondence, source context, and stacking below 768px. These successful runs also complete the previously interrupted automated default-visual alignment checks.

## Device frames

Added opt-in phone and desktop frames with image/video recipes in the starter and two labelled examples in the reference. The phone uses a neutral illustrative placeholder; the desktop uses the existing smaller silent selected-workspace clip and matching poster. Project pages and source media were not edited by this change.

The editorial audit checks centred frame geometry, the phone width cap, natural screen proportions, captions outside the hardware, native controls, no autoplay, inline playback, a direct video link, loaded video dimensions, actual playback, and image/video interchangeability in both frames. Mobile/desktop captures at 390px and 1440px were visually inspected; the full audit covers existing responsive widths from 390px to 2008px, reduced motion, no JavaScript, and navigation. Device chrome remains decorative and uses existing semantic colours; no new text contrast combinations were introduced.

Foundation checks and all five guard tests passed. The full publish audit passed with the new frame geometry checks. Local preview captures are in `/tmp/cse-device-preview`; they are not production assets.

The local audit Chromium exposes MP4 MIME support but cannot decode H.264 (`canPlayType` returned an empty string for the codec); both original MP4 files returned HTTP 200. A VP9 WebM derivative of the smaller existing silent clip now provides a decodable first source, with the untouched MP4 fallback. The reference therefore checks metadata and playback rather than mistaking the poster for a playable recording.

## Responsive supporting content — 12 October 2026

Added an opt-in support disclosure to the starter and reference, with a short source note and a two-image illustrated discussion. Wide margins default open from 1440px; smaller layouts default collapsed when enhanced. A single story group keeps illustrated material at the end of its section on smaller screens. The reader can toggle disclosures at any size. Existing `cse-note` consumers keep their previous visible fallback.

The full publish audit passed, including primary-text colours, legacy layout, and the editorial checks at 390, 767, 768, 988, 1023, 1024, 1439, 1440, and 2008px. Support checks cover initial states, accessible labels, centred primary geometry, expanded overflow, Enter/Space/Escape, focus rings, independent open disclosures, reduced motion, preserved inline choices across resizing, and focus recovery when a resize collapses content. Native controls and navigation passed with JavaScript disabled at 390, 1200, and 1440px. The no-JavaScript sequence now uses a test-runner wait instead of a page animation-frame callback, which cannot run with page scripting disabled.

Collapsed/expanded mobile and wide-margin captures in `/tmp/cse-support-preview` were inspected. Capture-only styling hides sticky navigation to show the complete note; it does not change production CSS. The new controls reuse previously measured heading, muted, accent, and focus roles on the page background; dividers are decorative. Existing image colours and illustrative-dialogue identification are preserved.

Foundation checks, all five guard tests, JavaScript syntax, and whitespace checks passed. Hashes of existing project HTML and existing case-study styles matched the start-of-task baseline in `/tmp/cse-support-baseline/protected.json`. No existing case-study file or source media was changed by this work. Future content still needs a deliberate decision about what is supplementary; essential findings, contribution, and limitations must stay visible.

## Compact supporting illustrations — 12 October 2026

The reference and starter now group supporting figures in `cse-support-gallery`. Images retain their natural proportions and full-size links, with a 280px cap and 16px gap. Two columns apply at 480–1439px; narrower phones and the wide-screen margin use one column. Captions remain attached to their figures, with 8px spacing. Text-only support disclosures are unaffected.

Foundation checks, all five guard tests, and the full publish audit passed. The editorial audit additionally passed at 479px and 480px around the new gallery breakpoint, and at the reported 1075px viewport. Geometry checks confirm compact image widths, side-by-side placement in inline layouts, and collision-free stacking on phones and in the margin. The existing keyboard, reduced-motion, and no-JavaScript checks continue to pass. Captures at 390px, 1075px, and 1440px in `/tmp/cse-gallery-preview` were visually inspected. No new colour combinations were introduced.

Production project HTML and legacy case-study styles matched the task baseline in `/tmp/cse-gallery-protected.json`; no source illustrations or existing case-study markup changed.

## Side explanations across desktop widths — 12 October 2026

Opt-in supporting explanations now remain beside their primary content at every desktop breakpoint from 1024px. The existing equal 160px rails at 1024–1439px accommodate the right note; larger desktops retain 200px rails. Only layouts below 1024px move support into the reading flow. Disclosures default open on desktop, preserve the reader’s inline choice across the new boundary, and retain native keyboard and no-JavaScript behaviour. Supporting illustrations use one compact column in the margin and two columns at 480–1023px. Existing plain notes retain their previous behaviour.

Foundation checks, all five guard tests, JavaScript syntax, whitespace checks, and the full publish audit passed. Editorial geometry checks cover 390, 479, 480, 767, 768, 988, 1023, 1024, 1075, 1439, 1440, and 2008px. They verify support placement beside its group, centred primary content with/without notes, media containment, disclosure states, and focus recovery across 1023/1024px. The 1075px margin capture in `/tmp/cse-desktop-support-preview` was visually inspected. Production project HTML and legacy case-study style hashes remain unchanged.
