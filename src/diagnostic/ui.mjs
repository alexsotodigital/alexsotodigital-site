import { activeQuestions, pruneAnswers, answered, stageFor, dimensions } from "./config.mjs";
import { evaluate } from "./results.mjs";

const root = document.getElementById("diagnostic");
const intro = document.getElementById("diagnostic-intro");
const flow = document.getElementById("diagnostic-flow");
const questionNode = document.getElementById("diagnostic-question");
const resultNode = document.getElementById("diagnostic-result");
const feedback = document.getElementById("diagnostic-feedback");
const next = document.getElementById("diagnostic-next");
let answers = {};
let reflection = "";
let index = 0;
let result = null;
const e = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const label = value => value.replaceAll("-", " ").replaceAll("_", " ").replace(/^./, c => c.toUpperCase());

function showQuestion(focus = true) {
  const path = activeQuestions(answers);
  index = Math.min(index, path.length - 1);
  const q = path[index];
  intro.hidden = true; flow.hidden = false; resultNode.hidden = true;
  document.getElementById("diagnostic-progress").textContent = stageFor(q.id);
  questionNode.innerHTML = `<h2 id="diagnostic-question-title" tabindex="-1">${e(q.text)}</h2>
    ${q.hint ? `<p id="diagnostic-hint">${e(q.hint)}</p>` : ""}
    ${q.type === "text"
      ? `<textarea id="diagnostic-reflection" aria-labelledby="diagnostic-question-title" aria-describedby="diagnostic-optional" rows="4" maxlength="5000" autocomplete="off" spellcheck="false">${e(reflection)}</textarea><p id="diagnostic-optional">Optional. For your own reflection only; not analyzed or copied. Avoid names or identifying details.</p>`
      : `<div class="diagnostic-options" role="${q.type === "multi" ? "group" : "radiogroup"}" aria-labelledby="diagnostic-question-title" aria-describedby="diagnostic-feedback${q.hint ? " diagnostic-hint" : ""}" ${q.type === "single" ? 'aria-required="true"' : ""}>
        ${q.options.map((option, i) => `<label><input type="${q.type === "multi" ? "checkbox" : "radio"}" name="${q.id}" value="${i}" ${(q.type === "multi" ? answers[q.id]?.includes(i) : answers[q.id] === i) ? "checked" : ""}><span>${e(option)}</span></label>`).join("")}</div>`}
  `;
  next.textContent = index === path.length - 1 ? "View my result" : q.type === "text" && !reflection ? "Skip example" : "Continue";
  feedback.textContent = "";
  if (focus) document.getElementById("diagnostic-question-title").focus();
}

questionNode.addEventListener("input", event => {
  if (event.target.id !== "diagnostic-reflection") return;
  reflection = event.target.value;
  next.textContent = reflection ? "Continue" : "Skip example";
});
questionNode.addEventListener("change", event => {
  const input = event.target;
  if (!input.matches("input")) return;
  const q = activeQuestions(answers)[index];
  if (q.type === "multi") {
    if (input.checked && q.exclusive.includes(Number(input.value))) questionNode.querySelectorAll("input").forEach(other => { if (other !== input) other.checked = false; });
    else if (input.checked) questionNode.querySelectorAll("input").forEach(other => { if (q.exclusive.includes(Number(other.value))) other.checked = false; });
    answers[q.id] = [...questionNode.querySelectorAll("input:checked")].map(node => Number(node.value));
  } else answers[q.id] = Number(input.value);
  // Remove answers to branches that are no longer active after a Back/edit.
  answers = pruneAnswers(answers);
  result = null; resultNode.replaceChildren();
  feedback.textContent = "";
  questionNode.querySelector("[aria-invalid]")?.removeAttribute("aria-invalid");
});

