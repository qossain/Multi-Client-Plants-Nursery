# Client progress and decisions

Update this document after each meaningful client-specific change with date, work, evidence, outstanding decisions and next step. Keep proposed work separate from completed work.

## 2026-11-22: brief and planning

- User requested a distinctive mobile-first website for a valuable new client, with carefully treated imagery, creative but accessible motion, international-facing enquiries, high performance and a path to possible future ecommerce. Planning precedes development; a design preview must be approved before a major visual change.
- User selected the website name **Nasaruldin Nursery Farm** and wants both overseas-opportunity enquiries and orders/projects in Pakistan from overseas visitors, subject to business confirmation.
- Preserved 17 provided screenshots in `source-images/`, copied byte for byte and verified with SHA-256. This directory is Git ignored. They are social screenshots rather than original individual photographs; no enhanced derivatives or final website assets have been produced.
- Instagram and Facebook links were supplied but could not be fetched by the research tool. Business details and social claims are recorded as unverified in DESIGN_PLAN.md. The concept and all imagery require review and owner approval before publication.
- Saved an exploratory AI-generated design preview at `design-concepts/concept-01.png`. It uses illustrative, not client-authenticated, imagery and copy, and it is not approved. It remains too close to a conventional nursery hero for the brief; a second concept generation attempt failed with a connection error. Continue exploring a more distinctive direction before implementation.
- No client site, design implementation, GitHub push, Vercel project or deployment was created. A previous platform push was rejected by automatic review because the destination is public and the payload includes the first client's material; explicit approval to expose that material has not been received.
- Next: review and approve the concept, confirm branding and business details, then build the client inside the shared platform without touching the live Abdul Jabbar site.

## 2026-11-22: Working Row design review

- User approved the Working Row concept, subject to review of a revised design system and both audience wireframes. User expressly asked to stop before building.
- Added DESIGN_REVISION.md with measured accent contrast, selected font settings, language requirements, a single scroll-driven moment, mobile structure, empty-state behavior, audience journeys and proposed per-client theme/config boundary. No site, config mechanism or client assets were implemented in this step.

## 2026-11-22: First build authorized

- User approved building the hero and one further section only, with fluorescent tape-pink used solely for non-text markings, the specified focus treatment, and no AI-reconstructed images. The rest of the website remains gated on user review.
- Added OWNER_SHOT_LIST.md and prepared two low-resolution WebP crops from the preserved screenshots without reconstruction; they are different scenes and are not a verified matching specimen pair. Downloaded licensed Fraunces and Source Sans 3 from Google Fonts for local use.
- The candidate WhatsApp number appears in the supplied screenshots but has not been confirmed by the owner; the specimen enquiry action is disabled until confirmed. Stock, update date and response-time fields have null values and confirmation flags; unconfirmed information is not rendered.
- First-build rendering, contrast, viewport screenshots and Lighthouse verification are in progress. The working-row preview is explicitly blocked from Vercel production builds.

## 2026-11-23: Verification interrupted by browser access

- Built the current preview successfully with `CLIENT=nasruddin`; static checks found two homepage sections, the local Fraunces and Source Sans files, a disabled enquiry for the unconfirmed number, no first-client CSS on the homepage and a working production-deployment guard. Unit tests for the confirmation fields and guard passed.
- Rebuilt the Abdul Jabbar client after introducing the selected-home alias: 259 pages built, with matching extracted text and links on the home page, directory, one category, one product and 404 compared with its existing local build. This is not a full visual or interaction regression.
- Contrast calculations from configured hex values: white on action pink 5.86:1, ink on ground 12.77:1, white on deep green 11.73:1 and light pink on deep green 7.30:1. These are token calculations, not measurements of the rendered interface or every state. Corrected the focus treatment inside the light tag on the dark section.
- Browser access approval timed out, and the permitted retry timed out. Consequently the requested 360, 390, 768 and 1440 screenshots, actual rendered contrast checks and mobile Lighthouse run could not be completed. Do not claim visual, font-rendering, performance or interaction verification.
- Self-critique: the two existing crops are low resolution and show different scenes, so they do not yet deliver a verified wide-row-to-matching-specimen reveal. The current scroll effect is only a small scale change and does not yet meet the requested stronger signature moment. The owner shot list requests a real matching pair. The WhatsApp action remains disabled pending owner confirmation of the number. The preview should not be represented as a finished design.
- Next: regain approved browser access, capture and inspect all four viewports, verify font rendering and interactions, run mobile Lighthouse and rendered contrast checks, and improve the signature moment using matching genuine photographs before asking the user to approve the next stage. No push or deployment occurred.

## 2026-11-23: New hero reference

- User selected the supplied green nursery UI reference and requested only its hero, with clearer white text, then will supply the next section. This supersedes the Working Row styling for the hero. The current preview uses glass panels, stacked sans-serif type and a green photographic background. The visible social links open the supplied Instagram profile; no unconfirmed WhatsApp number is exposed.
- Background and thumbnail are low-resolution crops of supplied nursery screenshots, not AI-reconstructed. They cannot reproduce the reference's glass-sphere bonsai composition; obtain an appropriate original client photograph. No further section, push or deployment.
- Browser inspection timed out. The initial build hit a sandbox permission error creating Astro's telemetry configuration; a retry with telemetry disabled was started. Responsive appearance, rendered contrast, and availability of the updated local preview have not been verified.

## 2026-11-23: Slimmer hero and reference image

- User requested a single-line, sleeker header; slimmer button and containers; no arrows or scroll indicator; and the exact supplied reference imagery. The preview now uses `images/hero-reference-crop.webp`, cropped directly from the supplied design reference, for both hero and thumbnail. No generated reconstruction was used. This artwork is a design reference and must not be represented as an authenticated photograph of the nursery. The source image is a composite containing text and controls, so only its clean image portion could be used; the exact full-screen composition is not available as a separate source photo.
- `CLIENT=nasruddin` build passed with Astro telemetry disabled. Browser appearance and real rendered contrast were not checked in this step.

## 2026-11-23: Full reference comparison

- User clarified that the full provided reference should be copied exactly. The current hero preview displays a WebP conversion of the complete supplied image, keeping its original layout, copy and imagery; no generative reconstruction was performed. It is a static image, so the depicted navigation and buttons are not working controls. The reference's “Since 1985” and other business claims are not verified for Nasaruldin. This production-blocked visual comparison must be translated to accessible interactive components and verified client content before release. The user will supply the next section.

## 2026-11-23: Hero navigation, categories and plants

- User requested an integrated animated navigation with nursery logo and name, more legible hero text, a category introduction, eight categories in two rows of four, and trending plants. Rebuilt the flat reference as HTML, with a crop of the same illustrative reference as background, a logo cropped from the supplied Facebook screenshot, eight abstract line icons, two supplied nursery screenshot crops and client data in `homepage.json`. The menu and category selection have controls; category selection currently gives an enquiry hint and does not filter a verified catalog. Instagram is the only outbound contact in the preview.
- No source photograph matching a hand holding an identifiable nursery plant was supplied, so the category hero uses a nursery screenshot crop and the requested composition remains incomplete. The trending heading is a design placeholder; no popularity, stock, price or product availability has been verified. The illustrative reference background is not an authenticated photograph of the nursery, and the logo is a low-resolution screenshot crop that requires owner confirmation. No AI reconstruction, push or deployment.
- `CLIENT=nasruddin` build passed after the changes. Category illustrations currently reuse three simple leaf drawings, rather than eight distinct plant-specific icons. Visual appearance, actual contrast and interactions have not been checked in a browser in this step; previous browser access timed out.
