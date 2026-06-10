import ResultCard from './ResultCard'
import { KATEGORI_OPTIONS } from '../../constants/categories'

export default function ProductAnalysisSection({
  formData,
  setFormData,
  runAnalysis,
  analysisState,
  resultData,
  productData,
  sentimentData,
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
              <div className="form-group">
                <label htmlFor="input-rating">Rating Rata-rata</label>
                <input
                  id="input-rating"
                  type="number"
                  placeholder="5.0"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating_average}
                  onChange={e => setFormData(f => ({ ...f, rating_average: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <label className={`platform-opt${formData.is_official ? ' selected' : ''}`}>
                <input
                  type="checkbox"
                  checked={formData.is_official}
                  onChange={e => setFormData(f => ({ ...f, is_official: e.target.checked }))}
                  className="sr-only"
                />
                🏢 Official Store
              </label>
              <label className={`platform-opt${formData.gold_merchant ? ' selected' : ''}`}>
                <input
                  type="checkbox"
                  checked={formData.gold_merchant}
                  onChange={e => setFormData(f => ({ ...f, gold_merchant: e.target.checked }))}
                  className="sr-only"
                />
                📢 Gold Merchant
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="input-deskripsi">Ceritakan Produkmu <span className="label-optional">(opsional)</span></label>
              <textarea
                id="input-deskripsi"
                placeholder="Keunggulan produk, bahan baku, dll..."
                value={formData.deskripsi}
                onChange={e => setFormData(f => ({ ...f, deskripsi: e.target.value }))}
              />
            </div>

            <button className="submit-btn" type="button" onClick={runAnalysis}>
              Analisis Sekarang
            </button>
          </div>

          <aside className="result-preview">
            <ResultCard
              analysisState={analysisState}
              resultData={resultData}
              productData={productData}
              sentimentData={sentimentData}
            />
          </aside>
        </div>
      </div>
    </section>
  )
}