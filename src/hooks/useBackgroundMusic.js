import { useEffect, useRef } from 'react'

export const useBackgroundMusic = (isPlaying) => {
  const audioContextRef = useRef(null)
  const oscillatorsRef = useRef([])
  const gainNodeRef = useRef(null)

  useEffect(() => {
    if (isPlaying) {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      const ctx = audioContextRef.current
      
      // Create main gain node for volume control
      gainNodeRef.current = ctx.createGain()
      gainNodeRef.current.gain.value = 0.1 // Quiet background music
      gainNodeRef.current.connect(ctx.destination)

      // Pleasant chord progression: C - Am - F - G
      const playChord = (notes, startTime, duration) => {
        notes.forEach(frequency => {
          const osc = ctx.createOscillator()
          const oscGain = ctx.createGain()
          
          osc.type = 'sine'
          osc.frequency.value = frequency
          
          oscGain.gain.setValueAtTime(0, startTime)
          oscGain.gain.linearRampToValueAtTime(0.15, startTime + 0.1)
          oscGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration)
          
          osc.connect(oscGain)
          oscGain.connect(gainNodeRef.current)
          
          osc.start(startTime)
          osc.stop(startTime + duration)
          
          oscillatorsRef.current.push(osc)
        })
      }

      // Musical frequencies (in Hz)
      const C4 = 261.63
      const E4 = 329.63
      const G4 = 392.00
      const A4 = 440.00
      const F4 = 349.23
      const C5 = 523.25

      const chords = [
        [C4, E4, G4, C5],      // C major
        [A4, C5, E4],          // A minor
        [F4, A4, C5],          // F major
        [G4, 246.94, 293.66]   // G major
      ]

      const startTime = ctx.currentTime
      const beatDuration = 1.5 // Duration of each chord in seconds

      // Play chord progression in a loop
      const playLoop = () => {
        const loopStartTime = ctx.currentTime
        chords.forEach((chord, i) => {
          playChord(chord, loopStartTime + i * beatDuration, beatDuration)
        })
        
        // Schedule next loop
        const loopDuration = chords.length * beatDuration
        setTimeout(() => {
          if (audioContextRef.current && audioContextRef.current.state === 'running') {
            playLoop()
          }
        }, (loopDuration - 0.5) * 1000)
      }

      playLoop()
    }

    return () => {
      // Cleanup
      if (audioContextRef.current) {
        oscillatorsRef.current.forEach(osc => {
          try {
            osc.stop()
          } catch (e) {
            // Already stopped
          }
        })
        audioContextRef.current.close()
        oscillatorsRef.current = []
      }
    }
  }, [isPlaying])

  return null
}

