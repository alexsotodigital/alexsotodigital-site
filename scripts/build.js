const fs = require("fs");
const path = require("path");
const {
  site,
  links,
  payments,
  experience,
  methods,
  services,
  projects,
  articles,
  faq,
} = require("../content/site-data");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "dist");
const configuredSiteUrl = normalizeSiteUrl(process.env.SITE_URL || site.baseUrl || "");

const nav = [
  ["Home", "/"],
  ["Work with Me", "/work-with-me/"],
  ["Projects", "/projects/"],
  ["Methods", "/methods/"],
  ["Writing", "/writing/"],
  ["FAQ", "/faq/"],
  ["Identity", "/identity/"],
];

const allRecords = {
  services,
  methods,
  projects,
  articles,
  experience,
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugPath(route) {
  return route === "/" ? outDir : path.join(outDir, route);
}

function linkTo(href, label, className = "") {
  return `<a${className ? ` class="${className}"` : ""} href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
}

function normalizeSiteUrl(value) {
  return String(value || "").replace(/\/+$/, "");
}

function fullUrl(pathname) {
  if (!configuredSiteUrl) return pathname;
  if (/^https?:\/\//.test(pathname)) return pathname;
  return `${configuredSiteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function assetUrl(pathname) {
  return fullUrl(pathname);
}

function list(items, className = "") {
  if (!items?.length) return "";
  return `<ul${className ? ` class="${className}"` : ""}>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function recordLink(type, id) {
  const map = {
    services: [services, "/work-with-me/"],
    methods: [methods, "/methods/"],
    projects: [projects, "/projects/"],
    articles: [articles, "/writing/"],
    experience: [experience, "/identity/"],
  };
  const [collection, href] = map[type] || [];
  const record = collection?.find((item) => item.id === id);
  if (!record) return "";
  return linkTo(`${href}#${id}`, record.title || record.name);
}

function evidenceList(evidence, options = {}) {
  if (!evidence) return "";
  const { compact = false } = options;
  if (compact) {
    const projectItems = (evidence.projects || []).slice(0, 1).map((id) => recordLink("projects", id));
    const articleItems = (evidence.articles || []).slice(0, 1).map((id) => recordLink("articles", id));
    const experienceItems = (evidence.experience || []).slice(0, 1).map((id) => recordLink("experience", id));
    const proofItems = [...projectItems, ...articleItems, ...experienceItems].filter(Boolean).slice(0, 2);
    return proofItems.length
      ? `<p class="proof-line"><span>Seen in</span> ${proofItems.join(", ")}</p>`
      : "";
  }
  const rows = Object.entries(evidence)
    .map(([type, ids]) => {
      const linksHtml = ids.map((id) => recordLink(type, id)).filter(Boolean).join(", ");
      if (!linksHtml) return "";
      return `<li><span>${friendlyEvidenceType(type)}</span>${linksHtml}</li>`;
    })
    .filter(Boolean)
    .join("");
  return rows ? `<div class="evidence"><h4>Supported by</h4><ul>${rows}</ul></div>` : "";
}

function friendlyEvidenceType(type) {
  const labels = {
    services: "Services",
    methods: "Methods",
    projects: "Projects",
    articles: "Writing",
    experience: "Experience",
  };
  return labels[type] || type;
}

function jsonLdForPage(route) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: [site.handle, site.ens],
    jobTitle: site.title,
    description: site.positioning,
    email: "mailto:alexsotodigital@gmail.com",
    image: assetUrl(site.avatar),
    ...(configuredSiteUrl ? { url: fullUrl("/") } : {}),
    sameAs: links.filter((link) => link.href.startsWith("https://")).map((link) => link.href),
  };

  if (route === "/faq/") {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  }

  if (route === "/writing/") {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Writing by Alex Soto",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: article.title,
          url: article.href,
          description: article.summary,
        },
      })),
    };
  }

  if (route === "/work-with-me/") {
    return {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `${site.name} - ${site.title}`,
      description: site.positioning,
      areaServed: ["LATAM", "Remote"],
      provider: person,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Governance and coordination services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.outcome,
          },
        })),
      },
    };
  }

  return person;
}

