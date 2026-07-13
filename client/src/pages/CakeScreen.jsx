// src/pages/CakeScreen.jsx
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const balloonsData = [
  { id: 0,  left: 5,  delay: 0.0, duration: 5.5, drift: -40, color: '#FF4B4B', size: 52 }, // red
  { id: 1,  left: 15, delay: 0.3, duration: 6.0, drift:  30, color: '#FFD700', size: 44 }, // yellow
  { id: 2,  left: 25, delay: 0.7, duration: 5.0, drift: -25, color: '#FF69B4', size: 58 }, // hot pink
  { id: 3,  left: 35, delay: 0.2, duration: 6.5, drift:  40, color: '#FFFFFF', size: 40 }, // white
  { id: 4,  left: 45, delay: 1.0, duration: 5.8, drift: -30, color: '#FF4B4B', size: 62 }, // red
  { id: 5,  left: 55, delay: 0.5, duration: 6.2, drift:  20, color: '#FFD700', size: 46 }, // yellow
  { id: 6,  left: 65, delay: 0.8, duration: 5.3, drift: -20, color: '#FFB6C1', size: 56 }, // light pink
  { id: 7,  left: 75, delay: 0.1, duration: 6.8, drift:  35, color: '#FFFFFF', size: 42 }, // white
  { id: 8,  left: 85, delay: 0.6, duration: 5.6, drift: -35, color: '#FF69B4', size: 60 }, // hot pink
  { id: 9,  left: 92, delay: 0.4, duration: 6.3, drift:  25, color: '#FF4B4B', size: 48 }, // red
  { id: 10, left: 10, delay: 1.2, duration: 5.9, drift:  30, color: '#FFD700', size: 54 }, // yellow
  { id: 11, left: 50, delay: 0.9, duration: 5.2, drift: -40, color: '#FFB6C1', size: 50 }, // light pink
]

const starsData = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 2 + Math.random() * 3,
  delay: Math.random(),
}))

// SVG Balloon component — exact color control, real balloon shape
function BalloonSVG({ color, size }) {
  const w = size
  const h = size * 1.3
  const shine = color === '#FFFFFF' ? '#ffffffcc' : '#ffffff55'
  return (
    <svg width={w} height={h} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Balloon body */}
      <ellipse cx="30" cy="28" rx="22" ry="26" fill={color} />
      {/* Shine highlight */}
      <ellipse cx="22" cy="18" rx="7" ry="9" fill={shine} />
      {/* Bottom knot */}
      <path d="M27 53 Q30 58 33 53" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="30" cy="54" r="2.5" fill={color} />
      {/* String */}
      <path d="M30 57 Q26 65 30 75" stroke="#ffffff66" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  )
}

