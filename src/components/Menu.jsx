import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Info, X, Flame, Coffee, Sparkles } from 'lucide-react'

const menuItems = [
  {
    id: 'cappuccino',
    category: 'classics',
    name: 'Artisan Cappuccino',
    basePrice: 4.50,
    rating: 4.9,
    description: 'Double shot espresso crowned with dense velvety steamed milk and featherlight micro-foam.',
    image: '/cup-1.png',
    origin: 'Chikmagalur, Karnataka · 1,450m Baba Budangiri',
    process: 'Single Origin · 2026 Vintage Micro-Roast',
    notes: ['Roasted Hazelnut', 'Dark Cocoa', 'Warm Honey'],
    meters: { acidity: 40, sweetness: 75, body: 85, intensity: 70 },
    pairing: 'Almond Biscotti or Cardamom Bun',
  },
  {
    id: 'latte',
    category: 'classics',
    name: 'Velvet Oat Latte',
    basePrice: 5.00,
    rating: 5.0,
    description: 'Silky micro-textured oat milk married with vibrant single-origin espresso for pure indulgence.',
    image: '/cup-2.png',
    origin: 'Sidama, Ethiopia · 2,000m',
    process: 'Natural Process · Light-Med Roast',
    notes: ['Vanilla Pod', 'Caramelized Sugar', 'Floral Jasmine'],
    meters: { acidity: 50, sweetness: 90, body: 65, intensity: 60 },
    pairing: 'Cinnamon Morning Bun',
  },
  {
    id: 'mocha',
    category: 'specialty',
    name: 'Belgian Chocolate Mocha',
    basePrice: 5.50,
    rating: 4.8,
    description: 'Rich 70% single-estate dark chocolate melted into double espresso and steamed milk.',
    image: '/cup-3.png',
    origin: 'Huehuetenango, Guatemala · 1,700m',
    process: 'Honey Process · Dark Roast',
    notes: ['Bittersweet Cacao', 'Toasted Walnut', 'Brown Spice'],
    meters: { acidity: 30, sweetness: 85, body: 95, intensity: 85 },
    pairing: 'Dark Chocolate Sea Salt Cookie',
  },
  {
    id: 'nitro-cold-brew',
    category: 'cold',
    name: 'Cascara Nitro Cold Brew',
    basePrice: 5.25,
    rating: 4.9,
    description: '18-hour cold steeped with coffee cherry cascara, infused with nitrogen for a Guinness-like cascade.',
    image: '/cup-1.png',
    origin: 'Tarrazú, Costa Rica · 1,600m',
    process: 'Slow Cold Steeped',
    notes: ['Wild Blackberry', 'Dried Fig', 'Maple Molasses'],
    meters: { acidity: 35, sweetness: 80, body: 90, intensity: 75 },
    pairing: 'Lemon Poppy Scone',
  },
  {
    id: 'bourbon-flat-white',
    category: 'specialty',
    name: 'Bourbon Vanilla Flat White',
    basePrice: 4.85,
    rating: 4.95,
    description: 'Ristretto extraction with thin velvet steamed whole milk and real scraped Madagascar vanilla bean.',
    image: '/cup-2.png',
    origin: 'Nyeri, Kenya · 1,950m',
    process: 'Double Washed · City Roast',
    notes: ['Blackcurrant', 'Bourbon Vanilla', 'Panela'],
    meters: { acidity: 65, sweetness: 80, body: 80, intensity: 80 },
    pairing: 'Pistachio Cannoli',
  },
  {
    id: 'cortado',
    category: 'classics',
    name: 'Honey Cinnamon Cortado',
    basePrice: 4.65,
    rating: 4.75,
    description: 'Equal parts punchy espresso and warm textured milk infused with raw local wildflower honey.',
    image: '/cup-3.png',
    origin: 'Cerrado Mineiro, Brazil · 1,150m',
    process: 'Pulped Natural · Full City',
    notes: ['Ceylon Cinnamon', 'Orange Blossom Honey', 'Pecan'],
    meters: { acidity: 25, sweetness: 70, body: 90, intensity: 90 },
    pairing: 'Spanish Churros with Dulce de Leche',
  },
]

const categories = [
  { id: 'all', label: 'All Creations' },
  { id: 'classics', label: 'Signature Classics' },
  { id: 'specialty', label: 'Specialty Roasts' },
  { id: 'cold', label: 'Cold Brews & Nitro' },
]

