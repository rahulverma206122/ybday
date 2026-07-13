// src/pages/Gifts.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { useNavigate } from 'react-router-dom'

const floatingPhotos = [
  { id: 0, src: '/y1.jpeg', left: 3,  top: 9,  rotate: -12, size: 90,  duration: 4.0, delay: 0.0 },
  { id: 1, src: '/y2.jpeg', left: 70, top: 6,  rotate: 10,  size: 95,  duration: 4.5, delay: 0.5 },
  { id: 2, src: '/y3.jpeg', left: 72, top: 42, rotate: -7,  size: 83,  duration: 3.8, delay: 1.0 },
  { id: 3, src: '/y4.jpeg', left: 18, top: 48, rotate: 13,  size: 86,  duration: 4.2, delay: 0.3 },
  { id: 4, src: '/y1.jpeg', left: 8,  top: 78, rotate: -10, size: 80,  duration: 5.0, delay: 0.8 },
  { id: 5, src: '/y6.jpeg', left: 74, top: 75, rotate: 8,   size: 85,  duration: 4.3, delay: 1.2 },
  { id: 6, src: '/y6.jpeg', left: 22, top: 4,  rotate: 6,   size: 77,  duration: 3.6, delay: 0.6 },
  { id: 7, src: '/y2.jpeg', left: 50, top: 7,  rotate: -9,  size: 80,  duration: 4.8, delay: 0.2 },
  { id: 8, src: '/y5.jpeg', left: 92, top: 65, rotate: 8,   size: 85,  duration: 4.3, delay: 1.2 },
  { id: 9, src: '/y6.jpeg', left: 93, top: 22,  rotate: 6,   size: 80,  duration: 3.6, delay: 0.6 },
  { id: 10, src: '/y3.jpeg', left: 3, top: 37,  rotate: -9,  size: 80,  duration: 4.8, delay: 0.2 },
]

