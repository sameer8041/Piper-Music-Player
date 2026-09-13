import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/api/auth/register', {
        fullname: {
          firstname: formData.firstName,
          lastname: formData.lastName,
        },
        email: formData.email,
        password: formData.password,
        role: formData.userType
      }, {
        withCredentials: true
      }).then(result => {
        navigate("/")
      }
      )
    } catch (err) {
      console.log("error During registration", err)
    }

  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <div className="page-container">
      <nav className="navbar" style={{ justifyContent: 'center', backgroundColor: 'transparent' }}>
        <Link to="/" className="logo">Spotify-Piper</Link>
      </nav>

      <div className="form-container">
        <h2 className="form-title">Sign up to start listening</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" className="form-input" required />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" className="form-input" required />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@domain.com" className="form-input" required />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="form-input" required />
          </div>

          <div className="form-group">
            <p className="form-label">Account Type</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                <input type="radio" name="userType" value="user" checked={formData.userType === 'user'} onChange={handleChange} style={{ marginRight: '0.5rem', accentColor: 'var(--color-primary-hover)', width: '1.2rem', height: '1.2rem' }} />
                User
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500' }}>
                <input type="radio" name="userType" value="artist" checked={formData.userType === 'artist'} onChange={handleChange} style={{ marginRight: '0.5rem', accentColor: 'var(--color-primary-hover)', width: '1.2rem', height: '1.2rem' }} />
                Artist
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: 'var(--spacing-sm)' }}>
            Sign up
          </button>

          <div className="divider">
            <hr /><span>or</span><hr />
          </div>

          <button type="button" onClick={handleGoogleLogin} className="btn btn-outline" style={{ width: '100%', padding: '14px', gap: '0.75rem' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)', color: 'var(--color-text-subdued)', fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--color-text-base)', textDecoration: 'underline', fontWeight: 'bold' }}>Log in here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
