export const PLATFORM_COMMISSION = {
  elektronik: {
    label: 'Elektronik',
    tokopedia: { min: 4.0, max: 8.5 },
    shopee:    { min: 2.5, max: 8.0 },
    tiktok:    { min: 4.0, max: 8.0 },
  },
  pertukangan: {
    label: 'Pertukangan',
    tokopedia: { min: 4.0, max: 8.5 },
    shopee:    { min: 4.0, max: 7.5 },
    tiktok:    { min: 4.0, max: 8.0 },
  },
  olahraga: {
    label: 'Olahraga',
    tokopedia: { min: 6.0, max: 8.5 },
    shopee:    { min: 5.5, max: 8.0 },
    tiktok:    { min: 6.0, max: 8.0 },
  },
  fashion: {
    label: 'Fashion',
    tokopedia: { min: 2.5, max: 8.5 },
    shopee:    { min: 2.5, max: 8.0 },
    tiktok:    { min: 5.0, max: 8.0 },
  },
  makanan_minuman: {
    label: 'Makanan & Minuman',
    tokopedia: { min: 4.0, max: 8.5 },
    shopee:    { min: 2.5, max: 6.5 },
    tiktok:    { min: 4.0, max: 6.97 },
  },
  kecantikan: {
    label: 'Kecantikan',
    tokopedia: { min: 4.0, max: 8.5 },
    shopee:    { min: 5.5, max: 8.0 },
    tiktok:    { min: 6.0, max: 8.0 },
  },
  hiburan: {
    label: 'Hiburan',
    tokopedia: { min: 6.0, max: 8.5 },
    shopee:    { min: 4.0, max: 7.5 },
    tiktok:    { min: 4.0, max: 8.0 },
  },
}

export function getCommissionRange(categoryKey, platform = 'tokopedia') {
  const data = PLATFORM_COMMISSION[categoryKey]

  if (!data || !data[platform]) {
    return {
      label: 'Kategori tidak diketahui',
      rangeText: 'Belum tersedia',
      disclaimer: 'Estimasi fee berdasarkan range kategori. Komisi aktual bisa berbeda tergantung sub-kategori produk.',
    }
  }

  return {
    label: data.label,
    rangeText: `${data[platform].min}% – ${data[platform].max}%`,
    disclaimer: 'Estimasi fee berdasarkan range kategori. Komisi aktual bisa berbeda tergantung sub-kategori produk.',
  }
}