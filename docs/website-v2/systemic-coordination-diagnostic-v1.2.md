# Systemic Coordination Diagnostic v1.2

**Status:** Live experimental specification  
**Provider:** alexsotodigital  
**Canonical language:** English  
**Supersedes:** `systemic-coordination-diagnostic-v1.1.md`

**Implementation clarifications approved by Alex (2026-11-23):** The normal route has 12 required closed questions (9 numeric, plus role, presenting problem and safety), not 11. If screening selects one dimension, ask its single supplied deepening probe. Readiness bands are low <2, moderate >=2 and <3, high >=3. Complete low-consequence responses with no likely mechanism and strong/moderate self-correction may reach no external intervention before the low-confidence fallback. Safety still takes precedence. See diagnostic-v1.2-review.md for conservative operational choices where the specification uses qualitative terms.

---

# 1. Purpose

The Systemic Coordination Diagnostic is a short, adaptive first assessment designed to help a person answer:

1. **What may actually be getting my team stuck?**
2. **How consequential does it appear to be?**
3. **Can we probably work on it ourselves?**
4. **What is the smallest useful next step?**

It is not intended to produce a comprehensive organizational assessment.

It should identify the **1–2 most plausible coordination patterns relevant to the presenting problem** and recommend an appropriate next action.

A legitimate result may be:

- no external intervention needed;
- try a self-guided practice;
- take an internal management action;
- improve organizational readiness first;
- explore a targeted Coordination Reset;
- explore broader Organizational Strategy & Design;
- examine Founding Agreements;
- seek another specialist / human review;
- gather more information.

The diagnostic should provide useful value even if the respondent never hires alexsotodigital.

---

# 2. Design objective

The typical respondent should complete the diagnostic in approximately:

**5 minutes**

Typical path:

**9–12 scored questions**

Some ambiguous or exploratory paths may require additional questions.

The tool should feel like a **structured conversation**, not an organizational survey.

---

# 3. Core principle

The diagnostic does not ask every respondent about every organizational dimension.

Instead:

**presenting problem → plausible mechanisms → targeted probes → consequence → self-correction → readiness → route**

Only dimensions relevant to the presenting problem are explored.

Untested dimensions remain:

`not_assessed`

They must never be represented as low friction merely because no question was asked about them.

---

# 4. Underlying model

The internal conceptual model remains:

1. Authority
2. Accountability
3. Information / Context
4. Interfaces
5. Capacity
6. Power / Relationships
7. Adaptation

Conditional:

8. Founding Agreements

These are internal diagnostic concepts.

They should not appear as a list of sections the user is expected to understand or navigate.

---

# 5. UX principles

The diagnostic should:

- use a dedicated full-width / distraction-reduced layout;
- progress sequentially;
- show one question or small related group at a time;
- use natural language rather than taxonomy labels;
- use branching;
- avoid exposing all sections in advance;
- avoid allowing arbitrary jumping between sections;
- allow Back where technically safe;
- clearly indicate progress;
- preserve all Private by Design requirements.

Do not use the normal two-column website layout for the diagnostic experience.

---

# 6. Intro screen

## Heading

# What is getting your team stuck?

## Copy

When work repeatedly gets harder than it should, the visible problem is not always the underlying one.

A slow decision might come from unclear authority, missing information, overloaded people, difficult team interfaces, or a decision that keeps being informally overridden.

This diagnostic helps you narrow down what may actually be happening.

**In about 5 minutes, you'll get:**

- the 1–2 coordination patterns most likely affecting your situation;
- an indication of how consequential they appear;
- whether your team may be able to address them internally;
- one practical step you can try immediately;
- and, when relevant, whether deeper support may be useful.

The diagnostic starts from the problem you're experiencing and only asks deeper questions where they appear relevant.

## Private by design

**Your answers are processed in your browser. They are not sent to alexsotodigital or stored on a server.**

Refreshing or closing this page may erase your current answers.

CTA:

**Start diagnostic**

---

# 7. Optional methodology disclosure

Provide an unobtrusive expandable control:

**How does this work?**

