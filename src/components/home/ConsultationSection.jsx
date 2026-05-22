const consultationCards = [
  {
    className: 'konsul-ai',
    tag: '🤖 Rekomendasi AI',
    icon: '⚡',
    title: 'Konsultasi AI',
    desc: 'Analisis instan berbasis 11.700+ data produk e-commerce Indonesia. Hasil dalam hitungan detik.',
    features: ['Prediksi potensi produk (86% akurasi)', 'Simulasi harga & komisi platform', 'Rekomendasi platform terbaik', 'Insight kompetitor', 'Analisis sentimen review'],
    href: '#analisis',
    cta: 'Mulai Gratis  ',
  },
  {
    className: 'konsul-human',
    tag: '👨‍💼 Pakar Bisnis',
    icon: '🤝',
    title: 'Konsultasi Pakar',
    desc: 'Terhubung langsung dengan konsultan bisnis dan UMKM berpengalaman untuk pendampingan lebih mendalam.',
    features: ['Sesi 1-on-1 dengan pakar', 'Review strategi bisnis kamu', 'Mentoring berkelanjutan', 'Jaringan sesama seller', 'Garansi kepuasan'],
    href: '#pakar',
    cta: 'Lihat Pakar  ',
  },
]

export default function ConsultationSection() {
  return (
    <section id="konsultasi" className="section-dark" aria-labelledby="konsultasi-title">
      <div className="section-inner">
        <p className="section-eyebrow section-eyebrow--dim">Pilihan Konsultasi</p>
        <h2 id="konsultasi-title" className="section-title section-title--light">Pilih cara yang<br />paling nyaman buatmu</h2>
        <p className="section-desc section-desc--dim">Mau analisis cepat dari AI, atau butuh pendampingan lebih mendalam dari pakar? Keduanya tersedia.</p>
        <div className="konsultasi-grid">
          {consultationCards.map(card => (
            <article className={`konsul-card ${card.className}`} key={card.title}>
              <p className="konsul-tag">{card.tag}</p>
              <span className="konsul-icon" aria-hidden="true">{card.icon}</span>
              <h3 className="konsul-title">{card.title}</h3>
              <p className="konsul-desc">{card.desc}</p>
              <ul className="konsul-features">
                {card.features.map(feature => <li key={feature}>{feature}</li>)}
              </ul>
              <a href={card.href} className="konsul-btn">{card.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
