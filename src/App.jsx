import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader from './components/Preloader'
import BackgroundCanvas from './components/BackgroundCanvas'
import Navbar from './components/Navbar'
import Chapters from './components/Chapters'
import PrologScene from './components/PrologScene'
import HeroScene from './components/HeroScene'
import AboutScene from './components/AboutScene'
import WorkScene from './components/WorkScene'
import SquadScene from './components/SquadScene'
import ContactScene from './components/ContactScene'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [activeChapter, setActiveChapter] = useState('prolog')
  const [activeNav, setActiveNav] = useState('hero')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    // Scroll progress bar
    const bar = document.getElementById('scrollBar')
    if (bar) {
      gsap.to(bar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.2 }
      })
    }

    // Fallback static for reduced motion
    if (reduce) {
      document.querySelectorAll('.scene__story, .sec-title, .scene__kicker').forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      document.querySelectorAll('#squadTrack .squad__panel').forEach((p) => {
        p.style.opacity = '1'
        p.style.visibility = 'visible'
        const f = p.querySelector('.squad__fig')
        if (f) { f.style.opacity = '1'; f.style.transform = 'none'; }
        const n = p.querySelector('.squad__info')
        if (n) { n.style.opacity = '1'; n.style.transform = 'none'; }
      })
      const pm = document.getElementById('prologMoon')
      if (pm) pm.style.opacity = '1'
      const hc = document.getElementById('heroChar')
      if (hc) hc.style.opacity = '1'
      const ac = document.getElementById('aboutChar')
      if (ac) ac.style.opacity = '1'
      const cc = document.getElementById('contactChar')
      if (cc) cc.style.opacity = '1'
      return
    }

    const PIN = !isMobile
    const LEN = 0.55
    const LEN_WORK = 0.65
    const LEN_SQUAD = 0.8
    const LEN_CONTACT = 0.55
    const SCRUB = 0.3

    function hide(sel, vars) {
      document.querySelectorAll(sel).forEach((el) => gsap.set(el, vars))
    }

    function releasePin(trigger) {
      const st = trigger.scrollTrigger
      if (!st) return
      if (st.progress >= 1) {
        st.disable(false)
        return
      }
      st.vars.onLeave = function () {
        st.disable(false)
      }
    }

    const ctx = gsap.context(() => {
      // 序 PROLOG
      hide('#prologTitle', { opacity: 0, y: 30 })
      hide('#prologStory', { opacity: 0, y: 20 })
      hide('#prologMoon', { opacity: 0, scale: 0.85, transformOrigin: 'center' })
      gsap.set('.prolog__seam', { opacity: 1 })
      gsap.set('.prolog__door--l', { xPercent: 0 })
      gsap.set('.prolog__door--r', { xPercent: 0 })

      const tlProlog = gsap.timeline({
        scrollTrigger: {
          trigger: '#prolog',
          start: 'top top',
          end: `+=${window.innerHeight * LEN}`,
          pin: PIN,
          scrub: SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })
      tlProlog
        .to('.prolog__door--l', { xPercent: -92, ease: 'power2.out', duration: 0.3 }, 0)
        .to('.prolog__door--r', { xPercent: 92, ease: 'power2.out', duration: 0.3 }, 0)
        .to('.prolog__seam', { opacity: 0, duration: 0.15 }, 0.1)
        .to('#prologMoon', { opacity: 1, scale: 1, ease: 'power2.out', duration: 0.25 }, 0.05)
        .to('#prologTitle', { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.1)
        .to('#prologStory', { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.15)
        .to({}, { duration: 0.85 }) // hold state

      if (PIN) releasePin(tlProlog)

      // 一 HERO
      hide('#heroNameA, #heroNameB', { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' })
      hide('#heroStory', { opacity: 0, y: 20 })
      hide('#heroCta', { opacity: 0, y: 20 })
      hide('#heroMoon', { opacity: 0, y: 40, scale: 0.9 })
      hide('#heroRocks .rock', { opacity: 0, y: 50 })
      hide('#heroChar', { opacity: 0, y: 60, scale: 1.04 })
      hide('#heroKanji', { opacity: 0, x: -50 })

      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: `+=${window.innerHeight * LEN}`,
          pin: PIN,
          scrub: SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })
      tlHero
        .to('#heroMoon', { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }, 0)
        .to('#heroRocks .rock', { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out' }, 0.02)
        .to('#heroChar', { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power3.out' }, 0.05)
        .to('#heroKanji', { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' }, 0.05)
        .to('#heroNameA', { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.25, ease: 'power2.out' }, 0.08)
        .to('#heroNameB', { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.25, ease: 'power2.out' }, 0.12)
        .to('#heroStory', { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, 0.15)
        .to('#heroCta', { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, 0.18)
        .to({}, { duration: 0.85 }) // hold state

      if (PIN) releasePin(tlHero)

      // 二 ABOUT
      hide('#aboutTitle', { opacity: 0, y: 30 })
      hide('#aboutStory', { opacity: 0, y: 20 })
      hide('#aboutDoc .about__doc-line', { opacity: 0, x: 20 })
      hide('#aboutList li', { opacity: 0, y: 15 })
      hide('#aboutChar', { opacity: 0, x: 60 })
      gsap.set('#aboutDoc', { transformOrigin: 'left center' })

      const tlAbout = gsap.timeline({
        scrollTrigger: {
          trigger: '#about',
          start: 'top top',
          end: `+=${window.innerHeight * LEN}`,
          pin: PIN,
          scrub: SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })
      tlAbout
        .to('#aboutChar', { opacity: 1, x: 0, duration: 0.3, ease: 'power3.out' }, 0)
        .to('#aboutTitle', { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, 0.05)
        .to('#aboutStory', { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, 0.1)
        .fromTo('#aboutDoc', { scaleX: 0.95, opacity: 0.7 }, { scaleX: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }, 0.1)
        .to('#aboutDoc .about__doc-line', { opacity: 1, x: 0, duration: 0.22, stagger: 0.05 }, 0.15)
        .to('#aboutList li', { opacity: 1, y: 0, duration: 0.2, stagger: 0.03 }, 0.18)
        .to({}, { duration: 0.85 }) // hold state

      if (PIN) releasePin(tlAbout)

      // 三 WORK
      hide('#workTitle', { opacity: 0, y: 30 })
      hide('#workStory', { opacity: 0, y: 20 })
      hide('#skillsGrid .skill-card', { opacity: 0, y: 30 })
      hide('#projectsGrid .proj', { opacity: 0, x: 40 })

      const tlWork = gsap.timeline({
        scrollTrigger: {
          trigger: '#work',
          start: 'top top',
          end: `+=${window.innerHeight * LEN_WORK}`,
          pin: PIN,
          scrub: SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })
      tlWork
        .to('#workTitle', { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0)
        .to('#workStory', { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.05)
        .to('#skillsGrid .skill-card', { opacity: 1, y: 0, duration: 0.25, stagger: 0.04, ease: 'power2.out' }, 0.08)
        .to('#projectsGrid .proj', { opacity: 1, x: 0, duration: 0.25, stagger: 0.04, ease: 'power3.out' }, 0.14)
        .to({}, { duration: 0.85 }) // hold state

      if (PIN) releasePin(tlWork)

      // 四 SQUAD
      const track = document.getElementById('squadTrack')
      const panels = gsap.utils.toArray('#squadTrack .squad__panel')
      const bar = document.getElementById('squadBar')
      const now = document.getElementById('squadNow')
      const bg = document.getElementById('squadBg')
      const total = panels.length

      if (track && total) {
        const themes = [
          { a: 'rgba(179,18,47,.4)', b: 'rgba(60,18,40,.45)' },
          { a: 'rgba(139,10,26,.42)', b: 'rgba(40,8,18,.5)' },
          { a: 'rgba(120,85,30,.35)', b: 'rgba(50,35,10,.4)' },
          { a: 'rgba(80,45,110,.35)', b: 'rgba(35,15,50,.42)' }
        ]

        function applyTheme(i) {
          const t = themes[i] || themes[0]
          if (bg) {
            bg.style.background =
              `radial-gradient(70% 60% at 70% 30%, ${t.a}, transparent 60%),` +
              `radial-gradient(50% 45% at 20% 80%, ${t.b}, transparent 62%), #060608`
          }
        }
        applyTheme(0)

        if (!PIN) {
          panels.forEach((p) => {
            const fig = p.querySelector('.squad__fig')
            const info = p.querySelector('.squad__info')
            if (fig) {
              gsap.fromTo(
                fig,
                { y: 40, opacity: 0, scale: 1.02 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.6,
                  ease: 'power3.out',
                  scrollTrigger: { trigger: p, start: 'top 85%', once: true }
                }
              )
            }
            if (info) {
              gsap.fromTo(
                info,
                { y: 20, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.5,
                  delay: 0.08,
                  ease: 'power2.out',
                  scrollTrigger: { trigger: p, start: 'top 85%', once: true }
                }
              )
            }
          })
        } else {
          panels.forEach((p, i) => {
            gsap.set(p.querySelector('.squad__fig'), { y: 60, opacity: i === 0 ? 1 : 0, scale: 1.03 })
            gsap.set(p.querySelector('.squad__info'), { y: 30, opacity: i === 0 ? 1 : 0 })
          })

          const tlSquad = gsap.timeline({
            scrollTrigger: {
              trigger: '#squad',
              start: 'top top',
              end: `+=${window.innerHeight * (total * LEN_SQUAD)}`,
              pin: true,
              scrub: 0.2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const i = Math.min(total - 1, Math.floor(self.progress * total))
                if (now) now.textContent = String(i + 1).padStart(2, '0')
                applyTheme(i)
              }
            }
          })

          tlSquad.to(track, { xPercent: (-100 * (total - 1)) / total, ease: 'none', duration: total - 1 }, 0)

          panels.forEach((p, i) => {
            const fig = p.querySelector('.squad__fig')
            const info = p.querySelector('.squad__info')
            if (i === 0) {
              tlSquad
                .to(fig, { y: 0, scale: 1, duration: 0.2, ease: 'power3.out' }, 0)
                .to(info, { y: 0, duration: 0.15, ease: 'power2.out' }, 0.05)
            } else {
              const start = i - 0.7
              tlSquad
                .to(fig, { y: 0, opacity: 1, scale: 1, duration: 0.2, ease: 'power3.out' }, start)
                .to(info, { y: 0, opacity: 1, duration: 0.15, ease: 'power2.out' }, start + 0.05)
            }
          })

          if (bar) {
            ScrollTrigger.create({
              trigger: '#squad',
              start: 'top top',
              end: `+=${window.innerHeight * (total * LEN_SQUAD)}`,
              onUpdate: (self) => {
                bar.style.width = `${(self.progress * 100).toFixed(1)}%`
              }
            })
          }

          releasePin(tlSquad)
        }
      }

      // 終 CONTACT
      hide('#contactTitle', { opacity: 0, y: 30 })
      hide('#contactStory', { opacity: 0, y: 20 })
      hide('#contactForm .field, #contactForm button', { opacity: 0, y: 20 })
      hide('#contactChar', { opacity: 0, x: 60 })

      const tlContact = gsap.timeline({
        scrollTrigger: {
          trigger: '#contact',
          start: 'top top',
          end: `+=${window.innerHeight * LEN_CONTACT}`,
          pin: PIN,
          scrub: SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      })
      tlContact
        .to('#contactChar', { opacity: 1, x: 0, duration: 0.25, ease: 'power3.out' }, 0)
        .to('#contactTitle', { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.04)
        .to('#contactStory', { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.08)
        .to('#contactForm .field, #contactForm button', { opacity: 1, y: 0, duration: 0.22, stagger: 0.03 }, 0.1)
        .to({}, { duration: 0.85 }) // hold state

      if (PIN) releasePin(tlContact)
    })

    // IntersectionObserver untuk scene active (Chapters & Navbar)
    const scenes = Array.prototype.slice.call(document.querySelectorAll('.scene'))
    const sceneIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const ch = en.target.getAttribute('data-chapter')
            if (ch) {
              setActiveChapter(ch)
              if (['hero', 'about', 'work', 'squad', 'contact'].includes(ch)) {
                setActiveNav(ch)
              }
            }
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    scenes.forEach((s) => sceneIO.observe(s))

    return () => {
      ctx.revert()
      sceneIO.disconnect()
    }
  }, [])

  return (
    <>
      <Preloader />
      <BackgroundCanvas />

      <div className="scroll-progress">
        <span id="scrollBar"></span>
      </div>

      <Chapters activeChapter={activeChapter} />
      <Navbar activeScene={activeNav} />

      <main id="main">
        <PrologScene />

        <div className="glitch-divider" aria-hidden="true"></div>

        <HeroScene />

        <div className="glitch-divider" aria-hidden="true"></div>

        <AboutScene />

        <div className="glitch-divider" aria-hidden="true"></div>

        <WorkScene />

        <SquadScene />

        <div className="glitch-divider" aria-hidden="true"></div>

        <ContactScene />
      </main>

      <Footer />
    </>
  )
}
