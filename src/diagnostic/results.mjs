import { diagnosticVersion, dimensions, practices, branches } from "./config.mjs";
import { scoreAnswers, frictionLevel } from "./scoring.mjs";
import { routeResult } from "./routing.mjs";

export const routes = {
  "no-external-intervention": { title: "No external intervention needed", interpretation: "No likely mechanism stands out and the consequences appear limited. Your answers suggest that the team can probably respond internally.", action: "Keep a preventive review practice. This result does not indicate a need for outside support.", cta: "Try the recommended practice", practice: "adaptation" },
  "self-guided-improvement": { title: "Self-guided improvement", interpretation: "One bounded pattern appears worth addressing internally first.", action: "Try the practice with a concrete situation and check what changes.", cta: "Try this with your team" },
  "internal-capacity-action": { title: "Internal capacity action", interpretation: "Overload and prioritization appear to be the clearest constraint among the areas explored.", action: "Review commitments and trade-offs before treating overload as an accountability failure.", cta: "Review commitments and priorities internally", practice: "capacity" },
  "not-ready": { title: "Clarify readiness first", interpretation: "The conditions for changing how work happens may not yet be in place.", action: "Identify who can authorize a small change and whether leadership is willing and able to test it.", cta: "Clarify who can authorize change" },
  "founding-agreements": { title: "Examine Founding Agreements", interpretation: "Implicit expectations among founders or partners may be central to this situation.", action: "Discuss expectations first. Binding ownership, financial or legal questions require qualified professional advice.", practice: "founding", cta: "Try the recommended practice" },
  "targeted-coordination-intervention": { title: "Explore a bounded next step", interpretation: "One or two consequential mechanisms may be worth exploring. This does not determine which service or format is appropriate.", action: "Let's talk about fit and a useful next step. A Learning Lab becomes an option when a concrete change to test has been agreed; this questionnaire cannot establish that agreement. A free call is not a diagnosis or a commitment to an intervention.", call: true },
  "broader-organizational-strategy-design": { title: "Explore priorities and organizational context", interpretation: "Screening found at least three likely mechanisms with material consequences. This suggests exploring how they interact, not automatically selecting a larger engagement.", action: "A conversation can help establish fit and the next step. Prioritization, deeper diagnosis, facilitation or experimentation may be relevant depending on context; organization size and the questionnaire alone do not choose the service.", call: true },
  "specialist-or-human-review": { title: "Specialist / human review", interpretation: "A concern may fall outside the scope of this coordination tool. This is not a legal, clinical or safeguarding determination.", action: "Seek an appropriate qualified specialist or trusted support route. This result does not establish Alex as the appropriate provider." },
  "insufficient-information": { title: "More information would help", interpretation: "These answers do not support a sufficiently clear recommendation, or the combination needs further exploration.", action: "Rerun the diagnostic with a more specific presenting problem. Do not treat uncertainty as evidence that a paid intervention is needed.", restart: true },
};

const interpretations = {
  authority: "Compare formal decision responsibility with who can actually decide or override.",
  accountability: "Check whether agreements lead to owned outcomes and a review point.",
  informationContext: "Trace whether relevant information reaches the people making decisions in time.",
  interfaces: "Look at dependencies and handoffs rather than individual performance alone.",
  capacity: "Compare commitments with available time and resources.",
  powerRelationships: "Consider whether important concerns can be raised without unreasonable personal cost.",
  adaptation: "Look for observable change and review after a problem is recognized.",
};

export function evaluate(input) {
  const state = scoreAnswers(input);
  const recommendedRoute = routeResult(state);
  const route = routes[recommendedRoute];
  let practice = practices[route.practice || state.pattern.primary || "adaptation"];
  if (recommendedRoute === "specialist-or-human-review") practice = { id: "safe-human-review", title: "Scope and safety first", steps: ["Identify an appropriate specialist or trusted support route without adding identifying details here.", "Defer coordination exercises if they could increase risk. Do not confront others or investigate a concern through this tool."] };
  if (recommendedRoute === "insufficient-information") practice = { id: "concrete-example-review", title: "Review one concrete situation", steps: ["Choose one recent decision, agreement or handoff.", "Separate what you observed from what you inferred, then revisit the questions."] };
  if (recommendedRoute === "not-ready") practice = { id: "readiness-check", title: "Clarify who can authorize change", steps: ["Identify who has authority to change the relevant working practices.", "Clarify whether leadership is willing and able to test one small change before starting an engagement."] };
  const summary = {
    diagnosticVersion,
    presentingProblem: state.branch ? branches.find(b => b.id === state.branch).text : null,
    assessedDimensions: Object.entries(state.scores).filter(([,v]) => v !== null).map(([id]) => id),
    mechanismProfile: Object.fromEntries(Object.entries(state.scores).map(([id,v]) => [id, frictionLevel(v)])),
    pattern: state.pattern,
    severity: state.severity,
    selfCorrectionCapacity: state.selfCorrectionCapacity,
    readiness: state.readiness,
    confidence: state.confidence,
    recommendedRoute,
    recommendedPractice: practice.id,
    humanReviewRecommended: state.humanReviewRecommended,
    engagementDecision: "not-determined",
    diagnosticRequiredForContact: false,
    contactInvitation: state.humanReviewRecommended ? "appropriate-specialist-first" : "optional-conversation; no service selection required",
  };
  const selected = [state.pattern.primary, state.pattern.secondary].filter(Boolean);
  return {
    summary, route, practice,
    patternTitle: selected.length ? selected.map(id => dimensions.find(d => d.id === id).name).join(" + ") : "No clear primary mechanism",
    interpretation: selected.length ? selected.map(id => interpretations[id]).join(" ") : "No mechanism reaches likely friction in the available evidence. Untested areas are not evidence of low friction.",
    internalCapacity: state.selfCorrectionCapacity === "unknown" || state.readiness === "unknown" ? "There is not enough information about self-correction and readiness." : state.readiness === "low" ? "The team may need to establish authority and willingness to act before testing a change." : state.selfCorrectionCapacity === "weak" ? "Authority to change may exist, but past problems have not reliably led to change. Begin with an explicit experiment and review." : "Your answers suggest some ability to act internally. Try a bounded change and review what actually happens.",
    caution: state.mixedSignals ? "Some responses within the same area differ substantially. Revisit them before drawing a strong conclusion." : "One respondent has a partial view, including when they hold a leadership role.",
  };
}
