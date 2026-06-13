import { useState, useRef, useEffect } from 'react'
import { sendKonsultasi } from '../../src/services/konsultasiApi'

export default function KonsultasiChat({ productData, sentimentData, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: productData
        ? `Halo! Saya sudah melihat hasil analisis produk kamu. Prediksi AI: **${productData.prediction}** dengan peluang laku **${productData.laku_score}%**. Ada yang ingin ditanyakan?`
        : 'Halo! Saya UMKMentor AI. Ada yang bisa saya bantu?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // Drag state
  const [pos, setPos] = useState({ x: window.innerWidth - 420, y: 80 })
  const dragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function onMouseDown(e) {
    dragging.current = true
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  function onMouseMove(e) {
    if (!dragging.current) return
    setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y })
  }

  function onMouseUp() {
    dragging.current = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  const analysisContext = productData
    ? {
        prediksi: productData.prediction,
        peluang_laku: `${productData.laku_score}%`,
        tingkat_risiko: productData.risk_level,
        harga_pasar_kategori: `Rp ${productData.harga_median_cat?.toLocaleString('id')}`,
        stok_pasar_kategori: `${productData.stock_median_cat} unit`,
        pct_official_store: `${productData.cat_pct_official}%`,
        ...(sentimentData && {
          sentimen_positif: `${sentimentData.positive}%`,
          sentimen_negatif: `${sentimentData.negative}%`,
        }),
      }
    : null

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMsg = { role: 'user', content: trimmed }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const reply = await sendKonsultasi(
        updated.map(({ role, content }) => ({ role, content })),
        analysisContext
      )
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function formatText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '$1')
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: '380px',
        height: '520px',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9999,
        overflow: 'hidden',
        border: '1px solid #E5E7EB',
        userSelect: dragging.current ? 'none' : 'auto',
      }}
    >
      {/* Header — draggable */}
      <div
        onMouseDown={onMouseDown}
        style={{
          background: 'var(--accent)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'grab',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: '800', fontSize: '14px', color: '#fff' }}>
              UMKMentor AI
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>
              {productData ? 'Konteks analisis dimuat' : 'Konsultan UMKM'}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '2px 6px' }}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#F9F9F7' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div
              style={{
                maxWidth: '82%',
                padding: '10px 14px',
                borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                background: msg.role === 'user' ? 'var(--accent)' : '#fff',
                border: msg.role === 'assistant' ? '1px solid #E5E7EB' : 'none',
                color: msg.role === 'user' ? '#fff' : '#111',
                fontSize: '13px',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              {formatText(msg.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '10px 14px', borderRadius: '14px 14px 14px 4px', background: '#fff', border: '1px solid #E5E7EB', color: '#9CA3AF', fontSize: '12px' }}>
              ⚙️ Mengetik...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '12px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '8px', background: '#fff', flexShrink: 0 }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik pesan..."
          rows={1}
          style={{
            flex: 1, padding: '10px 12px', borderRadius: '10px',
            border: '1.5px solid #E5E7EB', background: '#F9F9F7',
            color: '#111', fontSize: '13px', fontFamily: 'var(--font-body)',
            resize: 'none', outline: 'none', lineHeight: '1.5',
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            background: loading || !input.trim()
              ? 'rgba(232,82,10,0.35)'
              : 'var(--accent)',
            color: '#fff',
            border: 'none',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            fontSize: '12px',
            fontWeight: '600',
            height: '32px',
            lineHeight: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Kirim
        </button>
      </div>
    </div>
  )
}