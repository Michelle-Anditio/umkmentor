export const CATEGORY_COMMISSION_RANGES = {
  elektronik: {
    label: 'Elektronik',
    min: 2.5,
    max: 8.5,
  },
  pertukangan: {
    label: 'Pertukangan',
    min: 4.0,
    max: 8.5,
  },
  olahraga: {
    label: 'Olahraga',
    min: 6.0,
    max: 8.5,
  },
  fashion: {
    label: 'Fashion',
    min: 2.5,
    max: 8.5,
  },
  makanan_minuman: {
    label: 'Makanan & Minuman',
    min: 4.0,
    max: 8.5,
  },
  kecantikan: {
    label: 'Kecantikan',
    min: 4.0,
    max: 8.5,
  },
  hiburan: {
    label: 'Hiburan',
    min: 6.0,
    max: 8.5,
  },
}

export function getCommissionRange(categoryKey) {
  const data = CATEGORY_COMMISSION_RANGES[categoryKey]

  if (!data) {
    return {
      label: 'Kategori tidak diketahui',
      rangeText: 'Belum tersedia',
      disclaimer:
        'Estimasi fee berdasarkan range kategori. Komisi aktual bisa berbeda tergantung sub-kategori produk.',
    }
  }

  return {
    label: data.label,
    rangeText: `${data.min}% – ${data.max}%`,
    disclaimer:
      'Estimasi fee berdasarkan range kategori. Komisi aktual bisa berbeda tergantung sub-kategori produk.',
  }
}