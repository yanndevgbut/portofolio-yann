import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__mark">魔都精兵</span>
        <p>© <span id="year">{currentYear}</span> Riyan Saputra, dibangun dengan semangat Mato Defense Force.</p>
        <p className="footer__small">
          Tema terinspirasi dari <i>Mato Seihei no Slave</i>. Foto karakter © pemegang hak masing-masing.
        </p>
      </div>
    </footer>
  )
}
