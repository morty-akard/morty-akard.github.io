# Portfolio content standards

Before creating or substantially revising any public-facing page, read
[`docs/portfolio-content-style-guide.md`](docs/portfolio-content-style-guide.md).

Apply its voice, typography, metadata, and quality-assurance rules to all new
visible copy. Do not introduce all-caps labels, numbered-slash labels, or
template-like case-study language without an explicit reason and user approval.

# Website design foundations

Before creating a page or changing page markup, styles, or shared components,
read [`docs/design-system.md`](docs/design-system.md) alongside the content guide.

- Reuse existing design tokens and production component classes before adding
  new values or patterns. Keep styles specific to a page scoped to its page class.
- Primary narrative text must use `--ds-text` (`#d5d9dd`) through
  `--color-copy` / `--cse-text`; headlines and titles use `--ds-text-heading`
  (`#fff1df`). Reserve `--ds-text-muted` for captions and secondary metadata.
  Do not copy legacy warm/white values or apply muted body modifiers to main
  narrative paragraphs. Verify computed colours on mobile and desktop; token
  references alone do not prove that the cascade applies them.
- Document justified exceptions in the design-system guide or the page's
  implementation notes. Preserve existing exceptions when they serve the content.
- Start general editorial pages from
  [`templates/page.html.template`](templates/page.html.template).
- For new article-style case studies, first read
  [`docs/case-study-template.md`](docs/case-study-template.md) and start from
  [`templates/case-study.html.template`](templates/case-study.html.template).
  Use the scoped `case-study-editorial` / `cse-*` family; do not import legacy
  `case-study.css` or mix `cs-*` layout classes into it. Adapt structure to the
  actual story, preserve verified contribution and evidence, and document
  exceptions. Never fill template gaps with invented findings or outcomes.
- Retain the required `dl.cse-facts` component inside the opening header when
  creating or explicitly rebuilding an editorial case study. Populate Project,
  Role, Period, and Collaborators where verified; remove individual unknown or
  inapplicable fields, never invent them. Ordinary paragraphs do not replace
  this component, and supporting disclosures must not hide it. Keep contribution
  prose focused on responsibilities and decisions without repeating the facts.
  Verify the component is present before reporting the page complete.
- Editorial figures, captions, and comparisons default to the centred text width.
  Use `cse-wide` only as a deliberate option when requested or justified by
  visual legibility; explain the choice in implementation notes. Agents may
  recommend wider evidence, but must not make all visuals wide by default.
- Existing case studies keep their current layout and project exceptions.
  Migration requires an explicit task; template work alone does not authorise it.
- Keep the editorial reference and component recipes aligned when changing this
  family. Register new public editorial studies in both site-consistency and
  editorial-template audit route lists, retaining legacy checks for older pages.
- Keep the reference page aligned with shared styles when changing foundations.
- After shared-style or component changes, check affected pages on mobile and
  desktop, run `node scripts/design-foundation-audit.mjs`, and run
  `node scripts/publish-audit.mjs` with the local preview server running.
- Include new public pages in the relevant audit route lists so their navigation,
  landmarks, assets, and layouts are covered by future checks.

- For editorial results, reuse the single flexible `cse-result` component.
  Keep units, reporting periods, source links, and limitations beside the values;
  distinguish measured changes from independently reported business metrics.
  Remove unavailable results and their navigation links rather than inventing data.

- For optional editorial phone or desktop mockups, use `cse-device` with
  `cse-device--phone` or `cse-device--desktop` and `cse-device-shell` around
  `cse-media`. Keep captions outside the frame and preserve intrinsic media
  proportions. Do not double-frame existing mockups or crop evidence to fit.
  Videos retain native controls, playsinline, a poster, and a direct link;
  do not autoplay. Replace the reference’s illustrative phone image with
  verified project media when authoring a study.

- For new optional supporting content, use the `cse-support` / native
  `cse-support-disclosure` recipe with `open` in source and a descriptive summary.
  Short notes follow their related fragment; illustrated stories use one
  `cse-support-main` group so their disclosure ends the related section on
  smaller screens. Reuse one content copy and label illustrative dialogue.
  Keep essential findings, decisions, attribution, and evidence limitations
  visible in primary prose. Existing notes/studies require explicit migration.

- Group supporting illustrations in `cse-support-gallery` so expanded notes remain compact. Keep complete figures, captions, intrinsic proportions, and full-size links; do not enlarge optional illustrations to the primary evidence width.

- New editorial supporting explanations stay in the reserved right margin at all desktop widths (1024px+). Only below 1024px do they move into the reading flow as disclosures. Preserve the equal left/right rails and centred primary content.
