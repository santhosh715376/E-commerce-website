import { Link } from 'react-router-dom'
import { useAuth, useCart } from './contexts'

function Navbar() {
  const { user, logout } = useAuth()
  const { cartItems } = useCart()

  const handleLogout = () => {
    localStorage.removeItem('token')
    logout()
  }

  return (
    <nav className="desktop-navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', letterSpacing: '-1px' }}>
          🛒 E-Shop
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '1.1rem' }}>
          <Link to="/" style={{ padding: '0.5rem 1rem', borderRadius: '6px' }}>Home</Link>
          <Link to="/products" style={{ padding: '0.5rem 1rem', borderRadius: '6px' }}>Products</Link>
          {user ? (
            <>
              <Link to="/cart" style={{ padding: '0.5rem 1rem', borderRadius: '6px', background: '#e3f2fd', color: '#1976d2', fontWeight: '600' }}>
                🛒 Cart ({cartItems.length})
              </Link>
              <span style={{ color: '#666' }}>Welcome, {user.name}</span>
              <button onClick={handleLogout} className="desktop-btn desktop-btn-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="desktop-btn desktop-btn-primary" style={{ textDecoration: 'none' }}>Login</Link>
              <Link to="/register" className="desktop-btn desktop-btn-success" style={{ textDecoration: 'none' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar