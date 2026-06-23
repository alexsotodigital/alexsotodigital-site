# Content Update Request Format

## Purpose

This document defines the stable input format Alex should use when requesting future website content updates.

The goal is to make content changes easy to review, editorially precise, and safe for ChatGPT and Codex to map into `content/site-data.js` without corrupting the launched site structure.

The format is a hybrid:

- YAML frontmatter for structured metadata.
- Markdown sections for nuance, proposed wording, and editorial constraints.

This format is for proposing and reviewing content changes. It does not update the site by itself.

## When To Use This Format

Use a Content Update Request when adding, modifying, correcting, deprecating, or removing public website content, including:

- writing and publications
- work experience
- governance roles
- project or practice contexts
- methods
- services
- credentials
- skills or capabilities
- speaking appearances
- identity, contact, or payment information
- positioning language
- AI-readable metadata
- FAQ entries

Small typo fixes can be requested directly, but anything that changes public claims, evidence, identity, payments, services, or positioning should use this format.

## Base Template

```markdown
---
update_type: writing_publication
update_action: add
status: proposed
title: ""
id: ""
date_or_period: ""
canonicality_level: supporting
sensitivity: low
publication_intent: publish
human_facing_change: true
ai_readable_change: true
featured: false
related_projects: []
related_services: []
related_methods: []
affected_pages: []
affected_endpoints: []
related_links:
  - label: ""
    url: ""
evidence_links:
  - label: ""
    url: ""
---

## Summary

1-2 sentence summary of the update.

## Why This Matters

Explain why this belongs on the site and how it supports Alex's public practice.

## Proposed Public Text

Optional. Include exact wording if there is text that should appear on the site.

## Nuance / Editorial Guardrails

Clarify anything that should not be overstated, misclassified, or presented as stronger than it is.

## Notes

Any implementation notes, uncertainty, or questions for review.
```

## Field Definitions

| Field | Purpose |
| --- | --- |
| `update_type` | The kind of content being changed. Use one of the allowed values below. |
| `update_action` | The intended operation: add, modify, remove, replace, deprecate, or correct. |
| `status` | Review state of the request. Most requests should begin as `proposed`. |
| `title` | Human-readable name of the item or change. |
| `id` | Stable machine-readable identifier. Use lowercase words separated by hyphens. Leave blank if unsure. |
| `date_or_period` | Date, year, or period such as `2026`, `2024-Present`, or `March 2026`. |
| `canonicality_level` | How central the update is to Alex's public identity and claims. |
| `sensitivity` | Risk level of publishing or modifying this information. |
| `publication_intent` | Whether the update is ready to publish, needs review, is a draft, or is internal context only. |
| `human_facing_change` | Whether the update should affect HTML pages. |
| `ai_readable_change` | Whether the update should affect JSON endpoints, `llms.txt`, or other machine-readable files. |
| `featured` | Whether the item should be highlighted on primary pages. Defaults to `false`. |
| `related_projects` | Existing or proposed project IDs related to the update. |
| `related_services` | Existing or proposed service IDs related to the update. |
| `related_methods` | Existing or proposed method IDs related to the update. |
| `affected_pages` | Pages expected to change, such as `/writing/`, `/identity/`, or `/work-with-me/`. |
| `affected_endpoints` | Machine-readable outputs expected to change, such as `/about.json` or `/services.json`. |
| `related_links` | Useful links related to the item. These may or may not be evidence. |
| `evidence_links` | Links that support the public claim. Use these for roles, credentials, publications, and outcomes. |

## Allowed Update Types

- `writing_publication`
- `work_experience`
- `governance_role`
- `project_context`
- `method`
- `service`
- `credential`
- `skill_capability`
- `speaking_appearance`
- `identity_contact_payment`
- `positioning`
- `ai_metadata`
- `faq`

## Allowed Update Actions

- `add`
- `modify`
- `remove`
- `replace`
- `deprecate`
- `correct`

## Allowed Status Values

- `proposed`
- `accepted`
- `deferred`
- `rejected`

## Canonicality Levels

- `canonical`: Changes identity, positioning, or central public claims.
- `supporting`: Adds evidence, articles, experience, roles, or projects that support the practice.
- `experimental`: Adds exploratory work that should not be overstated as a completed result.
- `private_context`: Useful for internal memory, not publishable without review.

## Sensitivity Levels

- `low`: Public, low-risk information.
- `medium`: Role, credential, collaboration, or reputational claim.
- `high`: Strong claim, third-party-sensitive information, or unverified public statement.
- `identity`: Name, bio, ENS, handles, canonical links, positioning.
- `financial`: Wallets, payments, payment instructions, ENS payment identifiers.

## Publication Intent

- `publish`: Eligible to publish after editorial review.
- `needs_review`: Do not publish until explicit human approval.
- `draft`: Useful for drafting, not ready to publish.
- `internal_note`: Context only, not public content.

## Editorial Safeguards

- Preserve the canonical identity: "Governance & Coordination Specialist".
- Preserve the deeper narrative: institutional learning for distributed organizations.
- Do not turn the site into a generic sales landing page.
- Distinguish role types clearly: founder, employee, contractor, advisor, delegate, contributor, volunteer, author, speaker.
- Do not imply employment if the role was contribution, delegation, advising, or ecosystem participation.
- Do not claim outcomes without evidence links.
- Distinguish ongoing experiments from completed outcomes.
- Treat projects as practice contexts/laboratories unless there is strong evidence for stronger claims.
- Keep payment information informational and non-interactive.
- Require explicit human approval for identity, financial, ENS, wallet, payment, or canonical positioning changes.

