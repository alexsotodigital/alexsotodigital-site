# alexsotodigital — GEO & Agent Readiness Specification

## Objective

Build alexsotodigital as a website that is:

1. human-readable;
2. search-readable;
3. AI-discoverable;
4. AI-evaluable;
5. increasingly AI-procurable;
6. increasingly AI-supervisable.

The implementation should remain protocol-agnostic today while preparing semantic structure for future agent interoperability.

Do not optimize for speculative GEO tricks.

Prioritize:

- useful original content;
- crawlability;
- entity consistency;
- semantic clarity;
- inspectable evidence;
- explicit services;
- structured outputs;
- privacy;
- accessibility;
- machine-readable metadata where useful.

---

## 1. Canonical entity

Establish one consistent entity for:

**Alex Soto / alexsotodigital**

Core attributes:

- full name;
- professional identity;
- canonical website;
- short description;
- long description;
- languages;
- areas of expertise;
- verified profile links;
- publications;
- relevant experience.

Use valid structured data where appropriate.

Potential concepts include:

- `Person`;
- `ProfilePage`;
- `Article`;
- `BreadcrumbList`;
- `WebSite`;
- `WebPage`.

Structured data must reflect visible factual content.

Do not invent unsupported claims.

---

## 2. Semantic architecture

Each page should have one primary purpose and remain understandable when retrieved independently.

Expected architecture should build from the existing site, not replace it unnecessarily.

Core routes may include:

- `/`
- `/about/`
- `/work-with-me/`
- `/organizational-development/`
- `/methods/`
- `/experience/`
- `/writing/`
- diagnostic route determined from existing architecture

Potential future problem pages:

- `/decision-making-authority/`
- `/accountability-execution/`
- `/founder-dependency/`
- `/cross-team-coordination/`
- `/organizational-learning/`

Do not create thin or duplicative pages merely to target queries.

---

## 3. Content retrievability

Important content should exist in normal crawlable HTML.

Avoid relying on:

- images for essential text;
- hidden AI-specific content;
- keyword stuffing;
- duplicated machine-only pages;
- client-side rendering where it unnecessarily prevents indexing.

Use:

- descriptive headings;
- clear paragraphs;
- meaningful internal links;
- explicit titles;
- useful metadata;
- appropriate alt text.

A retrieved section should generally remain understandable outside its full page.

---

## 4. Evidence graph

Connect major professional claims to supporting evidence.

Examples:

`organizational coordination expertise`
→ research
→ methods
→ relevant experience

`distributed governance`
→ relevant governance experience

`organizational development`
→ engagements / methods

`research into coordination failures`
→ *What Breaks When Teams Try to Coordinate?*

Expertise should be inspectable rather than merely asserted.

---

## 5. Service evaluability

Each service should expose:

- service name;
- problem addressed;
- intended context;
- fit criteria;
- no-fit criteria;
- inputs;
- high-level process;
- expected outputs;
- duration model if known;
- pricing range;
- reference estimate;
- client responsibilities;
- provider responsibilities;
- milestones where relevant;
- acceptance logic;
- confidentiality;
- required human approvals;
- next action.

Human-readable information is primary.

Machine-readable equivalents may complement it.

---

## 6. Canonical service catalog

Create a machine-readable service catalog where technically clean.

Suggested path:

`/services/index.json`

Potential individual manifests:

- `/services/systemic-coordination-review.json`
- `/services/coordination-reset.json`
- `/services/organizational-strategy-design.json`
- `/services/facilitation.json`

The free diagnostic may be represented separately as a tool, not a paid engagement.

This schema is owned by alexsotodigital.

Do not present it as an industry standard.

Example conceptual structure:

