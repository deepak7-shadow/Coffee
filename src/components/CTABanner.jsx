import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, X, Coffee } from 'lucide-react'

const quizQuestions = [
  {
    question: 'When do you enjoy your primary coffee ritual?',
    options: [
      { label: 'Morning Kickstart', desc: 'Need bright clarity and intense aroma', type: 'bold' },
      { label: 'Afternoon Creative Flow', desc: 'Smooth, creamy, balanced pacing', type: 'smooth' },
      { label: 'Evening Indulgence', desc: 'Dessert-like, warm, and comforting', type: 'sweet' },
    ],
  },
  {
    question: 'How do you like your milk and texture?',
    options: [
      { label: 'Pure Black & Intrepid', desc: 'Just coffee, water, and pure origin terroir', type: 'bold' },
      { label: 'Silky Microfoam or Oat Milk', desc: 'Velvety smooth with natural creaminess', type: 'smooth' },
      { label: 'Rich Cocoa or Spiced Infusion', desc: 'Sweetened with honey, vanilla or dark chocolate', type: 'sweet' },
    ],
  },
  {
    question: 'Which tasting profile appeals to you most right now?',
    options: [
      { label: 'Jasmine, Bergamot & Citrus', desc: 'Crisp, refreshing, and floral', type: 'cold' },
      { label: 'Caramelized Toffee & Toasted Hazelnut', desc: 'Classic, comforting, nutty warmth', type: 'smooth' },
      { label: 'Decadent Dark Cacao & Brown Spice', desc: 'Heavy mouthfeel, complex bittersweet finish', type: 'sweet' },
    ],
  },
]

const coffeeMatches = {
  bold: {
    name: 'Artisan Cappuccino',
    price: '$4.50',
    matchReason: 'Your energetic morning preference and taste for intense coffee aroma pairs flawlessly with our 20% Colombia Antioquia espresso and airy micro-foam.',
    image: '/cup-1.png',
    id: 'cappuccino',
    selectedSize: '12oz Regular',
  },
  smooth: {
    name: 'Velvet Oat Latte',
    price: '$5.00',
    matchReason: 'You appreciate balanced, silky mouthfeel with sweet caramel undertones. Our Ethiopian single-origin pulled over steamed Swedish oat milk is your soulmate.',
    image: '/cup-2.png',
    id: 'latte',
    selectedSize: '12oz Regular',
  },
  sweet: {
    name: 'Belgian Chocolate Mocha',
    price: '$5.50',
    matchReason: 'Your love for rich, indulgent flavors makes our Belgian dark cacao mocha with honey cream swirl the ultimate match.',
    image: '/cup-3.png',
    id: 'mocha',
    selectedSize: '12oz Regular',
  },
  cold: {
    name: 'Cold Brew Reserve',
    price: '$4.75',
    matchReason: 'Your appreciation for crisp, refreshing floral notes makes our 18-hour Kenyan cold brew steeped with bergamot peel your signature.',
    image: '/cup-4.png',
    id: 'coldbrew',
    selectedSize: '12oz Regular',
  },
}

