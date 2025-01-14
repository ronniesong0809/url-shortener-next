'use client'

import { getAllUrls } from '@/app/api/urls'
import { UrlTable } from './UrlTable'
import { ShortUrl } from '@/types/url'
import { useEffect, useState } from 'react'

interface UrlData {
  urls: ShortUrl[]
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export function UrlList() {
  const [urlData, setUrlData] = useState<UrlData | null>(null)
  const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(10)

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
    fetchUrls(1, pageSize)
  }, [pageSize])

  const handlePageChange = (page: number) => {
    setLoading(true)
    fetchUrls(page, pageSize)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setLoading(true)
  }

  if (loading || !urlData) {
    return <div>Loading...</div>
  }

  return (
    <UrlTable 
      urls={urlData.urls}
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