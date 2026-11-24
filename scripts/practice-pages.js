const { commercial, priceRange, referencePrice } = require("../content/commercial");
const { services, phases, legacyServiceIds } = require("../content/services");
const { site, practice, projects, articles } = require("../content/site-data");

module.exports = function practicePages(h) {
  const { escapeHtml: e, linkTo: link, list, card, pageHeader, flowerDivider, articleLinks, articleMeta, writePage, evidenceList } = h;
  const ctas = () => `<div class="cta-row">${link(site.ctas.primary.href, site.ctas.primary.label, "button")}${link(site.ctas.diagnostic.href, site.ctas.diagnostic.label, "button secondary")}</div>`;
  const collaboration = (compact = false) => `<section class="band" id="collaboration-formats"><h2>${e(commercial.collaboration.title)}</h2>${compact
    ? `${list(commercial.collaboration.formats.map(format => format.title), "tag-list")}<p>${e(commercial.collaboration.invitation)}</p>${link("/hire/#collaboration-formats", "Explore collaboration formats", "text-link")}`
    : `<p>${e(commercial.collaboration.description)}</p><dl>${commercial.collaboration.formats.map(format => `<dt><strong>${e(format.title)}</strong></dt><dd>${e(format.description)}</dd>`).join("")}</dl><p>${e(commercial.collaboration.invitation)}</p><p>The free exploration call checks mutual fit and a useful next step. It is not a diagnosis.</p>${link(site.ctas.primary.href, site.ctas.primary.label, "text-link")}`}</section>`;
  const privacy = () => `<section class="band"><h2>Confidentiality</h2><p>${e(commercial.confidentiality.description)}</p></section>`;
  const research = () => {
    const article = articles.find((a) => a.id === "what-breaks-when-teams-try-to-coordinate");
    return `<section class="band"><h2>Research behind the practice</h2><h3>${link(article.href, article.title)}</h3><p>${e(article.summary)}</p>${link("/writing/", "Explore the writing", "text-link")}${link("/experience/", "Experience across contexts", "text-link")}</section>`;
  };
  const phaseList = () => `<ol class="phase-list">${phases.map((p) => `<li><strong>${e(p.title)}.</strong> ${e(p.description)}</li>`).join("")}</ol>`;
  const pricingTable = () => `<div class="pricing-list">${services.map((s) => `<article><h3>${link("/work-with-me/#" + s.id, s.title)}</h3><p><strong>${e(priceRange(s.id))}</strong> per scoped project. Reference estimate: ${e(referencePrice(s.id))}.</p></article>`).join("")}</div><p>${e(commercial.priceInterpretation)}</p><p>${e(commercial.expensesNote)}</p>`;
  const serviceDetails = (s) => `<article class="card" id="${e(s.id)}">
    ${Object.entries(legacyServiceIds).filter(([, id]) => id === s.id).map(([id]) => `<span id="${e(id)}"></span>`).join("")}
    <h3>${e(s.title)}</h3><p>${e(s.problem)}</p><p>${e(s.outcome)}</p>
    <p><strong>${e(priceRange(s.id))}</strong> per scoped project. Reference estimate: ${e(referencePrice(s.id))}.</p>
    <p><strong>Scope boundary:</strong> ${e(s.boundary)}</p>
    <details class="service-details"><summary>Process, outputs and participation</summary>
    <p><strong>Quote variables:</strong> ${e(s.pricing.variables.join(", "))}.</p>
    <h4>Conditions to discuss</h4>${list(s.fitCriteria)}<h4>Limits of this engagement</h4>${list(s.notFitCriteria)}
    <h4>Work involved</h4>${list(s.workInvolved)}<h4>Your team\'s participation</h4><p>${e(s.clientParticipation)}</p><h4>Inputs</h4>${list(s.inputs)}
    <h4>Process</h4><p>${e(s.phases.map((p) => p.title).join(" → "))}.</p>
    <h4>Potential outputs</h4>${list(s.deliverables)}
    <p>${e(s.durationModel.description)}</p>
      <h4>Client responsibilities</h4>${list(s.clientResponsibilities)}
      <h4>Alex's responsibilities</h4>${list(s.providerResponsibilities)}
      <h4>Acceptance</h4>${list(s.acceptanceCriteria)}
      <p>These are scope templates, not a promise of every artifact in every engagement. Humans approve the final plan and material changes.</p>
    </details>
    ${evidenceList(s.evidence)}
    ${link("/services/" + s.id + ".json", "For AI agents · JSON", "text-link")}
  </article>`;

  function home() {
    const body = `<section class="hero"><p class="kicker">Independent expert practice</p><h1>Alex Soto</h1>
      <p><strong>${e(site.title)}</strong></p><p>${e(site.positioning)}</p><p>${e(site.supportingLine)}</p>${ctas()}</section>
      <section class="band"><h2>When work keeps getting stuck</h2>${list(practice.problems.map((p) => p.title))}<p>${e(site.thesis)}</p></section>
      <section class="band"><h2>What can become clearer</h2>${list(["Who can actually decide", "How agreements become owned outcomes", "Where information and handoffs break down", "Which commitments exceed available capacity", "How the team can correct recurring problems"])}</section>
      <section class="band"><h2>How I work</h2><p>${e(practice.approachSummary)}</p>${phaseList()}${link("/methods/", "Tools chosen for the situation", "text-link")}</section>
      ${flowerDivider("/")}
      ${research()}
      <section class="band"><h2>Services</h2><p>${e(practice.audienceSummary)} ${e(site.workingContext)}</p>
      <div class="stack">${services.map((s) => card({id: s.id, title:s.title, summary:s.problem, extra: link("/work-with-me/#" + s.id, "Explore " + s.title + ": scope and pricing", "text-link")})).join("")}</div></section>
      ${collaboration(true)}<section class="band"><h2>An optional first step, even without hiring anyone</h2><p>The free Systemic Coordination Diagnostic suggests possible mechanisms and practical next steps. It may recommend an internal practice, more information, another specialist or no external intervention.</p><p>Answers stay in your browser. No account or contact details are required.</p>${link(site.ctas.diagnostic.href, site.ctas.diagnostic.label, "button secondary")}</section>
      ${flowerDivider("/", "", 1)}
      <section class="band"><h2>Practice contexts</h2><p>Projects are laboratories through which the practice evolves, not standalone proof of success.</p><div class="stack">${projects.filter((p) => p.featured).map((p) => card({id:p.id, title:p.title, summary:p.summary, extra:link("/projects/#" + p.id, "Explore the context", "text-link")})).join("")}</div></section>
      <section class="band"><h2>Selected writing</h2><div class="stack">${articles.filter((a) => a.featured && a.id !== "what-breaks-when-teams-try-to-coordinate").slice(0, 4).map((a) => card({id:a.id, title:a.title, meta:articleMeta(a), summary:a.summary, extra:articleLinks(a)})).join("")}</div></section>
      <section class="band final-cta"><h2>Start with your situation</h2><p>Have a different arrangement in mind? You do not need to choose a service or complete the questionnaire before getting in touch. No diagnostic information is attached to the scheduling link.</p>${ctas()}</section>`;
    writePage("/", "Alex Soto", site.shortBio, body);
  }
  function work() {
    const body = `${pageHeader("Work with me", "When work keeps getting stuck", site.hiring.opening)}
      <section class="band"><h2>What may actually be happening</h2>${practice.problems.map((p) => `<article id="${e(p.id)}"><h3>${e(p.title)}</h3>${list(p.symptoms)}<h4>Possible factors to explore</h4>${list(p.possibleFactors, "tag-list")}<p>${e(p.exploration)}</p></article>`).join("")}
      <p>These tags are hypotheses to investigate, not diagnoses or automatic service recommendations. Different causes can require different responses. More process, more hierarchy or more participation is not automatically the answer.</p></section>
      <section class="band"><h2>How I work</h2><p>${e(practice.approachSummary)}</p>${phaseList()}<p>${e(practice.outcomeQualifier)}</p>${link("/methods/", "Methods as context-dependent tools", "text-link")}</section>
      ${flowerDivider("/work-with-me/")}
      <section class="band"><h2>Services</h2><p><strong>Free tool:</strong> ${link("/diagnostic/", commercial.diagnostic.title)}. A private, self-guided starting point, distinct from a paid professional review.</p>
      <div class="stack">${services.map(serviceDetails).join("")}</div><p>${e(commercial.priceInterpretation)}</p><p>${e(commercial.expensesNote)}</p></section>
      <section class="band"><h2>What I may recommend instead</h2><p>A preventive practice, an internal change, reprioritizing commitments, improving readiness or seeking another specialist may be more useful than hiring me.</p>${list(site.hiring.notFit)}</section>
      <section class="band"><h2>Reviewing progress</h2><p>Check three kinds of evidence: whether agreed artifacts exist, whether agreed activities happened and whether selected outcomes changed in real work. Faster decisions or fewer reopened commitments can be useful signs when they match the situation, not universal performance promises.</p><p>Agents may track an approved plan and flag deviations. Humans approve scope, contracts, confidentiality, payment, discounts and meaningful changes.</p></section>
      <section class="band"><h2>Impact pricing</h2><p>${e(commercial.impactPricing.description)}</p></section>
      ${collaboration()}${privacy()}${research()}
      <section class="band final-cta"><h2>Start here</h2><p>${e(site.hiring.howToStart)}</p>${ctas()}${link(site.ctas.secondary.href, site.ctas.secondary.label, "text-link")}</section>`;
    writePage("/work-with-me/", "Work with Me", site.hiring.opening, body);
  }
  function hire() {
    writePage("/hire/", site.hiring.title, site.hiring.metaDescription, `${pageHeader("Hire", "Scope and budget before a commitment", "Explore projects, blocks of hours, monthly collaboration or full-time roles. You do not need to choose a package before getting in touch.")}
      <section class="band" id="facilitation-pricing"><h2>Public pricing</h2><p>The Systemic Coordination Diagnostic is free. The ranges below apply to scoped projects only, not blocks of hours, monthly fees or salaries.</p>${pricingTable()}</section>
      <section class="band"><h2>What affects the final quote</h2>${list(commercial.priceVariables)}<p>Scope, outputs, duration and acceptance criteria are agreed in the proposal. ${e(site.workingContext)}</p>${link("/work-with-me/", "Inspect fit, inputs and expected outputs", "text-link")}</section>
      <section class="band"><h2>Impact pricing</h2><p>${e(commercial.impactPricing.description)}</p></section>
      <section class="band"><h2>Agent-supported procurement</h2><p>${e(commercial.agentInstructions)}</p>${link("/services/index.json", "For AI agents · Service catalog JSON", "text-link")}</section>
      ${collaboration()}${privacy()}<section class="band final-cta"><h2>Explore the next step</h2><p>${e(site.hiring.howToStart)}</p>${ctas()}${link(site.ctas.secondary.href, site.ctas.secondary.label, "text-link")}</section>`);
  }
  return { home, work, hire };
};
