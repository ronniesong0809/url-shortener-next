export type UrlVisitInfo = {
  _id: string
  ip: string
  userAgent: string
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