```json
{
  "schemaVersion": "1.0",
  "provider": {
    "name": "Alex Soto",
    "brand": "alexsotodigital",
    "website": "https://alexsotodigital.eth.limo",
    "languages": ["en", "es"]
  },
  "service": {
    "id": "coordination-reset",
    "name": "Coordination Reset",
    "status": "available",
    "problems": [],
    "fitCriteria": [],
    "notFitCriteria": [],
    "inputs": [],
    "phases": [],
    "deliverables": [],
    "milestones": [],
    "acceptanceCriteria": [],
    "pricing": {},
    "humanApprovalRequired": {
      "scope": true,
      "contract": true,
      "payment": true,
      "discount": true,
      "scopeChange": true
    },
    "confidentiality": "private-by-default",
    "nextActions": [
      "run-diagnostic",
      "schedule-exploration-call"
    ]
  }
}
```

Pricing must come from `commercial-and-privacy-config-v1.md`.

Do not duplicate different numeric values elsewhere.

---

## 7. Systemic Coordination Diagnostic

The free diagnostic should function as both:

- useful self-assessment for humans;
- structured future intake surface for authorized agents.

Canonical diagnostic specification:

`systemic-coordination-diagnostic-v1.1.md`

It should not produce a single health score.

Possible routes include:

- no external intervention;
- self-guided improvement;
- internal capacity/management action;
- targeted coordination intervention;
- broader organizational strategy and design;
- founding-agreement work;
- specialist/human review;
- not ready;
- insufficient information.

Core output:

**symptom → likely mechanism → consequence → self-correction → readiness → next step**

---

## 8. Diagnostic privacy

The first public diagnostic version must be **private by design**.

Canonical rule:

> **Your organizational information does not need to leave your device to receive an initial result.**

Answers should be processed client-side.

Do not send diagnostic responses to:

- alexsotodigital;
- an external LLM;
- analytics;
- a form-processing backend;
- public endpoints.

Detailed requirements live in `commercial-and-privacy-config-v1.md`.

---

## 9. Agent-supported procurement

An authorized agent should be able to:

1. identify relevant services;
2. compare fit criteria;
3. retrieve pricing ranges;
4. retrieve a reference estimate;
5. assist with structured intake;
6. prepare context for an exploration call;
7. request or prepare a proposal;
8. summarize proposed scope;
9. identify required human approvals.

Agents may estimate.

They may not issue a binding quote or financially commit the client.

---

## 10. Engagement supervision model

Structured engagements should eventually be representable as:

**engagement → phases → milestones → artifacts → evidence → acceptance**

Potential engagement states:

- inquiry;
- qualification;
- scope-proposed;
- awaiting-human-approval;
- contracted;
- active;
- milestone-review;
- input-required;
- change-requested;
- completed;
- paused;
- cancelled.

This is an internal semantic model, not a claim of protocol compliance.

---

## 11. Milestone specification

Where applicable, milestones should expose:

- milestone ID;
- purpose;
- required inputs;
- expected artifacts;
- provider responsibility;
- client responsibility;
- evidence of completion;
- acceptance criteria;
- human approval requirement;
- dependencies;
- status;
- deviations.

Example:

```json
{
  "milestoneId": "diagnosis-validation",
  "name": "Diagnostic validation",
  "purpose": "Validate the main coordination mechanisms with the authorized sponsor.",
  "expectedArtifacts": [
    "coordination-review",
    "authority-map",
    "priority-bottlenecks"
  ],
  "completionEvidence": [
    "artifacts-delivered",
    "sponsor-review-completed"
  ],
  "acceptanceCriteria": [
    "priority bottlenecks are explicit",
    "evidence is linked to concrete situations",
    "important uncertainties are documented"
  ],
  "humanApprovalRequired": true
}
```

---

## 12. Deviation handling

An AI agent may detect:

- missing inputs;
- delayed milestones;
- missing artifacts;
- scope expansion;
- unmet acceptance criteria;
- new risks;
- contradictory instructions.

It may flag or summarize deviations.

It must not autonomously approve material:

- scope changes;
- financial changes;
- confidentiality changes;
- contractual changes;
- sensitive organizational interventions.

Principle:

> **Agents monitor conformity to the plan. Humans govern meaningful deviations from the plan.**

---

## 13. Artifact model

Potential engagement artifacts include:

