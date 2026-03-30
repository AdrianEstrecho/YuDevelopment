'use client'
import { useState } from 'react'

type Dept = { id: string; icon: string; label: string; title: string; description: string }

export default function DepartmentsSection({ departments }: { departments: Dept[] }) {
  const [active, setActive] = useState(0)
  const d = departments[active]

  return (
    <section style={{ background: '#1e2530', padding: '80px 64px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: 6 }}>OUR DEPARTMENTS</p>
        <div style={{ width: 48, height: 1, background: '#666', marginBottom: 20 }} />
        <p style={{ fontSize: 13, color: '#aaa', maxWidth: 480, lineHeight: 1.7, marginBottom: 40 }}>
          YuDevelopment operates through specialized departments that work together to build, support, and scale innovative companies.
        </p>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${departments.length}, 1fr)`, gap: 12, marginBottom: 16 }}>
          {departments.map((dept, i) => {
            const isActive = active === i
            return (
              <button
                key={dept.id}
                onClick={() => setActive(i)}
                className="dept-card"
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  textAlign: 'center',
                  padding: '12px 8px',
                  borderRadius: 8,
                  minHeight: 120,
                  background: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${isActive ? 'rgba(255,255,255,0.3)' : 'transparent'}`,
                  boxShadow: isActive ? '0 4px 24px rgba(0,0,0,0.3)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  overflow: 'hidden',
                }}
              >
                {isActive && (
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 8, zIndex: 0, background: 'rgba(255,255,255,0.15)', filter: 'blur(24px)', opacity: 0.08, pointerEvents: 'none' }} />
                )}
                {/* Icon */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  flexShrink: 0,
                  width: 48, height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.12))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                  filter: 'brightness(0) invert(1)',
                  transform: isActive ? 'scale(1.1)' : 'none',
                  transition: 'transform 0.3s',
                }}>
                  {dept.icon}
                </div>
                {/* Label */}
                <div style={{ position: 'relative', zIndex: 1, opacity: isActive ? 1 : 0.8 }}>
                  <h3 style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
                    transition: 'color 0.3s',
                    lineHeight: 1.3,
                  }}>
                    {dept.label}
                  </h3>
                </div>
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <div style={{
          position: 'relative',
          padding: '40px 48px 64px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(20px)',
        }}>
          {/* Corner glow */}
          <div style={{ position: 'absolute', top: 0, right: 0, width: 256, height: 256, opacity: 0.15, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'linear-gradient(225deg, rgba(255,255,255,0.2), transparent)', filter: 'blur(40px)' }} />
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 400, letterSpacing: '-0.025em', color: '#fff', marginBottom: 6 }}>{d.title}</h2>
            <p style={{ fontSize: 'clamp(11px, 1vw, 13px)', fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.9)', maxWidth: '80ch' }}>{d.description}</p>
          </div>

          {/* Dot indicators */}
          <div style={{ position: 'absolute', bottom: 24, left: 48, zIndex: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
            {departments.map((dept, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View ${dept.label}`}
                style={{
                  width: i === active ? 28 : 10,
                  height: 10,
                  borderRadius: i === active ? 6 : 999,
                  background: i === active ? '#fff' : 'rgba(255,255,255,0.35)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .dept-card:hover { background: rgba(255,255,255,0.08) !important; box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important; }
      `}</style>
    </section>
  )
}