export default function CTABanner({ onAddToCart }) {
  const [quizOpen, setQuizOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [quizResult, setQuizResult] = useState(null)

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers([])
    setQuizResult(null)
  }

  const handleSelectOption = (type) => {
    const newAnswers = [...answers, type]
    setAnswers(newAnswers)

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const counts = { bold: 0, smooth: 0, sweet: 0, cold: 0 }
      newAnswers.forEach((a) => { counts[a] = (counts[a] || 0) + 1 })
      let topType = 'smooth'
      let maxVal = 0
      Object.entries(counts).forEach(([k, v]) => {
        if (v > maxVal) { maxVal = v; topType = k }
      })
      setQuizResult(coffeeMatches[topType] || coffeeMatches.smooth)
    }
  }

  const quizModal = (
    <AnimatePresence>
      {quizOpen && (
        /* Single overlay that is ALSO the flex centering container */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuizOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 3, 1, 0.55)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 9000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Modal — no position:fixed, no transform needed — centered by parent flex */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '520px',
              maxHeight: '88vh',
              overflowY: 'auto',
              backgroundColor: '#1a0d05',
              backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(223, 183, 85, 0.15), transparent 70%)',
              border: '1px solid rgba(223, 183, 85, 0.35)',
              borderRadius: '24px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85)',
              padding: '32px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#dfb755', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {quizResult ? '✨ Your Perfect Match' : `Question ${currentStep + 1} of 3`}
              </span>
              <button
                onClick={() => setQuizOpen(false)}
                style={{
                  background: 'rgba(245, 233, 213, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f5e9d5',
                  cursor: 'pointer',
                }}
              >
                <X size={16} />
              </button>
            </div>

            {!quizResult ? (
              /* Question View */
              <div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.45rem',
                  color: '#f5e9d5',
                  marginBottom: '20px',
                  lineHeight: 1.3,
                }}>
                  {quizQuestions[currentStep].question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {quizQuestions[currentStep].options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleSelectOption(opt.type)}
                      style={{
                        padding: '16px 18px',
                        borderRadius: '14px',
                        backgroundColor: 'rgba(245, 233, 213, 0.05)',
                        border: '1px solid rgba(245, 233, 213, 0.12)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(223, 183, 85, 0.15)'
                        e.currentTarget.style.borderColor = 'rgba(223, 183, 85, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(245, 233, 213, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(245, 233, 213, 0.12)'
                      }}
                    >
                      <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#f5e9d5', marginBottom: '4px' }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: '12.5px', color: '#c4ab89' }}>
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Result View */
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  margin: '0 auto 16px auto',
                  position: 'relative',
                }}>
                  <img
                    src={quizResult.image}
                    alt={quizResult.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.6))',
                    }}
                  />
                </div>

                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.8rem',
                  color: '#f5e9d5',
                  marginBottom: '4px',
                }}>
                  {quizResult.name}
                </h3>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#dfb755', marginBottom: '14px' }}>
                  {quizResult.price}
                </div>

                <p style={{
                  fontSize: '13.5px',
                  color: '#c4ab89',
                  lineHeight: 1.65,
                  marginBottom: '24px',
                  backgroundColor: 'rgba(245, 233, 213, 0.04)',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: '1px solid rgba(245, 233, 213, 0.08)',
                }}>
                  {quizResult.matchReason}
                </p>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={resetQuiz}
                    style={{
                      padding: '12px 20px',
                      borderRadius: '999px',
                      background: 'none',
                      border: '1px solid rgba(245, 233, 213, 0.2)',
                      color: '#f5e9d5',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Retake Quiz
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart(quizResult)
                      setQuizOpen(false)
                    }}
                    className="shimmer-button"
                    style={{
                      flex: 1,
                      padding: '12px 24px',
                      borderRadius: '999px',
                      background: 'linear-gradient(135deg, #dfb755 0%, #b88f34 100%)',
                      color: '#120702',
                      fontSize: '14px',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 18px rgba(223, 183, 85, 0.4)',
                    }}
                  >
                    <Coffee size={16} /> Add Match to Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <section style={{
        position: 'relative',
        backgroundColor: '#180c05',
        overflowX: 'clip',
        minHeight: '420px',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(80px, 12vh, 120px) 0',
        borderBottom: '1px solid rgba(245, 233, 213, 0.08)',
      }}>
        {/* Background Noise */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
          opacity: 0.07,
          pointerEvents: 'none',
        }} />

        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '55%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(223,183,85,0.10) 0%, transparent 70%)',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />

        {/* Spoon — floating levitation animation on the right side */}
        <motion.div
          className="cta-spoon-container"
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        >
          <img
            src="/spoon.png"
            alt="Artisan brass coffee spoon with roasted beans"
            aria-hidden
            draggable={false}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.85))',
            }}
          />
        </motion.div>

        {/* Main Container */}
        <div style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 60px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              maxWidth: '500px',
              width: '100%',
              zIndex: 2,
            }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(223,183,85,0.12)',
              border: '1px solid rgba(223,183,85,0.25)',
              marginBottom: '16px',
            }}>
              <Sparkles size={13} color="#dfb755" />
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#dfb755', textTransform: 'uppercase', letterSpacing: '0.09em' }}>
                Find Your Perfect Cup
              </span>
            </div>

            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.85rem, 3.2vw, 2.65rem)',
              color: '#f5e9d5',
              lineHeight: 1.22,
              marginBottom: '16px',
              letterSpacing: '0.01em',
            }}>
              Find out which artisan coffee<br />
              <span style={{ color: '#dfb755' }}>suits your palate</span>
            </h2>

            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 15.5px)',
              color: '#c4ab89',
              lineHeight: 1.7,
              marginBottom: '28px',
              maxWidth: '430px',
            }}>
              Answer 3 quick questions about your flavor preferences and we'll personally recommend your signature Broven brew — Bangalore, 2026.
            </p>

            <button
              onClick={() => { resetQuiz(); setQuizOpen(true) }}
              className="shimmer-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 30px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #dfb755 0%, #b88f34 100%)',
                color: '#120702',
                fontSize: '14px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(223, 183, 85, 0.4)',
                transition: 'transform 0.18s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Take the Flavor Quiz <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quiz modal rendered via React Portal — escapes overflow:clip parent */}
      {createPortal(quizModal, document.body)}
    </>
  )
}
