# Multi-client nursery platform handoff

Updated: 2026-11-27. This is the current operating snapshot for the next chat. Recheck Git and deployment state before relying on it.

## Start here in a new chat

Read this file, `AGENTS.md`, `MULTI_CLIENT_PLAN.md`, and `PROJECT_PROGRESS.md`. Then inspect `git status`, the target client's folder and the current code before editing. The original Abdul Jabbar production site is a separate project; work only in this multi-client repository unless the user explicitly asks otherwise.

Suggested first message:

> Read `PROJECT_HANDOFF.md`, `AGENTS.md`, `MULTI_CLIENT_PLAN.md`, and `PROJECT_PROGRESS.md` in `E:\Nursery Websits\multi-client-platform`. Check the current Git state, then continue with the next client. Keep the original Abdul Jabbar production site untouched. Do not push or deploy unless I ask.

## Repository and deployments

- Local repository: `E:\Nursery Websits\multi-client-platform`
- GitHub: `https://github.com/qossain/Multi-Client-Plants-Nursery`
- Branch: `main`; latest pushed commit at handoff: `a1f8541` (`Refine Nasaruldin responsive layout`). The current workspace may have further uncommitted work; always check `git status` first.
- Each client has its own Vercel project and `CLIENT` environment variable. The public repository is shared; each project builds a single selected client.
- Nasaruldin review deployment: `https://nasaruldin-nursery.vercel.app/`. It is public to anyone with the link and marked `noindex`; `noindex` is not access protection. It remains a review preview, not a verified final launch.
- Usman has a separate `clients/usman/` folder and local preview implementation. No Usman Vercel project, production domain or deployment has been created.
- Never push or deploy unless the user requests it in the current task. A push to `main` can trigger Vercel for connected projects.
- Do not connect, migrate or modify the original Abdul Jabbar production project/domain as part of this platform work.

## Build and run one client

Stack: Astro static output with TypeScript in Astro components, plain CSS, and GSAP. No cart, online payment or checkout. Node.js `>=22.23.4`; dependencies are in `package.json`.

PowerShell from the repository root:

```powershell
npm ci
$env:CLIENT = 'nasruddin'
npm run dev -- --port 4183
npm run build
npm test
```

Use a different slug to preview another client, for example `$env:CLIENT = 'usman'`. The dev server URL is `http://127.0.0.1:4183/`; the all-plants page is `/plants/`. Stop the server with Ctrl+C. Builds use `dist/`. `CLIENT` is required and config is validated at build time. On systems where Astro cannot write its config/cache, use a writable temporary `APPDATA` for that command only; do not change machine-wide settings.

## Starting the next client

Ask the user for the next client's name/slug and approved source material. The user has said the next client's details are ready, but no details for a client after Usman are recorded here yet. Do not guess a business name, phone/WhatsApp, socials, address, inventory, prices, reviews, service claims, founding date or destination markets. Keep separate phone and WhatsApp numbers distinct until confirmed.

1. Create or scaffold only the new `clients/<slug>/` folder; `npm run new-client` prompts for slug, name, phone, theme and layout and refuses to overwrite existing data.
2. Keep each client's config, home content, products, services, reviews and publishable media in that client's folder. Preserve raw/source images only in the ignored `source-images/` folder; optimize approved, authentic assets into `images/` for publication. Never reconstruct client photographs with AI or present generated concepts as documentary nursery stock.
3. Reuse shared components and variants from `core/`, with a client-specific theme/layout/config. Do not copy a full site into another client folder. Check whether shared code currently contains client-specific assumptions before reuse; in particular, `core/layouts/WorkingRowPreview.astro` was originally built for Nasaruldin and has been partially parameterized for Usman. Inspect it before selecting it for another nursery.
4. Build every selected client separately. Shared-core edits can affect all clients; compare each affected client and avoid cross-client names, phone numbers, links, images, metadata or copy.
5. For a new Vercel site, import the same public repository into a separate project, set root directory `./`, Astro preset, build command `npm run build`, output `dist`, and `CLIENT=<slug>` for its deployment environments. Configure ignored build step `node scripts/ignore-build.mjs`. See `VERCEL_SETUP.md`. Check the first deployment and project settings; do not create or deploy a project without a direct request.
6. Keep preview domains noindex until the owner approves content, claims, imagery, contacts and SEO. Before final launch, verify real inventory/prices/stock, all form and WhatsApp destinations, actual socials, legal/privacy requirements, canonical URL, sitemap and the selected domain.

