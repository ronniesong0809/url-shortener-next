import { Suspense } from 'react'
import { UrlList } from '@/components/UrlList'

function LoadingState() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 h-8 w-1/4 rounded bg-gray-200"></div>
      <div className="space-y-4">
        <div className="h-10 rounded bg-gray-200"></div>
        <div className="h-96 rounded bg-gray-200"></div>
      </div>
    </div>
  )
}

export default function UrlsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="mb-3 text-3xl font-bold">All URLs</h1>
          <p className="text-lg text-muted-foreground">Manage and track your shortened URLs</p>
        </div>
        <Suspense fallback={<LoadingState />}>
          <UrlList />
        </Suspense>
      </div>
    </div>
  )
}
