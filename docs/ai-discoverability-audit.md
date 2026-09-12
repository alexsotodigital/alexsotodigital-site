# AI Discoverability Audit

Inspected 2026-09-11, before this implementation. Scope: tracked source, generator, assets, deployment documentation and workflow, plus read-only production checks. The supplied brief ends mid-example in Phase 8; implement its complete requirements without assuming additional phases.

## Current Architecture

- Framework: none. `npm run build` runs the CommonJS Node generator in `scripts/build.js`. `content/site-data.js` is the content source; `src/styles.css` is inlined into each page. Content is static HTML, not dependent on client-side rendering. Only identity copy buttons need JavaScript.
- Shared head: `layout()`, `pageMeta()` and `pageMetadata` generate title, description, canonical, OpenGraph, Twitter, favicon and JSON-LD tags. `SITE_URL` defaults to the ENS gateway. The visible title is Governance & Coordination Specialist; name and handle are already distinct.
- Structured data: Person, ProfessionalService, WebSite, FAQPage, a writing ItemList of CreativeWork records, and Service offers on Work with Me. Identity descriptions and topic lists are repeated in the generator rather than drawn from one entity definition. ProfessionalService currently carries Service-specific properties; model the independent consulting offer as Service with Alex as its Person provider.
- Discovery: navigation plus anchored record links connect methods, services, projects, articles and experience. `pageRoutes()` drives sitemap generation; robots permits crawling locally. `/about/` is explicitly added outside navigation.
- Machine outputs: `llms.txt`, `about.json`, `services.json`, `projects.json`, `experience.json`, `faq.json`, `links.json`, `payments.json`. No RSS/Atom feed, article pages, page Markdown equivalents, `methods.json` or `agent.json`. `llms.txt` is Markdown-like text, not a full representation of every page.
- Writing: titles, summaries, themes, publication links and evidence associations exist. Dates are not consistently structured, and CreativeWork has no author. Do not invent dates or mirror external essays. The six local Substack migrations are pre-existing uncommitted changes and must survive this work.
- Baseline local build passes. Working tree starts with only `content/site-data.js` and `scripts/build.js` modified by that migration.

## Production Snapshot

