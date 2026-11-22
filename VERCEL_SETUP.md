# Separate Vercel projects

These instructions apply to the new multi-client repository. Do not connect or alter the existing Abdul Jabbar production project without a separate approved migration and rollback plan. The concept themes and heroes are provisional and require client design approval.

## One project per client

1. Create a separate Vercel project for the client and import the multi-client GitHub repository. Set the root directory to `./`, choose the Astro preset, set the build command to `npm run build`, and set the output directory to `dist`.
2. Add the project environment variable `CLIENT` with the exact matching client folder slug. Set it in every Vercel environment that should build that client. Each project must use its own value.
3. Set the project's Ignored Build Step to `node scripts/ignore-build.mjs`. The script uses `CLIENT` and `VERCEL_GIT_PREVIOUS_SHA` to compare changes. It skips only when every changed file is inside another client folder. Shared files, this client's files, missing history, an unavailable previous SHA, a non-ancestor commit, and ambiguous or empty diffs cause a build. Vercel uses exit code 0 to skip and nonzero to build.
4. Deploy a preview and inspect its domain, canonical metadata, sitemap, content, image assets, navigation and WhatsApp order links. Verify that no other client's details appear.
5. Set the actual domain in the client's `config.json`, verify the intended deployment, then configure its custom domain in that client's Vercel project. Follow Vercel's DNS instructions and check the domain and TLS certificate after propagation. Do not use the scaffold's `.example.invalid` placeholder as a production domain.

On the first deployment or when history is unavailable, the script deliberately builds. Changes to `core`, `src`, `scripts`, root build configuration, dependencies or shared assets also build all projects. Client environment variables and domains are managed separately in each Vercel project; changing only an environment variable may require an explicit redeployment. Check the settings and actual preview behavior before trusting the filter in production.

Vercel documentation: [Ignored Build Step](https://vercel.com/kb/guide/how-do-i-use-the-ignored-build-step-field-on-vercel) and [project settings](https://vercel.com/docs/project-configuration/project-settings).

## Existing client migration

Before migrating an existing site, identify the current production deployment, connected Git repository and branch, domain/DNS configuration, and an available rollback target. Compare a preview against the existing site and obtain explicit approval. After any approved switch, verify the site and keep the rollback path available. A successful local build does not prove a live deployment or DNS migration succeeded.