// ── GIFT DATA — image add karo jab gift lo ──
const gifts = [
{
  id: 1,
  emoji: '💐',
  name: 'Goddess And Twilight Perfume',
  image: 'g1.jpeg',
  color: 'linear-gradient(135deg, #ff6b9d, #ff9de2)',
  description: 'You deserve a fragrance as lovely and unforgettable as you. This little gift is for the moments when you want to feel extra special. 💜',
  letter: 'I wanted to gift you something that stays with you throughout the day. Just like your presence stays in my thoughts, I hope this fragrance stays with you and makes you smile. ✨',
},
 {
  id: 3,
  emoji: '👖',
  name: 'Light Blue Jeans',
  image: 'g3.jpeg',
  color: 'linear-gradient(135deg, #6fa8dc, #b7d7f7)',
  description: 'A simple pair of jeans chosen specially for you — comfortable, stylish, and perfect for all the adventures ahead. 💙',
  letter: 'I chose these jeans because I know how good you look in them. My hope is that whenever you wear them, they bring you comfort, and a little reminder that they were picked with lots of care. 👖💙✨',
},
 {
  id: 4,
  emoji: '🤍',
  name: 'A White Top',
  image: 'g4.jpeg',
  color: 'linear-gradient(135deg, #f5f5f5, #dcdcdc)',
  description: 'Simple, elegant, and beautiful — just like you. A white top that I thought would look perfect on you. 🤍✨',
  letter: 'I saw this white top and instantly thought of you. Simple things often look the most beautiful, and I know you’ll make it look even better. I hope you wear it with a smile. 🤍✨',
},
{
  id: 5,
  emoji: '👔',
  name: 'Blue & White Zip Shirt',
  image: 'g5.jpeg',
  color: 'linear-gradient(135deg, #6fa8dc, #ffffff)',
  description: 'A stylish blue and white shirt that caught my eye instantly. Simple, classy, and perfect for you. 💙🤍',
  letter: 'The moment I saw this shirt, I thought it would suit you perfectly. The blue and white colors felt calm, and beautiful - just like your personality. I hope you wear it and feel as special as you are. 💙🤍',
},
{
  id: 6,
  emoji: '🩴',
  name: 'Blue Flat Slippers',
  image: 'g6.jpeg',
  color: 'linear-gradient(135deg, #4a90e2, #87ceeb)',
  description: 'A comfy pair of blue slippers for your everyday adventures. Simple, cute, and made to keep you comfortable. 💙🩴',
  letter: 'Not every gift has to be grand. Sometimes the smallest things make daily life a little better. I hope these slippers bring you comfort and remind you that someone is always thinking about you. 💙🩴✨',
},
{
  id: 7,
  emoji: '💄',
  name: 'Lip Beauty Set',
  image: 'g7.jpeg',
  color: 'linear-gradient(135deg, #ff6b81, #f8a5c2)',
  description: 'A lovely set of lip tints, glosses, and nourishing lip oil in beautiful shades to add the perfect finishing touch to your look. 💄💕',
  letter: 'Just a little gift to make your beautiful smile shine a little brighter. These lip colors are for all your happy moments—whether it’s a casual day out or a special occasion. I hope every shade brings you confidence, happiness, and reminds you how amazing you are. Keep smiling, because it looks beautiful on you. 💕✨',
},
{
  id: 8,
  emoji: '✨',
  name: 'Beauty & Self-Care Kit',
  image: 'g8.jpeg',
  color: 'linear-gradient(135deg, #7b68ee, #b39ddb)',
  description: 'A perfect blend of beauty and self-care essentials—from makeup to hair care—for a fresh, confident look every day. 💜✨',
  letter: 'A little collection to pamper yourself and feel your best. I hope these everyday essentials bring a smile to your face and a little extra confidence wherever you go. 💖',
},
{
  id: 9,
  emoji: '💖',
  name: 'Pink Glam Set',
  image: 'g9.jpeg',
  color: 'linear-gradient(135deg, #ff7aa2, #ffc1d6)',
  description: 'A charming collection of beauty essentials with lipstick, lip tint, kajal, compact, and a blender for the perfect everyday glam. 💄✨',
  letter: 'A little touch of pink, a little touch of confidence. I hope this beauty set makes every day feel a little brighter and every smile a little more beautiful. 💕',
},
{
  id: 10,
  emoji: '👚',
  name: 'Elegant Maroon Top',
  image: 'g10.jpeg',
  color: 'linear-gradient(135deg, #7b1e3d, #b23a5b)',
  description: 'A classy maroon top with a timeless design that pairs effortlessly with any outfit. Simple, elegant, and perfect for every occasion. ❤️✨',
  letter: 'A little outfit to make you feel as beautiful as you truly are. I hope every time you wear it, it brings you confidence, comfort, and a smile. 💖',
},
{
  id: 11,
  emoji: '🤎',
  name: 'Classic Brown Top',
  image: 'g11.jpeg',
  color: 'linear-gradient(135deg, #5a3825, #8b5e3c)',
  description: 'A chic brown full-sleeve top with a sleek, minimal design that’s perfect for effortless everyday style. 🤎✨',
  letter: 'A simple outfit that never goes out of style. I hope it keeps you comfortable, confident, and reminds you how effortlessly beautiful you are. 💕',
},
{
  id: 12,
  emoji: '👗',
  name: 'Floral Brown Dress',
  image: 'g12.jpeg',
  color: 'linear-gradient(135deg, #4e342e, #8d6e63)',
  description: 'A graceful floral brown dress with a timeless silhouette, perfect for making every moment feel a little more special. 🤎🌸',
  letter: 'A dress as lovely as the person wearing it. I hope it makes you feel confident, elegant, and ready to create beautiful memories. 💖✨',
},
{
  id: 13,
  emoji: '✨',
  name: 'Golden Crystal Bracelet',
  image: 'g13.jpeg',
  color: 'linear-gradient(135deg, #d4af37, #f7e7a1)',
  description: 'A stunning golden bracelet adorned with sparkling crystals, adding the perfect touch of elegance to any outfit. ✨💛',
  letter: 'A little sparkle to remind you how precious you are. I hope this bracelet adds elegance to your style and a smile to your heart. 💖✨',
},
{
  id: 19,
  emoji: '🤍',
  name: 'Silver Jewelry Set',
  image: 'g19.jpeg',
  color: 'linear-gradient(135deg, #cfd8dc, #f5f5f5)',
  description: 'A delicate silver payal and pearl ring set, designed to add a touch of elegance to every outfit. 🤍✨',
  letter: 'Some gifts shine quietly, just like this little jewelry set. I hope it reminds you that true beauty is found in the little details. 💖',
},
{
  id: 14,
  emoji: '🩷',
  name: 'Barbie Tumbler',
  image: 'g14.jpeg',
  color: 'linear-gradient(135deg, #ff7eb3, #ffc1d9)',
  description: 'A cute Barbie tumbler to keep your favorite drinks close and make every sip a little more fun. 🩷🥤',
  letter: 'Stay hydrated, stay happy, and keep smiling. I hope this little tumbler brightens your day with every sip. 💖✨',
},
{
  id: 15,
  emoji: '🧸',
  name: 'Cozy Towel Set',
  image: 'g15.jpeg',
  color: 'linear-gradient(135deg, #a8d8ff, #ffffff)',
  description: 'A soft and adorable towel set with a cute panda design, perfect for adding comfort and a little joy to your daily routine. 🧸🤍',
  letter: 'A little bit of softness for your everyday moments. I hope this cozy towel set keeps you warm, comfortable, and smiling every day. 💙✨',
},
{
  id: 16,
  emoji: '👠',
  name: 'Elegant Maroon Flats',
  image: 'g16.jpeg',
  color: 'linear-gradient(135deg, #5c1f2f, #8b3a4a)',
  description: 'A pair of elegant maroon flats designed for all-day comfort and timeless style. Perfect for adding a graceful touch to any outfit. 👠❤️',
  letter: 'Every step you take deserves comfort and confidence. I hope these beautiful flats walk with you through many happy moments. 💖✨',
},
{
  id: 18,
  emoji: '📖',
  name: 'Birthday Magazine',
  image: 'g18.jpeg',
  color: 'linear-gradient(135deg, #87ceeb, #f8d7da)',
  description: 'A personalized birthday magazine filled with your favorite memories, beautiful photos, and heartfelt moments made just for you. 📖💖',
  letter: 'A little collection of memories and moments that celebrate you. I hope this magazine brings back happy memories and makes your birthday even more special. 💕✨',
},
{
  id: 20,
  emoji: '💌',
  name: 'Cute Greeting Card',
  image: 'g20.jpeg',
  color: 'linear-gradient(135deg, #ff9ec4, #ffd6e7)',
  description: 'An adorable greeting card with a sweet little message, perfect for sharing love, smiles, and heartfelt wishes. 🐱💖',
  letter: 'Sometimes a few heartfelt words mean more than any gift. I hope this little card always reminds you how loved and special you are. 💕✨',
},
{
  id: 21,
  emoji: '👜',
  name: 'Elegant Handbag',
  image: 'g21.jpeg',
  color: 'linear-gradient(135deg, #7a4b5f, #c89aa8)',
  description: 'A stylish quilted handbag that adds elegance to every outfit, blending timeless charm with everyday sophistication. ✨👜',
  letter: 'Just like this beautiful handbag, I hope you always carry confidence wherever you go. You deserve all the little luxuries that make you smile. 🤎✨',
},
{
  id: 22,
  emoji: '🪴',
  name: 'Lucky Bamboo',
  image: 'g22.jpeg',
  color: 'linear-gradient(135deg, #7bc96f, #d8f3c7)',
  description: 'A beautiful lucky bamboo that symbolizes happiness, growth, and good fortune. 🌿✨',
  letter: 'May this little bamboo bring endless happiness, luck, and beautiful moments into your life. 💚🍀',
},
{
  id: 23,
  emoji: '👖',
  name: 'Stylish Jeans',
  image: 'g23.jpeg',
  color: 'linear-gradient(135deg, #9ec5e8, #dceeff)',
  description: 'A trendy pair of jeans made for comfort, confidence, and effortless style. 💙✨',
  letter: 'May these jeans remind you to walk with confidence and shine beautifully every day. 💖👖',
},
{
  id: 24,
  emoji: '✨',
  name: 'Fashion Accessories',
  image: 'g24.jpeg',
  color: 'linear-gradient(135deg, #d4af37, #f8e7a3)',
  description: 'A stylish metal waist chain and cozy socks to add a touch of charm and comfort to your look. 🧦✨',
  letter: 'May these little accessories bring extra style, confidence, and smiles to every moment. 💛🌸',
},
{
  id: 25,
  emoji: '💐',
  name: 'Memory Bouquet',
  image: 'g25.jpeg',
  color: 'linear-gradient(135deg, #ff9ec4, #ffe7f2)',
  description: 'A beautiful bouquet filled with flowers, fairy lights, and your favorite memories, made just for you. 🌸✨',
  letter: 'Every flower holds a memory, every picture tells a story. I hope this bouquet always reminds you of our beautiful journey together. 💖📸',
},
{
  id: 26,
  emoji: '🎂',
  name: 'Birthday Cake',
  image: 'g26.jpeg',
  color: 'linear-gradient(135deg, #ffd6e7, #fff3f8)',
  description: 'A sweet birthday cake made to celebrate your special day with love and happiness. 🎂💖',
  letter: 'Every slice is filled with love, wishing you endless joy, beautiful memories, and the happiest birthday ever. 🎉💕',
},
]

