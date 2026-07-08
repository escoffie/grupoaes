/* ============================================================
   GRUPO AES — BOCETO HOME
   main.js — Nav, scroll effects, diagram animation
   ============================================================ */

'use strict';

/* ------------------------------------------------------------ */
/* 1. STICKY HEADER                                             */
/* ------------------------------------------------------------ */
(function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // check on load
})();


/* ------------------------------------------------------------ */
/* 2. MOBILE NAV TOGGLE                                         */
/* ------------------------------------------------------------ */
(function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close on nav link click (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
})();


/* ------------------------------------------------------------ */
/* 3. ACTIVE NAV LINK ON SCROLL (Intersection Observer)         */
/* ------------------------------------------------------------ */
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();


/* ------------------------------------------------------------ */
/* 4. SCROLL-REVEAL ANIMATIONS                                  */
/* ------------------------------------------------------------ */
(function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();


/* ------------------------------------------------------------ */
/* 5. DIAGRAM — KEEP STATIC (DESIGN DECISION)                    */
/* ------------------------------------------------------------ */
(function initDiagramAnimation() {
  // El diagrama se mantiene estático por compatibilidad robusta en navegadores.
  // Los nodos ya están orientados verticalmente por defecto en el HTML/SVG.
})();


/* ------------------------------------------------------------ */
/* 6. SMOOTH SCROLL FOR ANCHOR LINKS                            */
/* ------------------------------------------------------------ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 76;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();


/* ------------------------------------------------------------ */
/* 7. HERO — PARALLAX SUBTLE EFFECT                             */
/* ------------------------------------------------------------ */
(function initHeroParallax() {
  // Only on devices that can handle it (no reduced motion, no touch-primary)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchPrimary = window.matchMedia('(hover: none)').matches;
  if (prefersReduced || isTouchPrimary) return;

  const heroBg = document.querySelector('.hero__bg');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
})();
