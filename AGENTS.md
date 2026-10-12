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
- Primary narrative text must use `--ds-text` (`#d5d9dd`) through `--color-copy`;
  headlines and titles use `--ds-text-heading` (`#fff1df`). Reserve
  `--ds-text-muted` for captions and secondary metadata. Verify computed colours
  on mobile and desktop rather than relying on token references alone.
- Document justified exceptions in the design-system guide or the page's
  implementation notes. Preserve existing exceptions when they serve the content.
- Start general editorial pages from
  [`templates/page.html.template`](templates/page.html.template).
- Existing case studies keep their current layout and project exceptions.
  Migration requires an explicit task; template work alone does not authorise it.
- Keep the reference page aligned with shared styles when changing foundations.
- After shared-style or component changes, check affected pages on mobile and
  desktop, run `node scripts/design-foundation-audit.mjs`, and run
  `node scripts/publish-audit.mjs` with the local preview server running.
- Include new public pages in the relevant audit route lists so their navigation,
  landmarks, assets, and layouts are covered by future checks.
