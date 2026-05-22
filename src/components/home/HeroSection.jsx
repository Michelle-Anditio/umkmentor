import { heroAnalysisItems } from '../../constants/homeContent'

export default function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="hero-content">
        <div className="hero-left">
          <p className="hero-badge fade-up">
            <span aria-hidden="true">🟢</span> AI-Powered · Berbasis Data Real
          </p>
          <h1 id="hero-title" className="hero-title fade-up fade-up-2">
            Mulai Jualan<br />dengan <span className="accent">Strategi</span><br />yang Tepat
          </h1>
          <p className="hero-desc fade-up fade-up-3">
            Riset pasar, analisis kompetitor, dan rekomendasi platform — semua dalam hitungan detik. Tanpa harus bayar konsultan mahal.
          </p>
          <div className="hero-actions fade-up fade-up-4">
            <a href="#analisis" className="btn-primary">Analisis Produkku</a>
            <a href="#konsultasi" className="btn-secondary">Tanya Pakar</a>
          </div>
          <ul className="hero-stats fade-up fade-up-4" aria-label="Statistik platform">
            <li className="stat">
              <strong className="stat-num">50rb+</strong>
              <span className="stat-label">Data produk dianalisis</span>
            </li>
            <li className="stat">
              <strong className="stat-num">3</strong>
              <span className="stat-label">Platform e-commerce</span>
            </li>
            <li className="stat">
              <strong className="stat-num">86%</strong>
              <span className="stat-label">Akurasi model AI</span>
            </li>
          </ul>
        </div>

        <figure className="hero-visual fade-up fade-up-3" aria-label="Contoh hasil analisis produk">
          <article className="hero-card-main">
            <header className="card-header-row">
              <h2 className="card-title-sm">Analisis Produk — Skincare</h2>
              <span className="card-badge-green">✓ Potensial</span>
            </header>
            <ul className="analysis-list">
              {heroAnalysisItems.map((item, i) => (
                <li className="analysis-item" key={i}>
                  <span className="analysis-icon" aria-hidden="true">{item.icon}</span>
                  <div className="analysis-info">
                    <p className="analysis-label">{item.label}</p>
                    <p className="analysis-sub">{item.sub}</p>
                    <div className="progress-bar" role="meter" aria-valuenow={item.pct} aria-valuemin="0" aria-valuemax="100">
                      <div className={`progress-fill ${item.cls}`} style={{ width: `${item.pct}%` }}></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <p className="floating-badge badge-1" aria-hidden="true">✓ Untung Rp 28rb/produk</p>
          <p className="floating-badge badge-2" aria-hidden="true">🔥 Trending kategori ini</p>
        </figure>
      </div>
    </section>
  )
}
