import { useCart } from './contexts'

function Cart() {
  const { cartItems, removeFromCart } = useCart()

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: '80vh', background: '#f8f9fa' }}>
        <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div className="desktop-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem', color: '#333' }}>Your Cart is Empty</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>Start shopping to add items to your cart</p>
            <a href="/products" className="desktop-btn desktop-btn-primary" style={{ textDecoration: 'none', fontSize: '1.1rem' }}>
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div className="container" style={{ padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 2rem', color: '#333', textAlign: 'center' }}>Shopping Cart</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          <div>
            {cartItems.map(item => (
              <div key={item.id} className="desktop-card" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginRight: '2rem' }} 
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', color: '#333' }}>{item.name}</h3>
                  <p style={{ margin: '0 0 0.5rem', color: '#666', fontSize: '1rem' }}>Quantity: {item.quantity}</p>
                  <p style={{ margin: '0', fontSize: '1.3rem', fontWeight: '700', color: '#007bff' }}>
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="desktop-btn desktop-btn-danger"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <div className="desktop-card" style={{ position: 'sticky', top: '120px' }}>
              <h2 style={{ margin: '0 0 1.5rem', fontSize: '2rem', color: '#333' }}>Order Summary</h2>
              <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Items ({cartItems.length}):</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Shipping:</span>
                  <span style={{ color: '#28a745' }}>FREE</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>
                <span>Total:</span>
                <span style={{ color: '#007bff' }}>${total.toLocaleString()}</span>
              </div>
              <button className="desktop-btn desktop-btn-primary" style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart