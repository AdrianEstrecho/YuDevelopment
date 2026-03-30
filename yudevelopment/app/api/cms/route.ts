import { NextRequest, NextResponse } from 'next/server'
import { getCMS, saveCMS } from '@/lib/cms'

export async function GET() {
  try {
    const data = getCMS()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Could not read cms-data.json' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    saveCMS(body)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Could not save cms-data.json' }, { status: 500 })
  }
}
