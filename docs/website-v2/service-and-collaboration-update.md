# Service and collaboration update

Accepted by Alex on 2026-11-24. This decision supersedes earlier service names,
commercial routing and collaboration descriptions in the v2 planning documents.

## Services

- System Diagnosis: a paid, standalone investigation with evidence, hypotheses,
  priorities and a first experiment designed for execution. Execution is not
  automatically included.
- Learning Lab: agree a concrete change to test, then accompany multiple cycles
  of experimentation and review. Seek observable improvement without promising
  it. Existing operations need not stop. Agree cycles, dedication and scope.
- Organizational Strategy & Design: priorities, tradeoffs, what to stop or defer,
  and the roles, authority and practices that support these choices.
- Facilitation / Strategic Working Session: may help discover and frame the
  problem as well as support decisions and agreements.

The free exploration call establishes fit and a next step; it is not a diagnosis.
The free questionnaire is optional, exploratory and not a prerequisite to contact.
Symptoms indicate possible factors, not a predetermined service. Questionnaire
results cannot establish an agreed experiment or a commercial engagement.

## Collaboration formats

- Scoped projects with agreed deliverables and review points.
- Blocks of hours for returning clients or new clients with a clear need.
- Monthly advisory support or responsibility for a defined area.
- Openness to joining an organization full-time when there is mutual fit.
- Other arrangements are welcome. The default invitation is "Let's talk".

An invitation is not automatic acceptance. Specialist safety boundaries remain.

## Pricing boundaries

Existing USD project ranges and reference estimates are unchanged:

| Service | Range | Reference |
| --- | --- | --- |
| System Diagnosis | 2,000-5,000 | 3,500 |
| Learning Lab | 4,800-10,000 | 8,000 |
| Organizational Strategy & Design | 6,400-15,000 | 12,000 |
| Facilitation / Strategic Working Session | 1,200-3,000 | 2,000 |

These are scoped-project planning estimates, not binding quotes, hourly rates,
monthly fees or salary expectations. Other formats require separate discussion.
No fixed delivery hours, monthly prices or salaries were approved or invented.
Preserving these numbers does not constitute independent market validation.

## Implementation

`content/commercial.js` and `content/services.js` supply shared commercial data.
Human-facing pages, JSON manifests, about.json and llms.txt use that source.
Legacy service IDs and fragments remain for compatibility:
`systemic-coordination-review` and `coordination-reset`. Their public labels are
System Diagnosis and Learning Lab. Do not rename IDs without a migration plan.

## Local verification

- `npm test`: build succeeded, 66 tests passed.
- 13 HTML pages and 713 local links/assets checked without errors.
- JSON and JSON-LD parse; project pricing and payment regression tests pass.
- Browser checks of home, work-with-me, hire and FAQ at 390px: no horizontal overflow.
- Desktop collaboration formats and service links reviewed.
- No commit, push, deployment or ENS update performed for this change.

## Final polish approved on 2026-11-24

- System Diagnosis conditions now cover organizational difficulties, not only
  coordination failures. Facilitation only requires decision authority when a
  decision is intended. Strategy phases exclude automatic experiment execution.
- Mobile identity retains the avatar, name and specialty. Native HTML details
  provide navigation without a JavaScript dependency; full desktop metadata and
  navigation remain unchanged.
- Service summaries retain problem, outcome, price and scope boundaries. Process,
  inputs, participation and responsibilities remain in expandable HTML and the
  full machine-readable manifests.
- Home separates Services from Collaboration formats, uses a compact format
  summary, and no longer repeats its research essay in Selected writing.
- GitHub Actions now runs `npm test` (including the build) before Pinata upload.

Final local checks: 69 tests passed; 13 HTML pages and 835 local links/assets
validated. All 13 pages were checked at 320, 390 and 1280 pixels without horizontal
overflow or broken images. Native navigation and service disclosures worked.
At 390px, content starts around 199px rather than 629px; the initial work-with-me
page height decreased from 16,625px to 10,935px. Expanded content is still present.

Alex authorized commit, push and IPFS publication after these checks. ENS remains
manual and must not be updated as part of this release. Confirm the workflow CID
and gateway output before proposing any ENS change.
