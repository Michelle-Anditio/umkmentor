import { API_URL } from './apiConfig'

export async function predictProduct({
  kategori,
  harga_jual,
  harga_diskon,
  stok,
  is_official,
  rating_average,
  is_topads,
}) {
  const response = await fetch(`${API_URL}/predict-product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      kategori,
      harga_jual,
      harga_diskon,
      stok,
      is_official,
      rating_average,
      is_topads,
    }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}