# alexsotodigital Website v2 — Codex Implementation Brief

You are updating the existing alexsotodigital website repository.

You have fine-grained access to the repository required for this implementation.

Before changing anything, inspect the existing repository, information architecture, content source, build system, styles, structured data, redirects, sitemap, metadata, deployment assumptions and existing search/AI discoverability work.

Do not rebuild the site unnecessarily.

---

## Source-of-truth documents

Treat the following files as binding inputs:

### 1. `website-messaging-v2.md`

Editorial and positioning source of truth.

Defines:

- canonical positioning;
- problem language;
- service names;
- CTAs;
- page hierarchy;
- confidentiality language;
- public engagement logic.

### 2. `geo-agent-readiness-spec.md`

Technical discoverability and agent-readiness source of truth.

Defines:

- entity architecture;
- service evaluability;
- machine-readable service architecture;
- procurement/supervision semantics;
- future interoperability principles.

### 3. `systemic-coordination-diagnostic-v1.1.md`

Diagnostic logic source of truth.

Defines:

- questions;
- dimensions;
- scoring;
- severity;
- self-correction;
- readiness;
- contradiction logic;
- confidence;
- routing precedence;
- self-guided practices;
- machine-readable results.

### 4. `commercial-and-privacy-config-v1.md`

Commercial and privacy source of truth.

Defines:

- canonical numerical pricing;
- reference estimates;
- impact-pricing rules;
- scheduling endpoint;
- diagnostic privacy architecture;
- local-processing requirements.

If duplicated information conflicts across documents:

1. use `commercial-and-privacy-config-v1.md` for numerical pricing, privacy and scheduling;
2. use `systemic-coordination-diagnostic-v1.1.md` for diagnostic logic;
3. use `website-messaging-v2.md` for editorial positioning;
4. use `geo-agent-readiness-spec.md` for technical architecture.

Do not invent strategic positioning, claims, credentials, clients, testimonials, pricing or methodologies.

---

## Primary objective

Update alexsotodigital so it clearly communicates:

> **Alex helps capable teams identify what is blocking execution and redesign the minimum coordination structures needed to make things happen.**

The website should become easier for humans and AI systems to:

- understand Alex;
- identify relevant organizational problems;
- evaluate fit;
- understand how engagements work;
- inspect expected outputs;
- understand public pricing;
- identify evidence;
- run a private self-guided diagnostic;
- schedule an exploration call.

---

## Step 1 — Audit the current site

Before implementation, inspect and document:

- routes;
- page purposes;
- current positioning;
- existing capability/problem pages;
- structured data;
- sitemap generation;
- robots behavior;
- canonical tags;
- metadata;
- internal links;
- external links;
- public knowledge/AI discoverability features;
- JSON-LD;
- accessibility structure;
- content duplication;
- current scheduling integration;
- current payment links if any;
- any existing diagnostic or forms;
- anything important that should be preserved.

Use the audit to create a small migration plan.

Then implement.

Do not stop merely because some details differ from the proposed architecture if they can be reconciled safely.

---

## Step 2 — Messaging migration

### Homepage

Prioritize:

1. recognizable organizational problem;
2. functional positioning;
3. outcomes;
4. common symptoms;
5. how Alex works;
6. research/evidence;
7. ways to work together;
8. diagnostic CTA;
9. exploration-call CTA.

### Work With Me

Organize around:

- situations/problems;
- possible mechanisms;
- engagement families;
- public phases;
- expected outputs;
- pricing ranges;
- fit/no-fit;
- confidentiality;
- CTAs.

### About

Clarify:

- organizational strategist;
- coordination specialist;
- systems thinker/builder;
- broader professional question;
- experience across contexts.

Do not make Web3 the umbrella identity.

### Methods

Treat methods as context-dependent tools, not products the client must know how to request.

### Experience

Preserve factual experience.

Improve relationships between claims and evidence where useful.

### Writing / Research

Prominently surface:

**What Breaks When Teams Try to Coordinate?**

Link relevant concepts to services and capability pages.

---

## Step 3 — Canonical entity

Review and improve Alex Soto's canonical representation across:

- page copy;
- About;
- metadata;
- JSON-LD;
- profile/footer references.

