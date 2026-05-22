import { PLATFORM_KOMISI } from '../constants/platforms'

export function hitungKomisi(hargaJual, modalAwal, platformKey) {
  const harga = parseInt(hargaJual) || 0
  const modal = parseInt(modalAwal) || 0
  const komisiPct = PLATFORM_KOMISI[platformKey] || 0
  const komisiRp = Math.round((harga * komisiPct) / 100)
  const untung = harga - modal - komisiRp
  const marginPct = harga > 0 ? Math.round((untung / harga) * 100) : 0

  return { komisiPct, komisiRp, untung, marginPct }
}
