import { useState } from 'react'

export default function FeaturePreview({ data }) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <article className="preview-card" aria-live="polite">
      <nav className="tab-nav" aria-label="Tab preview fitur">
        {['overview', 'detail', 'saran'].map(tab => (
          <button
            key={tab}
            className={`tab-btn${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'overview' ? 'Overview' : tab === 'detail' ? 'Detail' : 'Saran AI'}
          </button>
        ))}
      </nav>

      <header>
        <div className="preview-title">{data.title}</div>
        <div className="preview-subtitle">{data.subtitle}</div>
      </header>

      {data.isSentimen && (
        <>
          <div className="sentiment-bar">
            <div className="sent-pos"></div>
            <div className="sent-neu"></div>
            <div className="sent-neg"></div>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '11px', marginBottom: '16px' }}>
            <span style={{ color: 'var(--green)' }}>● 70% Positif</span>
            <span style={{ color: 'var(--accent2)' }}>● 20% Netral</span>
            <span style={{ color: '#EF4444' }}>● 10% Negatif</span>
          </div>
        </>
      )}

      <dl className="metrics-list">
        {data.metrics.map((metric, i) => (
          <div className="metric-row" key={i}>
            <dt className="metric-label">{metric.label}</dt>
            <dd className={`metric-value${metric.cls ? ' ' + metric.cls : ''}`}>{metric.value}</dd>
          </div>
        ))}
      </dl>

      <aside className="insight-box">
        <p className="insight-title">💡 Insight AI</p>
        <p className="insight-text">{data.insight}</p>
      </aside>
    </article>
  )
}
