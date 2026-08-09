document.addEventListener('DOMContentLoaded', () => {

  // Nav: frost/solid once the hero is scrolled past
  const navEl = document.querySelector('nav');
  if (navEl) {
    const onScroll = () => navEl.classList.toggle('scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Defer the Pipedrive form (and its reCAPTCHA payload) until the contact
  // section nears the viewport, keeping ~600KB of third-party JS off the
  // critical path on first load.
  const pdForm = document.getElementById('pd-form');
  if (pdForm) {
    let pdLoaded = false;
    const loadPipedrive = () => {
      if (pdLoaded) return;
      pdLoaded = true;
      const s = document.createElement('script');
      s.src = 'https://webforms.pipedrive.com/f/loader';
      document.body.appendChild(s);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) { loadPipedrive(); io.disconnect(); }
      }, { rootMargin: '600px' });
      io.observe(pdForm);
    } else {
      loadPipedrive();
    }
  }

  // Copyright dinamic
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // FAQ accordion
  const faqItems = Array.from(document.querySelectorAll('.faq-item'));
  faqItems.forEach((item, index) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    const questionId = `faq-question-${index + 1}`;
    const answerId = `faq-answer-${index + 1}`;
    btn.id = questionId;
    btn.setAttribute('aria-controls', answerId);
    btn.setAttribute('aria-expanded', 'false');
    answer.id = answerId;
    answer.setAttribute('role', 'region');
    answer.setAttribute('aria-labelledby', questionId);
    answer.setAttribute('aria-hidden', 'true');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(entry => {
        entry.classList.remove('open');
        const entryBtn = entry.querySelector('.faq-question');
        const entryAnswer = entry.querySelector('.faq-answer');
        if (entryBtn) entryBtn.setAttribute('aria-expanded', 'false');
        if (entryAnswer) entryAnswer.setAttribute('aria-hidden', 'true');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // Respect reduced-motion: stop the hero video autoplaying
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video.motion').forEach(v => {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }

  // Accessibility: hide decorative inline SVG icons and glyph characters from
  // screen readers (they're all illustrative — text labels carry the meaning).
  document.querySelectorAll('svg').forEach(s => {
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('focusable', 'false');
  });
  document.querySelectorAll('.flow-arrow, .cap-check, .faq-icon').forEach(el => {
    el.setAttribute('aria-hidden', 'true');
  });

  // Email anti-obfuscation (handles every #emailLink* span on the page)
  const e = 'sales' + '@' + 'tvl' + '.' + 'tech';
  document.querySelectorAll('[id^="emailLink"]').forEach(el => {
    el.textContent = e;
    el.addEventListener('click', () => window.location = 'mailto:' + e);
  });

});
