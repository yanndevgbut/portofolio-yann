import React, { useEffect, useRef } from 'react'

export default function BackgroundCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0, h = 0, dpr = 1
    let embers = []

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.width = Math.floor(window.innerWidth * dpr)
      h = canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      build()
    }

    function spawn(anywhere) {
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + Math.random() * 40 * dpr,
        r: (Math.random() * 1.9 + 0.5) * dpr,
        vy: (Math.random() * 0.35 + 0.12) * dpr,
        sway: Math.random() * Math.PI * 2,
        swaySpd: Math.random() * 0.012 + 0.004,
        swayAmp: (Math.random() * 0.5 + 0.2) * dpr,
        a: Math.random() * 0.5 + 0.25,
        hue: Math.random() < 0.65 ? '224,35,74' : '255,120,60'
      }
    }

    function build() {
      const area = (w * h) / (dpr * dpr)
      let count = Math.round(area / 26000)
      count = Math.max(18, Math.min(count, 55))
      embers = []
      for (let i = 0; i < count; i++) {
        embers.push(spawn(true))
      }
    }

    let t = 0
    let animId = null

    function draw() {
      ctx.clearRect(0, 0, w, h)
      t += 1

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i]
        e.y -= e.vy
        e.sway += e.swaySpd
        const x = e.x + Math.sin(e.sway) * e.swayAmp
        const flick = e.a * (0.65 + Math.sin(t * 0.05 + i) * 0.35)

        const g = ctx.createRadialGradient(x, e.y, 0, x, e.y, e.r * 6)
        g.addColorStop(0, `rgba(${e.hue},${flick.toFixed(3)})`)
        g.addColorStop(1, `rgba(${e.hue},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, e.y, e.r * 6, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(${e.hue},${Math.min(flick + 0.25, 0.95).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(x, e.y, e.r, 0, Math.PI * 2)
        ctx.fill()

        if (e.y < -20 * dpr) embers[i] = spawn(false)
      }

      if (!reduce) animId = requestAnimationFrame(draw)
    }

    let rt
    function onResize() {
      clearTimeout(rt)
      rt = setTimeout(resize, 160)
    }

    window.addEventListener('resize', onResize)
    resize()
    if (reduce) {
      draw()
    } else {
      animId = requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener('resize', onResize)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} id="mato-canvas" className="mato-canvas"></canvas>
      <div className="bg-mist" aria-hidden="true"></div>
    </>
  )
}
