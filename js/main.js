/* =========================================================
   main.js — nav, chapter indicator, form
   Tanpa window scroll listener: pakai IntersectionObserver
   (ScrollTrigger menangani animasi di story.js).
   ========================================================= */
(function () {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     NAVBAR
  --------------------------------------------------------- */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  toggle.addEventListener('click', function () {
    menu.classList.toggle('is-open');
    toggle.classList.toggle('is-open');
  });

  // tutup menu saat link diklik
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-open');
    }
  });

  // nav "scrolled" state via sentinel IO (tanpa scroll listener)
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:60px;width:1px;pointer-events:none;';
  document.body.prepend(sentinel);
  new IntersectionObserver(function (entries) {
    nav.classList.toggle('is-scrolled', !entries[0].isIntersecting);
  }).observe(sentinel);

  /* ---------------------------------------------------------
     ACTIVE NAV LINK + CHAPTER INDICATOR (IO per scene)
  --------------------------------------------------------- */
  const links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  const chItems = Array.prototype.slice.call(document.querySelectorAll('.chapters__item'));
  const scenes = Array.prototype.slice.call(document.querySelectorAll('.scene'));

  function activate(scene) {
    const ch = scene ? scene.getAttribute('data-chapter') : null;

    chItems.forEach(function (el) {
      el.classList.toggle('is-on', el.getAttribute('data-ch') === ch);
    });

    // nav link: cocokkan id scene, fallback ke link terakhir yang section-nya sudah lewat
    let activeHref = scene ? '#' + scene.id : null;
    const inNav = links.some(function (l) { return l.getAttribute('href') === activeHref; });
    if (!inNav && scene) {
      const idx = scenes.indexOf(scene);
      for (let i = idx; i >= 0; i--) {
        const href = '#' + scenes[i].id;
        if (links.some(function (l) { return l.getAttribute('href') === href; })) { activeHref = href; break; }
      }
    }
    links.forEach(function (l) {
      l.classList.toggle('is-active', l.getAttribute('href') === activeHref);
    });
  }

  // IO dengan rootMargin: scene dianggap aktif saat mencapai 40% dari atas viewport
  const sceneIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) activate(en.target);
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  scenes.forEach(function (s) { sceneIO.observe(s); });

  // inisialisasi state awal (scene pertama yang visible)
  requestAnimationFrame(function () {
    const first = scenes.find(function (s) {
      const r = s.getBoundingClientRect();
      return r.top <= window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.4;
    });
    if (first) activate(first);
  });
})();
