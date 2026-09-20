# AI Readability Review

Reviewed: September 19, 2026. Scope: local generated site, not the deployed ENS release.

## Conclusion

The content supports identifying Alex, assessing fit, understanding the practice, estimating a one-off facilitation budget and making contact. This is a content-coverage and technical inspection, not proof that a search engine indexes the release or that an LLM will recommend Alex correctly. No autonomous hiring, booking or payment capability is claimed.

## Questions the Content Answers

| Agent question | Source | Assessment |
| --- | --- | --- |
| Who is Alex? Which identity is canonical? | `about.json`, `/identity/`, Person JSON-LD | Alex Soto; Governance & Coordination Specialist. Handle and ENS are secondary identifiers. |
| What does he do and for whom? | `about.json`, `services.json`, `/work-with-me/` | Organizational development, governance, coordination and facilitation; audiences and problems are explicit. |
| Where and in what languages? | `about.json`, Person JSON-LD | Mexico/LATAM, remote international work, Spanish and English. No exact working-hour commitment. |
| How does he work? | `/methods/`, `about.json` practice.methods, `llms.txt` | Methods, symptoms, outputs and related services are described. No separate methods endpoint is needed to answer this. |
| What is his motivation? | `/about/#this-is-my-why`, `about.json` personal | Alex's supplied first-person account. Personal explorations do not constitute clinical credentials or additional services. |
| What evidence supports the practice? | `/experience/`, `experience.json`, `/projects/`, `/writing/` | Activities, roles, public references and writing; not independently verified outcomes or guaranteed client results. |
| What would an engagement produce? | `services.json` deliverables and formats | Described per service; final scope still needs agreement. |
| Can a client afford a session? | `/hire/`, `about.json` hiring.pricing, `services.json`, `llms.txt` | USD 150-200 per billable hour, minimum three hours, stated inclusions and additional costs. |
| What about longer or pro bono engagements? | Same pricing sources | Scope-and-outcomes proposal; possible lower effective rate, no guaranteed discount. Pro bono requires individual agreement. |
| How does someone make contact? | `/hire/`, `about.json` hiring, `links.json` | Google Calendar or email, with a collaboration brief. A meeting slot does not imply project capacity. |
| How can someone pay safely? | `payments.json`, `/identity/` | Existing network, identifiers, assets and safety instructions. Confirm scope before payment. No payment changes made in this review. |

Example: four agreed billable hours imply USD 600-800 before taxes and extraordinary expenses. A four-hour live session does not necessarily mean four total billable hours. A multi-month project cannot be priced by blindly extending this hourly reference.

## Remaining Decisions, Not Facts to Invent

- Project start availability, weekly capacity and expected response time.
- Typical durations and engagement constraints (team size, preparation requirements, remote/on-site fit).
- Fixed project/package budgets, if Alex ever wants to publish them.
- Contract terms such as deposits, cancellation, rescheduling, confidentiality and ownership of deliverables.
- Measured outcomes or client references beyond the existing public evidence, only with appropriate evidence and permission.

These gaps do not block a first contact or preliminary fit assessment. They prevent a reliable final quote or automatic commitment, appropriately.

## Technical Checks

- Build succeeds; 11 HTML pages include their content without requiring client-side rendering.
- Seven JSON endpoints and embedded JSON-LD parse. This is not an external schema-validator certification.
- `llms.txt` references all seven endpoints, including experience and payments.
- Sitemap uses `https://alexsotodigital.eth.limo/`; robots.txt permits crawling.
- Local internal links, fragment targets and image assets resolve.
- New About copy is generated from the same data used by `about.json`.

## Pre-publication Checks: September 20, 2026

- Build passed after the mobile avatar and About subheadings refinement. The 19 supplied personal paragraphs remain unchanged; four subheadings only organize their reading order.
- All 11 pages have inline CSS, valid embedded JSON-LD and the expected ENS gateway canonical URLs. Checked 653 local links, assets and fragment targets; sitemap entries are unique and robots.txt allows crawling.
- Browser checks at 320 and 390 pixels found no horizontal overflow or missing images across all 11 pages. Desktop About and Hire were visually reviewed; the mobile avatar is 96 pixels and the desktop avatar retains its existing size.
- The email menu exposes Gmail, a mailto link and a copy button; clicking Copy email shows the copied confirmation. No email was sent and no booking was made.
- Pricing agrees across the source, about.json and services.json: USD 150-200/hour, three-hour minimum (USD 450-600), explicit exclusions, project-based longer work and individually agreed pro bono work.
- Compared payment data with the previous commit: wallet, network, assets and other payment fields are unchanged. Contact guidance replaces Calendly with Google Calendar as requested.
- This records local verification only. A new IPFS release still requires gateway verification; ENS activation is a separate manual action.

## What GEO Cannot Guarantee

Google states that indexing and serving content are not guaranteed and that its Search systems do not use llms.txt as a special optimization signal. Keep llms.txt for consumers that use it, not as a promise of visibility. See [Google's generative AI guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

Bing offers citation reporting for supported AI surfaces in Webmaster Tools; it is evidence for those surfaces, not every LLM. See [Bing AI Performance](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview).

After publication: verify the actual ENS release and gateway availability; then use authorized Search Console/Bing Webmaster access to check indexing and observed discovery. Test representative identity, service-fit and budget questions against real retrieval-enabled agents and compare their answers to the source. None of those external indexing or model-performance checks was performed here. No new tracking or account connections were added.
