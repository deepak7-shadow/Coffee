import { useState } from 'react'
import { Sparkles, ArrowUp, Mail, MapPin, Clock, Check } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 3000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{
      backgroundColor: '#0d0502',
      borderTop: '1px solid rgba(245, 233, 213, 0.12)',
      paddingTop: 'clamp(60px, 8vh, 80px)',
      paddingBottom: '40px',
      position: 'relative',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      color: '#f5e9d5',
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 60px)',
      }}>
        {/* Top Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '56px',
        }}>
          {/* Brand & Manifesto */}
          <div>
            <div style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 900,
              fontSize: '1.8rem',
              color: '#f5e9d5',
              letterSpacing: '0.12em',
              marginBottom: '12px',
            }}>
              BRWW
            </div>
            <p style={{
              fontSize: '13.5px',
              lineHeight: 1.7,
              color: '#c4ab89',
              marginBottom: '20px',
            }}>
              Independent artisan micro-roasters committed to ethical direct-trade origins,
              scientific extraction, and sensory enlightenment in every porcelain cup.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: 'rgba(223, 183, 85, 0.1)',
              border: '1px solid rgba(223, 183, 85, 0.25)',
              fontSize: '12px',
              color: '#dfb755',
              fontWeight: 600,
            }}>
              <Sparkles size={13} /> SCA Certified Roaster #842
            </div>
          </div>

          {/* Roastery Locations */}
          <div>
            <h4 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#dfb755',
              marginBottom: '16px',
            }}>
              Bangalore Roast Labs
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#c4ab89' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} color="#dfb755" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#f5e9d5' }}>Indiranagar Flagship Roastery:</strong>
                  <div>12th Main Road, HAL 2nd Stage, Bangalore 560038</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} color="#dfb755" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#f5e9d5' }}>Koramangala Coffee Atelier:</strong>
                  <div>80 Feet Road, 4th Block, Bangalore 560034</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} color="#4a9e8e" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#f5e9d5' }}>Chikmagalur Estate Farm:</strong>
                  <div>Baba Budangiri Hills, Karnataka · 2026 Harvest</div>
                </div>
              </div>
            </div>
          </div>

          {/* Brewery Hours */}
          <div>
            <h4 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#dfb755',
              marginBottom: '16px',
            }}>
              Tasting Room Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#c4ab89' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Clock size={16} color="#4a9e8e" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div><strong style={{ color: '#f5e9d5' }}>Mon – Fri:</strong> 6:30 AM – 7:00 PM</div>
                  <div><strong style={{ color: '#f5e9d5' }}>Sat – Sun:</strong> 7:30 AM – 8:00 PM</div>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#4a9e8e', marginTop: '6px' }}>
                • Slow pour-over bar open all day
              </p>
            </div>
          </div>

          {/* Newsletter / Dispatch */}
          <div>
            <h4 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#dfb755',
              marginBottom: '16px',
            }}>
              The Roaster's Dispatch
            </h4>
            <p style={{ fontSize: '13px', color: '#c4ab89', lineHeight: 1.6, marginBottom: '14px' }}>
              Join 25,000+ enthusiasts. Receive first access to rare micro-lots and quarterly brewing guides.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="barista@artisan.com"
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(245, 233, 213, 0.06)',
                    border: '1px solid rgba(245, 233, 213, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#f5e9d5',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#dfb755',
                    color: '#140803',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {subscribed ? <Check size={16} /> : 'Join'}
                </button>
              </div>
              {subscribed && (
                <span style={{ fontSize: '11px', color: '#4a9e8e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={12} /> Welcome to the guild! Check your inbox.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '28px',
          borderTop: '1px solid rgba(245, 233, 213, 0.08)',
          fontSize: '12.5px',
          color: '#8c7358',
        }}>
          <div>
            © 2026 Broven Artisan Coffee Brewery · Bangalore, India. All Rights Reserved. Single-Origin Direct Trade.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="#hero" style={{ color: '#c4ab89', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#hero" style={{ color: '#c4ab89', textDecoration: 'none' }}>Terms of Craft</a>
            <button
              onClick={scrollToTop}
              style={{
                background: 'rgba(245, 233, 213, 0.08)',
                border: '1px solid rgba(245, 233, 213, 0.15)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f5e9d5',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
