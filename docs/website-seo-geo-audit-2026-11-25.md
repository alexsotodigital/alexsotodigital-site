# SEO, GEO and AI Discoverability Audit

Date: 2026-11-25

## Scope

This audit covers the static source, generated outputs, structured data, machine-readable endpoints, internal links, sitemap and diagnostic privacy boundary. It does not claim that a search engine has indexed the site, that rich results will be shown, or that any generative system will cite it.

## Findings

### Identity and positioning

- The canonical visible identity is **Alex Soto**.
- The primary professional classification is **Organizational Strategist & Coordination Specialist**.
- The homepage and About page state the practical positioning: helping capable teams identify what blocks execution and redesign the minimum coordination structures needed to act.
- Governance and Web3 remain evidence and context, rather than the sole identity.
- About is the strongest profile page and is represented as a Schema.org `ProfilePage` with a stable Person `@id`.

### Metadata

- Every generated HTML page has a title, description, canonical URL when `SITE_URL` is configured, Open Graph metadata, Twitter metadata and inline CSS.
- Experience, Projects, Methods, Writing and About metadata was aligned with the current organizational strategy and coordination language. The older service names were not reintroduced.
- Metadata is descriptive, not a guarantee of rankings or search appearance.

### Structured data

- A stable Person node is reused across pages.
- About and Identity expose `ProfilePage` markup with the Person as `mainEntity`.
- Home and hiring pages expose the professional Service and scoped offer information already present in the source model.
- Writing exposes an ItemList of CreativeWork records pointing to the canonical Substack publications.
- FAQ exposes visible questions and answers as `FAQPage` data.
- `sameAs` is now limited to stable, intentional identity destinations: LinkedIn, Substack, YouTube, X, GitHub and ENS. Secondary social profiles remain available through the Identity page and `links.json` but are not asserted as primary identity equivalences.

### Crawlability and machine readability

- `robots.txt` allows crawling and points to the configured sitemap.
- `sitemap.xml` includes the public HTML routes, including the private-by-design diagnostic landing page but not private diagnostic results.
- `llms.txt` identifies Alex, the practice, services, hiring paths, pricing references, diagnostic privacy boundary and machine-readable endpoints.
- `about.json`, `services.json`, `projects.json`, `experience.json`, `faq.json`, `links.json` and `payments.json` remain generated from the structured source of truth.

### Privacy and safety

- Diagnostic answers remain browser-memory-only. No public results route, analytics submission or answer endpoint was added.
- Payment data was not changed.
- No hidden AI-only copy, fabricated credentials, client outcomes or freshness dates were added.

## Deferred items

- Do not add `lastmod` values without a truthful content-change policy.
- Do not add more schema types merely to increase markup volume; validate any future additions against visible content and the official Schema.org vocabulary.
- Search Console, Bing Webmaster Tools and Rich Results Test checks require Alex to run them with the relevant accounts or URLs. Local validation cannot prove indexing, eligibility or ranking.
- A future `methods.json` could improve service discovery, but the existing service catalog and `about.json` already expose the current method data; it is not necessary for this audit.

## Verification target

Run `npm test` after changes. Review local generated HTML and JSON, then publish through the existing GitHub Actions/IPFS workflow only when Alex chooses to do so. ENS contenthash updates remain manual and require explicit approval after the new CID has been verified.
