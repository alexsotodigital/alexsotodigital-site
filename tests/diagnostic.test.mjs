import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { branches, questions, activeQuestions, activeQuestionIds, pruneAnswers, screeningSelection, foundingActive, severityMatrix } from "../src/diagnostic/config.mjs";
import { scoreAnswers, frictionLevel } from "../src/diagnostic/scoring.mjs";
import { evaluate } from "../src/diagnostic/results.mjs";

function fixture(branch = "A", overrides = {}) {
  const a = { q1: 2, q2: branches.findIndex(b => b.id === branch), q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: [7], ...overrides };
  for (const q of activeQuestions(a)) if (q.dimension && a[q.id] === undefined) a[q.id] = 0;
  return a;
}
const route = a => evaluate(a).summary.recommendedRoute;
const count = a => activeQuestions(a).filter(q => q.type !== "text").length;

test("exact source probe text, unique IDs, no legacy questions", () => {
  const spec = fs.readFileSync(new URL("../docs/website-v2/systemic-coordination-diagnostic-v1.2.md", import.meta.url), "utf8");
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  for (const q of questions.filter(q => q.dimension)) assert.ok(spec.includes(q.text), q.id);
  assert.ok(!questions.some(q => ["q10", "exampleConfirmed", "multipleFounders"].includes(q.id)));
});

for (const branch of branches.slice(0, 9)) test("branch " + branch.id + " contains exactly four probes and 12 required questions", () => {
  const a = fixture(branch.id);
  assert.equal(count(a), 12);
  assert.deepEqual(activeQuestions(a).filter(q => q.dimension).map(q => q.id), branch.probes);
  assert.equal(activeQuestions(a).filter(q => q.type === "text").length, 1);
  const summary = evaluate(a).summary;
  assert.ok(Object.values(summary.mechanismProfile).includes("not_assessed"));
});

