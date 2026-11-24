# Website v2 implementation review

Diagnostic update: the v1.1 diagnostic details below are a historical implementation record. The current diagnostic is v1.2; see [diagnostic-v1.2-review.md](diagnostic-v1.2-review.md) and its canonical specification for current rules and verification.

## Audit and migration plan (2026-11-23)

The starting checkout is clean on main. A dependency-free CommonJS build generates 12 HTML routes from content/site-data.js and the separate Destraba campaign data. Existing pages use inline CSS, local pixel-garden assets, favicons, canonical metadata, Person/WebSite/WebPage JSON-LD, sitemap.xml, robots.txt and llms.txt. Seven public JSON endpoints expose profile, services, experience, projects, FAQ, links and payment information. There is no diagnostic, response storage or analytics. Email has mailto/Gmail/copy fallbacks; scheduling already uses the approved Google Calendar URL.

The previous positioning leads with governance; five service records, a separate hiring list, hourly facilitation pricing, FAQ and templates repeat parts of the offer. Service relationships use stable IDs across methods, writing and problem records. Navigation and assets include root-absolute paths, with relative favicons; preserve compatibility when adding the diagnostic. No redirect infrastructure exists. GitHub Actions deploys pushes to main to Pinata; ENS remains a separate human action.

Migration:

1. Preserve existing pages, experience, personal narrative, social/Substack links, garden, payments and Destraba.
2. Replace duplicate offer/pricing content with a canonical commercial configuration and four reusable paid service records. Keep historical service fragment aliases.
3. Update homepage, Work With Me, Hire, About, Methods, FAQ and generated metadata from those records. Publish catalog manifests without implying a standard or autonomous procurement.
4. Add /diagnostic/ with static questions, browser-memory-only answers, separate deterministic scoring/routing/result modules, no external runtime dependency and a sanitized copy action.
5. Validate build, evidence/link integrity, prices, JSON-LD, routing boundaries, browser network/persistence, keyboard behavior and responsive layout. Do not commit, push, publish or update ENS in this implementation.

## Sources

The five supplied specifications are preserved beside this report. Precedence follows the implementation brief: commercial/privacy configuration, diagnostic logic, editorial messaging, then agent-readiness architecture. The canonical research URL was supplied separately by Alex: https://alexsotodigital.substack.com/p/what-breaks-when-teams-try-to-coordinate.

## Interpretation boundaries

The diagnostic is experimental, not validated measurement. Exact operational thresholds absent from the source specification will be documented here and tested. No legal, clinical or safeguarding conclusions may be inferred. Open text must not be interpreted by the engine or included in exported results.

## Implemented

- Messaging: the canonical role is Organizational Strategist & Coordination Specialist. Home, Work With Me, Hire, About, Methods, FAQ and generated metadata now describe coordination problems, observable outcomes and proportionate interventions. Existing personal narrative, experience, projects, garden styling and campaign remain in place.
- Commercial source: content/commercial.js owns pricing and approval/privacy policy; content/services.js owns the four paid service records. Prices are USD per engagement, not hourly: Review 2,000-5,000 (reference 3,500); Reset 4,800-10,000 (8,000); Strategy & Design 6,400-15,000 (12,000); Facilitation 1,200-3,000 (2,000). Final scope and commercial commitments require human approval.
- Diagnostic: /diagnostic/ contains the 43 core questions and five conditional founding statements. Configuration, scoring, routing, results and UI are separate dependency-free modules. Safety recommendations precede the mechanism profile. Incomplete responses are not presented as healthy results.
- Research: the supplied What Breaks When Teams Try to Coordinate? URL is included as featured writing. Existing publication destinations are retained.
- Agent readiness: /services.json remains available; /services/index.json and four individual service manifests add pricing, fit, exclusions, inputs, deliverables, responsibilities and approval boundaries. These are site-owned schemas, not claims of MCP/A2A compatibility or autonomous purchasing.
- Discovery: navigation, llms.txt, sitemap and structured metadata include the diagnostic and service discovery paths. No private diagnostic result route is generated.

