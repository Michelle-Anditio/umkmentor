import { useState } from 'react'

const tabData = {
  potensi: {
    detail: {
      metrics: [
        { label: 'Kategori Produk', value: 'Kecantikan', cls: '' },
        { label: 'Peluang Laku (Model AI)', value: '85% Berpotensi Laku', cls: 'good' },
        { label: 'Harga Pasar Kategori', value: 'Rp 52.000', cls: '' },
        { label: 'Stok Pasar Kategori', value: '45 unit', cls: '' },
        { label: 'Produk Official Store', value: '31%', cls: '' },
        { label: 'Tingkat Risiko Model AI', value: 'Rendah', cls: 'good' },
        { label: 'Status Gold Merchant', value: 'Meningkatkan visibilitas toko', cls: '' }
      ]
    },
    saran: {
      points: [
        'Harga produk masih berada dalam rentang pasar kategori sehingga peluang diterima pembeli cukup baik.',
        'Perhatikan stok agar tetap tersedia saat permintaan meningkat.',
        'Status Official Store dapat membantu meningkatkan kepercayaan pembeli.',
        'Manfaatkan Gold Merchant untuk memperkuat visibilitas toko.'
      ]
    }
  },
  harga: {
    detail: {
      metrics: [
        { label: 'Harga Jual', value: 'Rp 55.000', cls: '' },
        { label: 'HPP Produk', value: 'Rp 20.000 (36.4%)', cls: 'bad' },
        { label: 'Biaya Admin Shopee', value: 'Rp 3.575 (6.5%)', cls: 'bad' },
        { label: 'Biaya Pengemasan', value: 'Rp 3.000 (5.5%)', cls: 'bad' },
        { label: 'Alokasi Marketing', value: 'Rp 5.000 (9.1%)', cls: '' },
        { label: 'Admin Lainnya', value: 'Rp 1.500 (2.7%)', cls: '' },
        { label: 'Profit Bersih', value: 'Rp 28.425 (51.7%)', cls: 'good' }
      ]
    },
    saran: {
      points: [
        'Naikkan harga jual ke Rp 59.000 jika ingin menutupi biaya diskon campaign 10% agar profit tetap aman.',
        'Negosiasikan harga grosir dengan supplier untuk mencoba menekan HPP ke Rp 18.000.',
        'Sederhanakan metode pengemasan agar biaya packaging bisa didorong ke bawah Rp 2.000 per paket.',
        'Manfaatkan skema gratis ongkir untuk merangsang volume pesanan tanpa memotong laba langsung.'
      ]
    }
  },
  kompetitor: {
    detail: {
      metrics: [
        { label: 'Kategori Analisis', value: 'Kecantikan', cls: '' },
        { label: 'Harga Pasar Kategori', value: 'Rp 52.000', cls: '' },
        { label: 'Stok Pasar Kategori', value: '45 unit', cls: '' },
        { label: 'Produk Official Store', value: '31%', cls: '' },
        { label: 'Faktor Penentu Laku', value: 'Harga, Rating & Ulasan', cls: 'good' },
        { label: 'Rekomendasi Margin', value: 'Minimal 45%', cls: '' }
      ]
    },
    saran: {
      points: [
        'Bandingkan harga produk dengan harga pasar kategori sebelum menentukan harga jual.',
        'Perhatikan pola stok kompetitor agar tidak kehabisan maupun kelebihan stok.',
        'Bangun ulasan positif untuk meningkatkan kepercayaan pembeli.',
        'Fokus pada kualitas produk daripada perang harga ekstrem.'
      ]
    }
  },
  sentimen: {
    detail: {
      metrics: [
        { label: 'Hasil Sentimen', value: '70% Sentimen Positif', cls: 'good' },
        { label: 'Hasil Netral', value: '20% Sentimen Netral', cls: 'warn' },
        { label: 'Hasil Negatif', value: '10% Sentimen Negatif', cls: 'bad' },
        { label: 'Aspek Terkuat', value: 'Kesesuaian Produk & Khasiat', cls: 'good' },
        { label: 'Aspek Terlemah', value: 'Kecepatan Respons & Kemasan', cls: 'bad' }
      ]
    },
    saran: {
      points: [
        'Tampilkan keunggulan manfaat produk yang paling disukai pembeli sebagai promosi utama.',
        'Gunakan pelindung kemasan tambahan untuk mencegah bocor atau kerusakan selama pengiriman.',
        'Dahulukan pengemasan cepat dan serah terima ke kurir di bawah jam batas harian.',
        'Berikan respons tanya-jawab chat dengan pesan template yang ramah dan solutif.'
      ]
    }
  },

  platform: {
    detail: {
      metrics: [
        { label: 'Mode Analisis', value: 'Real-time AI Chat', cls: '' },
        { label: 'Kemampuan', value: 'Strategi, pricing, marketing', cls: 'good' },
        { label: 'Respons', value: 'Cepat & Kontekstual', cls: '' },
        { label: 'Sumber AI', value: 'Groq LLM API', cls: '' }
      ]
    },
    saran: {
      points: [
        'Gunakan Real-time AI Chat untuk konsultasi strategi pricing dan keputusan jualan tanpa tebak-tebakan.',
        'Manfaatkan kemampuan AI dalam menyusun rencana marketing yang spesifik untuk target pasar UMKM kamu.',
        'Ajukan pertanyaan secara detail dan kontekstual agar asisten UMKMentor AI bisa memberikan solusi yang lebih akurat.',
        'Gunakan insight ini sebagai referensi pembanding sebelum mengambil keputusan bisnis yang besar.'
      ],
      disclaimer: 'Asisten konsultasi bisnis ini didukung oleh Groq LLM API. Seluruh saran bersifat rekomendasi strategi dan bukan jaminan mutlak keberhasilan operasional.'
    }
  }
}