function layout({ title, description, route, body }) {
  const pageTitle = route === "/" ? `${site.name} - ${site.title}` : `${title} - ${site.name}`;
  const active = (href) => (href === route ? " aria-current=\"page\"" : "");
  const canonicalUrl = fullUrl(route);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(description || site.positioning)}">
  ${configuredSiteUrl ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">` : ""}
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(jsonLdForPage(route))}</script>
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <div class="site-shell">
    <aside class="rail rail-left" aria-label="Identity summary">
      <a class="brand" href="/">
        <img class="pfp pfp-rail" src="${escapeHtml(site.avatar)}" alt="Pixel art portrait of Alex Soto">
        <span>${escapeHtml(site.name)}</span>
        <small>${escapeHtml(site.title)}</small>
      </a>
      <dl class="meta-list">
        <div><dt>Location</dt><dd>${escapeHtml(site.location)}</dd></div>
        <div><dt>ENS</dt><dd>${escapeHtml(site.ens)}</dd></div>
        <div><dt>Mode</dt><dd>Independent practitioner</dd></div>
      </dl>
      <nav class="main-nav" aria-label="Primary navigation">
        ${nav.map(([label, href]) => `<a href="${href}"${active(href)}>${escapeHtml(label)}</a>`).join("")}
      </nav>
    </aside>
    <main id="content" class="content" tabindex="-1">
      ${body}
    </main>
    <aside class="rail rail-right" aria-label="Actions and official links">
      <section class="action-panel">
        <h2>Collaborate</h2>
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "text-link")}
      </section>
      <section class="link-panel">
        <h2>Official links</h2>
        <ul>
          ${links.filter((link) => link.priority === "primary").map((link) => `<li>${linkTo(link.href, `${link.label}: ${link.value}`)}</li>`).join("")}
        </ul>
      </section>
    </aside>
  </div>
