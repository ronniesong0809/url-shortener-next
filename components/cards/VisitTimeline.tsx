import { format } from 'date-fns'
import { Clock, Globe, MapPin, Monitor, Terminal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { UrlVisitInfo } from '@/types/analytics'

interface VisitTimelineProps {
  visits: UrlVisitInfo[]
}

export function VisitTimeline({ visits }: VisitTimelineProps) {
  return (
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
            {visits &&
              visits
                .slice()
                .reverse()
                .map((visit, index, array) => {
                  const ipChain =
                    visit.ip?.split(',').map((ip: string) => ip.trim()) || visit.ip || null
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
                        <div
                          className={
                            'h-4 w-4 rounded-full border-2 border-primary ring-4 ring-background ' +
                            (isFirst ? 'bg-black' : 'bg-background')
                          }
                        />
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
                                  : `Visit #${visits.length - index}`}
                            </div>
                            <div className="font-medium">{visit.ipInfo?.query || visit.ip}</div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(visitDate, 'p')}, {format(visitDate, 'PPP')}
                          </div>
                        </div>

                        <div className="grid gap-2 text-sm">
                          {visit.userAgentInfo && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Monitor className="h-4 w-4 flex-shrink-0" />
                              <span className="font-medium text-foreground">
                                {visit.userAgentInfo.browser.name}{' '}
                                {visit.userAgentInfo.browser.version}
                              </span>
                              <span>on</span>
                              <span className="font-medium text-foreground">
                                {visit.userAgentInfo.os.name} {visit.userAgentInfo.os.version}
                              </span>
                            </div>
                          )}
                          {visit.ipInfo?.city && visit.ipInfo?.regionName && (
                            <div className="flex items-center">
                              <a
                                href={`https://www.google.com/maps/place/${visit.ipInfo.city}, ${visit.ipInfo.regionName}, ${visit.ipInfo.zip} ${visit.ipInfo.countryCode}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block"
                              >
                                <div className="flex gap-2">
                                  <MapPin className="h-4 w-4 flex-shrink-0" />
                                  <span className="font-medium text-foreground">
                                    {visit.ipInfo.city}, {visit.ipInfo.regionName},{' '}
                                    {visit.ipInfo.zip} {visit.ipInfo.countryCode}
                                  </span>
                                </div>
                              </a>
                            </div>
                          )}
                          {ipChain && (
                            <div className="flex items-start gap-2 text-muted-foreground">
                              <Globe className="mt-1 h-4 w-4 flex-shrink-0" />
                              <div className="flex flex-col">
                                {ipChain.map((ip: string, idx: number) => (
                                  <div key={idx} className="flex items-center gap-1.5">
                                    <span key={idx} className="font-medium text-foreground">
                                      {ip}
                                    </span>
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
                          )}
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
  )
}
