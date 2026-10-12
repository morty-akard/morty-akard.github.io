# Website design foundations

The foundation centralises existing styling while preserving the website’s current appearance. Open `design-system/index.html` through the local server to inspect real components. The reference is unlisted and has `noindex, nofollow` metadata; this is indexing guidance, not access control.

## Where to edit

Load styles in this order: exported Webflow CSS, design tokens, shared site chrome, case-study CSS when needed, then page-specific styles. New editorial case studies use their dedicated opt-in stylesheet instead of legacy case-study CSS (see below). Relative paths must match the page’s depth. Redirect-only pages need no styles.

`css/design-tokens.css` owns new `--ds-` values. Existing variables remain compatibility aliases. Shared root aliases and component base rules are consolidated; responsive and case-study overrides retain their scope and effective behaviour. Do not move aliases into a global reset or merge similar colours just because they look close.

The exported Webflow stylesheet remains untouched. Its font, type, and legacy colour variables still support older components. The shared primary accent overrides its legacy accent through an alias. Other legacy Webflow variables remain independent until a component is migrated.

## Token roles and current uses

| Group | Roles and usage |
| --- | --- |
| Colour | `background`, `surface`, and `surface-raised` support editorial pages and case studies. `text-heading` keeps warm cream (`#fff1df`) for headlines and titles. `text` uses neutral light grey (`#d5d9dd`) for primary reading text; `text-muted` supplies secondary copy. `text-warm` preserves cream text in older cards. |
| Accents | `accent-primary` is warm orange for navigation, selection, and card borders. `accent-action` is the stronger orange used for contact actions, footer email, and case-study labels. `accent-evidence` is teal for case-study supporting copy. |
| Variants | `surface-nav-legacy`, `text-muted-legacy`, `text-dim`, case-study legacy surfaces and teal, and project purple preserve earlier treatments. These are deliberate compatibility values, not interchangeable semantic defaults. |
| Borders | `border` is the final editorial border. `border-case` and `border-case-strong` preserve their distinct opacity and colour. The superseded solid-grey default was removed. |
| Typography | Open Sans; regular 400, medium 600, bold 700. Display title: clamp(44px, 7vw, 88px), line height .98, bold. Case title: clamp(40px, 6vw, 84px), 1.05, bold. Section heading: clamp(32px, 4vw, 60px), 1.15, bold. Supporting heading: clamp(24px, 3vw, 36px), 1.2, bold. Body: 20px/32px, inherited regular. Labels: 13px/20px, bold. Captions: 14px/22px, inherited regular. |
| Space | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, and 120px. Use existing component spacing first. A new value requires a specific layout reason. |
| Layout | Content up to 1200px; reading reference 760px. Gutters: 120px desktop, 40px at ≤991px, 20px at ≤479px. |
| Shape and depth | Shared card radius 14px; control 8px. Project-specific radii remain scoped to their components. Navigation, article-card, hovered-card, and evidence shadows remain separate. |
| Motion | 160ms for the skip link; 200ms for common transitions; ease timing. Reduced-motion rules use 0.01ms and suppress card hover and focus transforms, including project rows. One final shared motion block controls scrolling, animation, transitions, and card transforms. Keep it after component rules. |

## Responsive behaviour and exceptions

Do not consolidate breakpoints during routine content work. Webflow uses 1920px, 991px, 767px, and 479px; shared styles also use 1199px, 1100px/1099px, 850px, 768px, and 420px for specific layouts. Case-study styles include their own component breakpoints.

The shared `--section-pad-y` refers to clamp(72px, 9vw, 128px). Superseded 120px/80px/64px defaults and their unused tokens were removed. The shared card radius is 14px and the border is translucent warm cream; their superseded defaults were also removed. Semantic gutters and block spacing reference the corresponding spacing-scale tokens, so their roles stay independent while their values share a source.

Case-study pages override `--cs-*` variables locally to use editorial surfaces and teal. Arium tournament sections retain fluid block gaps, specialised hero padding, quiet inline facts, and a smaller subtitle. Game Room and Betatrends retain their reading geometry and evidence treatments; primary narrative colour follows the shared text role. Some direct case-study section children use the full content column even though nested body text has a 760px reading reference.

