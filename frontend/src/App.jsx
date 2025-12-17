import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { AuthContext, CartContext } from './contexts'
import Navbar from './navbar'
import Home from './home'
import Products from './products'
import Cart from './cart'
import Login from './login'
import Register from './register'
import ProtectedRoute from './ProtectedRoute'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [cartItems, setCartItems] = useState([])

  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)
  
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        )
      }
      return [...prev, {...product, quantity: 1}]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