Copy:

> The diagnostic does not assume that coordination problems come from a lack of structure. Depending on your situation, it may test possible issues involving decision authority, accountability, information flow, capacity, interfaces between people or teams, power dynamics, or the organization's ability to adapt.
>
> It starts from the problem you are experiencing and only explores dimensions that appear relevant.
>
> The result is an exploratory hypothesis, not a definitive assessment of your organization.

---

# 8. Response scale

Unless another response format is specified, mechanism questions use:

**How true is this in the situation you are describing?**

- Not at all
- A little
- Somewhat
- Quite a lot
- Very much

Internal values:

`0 / 1 / 2 / 3 / 4`

All mechanism statements are written in the direction of **friction**.

No reverse scoring should be necessary in v1.2.

---

# 9. Core flow

Typical sequence:

1. Respondent vantage point
2. Presenting problem
3. Optional concrete example
4. Adaptive mechanism branch
5. Consequence
6. Self-correction
7. Readiness
8. Scope / safety check
9. Result

---

# 10. Question 1 — Respondent vantage point

## Q1. What best describes your role?

Single choice:

- Founder / partner
- CEO / Executive Director
- Operations / COO
- People / HR
- Manager / team lead
- Individual contributor
- Internal consultant / organizational development
- Board / governance role
- Other

Purpose:

- contextualize confidence;
- activate Founding Agreements when appropriate.

Do not use role to determine the substantive result by itself.

---

# 11. Question 2 — Presenting problem

## Q2. What feels harder than it should right now?

Single choice.

Choose the **most important** current problem.

Options:

### A.
**Decisions take too long or keep getting stuck**

### B.
**Too much depends on one or a few people**

### C.
**Agreements don't reliably become action**

### D.
**Responsibilities or decision authority feel unclear**

### E.
**Work breaks down between people, teams or handoffs**

### F.
**We are consistently overloaded or overcommitted**

### G.
**Important information doesn't reach the right people**

### H.
**We keep discussing the same problems without changing them**

### I.
**It is difficult to disagree or raise important problems openly**

### J.
**I'm not sure. Things just feel harder than they should.**

### K.
**Something else**

Routes J and K use the General Screening route.

---

# 12. Optional reflection — Concrete example

## Q3. Can you think of one recent example?

Optional paragraph.

Prompt:

> If useful, describe one situation where this problem showed up in real work.

This response is:

- optional;
- not scored;
- processed locally;
- never required for routing;
- never sent to an LLM or server.

The user may skip it.

Do not count this question toward the expected scored-question total.

---

# 13. Adaptive mechanism branches

Each presenting problem activates **four mechanism probes**.

The purpose is not to test every dimension.

Each probe has one primary diagnostic dimension.

Secondary conceptual relationships may be stored as metadata but do not alter the primary dimension score.

---

# Branch A — Decisions take too long or keep getting stuck

### A1 — Authority

**It is often unclear who has the final say on an important decision.**

### A2 — Authority

**A decision may be reopened or overridden after someone was expected to own it.**

### A3 — Information / Context

**Decisions wait because the people involved do not have the context they need.**

### A4 — Interfaces

**Decisions stall because several people or teams depend on one another without a clear way to resolve the dependency.**

Dimensions assessed:

- Authority: 2 probes
- Information / Context: 1
- Interfaces: 1

---

# Branch B — Too much depends on one or a few people

### B1 — Authority

**Work often cannot move without approval from one or a few key people, even when someone else is responsible for it.**

### B2 — Information / Context

**Important knowledge or context is concentrated in the same few people.**

### B3 — Capacity

**Those key people are overloaded partly because so much depends on them.**

### B4 — Adaptation

**The team already recognizes this dependency, but has struggled to change it.**

Dimensions assessed:

- Authority
- Information / Context
- Capacity
- Adaptation

Potential composite:

`founder_or_key_person_dependency`

---

# Branch C — Agreements don't reliably become action

### C1 — Accountability

**Important agreements sometimes end without a sufficiently clear owner or observable outcome.**

### C2 — Accountability

