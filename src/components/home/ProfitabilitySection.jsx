import { useState } from 'react'
import { KATEGORI_OPTIONS } from '../../constants/categories'
import { PLATFORM_COMMISSION } from '../../utils/commission'
import { PLATFORM_OPTIONS } from '../../constants/platforms'
import { auth, db } from '../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function ProfitabilitySection() {
  const [cat, setCat] = useState('')
  const [price, setPrice] = useState('')
  const [hpp, setHpp] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [results, setResults] = useState(null)

  const togglePlatform = key => {
    setSelectedPlatforms((prev = []) => {
      if (prev.includes(key)) return prev.filter(k => k !== key)
      if (prev.length >= 2) { alert('Maksimal 2 marketplace!'); return prev }
      return [...prev, key]
    })
  }

  const calculate = async () => {
    if (!cat || !price || !hpp || !selectedPlatforms.length) {
      alert('Lengkapi semua field dan pilih minimal 1 marketplace!')
      return
    }

    const p = parseInt(String(price).replace(/\D/g, '')) || 0
    const h = parseInt(String(hpp).replace(/\D/g, '')) || 0
    const gross = p - h

    const computed = selectedPlatforms.map(key => {
      const { min, max } = PLATFORM_COMMISSION[cat][key]
      const feeMin = p * min / 100
      const feeMax = p * max / 100
      const netMin = gross - feeMax
      const netMax = gross - feeMin
      const marginMin = Math.round(netMin / p * 100)
      const marginMax = Math.round(netMax / p * 100)
      return { key, min, max, feeMin, feeMax, netMin, netMax, marginMin, marginMax }
    })

    setResults({ gross, computed })

    const currentUser = auth.currentUser
    if (currentUser) {
      try {
        await addDoc(collection(db, 'riwayat_simulator'), {
          uid: currentUser.uid,
          kategori: cat,
          kategoriLabel: KATEGORI_OPTIONS.find(k => k.value === cat)?.label || cat,
          harga_jual: p,
          hpp: h,
          gross_profit: gross,
          platforms: computed.map(r => ({
            key: r.key,
            netMin: r.netMin,
            netMax: r.netMax,
            marginMin: r.marginMin,
            marginMax: r.marginMax,
          })),
          createdAt: serverTimestamp(),
        })
      } catch (e) {
        console.error('Gagal simpan riwayat simulator:', e)
      }
    }
  }

  const fmt = n => 'Rp ' + Math.round(n).toLocaleString('id')

  return (
    <section id="simulator" aria-labelledby="simulator-title">
      <div className="section-inner">
        <p className="section-eyebrow">Profitability Simulator</p>
        <h2 id="simulator-title" className="section-title">Hitung estimasi<br />profit bersihmu</h2>
        <div className="form-layout">
          <div className="form-card">
            <div className="form-group">
              <label htmlFor="sim-cat">Kategori Produk</label>
              <select id="sim-cat" value={cat} onChange={e => setCat(e.target.value)}>
                <option value="">Pilih kategori...</option>
                {KATEGORI_OPTIONS.map(k => (
                  <option key={k.value} value={k.value}>{k.label}</option>
                ))}
              </select>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="sim-price">Harga Jual</label>
                <input id="sim-price" type="text" placeholder="Rp 0" value={price} onChange={e => setPrice(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="sim-hpp">HPP</label>
                <input id="sim-hpp" type="text" placeholder="Rp 0" value={hpp} onChange={e => setHpp(e.target.value)} />
              </div>
            </div>

            <fieldset className="form-group">
              <legend>Pilih Marketplace</legend>
              <div className="platform-options">
                {PLATFORM_OPTIONS.map(p => (
                  <button
                    type="button"
                    key={p.key}
                    className={`platform-opt${(selectedPlatforms || []).includes(p.key) ? ' selected' : ''}`}
                    onClick={() => togglePlatform(p.key)}
                  >
                    <img src={p.icon} alt={p.label} width="24" height="24" />
                    {p.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <button className="submit-btn" type="button" onClick={calculate}>Hitung Profit</button>
          </div>

          <aside className="result-preview">
            <article className="result-card" aria-live="polite" aria-label="Estimasi hasil profit">
              <header className="result-header">
                <h3 className="result-title">Estimasi Hasil</h3>
              </header>

              {!results ? (
                <div className="result-empty">
                  <span className="result-empty-icon" aria-hidden="true">🧮</span>
                  <p>Pilih kategori, isi harga, HPP, dan marketplace</p>
                </div>
              ) : (
                <>
                  <div className="metric-row">
                    <span className="metric-label">Harga Jual</span>
                    <span className="metric-value">{fmt(parseInt(String(price).replace(/\D/g, '')) || 0)}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">HPP</span>
                    <span className="metric-value bad">- {fmt(parseInt(String(hpp).replace(/\D/g, '')) || 0)}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">Gross Profit</span>
                    <span className="metric-value">{fmt(results.gross)}</span>
                  </div>

                  <div className="sim-table-wrap">
                    <table className="sim-table">
                      <thead>
                        <tr>
                          <th></th>
                          {results.computed.map(r => {
                            const platform = PLATFORM_OPTIONS.find(p => p.key === r.key)
                            return (
                              <th key={r.key}>
                                <img src={platform.icon} alt={platform.label} width="20" height="20" />
                              </th>
                            )
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Biaya Admin (%)</td>
                          {results.computed.map(r => (
                            <td key={r.key} className="warn">{r.min}%–{r.max}%</td>
                          ))}
                        </tr>
                        <tr>
                          <td>Est. Biaya Admin</td>
                          {results.computed.map(r => (
                            <td key={r.key} className="warn">{fmt(r.feeMin)} – {fmt(r.feeMax)}</td>
                          ))}
                        </tr>
                        <tr>
                          <td>Profit Bersih</td>
                          {results.computed.map(r => (
                            <td key={r.key} className={r.netMin > 0 ? 'good' : 'bad'}>
                              {fmt(r.netMin)} – {fmt(r.netMax)}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td>Margin</td>
                          {results.computed.map(r => (
                            <td key={r.key} className={r.netMin > 0 ? 'good' : 'bad'}>
                              {r.marginMin}%–{r.marginMax}%
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p style={{ fontSize: '11px', color: 'var(--muted-light)', marginTop: '12px', lineHeight: '1.6' }}>
                    * Estimasi biaya administrasi berdasarkan rentang kategori. Tokopedia berdasarkan data riset, Shopee & TikTok Shop berdasarkan informasi publik. Biaya administrasi aktual dapat berbeda.
                  </p>
                </>
              )}
            </article>
          </aside>
        </div>
      </div>
    </section>
  )
}