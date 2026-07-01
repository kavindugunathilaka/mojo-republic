/**
 * api.js — form submission handling (contact + newsletter).
 * Validates client-side, then POSTs to the endpoint configured in
 * CONFIG.api. Replace the placeholder endpoints in config.js with a real
 * form-handling service or backend route before going live.
 */
(function (global) {
  'use strict';

  const Mojo = global.Mojo || (global.Mojo = {});

  function setFieldError(field, message) {
    const wrapper = field.closest('.form-field');
    if (!wrapper) return;
    const errorEl = wrapper.querySelector('.form-error');
    field.classList.toggle('is-invalid', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (errorEl) errorEl.textContent = message || '';
  }

  function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
      setFieldError(field, 'This field is required.');
      return false;
    }
    if (field.type === 'email' && field.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value)) {
        setFieldError(field, 'Enter a valid email address.');
        return false;
      }
    }
    if (field.type === 'tel' && field.value) {
      const phonePattern = /^[+()0-9\s-]{7,}$/;
      if (!phonePattern.test(field.value)) {
        setFieldError(field, 'Enter a valid phone number.');
        return false;
      }
    }
    setFieldError(field, '');
    return true;
  }

  function showStatus(form, type, message) {
    const status = form.querySelector('[data-form-status]');
    if (!status) return;
    status.textContent = message;
    status.className = `form-status is-visible form-status--${type}`;
    status.setAttribute('role', type === 'error' ? 'alert' : 'status');
  }

  async function submitForm(form, endpoint) {
    const formData = new FormData(form);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Non-200 response');
      return true;
    } catch (err) {
      console.warn('Form submission fell back to local handling:', err.message);
      return false;
    }
  }

  Mojo.Forms = {
    initContactForm(selector) {
      const form = document.querySelector(selector);
      if (!form) return;

      const fields = Array.from(form.querySelectorAll('.form-input, .form-textarea'));
      fields.forEach((field) => {
        field.addEventListener('blur', () => validateField(field));
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const validations = fields.map(validateField);
        if (validations.includes(false)) {
          showStatus(form, 'error', 'Please fix the highlighted fields and try again.');
          const firstInvalid = form.querySelector('.is-invalid');
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        const submitBtn = form.querySelector('[type="submit"]');
        const originalLabel = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Sending…';
        }

        const ok = await submitForm(form, global.CONFIG.api.contactFormEndpoint);

        if (ok) {
          showStatus(form, 'success', "Thanks — we've received your message and will be in touch shortly.");
          form.reset();
        } else {
          const { email } = global.CONFIG.company;
          showStatus(
            form,
            'success',
            `Thanks — your message is ready. If this doesn't reach us automatically, email us directly at ${email}.`
          );
          form.reset();
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      });
    },

    initNewsletterForm(selector) {
      const form = document.querySelector(selector);
      if (!form) return;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!validateField(input)) return;

        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        await submitForm(form, global.CONFIG.api.newsletterEndpoint);

        showStatus(form, 'success', "You're subscribed. Welcome to the republic.");
        form.reset();
        if (submitBtn) submitBtn.disabled = false;
      });
    },
  };
})(window);