The target is approximately 30 minutes for a new client once approved content and assets exist. This target has not been measured end to end.

## Current clients

| Slug | Display identity | Status | Important notes |
| --- | --- | --- | --- |
| `abdul-jabbar` | Abdul Jabbar Nursery Farm and Landscaping | Platform copy only | The original production repository and deployment are separate and must remain untouched. Client-specific historical design and content cautions are in `AGENTS.md`. |
| `nasruddin` | Nasaruldin Nursery Farm | Public noindex review preview | Live link above. User-supplied number and social profiles are configured. Reviews and client count were approved/reported by the user; images, inventory, names, availability, prices and other claims still need owner review. |
| `usman` | Usman Nursery Farm & Landscaping | Local preview, active work | Separate telephone and WhatsApp from supplied screenshots. The current copied reviews are Nasaruldin reviews and must not be published for Usman. Catalog, services and media are illustrative/copied pending replacement and owner confirmation. Preview content and contact data need visual and destination checks. No deployment. |

## Current responsive issue and verification status

The user supplied mobile screenshots of Nasaruldin's all-plants page and reported responsiveness problems across multiple phones. The decorative background could extend past the viewport, and the floating WhatsApp button overlapped product cards. `src/pages/plants/index.astro` now contains narrower background bounds, more adaptive headings, compact filter controls, a one-column fallback below 360px, and hides the floating button on mobile directory pages so it cannot cover product taps. The user can still reach WhatsApp from the shared footer and individual product pages. Nasaruldin and Usman builds and five tests passed after this change. The current running preview is Usman's `/plants/` at `http://127.0.0.1:4174/plants/`; a narrow browser view was inspected. Physical phones, several widths and desktop directory still need review.

Latest previously recorded checks: the Nasaruldin site built as 226 static pages, the Abdul Jabbar platform copy built as 259, and five automated tests passed; these are dated checks, not proof that the current working tree passes. Most recent pushed code was checked on Nasaruldin's desktop layout; not all pages or physical devices have been verified.

## Design and content safeguards

- Preserve the approved visual direction of each existing client. Make only the requested scoped changes; ask before a new major design or section. The user's supplied images are references, not automatically client-owned web assets.
- The user's exact visual match requests may be implemented within their licensed client context; keep source and derived assets organized. Do not use another client's original photography as the new client's content.
- Many plants and prices are illustrative. Do not turn example prices, sizes, availability, review counts, rankings, guarantees or export claims into verified facts.
- For Nasaruldin, user approved the 200 supplied reviews and reported over 2,000 clients. These are user-provided approvals/reports, not independent verification. Do not attribute these reviews to Usman.
- Nasaruldin's 200 illustrative/example products and generated images do not prove the nursery's exact stock or species. Usman's copied content is not verified for Usman.
- Keep visible noindex on review previews until the user asks to prepare an approved public launch. Noindex does not make a public URL private.
- Follow reduced motion, keyboard focus and mobile readability. Avoid horizontal page scrolling and controls hidden under sticky/floating UI.

## Documentation maintenance

After a meaningful change, append a dated entry to `PROJECT_PROGRESS.md` with scope, build/test/browser verification, deployment status and unresolved risks. Update `MULTI_CLIENT_PLAN.md` when architecture or an agreed decision changes. Update this handoff when client/deployment status, commands, risks or next steps change. Do not claim a push, deployment, device check, or owner approval unless it happened.