## Example Update Requests

### 1. Add A Writing Publication

```markdown
---
update_type: writing_publication
update_action: add
status: proposed
title: "Governance Memory for Distributed Teams"
id: "governance-memory-distributed-teams"
date_or_period: "2026"
canonicality_level: supporting
sensitivity: low
publication_intent: publish
human_facing_change: true
ai_readable_change: true
featured: false
related_projects: []
related_services: ["governance-design", "coordination-systems"]
related_methods: ["governance-reviews", "institutional-learning"]
affected_pages: ["/writing/"]
affected_endpoints: []
related_links:
  - label: "Article"
    url: "https://example.com/governance-memory"
evidence_links:
  - label: "Published article"
    url: "https://example.com/governance-memory"
---

## Summary

An article about how distributed organizations can convert decisions, tensions, and retrospectives into reusable institutional memory.

## Why This Matters

It supports the site's deeper narrative about institutional learning for distributed organizations.

## Proposed Public Text

An essay on how distributed organizations can turn decisions and tensions into reusable institutional memory.

## Nuance / Editorial Guardrails

Do not present this as a formal methodology unless the article explicitly defines one.

## Notes

Consider whether this should later support a future `methods.json` endpoint.
```

### 2. Add A Governance Role

```markdown
---
update_type: governance_role
update_action: add
status: proposed
title: "Example DAO Governance Contributor"
id: "example-dao-governance-contributor"
date_or_period: "2025-Present"
canonicality_level: supporting
sensitivity: medium
publication_intent: needs_review
human_facing_change: true
ai_readable_change: true
featured: false
related_projects: []
related_services: ["governance-design", "dao-operations"]
related_methods: ["governance-reviews"]
affected_pages: ["/identity/"]
affected_endpoints: ["/about.json"]
related_links:
  - label: "Organization"
    url: "https://example.org"
evidence_links:
  - label: "Governance contribution record"
    url: "https://example.org/governance-record"
---

## Summary

Governance participation focused on proposal review, process feedback, and ecosystem coordination.

## Why This Matters

It supports Alex's public practice in governance operations and distributed coordination.

## Proposed Public Text

Governance contributor supporting proposal review, process feedback, and governance learning loops.

## Nuance / Editorial Guardrails

Clarify whether this is a delegate, contributor, advisor, contractor, or volunteer role. Do not imply employment unless that is accurate.

## Notes

Needs human review before publishing because role classification affects reputation and third-party interpretation.
```

### 3. Add A Credential

```markdown
---
update_type: credential
update_action: add
status: proposed
title: "Example Governance Training"
id: "example-governance-training"
date_or_period: "2026"
canonicality_level: supporting
sensitivity: medium
publication_intent: publish
human_facing_change: true
ai_readable_change: true
featured: false
related_projects: []
related_services: ["governance-design"]
related_methods: ["facilitation-decision-frameworks"]
affected_pages: ["/identity/"]
affected_endpoints: ["/about.json"]
related_links:
  - label: "Program"
    url: "https://example.com/program"
evidence_links:
  - label: "Certificate or public record"
    url: "https://example.com/certificate"
---

## Summary

A completed training related to governance design and facilitation.

## Why This Matters

It adds evidence for the facilitation and governance dimensions of the practice.

## Proposed Public Text

Completed governance and facilitation training through Example Program.

## Nuance / Editorial Guardrails

Do not imply certification, licensing, or institutional endorsement unless the evidence link supports that exact claim.

## Notes

If the credential is not publicly verifiable, mark publication intent as `needs_review`.
```

### 4. Modify Positioning Language

```markdown
---
update_type: positioning
update_action: modify
status: proposed
title: "Refine homepage positioning"
id: "refine-homepage-positioning"
date_or_period: "2026-06"
canonicality_level: canonical
sensitivity: identity
publication_intent: needs_review
human_facing_change: true
ai_readable_change: true
featured: false
related_projects: []
related_services: ["governance-design", "coordination-systems"]
related_methods: ["institutional-learning", "coordination-diagnostics"]
affected_pages: ["/", "/work-with-me/"]
affected_endpoints: ["/about.json", "/llms.txt"]
related_links: []
evidence_links: []
---

## Summary

Refine the main positioning line to make institutional learning more visible while preserving the canonical identity.

## Why This Matters

Positioning language is reused across the homepage, metadata, AI-readable endpoints, and service framing.

## Proposed Public Text

I help mission-driven organizations transform coordination challenges into governance systems, shared practices, clearer decisions, and institutional learning loops.

## Nuance / Editorial Guardrails

Preserve "Governance & Coordination Specialist" as the canonical professional identity. Do not make the site sound like an academic research page or a generic consulting landing page.

## Notes

Requires explicit human approval before implementation because it changes canonical positioning.
```

## Future Workflow

1. Alex writes a Content Update Request.
2. ChatGPT refines or questions the request.
3. Codex maps accepted updates into `content/site-data.js`.
4. Codex runs build and local verification.
5. Codex commits and pushes.
6. GitHub Actions generates a CID.
7. Gateway verification is performed.
8. ENS is updated only after explicit human approval.

## What Requires Explicit Human Approval

Explicit human approval is required before:

- updating ENS
- changing DNS or production domains
- modifying wallet addresses, ENS payment identifiers, accepted assets, or payment instructions
- changing canonical identity, biography, or positioning
- publishing high-sensitivity claims
- adding third-party-sensitive role descriptions
- implying employment, certification, partnership, endorsement, or completed outcomes
- removing public launch records or release markers
- deploying a new CID as the ENS contenthash

When in doubt, pause and ask before implementation.
