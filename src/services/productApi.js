import { API_URL } from './apiConfig'

export async function predictProduct({
  kategori,
  harga_jual,
  discounted_price,
  stok,
  is_official,
  gold_merchant,
  rating_average,
}) {
  const response = await fetch(`${API_URL}/predict-product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      kategori,
      harga_jual,
      stok,
      is_official,
      gold_merchant,
      rating_average,
      discounted_price,
    }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}