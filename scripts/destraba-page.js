const campaign = require("../content/destraba");

module.exports = function destrabaPage({ escapeHtml: e, fullUrl, rootRelativeAsset, inlineStyles, campaignStyles, site }) {
  const c = campaign;
  const asset = (name) => rootRelativeAsset(c.route, name);
  const bullets = (items) => `<ul class="d-list">${items.map((item) => `<li>${e(item)}</li>`).join("")}</ul>`;
  const cta = () => `<a class="d-cta" href="${e(c.application.url)}" target="_blank" rel="noopener noreferrer" aria-label="${e(c.application.label)} (abre en una pestaña nueva)">${e(c.application.label)}<span aria-hidden="true">↗</span></a>`;
  const heading = (number, title, id) => `<div class="d-section-heading"><span class="d-index" aria-hidden="true">${number}</span><h2 id="${id}">${e(title)}</h2></div>`;
  const imageUrl = fullUrl(`/assets/${c.image}`);
  const structured = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: c.pageTitle,
    description: c.description,
    url: fullUrl(c.route),
    inLanguage: "es",
    image: imageUrl,
    isPartOf: { "@type": "WebSite", name: site.name, url: fullUrl("/") },
    about: {
      "@type": "Service",
      name: c.title,
      description: c.introduction,
      serviceType: "Piloto de consultoría organizacional pro-bono",
      areaServed: "Latinoamérica",
      provider: { "@type": "Person", name: site.name, url: fullUrl("/") },
    },
  };
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${e(c.pageTitle)}</title>
  <meta name="description" content="${e(c.description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${e(fullUrl(c.route))}">
  <link rel="icon" href="${asset("favicon.ico?v=2")}" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="${asset("favicon-32x32.png?v=2")}">
  <link rel="icon" type="image/png" sizes="16x16" href="${asset("favicon-16x16.png?v=2")}">
  <link rel="apple-touch-icon" sizes="180x180" href="${asset("apple-touch-icon.png?v=2")}">
  <link rel="manifest" href="${asset("site.webmanifest?v=2")}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${e(site.name)}">
  <meta property="og:locale" content="es_MX">
  <meta property="og:title" content="${e(c.pageTitle)}">
  <meta property="og:description" content="${e(c.description)}">
  <meta property="og:url" content="${e(fullUrl(c.route))}">
  <meta property="og:image" content="${e(imageUrl)}">
  <meta property="og:image:width" content="1254">
  <meta property="og:image:height" content="1254">
  <meta property="og:image:alt" content="${e(c.imageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@${e(site.handle)}">
  <meta name="twitter:title" content="${e(c.pageTitle)}">
  <meta name="twitter:description" content="${e(c.description)}">
  <meta name="twitter:image" content="${e(imageUrl)}">
  <meta name="twitter:image:alt" content="${e(c.imageAlt)}">
  <style>${inlineStyles()}\n${campaignStyles.replace(/<\/style/gi, "<\\/style")}</style>
  <script type="application/ld+json">${JSON.stringify(structured).replace(/</g, "\\u003c")}</script>
