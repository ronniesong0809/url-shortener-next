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
import { Badge } from './ui/badge'
import { useState } from 'react'
import { Input } from './ui/input'

interface UrlTableProps {
  urls: ShortUrl[]
}

export function UrlTable({ urls }: UrlTableProps) {
  const [search, setSearch] = useState('')
  
  const filteredUrls = urls.filter(url => 
    url.longUrl.toLowerCase().includes(search.toLowerCase()) ||
    url.shortKey.toLowerCase().includes(search.toLowerCase())
  )

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
              <TableHead>Short URL</TableHead>
              <TableHead className="max-w-[500px]">Original URL</TableHead>
              <TableHead>Expiration</TableHead>
              <TableHead>Created</TableHead>
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
                <TableCell className="max-w-[500px] truncate">
                  <a 
                    href={url.longUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {url.longUrl}
                  </a>
                </TableCell>
                <TableCell>
                  {url.expiration === 0 ? (
                    <Badge variant="secondary">Never</Badge>
                  ) : (
                    <Badge>{url.expiration} days</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(url.createdAt), { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 