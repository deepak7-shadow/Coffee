import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, ShoppingCart, Menu, X, Sparkles } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Artisan Menu', href: '#menu' },
  { label: 'Roast Lab', href: '#roast-lab' },
  { label: 'Our Craft', href: '#features' },
  { label: 'Reviews', href: '#reviews' },
]

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [active, setActive] = useState('Home')
  const [mobileOpen, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, item) => {
    e.preventDefault()
    setActive(item.label)
    setMobile(false)
    const el = document.querySelector(item.href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '14px clamp(20px, 4vw, 48px)' : '20px clamp(20px, 4vw, 48px)',
        backgroundColor: scrolled ? 'rgba(20, 10, 4, 0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245, 233, 213, 0.1)' : '1px solid transparent',
        transition: 'padding 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      }}
    >
      {/* ── Logo ── */}
      <a
        href="#hero"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        <span style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 900,
          fontSize: '1.6rem',
          color: '#f5e9d5',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}>
          BRWW
        </span>
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#dfb755',
          backgroundColor: 'rgba(223, 183, 85, 0.15)',
          padding: '2px 6px',
          borderRadius: '4px',
          border: '1px solid rgba(223, 183, 85, 0.3)',
        }}>
          BREWERY
        </span>
      </a>

      {/* ── Centre pill nav ── */}
      <nav
        style={{
          display: 'none',
          alignItems: 'center',
          gap: '4px',
          padding: '5px 8px',
          borderRadius: '999px',
          background: 'rgba(28, 14, 6, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(245, 233, 213, 0.15)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
        }}
        className="nav-pill"
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item)}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '13.5px',
              fontWeight: active === item.label ? 600 : 500,
              color: active === item.label ? '#ffffff' : '#c4ab89',
              background: active === item.label ? 'rgba(223, 183, 85, 0.22)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (item.label !== active) {
                e.currentTarget.style.color = '#f5e9d5'
                e.currentTarget.style.background = 'rgba(245, 233, 213, 0.08)'
              }
            }}
            onMouseLeave={(e) => {
              if (item.label !== active) {
                e.currentTarget.style.color = '#c4ab89'
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* ── Right actions ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }} className="nav-actions">
        {/* Cart Icon Button with Badge */}
        <button
          onClick={onOpenCart}
          aria-label="Open cart"
          style={{
            background: 'rgba(28, 14, 6, 0.75)',
            border: '1px solid rgba(245, 233, 213, 0.22)',
            borderRadius: '50%',
            cursor: 'pointer',
            width: '42px',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f5e9d5',
            position: 'relative',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(223, 183, 85, 0.2)'
            e.currentTarget.style.borderColor = 'rgba(223, 183, 85, 0.5)'
            e.currentTarget.style.color = '#dfb755'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(28, 14, 6, 0.75)'
            e.currentTarget.style.borderColor = 'rgba(245, 233, 213, 0.22)'
            e.currentTarget.style.color = '#f5e9d5'
          }}
        >
          <ShoppingCart size={18} strokeWidth={2} />
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#dfb755',
                color: '#120702',
                fontSize: '11px',
                fontWeight: 800,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              {cartCount}
            </motion.span>
          )}
        </button>

        {/* Order Now CTA */}
        <button
          onClick={onOpenCart}
          className="shimmer-button"
          style={{
            padding: '10px 24px',
            borderRadius: '999px',
            fontSize: '13.5px',
            fontWeight: 700,
            color: '#120702',
            background: 'linear-gradient(135deg, #dfb755 0%, #c19532 100%)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 18px rgba(223, 183, 85, 0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(223, 183, 85, 0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(223, 183, 85, 0.35)'
          }}
        >
          <Sparkles size={14} />
          Order Fresh
        </button>
      </div>

      {/* ── Mobile toggle ── */}
      <button
        onClick={() => setMobile(!mobileOpen)}
        aria-label="Toggle menu"
        style={{
          background: 'rgba(28, 14, 6, 0.75)',
          border: '1px solid rgba(245, 233, 213, 0.2)',
          borderRadius: '50%',
          cursor: 'pointer',
          color: '#f5e9d5',
          width: '42px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="mobile-toggle"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '16px',
              right: '16px',
              marginTop: '10px',
              padding: '16px',
              borderRadius: '20px',
              background: 'rgba(20, 10, 4, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(245, 233, 213, 0.15)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                style={{
                  display: 'block',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: active === item.label ? '#dfb755' : '#f5e9d5',
                  background: active === item.label ? 'rgba(223, 183, 85, 0.12)' : 'transparent',
                }}
              >
                {item.label}
              </a>
            ))}
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '10px',
              paddingTop: '10px',
              borderTop: '1px solid rgba(245, 233, 213, 0.1)',
            }}>
              <button
                onClick={() => { setMobile(false); onOpenCart() }}
                style={{
                  flex: 1,
                  padding: '12px',
                  textAlign: 'center',
                  borderRadius: '999px',
                  background: '#dfb755',
                  color: '#120702',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <ShoppingCart size={16} /> Open Cart ({cartCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive show/hide ── */}
      <style>{`
        @media (min-width: 820px) {
          .nav-pill { display: flex !important; }
          .nav-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 819px) {
          .nav-pill { display: none !important; }
          .nav-actions { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </motion.header>
  )
}
