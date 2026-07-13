// src/pages/Birthday.jsx
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import ReactConfetti from 'react-confetti'

const wishIcons = [
  { emoji: '⭐', label: 'Wish 1', color: '#e8a020' },
  { emoji: '🌙', label: 'Wish 2', color: '#9040c0' },
  { emoji: '💫', label: 'Wish 3', color: '#c02060' },
]

export default function Birthday() {
  const navigate = useNavigate()

  const [phase, setPhase] = useState('envelope')
  const [flapOpen, setFlapOpen] = useState(false)
  const [letterRising, setLetterRising] = useState(false)
  const [showEnvelope, setShowEnvelope] = useState(true)
  const [letterFull, setLetterFull] = useState(false)

  const [wishes, setWishes] = useState(['', '', ''])
  const [activeWishIcon, setActiveWishIcon] = useState(null)
  const [waNumber, setWaNumber] = useState('')
  const [waStep, setWaStep] = useState('wishes')
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFlapOpen(true), 1000)
    const t2 = setTimeout(() => setLetterRising(true), 2000)
    const t3 = setTimeout(() => setShowEnvelope(false), 3200)
    const t4 = setTimeout(() => setLetterFull(true), 3500)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  const handleLetterTap = () => {
    if (!letterFull) return
    setPhase('wishes')
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  const allWishesFilled = wishes.every(w => w.trim().length > 0)

  const handleSendWishes = () => {
    const clean = waNumber.replace(/\D/g, '')
    if (clean.length < 10) return
    const msg =
      `🎂 Birthday Wishes:\n\n` +
      `⭐ Wish 1: ${wishes[0]}\n` +
      `🌙 Wish 2: ${wishes[1]}\n` +
      `💫 Wish 3: ${wishes[2]}\n\n` +
      `— From your birthday surprise 💜`
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(msg)}`, '_blank')
    setWaStep('done')
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0005',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Georgia', serif",
      padding: '20px 16px 50px',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
    }}>

      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#ff6b9d', '#ffd700', '#ff4466', '#ffb6c1', '#ffffff', '#c44dff']}
          numberOfPieces={220}
        />
      )}

      {/* ── BACKGROUND VIDEO ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/a.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — keeps content readable */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(8,0,4,0.52)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* ── MAIN CONTENT ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '480px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10px',
      }}>

        {/* ══════════ ENVELOPE + LETTER PHASE ══════════ */}
        <AnimatePresence>
          {phase === 'envelope' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Letter */}
              <AnimatePresence>
                {letterRising && (
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={
                      !showEnvelope
                        ? { y: 0, opacity: 1, scale: 1 }
                        : { y: -50, opacity: 1, scale: 0.96 }
                    }
                    transition={{ duration: 0.9, type: 'spring', stiffness: 60, damping: 14 }}
                    onClick={handleLetterTap}
                    style={{
                      width: 'clamp(260px, 88vw, 400px)',
                      cursor: letterFull ? 'pointer' : 'default',
                      zIndex: 9,
                      marginBottom: showEnvelope ? '-110px' : '0',
                    }}
                  >
                    <motion.div
                      whileHover={letterFull ? { scale: 1.012 } : {}}
                      style={{
                        background: 'rgba(255, 60, 60, 0.05)',
backdropFilter: 'blur(4px)',
WebkitBackdropFilter: 'blur(4px)',
border: '1.5px solid rgba(255,255,255,0.12)',
boxShadow: `
  0 24px 70px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)
