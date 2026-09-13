import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page-container">
      <nav className="navbar">
        <Link to="/" className="logo">
          Spotify-Piper
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/register" style={{ color: 'var(--color-text-subdued)', fontWeight: 'bold' }}>
            Sign up
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Log in
          </Link>
        </div>
      </nav>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1rem', background: 'var(--gradient-hero)' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '-2px' }}>
          Music for everyone.
        </h1>
        <p style={{ color: 'var(--color-text-subdued)', fontSize: 'var(--font-size-lg)', marginBottom: '2.5rem' }}>
          Millions of songs. No credit card needed.
        </p>
        <Link to="/register" className="btn btn-primary" style={{ padding: '16px 48px', fontSize: 'var(--font-size-lg)', letterSpacing: '1px' }}>
          GET SPOTIFY-PIPER FREE
        </Link>
      </main>
    </div>
  )
}



