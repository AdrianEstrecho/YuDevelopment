import { getCMS } from '@/lib/cms'
export const dynamic = 'force-dynamic'

export default async function CompaniesPage() {
  const cms = await getCMS()
  return (
    <>
      <section style={{ background: '#000', paddingTop: 56, minHeight: '45vh', display: 'flex', alignItems: 'flex-end', padding: '56px 64px 64px' }}>
        <h1 style={{ color: '#fff', fontSize: 'clamp(36px,5vw,56px)', fontWeight: 300 }}>Our Companies</h1>
      </section>

      <section style={{ background: '#faf9f6', padding: '80px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>OUR COMPANIES</p>
          <div style={{ width: 48, height: 1, background: '#000', marginBottom: 20 }} />
          <p style={{ fontSize: 13, color: '#777', maxWidth: 520, lineHeight: 1.75, marginBottom: 56 }}>
            We don&apos;t wait for the future to arrive. We architect it, engineer it, and bring it to market. Every company in our portfolio is a testament to our belief that bold vision, paired with flawless execution, creates category-defining businesses.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {cms.companies.map((c: { id: string; name: string; logo: string; logoColor: string; logoImage?: string; description: string }) => (
              <div key={c.id} className="company-card" style={{ border: '1px solid #e5e5e5', background: '#fff', padding: 32, transition: 'box-shadow 0.25s, transform 0.25s, border-color 0.25s' }}>
                <div style={{ height: 60, display: 'flex', alignItems: 'center', marginBottom: 24 }}>
                  {c.logoImage ? (
                    <img src={c.logoImage} alt={c.name} style={{ maxHeight: 60, maxWidth: 180, objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: c.logo.length > 5 ? 16 : 28, fontWeight: 900, letterSpacing: c.logo.length > 5 ? '0.08em' : '0.02em', color: c.logoColor }}>
                      {c.logo}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{c.name}</p>
                  <div style={{ flex: 1, height: 1, background: '#ddd' }} />
                </div>
                <p style={{ fontSize: 12, color: '#777', lineHeight: 1.75 }}>{c.description}</p>
              </div>
            ))}
          </div>
          <style>{`.company-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.10); transform: translateY(-4px); border-color: #bbb !important; }`}</style>
        </div>
      </section>
    </>
  )
}
