import { getCMS } from '@/lib/cms'
export const dynamic = 'force-dynamic'

export default function PeoplePage() {
  const cms = getCMS()
  return (
    <>
      <section style={{ background: '#000', paddingTop: 56, minHeight: '45vh', display: 'flex', alignItems: 'flex-end', padding: '56px 64px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 'clamp(36px,5vw,56px)', fontWeight: 300 }}>Our People</h1>
      </section>

      {/* Team */}
      <section style={{ background: '#faf9f6', padding: '80px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>LEADERSHIP</p>
          <div style={{ width: 48, height: 1, background: '#000', marginBottom: 40 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 40 }}>
            {cms.team.map((m: { name: string; role: string; initials: string; photo?: string }) => (
              <div key={m.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', marginBottom: 16, background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 300, color: '#999', flexShrink: 0 }}>
                  {m.photo
                    ? <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : m.initials
                  }
                </div>
                <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{m.name}</p>
                <p style={{ fontSize: 11, color: '#888' }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
