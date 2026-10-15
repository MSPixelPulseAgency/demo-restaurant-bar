# Aurelia hostname migration

Prepared on a task branch; this file does not indicate a completed domain cutover.

The existing approved design, routes, assets, demo forms, content and Git history stay in this repository. The canonical destination for the approved migration is `https://bar.mspixelpulse.com`. RouteMetadata changes only document metadata.

## Release sequence

1. Obtain the owner’s explicit approval for the hostname cutover and Namecheap DNS edits.
2. Add `bar.mspixelpulse.com` to the existing Vercel project `demo-restaurant-bar` (`prj_dDLFhW8OTbzuLNsyJMIcHC3RCYCQ`). Preserve `restaurant.mspixelpulse.com` and `aurelia-restaurant-bar.vercel.app`.
3. Create only the required `bar` DNS record at the authoritative Namecheap zone, using the current target returned by Vercel. Do not replace the zone or edit mail records.
4. Wait for DNS and HTTPS. Test home, menu, booking, gallery, contact, blog, PDFs, imagery, mobile menu and forms at bar. Compare representative screenshots to the baseline.
5. Release this metadata-only branch on the existing project. Verify route canonical and sitemap origin is bar.
6. Only after SAVORA is verified on its own staging deployment, detach `restaurant.mspixelpulse.com` from this project and attach it to the NEW storefront project. Use the exact current Vercel recommended DNS target. Keep the Aurelia fallback alias.
7. Update agency and Aurelion records by their stable IDs without changing leads, draft attachments, approvals or sent outreach history. Never broadly redirect the reused restaurant hostname to bar.

## Rollback

Baseline: commit `091a489fced64f2b57ae595701e9939088a1e835`, production deployment `dpl_2uwY31NcsEjHQijLMJHCxbCh9pS2`. The immutable fallback `https://aurelia-restaurant-bar.vercel.app` must remain attached.

If Aurelia fails at bar before restaurant is moved, leave restaurant on Aurelia and restore its preceding deployment. If the new storefront fails after cutover, detach restaurant from the NEW project and reattach it to Aurelia, restoring the recorded DNS target when needed. Roll back the metadata-only deployment so canonical points at the restored public hostname. Preserve both application databases and all new demo orders; a domain rollback must never drop data.
