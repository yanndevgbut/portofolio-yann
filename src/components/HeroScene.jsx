import React from 'react'

export default function HeroScene() {
  const handleScrollTo = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 70
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <section className="scene scene--hero" id="hero" data-chapter="hero">
      <div className="hero__sky" aria-hidden="true"></div>
      <div className="hero__moon" id="heroMoon" aria-hidden="true"></div>
      <div className="hero__rocks" id="heroRocks" aria-hidden="true">
        <div className="rock rock--1"></div>
        <div className="rock rock--2"></div>
        <div className="rock rock--3"></div>
        <div className="rock rock--4"></div>
      </div>
      <div className="hero__fog" aria-hidden="true"></div>
      <div className="hero__kanji" id="heroKanji" aria-hidden="true">魔都精兵</div>

      <div className="mdf-emblem" aria-hidden="true">
        <svg viewBox="0 0 100 100" width="72" height="72">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#b3122f" strokeWidth="1.5" opacity="0.5"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="#b3122f" strokeWidth="1" opacity="0.3" strokeDasharray="4 4"/>
          <text x="50" y="56" textAnchor="middle" fill="#b3122f" fontSize="22" fontFamily="serif" opacity="0.6">魔</text>
        </svg>
      </div>

      <figure className="hero__char" id="heroChar">
        <img src="/assets/img/tenka.webp" alt="Tenka Izumo" />
        <span className="hero__char-ring"></span>
      </figure>

      <div className="container hero__inner">
        <h1 className="hero__name">
          <span className="hero__name-line" id="heroNameA">RIYAN</span>
          <span className="hero__name-line hero__name-line--accent" id="heroNameB">SAPUTRA</span>
        </h1>
        <p className="scene__story" id="heroStory">
          Di antara kabut dan bebatuan, ia melangkah masuk,
          membawa satu senjata yang tak pernah tumpul: <em>kode</em>.
        </p>
        <div className="hero__cta" id="heroCta">
          <a href="#work" className="btn btn--blood" onClick={(e) => handleScrollTo(e, 'work')}>
            <span>Lihat Karya</span>
          </a>
          <a href="#contact" className="btn btn--ghost" onClick={(e) => handleScrollTo(e, 'contact')}>
            <span>Hubungi Saya</span>
          </a>
        </div>
      </div>
    </section>
  )
}