The [live homepage](https://alexsotodigital.eth.limo/) and direct requests to `llms.txt` and `sitemap.xml` show an older release: publication links still use Paragraph and the listed routes omit the local `/hire/` page. This is deployment drift, not evidence that the current local build is missing those features. No current CID was independently resolved during this audit.

Direct `curl` retrieved `llms.txt` successfully (HTTP 200), although the research browser could not open that endpoint. Production `robots.txt` returned gateway-level exclusions for `/wiki/`, `/Wiki/` and `/I/`, rather than the generator's robots file with its sitemap directive. The requested professional pages are not excluded, but gateway responses must be checked again after a future release. Do not claim local edits are live.

## Issues and Priorities

P0 means a discovery/classification weakness, not necessarily a crawl outage. P1 is a meaningful semantic improvement. P2 is an optional enhancement.

| Priority | Current state | Why it matters | Proposed change | Affected files/pages |
| --- | --- | --- | --- | --- |
| P0 | Bios, Person data, homepage metadata and `llms.txt` describe a narrower governance/Web3 practice; location and languages are missing in Person data. | A reader cannot reliably classify the broader consulting practice from the first page or entity record. | Define one canonical classification, mode, service area, audiences and semantic distinctions; preserve the visible specialist title. Derive bios and metadata from it. | `content/site-data.js`, `scripts/build.js`; `/`, `/about/`, `/hire/`, `about.json`, JSON-LD, `llms.txt` |
| P0 | Local and live content differ; gateway robots differs from build output. | Local improvements do not establish live discoverability. | Record the gap; later verify released CID, gateway HTML and discovery files before a separately approved ENS update. | This audit; future release verification, no deployment change now |
| P1 | Homepage introduces abstract thesis and repeated identity copy before concrete problems. | The first 500 words do not clearly explain scope, symptoms, intervention and engagement. | Replace repetition with a short category/location introduction, concrete symptoms and changes to organizational practice. | `/`, site content and generator |
| P1 | Services expose problem/outcome/format but no explicit category, intervention or deliverable. | Agents cannot map buyer problems to a specific offer without inference. | Add five problem-led situations referencing existing service IDs, plus structured service categories, interventions and deliverables. Reuse them in HTML and JSON. | `/work-with-me/`, `services.json`, JSON-LD, site content |
| P1 | No substantive organizational-development explanation or semantic bridges. | Culture, design, effectiveness and governance appear unrelated or absent. | Add one evergreen `/organizational-development/` page with six linked concept sections, scope, methods and evidence. Defer three separate bridge pages to avoid thin content. | New route, sitemap, contextual links, `about.json`, `llms.txt` |
| P1 | Experience describes activities but does not explicitly explain their organizational relevance. | Broader capabilities are buried beneath job labels and Web3 contexts. | Add narrowly supported capability labels and explanations; retain role types, dates, original summaries and experimental status. Treat missing external corroboration honestly. | `/experience/`, `experience.json`, selected experience renderings |
| P1 | Methods include summary/output/evidence, but not when or why to use them. Some related service IDs do not exist. | Agents and humans cannot match symptoms to a method; stale IDs weaken the evidence graph. | Add useful-when, dimension and symptom fields; preserve outputs and connect only to existing records. Expose the same fields through current machine entry points. | `/methods/`, site content, `about.json`, `llms.txt` |
| P1 | Structured data repeats person descriptions; writing omits authorship; consulting entity uses mismatched properties. | Machine consumers get incomplete or inconsistent entity relationships. | Reuse canonical Person data across page graphs, connect writing author and Service provider with stable IDs, and use supported Service properties for category/output. | `jsonLdForPage()` and generated HTML |
| P2 | No feed or page Markdown exports; incomplete structured publication dates. | Additional reading channels might help some consumers, but are not a substitute for substantive HTML. | Defer RSS, Markdown exports, `agent.json` and extra category pages until a consumer need and reliable dates exist. | No implementation now |

## Editorial Boundaries

Organizational development is an umbrella classification, not a new credential or a replacement for Governance & Coordination Specialist. Describe outcomes as engagement aims, never guaranteed results. Psychological safety is an organizational condition for raising concerns, not a clinical claim or certified specialty. Existing roles and activities support capability explanations; they do not prove measured client outcomes. Matriz remains an ongoing laboratory.

Use [Schema.org Person](https://schema.org/Person) for the individual and [Schema.org Service](https://schema.org/Service) for consulting categories, provider and outputs. These describe the content; they do not guarantee search rankings or AI recommendations.

## Implementation Direction

Keep the static generator and existing visual system. Put new editorial definitions and associations in `content/site-data.js`, render them through `scripts/build.js`, and add only the substantive OD route. Build and check HTML, graph relationships, existing endpoint compatibility, mobile/desktop rendering, protected output hashes and the pre-existing Substack changes. No dependency installation, publishing, CI changes or ENS writes are needed for this local implementation.

## Implemented Locally

- Added `site.professionalClassification`, `mode`, `serviceArea` and `workingContext`; derive the short bio from that definition. The visible specialist title, name and handles remain unchanged.
- Added `practice` with categories, five buyer situations, interventions, intended outcomes, six related concepts and the OD page content. Homepage copy introduces this context before its existing practice and writing sections. Work with Me maps situations to the original five services.
- Added `/organizational-development/` with contextual links from Home, Work with Me, Methods, Experience and About. Organization Design, Organizational Effectiveness and Organizational Culture are substantive sections of that page, not separate thin pages. Sitemap and `llms.txt` include the new route.
- Added category/intervention/deliverable fields to services, four method descriptions with usage criteria, and capability explanations for Covive, Sociocracia Practica, Ouitopia, Matriz and independent practice. Original experience summaries, roles, dates and status are preserved. Fixed two method associations that referenced nonexistent service IDs.
- `about.json` now exposes the canonical classification plus `practice.concepts`, `practice.problems`, `practice.methods` and evidence associations. `services.json` retains its array shape and adds fields and problem relationships. `experience.json` retains its grouped shape and carries the capability explanations. No new JSON endpoints are necessary.
- JSON-LD uses one consistent Person definition and linked WebPage/WebSite records, a Service with Alex as provider for the consulting offer, and explicit article authorship. This corrects the previous mismatch between ProfessionalService and Service-specific properties.

## Verification Results

- `npm run build`: passes; 11 HTML pages and seven JSON endpoints generated. `site.webmanifest`, sitemap XML and all JSON-LD scripts parse.
- All 11 HTML routes, seven JSON endpoints, `llms.txt`, `sitemap.xml` and `robots.txt` returned HTTP 200 from the local preview: 21 resources in total.
- Parsed all generated HTML to verify canonical URLs, inline CSS, unique IDs and internal links/anchors. Person descriptions agree with `about.json` on every page. All method/service/evidence and concept references resolve to existing records.
- Homepage's first 500 words include classification, audiences, concrete symptoms, changes to working practices, intended outcomes, the research/facilitation approach, location/languages and the engagement route.
- In-app browser inspection: all 11 pages render with the avatar loaded and no horizontal overflow at desktop (1280px) and mobile (390px). Screenshots reviewed for Home, Work with Me, OD and Methods. No CSS changes were needed. Direct headless Chrome launch was unavailable in the execution sandbox; browser verification used the in-app browser instead.
- Compared against the pre-change local baseline: article records and Substack URLs, project records, original experience fields, visible specialist title, `links.json`, `payments.json`, stylesheet and GitHub Actions workflow are unchanged. No files in `dist/` are tracked. `git diff --check` passes.

## Remaining Work

Review the local editorial changes before a separate release. Nothing in this task was committed, pushed, uploaded to IPFS or written to ENS. Live indexing, gateway responses and AI retrieval behavior still need assessment after publication; local validation does not establish those outcomes. RSS, full-page Markdown and additional category pages remain deferred.
