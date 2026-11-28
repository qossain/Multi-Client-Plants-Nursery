# Multi-client nursery platform

## 2026-11-28 architecture decision

The user approved moving toward three independent applications in one repository: `sites/usman`, `sites/nasruddin`, and `sites/abdulrehman`. The first two are local copies with protected Vercel previews; the third is an unfinished scaffold. Do not change production settings until preview and migration checks pass and approval is given. Runtime code is duplicated per app for isolation; no shared runtime package is yet in use. The original root application and Abdul Jabbar production remain separate. See `sites/README.md` for actual status and migration steps.

Status: multi-client platform is on GitHub `qossain/Multi-Client-Plants-Nursery` (`main`). Nasaruldin has a public review deployment; the user reported on 2026-11-28 that Usman's site has been published, although its live URL and deployment have not been independently checked. The original Abdul Jabbar production site remains separate. Current state, verification and launch risks are maintained in [PROJECT_HANDOFF.md](PROJECT_HANDOFF.md) and [PROJECT_PROGRESS.md](PROJECT_PROGRESS.md); older dated notes below are historical snapshots and do not override the current handoff.

## Goal and production protection

Maintain one Astro codebase for multiple nursery clients, each with its own content, visual identity, Vercel project and domain. Target approximately 30 minutes to set up a client once suitable designs and content exist; validate this target in practice.

The existing Abdul Jabbar Nursery site is client 1. Its current repository and production deployment must remain untouched during platform development. The separate platform repository is public and pushed to GitHub. Do not connect or switch the existing production project or domain without explicit approval and a reviewed rollback plan. Check actual Vercel settings and current production before migration; repository state alone does not establish what is live.

## Current baseline

On 2026-11-21 the local repository was clean on `main` at `7915c78`, tracking `origin/main` locally. Its remote is `qossain/Abdul-Jabbar-Nursery-Farm`. This does not verify the current remote or deployment. Astro builds static pages; dependencies are Astro and GSAP. Routes, components, global styles, catalog, reviews and public images live under `src` and `public`. The canonical site URL is currently set in `astro.config.mjs`, and client-specific content, colors and WhatsApp links also occur in components and pages.

The root AGENTS.md records client 1's design constraints, features, content caveats and verification commands. Preserve those instructions and their content-integrity warnings in the new repository. Do not treat generated product data, sales counts, awards or review summaries as verified facts.

## Proposed structure

- `core/components`: reusable sections and shared behavior.
- `core/variants`: selectable section designs with consistent, typed props per section.
- `core/layouts`: page and section arrangements; retain Astro's required routing structure as needed.
- `core/themes`: legacy color and font tokens and five provisional theme palettes.
- `clients/<slug>/config.json`, `products.json` and `images/`: client identity, content, design choices, products and assets. Include all additional existing content, such as reviews and services, in the client data model as needed.
- `scripts/new-client.mjs`: guided setup from a template, without overwriting existing clients. The generated client requires real details and images before launch.
- Shared TypeScript types and build-time validation for all client data, including clear errors for missing or invalid `CLIENT`, unsafe slugs, missing files and unknown design keys.

The exact structure can adapt to Astro's build and asset handling. A registry maps configuration keys to files; adding a variant requires its file and registry key. Distinctive new designs may require new code, not merely a color change. Client-specific URLs, sitemap metadata, assets and WhatsApp messages must come from the selected client, with no cross-client data leakage.

## Delivery stages and gates

1. **Baseline and isolated restructure.** Record representative desktop and mobile screenshots and functional behavior of client 1, build the current site, and reproduce it in the separate platform repository. Compare rendered pages and interactions before further changes.
2. **Config-driven content.** Extract client-specific content, URLs, products, reviews, services and images; add typed validation and isolate the build by `CLIENT`. Check all routes, metadata, sitemap and WhatsApp links. Preserve the existing visual output.
3. **Themes.** Extract styling into theme variables while preserving client 1's appearance. Plan placeholders for Rare Aroids, Family Garden Center, Unkillable Urban, Biophilic Commercial and Desert Xeriscaping; no unapproved visible redesign.
4. **Variants and layouts.** Establish shared props and key registries. Add placeholders for the five concepts only within the approved design scope. Any new visible design requires user approval first.
5. **Client setup.** Add the interactive scaffold, validate input, test duplicate and invalid slugs and verify that a generated client builds with its own content.
6. **Vercel documentation and build filtering.** Document separate projects, environment variables, domains, previews and rollback. Implement and test an ignored-build step that rebuilds for shared code, build/config/dependency changes and the selected client; skip only when safe. First builds, missing Git history and ambiguous diffs must build rather than silently skip. Check Vercel's current documented behavior before implementation.

Make small commits by stage in the new repository. Build and compare client 1 against the baseline at each stage, recording the checks actually performed. Explain output differences; do not claim pixel-identical rendering without evidence. Do not push, deploy, migrate a domain or change a production project merely because an earlier step was approved. The user must approve visible design changes and the eventual production switch.

## Verification checklist

- Home, plant directory, all category and product routes, 404 and sitemap; image loading and canonical URLs.
- Header and mobile menu, search/sort, category interaction, service behavior, product gallery, reviews, footer and WhatsApp/telephone links.
- Desktop and mobile screenshots, keyboard focus, reduced motion and important image loading behavior.
- A second client build proves no first-client branding, product data, images, metadata or contact information leaks into it.
- Invalid client selections and invalid configuration fail clearly; client creation and build-filter edge cases are tested.
- Record actual commands, results and limitations in PROJECT_PROGRESS.md after each change.

## Open decisions

- The new repository is `qossain/Multi-Client-Plants-Nursery`; GitHub reported it public and empty on 2026-11-21. Confirm visibility and content suitability before publishing client material.
- Confirm the real production domain, Vercel project, branch, deployment settings and rollback procedure before migration.
- Define client-specific asset handling, schema and representative screenshot routes from the actual implementation during the baseline stage.

## Nasaruldin hero decision

- Use the user-selected portrait video on mobile and landscape nursery film on desktop, retaining the existing hero image until playback and for reduced motion. Keep original files in the ignored client source-images folder and publish optimized versions from the client image directory. Confirm whether the footage depicts the actual nursery before describing it as documentary.
- The user requested a shareable Vercel review. Nasaruldin explicitly permits its preview layout on a production deployment while retaining noindex; Vercel's exposed project production URL supplies the origin until a real custom domain is configured. This is not verification of client content.

## Usman review deployment

- The user reports that Usman's site is published. The source permits this client's noindex review layout in production builds and uses Vercel's exposed project production URL until a real origin is configured. The live URL and project settings have not been checked. Keep client projects separate; noindex is not access protection, and copied reviews and illustrative content remain unverified for Usman.
