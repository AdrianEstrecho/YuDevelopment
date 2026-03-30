'use client'
import { useState } from 'react'
import Link from 'next/link'

type FooterProps = {
  footer: { address: string; phone: string; email: string; copyright: string }
  nav: { links: { label: string; href: string }[] }
  companies: { id: string; name: string }[]
}

export default function Footer({ footer, nav, companies }: FooterProps) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <footer id="footer" style={{ background: '#faf9f6' }}>
      {/* Email signup */}
      <div style={{ background: '#1a1a1a', borderBottom: '1px solid #2a2a2a', padding: '40px 64px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: '1px solid #fff', paddingBottom: 2, color: '#fff' }}>
            SIGN UP FOR UPDATES
          </p>
          {done ? (
            <p style={{ fontSize: 13, color: '#aaa' }}>Thanks for subscribing!</p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (email) setDone(true) }} style={{ display: 'flex' }}>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ border: '1px solid #444', borderRight: 'none', padding: '8px 16px', fontSize: 13, outline: 'none', width: 260, background: '#2a2a2a', color: '#fff' }}
              />
              <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', padding: '8px 20px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links */}
      <div style={{ padding: '48px 64px', maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', marginBottom: 32 }}>YUDEVELOPMENT</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 32 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>CONTACT</p>
            <p style={{ fontSize: 12, color: '#777', lineHeight: 1.8 }}>{footer.address}<br />{footer.phone}<br />{footer.email}</p>
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>OUR COMPANIES</p>
            {companies.map(c => (
              <p key={c.id} style={{ fontSize: 12, color: '#777', marginBottom: 6 }}>{c.name}</p>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>NAVIGATION</p>
            {nav.links.map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', fontSize: 12, color: '#777', marginBottom: 6, textDecoration: 'none' }}>{l.label}</Link>
            ))}
            <Link href="/careers" style={{ display: 'block', fontSize: 12, color: '#777', marginBottom: 6, textDecoration: 'none' }}>Careers</Link>
          </div>
        </div>
        <p style={{ fontSize: 11, color: '#aaa', marginTop: 40 }}>{footer.copyright}</p>
      </div>
    </footer>
  )
}
