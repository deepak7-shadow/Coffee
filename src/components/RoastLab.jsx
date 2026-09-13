import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, Droplets, Thermometer, Clock, Play, Pause, RotateCcw, Sparkles, Scale } from 'lucide-react'

const roastProfiles = [
  {
    level: 'Light Roast',
    tagline: 'Cinnamon & New England Roast · 202°C',
    color: '#9c663b',
    beanColor: '#a86f44',
    origin: 'Gedeo Zone, Yirgacheffe, Ethiopia (2,100m)',
    notes: 'Bergamot citrus, peach blossoms, jasmine tea & bright lemon zest.',
    characteristics: { acidity: 'Bright & Crisp', sweetness: 'Floral & Sweet', body: 'Delicate & Silky' },
    bestFor: 'V60 Pour-Over, Chemex, Aeropress',
  },
  {
    level: 'Medium Roast',
    tagline: 'City & Full City Roast · 218°C',
    color: '#6e3c1b',
    beanColor: '#633314',
    origin: 'Huila Region, Colombia (1,850m)',
    notes: 'Caramelized toffee, milk chocolate ganache, red apple & toasted almond.',
    characteristics: { acidity: 'Balanced & Juicy', sweetness: 'Deep Toffee', body: 'Smooth & Round' },
    bestFor: 'Espresso, Drip Filter, Moka Pot, Flat White',
  },
  {
    level: 'Dark Roast',
    tagline: 'Vienna & French Artisan Roast · 228°C',
    color: '#381c0c',
    beanColor: '#2b1307',
    origin: 'Takengon, Sumatra Mandheling (1,600m)',
    notes: 'Bittersweet dark cacao, smoky cedarwood, black pepper & molasses.',
    characteristics: { acidity: 'Low & Subdued', sweetness: 'Smoky Panela', body: 'Heavy & Velvety' },
    bestFor: 'French Press, Cold Brew, Cappuccino, Turkish Brew',
  },
]

const brewMethods = {
  v60: { name: 'V60 Pour-Over', ratio: 16, grind: 'Medium-Fine', tempC: 93, tempF: 200, timeSec: 195 },
  french: { name: 'French Press', ratio: 15, grind: 'Coarse Sea Salt', tempC: 95, tempF: 203, timeSec: 240 },
  aeropress: { name: 'Aeropress', ratio: 12, grind: 'Fine-Medium', tempC: 88, tempF: 190, timeSec: 105 },
  espresso: { name: 'Espresso Double', ratio: 2, grind: 'Ultra-Fine Table Powder', tempC: 92, tempF: 198, timeSec: 28 },
}

