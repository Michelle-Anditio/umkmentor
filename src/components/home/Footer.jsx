const footerLinks = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Konsultasi', href: '#konsultasi' },
  { label: 'Tentang Kami', href: '#' },
]

export default function Footer({ onAboutClick }) {
  return (
    <footer>
      <div className="footer-center">
        <p className="footer-brand"><span className="footer-logo-dot">●</span> UMKMentor</p>
        <nav className="footer-nav">
          {footerLinks.map(link => {
            if (link.label === 'Tentang Kami') {
              return (
                <a 
                  key={link.label} 
                  href="#" 
                  onClick={e => {
                    e.preventDefault();
                    if (onAboutClick) onAboutClick();
                  }}
                >
                  {link.label}
                </a>
              )
            }
            return <a key={link.label} href={link.href}>{link.label}</a>
          })}
        </nav>
        <small className="footer-copy">© 2026 UMKMentor. Capstone Project.</small>
      </div>
    </footer>
  )
}
