/**
 * app.js — Main Application Controller
 * Standard script — NO import/export. All dependencies loaded via <script> tags before this file.
 * Globals available: ThemeManager, renderTeam, renderProjects, Validation
 */

/* ============================================================
   NAVBAR — Scroll glass + active link highlighting
   ============================================================ */
function initNavbar() {
  var navbar    = document.getElementById('navbar');
  var navLinks  = document.querySelectorAll('.nav-link[data-section]');
  var sections  = document.querySelectorAll('section[id]');

  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    var currentId = '';
    sections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href   = anchor.getAttribute('href');
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeMobileDrawer();
    });
  });
}

/* ============================================================
   MOBILE DRAWER
   ============================================================ */
function openMobileDrawer() {
  var hamburger = document.getElementById('nav-hamburger');
  var drawer    = document.getElementById('nav-drawer');
  var backdrop  = document.getElementById('nav-backdrop');
  if (hamburger) { hamburger.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); }
  if (drawer)    { drawer.classList.add('open');    drawer.setAttribute('aria-hidden', 'false'); }
  if (backdrop)  { backdrop.classList.add('visible'); }
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  var hamburger = document.getElementById('nav-hamburger');
  var drawer    = document.getElementById('nav-drawer');
  var backdrop  = document.getElementById('nav-backdrop');
  if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
  if (drawer)    { drawer.classList.remove('open');    drawer.setAttribute('aria-hidden', 'true'); }
  if (backdrop)  { backdrop.classList.remove('visible'); }
  document.body.style.overflow = '';
}

function initMobileNav() {
  var hamburger = document.getElementById('nav-hamburger');
  var backdrop  = document.getElementById('nav-backdrop');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var drawer = document.getElementById('nav-drawer');
      if (drawer && drawer.classList.contains('open')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMobileDrawer);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileDrawer();
  });
}

/* ============================================================
   TYPING EFFECT
   ============================================================ */
function initTypingEffect() {
  var el = document.getElementById('typing-text');
  if (!el) return;

  var words = [
    'Digital Experiences',
    'Web Applications',
    'Innovative Solutions',
    'Modern Interfaces',
    'Powerful Products'
  ];

  var wordIndex = 0;
  var charIndex = 0;
  var deleting  = false;
  var paused    = false;

  var SPEED_TYPE   = 90;
  var SPEED_DELETE = 50;
  var PAUSE_AFTER  = 2000;
  var PAUSE_BEFORE = 500;

  function type() {
    if (paused) return;
    var currentWord = words[wordIndex];

    if (!deleting) {
      el.textContent = currentWord.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        paused = true;
        setTimeout(function () { deleting = true; paused = false; type(); }, PAUSE_AFTER);
        return;
      }
    } else {
      el.textContent = currentWord.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        paused   = true;
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(function () { paused = false; type(); }, PAUSE_BEFORE);
        return;
      }
    }

    setTimeout(type, deleting ? SPEED_DELETE : SPEED_TYPE);
  }

  type();
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  var revealEls = document.querySelectorAll('.reveal, .stagger-children');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: reveal everything immediately
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Animate tech level bars
        entry.target.querySelectorAll('.tech-level-fill').forEach(function (fill) {
          fill.style.transform = 'scaleX(1)';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) { observer.observe(el); });
}

/* ============================================================
   ANIMATED COUNTERS
   ============================================================ */
var statsData = [
  { id: 'stat-projects', target: 12,  suffix: '+', icon: '🚀', label: 'Projects Completed'  },
  { id: 'stat-members',  target: 6,   suffix: '',  icon: '👥', label: 'Team Members'         },
  { id: 'stat-repos',    target: 40,  suffix: '+', icon: '📦', label: 'GitHub Repositories'  },
  { id: 'stat-tech',     target: 15,  suffix: '+', icon: '⚡', label: 'Technologies Learned' }
];

