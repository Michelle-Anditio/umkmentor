import { API_URL } from './apiConfig'

export async function predictProduct({ kategori, harga_jual, is_official, gold_merchant, discount_pct, stok }) {
  const response = await fetch(`${API_URL}/predict-product`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kategori, harga_jual, is_official, gold_merchant, discount_pct, stok }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}
