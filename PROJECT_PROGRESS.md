# Multi-client platform progress

Update this file after each meaningful change: date, scope, verification, next step and unresolved risks. Keep plans distinct from completed work. Update MULTI_CLIENT_PLAN.md when architecture or decisions change. Do not record credentials or sensitive client information.

## 2026-11-21 — Planning

- User requested one shared system for many nursery clients, separate Vercel projects, and preservation of the existing live client. User authorized planning documentation and creating a separate repository.
- Inspected local repository: clean `main` at `7915c78`, locally tracking `origin/main`; existing remote points to `qossain/Abdul-Jabbar-Nursery-Farm`. Remote state and live deployment were not verified.
- Added the platform plan and agent handoff instructions. No site implementation, design, domain or deployment was changed.
- GitHub CLI reported invalid credentials for both configured accounts and could not connect to the GitHub API. A separate repository has not been created.
- Next: restore GitHub authentication and connectivity; establish a separate repository and capture a verified visual and functional baseline before restructuring. Keep current production isolated.

## 2026-11-21 — Separate repository provided

- User provided a screenshot of `qossain/Multi-Client-Plants-Nursery`, showing GitHub's empty-repository setup page. Repository accessibility and permissions have not been verified independently.
- Created `multi-client-platform/` as an isolated local Git repository, copied the tracked site files and planning documents into it, and configured that new repository URL as its origin. No commit or push has been made.
- GitHub CLI still reports invalid credentials. Restore authentication and connectivity before attempting a push. Capture and verify the baseline before refactoring.

## 2026-11-21 — GitHub access verified

- Outside the restricted network sandbox, GitHub CLI authenticated as `qossain` and confirmed `qossain/Multi-Client-Plants-Nursery` is public and has no default branch yet. The earlier authentication failure was a sandbox connectivity limitation; it does not describe the current login.
- The isolated copy has no commits. No push, production change or domain change has been made.
- `npm ci` succeeded using Node 24.11.1; npm reported one moderate advisory (not investigated). `npm run build` succeeded with a temporary APPDATA and telemetry disabled, producing 259 pages. The first attempt failed because the sandbox blocked Astro's user configuration directory. No visual or behavioral comparison has been made.
- Next: establish a visual and functional baseline before any restructure. The copied AGENTS.md describes an older catalog snapshot; use current source and build output when assessing scope.

## 2026-11-22 — Isolated baseline and shared-code move

- User authorized the full platform implementation in the separate folder, with no push until requested and no changes to the original site.
- Saved local baseline commit in the platform repository. All tracked original site files matched the isolated copy before restructuring, excluding the agent handoff document. The local homepage was inspected in a browser.
- Moved existing components, layout and styles into `core/`, adjusting imports only. The static build succeeded with 259 pages. Every file in the original existing `dist` matched the corresponding output byte for byte (644 files in the new output); the original dist's generation date was not independently established. No mobile visual comparison or interaction regression was performed yet.
- Next: client-specific data extraction, configuration validation and isolation. Themes, variants, scaffolding and Vercel build filtering remain unimplemented. No push or deployment.

## 2026-11-22 — Catalog extraction

- Materialized the existing categories and plants into `clients/abdul-jabbar/products.json` and updated the catalog module to read them. This is an intermediate step: client selection and validation are not yet implemented, and other content remains hardcoded.
- Build succeeded with 259 pages; all 644 files in the existing original `dist` matched the corresponding new files byte for byte. No visual comparison or cross-client isolation test was performed.

## 2026-11-22 — Initial client selection

- Added a first-client configuration and a build-time loader. `CLIENT=abdul-jabbar` selects its catalog and site URL; missing or unsafe slugs fail clearly. Other clients are deliberately rejected until content isolation is complete, to prevent cross-client leakage. The current configuration schema and validation are incomplete.
- With `CLIENT=abdul-jabbar`, the build produced 259 pages and matched all 644 existing original `dist` files byte for byte. Focused selection checks passed. No mobile visual comparison or cross-client isolation test was performed.
- Next: extract and validate the remaining client data and assets, implement and test multiple-client support, themes and variants, scaffolding and deployment filtering. Nothing has been pushed or deployed.

## 2026-11-22 — Review data extraction

- Moved the existing review summaries and their source excerpts into the first client's `reviews.json`, selected through the build alias. The summaries remain distinct from quotations. Other-client builds remain blocked while isolation is incomplete.
- The first client build succeeded with 259 pages; all 644 files present in the original existing build matched. Mobile visual and interaction comparisons remain outstanding.

## 2026-11-22 — Client identity and asset ownership

