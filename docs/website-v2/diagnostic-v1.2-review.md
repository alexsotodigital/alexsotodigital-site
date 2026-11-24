# Diagnostic v1.2 implementation review

Date: 2026-11-23. Local implementation only; no commit, push, deployment or ENS update.

## UX changes

The v1.1 flow exposed 43 core questions, a section index and seven dimensions to every respondent. v1.2 starts with the presenting problem and asks four relevant probes. General Screening is reserved for J/K. The optional example neither affects confidence nor enters scoring.

The diagnostic now uses a dedicated centered layout instead of the site's sidebars. It retains the PFP, palette, typography and decorative garden footer. Intro and expandable methodology use the approved copy. One question appears at a time, with large native radio/checkbox labels, Back/Continue, required-answer feedback and staged progress rather than a misleading fixed total. There is no future-section picker.

Back preserves answers on the active route. Changing a branch discards inactive branch and founder answers; changing screening answers discards inactive deepening probes. Refresh and page exit clear local progress. No new dependencies or framework were added.

## Branches and actual counts

Counts below exclude the optional concrete example. The specification's listed normal sequence totals 12 closed questions, not 11; Alex approved retaining all questions. Nine of those questions have numeric scores; role, presenting problem and safety inform routing rather than a numeric total.

| Branch | Required closed questions | Browser scenario / result |
| --- | ---: | --- |
| A Decisions | 12 | Low consequence, strong self-correction: no-external-intervention |
| B Dependency | 12 | Material consequence, ready: targeted-coordination-intervention |
| C Agreements | 12 | Accountability emerges: self-guided-improvement |
| D Responsibilities | 12 | Exact branch/count covered in unit tests |
| E Handoffs | 12 | Bounded interface friction: self-guided-improvement |
| F Overload | 12 | Capacity with weak assessed structural signals: internal-capacity-action |
| G Information | 12 | Exact branch/count covered in unit tests |
| H Repeated problems | 12 | Material consequence, low readiness: not-ready |
| I Raising concerns | 12 | Exact branch/count covered in unit tests |
| J/K Screening, none qualify | 15 | Count and selection covered in unit tests |
| J/K Screening, one qualifies | 16 | One supplied deepening probe; unit tested |
| J/K Screening, two qualify | 17 | J completed in browser; broad route with three likely mechanisms |
| A with safety uncertainty | 12 | specialist-or-human-review |
| B founder, multiple founders | 15 | founding-agreements |

Eligible founders receive F0 (+1); Yes adds F1/F2 (+2). No skips the two statements. This applies to A/B/C/D/K, not every founder respondent. Add one optional question if the example is used. General Screening always assesses all seven core dimensions; normal branches retain not_assessed for dimensions outside their route.

## Diagnostic logic

- probes.mjs holds the exact source text and dimension mapping for A-I, screening and deepening.
- config.mjs holds version, core questions, scales, thresholds, severity matrix, practices and adaptive path selection.
- scoring.mjs calculates unweighted means only for answered active probes. All probes point toward friction; there is no reverse scoring or organizational health total.
- routing.mjs implements ordered, conservative recommendations. Safety overrides every other route. Missing required information cannot produce a healthy or paid recommendation.
- results.mjs produces deterministic result copy and a sanitized v1.2 summary. The free-text reflection is never accessed by the scorer.
- ui.mjs manages the sequential interaction and explicit clipboard action. No external LLM is used.

Approved corrections: readiness <2 is low, >=2 and <3 moderate, >=3 high; a sole qualifying screening dimension receives its single supplied probe; complete low-consequence/no-likely-mechanism cases with strong/moderate self-correction can avoid external intervention before the low-confidence fallback.

Additional conservative interpretations under Alex's authorization:

