# YuDevelopment — Next.js 14

Clean rebuild. No bugs. Fully working CMS.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000  
CMS editor → http://localhost:3000/cms

## How CMS works

```
Edit in /cms  →  Save & Publish
      ↓
POST /api/cms  →  writes lib/cms-data.json
      ↓
All pages read cms-data.json on every request  (force-dynamic)
      ↓
Refresh any page → see your changes instantly ✓
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | Who We Are |
| `/companies` | Portfolio |
| `/people` | Team + Departments |
| `/careers` | Open roles |
| `/cms` | **CMS Editor** |

## All content lives in one file

`lib/cms-data.json` — edit directly or use `/cms`

## Production hosting

| Host | Works? | Notes |
|------|--------|-------|
| Local / VPS / Railway / Render | ✅ | File writes work fine |
| Vercel / Netlify | ⚠️ | Filesystem is read-only — swap API to use Supabase or Upstash Redis |
