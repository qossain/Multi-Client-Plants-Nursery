# Multi-client nursery platform

An Astro static-site platform for separate nursery clients. Work in this repository is isolated from the original Abdul Jabbar website; no production switch is implied. See [MULTI_CLIENT_PLAN.md](MULTI_CLIENT_PLAN.md) and [PROJECT_PROGRESS.md](PROJECT_PROGRESS.md) for status, safeguards and verification.

## Local setup

Use Node.js 22.23.4 or later and run `npm ci`. In PowerShell select a client before running the site:

```powershell
$env:CLIENT = 'abdul-jabbar'
npm run dev -- --port 4174
npm run build
npm run preview -- --port 4175
npm test
```

The client must exist and pass build-time validation. The static output is `dist`. On systems that block Astro's user configuration directory, set `ASTRO_TELEMETRY_DISABLED=1` and point `APPDATA` to a writable temporary folder for the build.

## New client

Run `npm run new-client` from the repository root and provide a lowercase slug, nursery name, international phone number, theme and layout. The script refuses to overwrite an existing folder. The new folder under `clients/<slug>/` contains configuration, an empty catalog, empty services and reviews, a neutral placeholder image and the locally hosted fonts.

Before publication, replace the placeholder domain and images, add approved products and prices, confirm all contact details, and review every visible section. The scaffold uses an `.example.invalid` domain for local work and does not supply verified inventory, reviews, awards or sales figures. Edit `config.json` to set client details, design keys, section selection and order; edit `products.json`, `services.json` and `reviews.json` for content; place that client's assets inside its `images/` folder. A client build publishes only that folder as its public assets. See `clients/abdul-jabbar` for the complete historical example, whose content caveats are recorded in AGENTS.md.

The five named themes and hero variants are provisional placeholders, not finalized Figma designs. Do not treat them as approved client designs. Consult the progress log for the checks performed and remaining client-specific verification.

## Structure and deployment

- `core/components`, `core/layouts`, `core/variants` and `core/themes`: shared code, page layout, design choices and theme variables. The variant manifest maps selection keys to files.
- `clients/<slug>`: client-owned configuration, product data, services, reviews and public assets.
- `src/pages`: Astro routes; `scripts`: client scaffolding, tests and the Vercel build filter.
- [VERCEL_SETUP.md](VERCEL_SETUP.md): separate project setup, conservative build filtering and migration safeguards.

No cart, checkout or payment is provided. Product enquiries open WhatsApp with a configured message and product name; they do not create verified sales records.
