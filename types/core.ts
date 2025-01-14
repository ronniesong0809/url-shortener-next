export type ShortenedUrl = {
  _id: string
  longUrl: string
  shortKey: string
  expiration: number
  createdAt: string
  updatedAt: string
  metadata: UrlPageMetadata
}

export type UrlPageMetadata = {
  title: string
  description: string
  hostname: string
}
