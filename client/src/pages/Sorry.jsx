// src/pages/Sorry.jsx
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

// Placeholder photos — replace with real ones later
const polaroids = [
  { src: 'y6.jpeg', caption: 'My peace 💕' },
  { src: 'y2.jpeg', caption: 'My favourite smile ✨' },
  { src: 'y4.jpeg', caption: 'My 7 minutes🌙' },
]

// Northern Lights Canvas Component
function NorthernLights() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Aurora bands — exact northern lights colors ──
    const bands = [
      // Bright magenta/pink — dominant color in image
      { y: 0.18, color1: '#ff00aa', color2: '#ff44cc', speed: 0.0001, amplitude: 45, phase: 0 },
      // Deep purple
      { y: 0.12, color1: '#8800ff', color2: '#aa44ff', speed: 0.00008, amplitude: 35, phase: 1 },
      // Bright green — classic aurora
      { y: 0.25, color1: '#00ff66', color2: '#44ff88', speed: 0.00012, amplitude: 55, phase: 2 },
      // Cyan/teal
      { y: 0.08, color1: '#00ffcc', color2: '#00ddff', speed: 0.00009, amplitude: 25, phase: 3 },
      // Violet/blue
      { y: 0.30, color1: '#6600ff', color2: '#4400cc', speed: 0.0001, amplitude: 40, phase: 4 },
      // Hot pink
      { y: 0.06, color1: '#ff0088', color2: '#dd0066', speed: 0.00007, amplitude: 20, phase: 5 },
      // Yellow-green
      { y: 0.22, color1: '#aaff00', color2: '#88ee00', speed: 0.00011, amplitude: 30, phase: 6 },
    ]

    let time = 0
    let animId

    function drawAurora() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bands.forEach((band, bi) => {
        const baseY = canvas.height * band.y
        const lineCount = 160

        for (let i = 0; i < lineCount; i++) {
          const x = (canvas.width / lineCount) * i

          const waveOffset = Math.sin(time * band.speed * 1000 + i * 0.08 + band.phase) * band.amplitude
          const waveOffset2 = Math.sin(time * band.speed * 800 + i * 0.1 + band.phase + 1) * (band.amplitude * 0.5)

          const topY = baseY + waveOffset + waveOffset2 - 100
          const bottomY = baseY + waveOffset + waveOffset2 + 100

          // Brighter alpha — more visible like real northern lights
          const alpha = (Math.sin(time * 0.001 * (bi + 1) + i * 0.05) * 0.35 + 0.55) * 0.22

          const gradient = ctx.createLinearGradient(x, topY, x, bottomY)
          gradient.addColorStop(0, 'transparent')
          gradient.addColorStop(0.15, `${band.color1}${Math.floor(alpha * 0.6 * 255).toString(16).padStart(2, '00')}`)
          gradient.addColorStop(0.4, `${band.color2}${Math.floor(alpha * 255).toString(16).padStart(2, '00')}`)
          gradient.addColorStop(0.6, `${band.color1}${Math.floor(alpha * 1.8 * 255).toString(16).padStart(2, '00')}`)
          gradient.addColorStop(0.85, `${band.color2}${Math.floor(alpha * 0.5 * 255).toString(16).padStart(2, '00')}`)
          gradient.addColorStop(1, 'transparent')

          ctx.beginPath()
          ctx.moveTo(x, topY)
          ctx.lineTo(x, bottomY)
          ctx.strokeStyle = gradient
          ctx.lineWidth = canvas.width / lineCount + .2
          ctx.stroke()
        }
      })

      // ── Pink/magenta glow — dominant like in image ──
      const pinkGlow = ctx.createRadialGradient(
        canvas.width * 0.4, canvas.height * 0.15, 0,
        canvas.width * 0.4, canvas.height * 0.15, canvas.width * 0.7
      )
      const pinkAlpha = Math.sin(time * 0.0006) * 0.05 + 0.12
      pinkGlow.addColorStop(0, `rgba(255, 0, 150, ${pinkAlpha})`)
      pinkGlow.addColorStop(0.4, `rgba(180, 0, 255, ${pinkAlpha * 0.6})`)
      pinkGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = pinkGlow
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // ── Green glow — right side ──
      const greenGlow = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.2, 0,
        canvas.width * 0.7, canvas.height * 0.2, canvas.width * 0.5
      )
      const greenAlpha = Math.sin(time * 0.0008 + 1) * 0.04 + 0.08
      greenGlow.addColorStop(0, `rgba(0, 255, 100, ${greenAlpha})`)
      greenGlow.addColorStop(0.5, `rgba(0, 200, 255, ${greenAlpha * 0.5})`)
      greenGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = greenGlow
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // ── Purple glow — center ──
      const purpleGlow = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.1, 0,
        canvas.width * 0.5, canvas.height * 0.1, canvas.width * 0.4
      )
      const purpleAlpha = Math.sin(time * 0.0007 + 2) * 0.04 + 0.07
      purpleGlow.addColorStop(0, `rgba(150, 0, 255, ${purpleAlpha})`)
      purpleGlow.addColorStop(1, 'transparent')
      ctx.fillStyle = purpleGlow
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time++
      animId = requestAnimationFrame(drawAurora)
    }

    drawAurora()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  )
}