const starsData = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: 3 + Math.random() * 5,
  delay: Math.random() * 4,
}))

// ── 3D Carousel Gift Card ──
function GiftCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const goNext = () => {
    setDirection(1)
    setFlipped(false)
    setCurrent((prev) => (prev + 1) % gifts.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setFlipped(false)
    setCurrent((prev) => (prev - 1 + gifts.length) % gifts.length)
  }

  const gift = gifts[current]

  return (
    <div style={{ width: '100%', position: 'relative' }}>

      {/* Gift counter */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '20px',
      }}>
        {gifts.map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: i === current ? 1.3 : 1, opacity: i === current ? 1 : 0.4 }}
            onClick={() => { setDirection(i > current ? 1 : -1); setFlipped(false); setCurrent(i) }}
            style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: i === current ? '#e8cc80' : 'rgba(201,168,76,0.4)',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* 3D Card */}
      <div style={{
        perspective: '1200px',
        width: '90%',
maxWidth: '380px',
margin: '0 auto',
        height: 'clamp(240px, 78vw, 320px)',
        position: 'relative',
      }}>
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
  key={current}
  custom={direction}
  initial={{
    rotateY: direction > 0 ? 90 : -90,
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.85,
  }}
  animate={{
    rotateY: 0,
    x: 0,
    opacity: 1,
    scale: 1,
  }}
  exit={{
    rotateY: direction > 0 ? -90 : 90,
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.85,
  }}
  transition={{
    duration: 0.75,
    ease: 'easeInOut',
  }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              cursor: 'pointer',
            }}
            onClick={() => setFlipped(!flipped)}
          >
            {/* ── Front ── */}
            <motion.div
              animate={{ rotateY: flipped ? -180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: '24px',
                backgroundImage: `url(${gift.image})`,
backgroundSize: 'cover',
backgroundPosition: 'center',
backgroundRepeat: 'no-repeat',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '30px 24px',
                boxSizing: 'border-box',
                boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                border: '1px solid rgba(201,168,76,0.3)',
                overflow: 'hidden',
              }}
            >

              {/* Navigation buttons */}
