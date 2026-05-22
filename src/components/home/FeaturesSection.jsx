import FeaturePreview from './FeaturePreview'
import { featureItems, featurePreviews } from '../../constants/homeContent'

export default function FeaturesSection({ activeFeature, onChangeFeature }) {
  return (
    <section id="fitur" aria-labelledby="fitur-title">
      <div className="section-inner">
        <p className="section-eyebrow">Fitur Unggulan</p>
        <h2 id="fitur-title" className="section-title">Semua yang kamu butuhkan<br />untuk mulai jualan</h2>
        <div className="features-layout">
          <nav className="features-list" aria-label="Navigasi fitur">
            {featureItems.map(feature => (
              <button
                key={feature.key}
                className={`feature-item${activeFeature === feature.key ? ' active' : ''}`}
                onClick={() => onChangeFeature(feature.key)}
              >
                <span className="feature-icon-wrap" aria-hidden="true">{feature.icon}</span>
                <div>
                  <p className="feature-title">{feature.title}</p>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </button>
            ))}
          </nav>
          <aside className="features-preview">
            <FeaturePreview data={featurePreviews[activeFeature]} />
          </aside>
        </div>
      </div>
    </section>
  )
}