## Operational interpretations to review

These are explicit implementation heuristics, not empirically calibrated thresholds:

- Self-correction is the mean of reversed adaptation friction, reversed Q34 and the Q35 evidence scale. Scores at least 3 are strong, at least 2 moderate, otherwise weak. Missing evidence yields unknown.
- Confidence is low if core information is missing, fewer than 90% of active structured questions are answered, at least three uncertainty signals occur, or at least two contradiction flags occur. One contradiction, any uncertainty, incomplete context or a partial organizational vantage caps confidence at medium.
- A separate structured check asks whether a concrete example is in mind. Without confirmation, confidence is low. Written examples remain optional and are never inspected by the scoring engine.
- The founding module requires a founder/partner role, multiple founders and a relevant founding issue. Organization size alone does not activate it.
- Q41 uncertainty triggers human review, as do the other safety options except None. This overrides incomplete information and commercial routing.
- Capacity-only routing requires high capacity friction with all other mechanisms below material. Self-guided routing requires one or two active mechanisms, no high mechanism, low/moderate consequence and adequate readiness. Ambiguous combinations fall back to clarification rather than automatically recommending paid work.
- Dominance requires a difference of at least 0.35 between the leading mechanisms. Dimension means use three equally weighted items; no overall organizational health score is shown.

## Verification completed (2026-11-23)

- npm test passed: build, 56 Node tests, 13 HTML pages and 731 local links/assets checked with zero errors.
- JSON and JSON-LD parse; canonical metadata, one H1 per page, inline CSS, evidence references, historical service anchors and pricing consistency pass regression tests.
- All 13 pages were inspected at 320px with no horizontal overflow and loaded images. Principal pages also passed at 1440px. Desktop homepage screenshot: /tmp/alex-website-v2-home.jpg.
- Browser scenarios exercised conditional founding questions, no-external-intervention results, safety override, incomplete responses, copying a sanitized summary and refresh clearing answers. Browser console checks returned no errors or warnings.
- A test-only local audit observed no answer-bearing network requests, no local/session storage entries, no cookies and no diagnostic answers in URLs. Static asset requests still occur. Copied output excludes raw answers and written notes.
- Diagnostic CSP blocks connections and form submission. Browser answers live only in page memory; this does not protect against compromised devices or browser extensions.
- payments.json remains byte-for-byte unchanged against the baseline SHA-256 regression check. No payment page, wallet change, ENS change, workflow change or runtime dependency was introduced.

## Changed file groups

- content/site-data.js, content/commercial.js, content/services.js: canonical editorial and service data.
- scripts/build.js, scripts/practice-pages.js, scripts/diagnostic-page.js: static page and endpoint generation.
- src/diagnostic/: local diagnostic configuration, logic, interface and scoped styles.
- package.json and tests/: reproducible tests; audit_server.py/browser-audit.js are local QA tools, not production output.
- docs/website-v2/: supplied specifications and this implementation report.

## Deferred and limitations

No commit, push, new CID, deployment or ENS update was performed. dist/ is generated output and must remain untracked. GitHub Actions and wallet/payment records were not edited.

The diagnostic needs user testing and calibration; deterministic test success does not validate its organizational judgments. Native labels and responsive behavior were checked, but this was not a comprehensive WCAG or assistive-technology audit. Technical discoverability is improved; search indexing, LLM retrieval, ranking and recommendation cannot be guaranteed. No backend, accounts, response collection, autonomous contracting or new analytics were added.

## Review and publication workflow

Run npm test, then npm run preview and inspect the homepage, /work-with-me/, /hire/ and /diagnostic/. Review the operational heuristics and public commercial language before committing. A later approved push to main can generate a Pinata CID through the existing workflow. Verify that CID separately before any explicitly approved manual ENS update.
