import React, { useState, useEffect } from 'react'

export default function Navbar({ activeScene }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.style.cssText = 'position:absolute;top:0;height:60px;width:1px;pointer-events:none;'
    document.body.prepend(sentinel)

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting)
    })
    observer.observe(sentinel)

    return () => {
      observer.disconnect()
      if (sentinel.parentNode) sentinel.parentNode.removeChild(sentinel)
    }
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setIsOpen(false)
    const el = document.getElementById(targetId)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 70
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
    history.replaceState(null, '', `#${targetId}`)
  }

  const navLinks = [
    { href: 'hero', label: 'Beranda' },
    { href: 'about', label: 'Tentang' },
    { href: 'work', label: 'Karya' },
    { href: 'squad', label: 'Karakter' },
    { href: 'contact', label: 'Kontak' }
  ]

  return (
    <header className={`nav ${isScrolled ? 'is-scrolled' : ''}`} id="nav">
      <a
        href="#prolog"
        className="nav__logo"
        onClick={(e) => handleNavClick(e, 'prolog')}
      >
        <span className="nav__logo-mark">魔</span>
        <span className="nav__logo-txt">RIYAN<em>//MDF</em></span>
      </a>

      <nav className={`nav__menu ${isOpen ? 'is-open' : ''}`} id="navMenu">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={`#${link.href}`}
            className={`nav__link ${activeScene === link.href ? 'is-active' : ''}`}
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button
        className={`nav__toggle ${isOpen ? 'is-open' : ''}`}
        id="navToggle"
        aria-label="Menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span><span></span><span></span>
      </button>
    </header>
  )
}
