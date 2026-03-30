'use client'
import { useState, useEffect } from 'react'

type WhyJoin = { num: string; icon: string; title: string; description: string }
type Role = { id: string; title: string; department: string; type: string; location: string; applyLink: string; description: string; requirements: string[] }
type CareersData = { headline: string; description: string; whyJoin: WhyJoin[]; roles: Role[] }

export default function CareersPage() {
  const [careers, setCareers] = useState<CareersData | null>(null)

  useEffect(() => {
    fetch('/api/cms').then(r => r.json()).then(d => setCareers(d.careers))
  }, [])

  if (!careers) return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#555' }}>Loading…</p>
    </div>
  )

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        position: 'relative',
        minHeight: '45vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 32px 80px',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #2a2e35 0%, #1a1d22 40%, #0f1115 100%)',
      }}>
        {/* subtle texture overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 640 }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 20, lineHeight: 1.1 }}>
            {careers.headline}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.8 }}>
            {careers.description}
          </p>
          <button
            onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', padding: '10px 24px', transition: 'border-color 0.2s' }}
          >
            View Open Positions
          </button>
        </div>
      </section>

      {/* ── WHY JOIN ── */}
      <section style={{ background: '#1e2128', padding: '80px 64px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: 6 }}>WHY JOIN YGCCC</p>
          <div style={{ width: 48, height: 2, background: '#c8a96e', marginBottom: 16 }} />
          <p style={{ fontSize: 13, color: '#aaa', marginBottom: 48, lineHeight: 1.7 }}>Experience that goes beyond a single job description.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {careers.whyJoin.map(item => (
              <div key={item.num} className="why-card" style={{ position: 'relative', padding: '24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', transition: 'border-color 0.3s, background 0.3s' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ borderRadius: 10, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.23)', display: 'inline-flex' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.07))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, filter: 'brightness(0) invert(1)' }}>
                      {item.icon}
                    </div>
                  </div>
                  <span style={{ fontSize: 40, fontWeight: 700, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>{item.num}</span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 10, lineHeight: 1.35 }}>{item.title}</h3>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 12 }} />
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontWeight: 300 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section id="positions" style={{ background: '#16181c', padding: '80px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: 6 }}>OPEN POSITIONS</p>
          <div style={{ width: 48, height: 2, background: '#c8a96e', marginBottom: 16 }} />
          <p style={{ fontSize: 13, color: '#6b9fd4', marginBottom: 48, lineHeight: 1.7 }}>Find your place in our growing team</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', gap: 16 }}>
            {careers.roles.map(role => (
              <div key={role.id} style={{ background: '#22252c', border: '1px solid rgba(255,255,255,0.08)', padding: '28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Title */}
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{role.title}</h3>

                {/* Meta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>⬜</span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{role.department}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ opacity: 0.5 }}>◎</span> {role.location}
                    </span>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ opacity: 0.5 }}>○</span> {role.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, fontWeight: 300 }}>{role.description}</p>

                {/* Requirements */}
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>Requirements</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {role.requirements.map((req, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                        <span style={{ flexShrink: 0, marginTop: 1, color: 'rgba(255,255,255,0.3)' }}>○</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply button */}
                <a href={role.applyLink || '#'} target="_blank" rel="noreferrer" style={{ marginTop: 'auto', display: 'block', width: '100%', padding: '12px', background: 'none', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontSize: 13, cursor: 'pointer', letterSpacing: '0.02em', textDecoration: 'none', textAlign: 'center', transition: 'border-color 0.2s, background 0.2s', boxSizing: 'border-box' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'none' }}
                >
                  Apply Now →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .why-card:hover { background: rgba(255,255,255,0.07) !important; border-color: rgba(255,255,255,0.15) !important; }
      `}</style>
    </>
  )
}
