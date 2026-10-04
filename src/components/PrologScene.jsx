import React from 'react'

export default function PrologScene() {
  return (
    <section className="scene scene--prolog" id="prolog" data-chapter="prolog">
      <div className="prolog__gate" id="prologGate" aria-hidden="true">
        <div className="prolog__door prolog__door--l"></div>
        <div className="prolog__door prolog__door--r"></div>
        <div className="prolog__seam"></div>
      </div>
      <div className="prolog__moon" id="prologMoon" aria-hidden="true"></div>
      <div className="prolog__inner container">
        <p className="scene__kicker" id="prologKick">序 PROLOG</p>
        <h2 className="scene__title" id="prologTitle">GERBANG<br />TERBUKA</h2>
        <p className="scene__story" id="prologStory">
          Suatu malam, sebuah gerbang muncul tanpa peringatan.
          Di baliknya terbentang dunia lain yang disebut <em>Mato</em>:
          dimensi tempat kekuatan dan kegelapan berpadu.
        </p>
      </div>
    </section>
  )
}