**People agree to important actions that later fail to happen without being explicitly revisited.**

### C3 — Authority

**People may be responsible for outcomes without enough authority to produce them.**

### C4 — Adaptation

**The team notices repeated follow-through problems but does not consistently change how commitments are made or reviewed.**

Dimensions assessed:

- Accountability: 2
- Authority: 1
- Adaptation: 1

Potential composite:

`agreement_without_accountability`

---

# Branch D — Responsibilities or decision authority feel unclear

### D1 — Authority

**Formal responsibilities do not always match who actually makes the decision.**

### D2 — Authority

**More than one person may believe they have the right to approve or override the same work.**

### D3 — Accountability

**People can be held responsible for outcomes even when ownership is ambiguous.**

### D4 — Interfaces

**When responsibility becomes ambiguous, it is unclear where the issue should be escalated.**

Dimensions assessed:

- Authority: 2
- Accountability: 1
- Interfaces: 1

Potential composite:

`false_delegation`

---

# Branch E — Work breaks down between people, teams or handoffs

### E1 — Interfaces

**Work is handed over without sufficiently clear expectations about what “ready” or “done” means.**

### E2 — Interfaces

**When a dependency breaks down, it is often unclear who should resolve it.**

### E3 — Information / Context

**Important context is lost when work moves between people or teams.**

### E4 — Accountability

**Each part may complete its own responsibility while the overall outcome still lacks a clear owner.**

Dimensions assessed:

- Interfaces: 2
- Information / Context: 1
- Accountability: 1

Potential composite:

`interface_breakdown`

---

# Branch F — We are consistently overloaded or overcommitted

### F1 — Capacity

**The team regularly commits to more work than available time and resources can realistically support.**

### F2 — Capacity

**New priorities are added without clearly stopping or deprioritizing existing work.**

### F3 — Authority

**People responsible for delivery have limited ability to renegotiate unrealistic commitments.**

### F4 — Interfaces

**Overload becomes worse because dependencies or coordination between people create additional work.**

Dimensions assessed:

- Capacity: 2
- Authority: 1
- Interfaces: 1

Potential route:

`internal_capacity_action`

Do not assume overload is an accountability problem.

---

# Branch G — Important information doesn't reach the right people

### G1 — Information / Context

**People making important decisions often lack relevant information from execution.**

### G2 — Information / Context

**Important signals arrive too late to meaningfully change priorities or decisions.**

### G3 — Interfaces

**Information tends to get stuck between teams, roles or organizational layers.**

### G4 — Adaptation

**Even when important information reaches decision-makers, it does not consistently change what the organization does.**

Dimensions assessed:

- Information / Context: 2
- Interfaces: 1
- Adaptation: 1

Potential composite:

`strategy_execution_disconnect`

---

# Branch H — We keep discussing the same problems without changing them

### H1 — Adaptation

**The same organizational problems are discussed repeatedly without producing observable changes.**

### H2 — Adaptation

**Changes are introduced, but the team rarely checks whether they actually worked.**

### H3 — Accountability

**Conversations produce agreements, but those agreements are not consistently revisited.**

### H4 — Power / Relationships

**Some people may understand what needs to change but lack the influence to make it happen.**

Dimensions assessed:

- Adaptation: 2
- Accountability: 1
- Power / Relationships: 1

Potential composites:

- `agreement_without_accountability`
- `known_problem_blocked_change`

---

# Branch I — It is difficult to disagree or raise important problems openly

### I1 — Power / Relationships

**People hesitate to challenge decisions because of hierarchy, status or relationships.**

### I2 — Power / Relationships

**Bad news or uncomfortable information may be softened, delayed or avoided.**

### I3 — Information / Context

**Decision-makers may receive a more positive picture of reality than people closer to the work experience.**

### I4 — Adaptation

**Even when concerns are raised, they do not consistently change decisions or behavior.**

Dimensions assessed:

- Power / Relationships: 2
- Information / Context: 1
- Adaptation: 1

Potential composite:

`blocked_truth_to_change`

---

# 14. General Screening route

