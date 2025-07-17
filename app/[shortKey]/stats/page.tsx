import { getUrlStats } from '@/app/api/urls'
import { UrlAnalytics } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, ExternalLink } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { VisitTimeline } from '@/components/cards/VisitTimeline'
import { UrlOverview } from '@/components/cards/UrlOverview'
import { LastVisit } from '@/components/cards/LastVisit'

export default async function StatsPage({ params }: { params: { shortKey: string } }) {
  let stats: UrlAnalytics | null = null
  let error: string | null = null

  try {
    stats = await getUrlStats(params.shortKey)
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch URL statistics'
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="mb-8">
            <h1 className="mb-3 text-3xl font-bold">URL Statistics</h1>
            <p className="text-lg text-muted-foreground">
              Short URL: {process.env.NEXT_PUBLIC_BACKEND_URL}/{params.shortKey}
            </p>
          </div>
          <Card>
            <CardContent className="p-6">
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button asChild>
                <Link href="/urls">Back to URLs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!stats) return null

  // Get the latest visit if available
  const latestVisit =
    stats.content.visits.length > 0
      ? stats.content.visits[stats.content.visits.length - 1]
      : null

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="mb-8">
          <h1 className="mb-3 text-3xl font-bold">URL Statistics</h1>
          <p className="text flex text-muted-foreground">
            <a
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${stats.content.shortKey}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <span className="flex items-center gap-1">
                {process.env.NEXT_PUBLIC_BACKEND_URL}/{stats.content.shortKey}
                <ExternalLink className="h-3 w-3" />
              </span>
            </a>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <UrlOverview
            clicks={stats.content.clicks}
            createdAt={stats.content.createdAt}
            updatedAt={stats.content.updatedAt}
            latestVisit={latestVisit}
          />
          <LastVisit visit={latestVisit} />
        </div>

        <VisitTimeline visits={stats.content.visits} />
      </div>
    </div>
  )
}
