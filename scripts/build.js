const fs = require("fs");
const { createHash } = require("crypto");
const path = require("path");
const {
  site,
  practice,
  links,
  payments,
  experience,
  experienceGroups,
  methods,
  services,
  projects,
  articles,
  faq,
} = require("../content/site-data");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "dist");
const configuredSiteUrl = normalizeSiteUrl(process.env.SITE_URL || site.baseUrl || "");
const officialLinks = links.filter((link) => link.id !== "email");

const nav = [
  ["Home", "/"],
  ["About Alex Soto", "/about/"],
  ["Hire", "/hire/"],
  ["Work with Me", "/work-with-me/"],
  ["Experience", "/experience/"],
  ["Projects", "/projects/"],
  ["Methods", "/methods/"],
  ["Writing", "/writing/"],
  ["FAQ", "/faq/"],
  ["Identity", "/identity/"],
];

const pageMetadata = {
  "/": {
    title: "Alex Soto (@alexsotodigital) | Governance & Coordination Specialist",
    description: site.shortBio,
  },
  "/work-with-me/": {
    title: "Work with Alex Soto | Organizational Development & Governance",
    description: `${site.professionalClassification} Clarify decision rights, roles and coordination for growing and distributed teams.`,
  },
  "/organizational-development/": {
    title: "Organizational Development for Growing & Distributed Teams | Alex Soto",
    description: practice.knowledgePage.summary,
  },
  "/hire/": {
    title: site.hiring.pageTitle,
    description: site.hiring.metaDescription,
  },
  "/experience/": {
    title: "Experience | Alex Soto Governance & Coordination Practice",
    description: "Experience informing Alex Soto's organizational development, governance and coordination practice: role mapping, self-management, facilitation, cooperatives and Web3 governance.",
  },
  "/projects/": {
    title: "Projects | Alex Soto Governance & Coordination Practice",
    description: "Projects by Alex Soto, including applied work in governance, coordination systems, mutualism, institutional learning, Web3 ecosystems, and distributed organizations.",
  },
  "/methods/": {
    title: "Methods | Governance Reviews, Coordination Diagnostics & Institutional Learning",
    description: "Methods used by Alex Soto: governance reviews, coordination diagnostics, facilitation and decision frameworks, and institutional learning loops for mission-driven organizations.",
  },
  "/writing/": {
    title: "Writing | Alex Soto on Governance, Coordination & Institutional Learning",
    description: "Essays and reflections by Alex Soto on governance, coordination, DAOs, cooperatives, mutualism, distributed work, and institutional learning.",
  },
  "/faq/": {
    title: "FAQ | Alex Soto Governance & Coordination Specialist",
    description: "Frequently asked questions about Alex Soto's work in governance design, coordination systems, DAO operations, facilitation, and institutional learning.",
  },
  "/identity/": {
    title: "Official Identity | Alex Soto, @alexsotodigital, alexsotodigital.eth",
    description: "Canonical identity page for Alex Soto, also known as @alexsotodigital and alexsotodigital.eth. Includes official links, contact methods, ENS identity, and professional references.",
  },
  "/about/": {
    title: "About Alex Soto | Governance & Coordination Specialist",
    description: site.shortBio,
  },
};

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

let cachedStyles = null;

function inlineStyles() {
  if (cachedStyles === null) {
    cachedStyles = fs.readFileSync(path.join(root, "src", "styles.css"), "utf8");
  }
  return cachedStyles.replace(/<\/style/gi, "<\\/style");
}

function slugPath(route) {
  return route === "/" ? outDir : path.join(outDir, route);
}