Used for:

- J — “I'm not sure”
- K — “Something else”

Ask one high-information item per core dimension.

### S1 — Authority

**Important work sometimes gets stuck because actual decision authority is unclear or concentrated in unexpected places.**

### S2 — Accountability

**Important agreements sometimes fail to become action because ownership or follow-through is unclear.**

### S3 — Information / Context

**People sometimes make decisions without important context that exists elsewhere in the organization.**

### S4 — Interfaces

**Work sometimes breaks down when it moves between people or teams.**

### S5 — Capacity

**The organization regularly commits to more than people can realistically deliver.**

### S6 — Power / Relationships

**People sometimes hesitate to raise important concerns because doing so feels personally or politically costly.**

### S7 — Adaptation

**The same organizational problems sometimes repeat without meaningful changes in how the team works.**

Score each `0–4`.

Select the two highest dimensions where score ≥ 2.

Then:

- ask one additional deepening probe for each selected dimension;
- if only one dimension ≥ 2, ask the one supplied deepening probe for that dimension;
- if none ≥ 2, do not invent a mechanism.

The General Screening path is intentionally longer than the normal path.

---

# 15. General Screening deepening probes

Use only when triggered.

## Authority

**A decision that appears delegated can still be reopened or overridden by someone else.**

## Accountability

**People can be responsible for outcomes without a clear owner, review point or sufficient authority.**

## Information / Context

**Relevant information often arrives after the moment when it could have changed a decision.**

## Interfaces

**When a handoff fails, people do not always know who should resolve the dependency.**

## Capacity

**New priorities are often added without explicitly removing or renegotiating existing commitments.**

## Power / Relationships

**There are important issues people know about but find difficult to discuss openly.**

## Adaptation

**The team can recognize a recurring problem without producing an observable change afterward.**

---

# 16. Conditional Founding Agreements mini-module

Do not expose this as a standard section.

Activate only when:

- Q1 = Founder / partner;
- and the presenting problem plausibly involves authority, dependency, accountability or something else;
- and there is more than one founder/partner.

If the site does not currently know whether multiple founders exist, ask:

## F0

**Are there multiple founders or partners with meaningful responsibility for the organization?**

- Yes
- No

If No, skip module.

If Yes, ask:

### F1

**Important expectations around founder contribution, authority, money or ownership remain partly implicit.**

### F2

**It is unclear what should happen if a founder's contribution, availability or relationship to the organization changes substantially.**

If either ≥ 3, flag:

`founding_agreement_friction = true`

Do not automatically override a higher-priority safety route.

---

# 17. Consequence

Ask all respondents.

## Q4. How often does this problem meaningfully affect work?

- Less than monthly
- Monthly
- Several times per month
- Weekly
- Almost every day

Internal frequency:

`0–4`

---

## Q5. When it happens, how consequential is it?

- Minor inconvenience
- Noticeable but manageable
- Meaningful operational friction
- Material consequence for execution, people or results
- Serious risk or major consequence

Internal consequence:

`0–4`

---

# 18. Severity matrix

Do not average frequency and consequence.

| Consequence ↓ / Frequency → | Rare | Monthly | Several/month | Weekly | Daily |
|---|---|---|---|---|---|
| Minor | Low | Low | Low | Moderate | Moderate |
| Manageable | Low | Low | Moderate | Moderate | Material |
| Meaningful friction | Moderate | Moderate | Material | Material | High |
| Material consequence | Material | Material | Material | High | High |
| Serious risk | High | High | High | High | High |

---

# 19. Self-correction

Ask all respondents.

## Q6. When your team recognizes a recurring organizational problem like this, what usually happens?

- We usually change something and later check whether it worked
- We usually change something, but do not consistently review it
- Sometimes something changes
- We discuss it, but little changes
- The same problem usually continues

Internal values for self-correction strength:

`4 / 3 / 2 / 1 / 0`

Interpretation:

- 3–4 Strong
- 2 Moderate
- 0–1 Weak

This measures:

> **Can this system repair itself?**

---

# 20. Readiness

