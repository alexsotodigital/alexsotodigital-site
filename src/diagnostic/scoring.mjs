import { dimensions, thresholds, severityMatrix, activeQuestions, pruneAnswers, isScreening, foundingActive, answered, branchFor } from "./config.mjs";
export const mean = values => values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : null;
export const frictionLevel = score => score === null ? "not_assessed" : score < thresholds.possible ? "little" : score < thresholds.likely ? "possible" : score < thresholds.strong ? "likely" : "strong";

export function scoreAnswers(input) {
  const answers = pruneAnswers(input);
  const active = activeQuestions(answers);
  const complete = active.filter(q => q.type !== "text").every(q => answered(q, answers));
  const evidence = Object.fromEntries(dimensions.map(d => [d.id, active.filter(q => q.dimension === d.id && answered(q, answers)).map(q => answers[q.id])]));
  const scores = Object.fromEntries(Object.entries(evidence).map(([id, values]) => [id, mean(values)]));
  const founding = foundingActive(answers);
  if (founding) scores.founding = mean(["founder1", "founder2"].filter(id => Number.isInteger(answers[id])).map(id => answers[id]));
  const foundingFriction = founding && [answers.founder1, answers.founder2].some(v => v >= 3);
  const severity = severityMatrix[answers.q5]?.[answers.q4] || "unknown";
  const correction = Number.isInteger(answers.q6) ? 4 - answers.q6 : null;
  const selfCorrectionCapacity = correction === null ? "unknown" : correction >= 3 ? "strong" : correction === 2 ? "moderate" : "weak";
  const readinessScore = [answers.q7, answers.q8].every(Number.isInteger) ? mean([4 - answers.q7, 4 - answers.q8]) : null;
  const readiness = readinessScore === null ? "unknown" : readinessScore >= thresholds.readinessHigh ? "high" : readinessScore >= thresholds.readinessModerate ? "moderate" : "low";
  const humanReviewRecommended = (answers.q9 || []).some(v => v !== 7);
  const likely = dimensions.map(d => [d.id, scores[d.id]]).filter(([,v]) => v !== null && v >= thresholds.likely).sort((x,y) => y[1] - x[1]);
  const primary = likely[0]?.[0] || null;
  const secondary = likely[1]?.[0] || null;
  // Within-dimension disagreement is a caution, not a claim that the respondent is wrong.
  const mixedSignals = Object.values(evidence).some(values => values.length >= 2 && Math.max(...values) - Math.min(...values) >= 3);
  const bothUnsure = answers.q7 === 2 && answers.q8 === 2;
  let confidence = "medium";
  if (!complete || !primary || mixedSignals || bothUnsure) confidence = "low";
  else if (evidence[primary].length >= 2 && evidence[primary].every(v => v >= thresholds.likely) && Math.max(...evidence[primary]) - Math.min(...evidence[primary]) <= 1 && answers.q1 <= 2 && answers.q7 !== 2 && answers.q8 !== 2) confidence = "high";
  const at = (id, threshold = thresholds.likely) => scores[id] !== null && scores[id] >= threshold;
  const branch = branchFor(answers)?.id;
  const composite = [];
  if (branch === "B" && ["authority", "informationContext", "capacity"].some(id => at(id))) composite.push("founder-or-key-person-dependency");
  if (at("accountability") && at("adaptation", thresholds.possible)) composite.push("agreement-without-accountability");
  if (at("authority") && ["A2", "B1", "C3", "D1", "deep-authority"].some(id => answers[id] >= 3)) composite.push("false-delegation");
  if (at("interfaces") && ["informationContext", "accountability"].some(id => at(id, thresholds.possible))) composite.push("interface-breakdown");
  if (at("informationContext") && ["interfaces", "adaptation"].some(id => at(id, thresholds.possible))) composite.push("strategy-execution-disconnect");
  if (at("adaptation") && (at("powerRelationships", thresholds.possible) || readiness === "low")) composite.push("known-problem-blocked-change");
  const foundingCentral = foundingFriction && (["A", "B", "C", "D"].includes(branch) || ["authority", "accountability"].some(id => at(id)));
  return { answers, scores, evidence, complete, likely, pattern: { primary, secondary, composite }, severity, selfCorrectionCapacity, readiness, readinessScore, confidence, mixedSignals, bothUnsure, founding, foundingFriction, foundingCentral, humanReviewRecommended, screening: isScreening(answers), branch };
}
