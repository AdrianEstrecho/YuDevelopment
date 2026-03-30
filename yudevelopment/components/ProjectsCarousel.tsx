'use client'
import { useState, useRef, useCallback } from 'react'

type Slide = { id: string; title: string; date: string; excerpt: string; bgColor: string; image?: string }

type AnimState = 'idle' | 'exit' | 'enter-from' | 'enter'

export default function ProjectsCarousel({ projects }: { projects: Slide[] }) {
  const [idx, setIdx]           = useState(0)
  const [animState, setAnim]    = useState<AnimState>('idle')
  const [navDir, setNavDir]     = useState<'next' | 'prev'>('next')
  const pendingIdx               = useRef(0)

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (animState !== 'idle' || projects.length < 2) return

    const newIdx = direction === 'next'
      ? (idx >= projects.length - 2 ? 0 : idx + 1)
      : (idx === 0 ? Math.max(0, projects.length - 2) : idx - 1)

    pendingIdx.current = newIdx
    setNavDir(direction)
    setAnim('exit')

    setTimeout(() => {
      setIdx(newIdx)
      setAnim('enter-from')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnim('enter')
          setTimeout(() => setAnim('idle'), 380)
        })
      })
    }, 280)
  }, [animState, idx, projects.length])

  const prev = useCallback(() => navigate('prev'), [navigate])
  const next = useCallback(() => navigate('next'), [navigate])

  const goTo = useCallback((i: number) => {
    if (i === idx || animState !== 'idle') return
    navigate(i > idx ? 'next' : 'prev')
  }, [idx, animState, navigate])

  const pair = [projects[idx], projects[(idx + 1) % projects.length]].filter(Boolean)

  const exitX      = navDir === 'next' ? '-32px' : '32px'
  const enterFromX = navDir === 'next' ? '32px'  : '-32px'

  const wrapStyle: React.CSSProperties =
    animState === 'exit'
      ? { opacity: 0, transform: `translateX(${exitX})`,    transition: 'opacity 0.28s ease, transform 0.28s ease' }
    : animState === 'enter-from'
      ? { opacity: 0, transform: `translateX(${enterFromX})`, transition: 'none' }
    : animState === 'enter'
      ? { opacity: 1, transform: 'translateX(0)',            transition: 'opacity 0.38s ease, transform 0.38s ease' }
    : { opacity: 1, transform: 'translateX(0)',              transition: 'opacity 0.38s ease, transform 0.38s ease' }

  return (
    <section style={{ background: '#fff', borderTop: '1px solid #eee', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', ...wrapStyle }}>
        {pair.map(p => (
          <div
            key={p.id}
            style={{
              position: 'relative',
              minHeight: 480,
              background: p.image
                ? `url(${p.image}) center/cover no-repeat`
                : p.bgColor,
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.75) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.65)', padding: 24, margin: 16 }}>
              <h3 style={{ color: '#fff', fontSize: 14, fontWeight: 400, lineHeight: 1.5, marginBottom: 8 }}>{p.title}</h3>
              <p style={{ color: '#aaa', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>{p.date}</p>
              <p style={{ color: '#ccc', fontSize: 12, lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.excerpt}</p>
              <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: 12, cursor: 'pointer', padding: 0 }}>› See full article</button>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ padding: '20px 64px', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa' }}>
          YUDEVELOPMENT TAKES PRIDE IN CONTRIBUTING TO THE SUCCESS OF THEIR CLIENTS.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {projects.map((_, i) => (
              <div
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: 28, height: 2,
                  background: i === idx ? '#000' : '#ddd',
                  cursor: 'pointer',
                  transition: 'background 0.25s',
                }}
              />
            ))}
          </div>
          <button
            onClick={prev}
            style={{ width: 32, height: 32, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
          >‹</button>
          <button
            onClick={next}
            style={{ width: 32, height: 32, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
          >›</button>
        </div>
      </div>
    </section>
  )
}