Ask all respondents.

## Q7. Is there someone with enough authority to change roles, decision rights or working practices if necessary?

- Yes
- Probably
- Unsure
- Probably not
- No

Internal:

`4 / 3 / 2 / 1 / 0`

---

## Q8. If a change were needed, would the relevant leadership be willing and able to test a different way of working in the next month or two?

- Yes
- Probably
- Unsure
- Probably not
- No

Internal:

`4 / 3 / 2 / 1 / 0`

Readiness:

`mean(Q7, Q8)` using their mapped strength values

Interpretation:

- 3–4 High
- 2 to below 3 Moderate
- 0 to below 2 Low

If Q7 = 0 or Q8 = 0:

normally do not recommend a standard paid intervention.

---

# 21. Scope / safety check

Ask all respondents before generating the result.

## Q9. Is the situation primarily about any of the following?

Multi-select:

- Active harassment or discrimination concern
- Violence, threats or safeguarding concern
- Retaliation for reporting a problem
- Suspected fraud or criminal behavior
- Active labor or legal dispute
- Acute mental-health or personal-safety concern
- Severe interpersonal conflict that may require specialized mediation
- None of these
- Unsure

If anything except `None of these` is selected:

`humanReviewRecommended = true`

Route:

`specialist_or_human_review`

Do not generate legal, clinical or safeguarding conclusions.

---

# 22. Typical path length

Normal presenting-problem route:

- Q1 Role
- Q2 Presenting problem
- 4 mechanism probes
- Q4 Frequency
- Q5 Consequence
- Q6 Self-correction
- Q7 Authority to change
- Q8 Willingness/readiness
- Q9 Scope/safety

Total:

**12 required closed questions: 9 numeric questions plus role, presenting problem and safety**

Plus optional concrete example.

Conditional Founding Agreements may add:

**2–3 questions**

General Screening route may be longer:

**15–17 required closed questions**, before any conditional founding module

This longer route is acceptable because it is used only when the respondent cannot identify a presenting problem.

---

# 23. Mechanism scoring

Only score dimensions that were actually assessed.

For each assessed dimension:

`dimensionScore = mean(answered probes assigned to that dimension)`

Status:

- `<1.5` = little evidence of friction
- `1.5–2.49` = possible friction
- `2.5–3.24` = likely friction
- `3.25–4` = strong friction

Do not expose raw numeric scores by default.

Untested dimension:

`not_assessed`

---

# 24. Pattern selection

## Primary pattern

Select the highest assessed dimension where:

`score >= 2.5`

If no dimension reaches 2.5:

do not manufacture a primary mechanism.

---

## Secondary pattern

Show a second dimension when:

- score ≥ 2.5;
- and it meaningfully contributes to the presenting situation.

If two dimensions are close and conceptually linked, use a combined pattern.

Examples:

- Authority + Accountability
- Information + Interfaces
- Power + Adaptation

---

## Composite patterns

Use only when underlying assessed signals support them.

### Founder / key-person dependency

Possible supporting pattern:

- presenting problem B;
- Authority, Information or Capacity friction;
- dependency concentrated in one/few people.

### Agreement without accountability

- Accountability likely/strong;
- Adaptation possible/likely.

### False delegation

- Authority likely/strong;
- responsibility exists but actual authority does not.

### Interface breakdown

- Interfaces likely/strong;
- Information or Accountability supports it.

### Strategy–execution disconnect

- Information likely/strong;
- Interfaces or Adaptation supports it.

### Known problem / blocked change

- Adaptation likely/strong;
- Power friction and/or low readiness.

Composite patterns must never override the actual assessed evidence.

---

# 25. Confidence

v1.2 should be conservative.

## High

Use only when:

- primary dimension has at least two supporting probes;
- signals are internally consistent;
- presenting problem and mechanism evidence align;
- respondent vantage point appears appropriate.

## Medium

Default for most valid short-form results.

Use when:

- evidence is directionally consistent;
- but the instrument only explored a limited subset of dimensions.

## Low

Use when:

- no mechanism reaches likely friction;
- answers strongly conflict;
- many answers are unsure;
- General Screening produces weak/mixed signals;
- respondent appears unable to observe the relevant system.

Low confidence should favor:

`clarify_or_explore`

rather than a strong paid-service recommendation.

---

# 26. Routing precedence

Evaluate in this order.

## 1. Scope / safety

If Q9 flags concern:

→ `specialist_or_human_review`

---

## 2. Insufficient information

If confidence = Low and no sufficiently clear mechanism exists:

→ `insufficient_information`

Approved exception: complete answers meeting rule 3 below may reach no external intervention before this fallback. Incomplete answers cannot use that exception.

---

## 3. No meaningful external intervention

If:

- no mechanism reaches likely friction;
- severity Low;
- self-correction Strong or Moderate;

→ `no_external_intervention`

---

## 4. Not ready

If:

- severity Material or High;
- and readiness Low;

→ `not_ready`

---

## 5. Founding Agreements

If:

- founding module triggered;
- founding friction high;
- and this appears central to the presenting problem;

→ `founding_agreements`

---

## 6. Capacity / internal management action

If:

- Capacity is the clearest likely/strong mechanism;
- other assessed structural mechanisms are weak;
- problem is primarily overload/prioritization;

→ `internal_capacity_action`

---

## 7. Self-guided improvement

If:

- one bounded likely mechanism exists;
- severity Low or Moderate;
- self-correction Strong or Moderate;

→ `self_guided_improvement`

---

## 8. Targeted Coordination Intervention

If:

- one or two mechanisms are likely/strong;
- severity Material or High;
- readiness Moderate or High;

→ `targeted_coordination_intervention`

Potential service:

**Coordination Reset**

---

## 9. Broader Organizational Strategy & Design

Use conservatively.

Because v1.2 does not test every dimension, do not infer a systemic problem solely from missing data.

Recommend broader work when:

- the General Screening route identifies three or more likely/strong mechanisms;
- or the respondent's selected context clearly involves growth, restructuring, strategic transition or operating-model change and the tested mechanisms indicate material interconnected friction;
- severity is Material/High;
- readiness is Moderate/High.

→ `broader_organizational_strategy_design`

---

# 27. Self-guided practice mapping

## Authority

**Decision Reality Map**

Take five recurring decisions and identify:

- who is formally supposed to decide;
- who actually decides;
- who must be consulted;
- who can override;
- where escalation goes.

---

## Accountability

**Agreement-to-Action Check**

Take one important agreement and make explicit:

**Owner → observable outcome → review point → what happens if reality changes**

---

## Information / Context

**Decision Context Check**

Choose one delayed or poor decision.

Ask:

- What information was needed?
- Who had it?
- Who needed it?
- When did it arrive?
- Where did the signal stop?

---

## Interfaces

**Handoff Map**

Choose one recurring dependency.

Define:

- what enters;
- what “ready” means;
- who accepts;
- what context travels;
- feedback path;
- escalation path.

---

## Capacity

**Commitment Reality Check**

For current major commitments identify:

- owner;
- capacity required;
- capacity available;
- assumed trade-offs;
- what should stop if this remains a priority.

---

## Power / Relationships

**Dissent Test**

Ask:

> Which important decision would be hardest to challenge openly right now?

Then:

- Why?
- What would someone risk?
- Is there a legitimate route for dissent?
- Who could change the decision?

---

## Adaptation

**Repeated Problem Review**

Take one issue discussed repeatedly.

Map:

**signal → conversation → decision → behavior change → review**

Find where the loop stops.

---

## Founding Agreements

**Founder Stress Test**

Discuss explicitly:

- contribution;
- money;
- ownership;
- authority;
- risk;
- changing availability;
- exit.

---

# 28. User-facing result

The result page should be short.

Recommended structure:

## What may be happening

Primary or combined pattern.

## Why this may be happening

2–3 short paragraphs based only on structured answers.

Do not use the optional open-text answer for automated interpretation.

## How consequential it appears

- Low
- Moderate
- Material
- High

## Can your team probably work on this internally?

