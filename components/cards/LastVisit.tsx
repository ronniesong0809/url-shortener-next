import { Globe, MapPin, Monitor, Terminal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UrlVisitInfo } from '@/types/analytics'

interface LastVisitProps {
  visit: UrlVisitInfo
}

export function LastVisit({ visit }: LastVisitProps) {
  const ipChain = visit.ip?.split(',').map((ip: string) => ip.trim()) || visit.ip || null

  return (
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
            <p className="text-sm text-muted-foreground">Browser</p>
            <p className="font-medium">
              {visit.userAgentInfo.browser.name} {visit.userAgentInfo.browser.version}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Operating System</p>
            <p className="font-medium">
              {visit.userAgentInfo.os.name} {visit.userAgentInfo.os.version}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Device</p>
            <p className="font-medium">
              {visit.userAgentInfo.device.vendor} {visit.userAgentInfo.device.model}
            </p>
          </div>
        </div>
        {visit.ipInfo.city &&
          visit.ipInfo.regionName &&
          visit.ipInfo.country &&
          visit.ipInfo.isp && (
            <div className="flex gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                <MapPin className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">
                  {visit.ipInfo.city}, {visit.ipInfo.regionName}
                </p>
                <p className="font-medium">{visit.ipInfo.country}</p>
                <p className="mt-1 text-sm text-muted-foreground">ISP</p>
                <p className="font-medium">{visit.ipInfo.isp}</p>
              </div>
            </div>
          )}
        <div className="flex gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
            <Globe className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">IP Chain</p>
            <div className="space-y-1">
              {ipChain &&
                ipChain.map((ip: string, index: number) => (
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
            <p className="break-all text-sm font-medium">{visit.userAgent}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
