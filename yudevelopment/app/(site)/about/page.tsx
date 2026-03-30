import { getCMS } from '@/lib/cms'
export const dynamic = 'force-dynamic'

export default function AboutPage() {
  const cms = getCMS()
  return (
    <>
      <section style={{ background: '#000', paddingTop: 56, minHeight: '45vh', display: 'flex', alignItems: 'flex-end', padding: '56px 64px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 'clamp(36px,5vw,56px)', fontWeight: 300 }}>Who We Are</h1>
      </section>

      <section style={{ background: '#2d2d2d', padding: '80px 64px' }}>
        <div style={{ maxWidth: 720 }}>
          <p style={{ color: '#fff', fontSize: 20, fontWeight: 300, lineHeight: 1.75, marginBottom: 20 }}>{cms.whoWeAre.paragraph1}</p>
          <p style={{ color: '#bbb', fontSize: 15, fontWeight: 300, lineHeight: 1.75 }}>{cms.whoWeAre.paragraph2}</p>
        </div>
      </section>

      <section style={{ background: '#252b34', padding: '80px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: 6 }}>{cms.vision.sectionLabel}</p>
          <div style={{ width: 48, height: 1, background: '#666', marginBottom: 20 }} />
          <p style={{ fontSize: 13, color: '#aaa', maxWidth: 440, lineHeight: 1.75, marginBottom: 56 }}>{cms.vision.text}</p>

          <div style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 60 }}>
            <p style={{ fontSize: 22, color: '#fff', fontStyle: 'italic', fontWeight: 300, maxWidth: 520, margin: '0 auto 16px' }}>&ldquo;{cms.vision.quote}&rdquo;</p>
            <p style={{ fontSize: 10, color: '#666', letterSpacing: '0.25em', textTransform: 'uppercase' }}>— {cms.vision.quoteAuthor}</p>
          </div>

          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: 6 }}>OUR PILLARS</p>
          <div style={{ width: 48, height: 1, background: '#666', marginBottom: 32 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {cms.pillars.map((p: { num: string; icon: string; title: string; description: string }) => (
              <div key={p.num} style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)', padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{p.icon}</div>
                  <span style={{ fontSize: 36, fontWeight: 300, color: 'rgba(255,255,255,0.08)' }}>{p.num}</span>
                </div>
                <p style={{ fontSize: 15, color: '#fff', marginBottom: 10 }}>{p.title}</p>
                <p style={{ fontSize: 12, color: '#888', lineHeight: 1.75 }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#faf9f6', padding: '80px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>OUR PEOPLE</p>
          <div style={{ width: 48, height: 1, background: '#000', marginBottom: 40 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 32 }}>
            {cms.team.map((m: { name: string; role: string; initials: string }) => (
              <div key={m.name} style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 18, fontWeight: 500, color: '#666' }}>{m.initials}</div>
                <p style={{ fontSize: 13, fontWeight: 500 }}>{m.name}</p>
                <p style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
