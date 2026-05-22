import ResultCard from './ResultCard'
import { KATEGORI_OPTIONS } from '../../constants/categories'
import { PLATFORM_OPTIONS } from '../../constants/platforms'

export default function ProductAnalysisSection({
  formData,
  setFormData,
  platforms,
  togglePlatform,
  runAnalysis,
  analysisState,
  resultData,
  productData,
  sentimentData,
  selectedPlatforms,
}) {
  return (
    <section id="analisis" aria-labelledby="analisis-title">
      <div className="section-inner">
        <p className="section-eyebrow">Coba Sekarang</p>
        <h2 id="analisis-title" className="section-title">Analisis produkmu<br />dalam 60 detik</h2>
        <div className="form-layout">
          <div className="form-card">
            <div className="form-group">
              <label htmlFor="input-produk">Kategori Produk</label>
              <select id="input-produk" value={formData.produk} onChange={e => setFormData(f => ({ ...f, produk: e.target.value }))}>
                <option value="">Pilih kategori produk...</option>
                {KATEGORI_OPTIONS.map(kategori => (
                  <option key={kategori.value} value={kategori.value}>{kategori.label}</option>
                ))}
              </select>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="input-harga">Harga Jual Target</label>
                <input
                  id="input-harga"
                  type="text"
                  placeholder="Rp 0"
                  value={formData.harga}
                  onChange={e => setFormData(f => ({ ...f, harga: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-modal">Modal Awal <span className="label-optional">(opsional)</span></label>
                <input
                  id="input-modal"
                  type="text"
                  placeholder="Rp 0"
                  value={formData.modal}
                  onChange={e => setFormData(f => ({ ...f, modal: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="input-diskon">Diskon (%)</label>
                <input
                  id="input-diskon"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="80"
                  value={formData.diskon}
                  onChange={e => setFormData(f => ({ ...f, diskon: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-stok">Stok (unit)</label>
                <input
                  id="input-stok"
                  type="number"
                  placeholder="100"
                  min="0"
                  value={formData.stok}
                  onChange={e => setFormData(f => ({ ...f, stok: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <label
                className={`platform-opt${formData.is_official ? ' selected' : ''}`}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <input
                  type="checkbox"
                  checked={formData.is_official}
                  onChange={e => setFormData(f => ({ ...f, is_official: e.target.checked }))}
                  style={{ display: 'none' }}
                />
                🏢 Official Store
              </label>
              <label
                className={`platform-opt${formData.gold_merchant ? ' selected' : ''}`}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                <input
                  type="checkbox"
                  checked={formData.gold_merchant}
                  onChange={e => setFormData(f => ({ ...f, gold_merchant: e.target.checked }))}
                  style={{ display: 'none' }}
                />
                ⭐ Gold Merchant
              </label>
            </div>

            <fieldset className="form-group">
              <legend>Platform yang Diminati <span className="label-optional">(untuk simulasi komisi)</span></legend>
              <div className="platform-options">
                {PLATFORM_OPTIONS.map(platform => (
                  <label key={platform.key} className={`platform-opt${platforms[platform.key] ? ' selected' : ''}`} onClick={() => togglePlatform(platform.key)}>
                    <input type="checkbox" name="platform" value={platform.key} checked={platforms[platform.key]} onChange={() => {}} className="sr-only" />
                    <img src={platform.icon} alt={platform.label} width="24" height="24" />
                    {platform.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-group">
              <label htmlFor="input-deskripsi">Ceritakan Produkmu <span className="label-optional">(opsional)</span></label>
              <textarea
                id="input-deskripsi"
                placeholder="Keunggulan produk, bahan baku, dll..."
                value={formData.deskripsi}
                onChange={e => setFormData(f => ({ ...f, deskripsi: e.target.value }))}
              ></textarea>
            </div>

            <button className="submit-btn" type="button" onClick={runAnalysis}>
              🤖 Analisis Sekarang
            </button>
          </div>

          <aside className="result-preview">
            <ResultCard
              analysisState={analysisState}
              resultData={resultData}
              productData={productData}
              sentimentData={sentimentData}
              selectedPlatforms={selectedPlatforms}
            />
          </aside>
        </div>
      </div>
    </section>
  )
}
