import fs from 'fs'
import path from 'path'
import { sanity } from './sanity'

const FILE = path.join(process.cwd(), 'lib', 'cms-data.json')
const DOC_ID = 'siteContent'

const useSanity = () =>
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && !!process.env.SANITY_API_TOKEN

export async function getCMS() {
  if (useSanity()) {
    try {
      const doc = await sanity().fetch(
        `*[_id == $id][0].data`,
        { id: DOC_ID }
      )
      if (doc) return doc
    } catch {}
    // First run: no doc yet, seed from local file
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
  if (useSanity()) {
    await sanity().createOrReplace({
      _id: DOC_ID,
      _type: 'siteContent',
      data,
    })
    return
  }
  // Dev: save locally
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8')
}