export default function RoastLab() {
  const [selectedRoast, setSelectedRoast] = useState(1) // Medium by default
  const [selectedMethod, setSelectedMethod] = useState('v60')
  const [coffeeGrams, setCoffeeGrams] = useState(18)

  // Timer state
  const currentMethodConfig = brewMethods[selectedMethod]
  const [timerSeconds, setTimerSeconds] = useState(currentMethodConfig.timeSec)
  const [timerRunning, setTimerRunning] = useState(false)

  // Reset timer whenever brew method changes
  useEffect(() => {
    setTimerSeconds(brewMethods[selectedMethod].timeSec)
    setTimerRunning(false)
  }, [selectedMethod])

  useEffect(() => {
    let interval = null
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((s) => s - 1), 1000)
    } else if (timerSeconds === 0) {
      setTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [timerRunning, timerSeconds])

  const waterMl = Math.round(coffeeGrams * currentMethodConfig.ratio)
  const activeRoastData = roastProfiles[selectedRoast]

  const formatTime = (totalSec) => {
    const m = Math.floor(totalSec / 60)
    const s = totalSec % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <section
      id="roast-lab"
      style={{
        position: 'relative',
        backgroundColor: '#140a04',
        backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(223, 183, 85, 0.07), transparent)',
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
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            fontWeight: 700,
            color: '#dfb755',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '10px',
          }}>
            <Flame size={14} /> The Alchemy of Coffee
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
            color: '#f5e9d5',
            margin: '0 0 14px 0',
          }}>
            The Artisan Roast Lab
          </h2>
          <p style={{
            color: '#c4ab89',
            fontSize: 'clamp(14.5px, 1.4vw, 16.5px)',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Explore how heat profiling transforms raw green Arabica seeds into nuanced sensory masterworks, and dial in your optimal brew ratio.
          </p>
        </div>

        {/* ── Feature 1: Roast Spectrum Explorer ── */}
        <div
          className="glass-panel"
          style={{
            borderRadius: '28px',
            padding: 'clamp(24px, 4vw, 40px)',
            marginBottom: '48px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
            <div>
              <h3 style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#f5e9d5',
                margin: 0,
              }}>
                1. Roast Spectrum Profiling
              </h3>
              <p style={{ color: '#c4ab89', fontSize: '13px', margin: '4px 0 0 0' }}>
                Select a roast degree to see bean chemistry, origins, and flavor metrics.
              </p>
            </div>

            {/* Roast Toggle Pills */}
            <div style={{
              display: 'flex',
              gap: '6px',
              backgroundColor: 'rgba(14, 6, 2, 0.7)',
              padding: '4px',
              borderRadius: '999px',
              border: '1px solid rgba(245, 233, 213, 0.1)',
            }}>
              {roastProfiles.map((r, idx) => (
                <button
                  key={r.level}
                  onClick={() => setSelectedRoast(idx)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    border: 'none',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: selectedRoast === idx ? '#140803' : '#c4ab89',
                    backgroundColor: selectedRoast === idx ? '#dfb755' : 'transparent',
                    boxShadow: selectedRoast === idx ? '0 2px 10px rgba(223, 183, 85, 0.4)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {r.level}
                </button>
              ))}
            </div>
          </div>

          {/* Roast Profile Detail Card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            alignItems: 'center',
          }}>
            {/* Visual Bean & Temp */}
            <div style={{
              backgroundColor: 'rgba(20, 9, 3, 0.7)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(245, 233, 213, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              {/* Simulated 3D Bean SVG */}
              <div style={{ position: 'relative', width: '90px', height: '90px', marginBottom: '16px' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${activeRoastData.beanColor} 30%, #150904 90%)`,
                  boxShadow: `0 0 30px ${activeRoastData.beanColor}66`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {/* Bean Creep S-Curve Line */}
                  <div style={{
                    width: '4px',
                    height: '60px',
                    backgroundColor: '#e8d5b7',
                    opacity: 0.35,
                    borderRadius: '2px',
                    transform: 'rotate(25deg)',
                  }} />
                </div>
              </div>

              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#f5e9d5',
                marginBottom: '4px',
              }}>
                {activeRoastData.level}
              </div>
              <div style={{ fontSize: '12px', color: '#dfb755', fontWeight: 600, marginBottom: '16px' }}>
                {activeRoastData.tagline}
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                padding: '10px 16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(245, 233, 213, 0.05)',
                fontSize: '12px',
                color: '#c4ab89',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Thermometer size={14} color="#dfb755" /> Peak Heat
                </span>
                <span style={{ color: '#f5e9d5', fontWeight: 700 }}>
                  {activeRoastData.tagline.split('·')[1]}
                </span>
              </div>
            </div>

            {/* Tasting Notes & Characteristics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#dfb755', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Featured Micro-Lot Origin
                </span>
                <h4 style={{ fontSize: '1.15rem', color: '#f5e9d5', margin: '4px 0 6px 0', fontWeight: 700 }}>
                  {activeRoastData.origin}
                </h4>
                <p style={{ fontSize: '13.5px', color: '#c4ab89', margin: 0, lineHeight: 1.6 }}>
                  {activeRoastData.notes}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(245, 233, 213, 0.1)',
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#c4ab89' }}>Acidity</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#f5e9d5', marginTop: '2px' }}>
                    {activeRoastData.characteristics.acidity}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#c4ab89' }}>Sweetness</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#dfb755', marginTop: '2px' }}>
                    {activeRoastData.characteristics.sweetness}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#c4ab89' }}>Mouthfeel</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#4a9e8e', marginTop: '2px' }}>
                    {activeRoastData.characteristics.body}
                  </div>
                </div>
              </div>

              <div style={{
                fontSize: '12.5px',
                color: '#f5e9d5',
                padding: '10px 14px',
                borderRadius: '10px',
                backgroundColor: 'rgba(223, 183, 85, 0.08)',
                border: '1px solid rgba(223, 183, 85, 0.2)',
              }}>
                <strong style={{ color: '#dfb755' }}>Best Suited For:</strong> {activeRoastData.bestFor}
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature 2: Barista Brew Calculator & Extraction Timer ── */}
        <div
          className="glass-panel"
          style={{
            borderRadius: '28px',
            padding: 'clamp(24px, 4vw, 40px)',
          }}
        >
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#f5e9d5',
              margin: 0,
            }}>
              2. Interactive Barista Brew Calculator
            </h3>
            <p style={{ color: '#c4ab89', fontSize: '13px', margin: '4px 0 0 0' }}>
              Select your extraction method and adjust coffee grounds to calculate the golden cup ratio.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
          }}>
            {/* Left: Configuration */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#c4ab89', marginBottom: '8px', textTransform: 'uppercase' }}>
                Brewing Equipment
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '24px' }}>
                {Object.entries(brewMethods).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMethod(key)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: selectedMethod === key ? 'rgba(223, 183, 85, 0.2)' : 'rgba(245, 233, 213, 0.05)',
                      border: selectedMethod === key ? '1px solid #dfb755' : '1px solid rgba(245, 233, 213, 0.1)',
                      color: selectedMethod === key ? '#dfb755' : '#f5e9d5',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.18s ease',
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Coffee Grams Slider */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#c4ab89', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Scale size={15} color="#dfb755" /> Coffee Dose
                  </span>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#dfb755' }}>
                    {coffeeGrams}g
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={50}
                  step={1}
                  value={coffeeGrams}
                  onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: '#dfb755',
                    cursor: 'pointer',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8c7358', marginTop: '4px' }}>
                  <span>12g (Single Cup)</span>
                  <span>30g (Pour for Two)</span>
                  <span>50g (Large Carafe)</span>
                </div>
              </div>
            </div>

            {/* Right: Calculated Metrics & Live Timer */}
            <div style={{
              backgroundColor: 'rgba(18, 8, 2, 0.8)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(223, 183, 85, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#dfb755', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Recipe Yield
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  margin: '16px 0',
                }}>
                  <div style={{ backgroundColor: 'rgba(245, 233, 213, 0.04)', padding: '12px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#c4ab89', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Droplets size={13} color="#4a9e8e" /> Water Needed
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f5e9d5', marginTop: '4px' }}>
                      {waterMl} <span style={{ fontSize: '13px', fontWeight: 500, color: '#c4ab89' }}>ml</span>
                    </div>
                  </div>

                  <div style={{ backgroundColor: 'rgba(245, 233, 213, 0.04)', padding: '12px', borderRadius: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#c4ab89', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Thermometer size={13} color="#dfb755" /> Water Temp
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f5e9d5', marginTop: '4px' }}>
                      {currentMethodConfig.tempC}°C <span style={{ fontSize: '13px', fontWeight: 500, color: '#c4ab89' }}>({currentMethodConfig.tempF}°F)</span>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#c4ab89', marginBottom: '16px' }}>
                  Recommended Grind: <strong style={{ color: '#dfb755' }}>{currentMethodConfig.grind}</strong> · Ratio: <strong style={{ color: '#f5e9d5' }}>1:{currentMethodConfig.ratio}</strong>
                </div>
              </div>

              {/* Extraction Timer Bar */}
              <div style={{
                backgroundColor: 'rgba(245, 233, 213, 0.06)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Clock size={20} color="#dfb755" />
                  <div>
                    <div style={{ fontSize: '10px', color: '#c4ab89', textTransform: 'uppercase' }}>Target Extraction</div>
                    <div style={{ fontFamily: 'monospace', fontSize: '1.6rem', fontWeight: 800, color: '#f5e9d5' }}>
                      {formatTime(timerSeconds)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '999px',
                      border: 'none',
                      backgroundColor: timerRunning ? '#e06c6c' : '#dfb755',
                      color: '#140803',
                      fontWeight: 800,
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {timerRunning ? <Pause size={14} /> : <Play size={14} />}
                    {timerRunning ? 'Pause' : 'Start Timer'}
                  </button>

                  <button
                    onClick={() => {
                      setTimerRunning(false)
                      setTimerSeconds(currentMethodConfig.timeSec)
                    }}
                    style={{
                      background: 'rgba(245, 233, 213, 0.1)',
                      border: '1px solid rgba(245, 233, 213, 0.15)',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f5e9d5',
                      cursor: 'pointer',
                    }}
                  >
                    <RotateCcw size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
