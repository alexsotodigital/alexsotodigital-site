// Local QA only: served by audit_server.py, never copied into dist/.
const audit = document.createElement("details");
audit.id = "browser-audit";
const heading = document.createElement("summary");
heading.textContent = "Local QA: network and persistence";
const output = document.createElement("pre");
output.id = "browser-audit-output";
audit.append(heading, output);
document.body.append(audit);
const errors = [];
const networkAttempts = [];
let explicitCopyClicks = 0;
let databaseNames = null;
// Record metadata only; never record request bodies, answers or clipboard content.
const originalFetch = window.fetch;
window.fetch = function(resource, options) {
  networkAttempts.push({ api: "fetch", bodyPresent: Boolean(options?.body) });
  update();
  return originalFetch.apply(this, arguments);
};
const originalSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  networkAttempts.push({ api: "xhr", bodyPresent: Boolean(body) });
  update();
  return originalSend.apply(this, arguments);
};
const originalBeacon = navigator.sendBeacon.bind(navigator);
navigator.sendBeacon = function(url, data) {
  networkAttempts.push({ api: "beacon", bodyPresent: Boolean(data) });
  update();
  return originalBeacon(url, data);
};
if (indexedDB.databases) indexedDB.databases().then(dbs => { databaseNames = dbs.map(db => db.name); update(); });
let baseline = null;
window.addEventListener("error", (event) => { errors.push(event.message); update(); });
window.addEventListener("unhandledrejection", (event) => { errors.push(String(event.reason)); update(); });
const resources = () => performance.getEntriesByType("resource").map((entry) => ({ url: entry.name, type: entry.initiatorType }));
function update() {
  const current = resources();
  output.textContent = JSON.stringify({
    viewport: { width: innerWidth, height: innerHeight },
    overflow: document.documentElement.scrollWidth > innerWidth,
    resources: current,
    resourcesSinceFirstAnswer: baseline === null ? null : current.slice(baseline),
    localStorageKeys: Object.keys(localStorage),
    sessionStorageKeys: Object.keys(sessionStorage),
    cookiesPresent: Boolean(document.cookie),
    indexedDatabaseNames: databaseNames,
    networkAttempts,
    explicitCopyClicks,
    url: location.href,
    errors,
  }, null, 2);
}
document.addEventListener("input", () => { if (baseline === null) baseline = resources().length; update(); });
document.addEventListener("change", () => { if (baseline === null) baseline = resources().length; queueMicrotask(update); });
document.addEventListener("click", event => {
  if (event.target.closest("#copy-diagnostic")) explicitCopyClicks++;
  requestAnimationFrame(update);
});
new PerformanceObserver(update).observe({ type: "resource", buffered: true });
window.addEventListener("load", update);
update();