Use consistent entity naming.

Add or improve valid `Person` / `ProfilePage` structured data where appropriate.

Preserve legitimate existing `sameAs` URLs.

Do not invent missing identity URLs.

---

## Step 4 — Service architecture

Canonical public services:

1. **Systemic Coordination Diagnostic**
   - free;
   - self-guided tool;
   - not a consulting engagement.

2. **Systemic Coordination Review**
   - paid professional diagnostic.

3. **Coordination Reset**

4. **Organizational Strategy & Design**

5. **Facilitation / Strategic Working Session**

Do not confuse the free Diagnostic with the paid Review.

Create a reusable internal data structure for paid services.

Where cleanly implementable, expose machine-readable service manifests.

Recommended:

`/services/index.json`

and/or individual JSON service files.

Pricing must be read from one canonical configuration/data source derived from `commercial-and-privacy-config-v1.md`.

Do not duplicate numerical pricing in many templates.

---

## Step 5 — Pricing

Publish the ranges and reference estimates specified in:

`commercial-and-privacy-config-v1.md`

Human-facing copy may emphasize the range.

Machine-readable metadata should include both:

- public range;
- reference estimate.

Explain that:

- scope and complexity affect final pricing;
- final quote requires human approval;
- impact discounts/pro-bono require human review;
- agents must not automatically apply discounts.

Do not invent location-specific pricing tiers.

---

## Step 6 — Calls to action

Canonical CTA:

**Diagnose what is getting stuck**

→ free Systemic Coordination Diagnostic.

Canonical CTA:

**Explore whether there is a fit**

→ `https://calendar.app.google/AuLuFdanUU9pWorCA`

The site may replace existing visible `Book a strategy call` wording with the new label while preserving the same destination.

Do not attach diagnostic information to the scheduling URL.

---

## Step 7 — Implement the Systemic Coordination Diagnostic v1.1

Implement the diagnostic defined in:

`systemic-coordination-diagnostic-v1.1.md`

Treat it as an evolving public tool.

Do not wait for prior external validation.

The initial release itself is part of the validation process.

Suggested public framing:

> **This is an evolving diagnostic tool for identifying possible coordination patterns and useful next steps. It is not a definitive assessment of your organization.**

Do not overuse disclaimers.

---

## Step 8 — Diagnostic implementation architecture

Required conceptual architecture:

**structured responses → browser memory → deterministic scoring → deterministic flags → deterministic routing → local result rendering**

No backend is required for v1.1.

Do not make an external LLM dependency necessary.

Prefer separate modules/data for:

- questions/configuration;
- scoring engine;
- routing engine;
- result templates;
- UI.

Keep the implementation easy to update from v1.1 to future versions.

Include:

`diagnosticVersion: "1.1"`

in derived results.

---

## Step 9 — Diagnostic privacy

The diagnostic must be private by design.

Display near the beginning:

### Private by design

> **Your answers are processed in your browser to generate this initial assessment. They are not sent to alexsotodigital or stored on a server.**

Also tell users that refreshing or closing the page may erase their current progress.

Do not persist answers through:

- backend/database;
- form-submission services;
- localStorage;
- sessionStorage;
- cookies;
- URL query parameters;
- URL fragments.

Diagnostic answers should exist only in browser memory for the active page/session.

---

## Step 10 — Open-text responses

Open-text answers may contain sensitive organizational information.

They must not be:

- transmitted to alexsotodigital;
- sent to an LLM;
- sent to analytics;
- embedded in URLs;
- stored on a server.

The diagnostic engine must work without analyzing open-text content.

Open-text content may remain visible locally during the active session.

---

## Step 11 — Diagnostic result

Results should include:

- main/combined/systemic pattern;
- interpretation;
- consequence;
- self-correction capacity;
- readiness;
- confidence;
- recommended route;
- self-guided practice;
- context-appropriate next action.

Do not show one overall health score.

Do not show the same sales CTA for every route.

Possible outcomes include:

- no action;
- try internally;
- internal capacity action;
- explore a call;
- seek another specialist;
- improve readiness;
- provide more information.

---

## Step 12 — Machine-readable diagnostic summary

Generate a sanitized structured result locally.

It may include:

