'use client'

import { ShortenedUrl } from '@/types'
import { formatDistanceToNow } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Badge } from "./ui/badge"
import { BarChart2, ExternalLink, Link as LinkIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { extendUrl } from '@/app/api/urls'
import { showAlert } from '@/lib/alerts'
import { ExpirationSelect } from './ExpirationSelect'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

type UrlTableProperties = {
  urls: ShortenedUrl[]
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onRefresh?: () => void
}

export function UrlTable({ 
  urls, 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
  onRefresh 
}: UrlTableProperties) {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  const filteredUrls = urls.filter(url => {
    const searchLower = search.toLowerCase()
    return (
      url.longUrl.toLowerCase().includes(searchLower) ||
      url.shortKey.toLowerCase().includes(searchLower) ||
      url.metadata.title?.toLowerCase().includes(searchLower) ||
      url.metadata.description?.toLowerCase().includes(searchLower) ||
      url.metadata.hostname.toLowerCase().includes(searchLower)
    )
  })

  const handleExpirationChange = async (shortKey: string, expiration: string) => {
    setLoading(shortKey)
    try {
      await extendUrl(shortKey, parseInt(expiration))
      showAlert('URL expiration updated successfully', 'default')
      onRefresh?.()
    } catch (error) {
      showAlert('Failed to update URL expiration', 'destructive')
      console.error(error);
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search URLs, titles, or descriptions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="text-sm text-muted-foreground">
          {totalItems} URLs total
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[500px]">URL Details</TableHead>
              <TableHead className="w-[140px]">Expiration</TableHead>
              <TableHead className="w-[140px]">Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUrls.map((url) => (
              <TableRow key={url._id}>
                <TableCell>
                  <div className="space-y-1.5">
                    <a
                      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url.shortKey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="font-medium line-clamp-1 group-hover:text-blue-600">
                        <span className="mr-2 text-sm text-muted-foreground group-hover:text-blue-600">
                          <Badge>{url.shortKey}</Badge>
                        </span>
                        {url.metadata.title || url.longUrl}
                      </div>
                    </a>
                    {url.metadata.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {url.metadata.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <LinkIcon className="h-3 w-3" />
                      <span>{url.metadata.hostname}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <ExpirationSelect
                    value={url.expiration}
                    onValueChange={(value) => handleExpirationChange(url.shortKey, value)}
                    disabled={loading === url.shortKey}
                  />
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <a
                        href={url.longUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                        title="Open original URL"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link
                        href={`/${url.shortKey}/stats`}
                        className="text-muted-foreground hover:text-foreground"
                        title="View statistics"
                      >
                        <BarChart2 className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </div>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => onPageSizeChange(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue>{itemsPerPage} items per page</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="100">100 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="w-8"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 