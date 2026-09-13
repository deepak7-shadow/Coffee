import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const rawSubtotal = cartItems.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace('$', ''))
    return acc + priceNum * item.quantity
  }, 0)

  const discount = promoApplied ? rawSubtotal * 0.15 : 0
  const freeShippingThreshold = 25
  const remainingForFreeShip = Math.max(0, freeShippingThreshold - rawSubtotal)
  const progressPercent = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)
  const shipping = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0 ? 0 : 3.50
  const finalTotal = Math.max(0, rawSubtotal - discount + shipping)

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === 'BREW15') {
      setPromoApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid code. Try "BREW15" for 15% off!')
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
      setOrderSuccess(true)
      setTimeout(() => {
        onClearCart()
        setOrderSuccess(false)
        onClose()
      }, 2500)
    }, 1200)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(7, 3, 1, 0.75)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 90,
            }}
          />

          {/* Drawer container */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#1b0e06',
              backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(223, 183, 85, 0.08), transparent)',
              borderLeft: '1px solid rgba(245, 233, 213, 0.14)',
              boxShadow: '-12px 0 40px rgba(0, 0, 0, 0.7)',
              zIndex: 95,
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '24px 28px',
              borderBottom: '1px solid rgba(245, 233, 213, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag size={22} color="#dfb755" />
                <h2 style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: '#f5e9d5',
                  margin: 0,
                }}>
                  Your Artisan Order
                </h2>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  backgroundColor: 'rgba(223, 183, 85, 0.15)',
                  color: '#dfb755',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}>
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close cart"
                style={{
                  background: 'rgba(245, 233, 213, 0.08)',
                  border: '1px solid rgba(245, 233, 213, 0.15)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f5e9d5',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(223, 183, 85, 0.2)'
                  e.currentTarget.style.color = '#dfb755'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(245, 233, 213, 0.08)'
                  e.currentTarget.style.color = '#f5e9d5'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div style={{
              padding: '14px 28px',
              backgroundColor: 'rgba(223, 183, 85, 0.06)',
              borderBottom: '1px solid rgba(245, 233, 213, 0.08)',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#c4ab89',
                marginBottom: '6px',
              }}>
                <span>
                  {remainingForFreeShip === 0 ? (
                    <strong style={{ color: '#4a9e8e' }}>🎉 You unlocked Free Brewery Delivery!</strong>
                  ) : (
                    <>Add <strong style={{ color: '#dfb755' }}>${remainingForFreeShip.toFixed(2)}</strong> for Free Delivery</>
                  )}
                </span>
                <span style={{ fontWeight: 600 }}>{Math.round(progressPercent)}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '5px',
                backgroundColor: 'rgba(245, 233, 213, 0.1)',
                borderRadius: '999px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #dfb755, #4a9e8e)',
                  borderRadius: '999px',
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>

            {/* Order Success State */}
            {orderSuccess ? (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
              }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 14 }}
                >
                  <CheckCircle2 size={64} color="#4a9e8e" style={{ marginBottom: '20px' }} />
                </motion.div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.8rem',
                  color: '#f5e9d5',
                  marginBottom: '8px',
                }}>
                  Order Brewed & Confirmed!
                </h3>
                <p style={{ color: '#c4ab89', fontSize: '14px', maxWidth: '300px', lineHeight: 1.6 }}>
                  Our master baristas are already preparing your fresh artisanal cup. Receipt sent to your email.
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty Cart State */
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 233, 213, 0.05)',
                  border: '1px dashed rgba(223, 183, 85, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <ShoppingBag size={30} color="#c4ab89" />
                </div>
                <h3 style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: '#f5e9d5',
                  marginBottom: '8px',
                }}>
                  Your cup is empty
                </h3>
                <p style={{
                  color: '#c4ab89',
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  maxWidth: '260px',
                  marginBottom: '24px',
                }}>
                  Explore our curated coffee selection and treat yourself to an unforgettable brew.
                </p>
                <button
                  onClick={onClose}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '999px',
                    backgroundColor: '#dfb755',
                    color: '#140803',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(223, 183, 85, 0.3)',
                  }}
                >
                  Browse Coffee Menu
                </button>
              </div>
            ) : (
              /* Items List */
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}>
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '14px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(245, 233, 213, 0.04)',
                      border: '1px solid rgba(245, 233, 213, 0.08)',
                      alignItems: 'center',
                    }}
                  >
                    {/* Item Thumbnail */}
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(20, 9, 3, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '4px',
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: '#f5e9d5',
                          margin: 0,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id, item.selectedSize)}
                          aria-label="Remove item"
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#8b6f52',
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#e06c6c')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#8b6f52')}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p style={{ fontSize: '11px', color: '#c4ab89', margin: '2px 0 8px 0' }}>
                        Size: <span style={{ color: '#dfb755', fontWeight: 600 }}>{item.selectedSize || '12oz Regular'}</span>
                        {item.customMilk && ` · ${item.customMilk}`}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 800,
                          fontSize: '0.95rem',
                          color: '#dfb755',
                        }}>
                          {item.price}
                        </span>

                        {/* Quantity controls */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: 'rgba(245, 233, 213, 0.08)',
                          borderRadius: '999px',
                          padding: '2px 6px',
                        }}>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#f5e9d5',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '3px',
                            }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#f5e9d5', minWidth: '16px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#f5e9d5',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '3px',
                            }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Summary & Checkout (Only if cart not empty) */}
            {cartItems.length > 0 && !orderSuccess && (
              <div style={{
                padding: '20px 28px',
                borderTop: '1px solid rgba(245, 233, 213, 0.1)',
                backgroundColor: 'rgba(18, 9, 3, 0.95)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}>
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Promo code (try BREW15)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(245, 233, 213, 0.06)',
                      border: '1px solid rgba(245, 233, 213, 0.14)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#f5e9d5',
                      fontSize: '12.5px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: 'rgba(223, 183, 85, 0.15)',
                      border: '1px solid rgba(223, 183, 85, 0.3)',
                      color: '#dfb755',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <span style={{ fontSize: '11px', color: '#4a9e8e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={12} /> 15% Artisan VIP discount applied!
                  </span>
                )}
                {promoError && (
                  <span style={{ fontSize: '11px', color: '#e06c6c' }}>{promoError}</span>
                )}

                {/* Pricing Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#c4ab89' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span style={{ color: '#f5e9d5' }}>${rawSubtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4a9e8e' }}>
                      <span>Artisan VIP (15%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Brewery Courier Delivery</span>
                    <span style={{ color: shipping === 0 ? '#4a9e8e' : '#f5e9d5' }}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#f5e9d5',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(245, 233, 213, 0.08)',
                  }}>
                    <span>Total</span>
                    <span style={{ color: '#dfb755' }}>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="shimmer-button"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, #dfb755 0%, #b88f34 100%)',
                    color: '#120702',
                    fontSize: '14px',
                    fontWeight: 800,
                    border: 'none',
                    cursor: isCheckingOut ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 24px rgba(223, 183, 85, 0.4)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => !isCheckingOut && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => !isCheckingOut && (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  {isCheckingOut ? (
                    'Preparing Your Cup...'
                  ) : (
                    <>
                      Proceed to Checkout <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