function renderResult() {
  result = evaluate(answers);
  const { summary: s, route, practice } = result;
  flow.hidden = true; resultNode.hidden = false;
  resultNode.innerHTML = `<h2 id="diagnostic-result-title" tabindex="-1">Your initial assessment</h2>
    ${s.humanReviewRecommended ? `<h3>Scope and safety first</h3><p>${e(route.interpretation)}</p><p>${e(route.action)}</p>` : ""}
    <h3>What may be happening</h3><p><strong>${e(result.patternTitle)}</strong></p>
    <h3>Why this may be happening</h3><p>${e(result.interpretation)}</p>
    <p>This result reflects the areas explored in this short diagnostic. It is not a complete assessment of your organization. Untested dimensions were not assessed.</p>
    <h3>How consequential it appears</h3><p>${e(label(s.severity))}</p>
    <h3>Can your team probably work on this internally?</h3><p>${e(result.internalCapacity)}</p>
    <p>Self-correction: ${e(label(s.selfCorrectionCapacity))}. Readiness: ${e(label(s.readiness))}.</p>
    <h3 id="diagnostic-practice-title" tabindex="-1">Try this first: ${e(practice.title)}</h3><ol>${practice.steps.map(step => "<li>" + e(step) + "</li>").join("")}</ol>
    <h3>Suggested next step</h3><p><strong>${e(route.title)}</strong></p><p>${e(route.interpretation)}</p><p>${e(route.action)}</p>
    ${route.service ? `<p><a href="../work-with-me/#${e(route.service)}">Review service scope and pricing</a></p>` : ""}
    ${route.call ? `<a class="button" href="${e(root.dataset.schedulingUrl)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${e(root.dataset.callLabel)}</a>` : !s.humanReviewRecommended ? `<p>Questions or a different arrangement in mind? <a href="${e(root.dataset.schedulingUrl)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${e(root.dataset.callLabel)}</a>. A conversation is optional, not a recommendation to buy support.</p>` : ""}
    <h3>Confidence: ${e(label(s.confidence))}</h3><p>${e(result.caution)} The result is an exploratory hypothesis.</p>
    <details><summary>Areas explored</summary><dl>${Object.entries(s.mechanismProfile).map(([id,level]) => `<dt>${e(dimensions.find(d => d.id === id)?.name || "Founding Agreements")}</dt><dd>${level === "not_assessed" ? "Not assessed" : e(label(level)) + " evidence of friction"}</dd>`).join("")}</dl></details>
    <div class="diagnostic-result-actions"><button type="button" class="button secondary" id="copy-diagnostic">Copy machine-readable summary</button><button type="button" class="diagnostic-reset" id="diagnostic-revise">Back to answers</button><button type="button" class="diagnostic-reset" id="diagnostic-restart">Rerun diagnostic</button></div>
    <p>Copying is optional and does not send anything to Alex. Your written example and raw responses are excluded.</p>
    <details id="diagnostic-summary"><summary>Inspect the sanitized summary</summary><pre tabindex="0">${e(JSON.stringify(s, null, 2))}</pre></details><p id="diagnostic-copy-status" role="status"></p>`;
  document.getElementById("copy-diagnostic").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result.summary, null, 2));
      document.getElementById("diagnostic-copy-status").textContent = "Sanitized summary copied. Nothing was sent.";
    } catch {
      document.getElementById("diagnostic-summary").open = true;
      document.getElementById("diagnostic-copy-status").textContent = "Clipboard access is unavailable. Select and copy the summary below.";
      resultNode.querySelector("pre").focus();
    }
  });
  document.getElementById("diagnostic-revise").addEventListener("click", () => showQuestion());
  document.getElementById("diagnostic-restart").addEventListener("click", confirmRestart);
  document.getElementById("diagnostic-result-title").focus();
}
function clearAnswers() {
  answers = {}; reflection = ""; index = 0; result = null;
  questionNode.replaceChildren(); resultNode.replaceChildren(); feedback.textContent = "";
  intro.hidden = false; flow.hidden = true; resultNode.hidden = true;
}
function confirmRestart() {
  if (window.confirm("Clear all answers and restart? This cannot be undone.")) { clearAnswers(); document.getElementById("diagnostic-start").focus(); }
}
document.getElementById("diagnostic-start").hidden = false;
document.getElementById("diagnostic-start").addEventListener("click", () => showQuestion());
document.getElementById("diagnostic-back").addEventListener("click", () => {
  if (index === 0) { flow.hidden = true; intro.hidden = false; document.getElementById("diagnostic-start").focus(); }
  else { index--; showQuestion(); }
});
next.addEventListener("click", () => {
  const path = activeQuestions(answers);
  if (!answered(path[index], answers)) {
    feedback.textContent = path[index].type === "multi" ? "Select at least one answer, including None of these or Unsure when appropriate." : "Choose an answer before continuing.";
    questionNode.querySelector('[role="radiogroup"], [role="group"]')?.setAttribute("aria-invalid", "true");
    questionNode.querySelector("input")?.focus(); return;
  }
  if (index === path.length - 1) renderResult();
  else { index++; showQuestion(); }
});
document.getElementById("diagnostic-reset").addEventListener("click", confirmRestart);
window.addEventListener("pagehide", clearAnswers);
clearAnswers();
