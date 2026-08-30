'use client'

import { useEffect } from 'react'

export function NewsViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `futo_news_view_${slug}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
    void fetch(`/api/news/${encodeURIComponent(slug)}/view`, { method: 'POST', cache: 'no-store', keepalive: true }).catch(() => sessionStorage.removeItem(key))
  }, [slug])
  return null
}