function animateCounter(el, target, suffix, duration) {
  duration = duration || 1800;
  var start = performance.now();

  function update(now) {
    var elapsed  = now - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounters() {
  var statsGrid = document.getElementById('stats-grid');
  if (!statsGrid) return;

  // Render stat cards
  statsGrid.innerHTML = statsData.map(function (stat) {
    return (
      '<div class="stat-card reveal" aria-label="' + stat.label + '" role="listitem">' +
        '<span class="stat-icon" aria-hidden="true">' + stat.icon + '</span>' +
        '<span class="stat-number" id="' + stat.id + '" data-target="' + stat.target + '" data-suffix="' + stat.suffix + '">0' + stat.suffix + '</span>' +
        '<span class="stat-label">' + stat.label + '</span>' +
      '</div>'
    );
  }).join('');

  if (!('IntersectionObserver' in window)) {
    statsData.forEach(function (stat) {
      var el = document.getElementById(stat.id);
      if (el) animateCounter(el, stat.target, stat.suffix);
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el     = entry.target;
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix;
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statsData.forEach(function (stat) {
    var el = document.getElementById(stat.id);
    if (el) observer.observe(el);
  });
}

/* ============================================================
   MISSION / VISION / VALUES TABS
   ============================================================ */
function initMVTabs() {
  var tabs   = document.querySelectorAll('.mv-tab');
  var panels = document.querySelectorAll('.mv-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetId = tab.dataset.tab;

      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(function (p) { p.classList.remove('active'); });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      var panel = document.getElementById('mv-' + targetId);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ============================================================
   RIPPLE EFFECT
   ============================================================ */
function initRipple() {
  document.querySelectorAll('.btn-ripple').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var wave = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      wave.className = 'ripple-wave';
      wave.style.width  = size + 'px';
      wave.style.height = size + 'px';
      wave.style.left   = (e.clientX - rect.left - size / 2) + 'px';
      wave.style.top    = (e.clientY - rect.top  - size / 2) + 'px';
      btn.appendChild(wave);
      wave.addEventListener('animationend', function () { wave.remove(); });
    });
  });
}

/* ============================================================
   BACK-TO-TOP FAB
   ============================================================ */
function initBackToTop() {
  var fab = document.getElementById('back-to-top-fab');
  if (!fab) return;

  window.addEventListener('scroll', function () {
    fab.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  fab.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  var footerBtn = document.getElementById('footer-back-top');
  if (footerBtn) {
    footerBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ============================================================
   SCROLL INDICATOR FADE
   ============================================================ */
function initScrollIndicator() {
  var indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;
  window.addEventListener('scroll', function () {
    indicator.style.opacity = Math.max(0, 1 - window.scrollY / 200);
  }, { passive: true });
}

/* ============================================================
   TECH CARD LEVEL BARS — start at 0, revealed by scroll
   ============================================================ */
function initTechCards() {
  document.querySelectorAll('.tech-level-fill').forEach(function (fill) {
    fill.style.transform = 'scaleX(0)';
  });
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
function initFooterYear() {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   GITHUB ICON INVERT (light mode fix)
   ============================================================ */
function initGhIconInvert() {
  var root = document.documentElement;
  function update() {
    root.style.setProperty(
      '--gh-icon-invert',
      root.getAttribute('data-theme') === 'light' ? '0' : '1'
    );
  }
  update();
  new MutationObserver(update).observe(root, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
}

/* ============================================================
   APP INIT — runs after DOM is ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  // 1. Theme (uses global ThemeManager from theme.js)
  ThemeManager.init();

  // 2. Render data-driven sections (globals from team.js / projects.js)
  renderTeam();
  renderProjects();

  // 3. Core UI
  initNavbar();
  initMobileNav();
  initTypingEffect();
  initMVTabs();
  initFooterYear();
  initGhIconInvert();

  // 4. Animations (after DOM is populated)
  requestAnimationFrame(function () {
    initScrollReveal();
    initCounters();
    initTechCards();
    initRipple();
    initBackToTop();
    initScrollIndicator();
  });

  // 5. Form validation (global Validation from validation.js)
  Validation.init();
});
