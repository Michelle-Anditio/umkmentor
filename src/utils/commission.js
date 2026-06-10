export const PLATFORM_COMMISSION = {
  elektronik: {
    label: 'Elektronik',
    tokopedia: { min: 4.0, max: 8.5 },
    shopee: { min: 5.25, max: 10.0 },
    tiktok: { min: 4.0, max: 8.5 },
  },

  pertukangan: {
    label: 'Pertukangan',
    tokopedia: { min: 4.0, max: 8.5 },
    shopee: { min: 10.0, max: 11.7 },
    tiktok: { min: 4.0, max: 8.5 },
  },

  olahraga: {
    label: 'Olahraga',
    tokopedia: { min: 6.0, max: 8.5 },
    shopee: { min: 8.25, max: 10.0 },
    tiktok: { min: 6.0, max: 8.5 },
  },

  fashion: {
    label: 'Fashion',
    tokopedia: { min: 2.5, max: 8.5 },
    shopee: { min: 3.2, max: 11.7 },
    tiktok: { min: 2.5, max: 8.5 },
  },

  makanan_minuman: {
    label: 'Makanan & Minuman',
    tokopedia: { min: 4.0, max: 8.5 },
    shopee: { min: 6.5, max: 10.0 },
    tiktok: { min: 4.0, max: 8.5 },
  },

  kecantikan: {
    label: 'Kecantikan',
    tokopedia: { min: 4.0, max: 8.5 },
    shopee: { min: 8.25, max: 8.25 },
    tiktok: { min: 4.0, max: 8.5 },
  },

  hiburan: {
    label: 'Hiburan',
    tokopedia: { min: 6.0, max: 8.5 },
    shopee: { min: 8.25, max: 9.5 },
    tiktok: { min: 6.0, max: 8.5 },
  },
}

function formatPercent(value) {
  return Number.isInteger(value) ? `${value}%` : `${value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')}%`
}

function formatCommissionRange(range) {
  if (range.min === range.max) {
    return formatPercent(range.min)
  }

  return `${formatPercent(range.min)} – ${formatPercent(range.max)}`
}

export function getCommissionRange(categoryKey, platform = 'tokopedia') {
  const data = PLATFORM_COMMISSION[categoryKey]

  if (!data || !data[platform]) {
    return {
      label: 'Kategori tidak diketahui',
      rangeText: 'Belum tersedia',
      disclaimer:
        'Estimasi biaya administrasi berdasarkan range kategori. Biaya administrasi aktual bisa berbeda tergantung sub-kategori produk.',
    }
  }

  return {
    label: data.label,
    rangeText: formatCommissionRange(data[platform]),
    disclaimer:
      'Estimasi biaya administrasi berdasarkan range kategori. Biaya administrasi aktual bisa berbeda tergantung sub-kategori produk.',
  }
}