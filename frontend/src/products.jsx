import { useState, useEffect } from 'react'
import { useCart } from './contexts'

const fallbackProducts = [
  { _id: 1, name: 'MacBook Pro 16"', price: 2499, image: 'https://via.placeholder.com/300x300?text=MacBook+Pro', category: 'Laptops' },
  { _id: 2, name: 'iPhone 15 Pro', price: 999, image: 'https://via.placeholder.com/300x300?text=iPhone+15', category: 'Smartphones' },
  { _id: 3, name: 'AirPods Pro', price: 249, image: 'https://via.placeholder.com/300x300?text=AirPods+Pro', category: 'Audio' },
  { _id: 4, name: 'iPad Air', price: 599, image: 'https://via.placeholder.com/300x300?text=iPad+Air', category: 'Tablets' }
]

function Products() {
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://localhost:5000/api/products', {
        headers: {
          'Authorization': token
        }
      })
      if (res.ok) {
        const data = await res.json()
        if (data.length > 0) {
          setProducts(data)
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container" style={{ padding: '6rem 2rem 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 1rem', color: '#333' }}>Our Products</h1>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>Discover our premium collection of technology products</p>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '3rem' }}>⏳</div>
            <p>Loading products...</p>
          </div>
        ) : (
          <div className="desktop-grid">
            {products.map(product => (
            <div key={product._id || product.id} className="desktop-card" style={{ textAlign: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }} 
                />
                <span style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: '#007bff', 
                  color: 'white', 
                  padding: '0.25rem 0.5rem', 
                  borderRadius: '12px', 
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {product.category}
                </span>
              </div>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.3rem', color: '#333' }}>{product.name}</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#007bff', margin: '1rem 0' }}>
                ${product.price.toLocaleString()}
              </p>
              <button 
                onClick={() => addToCart(product)}
                className="desktop-btn desktop-btn-success"
                style={{ width: '100%', fontSize: '1rem' }}
              >
                🛒 Add to Cart
              </button>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products