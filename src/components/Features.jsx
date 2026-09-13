import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Award, Sparkles, HeartHandshake, Compass, Coffee } from 'lucide-react'

function SeamlessVideo({ src }) {
  const refA = useRef(null)
  const refB = useRef(null)
  const active = useRef('A')
  const rafId = useRef(null)

  useEffect(() => {
    const a = refA.current
    const b = refB.current
    if (!a || !b) return

    a.play().catch(() => {})

    function tick() {
      const primary = active.current === 'A' ? a : b
      const secondary = active.current === 'A' ? b : a

      if (primary && primary.readyState >= 2 && primary.duration) {
        const remaining = primary.duration - primary.currentTime

        if (remaining <= 0.5 && secondary.paused) {
          secondary.currentTime = 0
          secondary.play().catch(() => {})
        }

        if (primary.ended || remaining <= 0.05) {
          primary.style.opacity = '0'
          secondary.style.opacity = '1'
          active.current = active.current === 'A' ? 'B' : 'A'
          primary.pause()
        }
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId.current)
      if (a) a.pause()
      if (b) b.pause()
    }
  }, [src])

  const base = {
    width: '100%',
    display: 'block',
    mixBlendMode: 'screen',
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <video ref={refA} src={src} muted playsInline preload="auto" style={{ ...base }} />
      <video
        ref={refB}
        src={src}
        muted
        playsInline
        preload="auto"
        style={{ ...base, position: 'absolute', top: 0, left: 0, opacity: 0, transition: 'opacity 0.15s' }}
      />
    </div>
  )
}

const BG = '#180c05'

const leftFeatures = [
  {
    number: '01',
    icon: Coffee,
    title: 'Direct-Trade Micro Lots',
    description: 'Our obsession begins with selecting the top 1% harvest Arabica seeds directly from generational smallholder farmers in Antioquia and Yirgacheffe, roasted within 48 hours of shipment.',
  },
  {
    number: '02',
    icon: Compass,
    title: 'Atmosphere of Inspiration',
    description: 'Our sensory coffee spaces are crafted from reclaimed oak and forged copper. Surrounded by attentive baristas, you are invited to linger, converse, and find creative respite.',
  },
]

const rightFeatures = [
  {
    number: '03',
    icon: HeartHandshake,
    title: 'Bespoke Guest Extraction',
    description: 'We dial in grind fineness, water mineral content, and extraction pressure to your personal palate. Every cup is an intentional celebration tailored just for you.',
  },
  {
    number: '04',
    icon: Award,
    title: 'Championship Barista Guild',
    description: 'Our team comprises national barista champions and certified Q-Graders who live and breathe extraction science, latte art mastery, and warm hospitality.',
  },
]

function fadeIn(delay = 0, x = 0) {
  return {
    initial: { opacity: 0, x, y: x === 0 ? 20 : 0 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }
}

function FeatureCard({ number, icon: Icon, title, description, side, delay }) {
  const isLeft = side === 'left'
  return (
    <motion.div
      {...fadeIn(delay, isLeft ? -24 : 24)}
      style={{
        position: 'relative',
        backgroundColor: 'rgba(28, 14, 6, 0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(245, 233, 213, 0.12)',
        borderRadius: '20px',
        padding: '24px 28px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
        transition: 'border-color 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(223, 183, 85, 0.4)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(245, 233, 213, 0.12)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          backgroundColor: 'rgba(223, 183, 85, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#dfb755',
        }}>
          <Icon size={18} />
        </div>
        <span style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 900,
          fontSize: '18px',
          color: 'rgba(223, 183, 85, 0.4)',
          letterSpacing: '0.05em',
        }}>
          {number}
        </span>
      </div>

      <h3 style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '1.2rem',
        color: '#f5e9d5',
        margin: '0 0 8px 0',
        lineHeight: 1.3,
      }}>
        {title}
      </h3>

      <p style={{
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fontSize: '13px',
        lineHeight: 1.65,
        color: '#c4ab89',
        margin: 0,
      }}>
        {description}
      </p>
    </motion.div>
  )
}

export default function Features({ onOpenCart }) {
  return (
    <section
      id="features"
      style={{
        position: 'relative',
        backgroundColor: BG,
        padding: 'clamp(70px, 9vh, 110px) clamp(20px, 5vw, 60px) clamp(90px, 11vh, 130px)',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(245, 233, 213, 0.08)',
      }}
    >
      {/* Subtle Noise Grain */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.68' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '300px 300px',
        opacity: 0.07,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        maxWidth: '1240px',
        margin: '0 auto',
      }}>
        {/* Section Title */}
        <motion.div
          {...fadeIn(0)}
          style={{ textAlign: 'center', marginBottom: 'clamp(44px, 6vh, 64px)' }}
        >
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
            <Sparkles size={14} /> The Artisan Philosophy
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800,
            fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
            color: '#f5e9d5',
            margin: '0 0 10px 0',
          }}>
            Crafted Without Compromise
          </h2>
          <p style={{
            color: '#c4ab89',
            fontSize: '15px',
            maxWidth: '540px',
            margin: '0 auto',
          }}>
            From fertile volcanic soils to the precision pour in your porcelain cup, every step is an act of care.
          </p>
        </motion.div>

        {/* 3-Column Layout: Left Cards | Center Video | Right Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          alignItems: 'center',
          gap: 'clamp(24px, 3.5vw, 48px)',
        }}>
          {/* Left features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {leftFeatures.map((f, i) => (
              <FeatureCard key={f.number} {...f} side="left" delay={0.1 + i * 0.12} />
            ))}
          </div>

          {/* Center — Seamless Video with luxury glow frame */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
              borderRadius: '24px',
              padding: '10px',
              background: 'radial-gradient(circle, rgba(223, 183, 85, 0.2) 0%, transparent 70%)',
            }}>
              <SeamlessVideo src="/cup-video.mp4" />
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={onOpenCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="shimmer-button"
              style={{
                marginTop: '16px',
                padding: '13px 36px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #dfb755 0%, #b88f34 100%)',
                color: '#140803',
                fontSize: '14px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.02em',
                boxShadow: '0 6px 20px rgba(223, 183, 85, 0.4)',
              }}
            >
              Order This Brew
            </motion.button>
          </div>

          {/* Right features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {rightFeatures.map((f, i) => (
              <FeatureCard key={f.number} {...f} side="right" delay={0.1 + i * 0.12} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
