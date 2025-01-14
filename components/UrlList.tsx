'use client'

import { getAllUrls } from '@/app/api/urls'
import { UrlTable } from './UrlTable'
import { ShortenedUrl } from '@/types'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type UrlListData = {
  content: ShortenedUrl[]
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export function UrlList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [urlData, setUrlData] = useState<UrlListData | null>(null)
  const [loading, setLoading] = useState(true)

  const initialPage = parseInt(searchParams.get('page') || '1')
  const initialLimit = parseInt(searchParams.get('limit') || '10')
  const [pageSize, setPageSize] = useState(initialLimit)

  const updateUrlParams = (page: number, limit: number) => {
    const params = new URLSearchParams()
    params.set('page', page.toString())
    params.set('limit', limit.toString())
    router.push(`/urls?${params.toString()}`)
  }

  const fetchUrls = async (page?: number, limit?: number) => {
    try {
      const data = await getAllUrls(page, limit)
      setUrlData(data)
    } catch (error) {
      console.error('Failed to fetch URLs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUrls(initialPage, initialLimit)
  }, [initialPage, initialLimit])

  const handlePageChange = (page: number) => {
    setLoading(true)
    updateUrlParams(page, pageSize)
    fetchUrls(page, pageSize)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setLoading(true)
    updateUrlParams(1, newPageSize) // Reset to page 1 when changing page size
  }

  if (loading || !urlData) {
    return <div>Loading...</div>
  }

  return (
    <UrlTable
      urls={urlData.content}
      currentPage={urlData.currentPage}
      totalPages={urlData.totalPages}
      totalItems={urlData.totalItems}
      itemsPerPage={urlData.itemsPerPage}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onRefresh={() => fetchUrls(urlData.currentPage, pageSize)}
    />
  )
} 