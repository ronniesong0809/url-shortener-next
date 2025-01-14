'use client'

import { getAllUrls } from '@/app/api/urls'
import { UrlTable } from './UrlTable'
import { ShortUrl } from '@/types/url'
import { useEffect, useState } from 'react'

export function UrlList() {
  const [urls, setUrls] = useState<ShortUrl[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUrls = async () => {
    try {
      const data = await getAllUrls()
      setUrls(data)
    } catch (error) {
      console.error('Failed to fetch URLs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return <UrlTable urls={urls} onRefresh={fetchUrls} />
} 