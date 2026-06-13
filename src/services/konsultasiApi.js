import { API_URL } from './apiConfig'

export async function sendKonsultasi(messages, analysisContext = null) {
  const response = await fetch(`${API_URL}/konsultasi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, analysis_context: analysisContext }),
  })

  if (!response.ok) throw new Error('Gagal menghubungi konsultan AI')

  const data = await response.json()
  if (data.error) throw new Error(data.error)

  return data.reply
}