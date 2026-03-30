import fs from 'fs'
import path from 'path'

const FILE = path.join(process.cwd(), 'lib', 'cms-data.json')

export function getCMS() {
  const raw = fs.readFileSync(FILE, 'utf-8')
  return JSON.parse(raw)
}

export function saveCMS(data: object) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8')
}
