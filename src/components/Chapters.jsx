import React from 'react'

export default function Chapters({ activeChapter }) {
  const items = [
    { ch: 'prolog', label: '序' },
    { ch: 'hero', label: '一' },
    { ch: 'about', label: '二' },
    { ch: 'work', label: '三' },
    { ch: 'squad', label: '四' },
    { ch: 'contact', label: '終' }
  ]

  return (
    <aside className="chapters" id="chapters" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.ch}
          className={`chapters__item ${activeChapter === item.ch ? 'is-on' : ''}`}
          data-ch={item.ch}
        >
          {item.label}
        </span>
      ))}
    </aside>
  )
}
