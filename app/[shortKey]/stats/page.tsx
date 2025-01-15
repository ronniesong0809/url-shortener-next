import { getUrlStats } from '@/app/api/urls'
import { UrlAnalytics } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow, format } from 'date-fns'
import {
  AlertCircle,
  Calendar,
  Clock,
  ExternalLink,
  Eye,
  Globe,
  Monitor,
  MousePointer,
  Terminal
} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function parseUserAgent(userAgent: string) {
  const browser = userAgent.match(/Chrome|Firefox|Safari|Edge|Opera|MSIE|Trident/)?.[0] || 'Unknown'
  const os = userAgent.match(/Windows|Mac OS X|Linux|Android|iOS/)?.[0] || 'Unknown'
  return { browser, os }
}

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

  // Get the latest visit
  const latestVisit = stats.content.visits[stats.content.visits.length - 1]
  const { browser, os } = parseUserAgent(latestVisit.userAgent)
  const ipChain = latestVisit.ip?.split(',').map((ip) => ip.trim())

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
              <div className="flex items-center gap-1">
                {process.env.NEXT_PUBLIC_BACKEND_URL}/{stats.content.shortKey}
                <ExternalLink className="h-3 w-3" />
              </div>
            </a>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                  <MousePointer className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold">{stats.content.clicks}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Calendar className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">
                    {formatDistanceToNow(new Date(stats.content.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Clock className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Updated</p>
                  <p className="font-medium">
                    {formatDistanceToNow(new Date(stats.content.updatedAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Eye className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Visit</p>
                  <p className="font-medium">
                    {formatDistanceToNow(new Date(stats.content.visits[0].createdAt), {
                      addSuffix: true
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Last Visit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Monitor className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Latest Browser</p>
                  <p className="font-medium">{browser}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Operating System</p>
                  <p className="font-medium">{os}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Globe className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Latest IP Chain</p>
                  <div className="space-y-1">
                    {ipChain &&
                      ipChain.map((ip, index) => (
                        <p key={index} className="font-medium">
                          {ip}
                          {index === 0 && ' (Origin)'}
                          {index === ipChain.length - 1 && index !== 0 && ' (Proxy)'}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Terminal className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Latest User Agent</p>
                  <p className="break-all text-sm font-medium">{latestVisit.userAgent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/50">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Clock className="h-5 w-5" />
              Visit Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative">
              <div className="absolute bottom-0 left-8 top-0 w-[2px] bg-gradient-to-b from-border via-primary/20 to-border" />
              <div>
                {stats.content.visits &&
                  stats.content.visits
                    .slice()
                    .reverse()
                    .map((visit, index, array) => {
                      const { browser, os } = parseUserAgent(visit.userAgent)
                      const ipChain =
                        visit.ip?.split(',').map((ip) => ip.trim()) || visit.ip || null
                      const visitDate = new Date(visit.createdAt)
                      const isFirst = index === 0
                      const isLast = index === array.length - 1

                      return (
                        <div
                          key={visit._id}
                          className={cn(
                            'relative py-6 pl-16 pr-6 transition-all hover:bg-muted/50',
                            !isLast && 'border-b border-border/50'
                          )}
                        >
                          <div className="absolute left-8 flex -translate-x-1/2 flex-col items-center">
                            <div className="h-4 w-4 rounded-full border-2 border-primary bg-background ring-4 ring-background" />
                            {!isLast && <div className="h-full w-[2px] bg-border/50" />}
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-baseline justify-between gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  {isFirst
                                    ? 'Latest Visit'
                                    : isLast
                                      ? 'First Visit'
                                      : `Visit #${stats.content.visits.length - index}`}
                                </div>
                                <div className="font-medium">{format(visitDate, 'p')}</div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {format(visitDate, 'PPP')}
                              </div>
                            </div>

                            <div className="grid gap-2 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Monitor className="h-4 w-4 flex-shrink-0" />
                                <span className="font-medium text-foreground">{browser}</span>
                                <span>on</span>
                                <span className="font-medium text-foreground">{os}</span>
                              </div>

                              <div className="flex items-start gap-2 text-muted-foreground">
                                <Globe className="mt-1 h-4 w-4 flex-shrink-0" />
                                <div className="space-y-1">
                                  {ipChain &&
                                    ipChain.map((ip, idx) => (
                                      <div key={idx} className="flex items-center gap-1.5">
                                        <span className="font-medium text-foreground">{ip}</span>
                                        {idx === 0 && (
                                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                                            Origin
                                          </span>
                                        )}
                                        {idx === ipChain.length - 1 && idx !== 0 && (
                                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">
                                            Proxy
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                </div>
                              </div>

                              <div className="group flex items-end gap-2">
                                <Terminal className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                                <div className="font-mono text-[11px] leading-normal opacity-60 transition-opacity group-hover:opacity-100">
                                  {visit.userAgent}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