</body>
</html>`;
}

function pageHeader(kicker, title, summary) {
  return `<header class="page-header">
    <p class="kicker">${escapeHtml(kicker)}</p>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(summary)}</p>
  </header>`;
}

function copyButton(value, label = "Copy") {
  return `<button class="copy-button" type="button" data-copy="${escapeHtml(value)}">${escapeHtml(label)}</button>`;
}

function card({ id, title, meta, summary, extra = "", evidence, compactEvidence = false }) {
  return `<article id="${escapeHtml(id)}" class="card">
    <div class="card-head">
      <h3>${escapeHtml(title)}</h3>
      ${meta ? `<p>${escapeHtml(meta)}</p>` : ""}
    </div>
    <p>${escapeHtml(summary)}</p>
    ${extra}
    ${evidenceList(evidence, { compact: compactEvidence })}
  </article>`;
}

function articleMeta(article) {
  return [article.currentPractice ? "Current practice" : null, article.theme, article.source]
    .filter(Boolean)
    .join(" / ");
}

function homePage() {
  const featuredMethods = methods.filter((method) => method.featured).slice(0, 3);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);
  const featuredArticles = articles.filter((article) => article.featured).slice(0, 5);
  const problemServices = services.slice(0, 3);

  const body = `
    <section class="hero">
      <div class="hero-lockup">
        <div>
          <p class="kicker">Public knowledge base</p>
          <h1>${escapeHtml(site.thesis)}</h1>
          <p>${escapeHtml(site.positioning)}</p>
          ${site.supportingLine ? `<p>${escapeHtml(site.supportingLine)}</p>` : ""}
          <div class="cta-row">
            ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
            ${linkTo("/identity/", "Verify identity", "button secondary")}
          </div>
        </div>
      </div>
    </section>
    <section class="band">
      <h2>Identity Summary</h2>
      <p>${escapeHtml(site.shortBio)}</p>
      <div class="term-grid">
        ${site.canonicalTerms.slice(0, 5).map((term) => `<span>${escapeHtml(term)}</span>`).join("")}
      </div>
    </section>
    <section class="band">
      <h2>Source of Credibility</h2>
      <p>${escapeHtml(site.practiceSummary)}</p>
    </section>
    <section class="band">
      <h2>Central Question</h2>
      <p>${escapeHtml(site.centralQuestion)}</p>
    </section>
    <section class="band">
      <h2>Practice Contexts</h2>
      <p>Projects are laboratories and real-world contexts through which the practice evolves. They support the work; they do not define it.</p>
      <div class="stack">
        ${featuredProjects.map((project) => card({
          id: project.id,
          title: project.title,
          meta: `${project.type} / ${project.status} / ${project.role}`,
          summary: project.summary,
          extra: project.link ? linkTo(project.link, "Project reference", "text-link") : "",
          evidence: project.evidence,
          compactEvidence: true,
        })).join("")}
      </div>
    </section>
    <section class="band">
      <h2>Problems I Solve</h2>
      <div class="stack">
        ${problemServices.map((service) => card({
          id: service.id,
          title: service.title,
          meta: service.problem,
          summary: service.outcome,
          evidence: service.evidence,
          compactEvidence: true,
        })).join("")}
      </div>
    </section>
    <section class="band">
      <h2>Featured Methods</h2>
      <div class="stack">
        ${featuredMethods.map((method) => card({
          id: method.id,
          title: method.title,
          summary: method.summary,
          extra: list(method.outputs, "tag-list"),
          evidence: method.evidence,
          compactEvidence: true,
        })).join("")}
      </div>
    </section>
    <section class="band">
      <h2>Selected Writing</h2>
      <div class="stack">
        ${featuredArticles.map((article) => card({
          id: article.id,
          title: article.title,
          meta: articleMeta(article),
          summary: article.summary,
          extra: linkTo(article.href, "Read original", "text-link"),
        })).join("")}
      </div>
    </section>
    <section class="band final-cta">
      <h2>Collaboration</h2>
      <p>Start with a strategy call when a coordination failure, governance question, or recurring tension needs to become explicit enough to learn from.</p>
      <div class="cta-row">
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "button secondary")}
      </div>
    </section>`;

  writePage("/", "Home", site.positioning, body);
}

function workPage() {
  const body = `
    ${pageHeader("Work with Me", "Governance and coordination support for mission-driven organizations", site.positioning)}
    <section class="band">
      <h2>Service Model</h2>
      <p>Services are organized around organizational challenges rather than disciplines. Governance, facilitation, institutional learning, and coordination tooling are connected expressions of the same practice.</p>
    </section>
    <section class="band">
      <h2>Services</h2>
      <div class="stack">
        ${services.map((service) => card({
          id: service.id,
          title: service.title,
          meta: service.problem,
          summary: service.outcome,
          extra: list(service.formats, "tag-list"),
          evidence: service.evidence,
        })).join("")}
      </div>
    </section>
    <section class="band final-cta">
      <h2>Preferred Collaboration Process</h2>
      <p>Use the strategy call to clarify context, constraints, stakeholders, and whether a deeper engagement is useful. Email is best for a written collaboration brief.</p>
      <div class="cta-row">
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "button secondary")}
      </div>
    </section>`;
  writePage("/work-with-me/", "Work with Me", site.positioning, body);
}

function methodsPage() {
  const body = `
    ${pageHeader("Methods", "Methods make the practice transferable", "These methods document how governance and coordination work becomes explicit, testable, and reusable.")}
    <section class="band">
      <div class="stack">
        ${methods.map((method) => card({
          id: method.id,
          title: method.title,
          meta: method.featured ? "Core method" : "Supporting method",
          summary: method.summary,
          extra: `<h4>Typical outputs</h4>${list(method.outputs, "tag-list")}`,
          evidence: method.evidence,
        })).join("")}
      </div>
    </section>`;
  writePage("/methods/", "Methods", "Governance and coordination methods used by Alex Soto.", body);
}

function projectsPage() {
  const body = `
    ${pageHeader("Projects", "Projects as laboratories for the practice", "Projects document contexts where governance and coordination ideas are tested, adapted, and translated into reusable methods. They support the professional practice; they do not define it.")}
    <section class="band">
      <div class="stack">
        ${projects.map((project) => card({
          id: project.id,
          title: project.title,
          meta: `${project.type} / ${project.status} / ${project.role}`,
          summary: project.summary,
          extra: `<h4>Problem</h4><p>${escapeHtml(project.problem)}</p><h4>Approach</h4><p>${escapeHtml(project.approach)}</p><h4>Lessons</h4>${list(project.lessons, "compact-list")}${project.link ? linkTo(project.link, "Project reference", "text-link") : ""}`,
          evidence: project.evidence,
        })).join("")}
      </div>
    </section>`;
  writePage("/projects/", "Projects", "Projects connected to Alex Soto's governance and coordination practice.", body);
}

function writingPage() {
  const body = `
    ${pageHeader("Writing", "Writing as applied theory for adaptive organizations", "Writing documents the ideas behind the practice and connects governance, coordination, mutualism, and institutional learning.")}
    <section class="band">
      <div class="stack">
        ${articles.map((article) => card({
          id: article.id,
          title: article.title,
          meta: articleMeta(article),
          summary: article.summary,
          extra: `${linkTo(article.href, "Read original", "text-link")}<h4>Supports</h4>${list(article.evidenceFor.map((id) => services.find((service) => service.id === id)?.title || methods.find((method) => method.id === id)?.title || id), "tag-list")}`,
        })).join("")}
      </div>
    </section>`;
  writePage("/writing/", "Writing", "Curated writing and research by Alex Soto.", body);
}

function faqPage() {
  const body = `
    ${pageHeader("FAQ", "Direct answers for humans, search engines, and AI agents", "These answers clarify what Alex does, who he helps, how he works, and why organizations hire him.")}
    <section class="band faq-list">
      ${faq.map((item) => `<article class="qa"><h2>${escapeHtml(item.question)}</h2><p>${escapeHtml(item.answer)}</p></article>`).join("")}
    </section>`;
  writePage("/faq/", "FAQ", "Frequently asked questions about Alex Soto.", body);
}

function identityPage() {
  const verification = [
    `${site.name} is the primary visible name.`,
    `${site.handle} is a handle and identity layer.`,
    `${site.ens} is an ENS identity, payment endpoint, and discoverability layer.`,
    "Advanced cryptographic verification is intentionally deferred in version 1.",
  ];
  const body = `
    ${pageHeader("Identity", "Canonical identity, links, contact, and payment information", "This page connects Alex Soto's public identities, contact methods, professional references, and Web3-native identity infrastructure.")}
    <section class="band">
      <h2>Canonical Identity</h2>
      <dl class="payment-list">
        <div><dt>Visible name</dt><dd>${escapeHtml(site.name)} ${copyButton(site.name)}</dd></div>
        <div><dt>Digital handle</dt><dd>${escapeHtml(site.handle)} ${copyButton(site.handle)}</dd></div>
        <div><dt>Web3 identity</dt><dd>${escapeHtml(site.ens)} ${copyButton(site.ens)}</dd></div>
      </dl>
    </section>
    <section class="band">
      <h2>Verification Notes</h2>
      ${list(verification, "compact-list")}
    </section>
    <section class="band">
      <h2>Official Links</h2>
      <div class="link-grid">
        ${links.map((link) => `<a class="link-card" href="${escapeHtml(link.href)}"><span>${escapeHtml(link.label)}</span><strong>${escapeHtml(link.value)}</strong><small>${escapeHtml(link.purpose.join(", "))}</small></a>`).join("")}
      </div>
    </section>
    <section class="band">
      <h2>Payment Information</h2>
      <dl class="payment-list">
        <div><dt>Preferred payment identifier</dt><dd>${escapeHtml(payments.preferredPaymentIdentifier)} ${copyButton(payments.preferredPaymentIdentifier)}</dd></div>
        <div><dt>ENS</dt><dd>${escapeHtml(payments.ens)} ${copyButton(payments.ens)}</dd></div>
        <div><dt>Ethereum address</dt><dd><code>${escapeHtml(payments.address)}</code> ${copyButton(payments.address)}</dd></div>
        <div><dt>Canonical network</dt><dd>${escapeHtml(payments.canonicalNetwork)}</dd></div>
        <div><dt>Accepted assets</dt><dd>${escapeHtml(payments.acceptedAssets.map((asset) => asset.symbol).join(", "))}</dd></div>
      </dl>
      <p>${escapeHtml(payments.framing)}</p>
      <h3>Before sending payment</h3>
      ${list(payments.humanInstructions, "compact-list")}
      <h3>Safety notes</h3>
      ${list(payments.safetyNotes, "compact-list")}
    </section>
    <section class="band">
      <h2>Selected Experience</h2>
      <p>A compact trajectory of roles and contexts that inform the practice.</p>
      <div class="stack">
        ${experience.map((item) => card({
          id: item.id,
          title: item.name,
          meta: `${item.role} / ${item.period} / ${item.status}`,
          summary: item.summary,
          extra: item.link ? linkTo(item.link, "Reference link", "text-link") : "",
        })).join("")}
      </div>
    </section>
    <script>
      document.querySelectorAll("[data-copy]").forEach((button) => {
        button.addEventListener("click", async () => {
          const value = button.getAttribute("data-copy");
          const markCopied = () => {
            button.textContent = "Copied";
            window.setTimeout(() => {
              button.textContent = "Copy";
            }, 1400);
          };
          try {
            if (navigator.clipboard && window.isSecureContext) {
              await navigator.clipboard.writeText(value);
              markCopied();
              return;
            }
            throw new Error("Clipboard API unavailable");
          } catch {
            const input = document.createElement("textarea");
            input.value = value;
            input.setAttribute("readonly", "");
            input.style.position = "fixed";
            input.style.opacity = "0";
            document.body.appendChild(input);
            input.select();
            try {
              document.execCommand("copy");
              markCopied();
            } catch {
              button.textContent = "Select text";
            }
            document.body.removeChild(input);
          }
        });
      });
    </script>`;
  writePage("/identity/", "Identity", "Canonical public identity and verification links for Alex Soto.", body);
}

function writePage(route, title, description, body) {
  const target = path.join(slugPath(route), "index.html");
  writeFile(target, layout({ title, description, route, body }));
}

function pageRoutes() {
  return nav.map(([, href]) => href);
}

function enhancePayments() {
  return {
    canonicalName: payments.canonicalName,
    ens: payments.ens,
    ethereumAddress: payments.address,
    address: payments.address,
    canonicalNetwork: payments.canonicalNetwork,
    acceptedAssets: payments.acceptedAssets,
    preferredPaymentIdentifier: payments.preferredPaymentIdentifier,
    framing: payments.framing,
    priority: payments.priority,
    humanInstructions: payments.humanInstructions,
    agentInstructions: payments.agentInstructions,
    safetyNotes: payments.safetyNotes,
    contactBeforePayment: {
      calendly: site.ctas.primary.href,
      email: links.find((link) => link.id === "email")?.href,
      instruction: "Confirm service scope before payment unless otherwise agreed.",
    },
    machineReadablePurpose: "Payment and identity metadata for Alex Soto's professional services. This is not a payment initiation endpoint.",
  };
}

function writeJsonEndpoints() {
  const about = {
    name: site.name,
    handle: site.handle,
    ens: site.ens,
    avatar: assetUrl(site.avatar),
    title: site.title,
    location: site.location,
    languages: site.languages,
    positioning: site.positioning,
    supportingLine: site.supportingLine,
    centralQuestion: site.centralQuestion,
    practiceSummary: site.practiceSummary,
    url: configuredSiteUrl || null,
    thesis: site.thesis,
    audiences: site.audiences,
    canonicalTerms: site.canonicalTerms,
    links: links.map(({ id, label, value, href, priority, purpose }) => ({ id, label, value, href, priority, purpose })),
  };

  const endpoints = {
    "about.json": about,
    "services.json": services,
    "projects.json": projects,
    "faq.json": faq,
    "links.json": links,
    "payments.json": enhancePayments(),
  };

  Object.entries(endpoints).forEach(([fileName, data]) => {
    writeFile(path.join(outDir, fileName), `${JSON.stringify(data, null, 2)}\n`);
  });
}

function writeRobotsTxt() {
  const lines = [
    "User-agent: *",
    "Allow: /",
    "",
    configuredSiteUrl ? `Sitemap: ${fullUrl("/sitemap.xml")}` : "# Sitemap available at /sitemap.xml when SITE_URL is configured",
  ];
  writeFile(path.join(outDir, "robots.txt"), `${lines.join("\n")}\n`);
}

function writeSitemapXml() {
  const urls = pageRoutes().map((route) => {
    const loc = fullUrl(route);
    return `  <url>\n    <loc>${escapeHtml(loc)}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`;
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  writeFile(path.join(outDir, "sitemap.xml"), xml);
}

function writeLlmsTxt() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.title}`,
    "",
    site.positioning,
    ...(site.supportingLine ? [site.supportingLine] : []),
    "",
    "## Central question",
    site.centralQuestion,
    "",
    "## Canonical identity",
    `- Visible name: ${site.name}`,
    `- Handle: ${site.handle}`,
    `- ENS: ${site.ens}`,
    `- Location: ${site.location}`,
    `- Languages: ${site.languages.join("; ")}`,
    "",
    "## Primary pages",
    ...nav.map(([label, href]) => `- ${label}: ${fullUrl(href)}`),
    "",
    "## Machine-readable endpoints",
    `- about.json: ${fullUrl("/about.json")}`,
    `- services.json: ${fullUrl("/services.json")}`,
    `- projects.json: ${fullUrl("/projects.json")}`,
    `- faq.json: ${fullUrl("/faq.json")}`,
    `- links.json: ${fullUrl("/links.json")}`,
    `- payments.json: ${fullUrl("/payments.json")}`,
    "",
    "## Payment endpoint",
    `- Preferred payment identifier: ${payments.preferredPaymentIdentifier}`,
    `- ENS: ${payments.ens}`,
    `- Ethereum address: ${payments.address}`,
    `- Canonical network: ${payments.canonicalNetwork}`,
    "- Confirm service scope through email or Calendly before payment unless otherwise agreed.",
    "- Verify ENS resolution, network, and token before sending payment.",
    "",
    "## Featured methods",
    ...methods.filter((method) => method.featured).map((method) => `- ${method.title}: ${method.summary}`),
    "",
    "## Practice contexts",
    "Projects are practice contexts and laboratories, not standalone flagship proof.",
    ...projects.filter((project) => project.featured).map((project) => `- ${project.title}: ${project.summary}`),
    "",
    "## Featured writing",
    ...articles.filter((article) => article.featured).map((article) => `- ${article.title}: ${article.href}`),
    "",
    "## Avoid incorrect inference",
    "- Alex Soto is not presented as a software engineer.",
    "- Alex Soto is not presented as a trader.",
    "- Hiring is an intended consequence of clarity and trust, not the primary purpose of the website.",
  ];
  writeFile(path.join(outDir, "llms.txt"), `${lines.join("\n")}\n`);
}

function copyAssets() {
  const css = fs.readFileSync(path.join(root, "src", "styles.css"), "utf8");
  writeFile(path.join(outDir, "assets", "styles.css"), css);
  const assetsDir = path.join(root, "src", "assets");
  if (!fs.existsSync(assetsDir)) return;
  for (const fileName of fs.readdirSync(assetsDir)) {
    fs.copyFileSync(path.join(assetsDir, fileName), path.join(outDir, "assets", fileName));
  }
}

function build() {
  ensureDir(outDir);
  copyAssets();
  homePage();
  workPage();
  methodsPage();
  projectsPage();
  writingPage();
  faqPage();
  identityPage();
  writeJsonEndpoints();
  writeRobotsTxt();
  writeSitemapXml();
  writeLlmsTxt();
  console.log("Built static site in dist/");
}

build();
