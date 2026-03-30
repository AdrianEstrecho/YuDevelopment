'use client'
import { useEffect, useRef } from 'react'

type Props = { paragraphs: string[] }

export default function ScrollRevealText({ paragraphs }: Props) {
  const wordsByPara: { word: string; idx: number }[][] = []
  let idx = 0
  for (const para of paragraphs) {
    wordsByPara.push(para.split(' ').map(word => ({ word, idx: idx++ })))
  }

  const wordRefs = useRef<(HTMLDivElement | null)[]>([])
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight
      for (let i = 0; i < wordRefs.current.length; i++) {
        const div = wordRefs.current[i]
        const overlay = overlayRefs.current[i]
        if (!div || !overlay) continue
        const rect = div.getBoundingClientRect()
        const revealPoint = vh * 0.88
        const opacity = rect.top < revealPoint
          ? Math.min(1, (revealPoint - rect.top) / 80)
          : 0
        overlay.style.opacity = String(opacity)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ fontSize: 'clamp(14px, 2vw, 22px)', letterSpacing: '-0.025em', lineHeight: 1.3, marginBottom: '2rem', fontWeight: 300 }}>
      {wordsByPara.map((words, pi) => (
        <div key={pi}>
          {pi > 0 && <div style={{ height: '1rem' }} />}
          <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.75rem', marginBottom: '0.5rem' }}>
            {words.map(({ word, idx: i }) => (
              <div
                key={i}
                ref={el => { wordRefs.current[i] = el }}
                style={{ position: 'relative', display: 'inline-block' }}
              >
                <span style={{ visibility: 'hidden' }}>{word}</span>
                <span style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, color: 'rgb(144, 137, 130)' }}>{word}</span>
                <span
                  ref={el => { overlayRefs.current[i] = el }}
                  style={{ position: 'absolute', top: 0, left: 0, zIndex: 20, color: '#fff', opacity: 0 }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
