import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

export default function Navbar({ user, navOpen, onToggleNav }) {
  return (
    <header className="home-header">
      <nav>
        <Link to="/" className="nav-logo">
          <span className="logo-dot" aria-hidden="true"></span>
          UMKMentor
        </Link>

        <ul className={`nav-links${navOpen ? ' open' : ''}`}>
          <li><a href="#cara-kerja">Cara Kerja</a></li>
          <li><a href="#fitur">Fitur</a></li>
          <li><a href="#konsultasi">Konsultasi</a></li>
          <li><a href="#pakar">Pakar</a></li>

          {user ? (
            <>
              <li>
                <Link to="/profile" className="nav-cta-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" width="20" height="20" style={{ borderRadius: '50%' }} />
                  ) : '👤'}
                  {user.displayName?.split(' ')[0] || 'Profil'}
                </Link>
              </li>
              <li>
                <button
                  className="nav-cta"
                  onClick={() => signOut(auth)}
                  style={{ background: 'none', border: '1.5px solid rgba(255,255,255,0.08)', color: '#F9F9F7', padding: '10px 22px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                >
                  Keluar
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-cta-outline">Masuk</Link></li>
              <li><Link to="/register" className="nav-cta">Daftar</Link></li>
            </>
          )}
        </ul>

        <button
          className={`nav-hamburger${navOpen ? ' open' : ''}`}
          aria-label="Menu"
          onClick={onToggleNav}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>
  )
}
