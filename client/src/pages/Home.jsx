// src/pages/Home.jsx
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CakeScreen from './CakeScreen'

const hearts = ['💕', '🌸', '✨', '💖', '🌷', '💝', '🎀', '💗']
const TARGET_DATE = new Date(Date.now() + 0.2 * 60 * 1000)
//const TARGET_DATE = new Date("2026-07-12T23:59:00");

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const calculate = () => {
      const now = new Date()
      const diff = TARGET_DATE - now
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
      })
    }
    calculate()
    const timer = setInterval(calculate, 1000)
    return () => clearInterval(timer)
  }, [])

  return timeLeft
}

// ── Advanced Fireworks Canvas ─────────────────────────
function FireworksCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const rocketImg = new Image()
    rocketImg.src = '/rocket.png'
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = []
    const rockets = []

    const colors = [
      '#ff0000', '#ff6b9d', '#c44dff', '#ffb6c1',
      '#ffd700', '#00ffff', '#ff4500', '#7fff00',
      '#ff69b4', '#00fa9a', '#ff1493', '#00bfff',
      '#ffa500', '#ffffff', '#ff6600', '#9400d3'
    ]

    class Particle {
      constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color
        this.radius = Math.random() * 3 + 1
        this.vx = (Math.random() - 0.5) * 10
        this.vy = (Math.random() - 0.5) * 10
        this.alpha = 1; this.gravity = 0.12
        this.decay = Math.random() * 0.02 + 0.01
        this.trail = []
      }
      update() {
        this.trail.push({ x: this.x, y: this.y })
        if (this.trail.length > 5) this.trail.shift()
        this.vx *= 0.98; this.vy *= 0.98
        this.vy += this.gravity
        this.x += this.vx; this.y += this.vy
        this.alpha -= this.decay
      }
      draw() {
        this.trail.forEach((t, i) => {
          ctx.save()
          ctx.globalAlpha = (i / this.trail.length) * this.alpha * 0.4
          ctx.beginPath()
          ctx.arc(t.x, t.y, this.radius * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = this.color; ctx.fill(); ctx.restore()
        })
        ctx.save(); ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.shadowBlur = 15; ctx.shadowColor = this.color
        ctx.fill(); ctx.restore()
      }
    }

    class Rocket {
      constructor() {
        const startSide = Math.random()
        if (startSide < 0.6) {
          this.x = Math.random() * canvas.width
          this.y = canvas.height
          this.angle = (Math.random() - 0.5) * 0.8
        } else if (startSide < 0.8) {
          this.x = 0
          this.y = Math.random() * canvas.height * 0.7
          this.angle = Math.PI / 2 + (Math.random() - 0.5) * 0.8
        } else {
          this.x = canvas.width
          this.y = Math.random() * canvas.height * 0.7
          this.angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8
        }
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.speed = 10 + Math.random() * 8
        this.vx = Math.sin(this.angle) * this.speed
        this.vy = Math.cos(this.angle) * this.speed
        this.exploded = false; this.trail = []
        this.life = 0; this.maxLife = 40 + Math.random() * 30
      }
      update() {
        this.trail.push({ x: this.x, y: this.y })
        if (this.trail.length > 15) this.trail.shift()
        this.x += this.vx * 0.5; this.y -= this.vy * 0.5
        this.life++
        if (this.life >= this.maxLife) {
          this.exploded = true; explode(this.x, this.y, this.color)
        }
      }
      draw() {
        this.trail.forEach((t, i) => {
          const trailRatio = i / this.trail.length
          ctx.save(); ctx.globalAlpha = trailRatio * 0.9
          const fireGrad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, 6 * trailRatio + 2)
          fireGrad.addColorStop(0, '#ffffff')
          fireGrad.addColorStop(0.3, '#ffd700')
          fireGrad.addColorStop(0.7, '#ff6600')
          fireGrad.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(t.x, t.y, 6 * trailRatio + 2, 0, Math.PI * 2)
          ctx.fillStyle = fireGrad; ctx.fill(); ctx.restore()
        })
        if (rocketImg.complete) {
          ctx.save()
          const angle = Math.atan2(
            this.trail.length > 1 ? this.y - this.trail[this.trail.length - 2]?.y : -1,
            this.trail.length > 1 ? this.x - this.trail[this.trail.length - 2]?.x : 0
          )
          ctx.translate(this.x, this.y)
          ctx.rotate(angle + Math.PI / 2)
          ctx.drawImage(rocketImg, -15, -40, 30, 55)
          ctx.restore()
        }
      }
    }

    function explode(x, y, color) {
      const count = 60 + Math.floor(Math.random() * 30)
      for (let i = 0; i < count; i++) particles.push(new Particle(x, y, color))
      const ringColor = colors[Math.floor(Math.random() * colors.length)]
      for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * Math.PI * 2
        const p = new Particle(x, y, ringColor)
        p.vx = Math.cos(angle) * 7; p.vy = Math.sin(angle) * 7; p.radius = 2.5
        particles.push(p)
      }
      const starColor = colors[Math.floor(Math.random() * colors.length)]
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2
        const p = new Particle(x, y, starColor)
        p.vx = Math.cos(angle) * 12; p.vy = Math.sin(angle) * 12
        p.radius = 3; p.decay = 0.008; particles.push(p)
      }
    }

    const rocketInterval = setInterval(() => {
      rockets.push(new Rocket())
      if (Math.random() > 0.7) rockets.push(new Rocket())
    }, 3000)

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update(); rockets[i].draw()
        if (rockets[i].exploded) rockets.splice(i, 1)
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update(); particles[i].draw()
        if (particles[i].alpha <= 0) particles.splice(i, 1)
      }
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      clearInterval(rocketInterval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%', zIndex: 0,
    }} />
  )
}

