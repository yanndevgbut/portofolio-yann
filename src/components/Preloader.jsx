import React, { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Preloader({ onFinish }) {
  const [pct, setPct] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    document.body.classList.add('is-loading')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    const DURATION = reduce ? 150 : 2200
    let progress = 0
    let animId = null

    function finish() {
      setIsDone(true)
      document.body.classList.remove('is-loading')
      if (onFinish) onFinish()
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    }

    function tick() {
      const elapsed = performance.now() - start
      const target = Math.min(elapsed / DURATION, 1) * 100
      progress += (target - progress) * 0.16 + 0.5
      if (progress > 100) progress = 100
      setPct(Math.floor(progress))

      if (progress >= 99.5 && elapsed >= DURATION) {
        setPct(100)
        setTimeout(finish, 260)
      } else {
        animId = requestAnimationFrame(tick)
      }
    }

    animId = requestAnimationFrame(tick)

    return () => {
      if (animId) cancelAnimationFrame(animId)
      document.body.classList.remove('is-loading')
    }
  }, [onFinish])

  return (
    <div id="preloader" className={`preloader ${isDone ? 'is-done' : ''}`}>
      <div className="gate">
        <div className="gate__door gate__door--l"></div>
        <div className="gate__door gate__door--r"></div>
        <div className="gate__seam"></div>
        <div className="gate__glow"></div>
      </div>
      <p className="preloader__caption">
        GERBANG DIMENSI DIBUKA
        <span className="preloader__dots"><i></i><i></i><i></i></span>
      </p>
      <div className="preloader__pct">
        <span id="preloaderPct">{pct}</span>%
      </div>
    </div>
  )
}
