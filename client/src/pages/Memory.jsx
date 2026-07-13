// src/pages/Memory.jsx
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const memories = [
  {
    id: 1,
    date: 'Dec 25, 2022',
    title: 'First Meeting 💕',
    place: 'Bangla Sahib, Connaught Place',
    shortDesc: 'The night everything changed...',
    story: 'A Christmas night at Bangla Sahib, where a stranger became someone I could never forget. 💜',
    image: "s19.jpeg",
    video: null, // ← video path daalo jaise '/videos/memory1.mp4' ya null rakho
    song: 'perfect.m4a',
    side: 'left',
    color: '#c44dff',
    emoji: '🌸',
  },
  {
    id: 2,
    date: 'Jan 14, 2023',
    title: 'DLF Mall 🛍️',
    place: 'Noida',
    shortDesc: 'Tied by your hands...',
    story: 'A simple day at DLF Mall turned into one of my favorite memories. Walking beside you, laughing together. 💜', 
    image: "s24.jpeg",
    video: null,
    song: 'kaisehua.m4a',
    side: 'right',
    color: '#7be6cb',
  },
  {
    id: 3,
    date: 'Feb 10, 2023',
    title: 'Humayun Tomb 🌿',
    place: 'Delhi',
    shortDesc: 'Tied by your hands...',
story: 'A peaceful day at Humayun’s Tomb, talking, and enjoying the beautiful surroundings together. 🌿',
    image: "s33.jpeg",
    video: null,
    song: 'dorron.m4a',
    side: 'left',
    color: '#3a80f2',
  },
  {
    id: 4,
    date: 'Feb 11, 2023',
    title: 'Sundar Nursery 🌿',
    place: 'Delhi',
    shortDesc: 'Tied by your hands...',
story: 'A calm afternoon at Sundar Nursery, walking through the gardens and making memories along the way. 🌿',
    image: "s25.jpeg",
    video: null,
    song: 'kas.m4a',
    side: 'right',
    color: '#9879de',
  },
  {
    id: 5,
    date: 'Sep 20, 2023',
    title: 'First Birthday 🎂',
    place: 'Nik Bakers, Connaught Place',
    shortDesc: 'One candle, endless memories...',
story: 'Your birthday, a small cake, and countless smiles. What made the day special wasn’t the celebration, but sharing it with you. 💕',
    image: "s20.jpeg",
    video: null,
    song: 'khat.m4a',
    side: 'left',
    color: '#ff6b9d',
    emoji: '🎂',
  },
 
  {
    id: 6,
    date: 'Sep 27, 2023',
    title: 'India Gate 🎉',
    place: 'Delhi',
    shortDesc: 'Happy Birthday, my love...',
story: 'A day at India Gate, enjoying the atmosphere, and creating another memory together. 💜',
    image: "s26.jpeg",
    video: null, // ← yahan '/videos/indiagate.mp4' dal sakte ho
    song: 'tuj.m4a',
    side: 'right',
    color: '#ffd700',
    emoji: '🎊',
    isLast: true,
  },
  {
    id: 7,
    date: 'Feb 27, 2024',
    title: 'Cafe Delhi 🎉',
    place: 'Delhi',
    shortDesc: 'Happy Birthday, my love...',
story: 'A café full of teddy bears, a pizza from Wood Fire Kitchen, and hours of conversation. 🧸🍕',
    image: null,
    video: 's27.mp4', // ← yahan '/videos/indiagate.mp4' dal sakte ho
    song: 'ajib.mp3',
    side: 'left',
    color: '#974e09',
    emoji: '🎊',
    isLast: true,
  },
  {
    id: 8,
    date: 'March 7, 2024',
    title: 'Rajpath 🎉',
    place: 'Delhi',
    shortDesc: 'Happy Birthday, my love...',
story: 'A simple evening at Rajpath, walking around, talking, and enjoying the pleasant weather together. 🌙✨',
    image: "s28.jpeg",
    video: null, // ← yahan '/videos/indiagate.mp4' dal sakte ho
    song: 'they.m4a',
    side: 'right',
    color: '#f43030',
    emoji: '🎊',
    isLast: true,
  },
  {
    id: 9,
    date: 'Sep 2, 2024',
    title: 'India Gate 🎊',
    place: 'Delhi',
    shortDesc: 'Happy Birthday, my love...',
story: 'One of those simple evenings at India Gate that turned into a memory worth keeping. ✨',
    image: "s29.jpeg",
    video: null, // ← yahan '/videos/indiagate.mp4' dal sakte ho
    song: 'tumse.m4a',
    side: 'left',
    color: '#36d7af',
    emoji: '🎊',
    isLast: true,
  },
  {
    id: 11,
    date: 'April 19, 2024',
    title: 'Zero Degree 🎉',
    place: 'Canuught Place',
    shortDesc: 'Happy Birthday, my love...',
story: 'A quiet evening at Zero Degree where we talked about things that truly mattered. It was one of those conversations that stayed with me. ✨',
    image: 's34.jpeg',
    video: null, // ← yahan '/videos/indiagate.mp4' dal sakte ho
    song: 'ishq.m4a',
    side: 'right',
    color: '#179279',
    emoji: '🎊',
    isLast: true,
  },
  {
    id: 10,
    date: 'Dec 27, 2024',
    title: 'Lodhi Gardens 🎉',
    place: 'Delhi',
    shortDesc: 'Happy Birthday, my love...',
story: 'One of those simple days at Lodhi Garden where we just walked, talked, and enjoyed each other’s company. 🌿',  
  image: 's30.jpeg',
    video: null, // ← yahan '/videos/indiagate.mp4' dal sakte ho
    song: 'tumsehi.m4a',
    side: 'left',
    color: '#f81d8a',
    emoji: '🎊',
    isLast: true,
  },
  
  {
    id: 12,
    date: 'Dec 15, 2025',
    title: 'Social 🎉',
    place: 'NSP, Delhi',
    shortDesc: 'Happy Birthday, my love...',
story: 'A day at Social NSP, good conversations, and the fried idli you brought for me. Sometimes the smallest things become the most memorable moments. 🌟',
    image: 's31.jpeg',
    video: null, // ← yahan '/videos/indiagate.mp4' dal sakte ho
    song: 'loveme.m4a',
    side: 'right',
    color: '#aadc20',
    emoji: '🎊',
    isLast: true,
  },
  {
    id: 13,
    date: 'Dec 25, 2025',
    title: 'H&M 🎉',
    place: 'canaught place, Delhi',
    shortDesc: 'Happy Birthday, my love...',
story: 'A casual visit to H&M, checking out clothes, laughing at random styles, and making a normal day feel a little more special. 💜',
    image: 's32.jpeg',
    video: null, // ← yahan '/videos/indiagate.mp4' dal sakte ho
    song: 'Humdum.mp3',
    side: 'left',
    color: '#c125be',
    emoji: '🎊',
    isLast: true,
  },
  {
    id: 15,
    date: 'Jan 1, 2026',
    title: 'New Year Lunch 🍽️',
    place: 'Laxmi Nagar, Delhi',
    shortDesc: 'Happy Birthday, my love...',
    story: 'The best part of New Year wasn’t the date — it was the lunch. Thank you for inviting me and treating me to such amazing ghar jaisa food. A simple meal, but a memory I’ll always cherish. 🍽️💜',  
    image: 's35.jpeg',
    video: null, // ← yahan '/videos/indiagate.mp4' dal sakte ho
    song: 'sai.mp3',
    side: 'right',
    color: '#c9f158',
    emoji: '🎊',
    isLast: true,
  },
 
  {
    id: 16,
    date: 'May 8, 2026',
    title: 'The Knot on My Wrist 🪢',
    place: 'Laxmi Nagar, Delhi',
    shortDesc: 'Tied by your hands...',
story: 'What looked like an ordinary thread from your top became something I never wanted to throw away. It stayed on my wrist, carrying a memory with it. ✨',
    image: "s23.jpeg",
    video: null,
    song: 'osanam.m4a',
    side: 'left',
    color: '#ebc869',
  },
    {
    id: 17,
    date: 'May 13, 2026',
    title: 'Pinch mark 🤏',
    place: 'Sector 16, Noida',
    shortDesc: 'A mark that never faded...',
story: 'A tiny "Oh not Tiny" pinch, a visible mark, and a memory that lasted much longer than expected. Sometimes the smallest moments are the hardest to forget. 🤏',
    image: "s22.jpeg",
    video: null,
    song: '440.m4a',
    side: 'right',
    color: '#74d38c',
    emoji: '🤏',
  },
    {
    id: 18,
    date: 'May 19, 2026',
    title: 'Her First Treat ❤️',
    place: 'Sector 130, Noida',
    shortDesc: 'A mark that never faded...',
story: 'The first time she ordered food for me, it felt different. Maybe it was the taste, maybe it was the excitement, or maybe it was simply because it came from her. 🍕❤️',
    image: "s36.jpeg",
    video: null,
    song: 'sai.mp3',
    side: 'left',
    color: '#e69215',
    emoji: '🤏',
  },
  {
    id: 19,
    date: 'Coming Soon...',
    title: 'Another Chapter 💫',
    place: '',
    shortDesc: 'Our story is still being written...',
    story: 'Our story is still being written — page by page, moment by moment. 🌸',
    image: null,
    video: null,
    song: null,
    side: 'right',
    color: '#00ccff',
    emoji: '🌙',
    empty: true,
  },
  {
    id: 20,
    date: 'Coming Soon...',
    title: 'Another Chapter 💫',
    place: '',
    shortDesc: 'Our story is still being written...',
    story: 'Our story is still being written — page by page, moment by moment. 🌸',
    image: null,
    video: null,
    song: null,
    side: 'left',
    color: '#ff4d6d',
    emoji: '🌙',
    empty: true,
  },
]

