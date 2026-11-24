const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");
const { services, legacyServiceIds } = require("../content/services");
const { site, methods, projects, articles, experience, practice } = require("../content/site-data");
const { commercial } = require("../content/commercial");
const read = (p) => fs.readFileSync(path.join(__dirname, "../dist", p), "utf8");
const walk = (dir) => fs.readdirSync(dir, {withFileTypes:true}).flatMap((item) => item.isDirectory() ? walk(path.join(dir,item.name)) : [path.join(dir,item.name)]);
const files = walk(path.join(__dirname, "../dist"));
const base = (process.env.SITE_URL || site.baseUrl).replace(/\/$/, "");

test("every JSON and JSON-LD payload parses; HTML has canonical, one h1, inline CSS and metadata", () => {
  for (const file of files) {
    const body = fs.readFileSync(file, "utf8");
    if (file.endsWith(".json") || file.endsWith(".webmanifest")) JSON.parse(body);
    if (!file.endsWith(".html")) continue;
    assert.equal((body.match(/<h1\b/g) || []).length, 1, file);
    assert.match(body, /<style>/);
    assert.match(body, /<title>[^<]+<\/title>/);
    assert.match(body, /name="description"/);
    assert.ok(body.includes('rel="canonical" href="' + base), file);
    for (const [,json] of body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(json);
  }
});
test("catalog, individual manifests and compatibility endpoint agree on four prices", () => {
  const catalog = JSON.parse(read("services/index.json"));
  const legacy = JSON.parse(read("services.json"));
  assert.equal(catalog.services.length, 4);
  assert.equal(legacy.length, 4);
  for (const s of services) {
    const manifest = JSON.parse(read("services/" + s.id + ".json"));
    assert.deepEqual(manifest.service.pricing, s.pricing);
    assert.deepEqual(catalog.services.find((x) => x.id === s.id).pricing, s.pricing);
    assert.deepEqual(legacy.find((x) => x.id === s.id).pricing, s.pricing);
    assert.ok(s.pricing.min <= s.pricing.referenceEstimate && s.pricing.referenceEstimate <= s.pricing.max);
    assert.equal(manifest.service.humanApprovalRequired.payment, true);
  }
  assert.equal(catalog.freeTools[0].price, 0);
  assert.equal(catalog.freeTools[0].transmitsResponses, false);
  assert.equal(catalog.freeTools[0].diagnosticVersion, "1.2");
});
test("old hourly prices are gone from public output", () => {
  for (const file of files.filter((f) => /\.(html|json|txt)$/.test(f))) {
    assert.doesNotMatch(fs.readFileSync(file,"utf8"), /hourlyRate|minimumBillableHours|150-200|150–200/, file);
  }
});
test("evidence IDs resolve", () => {
  const sets = { services, methods, projects, articles, experience };
  for (const records of Object.values(sets)) for (const record of records) {
    for (const [type, ids] of Object.entries(record.evidence || {})) for (const id of ids) assert.ok(sets[type].some((r) => r.id === id), type + ":" + id);
    for (const id of record.relatedServices || []) assert.ok(services.some((s) => s.id === id), id);
    for (const id of record.evidenceFor || []) assert.ok([...services,...methods].some((s) => s.id === id), id);
  }
  for (const p of practice.problems) for (const id of p.relatedServices) assert.ok(services.some((s) => s.id === id));
});
test("historical service fragments still exist", () => {
  for (const id of Object.keys(legacyServiceIds)) assert.ok(read("work-with-me/index.html").includes('id="'+id+'"'));
});
test("diagnostic is discoverable and private results have no public route", () => {
  assert.ok(read("sitemap.xml").includes(base + "/diagnostic/"));
  assert.ok(read("llms.txt").includes(base + "/diagnostic/"));
  assert.match(read("diagnostic/index.html"), /connect-src 'none'/);
  assert.doesNotMatch(read("diagnostic/index.html"), /<form\b/);
  assert.ok(!fs.existsSync(path.join(__dirname, "../dist/diagnostic/results")));
  assert.ok(read("diagnostic/index.html").includes("Your answers are processed in your browser"));
  assert.ok(read("diagnostic/index.html").includes('class="diagnostic-main"'));
  assert.doesNotMatch(read("diagnostic/index.html"), /<aside|id="diagnostic-section"|8-10 minutes/);
  const code = files.filter((f) => f.endsWith(".mjs")).map((f) => fs.readFileSync(f,"utf8")).join("\n");
  assert.doesNotMatch(code, /localStorage|sessionStorage|indexedDB|document\.cookie|fetch\(|XMLHttpRequest|sendBeacon|WebSocket|location\.(search|hash)\s*=/);
});
test("payment data unchanged and no payments page introduced", () => {
  assert.equal(createHash("sha256").update(read("payments.json")).digest("hex"), "5e82bac0ce8664b1c1ae025c05e4a191d1c9c2d3f55490b821731f8bd4dee74e");
  assert.ok(!fs.existsSync(path.join(__dirname, "../dist/payments/index.html")));
});
test("new article URL and scheduling destination are exact", () => {
  assert.equal(articles[0].href, "https://alexsotodigital.substack.com/p/what-breaks-when-teams-try-to-coordinate");
  assert.equal(commercial.schedulingUrl, "https://calendar.app.google/AuLuFdanUU9pWorCA");
  assert.ok(read("writing/index.html").includes(articles[0].href));
});

test("updated service definitions and formats reach HTML and machine-readable outputs", () => {
  assert.deepEqual(services.map(s => s.title), ["System Diagnosis", "Learning Lab", "Organizational Strategy & Design", "Facilitation / Strategic Working Session"]);
  for (const route of ["index.html", "hire/index.html", "work-with-me/index.html"]) {
    const html = read(route);
    assert.ok(html.includes("Collaboration formats"), route);
    assert.ok(html.includes("Blocks of hours"), route);
    assert.ok(html.includes("Monthly collaboration"), route);
    assert.ok(html.includes("Full-time roles"), route);
    assert.doesNotMatch(html, /Systemic Coordination Review|Coordination Reset|Possible support:/);
  }
  assert.match(read("work-with-me/index.html"), /Possible factors to explore/);
  const catalog = JSON.parse(read("services/index.json"));
  const about = JSON.parse(read("about.json"));
  assert.equal(catalog.collaboration.openToFullTimeRoles, true);
  assert.equal(about.hiring.diagnosticRequired, false);
  assert.equal(catalog.explorationCall.price, 0);
  assert.equal(catalog.collaboration.acceptanceAutomatic, false);
  assert.ok(catalog.problemExploration.every(p => p.status === "hypotheses-not-diagnoses" && p.possibleFactors.length > 1));
  assert.ok(practice.problems.every(p => p.relatedServices.length === 0));
  assert.ok(read("llms.txt").includes("Full-time roles"));
  assert.ok(read("llms.txt").includes("You do not need to choose a service"));
});

test("service conditions and phases reflect agreed boundaries", () => {
  const strategy = services.find(s => s.id === "organizational-strategy-design");
  assert.ok(!strategy.phaseIds.includes("experiment"));
  assert.match(strategy.fitCriteria.join(" "), /Competing priorities/);
  assert.match(services.find(s => s.id === "systemic-coordination-review").fitCriteria[0], /organizational difficulties/);
  assert.match(services.find(s => s.id === "facilitation").fitCriteria.join(" "), /when a decision is intended/);
});

test("compact presentation retains service detail and mobile navigation in HTML", () => {
  const work = read("work-with-me/index.html");
  assert.equal((work.match(/<details class="service-details">/g) || []).length, 4);
  for (const s of services) for (const input of s.inputs) assert.ok(work.includes(input));
  assert.match(work, /<details class="mobile-navigation">/);
  assert.match(work, /aria-label="Mobile navigation"/);
  assert.match(work, /\.desktop-identity\s*\{\s*display: none/);
  const home = read("index.html");
  assert.equal((home.match(/<h3>[^]*?What Breaks When Teams Try to Coordinate\?/g) || []).length, 1);
  assert.match(home, /Explore collaboration formats/);
});

test("IPFS workflow verifies the build before upload", () => {
  const workflow = fs.readFileSync(path.join(__dirname, "../.github/workflows/deploy-ipfs.yml"), "utf8");
  assert.ok(workflow.indexOf("run: npm test") < workflow.indexOf("name: Upload dist to Pinata"));
  assert.ok(workflow.includes("run: npm test"));
});

test("project prices remain unchanged and cannot be interpreted as salaries or monthly rates", () => {
  assert.deepEqual(services.map(s => [s.pricing.min, s.pricing.referenceEstimate, s.pricing.max]), [[2000,3500,5000],[4800,8000,10000],[6400,12000,15000],[1200,2000,3000]]);
  for(const service of services) {
    assert.equal(service.pricing.appliesTo, "scoped-project");
    assert.ok(service.pricing.excludesFormats.includes("full-time-role"));
    assert.ok(service.workInvolved.length > 0 && service.clientParticipation && service.boundary);
    assert.ok(read("work-with-me/index.html").includes('id="' + service.id + '"'));
  }
});
