import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import RoastLab from './components/RoastLab'
import Features from './components/Features'
import CTABanner from './components/CTABanner'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

const CART_STORAGE_KEY = 'broven_coffee_cart_v1'

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : [
        {
          id: 'latte',
          name: 'Velvet Oat Latte',
          price: '$5.00',
          selectedSize: '12oz Regular',
          quantity: 1,
          image: '/cup-2.png',
        },
      ]
    } catch {
      return []
    }
  })

  const [cartOpen, setCartOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch {
      // ignore
    }
  }, [cartItems])

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 2800)
  }

  const handleAddToCart = (item) => {
    const size = item.selectedSize || '12oz Regular'
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.id === item.id && i.selectedSize === size
      )
      if (existingIdx > -1) {
        const updated = [...prev]
        updated[existingIdx].quantity += 1
        return updated
      } else {
        return [...prev, { ...item, selectedSize: size, quantity: 1 }]
      }
    })
    showToast(`Added ${item.name} (${size}) to your order!`)
  }

  const handleUpdateQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, size)
      return
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && i.selectedSize === size ? { ...i, quantity: newQty } : i
      )
    )
  }

  const handleRemoveItem = (id, size) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.id === id && i.selectedSize === size))
    )
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0)

  return (
    <div style={{ backgroundColor: '#180c05', minHeight: '100vh', position: 'relative' }}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            style={{
              position: 'fixed',
              top: '80px',
              left: '50%',
              zIndex: 100,
              backgroundColor: 'rgba(28, 14, 6, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(223, 183, 85, 0.45)',
              borderRadius: '999px',
              padding: '10px 24px',
              color: '#f5e9d5',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '13.5px',
              fontWeight: 600,
            }}
          >
            <div style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: '#4a9e8e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <Check size={14} />
            </div>
            <span>{toastMessage}</span>
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#dfb755',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontWeight: 700,
                marginLeft: '6px',
              }}
            >
              View Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <Hero onOpenCart={() => setCartOpen(true)} />
        <Menu onAddToCart={handleAddToCart} />
        <RoastLab />
        <Features onOpenCart={() => setCartOpen(true)} />
        <CTABanner onAddToCart={handleAddToCart} />
        <Reviews />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  )
}