export default function CakeScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [bloomed, setBloomed] = useState(false)
  const songRef = useRef(null)

  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'balloon-styles'
    style.innerHTML = `
      @keyframes balloonRise {
        0%   { transform: translateY(0px);    opacity: 1;   }
        75%  { transform: translateY(-200vh); opacity: 1;   }
        100% { transform: translateY(-220vh); opacity: 0;   }
      }
      @keyframes balloonSway {
        0%   { margin-left: 0px;   }
        25%  { margin-left: 18px;  }
        50%  { margin-left: -12px; }
        75%  { margin-left: 20px;  }
        100% { margin-left: 0px;   }
      }
      .balloon-wrap {
        position: fixed;
        bottom: -100px;
        pointer-events: none;
        z-index: 9999;
        animation: balloonRise linear forwards;
        will-change: transform, opacity;
      }
      .balloon-inner {
        animation: balloonSway ease-in-out infinite;
      }
    `
    document.head.appendChild(style)
    return () => document.getElementById('balloon-styles')?.remove()
  }, [])

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 1900),
      setTimeout(() => setStep(4), 2600),
      setTimeout(() => setStep(5), 3400),
      setTimeout(() => setStep(7), 4100),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const triggerBloom = () => {
    if (bloomed) return
    setBloomed(true)
    setStep(7)
    if (window.globalMusicAudio) {
      window.globalMusicAudio.dataset.manuallyPaused = 'true'
      window.globalMusicAudio.pause()
    }
    if (songRef.current) {
      songRef.current.currentTime = 0
      songRef.current.play()
    }
  }

  const handleNextPage = async () => {
    if (songRef.current) songRef.current.pause()
    if (window.globalMusicAudio) {
      window.globalMusicAudio.dataset.manuallyPaused = 'false'
      try { await window.globalMusicAudio.play() } catch (err) {}
    }
    navigate('/sorry')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, #1f1631 0%, #0b0713 60%, #050308 100%)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      fontFamily: "'Poppins', sans-serif",
    }}>

      <audio ref={songRef} src="/birthday.mp3" preload="auto" />

      {/* Stars */}
      {starsData.map((s) => (
        <motion.div
          key={s.id}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
          style={{
            position: 'absolute',
            width: '2px', height: '2px',
            borderRadius: '50%',
            background: 'white',
            left: `${s.left}%`,
            top: `${s.top}%`,
          }}
        />
      ))}

      {/* ── BALLOONS ── */}
      {bloomed && balloonsData.map((b) => (
        <div
          key={b.id}
          className="balloon-wrap"
          style={{
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            filter: `drop-shadow(0 0 8px ${b.color}88)`,
          }}
        >
          <div
            className="balloon-inner"
            style={{
              animationDuration: `${b.duration * 0.6}s`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <BalloonSVG color={b.color} size={b.size} />
          </div>
        </div>
      ))}

      {/* Cake Section */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '60px',
      }}>

        {/* Candle Glow */}
        {step >= 6 && !bloomed && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute', top: '-95px',
              width: '180px', height: '180px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,220,140,0.14) 35%, transparent 70%)',
              filter: 'blur(25px)', zIndex: 1,
            }}
          />
        )}

        {/* Smoke */}
        {bloomed && [0,1,2,3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.9, y: 0, scale: 0.3 }}
            animate={{ opacity: 0, y: -140, x: [-8,10,-6,8][i], scale: 3 }}
            transition={{ duration: 3, delay: i * 0.15 }}
            style={{
              position: 'absolute', top: '-40px',
              width: '26px', height: '26px', borderRadius: '50%',
              background: 'rgba(230,230,230,0.5)',
              filter: 'blur(10px)', zIndex: 50,
            }}
          />
        ))}

        {/* Candle */}
        <AnimatePresence>
          {step >= 7 && (
            <motion.div
              onClick={triggerBloom}
              initial={{ y: -180, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              style={{
                position: 'relative', zIndex: 30,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                cursor: 'pointer', marginBottom: '-2px',
              }}
            >
              {!bloomed && (
                <motion.div
                  animate={{ scale: [1, 1.15, 0.95, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{
                    width: '16px', height: '28px',
                    borderRadius: '50% 50% 35% 35%',
                    background: 'radial-gradient(circle at 50% 70%, #fff 0%, #ffe27a 35%, #ff9800 70%, transparent 100%)',
                    boxShadow: '0 0 20px #fff3c4, 0 0 50px #ffd54f',
                    marginBottom: '3px',
                  }}
                />
              )}
              {bloomed && (
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: [1, 5, 0], opacity: [1, 0.5, 0] }}
                  transition={{ duration: 0.7 }}
                  style={{
                    width: '18px', height: '30px', borderRadius: '50%',
                    background: 'radial-gradient(circle, #fff6d5 0%, #ff9800 70%, transparent 100%)',
                    filter: 'blur(4px)',
                  }}
                />
              )}
              <div style={{
                width: '10px', height: '40px', background: '#ffffff',
                borderRadius: '10px', boxShadow: '0 0 10px rgba(255,255,255,0.5)',
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cream 1 */}
        <AnimatePresence>
          {step >= 6 && (
            <motion.div
              initial={{ y: -180, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
              style={{ width: '90px', height: '14px', background: '#f5d6c6', borderRadius: '20px', marginBottom: '-5px', zIndex: 40 }}
            />
          )}
        </AnimatePresence>

        {/* Layer 1 */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ y: -220, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
              style={{ width: '110px', height: '26px', background: '#d89b7c', borderRadius: '8px', position: 'relative', overflow: 'hidden', zIndex: 35 }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ position: 'absolute', top: 0, left: `${i*36}px`, width: '14px', height: `${10+(i%2)*5}px`, background: '#f8e8dc', borderRadius: '0 0 10px 10px' }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cream 2 */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ y: -260, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
              style={{ width: '140px', height: '15px', background: '#f5d6c6', borderRadius: '20px', marginTop: '-4px', marginBottom: '-5px', zIndex: 30 }}
            />
          )}
        </AnimatePresence>

        {/* Layer 2 */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ y: -300, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
              style={{ width: '165px', height: '36px', background: '#cf9375', borderRadius: '8px', position: 'relative', overflow: 'hidden', zIndex: 25 }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ position: 'absolute', top: 0, left: `${i*33}px`, width: '16px', height: `${12+(i%2)*7}px`, background: '#f8e8dc', borderRadius: '0 0 10px 10px' }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cream 3 */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ y: -340, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
              style={{ width: '205px', height: '16px', background: '#f5d6c6', borderRadius: '20px', marginTop: '-4px', marginBottom: '-5px', zIndex: 20 }}
            />
          )}
        </AnimatePresence>

        {/* Layer 3 */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ y: -380, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring' }}
              style={{ width: '240px', height: '45px', background: '#c78665', borderRadius: '10px', position: 'relative', overflow: 'hidden', zIndex: 15, boxShadow: '0 15px 40px rgba(0,0,0,0.35)' }}
            >
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} style={{ position: 'absolute', top: 0, left: `${i*34}px`, width: '18px', height: `${18+(i%3)*8}px`, background: '#f8e8dc', borderRadius: '0 0 10px 10px' }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Plate */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ width: '290px', height: '14px', borderRadius: '50%', background: 'linear-gradient(to right, #f1f1f1, #ffffff, #f1f1f1)', marginTop: '10px', boxShadow: '0 8px 25px rgba(255,255,255,0.12)' }}
            />
          )}
        </AnimatePresence>

      </div>

      {/* Tap text */}
      <AnimatePresence>
        {step >= 7 && !bloomed && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: '#f8e7d2', fontSize: '18px', letterSpacing: '1px' }}
          >
            🕯️ Tap the candle
          </motion.p>
        )}
      </AnimatePresence>

      {/* Final message */}
      <AnimatePresence>
        {bloomed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{ textAlign: 'center', marginTop: '5px' }}
          >
            <motion.h1
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: '#fff2d9', fontSize: 'clamp(24px, 6vw, 36px)', marginBottom: '10px', textShadow: '0 0 25px rgba(255,220,150,0.5)' }}
            >
              Happy Birthday Harshita ✨
            </motion.h1>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextPage}
              style={{ padding: '14px 38px', borderRadius: '40px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #f8d8c0, #f4bfa8)', color: '#3a2d2d', fontSize: '18px', fontWeight: '600', marginTop: '15px', boxShadow: '0 10px 30px rgba(255,220,180,0.25)' }}
            >
              Continue 
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}