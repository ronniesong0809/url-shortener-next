'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { shortenUrl } from '@/app/api/urls'
import { showAlert } from '@/lib/alerts'

export function CreateUrl() {
  const [url, setUrl] = useState('')
  const [expiration, setExpiration] = useState('0')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await shortenUrl(url, parseInt(expiration))
      setUrl('')
      showAlert(result.message, 'default')
    } catch (err) {
      console.error(err)
      showAlert('Failed to shorten URL. Please try again.', 'destructive')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          type="url"
          placeholder="Enter URL to shorten..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1"
        />
        <Select value={expiration} onValueChange={setExpiration}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Expiration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Never expires</SelectItem>
            <SelectItem value="1">1 day</SelectItem>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="30">30 days</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </Button>
      </div>
    </form>
  )
}
