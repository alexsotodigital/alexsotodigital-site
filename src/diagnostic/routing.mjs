import { thresholds } from "./config.mjs";

export function routeResult(s) {
  const severe = ["material", "high"].includes(s.severity);
  const ready = ["moderate", "high"].includes(s.readiness);
  const repairable = ["strong", "moderate"].includes(s.selfCorrectionCapacity);
  if (s.humanReviewRecommended) return "specialist-or-human-review";
  if (!s.complete) return "insufficient-information";
  // Approved exception: complete, low-consequence answers must not force a sales route.
  if (!s.likely.length && s.severity === "low" && repairable && !s.foundingFriction) return "no-external-intervention";
  if (s.confidence === "low" && (!s.likely.length && !s.foundingCentral || s.mixedSignals || s.bothUnsure)) return "insufficient-information";
  if (severe && s.readiness === "low" || s.answers.q7 === 4 || s.answers.q8 === 4) return "not-ready";
  if (s.foundingCentral) return "founding-agreements";
  const structuralWeak = Object.entries(s.scores).every(([id,v]) => id === "capacity" || id === "founding" || v === null || v < thresholds.possible);
  if (s.pattern.primary === "capacity" && structuralWeak && (s.branch === "F" || s.screening)) return "internal-capacity-action";
  if (s.likely.length === 1 && ["low", "moderate"].includes(s.severity) && repairable) return "self-guided-improvement";
  if (s.confidence !== "low" && severe && ready && s.likely.length >= 1 && s.likely.length <= 2) return "targeted-coordination-intervention";
  // There is no context question in v1.2: only screening can establish this route.
  if (s.confidence !== "low" && s.screening && s.likely.length >= 3 && severe && ready) return "broader-organizational-strategy-design";
  return "insufficient-information";
}
