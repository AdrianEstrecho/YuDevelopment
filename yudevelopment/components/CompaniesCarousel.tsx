'use client'
import { useState, useRef, useCallback } from 'react'

type Project = {
  id: string
  title: string
  date: string
  excerpt: string
  bgColor: string
  image?: string
}

type AnimState = 'idle' | 'exit' | 'enter-from' | 'enter'

function chunks<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export default function CompaniesCarousel({ projects }: { projects: Project[] }) {
  const pages      = chunks(projects, 2)
  const totalPages = pages.length

  const [pageIdx, setPageIdx] = useState(0)
  const [animState, setAnim]  = useState<AnimState>('idle')
  const [navDir, setNavDir]   = useState<'next' | 'prev'>('next')
  const pending               = useRef(0)

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (animState !== 'idle' || totalPages < 2) return
    const newPage = direction === 'next'
      ? (pageIdx + 1) % totalPages
      : (pageIdx - 1 + totalPages) % totalPages

    pending.current = newPage
    setNavDir(direction)
    setAnim('exit')

    setTimeout(() => {
      setPageIdx(newPage)
      setAnim('enter-from')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnim('enter')
          setTimeout(() => setAnim('idle'), 380)
        })
      })
    }, 280)
  }, [animState, pageIdx, totalPages])

  const pair = pages[pageIdx] ?? []

  const exitX      = navDir === 'next' ? '-40px' : '40px'
  const enterFromX = navDir === 'next' ? '40px'  : '-40px'

  const slideStyle: React.CSSProperties =
    animState === 'exit'
      ? { opacity: 0, transform: `translateX(${exitX})`,      transition: 'opacity 0.28s ease, transform 0.28s ease' }
    : animState === 'enter-from'
      ? { opacity: 0, transform: `translateX(${enterFromX})`, transition: 'none' }
    : { opacity: 1, transform: 'translateX(0)',                transition: 'opacity 0.38s ease, transform 0.38s ease' }

  return (
    <section style={{ background: '#fff', borderTop: '1px solid #eee', overflow: 'hidden' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', ...slideStyle }}>
        {pair.map(p => (
          <div key={p.id} style={{
            position: 'relative',
            minHeight: 480,
            background: p.image ? `url(${p.image}) center/cover no-repeat` : p.bgColor,
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.78) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 32px' }}>
              <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 400, lineHeight: 1.3, marginBottom: 8 }}>{p.title}</h3>
              {p.date && <p style={{ color: '#aaa', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>{p.date}</p>}
              <p style={{ color: '#ccc', fontSize: 12, lineHeight: 1.75, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.excerpt}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px 64px', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#aaa' }}>
          YUDEVELOPMENT TAKES PRIDE IN CONTRIBUTING TO THE SUCCESS OF THEIR CLIENTS.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {pages.map((_, i) => (
              <div
                key={i}
                onClick={() => { if (i !== pageIdx && animState === 'idle') navigate(i > pageIdx ? 'next' : 'prev') }}
                style={{ width: 28, height: 2, background: i === pageIdx ? '#000' : '#ddd', cursor: 'pointer', transition: 'background 0.25s' }}
              />
            ))}
          </div>
          <button onClick={() => navigate('prev')} style={{ width: 32, height: 32, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')} onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>‹</button>
          <button onClick={() => navigate('next')} style={{ width: 32, height: 32, border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = '#f5f5f5')} onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>›</button>
        </div>
      </div>
    </section>
  )
}
