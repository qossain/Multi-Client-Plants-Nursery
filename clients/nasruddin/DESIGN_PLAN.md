# Nasaruldin Nursery Farm: website plan

Status: concept and research, 2026-11-22. This is a proposal for user approval before website implementation or a major visual change. The user requests a creative, polished, mobile-first site that feels distinct from the Abdul Jabbar website, can attract international interest, loads quickly, and can later evolve into an ecommerce store without a Shopify dependency.

## Business and evidence

- The user chose **Nasaruldin Nursery Farm** for the public website name. The provided screenshots also display Plant Verse Pakistan, Nasaruldin Nursery Farm & Landscape, `podayonline.pk`, and other logo variations; their legal relationship and the preferred final logo are not confirmed.
- The provided Instagram profile screenshot lists WhatsApp `+92 301 111 2227` and an address described as Main GT Road ByPass, Pattoki 55300. The Facebook screenshot also shows the number. Candidate link: `https://wa.me/923011112227`. Ask the owner to verify the number, address and actual enquiry recipient before use.
- Screenshots depict large shaped trees and topiary, palms, flowering plants, fruit plants, nursery rows, plant handling and landscaping imagery. Treat visual identifications as provisional; individual species and availability need verification.
- The screenshot of a TikTok profile contains `(1990)` and changing follower/like numbers. Do not infer a founding date, use audience counts as live figures, or publish ranking claims without verification.
- User-provided sources: [Instagram reels](https://www.instagram.com/podayonline.pk/reels/) and [Facebook photo album](https://www.facebook.com/media/set/?vanity=Plantversepakistan&set=a.122096391722548795). Both links could not be fetched by the research tool on 2026-11-22, so the current review is based on the supplied screenshots, not a verified full profile or album.
- A similarly named independent website appeared in search; its relationship to this business is unverified. Do not reuse its claims or assume domain ownership.
- International interest: the user wants to accommodate enquiries about overseas opportunities and orders/projects in Pakistan from visitors abroad, subject to confirmation. Do not claim overseas shipping, export permits, international service availability, payment options or delivery areas until the business confirms them.

## Design direction: living forms and nursery craft

The strongest differentiator in the reference material is the nursery's real sculptural plant work at human scale. Build the visual idea around that craft: confident photography of a single specimen, the people who shape and move it, and the wider nursery landscape. Let genuine plant forms provide the visual interest rather than generic decorative graphics.

- **Mobile first:** clear brand and compact navigation, readable copy, a prominent browsing action and a separate, unambiguous WhatsApp enquiry. Start with the phone layout and expand the composition for desktop.
- **Visual language:** a calm pale botanical ground, deep leaf-green text, a restrained bougainvillea-pink accent and natural photography. Proposed starting palette: `#F3F5EE` ground, `#173A2E` ink, `#A52F62` accent, `#D7E1D1` secondary ground and `#FFFFFF` for contrast. These are design hypotheses, not approved brand colors.
- **Typography:** explore a clear humanist sans such as Plus Jakarta Sans for navigation and reading, paired with a restrained editorial face such as Newsreader for selected headings. Check licensing, character coverage, contrast and self-hosting; do not install fonts until the direction is approved.
- **Composition:** asymmetrical on wider screens but grounded in a consistent grid; one large specimen image, followed by useful information. On phones, stack the narrative cleanly with no cramped rows. Avoid excessive decorative lines, oversized text, arrows, visible dash punctuation, hover underlines, generic gradient cards, and fabricated metrics.
- **Prototype before build:** produce a generated visual direction for review, then agree on the mobile and desktop layouts and image treatment. The mockup is illustrative and does not establish an actual product, nursery scene or final logo.

### Proposed homepage journey

1. A compact header and distinctive first view establish the nursery, with one carefully chosen real image and a clear plant-browsing action. Keep the contact route easy to reach.
2. A curated view of the actual collection, initially based on confirmed categories such as topiary, palms, flowering plants and fruit plants. The final taxonomy follows verified stock and user testing.
3. A full-width specimen story shows craft and scale. Use a real plant and truthful attributes only; no invented dimensions, prices or origin.
4. A concise landscaping section helps visitors distinguish a plant enquiry from a project enquiry.
5. A nursery story and evidence section uses owner-approved facts and genuine, permitted photography. Social proof appears only when verified and attributable.
6. A clear contact close offers WhatsApp and verified location details. International visitors can state their destination and requirements without the site promising export or fulfillment.

Secondary routes: a searchable collection directory, category pages, product detail pages, landscaping/project information and contact. Navigation labels, page order and final feature scope are subject to design approval and real client content.

### Customer journeys and interaction rules

- **Home gardener:** identify a plant or collection, see an accurate photo and relevant details, then ask availability and price on WhatsApp. Search and category browsing must remain available without opening a slider.
- **Wholesale buyer or nursery:** find the plant type and, if verified, available sizes and quantities, then enquire with the desired quantity and destination. Do not assert bulk stock or delivery terms that the owner has not confirmed.
- **Landscape client:** understand the services and view approved real project examples; send an enquiry containing the project location and a brief description. A visitor should understand whether they are browsing plants or asking for a service.
- **Visitor abroad:** see that enquiries are welcome, specify where the plants or work are needed, and receive an explicit human response on feasibility. A clear enquiry is not a promise that plants can cross borders.
- Use consistent labels and direct actions, visible focus and a clear response when filters have no results. Product prices and transport conditions, if verified and displayed, should be easy to find before a visitor commits to an enquiry. English can be the initial proposed language; Urdu and any other language need a deliberate, human-reviewed translation and proper right-to-left support if requested.

## Interaction and accessibility

- Use motion to reveal relationships and respond to touch: subtle movement of a featured specimen, a controlled image gallery, clear menu transitions and restrained section transitions. Movement should never delay access to the primary content or obstruct reading.
- Any slider must support touch, keyboard, visible controls, understandable state and pause where motion is automatic. Default to user-controlled movement. Respect reduced-motion preferences and offer usable static content. See [W3C carousel guidance](https://www.w3.org/WAI/tutorials/carousels/).
- Use accessible focus states, meaningful image alternatives, adequate contrast, comfortable touch targets, clear forms and no interaction that depends only on hover. Test with keyboard and screen readers as well as touch.
- The existing platform already includes GSAP. Evaluate CSS and existing GSAP first; consider [Anime.js](https://animejs.com/) or [Motion](https://motion.dev/) only if a specific approved interaction needs it and its cost is justified. Do not add an animation library merely for a visual effect.

## Image workflow

The 17 supplied files are preserved unchanged in `source-images/`. They are screenshots of feeds and profiles, not the underlying original photographs. Many contain multiple images, overlay text, prices, watermarks, user-interface controls, partial crops or low-resolution material. See IMAGE_INVENTORY.md.

1. Confirm the client has rights to use each chosen image and request the original camera files or uncropped exports where available.
2. Create an asset manifest mapping each selected image to its original, subject, permissions, edits, verified identification and destination. Preserve original filenames or stable IDs and hashes.
3. Review every screenshot and identify each usable image separately. Apply careful crop, orientation, exposure, color and responsive optimization to derived copies. Use AI-assisted reconstruction only with review; it may invent or alter plant structure and must not misrepresent the actual specimen, size, condition or stock. Do not quietly convert illustrative or heavily reconstructed images into evidence of inventory.
4. Keep original files outside `images/` and outside Git. Only approved optimized derivatives belong in the client `images/` folder for the site. Preserve provenance in the manifest; never overwrite originals.
5. Verify actual output dimensions, file size, decoding, crop, mobile focal point, alt text and on-page rendering. Prioritize the hero image and load below-the-fold media lazily. Some screenshots may be unsuitable for credible product images even after enhancement.

## Content and future commerce

For the first release, use a verified catalog and product details with a WhatsApp enquiry that includes the product name. Display prices, stock, plant dimensions, delivery terms, reviews and service claims only when supplied and approved. Clearly separate an enquiry from an actual order.

Keep stable product IDs, names, category, images, description, price/currency, availability and relevant plant attributes in structured client-owned data. Keep catalog rendering and the enquiry action separate from product data so a future ecommerce implementation can add inventory management, cart, payment, tax, fulfillment and order handling without rewriting the visual system. This is architectural preparation only: no checkout, payment provider, stock synchronization, backend or Shopify integration is currently promised. Before adding commerce, select the system and define security, payment, order, return, tax and shipping requirements with the client.

## Performance and release checks

- Aim for good Core Web Vitals, including LCP of 2.5 seconds or less at the 75th percentile on real visits, segmented by mobile and desktop. Lab checks are useful but do not prove field performance. See [web.dev LCP guidance](https://web.dev/articles/lcp).
- Prioritize image delivery and use responsive dimensions and formats. Avoid loading large videos or animation libraries before they are useful. Measure any new dependency and keep motion lightweight; see [web.dev animation guidance](https://web.dev/articles/animations-and-performance/).
- Before launch: validate every page and client link, metadata and sitemap, image integrity, mobile layout, reduced motion, keyboard operation, meaningful screen reader labels, cross-client isolation, international enquiry wording and real owner-approved content. Test on real devices and networks when available.
- Each client gets a separate Vercel project and domain pointing to the shared platform repository. The platform repository has not been pushed: the previous push was rejected by automatic review because it would expose the existing client's content in a public repository without explicit approval. Do not push or deploy as part of planning.

## Stages

1. Confirm the public brand, logo, content rights, audience and business facts. Prepare and approve the visual concept. `design-concepts/concept-01.png` is an exploratory AI-generated mockup; its plants, person, logo and written claims are illustrative, not evidence of the client's actual nursery or approved content. It is closer to a conventional nursery hero than the brief calls for and needs further design exploration before approval. A second concept generation attempt failed due to a connection error.
2. Inventory and review all supplied screenshots, obtain originals where possible, and prepare approved image derivatives with provenance.
3. Create this client's actual configuration and data in the platform. Design and implement reusable variants needed for the approved concept, without modifying the original live site.
4. Implement the mobile-first pages and interactions; compare desktop and mobile previews against the approved direction and check first-client regression and isolation.
5. Run functional, accessibility, responsive and performance checks; resolve findings; obtain content and design approval.
6. Only after separate authorization, address repository visibility and publication, then set up this client's own Vercel project and domain.

## Decisions still needed

Verified spelling and approved logo; exact business name/ownership of the social accounts; authorized original photos; plant identities and current inventory; confirmed prices, quantities and sizes; approved services, service areas and export capabilities; location/map, email and contact number; audience priorities, languages, domain and any real testimonials. A generated concept is not approval or evidence for any of these facts.
