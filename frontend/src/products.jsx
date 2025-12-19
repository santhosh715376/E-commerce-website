import { useState, useEffect } from 'react'
import { useCart } from './contexts'

const fallbackProducts = [
  { _id: 1, name: 'MacBook Pro 16"', price: 2499, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', category: 'Laptops' },
  { _id: 2, name: 'iPhone 15 Pro', price: 999, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop', category: 'Smartphones' },
  { _id: 3, name: 'AirPods Pro', price: 249, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop', category: 'Audio' },
  { _id: 4, name: 'iPad Air', price: 599, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', category: 'Tablets' },
  { _id: 5, name: 'Apple Watch Ultra', price: 799, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop', category: 'Wearables' },
  { _id: 6, name: 'Canon EOS R5', price: 3899, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop', category: 'Cameras' }
]

function Products() {
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('http://98.81.166.219:5000/api/products', {
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