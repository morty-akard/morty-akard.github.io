# Design foundation verification

Verified on 10 October 2026. No deployment was performed.

## Baseline and comparison

The working tree was clean before implementation. The original site-consistency audit passed with zero errors and warnings. The original publish audit reported six case-study section-alignment failures.

Captured 12 entry routes at widths 390, 479, 480, 767, 768, 991, 992, and 1440px: home, projects, articles, about, contact, both redirect entrypoints, and all five case-study pages. This produced 96 before/after computed-style and geometry records. Compared text colour, backgrounds, font family, size, weight, line height, margins, padding, gap, radius, border colour, shadow, max width, and element bounds for body, header, main, footer, headings, paragraphs, links, images, sections, facts, and cards.

All 36 records at the requested 390, 768, and 1440px widths match exactly. Of the 96 total records, 95 match exactly. The remaining record at 992px differs only in an animated home hero image’s subpixel bounds (less than 0.5px); its styles and all other captured elements match. Redirects resolve to the same destinations. Overflow results are unchanged.

Remote resources were blocked consistently during regression captures to avoid network-dependent font and video timing. Font-family declarations were compared; the reference was separately checked with Open Sans available. These measurements do not claim exhaustive verification of every dynamic interaction or external embed.

Full-page before/after screenshots were captured for home, projects, and the short Betatrends case study at 390, 768, and 1440px. The reference page was captured at all three widths and inspected visually on desktop and mobile. Local capture files and JSON results are in `/tmp/portfolio-foundation/`; these temporary artifacts may be cleared by the operating system.

## Reference page

Checked at 390, 768, and 1440px:

- No horizontal overflow or broken images; local links return successful responses.
- Exactly one h1; explicit `noindex, nofollow` metadata; no navigation or sitemap entry for the reference.
- First keyboard focus reaches the visible skip link with a solid focus outline.
- Mobile menu opens, updates its expanded state, and closes with Escape.
- Article hover uses the production transition; reduced-motion mode uses the production short transition and automatic scrolling rules.
- Shared production classes supply navigation, action links, project rows, article cards, facts, media, and captions. Reference-only layout remains scoped under `ds-reference`.
- All new token references resolve; styled public pages load Webflow, tokens, and shared chrome in the required order.
- No decorative all-caps transforms, numbered-slash labels, or dot-stacked metadata were added.

## Contrast

Ratios measured using sRGB relative luminance:

| Combination | Ratio |
| --- | --- |
| Primary text on page | 16.76:1 |
| Muted text on page | 8.59:1 |
| Muted text on raised surface | 7.21:1 |
| Primary accent on page | 11.14:1 |
| Action accent on page | 6.60:1 |
| Evidence accent on page | 8.44:1 |
| Focus ring on surface | 12.38:1 |
| Dark button text on action accent | 6.25:1 |
| Purple accent on purple surface | 11.00:1 |
| Legacy dim text on page | 3.24:1 |
| Legacy secondary white, composited at 49% opacity on page | 5.15:1 |

Legacy dim text fails the 4.5:1 normal-text threshold. It remains unchanged for compatibility and needs a later consumer-specific accessibility pass. The other listed pairs pass that threshold, but unmeasured images, gradients, alpha backgrounds, and control states require separate checks.

## Original publish-audit findings

The initial foundation implementation preserved the six baseline warnings:

- Short Betatrends: section alignment at 1440px and 2008px.
- Short Arium tournament: section alignment at 1440px and 2008px.
- Full Arium tournament: section alignment at 1440px and 2008px.

Inspection confirmed that these blocks share the same centre: Betatrends uses a 360px portrait figure, and Arium uses 880px heading cards and 920px headings beside 1200px content grids. The original audit incorrectly required identical left edges. The audit now checks each visible non-bleed block against the section content centre and maximum available column width, allowing a 1px rounding tolerance. No page layout changes were needed.


## Foundation follow-up

