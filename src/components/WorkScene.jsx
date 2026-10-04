import React from 'react'

export default function WorkScene() {
  return (
    <section className="scene scene--work" id="work" data-chapter="work">
      <div className="container">
        <h2 className="sec-title" id="workTitle">KEKUATAN <em>&amp;</em> KARYA</h2>
        <p className="scene__story" id="workStory">
          Setiap misi menempa kemampuannya,
          seperti Peach yang memberi kekuatan bagi para prajurit.
        </p>

        <div className="skills__grid" id="skillsGrid">
          <article className="skill-card">
            <h3 className="skill-card__title">Frontend</h3>
            <ul className="skill-card__list">
              <li>HTML / CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>GSAP Motion</li>
            </ul>
          </article>

          <article className="skill-card">
            <h3 className="skill-card__title">Backend</h3>
            <ul className="skill-card__list">
              <li>Node.js</li>
              <li>Laravel</li>
              <li>REST API</li>
              <li>Socket.io</li>
            </ul>
          </article>

          <article className="skill-card">
            <h3 className="skill-card__title">Database</h3>
            <ul className="skill-card__list">
              <li>MySQL</li>
              <li>MongoDB</li>
              <li>PostgreSQL</li>
            </ul>
          </article>

          <article className="skill-card">
            <h3 className="skill-card__title">Tools</h3>
            <ul className="skill-card__list">
              <li>Git</li>
              <li>Figma</li>
              <li>Chart.js</li>
              <li>Express</li>
            </ul>
          </article>
        </div>

        <div className="projects__grid" id="projectsGrid">
          <article className="proj">
            <div className="proj__top">
              <span className="proj__code">MISI-001</span>
              <span className="proj__year">2025</span>
            </div>
            <h3 className="proj__title">Portal E-Commerce</h3>
            <p className="proj__desc">Toko online full-stack dengan keranjang realtime, pembayaran, dan dashboard admin.</p>
            <div className="proj__tags">
              <span>Laravel</span>
              <span>React</span>
              <span>MySQL</span>
            </div>
            <a href="#" className="proj__link">Buka <i>→</i></a>
          </article>

          <article className="proj">
            <div className="proj__top">
              <span className="proj__code">MISI-002</span>
              <span className="proj__year">2025</span>
            </div>
            <h3 className="proj__title">Mato Task Manager</h3>
            <p class="proj__desc">Aplikasi manajemen tugas kolaboratif dengan drag &amp; drop dan sinkronisasi realtime.</p>
            <div className="proj__tags">
              <span>Node.js</span>
              <span>Socket.io</span>
              <span>MongoDB</span>
            </div>
            <a href="#" className="proj__link">Buka <i>→</i></a>
          </article>

          <article className="proj">
            <div className="proj__top">
              <span className="proj__code">MISI-003</span>
              <span className="proj__year">2024</span>
            </div>
            <h3 className="proj__title">Shuuki Analytics</h3>
            <p className="proj__desc">Dashboard visualisasi data interaktif dengan grafik animasi dan ekspor laporan.</p>
            <div className="proj__tags">
              <span>Vue</span>
              <span>Chart.js</span>
              <span>Express</span>
            </div>
            <a href="#" className="proj__link">Buka <i>→</i></a>
          </article>

          <article className="proj">
            <div className="proj__top">
              <span className="proj__code">MISI-004</span>
              <span className="proj__year">2024</span>
            </div>
            <h3 className="proj__title">Gerbang Landing Page</h3>
            <p className="proj__desc">Landing page animasi kreatif dengan motion GSAP dan atmosfer gelap.</p>
            <div className="proj__tags">
              <span>HTML</span>
              <span>CSS</span>
              <span>GSAP</span>
            </div>
            <a href="#" className="proj__link">Buka <i>→</i></a>
          </article>
        </div>
      </div>
    </section>
  )
}