Exact matching pixel spacing and 8px/14px radii in shared styles now reference foundation tokens. Exceptional values, project-card radii, illustration colours, inline media backgrounds, home-page interaction fixes, exported utility classes, and page-specific typography remain migration candidates. Do not recolour project screenshots or change them through portfolio tokens.

## Applying text colours

Primary narrative paragraphs and lists use `--ds-text` (`#d5d9dd`), via `--color-copy` in shared/legacy components or `--cse-text` in editorial studies. Headlines and titles use `--ds-text-heading` (`#fff1df`), via `--color-heading` or `--cse-heading`. Captions, source notes, and secondary metadata use `--ds-text-muted`. Accent evidence copy retains its documented teal treatment.

Use `.cs-body` for legacy narrative paragraphs and `.cse-prose` for editorial narrative containers. Do not add `.cs-body--muted` to main story paragraphs or copy fixed cream/white body colours from older components. Preserve geometry exceptions without preserving obsolete narrative colours. New custom prose must explicitly use the shared body role if an existing selector overrides inheritance.

Check computed paragraph colours at mobile and desktop sizes. A declared token can be overridden by a class, inline style, or page stylesheet. `scripts/text-colour-audit.mjs`, included in the publish audit, checks primary prose separately from headings and secondary text. Add new narrative components and public routes to that check.

## Choosing components

- Reuse the complete floating navigation markup and `js/site-chrome.js`; the script controls mobile menu opening, Escape, and ARIA state. Set `aria-current="page"` only on the actual current destination.
- Use `floating-nav__cta` for the current outlined contact action. Preserve its real hover and keyboard focus rules.
- Centre all mobile menu link text, including the contact action inside its full-width button. The reference uses the same shared navigation styles.
- Use `project-story` for compact project rows, or the existing case-study card pattern where that page already uses it. Use a specific title and evidence-based summary.
- Case-study card images use `width: 100%`, `height: auto`, and zero minimum dimensions so intrinsic HTML image dimensions cannot enlarge the card. Preserve source width/height attributes for aspect-ratio information; the existing card variant controls the displayed aspect ratio.
- Use the complete `article-card` structure for published writing. Preserve externally published titles and working destinations.
- Use `cs-facts` and `cs-fact` for quiet project metadata; apply the appropriate existing column variant.
- Use `cs-media` with `cs-caption` for images and evidence. Include accurate alternative text and a descriptive caption when useful.

The reference page uses production classes. Its `ds-reference` styles arrange examples only and must not become a second component library. Focus and selected demonstrations are explicitly labelled appearance examples; hover and keyboard focus can be inspected on the real links.

## Adding or redesigning a page

1. Read this guide and the portfolio content guide; choose a similar existing page for content structure.
2. Start a new editorial page from `templates/page.html.template`, following the checklist below. For an existing page, preserve its semantic structure, shared header, skip link, main landmark, and footer. Load the foundation in the documented order.
3. Reuse component classes and semantic tokens. Choose heading levels for the document outline rather than appearance.
4. Keep styles specific to the page scoped under a page class. Use local token overrides for justified project treatments.
5. For a redesign, change the semantic tokens and relevant component rules together. Legacy Webflow consumers may still need migration; changing a token does not redesign every older component automatically.
6. Check every consumer of changed shared styles on mobile and desktop. Run the publish audit before publishing.

## Using the page starter

`templates/page.html.template` is a source template, not a published HTML route. Copy it to the intended `.html` destination. It uses the existing editorial section classes and case-study stylesheet rather than introducing new layout styles. Adapt the section structure for the actual content; it is not a case-study writing formula.

Before publishing the copy:

- Replace every `{{...}}` placeholder: title, description, canonical URL, introduction, section heading, body copy, and current year. Escape text and attribute content as HTML when inserting it.
- Set the canonical URL to the destination on the website’s actual production domain. Add a social preview image if the page needs one.
- Keep the draft `noindex, nofollow` metadata until the page is ready. Remove it for a public page intended for search, or keep it for an unlisted reference.
- Root-relative assets and navigation work at the current site root, including nested pages. Adjust all root-relative paths together if a future deployment uses a subdirectory.
- Mark only the actual current-page navigation links with `is-active` and `aria-current="page"`, including the mobile equivalent. Do not change shared navigation destinations simply to add an individual project page.
- Use unique IDs when adding sections, maintain one h1, and keep headings in logical order. Add truthful alternative text and captions when adding media.
- Keep the complete mobile menu markup and `js/site-chrome.js`. Update shared header/footer copies together if those components change; this template is not a build-time include.
- Add the destination to the site-consistency route list, and to the case-study layout list if it uses that page pattern. Add sitemap/navigation entries only when publishing the page warrants them.
- Run the foundation and publish audits with the local server running, then check the new destination on mobile and desktop. The audits do not replace checking placeholders and content accuracy.

