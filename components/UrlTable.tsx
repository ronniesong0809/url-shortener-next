'use client'

import { ShortUrl } from '@/types/url'
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
import { BarChart2, ExternalLink, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { extendUrl } from '@/app/api/urls'
import { showAlert } from '@/lib/alerts'
import { ExpirationSelect } from './ExpirationSelect'

interface UrlTableProps {
  urls: ShortUrl[]
  onRefresh?: () => void
}

export function UrlTable({ urls, onRefresh }: UrlTableProps) {
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
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search URLs, titles, or descriptions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

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
    </div>
  )
} 