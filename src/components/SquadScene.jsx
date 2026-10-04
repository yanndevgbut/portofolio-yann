import React from 'react'

export default function SquadScene() {
  return (
    <section className="scene scene--squad" id="squad" data-chapter="squad">
      <div className="squad__stage" id="squadStage">
        <div className="squad__bg" id="squadBg" aria-hidden="true"></div>
        <div className="squad__kanji" id="squadKanji" aria-hidden="true">魔都精兵のスレイブ</div>

        <div className="squad__track" id="squadTrack">
          <div className="squad__panel" data-panel="0" data-theme="crimson">
            <figure className="squad__fig"><img src="/assets/img/tenka.webp" alt="Tenka Izumo" /></figure>
            <div className="squad__info">
              <span className="squad__squad">SQUAD 06</span>
              <h3 className="squad__name">Tenka Izumo</h3>
              <p className="squad__role">Komandan 6th Squad</p>
              <p className="squad__abil"><span>ABILITY</span> Ame-no-Mitori: manipulasi ruang.</p>
            </div>
          </div>

          <div className="squad__panel" data-panel="1" data-theme="blood">
            <figure className="squad__fig"><img src="/assets/img/kyouka.webp" alt="Kyouka Uzen" /></figure>
            <div className="squad__info">
              <span className="squad__squad">SQUAD 07</span>
              <h3 className="squad__name">Kyouka Uzen</h3>
              <p className="squad__role">Komandan 7th Squad</p>
              <p className="squad__abil"><span>ABILITY</span> Slave: memperkuat &amp; mengikat.</p>
            </div>
          </div>

          <div className="squad__panel" data-panel="2" data-theme="amber">
            <figure className="squad__fig"><img src="/assets/img/fubuki.webp" alt="Fubuki Azuma" /></figure>
            <div className="squad__info">
              <span className="squad__squad">SQUAD 09</span>
              <h3 className="squad__name">Fubuki Azuma</h3>
              <p className="squad__role">Komandan 9th Squad</p>
              <p className="squad__abil"><span>ABILITY</span> Sunset: tombak jumonji yari.</p>
            </div>
          </div>

          <div className="squad__panel" data-panel="3" data-theme="violet">
            <figure className="squad__fig"><img src="/assets/img/shushu.webp" alt="Shushu Suruga" /></figure>
            <div className="squad__info">
              <span className="squad__squad">SQUAD 07</span>
              <h3 className="squad__name">Shushu Suruga</h3>
              <p className="squad__role">Anggota 7th Squad</p>
              <p className="squad__abil"><span>ABILITY</span> Paradigm Shift: ubah ukuran tubuh.</p>
            </div>
          </div>
        </div>

        <div className="squad__head container">
          <p className="scene__kicker">四 BAB EMPAT · PASUKAN ELIT</p>
          <h2 className="sec-title">GALERI <em>KARAKTER</em></h2>
        </div>
        <div className="squad__progress"><span id="squadBar"></span></div>
        <div className="squad__counter"><span id="squadNow">01</span> / 04</div>
      </div>
    </section>
  )
}
