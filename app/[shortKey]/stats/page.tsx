import { getUrlStats } from '@/app/api/urls'
import { UrlStats } from '@/types/url'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDistanceToNow } from 'date-fns'
import { AlertCircle, Calendar, Clock, Globe, Monitor, MousePointer, Terminal } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function parseUserAgent(userAgent: string) {
  const browser = userAgent.match(/Chrome|Firefox|Safari|Edge|Opera|MSIE|Trident/)?.[0] || 'Unknown'
  const os = userAgent.match(/Windows|Mac OS X|Linux|Android|iOS/)?.[0] || 'Unknown'
  return { browser, os }
}

export default async function StatsPage({
  params
}: {
  params: { shortKey: string }
}) {
  let stats: UrlStats | null = null
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
            <h1 className="text-3xl font-bold mb-3">URL Statistics</h1>
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

  const { browser, os } = parseUserAgent(stats.stats.userAgent)
  const ipChain = stats.stats.ip.split(',').map(ip => ip.trim())

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">URL Statistics</h1>
          <p className="text-lg text-muted-foreground">
            Short URL: {process.env.NEXT_PUBLIC_BACKEND_URL}/{stats.stats.shortKey}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-muted">
                  <MousePointer className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold">{stats.stats.clicks}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-muted">
                  <Monitor className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Browser</p>
                  <p className="font-medium">{browser}</p>
                  <p className="text-sm text-muted-foreground mt-1">Operating System</p>
                  <p className="font-medium">{os}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-muted">
                  <Globe className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IP Chain</p>
                  <div className="space-y-1">
                    {ipChain.map((ip, index) => (
                      <p key={index} className="font-medium">
                        {ip}
                        {index === 0 && " (Origin)"}
                        {index === ipChain.length - 1 && index !== 0 && " (Proxy)"}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-muted">
                  <Terminal className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User Agent</p>
                  <p className="font-medium text-sm break-all">{stats.stats.userAgent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-muted">
                  <Calendar className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">
                    {formatDistanceToNow(new Date(stats.stats.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-muted">
                  <Clock className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {formatDistanceToNow(new Date(stats.stats.updatedAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 