// ── Birthday Screen ───────────────────────────────────
function BirthdayScreen({ navigate, onShowCake }) {
  useEffect(() => {
    const timer = setTimeout(() => { onShowCake() }, 15000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      background: 'black',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 1, fontFamily: "'Georgia', serif",
      textAlign: 'center', padding: '20px', overflow: 'hidden',
    }}>
      <FireworksCanvas />
      <div style={{ zIndex: 10, position: 'relative' }}>
        <motion.img
  src="y1.jpeg"
  alt="Birthday"
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
  style={{
    width: 'clamp(110px, 40vw, 160px)',
    height: 'clamp(110px, 40vw, 160px)',
    borderRadius: '100px',
    objectFit: 'cover',
    objectPosition: 'center top',
    marginBottom: '20px',
    border: '3px solid rgba(255,255,255,0.2)',
    boxShadow: '0 0 30px rgba(244, 228, 236, 0.5)',
  }}
/>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: 'clamp(22px, 8vw, 45px)',
            color: 'white', fontWeight: 'bold',
            marginBottom: '10px',
            textShadow: '0 0 30px rgba(218,69,119,0.8)',
            fontFamily: "'Georgia', serif",
          }}
        >
          Happy Birthday
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '10px', marginBottom: '20px',
          }}
        >
          <h2 style={{
            fontSize: 'clamp(24px, 10vw, 50px)',
            color: 'white', fontWeight: 'bold', margin: 0,
            textShadow: '0 0 40px rgba(196,77,255,0.9)',
            fontFamily: "'Georgia', serif",
          }}>
            Yash
          </h2>
          <img
            src="i.jpg" alt="flower"
            style={{
              width: 'clamp(40px, 10vw, 70px)',
              height: 'clamp(40px, 10vw, 70px)',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))',
            }}
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            fontSize: 'clamp(14px, 4vw, 24px)',
            color: 'rgba(255,255,255,0.85)',
            fontStyle: 'italic', marginBottom: '20px',
            textShadow: '0 0 20px rgba(255,182,193,0.8)',
            padding: '0 20px',
          }}
        >
          The day is yours, Enjoy your special day! 💕
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          style={{
            fontSize: 'clamp(14px, 3vw, 20px)',
            color: 'rgba(241,235,227,0.98)',
            marginBottom: '30px',
          }}
        >
          You deserve the whole garden 🌷
        </motion.p>
      </div>
    </div>
  )
}

// ── Particles data — outside component ────────────────
const particlesData = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  emoji: ['💕', '🌸', '✨', '💖', '🌷', '💝', '🎀', '💗'][Math.floor(Math.random() * 8)],
  left: Math.random() * 100,
  duration: 3 + Math.random() * 4,
  delay: Math.random() * 3,
  size: 20 + Math.floor(Math.random() * 24),
}))

