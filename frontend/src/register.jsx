import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './contexts'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsLoading(true)
    try {
      const res = await fetch('http://98.81.166.219:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        login({ email: formData.email, name: formData.name })
        navigate('/')
      } else {
        alert(data.message || 'Registration failed')
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Connection error')
    }
    setIsLoading(false)
  }

  return (
    <div className="auth-container" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' }}>
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h1 className="auth-title">Join E-Shop</h1>
          <p className="auth-subtitle">Create your account and start shopping today</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="auth-input"
              style={{ borderColor: errors.name ? '#dc3545' : '#e1e5e9' }}
            />
            {errors.name && <span style={{ color: '#dc3545', fontSize: '0.85rem' }}>{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              className="auth-input"
              style={{ borderColor: errors.email ? '#dc3545' : '#e1e5e9' }}
            />
            {errors.email && <span style={{ color: '#dc3545', fontSize: '0.85rem' }}>{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label className="auth-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                className="auth-input"
                style={{ paddingRight: '3rem', borderColor: errors.password ? '#dc3545' : '#e1e5e9' }}
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
            {errors.password && <span style={{ color: '#dc3545', fontSize: '0.85rem' }}>{errors.password}</span>}
          </div>

          <div className="form-group">
            <label className="auth-label">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className="auth-input"
                style={{ paddingRight: '3rem', borderColor: errors.confirmPassword ? '#dc3545' : '#e1e5e9' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? '👁️' : '👁️🗨️'}
              </button>
            </div>
            {errors.confirmPassword && <span style={{ color: '#dc3545', fontSize: '0.85rem' }}>{errors.confirmPassword}</span>}
          </div>
          
          <button 
            type="submit" 
            className="desktop-btn desktop-btn-success" 
            style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Creating Account... ⏳</span>
            ) : (
              <span>Create Account ✨</span>
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p style={{ color: '#666', margin: '0' }}>
            Already have an account? <Link to="/login" className="auth-link">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register