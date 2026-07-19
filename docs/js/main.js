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


/* ------------------------------------------------------------ */
/* 8. INDUSTRIES INTERACTIVE MODAL                               */
/* ------------------------------------------------------------ */
(function initIndustriesModal() {
  const industriesGrid = document.querySelector('.industrias__grid');
  const modal = document.getElementById('industrias-modal');
  const modalClose = document.getElementById('industrias-close');
  const modalBackdrop = document.getElementById('industrias-backdrop');
  const modalTitle = document.getElementById('industrias-title');
  const modalImg = document.getElementById('industrias-modal-img');
  const descSeguridad = document.getElementById('ind-desc-seguridad');
  const descLimpieza = document.getElementById('ind-desc-limpieza');
  const descComercial = document.getElementById('ind-desc-comercial');
  
  if (!industriesGrid || !modal) return;

  const industryData = {
    retail: {
      title: "Retail y Autoservicio",
      image: "assets/images/home_retail_autoservicio.jpg",
      seguridad: "Diseñamos protocolos de prevención de pérdidas, control de accesos a andenes y vigilancia activa para resguardar la mercancía y la integridad de clientes y colaboradores en tiendas y centros comerciales.",
      limpieza: "Mantenemos pisos relucientes, pasillos despejados y áreas comunes desinfectadas con cuadrillas capacitadas para operar en horarios de alto tráfico comercial sin interferir con la experiencia de compra.",
      comercial: "Suministramos insumos de limpieza de alto rendimiento, dispensadores automatizados e insumos sanitarios ecológicos diseñados para soportar el flujo diario de miles de visitantes."
    },
    manufactura: {
      title: "Industria y Manufactura",
      image: "assets/images/home_industria_manufactura.jpg",
      seguridad: "Implementamos rigurosos controles de acceso vehicular y peatonal, rondas perimetrales y monitoreo de CCTV alineado con normativas de seguridad industrial y prevención de riesgos ocupacionales.",
      limpieza: "Ofrecemos servicios especializados de limpieza de naves industriales, remoción de residuos aceitosos y mantenimiento sanitario técnico que cumple con los estándares exigidos para la producción limpia.",
      comercial: "Abastecemos insumos de grado industrial, desengrasantes especializados, equipo de protección personal menor y consumibles de limpieza a gran escala para asegurar la continuidad operativa de la planta."
    },
    corporativo: {
      title: "Corporativos y Oficinas",
      image: "assets/images/home_corporativos_oficinas.jpg",
      seguridad: "Brindamos oficiales de seguridad con perfil ejecutivo, recepción de visitas con control digital y patrullaje de instalaciones corporativas para garantizar la protección de información confidencial y activos tecnológicos.",
      limpieza: "Servicio diario de mantenimiento para oficinas, salas de juntas y áreas comunes, enfocado en mantener un ambiente de trabajo pulcro, ordenado e inspirador para los equipos de trabajo.",
      comercial: "Suministro Premium de jabón líquido, toallas de papel y aromatizantes ambientales de alta gama que proyectan la profesionalidad del espacio corporativo ante clientes y socios."
    },
    logistica: {
      title: "Centros Logísticos",
      image: "assets/images/home_centros_logisticos.jpg",
      seguridad: "Custodiamos entradas y salidas con verificación estricta de contenedores, control de sellos de seguridad y patrullaje perimetral 24/7 para mitigar riesgos en la cadena de suministro y almacenes.",
      limpieza: "Limpieza profunda de andenes de carga, áreas de almacenamiento masivo y sanitarios operativos mediante equipo especializado de barrido y restregado mecánico industrial.",
      comercial: "Abastecimiento constante de películas plásticas estirables (playo), cintas de empaque y consumibles de limpieza resistentes para el empaquetado y la higiene constante del almacén."
    },
    educacion: {
      title: "Educación",
      image: "assets/images/home_educacion.jpg",
      seguridad: "Control estricto de accesos perimetrales y peatonales para salvaguardar a alumnos, docentes e infraestructura escolar, con oficiales altamente capacitados en el trato amable, preventivo y cordial.",
      limpieza: "Desinfección periódica y profunda de aulas, laboratorios, bibliotecas y canchas recreativas para asegurar un entorno de aprendizaje seguro y libre de riesgos sanitarios.",
      comercial: "Proveemos jabones antibacteriales, geles desinfectantes y papel sanitario ecológico ideales para el cuidado de la salud en comunidades educativas de alta concentración."
    },
    inmobiliario: {
      title: "Desarrollos Inmobiliarios",
      image: "assets/images/home_desarrollos_inmobiliarios.jpg",
      seguridad: "Resguardamos condominios residenciales y desarrollos habitacionales mediante control estricto de residentes/proveedores, rondines programados y monitoreo inteligente de accesos perimetrales.",
      limpieza: "Limpieza estética y conservación de áreas comunes, albercas, gimnasios y lobbies, garantizando que el desarrollo inmobiliario mantenga su valor comercial y atractivo visual.",
      comercial: "Suministro de productos de mantenimiento de exteriores, insumos higiénicos para casas club y consumibles necesarios para la administración diaria del complejo residencial."
    }
  };

  const industryItems = document.querySelectorAll('.industria-item');

  function openModal(key, element) {
    const data = industryData[key];
    if (!data) return;

    // Reset active states on grid
    industryItems.forEach(item => {
      item.classList.remove('industria-item--active');
    });

    element.classList.add('industria-item--active');

    // Populate data
    modalTitle.textContent = data.title;
    if (modalImg) {
      modalImg.src = data.image;
      modalImg.alt = data.title;
    }
    descSeguridad.textContent = data.seguridad;
    descLimpieza.textContent = data.limpieza;
    descComercial.textContent = data.comercial;

    // Show modal
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // lock background scroll

    // Focus close button
    setTimeout(() => {
      modalClose.focus();
    }, 100);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // unlock scroll
    
    // Reset active states
    industryItems.forEach(item => {
      item.classList.remove('industria-item--active');
    });
  }

  industryItems.forEach(item => {
    const key = item.getAttribute('data-industry');
    
    item.addEventListener('click', () => {
      openModal(key, item);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(key, item);
      }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
