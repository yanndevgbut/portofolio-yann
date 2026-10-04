/* =========================================================
   portal.js — preloader gerbang dimensi + navigasi halus
   Progress bar scroll pakai ScrollTrigger (tanpa scroll listener).
   ========================================================= */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const preloader = document.getElementById('preloader');
  const pct = document.getElementById('preloaderPct');
  const bar = document.getElementById('scrollBar');
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasST = typeof window.ScrollTrigger !== 'undefined';

  /* ---------- Progress bar scroll (ScrollTrigger) ---------- */
  if (bar && hasGSAP && hasST) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(bar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
    });
  }

  /* ---------- Preloader ---------- */
  document.body.classList.add('is-loading');
  const start = performance.now();
  const DURATION = reduce ? 150 : 2200;
  let progress = 0;

  function finish() {
    if (preloader) preloader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    window.dispatchEvent(new Event('portal:opened'));
    if (hasGSAP && hasST) ScrollTrigger.refresh();
  }

  function tick() {
    const elapsed = performance.now() - start;
    const target = Math.min(elapsed / DURATION, 1) * 100;
    progress += (target - progress) * 0.16 + 0.5;
    if (progress > 100) progress = 100;
    if (pct) pct.textContent = Math.floor(progress);
    if (progress >= 99.5 && elapsed >= DURATION) {
      if (pct) pct.textContent = '100';
      setTimeout(finish, 260);
    } else {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);

  /* ---------- Navigasi halus ---------- */
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a[data-nav]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (!hash || hash.charAt(0) !== '#') return;
    e.preventDefault();
    const el = document.querySelector(hash);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', hash);
  });
})();
