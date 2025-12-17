import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className="desktop-hero">
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', margin: '0 0 1rem', fontWeight: '700' }}>Welcome to E-Shop</h1>
          <p style={{ fontSize: '1.4rem', margin: '0 0 2rem', opacity: '0.9' }}>
            Your premium destination for quality products and exceptional service
          </p>
          <Link to="/products">
            <button className="desktop-btn" style={{ background: 'white', color: '#667eea', fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
              Explore Products →
            </button>
          </Link>
        </div>
      </div>
      
      <div className="container">
        <div className="desktop-features">
          <div className="desktop-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 1rem', color: '#333' }}>Premium Quality</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Carefully curated selection of high-quality products from trusted brands</p>
          </div>
          <div className="desktop-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚚</div>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 1rem', color: '#333' }}>Fast Delivery</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Lightning-fast shipping with real-time tracking to your doorstep</p>
          </div>
          <div className="desktop-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 1rem', color: '#333' }}>Best Prices</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Competitive pricing with regular deals and exclusive member discounts</p>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '4rem 0', background: 'white', borderRadius: '12px', margin: '3rem 0' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem', color: '#333' }}>Ready to Start Shopping?</h2>
          <p style={{ fontSize: '1.2rem', color: '#666', margin: '0 0 2rem' }}>Join thousands of satisfied customers</p>
          <Link to="/products">
            <button className="desktop-btn desktop-btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home