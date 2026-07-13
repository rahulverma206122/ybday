// src/pages/Message.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Message() {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const WHATSAPP_NUMBER = '917217293004'

  const handleSend = () => {
    if (!message.trim()) {
      setError('Message likhna zaroori hai! 💭')
      return
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError('Sahi WhatsApp number daalo! 📱')
      return
    }

    setError('')

    const fullMessage = name.trim()
      ? `Hii Rahul! I am ${name} `
      : `Hii Rahul! `

    const encodedMessage = encodeURIComponent(fullMessage)
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    window.open(whatsappURL, '_blank')
    setSent(true)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      height: '100dvh',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4f0 50%, #f5e4ff 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: sent
        ? 'center'
        : window.innerWidth < 768 ? 'flex-start' : 'center',
      paddingTop: sent
        ? '0px'
        : window.innerWidth < 768 ? '130px' : '12px',
      fontFamily: "'Georgia', serif",
      paddingLeft: '12px',
      paddingRight: '12px',
    }}>

      {/* Floating hearts */}
      {['💕', '🌸', '💝', '✨', '💖'].map((emoji, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          style={{
            position: 'absolute',
            left: `${15 + i * 18}%`,
            top: `${10 + (i % 2) * 5}%`,
            fontSize: '24px',
            pointerEvents: 'none',
            opacity: 0.6,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <AnimatePresence mode='wait'>
        {!sent ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              backgroundImage: "url('y3.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              padding: window.innerWidth < 768 ? '24px 20px' : '40px 35px',
              maxWidth: '480px',
              height: window.innerWidth < 768 ? '59vh' : '530px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(255,182,193,0.35)',
              border: '2px solid rgba(255,182,193,0.3)',
              textAlign: 'center',
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.25)',
              borderRadius: '30px',
              zIndex: 0,
            }} />

            <motion.div
              animate={{ rotate: [0, 0, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontSize: window.innerWidth < 768 ? '42px' : '60px',
                marginBottom: '16px',
                marginTop: '-20px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              .
            </motion.div>

            <h2 style={{
              fontSize: 'clamp(20px, 6vw, 25px)',
              background: 'linear-gradient(135deg, #ff6b9d, #c44dff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              marginBottom: '8px',
              position: 'relative',
              zIndex: 1,
            }}>
              Send Message to Your Loved Ones!
            </h2>

            <p style={{
              color: '#a0659a',
              fontSize: 'clamp(13px, 3.5vw, 15px)',
              marginBottom: '24px',
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 1,
            }}>
              Want to Say Something 💕
            </p>

            <input
              type="text"
              placeholder="Your Name 😊"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.6)',
                fontSize: 'clamp(14px, 3.5vw, 15px)',
                outline: 'none',
                fontFamily: "'Georgia', serif",
                color: 'white',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(2px)',
                marginBottom: '12px',
                boxSizing: 'border-box',
                textAlign: 'center',
                WebkitTextFillColor: 'white',
                position: 'relative',
                zIndex: 1,
              }}
            />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              gap: '8px',
              position: 'relative',
              zIndex: 1,
            }}>
              <input
                type="tel"
                placeholder="WhatsApp No. of that Person"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/[^0-9]/g, ''))
                  setError('')
                }}
                maxLength={10}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '50px',
                  border: `1px solid ${phone.length === 10 ? '#25D366' : 'rgba(230,216,216,0.6)'}`,
                  fontSize: 'clamp(14px, 3.5vw, 15px)',
                  outline: 'none',
                  fontFamily: "'Georgia', serif",
                  color: 'white',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(2px)',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  WebkitTextFillColor: 'white',
                }}
              />
            </div>

            {phone.length > 0 && phone.length < 10 && (
              <p style={{
                color: '#ff9d9d',
                fontSize: '12px',
                marginBottom: '10px',
                marginTop: '-6px',
                position: 'relative',
                zIndex: 1,
              }}>
                {10 - phone.length} digits Needed
              </p>
            )}
            {phone.length === 10 && (
              <p style={{
                color: '#25D366',
                fontSize: '12px',
                marginBottom: '10px',
                marginTop: '-6px',
                position: 'relative',
                zIndex: 1,
              }}>
                ✅ The no is valid!
              </p>
            )}

            <textarea
              placeholder="Say something... 💭"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                setError('')
              }}
              rows={2}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.6)',
                fontSize: 'clamp(14px, 3.5vw, 15px)',
                outline: 'none',
                fontFamily: "'Georgia', serif",
                color: 'white',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(2px)',
                marginBottom: '14px',
                boxSizing: 'border-box',
                resize: 'none',
                lineHeight: '1.6',
                WebkitTextFillColor: 'white',
                position: 'relative',
                zIndex: 1,
              }}
            />

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    color: '#ff4d7d',
                    fontSize: '13px',
                    marginBottom: '12px',
                    fontStyle: 'italic',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!message.trim() || phone.length < 10}
              style={{
                background: message.trim() && phone.length === 10
                  ? 'linear-gradient(135deg, #25D366, #128C7E)'
                  : 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(2px)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '10px 10px',
                fontSize: 'clamp(18px, 4vw, 22px)',
                cursor: message.trim() && phone.length === 10 ? 'pointer' : 'not-allowed',
                fontFamily: "'Georgia', serif",
                width: '100%',
                boxShadow: message.trim() && phone.length === 10
                  ? '0 10px 30px rgba(37,211,102,0.4)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <span>Send</span>
            </motion.button>

          </motion.div>

        ) : (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '35px',
              minHeight: '500px',
              maxWidth: window.innerWidth < 768 ? '300px' : '420px',
              width: '90%',
              textAlign: 'center',
              backgroundImage: "url('/y3.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 25px 80px rgba(255,105,180,0.25), 0 0 30px rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            {/* Dark gradient overlay — bottom heavy so text is readable */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(80,0,40,0.82) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)',
              zIndex: 1,
            }} />

            {/* ── Text overlaid on image — exactly like screenshot ── */}
            <div style={{
              position: 'absolute',
              bottom: '28px',
              left: 0,
              right: 0,
              padding: '0 20px',
              zIndex: 3,
            }}>
              {/* ✦ THE END ✦ */}
              <p style={{
                color: 'rgba(248, 233, 240, 0.75)',
                fontSize: 'clamp(9px, 2vw, 11px)',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                margin: '0 0 6px 0',
                fontFamily: "'Georgia', serif",
              }}>
                ✦ The End ✦
              </p>

              {/* Thank You heading */}
              <h2 style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(20px, 6vw, 26px)',
                color: 'white',
                margin: '0 0 6px 0',
                fontWeight: '700',
                textShadow: '0 0 24px rgba(255,105,180,0.7)',
                lineHeight: 1.2,
              }}>
                Thank You for Being Here 
              </h2>

              {/* Subtitle */}
              

              {/* Write Again button */}
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 12px 35px rgba(255,105,180,0.4)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setSent(false)
                  setMessage('')
                  setPhone('')
                  setName('')
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.08))',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.35)',
                  borderRadius: '50px',
                  padding: '10px 18px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontFamily: "'Georgia', serif",
                  backdropFilter: 'blur(3px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
                }}
              >
                Write Again ✍️
              </motion.button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}