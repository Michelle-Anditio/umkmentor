import { steps } from '../../constants/homeContent'

export default function HowItWorksSection() {
  return (
    <section id="cara-kerja" aria-labelledby="cara-kerja-title">
      <div className="section-inner">
        <p className="section-eyebrow">Cara Kerja</p>
        <h2 id="cara-kerja-title" className="section-title">3 langkah menuju<br />strategi yang tepat</h2>
        <ol className="steps-grid">
          {steps.map(step => (
            <li className="step-card" key={step.num}>
              <span className="step-num" aria-hidden="true">{step.num}</span>
              <span className="step-icon" aria-hidden="true">{step.icon}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
