import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const SESSION_NAME   = 'admin_session'
const SESSION_VALUE  = 'authenticated'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    if (password === ADMIN_PASSWORD) {
      const res = NextResponse.json({ ok: true })
      res.cookies.set(SESSION_NAME, SESSION_VALUE, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
      })
      return res
    }
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_NAME)
  if (session?.value === SESSION_VALUE) {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(SESSION_NAME)
  return res
}