const sizeModifiers = {
  '8oz Petite': -0.40,
  '12oz Regular': 0.00,
  '16oz Grande': 0.75,
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#dfb755" style={{ flexShrink: 0 }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function CoffeeCard({ item, index, onAddToCart, onOpenTastingNotes }) {
  const [selectedSize, setSelectedSize] = useState('12oz Regular')
  const [justAdded, setJustAdded] = useState(false)

  const finalPriceNum = item.basePrice + sizeModifiers[selectedSize]
  const finalPriceFormatted = `$${finalPriceNum.toFixed(2)}`

  const handleAdd = () => {
    onAddToCart({
      ...item,
      selectedSize,
      price: finalPriceFormatted,
    })
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        flex: '1 1 300px',
        maxWidth: '340px',
        minWidth: '280px',
        paddingTop: '110px',
      }}
    >
      {/* Floating cup render */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '210px',
        height: 'auto',
        zIndex: 3,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        <img
          src={item.image}
          alt={item.name}
          draggable={false}
          style={{
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 16px 28px rgba(0,0,0,0.65)) drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
          }}
        />
      </div>

      {/* Glass card container */}
      <div
        className="glass-card"
        style={{
          position: 'relative',
          borderRadius: '24px',
          paddingTop: '80px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {/* Rating Badge */}
        <div style={{
          position: 'absolute',
          top: '14px',
          right: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 9px',
          borderRadius: '999px',
          background: 'rgba(24, 11, 4, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(223, 183, 85, 0.35)',
        }}>
          <span style={{
            fontWeight: 700,
            fontSize: '12px',
            color: '#f5e9d5',
          }}>
            {item.rating.toFixed(1)}
          </span>
          <StarIcon />
        </div>

        {/* Tasting Notes Quick Button */}
        <button
          onClick={() => onOpenTastingNotes(item)}
          aria-label="View tasting profile"
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            borderRadius: '999px',
            background: 'rgba(245, 233, 213, 0.08)',
            border: '1px solid rgba(245, 233, 213, 0.15)',
            color: '#c4ab89',
            fontSize: '11px',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#dfb755'
            e.currentTarget.style.borderColor = 'rgba(223, 183, 85, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#c4ab89'
            e.currentTarget.style.borderColor = 'rgba(245, 233, 213, 0.15)'
          }}
        >
          <Info size={12} />
          Profile
        </button>

        {/* Drink Title */}
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 700,
          fontSize: '1.45rem',
          color: '#f5e9d5',
          margin: '12px 0 0 0',
          lineHeight: 1.2,
          textAlign: 'center',
        }}>
          {item.name}
        </h3>

        {/* Flavor Notes Tags */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          flexWrap: 'wrap',
        }}>
          {item.notes.map((note) => (
            <span
              key={note}
              style={{
                fontSize: '10.5px',
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: 'rgba(223, 183, 85, 0.1)',
                border: '1px solid rgba(223, 183, 85, 0.2)',
                color: '#dfb755',
                fontWeight: 600,
              }}
            >
              {note}
            </span>
          ))}
        </div>

        {/* Description */}
        <p style={{
          fontSize: '12.5px',
          lineHeight: 1.6,
          color: 'rgba(223, 203, 175, 0.7)',
          margin: 0,
          textAlign: 'center',
          minHeight: '40px',
        }}>
          {item.description}
        </p>

        {/* Size Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '3px',
          borderRadius: '10px',
          backgroundColor: 'rgba(20, 10, 4, 0.65)',
          border: '1px solid rgba(245, 233, 213, 0.1)',
          marginTop: '4px',
        }}>
          {Object.keys(sizeModifiers).map((sizeKey) => (
            <button
              key={sizeKey}
              onClick={() => setSelectedSize(sizeKey)}
              style={{
                flex: 1,
                padding: '5px 2px',
                borderRadius: '7px',
                border: 'none',
                fontSize: '11px',
                fontWeight: selectedSize === sizeKey ? 700 : 500,
                color: selectedSize === sizeKey ? '#140803' : '#c4ab89',
                backgroundColor: selectedSize === sizeKey ? '#dfb755' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {sizeKey.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Price & Add to Cart */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '8px',
          borderTop: '1px solid rgba(245, 233, 213, 0.1)',
          marginTop: '4px',
        }}>
          <div>
            <div style={{ fontSize: '10px', color: '#c4ab89', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Price
            </div>
            <span style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 800,
              fontSize: '1.4rem',
              color: '#dfb755',
            }}>
              {finalPriceFormatted}
            </span>
          </div>

          <button
            onClick={handleAdd}
            style={{
              height: '42px',
              padding: '0 20px',
              borderRadius: '999px',
              border: 'none',
              background: justAdded
                ? '#4a9e8e'
                : 'linear-gradient(135deg, #dfb755 0%, #c19532 100%)',
              color: '#120702',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: justAdded
                ? '0 4px 14px rgba(74, 158, 142, 0.5)'
                : '0 4px 16px rgba(223, 183, 85, 0.4)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => !justAdded && (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => !justAdded && (e.currentTarget.style.transform = 'scale(1)')}
          >
            {justAdded ? (
              <>
                <Check size={16} /> Added!
              </>
            ) : (
              <>
                <Plus size={16} /> Order
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Menu({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTastingItem, setActiveTastingItem] = useState(null)

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter((i) => i.category === activeCategory)

  return (
    <section
      id="menu"
      style={{
        position: 'relative',
        backgroundColor: '#180c05',
        overflow: 'hidden',
        paddingTop: '32px',
        paddingBottom: 'clamp(60px, 9vh, 100px)',
      }}
    >
      {/* ── Marquee title banner ── */}
      <style>{`
        @keyframes marquee-ltr {
          from { transform: translateX(-50%); }
          to { transform: translateX(0%); }
        }
        .menu-marquee { animation: marquee-ltr 22s linear infinite; }
      `}</style>

      <div aria-hidden style={{ overflow: 'hidden', marginBottom: '28px', lineHeight: 1 }}>
        <div
          className="menu-marquee"
          style={{
            display: 'flex',
            width: 'max-content',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {[0, 1].map((i) => (
            <span
              key={i}
              style={{
                whiteSpace: 'nowrap',
                fontFamily: 'Playfair Display, serif',
                fontWeight: 800,
                fontSize: 'clamp(56px, 9vw, 130px)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'rgba(223, 183, 85, 0.12)',
                paddingRight: '0.4em',
                lineHeight: 1,
              }}
            >
              Curated Artisan Coffee Selection · Masterful Brews ·
            </span>
          ))}
        </div>
      </div>

      {/* ── Ambient Radial Lighting ── */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(223, 183, 85, 0.08) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 60px)',
      }}>
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
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
            <Sparkles size={14} /> Exceptional Fresh Roast
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: '#f5e9d5',
            margin: '0 0 12px 0',
          }}>
            Handcrafted with Devotion
          </h2>
          <p style={{
            color: '#c4ab89',
            fontSize: 'clamp(14px, 1.3vw, 16px)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            Each cup is custom pulled from fresh single-origin harvests and calibrated for optimum extraction and mouthfeel.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '44px',
        }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '9px 22px',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: activeCategory === cat.id ? 700 : 500,
                color: activeCategory === cat.id ? '#120702' : '#f5e9d5',
                backgroundColor: activeCategory === cat.id ? '#dfb755' : 'rgba(245, 233, 213, 0.07)',
                border: activeCategory === cat.id
                  ? '1px solid #dfb755'
                  : '1px solid rgba(245, 233, 213, 0.15)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeCategory === cat.id ? '0 4px 16px rgba(223, 183, 85, 0.35)' : 'none',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Coffee Grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          {filteredItems.map((item, i) => (
            <CoffeeCard
              key={item.id}
              item={item}
              index={i}
              onAddToCart={onAddToCart}
              onOpenTastingNotes={setActiveTastingItem}
            />
          ))}
        </div>
      </div>

      {/* ── Tasting Profile Modal ── */}
      <AnimatePresence>
        {activeTastingItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTastingItem(null)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(7, 3, 1, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 80,
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
                maxWidth: '500px',
                backgroundColor: '#1e0e06',
                backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(223, 183, 85, 0.15), transparent 70%)',
                border: '1px solid rgba(223, 183, 85, 0.35)',
                borderRadius: '24px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
                padding: '28px 32px',
                zIndex: 85,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame size={20} color="#dfb755" />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#dfb755', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Artisan Tasting Notes
                  </span>
                </div>
                <button
                  onClick={() => setActiveTastingItem(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#c4ab89',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.75rem',
                color: '#f5e9d5',
                margin: '0 0 6px 0',
              }}>
                {activeTastingItem.name}
              </h3>
              <p style={{ fontSize: '13px', color: '#c4ab89', margin: '0 0 20px 0' }}>
                {activeTastingItem.origin} · {activeTastingItem.process}
              </p>

              {/* Flavor Meters */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '24px',
                backgroundColor: 'rgba(245, 233, 213, 0.04)',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid rgba(245, 233, 213, 0.08)',
              }}>
                {Object.entries(activeTastingItem.meters).map(([key, value]) => (
                  <div key={key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px', textTransform: 'capitalize' }}>
                      <span style={{ color: '#c4ab89' }}>{key}</span>
                      <span style={{ color: '#dfb755', fontWeight: 600 }}>{value}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(245, 233, 213, 0.1)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${value}%`, height: '100%', background: 'linear-gradient(90deg, #dfb755, #4a9e8e)', borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Pairing Tip */}
              <div style={{
                fontSize: '13px',
                color: '#f5e9d5',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(223, 183, 85, 0.1)',
                border: '1px solid rgba(223, 183, 85, 0.25)',
                marginBottom: '24px',
              }}>
                <strong style={{ color: '#dfb755' }}>Recommended Food Pairing:</strong> {activeTastingItem.pairing}
              </div>

              <button
                onClick={() => {
                  onAddToCart({ ...activeTastingItem, selectedSize: '12oz Regular', price: `$${activeTastingItem.basePrice.toFixed(2)}` })
                  setActiveTastingItem(null)
                }}
                className="shimmer-button"
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '999px',
                  backgroundColor: '#dfb755',
                  color: '#140803',
                  fontSize: '14px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(223, 183, 85, 0.4)',
                }}
              >
                Add 12oz Regular to Order (${activeTastingItem.basePrice.toFixed(2)})
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
