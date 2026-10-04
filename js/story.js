/* =========================================================
   story.js — engine scroll story "Perjalanan Mato"
   Pin scene + timeline scrub per chapter.

   Perbaikan:
   - Pin dipercepat (LEN 0.55, work 0.7, squad 0.85, contact 0.7)
   - releasePin(): setelah scene dilewati, pin dilepas permanen
     sehingga scroll bolak-balik tidak "memuat pin" lagi
   - invalidateOnRefresh di semua scene
   ========================================================= */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasST = typeof window.ScrollTrigger !== 'undefined';
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  /* ---------- FALLBACK (tanpa GSAP / reduced motion) ---------- */
  if (!hasGSAP || !hasST || reduce) {
    document.querySelectorAll('.scene__story, .hero__stats, .hero__cta, .sec-title, .scene__kicker').forEach(function (el) {
      el.style.opacity = '1'; el.style.transform = 'none';
    });
    document.querySelectorAll('#squadTrack .squad__panel').forEach(function (p) {
      p.style.opacity = '1'; p.style.visibility = 'visible';
      var f = p.querySelector('.squad__fig');   if (f) { f.style.opacity = '1'; f.style.transform = 'none'; }
      var n = p.querySelector('.squad__info');  if (n) { n.style.opacity = '1'; n.style.transform = 'none'; }
    });
    document.querySelectorAll('.prolog__door--l, .prolog__door--r').forEach(function (d) { d.style.display = 'none'; });
    var pm = document.getElementById('prologMoon');   if (pm) { pm.style.opacity = '1'; }
    var hc = document.getElementById('heroChar');     if (hc) { hc.style.opacity = '1'; }
    var ac = document.getElementById('aboutChar');    if (ac) { ac.style.opacity = '1'; }
    var cc = document.getElementById('contactChar');  if (cc) { cc.style.opacity = '1'; }
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const PIN = !isMobile;
  const LEN = 0.55;        // prolog / hero / about
  const LEN_WORK = 0.7;    // work
  const LEN_SQUAD = 0.85;  // squad (per panel)
  const LEN_CONTACT = 0.7; // contact
  const SCRUB = 0.5;

  function hide(sel, vars) {
    document.querySelectorAll(sel).forEach(function (el) { gsap.set(el, vars); });
  }

  /*
   * releasePin: setelah scene selesai dilewati (onLeave), pin dilepas permanen.
   * Konten terkunci di state akhir; scroll balik tidak membuat pin aktif lagi.
   * Juga dipanggil saat load jika progress sudah >= 1 (user refresh di tengah halaman).
   */
  function releasePin(trigger) {
    const st = trigger.scrollTrigger;
    if (!st) return;
    if (st.progress >= 1) { st.disable(false); return; }
    st.vars.onLeave = function () { st.disable(false); };
  }

  /* =========================================================
     序 PROLOG — gerbang terbuka
  ========================================================= */
  (function prolog() {
    hide('#prologKick', { opacity: 0, y: 20 });
    hide('#prologTitle', { opacity: 0, y: 40 });
    hide('#prologStory', { opacity: 0, y: 30 });
    hide('#prologMoon', { opacity: 0, scale: .8, transformOrigin: 'center' });
    gsap.set('.prolog__seam', { opacity: 1 });
    gsap.set('.prolog__door--l', { xPercent: 0 });
    gsap.set('.prolog__door--r', { xPercent: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#prolog', start: 'top top',
        end: '+=' + (window.innerHeight * LEN),
        pin: PIN, scrub: SCRUB, anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    tl.to('.prolog__door--l', { xPercent: -92, ease: 'power2.inOut', duration: 1 })
      .to('.prolog__door--r', { xPercent: 92, ease: 'power2.inOut', duration: 1 }, '<')
      .to('.prolog__seam', { opacity: 0, duration: .3 }, '<50%')
      .to('#prologMoon', { opacity: 1, scale: 1, ease: 'power2.out', duration: .8 }, '<20%')
      .to('#prologKick', { opacity: 1, y: 0, duration: .5 }, '<30%')
      .to('#prologTitle', { opacity: 1, y: 0, duration: .6 }, '<15%')
      .to('#prologStory', { opacity: 1, y: 0, duration: .6 }, '<40%')
      ;

    if (PIN) releasePin(tl);
  })();

  /* =========================================================
     一 HERO — menembus dimensi
  ========================================================= */
  (function hero() {
    hide('#heroKick', { opacity: 0, y: 20 });
    hide('#heroNameA, #heroNameB', { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' });
    hide('#heroStory', { opacity: 0, y: 26 });
    hide('#heroCta', { opacity: 0, y: 26 });
    hide('#heroMoon', { opacity: 0, y: 60, scale: .85 });
    hide('#heroRocks .rock', { opacity: 0, y: 80 });
    hide('#heroChar', { opacity: 0, y: 120, scale: 1.08 });
    hide('#heroKanji', { opacity: 0, x: -80 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero', start: 'top top',
        end: '+=' + (window.innerHeight * LEN),
        pin: PIN, scrub: SCRUB, anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    tl.to('#heroMoon', { opacity: 1, y: 0, scale: 1, duration: .7, ease: 'power2.out' })
      .to('#heroRocks .rock', { opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power2.out' }, '<')
      .to('#heroChar', { opacity: 1, y: 0, scale: 1, duration: .9, ease: 'power3.out' }, '<25%')
      .to('#heroKanji', { opacity: 1, x: 0, duration: .7, ease: 'power2.out' }, '<20%')
      .to('#heroKick', { opacity: 1, y: 0, duration: .35 }, '<25%')
      .to('#heroNameA', { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: .55, ease: 'power2.out' }, '<20%')
      .to('#heroNameB', { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: .55, ease: 'power2.out' }, '<25%')
      .to('#heroStory', { opacity: 1, y: 0, duration: .45 }, '<35%')
      .to('#heroCta', { opacity: 1, y: 0, duration: .45 }, '<25%')
      ;

    if (PIN) releasePin(tl);
  })();

  /* =========================================================
     二 ABOUT — arsip personil (karakter di kanan)
  ========================================================= */
  (function about() {
    hide('#aboutKick', { opacity: 0, y: 20 });
    hide('#aboutTitle', { opacity: 0, y: 36 });
    hide('#aboutStory', { opacity: 0, y: 26 });
    hide('#aboutDoc .about__doc-line', { opacity: 0, x: 24 });
    hide('#aboutList li', { opacity: 0, y: 18 });
    hide('#aboutChar', { opacity: 0, x: 110 });
    gsap.set('#aboutDoc', { transformOrigin: 'left center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#about', start: 'top top',
        end: '+=' + (window.innerHeight * LEN),
        pin: PIN, scrub: SCRUB, anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    tl.to('#aboutChar', { opacity: 1, x: 0, duration: .9, ease: 'power3.out' })
      .to('#aboutKick', { opacity: 1, y: 0, duration: .35 }, '<20%')
      .to('#aboutTitle', { opacity: 1, y: 0, duration: .45 }, '<20%')
      .to('#aboutStory', { opacity: 1, y: 0, duration: .45 }, '<30%')
      .fromTo('#aboutDoc', { scaleX: .92, opacity: .7 }, { scaleX: 1, opacity: 1, duration: .5, ease: 'power2.out' }, '<20%')
      .to('#aboutDoc .about__doc-line', { opacity: 1, x: 0, duration: .45, stagger: .15 }, '<30%')
      .to('#aboutList li', { opacity: 1, y: 0, duration: .35, stagger: .08 }, '<40%');

    if (PIN) releasePin(tl);
  })();

  /* =========================================================
     三 WORK — kekuatan & karya
  ========================================================= */
  (function work() {
    hide('#workKick', { opacity: 0, y: 20 });
    hide('#workTitle', { opacity: 0, y: 36 });
    hide('#workStory', { opacity: 0, y: 26 });
    hide('#skillsGrid .skill-card', { opacity: 0, y: 40 });
    hide('#projectsGrid .proj', { opacity: 0, x: 60 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#work', start: 'top top',
        end: '+=' + (window.innerHeight * LEN_WORK),
        pin: PIN, scrub: SCRUB, anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    tl.to('#workKick', { opacity: 1, y: 0, duration: .35 })
      .to('#workTitle', { opacity: 1, y: 0, duration: .45 }, '<20%')
      .to('#workStory', { opacity: 1, y: 0, duration: .45 }, '<30%')
      .to('#skillsGrid .skill-card', { opacity: 1, y: 0, duration: .5, stagger: .12, ease: 'power2.out' }, '<20%')
      .to('#projectsGrid .proj', { opacity: 1, x: 0, duration: .6, stagger: .12, ease: 'power3.out' }, '<35%');

    if (PIN) releasePin(tl);
  })();

  /* =========================================================
     四 SQUAD — horizontal cinematic (desktop) / stacked (mobile)
  ========================================================= */
  (function squad() {
    const track = document.getElementById('squadTrack');
    const panels = gsap.utils.toArray('#squadTrack .squad__panel');
    const bar = document.getElementById('squadBar');
    const now = document.getElementById('squadNow');
    const bg = document.getElementById('squadBg');
    const total = panels.length;
    if (!track || !total) return;

    const themes = [
      { a: 'rgba(179,18,47,.4)',  b: 'rgba(60,18,40,.45)'  },
      { a: 'rgba(139,10,26,.42)', b: 'rgba(40,8,18,.5)'    },
      { a: 'rgba(120,85,30,.35)', b: 'rgba(50,35,10,.4)'   },
      { a: 'rgba(80,45,110,.35)', b: 'rgba(35,15,50,.42)'  }
    ];
    function applyTheme(i) {
      const t = themes[i] || themes[0];
      if (bg) bg.style.background =
        'radial-gradient(70% 60% at 70% 30%, ' + t.a + ', transparent 60%),' +
        'radial-gradient(50% 45% at 20% 80%, ' + t.b + ', transparent 62%), #060608';
    }
    applyTheme(0);

    /* ---------- MOBILE: vertikal stacked (once, tidak di-pin) ---------- */
    if (!PIN) {
      panels.forEach(function (p) {
        const fig = p.querySelector('.squad__fig');
        const info = p.querySelector('.squad__info');
        if (fig)  gsap.fromTo(fig, { y: 60, opacity: 0, scale: 1.04 }, {
          y: 0, opacity: 1, scale: 1, duration: .8, ease: 'power3.out',
          scrollTrigger: { trigger: p, start: 'top 80%', once: true }
        });
        if (info) gsap.fromTo(info, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: .7, delay: .1, ease: 'power2.out',
          scrollTrigger: { trigger: p, start: 'top 80%', once: true }
        });
      });
      return;
    }

    /* ---------- DESKTOP: horizontal cinematic ---------- */
    panels.forEach(function (p, i) {
      gsap.set(p.querySelector('.squad__fig'), { y: 120, opacity: i === 0 ? 1 : 0, scale: 1.05 });
      gsap.set(p.querySelector('.squad__info'), { y: 40, opacity: i === 0 ? 1 : 0 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#squad', start: 'top top',
        end: '+=' + (window.innerHeight * (total * LEN_SQUAD)),
        pin: true, scrub: SCRUB, anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          const i = Math.min(total - 1, Math.floor(self.progress * total));
          if (now) now.textContent = String(i + 1).padStart(2, '0');
          applyTheme(i);
        }
      }
    });

    tl.to(track, { xPercent: -100 * (total - 1) / total, ease: 'none', duration: total - 1 }, 0);

    panels.forEach(function (p, i) {
      const fig = p.querySelector('.squad__fig');
      const info = p.querySelector('.squad__info');
      if (i === 0) {
        tl.to(fig, { y: 0, scale: 1, duration: .45, ease: 'power3.out' }, 0)
          .to(info, { y: 0, duration: .35, ease: 'power2.out' }, .08);
      } else {
        const start = i - 0.5;
        tl.to(fig, { y: 0, opacity: 1, scale: 1, duration: .45, ease: 'power3.out' }, start)
          .to(info, { y: 0, opacity: 1, duration: .35, ease: 'power2.out' }, start + 0.12);
      }
    });

    if (bar) {
      ScrollTrigger.create({
        trigger: '#squad', start: 'top top',
        end: '+=' + (window.innerHeight * (total * LEN_SQUAD)),
        onUpdate: function (self) { bar.style.width = (self.progress * 100).toFixed(1) + '%'; }
      });
    }

    releasePin(tl);
  })();

  /* =========================================================
     終 CONTACT — kembali ke gerbang
  ========================================================= */
  (function contact() {
    hide('#contactKick', { opacity: 0, y: 20 });
    hide('#contactTitle', { opacity: 0, y: 36 });
    hide('#contactStory', { opacity: 0, y: 26 });
    hide('#contactForm .field, #contactForm button', { opacity: 0, y: 22 });
    hide('#contactChar', { opacity: 0, x: 110 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact', start: 'top top',
        end: '+=' + (window.innerHeight * LEN_CONTACT),
        pin: PIN, scrub: SCRUB, anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    tl.to('#contactChar', { opacity: 1, x: 0, duration: .85, ease: 'power3.out' })
      .to('#contactKick', { opacity: 1, y: 0, duration: .35 }, '<20%')
      .to('#contactTitle', { opacity: 1, y: 0, duration: .45 }, '<20%')
      .to('#contactStory', { opacity: 1, y: 0, duration: .45 }, '<30%')
      .to('#contactForm .field, #contactForm button', { opacity: 1, y: 0, duration: .45, stagger: .08 }, '<25%');

    if (PIN) releasePin(tl);
  })();

  /* ---------- SAFETY: refresh setelah semua aset termuat ---------- */
  window.addEventListener('load', function () {
    ScrollTrigger.refresh();
  });

  /* ---------- refresh saat resize (debounce) ---------- */
  let rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { ScrollTrigger.refresh(); }, 250);
  });
})();