const stars = Array.from({ length: 180 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,

  // Bigger stars
  size: Math.random() * 2.5 + 1,

  // MUCH slower twinkle
  duration: 6 + Math.random() * 8,

  delay: Math.random() * 5,
}))

export default function Sorry() {
  const navigate = useNavigate()
  const [showLetter, setShowLetter] = useState(false)

  return (
    // <div style={{
    //   minHeight: '100vh',
    //   background: 'linear-gradient(160deg, #000510 0%, #001020 40%, #000815 70%, #010010 100%)',
    //   //background: 'linear-gradient(160deg, #0d0015 0%, #1a0035 40%, #0d0025 70%, #120020 100%)',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   fontFamily: "'Lora', serif",
    //   padding: '30px 20px',
    //   position: 'relative',
    //   overflow: 'hidden',
    // }}>

    <div style={{
  minHeight: '100vh',
  minHeight: '100dvh',

  background: 'linear-gradient(160deg, #000510 0%, #001020 40%, #000815 70%, #010010 100%)',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  fontFamily: "'Lora', serif",

  padding: '30px 20px',

  position: 'relative',

  overflowX: 'hidden',
  overflowY: 'auto',
}}>

      <NorthernLights />

      {/* ── Stars background ── */}
      {stars.map(s => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.3, 1] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: s.size > 3 ? '#c4a0ff' : 'white',
            boxShadow: s.size > 2 ? `0 0 ${s.size * 3}px #c4a0ff` : 'none',
            pointerEvents: 'none',
          }}
        />
      ))}



  {/* ── Shooting Stars — Cinematic ── */}
{Array.from({ length: 4 }).map((_, i) => {
  const goLeft = i % 2 === 0  // alternate directions
  const startX = goLeft ? -300 : window.innerWidth + 300
  const endX = goLeft ? window.innerWidth + 300 : -300
  const startY = Math.random() * window.innerHeight * 0.5
  const endY = startY + (window.innerHeight * 0.2) + Math.random() * 100
  const angle = goLeft ? -15 - Math.random() * 20 : 195 + Math.random() * 20
  const length = 120 + Math.random() * 100
  const duration = 3 + Math.random() * 2
  // ── Shooting Stars Control ──────────────────

// ────────────────────────────────────────────

  return (
    <motion.div
      key={`shoot-${i}`}
      initial={{ x: startX, y: startY, opacity: 0 }}
      animate={{
        x: endX,
        y: endY,
        opacity: [0, 0, 1, 1, 0],
      }}
      transition={{
        duration: duration,
        delay: i * 1.8 + Math.random() * 2,
        repeat: Infinity,
        repeatDelay: 4 + Math.random() * 6,
        ease: 'linear',
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${length}px`,
        height: `${1.5 + Math.random()}px`,
        background: goLeft
          ? 'linear-gradient(90deg, transparent, rgba(196,160,255,0.4), white, rgba(255,255,255,0.9))'
          : 'linear-gradient(270deg, transparent, rgba(196,160,255,0.4), white, rgba(255,255,255,0.9))',
        borderRadius: '999px',
        boxShadow: '0 0 8px rgba(255,255,255,0.9), 0 0 20px rgba(200,160,255,0.6)',
        transform: `rotate(${angle}deg)`,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  )
})}

      {/* ── Moon ── */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '5%',
          right: '8%',
          fontSize: 'clamp(50px, 10vw, 80px)',
          filter: 'drop-shadow(0 0 20px #c4a0ff)',
          pointerEvents: 'none',
        }}
      >
        🌙
      </motion.div>

      {/* ── Sparkles floating ── */}
      {['✨', '💫', '⭐', '🌟', '✨', '💫'].map((s, i) => (
        <motion.div
          key={`spark-${i}`}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 1, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
          }}
          style={{
            position: 'absolute',
            left: `${8 + i * 16}%`,
            bottom: `${10 + (i % 3) * 8}%`,
            fontSize: 'clamp(14px, 3vw, 20px)',
            pointerEvents: 'none',
            opacity: 0.6,
          }}
        >
          {s}
        </motion.div>
      ))}

      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', marginBottom: '30px', zIndex: 10 }}
      >
        {/* <motion.img
  src="r.jpeg"
  alt="Sad"
  animate={{
    scale: [1, 1.08, 1],
    y: [0, -5, 0],
  }}
  transition={{
    duration: 2.5,
    repeat: Infinity,
  }}
  style={{
    width: 'clamp(100px, 14vw, 90px)',
    height: 'clamp(100px, 14vw, 90px)',

    objectFit: 'cover',
    objectPosition: 'center 30%',
    borderRadius: '50%',

    marginBottom: '10px',

    filter:
      'drop-shadow(0 0 20px rgba(196,160,255,0.7))',
  }}
/> */}

<h1 style={{
  fontFamily: "'Dancing Script', cursive",
  fontSize: 'clamp(28px, 5vw, 38px)',
  color: '#e8c4ff',
  textShadow: '0 0 20px #9d4edd, 0 0 30px #7b2fbe',
  margin: 0,
  fontWeight: '700',
  letterSpacing: '0.5px',
  lineHeight: '1.2',
}}>
   A letter to you! 
</h1>
        
<p style={{
  color: 'rgba(200,160,255,0.7)',
  fontSize: 'clamp(14px, 2.5vw, 18px)',  // ← fixed: min < max
  fontStyle: 'italic',
  marginTop: '8px',
}}>
          from the bottom of my heart 💜
        </p>
      </motion.div>

      {/* ── Polaroid Photos ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          display: 'flex',
          gap: 'clamp(10px, 3vw, 20px)',
          marginBottom: '30px',
          zIndex: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {polaroids.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotate: [-8, 5, -3][i] }}
            animate={{ opacity: 1, y: 0, rotate: [-8, 5, -3][i] }}
            transition={{ delay: 0.6 + i * 0.3, type: 'spring' }}
            whileHover={{ scale: 1.08, rotate: 0, zIndex: 20 }}
            style={{
              background: 'rgba(255,255,255,0.95)',
              padding: '10px 10px 30px 10px',
              borderRadius: '4px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 20px rgba(196,160,255,0.3)',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              style={{
                width: 'clamp(80px, 18vw, 120px)',
                height: 'clamp(90px, 22vw, 140px)',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.95)',
              }}
            />
            <p style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(10px, 2.5vw, 13px)',
              color: '#555',
              textAlign: 'center',
              margin: '8px 0 0 0',
              position: 'absolute',
              bottom: '8px',
              left: 0,
              right: 0,
            }}>
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Letter Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '10px 18px',
          maxWidth: '450px',
          maxHeight: '550px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          border: '1px solid rgba(196,160,255,0.2)',
          zIndex: 10,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Card glow */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(ellipse at center, rgba(157,78,221,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Letter lines */}
        {[
          { 
  text: "Dearest Yash,", 
  style: { 
    color: '#e8c4ff', 
    fontFamily: "'Dancing Script', cursive", 
    fontSize: 'clamp(20px, 4.5vw, 24px)', 
    fontWeight: '700' 
  } 
},

{ 
  text: "I hope this year brings you lots of happiness, success, and", 
  style: { color: 'rgba(220,190,255,0.9)' } 
},

{ 
  text: "beautiful memories. Keep smiling, keep being", 
  style: { color: 'rgba(220,190,255,0.9)' } 
},

{ 
  text: "the wonderful person you are, and", 
  style: { color: 'rgba(220,190,255,0.9)' } 
},

{ 
  text: "never stop believing in yourself.Wishing you", 
  style: { color: 'rgba(220,190,255,0.9)' } 
},

{ 
  text: " a day filled with laughter and everything that makes you happy. 💙 ", 
  style: { color: 'rgba(220,190,255,0.9)' } 
},

{
   text: "Be happy always", style: { color: '#c4a0ff',textAlign: 'center', fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(17px, 4vw, 21px)', fontWeight: '700' } },

        ].map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + i * 0.2 }}
            style={{
              fontSize: 'clamp(13px, 3.5vw, 15px)',
              lineHeight: '1.7',
              marginBottom: i === 6 ? 0 : '12px',
              textAlign: i === 0 || i === 6 ? 'center' : 'left',
              ...line.style,
            }}
          >
            {line.text}
          </motion.p>
        ))}
      </motion.div>

      {/* ── Button ── */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/message')}
        style={{
          marginTop: '30px',
          background: 'linear-gradient(135deg, #9d4edd, #c77dff)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '16px 50px',
          fontSize: 'clamp(15px, 4vw, 18px)',
          cursor: 'pointer',
          boxShadow: '0 10px 40px rgba(157,78,221,0.5)',
          fontFamily: "'Dancing Script', cursive",
          fontWeight: '700',
          zIndex: 10,
          letterSpacing: '0.5px',
        }}
      >
        Continue The Story 
      </motion.button>

    </div>
  )
}