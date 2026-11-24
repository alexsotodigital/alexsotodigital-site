module.exports = function renderDiagnostic({ diagnostic, escapeHtml: e, commercial }) {
  return `<div class="diagnostic" id="diagnostic" data-scheduling-url="${e(commercial.schedulingUrl)}" data-call-label="${e(commercial.callLabel)}">
    <header class="diagnostic-heading"><p class="eyebrow">Systemic Coordination Diagnostic · v${e(diagnostic.diagnosticVersion)}</p>
    <h1>What is getting your team stuck?</h1></header>
    <section id="diagnostic-intro" aria-label="About this diagnostic">
      <p>When work repeatedly gets harder than it should, the visible problem is not always the underlying one.</p>
      <p>A slow decision might come from unclear authority, missing information, overloaded people, difficult team interfaces, or a decision that keeps being informally overridden.</p>
      <p>This diagnostic helps you narrow down what may actually be happening.</p>
      <h2>In about 5 minutes, you'll get:</h2>
      <ul><li>the 1–2 coordination patterns most likely affecting your situation;</li><li>an indication of how consequential they appear;</li><li>whether your team may be able to address them internally;</li><li>one practical step you can try immediately;</li><li>and, when relevant, whether deeper support may be useful.</li></ul>
      <p>The diagnostic starts from the problem you're experiencing and only asks deeper questions where they appear relevant.</p>
      <h2>Private by design</h2>
      <p><strong>Your answers are processed in your browser. They are not sent to alexsotodigital or stored on a server.</strong></p>
      <p>Refreshing or closing this page may erase your current answers.</p>
      <p>The result is an exploratory hypothesis, not a definitive assessment of your organization.</p>
      <details><summary>How does this work?</summary><p>The diagnostic does not assume that coordination problems come from a lack of structure. Depending on your situation, it may test possible issues involving decision authority, accountability, information flow, capacity, interfaces between people or teams, power dynamics, or the organization's ability to adapt.</p><p>It starts from the problem you are experiencing and only explores dimensions that appear relevant.</p><p>The result is an exploratory hypothesis, not a definitive assessment of your organization.</p></details>
      <button type="button" class="button" id="diagnostic-start" hidden>Start diagnostic</button>
      <noscript><p>JavaScript is required to run this diagnostic locally. Nothing is submitted.</p></noscript>
    </section>
    <section id="diagnostic-flow" hidden aria-label="Private coordination diagnostic">
      <p id="diagnostic-progress" role="status" aria-live="polite"></p>
      <div id="diagnostic-question"></div>
      <p id="diagnostic-feedback" role="alert"></p>
      <div class="diagnostic-controls"><button type="button" class="button secondary" id="diagnostic-back">Back</button><button type="button" class="button" id="diagnostic-next">Continue</button></div>
      <button type="button" class="diagnostic-reset" id="diagnostic-reset">Clear answers and restart</button>
    </section>
    <section id="diagnostic-result" aria-labelledby="diagnostic-result-title" hidden></section>
  </div><script type="module" src="../assets/diagnostic/ui.mjs"></script>`;
};
