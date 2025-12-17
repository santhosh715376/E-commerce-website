import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './contexts'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email && password) {
      setIsLoading(true)
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (res.ok) {
          localStorage.setItem('token', data.token)
          login({ email, name: email.split('@')[0] })
          navigate('/')
        } else {
          alert(data.message || 'Login failed')
        }
      } catch (error) {
        alert('Connection error')
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your E-Shop account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="auth-input"
            />
          </div>
          
          <div className="form-group">
            <label className="auth-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="auth-input"
                style={{ paddingRight: '3rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                {showPassword ? '👁️' : '👁️🗨️'}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="desktop-btn desktop-btn-primary" 
            style={{ width: '100%', fontSize: '1.1rem', padding: '1rem', position: 'relative' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Signing In... ⏳</span>
            ) : (
              <span>Sign In 🚀</span>
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p style={{ color: '#666', margin: '0' }}>
            Don't have an account? <Link to="/register" className="auth-link">Create one here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login