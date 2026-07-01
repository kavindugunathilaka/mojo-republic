/**
 * components.js — reusable, framework-free UI behaviors shared by every page.
 * Exposes a single `Mojo` namespace on window so pages can opt into only
 * the pieces they need from main.js.
 */
(function (global) {
  'use strict';

  const Mojo = {};
  let contentPromise = null;

  /* ------------------------------------------------------------------ */
  /* Content loader — reads window.MOJO_CONTENT (set by js/content-data.js)*/
  /* so the site works when opened directly via file://. If that global   */
  /* isn't present (e.g. content-data.js wasn't loaded) it falls back to  */
  /* fetching data/content.json, which requires a local server.          */
  /* ------------------------------------------------------------------ */
  Mojo.getContent = function () {
    if (!contentPromise) {
      if (global.MOJO_CONTENT) {
        contentPromise = Promise.resolve(global.MOJO_CONTENT);
      } else {
        contentPromise = fetch(global.CONFIG.content.dataUrl)
          .then((res) => {
            if (!res.ok) throw new Error('Failed to load content.json: ' + res.status);
            return res.json();
          })
          .catch((err) => {
            console.error(err);
            return {};
          });
      }
    }
    return contentPromise;
  };

  /* ------------------------------------------------------------------ */
  /* Navbar — inject markup, sticky shadow, mobile toggle, active link   */
  /* ------------------------------------------------------------------ */
  Mojo.Nav = {
    init(activeKey) {
      const mount = document.querySelector('[data-component="navbar"]');
      if (!mount) return;

      const { images, nav, company } = global.CONFIG;
      const links = nav
        .map(
          (item) => `
        <a class="navbar__link${item.key === activeKey ? ' is-active' : ''}"
           href="${item.href}"
           ${item.key === activeKey ? 'aria-current="page"' : ''}>${item.label}</a>`
        )
        .join('');

      mount.innerHTML = `
        <nav class="navbar" aria-label="Primary">
          <div class="container navbar__inner">
            <a class="navbar__brand" href="index.html" aria-label="${company.name} home">
              <img class="navbar__logo-mark" src="${images.logoMark}" alt="" width="88" height="32" />
              <span class="navbar__brand-text">The<br />mojo republic</span>
            </a>
            <div class="navbar__links" id="primaryNavLinks">
              ${links}
            </div>
            <div class="navbar__actions">
              <a class="btn btn--accent hide-mobile" href="contact.html"><span>Let's talk</span></a>
              <button class="navbar__toggle" type="button" aria-expanded="false" aria-controls="primaryNavLinks" aria-label="Toggle navigation menu">
                <span class="navbar__toggle-bar"></span>
                <span class="navbar__toggle-bar"></span>
                <span class="navbar__toggle-bar"></span>
              </button>
            </div>
          </div>
        </nav>`;

      const navEl = mount.querySelector('.navbar');
      const toggle = mount.querySelector('.navbar__toggle');
      const linksEl = mount.querySelector('.navbar__links');

      toggle.addEventListener('click', () => {
        const isOpen = linksEl.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      linksEl.querySelectorAll('.navbar__link').forEach((a) =>
        a.addEventListener('click', () => {
          linksEl.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        })
      );

      const onScroll = () => {
        navEl.classList.toggle('is-scrolled', window.scrollY > 12);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    },
  };

  /* ------------------------------------------------------------------ */
  /* Footer — inject markup from CONFIG                                  */
  /* ------------------------------------------------------------------ */
  Mojo.Footer = {
    init() {
      const mount = document.querySelector('[data-component="footer"]');
      if (!mount) return;

      const { images, company, social } = global.CONFIG;

      mount.innerHTML = `
        <footer class="footer">
          <div class="container">
            <div class="footer__grid">
              <div>
                <img class="navbar__logo-mark" src="${images.logoMarkInverse}" alt="" width="88" height="32" />
                <p class="footer__brand-text">The mojo republic<small>Full-service communications</small></p>
              </div>
              <div>
                <h3 class="footer__heading">Email</h3>
                <a class="footer__link" href="mailto:${company.email}">${company.email}</a>
                <h3 class="footer__heading" style="margin-top:1.5rem;">Phone Number</h3>
                <a class="footer__link" href="tel:${company.phoneHref}">${company.phone}</a>
              </div>
              <div>
                <h3 class="footer__heading">Address</h3>
                <p class="footer__text">${company.address.line1}<br />${company.address.line2}<br />${company.address.line3}</p>
              </div>
              <div>
                <h3 class="footer__heading">Sitemap</h3>
                ${global.CONFIG.nav.map((n) => `<a class="footer__link" href="${n.href}">${n.label}</a>`).join('')}
                <div class="footer__social">
                  <a class="social-icon" href="${social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z"/></svg>
                  </a>
                  <a class="social-icon" href="${social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24"><path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.56.55.9 1.11 1.16 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.16 1.77 4.9 4.9 0 0 1-1.77 1.16c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.16-1.77A4.9 4.9 0 0 1 5.46.53C6.1.28 6.83.11 7.89.06 8.94.01 9.28 0 12 0Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"/></svg>
                  </a>
                  <a class="social-icon" href="${social.whatsapp}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.13L2 22l5.13-1.53a9.85 9.85 0 0 0 4.9 1.32h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.1c-.24.68-1.42 1.3-1.96 1.38-.5.08-1.13.11-1.83-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.6.83 2.06.9 2.21.07.15.12.33.02.53-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.75 1.24 1.62 2 1.11.99 2.05 1.3 2.34 1.44.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.2-.28.4-.24.66-.14.27.1 1.72.81 2.02.96.29.15.49.22.56.35.07.13.07.75-.17 1.43Z"/></svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="footer__bottom">
              <span>&copy; <span data-current-year></span> ${company.name}. All rights reserved.</span>
              <span>${company.address.line3.trim()}</span>
            </div>
          </div>
        </footer>`;

      const yearEl = mount.querySelector('[data-current-year]');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    },
  };

  /* ------------------------------------------------------------------ */
  /* Scroll reveal                                                       */
  /* ------------------------------------------------------------------ */
  Mojo.Reveal = {
    init() {
      const els = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
      if (!els.length) return;

      if (!('IntersectionObserver' in global)) {
        els.forEach((el) => el.classList.add('is-visible'));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );

      els.forEach((el) => observer.observe(el));
    },
  };

  /* ------------------------------------------------------------------ */
  /* Animated counters                                                   */
  /* ------------------------------------------------------------------ */
  Mojo.Counter = {
    init() {
      const counters = document.querySelectorAll('[data-counter]');
      if (!counters.length) return;

      const animate = (el) => {
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.counterSuffix || '';
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      };

      if (!('IntersectionObserver' in global)) {
        counters.forEach(animate);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => observer.observe(el));
    },
  };

  /* ------------------------------------------------------------------ */
  /* FAQ accordion                                                       */
  /* ------------------------------------------------------------------ */
  Mojo.Faq = {
    render(items, mount) {
      if (!mount) return;
      mount.innerHTML = items
        .map(
          (item, i) => `
        <div class="faq__item" data-reveal>
          <h3>
            <button class="faq__question" type="button" aria-expanded="false" aria-controls="faqPanel${i}" id="faqQuestion${i}">
              <span>${item.question}</span>
              <span class="faq__icon" aria-hidden="true">+</span>
            </button>
          </h3>
          <div class="faq__panel" id="faqPanel${i}" role="region" aria-labelledby="faqQuestion${i}" data-open="false">
            <div class="faq__panel-inner">
              <p class="faq__answer">${item.answer}</p>
            </div>
          </div>
        </div>`
        )
        .join('');

      mount.querySelectorAll('.faq__question').forEach((btn) => {
        btn.addEventListener('click', () => {
          const panel = document.getElementById(btn.getAttribute('aria-controls'));
          const isOpen = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', String(!isOpen));
          panel.dataset.open = String(!isOpen);
        });
      });
    },
  };

  /* ------------------------------------------------------------------ */
  /* Lightweight accessible carousel (case studies, awards, testimonials)*/
  /* ------------------------------------------------------------------ */
  Mojo.Carousel = {
    init(root) {
      if (!root) return;
      const track = root.querySelector('[data-carousel-track]');
      const slides = Array.from(track.children);
      const prevBtn = root.querySelector('[data-carousel-prev]');
      const nextBtn = root.querySelector('[data-carousel-next]');
      const status = root.querySelector('[data-carousel-status]');
      let index = 0;

      function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
        if (status) status.textContent = `${index + 1} / ${slides.length}`;
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = false;
      }

      prevBtn &&
        prevBtn.addEventListener('click', () => {
          index = (index - 1 + slides.length) % slides.length;
          update();
        });
      nextBtn &&
        nextBtn.addEventListener('click', () => {
          index = (index + 1) % slides.length;
          update();
        });

      root.setAttribute('tabindex', '0');
      root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn && prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn && nextBtn.click();
      });

      update();
    },
  };

  /* ------------------------------------------------------------------ */
  /* Lazy-load shimmer removal                                           */
  /* ------------------------------------------------------------------ */
  Mojo.LazyImages = {
    init() {
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        if (img.complete) {
          img.classList.add('is-loaded');
        } else {
          img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
        }
      });
    },
  };

  global.Mojo = Mojo;
})(window);