test("friction thresholds and no reverse scoring", () => {
  assert.deepEqual([null, 0, 1.49, 1.5, 2.49, 2.5, 3.24, 3.25, 4].map(frictionLevel), ["not_assessed","little","little","possible","possible","likely","likely","strong","strong"]);
  const a = fixture("A", { A1: 4, A2: 2 });
  assert.equal(scoreAnswers(a).scores.authority, 3);
  assert.equal(scoreAnswers(a).scores.accountability, null);
});
for (let consequence=0;consequence<5;consequence++) for(let frequency=0;frequency<5;frequency++) test("severity matrix " + consequence + "/" + frequency, () => {
  assert.equal(scoreAnswers(fixture("A", {q4:frequency,q5:consequence})).severity, severityMatrix[consequence][frequency]);
});
test("single self-correction question only", () => {
  assert.deepEqual([0,1,2,3,4].map(q6=>scoreAnswers(fixture("A",{q6})).selfCorrectionCapacity), ["strong","strong","moderate","weak","weak"]);
});
test("readiness includes fractional means", () => {
  assert.equal(scoreAnswers(fixture("A",{q7:2,q8:3})).readiness,"low");
  assert.equal(scoreAnswers(fixture("A",{q7:1,q8:2})).readiness,"moderate");
  assert.equal(scoreAnswers(fixture("A",{q7:0,q8:2})).readiness,"high");
});
test("1: decisions, low severity, strong correction can avoid outside help", () => {
  assert.equal(route(fixture()), "no-external-intervention");
  assert.equal(route(fixture("A",{A1:3,A2:3})), "self-guided-improvement");
});
test("2: dependency and material severity routes to Coordination Reset", () => {
  const a=fixture("B",{B1:3,B2:3,B3:1,B4:1,q4:2,q5:2});
  assert.equal(route(a),"targeted-coordination-intervention");
  assert.equal(evaluate(a).summary.confidence,"medium");
});
test("3: accountability emerges without all dimensions", () => {
  const s=evaluate(fixture("C",{C1:3,C2:3,C4:2})).summary;
  assert.equal(s.pattern.primary,"accountability");
  assert.equal(s.mechanismProfile.capacity,"not_assessed");
});
test("4: bounded handoff problem uses self-guided improvement", () => {
  assert.equal(route(fixture("E",{E1:3,E2:3,q4:2,q5:0})),"self-guided-improvement");
});
test("5: overload and weak structural signals uses internal action", () => {
  assert.equal(route(fixture("F",{F1:4,F2:3,F3:1,F4:1,q4:2,q5:2})),"internal-capacity-action");
});
test("6: repeated problems with low readiness does not sell", () => {
  const a=fixture("H",{H1:3,H2:3,q4:2,q5:2,q7:3,q8:3});
  assert.equal(route(a),"not-ready");
  assert.ok(!evaluate(a).route.call);
});
test("7: screening chooses two highest qualifying dimensions with stable ties", () => {
  const a=fixture("J",{S1:4,S2:3,S3:3});
  assert.deepEqual(screeningSelection(a),["deep-authority","deep-accountability"]);
  assert.equal(count(a),17);
  a["deep-authority"]=4; a["deep-accountability"]=3;
  assert.equal(route({...a,q4:2,q5:2}),"broader-organizational-strategy-design");
  assert.equal(Object.values(evaluate(a).summary.mechanismProfile).filter(v=>v==="not_assessed").length,0);
});
test("screening zero/one qualifying dimension asks zero/one supplied deepening probe", () => {
  for(const branch of ["J","K"]) {
    const a=fixture(branch);
    assert.equal(count(a),15);
    a.S5=3;
    assert.deepEqual(screeningSelection(a),["deep-capacity"]);
    assert.equal(count(a),16);
    assert.ok(!scoreAnswers(a).complete);
  }
});
test("8: every safety concern and unsure overrides routing", () => {
  for (const value of [0,1,2,3,4,5,6,8]) {
    assert.equal(route({...fixture("F",{F1:4,F2:4}),q9:[value]}),"specialist-or-human-review");
    assert.equal(route({q9:[value]}),"specialist-or-human-review");
  }
});
test("9: founding requires role, relevant problem and Yes", () => {
  for(const branch of ["A","B","C","D","K"]) {
    const a=fixture(branch,{q1:0,founderGate:0,founder1:3,founder2:0});
    assert.ok(foundingActive(a));
    assert.equal(count(a),branch==="K"?18:15);
    if(branch!=="K") assert.equal(route(a),"founding-agreements");
    assert.equal(route({...a,q9:[8]}),"specialist-or-human-review");
    assert.equal(foundingActive({...a,founderGate:1}),false);
  }
  for(const branch of ["E","F","G","H","I","J"]) assert.ok(!activeQuestionIds(fixture(branch,{q1:0})).includes("founderGate"));
  assert.ok(!foundingActive(fixture("B",{q1:4,founderGate:0})));
});
test("missing and out-of-range answers cannot become a healthy or paid result", () => {
  assert.equal(route({}),"insufficient-information");
  const a=fixture("A",{A1:3,A2:3,q4:2,q5:2});
  delete a.A2;
  assert.equal(route(a),"insufficient-information");
  assert.equal(route({...a,A2:999}),"insufficient-information");
});
test("switching branches drops stale answers including inactive founders and deepening", () => {
  const a=fixture("A",{q1:0,founderGate:0,founder1:3,founder2:3,A1:4});
  a.q2=4;
  assert.ok(!("A1" in pruneAnswers(a)));
  assert.ok(!("founder1" in pruneAnswers(a)));
  const b=fixture("J",{S1:4,"deep-authority":4}); b.S1=0;
  assert.ok(!("deep-authority" in pruneAnswers(b)));
});
test("low confidence for internally mixed probes; complete healthy exception", () => {
  assert.equal(evaluate(fixture("A",{A1:0,A2:4})).summary.confidence,"low");
  assert.equal(route(fixture("A",{A1:0,A2:4,q4:2,q5:2})),"insufficient-information");
  assert.equal(evaluate(fixture("A",{A1:3,A2:3})).summary.confidence,"high");
  assert.equal(evaluate(fixture("A",{A1:3,A2:3,q1:4})).summary.confidence,"medium");
});
test("no paid intervention when authority or leadership says No", () => {
  for(const key of ["q7","q8"]) assert.equal(route(fixture("A",{A1:3,A2:3,q4:2,q5:2,[key]:4})),"not-ready");
});
test("three signals in normal branch do not manufacture a broad assessment", () => {
  assert.equal(route(fixture("B",{B1:3,B2:3,B3:3,B4:3,q4:2,q5:2})),"insufficient-information");
});
test("text is never read, changes no score, and never enters summary", () => {
  const a=fixture("B",{B1:3});
  const baseline=evaluate(a).summary;
  Object.defineProperty(a,"q3",{get(){throw Error("Open text read");}});
  a.organization="PRIVATE-NAME";
  assert.deepEqual(evaluate(a).summary,baseline);
  assert.equal(baseline.diagnosticVersion,"1.2");
  assert.doesNotMatch(JSON.stringify(baseline),/PRIVATE|q3|rawAnswers|scores/);
});
test("route-specific CTAs and unassessed serialization", () => {
  for(const branch of branches.slice(0,9)) {
    const result=evaluate(fixture(branch.id));
    assert.ok(!result.route.call);
    assert.ok(!JSON.stringify(result.summary).includes("undefined"));
  }
  const safety=evaluate(fixture("A",{q9:[8]}));
  assert.ok(!safety.route.call);
  assert.equal(safety.practice.id,"safe-human-review");
});

test("short diagnostic does not select Learning Lab or strategy as an agreed engagement", () => {
  const targeted = evaluate(fixture("B",{B1:3,B2:3,B3:1,B4:1,q4:2,q5:2}));
  assert.equal(targeted.summary.engagementDecision, "not-determined");
  assert.equal(targeted.route.service, undefined);
  assert.match(targeted.route.action, /concrete change to test has been agreed/);
  assert.equal(targeted.summary.diagnosticRequiredForContact, false);
  const safety = evaluate(fixture("A",{q9:[8]}));
  assert.equal(safety.summary.contactInvitation, "appropriate-specialist-first");
  assert.ok(!safety.route.call);
});
