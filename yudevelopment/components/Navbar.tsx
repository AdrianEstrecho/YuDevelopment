'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavProps = {
  nav: {
    links: { label: string; href: string }[]
    cta: { label: string; href: string }
  }
}

export default function Navbar({ nav }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const dark = !isHome || scrolled

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      height: 56,
      background: dark ? 'rgba(255,255,255,0.97)' : 'transparent',
      borderBottom: dark ? '1px solid #eee' : 'none',
      backdropFilter: dark ? 'blur(8px)' : 'none',
      transition: 'background 0.3s, border 0.3s',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
    }}>
      <Link href="/" className="nav-logo" style={{ fontFamily: 'Orbitron, sans-serif', color: dark ? '#000' : '#fff', fontWeight: 300, fontSize: '0.8rem', letterSpacing: '0.3em', textDecoration: 'none', transition: 'color 0.5s, opacity 0.5s, letter-spacing 0.5s' }} onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.letterSpacing = '0.42em' }} onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.letterSpacing = '0.3em' }}>
        YUDEVELOPMENT
      </Link>

      {/* Desktop */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
        {nav.links.map(l => {
          const isAnchor = l.href.startsWith('#')
          const handleClick = isAnchor ? (e: React.MouseEvent) => {
            e.preventDefault()
            if (isHome) {
              if (l.href === '#') window.scrollTo({ top: 0, behavior: 'smooth' })
              else document.getElementById(l.href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
            } else {
              window.location.href = '/' + l.href
            }
          } : undefined
          return (
            <Link key={l.href} href={isAnchor ? '#' : l.href} onClick={handleClick} className={`nav-link ${dark ? 'nav-link--dark' : 'nav-link--light'}`} style={{ fontSize: 12, textDecoration: 'none', letterSpacing: '0.04em' }}>
              {l.label}
            </Link>
          )
        })}
        <Link href={nav.cta.href} className={`nav-cta ${dark ? 'nav-cta--dark' : 'nav-cta--light'}`} style={{
          border: '1px solid',
          borderRadius: 999,
          padding: '6px 18px',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textDecoration: 'none',
          transition: 'background 0.2s, color 0.2s',
        }}>
          {nav.cta.label}
        </Link>
      </div>

      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} className="show-mobile">
        <div style={{ width: 22, height: 1.5, background: dark ? '#000' : '#fff', marginBottom: 5, transition: 'transform 0.2s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
        <div style={{ width: 22, height: 1.5, background: dark ? '#000' : '#fff', marginBottom: 5, opacity: open ? 0 : 1 }} />
        <div style={{ width: 22, height: 1.5, background: dark ? '#000' : '#fff', transition: 'transform 0.2s', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{ position: 'absolute', top: 56, left: 0, right: 0, background: '#fff', borderBottom: '1px solid #eee', padding: '16px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {nav.links.map(l => {
            const isAnchor = l.href.startsWith('#')
            const handleClick = (e: React.MouseEvent) => {
              setOpen(false)
              if (isAnchor) {
                e.preventDefault()
                if (isHome) {
                  if (l.href === '#') window.scrollTo({ top: 0, behavior: 'smooth' })
                  else document.getElementById(l.href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
                } else {
                  window.location.href = '/' + l.href
                }
              }
            }
            return (
              <Link key={l.href} href={isAnchor ? '#' : l.href} onClick={handleClick} style={{ color: '#333', fontSize: 14, textDecoration: 'none' }}>{l.label}</Link>
            )
          })}
          <Link href={nav.cta.href} onClick={() => setOpen(false)} style={{ background: '#000', color: '#fff', padding: '10px 20px', fontSize: 12, fontWeight: 600, textDecoration: 'none', textAlign: 'center', borderRadius: 4 }}>
            {nav.cta.label}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        @keyframes logo-in {
          from { opacity: 0; letter-spacing: 0.6em; }
          to   { opacity: 1; letter-spacing: 0.3em; }
        }
        .nav-logo { animation: logo-in 0.8s cubic-bezier(0.16,1,0.3,1) both; }

        /* Nav links */
        .nav-link { position: relative; padding-bottom: 2px; }
        .nav-link::after {
          content: "";
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link--dark  { color: #555; }
        .nav-link--dark::after  { background: #000; }
        .nav-link--dark:hover   { color: #000 !important; }
        .nav-link--light { color: rgba(255,255,255,0.85); }
        .nav-link--light::after { background: #fff; }
        .nav-link--light:hover  { color: #fff !important; }

        /* CTA button */
        .nav-cta--dark  { background: #000; color: #fff; border-color: #000; }
        .nav-cta--dark:hover  { background: #333; border-color: #333; }
        .nav-cta--light { background: transparent; color: #fff; border-color: #fff; }
        .nav-cta--light:hover { background: rgba(255,255,255,0.15); }
      `}</style>
    </nav>
  )
}
