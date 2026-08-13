/* ═══════════════════════════════════════════════════════════════
   l'Atelier KPM - Système d'animations & transitions
   ═══════════════════════════════════════════════════════════════
   
   Inclusion : ajouter juste avant </body> de chaque page HTML :
   <script src="transitions.js"></script>
   
   Fonctionnalités :
   1. Loader d'accueil élégant avec logo animé
   2. Fondu de sortie/entrée entre les pages
   3. Reveals au scroll fluides (fade + slide + scale léger)
   4. Micro-interactions sur les liens et boutons
═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ── 1. INJECTION DES STYLES ─────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* Loader d'accueil */
    #kpm-loader {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #2A211B;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity .6s cubic-bezier(.4,0,.2,1), visibility .6s;
      opacity: 1;
    }
    #kpm-loader.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    #kpm-loader .kpm-logo {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: clamp(1.8rem, 5vw, 2.6rem);
      color: #F4EEE6;
      letter-spacing: -.01em;
      opacity: 0;
      transform: translateY(12px);
      animation: kpmLogoIn .8s cubic-bezier(.2,.7,.2,1) .15s forwards;
    }
    #kpm-loader .kpm-logo span {
      color: #C49A74;
    }
    #kpm-loader .kpm-progress {
      width: 180px;
      height: 1px;
      background: rgba(244,238,230,.15);
      margin-top: 2rem;
      overflow: hidden;
      opacity: 0;
      animation: kpmFadeIn .6s ease .5s forwards;
    }
    #kpm-loader .kpm-progress-bar {
      display: block;
      height: 100%;
      background: #C49A74;
      width: 0;
      animation: kpmProgress 1.4s cubic-bezier(.4,0,.2,1) .5s forwards;
    }
    #kpm-loader .kpm-tagline {
      font-family: 'Hanken Grotesk', system-ui, sans-serif;
      font-size: .68rem;
      letter-spacing: .28em;
      text-transform: uppercase;
      color: rgba(244,238,230,.35);
      margin-top: 1.5rem;
      opacity: 0;
      animation: kpmFadeIn .6s ease .7s forwards;
    }
    @keyframes kpmLogoIn {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes kpmFadeIn {
      to { opacity: 1; }
    }
    @keyframes kpmProgress {
      to { width: 100%; }
    }

    /* Transition sortie de page */
    body.kpm-leaving {
      opacity: 0;
      transition: opacity .35s cubic-bezier(.4,0,.2,1);
    }

    /* Fade-in de la page à l'arrivée */
    body {
      animation: kpmPageIn .5s cubic-bezier(.2,.7,.2,1) forwards;
    }
    @keyframes kpmPageIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Amélioration des reveals au scroll */
    .kpm-reveal {
      opacity: 0;
      transform: translateY(28px) scale(.98);
      transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
      will-change: opacity, transform;
    }
    .kpm-reveal.kpm-in {
      opacity: 1;
      transform: none;
    }

    /* Reveals décalés pour les grilles */
    .kpm-reveal-1 { transition-delay: .05s; }
    .kpm-reveal-2 { transition-delay: .12s; }
    .kpm-reveal-3 { transition-delay: .19s; }
    .kpm-reveal-4 { transition-delay: .26s; }

    /* Micro-interactions boutons */
    a[href^="devis"], a[href^="tarifs"], a[href^="services"], a[href^="realisations"],
    button[type="submit"], .btn-dark, .btn-sand, .btn-outline-sand,
    .plan-cta, .svc-cta, .nav-cta {
      transition: transform .2s cubic-bezier(.4,0,.2,1), opacity .2s, background .3s, color .3s, border-color .3s !important;
    }
    a[href^="devis"]:active, a[href^="tarifs"]:active,
    button[type="submit"]:active, .btn-dark:active, .btn-sand:active {
      transform: scale(.97);
    }

    /* Cartes et projets */
    .project-card, .service-card, .plan, .maint-card {
      transition: transform .4s cubic-bezier(.2,.7,.2,1), box-shadow .4s !important;
    }

    /* Désactiver toutes les animations pour utilisateurs préférant la sobriété */
    @media (prefers-reduced-motion: reduce) {
      #kpm-loader, body, .kpm-reveal { animation: none !important; transition: none !important; }
      .kpm-reveal { opacity: 1 !important; transform: none !important; }
      #kpm-loader { display: none !important; }
    }
  `;
  document.head.appendChild(style);

  // ── 2. INJECTION DU LOADER ──────────────────────────────────
  // On l'injecte uniquement au premier chargement (pas en navigation interne)
  if (!sessionStorage.getItem('kpm-visited')) {
    const loader = document.createElement('div');
    loader.id = 'kpm-loader';
    loader.innerHTML = `
      <div class="kpm-logo">l'Atelier KPM<span>.</span></div>
      <div class="kpm-progress"><span class="kpm-progress-bar"></span></div>
      <div class="kpm-tagline">Studio Web Premium</div>
    `;
    document.body.appendChild(loader);
    sessionStorage.setItem('kpm-visited', '1');

    // Cacher après l'animation complète (~1.9s)
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 700);
    }, 1900);
  }

  // ── 3. TRANSITIONS INTER-PAGES ──────────────────────────────
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignorer : ancres (#), liens externes (http), tel/mailto/wa.me, target=_blank
    if (
      href.startsWith('#') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('http') ||
      href.includes('wa.me') ||
      link.target === '_blank' ||
      e.ctrlKey || e.metaKey || e.shiftKey
    ) return;

    // Uniquement pour liens internes .html
    if (!href.endsWith('.html') && !href.match(/^[a-z0-9_-]+$/i)) return;

    e.preventDefault();
    document.body.classList.add('kpm-leaving');
    setTimeout(() => {
      window.location.href = href;
    }, 300);
  });

  // ── 4. REVEALS AU SCROLL AMÉLIORÉS ──────────────────────────
  function setupReveals() {
    // Convertir les anciens .reveal et .fade-up en .kpm-reveal
    document.querySelectorAll('.reveal, .fade-up').forEach(el => {
      if (!el.classList.contains('kpm-reveal')) {
        el.classList.add('kpm-reveal');
      }
    });

    // Observer pour révéler au scroll
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('kpm-in', 'in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -50px 0px'
      });

      document.querySelectorAll('.kpm-reveal').forEach(el => {
        observer.observe(el);
      });
    } else {
      // Fallback : tout révéler immédiatement
      document.querySelectorAll('.kpm-reveal').forEach(el => {
        el.classList.add('kpm-in', 'in');
      });
    }
  }

  // Attendre que le DOM soit prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupReveals);
  } else {
    setupReveals();
  }

  // ── 5. SCROLL FLUIDE POUR ANCRES ────────────────────────────
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

})();
