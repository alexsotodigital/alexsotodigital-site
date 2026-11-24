# alexsotodigital — Commercial & Diagnostic Privacy Config v1

This document contains the canonical numerical commercial values, scheduling endpoint and diagnostic privacy decisions for Website v2.

If another document contains conflicting numerical pricing, privacy or scheduling information, **this document takes precedence**.

---

## 1. Currency

Canonical public pricing currency:

**USD**

Pricing is designed to remain internationally understandable while maintaining an accessible lower boundary for smaller or Latin American organizations.

There is no automatic country-based pricing tier.

---

## 2. Free diagnostic

### Systemic Coordination Diagnostic

Price:

**Free**

Type:

Self-guided browser-based exploratory assessment.

This is distinct from the paid **Systemic Coordination Review**.

---

## 3. Systemic Coordination Review

Published range:

**USD 2,000–5,000**

Reference estimate:

**USD 3,500**

The reference estimate is the reasonable default amount an agent or buyer should initially budget when more context is unavailable.

Potential variables:

- intervention unit size;
- stakeholder count;
- organizational complexity;
- required interviews;
- evidence availability;
- depth;
- remote/in-person delivery.

---

## 4. Coordination Reset

Published range:

**USD 4,800–10,000**

Reference estimate:

**USD 8,000**

Lower end may apply to:

- bounded single-team scope;
- relatively clear problem;
- lower stakeholder complexity;
- primarily remote work.

Upper end may apply to:

- multiple interfaces;
- larger stakeholder set;
- greater contextual complexity;
- longer experimentation/review;
- significant customization.

---

## 5. Organizational Strategy & Design

Published range:

**USD 6,400–15,000**

Reference estimate:

**USD 12,000**

This range reflects broader work where strategy, structure, authority and operating practices may be interdependent.

---

## 6. Facilitation / Strategic Working Session

Published range:

**USD 1,200–3,000**

Reference estimate:

**USD 2,000**

Final quote may depend on:

- duration;
- preparation;
- participant count;
- design complexity;
- follow-up;
- travel.

---

## 7. Price interpretation

Public ranges are intended to increase procurement transparency.

They are not binding automatic quotes.

For humans and AI agents:

- **minimum** = plausible lower boundary for a bounded/simple engagement;
- **reference estimate** = reasonable default planning estimate;
- **maximum** = plausible upper boundary before a custom scope should be reviewed.

Final pricing depends on context.

Relevant variables may include:

- scope;
- organizational complexity;
- stakeholder count;
- number of teams/interfaces;
- urgency;
- customization;
- remote/in-person delivery;
- travel;
- expected value.

Applicable taxes and extraordinary expenses are not assumed included unless explicitly stated in the final proposal.

---

## 8. Impact pricing

alexsotodigital may offer discounted or pro-bono work when potential social or environmental impact is unusually strong and credible.

This requires human review.

AI agents may:

- use standard published pricing for initial estimates;
- flag potential impact-pricing eligibility;
- tell the user discounted/pro-bono consideration exists.

AI agents must not:

- automatically apply discounts;
- promise a discount;
- promise pro-bono work;
- infer eligibility solely from organizational category.

Final decision belongs to Alex.

---

## 9. Human approval

AI systems may:

- retrieve pricing;
- estimate likely engagement cost;
- compare services;
- prepare procurement information;
- prepare a scope request.

Human approval is required for:

- final scope;
- final quote;
- discount;
- pro-bono status;
- contract;
- payment;
- material scope changes.

---

## 10. Scheduling

Canonical exploration-call endpoint:

`https://calendar.app.google/AuLuFdanUU9pWorCA`

Preferred visible CTA:

**Explore whether there is a fit**

The existing destination should be preserved.

Do not pass diagnostic results, answers or sensitive data through the scheduling URL.

---

## 11. Privacy principle

alexsotodigital should minimize data collection.

Product principle:

