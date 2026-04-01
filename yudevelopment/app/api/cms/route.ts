import { NextRequest, NextResponse } from 'next/server'
import { getCMS, saveCMS } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await getCMS()
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await saveCMS(body)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}