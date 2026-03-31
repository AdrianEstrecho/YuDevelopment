import Link from 'next/link'
import { getCMS } from '@/lib/cms'
import DepartmentsSection from '@/components/DepartmentsSection'
import CompaniesCarousel from '@/components/CompaniesCarousel'
import ScrollRevealText from '@/components/ScrollRevealText'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const cms = await getCMS()


  return (
    <>
      {/* ── HERO ── */}
      <section id="hero" style={{ position: 'relative', height: '100vh', minHeight: 600, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, background: cms.hero.image ? `url(${cms.hero.image}) center/cover no-repeat` : 'linear-gradient(160deg,#4a5568 0%,#2d3748 20%,#1a202c 45%,#2c3e50 70%,#0f1923 100%)' }}>
          {/* building silhouettes */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            {[...Array(14)].map((_, i) => (
              <div key={i} style={{ position: 'absolute', left: `${i * 7}%`, top: 0, width: '5%', height: `${50 + Math.sin(i * 1.3) * 25}%`, background: 'rgba(200,210,220,0.4)', borderRight: '1px solid rgba(255,255,255,0.05)' }} />
            ))}
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(100,140,180,0.25) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, padding: '0 48px 56px', maxWidth: 700 }}>
          <p style={{ color: '#fff', fontSize: 'clamp(28px, 5vw, 80px)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.05em', fontFamily: 'Owners, sans-serif', marginBottom: 12 }}>
            {cms.hero.headline.split('\n').map((line: string, i: number) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <Link href="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none', marginTop: 24, letterSpacing: '0.06em' }}>
            ↓ {cms.hero.scrollLabel}
          </Link>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section id="who-we-are" style={{ position: 'relative', background: '#2d2d2d', padding: '100px 64px' }}>
        {/* corner brackets */}
        {['top:24px;left:24px;border-top:1px;border-left:1px','top:24px;right:24px;border-top:1px;border-right:1px','bottom:24px;left:24px;border-bottom:1px;border-left:1px','bottom:24px;right:24px;border-bottom:1px;border-right:1px'].map((s, i) => {
          const pos: Record<string, string> = {}
          s.split(';').forEach(p => { const [k, v] = p.split(':'); if (k && v) pos[k] = v })
          return <div key={i} style={{ position: 'absolute', width: 20, height: 20, ...Object.fromEntries(Object.entries(pos).map(([k, v]) => [k, v.replace('px','') === v ? v : `${v}px`])), borderColor: 'rgba(255,255,255,0.15)', borderStyle: 'solid', borderWidth: 0, borderTopWidth: pos['border-top'] ? 1 : 0, borderRightWidth: pos['border-right'] ? 1 : 0, borderBottomWidth: pos['border-bottom'] ? 1 : 0, borderLeftWidth: pos['border-left'] ? 1 : 0 }} />
        })}
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <ScrollRevealText paragraphs={[cms.whoWeAre.paragraph1, cms.whoWeAre.paragraph2]} />
          <Link href={cms.whoWeAre.ctaHref} style={{ display: 'inline-block', border: '1px solid #fff', color: '#fff', fontSize: 11, letterSpacing: '0.1em', padding: '12px 24px', textDecoration: 'none', transition: 'background 0.2s' }}>
            {cms.whoWeAre.ctaLabel}
          </Link>
        </div>
      </section>

      {/* ── OUR COMPANIES ── */}
      <section id="companies" style={{ background: '#faf9f6', padding: '80px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>OUR COMPANIES</p>
          <div style={{ width: 48, height: 1, background: '#000', marginBottom: 20 }} />
          <p style={{ fontSize: 13, color: '#777', maxWidth: 520, lineHeight: 1.7, marginBottom: 48 }}>
            We don&apos;t wait for the future to arrive. We architect it, engineer it, and bring it to market.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {cms.companies.map((c: { id: string; name: string; logo: string; logoColor: string; logoImage?: string; description: string }) => (
              <div key={c.id} className="company-card" style={{ border: '1px solid #e5e5e5', background: '#fff', padding: '32px', transition: 'box-shadow 0.25s, transform 0.25s, border-color 0.25s' }}>
                <div style={{ marginBottom: 24, height: 60, display: 'flex', alignItems: 'center' }}>
                  {c.logoImage ? (
                    <img src={c.logoImage} alt={c.name} style={{ maxHeight: 60, maxWidth: 180, objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: c.logo.length > 5 ? 16 : 28, fontWeight: 900, letterSpacing: c.logo.length > 5 ? '0.08em' : '0.02em', color: c.logoColor }}>
                      {c.logo}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{c.name}</p>
                  <div style={{ flex: 1, height: 1, background: '#ddd' }} />
                </div>
                <p style={{ fontSize: 12, color: '#777', lineHeight: 1.75 }}>{c.description}</p>
              </div>
            ))}
          </div>
          <style>{`.company-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.10); transform: translateY(-4px); border-color: #bbb !important; }`}</style>
        </div>
      </section>

      {/* ── COMPANIES CAROUSEL ── */}
      <div id="projects">
        <CompaniesCarousel projects={cms.projects} />
      </div>

      {/* ── DEPARTMENTS ── */}
      <div id="departments">
        <DepartmentsSection departments={cms.departments} />
      </div>

      {/* ── VISION + PILLARS ── */}
      <section id="vision" style={{ background: '#252b34', padding: '80px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Vision */}
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: 6 }}>
            {cms.vision.sectionLabel}
          </p>
          <div style={{ width: 48, height: 1, background: '#666', marginBottom: 20 }} />
          <p style={{ fontSize: 13, color: '#aaa', maxWidth: 440, lineHeight: 1.75, marginBottom: 60 }}>{cms.vision.text}</p>

          {/* Quote */}
          <div style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 60 }}>
            <p style={{ fontSize: 22, color: '#fff', fontStyle: 'italic', fontWeight: 300, maxWidth: 520, margin: '0 auto 16px' }}>
              &ldquo;{cms.vision.quote}&rdquo;
            </p>
            <p style={{ fontSize: 10, color: '#666', letterSpacing: '0.25em', textTransform: 'uppercase' }}>— {cms.vision.quoteAuthor}</p>
          </div>

          {/* Pillars */}
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', marginBottom: 6,}}>OUR PILLARS</p>
          <div style={{ width: 48, height: 1, background: '#666', marginBottom: 32, }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginLeft: 50, marginRight: 50  }}>
            {cms.pillars.map((p: { num: string; icon: string; title: string; description: string }) => (
              <div key={p.num} className="pillar-card" style={{ position: 'relative', padding: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', transition: 'all 0.5s', display: 'flex', flexDirection: 'column' }}>
                {/* gradient overlay */}
                <div className="pillar-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.05), transparent)', opacity: 0, transition: 'opacity 0.5s', pointerEvents: 'none' }} />
                {/* content */}
                <div style={{ position: 'relative', zIndex: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div className="pillar-icon" style={{ borderRadius: 12, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.26)', transition: 'transform 0.2s', display: 'inline-flex' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, filter: 'brightness(0) invert(1)' }}>{p.icon}</div>
                    </div>
                    <span style={{ fontSize: 44, fontWeight: 700, color: 'rgba(255,255,255,0.05)', lineHeight: 1 }}>{p.num}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 400, color: '#fff', marginBottom: 10, letterSpacing: '-0.025em' }}>{p.title}</h3>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.4)', maxWidth: 240, marginBottom: 12 }} />
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontWeight: 300 }}>{p.description}</p>
                </div>
                {/* corner glow */}
                <div className="pillar-corner" style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, opacity: 0, transition: 'opacity 0.5s', pointerEvents: 'none' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', background: 'linear-gradient(225deg, rgba(255,255,255,0.4), transparent)', filter: 'blur(20px)' }} />
                </div>
              </div>
            ))}
          </div>
          <style>{`
            .pillar-card:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.2) !important; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
            .pillar-card:hover .pillar-overlay { opacity: 1 !important; }
            .pillar-card:hover .pillar-corner { opacity: 0.1 !important; }
            .pillar-card:hover .pillar-icon { transform: scale(1.05); }
          `}</style>
        </div>
      </section>

      {/* ── JOIN OUR TEAM ── */}
      <section id="careers" style={{ background: '#000', minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 32px' }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, marginBottom: 20 }}>Join Our Team</h2>
          <p style={{ color: '#888', fontSize: 13, maxWidth: 420, margin: '0 auto 36px', lineHeight: 1.8 }}>
            Great companies are built by great people. We are looking for teammates who want meaningful work, real responsibility, and a place where their ideas matter.
          </p>
          <Link href="/careers" style={{ color: '#fff', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 2 }}>
            View open positions
          </Link>
        </div>
      </section>
    </>
  )
}
