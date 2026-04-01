import { createClient, type SanityClient } from '@sanity/client'

let _client: SanityClient | null = null

export function sanity(): SanityClient {
  if (!_client) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    if (!projectId) throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
    _client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2024-01-01',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    })
  }
  return _client
}