export default function Memory() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const [selectedMemory, setSelectedMemory] = useState(null)

  useEffect(() => {
    if (selectedMemory?.song) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = selectedMemory.song
        audioRef.current.volume = 0.7
        audioRef.current.play().catch(() => {})
      }
    } else {
      audioRef.current?.pause()
    }
  }, [selectedMemory])

  const closeCard = () => {
  audioRef.current?.pause()
  setSelectedMemory(null)
  // Background music resume karo
  if (window.globalMusicAudio) {
    window.globalMusicAudio.dataset.manuallyPaused = 'false'
    window.globalMusicAudio.play().catch(() => {})
  }
}

  // ── Media helper — image ya video decide karta hai ──
  const hasMedia = (memory) => memory.image || memory.video

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'Georgia', serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      <audio ref={audioRef} loop />

      {/* Norway Video Background */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/norway.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.18) 100%)',
        zIndex: 1,
      }} />

      {/* ── Full screen card modal ── */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCard}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,5,0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 40 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(5,15,45,0.88)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '24px',
                padding: '1px 18px 10px 18px',
                maxWidth: '380px',
                width: '92%',
                border: `1px solid ${selectedMemory.color}55`,
                boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 40px ${selectedMemory.color}22`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${selectedMemory.color}, transparent)`,
              }} />

              {/* Date */}
              <p style={{
                color: selectedMemory.color,
                fontSize: 'clamp(10px, 2.5vw, 13px)',
                fontWeight: 'bold',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                margin: '16px 0 6px 0',
              }}>
                {selectedMemory.date}
              </p>

              {/* Title */}
              <h2 style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(20px, 6vw, 28px)',
                color: 'white',
                margin: '0 0 6px 0',
                fontWeight: '700',
                textShadow: `0 0 20px ${selectedMemory.color}88`,
              }}>
                {selectedMemory.title}
              </h2>

              {/* Place */}
              {selectedMemory.place && (
                <p style={{
                  color: 'rgba(200,170,255,0.5)',
                  fontSize: 'clamp(10px, 2.5vw, 13px)',
                  fontStyle: 'italic',
                  margin: '0 0 16px 0',
                }}>
                  📍 {selectedMemory.place}
                </p>
              )}

              {/* ── VIDEO in modal ── */}
              {selectedMemory.video && (
                <video
                  autoPlay
                  controls
                  loop
                  playsInline
                  style={{
                    width: '100%',
                    height: 'clamp(200px, 55vw, 320px)',
                    objectFit: 'cover',
                    borderRadius: '16px',
                    marginBottom: '16px',
                    border: `1px solid ${selectedMemory.color}44`,
                    boxShadow: `0 8px 30px rgba(0,0,0,0.5)`,
                    display: 'block',
                  }}
                >
                  <source src={selectedMemory.video} type="video/mp4" />
                </video>
              )}

              {/* ── IMAGE in modal (sirf tab jab video nahi) ── */}
              {selectedMemory.image && !selectedMemory.video && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  style={{
                    width: '100%',
                    height: 'clamp(200px, 55vw, 320px)',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    borderRadius: '16px',
                    marginBottom: '16px',
                    border: `1px solid ${selectedMemory.color}44`,
                    boxShadow: `0 8px 30px rgba(0,0,0,0.5)`,
                  }}
                />
              )}

              {/* Story */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  color: 'rgba(220,195,255,0.88)',
                  fontSize: 'clamp(13px, 3.5vw, 16px)',
                  lineHeight: '1.5',
                  margin: 0,
                  fontStyle: 'italic',
fontFamily: "'Playfair Display', serif",
                }}
              >
                "{selectedMemory.story}"
              </motion.p>

              {selectedMemory.song && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '16px',
                    color: selectedMemory.color,
                    fontSize: '12px',
                  }}
                />
              )}

              <p style={{
                color: 'rgba(255,255,255,0.2)',
                fontSize: '11px',
                textAlign: 'center',
                marginTop: '-5px',
                fontStyle: 'italic',
              }}>
                Tap outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: 'clamp(30px, 5vw, 60px) clamp(16px, 4vw, 24px)',
        maxWidth: '700px',
        margin: '0 auto',
      }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h1 style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(32px, 8vw, 52px)',
            color: 'white',
            textShadow: '0 0 30px rgba(196,160,255,0.8), 0 0 60px rgba(157,78,221,0.4)',
            margin: '0 0 12px 0',
            fontWeight: '700',
          }}>
            Our Memories
          </h1>
          <p style={{
            color: 'rgba(200,160,255,0.75)',
            fontSize: 'clamp(13px, 3vw, 17px)',
            fontStyle: 'italic',
            margin: 0,
          }}>
            Moments that will always live in our hearts ✨
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: '50%', top: 0, bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, transparent, rgba(196,160,255,0.6), rgba(255,107,157,0.6), rgba(201,168,76,0.6), transparent)',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
            }}
          />

          {memories.map((memory, i) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, x: memory.side === 'left' ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.1, type: 'spring' }}
              style={{
                display: 'flex',
                justifyContent: memory.side === 'left' ? 'flex-start' : 'flex-end',
                marginBottom: 'clamp(30px, 6vw, 50px)',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring' }}
                style={{
                  position: 'absolute',
                  left: '50%', top: '24px',
                  transform: 'translateX(-50%)',
                  width: '14px', height: '14px',
                  borderRadius: '50%',
                  background: memory.color,
                  boxShadow: `0 0 12px ${memory.color}, 0 0 25px ${memory.color}44`,
                  zIndex: 5,
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              />

              <motion.div
                whileHover={{ scale: memory.empty ? 1 : 1.03, y: memory.empty ? 0 : -4 }}
                whileTap={{ scale: memory.empty ? 1 : 0.97 }}
                onClick={() => {
  if (memory.empty) return
  setSelectedMemory(memory)
  // Background music pause karo
  if (window.globalMusicAudio) {
    window.globalMusicAudio.dataset.manuallyPaused = 'true'
    window.globalMusicAudio.pause()
  }
}}
                style={{
                  width: '44%',
                  background: memory.empty ? 'rgba(8,15,25,0.45)' : 'rgba(5,15,45,0.75)',
                  backdropFilter: memory.empty ? 'blur(2px)' : 'blur(10px)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: `1px solid ${memory.color}${memory.empty ? '22' : '44'}`,
                  boxShadow: memory.empty
                    ? 'none'
                    : `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${memory.color}22`,
                  cursor: memory.empty ? 'default' : 'pointer',
                  position: 'relative',
                }}
              >

                {/* ── THUMBNAIL: VIDEO ya IMAGE ── */}
                {memory.video ? (
                  // Video thumbnail
                  <div style={{ position: 'relative' }}>
                    <video
                      muted
                      playsInline
                      loop
                      autoPlay
                      style={{
                        width: '100%',
                        aspectRatio: '9/9',
                        height: 'auto',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    >
                      <source src={memory.video} type="video/mp4" />
                    </video>
                    
                  </div>

                ) : memory.image ? (
                  // Image thumbnail
                  <div style={{ position: 'relative' }}>
                    <img
                      src={memory.image}
                      alt={memory.title}
                      style={{
                        width: '100%',
                        aspectRatio: '9/9',
                        height: 'auto',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                    />
                  </div>

                ) : !memory.empty ? (
                  <div style={{
                    height: 'clamp(70px, 18vw, 110px)',
                    background: `linear-gradient(135deg, ${memory.color}22, ${memory.color}08)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }} />
                ) : (
                  <div style={{
                    height: 'clamp(60px, 15vw, 80px)',
                    border: `1px dashed ${memory.color}33`,
                    borderRadius: '12px',
                    margin: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.4,
                  }}>
                    <span style={{ color: memory.color, fontSize: '22px' }}>+</span>
                  </div>
                )}

                {/* Card bottom text */}
                <div style={{ padding: 'clamp(10px, 3vw, 14px)' }}>
                  <p style={{
                    color: memory.color,
                    fontSize: 'clamp(10px, 2vw, 12px)',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    margin: '-6px 0 3px 0',
                    opacity: memory.empty ? 0.8 : 1,
                    textShadow: memory.empty ? `0 0 10px ${memory.color}` : 'none',
                  }}>
                    {memory.date}
                  </p>
                  <h3 style={{
                    fontFamily: "'Parisienne', cursive",
                    fontSize: 'clamp(11px, 3.5vw, 16px)',
                    color: memory.empty ? 'rgba(255,255,255,0.6)' : 'white',
                    margin: '0 0 -6px 0',
                    fontWeight: '600',
                    textShadow: memory.empty ? 'none' : `0 0 12px ${memory.color}66`,
                  }}>
                    {memory.title}
                  </h3>
                </div>

                {memory.isLast && (
                  <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      position: 'absolute', inset: 0,
                      borderRadius: '20px',
                      background: `radial-gradient(ellipse at center, ${memory.color}15 0%, transparent 70%)`,
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                fontSize: '30px',
                filter: 'drop-shadow(0 0 20px rgba(255,107,157,0.8))',
              }}
            >
              💜
            </motion.div>
          </motion.div>
        </div>

        {/* Next button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(157,78,221,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/gifts')}
            style={{
              background: 'linear-gradient(135deg, #9d4edd, #c77dff)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '12px 40px',
              fontSize: 'clamp(15px, 4vw, 19px)',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(157,78,221,0.4)',
              fontFamily: "'Dancing Script', cursive",
              fontWeight: '700',
              letterSpacing: '0.5px',
              width: '100%',
              maxWidth: '220px',
            }}
          >
            Continue
          </motion.button>
        </motion.div>

      </div>
    </div>
  )
}