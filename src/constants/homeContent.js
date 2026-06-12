import sariDewi from '../assets/sari-dewi.jpg'
import budiSantoso from '../assets/budi-santoso.jpg'
import rinaHalim from '../assets/rina-halim.jpg'

export const featurePreviews = {
  potensi: {
    title: 'Potensi Produk',
    subtitle: 'Kategori: Kecantikan',
    metrics: [
      { label: 'Prediksi Model AI', value: 'Berpotensi Laku', cls: 'good' },
      { label: 'Peluang Laku', value: '85%', cls: 'good' },
      { label: 'Tingkat Risiko', value: 'Rendah', cls: 'good' },
      { label: 'Harga Pasar Kategori Kategori', value: 'Rp 52.000', cls: '' },
    ],
    insight: 'Berdasarkan model klasifikasi AI, produk kecantikan dengan harga jual Rp 55.000 memiliki peluang laku tinggi. Sesuaikan harga diskon dan tingkatkan ulasan positif untuk mengoptimalkan potensi.',
  },
  harga: {
    title: 'Simulasi Harga & Biaya Administrasi',
    subtitle: 'Harga jual: Rp 55.000',
    metrics: [
      { label: 'Harga jual', value: 'Rp 55.000', cls: '' },
      { label: 'Biaya Administrasi Shopee (6.5%)', value: '- Rp 3.575', cls: 'bad' },
      { label: 'Biaya pengemasan', value: '- Rp 3.000', cls: 'bad' },
      { label: 'HPP produk', value: '- Rp 20.000', cls: 'bad' },
      { label: 'Keuntungan bersih', value: 'Rp 28.425 (51.7%)', cls: 'good' },
    ],
    insight: 'Margin 51.7% sangat sehat! Simulasi biaya menunjukkan sisa profit bersih yang aman untuk alokasi pemasaran tambahan.',
  },
  kompetitor: {
    title: 'Market Insight',
    subtitle: 'Kategori: Kecantikan',
    metrics: [
      { label: 'Kategori Produk', value: 'Kecantikan', cls: '' },
      { label: 'Stok Pasar Kategori', value: '72% produk laku', cls: 'good' },
      { label: 'Harga Pasar Kategori', value: 'Rp 52.000', cls: '' },
      { label: 'Tingkat Risiko Kategori', value: 'Rendah', cls: 'good' },
    ],
    insight: 'Kondisi pasar sangat potensial berdasarkan stok pasar kategori yang stabil. Hindari perang harga ekstrem dan fokuslah pada optimasi rating dan ulasan positif.',
  },
  sentimen: {
    title: 'Analisis Sentimen Ulasan',
    subtitle: 'Simulasi Teks Ulasan Pembeli',
    isSentimen: true,
    sentimentData: {
      positive: 76,
      neutral: 12,
      negative: 12
    },
    metrics: [
      { label: 'Pujian Terbanyak', value: 'Kualitas & Khasiat Sesuai', cls: 'good' },
      { label: 'Keluhan Terbanyak', value: 'Durasi Pengiriman Lambat', cls: 'bad' },
    ],
    insight: 'Analisis teks mengidentifikasi kepuasan tinggi pada aspek kualitas produk, sementara keluhan terfokus pada logistik pengiriman. Ini peluang diferensiasi layanan!',
  },
  platform: {
    title: 'Rekomendasi Platform',
    subtitle: 'Berdasarkan analisis biaya administrasi',
    metrics: [
      { label: 'Platform Profit Terbaik', value: 'Tokopedia (Margin 53.2%)', cls: 'good' },
      { label: 'Shopee (Biaya Admin 6.5%)', value: 'Profit Rp 28.425', cls: '' },
      { label: 'Tokopedia (Biaya Admin 5.0%)', value: 'Profit Rp 29.250', cls: 'good' },
      { label: 'TikTok Shop (Biaya Admin 8.0%)', value: 'Profit Rp 27.600', cls: 'warn' },
    ],
    insight: 'Rekomendasi didasarkan pada biaya administrasi platform terendah agar profit bersih kamu maksimal. Gunakan sebagai bahan pertimbangan biaya.',
  },
}

export const featureItems = [
  { key: 'potensi', icon: '📊', title: 'Analisis Potensi Produk', desc: 'Tau seberapa laku produkmu di pasaran sebelum keluar modal.' },
  { key: 'harga', icon: '💰', title: 'Simulasi Harga & Biaya Admin', desc: 'Hitung keuntungan setelah dikurangi biaya administrasi platform secara otomatis.' },
  { key: 'kompetitor', icon: '🔍', title: 'Market Insight', desc: 'Lihat kondisi pasar, tren kategori, dan posisi produk sebelum mulai berjualan.' },
  { key: 'sentimen', icon: '💬', title: 'Analisis Sentimen Ulasan', desc: 'Bukan sekadar rating bintang — melainkan dari analisis isi teks ulasan pembeli.' },
  { key: 'platform', icon: '🏪', title: 'Rekomendasi Platform', desc: 'Membandingkan estimasi profit bersih tiap platform berdasarkan harga jual, HPP, dan biaya administrasi.' },
]

export const heroAnalysisItems = [
  { icon: '📈', label: 'Hasil Prediksi', sub: 'Peluang laku 85% dari simulasi', pct: 85, cls: '' },
  { icon: '💰', label: 'Simulasi Profit', sub: 'Hingga 50%+ potensi margin bersih', pct: 72, cls: 'progress-fill--green' },
  { icon: '⭐', label: 'Analisis Sentimen', sub: '76% ulasan positif disorot', pct: 76, cls: 'progress-fill--gold' },
  { icon: '🏆', label: 'Pilihan Platform', sub: 'Bandingkan biaya admin & profit', pct: 90, cls: 'progress-fill--orange' },
]

export const steps = [
  { num: '01', icon: '📝', title: 'Input Produk & Budget', desc: 'Ceritain produk yang mau kamu jual, harga, stok, dan modal. Cukup beberapa menit.' },
  { num: '02', icon: '✦', title: 'AI Analisis Data', desc: 'AI kami menganalisis 11.700+ data produk Tokopedia untuk kasih insight yang akurat.' },
  { num: '03', icon: '🚀', title: 'Terima Strategi Lengkap', desc: 'Dapatkan prediksi laku/tidak, simulasi biaya administrasi platform, dan analisis sentimen ulasan.' },
]

export const experts = [
  { name: 'Sari Dewi', title: 'Business Strategist · 8 tahun pengalaman', tags: ['Shopee', 'Skincare', 'Branding'], rating: '4.9', sesi: '120', src: sariDewi },
  { name: 'Budi Santoso', title: 'E-commerce Specialist · 6 tahun', tags: ['Tokopedia', 'Fashion', 'Ads'], rating: '4.8', sesi: '89', src: budiSantoso },
  { name: 'Rina Halim', title: 'UMKM Mentor · 10 tahun', tags: ['F&B', 'TikTok Shop', 'Packaging'], rating: '5.0', sesi: '200', src: rinaHalim },
]