<div style={{
   position: 'absolute',
  bottom: '18px',
  left: '0',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 18px',
  boxSizing: 'border-box',
}}>
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
onClick={(e) => { e.stopPropagation(); goPrev() }}
    style={{
      background: 'rgba(7, 7, 7, 0.15)',
      border: '1px solid rgba(11, 1, 1, 0.3)',
      borderRadius: '50%',
      width: '38px',
height: '38px',
fontSize: '16px',
      color: '#ed2812',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    ←
  </motion.button>

  {/* Text Between Buttons */}
  <motion.p
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 2, repeat: Infinity }}
    style={{
      position: 'absolute',
left: '50%',
transform: 'translateX(-50%)',
bottom: '-4px',
      color: 'rgba(247, 246, 252, 0.6)',
      fontSize: '14px',
      fontStyle: 'italic',
      textAlign: 'center',
    }}
  >
    Tap to read the letter 🌷
  </motion.p>

  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={(e) => { e.stopPropagation(); goNext() }}
    style={{
      background: 'rgba(7, 7, 7, 0.15)',
      border: '1px solid rgba(11, 1, 1, 0.3)',
      borderRadius: '50%',
      width: '38px',
height: '38px',
fontSize: '16px',
      color: '#ed2812',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    →
  </motion.button>
</div>


             

              {/* Flip hint */}
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '12px',
                  marginTop: '260px',
                  fontStyle: 'italic',
                }}
              >
                
              </motion.p>
            </motion.div>

            {/* ── Back (Letter) ── */}
            <motion.div
              animate={{ rotateY: flipped ? 0 : 180 }}
              transition={{ duration: 0.6 }}
              style={{
                 position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '32px 28px',
                  boxSizing: 'border-box',
                  boxShadow: `
                    0 8px 32px rgba(0,0,0,0.35),
                    inset 0 1px 1px rgba(255,255,255,0.15)
                  `,
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>💗</div>

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: '#e8cc80',
                fontSize: 'clamp(15px, 4vw, 19px)',
                textAlign: 'center',
                lineHeight: '1.9',
                margin: 0,
                fontStyle: 'italic',
              }}>
                {gift.letter}
              </p>

              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  color: 'rgba(201,168,76,0.5)',
                  fontSize: '12px',
                  marginTop: '20px',
                  fontStyle: 'italic',
                }}
              >
                Tap to go back 🔄
              </motion.p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      
    </div>
  )
}

