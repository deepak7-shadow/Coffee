import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MessageSquare, CheckCircle, Sparkles, X } from 'lucide-react'

const initialReviews = [
  {
    id: 1,
    name: 'Elena Rostova',
    title: 'Certified Q-Grader & Sensory Judge',
    rating: 5,
    date: 'September 2026 · Indiranagar Lab',
    drink: 'Artisan Cappuccino · Chikmagalur Reserve',
    comment: 'The microfoam texture achieved here is comparable only to top specialty cafes in Melbourne. Balanced roast notes with zero harsh bitterness, finishing with clear hazelnut sweetness.',
    badge: 'Bangalore Connoisseur',
  },
  {
    id: 2,
    name: 'Rohan Kulkarni',
    title: 'Tech Founder & Daily Patron',
    rating: 5,
    date: 'September 2026 · Koramangala Atelier',
    drink: 'Velvet Oat Latte · Ethiopia Sidama',
    comment: 'The ambiance in Bangalore is unparalleled. Their single-origin roast over oat milk fuels my creative work every single morning. Best specialty coffee in Karnataka by far.',
    badge: 'Bangalore Regular',
  },
  {
    id: 3,
    name: 'Ananya Rao',
    title: 'Culinary Journalist, Table & Roast India',
    rating: 5,
    date: 'August 2026 · Bangalore',
    drink: 'Cascara Nitro Cold Brew',
    comment: 'The nitrogen cascade on their cascara steep is hypnotic. You get notes of sweet stone fruit, wild black cherry, and dark cacao without needing any sugar. A true triumph of roasting science.',
    badge: 'Food & Wine Critic',
  },
]

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews)
  const [writeModalOpen, setWriteModalOpen] = useState(false)
  const [authorName, setAuthorName] = useState('')
  const [drinkName, setDrinkName] = useState('Artisan Cappuccino')
  const [newRating, setNewRating] = useState(5)
  const [commentText, setCommentText] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!authorName.trim() || !commentText.trim()) return

    const newRev = {
      id: Date.now(),
      name: authorName,
      title: 'Coffee Enthusiast',
      rating: newRating,
      date: 'Just now',
      drink: drinkName,
      comment: commentText,
      badge: 'Verified Guest',
    }

    setReviews([newRev, ...reviews])
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setWriteModalOpen(false)
      setAuthorName('')
      setCommentText('')
    }, 1500)
  }

  return (
    <section
      id="reviews"
      style={{
        position: 'relative',
        backgroundColor: '#180c05',
        backgroundImage: 'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(223, 183, 85, 0.08), transparent)',
        padding: 'clamp(70px, 10vh, 110px) clamp(20px, 5vw, 60px)',
        overflow: 'hidden',
      }}
    >
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '48px',
        }}>
          <div>
            <span style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              fontWeight: 700,
              color: '#dfb755',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '8px',
            }}>
              <Sparkles size={14} /> Patron Acclaim
            </span>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: '#f5e9d5',
              margin: '0 0 10px 0',
            }}>
              Beloved by Connoisseurs
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c4ab89', fontSize: '14px' }}>
              <div style={{ display: 'flex', color: '#dfb755' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#dfb755" />
                ))}
              </div>
              <strong style={{ color: '#f5e9d5' }}>4.95 out of 5</strong>
              <span>· Based on 18,400+ verified ratings</span>
            </div>
          </div>

          <button
            onClick={() => setWriteModalOpen(true)}
            style={{
              padding: '12px 24px',
              borderRadius: '999px',
              background: 'rgba(245, 233, 213, 0.08)',
              border: '1px solid rgba(223, 183, 85, 0.3)',
              color: '#dfb755',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(223, 183, 85, 0.18)'
              e.currentTarget.style.borderColor = 'rgba(223, 183, 85, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(245, 233, 213, 0.08)'
              e.currentTarget.style.borderColor = 'rgba(223, 183, 85, 0.3)'
            }}
          >
            <MessageSquare size={16} /> Share Your Experience
          </button>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card"
              style={{
                borderRadius: '24px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Rating & Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#dfb755" color="#dfb755" />
                    ))}
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#4a9e8e',
                    backgroundColor: 'rgba(74, 158, 142, 0.12)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(74, 158, 142, 0.25)',
                  }}>
                    {rev.badge}
                  </span>
                </div>

                {/* Comment */}
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '15px',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  color: '#f5e9d5',
                  marginBottom: '16px',
                }}>
                  "{rev.comment}"
                </p>

                {/* Drink tag */}
                <div style={{
                  fontSize: '12px',
                  color: '#dfb755',
                  marginBottom: '18px',
                  fontWeight: 600,
                }}>
                  ☕ {rev.drink}
                </div>
              </div>

              {/* Author info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(245, 233, 213, 0.08)',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(223, 183, 85, 0.15)',
                  border: '1px solid rgba(223, 183, 85, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 800,
                  color: '#dfb755',
                  flexShrink: 0,
                }}>
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#f5e9d5' }}>
                    {rev.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#c4ab89' }}>
                    {rev.title} · {rev.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Write Review Modal ── */}
      <AnimatePresence>
        {writeModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWriteModalOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(7, 3, 1, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 90,
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '480px',
                backgroundColor: '#1c0e06',
                border: '1px solid rgba(223, 183, 85, 0.35)',
                borderRadius: '24px',
                padding: '30px',
                zIndex: 95,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: '#f5e9d5', margin: 0 }}>
                  Share Your Coffee Experience
                </h3>
                <button
                  onClick={() => setWriteModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#c4ab89', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <CheckCircle size={48} color="#4a9e8e" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ color: '#f5e9d5', fontSize: '1.2rem', marginBottom: '6px' }}>Thank you!</h4>
                  <p style={{ color: '#c4ab89', fontSize: '13px' }}>Your review has been shared with our roasting guild.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#c4ab89', marginBottom: '6px', fontWeight: 600 }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Jordan Miller"
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(245, 233, 213, 0.06)',
                        border: '1px solid rgba(245, 233, 213, 0.14)',
                        color: '#f5e9d5',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#c4ab89', marginBottom: '6px', fontWeight: 600 }}>
                      What drink did you order?
                    </label>
                    <select
                      value={drinkName}
                      onChange={(e) => setDrinkName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: '#1b0e06',
                        border: '1px solid rgba(245, 233, 213, 0.14)',
                        color: '#f5e9d5',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    >
                      <option value="Artisan Cappuccino">Artisan Cappuccino</option>
                      <option value="Velvet Oat Latte">Velvet Oat Latte</option>
                      <option value="Belgian Chocolate Mocha">Belgian Chocolate Mocha</option>
                      <option value="Cascara Nitro Cold Brew">Cascara Nitro Cold Brew</option>
                      <option value="Bourbon Vanilla Flat White">Bourbon Vanilla Flat White</option>
                      <option value="Honey Cinnamon Cortado">Honey Cinnamon Cortado</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#c4ab89', marginBottom: '6px', fontWeight: 600 }}>
                      Rating
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                        >
                          <Star
                            size={24}
                            fill={star <= newRating ? '#dfb755' : 'transparent'}
                            color={star <= newRating ? '#dfb755' : '#8c7358'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#c4ab89', marginBottom: '6px', fontWeight: 600 }}>
                      Your Review
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Tell us about the flavor, aroma, and service..."
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(245, 233, 213, 0.06)',
                        border: '1px solid rgba(245, 233, 213, 0.14)',
                        color: '#f5e9d5',
                        fontSize: '13.5px',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="shimmer-button"
                    style={{
                      marginTop: '6px',
                      padding: '12px',
                      borderRadius: '999px',
                      backgroundColor: '#dfb755',
                      color: '#140803',
                      fontWeight: 800,
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Post Review
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