- diagnosticVersion;
- mechanism levels;
- main/combined pattern;
- severity;
- selfCorrectionCapacity;
- readiness;
- confidence;
- recommendedRoute;
- recommendedPractice.

It must not contain open-text responses by default.

Where practical, provide a user-controlled action:

**Copy machine-readable summary**

Copy only the sanitized derived result to the clipboard.

Do not persist or publicly index individual results.

---

## Step 13 — Diagnostic analytics

Do not collect diagnostic responses.

Do not collect open text.

For v1, prefer:

- no diagnostic-specific analytics;

or, if useful and consistent with existing architecture:

- diagnostic page viewed;
- diagnostic started;
- diagnostic completed.

Do not send diagnostic mechanism scores, routes or sensitive details to third-party analytics by default.

---

## Step 14 — Research integration

Prominently integrate:

**What Breaks When Teams Try to Coordinate?**

Potential concepts to link:

- actual/formal authority;
- accountability;
- informality ceiling;
- minimum viable coordination;
- self-correction;
- feedback-to-change latency.

Do not duplicate full external articles unnecessarily.

Use concise descriptions and canonical outbound links unless the site already supports a valid syndication pattern.

---

## Step 15 — Confidentiality

Add clear confidentiality language around paid work:

- project information private by default;
- identifiable cases require explicit authorization;
- aggregated/anonymized learning only if contractually permitted.

Do not expose client/private data through public JSON.

---

## Step 16 — Search / GEO technical review

Validate and improve as appropriate:

- crawlability;
- robots;
- sitemap;
- canonical URLs;
- titles;
- descriptions;
- heading hierarchy;
- internal links;
- JSON-LD;
- duplicate content;
- semantic HTML;
- alt text;
- accessibility basics;
- mobile layout;
- page performance.

Do not implement speculative tactics such as:

- hidden AI copy;
- fake FAQs;
- keyword stuffing;
- near-duplicate query pages;
- fabricated third-party claims.

Do not make `llms.txt` central to the strategy.

If one exists and is accurate/maintainable, it may remain.

---

## Step 17 — Future interoperability

Do not implement MCP, A2A or autonomous purchasing in this iteration.

Structure data so future mapping remains possible.

Avoid hard-coding reusable service or diagnostic data into multiple templates.

---

## Step 18 — Preserve existing quality

Do not break:

- visual identity;
- responsive behavior;
- valid routes;
- Substack links;
- social links;
- ENS/domain behavior;
- existing valid SEO assets;
- build pipeline;
- accessibility;
- existing useful functionality.

This is primarily:

**messaging + information architecture + diagnostic + discoverability + evaluability**

not a visual rebrand.

---

## Step 19 — Verification

After implementation, validate:

- successful production build;
- internal links;
- relevant external links;
- scheduling endpoint;
- JSON validity;
- JSON-LD validity;
- sitemap;
- canonical consistency;
- service manifests;
- correct public pricing;
- no conflicting old pricing;
- diagnostic scoring logic;
- diagnostic routing logic;
- diagnostic privacy/network behavior;
- no sensitive answers transmitted;
- no diagnostic answers in browser persistence;
- no diagnostic data in URL;
- machine-readable summary;
- desktop/mobile layout;
- horizontal overflow;
- navigation;
- accessibility basics;
- JS runtime errors.

Explicitly inspect browser network activity while completing the diagnostic.

Confirm that diagnostic answers do not leave the device.

---

## Step 20 — Final implementation report

Return:

### Audit

Important characteristics of the previous site.

### Implemented

Files/routes changed and why.

### Messaging

Major positioning changes.

### Pricing

Where canonical pricing is stored and how it is rendered.

### Diagnostic

Architecture, logic and privacy implementation.

### GEO / search

Technical improvements.

### Agent readiness

What now makes services more machine-evaluable/procurable.

### Deferred

Anything intentionally left for future iterations.

### Validation

Build/tests performed and results.

---

## Decision hierarchy

When uncertain, optimize in this order:

1. factual accuracy;
2. privacy;
3. human clarity;
4. service usefulness;
5. service evaluability;
6. accessibility/crawlability;
7. machine readability;
8. future interoperability.

Do not sacrifice human trust for speculative AI optimization.

---

---