`,
                        borderRadius: '14px',
padding: window.innerWidth < 768
  ? '13px 11px'
  : 'clamp(24px, 6vw, 40px) clamp(20px, 5vw, 34px)',
                          boxShadow: '0 24px 70px rgba(0,0,0,0.65), 0 0 40px rgba(200,0,0,0.25)',
                        border: '2px solid rgba(255,100,100,0.3)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                     

                        <div style={{ position: 'relative', zIndex: 2 }}>                 
                         <p style={{
                          fontSize: 'clamp(18px, 5vw, 23px)',
                          color: '#f74444',
                          fontWeight: '700',
                          margin: '0 0 16px 0',
                          lineHeight: 1.3,
                          fontFamily: 'Arial, sans-serif',
                        }}>
                        Dear Harshita, 
                        </p>
                        {[
                          "Today is the most special day in the world - because you came into this world.",
                          "Even if I can't always express it, thank you for being one of the most beautiful parts of my life.",
                          "Whenever my phone rings, I secretly hope it’s you. And whenever I see your name on my screen, it instantly makes me smile.💕",
                          "Keep shining, because you were always meant to, just like the moon.",
                          "Happy 22nd Birthday, my moon. 🌙",
                        ].map((line, i) => (
                          <motion.p
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.2 }}
                            style={{
                              fontSize: 'clamp(13px, 3.2vw, 15px)',
                              color: '#050303',
                              lineHeight: window.innerWidth < 768 ? '1.4' : '1.9',
                              margin: '0 0 8px 0',
                              fontFamily: "'Georgia', serif",
                            }}
                          >
                            {line}
                          </motion.p>
                        ))}
                       
                      </div>

                      
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Envelope */}
              <AnimatePresence>
                {showEnvelope && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.85, y: 30 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: 'relative',
                      width: 'clamp(290px, 82vw, 390px)',
                      height: 'clamp(210px, 52vw, 280px)',
                      zIndex: 6,
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0, height: '100%',
                      background: '#ffffff',
                      borderRadius: '12px',
                      boxShadow: '0 16px 50px rgba(0,0,0,0.5)',
                      border: '1px solid rgba(220,220,220,0.8)',
                      overflow: 'hidden',
                      zIndex: 3,
                    }}>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%' }}>
                        <div style={{
                          position: 'absolute', bottom: 0, left: 0,
                          width: 0, height: 0, borderStyle: 'solid',
                          borderWidth: '0 0 100px 185px',
                          borderColor: 'transparent transparent #ffffff transparent',
                        }} />
                        <div style={{
                          position: 'absolute', bottom: 0, right: 0,
                          width: 0, height: 0, borderStyle: 'solid',
                          borderWidth: '100px 185px 0 0',
                          borderColor: '#ffffff transparent transparent transparent',
                        }} />
                      </div>
                      
                    </div>

                    <motion.div
                      initial={{ rotateX: 0 }}
                      animate={{ rotateX: flapOpen ? -168 : 0 }}
                      transition={{ duration: 1.0, delay: 0.1, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', top: 0, left: 0, right: 0,
                        height: '48%',
                        transformOrigin: 'top center',
                        transformStyle: 'preserve-3d',
                        zIndex: 6,
                      }}
                    >
                      <div style={{
                        width: '100%', height: '100%',
                        background: '#ffffff',
                        clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                        borderRadius: '12px 12px 0 0',
                      }} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!letterFull && (
                <motion.p
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{
                    color: '#ffffff',
                    fontSize: 'clamp(12px, 3vw, 14px)',
                    fontStyle: 'italic',
                    marginTop: showEnvelope ? '210px' : '20px',
                    textAlign: 'center',
                  }}
                >
                  Opening your letter... 💌
                </motion.p>
              )}
              {letterFull && (
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    color: 'rgba(255,220,230,0.9)',
                    fontSize: 'clamp(13px, 3.5vw, 15px)',
                    fontStyle: 'italic',
                    marginTop: '18px',
                    textAlign: 'center',
                  }}
                >
                  ✦ Tap the letter to continue ✦
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════ WISHES PHASE ══════════ */}
        <AnimatePresence>
          {phase === 'wishes' && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 70 }}
              style={{ width: '100%' }}
            >
              <motion.div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <motion.p
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: 'clamp(22px, 6vw, 32px)',
                    color: '#ffffff',
                    textShadow: '0 0 20px rgba(255,100,150,0.5)',
                    margin: '0 0 6px 0', fontWeight: '700',
                  }}
                >
                  Make Your 3 Wishes
                </motion.p>
                <p style={{
                  color: 'rgba(255,200,220,0.7)',
                  fontSize: 'clamp(11px, 2.8vw, 13px)',
                  fontStyle: 'italic', margin: 0,
                }}>
                  Tap each star and write your wish 💜
                </p>
              </motion.div>

              {/* 3 Wish Icons */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(16px, 5vw, 30px)',
                marginBottom: '20px',
              }}>
                {wishIcons.map((icon, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <motion.button
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.9 }}
                      animate={{ y: [0, -7, 0] }}
                      transition={{ duration: 2.6 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
                      onClick={() => setActiveWishIcon(activeWishIcon === i ? null : i)}
                      style={{
                        background: wishes[i].trim()
                          ? 'rgba(255,255,255,0.18)'
                          : activeWishIcon === i
                          ? 'rgba(255,255,255,0.12)'
                          : 'rgba(255,255,255,0.07)',
                        border: `2px solid ${wishes[i].trim() ? '#ffffff' : activeWishIcon === i ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}`,
                        borderRadius: '50%',
                        width: 'clamp(48px, 15vw, 62px)',
                        height: 'clamp(48px, 15vw, 62px)',
                        fontSize: 'clamp(18px, 6vw, 24px)',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: wishes[i].trim() ? '0 4px 20px rgba(255,150,180,0.4)' : '0 4px 14px rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s',
                      }}
                    >
                      {wishes[i].trim() ? '✅' : icon.emoji}
                    </motion.button>
                    <p style={{
                      color: wishes[i].trim() ? '#ffffff' : 'rgba(255,200,220,0.5)',
                      fontSize: 'clamp(10px, 2.5vw, 12px)',
                      margin: 0, fontStyle: 'italic',
                    }}>
                      {icon.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Active wish textarea */}
              <AnimatePresence>
                {activeWishIcon !== null && waStep === 'wishes' && (
                  <motion.div
                    key={activeWishIcon}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'rgba(255,255,255,0.98)',
                      borderRadius: '20px',
                      padding: '18px 16px',
                      border: '1.5px solid rgba(200,100,130,0.3)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                      marginBottom: '14px',
                      position: 'relative', overflow: 'hidden',
                      marginTop: '-6px',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                     // background: 'linear-gradient(90deg, #cc0000, #ff4466, #cc0000)',
                    }} />
                    <p style={{
                      color: '#cc0000',
                      fontSize: 'clamp(12px, 3vw, 14px)',
                      fontWeight: 'bold', margin: '0 0 10px 0',
                    }}>
                      {wishIcons[activeWishIcon].emoji} {wishIcons[activeWishIcon].label}
                    </p>
                    <textarea
                      placeholder={`Type your ${wishIcons[activeWishIcon].label.toLowerCase()} here... ✨`}
                      value={wishes[activeWishIcon]}
                      onChange={(e) => {
                        const u = [...wishes]
                        u[activeWishIcon] = e.target.value
                        setWishes(u)
                      }}
                      rows={3}
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: '12px',
                        border: '1px solid rgba(200,100,130,0.3)',
                        fontSize: 'clamp(11px, 2.5vw, 13px)',
                        outline: 'none',
                        //fontFamily: "'Dancing Script', cursive",
                        fontFamily: "'Georgia', serif",
                        color: '#1a0010',
                        background: '#fff9fb',
                        marginBottom: '12px',
                        boxSizing: 'border-box',
                        resize: 'none',
                        lineHeight: '1.7',
                      }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveWishIcon(null)}
                        style={{
                          flex: 1,
                          background: 'rgba(200,0,0,0.08)',
                          color: '#cc0000',
                          border: '1px solid rgba(200,0,0,0.2)',
                          borderRadius: '50px',
                          padding: '10px',
                          fontSize: 'clamp(13px, 3vw, 15px)',
                          cursor: 'pointer',
                          fontFamily: "'Georgia', serif",
                        }}
                      >
                        Done ✓
                      </motion.button>
                      {activeWishIcon < 2 && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveWishIcon(activeWishIcon + 1)}
                          style={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #cc0000, #ff4466)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '10px',
                            fontSize: 'clamp(13px, 3vw, 15px)',
                            cursor: 'pointer',
                            fontFamily: "'Georgia', serif",
                          }}
                        >
                          Next Wish →
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              

              {/* Send button — only after ALL 3 wishes filled */}
              {allWishesFilled && waStep === 'wishes' && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setWaStep('number')}
                  style={{
                    background: 'linear-gradient(135deg, #cc0000, #ff4466)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '14px 28px',
                    fontSize: 'clamp(14px, 3.8vw, 16px)',
                    cursor: 'pointer',
                    fontFamily: "'Georgia', serif",
                    fontWeight: '700',
                    width: '100%',
                    boxShadow: '0 10px 32px rgba(200,0,50,0.45)',
                    marginBottom: '14px',
                    marginTop: '-2px',
                  }}
                >
                  🌟 Send Wishes →
                </motion.button>
              )}

              {/* WhatsApp number input */}
              <AnimatePresence>
                {waStep === 'number' && (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background: 'rgba(255,255,255,0.96)',
                      borderRadius: '20px',
                      padding: '20px 18px',
                      border: '1.5px solid rgba(200,0,50,0.25)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                      marginBottom: '14px',
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                     // background: 'linear-gradient(90deg, #cc0000, #ff4466, #cc0000)',
                    }} />
                    <p style={{
                      color: '#cc0000',
                      fontSize: 'clamp(14px, 3.5vw, 17px)',
                      fontFamily: "'Georgia', serif",
                      textAlign: 'center',
                      margin: '0 0 14px 0',
                      fontWeight: '700',
                    }}>
                      Enter WhatsApp Number 
                    </p>
                    <input
                        type="tel"
                        placeholder="Enter 10 digit number"
                        value={waNumber}
                        onChange={(e) =>
                          setWaNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                        }
                        maxLength={10}
                        autoFocus
                        style={{
                          width: '100%',
                          padding: '13px 18px',
                          borderRadius: '50px',
                          border: '1.5px solid rgba(200,0,50,0.3)',
                          fontSize: 'clamp(14px, 3.5vw, 16px)',
                          outline: 'none',
                          textAlign: 'center',
                          fontFamily: "'Georgia', serif",
                          color: '#1a0010',
                          background: '#fff9fb',
                          marginBottom: '12px',
                          boxSizing: 'border-box',
                          letterSpacing: '1.5px',
                        }}
                      />
                    <motion.button
                      whileHover={{ scale: waNumber.replace(/\D/g, '').length >= 10 ? 1.03 : 1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleSendWishes}
                      disabled={waNumber.replace(/\D/g, '').length < 10}
                      style={{
                        background: waNumber.replace(/\D/g, '').length >= 10
                          ? 'linear-gradient(135deg, #cc0000, #ff4466)'
                          : 'rgba(200,0,50,0.15)',
                        color: waNumber.replace(/\D/g, '').length >= 10 ? 'white' : 'rgba(180,0,40,0.4)',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '13px 28px',
                        fontSize: 'clamp(14px, 3.8vw, 16px)',
                        cursor: waNumber.replace(/\D/g, '').length >= 10 ? 'pointer' : 'not-allowed',
                        fontFamily: "'Georgia', serif",
                        fontWeight: '700',
                        width: '100%',
                        boxShadow: waNumber.replace(/\D/g, '').length >= 10
                          ? '0 8px 28px rgba(200,0,50,0.35)' : 'none',
                        transition: 'all 0.3s',
                      }}
                    >
                      Send All 3 Wishes 🌟
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Done */}
              {waStep === 'done' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: '16px',
                    padding: '14px',
                    textAlign: 'center',
                    marginBottom: '14px',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <p style={{
                    color: '#ffffff',
                    fontSize: 'clamp(13px, 3.5vw, 15px)',
                    margin: 0,
                    fontFamily: "'Georgia', serif",
                  }}>
                    Wishes sent successfully!
                  </p>
                </motion.div>
              )}

                            <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '4px',
                }}
              >
                <motion.button
                onClick={() => navigate('/memory')}
                  style={{
                    background: 'linear-gradient(135deg, #f05d8e, #ec2020)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '15px 40px',
                    fontSize: 'clamp(15px, 4vw, 18px)',
                    cursor: 'pointer',
                    boxShadow: '0 10px 36px rgba(255,100,180,0.4)',
                    fontFamily: "'Georgia', serif",
                    fontWeight: '700',
                    width: '100%',
                    letterSpacing: '0.5px',
                    marginTop: '-10px',
                  }}
                >
                  Our Memories 
                </motion.button>
              </div>


            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}