export default function Gifts() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const navigate = useNavigate()

  const handleUnlock = async () => {
    if (code.trim().length === 0) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch('http://localhost:5000/api/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await response.json()
      if (data.success) {
        setUnlocked(true)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 6000)
      } else {
        setError(data.message || 'Wrong code! Try again 💭')
        setCode('')
      }
    } catch (err) {
      setError('Something went wrong! Please try again 😅')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #020818 0%, #050f2e 40%, #030c22 70%, #010610 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Georgia', serif",
      padding: 'clamp(20px, 5vw, 40px) clamp(12px, 4vw, 20px)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Gold glow */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'radial-gradient(ellipse at 20% 30%, rgba(180,140,60,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(160,120,40,0.07) 0%, transparent 50%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Confetti */}
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#c9a84c', '#e8cc80', '#f0d878', '#a07828', '#fff8dc']}
          numberOfPieces={280}
        />
      )}

      {/* Stars */}
      {starsData.map((s) => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0.05, 0.7, 0.05] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
          style={{
            position: 'fixed',
            left: `${s.left}%`, top: `${s.top}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            borderRadius: '50%',
            background: s.size > 2.5 ? '#e8d080' : '#ffffff',
            boxShadow: s.size > 2.5 ? '0 0 6px #c9a84c' : 'none',
            pointerEvents: 'none', zIndex: 1,
          }}
        />
      ))}

      {/* Floating Polaroids */}
      {floatingPhotos.map((photo) => (
        <motion.div
          key={photo.id}
          animate={{ y: [0, -14, 0], rotate: [photo.rotate, photo.rotate + 2, photo.rotate] }}
          transition={{ duration: photo.duration, repeat: Infinity, ease: 'easeInOut', delay: photo.delay }}
          style={{
            position: 'fixed',
            left: `${photo.left}%`, top: `${photo.top}%`,
            zIndex: 2, pointerEvents: 'none',
          }}
        >
          <div style={{
            background: '#ffffff',
            padding: '6px 6px 16px 6px',
            borderRadius: '3px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
          }}>
            <img
              src={photo.src}
              alt=""
              style={{
                width: `${photo.size}px`,
                height: `${photo.size}px`,
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.9)',
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%',
        maxWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', marginBottom: '28px' }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            style={{ fontSize: '52px', marginBottom: '12px' }}
          >
            🎁
          </motion.div>

          <h1 style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(26px, 6vw, 40px)',
            background: 'linear-gradient(135deg, #c9a84c, #f0d878, #a07828)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 8px 0',
            fontWeight: '700',
          }}>
            Your Special Gifts
          </h1>
        </motion.div>

        {/* Lock Box */}
        <AnimatePresence>
          {!unlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                background: '#000',
                borderRadius: '28px',
                width: '100%',
                   maxWidth: window.innerWidth < 768
  ? '300px'
  : '400px',
                height: window.innerWidth < 768
  ? '430px'
  : '450px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(201,168,76,0.25)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
              }}
            >
              <img
  src="/y6.jpeg"   // Replace with your image path
  alt="Background"
  style={{
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
  }}
/>

              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.3)',
                zIndex: 1,
              }} />

              <div style={{
                position: 'relative', zIndex: 2,
                padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 32px)',
                paddingTop: 'clamp(80px, 20vw, 120px)',
                textAlign: 'center',
              }}>
                <motion.div
                  animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                  style={{ fontSize: '30px', marginBottom: '24px' }}
                >
                  🔐
                </motion.div>

                <p style={{
                  color: '#f5df9b',
                  fontSize: 'clamp(13px, 3vw, 15px)',
                  marginBottom: '20px',
                  lineHeight: '1.8',
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                }}>
                  Only one person can open these gifts - and that's you ✨
                </p>

                <input
                  type="text"
                  placeholder="Enter secret code..."
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                  style={{
                    width: '100%',
                    padding: 'clamp(10px, 3vw, 14px) clamp(12px, 4vw, 20px)',
                    borderRadius: '50px',
                    border: '1.5px solid rgba(201,168,76,0.5)',
                    fontSize: 'clamp(14px, 4vw, 16px)',
                    outline: 'none',
                    textAlign: 'center',
                    fontFamily: "'Georgia', serif",
                    color: '#fff',
                    background: 'rgba(0,0,0,0.45)',
                    marginBottom: '14px',
                    boxSizing: 'border-box',
                    letterSpacing: '3px',
                    backdropFilter: 'blur(1px)',
                    marginTop: '48px',
                  }}
                />

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        color: '#ff8d8d',
                        fontSize: 'clamp(12px, 3vw, 14px)',
                        marginBottom: '14px',
                        fontStyle: 'italic',
                      }}
                    >
                      ❌ {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 12px 35px rgba(201,168,76,0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleUnlock}
                  disabled={loading || code.trim().length === 0}
                  style={{
                    background: loading
                      ? 'rgba(100,80,30,0.5)'
                      : 'linear-gradient(135deg, #a07828, #c9a84c, #e8cc80)',
                    color: '#020818',
                    border: 'none',
                    borderRadius: '50px',
                    padding: 'clamp(8px, 4vw, 6px) 4px',
                    fontSize: 'clamp(16px, 4.5vw, 18px)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    width: '100%',
                    boxShadow: '0 8px 28px rgba(160,120,40,0.4)',
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {loading ? 'Checking... 💭' : 'Unlock Gifts 🔓'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Gift Carousel — unlocked hone ke baad ── */}
        <AnimatePresence>
          {unlocked && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ width: '100%' }}
            >
             

              {/* 3D Carousel */}
              <GiftCarousel />

              

              {/* Next button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/message')}
                style={{
                  background: 'linear-gradient(135deg, #a07828, #c9a84c, #e8cc80)',
                  color: '#020818',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: 'clamp(15px, 3.5vw, 18px)',
                  cursor: 'pointer',
                  fontFamily: "'Dancing Script', cursive",
                  fontWeight: 'bold',
                  width: '91%',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  padding: '10px 24px',
                  marginTop: '14px',
                  boxShadow: '0 10px 30px rgba(160,120,40,0.4)',
                }}
              >
                Send a Message 💌
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}