function linkTo(href, label, className = "") {
  if (href.startsWith("mailto:")) return emailContact(href, label, className);
  return `<a${className ? ` class="${className}"` : ""} href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
}

function emailContact(href, label, className = "") {
  const mailto = new URL(href);
  const address = decodeURIComponent(mailto.pathname);
  const gmail = new URL("https://mail.google.com/mail/");
  gmail.search = new URLSearchParams({ view: "cm", fs: "1", to: address, su: mailto.searchParams.get("subject") || "" });
  return `<details class="email-contact">
    <summary${className ? ` class="${escapeHtml(className)}"` : ""}>${escapeHtml(label)}</summary>
    <div class="email-options">
      <span>${escapeHtml(address)}</span>
      <a href="${escapeHtml(gmail.href)}" target="_blank" rel="noopener noreferrer">Write in Gmail</a>
      <a href="${escapeHtml(href)}">Open email app</a>
      ${copyButton(address, "Copy email")}
    </div>
  </details>`;
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

function rootRelativeAsset(route, fileName) {
  const prefix = route === "/" ? "." : "..";
  return `${prefix}/${fileName}`;
}

function pageMeta(route, fallbackTitle, fallbackDescription) {
  return pageMetadata[route] || {
    title: route === "/" ? `${site.name} - ${site.title}` : `${fallbackTitle} - ${site.name}`,
    description: fallbackDescription || site.positioning,
  };
}

function list(items, className = "") {
  if (!items?.length) return "";
  return `<ul${className ? ` class="${className}"` : ""}>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function experienceHref(id) {
  const route = experienceGroups.some((group) => group.items.includes(id)) ? "/experience/" : "/about/";
  return `${route}#${id}`;
}

function recordLink(type, id) {
  const map = {
    services: [services, "/work-with-me/"],
    methods: [methods, "/methods/"],
    projects: [projects, "/projects/"],
    articles: [articles, "/writing/"],
    experience: [experience, "/experience/"],
  };
  const [collection, href] = map[type] || [];
  const record = collection?.find((item) => item.id === id);
  if (!record) return "";
  return linkTo(type === "experience" ? experienceHref(id) : `${href}#${id}`, record.title || record.name);
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

function facilitationPriceSpecification() {
  const pricing = site.hiring.pricing;
  return {
    "@type": "UnitPriceSpecification",
    priceType: pricing.priceType,
    priceCurrency: pricing.currency,
    minPrice: pricing.hourlyRate.min,
    maxPrice: pricing.hourlyRate.max,
    unitText: pricing.billingUnit,
    referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: pricing.billingUnit },
    eligibleQuantity: { "@type": "QuantitativeValue", minValue: pricing.minimumBillableHours, unitText: pricing.billingUnit },
    valueAddedTaxIncluded: false,
    description: `${pricing.rateContext} ${pricing.scopeNote} Includes: ${pricing.includes.join(", ")}. Quoted separately: ${pricing.projectOrPackageScope.join(", ")}. ${pricing.longerEngagements.description} ${pricing.proBono.description} Additional costs: ${pricing.exclusions.join(", ")}.`,
  };
}

function jsonLdForPage(route) {
  const contactPoint = {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.hiring.contactEmail,
    url: site.ctas.primary.href,
    availableLanguage: site.languages.map((language) => language.split(" (")[0]),
  };
  const person = {
    "@type": "Person",
    "@id": fullUrl("/#alex-soto"),
    name: site.name,
    alternateName: [site.handle, `@${site.handle}`, site.ens],
    jobTitle: site.title,
    description: site.shortBio,
    email: site.hiring.contactEmail,
    homeLocation: { "@type": "Place", name: site.location },
    knowsLanguage: contactPoint.availableLanguage,
    image: assetUrl(site.avatar),
    url: fullUrl("/"),
    knowsAbout: [...new Set([...practice.categories, ...practice.adjacentCategories, ...practice.expertise, "DAO operations", "Web3 governance"])],
    contactPoint,
    sameAs: links.filter((link) => link.href.startsWith("https://") && !link.purpose.includes("strategy call") && !link.purpose.includes("project")).map((link) => link.href),
  };
  const professionalService = {
    "@type": "Service",
    "@id": fullUrl("/#professional-service"),
    name: "Alex Soto Governance & Coordination Consulting",
    url: fullUrl("/work-with-me/"),
    description: site.hiring.opening,
    provider: {
      "@id": fullUrl("/#alex-soto"),
    },
    areaServed: site.serviceArea,
    category: practice.categories,
    serviceType: site.hiring.services.map((service) => service.name),
    availableChannel: { "@type": "ServiceChannel", serviceUrl: fullUrl("/hire/") },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": fullUrl(`${route}#webpage`),
    url: fullUrl(route),
    name: pageMetadata[route].title,
    description: pageMetadata[route].description,
    about: { "@id": person["@id"] },
    author: { "@id": person["@id"] },
    isPartOf: { "@id": fullUrl("/#website") },
    inLanguage: "en",
  };
  const website = {
    "@type": "WebSite",
    "@id": fullUrl("/#website"),
    name: site.name,
    alternateName: site.handle,
    url: fullUrl("/"),
    publisher: { "@id": person["@id"] },
  };
  const graph = [person, website, webpage];

  if (route === "/") {
    graph.push(professionalService);
  }

  if (route === "/faq/") {
    webpage["@type"] = "FAQPage";
    webpage.mainEntity = faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }));
  }

  if (route === "/writing/") {
    graph.push({
      "@type": "ItemList",
      "@id": fullUrl("/writing/#essays"),
      name: "Writing by Alex Soto",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: article.title,
          url: article.href,
          description: article.summary,
          author: { "@id": person["@id"] },
          about: { "@type": "Thing", name: article.theme },
        },
      })),
    });
    webpage.mainEntity = { "@id": fullUrl("/writing/#essays") };
  }

  if (route === "/work-with-me/") {
    graph.push({
      ...professionalService,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Organizational development, governance and coordination services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          ...(service.id === site.hiring.pricing.serviceId ? { priceSpecification: facilitationPriceSpecification() } : {}),
          itemOffered: {
            "@type": "Service",
            "@id": fullUrl(`/work-with-me/#${service.id}`),
            url: fullUrl(`/work-with-me/#${service.id}`),
            name: service.title,
            description: service.outcome,
            category: service.categories,
            serviceType: service.interventions,
            provider: { "@id": person["@id"] },
            areaServed: site.serviceArea,
            serviceOutput: service.deliverables.map((name) => ({ "@type": "Thing", name })),
          },
        })),
      },
    });
  }

  if (route === "/hire/") {
    graph.push(professionalService);
    graph.push({
      "@type": "Offer",
      "@id": fullUrl("/hire/#facilitation-pricing"),
      name: "Session facilitation: indicative pricing",
      url: fullUrl("/hire/#facilitation-pricing"),
      seller: { "@id": person["@id"] },
      itemOffered: {
        "@type": "Service",
        name: site.hiring.pricing.scope,
        provider: { "@id": person["@id"] },
        url: fullUrl(`/work-with-me/#${site.hiring.pricing.serviceId}`),
      },
      priceSpecification: facilitationPriceSpecification(),
    });
    webpage.about = { "@id": professionalService["@id"] };
  }

  if (route === "/organizational-development/") {
    webpage.about = practice.concepts.map((concept) => ({
      "@type": "DefinedTerm",
      "@id": fullUrl(`/organizational-development/#${concept.id}`),
      name: concept.title,
      description: concept.definition,
    }));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function layout({ title, description, route, body }) {
  const meta = pageMeta(route, title, description);
  const pageTitle = meta.title;
  const pageDescription = meta.description;
  const active = (href) => (href === route ? " aria-current=\"page\"" : "");
  const canonicalUrl = fullUrl(route);
  const previewImage = assetUrl(site.avatar);
  const faviconVersion = "2";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(pageDescription)}">
  <meta name="robots" content="index, follow">
  ${configuredSiteUrl ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">` : ""}
  <link rel="icon" href="${escapeHtml(rootRelativeAsset(route, `favicon.ico?v=${faviconVersion}`))}" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="${escapeHtml(rootRelativeAsset(route, `favicon-32x32.png?v=${faviconVersion}`))}">
  <link rel="icon" type="image/png" sizes="16x16" href="${escapeHtml(rootRelativeAsset(route, `favicon-16x16.png?v=${faviconVersion}`))}">
  <link rel="apple-touch-icon" sizes="180x180" href="${escapeHtml(rootRelativeAsset(route, `apple-touch-icon.png?v=${faviconVersion}`))}">
  <link rel="manifest" href="${escapeHtml(rootRelativeAsset(route, `site.webmanifest?v=${faviconVersion}`))}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escapeHtml(site.name)}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(pageDescription)}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:image" content="${escapeHtml(previewImage)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@${escapeHtml(site.handle)}">
  <meta name="twitter:creator" content="@${escapeHtml(site.handle)}">
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
  <meta name="twitter:description" content="${escapeHtml(pageDescription)}">
  <meta name="twitter:image" content="${escapeHtml(previewImage)}">
  <style>${inlineStyles()}</style>
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
        <div><dt>Mode</dt><dd>${escapeHtml(site.mode)}</dd></div>
      </dl>
      <nav class="main-nav" aria-label="Primary navigation">
        ${nav.map(([label, href]) => `<a href="${href}"${active(href)}>${escapeHtml(label)}</a>`).join("")}
      </nav>
    </aside>
    <main id="content" class="content" tabindex="-1">
      ${body}
      ${flowerDivider(route, "garden-footer")}
    </main>
    <aside class="rail rail-right" aria-label="Actions and official links">
      <section class="action-panel">
        <h2>Collaborate</h2>
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
        ${linkTo(site.ctas.hire.href, site.ctas.hire.label, "text-link")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "text-link")}
      </section>
      <section class="link-panel">
        <h2>Official links</h2>
        <ul>
          ${officialLinks.map((link) => `<li>${linkTo(link.href, link.id === "google-calendar" ? link.label : `${link.label}: ${link.value}`)}</li>`).join("")}
        </ul>
      </section>
    </aside>
  </div>
  ${clipboardScript()}
</body>
</html>`;
}

function pixelFlower(route, variant) {
  if (variant === "shoot") return `<span class="garden-shoot"></span>`;
  const [asset, color] = variant.split(":");
  const foliageClass = variant === "pixel-fern" ? " garden-foliage" : "";
  const colorClass = color ? ` garden-${color}` : "";
  return `<img class="pixel-flower${foliageClass}${colorClass}" src="${rootRelativeAsset(route, `assets/${asset}.png`)}" width="28" height="28" alt="" aria-hidden="true" draggable="false" decoding="async">`;
}

function flowerDivider(route, className = "", variant = 0) {
  // Route-specific ordering gives each border a stable, distinct planting.
  const flowers = ["pixel-flower", "pixel-daisy", "pixel-bellflower", "pixel-flower:coral", "pixel-bellflower:teal"];
  const plantings = Array.from({ length: 8 }, (_, index) => {
    const order = createHash("sha256").update(`${route}:${className}:${variant}:${index}`).digest("hex");
    const plants = [flowers[index % flowers.length], index % 3 ? "shoot" : "pixel-fern", flowers[(index + 2) % flowers.length]];
    return { order, plants: parseInt(order[0], 16) % 2 ? plants.reverse() : plants };
  }).sort((a, b) => a.order.localeCompare(b.order));
  const insect = variant % 2 ? "dragonfly" : "bee";
  return `<div class="garden-divider ${className}" aria-hidden="true">
    <div class="garden-plants">${plantings.map(({ plants }) => `<span class="garden-patch">${plants.map((plant) => pixelFlower(route, plant)).join("")}</span>`).join("")}</div>
    ${className === "garden-footer" ? "" : `<img class="garden-insect garden-${insect}" src="${rootRelativeAsset(route, `assets/pixel-${insect}.svg`)}" width="24" height="16" alt="" aria-hidden="true" draggable="false">`}
    <svg class="garden-ground" viewBox="0 0 720 8" preserveAspectRatio="none" focusable="false" aria-hidden="true" shape-rendering="crispEdges"><path d="M0 5H65V3H122V5H230V6H278V4H382V5H470V3H516V5H620V4H663V5H720"/></svg>
  </div>`;
}

function pageHeader(kicker, title, summary) {
  return `<header class="page-header">
    <p class="kicker">${escapeHtml(kicker)}</p>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(summary)}</p>
  </header>`;
}

function copyButton(value, label = "Copy") {
  return `<button class="copy-button" type="button" data-copy="${escapeHtml(value)}" aria-live="polite">${escapeHtml(label)}</button>`;
}

function clipboardScript() {
  return `<script>
    document.querySelectorAll("[data-copy]").forEach((button) => {
      const label = button.textContent;
      let reset;
      button.addEventListener("click", async () => {
        const value = button.getAttribute("data-copy");
        let copied = false;
        try {
          await navigator.clipboard.writeText(value);
          copied = true;
        } catch {
          const input = document.createElement("textarea");
          input.value = value;
          input.setAttribute("readonly", "");
          input.style.position = "fixed";
          input.style.opacity = "0";
          document.body.appendChild(input);
          input.select();
          try {
            copied = document.execCommand("copy");
          } catch {}
          input.remove();
          button.focus();
        }
        button.textContent = copied ? "Copied" : "Select and copy manually";
        window.clearTimeout(reset);
        reset = window.setTimeout(() => { button.textContent = label; }, 2000);
      });
    });
  </script>`;
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

function articleLinks(article) {
  const primaryLabel = "Read on Substack";
  return `${linkTo(article.href, primaryLabel, "text-link")}${article.originalHref ? linkTo(article.originalHref, "Original publication", "text-link") : ""}`;
}

function experienceByGroup() {
  return experienceGroups.map((group) => ({
    ...group,
    records: group.items
      .map((id) => experience.find((item) => item.id === id))
      .filter(Boolean),
  }));
}

function experienceMeta(item) {
  return [item.role, item.period, item.status, item.roleType].filter(Boolean).join(" / ");
}

function experienceCard(item) {
  return card({
    id: item.id,
    title: item.name,
    meta: experienceMeta(item),
    summary: item.summary,
    extra: `${item.context ? `<p>${escapeHtml(item.context)}</p>` : ""}${item.capabilities ? `<h4>Organizational capabilities</h4>${list(item.capabilities, "tag-list")}<p>${escapeHtml(item.capabilityEvidence)}</p>` : ""}${item.link ? linkTo(item.link, item.linkLabel || "Reference link", "text-link") : ""}`,
  });
}

function homePage() {
  const featuredMethods = methods.filter((method) => method.featured).slice(0, 3);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);
  const featuredArticles = articles.filter((article) => article.featured).slice(0, 5);

  const body = `
    <section class="hero">
      <div class="hero-lockup">
        <div>
          <p class="kicker">Public knowledge base</p>
          <h1>${escapeHtml(site.name)} &mdash; ${escapeHtml(site.title)}</h1>
          <p>${escapeHtml(site.positioning)}</p>
          <p>${escapeHtml(site.professionalClassification)} ${escapeHtml(site.workingContext)}</p>
          <p>${escapeHtml(practice.audienceSummary)}</p>
          <p>${escapeHtml(site.hiring.homepageLine)}</p>
          ${site.supportingLine ? `<p>${escapeHtml(site.supportingLine)}</p>` : ""}
          <div class="cta-row">
            ${linkTo(site.ctas.hire.href, site.ctas.hire.label, "button")}
            ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
            ${linkTo("/about/", "About Alex Soto", "button secondary")}
            ${linkTo("/identity/", "Verify identity", "button secondary")}
          </div>
        </div>
      </div>
    </section>
    <section class="band">
      <h2>When ways of working need to change</h2>
      ${list(practice.problems.map((problem) => problem.title), "compact-list")}
      ${linkTo("/work-with-me/", "Explore problems and possible engagements", "text-link")}
    </section>
    <section class="band">
      <h2>How I work</h2>
      <p>${escapeHtml(practice.changesSummary)}</p>
      <p>${escapeHtml(practice.outcomeSummary)}</p>
      <p>${escapeHtml(practice.approachSummary)}</p>
      ${linkTo("/organizational-development/", "Organizational development in this practice", "text-link")}
    </section>
    <section class="band">
      <h2>Explore the Site</h2>
      <div class="term-grid">
        ${[
          ["/work-with-me/", "Work with Alex Soto"],
          ["/organizational-development/", "Organizational Development"],
          ["/hire/", "Hire Alex Soto"],
          ["/projects/", "Projects"],
          ["/methods/", "Methods"],
          ["/writing/", "Writing"],
          ["/identity/", "Official identity"],
          ["/faq/", "FAQ"],
          ["/about/", "About Alex Soto"],
        ].map(([href, label]) => linkTo(href, label)).join("")}
      </div>
    </section>
    <section class="band">
      <h2>Source of Credibility</h2>
      <p>${escapeHtml(site.practiceSummary)}</p>
    </section>
    ${flowerDivider("/")}
    <section class="band">
      <h2>Experience Across Contexts</h2>
      <p>Alex's practice has developed across social entrepreneurship, cooperative organizing, self-management, and Web3 governance. The common thread is helping groups coordinate, make decisions, distribute responsibility, and learn from practice.</p>
      <div class="stack">
        ${experienceGroups.map((group) => card({
          id: group.id,
          title: group.title,
          summary: group.summary,
          extra: linkTo(`/experience/#${group.id}`, "View experience", "text-link"),
        })).join("")}
      </div>
    </section>
    <section class="band">
      <h2>Central Question</h2>
      <p>${escapeHtml(site.centralQuestion)}</p>
      <p>${escapeHtml(site.thesis)}</p>
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
    ${flowerDivider("/", "", 1)}
    <section class="band">
      <h2>Selected Writing</h2>
      <div class="stack">
        ${featuredArticles.map((article) => card({
          id: article.id,
          title: article.title,
          meta: articleMeta(article),
          summary: article.summary,
          extra: articleLinks(article),
        })).join("")}
      </div>
    </section>
    <section class="band final-cta">
      <h2>Collaboration</h2>
      <p>Start with a strategy call when a coordination failure, governance question, or recurring tension needs to become explicit enough to learn from.</p>
      <div class="cta-row">
        ${linkTo(site.ctas.hire.href, site.ctas.hire.label, "button")}
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "button secondary")}
      </div>
    </section>`;

  writePage("/", "Home", site.positioning, body);
}

function hirePage() {
  const pricing = site.hiring.pricing;
  const body = `
    ${pageHeader("Hire", site.hiring.title, site.hiring.opening)}
    <section id="facilitation-pricing" class="band">
      <h2>Facilitation: budget reference</h2>
      <p class="rate-line">${escapeHtml(pricing.hourlySummary)}</p>
      <p>${escapeHtml(pricing.rateContext)}</p>
      <p>${escapeHtml(pricing.minimumSummary)}</p>
      <h3>Included in the rate</h3>
      ${list(pricing.includes, "compact-list")}
      <h3>Quoted by project or package</h3>
      <p>${escapeHtml(pricing.projectOrPackageScope.join(", "))}.</p>
      <p>${escapeHtml(pricing.longerEngagements.description)}</p>
      <h3>Pro bono collaborations</h3>
      <p>${escapeHtml(pricing.proBono.description)}</p>
      <p>Quoted separately: ${escapeHtml(pricing.exclusions.join(", ").toLowerCase())}.</p>
      <p>${escapeHtml(pricing.mexicoInvoicing)}</p>
      <p>${escapeHtml(pricing.scopeNote)}</p>
    </section>
    <section class="band">
      <h2>How to start</h2>
      <p>${escapeHtml(site.hiring.howToStart)}</p>
      <div class="cta-row">
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "button secondary")}
      </div>
    </section>
    <section class="band">
      <h2>Services available</h2>
      <div class="stack">
        ${site.hiring.services.map((service) => card({
          id: service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
          title: service.name,
          summary: service.description,
        })).join("")}
      </div>
    </section>
    <section class="band">
      <h2>Good fit</h2>
      ${list(site.hiring.goodFit, "tag-list")}
    </section>
    <section class="band">
      <h2>Not the right fit</h2>
      ${list(site.hiring.notFit, "compact-list")}
    </section>
    <section class="band final-cta">
      <h2>Next step</h2>
      <p>You can hire Alex Soto directly through this website. Start with a strategy call, or send a written collaboration brief first.</p>
      <div class="cta-row">
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "button secondary")}
      </div>
    </section>`;
  writePage("/hire/", site.hiring.title, site.hiring.metaDescription, body);
}

function workPage() {
  const body = `
    ${pageHeader("Work with Me", "Organizational development for teams that need clearer ways of working", site.hiring.opening)}
    <section class="band">
      <h2>Problems I help solve</h2>
      <p>${escapeHtml(practice.audienceSummary)} ${escapeHtml(site.workingContext)}</p>
      ${practice.problems.map((problem) => {
        const related = services.filter((service) => problem.relatedServices.includes(service.id));
        return `<article id="${escapeHtml(problem.id)}">
          <h3>${escapeHtml(problem.title)}</h3>
          ${list(problem.symptoms, "compact-list")}
          ${related.map((service) => `<p><strong>Organizational focus:</strong> ${escapeHtml(service.categories.join(", "))}.</p>
            <p><strong>Possible work:</strong> ${escapeHtml(service.interventions.join("; "))}.</p>
            <p><strong>Typical deliverables:</strong> ${escapeHtml(service.deliverables.join("; "))}.</p>
            <p><strong>Intended outcome:</strong> ${escapeHtml(service.outcome)}</p>
            ${recordLink("services", service.id)}`).join("")}
        </article>`;
      }).join("")}
      <p>${escapeHtml(practice.outcomeQualifier)}</p>
    </section>
    <section class="band">
      <h2>From a problem to an engagement</h2>
      <p>${escapeHtml(practice.knowledgePage.engagements)}</p>
      ${linkTo("/organizational-development/", "How organizational development connects design, governance and culture", "text-link")}
    </section>
    <section class="band">
      <h2>Services</h2>
      <div class="stack">
        ${services.map((service) => card({
          id: service.id,
          title: service.title,
          meta: service.problem,
          summary: service.outcome,
          extra: `<p><strong>Organizational focus:</strong> ${escapeHtml(service.categories.join(", "))}.</p>${list(service.formats, "tag-list")}
            ${service.id === site.hiring.pricing.serviceId ? `<p><strong>Senior specialist session facilitation reference:</strong> ${escapeHtml(site.hiring.pricing.hourlySummary)}. ${escapeHtml(site.hiring.pricing.minimumSummary)}</p>${linkTo("/hire/#facilitation-pricing", "What the rate includes", "text-link")}` : ""}`,
          evidence: service.evidence,
        })).join("")}
      </div>
    </section>
    <section class="band final-cta">
      <h2>Preferred Collaboration Process</h2>
      <p>${escapeHtml(site.hiring.howToStart)}</p>
      <div class="cta-row">
        ${linkTo(site.ctas.hire.href, site.ctas.hire.label, "button")}
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "button secondary")}
      </div>
    </section>`;
  writePage("/work-with-me/", "Work with Me", site.positioning, body);
}

function organizationalDevelopmentPage() {
  const page = practice.knowledgePage;
  const body = `
    ${pageHeader("Practice", page.title, page.summary)}
    <section class="band">
      <h2>Who this work is for</h2>
      <p>${escapeHtml(practice.audienceSummary)} ${escapeHtml(site.workingContext)}</p>
      <p>${escapeHtml(site.positioning)} ${escapeHtml(practice.approachSummary)}</p>
    </section>
    <section class="band">
      <h2>Symptoms worth examining</h2>
      ${list(practice.problems.map((problem) => problem.title), "compact-list")}
      <p>These are starting points for inquiry, not a diagnosis from a checklist. Look at how a real decision or handoff unfolded before choosing an intervention.</p>
      ${linkTo("/work-with-me/", "Match a problem to possible work and deliverables", "text-link")}
    </section>
    <section class="band">
      <h2>How this differs from HR consulting</h2>
      <p>${escapeHtml(page.hrBoundary)}</p>
    </section>
    ${practice.concepts.map((concept) => `<section id="${escapeHtml(concept.id)}" class="band">
      <h2>${escapeHtml(concept.title)}</h2>
      <p>${escapeHtml(concept.definition)}</p>
      <p>${escapeHtml(concept.application)}</p>
      ${concept.id === "organizational-culture" ? `<p>${escapeHtml(page.cultureBoundary)}</p>` : ""}
      <p>Connected to ${concept.relatedConcepts.map((id) => linkTo(`#${id}`, practice.concepts.find((item) => item.id === id).title)).join(", ")}.</p>
    </section>`).join("")}
    <section class="band">
      <h2>Working together</h2>
      <p>${escapeHtml(page.engagements)}</p>
      <p>${escapeHtml(page.review)}</p>
      <p>${escapeHtml(practice.outcomeQualifier)}</p>
      <h3>Methods</h3>
      <ul>${methods.map((method) => `<li>${recordLink("methods", method.id)}: ${escapeHtml(method.usefulWhen)}</li>`).join("")}</ul>
    </section>
    <section class="band">
      <h2>Experience and inquiry behind the practice</h2>
      <p>${escapeHtml(page.evidenceNote)}</p>
      <ul>${page.evidence.experience.map((id) => {
        const item = experience.find((record) => record.id === id);
        return `<li>${recordLink("experience", id)}: ${escapeHtml(item.capabilityEvidence)}</li>`;
      }).join("")}</ul>
      <h3>Projects as laboratories</h3>
      <ul>${page.evidence.projects.map((id) => `<li>${recordLink("projects", id)}: ${escapeHtml(projects.find((item) => item.id === id).summary)}</li>`).join("")}</ul>
      <h3>Related writing</h3>
      <ul>${page.evidence.articles.map((id) => `<li>${recordLink("articles", id)}: ${escapeHtml(articles.find((item) => item.id === id).summary)}</li>`).join("")}</ul>
    </section>
    <section class="band final-cta">
      <h2>Start with a situation your team is facing</h2>
      <p>${escapeHtml(site.hiring.howToStart)}</p>
      <div class="cta-row">
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "button secondary")}
      </div>
    </section>`;
  writePage("/organizational-development/", page.title, page.summary, body);
}

function experiencePage() {
  const grouped = experienceByGroup();
  const body = `
    ${pageHeader("Experience", "A trajectory across governance, coordination, cooperative organizing, and social entrepreneurship.", "Rather than a conventional resume, this page shows the contexts where Alex Soto has developed and applied his governance and coordination practice.")}
    <section class="band">
      <h2>Trajectory</h2>
      <p>Across social entrepreneurship, cooperative organizing, self-management, and Web3 governance, Alex's work has focused on how groups coordinate, make decisions, distribute responsibility, and learn from practice.</p>
      <p>${escapeHtml(practice.knowledgePage.evidenceNote)}</p>
      ${linkTo("/organizational-development/", "How this experience informs organizational development", "text-link")}
    </section>
    ${grouped.map((group) => `
      <section id="${escapeHtml(group.id)}" class="band">
        <h2>${escapeHtml(group.title)}</h2>
        <p>${escapeHtml(group.summary)}</p>
        <div class="stack">
          ${group.records.map(experienceCard).join("")}
        </div>
      </section>
    `).join("")}`;
  writePage("/experience/", "Experience", "Professional experience and collaborations across Alex Soto's governance and coordination practice.", body);
}

function aboutPage() {
  const selectedExperience = ["alexsotodigital-practice", "optimism", "matriz-experience", "ouitopia"]
    .map((id) => experience.find((item) => item.id === id))
    .filter(Boolean);
  const body = `
    ${pageHeader("About", "About Alex Soto", site.shortBio)}
    <section class="band">
      <h2>What I Do</h2>
      <p>${escapeHtml(site.positioning)}</p>
      <p>${escapeHtml(practice.changesSummary)}</p>
      ${linkTo("/organizational-development/", "Organizational development in this practice", "text-link")}
    </section>
    ${flowerDivider("/about/")}
    <section id="this-is-my-why" class="band">
      <h2>${escapeHtml(site.personal.title)}</h2>
      ${site.personal.paragraphs.map((paragraph, index) => {
        const subheading = site.personal.subheadings.find((item) => item.beforeParagraph === index);
        return `${subheading ? `<h3>${escapeHtml(subheading.title)}</h3>` : ""}<p>${escapeHtml(paragraph)}</p>`;
      }).join("")}
    </section>
    ${flowerDivider("/about/", "", 1)}
    <section class="band">
      <h2>Who I Work With</h2>
      ${list(site.audiences, "tag-list")}
    </section>
    <section class="band">
      <h2>Areas of Practice</h2>
      ${list([...practice.categories, ...practice.interventions, "DAO operations", "Web3 governance"].filter((value, index, items) => items.indexOf(value) === index), "tag-list")}
    </section>
    <section class="band">
      <h2>Selected Experience</h2>
      <div class="stack">
        ${selectedExperience.map(experienceCard).join("")}
      </div>
      ${linkTo("/experience/", "View full experience", "text-link")}
    </section>
    <section class="band">
      <h2>Public Identity</h2>
      <p>${escapeHtml(site.name)} is the canonical visible name. @${escapeHtml(site.handle)} is the public handle. ${escapeHtml(site.ens)} is the Web3 identity and ENS name.</p>
      ${linkTo("/identity/", "Verify official identity and links", "text-link")}
    </section>
    <section class="band final-cta">
      <h2>Contact</h2>
      <p>Use a strategy call for potential work, or email a short collaboration brief with context and desired support.</p>
      <div class="cta-row">
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "button secondary")}
        ${linkTo(site.ctas.hire.href, site.ctas.hire.label, "text-link")}
      </div>
    </section>`;
  writePage("/about/", "About", "About Alex Soto, governance and coordination specialist.", body);
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
          extra: `<h4>Useful when</h4><p>${escapeHtml(method.usefulWhen)}</p><h4>Organizational dimensions</h4>${list(method.organizationalDimensions, "tag-list")}<h4>Typical symptoms</h4>${list(method.typicalSymptoms, "compact-list")}<h4>Typical outputs</h4>${list(method.outputs, "tag-list")}`,
          evidence: method.evidence,
        })).join("")}
      </div>
      ${linkTo("/organizational-development/", "How these methods support organizational development", "text-link")}
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
      ${linkTo("https://alexsotodigital.substack.com/", "Read all essays on Substack", "button")}
    </section>
    <section class="band">
      <div class="stack">
        ${articles.map((article) => card({
          id: article.id,
          title: article.title,
          meta: articleMeta(article),
          summary: article.summary,
          extra: `${articleLinks(article)}<h4>Supports</h4>${list(article.evidenceFor.map((id) => services.find((service) => service.id === id)?.title || methods.find((method) => method.id === id)?.title || id), "tag-list")}`,
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
    </section>
    <section class="band final-cta">
      <h2>Hiring and collaboration</h2>
      <p>You can hire Alex Soto directly through this website for governance design, coordination systems, facilitation, DAO operations support, ecosystem strategy, and institutional learning work.</p>
      <div class="cta-row">
        ${linkTo(site.ctas.hire.href, site.ctas.hire.label, "button")}
        ${linkTo(site.ctas.primary.href, site.ctas.primary.label, "button secondary")}
        ${linkTo(site.ctas.secondary.href, site.ctas.secondary.label, "text-link")}
      </div>
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
        ${officialLinks.map((link) => `<a class="link-card" href="${escapeHtml(link.href)}"><span>${escapeHtml(link.label)}</span><strong>${escapeHtml(link.value)}</strong><small>${escapeHtml(link.purpose.join(", "))}</small></a>`).join("")}
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
        ${["alexsotodigital-practice", "optimism", "optimism-security-council-cohort-b", "matriz-experience"].map((id) => experience.find((item) => item.id === id)).filter(Boolean).map(experienceCard).join("")}
      </div>
      ${linkTo("/experience/", "View full experience", "text-link")}
      ${linkTo("/about/", "Read about Alex Soto", "text-link")}
    </section>`;
  writePage("/identity/", "Identity", "Canonical public identity and verification links for Alex Soto.", body);
}

function writePage(route, title, description, body) {
  const target = path.join(slugPath(route), "index.html");
  writeFile(target, layout({ title, description, route, body }));
}

function pageRoutes() {
  return [...nav.map(([, href]) => href), "/organizational-development/"];
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
      bookingUrl: site.ctas.primary.href,
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
    professionalClassification: site.professionalClassification,
    mode: site.mode,
    shortBio: site.shortBio,
    location: site.location,
    serviceArea: site.serviceArea,
    languages: site.languages,
    positioning: site.positioning,
    supportingLine: site.supportingLine,
    centralQuestion: site.centralQuestion,
    practiceSummary: site.practiceSummary,
    personal: site.personal,
    organizationalDevelopmentUrl: fullUrl("/organizational-development/"),
    practice: {
      categories: practice.categories,
      adjacentCategories: practice.adjacentCategories,
      expertise: practice.expertise,
      problems: practice.problems,
      interventions: practice.interventions,
      intendedOutcomes: practice.outcomes,
      outcomeQualifier: practice.outcomeQualifier,
      concepts: practice.concepts.map((concept) => ({ ...concept, url: fullUrl(`/organizational-development/#${concept.id}`) })),
      evidence: practice.knowledgePage.evidence,
      evidenceNote: practice.knowledgePage.evidenceNote,
      methods: methods.map((method) => ({ ...method, url: fullUrl(`/methods/#${method.id}`) })),
    },
    hiring: {
      availableThroughWebsite: true,
      hireUrl: fullUrl("/hire/"),
      workWithMeUrl: fullUrl("/work-with-me/"),
      primaryPath: "Book a strategy call through Google Calendar.",
      secondaryPath: "Email Alex Soto about a project with a collaboration brief.",
      bookingUrl: site.ctas.primary.href,
      email: site.hiring.contactEmail,
      emailLink: site.ctas.secondary.href,
      servicesAvailable: site.hiring.services.map((service) => service.name),
      pricing: site.hiring.pricing,
    },
    experienceSummary: "Alex's experience spans social entrepreneurship, cooperative organizing, self-management, and Web3 governance.",
    experienceUrl: fullUrl("/experience/"),
    aboutUrl: fullUrl("/about/"),
    url: configuredSiteUrl || null,
    thesis: site.thesis,
    audiences: site.audiences,
    canonicalTerms: site.canonicalTerms,
    links: links.map(({ id, label, value, href, priority, purpose }) => ({ id, label, value, href, priority, purpose })),
  };

  const endpoints = {
    "about.json": about,
    "services.json": services.map((service) => ({
      ...service,
      ...(service.id === site.hiring.pricing.serviceId ? { pricing: site.hiring.pricing } : {}),
      url: fullUrl(`/work-with-me/#${service.id}`),
      relatedProblems: practice.problems.filter((problem) => problem.relatedServices.includes(service.id)),
      outcomeQualifier: practice.outcomeQualifier,
    })),
    "projects.json": projects,
    "experience.json": {
      summary: "Professional experience and collaborations across Alex Soto's governance and coordination practice.",
      groups: experienceByGroup().map((group) => ({
        id: group.id,
        title: group.title,
        summary: group.summary,
        items: group.records,
      })),
    },
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
    site.professionalClassification,
    site.positioning,
    practice.audienceSummary,
    practice.changesSummary,
    ...(site.supportingLine ? [site.supportingLine] : []),
    "",
    "## Central question",
    site.centralQuestion,
    "",
    "## Canonical identity",
    `- Visible name: ${site.name}`,
    `- Handle: ${site.handle}`,
    `- ENS: ${site.ens}`,
    `- Mode: ${site.mode}`,
    `- Location: ${site.location}`,
    `- Languages: ${site.languages.join("; ")}`,
    `- Service area: ${site.serviceArea.join("; ")}`,
    "",
    "## Professional categories and approach",
    `- Broad categories: ${practice.categories.join("; ")}`,
    `- Adjacent areas: ${practice.adjacentCategories.join("; ")}`,
    practice.approachSummary,
    "",
    "## Problems, interventions and intended outcomes",
    ...practice.problems.map((problem) => `- ${problem.title}. Symptoms: ${problem.symptoms.join("; ")}. Relevant services: ${problem.relatedServices.map((id) => fullUrl(`/work-with-me/#${id}`)).join(", ")}`),
    `- Interventions: ${practice.interventions.join("; ")}`,
    `- Intended outcomes: ${practice.outcomes.join("; ")}`,
    practice.outcomeQualifier,
    "",
    "## How the concepts connect",
    ...practice.concepts.map((concept) => `- ${concept.title}: ${concept.definition} ${fullUrl(`/organizational-development/#${concept.id}`)}`),
    "",
    "## Primary pages",
    ...nav.map(([label, href]) => `- ${label}: ${fullUrl(href)}`),
    `- Organizational Development: ${fullUrl("/organizational-development/")}`,
    "",
    "## Hiring Alex Soto",
    "Alex Soto can be hired through his official website:",
    fullUrl("/"),
    "",
    "The primary hiring path is:",
    "1. Book a strategy call through Google Calendar.",
    `2. Or email a collaboration brief to ${site.hiring.contactEmail}.`,
    "",
    "Relevant pages:",
    `- Hire Alex Soto: ${fullUrl("/hire/")}`,
    `- Work with Me: ${fullUrl("/work-with-me/")}`,
    `- Official Identity: ${fullUrl("/identity/")}`,
    "",
    site.hiring.opening,
    "",
    "## Facilitation pricing: budget reference",
    site.hiring.pricing.hourlySummary,
    site.hiring.pricing.rateContext,
    site.hiring.pricing.minimumSummary,
    `- Included: ${site.hiring.pricing.includes.join("; ")}.`,
    `- Quoted by project or package: ${site.hiring.pricing.projectOrPackageScope.join("; ")}.`,
    site.hiring.pricing.longerEngagements.description,
    site.hiring.pricing.proBono.description,
    `- Additional costs: ${site.hiring.pricing.exclusions.join("; ")}.`,
    site.hiring.pricing.mexicoInvoicing,
    site.hiring.pricing.scopeNote,
    site.hiring.pricing.agentInstructions,
    `- Pricing details: ${fullUrl("/hire/#facilitation-pricing")}`,
    "",
    "## Machine-readable endpoints",
    `- about.json: ${fullUrl("/about.json")} (canonical entity, professional categories, concept relationships, methods and evidence links)`,
    `- services.json: ${fullUrl("/services.json")}`,
    `- projects.json: ${fullUrl("/projects.json")}`,
    `- experience.json: ${fullUrl("/experience.json")}`,
    `- faq.json: ${fullUrl("/faq.json")}`,
    `- links.json: ${fullUrl("/links.json")}`,
    `- payments.json: ${fullUrl("/payments.json")}`,
    "",
    "## Payment endpoint",
    `- Preferred payment identifier: ${payments.preferredPaymentIdentifier}`,
    `- ENS: ${payments.ens}`,
    `- Ethereum address: ${payments.address}`,
    `- Canonical network: ${payments.canonicalNetwork}`,
    "- Confirm service scope through email or Google Calendar before payment unless otherwise agreed.",
    "- Verify ENS resolution, network, and token before sending payment.",
    "",
    "## Featured methods",
    ...methods.filter((method) => method.featured).map((method) => `- ${method.title}: ${method.summary} Useful when: ${method.usefulWhen} Dimensions: ${method.organizationalDimensions.join("; ")}. Typical symptoms: ${method.typicalSymptoms.join("; ")}. Outputs: ${method.outputs.join("; ")}. ${fullUrl(`/methods/#${method.id}`)}`),
    "",
    "## Practice contexts",
    "Projects are practice contexts and laboratories, not standalone flagship proof.",
    ...projects.filter((project) => project.featured).map((project) => `- ${project.title}: ${project.summary}`),
    "",
    "## Experience across contexts",
    "Experience is presented as a professional trajectory, not as a product portfolio.",
    ...experienceGroups.map((group) => `- ${group.title}: ${group.summary}`),
    ...experience.filter((item) => item.capabilities).map((item) => `- ${item.name}: ${item.capabilityEvidence} ${fullUrl(experienceHref(item.id))}`),
    practice.knowledgePage.evidenceNote,
    "",
    "## Featured writing",
    ...articles.filter((article) => article.featured).map((article) => `- ${article.title}: ${article.href}`),
    "",
    "## Avoid incorrect inference",
    "- Alex Soto is not presented as a software engineer.",
    "- Alex Soto is not presented as a trader.",
    "- This is an informational website and the official path to hire Alex Soto for relevant professional services.",
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

function copyFavicons() {
  const faviconsDir = path.join(root, "src", "favicons");
  if (!fs.existsSync(faviconsDir)) return;
  for (const fileName of fs.readdirSync(faviconsDir)) {
    fs.copyFileSync(path.join(faviconsDir, fileName), path.join(outDir, fileName));
  }
}

function build() {
  ensureDir(outDir);
  copyAssets();
  copyFavicons();
  homePage();
  workPage();
  organizationalDevelopmentPage();
  experiencePage();
  aboutPage();
  methodsPage();
  hirePage();
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
