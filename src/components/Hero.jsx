import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { Sparkles, Award, Flame, ArrowDown, Coffee } from 'lucide-react'

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -36 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
})

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

function HeroCoffeeImage({ rotateX, rotateY, cupX, cupY }) {
  return (
    <div
      style={{
        position: 'relative',
        perspective: '1200px',
        perspectiveOrigin: 'center center',
        transformStyle: 'preserve-3d',
        flexShrink: 0,
      }}
    >
      {/* Ambient Backlight for Image */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '70%',
        height: '70%',
        background: 'radial-gradient(circle, rgba(223, 183, 85, 0.32) 0%, rgba(200, 140, 50, 0.1) 50%, transparent 75%)',
        filter: 'blur(50px)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Floating Animated Steam Particles */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '42%',
        width: '18px',
        height: '45px',
        background: 'radial-gradient(ellipse at center, rgba(255, 245, 230, 0.45) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(4px)',
        zIndex: 15,
        pointerEvents: 'none',
      }} className="steam-particle-1" />

      <div style={{
        position: 'absolute',
        top: '18%',
        left: '52%',
        width: '22px',
        height: '55px',
        background: 'radial-gradient(ellipse at center, rgba(255, 245, 230, 0.35) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(5px)',
        zIndex: 15,
        pointerEvents: 'none',
      }} className="steam-particle-2" />

      {/* 3D Floating Coffee Image Container with Continuous Levitation */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotateZ: [-0.6, 0.6, -0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 4.8,
          ease: 'easeInOut',
        }}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <motion.img
          src="/hero-coffee.png"
          alt="Broven artisan coffee cups"
          style={{
            width: 'clamp(380px, 46vw, 700px)',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
            rotateX,
            rotateY,
            x: cupX,
            y: cupY,
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 32px 56px rgba(0,0,0,0.85)) drop-shadow(0 10px 24px rgba(0,0,0,0.65))',
            position: 'relative',
            zIndex: 5,
            cursor: 'grab',
          }}
          draggable={false}
        />

        {/* Floating Award Badge with True 3D Depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: '22%',
            left: '-2%',
            backgroundColor: 'rgba(28, 14, 6, 0.90)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(223, 183, 85, 0.45)',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.75)',
            zIndex: 25,
            transform: 'translateZ(50px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'rgba(223, 183, 85, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#dfb755',
          }}>
            <Award size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#c4ab89', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              World Barista Guild
            </div>
            <div style={{ fontSize: '13.5px', color: '#f5e9d5', fontWeight: 700 }}>
              Gold Cup of Excellence 2026
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Hero({ onOpenCart }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Responsive spring physics for true 3D tilt
  const springConfig = { stiffness: 100, damping: 16, mass: 0.6 }
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-18, 18]), springConfig)
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [16, -16]), springConfig)
  const cupX = useSpring(useTransform(mouseX, [-1, 1], [-14, 14]), springConfig)
  const cupY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(Math.max(-1, Math.min(1, x)))
      mouseY.set(Math.max(-1, Math.min(1, y)))
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  const scrollToMenu = () => {
    const el = document.querySelector('#menu')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToRoastLab = () => {
    const el = document.querySelector('#roast-lab')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'clip',
        backgroundColor: '#180c05',
        backgroundImage: [
          'radial-gradient(ellipse 70% 60% at 85% 45%, rgba(68, 33, 14, 0.95) 0%, transparent 70%)',
          'radial-gradient(ellipse 50% 50% at 95% 10%, rgba(55, 25, 8, 0.7) 0%, transparent 60%)',
          'radial-gradient(ellipse 60% 50% at 15% 90%, rgba(30, 14, 5, 0.8) 0%, transparent 70%)',
        ].join(', '),
      }}
    >
      {/* ── Leather grain SVG noise ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '300px 300px',
        opacity: 0.08,
        pointerEvents: 'none',
      }} />

      {/* ── Ambient Gold Orbs ── */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '450px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(223, 183, 85, 0.12) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* ── Left-side dark gradient to guarantee text readability ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(95deg, rgba(14, 6, 2, 0.88) 0%, rgba(14, 6, 2, 0.55) 45%, rgba(14, 6, 2, 0) 75%)',
        pointerEvents: 'none',
      }} />

      {/* ── Hero Main Content ── */}
      <div style={{
        position: 'relative',
        zIndex: 30,
        width: '100%',
        maxWidth: '1320px',
        margin: '0 auto',
        padding: 'clamp(120px, 16vh, 160px) clamp(24px, 6vw, 80px) clamp(70px, 10vh, 110px)',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(32px, 5vw, 80px)',
        pointerEvents: 'none',
      }}>
        <div style={{ maxWidth: 'clamp(440px, 44vw, 540px)', flex: '1 1 auto', position: 'relative', zIndex: 30, pointerEvents: 'auto' }}>

          {/* Fresh Roast Live Status Chip */}
          <motion.div {...fadeLeft(0.1)} style={{ marginBottom: '24px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '7px 18px',
              borderRadius: '999px',
              border: '1px solid rgba(223, 183, 85, 0.35)',
              background: 'rgba(38, 20, 9, 0.75)',
              backdropFilter: 'blur(12px)',
              color: '#f5e9d5',
              fontSize: '13px',
              fontWeight: 600,
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#4a9e8e',
                boxShadow: '0 0 10px #4a9e8e',
                flexShrink: 0,
              }} />
              <span>Roasting Fresh in Bangalore</span>
              <span style={{ color: 'rgba(245, 233, 213, 0.3)' }}>|</span>
              <span style={{ color: '#dfb755', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={13} /> 2026 Harvest Edition
              </span>
            </span>
          </motion.div>

          {/* Luxury Main Headline */}
          <motion.h1
            {...fadeLeft(0.22)}
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 4.6vw, 4.1rem)',
              lineHeight: 1.08,
              color: '#fbf5ed',
              letterSpacing: '-0.02em',
              margin: 0,
              marginBottom: '22px',
              maxWidth: '520px',
            }}
          >
            Discover the <br />
            <span className="gold-gradient-text" style={{ fontStyle: 'italic', fontFamily: 'Playfair Display, serif' }}>
              Superior
            </span>{' '}
            Taste <br />
            in Every Sip!
          </motion.h1>

          {/* Sub-paragraph */}
          <motion.p
            {...fadeLeft(0.36)}
            style={{
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              lineHeight: 1.75,
              color: '#c4ab89',
              marginBottom: '36px',
              maxWidth: '480px',
            }}
          >
            For us, coffee is not just a drink — it's an art. Direct-trade, single-origin beans
            slow roasted in vintage cast iron drums for unmatched aroma, velvety body, and exquisite sweetness.
          </motion.p>

          {/* CTA Buttons Row */}
          <motion.div
            {...fadeUp(0.5)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '44px',
            }}
          >
            <button
              onClick={scrollToMenu}
              className="shimmer-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '15px 34px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #dfb755 0%, #b58d34 100%)',
                color: '#120702',
                fontSize: '15px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.01em',
                boxShadow: '0 6px 26px rgba(223, 183, 85, 0.4)',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 32px rgba(223, 183, 85, 0.55)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 6px 26px rgba(223, 183, 85, 0.4)'
              }}
            >
              <Coffee size={18} />
              Explore Menu
            </button>

            <button
              onClick={scrollToRoastLab}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                borderRadius: '999px',
                background: 'rgba(245, 233, 213, 0.08)',
                color: '#f5e9d5',
                border: '1px solid rgba(245, 233, 213, 0.22)',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(223, 183, 85, 0.16)'
                e.currentTarget.style.borderColor = 'rgba(223, 183, 85, 0.5)'
                e.currentTarget.style.color = '#dfb755'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(245, 233, 213, 0.08)'
                e.currentTarget.style.borderColor = 'rgba(245, 233, 213, 0.22)'
                e.currentTarget.style.color = '#f5e9d5'
              }}
            >
              <Sparkles size={16} color="#dfb755" />
              Interactive Roast Lab
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            {...fadeUp(0.62)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(20px, 4vw, 36px)',
              paddingTop: '24px',
              borderTop: '1px solid rgba(245, 233, 213, 0.12)',
            }}
          >
            <div>
              <div style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 900,
                fontSize: '1.6rem',
                color: '#f5e9d5',
                lineHeight: 1,
              }}>
                12+
              </div>
              <div style={{ fontSize: '12px', color: '#c4ab89', marginTop: '4px' }}>
                Single Origins
              </div>
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(245, 233, 213, 0.12)' }} />

            <div>
              <div style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 900,
                fontSize: '1.6rem',
                color: '#dfb755',
                lineHeight: 1,
              }}>
                4.95 ★
              </div>
              <div style={{ fontSize: '12px', color: '#c4ab89', marginTop: '4px' }}>
                18k+ Patron Reviews
              </div>
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(245, 233, 213, 0.12)' }} />

            <div>
              <div style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 900,
                fontSize: '1.6rem',
                color: '#4a9e8e',
                lineHeight: 1,
              }}>
                48 hrs
              </div>
              <div style={{ fontSize: '12px', color: '#c4ab89', marginTop: '4px' }}>
                Fresh Roast Guarantee
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Hero Image: positioned right, bleeding into top navbar ── */}
      <div style={{
        position: 'absolute',
        top: '-70px',
        right: 'clamp(-20px, 1.5vw, 36px)',
        zIndex: 15,
        pointerEvents: 'auto',
      }}>
        <HeroCoffeeImage
          rotateX={rotateX}
          rotateY={rotateY}
          cupX={cupX}
          cupY={cupY}
        />
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        onClick={scrollToMenu}
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          zIndex: 25,
          color: 'rgba(223, 183, 85, 0.6)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll to Explore</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  )
}
