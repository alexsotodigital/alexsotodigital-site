# Destraba tu sistema

Spanish campaign landing page at `/destraba/`. No form embedding, tracking,
client-side JavaScript, or additional dependencies.

## Content and source

- `content/destraba.js`: structured campaign content and source provenance.
- Source: [One Pager - Bases](https://docs.google.com/document/d/1nkdcvC4KR0DKwkFe9NOuS_oU-GeGH7yatXPUMslRZtI/edit), reviewed November 18, 2026.
- Alex explicitly confirmed: one preparation week from January 25, 2027;
  approximately eight active weeks from February 1; two to four closing weeks;
  approximately two hours of weekly participation throughout. This supersedes
  the source's conflicting reference to twelve active weeks. Alex will correct
  the source document separately.
- The build uses a deliberate local snapshot, not a live Google Docs fetch.
  Reconcile future approved source changes into `content/destraba.js`.
- Application dates and CTA availability are static. Review the page after
  December 31, 2026; it does not automatically close applications.

## Implementation

- `scripts/destraba-page.js`: Spanish HTML, metadata and structured data.
- `src/destraba.css`: scoped campaign styles, inlined only on this page.
- `src/assets/destraba-tu-sistema*.jpg`: two optimized sizes of the supplied
  artwork, bundled locally for IPFS. No external image dependency.
- `scripts/build.js`: generates the route and adds it to the sitemap.
- Internal links, favicon links and artwork paths are relative to the page,
  supporting both ENS and path-based IPFS gateways. Canonical and social URLs
  use the existing `SITE_URL` configuration.

## Local review

```sh
npm run build
npm run preview
```

Open `http://localhost:4173/destraba/`.

Check the hero, cards, timeline and final CTA at desktop, tablet and mobile
widths. Both application CTAs must point to
`https://forms.gle/t3otUqsazwaP6vc2A`. Do not submit a test application.

Verify the canonical, social image, JSON-LD and sitemap entry. Existing pages,
JSON endpoints and `llms.txt` should remain unchanged. Never edit or commit
generated `dist/` files.

## Publication boundary

The implementation is prepared locally on `codex/destraba-landing`.
Review and obtain explicit approval before pushing a deployment-triggering
branch, publishing to IPFS or updating ENS. No production settings, payment
records or GitHub Actions changes are part of this campaign.
