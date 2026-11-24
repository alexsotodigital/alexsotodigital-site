const commercial = {
  currency: "USD",
  schedulingUrl: "https://calendar.app.google/AuLuFdanUU9pWorCA",
  callLabel: "Let's talk",
  collaboration: {
    title: "Collaboration formats",
    description: "I'm available for scoped projects, blocks of hours, and ongoing monthly collaborations, either as an advisor or taking responsibility for a defined area of work. I'm also open to full-time roles where there is a strong mutual fit.",
    invitation: "Have a different arrangement in mind, or aren't sure which format fits? Let's talk. You don't need to choose a service before getting in touch.",
    formats: [
      { id: "scoped-project", title: "Scoped projects", description: "An agreed scope, deliverables, responsibilities and review points. Progress includes what was learned and what changed, not only documents delivered.", pricingBasis: "published-project-ranges" },
      { id: "hours-block", title: "Blocks of hours", description: "Flexible support for returning clients or new clients with a clear need. We agree the hours, activities, availability and period of use.", pricingBasis: "custom-agreement" },
      { id: "monthly-collaboration", title: "Monthly collaboration", description: "Ongoing advice or responsibility for a defined area of work, with agreed dedication, priorities and review points.", modes: ["recurring-advisor", "defined-area-responsibility"], pricingBasis: "custom-agreement" },
      { id: "full-time-role", title: "Full-time roles", description: "Open to joining an organization where the purpose, responsibilities and working relationship are a strong mutual fit.", pricingBasis: "separate-role-and-compensation-discussion" },
    ],
    otherFormatsWelcome: true,
    openToFullTimeRoles: true,
    defaultNextStep: "conversation",
    acceptanceAutomatic: false,
  },
  explorationCall: { price: 0, currency: "USD", purpose: "Explore mutual fit and agree a useful next step. This is not a diagnosis or a promise of recommendations.", diagnosticRequired: false },
  diagnostic: { id: "systemic-coordination-diagnostic", title: "Systemic Coordination Diagnostic", route: "/diagnostic/", price: 0, type: "Free self-guided tool", cta: "Diagnose what is getting stuck" },
  prices: {
    "systemic-coordination-review": { min: 2000, max: 5000, referenceEstimate: 3500, variables: ["Intervention unit size", "Stakeholder count", "Organizational complexity", "Required interviews", "Evidence availability", "Depth", "Remote or in-person delivery"] },
    "coordination-reset": { min: 4800, max: 10000, referenceEstimate: 8000, variables: ["Single-team or multiple-interface scope", "Stakeholder complexity", "Experimentation and review duration", "Customization", "Remote or in-person delivery"] },
    "organizational-strategy-design": { min: 6400, max: 15000, referenceEstimate: 12000 },
    facilitation: { min: 1200, max: 3000, referenceEstimate: 2000, variables: ["Duration", "Preparation", "Participant count", "Design complexity", "Follow-up", "Travel"] },
  },
  priceInterpretation: "Public ranges are planning estimates for scoped projects, not binding quotes. The minimum reflects a bounded engagement; the reference estimate is a starting budget when context is unavailable. Blocks of hours, monthly collaborations and full-time roles are discussed separately. Scope beyond the range needs a custom review.",
  priceVariables: ["Scope", "Organizational complexity", "Stakeholder count", "Number of teams and interfaces", "Urgency", "Customization", "Remote or in-person delivery", "Travel", "Expected value"],
  exclusions: ["Applicable taxes", "Travel", "Accommodation", "Other extraordinary expenses"],
  expensesNote: "Applicable taxes and extraordinary expenses are not assumed included unless explicitly stated in the final proposal.",
  impactPricing: {
    availableByHumanReview: true,
    automaticDiscounts: false,
    description: "Discounted or pro-bono work may be considered where social or environmental impact is unusually strong and credible. Alex reviews each case; organizational category alone does not establish eligibility.",
  },
  humanApprovalRequired: { scope: true, finalQuote: true, contract: true, confidentialityTerms: true, payment: true, discount: true, proBono: true, scopeChange: true, sensitiveIntervention: true },
  agentInstructions: "Use published ranges and reference estimates for scoped-project budgeting only, not as hourly rates, monthly fees or salary expectations. Alex welcomes scoped projects, blocks of hours (including new clients with a clear need), monthly advisory or defined-area responsibility, full-time roles and other arrangements. Default to inviting a conversation; a mismatch with a package is not automatic rejection. The free exploration call checks fit and next steps, not a diagnosis. The questionnaire is optional and exploratory. Do not infer a service from a symptom or recommend Learning Lab as an agreed intervention before a concrete change to test has been agreed. Agents may compare options, prepare context and flag possible impact pricing; they cannot issue binding quotes, apply discounts, promise pro-bono work, contract or make financial commitments. Human approval and specialist safety boundaries still apply.",
  confidentiality: {
    default: "private-by-default",
    identifiableUseRequiresAuthorization: true,
    aggregatedLearningRequiresContractualPermission: true,
    caseStudies: "opt-in",
    description: "Organizational work often requires discussing tensions, conflicts and failures candidly. Project information is private by default. Client names, internal situations, identifiable cases or testimonials are never published without explicit authorization. Aggregated or anonymized learning may only be used when the engagement terms explicitly permit it.",
  },
};

function pricingFor(id) {
  return { currency: commercial.currency, ...commercial.prices[id], unit: "engagement", appliesTo: "scoped-project", excludesFormats: ["hours-block", "monthly-collaboration", "full-time-role"], bindingQuote: false, variables: commercial.prices[id].variables || commercial.priceVariables, exclusions: commercial.exclusions, impactPricing: commercial.impactPricing, finalQuoteRequiresHumanApproval: true };
}
function money(value) { return value.toLocaleString("en-US"); }
function priceRange(id) { const p = pricingFor(id); return `${p.currency} ${money(p.min)}-${money(p.max)}`; }
function referencePrice(id) { const p = pricingFor(id); return `${p.currency} ${money(p.referenceEstimate)}`; }

module.exports = { commercial, pricingFor, priceRange, referencePrice };
