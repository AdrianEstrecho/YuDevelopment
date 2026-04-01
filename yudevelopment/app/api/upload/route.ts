import { NextRequest, NextResponse } from 'next/server'
import { sanity } from '@/lib/sanity'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const useSanity = () =>
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !!process.env.SANITY_API_TOKEN

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const filename = `${Date.now()}-${safeName}`

    // Production: upload to Sanity assets
    if (useSanity()) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const asset = await sanity.assets.upload('image', buffer, {
        filename,
        contentType: file.type,
      })
      return NextResponse.json({ url: asset.url })
    }

    // Dev: save to local filesystem
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })
    await writeFile(path.join(uploadsDir, filename), buffer)
    return NextResponse.json({ url: `/uploads/${filename}` })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}