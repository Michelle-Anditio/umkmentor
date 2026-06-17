import { useEffect } from 'react'

const members = [
  {
    name: 'Michael Andreas Tjendra',
    role: 'ML Product',
    linkedin: 'https://www.linkedin.com/in/michael-andreas-tjendra/'
  },
  {
    name: 'Juanda Harefa',
    role: 'ML Product',
    linkedin: 'https://www.linkedin.com/in/juanda-harefa-04621331b/'
  },
    {
    name: 'Michelle Anditio',
    role: 'Frontend & Backend',
    linkedin: 'https://www.linkedin.com/in/michelle-anditio/'
  },
  {
    name: 'Adinda Intan Erlita',
    role: 'ML Sentiment',
    linkedin: 'https://www.linkedin.com/in/adinda-intan-erlita/'
  },
  {
    name: 'Jerry Lim',
    role: 'ML Sentiment',
    linkedin: 'https://www.linkedin.com/in/jerry-lim-29982132/'
  }
]

export default function AboutModal({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="about-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="about-modal-container">
        <button
          className="about-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <header className="about-modal-header">
          <h2 className="about-modal-title">About UMKMentor</h2>

          <p className="about-modal-subtitle">
            AI-powered business intelligence platform for beginner online sellers.
          </p>

          <div className="about-capstone-group">
            <p className="about-team-title">
              ID Team: PJK-GM006
            </p>

            <p className="about-capstone-info">
              Capstone Project 2026 • IBM SkillsBuild × Pijak
            </p>
          </div>
        </header>

        <div className="about-modal-body">
          <h4 className="about-section-heading">Meet the Team</h4>

          <div className="about-members-grid">
            {members.map((member) => (
              <div
                key={member.linkedin}
                className="about-member-card"
              >
                <div
                  className="about-member-avatar"
                  aria-hidden="true"
                >
                  {member.name.charAt(0)}
                </div>

                <h5 className="about-member-name">
                  {member.name}
                </h5>

                <p className="about-member-role">
                  {member.role}
                </p>

                <div className="about-member-links">
                  <span className="find-me-label">
                    Find me:
                  </span>

                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            ))}
          </div>

          <footer className="about-modal-footer">
            <p className="about-stack-line">
              Built with React • Vite • FastAPI • XGBoost • Linear SVM • Firebase • Google Cloud Run
            </p>

            <p className="about-stack-line">
              UMKMentor helps beginner online sellers make better business decisions through AI-powered product analysis, profitability simulation, market insights, and sentiment analysis.
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}