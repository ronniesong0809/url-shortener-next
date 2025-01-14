import { Suspense } from 'react'
import { UrlList } from '@/components/UrlList'

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

export default function UrlsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">All URLs</h1>
          <p className="text-lg text-muted-foreground">
            Manage and track your shortened URLs
          </p>
        </div>
        <Suspense fallback={<LoadingState />}>
          <UrlList />
        </Suspense>
      </div>
    </div>
  )
} 