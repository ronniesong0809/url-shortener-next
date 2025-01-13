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
import { Button } from './ui/button'
import { BarChart2, ExternalLink } from 'lucide-react'
import Link from 'next/link'

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