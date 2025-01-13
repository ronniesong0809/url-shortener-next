import { ShortUrl } from '@/types/url'
import { UrlTable } from '@/components/UrlTable'
import { ShortenUrlForm } from '@/components/ShortenUrlForm'
import { Suspense } from 'react'
import { getAllUrls } from './api/urls'

function LoadingState() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export default async function Home() {
  const urls: ShortUrl[] = await getAllUrls()

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">URL Shortener Dashboard</h1>
      <div className="mb-8">
        <ShortenUrlForm />
      </div>
      <Suspense fallback={<LoadingState />}>
        <UrlTable urls={urls} />
      </Suspense>
    </main>
  )
}
