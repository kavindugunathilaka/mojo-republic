/**
 * main.js — per-page bootstrapping. Wires shared components (nav, footer,
 * reveal, counters) and renders any content.json-driven sections for the
 * current page, identified via <body data-page="...">.
 */
(function (global) {
  'use strict';

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const escapeHtml = (str = '') =>
    str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function renderServiceCards(services) {
    const mount = $('[data-render="service-cards"]');
    if (!mount || !services) return;
    mount.innerHTML = services
      .map(
        (s) => `
      <div class="service-orb service-orb--lg" id="${s.id}" data-reveal="scale">
        <span class="service-orb__title">${escapeHtml(s.title)}</span>
      </div>`
      )
      .join('');
  }

  function renderClients(clients) {
    const mount = $('[data-render="clients"]');
    if (!mount || !clients) return;
    mount.innerHTML = clients
      .map(
        (c) => `
      <div class="logo-tile" data-reveal>${escapeHtml(c.name)}</div>`
      )
      .join('');
  }

  function renderCaseStudies(caseStudies) {
    const mount = $('[data-render="case-studies"]');
    if (!mount || !caseStudies) return;
    mount.innerHTML = caseStudies
      .map(
        (cs) => `
      <div class="case-card">
        <div class="case-card__bg"><img src="${cs.image}" alt="" loading="lazy" /></div>
        <div class="case-card__body">
          <h3 class="case-card__eyebrow">${escapeHtml(cs.title)}</h3>
          ${cs.stats
            .map(
              (stat) => `
            <div>
              <div class="case-card__stat-label">${escapeHtml(stat.label)}</div>
              <div class="case-card__stat-text">${escapeHtml(stat.text)}</div>
            </div>`
            )
            .join('')}
        </div>
      </div>`
      )
      .join('');
    Mojo.Carousel.init($('[data-carousel="case-studies"]'));
    Mojo.LazyImages.init();
  }

  function renderAwards(awards) {
    const mount = $('[data-render="awards"]');
    if (!mount || !awards) return;
    const featuredIndex = Math.floor(awards.length / 2);
    mount.innerHTML = awards
      .map(
        (a, i) => `
      <div class="award-circle${i === featuredIndex ? ' award-circle--large' : ''}" data-reveal="scale">
        <div>
          <strong>${escapeHtml(a.title)}</strong>
          <span>${escapeHtml(a.issuer)} &middot; ${escapeHtml(a.year)}</span>
        </div>
      </div>`
      )
      .join('');
  }

  function renderJobsList(jobs) {
    const mount = $('[data-render="jobs-list"]');
    if (!mount || !jobs) return;
    mount.innerHTML = jobs
      .map(
        (j) => `
      <article class="job-card" data-reveal>
        <div class="flex-between">
          <h3 class="card__title" style="margin:0;">${escapeHtml(j.title)}</h3>
          <span class="badge">${escapeHtml(j.type)}</span>
        </div>
        <div class="job-card__meta">
          <span>${escapeHtml(j.location)}</span>
          <span>Posted ${new Date(j.posted).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
        <a class="btn btn--outline" href="job-detail.html?id=${encodeURIComponent(j.id)}">View role</a>
      </article>`
      )
      .join('');
  }

  function renderJobPills(jobs) {
    const mount = $('[data-render="job-pills"]');
    if (!mount || !jobs) return;
    mount.innerHTML = jobs
      .map(
        (j, i) => `
      <a class="job-pill${i === 0 ? ' is-active' : ''}" href="job-detail.html?id=${encodeURIComponent(j.id)}" data-reveal="scale">${escapeHtml(j.title)}</a>`
      )
      .join('');
  }

  function renderTeam(team) {
    const mount = $('[data-render="team-bio-extended"]');
    if (!mount || !team || !team[0]) return;
    const person = team[0];
    const half = Math.ceil(person.bioExtended.length / 2);
    const col1 = person.bioExtended.slice(0, half);
    const col2 = person.bioExtended.slice(half);
    mount.innerHTML = `
      <div data-reveal>${col1.map((p) => `<p style="margin-bottom:1.25em;">${escapeHtml(p)}</p>`).join('')}</div>
      <div data-reveal>${col2.map((p) => `<p style="margin-bottom:1.25em;">${escapeHtml(p)}</p>`).join('')}</div>`;

    const quoteMount = $('[data-render="team-quote"]');
    if (quoteMount) {
      quoteMount.innerHTML = `
        <p class="testimonial__quote" style="font-size:var(--fs-xl);color:var(--color-text-inverse);">&ldquo;${escapeHtml(person.quote)}&rdquo;</p>
        ${person.bio.map((p) => `<p style="color:var(--color-text-inverse-muted);margin-bottom:1.25em;line-height:var(--lh-relaxed);">${escapeHtml(p)}</p>`).join('')}
        <h3 style="color:var(--color-text-inverse);margin-top:1.5rem;">${escapeHtml(person.name)}</h3>
        <p style="color:var(--color-accent-light);">${escapeHtml(person.role)}</p>`;
    }

    const photoMount = $('[data-render="team-photo"]');
    if (photoMount) photoMount.setAttribute('src', person.photo);
  }

  function renderJobDetail(jobs) {
    const mount = $('[data-render="job-detail"]');
    if (!mount || !jobs) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || (jobs[0] && jobs[0].id);
    const job = jobs.find((j) => j.id === id) || jobs[0];
    if (!job) return;

    document.title = `${job.title} · Careers · ${global.CONFIG.company.name}`;

    mount.innerHTML = `
      <h1 class="page-header__title">${escapeHtml(job.title)}</h1>
      <div class="job-card__meta" style="margin-bottom:2rem;font-size:var(--fs-sm);">
        <span><img src="${global.CONFIG.icons.location}" alt="" width="16" height="16" style="display:inline-block;vertical-align:-3px;margin-right:4px;" />${escapeHtml(job.location)}</span>
        <span><img src="${global.CONFIG.icons.clock}" alt="" width="16" height="16" style="display:inline-block;vertical-align:-3px;margin-right:4px;" />Posted ${new Date(job.posted).toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        <span class="badge">${escapeHtml(job.type)}</span>
        <span class="badge">${escapeHtml(job.department)}</span>
      </div>
      <h2 style="font-size:var(--fs-md);margin-bottom:1rem;">You will be responsible for:</h2>
      ${job.responsibilities
        .map(
          (group, i) => `
        <div style="margin-bottom:1.75rem;">
          <p style="font-weight:600;margin-bottom:0.75rem;">${i + 1}. ${escapeHtml(group.group)}</p>
          <ul style="padding-left:1.25rem;list-style:disc;color:var(--color-text-muted);line-height:var(--lh-relaxed);">
            ${group.items.map((item) => `<li style="margin-bottom:0.5rem;">${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>`
        )
        .join('')}
      <h2 style="font-size:var(--fs-md);margin:2rem 0 1rem;">What we're looking for:</h2>
      <ul style="padding-left:1.25rem;list-style:disc;color:var(--color-text-muted);line-height:var(--lh-relaxed);margin-bottom:2.5rem;">
        ${job.requirements.map((r) => `<li style="margin-bottom:0.5rem;">${escapeHtml(r)}</li>`).join('')}
      </ul>
      <a class="btn btn--primary" href="contact.html">Apply for this role</a>`;
  }

  /* ------------------------------------------------------------------ */
  /* Bootstrap                                                            */
  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page || 'home';

    Mojo.Nav.init(page === 'job-detail' || page === 'careers' ? 'contact' : page);
    Mojo.Footer.init();

    Mojo.getContent().then((content) => {
      switch (page) {
        case 'about':
          renderAwards(content.awards);
          break;
        case 'services':
          renderServiceCards(content.services);
          break;
        case 'clients':
          renderClients(content.clients);
          renderCaseStudies(content.caseStudies);
          break;
        case 'people':
          renderTeam(content.team);
          break;
        case 'contact':
          renderJobPills(content.jobs);
          break;
        case 'careers':
          renderJobsList(content.jobs);
          break;
        case 'job-detail':
          renderJobDetail(content.jobs);
          break;
      }

      Mojo.Reveal.init();
      Mojo.Counter.init();
      Mojo.LazyImages.init();
    });

    if (global.Mojo.Forms) {
      Mojo.Forms.initContactForm('[data-form="contact"]');
    }
  });
})(window);
