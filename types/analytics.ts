export type IpInfo = {
  query: string
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
}

export type UserAgentInfo = {
  browser: {
    name: string
    version: string
  }
  engine: {
    name: string
    version: string
  }
  os: {
    name: string
    version: string
  }
  device: {
    vendor: string
    model: string
  }
}

export type UrlVisitInfo = {
  _id: string
  ip: string
  ipInfo: IpInfo
  userAgent: string
  acceptLanguage: string
  cookies: string | null
  referer: string | null
  userAgentInfo: UserAgentInfo
  createdAt: string
  updatedAt: string
}

export type UrlAnalytics = {
  content: {
    _id: string
    shortKey: string
    clicks: number
    visits: UrlVisitInfo[]
    createdAt: string
    updatedAt: string
  }
  message: string
}
