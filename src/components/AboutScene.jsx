import React from 'react'

export default function AboutScene() {
  return (
    <section className="scene scene--about" id="about" data-chapter="about">
      <figure className="about__char" id="aboutChar">
        <img src="/assets/img/kyouka.webp" alt="Kyouka Uzen" />
        <figcaption className="about__char-caption">KV-07 · KOMMANDAN</figcaption>
      </figure>

      <div className="container about__inner">
        <h2 className="sec-title" id="aboutTitle">TENTANG <em>SAYA</em></h2>
        <p className="scene__story" id="aboutStory">
          Markas mencatatnya sebagai personil baru.
          Kemampuannya dinilai dari misi-misi yang telah dilalui.
        </p>
        <div className="about__doc" id="aboutDoc">
          <p className="about__doc-line">
            Halo. Saya <b>Riyan Saputra</b>, seorang <b>Fullstack Developer</b> yang percaya setiap baris kode adalah gerbang menuju dunia baru.
          </p>
          <p className="about__doc-line">
            Saya menggabungkan logika backend yang solid dengan antarmuka frontend yang hidup dari database, API, hingga animasi mikro di layar.
          </p>
        </div>
        <ul className="about__list" id="aboutList">
          <li><span>Nama</span><b>Riyan Saputra</b></li>
          <li><span>Peran</span><b>Fullstack Developer</b></li>
          <li><span>Basis</span><b>Indonesia</b></li>
          <li><span>Status</span><b className="ok">Terbuka untuk kerja sama</b></li>
          <li><span>Pengalaman</span><b>4 tahun</b></li>
          <li><span>Misi selesai</span><b>43 project</b></li>
          <li><span>Teknologi</span><b>17 stack</b></li>
        </ul>
      </div>
    </section>
  )
}