- Moved services into the first client's data and parameterized its identity, contact links, page metadata, hero text and images, and story details. The first client's public assets now live in its client folder and Astro uses that folder as its public directory.
- `CLIENT=abdul-jabbar npm run build` succeeded with 259 pages. Homepage markup compared with the existing original build differs in the experience counter's data attribute and script; visible homepage text was unchanged in that comparison. Product gallery scripts also changed to use the configured WhatsApp number. A mobile visual comparison and interaction tests are still required.
- Other clients remain intentionally blocked; configuration validation, complete client content isolation, theme and variant handling, onboarding, and Vercel filtering remain unfinished. No push or deployment.

## 2026-11-22 — More client-specific content

- Moved featured product choices, shrub membership, award names, and displayed review and client counts into the first client's configuration. Empty award lists and zero counts no longer display those claims.
- The first client build succeeded with 259 pages. Mobile visual comparison and interactions have not yet been checked. Other clients remain blocked until complete isolation and validation are in place.

## 2026-11-22 — Initial validation and theme tokens

- Added checks for client fields, catalog relationships, product prices and local image paths, plus a legacy theme and five provisional concept palettes. Color literals in the shared stylesheet were extracted to theme variables; reconstructing the original CSS from those variables matched the prior source exactly. The concept palettes are placeholders, not approved Figma designs.
- The first client build succeeded with 259 pages and the existing client-selection test passed. No visual regression, multiple-client isolation, or malformed-data test suite has yet been completed; other-client builds remain blocked.

## 2026-11-22 — Section and variant registry

- Added a section-order registry, a common hero props interface, legacy and five provisional concept hero variants, and legacy/rounded product-card variants. Added early key validation. The concept visuals are placeholders and require design approval before client use.
- The first-client build succeeded with 259 pages. A text and image/link extraction of home, directory, one category, one product and 404 matched the existing original build. This is not a visual or interaction comparison. Other-client builds remain blocked.

## 2026-11-22 — Multi-client scaffold and verification in progress

- Added per-client common copy, configurable product enquiry messages, optional contact links, category heroes and currency labels. Added `npm run new-client`, a neutral template, a safe build filter and Vercel setup documentation. A generated client starts without reviews, services, awards, invented counts or products. The default domain and imagery are placeholders.
- Enabled other client builds after a fictional client built successfully with separate assets, an independently configured phone number and product. A scan of its text output found no first-client name, phone, location or email; the first client's logo was absent. A fuller fixture also produced its configured section order and product enquiry link. The five provisional concept hero/theme combinations each built successfully with the fixture.
- The original and refactored homepage heroes were compared visually in a local browser at desktop and mobile widths. They appeared the same in those views. The refactored mobile menu opened, and searching the directory for `monstera` returned two results. These checks do not establish pixel identity or cover every route and device.
- `npm test` passed four tests, including scaffold overwrite/path checks and a real Git-history test of the build filter. A subsequent interactive scaffold run created its fixture, though the automation terminal later reported a raw-mode error; this is not a clean end-to-end terminal exit. The build-filter has not been exercised on Vercel.
- `npm audit --omit=dev` reported one moderate Astro advisory for the `@astrojs/node` image endpoint on case-sensitive filesystems. This project uses static output and does not include that adapter; the finding has not been independently assessed for all future deployments. No dependency update was applied.
- Remaining: final build, repeatable client isolation/regression verification after the latest changes, cleanup of test clients, documentation review, and local commits. The five concept designs remain placeholders requiring approval; no push or deployment has occurred.

## 2026-11-22 — Local implementation verification

- Completed the local client scaffold, configurable common copy and contact data, product enquiry template, category images, currency formatting, selected themes/variants and section ordering. Product and category images fall back to the original when no optimized image exists. The `.example.invalid` scaffold domain is rejected for Vercel production builds.
- All five automated tests passed. The final `CLIENT=abdul-jabbar` build succeeded with 259 pages. Extracted visible text and image/link targets on the home page, directory, one category, one product and 404 matched the existing original build. A fictional second client build with all sections passed content, section-order, WhatsApp and first-client identifier/asset isolation checks; its fixtures were removed afterward.
- Desktop and 390 px mobile hero comparisons, the mobile menu and a directory search were checked locally. Other routes, all interactions, physical devices, Vercel deployments and client-specific designs have not been exhaustively checked. Five concept themes and heroes remain placeholders for later design approval. The 30-minute onboarding target has not been timed with a real client.
- The separate GitHub repository is public. Review its contents, especially client review excerpts and business details, before any future push. No push, Vercel change or domain change has been made.
