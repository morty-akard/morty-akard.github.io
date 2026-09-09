# Projects page design QA

**Comparison target**

- Source visual truth: `/var/folders/hp/63738hs942s85q7cyt81dn4c0000gn/T/codex-clipboard-442ebd0f-e8ef-4c85-8f7b-f16fe9c2acc6.png` (2880 × 4132 px, provided wireframe).
- Implementation: `http://localhost:4173/projects.html#arium`, captured in the Codex in-app browser at approximately 1258 × 710 CSS px / 1× density. The browser capture is an in-app evidence image and has no persisted file path.
- Compared state: desktop, Arium selected. The source is a structural wireframe; the implementation deliberately applies the existing site’s dark palette, typography, rounded borders, and supplied project imagery.

**Full-view comparison evidence**

Both views show the intended master–detail structure: a persistent project selector on the left, a selected project banner on the right, project context below, then related case-study entries. The implementation retains the source hierarchy while making the content and destinations real.

**Focused region comparison evidence**

The left selector and Arium hero/story region were reviewed in the browser capture. They were readable at the comparison viewport, with the selected state, banner crop, and three distinct story links visible. A separate zoomed capture was not needed because the source contains no detailed visual styling to match beyond this structure.

**Required fidelity surfaces**

- Fonts and typography: the source specifies only hierarchy, not a typeface. The implementation uses the site’s existing display/body treatment; the page title, section label, selected tab, title, and story hierarchy remain clearly differentiated.
- Spacing and layout rhythm: the desktop grid aligns the selector with the hero, preserves a large content gutter, and uses compact, consistently spaced story rows. The selector becomes a horizontal scrollable tab list below 767 px to avoid a cramped sidebar.
- Colors and visual tokens: the source is monochrome. The implementation intentionally uses the existing charcoal surface, cream display text, muted supporting text, and orange active state, matching the rest of the site.
- Image quality and asset fidelity: all visible banners, thumbnails, and arrows are existing project assets. No placeholders, synthetic images, or code-drawn assets are used.
- Copy and content: all visible project and case-study titles are drawn from the current site. Artoan is intentionally labelled “On request” because no standalone case-study route exists in the repository.

**Findings**

No actionable P0, P1, or P2 differences. The implementation purposefully diverges from the bare wireframe in visual styling to match the established website, while preserving the core information architecture and interactions.

**Primary interactions tested**

- Betatrends tab selects its panel and updates the URL to `#betatrends`.
- Arium tab selects its panel and exposes three distinct case-study links.
- Artoan tab selects its panel and updates the URL to `#artoan`.
- Hash-based initial selection is handled by the page script.

**Implementation checklist**

- [x] Master–detail client/project navigation
- [x] Sticky desktop selector and responsive mobile tab strip
- [x] Real project banners, thumbnails, and case-study destinations
- [x] Selected, hover, and keyboard-focus states
- [x] Hash-addressable project selection

**Follow-up polish**

- [P3] Add more Artoan case-study routes when the underlying content is ready; its current card accurately communicates that the detailed work is available on request.

**Comparison history**

1. First browser comparison: no P0/P1/P2 visual or interaction issues found, so no corrective iteration was required.

final result: passed
