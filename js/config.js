/**
 * config.js — single source of truth for all reusable paths & site data.
 * Never hardcode image paths, company info, or social links elsewhere;
 * import values from CONFIG instead.
 */
(function (global) {
  'use strict';

  const CONFIG = {
    site: {
      name: 'The Mojo Republic',
      shortName: 'Mojo',
      tagline: 'We are not noise chasers.',
      description:
        'The Mojo Republic is a full-service communications agency blending PR, social, content, digital, and experiential craft into work that actually moves people.',
      url: 'https://www.themojorepublic.com.my',
      locale: 'en_MY',
      themeColor: '#c99a3e',
    },

    company: {
      name: 'The Mojo Republic',
      legalName: 'Truth Communications Sdn Bhd',
      phone: '+60 12-3456789',
      phoneHref: '+60123456789',
      email: 'hello@themojorepublic.com.my',
      address: {
        line1: 'Pavillion Damansara, Corporate Tower 2,',
        line2: 'Jalan Damanlela, Pusat Bandar Damansara,',
        line3: '50490, Wilayah Persekutuan Kuala Lumpur.',
        mapUrl: 'https://maps.google.com/?q=Pavillion+Damansara+Corporate+Tower+2',
      },
      hours: 'Mon – Fri, 9:00 AM – 6:00 PM',
    },

    social: {
      facebook: 'https://facebook.com/themojorepublic',
      instagram: 'https://instagram.com/themojorepublic',
      linkedin: 'https://linkedin.com/company/themojorepublic',
      whatsapp: 'https://wa.me/60123456789',
    },

    nav: [
      { label: 'Home', href: 'index.html', key: 'home' },
      { label: 'About us', href: 'about.html', key: 'about' },
      { label: 'Our Services', href: 'services.html', key: 'services' },
      { label: 'Clients & Case Studies', href: 'clients.html', key: 'clients' },
      { label: 'Our People', href: 'people.html', key: 'people' },
      { label: 'Contact Us', href: 'contact.html', key: 'contact' },
    ],

    images: {
      favicon: 'assets/images/favicon.svg',
      logoMark: 'assets/images/logo-mark.svg',
      logoMarkInverse: 'assets/images/logo-mark-inverse.svg',
      hero: 'assets/images/hero-banner.svg',
      about: 'assets/images/about-banner.svg',
      services: 'assets/images/services-banner.svg',
      careers: 'assets/images/careers-banner.svg',
      team: 'assets/images/team-portrait.svg',
      caseStudies: [
        'assets/images/case-study-1.svg',
        'assets/images/case-study-2.svg',
        'assets/images/case-study-3.svg',
      ],
    },

    icons: {
      arrowRight: 'assets/icons/arrow-right.svg',
      location: 'assets/icons/location.svg',
      clock: 'assets/icons/clock.svg',
      quote: 'assets/icons/quote.svg',
      check: 'assets/icons/check.svg',
      briefcase: 'assets/icons/briefcase.svg',
    },

    theme: {
      primary: '#6f6259',
      secondary: '#2a2622',
      accent: '#c99a3e',
      success: '#3f8a5c',
      warning: '#d9a441',
      danger: '#c1453d',
    },

    api: {
      // Placeholder endpoint — swap for a real backend / form service (e.g. Formspree, own API).
      contactFormEndpoint: 'https://formspree.io/f/REPLACE_WITH_FORM_ID',
      newsletterEndpoint: 'https://formspree.io/f/REPLACE_WITH_NEWSLETTER_ID',
    },

    content: {
      dataUrl: 'data/content.json',
    },
  };

  Object.freeze(CONFIG.company.address);
  Object.freeze(CONFIG.company);
  Object.freeze(CONFIG.nav);
  Object.freeze(CONFIG.social);
  Object.freeze(CONFIG.images);
  Object.freeze(CONFIG.icons);
  Object.freeze(CONFIG.theme);
  Object.freeze(CONFIG.api);
  Object.freeze(CONFIG.site);
  Object.freeze(CONFIG);

  global.CONFIG = CONFIG;
})(window);
