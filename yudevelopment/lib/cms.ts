import fs from 'fs'
import path from 'path'
import { put, list } from '@vercel/blob'

const FILE = path.join(process.cwd(), 'lib', 'cms-data.json')
const BLOB_KEY = 'cms-data.json'

export async function getCMS() {
  // Production: read from Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 })
      if (blobs.length > 0) {
        const res = await fetch(blobs[0].url + '?t=' + Date.now(), { cache: 'no-store' })
        if (res.ok) return res.json()
      }
    } catch {}
    // First deploy: no blob yet, seed from local file
    try {
      const raw = fs.readFileSync(FILE, 'utf-8')
      return JSON.parse(raw)
    } catch {}
    return {}
  }
  // Dev: local file
  const raw = fs.readFileSync(FILE, 'utf-8')
  return JSON.parse(raw)
}

export async function saveCMS(data: object) {
  // Production: save to Vercel Blob only, skip filesystem
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await put(BLOB_KEY, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    })
    return
  }
  // Dev: save locally
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8')
}