> **Collect information only when keeping it creates additional value for the user.**

For the free diagnostic:

> **Your organizational information does not need to leave your device to receive an initial result.**

---

## 12. Diagnostic processing architecture

The first public Systemic Coordination Diagnostic must operate client-side.

Required architecture:

**structured questions → browser memory → deterministic scoring → deterministic routing → local result**

No backend is required.

Do not require:

- database;
- form-processing service;
- external LLM;
- account/login;
- server-side diagnostic API.

---

## 13. Persistence

Diagnostic answers should exist only in browser memory during the active page session.

Do not persist diagnostic answers through:

- localStorage;
- sessionStorage;
- cookies;
- IndexedDB unless explicitly reconsidered in a future version;
- server storage;
- URL query parameters;
- URL fragments.

Refreshing or closing the page may erase progress.

This is acceptable for v1.1.

---

## 14. Open-text information

Open-text responses may contain highly sensitive organizational information.

They must not be:

- transmitted to alexsotodigital;
- transmitted to an LLM;
- transmitted to analytics;
- embedded in URLs;
- stored on a server;
- included in machine-readable summaries by default.

The deterministic diagnostic must remain fully functional without analyzing open-text answers.

---

## 15. Public privacy copy

Display near the beginning of the diagnostic:

### Private by design

> **Your answers are processed in your browser to generate this initial assessment. They are not sent to alexsotodigital or stored on a server.**

Also communicate:

> Refreshing or closing this page may erase your current answers.

Keep the language clear rather than overly legalistic.

---

## 16. Diagnostic analytics

Do not collect:

- diagnostic answers;
- open-text responses;
- conflict descriptions;
- names;
- organizational details entered into the diagnostic.

For v1.1, prefer:

**no diagnostic-specific analytics**

or, if existing site analytics make simple event tracking appropriate:

- page viewed;
- diagnostic started;
- diagnostic completed.

Do not send mechanism scores, readiness, severity or routes to third-party analytics by default.

---

## 17. Machine-readable summary

Generate a sanitized structured result locally.

It may include:

- diagnosticVersion;
- mechanism levels;
- main/combined/systemic pattern;
- severity;
- self-correction capacity;
- readiness;
- confidence;
- recommended route;
- recommended practice.

It must not include:

- open text;
- names;
- organization names;
- identifiable conflict details.

Where technically reasonable, provide:

**Copy machine-readable summary**

This action is initiated by the user.

Clipboard copying does not imply transmission to alexsotodigital.

---

## 18. Future sharing

Do not automatically share diagnostic responses with Alex.

A future version may offer:

**Share my diagnostic with Alex**

If implemented later, it must:

1. be explicitly initiated by the user;
2. show exactly what information will be transmitted;
3. require informed consent;
4. distinguish sanitized derived results from raw/open-text answers.

Do not implement automatic sharing in v1.1.

---

## 19. Private by design beyond the diagnostic

Treat privacy minimization as a broader product principle where reasonable.

Do not collect organizational or personal information merely because it might become useful later.

Prefer:

- local processing;
- derived/sanitized data;
- explicit consent;
- purpose-limited collection.

This should remain balanced against actual service needs once a client chooses to engage.

---

## 20. Canonical commercial summary

| Offering | Public range | Reference estimate |
|---|---:|---:|
| Systemic Coordination Diagnostic | Free | $0 |
| Systemic Coordination Review | $2,000–$5,000 | $3,500 |
| Coordination Reset | $4,800–$10,000 | $8,000 |
| Organizational Strategy & Design | $6,400–$15,000 | $12,000 |
| Facilitation / Strategic Working Session | $1,200–$3,000 | $2,000 |

Currency:

**USD**

Final scope and quote:

**Human-approved**

Impact pricing:

**Available by human review**

Diagnostic privacy:

**Private by design / client-side**

Scheduling:

`https://calendar.app.google/AuLuFdanUU9pWorCA`

