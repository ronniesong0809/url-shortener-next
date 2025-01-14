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
import { BarChart2, ExternalLink } from 'lucide-react'
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
  
  const filteredUrls = urls.filter(url => 
    url.longUrl.toLowerCase().includes(search.toLowerCase()) ||
    url.shortKey.toLowerCase().includes(search.toLowerCase())
  )

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
        placeholder="Search URLs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Short URL</TableHead>
              <TableHead className="max-w-[300px]">Original URL</TableHead>
              <TableHead className="w-[130px]">Expiration</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUrls.map((url) => (
              <TableRow key={url._id}>
                <TableCell>
                  <a 
                    href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url.shortKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url.shortKey}
                  </a>
                </TableCell>
                <TableCell className="max-w-[500px]">
                  <div className="space-y-1">
                    <a 
                      href={url.longUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline block truncate"
                    >
                      {url.metadata.title || url.longUrl}
                    </a>
                    {url.metadata.description && (
                      <p className="text-sm text-muted-foreground truncate">
                        {url.metadata.description}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {url.metadata.hostname}
                    </p>
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
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link 
                        href={`/${url.shortKey}/stats`}
                        className="text-muted-foreground hover:text-foreground"
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