'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminShortcut() {
  const router = useRouter()

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.altKey && e.key === '.') {
        e.preventDefault()
        router.push('/admin/login')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [router])

  return null
}