- intake summary;
- baseline;
- systemic coordination review;
- authority map;
- interface map;
- decision map;
- accountability agreements;
- coordination principles;
- experiment design;
- experiment log;
- review notes;
- final assessment;
- transfer documentation.

Artifact metadata may be machine-readable when appropriate.

Private artifact contents must remain private.

---

## 14. Verification model

Distinguish:

### Artifact verification

Did the promised output exist?

### Process verification

Did agreed activities occur?

### Outcome verification

Is there evidence of meaningful change in selected indicators?

Human interpretation may remain necessary.

Do not manufacture false objectivity.

---

## 15. Pricing architecture

Canonical numerical pricing is defined only in:

`commercial-and-privacy-config-v1.md`

Machine-readable service metadata should expose:

- currency;
- minimum;
- maximum;
- reference estimate;
- variables affecting price;
- taxes/travel treatment;
- impact-pricing availability;
- requirement for human final quote.

An AI agent should be able to say:

> Typical estimate: USD X. Published range: USD Y–Z depending on scope and complexity. Final scope and quote require human approval.

---

## 16. Confidentiality metadata

Default:

`private-by-default`

Machine-readable metadata should communicate:

- project information is confidential;
- identifiable public use requires explicit authorization;
- anonymized/aggregated learning requires contractual permission;
- case studies are opt-in.

Never expose client artifacts through public endpoints.

---

## 17. Language architecture

Canonical website language:

`en`

Supported service languages:

`en`, `es`

Spanish may be added where maintaining parity does not create significant maintenance burden.

If multilingual pages are created:

- use stable language-specific URLs;
- configure language metadata correctly;
- avoid outdated translations;
- keep a clear source of truth.

---

## 18. Calls to action

Canonical CTA 1:

**Diagnose what is getting stuck**

Canonical CTA 2:

**Explore whether there is a fit**

CTA 2 destination:

`https://calendar.app.google/AuLuFdanUU9pWorCA`

Do not attach diagnostic data to the scheduling URL.

Controls should have meaningful accessible names.

Avoid ambiguous labels where possible.

---

## 19. Future interoperability

Do not implement MCP, A2A or similar protocols merely for signaling.

Design reusable data structures so future mapping remains possible.

Potential future mappings:

- provider identity → agent identity/card;
- services → skills/capabilities;
- engagement → task;
- milestone status → task status;
- outputs → artifacts.

Potential future tools/resources may include:

- `run_coordination_diagnostic`
- `get_service_catalog`
- `request_scope`
- `get_engagement_status`
- `list_milestones`
- `get_artifact_metadata`

Only implement these when a real operational use case exists.

---

## 20. Search / GEO requirements

Follow solid technical SEO, accessibility and people-first content practices.

Validate:

- crawlability;
- robots;
- sitemap;
- canonical URLs;
- unique titles;
- useful descriptions;
- heading hierarchy;
- internal linking;
- structured data;
- page performance;
- mobile usability;
- accessibility basics;
- absence of accidentally indexed private information.

Do not implement:

- hidden AI text;
- keyword stuffing;
- dozens of thin query pages;
- fake FAQs;
- unsupported claims;
- fake credentials.

Do not treat `llms.txt` or any single machine-targeted file as a substitute for a coherent, crawlable site.

---

## 21. Measurement

Where measurement exists, focus on:

- organic discovery;
- research-to-service navigation;
- diagnostic starts/completions without sensitive answers;
- scheduling conversions;
- service-page traffic;
- high-intent queries.

Do not collect sensitive diagnostic details merely because analytics makes it possible.

The meaningful funnel is:

**discover → understand → evaluate → diagnose/call → qualify → engage**

---

## 22. Core design progression

The site should progressively answer:

### Discoverable

**Who is Alex and what does he know about?**

### Evaluable

**Is Alex relevant to this organizational problem?**

### Procurable

**What might it cost, what would happen, and what approvals are required?**

### Supervisable

**Is the engagement producing the promised evidence and remaining within scope?**

Human clarity and trust remain the governing constraints.

---

---

