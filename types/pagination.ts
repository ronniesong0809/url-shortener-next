import { ShortenedUrl } from './core'
import { UrlMetadataEntry } from './metadata'

export type PaginationBase = {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  message: string
}

export type UrlPaginationResponse = PaginationBase & {
  content: ShortenedUrl[]
}

export type MetadataPaginationResponse = PaginationBase & {
  content: UrlMetadataEntry[]
} 