- Screening ties retain the canonical dimension order. No additional tie-breaker questions.
- Confidence defaults to medium. High requires at least two primary probes, both at least likely, spread at most one point, founder/executive/operations vantage and no unsure readiness answer. High never means a validated whole-organization assessment.
- A spread of at least three points within a dimension is treated as mixed evidence, not proof of error. Missing answers, no likely mechanism or both readiness answers unsure also lower confidence. Contradictory/uncertain cases do not recommend paid work.
- Secondary patterns are limited to the next highest likely dimension in the selected branch. Ties follow dimension order; no new closeness threshold or extra questions.
- Founding friction follows the source's either-item >=3 rule, even when the average is lower. Centrality requires A/B/C/D, or K with likely authority/accountability evidence. No extra centrality question is added.
- Capacity-only routing requires capacity to lead and other assessed structural scores to be below possible (1.5), on F or General Screening.
- A No on either authority or leadership readiness prevents a standard paid recommendation.
- Broader work can be proposed only from General Screening with at least three likely mechanisms, material/high consequence and adequate readiness. The specification mentions a transition-context alternative but supplies no such context question: no context is invented, inferred from text or retained from v1.1.
- Route identifiers use hyphens consistently, as in the specification's JSON example. The result includes primary/secondary, supported composites, assessed dimensions, levels, severity, self-correction, readiness, confidence, route and practice; no raw responses.

## Privacy verification

Completed browser flows on the local QA server with an injected test-only observer (not shipped in dist). Inspected resource URLs, network-call attempts, browser storage keys, cookies, IndexedDB database names, page URL and console errors.

Observed no requests after the first response in the inspected completed flows, no fetch/XHR/beacon attempts, empty localStorage/sessionStorage/IndexedDB lists, no cookies and no result-bearing URL parameters/fragments. Initial requests were only local static assets. With no outgoing answer requests, no request body carried answers in these runs.

Entered a distinctive dummy example, completed the diagnostic and explicitly clicked Copy machine-readable summary. The copied JSON parsed, reported version 1.2 and excluded that example. A separate audit recorded zero explicit copy clicks before copying and one afterward. Source inspection confirms the clipboard API is only called inside that button handler. Refresh returned to the intro with no retained controls/result.

The production route retains connect-src 'none', form-action 'none' and no-referrer. Static code checks reject storage/network APIs in production diagnostic modules. QA instrumentation is excluded from dist.

Limits: this verifies the exercised browser flows and application code, not all browsers, extensions or compromised devices. A user who copies a result controls where it is pasted. Diagnostic validity is experimental, not scientific or clinical validation.

## Validation

- npm test: build and 63 Node tests passed; 13 HTML pages and 718 local links/assets passed.
- Nine requested scenario classes were completed in the browser; additional threshold, severity matrix, source-text, privacy, invalid-input and branch-pruning cases are unit tested.
- Browser keyboard selection, missing-answer feedback, focus movement, optional-example skipping, Back/branch change, refresh and clipboard were checked.
- Desktop 1440px, mobile 390px and narrow mobile 320px reviewed without horizontal overflow. Images loaded. No browser console errors/warnings in the tested flows.
- payments.json remains identical to its baseline SHA-256. No changes to prices, wallet records, ENS, GitHub Actions or global visual styles. dist remains untracked.
- Screenshots: /tmp/diagnostic-v12-desktop.jpg and /tmp/diagnostic-v12-mobile.jpg.

## Files changed for this update

src/diagnostic/config.mjs, probes.mjs, scoring.mjs, routing.mjs, results.mjs, ui.mjs, styles.css; scripts/diagnostic-page.js; scripts/build.js (dedicated layout and derived public version); tests/diagnostic.test.mjs, site.test.cjs, browser-audit.js; this review and the canonical v1.2 specification. Earlier uncommitted website-v2 changes remain intact.

## Deferred

No deployment has been performed. Real-user completion time and diagnostic calibration have not been measured; five minutes is the specification's target, not a measured guarantee. A comprehensive assistive-technology audit was not performed. No agent-only flow was added because v1.2 does not require one.

## Review

Run npm test for regression checks and npm run preview for local review at http://localhost:4173/diagnostic/. Publication and ENS changes remain separate from this local update.
