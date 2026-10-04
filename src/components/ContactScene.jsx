import React, { useState } from 'react'

export default function ContactScene() {
  const [note, setNote] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.name.value.trim()
    setNote(`Sinyal terkirim, ${name || 'teman'}. Markas akan segera membalas.`)
    e.target.reset()
  }

  return (
    <section className="scene scene--contact" id="contact" data-chapter="contact">
      <figure className="contact__char" id="contactChar">
        <img src="/assets/img/yuuki.webp" alt="Yuuki Wakura" />
        <figcaption className="contact__char-caption">YW-00 · SLAVE / CARETAKER</figcaption>
      </figure>

      <div className="container contact__inner">
        <h2 className="sec-title" id="contactTitle">HUBUNGI <em>SAYA</em></h2>
        <p className="scene__story" id="contactStory">
          Perjalanan berakhir di gerbang yang sama.
          Tapi gerbang selalu terbuka untuk misi yang baru.
        </p>

        <form className="contact__form" id="contactForm" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="cname">Nama</label>
            <input type="text" id="cname" name="name" placeholder="Nama kamu" required />
          </div>
          <div className="field">
            <label htmlFor="cemail">Email</label>
            <input type="email" id="cemail" name="email" placeholder="email@contoh.com" required />
          </div>
          <div className="field">
            <label htmlFor="cmsg">Pesan</label>
            <textarea id="cmsg" name="message" rows="5" placeholder="Tulis misi atau ide kamu..." required></textarea>
          </div>
          <button type="submit" className="btn btn--blood btn--full">
            <span>Kirim Sinyal</span>
          </button>
          {note && <p className="contact__note" id="formNote">{note}</p>}
        </form>
      </div>
    </section>
  )
}
