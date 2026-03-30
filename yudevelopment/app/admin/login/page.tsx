'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const router                  = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        setError('Incorrect password')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 380, padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 16, letterSpacing: '0.12em' }}>YGCCC</span>
          <span style={{ display: 'inline-block', marginLeft: 10, background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#666', fontSize: 10, padding: '2px 9px', borderRadius: 20, letterSpacing: '0.1em' }}>ADMIN</span>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: 32 }}>
          <p style={{ color: '#fff', fontSize: 18, fontWeight: 300, marginBottom: 6 }}>Sign in</p>
          <p style={{ color: '#444', fontSize: 12, marginBottom: 28, lineHeight: 1.5 }}>Enter the admin password to continue.</p>

          <label style={{ display: 'block', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: 7 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            style={{
              width: '100%',
              background: '#161616',
              border: `1px solid ${error ? '#c44' : '#242424'}`,
              borderRadius: 4,
              color: '#e0e0e0',
              fontFamily: 'inherit',
              fontSize: 13,
              padding: '10px 12px',
              outline: 'none',
              boxSizing: 'border-box',
              marginBottom: error ? 8 : 20,
              transition: 'border-color 0.2s',
            }}
            onFocus={e => { if (!error) e.target.style.borderColor = '#444' }}
            onBlur={e  => { if (!error) e.target.style.borderColor = '#242424' }}
          />

          {error && <p style={{ color: '#c44', fontSize: 12, marginBottom: 16 }}>{error}</p>}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: 5,
              border: 'none',
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 700,
              background: loading ? '#333' : '#fff',
              color: loading ? '#666' : '#000',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 11, color: '#333' }}>
          <a href="/" style={{ color: '#444', textDecoration: 'none' }}>← Back to site</a>
        </p>
      </div>
    </div>
  )
}