function getFeatureKey(title = '') {
  const t = title.toLowerCase()
  if (t.includes('potensi')) return 'potensi'
  if (t.includes('harga') || t.includes('simulasi')) return 'harga'
  if (t.includes('kompetitor') || t.includes('market') || t.includes('pasar')) return 'kompetitor'
  if (t.includes('sentimen')) return 'sentimen'
  return 'platform'
}

export default function FeaturePreview({ data }) {
  const [activeTab, setActiveTab] = useState('overview')
  const featureKey = getFeatureKey(data.title)
  const currentTabInfo = tabData[featureKey]

  return (
    <article className="preview-card" aria-live="polite">
      <nav className="tab-nav" aria-label="Tab preview fitur">
        {['overview', 'detail', 'saran'].map(tab => (
          <button
            key={tab}
            className={`tab-btn${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'overview' ? 'Overview' : tab === 'detail' ? 'Detail' : 'Saran AI'}
          </button>
        ))}
      </nav>

      <header>
        <div className="preview-title">{data.title}</div>
        <div className="preview-subtitle">{data.subtitle}</div>
      </header>

      {/* OVERVIEW TAB CONTENT */}
      {activeTab === 'overview' && (
        <>
          {data.isSentimen && (() => {
            const sentiment = data.sentimentData || { positive: 70, neutral: 20, negative: 10 }
            return (
              <>
                <div className="sentiment-bar">
                  <div className="sent-pos" style={{ width: `${sentiment.positive}%`, flex: 'none' }}></div>
                  <div className="sent-neu" style={{ width: `${sentiment.neutral}%`, flex: 'none' }}></div>
                  <div className="sent-neg" style={{ width: `${sentiment.negative}%`, flex: 'none' }}></div>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '11px', marginBottom: '16px' }}>
                  <span style={{ color: 'var(--sentiment-positive)' }}>● {sentiment.positive}% Positif</span>
                  <span style={{ color: 'var(--sentiment-neutral)' }}>● {sentiment.neutral}% Netral</span>
                  <span style={{ color: 'var(--sentiment-negative)' }}>● {sentiment.negative}% Negatif</span>
                </div>
              </>
            )
          })()}

          <dl className="metrics-list">
            {data.metrics.map((metric, i) => (
              <div className="metric-row" key={i}>
                <dt className="metric-label">{metric.label}</dt>
                <dd className={`metric-value${metric.cls ? ' ' + metric.cls : ''}`}>{metric.value}</dd>
              </div>
            ))}
          </dl>

          <aside className="insight-box">
            <p className="insight-title">💡 Insight AI</p>
            <p className="insight-text">{data.insight}</p>
          </aside>
        </>
      )}

      {/* DETAIL TAB CONTENT */}
      {activeTab === 'detail' && currentTabInfo && (
        <dl className="metrics-list">
          {currentTabInfo.detail.metrics.map((metric, i) => {
            let val = metric.value
            if (featureKey === 'sentimen') {
              const sentiment = data.sentimentData || { positive: 70, neutral: 20, negative: 10 }
              if (metric.label === 'Hasil Sentimen') val = `${sentiment.positive}% Sentimen Positif`
              else if (metric.label === 'Hasil Netral') val = `${sentiment.neutral}% Sentimen Netral`
              else if (metric.label === 'Hasil Negatif') val = `${sentiment.negative}% Sentimen Negatif`
            }
            return (
              <div className="metric-row" key={i}>
                <dt className="metric-label">{metric.label}</dt>
                <dd className={`metric-value${metric.cls ? ' ' + metric.cls : ''}`}>{val}</dd>
              </div>
            )
          })}
        </dl>
      )}

      {/* SARAN AI TAB CONTENT */}
      {activeTab === 'saran' && currentTabInfo && (
        <>
          <div className="saran-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '8px 0 20px 0' }}>
            {currentTabInfo.saran.points.map((point, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', lineHeight: '1.5', color: 'var(--black)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '14px', marginTop: '-1px' }}>✦</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
          <p className="saran-disclaimer" style={{ fontSize: '11px', color: 'var(--muted-light)', fontStyle: 'italic', borderTop: '1px solid var(--border-light)', paddingTop: '10px', marginTop: '10px', textAlign: 'center' }}>
            "{currentTabInfo.saran.disclaimer || "Saran dibuat berdasarkan pola data historis dan hanya sebagai referensi."}"
          </p>
        </>
      )}
    </article>
  )
}

