# Working Row: design revision for review

Status: proposed 2026-11-22. The user approved the Working Row direction, not this revision or implementation. Do not build until the user approves the revised design system and wireframes.

## Color

Keep tag-paper ground `#F2EEE4`, soil ink `#252922`, shade-net deep green `#253D31`, and hessian surface `#D5C7A7`. Hessian is a surface only; use dark text, never light text, on it.

Contrast ratios calculated from WCAG relative luminance against ground and deep green respectively: survey-tape orange `#B84B08` 4.48:1 / 2.26:1; tape pink `#B62D6D` 5.06:1 / 2.00:1; paint-marker blue `#3156A1` 6.09:1 / 1.66:1; previous red `#B83D46` 4.78:1 / 2.12:1. Select tape pink for actions on ground; use light pink `#FFB8D6` on deep green, 7.30:1. These colors are design interpretations of nursery marking materials, not sampled proof of this farm's tools. Do not round 4.48 up to 4.5. Verify every actual text, control and focus pair in the implementation.

State tokens for labels on ground: available `#286044` (6.37:1), limited `#875300` (5.55:1), next batch `#51489D` (6.56:1), error `#AD2733` (5.82:1), success `#286044` (6.37:1), focus ring `#3156A1` (6.09:1). For dark surfaces place these dark labels on a ground-colored chip; use `#FFB8D6` as the focus ring against deep green. Status uses written labels and shape/outline as well as color. These ratios do not establish contrast against photographs or every neighboring control surface.

## Type, language and motion

Fraunces variable for display: weight 600, optical size 72–144 according to rendered size, SOFT 30 and WONK 1 on a short large heading; use quieter settings for other headings and do not animate axes. Source Sans 3 for reading, controls and specifications; enable `font-variant-numeric: tabular-nums` for prices and measurements. Self-host licensed files and verify chosen subset sizes.

Google Fonts metadata lists no Arabic subset for Fraunces or Source Sans 3. If Urdu or Arabic is required, use a separately loaded appropriate Noto Arabic-script family, test actual Urdu glyph coverage and shaping, human translation, directional isolation for numbers and phone numbers, logical CSS and RTL behavior. Do not claim language support until tested.

The first eight seconds: an immediately visible, genuine wide row photograph resolves into a short vertical sequence of actual shaped specimens as the visitor scrolls. The images remain anchored in normal document flow, and a small specimen tag reveals verified details when tapped. No autoplay, scripted wheel hijack, fake scale marks or delaying entry. On weak phones, use scroll snap-free normal scrolling and optimized static images; optional composited transforms run only when supported and not reduced motion. Reduced motion uses the same images and content with no linked movement. Any visible measurement must be verified against that specimen.

## 360px structure and journeys

Top header with wordmark and menu, then a real nursery image, a short heading and one browse action. A compact question immediately after the opening scene asks: “How many plants are you looking for?” Options express one/few, a project quantity, and “Not sure yet.” Skipping leaves a complete neutral catalog and all information accessible. Selection changes the detail emphasis and WhatsApp copy, is reversible, and is never used to hide critical facts. Destination is requested only when the configured project-quantity threshold is reached; that threshold remains unset until the owner chooses it.

On mobile, one compact bottom bar has an item-list control with a count and a WhatsApp action. Reserve real page space and safe-area inset so it cannot cover content, menu, forms or focus. When the keyboard is visible or an overlay is open, move or hide the bar as needed. Empty list opens the general enquiry, not an automatic message send.

Garden wireframe: shared first view -> quantity question (single/few highlights care, size and confirmed price; skip is neutral) -> touch the topiary sequence and inspect a real specimen -> add plants and edit quantities -> ask about a space or enquire on WhatsApp -> confirmed pickup and local delivery facts when available -> footer.

Trade wireframe: shared first view -> quantity question (project emphasizes verified specs and quantity; skip is neutral) -> inspect the same row and real scale -> build a multi-plant quantity list and enter destination only at the configured threshold -> trade section requests details on destinations, handling and documents without claiming unverified capabilities -> one prefilled WhatsApp list -> verified project evidence if provided -> footer.

## Empty and unconfirmed data

Until the owner confirms stock, update time, response promise, shipping, documents and project claims, do not display values, fake badges, fictional examples or timestamps. A credible initial page uses approved farm photography, name, truthful descriptive copy and a clear enquiry: “Ask us about current plants and availability.” The trade section remains visible with a neutral enquiry; in internal previews, destinations, packing and documents are labeled “owner to confirm,” but those labels and unsupported assertions are absent from public output. If there are no verified product entries, use a curated farm gallery and enquiry instead of empty fabricated cards. Any submitted WhatsApp message remains editable and is never sent automatically.

## Config boundary

Proposed single per-client configuration/theme file contains distinct `theme`, `copy` and `business` groups. Theme holds palette roles, fonts and motion settings; copy holds translatable text; business holds identity, WhatsApp number and owner-confirmed fields, including stock status, last-updated and response promise with confirmation flags. One separate client-owned product file drives listings and the list. This keeps the requested business fields together while making reusable theme settings distinct from factual claims. Mechanisms remain unimplemented until approval.

## Entry, 404 and footer

Entry shows a real image and content immediately, without a splash screen; the memorable row responds to a normal scroll. Selectable text uses a light-pink selection background with dark ink, with measured contrast at implementation. The 404 says “We could not find that page,” offers “Explore plants” and a WhatsApp enquiry; it uses the same tag-paper ground and a real approved detail image only if available. The footer repeats the wordmark, useful navigation and verified contact/location facts, ending with a quiet crop of an approved nursery photograph. No invented testimonial, shipping promise, date or person is used.