</head>
<body class="destraba">
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="d-topbar">
    <a class="d-brand" href="../" aria-label="Alex Soto: sitio principal"><img src="${asset("assets/alex-soto-pfp.png")}" width="36" height="36" alt=""><span>alexsotodigital</span></a>
    <span class="d-collaborator">En colaboración con <a href="${e(c.collaborator.url)}"><img src="${asset(`assets/${c.collaborator.logo}`)}" width="124" height="36" alt="${e(c.collaborator.name)}"></a></span>
    <a class="d-back" href="../about/">Conoce a Alex Soto <span aria-hidden="true">↗</span></a>
  </header>
  <main id="contenido" tabindex="-1">
    <section class="d-hero" aria-labelledby="d-title">
      <img class="d-artwork" src="${asset(`assets/${c.image}`)}" srcset="${asset(`assets/${c.smallImage}`)} 640w, ${asset(`assets/${c.image}`)} 1254w" sizes="100vw" width="1254" height="1254" alt="${e(c.imageAlt)}" fetchpriority="high">
      <div class="d-hero-inner">
        <p class="d-eyebrow">Convocatoria · Latinoamérica · 2026</p>
        <h1 id="d-title">${e(c.title)}</h1>
        <p class="d-tagline">${e(c.tagline)}</p>
        <p class="d-hero-description">${e(c.introduction)}</p>
        ${cta()}
        <p class="d-deadline">Postulaciones: <strong>${e(c.application.period)}</strong></p>
      </div>
    </section>
    <div class="d-facts"><dl class="d-wrap">${c.facts.map((fact) => `<div><dt>${e(fact.label)}</dt><dd>${e(fact.value)}</dd></div>`).join("")}</dl></div>
    <section class="d-section d-wrap" aria-labelledby="bloqueos">
      ${heading("01", c.problem.title, "bloqueos")}
      <p class="d-intro">${e(c.problem.introduction)}</p>
      <div class="d-problems">${c.problem.items.map((item, i) => `<article class="d-problem"><span class="d-block" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><h3>${e(item.title)}</h3><p>${e(item.text)}</p></article>`).join("")}</div>
      <p class="d-thesis">${e(c.problem.conclusion)}</p>
    </section>
    <section class="d-process-band" aria-labelledby="proceso"><div class="d-section d-wrap">
      ${heading("02", c.process.title, "proceso")}
      <p class="d-intro">${e(c.process.introduction)}</p><p>${e(c.process.context)}</p>
      <ol class="d-process">${c.process.stages.map((item, i) => `<li><span class="d-step-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span><div><h3>${e(item.title)}</h3><p>${e(item.text)}</p></div></li>`).join("")}</ol>
      <p class="d-note">${e(c.process.metaphorNote)}</p>
    </div></section>
    <section class="d-section d-wrap d-two-column" aria-labelledby="resultados">
      <div>${heading("03", c.outcomes.title, "resultados")}<p class="d-intro">${e(c.outcomes.introduction)}</p><p class="d-note">${e(c.outcomes.note)}</p></div>
      ${bullets(c.outcomes.items)}
    </section>
    <section class="d-eligibility-band" aria-labelledby="participar"><div class="d-section d-wrap d-two-column">
      <div>${heading("04", c.eligibility.title, "participar")}<p class="d-intro">${e(c.eligibility.introduction)}</p><p class="d-note">${e(c.selection.impactNote)}</p></div>
      ${bullets(c.eligibility.items)}
    </div></section>
    <section class="d-section d-wrap" aria-labelledby="calendario">
      ${heading("05", c.timeline.title, "calendario")}
      <p class="d-calendar-deadline">Cierre de postulaciones: <time datetime="${c.application.deadlineDate}">${e(c.application.deadline)}</time></p>
      <ol class="d-timeline">${c.timeline.stages.map((item) => `<li><p class="d-date">${e(item.date)}</p><div><h3>${e(item.title)}</h3><p>${e(item.text)}</p></div></li>`).join("")}</ol>
      <p class="d-note">${e(c.timeline.note)}</p>
    </section>
    <section class="d-commitment-band" aria-labelledby="compromiso"><div class="d-section d-wrap">
      ${heading("06", c.commitment.title, "compromiso")}
      <p class="d-intro">${e(c.commitment.introduction)}</p>
      <div class="d-two-column"><div><h3>A cambio, necesitaremos</h3>${bullets(c.commitment.items)}</div><div class="d-confidentiality"><h3>Confidencialidad</h3><p>${e(c.commitment.confidentiality)}</p></div></div>
    </div></section>
    <section class="d-section d-wrap" aria-labelledby="seleccion">
      ${heading("07", c.selection.title, "seleccion")}
      <div class="d-criteria">${c.selection.criteria.map((item) => `<div><h3>${e(item.title)}</h3><p>${e(item.text)}</p></div>`).join("")}</div>
      <p class="d-note">${e(c.selection.note)}</p>
      <div class="d-exclusions"><h3>${e(c.exclusions.title)}</h3>${bullets(c.exclusions.items)}</div>
    </section>
    <section class="d-closing" aria-labelledby="postular"><div class="d-wrap">
      <p class="d-eyebrow">Un equipo. Cambios reales.</p>
      <h2 id="postular">${e(c.closing.title)}</h2>
      <p>${e(c.closing.text)}</p>
      ${cta()}
      <p class="d-deadline">Postulaciones: ${e(c.application.period)}</p>
    </div></section>
  </main>
  <footer class="d-footer d-wrap"><div><strong>${e(c.title)}</strong><p>${e(c.collaborationIntro)} <a href="${e(c.collaborator.url)}">${e(c.collaborator.name)}</a>.</p></div><a href="../about/">Conoce a Alex Soto <span aria-hidden="true">↗</span></a></footer>
</body>
</html>`;
};
