import probeData from "./probes.mjs";

export const diagnosticVersion = "1.2";
export const scale = ["Not at all", "A little", "Somewhat", "Quite a lot", "Very much"];
const yesScale = ["Yes", "Probably", "Unsure", "Probably not", "No"];
const choice = (id, text, options, extra = {}) => ({ id, text, options, type: "single", ...extra });
export const dimensions = [
  { id: "authority", name: "Authority" },
  { id: "accountability", name: "Accountability" },
  { id: "informationContext", name: "Information / Context" },
  { id: "interfaces", name: "Interfaces" },
  { id: "capacity", name: "Capacity" },
  { id: "powerRelationships", name: "Power / Relationships" },
  { id: "adaptation", name: "Adaptation" },
];
export const thresholds = { possible: 1.5, likely: 2.5, strong: 3.25, screening: 2, readinessModerate: 2, readinessHigh: 3 };
export const severityMatrix = [
  ["low", "low", "low", "moderate", "moderate"],
  ["low", "low", "moderate", "moderate", "material"],
  ["moderate", "moderate", "material", "material", "high"],
  ["material", "material", "material", "high", "high"],
  ["high", "high", "high", "high", "high"],
];
export const branches = [...probeData.branches,
  { id: "J", text: "I'm not sure. Things just feel harder than they should.", probes: [] },
  { id: "K", text: "Something else", probes: [] },
];
export const coreQuestions = [
  choice("q1", "What best describes your role?", ["Founder / partner", "CEO / Executive Director", "Operations / COO", "People / HR", "Manager / team lead", "Individual contributor", "Internal consultant / organizational development", "Board / governance role", "Other"]),
  choice("q2", "What feels harder than it should right now?", branches.map(b => b.text), { hint: "Choose the most important current problem." }),
  { id: "q3", text: "Can you think of one recent example?", type: "text", hint: "If useful, describe one situation where this problem showed up in real work." },
  choice("q4", "How often does this problem meaningfully affect work?", ["Less than monthly", "Monthly", "Several times per month", "Weekly", "Almost every day"]),
  choice("q5", "When it happens, how consequential is it?", ["Minor inconvenience", "Noticeable but manageable", "Meaningful operational friction", "Material consequence for execution, people or results", "Serious risk or major consequence"]),
  choice("q6", "When your team recognizes a recurring organizational problem like this, what usually happens?", ["We usually change something and later check whether it worked", "We usually change something, but do not consistently review it", "Sometimes something changes", "We discuss it, but little changes", "The same problem usually continues"]),
  choice("q7", "Is there someone with enough authority to change roles, decision rights or working practices if necessary?", yesScale),
  choice("q8", "If a change were needed, would the relevant leadership be willing and able to test a different way of working in the next month or two?", yesScale),
  choice("q9", "Is the situation primarily about any of the following?", ["Active harassment or discrimination concern", "Violence, threats or safeguarding concern", "Retaliation for reporting a problem", "Suspected fraud or criminal behavior", "Active labor or legal dispute", "Acute mental-health or personal-safety concern", "Severe interpersonal conflict that may require specialized mediation", "None of these", "Unsure"], { type: "multi", exclusive: [7, 8] }),
];
export const mechanismQuestions = [...probeData.probes, ...probeData.deepening].map(p => choice(p.id, p.text, scale, { dimension: p.dimension, hint: "How true is this in the situation you are describing?" }));
export const foundingQuestions = [
  choice("founderGate", "Are there multiple founders or partners with meaningful responsibility for the organization?", ["Yes", "No"]),
  choice("founder1", "Important expectations around founder contribution, authority, money or ownership remain partly implicit.", scale, { dimension: "founding" }),
  choice("founder2", "It is unclear what should happen if a founder's contribution, availability or relationship to the organization changes substantially.", scale, { dimension: "founding" }),
];
export const questions = [...coreQuestions, ...mechanismQuestions, ...foundingQuestions];
export const questionById = Object.fromEntries(questions.map(q => [q.id, q]));
export const branchFor = a => branches[a.q2];
export const isScreening = a => ["J", "K"].includes(branchFor(a)?.id);
export const founderEligible = a => a.q1 === 0 && ["A", "B", "C", "D", "K"].includes(branchFor(a)?.id);
export const foundingActive = a => founderEligible(a) && a.founderGate === 0;
export const answered = (q, a) => q.type === "text" || (q.type === "multi" ? Array.isArray(a[q.id]) && a[q.id].length > 0 : Number.isInteger(a[q.id]) && a[q.id] >= 0 && a[q.id] < q.options.length);

