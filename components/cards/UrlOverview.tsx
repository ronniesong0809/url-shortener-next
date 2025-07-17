import { formatDistanceToNow } from 'date-fns'
import { Calendar, Clock, Eye, MousePointer } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UrlVisitInfo } from '@/types/analytics'

interface UrlOverviewProps {
  clicks: number
  createdAt: string
  updatedAt: string
  latestVisit: UrlVisitInfo | null
}

export function UrlOverview({ clicks, createdAt, updatedAt, latestVisit }: UrlOverviewProps) {
  return (
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
            <p className="text-2xl font-bold">{clicks}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
            <Calendar className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Created</p>
            <p className="font-medium">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
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
              {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
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
              {latestVisit
                ? formatDistanceToNow(new Date(latestVisit.createdAt), {
                    addSuffix: true
                  })
                : 'No visits yet'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
