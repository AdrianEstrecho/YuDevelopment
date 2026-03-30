'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────
type NavLink    = { label: string; href: string }
type Company    = { id: string; name: string; logo: string; logoColor: string; logoImage: string; link: string; description: string }
type Pillar     = { num: string; icon: string; title: string; description: string }
type Department = { id: string; icon: string; label: string; title: string; description: string }
type TeamMember = { name: string; role: string; initials: string; photo: string }
type Project    = { id: string; title: string; date: string; excerpt: string; bgColor: string; image: string }
type WhyJoin    = { num: string; icon: string; title: string; description: string }
type Role       = { id: string; title: string; department: string; type: string; location: string; applyLink: string; description: string; requirements: string[] }

type CMS = {
  site:        { name: string; tagline: string }
  nav:         { links: NavLink[]; cta: { label: string; href: string } }
  hero:        { headline: string; scrollLabel: string; image: string }
  whoWeAre:    { paragraph1: string; paragraph2: string; ctaLabel: string; ctaHref: string }
  companies:   Company[]
  vision:      { sectionLabel: string; text: string; quote: string; quoteAuthor: string }
  pillars:     Pillar[]
  departments: Department[]
  team:        TeamMember[]
  projects:    Project[]
  footer:      { address: string; phone: string; email: string; copyright: string }
  careers:     { headline: string; description: string; whyJoin: WhyJoin[]; roles: Role[] }
}

type Tab = 'nav' | 'hero' | 'whoWeAre' | 'companies' | 'vision' | 'pillars' | 'departments' | 'team' | 'projects' | 'careers' | 'footer' | 'site'

