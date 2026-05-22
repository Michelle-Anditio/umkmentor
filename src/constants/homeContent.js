import sariDewi from '../assets/sari-dewi.jpg'
import budiSantoso from '../assets/budi-santoso.jpg'
import rinaHalim from '../assets/rina-halim.jpg'

export const featurePreviews = {
  potensi: {
    title: 'Potensi Produk',
    subtitle: 'Skincare — Serum Vitamin C',
    metrics: [
      { label: 'Volume pasar/bulan', value: '12.400 unit', cls: 'good' },
      { label: 'Tingkat kompetisi', value: 'Sedang', cls: 'warn' },
      { label: 'Tren 3 bulan terakhir', value: '↑ Naik 23%', cls: 'good' },
      { label: 'Rata-rata harga jual', value: 'Rp 52.000', cls: '' },
    ],
    insight: 'Produk ini punya potensi bagus! Permintaan sedang naik dan kompetisi masih bisa ditembus. Fokus ke diferensiasi packaging dan konten edukasi untuk memenangkan pasar.',
  },
  harga: {
    title: 'Simulasi Harga & Komisi',
    subtitle: 'Harga jual: Rp 55.000',
    metrics: [
      { label: 'Harga jual', value: 'Rp 55.000', cls: '' },
      { label: 'Komisi Shopee (6.5%)', value: '- Rp 3.575', cls: 'bad' },
      { label: 'Biaya pengemasan', value: '- Rp 3.000', cls: 'bad' },
      { label: 'HPP produk', value: '- Rp 20.000', cls: 'bad' },
      { label: 'Keuntungan bersih', value: 'Rp 28.425 (52%)', cls: 'good' },
    ],
    insight: 'Margin 52% sangat sehat! Kamu masih bisa kasih diskon 10% dan tetap untung.',
  },
  kompetitor: {
    title: 'Insight Kompetitor',
    subtitle: 'Top seller kategori ini',
    metrics: [
      { label: 'Toko A', value: 'Rp 45rb · 8.200 terjual', cls: '' },
      { label: 'Toko B', value: 'Rp 62rb · 4.100 terjual', cls: '' },
      { label: 'Toko C', value: 'Rp 38rb · 12.000 terjual', cls: '' },
      { label: 'Rata-rata harga', value: 'Rp 48.000', cls: '' },
    ],
    insight: 'Toko C dominan dengan harga murah. Fokus ke kualitas dan branding — bukan perang harga.',
  },
  sentimen: {
    title: 'Analisis Sentimen Review',
    subtitle: 'Dari 3.200 review teks',
    isSentimen: true,
    metrics: [
      { label: 'Pujian terbanyak', value: 'Produknya sesuai', cls: 'good' },
      { label: 'Keluhan terbanyak', value: 'Pengiriman lama', cls: 'bad' },
    ],
    insight: 'Review positif dominan soal khasiat. Keluhan soal logistik — bukan produknya. Ini peluang!',
  },
  platform: {
    title: 'Rekomendasi Platform',
    subtitle: 'Untuk kategori Skincare',
    metrics: [
      { label: '🛍️ Shopee', value: '⭐ Terbaik — Komisi 6.5%', cls: 'good' },
      { label: '🟢 Tokopedia', value: 'Bagus — Komisi 5.5%', cls: 'warn' },
      { label: '🎵 TikTok Shop', value: 'Potential — Komisi 8%', cls: '' },
      { label: 'Traffic Shopee/bulan', value: '92 juta pengunjung', cls: '' },
    ],
    insight: 'Mulai di Shopee — traffic paling tinggi untuk skincare. Setelah stabil, ekspansi ke TikTok Shop.',
  },
}

export const featureItems = [
  { key: 'potensi', icon: '📊', title: 'Analisis Potensi Produk', desc: 'Tau seberapa laku produkmu di pasaran sebelum keluar modal.' },
  { key: 'harga', icon: '💰', title: 'Simulasi Harga & Komisi', desc: 'Hitung keuntungan setelah dipotong komisi platform secara otomatis.' },
  { key: 'kompetitor', icon: '🔍', title: 'Insight Kompetitor', desc: 'Lihat siapa yang jual produk serupa dan strategi harga mereka.' },
  { key: 'sentimen', icon: '💬', title: 'Analisis Sentimen Review', desc: 'Bukan dari rating bintang — tapi dari isi teks review yang sebenarnya.' },
  { key: 'platform', icon: '🏪', title: 'Rekomendasi Platform', desc: 'Shopee, Tokopedia, atau TikTok Shop — mana yang paling cocok untuk produkmu?' },
]

export const heroAnalysisItems = [
  { icon: '📈', label: 'Potensi Pasar', sub: '12.400 produk serupa terjual/bulan', pct: 82, cls: '' },
  { icon: '💰', label: 'Harga Optimal', sub: 'Rp 45.000 – 75.000', pct: 68, cls: 'progress-fill--green' },
  { icon: '⭐', label: 'Sentimen Review', sub: '78% positif dari 3.200 review', pct: 78, cls: 'progress-fill--gold' },
  { icon: '🏆', label: 'Platform Terbaik', sub: 'Shopee — komisi 6.5%, traffic tinggi', pct: 91, cls: 'progress-fill--orange' },
]

export const steps = [
  { num: '01', icon: '📝', title: 'Input Produk & Budget', desc: 'Ceritain produk yang mau kamu jual, harga, stok, dan modal. Cukup beberapa menit.' },
  { num: '02', icon: '🤖', title: 'AI Analisis Data', desc: 'AI kami menganalisis 11.700+ data produk Tokopedia untuk kasih insight yang akurat.' },
  { num: '03', icon: '🚀', title: 'Terima Strategi Lengkap', desc: 'Dapatkan prediksi laku/tidak, simulasi komisi platform, dan insight sentimen review.' },
]

export const experts = [
  { name: 'Sari Dewi', title: 'Business Strategist · 8 tahun pengalaman', tags: ['Shopee', 'Skincare', 'Branding'], rating: '4.9', sesi: '120', src: sariDewi },
  { name: 'Budi Santoso', title: 'E-commerce Specialist · 6 tahun', tags: ['Tokopedia', 'Fashion', 'Ads'], rating: '4.8', sesi: '89', src: budiSantoso },
  { name: 'Rina Halim', title: 'UMKM Mentor · 10 tahun', tags: ['F&B', 'TikTok Shop', 'Packaging'], rating: '5.0', sesi: '200', src: rinaHalim },
]