// ── Main Home ─────────────────────────────────────────
export default function Home() {
  const navigate = useNavigate()
  const [showCake, setShowCake] = useState(false)
  const timeLeft = useCountdown()

  if (showCake) {
    return (
      <BirthdayScreen
        navigate={navigate}
        onShowCake={() => navigate('/cake')}
      />
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh', // ← mobile browser bar fix
      background: 'linear-gradient(135deg, #ffe4f0 0%, #ffd6e8 30%, #e8d5f5 70%, #d4e8ff 100%)',
     display: 'flex',
flexDirection: 'column',
alignItems: 'center',
justifyContent: 'center',
fontFamily: "'Georgia', serif",

overflowY: 'auto',
overflowX: 'hidden',

position: 'relative',
padding: '16px',
paddingBottom: '40px',

boxSizing: 'border-box',
    }}>

      {/* Floating hearts */}
{particlesData.map(p => (
  <motion.div
    key={p.id}
    style={{
      position: 'fixed',          // ← was 'absolute'
      left: `${p.left}%`,
      bottom: '-100px',
      fontSize: p.size,
      pointerEvents: 'none',
      zIndex: 5,                  // ← keep them above bg, below card
      willChange: 'transform',    // ← smoother GPU animation
    }}
    animate={{ y: [0, -(window.innerHeight + 300)] }}
    transition={{
      duration: p.duration,
      delay: p.delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    {p.emoji}
  </motion.div>
))}

      {/* ── Main Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: 'relative',
          borderRadius: '28px',
          padding: 'clamp(16px, 5vw, 40px) clamp(14px, 5vw, 35px)',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(255,182,193,0.4)',
          border: '2px solid rgba(255,255,255,0.3)',
          zIndex: 10,
          width: '100%',
maxWidth: 'clamp(280px, 88vw, 450px)',

height: window.innerWidth < 768
  ? '450px'
  : 'auto',

overflow: 'hidden',
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.28), rgba(255,255,255,0.28)), url('/y2.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* Profile photo */}
        <motion.img
          src="" alt=""
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            width: 'clamp(90px, 24vw, 120px)',
            height: 'clamp(90px, 24vw, 120px)',
            objectFit: 'cover',
            borderRadius: '50%',
            marginBottom: '10px',
            marginTop: '-10px',
           
          }}
        />

        {/* Happy Birthday */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: 'clamp(24px, 7vw, 42px)',
            background: 'linear-gradient(135deg, #db3a70, #c44dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '4px',
            fontWeight: 'bold',
            lineHeight: 1.2,
          }}
        >
          Happy Birthday
        </motion.h1>

        {/* Harshita */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            fontSize: 'clamp(28px, 8vw, 52px)',
            background: 'linear-gradient(135deg, #d7564d, #d41c9d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            fontWeight: 'bold',
            lineHeight: 1.2,
          }}
        >
          Yash! 🌸
        </motion.h2>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          style={{ marginBottom: 'clamp(14px, 4vw, 24px)' }}
        >
          <p style={{
            color: '#d82525',
            fontSize: 'clamp(12px, 3.5vw, 15px)',
            marginBottom: '10px',
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>
            Counting every second until your special day..
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(6px, 2vw, 10px)',
            flexWrap: 'nowrap', // ← single row on mobile
          }}>
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((item) => (
              <motion.div
                key={item.label}
                animate={{ scale: item.label === 'Secs' ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(135deg, #e2afbf, #c88ee5)',
                  borderRadius: 'clamp(10px, 3vw, 14px)',
                  padding: 'clamp(8px, 2.5vw, 10px) clamp(8px, 2.5vw, 12px)',
                  minWidth: 'clamp(52px, 14vw, 65px)',
                  boxShadow: '0 4px 15px rgba(255,107,157,0.3)',
                  flex: '1',
                  maxWidth: '68px',
                  marginTop: 'clamp(28px, 4vw, 34px)',
                }}
              >
                <p style={{
                  color: 'white',
                  fontSize: 'clamp(18px, 5.5vw, 28px)',
                  fontWeight: 'bold',
                  margin: 0, lineHeight: 1,
                }}>
                  {String(item.value ?? 0).padStart(2, '0')}
                </p>
                <p style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 'clamp(9px, 2.5vw, 11px)',
                  margin: '3px 0 0 0',
                  
                }}>
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          whileHover={{ scale: timeLeft.expired ? 1.05 : 1 }}
          whileTap={{ scale: timeLeft.expired ? 0.95 : 1 }}
          disabled={!timeLeft.expired}
          onClick={() => { if (timeLeft.expired) setShowCake(true) }}
          style={{
            background: timeLeft.expired
              ? 'linear-gradient(135deg, #ff6b9d, #c44dff)'
              : 'linear-gradient(135deg, #c9b3c1, #bda8c7)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: 'clamp(12px, 3.5vw, 16px) clamp(20px, 5vw, 45px)',
            fontSize: 'clamp(13px, 4vw, 18px)',
            cursor: timeLeft.expired ? 'pointer' : 'not-allowed',
            boxShadow: timeLeft.expired
              ? '0 8px 25px rgba(255,107,157,0.4)' : 'none',
            fontFamily: "'Georgia', serif",
            width: '95%',
            opacity: timeLeft.expired ? 1 : 0.75,
            marginTop: 'clamp(8px, 4vw, 8px)',
          }}
        >
          {timeLeft.expired ? 'A little surprise for you' : 'Locked Until Birthday 🎀'}
        </motion.button>

      </motion.div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{
          marginTop: '10px',
          color: '#c490c4',
          fontSize: 'clamp(13px, 3.5vw, 16px)',
          zIndex: 10,
          textAlign: 'center',
        }}
      >
        A small gift from me to you 💫
      </motion.p>
    </div>
  )
}