const TAB_SECTIONS: Record<Tab, string> = {
  nav: 'hero', hero: 'hero', whoWeAre: 'who-we-are', companies: 'companies',
  vision: 'vision', pillars: 'vision', departments: 'departments', team: 'hero',
  projects: 'projects', careers: 'careers', footer: 'footer', site: 'hero',
}

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'nav',         icon: '🔗', label: 'Navigation' },
  { id: 'hero',        icon: '🏠', label: 'Hero' },
  { id: 'whoWeAre',   icon: '📖', label: 'Who We Are' },
  { id: 'companies',   icon: '🏢', label: 'Companies' },
  { id: 'vision',      icon: '🔭', label: 'Vision' },
  { id: 'pillars',     icon: '🏛️', label: 'Pillars' },
  { id: 'departments', icon: '⚙️', label: 'Departments' },
  { id: 'team',        icon: '👥', label: 'Team' },
  { id: 'projects',    icon: '🗂️', label: 'Projects' },
  { id: 'careers',     icon: '💼', label: 'Careers' },
  { id: 'footer',      icon: '📌', label: 'Footer' },
  { id: 'site',        icon: '🔧', label: 'Site Settings' },
]

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CMSPage() {
  const [tab,    setTab]    = useState<Tab>('nav')
  const [cms,    setCms]    = useState<CMS | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'saved' | 'error'>('loading')
  const [authed, setAuthed]           = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [panelWidth, setPanelWidth]   = useState(520)
  const dragging                      = useRef(false)
  const iframeRef                     = useRef<HTMLIFrameElement>(null)
  const router = useRouter()

  // ── Drag to resize ──
  const startDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    dragging.current = true
    if (iframeRef.current) iframeRef.current.style.pointerEvents = 'none'
    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return
      const w = window.innerWidth - ev.clientX
      setPanelWidth(Math.max(360, Math.min(w, window.innerWidth - 200)))
    }
    const onUp = () => {
      dragging.current = false
      if (iframeRef.current) iframeRef.current.style.pointerEvents = 'auto'
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  useEffect(() => {
    fetch('/api/auth')
      .then(r => {
        if (!r.ok) { router.replace('/admin/login'); return }
        setAuthed(true)
        return fetch('/api/cms')
      })
      .then(r => { if (r && !r.ok) throw new Error(); return r?.json() })
      .then(d  => { if (d) { setCms(d); setStatus('idle') } })
      .catch(() => setStatus('error'))
  }, [router])

  const save = useCallback(async () => {
    if (!cms) return
    setStatus('saving')
    try {
      const r = await fetch('/api/cms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cms) })
      if (!r.ok) throw new Error()
      setStatus('saved')
      if (iframeRef.current) iframeRef.current.contentWindow?.location.reload()
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }, [cms])

  // ── Helpers
  const set = (section: keyof CMS, field: string, value: string) =>
    setCms(p => p ? { ...p, [section]: { ...(p[section] as object), [field]: value } } : p)

  const setArr = (key: keyof CMS, i: number, field: string, value: string) =>
    setCms(p => {
      if (!p) return p
      const arr = [...(p[key] as Record<string, string>[])]
      arr[i] = { ...arr[i], [field]: value }
      return { ...p, [key]: arr }
    })

  const removeArr = (key: keyof CMS, i: number) =>
    setCms(p => { if (!p) return p; const arr = [...(p[key] as unknown[])]; arr.splice(i, 1); return { ...p, [key]: arr } })

  const addArr = (key: keyof CMS, item: object) =>
    setCms(p => p ? { ...p, [key]: [...(p[key] as unknown[]), item] } : p)

  // Role-specific helpers (nested inside careers)
  const setRole = (i: number, field: string, value: string) =>
    setCms(p => {
      if (!p) return p
      const roles = [...p.careers.roles]
      roles[i] = { ...roles[i], [field]: value }
      return { ...p, careers: { ...p.careers, roles } }
    })

  const setRoleReq = (ri: number, qi: number, value: string) =>
    setCms(p => {
      if (!p) return p
      const roles = [...p.careers.roles]
      const reqs = [...roles[ri].requirements]
      reqs[qi] = value
      roles[ri] = { ...roles[ri], requirements: reqs }
      return { ...p, careers: { ...p.careers, roles } }
    })

  const addRoleReq = (ri: number) =>
    setCms(p => {
      if (!p) return p
      const roles = [...p.careers.roles]
      roles[ri] = { ...roles[ri], requirements: [...roles[ri].requirements, ''] }
      return { ...p, careers: { ...p.careers, roles } }
    })

  const removeRoleReq = (ri: number, qi: number) =>
    setCms(p => {
      if (!p) return p
      const roles = [...p.careers.roles]
      const reqs = [...roles[ri].requirements]
      reqs.splice(qi, 1)
      roles[ri] = { ...roles[ri], requirements: reqs }
      return { ...p, careers: { ...p.careers, roles } }
    })

  const removeRole = (i: number) =>
    setCms(p => {
      if (!p) return p
      const roles = [...p.careers.roles]; roles.splice(i, 1)
      return { ...p, careers: { ...p.careers, roles } }
    })

  const setWhyJoin = (i: number, field: string, value: string) =>
    setCms(p => {
      if (!p) return p
      const whyJoin = [...p.careers.whyJoin]
      whyJoin[i] = { ...whyJoin[i], [field]: value }
      return { ...p, careers: { ...p.careers, whyJoin } }
    })

  const setNavLink = (i: number, field: string, value: string) =>
    setCms(p => {
      if (!p) return p
      const links = [...p.nav.links]
      links[i] = { ...links[i], [field]: value }
      return { ...p, nav: { ...p.nav, links } }
    })

  const removeNavLink = (i: number) =>
    setCms(p => {
      if (!p) return p
      const links = [...p.nav.links]; links.splice(i, 1)
      return { ...p, nav: { ...p.nav, links } }
    })

  const addNavLink = () =>
    setCms(p => p ? { ...p, nav: { ...p.nav, links: [...p.nav.links, { label: 'New Link', href: '/' }] } } : p)

  // ── States
  if (!authed || status === 'loading') return <div style={S.fullCenter}><p style={{ color: '#555' }}>Loading…</p></div>
  if (!cms) return <div style={S.fullCenter}><p style={{ color: '#e55', maxWidth: 380, textAlign: 'center', lineHeight: 1.7 }}>Failed to load. Make sure the dev server is running and <code>lib/cms-data.json</code> exists.</p></div>

  const saveSaving = status === 'saving'
  const saveSaved  = status === 'saved'
  const saveError  = status === 'error'

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13 }}>

      {/* ── LIVE SITE PREVIEW ── */}
      <iframe ref={iframeRef} src="/" style={{ flex: 1, border: 'none', height: '100%' }} />

      {/* ── DRAG HANDLE ── */}
      <div
        onMouseDown={startDrag}
        style={{ width: 5, cursor: 'col-resize', background: '#1e1e1e', flexShrink: 0, transition: 'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.background = '#3ecf8e')}
        onMouseLeave={e => { if (!dragging.current) e.currentTarget.style.background = '#1e1e1e' }}
      />

      {/* ── EDITOR PANEL ── */}
      <div style={{ width: panelWidth, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#0a0a0a', height: '100%' }}>

        {/* Top bar */}
        <div style={{ background: '#0f0f0f', borderBottom: '1px solid #1e1e1e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 48, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em' }}>YGCCC</span>
            <span style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#666', fontSize: 9, padding: '2px 8px', borderRadius: 20, letterSpacing: '0.1em' }}>ADMIN</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {saveSaved  && <span style={{ color: '#3ecf8e', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3ecf8e', display: 'inline-block' }} />Saved!</span>}
            {saveError  && <span style={{ color: '#e55', fontSize: 11 }}>✗ Failed</span>}
            {saveSaving && <span style={{ color: '#aaa', fontSize: 11 }}>Saving…</span>}
            <button onClick={save} disabled={saveSaving} style={{ padding: '6px 16px', borderRadius: 4, border: 'none', cursor: saveSaving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, transition: 'background 0.2s', background: saveSaved ? '#3ecf8e' : saveSaving ? '#333' : '#fff', color: saveSaved ? '#000' : saveSaving ? '#666' : '#000' }}>
              {saveSaving ? 'Saving…' : saveSaved ? '✓ Saved' : 'Save'}
            </button>
            {/* Profile */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setShowProfile(p => !p)} style={{ width: 30, height: 30, borderRadius: '50%', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#888', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                A
              </button>
              {showProfile && (
                <>
                  <div onClick={() => setShowProfile(false)} style={{ position: 'fixed', inset: 0, zIndex: 90 }} />
                  <div style={{ position: 'absolute', top: 38, right: 0, zIndex: 100, background: '#161616', border: '1px solid #2a2a2a', borderRadius: 6, minWidth: 170, padding: '6px 0', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
                    <a href="/" target="_blank" rel="noreferrer" onClick={() => setShowProfile(false)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', color: '#aaa', fontSize: 12, textDecoration: 'none', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = '#1e1e1e')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ fontSize: 13 }}>↗</span> View Website
                    </a>
                    <div style={{ height: 1, background: '#2a2a2a', margin: '3px 0' }} />
                    <button onClick={() => { setShowProfile(false); fetch('/api/auth', { method: 'DELETE' }).then(() => router.replace('/admin/login')) }} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 14px', color: '#c44', fontSize: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'background 0.15s' }} onMouseEnter={e => (e.currentTarget.style.background = '#1e1e1e')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span style={{ fontSize: 13 }}>⏻</span> Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Horizontal tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, borderBottom: '1px solid #1e1e1e', background: '#0f0f0f', flexShrink: 0, overflowX: 'auto' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); try { iframeRef.current?.contentWindow?.document.getElementById(TAB_SECTIONS[t.id])?.scrollIntoView({ behavior: 'smooth' }) } catch {} }} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '9px 12px', background: 'transparent', border: 'none', borderBottom: tab === t.id ? '2px solid #fff' : '2px solid transparent', color: tab === t.id ? '#fff' : '#555', cursor: 'pointer', fontSize: 11, fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'color 0.15s' }}>
              <span style={{ fontSize: 12 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Scrollable editor content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px 24px' }}>

        {/* ── NAVIGATION ── */}
        {tab === 'nav' && (
          <Sec title="Navigation" desc="Navbar links and the CTA button (Join Our Team).">
            <p style={{ color: '#555', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Nav Links</p>
            {cms.nav.links.map((l, i) => (
              <Crd key={i} label={`Link ${i + 1}`} onRemove={() => removeNavLink(i)}>
                <TwoCol>
                  <F label="Label"><In value={l.label} onChange={v => setNavLink(i, 'label', v)} /></F>
                  <F label="URL / Anchor (e.g. /people or #who-we-are)"><In value={l.href} onChange={v => setNavLink(i, 'href', v)} /></F>
                </TwoCol>
              </Crd>
            ))}
            <AddBtn onClick={addNavLink}>+ Add Nav Link</AddBtn>
            <Divider />
            <p style={{ color: '#555', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>CTA Button</p>
            <TwoCol>
              <F label="Button Label"><In value={cms.nav.cta.label} onChange={v => setCms(p => p ? { ...p, nav: { ...p.nav, cta: { ...p.nav.cta, label: v } } } : p)} /></F>
              <F label="Button Link"><In value={cms.nav.cta.href} onChange={v => setCms(p => p ? { ...p, nav: { ...p.nav, cta: { ...p.nav.cta, href: v } } } : p)} /></F>
            </TwoCol>
          </Sec>
        )}

        {/* ── HERO ── */}
        {tab === 'hero' && (
          <Sec title="Hero" desc="Full-screen opening section headline and scroll label.">
            <F label="Cover Image">
              <ImgUpload value={cms.hero.image ?? ''} onChange={v => set('hero', 'image', v)} />
            </F>
            <F label="Headline (use \n for a line break)">
              <Ta value={cms.hero.headline} rows={3} onChange={v => set('hero', 'headline', v)} />
            </F>
            <F label="Scroll CTA Label">
              <In value={cms.hero.scrollLabel} onChange={v => set('hero', 'scrollLabel', v)} />
            </F>
          </Sec>
        )}

        {/* ── WHO WE ARE ── */}
        {tab === 'whoWeAre' && (
          <Sec title="Who We Are" desc="Dark section below the hero with scroll-reveal text.">
            <F label="Paragraph 1 (large animated text)">
              <Ta value={cms.whoWeAre.paragraph1} onChange={v => set('whoWeAre', 'paragraph1', v)} />
            </F>
            <F label="Paragraph 2">
              <Ta value={cms.whoWeAre.paragraph2} onChange={v => set('whoWeAre', 'paragraph2', v)} />
            </F>
            <TwoCol>
              <F label="CTA Button Label"><In value={cms.whoWeAre.ctaLabel} onChange={v => set('whoWeAre', 'ctaLabel', v)} /></F>
              <F label="CTA Button Link"><In value={cms.whoWeAre.ctaHref} onChange={v => set('whoWeAre', 'ctaHref', v)} /></F>
            </TwoCol>
          </Sec>
        )}

        {/* ── COMPANIES ── */}
        {tab === 'companies' && (
          <Sec title="Companies" desc="Portfolio company cards shown on homepage.">
            {cms.companies.map((c, i) => (
              <Crd key={c.id} label={`Company ${i + 1} — ${c.name}`} onRemove={() => removeArr('companies', i)}>

                {/* ── Company Info ── */}
                <TwoCol>
                  <F label="Name"><In value={c.name} onChange={v => setArr('companies', i, 'name', v)} /></F>
                  <F label="Website URL"><In value={c.link ?? ''} onChange={v => setArr('companies', i, 'link', v)} /></F>
                </TwoCol>
                <F label="Logo Image">
                  <ImgUpload value={c.logoImage ?? ''} onChange={v => setArr('companies', i, 'logoImage', v)} />
                </F>
                <p style={{ fontSize: 10, color: '#333', marginTop: -10, marginBottom: 14, letterSpacing: '0.05em' }}>Fallback shown if no image is uploaded</p>
                <TwoCol>
                  <F label="Logo Text"><In value={c.logo} onChange={v => setArr('companies', i, 'logo', v)} /></F>
                  <F label="Logo Color">
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <input type="color" value={c.logoColor} onChange={e => setArr('companies', i, 'logoColor', e.target.value)} style={{ width: 40, height: 38, border: '1px solid #222', borderRadius: 4, background: '#161616', cursor: 'pointer', padding: 2 }} />
                      <In value={c.logoColor} onChange={v => setArr('companies', i, 'logoColor', v)} />
                    </div>
                  </F>
                </TwoCol>
                <F label="Description"><Ta value={c.description} onChange={v => setArr('companies', i, 'description', v)} /></F>

              </Crd>
            ))}
            <AddBtn onClick={() => addArr('companies', { id: `co-${Date.now()}`, name: 'New Company', logo: 'NEW', logoColor: '#111111', logoImage: '', link: '', description: 'Description here.' })}>
              + Add Company
            </AddBtn>
          </Sec>
        )}

        {/* ── VISION ── */}
        {tab === 'vision' && (
          <Sec title="Vision & Quote" desc="Vision text and pull-quote in the dark section.">
            <F label="Section Label"><In value={cms.vision.sectionLabel} onChange={v => set('vision', 'sectionLabel', v)} /></F>
            <F label="Vision Paragraph"><Ta value={cms.vision.text} onChange={v => set('vision', 'text', v)} /></F>
            <TwoCol>
              <F label="Pull Quote"><In value={cms.vision.quote} onChange={v => set('vision', 'quote', v)} /></F>
              <F label="Quote Author"><In value={cms.vision.quoteAuthor} onChange={v => set('vision', 'quoteAuthor', v)} /></F>
            </TwoCol>
            <div style={{ marginTop: 24, background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: 28, textAlign: 'center' }}>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#333', marginBottom: 16 }}>PREVIEW</p>
              <p style={{ color: '#fff', fontSize: 17, fontStyle: 'italic', fontWeight: 300, marginBottom: 10 }}>&ldquo;{cms.vision.quote}&rdquo;</p>
              <p style={{ color: '#555', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' }}>— {cms.vision.quoteAuthor}</p>
            </div>
          </Sec>
        )}

        {/* ── PILLARS ── */}
        {tab === 'pillars' && (
          <Sec title="Our Pillars" desc="Company values shown on the homepage.">
            {cms.pillars.map((p, i) => (
              <Crd key={p.num} label={`Pillar ${p.num} — ${p.title}`}>
                <TwoCol>
                  <F label="Title"><In value={p.title} onChange={v => setArr('pillars', i, 'title', v)} /></F>
                  <F label="Icon / Emoji"><In value={p.icon} onChange={v => setArr('pillars', i, 'icon', v)} /></F>
                </TwoCol>
                <F label="Description"><Ta value={p.description} onChange={v => setArr('pillars', i, 'description', v)} /></F>
              </Crd>
            ))}
          </Sec>
        )}

        {/* ── DEPARTMENTS ── */}
        {tab === 'departments' && (
          <Sec title="Departments" desc="Interactive tabbed section on homepage.">
            {cms.departments.map((d, i) => (
              <Crd key={d.id} label={d.label}>
                <TwoCol>
                  <F label="Tab Label"><In value={d.label} onChange={v => setArr('departments', i, 'label', v)} /></F>
                  <F label="Icon"><In value={d.icon} onChange={v => setArr('departments', i, 'icon', v)} /></F>
                </TwoCol>
                <F label="Panel Title"><In value={d.title} onChange={v => setArr('departments', i, 'title', v)} /></F>
                <F label="Description"><Ta value={d.description} onChange={v => setArr('departments', i, 'description', v)} /></F>
              </Crd>
            ))}
          </Sec>
        )}

        {/* ── TEAM ── */}
        {tab === 'team' && (
          <Sec title="Team Members" desc="Leadership shown on /people.">
            {cms.team.map((m, i) => (
              <Crd key={i} label={`Member ${i + 1} — ${m.name}`} onRemove={() => removeArr('team', i)}>
                <TwoCol>
                  <F label="Full Name">
                    <In value={m.name} onChange={v => { setArr('team', i, 'name', v); setArr('team', i, 'initials', v.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase()) }} />
                  </F>
                  <F label="Role / Title"><In value={m.role} onChange={v => setArr('team', i, 'role', v)} /></F>
                </TwoCol>
                <F label="Photo">
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: '#1a1a1a', border: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#444' }}>
                      {m.photo ? <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : m.initials}
                    </div>
                    <div style={{ flex: 1 }}>
                      <ImgUpload value={m.photo ?? ''} onChange={v => setArr('team', i, 'photo', v)} />
                    </div>
                  </div>
                </F>
              </Crd>
            ))}
            <AddBtn onClick={() => addArr('team', { name: 'New Member', role: 'Title', initials: 'NM', photo: '' })}>+ Add Team Member</AddBtn>
          </Sec>
        )}

        {/* ── PROJECTS ── */}
        {tab === 'projects' && (
          <Sec title="Featured Projects" desc="Image carousel on the homepage.">
            {cms.projects.map((p, i) => (
              <Crd key={p.id} label={`Project ${i + 1}`} onRemove={() => removeArr('projects', i)}>
                <F label="Title"><In value={p.title} onChange={v => setArr('projects', i, 'title', v)} /></F>
                <F label="Background Image">
                  <ImgUpload value={p.image ?? ''} onChange={v => setArr('projects', i, 'image', v)} />
                </F>
                <TwoCol>
                  <F label="Date"><In value={p.date} onChange={v => setArr('projects', i, 'date', v)} /></F>
                  <F label="Background Color (fallback)">
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <input type="color" value={p.bgColor} onChange={e => setArr('projects', i, 'bgColor', e.target.value)} style={{ width: 40, height: 38, border: '1px solid #222', borderRadius: 4, background: '#161616', cursor: 'pointer', padding: 2 }} />
                      <In value={p.bgColor} onChange={v => setArr('projects', i, 'bgColor', v)} />
                    </div>
                  </F>
                </TwoCol>
                <F label="Excerpt"><Ta value={p.excerpt} onChange={v => setArr('projects', i, 'excerpt', v)} /></F>
              </Crd>
            ))}
            <AddBtn onClick={() => addArr('projects', { id: `p-${Date.now()}`, title: 'New Project', date: 'January 2026', excerpt: 'Project description.', bgColor: '#4a5a6a', image: '' })}>+ Add Project</AddBtn>
          </Sec>
        )}

        {/* ── CAREERS ── */}
        {tab === 'careers' && (
          <Sec title="Careers Page" desc="Hero text, why-join cards, and open role listings.">
            <F label="Page Headline"><In value={cms.careers.headline} onChange={v => set('careers', 'headline', v)} /></F>
            <F label="Page Description"><Ta value={cms.careers.description} onChange={v => set('careers', 'description', v)} /></F>

            <Divider label="Why Join Cards" />
            {cms.careers.whyJoin.map((w, i) => (
              <Crd key={w.num} label={`Card ${w.num} — ${w.title}`}>
                <TwoCol>
                  <F label="Title"><In value={w.title} onChange={v => setWhyJoin(i, 'title', v)} /></F>
                  <F label="Icon / Emoji"><In value={w.icon} onChange={v => setWhyJoin(i, 'icon', v)} /></F>
                </TwoCol>
                <F label="Description"><Ta value={w.description} rows={3} onChange={v => setWhyJoin(i, 'description', v)} /></F>
              </Crd>
            ))}

            <Divider label="Open Roles" />
            {cms.careers.roles.map((r, i) => (
              <Crd key={r.id} label={`Role ${i + 1} — ${r.title}`} onRemove={() => removeRole(i)}>
                <TwoCol>
                  <F label="Job Title"><In value={r.title} onChange={v => setRole(i, 'title', v)} /></F>
                  <F label="Department"><In value={r.department} onChange={v => setRole(i, 'department', v)} /></F>
                </TwoCol>
                <TwoCol>
                  <F label="Type (e.g. Full-Time)"><In value={r.type} onChange={v => setRole(i, 'type', v)} /></F>
                  <F label="Location"><In value={r.location} onChange={v => setRole(i, 'location', v)} /></F>
                </TwoCol>
                <F label="Apply Now Link (URL or mailto:)"><In value={r.applyLink ?? ''} onChange={v => setRole(i, 'applyLink', v)} /></F>
                <F label="Description"><Ta value={r.description ?? ''} rows={3} onChange={v => setRole(i, 'description', v)} /></F>
                <F label="Requirements">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {r.requirements.map((req, qi) => (
                      <div key={qi} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input
                          value={req}
                          onChange={e => setRoleReq(i, qi, e.target.value)}
                          style={{ ...S.input, flex: 1 }}
                          onFocus={e  => (e.target.style.borderColor = '#444')}
                          onBlur={e   => (e.target.style.borderColor = '#242424')}
                          placeholder={`Requirement ${qi + 1}`}
                        />
                        <button onClick={() => removeRoleReq(i, qi)} style={{ background: 'none', border: '1px solid #2a2a2a', color: '#c44', cursor: 'pointer', fontSize: 12, padding: '8px 10px', borderRadius: 4, flexShrink: 0 }}>✕</button>
                      </div>
                    ))}
                    <button onClick={() => addRoleReq(i)} style={{ background: 'transparent', border: '1px dashed #252525', borderRadius: 4, color: '#444', fontSize: 12, padding: '8px', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', textAlign: 'left' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#252525'; e.currentTarget.style.color = '#444' }}
                    >
                      + Add Requirement
                    </button>
                  </div>
                </F>
              </Crd>
            ))}
            <AddBtn onClick={() => setCms(p => {
              if (!p) return p
              const newRole: Role = { id: `r-${Date.now()}`, title: 'New Role', department: 'Operations', type: 'Full-Time', location: 'Atlanta, GA', applyLink: '', description: '', requirements: [] }
              return { ...p, careers: { ...p.careers, roles: [...p.careers.roles, newRole] } }
            })}>+ Add Role</AddBtn>
          </Sec>
        )}

        {/* ── FOOTER ── */}
        {tab === 'footer' && (
          <Sec title="Footer" desc="Contact details and copyright line.">
            <F label="Address"><In value={cms.footer.address} onChange={v => set('footer', 'address', v)} /></F>
            <TwoCol>
              <F label="Phone"><In value={cms.footer.phone} onChange={v => set('footer', 'phone', v)} /></F>
              <F label="Email"><In value={cms.footer.email} onChange={v => set('footer', 'email', v)} /></F>
            </TwoCol>
            <F label="Copyright Line"><In value={cms.footer.copyright} onChange={v => set('footer', 'copyright', v)} /></F>
          </Sec>
        )}

        {/* ── SITE SETTINGS ── */}
        {tab === 'site' && (
          <Sec title="Site Settings" desc="Global site identity.">
            <F label="Site Name"><In value={cms.site.name} onChange={v => set('site', 'name', v)} /></F>
            <F label="Tagline"><In value={cms.site.tagline} onChange={v => set('site', 'tagline', v)} /></F>
            <Divider />
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: 22 }}>
              <p style={{ color: '#3ecf8e', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 16 }}>⚡ CMS → SITE FLOW</p>
              {([
                ['Edit any field',       'Changes held in memory until you save'],
                ['Click Save & Publish', 'POSTs to /api/cms → writes lib/cms-data.json'],
                ['Pages re-read file',   'force-dynamic means fresh data on every request'],
                ['No rebuild needed',    'Works instantly on local dev + Node.js hosts'],
                ['Vercel / Netlify',     'Filesystem is read-only → swap to Supabase or Sanity'],
              ] as [string, string][]).map(([s, d]) => (
                <div key={s} style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                  <span style={{ color: '#3ecf8e', fontSize: 11, fontWeight: 600, minWidth: 170, flexShrink: 0 }}>{s}</span>
                  <span style={{ color: '#444', fontSize: 11, lineHeight: 1.6 }}>{d}</span>
                </div>
              ))}
            </div>
          </Sec>
        )}

      </div>
      </div>
    </div>
  )
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const S = {
  fullCenter: { background: '#0a0a0a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' } as React.CSSProperties,
  input: { width: '100%', background: '#161616', border: '1px solid #242424', borderRadius: 4, color: '#e0e0e0', fontFamily: 'inherit', fontSize: 13, padding: '9px 12px', outline: 'none', boxSizing: 'border-box' } as React.CSSProperties,
}

// ─── UI Components ────────────────────────────────────────────────────────────
function Sec({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 300, marginBottom: 6 }}>{title}</h2>
      <p style={{ color: '#444', fontSize: 12, marginBottom: 30, lineHeight: 1.5 }}>{desc}</p>
      {children}
    </div>
  )
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: 7 }}>{label}</label>
      {children}
    </div>
  )
}

function In({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} style={S.input}
      onFocus={e => (e.target.style.borderColor = '#444')}
      onBlur={e  => (e.target.style.borderColor = '#242424')}
    />
  )
}

function Ta({ value, onChange, rows = 4 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea value={value} rows={rows} onChange={e => onChange(e.target.value)} style={{ ...S.input, resize: 'vertical' }}
      onFocus={e => (e.target.style.borderColor = '#444')}
      onBlur={e  => (e.target.style.borderColor = '#242424')}
    />
  )
}

function Crd({ label, children, onRemove }: { label: string; children: React.ReactNode; onRemove?: () => void }) {
  return (
    <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 6, padding: 18, marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#333' }}>{label}</span>
        {onRemove && <button onClick={onRemove} style={{ background: 'none', border: 'none', color: '#c44', cursor: 'pointer', fontSize: 12, padding: '2px 8px', borderRadius: 3 }}>✕ Remove</button>}
      </div>
      {children}
    </div>
  )
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>{children}</div>
}

function AddBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{ width: '100%', background: 'transparent', border: '1px dashed #252525', borderRadius: 6, color: '#444', fontSize: 13, padding: 12, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 8, transition: 'all 0.15s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#252525'; e.currentTarget.style.color = '#444' }}
    >
      {children}
    </button>
  )
}

function Divider({ label }: { label?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0 18px' }}>
      {label && <span style={{ color: '#555', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
    </div>
  )
}

function ImgUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) onChange(data.url)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {value && (
        <div style={{ position: 'relative', width: '100%', height: 130, background: '#111', borderRadius: 4, overflow: 'hidden', border: '1px solid #222' }}>
          <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button onClick={() => onChange('')} style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.8)', border: '1px solid #444', color: '#fff', fontSize: 11, padding: '3px 8px', borderRadius: 3, cursor: 'pointer' }}>✕ Remove</button>
        </div>
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        <In value={value} onChange={onChange} placeholder="Paste image URL or click Upload →" />
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', background: '#1a1a1a', border: '1px solid #333', borderRadius: 4, color: uploading ? '#555' : '#aaa', fontSize: 12, cursor: uploading ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>
          {uploading ? '⏳ Uploading…' : '⬆ Upload'}
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} disabled={uploading} />
        </label>
      </div>
    </div>
  )
}