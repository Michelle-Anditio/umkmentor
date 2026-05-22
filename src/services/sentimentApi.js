import { API_URL } from './apiConfig'

export async function predictSentiment(reviews) {
  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reviews }),
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response.json()
}
