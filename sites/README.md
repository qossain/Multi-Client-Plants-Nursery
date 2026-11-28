# Separated client applications: migration status

Migration preparation, 2026-11-28. The legacy root application remains in place and continues to be the source for existing connected projects until a migration is deliberately approved and configured. The separated existing sites have protected preview deployments; production still uses the legacy root. Vercel access was verified on 2026-11-28. Both existing projects use the root directory, connect to qossain/Multi-Client-Plants-Nursery main, and have no custom ignored build command in the project API. Protected preview deployments for both separated apps were built successfully on 2026-11-28; see PROJECT_PROGRESS.md for URLs, checks and an unexpected Vercel bypass-token change. Rollback was not checked.

## Applications

- `sites/usman`: independent copy of Usman routes, core, data, public assets and package lock.
- `sites/nasruddin`: independent copy of Nasaruldin routes, core, data, public assets and package lock.
- `sites/abdulrehman`: minimal local scaffold; production builds are blocked. The user has supplied only the name, not approved design, contacts or content.

There are no shared runtime packages between these three site applications. Duplication is intentional: fixes and dependency updates must be applied and tested separately. The old root application and its Abdul Jabbar platform copy remain unchanged; do not assume edits there propagate into `sites/`. Existing copies retain client-specific fallback code within their own application; do not copy it into a different site. The existing public Git repository does not provide client confidentiality.

Run from a site directory: `npm ci`, then `npm run build`; for local use `npm run dev -- --port 4174`. Node >=22.23.4. The existing client sites select their own fixed slug, and fail if a conflicting CLIENT environment variable is present. They use the same client-config validation as the snapshot. Each has its own `dist`; do not run multiple builds into a single output directory.

On 2026-11-28 each separated site passed a clean `npm ci` and a build on Windows using its own dependencies, after repairing incomplete lockfile entries. The separated sites also built successfully as Vercel previews. Production-mode behavior and a migration from the GitHub roots still need verification.

## Before changing an existing deployment

1. Obtain actual Vercel project, production branch, deployed commit, current environment variables, root directory, build and ignored-build settings, domain and known-good rollback deployment. Both production projects, their root settings and current deployment aliases were checked on 2026-11-28; recheck immediately before any switch.
2. Run clean installs, tests and visual/functional comparisons on desktop and mobile. Confirm client branding, links, SEO, all assets and site-specific content. Review Usman's copied testimonials and illustrative data. Baseline output equality is not owner verification.
3. Prepare and inspect previews of the exact applications. Verify production-mode config, canonical URL and sitemap against the correct domain. A noindex tag is not access control. Confirm Vercel account and plan support the chosen preview and rollback workflow.
4. For each approved project, point its Root Directory to `sites/usman` or `sites/nasruddin` respectively, use Astro, `npm run build`, and `dist`. Verify install settings and that the matching CLIENT variable is either unset or has the correct slug. Inspect the actual existing ignored-build setting: the legacy `node scripts/ignore-build.mjs` is not a valid filter inside these site roots. Remove/disable it or replace it only after a correctly scoped filter is tested; an uncertain case should build. This is not yet a Vercel workspaces monorepo, so do not assume Vercel's automatic unaffected-project skipping works here.
5. Approve any actual project setting changes and production publication separately; observe the resulting deployment and domain. Preserve a known-good rollback and verify the live result.

Do not push or change Vercel projects merely because the restructure exists. Both existing projects use the repository root on main with no custom ignored-build command and may deploy when main is pushed. Inspect the actual settings before any push.