export function screeningSelection(a) {
  if (!isScreening(a) || !probeData.probes.filter(p => p.id.startsWith("S")).every(p => answered(questionById[p.id], a))) return [];
  // Equal scores keep the published dimension order; no extra tie-breaker questions.
  return probeData.probes.filter(p => p.id.startsWith("S") && a[p.id] >= thresholds.screening)
    .sort((x, y) => a[y.id] - a[x.id]).slice(0, 2).map(p => "deep-" + p.dimension);
}

export function activeQuestionIds(a) {
  const branch = branchFor(a);
  const probes = !branch ? [] : isScreening(a) ? [...Array.from({length: 7}, (_, i) => "S" + (i + 1)), ...screeningSelection(a)] : branch.probes;
  const founding = founderEligible(a) ? ["founderGate", ...(foundingActive(a) ? ["founder1", "founder2"] : [])] : [];
  return ["q1", "q2", "q3", ...probes, ...founding, "q4", "q5", "q6", "q7", "q8", "q9"];
}

export function activeQuestions(a) { return activeQuestionIds(a).map(id => questionById[id]); }
export function pruneAnswers(a) {
  const valid = {};
  for (const q of activeQuestions(a)) if (q.type !== "text" && answered(q, a)) {
    valid[q.id] = q.type === "multi" ? [...new Set(a[q.id].filter(v => Number.isInteger(v) && v >= 0 && v < q.options.length))] : a[q.id];
  }
  return valid;
}
export function stageFor(id) {
  if (["q1", "q2", "q3"].includes(id)) return "Getting started";
  if (["q4", "q5", "q6", "q7", "q8", "q9"].includes(id)) return "Almost done";
  return "Looking underneath it";
}

export const practices = {
  authority: { id: "decision-reality-map", title: "Decision Reality Map", steps: ["Take five recurring decisions.", "Identify who is formally supposed to decide, who actually decides, who must be consulted, who can override and where escalation goes."] },
  accountability: { id: "agreement-to-action-check", title: "Agreement-to-Action Check", steps: ["Take one important agreement.", "Make explicit: owner, observable outcome, review point and what happens if reality changes."] },
  informationContext: { id: "decision-context-check", title: "Decision Context Check", steps: ["Choose one delayed or poor decision.", "What information was needed? Who had it? Who needed it? When did it arrive? Where did the signal stop?"] },
  interfaces: { id: "handoff-map", title: "Handoff Map", steps: ["Choose one recurring dependency.", "Define what enters, what ready means, who accepts, what context travels, the feedback path and escalation path."] },
  capacity: { id: "commitment-reality-check", title: "Commitment Reality Check", steps: ["For current major commitments identify the owner, capacity required and capacity available.", "Make assumed trade-offs explicit: what should stop if this remains a priority?"] },
  powerRelationships: { id: "dissent-test", title: "Dissent Test", steps: ["Privately consider which important decision would be hardest to challenge openly right now.", "Why? What would someone risk? Is there a legitimate route for dissent? Who could change the decision?", "Do not confront others where doing so could put someone at risk."] },
  adaptation: { id: "repeated-problem-review", title: "Repeated Problem Review", steps: ["Take one issue discussed repeatedly.", "Map signal, conversation, decision, behavior change and review. Find where the loop stops."] },
  founding: { id: "founder-stress-test", title: "Founder Stress Test", steps: ["Discuss contribution, money, ownership, authority, risk, changing availability and exit explicitly.", "Use qualified advice for binding legal or financial decisions."] },
};
