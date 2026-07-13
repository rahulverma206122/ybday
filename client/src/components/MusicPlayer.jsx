// src/components/MusicPlayer.jsx

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MusicPlayer() {
  const audioRef = useRef(
    typeof window !== 'undefined'
      ? window.globalMusicAudio || new Audio('/music.mp3')
      : null
  )

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!audioRef.current) return

    // Global audio instance
    window.globalMusicAudio = audioRef.current

    audioRef.current.loop = true

    // Initialize manual pause flag
    if (!audioRef.current.dataset.manuallyPaused) {
      audioRef.current.dataset.manuallyPaused = 'false'
    }

    // Auto play
    const tryAutoPlay = async () => {
      // Don't autoplay if manually paused
      if (audioRef.current.dataset.manuallyPaused === 'true') {
        return
      }

      try {
        if (audioRef.current.paused) {
          await audioRef.current.play()
        }

        setIsPlaying(true)
      } catch (err) {
        setIsPlaying(false)
      }
    }

    tryAutoPlay()

    // First click fallback
    const handleFirstClick = async () => {
      if (
        audioRef.current.paused &&
        audioRef.current.dataset.manuallyPaused !== 'true'
      ) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (err) {
          console.log(err)
        }
      }

      document.removeEventListener('click', handleFirstClick)
    }

    document.addEventListener('click', handleFirstClick)

    // Sync play/pause state
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audioRef.current.addEventListener('play', handlePlay)
    audioRef.current.addEventListener('pause', handlePause)

    return () => {
      document.removeEventListener('click', handleFirstClick)

      audioRef.current?.removeEventListener('play', handlePlay)
      audioRef.current?.removeEventListener('pause', handlePause)
    }
  }, [])

  const toggleMusic = (e) => {
    e.stopPropagation()

    if (!audioRef.current) return

    if (audioRef.current.paused) {
      audioRef.current.dataset.manuallyPaused = 'false'

      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.dataset.manuallyPaused = 'true'

      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      {/* Floating Music Button */}
      <motion.button
        animate={
          !isPlaying
            ? {
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 8px 25px rgba(255,107,157,0.5)',
                  '0 8px 35px rgba(255,107,157,0.9)',
                  '0 8px 25px rgba(255,107,157,0.5)',
                ],
              }
            : {
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ee89aa, #cb97e4)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
          boxShadow: '0 8px 25px rgba(255,107,157,0.5)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isPlaying ? '🎵' : '🔇'}
      </motion.button>
    </>
  )
}