- Footer copy now uses shared muted text (`#aab1b8`) on the existing footer background (`#0d0f10`), measuring 8.87:1. The dim token remains available for decorative compatibility uses.
- Shared spacing declarations use matching existing spacing tokens; 8px and 14px radii use the control and card tokens. Negative spacing, exceptional values, percentages, and fluid layout values retain their behaviour.
- The final shared reduced-motion rule shortens all transitions and removes hover/focus movement from article, case-study, recommendation, related, and project-row cards. Checked visible cards on home, projects, short Betatrends, short Arium, and the reference at 390px and 1440px. No overflow was observed.
- Repeated all 96 route/width captures against the initial foundation version. Only expected footer text and inherited border-colour changes appeared, plus timing differences in two animated home-image samples. Other captured styles and geometry match.
- New publish-integrated foundation audit checks undefined tokens (including inline HTML consumers), duplicate definitions, circular token aliases, missing stylesheet files, and stylesheet order. Four automated guard tests pass, covering valid nested paths, missing/late/duplicate stylesheets, undefined/circular tokens, and redirect-only pages.
- Browser fixture checks confirm the revised layout audit accepts narrower centred content and rejects both shifted and oversized blocks. Layout checks now also include 390px and 768px in addition to 1440px and 2008px.

The first expanded publish run timed out waiting for an external video connection to become network-idle. The layout audit now waits for document readiness, fonts, local-image decoding, and two rendering frames with a bounded asset timeout; it does not wait for third-party video traffic.

Final result: the foundation audit, site-consistency audit, and expanded case-study layout audit all pass. The complete publish audit passes, and all four foundation guard tests pass. No deployment was performed.

## Token and cascade consolidation

Removed five tokens whose only consumers were superseded defaults: `border-legacy`, `radius-card-legacy`, and the desktop/tablet/mobile `section-legacy` tokens. Kept semantic colour, type, radius, and spacing roles distinct. Gutters and block spacing now reference spacing-scale tokens; regular weight and display line-height now use their previously unconnected typography tokens.

Shared root aliases and navigation, footer, and article-card base rules now have a single owner per selector. Superseded responsive footer-title declarations were removed rather than accidentally reactivated when moving editorial values into the base rules. Responsive and case-study variations retain their effective behaviour. The three shared reduced-motion blocks are consolidated into one final block covering scroll, animation, transition, and hover/focus transforms.

Compared the 96 route/width records with the preceding foundation version: no unexpected computed-style or geometry changes; two home hero image records differ only through animation sampling. Separately compared navigation, footer, article-card, hover, mobile-menu, and reduced-motion computed states at 390, 479, 480, 768, 991, 992, 1199, 1200, and 1440px; all captured states match exactly. No remaining design tokens lack CSS/HTML consumers in the inspected source.

The full publish audit and all four foundation guard tests pass after consolidation. Documentation and reference copy now describe the current defaults. No deployment was performed.

## Future-page safeguards

`AGENTS.md` now requires both design and content guides, reuse of tokens and components, documentation of justified exceptions, reference maintenance, and appropriate audits. The new `templates/page.html.template` supplies the production navigation, footer, skip link, main landmark, editorial sections, stylesheet order, font loading, and draft metadata. It is a source template rather than a new HTML page route.

Rendered a substituted copy through a temporary browser response at 390px and 1440px without writing a public page. Both sizes have one h1, header, and footer, no overflow, and working local stylesheet/script assets. Keyboard focus reaches the skip link first; the mobile menu opens and closes with Escape. The foundation audit now also inspects `.html.template` files. All four foundation guard tests and the full publish audit pass. No deployment was performed.

## Primary narrative colour follow-up

The shared body token alone did not update paragraphs with older muted modifiers or page overrides. Arium short/full narrative paragraphs now use plain `cs-body`; shared card prose and Game Room narrative use `--color-copy`. Editorial `cse-prose` and callout narrative explicitly use `--cse-text`. Secondary captions, metadata, video cues, side notes, and documented teal evidence remain distinct. Old cream fallbacks for primary copy were updated to neutral grey.

The publish audit now runs `scripts/text-colour-audit.mjs` at 390px and 1440px over the visual references and all current public project studies. It checks computed primary prose and heading colours against their semantic tokens so muted modifiers and page overrides cannot silently replace the narrative role. New routes and narrative components need to join its coverage.
