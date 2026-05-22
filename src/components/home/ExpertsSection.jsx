import { experts } from '../../constants/homeContent'

export default function ExpertsSection() {
  return (
    <section id="pakar" aria-labelledby="pakar-title">
      <div className="section-inner">
        <p className="section-eyebrow">Konsultan Pakar</p>
        <h2 id="pakar-title" className="section-title">Belajar dari yang<br />sudah berpengalaman</h2>
        <p className="section-desc">Konsultan bisnis dan pelaku UMKM berpengalaman siap membantu perjalanan jualanmu.</p>
        <ul className="experts-grid">
          {experts.map(expert => (
            <li className="expert-card" key={expert.name}>
              <img src={expert.src} alt={expert.name} className="expert-avatar" />
              <h3 className="expert-name">{expert.name}</h3>
              <p className="expert-title">{expert.title}</p>
              <ul className="expert-tags" aria-label="Spesialisasi">
                {expert.tags.map(tag => <li key={tag} className="expert-tag">{tag}</li>)}
              </ul>
              <p className="expert-rating"><span aria-hidden="true">⭐</span> <span>{expert.rating}</span> · <span>{expert.sesi} sesi</span></p>
              <button className="expert-btn" type="button">Konsultasi Sekarang</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
