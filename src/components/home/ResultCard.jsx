import { getCommissionRange } from '../../utils/commission'

export default function ResultCard({ analysisState, resultData, productData, sentimentData }) {
  const scoreBadgeStyle =
    analysisState === 'loading'
      ? { background: 'rgba(201,136,42,0.1)', color: 'var(--accent2)' }
      : analysisState === 'done' && productData?.prediction === 'Laku'
        ? { background: 'rgba(34,197,94,0.1)', color: 'var(--green)' }
        : analysisState === 'done'
          ? { background: 'rgba(239,68,68,0.1)', color: '#EF4444' }
          : {}

  return (
    <article className="result-card" aria-live="polite" aria-label="Hasil analisis">
      <header className="result-header">
        <h3 className="result-title">Hasil Analisis</h3>
        <span className="score-badge" style={scoreBadgeStyle}>
          {analysisState === 'idle' ? 'Menunggu input...'
            : analysisState === 'loading' ? 'Menganalisis...'
              : productData?.prediction === 'Laku' ? '✓ Berpotensi Laku'
                : '✗ Kurang Potensial'}
        </span>
      </header>

      {analysisState === 'idle' && (
        <div className="result-empty">
          <span className="result-empty-icon" aria-hidden="true">📊</span>
          <p>Isi form di sebelah kiri untuk melihat hasil analisis produkmu</p>
        </div>
      )}

      {analysisState === 'loading' && (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted-dark)' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>⚙️</div>
          <div style={{ fontSize: '14px' }}>AI sedang menganalisis data...</div>
        </div>
      )}

      {analysisState === 'done' && resultData && productData && (
        <>
          <div className="metric-row">
            <span className="metric-label">Prediksi Model AI</span>
            <span className={`metric-value ${productData.prediction === 'Laku' ? 'good' : 'bad'}`}>
              {productData.prediction}
            </span>
          </div>
          <div className="metric-row">
            <span className="metric-label">Peluang Laku</span>
            <span className={`metric-value ${productData.laku_score >= 70 ? 'good' : productData.laku_score >= 45 ? 'warn' : 'bad'}`}>
              {productData.laku_score}%
            </span>
          </div>
          <div className="metric-row">
            <span className="metric-label">Tingkat Risiko</span>
            <span className={`metric-value ${productData.risk_level === 'Rendah' ? 'good' : productData.risk_level === 'Sedang' ? 'warn' : 'bad'}`}>
              {productData.risk_level}
            </span>
          </div>
          <div className="metric-row">
            <span className="metric-label">Median Harga Kategori</span>
            <span className="metric-value">Rp {productData.harga_median_cat?.toLocaleString('id')}</span>
          </div>
          {productData.cat_laku_rate !== undefined && (
            <div className="metric-row">
              <span className="metric-label">Tingkat Laku Kategori</span>
              <span className="metric-value">{productData.cat_laku_rate}% produk laku</span>
            </div>
          )}

          {sentimentData && (
            <>
              <div className="metric-row">
                <span className="metric-label">Sentimen Review</span>
                <span className={`metric-value ${sentimentData.positive >= 50 ? 'good' : sentimentData.negative >= 50 ? 'bad' : 'warn'}`}>
                  {sentimentData.positive}% Positif
                </span>
              </div>
              <div className="sentiment-bar" style={{ margin: '4px 0 6px' }}>
                <div className="sent-pos" style={{ width: `${sentimentData.positive}%` }}></div>
                <div className="sent-neu" style={{ width: `${sentimentData.neutral}%` }}></div>
                <div className="sent-neg" style={{ width: `${sentimentData.negative}%` }}></div>
              </div>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--green)' }}>● {sentimentData.positive}% Positif</span>
                <span style={{ color: 'var(--accent2)' }}>● {sentimentData.neutral}% Netral</span>
                <span style={{ color: '#EF4444' }}>● {sentimentData.negative}% Negatif</span>
              </div>
              {sentimentData.emotion && (
                <div style={{ fontSize: '12px', color: 'var(--muted-dark)', marginBottom: '12px' }}>
                  Emosi dominan: <strong style={{ color: 'var(--white)' }}>{sentimentData.emotion}</strong>
                </div>
              )}
            </>
          )}

          {productData.saran?.length > 0 && (
            <div className="insight-box">
              <div className="insight-title">💡 Saran AI</div>
              <ul style={{ paddingLeft: '16px', margin: '0', fontSize: '13px', lineHeight: '1.7', color: '#1a1a1a' }}>
                {productData.saran.map((saran, i) => <li key={i}>{saran}</li>)}
              </ul>
            </div>
          )}

          {productData.saran?.length === 0 && (
            <div className="insight-box">
              <div className="insight-title">💡 Rekomendasi AI</div>
              <div className="insight-text">
                Kategori <strong>{resultData.kategoriLabel}</strong> punya potensi bagus! Pertahankan harga dan stok yang ada.
              </div>
            </div>
          )}

          <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(232,82,10,0.06)', border: '1px solid rgba(232,82,10,0.15)', borderRadius: '10px', fontSize: '13px', color: 'var(--black)' }}>
            <strong style={{ color: 'var(--black)' }}>Butuh pendampingan lebih?</strong><br />
            Konsultasikan strategi ini dengan pakar kami.<br />
            <a href="#pakar" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'none' }}>Lihat Konsultan  </a>
          </div>
        </>
      )}
    </article>
  )
}
