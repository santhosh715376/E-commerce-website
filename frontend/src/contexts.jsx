import { createContext, useContext } from 'react'

export const AuthContext = createContext()
export const CartContext = createContext()

export const useAuth = () => useContext(AuthContext)
export const useCart = () => useContext(CartContext)