## Contrast and follow-up work

The reference contains measured sRGB contrast ratios for explicit solid-background pairs. Text and control combinations are checked individually: a passing focus-ring colour does not prove every control is accessible. Normal text uses a 4.5:1 threshold; large text and necessary non-text indicators use 3:1. Alpha colours must be composited over their actual background.

Legacy dim text (`#666666`) on the page background measures 3.24:1 and falls below 4.5:1. The footer copy now uses shared muted text instead; keep dim text for decorative uses and check any new text consumer. Legacy secondary white at 49% opacity measures 5.15:1 on that same background, but still needs separate checks on lighter surfaces. Retain these values in this phase and investigate their actual consumers during a later accessibility pass. Subtle borders are decorative separators; do not rely on them as the sole indicator of an interactive control. Check text over photography, gradients, translucent navigation, and project-specific surfaces separately.

## Verification

Run `node scripts/design-foundation-audit.mjs` for token references, missing stylesheet files, and stylesheet order, and `node --test scripts/design-foundation-audit.test.mjs` for its guard tests. The foundation check also runs as part of the publish audit. The case-study audit checks centred content and containment at 390, 768, 1440, and 2008px, allowing narrower centred headings and portrait media.

See `docs/design-foundation-verification.md` for the implementation baseline, comparison results, and resolved audit findings. Baseline screenshots and computed-style captures are local verification artifacts rather than a permanent snapshot-test dependency.

## Page families and future case studies

General pages keep their current shared styling and `templates/page.html.template`. That existing starter retains its historical case-study stylesheet dependency; it is not the new editorial case-study template. Existing project pages retain their legacy `cs-*` layout, project exceptions, and `case-study.css`.

For new article-style case studies, use `templates/case-study.html.template` and read [the case-study template guide](case-study-template.md). Its `case-study-editorial` root and `cse-*` components deliberately avoid legacy layout selectors. Shared colours, font, and foundational spacing remain one design system; editorial reading geometry and heading roles are scoped to the new family. Future migration of an existing study requires a separate explicit task.

Open `/design-system/case-study.html` for production component examples of the future template. This reference stays unlisted and noindex, and existing case studies remain unchanged. New public editorial studies must join both the site-consistency and editorial audit route lists; do not put them in the legacy geometry checker.

Editorial results use one shared `cse-result` block for before/after evaluations or source-attributed metrics. Use the recipes and evidence checklist in [case-study-template.md](case-study-template.md); keep results at text width unless a wider presentation has a documented reason.

Editorial device figures reuse `cse-device` with phone or desktop modifiers. Frames inherit the shared palette and keep media at its natural proportions; figures and captions still default to text width. Use the starter and recipes in [case-study-template.md](case-study-template.md). Device silhouettes are decorative, and existing screenshots containing hardware should stay unwrapped.

Optional editorial supporting content uses the opt-in `cse-support` disclosure inside a `cse-note`. It defaults open in the desktop margin (1024px+) and collapsed inline on smaller screens when enhanced. Short notes stay near their related fragment; illustrated stories use a `cse-support-main` group so the single disclosure follows the complete section story. Essential evidence and limitations stay visible. Existing `cse-note` consumers retain their previous behaviour; see [the supporting-content recipes](case-study-template.md#responsive-supporting-content).

Illustrated editorial support uses `cse-support-gallery` to keep images compact, with two columns at 480–1023px and one column on phones or in the desktop margin. Its documented 280px image cap is specific to supporting illustrations; primary evidence retains the normal reading-width default.

The editorial opening requires `dl.cse-facts`, retained when creating or explicitly rebuilding a study. The starter and reference share the project/role/period/collaborator pattern. Use verified entries, omit unknown individual fields, and keep the component visible in the opening. See the introduction recipe and checklist in [case-study-template.md](case-study-template.md).