Translate self-correction + readiness into a clear explanation.

## Try this first

One relevant self-guided practice.

## Suggested next step

One route.

## Confidence

Briefly state:

- High
- Medium
- Low

Include:

> This result reflects the areas explored in this short diagnostic. It is not a complete assessment of your organization.

---

# 29. Result CTAs by route

## No external intervention

Primary CTA:

**Try the recommended practice**

Do not push a call.

---

## Self-guided improvement

Primary:

**Try this with your team**

Secondary:

**Explore whether there is a fit** only if useful.

---

## Internal capacity action

Primary:

**Review commitments and priorities internally**

No consulting CTA required.

---

## Not ready

Primary:

**Clarify who can authorize change**

Secondary call only if appropriate.

---

## Targeted Coordination Intervention

Primary:

**Explore whether there is a fit**

Destination:

`https://calendar.app.google/AuLuFdanUU9pWorCA`

Mention:

**Coordination Reset**

---

## Broader Organizational Strategy & Design

Primary:

**Explore whether there is a fit**

---

## Specialist / human review

Do not imply alexsotodigital is the appropriate provider.

---

## Insufficient information

Primary:

**Explore the situation in a conversation**

or invite the respondent to rerun the diagnostic with a more specific presenting problem.

---

# 30. Machine-readable result

Example:

```json
{
  "diagnosticVersion": "1.2",
  "presentingProblem": "key-person-dependency",
  "assessedDimensions": [
    "authority",
    "informationContext",
    "capacity",
    "adaptation"
  ],
  "mechanismProfile": {
    "authority": "likely",
    "informationContext": "likely",
    "capacity": "possible",
    "adaptation": "possible",
    "accountability": "not_assessed",
    "interfaces": "not_assessed",
    "powerRelationships": "not_assessed"
  },
  "pattern": {
    "primary": "authority",
    "secondary": "informationContext",
    "composite": "founder-or-key-person-dependency"
  },
  "severity": "material",
  "selfCorrectionCapacity": "moderate",
  "readiness": "high",
  "confidence": "medium",
  "recommendedRoute": "targeted-coordination-intervention",
  "recommendedPractice": "decision-reality-map",
  "humanReviewRecommended": false
}
```

Do not include:

- optional open text;
- organization name;
- personal names;
- sensitive organizational details.

---

# 31. Privacy

All privacy requirements from `commercial-and-privacy-config-v1.md` remain binding.

Core behavior:

**questions → browser memory → deterministic logic → local result**

No diagnostic content needs to leave the device.

---

# 32. AI / agent behavior

v1.2 is human-first.

Do not assume an AI agent can reliably answer questions about:

- informal power;
- psychological safety;
- hidden vetoes;
- willingness to change;
- interpersonal dynamics.

Future agent-assisted usage may:

- prefill factual context;
- suggest responses from available organizational evidence;
- ask the human to confirm uncertain answers.

No separate agent-only flow is required in v1.2.

---

# 33. Validation philosophy

Publish and learn.

v1.2 is intentionally a live evolving diagnostic.

Refine it from:

- completion behavior;
- confusing questions;
- routing errors;
- user feedback;
- real client work;
- practitioner critique.

Do not wait for a perfect or statistically validated instrument before publishing.

Do not describe it as scientifically validated.

---

# 34. Success criteria for v1.2

The implementation is working as intended when:

- typical paths contain roughly 9–12 scored questions;
- the normal user never sees the entire internal taxonomy;
- users know whether to continue and cannot accidentally jump around;
- the diagnostic usually takes around five minutes;
- the result identifies only dimensions actually assessed;
- healthy/bounded cases can avoid a consulting recommendation;
- capacity-only problems can route to internal action;
- low-readiness cases do not receive aggressive sales CTAs;
- the user receives a practical action regardless of purchase;
- no diagnostic answers leave the device;
- the model remains easy to refine.

---

# 35. Core positioning principle

> **This is not a test of how “good” your organization is. It is a short way to narrow down what may actually be making work harder than it should be, and identify the smallest useful next step.**
