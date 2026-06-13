import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  onAuthStateChanged, signOut, updateProfile,
  updatePassword, reauthenticateWithCredential,
  EmailAuthProvider, sendPasswordResetEmail
} from 'firebase/auth'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { auth, db } from '../firebase'
import '../css/auth.css'
import '../css/style.css'
import '../css/profile.css'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [navOpen, setNavOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editName, setEditName] = useState('')
  const [saveState, setSaveState] = useState('idle')
  const [riwayat, setRiwayat] = useState([])
  const [selectedRiwayat, setSelectedRiwayat] = useState(null)
  const [riwayatSimulator, setRiwayatSimulator] = useState([])
  const [selectedSimulator, setSelectedSimulator] = useState(null)

  const [showPwd, setShowPwd] = useState(false)
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [pwdState, setPwdState] = useState('idle')
  const [pwdError, setPwdError] = useState('')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { navigate('/login'); return }
      setUser(u)
      setEditName(u.displayName || '')

      // Fetch riwayat dari Firestore
      const q = query(
        collection(db, 'riwayat'),
        where('uid', '==', u.uid),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      setRiwayat(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setLoading(false)

      const q2 = query(
        collection(db, 'riwayat_simulator'),
        where('uid', '==', u.uid)
      )
      const snapshot2 = await getDocs(q2)
      setRiwayatSimulator(snapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [navigate])

  const isGoogleUser = user?.providerData?.some(p => p.providerId === 'google.com')

  const handleSave = async (e) => {
    e.preventDefault()
    if (!editName.trim()) return
    setSaveState('loading')
    try {
      await updateProfile(auth.currentUser, { displayName: editName })
      setUser({ ...auth.currentUser, displayName: editName })
      setSaveState('success')
      setTimeout(() => setSaveState('idle'), 2000)
    } catch {
      setSaveState('idle')
    }
  }

  const handleSendReset = async () => {
    setPwdError('')
    setPwdState('loading')
    try {
      await sendPasswordResetEmail(auth, user.email)
      setPwdState('sent')
      setTimeout(() => setPwdState('idle'), 4000)
    } catch {
      setPwdState('idle')
      setPwdError('Gagal mengirim email. Coba lagi.')
    }
  }

  const handleChangePwd = async (e) => {
    e.preventDefault()
    setPwdError('')
    if (newPwd !== confirmPwd) { setPwdError('Password baru tidak cocok.'); return }
    if (newPwd.length < 6) { setPwdError('Password minimal 6 karakter.'); return }
    setPwdState('loading')
    try {
      const credential = EmailAuthProvider.credential(user.email, oldPwd)
      await reauthenticateWithCredential(auth.currentUser, credential)
      await updatePassword(auth.currentUser, newPwd)
      setPwdState('success')
      setOldPwd(''); setNewPwd(''); setConfirmPwd('')
      setTimeout(() => { setPwdState('idle'); setShowPwd(false) }, 2000)
    } catch (err) {
      setPwdState('idle')
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setPwdError('Password lama salah.')
      } else {
        setPwdError('Gagal mengubah password. Coba lagi.')
      }
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  function formatDate(ts) {
    if (!ts) return ''
    const date = ts.toDate ? ts.toDate() : new Date(ts)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  function getBadgeClass(prediction) {
    return prediction === 'Laku' ? 'badge-green' : 'badge-red'
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D0D0D', color: '#F9F9F7' }}>
      Memuat...
    </div>
  )

  return (
    <div className="profile-page-wrapper">

      {/* Navbar */}
      <header className="home-header">
        <nav>
          <Link to="/" className="nav-logo">
            <span className="logo-dot" aria-hidden="true"></span>
            UMKMentor
          </Link>
          <ul className={`nav-links${navOpen ? ' open' : ''}`}>
            <li>
              <button className="nav-cta" onClick={handleLogout} style={{ background: 'none', border: '1.5px solid rgba(255,255,255,0.08)', color: '#F9F9F7', padding: '10px 22px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                Keluar
              </button>
            </li>
          </ul>
          <button
            className={`nav-hamburger${navOpen ? ' open' : ''}`}
            aria-label="Menu"
            onClick={() => setNavOpen(o => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </nav>
      </header>

      <main className="profile-main">

        {/* Avatar Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.photoURL
              ? <img src={user.photoURL} alt="avatar" />
              : '👤'}
          </div>
          <div>
            <h1 className="profile-name">{user.displayName || 'Pengguna'}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        {/* 2 Column Grid */}
        <div className="profile-grid">

          {/* LEFT COL */}
          <div className="profile-col">
            <div className="profile-card">
              <h2 className="profile-card-title">Informasi Akun</h2>
              <form onSubmit={handleSave}>
                <div className="profile-field">
                  <label>Nama Lengkap</label>
                  <input type="text" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Nama kamu" />
                </div>
                <div className="profile-field">
                  <label>Email</label>
                  <input type="email" value={user.email} disabled className="profile-input-disabled" />
                  <p className="profile-field-note">Email tidak dapat diubah</p>
                </div>
                <button type="submit" className={`submit-btn${saveState === 'success' ? ' btn-save-success' : ''}`} disabled={saveState === 'loading'}>
                  {saveState === 'idle' ? 'Simpan Perubahan' : saveState === 'loading' ? 'Menyimpan...' : '✓ Tersimpan!'}
                </button>
              </form>
            </div>

            <div className="profile-card">
              <div className="pwd-toggle" onClick={() => { setShowPwd(!showPwd); setPwdError(''); setPwdState('idle') }}>
                <h2 className="pwd-toggle-title">Keamanan Akun</h2>
                <span className={`pwd-arrow${showPwd ? ' open' : ''}`}>▾</span>
              </div>
              {showPwd && (
                <div className="pwd-body">
                  {isGoogleUser ? (
                    <div>
                      <div className="pwd-info-box">Link reset password akan dikirim ke <span>{user.email}</span></div>
                      {pwdError && <p className="pwd-error">{pwdError}</p>}
                      <button onClick={handleSendReset} disabled={pwdState === 'loading' || pwdState === 'sent'} className={`btn-reset${pwdState === 'sent' ? ' sent' : ''}`}>
                        {pwdState === 'idle' ? 'Kirim Link Reset Password' : pwdState === 'loading' ? 'Mengirim...' : '✓ Email Terkirim!'}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleChangePwd}>
                      {[
                        { label: 'Password Lama', val: oldPwd, set: setOldPwd },
                        { label: 'Password Baru', val: newPwd, set: setNewPwd },
                        { label: 'Konfirmasi Password Baru', val: confirmPwd, set: setConfirmPwd },
                      ].map(({ label, val, set }, i) => (
                        <div className="profile-field" key={i}>
                          <label>{label}</label>
                          <input type="password" value={val} onChange={e => set(e.target.value)} placeholder="••••••••" />
                        </div>
                      ))}
                      {pwdError && <p className="pwd-error">{pwdError}</p>}
                      <button type="submit" disabled={pwdState === 'loading'} className={`btn-change-pwd${pwdState === 'success' ? ' success' : ''}`}>
                        {pwdState === 'idle' ? 'Ubah Password' : pwdState === 'loading' ? 'Memproses...' : '✓ Password Diubah!'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COL */}
          <div className="profile-col">

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card accent">
                <div className="stat-val">{riwayat.length}</div>
                <div className="stat-label">Analisis Dilakukan</div>
              </div>
              <div className="stat-card">
                <div className="stat-val">{riwayat.length}</div>
                <div className="stat-label">Riwayat Analisis</div>
              </div>
              <div className="stat-card">
                <div className="stat-val">{riwayatSimulator.length}</div>
                <div className="stat-label">Perbandingan Platform</div>
              </div>
            </div>

            {/* Paket */}
            <div className="paket-card">
              <div>
                <div className="paket-name">Paket Gratis</div>
                <div className="paket-desc">Akses fitur dasar UMKMentor</div>
              </div>
              <div className="paket-quota">
                <div className="quota-val">{riwayat.length} / 5 analisis bulan ini</div>
                <div className="quota-bar">
                  <div className="quota-fill" style={{ width: `${Math.min((riwayat.length / 5) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>

            {/* Riwayat */}
            <div className="profile-card">
              <h2 className="profile-card-title">Riwayat Aktivitas</h2>
              <div className="riwayat-list">
                {riwayat.length === 0 && (
                  <p style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '16px 0' }}>Belum ada riwayat analisis.</p>
                )}
                {riwayat.map(item => (
                  <div key={item.id} className="riwayat-item" style={{ cursor: 'pointer' }} onClick={() => setSelectedRiwayat(item)}>
                    <div>
                      <div className="riwayat-name">{item.kategoriLabel}</div>
                      <div className="riwayat-sub">Analisis Produk · {formatDate(item.createdAt)}</div>
                    </div>
                    <span className={`riwayat-badge ${getBadgeClass(item.prediction)}`}>
                      {item.prediction === 'Laku' ? 'Potensial' : 'Kurang Potensial'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Riwayat Simulator */}
            <div className="profile-card">
              <h2 className="profile-card-title">Riwayat Perbandingan Platform</h2>
              <div className="riwayat-list">
                {riwayatSimulator.length === 0 && (
                  <p style={{ fontSize: '13px', color: '#9CA3AF', textAlign: 'center', padding: '16px 0' }}>Belum ada riwayat perbandingan.</p>
                )}
                {riwayatSimulator.map(item => (
                  <div key={item.id} className="riwayat-item" style={{ cursor: 'pointer' }} onClick={() => setSelectedSimulator(item)}>
                    <div>
                      <div className="riwayat-name">{item.kategoriLabel}</div>
                      <div className="riwayat-sub">Perbandingan Platform · {formatDate(item.createdAt)}</div>
                    </div>
                    <span className="riwayat-badge badge-blue">Simulator</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Detail Analisis */}
      {selectedRiwayat && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setSelectedRiwayat(null)}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', maxWidth: '480px', width: '100%', maxHeight: '80vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111' }}>{selectedRiwayat.kategoriLabel}</h2>
              <button onClick={() => setSelectedRiwayat(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#9CA3AF' }}>×</button>
            </div>
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '16px' }}>{formatDate(selectedRiwayat.createdAt)}</p>
            {[
              { label: 'Prediksi', value: selectedRiwayat.prediction },
              { label: 'Peluang Laku', value: `${selectedRiwayat.laku_score}%` },
              { label: 'Tingkat Risiko', value: selectedRiwayat.risk_level },
              { label: 'Harga Jual', value: `Rp ${selectedRiwayat.harga_jual?.toLocaleString('id')}` },
              { label: 'Harga Median Kategori', value: `Rp ${selectedRiwayat.harga_median_cat?.toLocaleString('id')}` },
              { label: 'Stok Median Kategori', value: `${selectedRiwayat.stock_median_cat} unit` },
              { label: 'Produk Official Store', value: `${selectedRiwayat.cat_pct_official}%` },
              selectedRiwayat.sentimen_positif != null && { label: 'Sentimen Positif', value: `${selectedRiwayat.sentimen_positif}%` },
              selectedRiwayat.sentimen_negatif != null && { label: 'Sentimen Negatif', value: `${selectedRiwayat.sentimen_negatif}%` },
            ].filter(Boolean).map(({ label, value }, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F3F4F6', fontSize: '13px' }}>
                <span style={{ color: '#6B7280' }}>{label}</span>
                <span style={{ fontWeight: '600', color: '#111' }}>{value}</span>
              </div>
            ))}
            {selectedRiwayat.saran?.length > 0 && (
              <div style={{ marginTop: '16px', background: '#FFF7ED', borderRadius: '8px', padding: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: '#92400E' }}>💡 Saran AI</div>
                <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '13px', lineHeight: '1.7', color: '#92400E' }}>
                  {selectedRiwayat.saran.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Detail Simulator */}
      {selectedSimulator && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setSelectedSimulator(null)}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', maxWidth: '480px', width: '100%', maxHeight: '80vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111' }}>{selectedSimulator.kategoriLabel}</h2>
              <button onClick={() => setSelectedSimulator(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#9CA3AF' }}>×</button>
            </div>
            <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '16px' }}>{formatDate(selectedSimulator.createdAt)}</p>
            {[
              { label: 'Harga Jual', value: `Rp ${selectedSimulator.harga_jual?.toLocaleString('id')}` },
              { label: 'HPP', value: `Rp ${selectedSimulator.hpp?.toLocaleString('id')}` },
              { label: 'Gross Profit', value: `Rp ${selectedSimulator.gross_profit?.toLocaleString('id')}` },
            ].map(({ label, value }, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F3F4F6', fontSize: '13px' }}>
                <span style={{ color: '#6B7280' }}>{label}</span>
                <span style={{ fontWeight: '600', color: '#111' }}>{value}</span>
              </div>
            ))}
            {selectedSimulator.platforms?.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: '#111' }}>Hasil Per Platform</div>
                {selectedSimulator.platforms.map((p, i) => (
                  <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #F3F4F6', fontSize: '13px' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px', color: '#111' }}>{p.key}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                      <span>Profit Bersih</span>
                      <span style={{ color: p.netMin > 0 ? 'var(--green)' : '#EF4444', fontWeight: '600' }}>
                        Rp {Math.round(p.netMin).toLocaleString('id')} – Rp {Math.round(p.netMax).toLocaleString('id')}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280', marginTop: '2px' }}>
                      <span>Margin</span>
                      <span style={{ fontWeight: '600', color: '#111' }}>{p.marginMin}%–{p.marginMax}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}