export interface PaginatedUrlResponse {
  content: ShortUrl[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  message: string;
}

export interface ShortUrl {
  _id: string;
  longUrl: string;
  shortKey: string;
  expiration: number;
  createdAt: string;
  updatedAt: string;
  metadata: UrlMetadata;
}

export interface UrlStats {
  content: {
    _id: string;
    shortKey: string;
    clicks: number;
    visits: VisitData[];
  }
}

export interface VisitData {
  _id: string;
  ip: string;
  userAgent: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedMetadataResponse {
  content: MetadataContent[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  message: string;
}

export interface MetadataContent {
  metadata: UrlMetadata;
  shortKey: string;
}

export interface UrlMetadata {
  title: string;
  description: string;
  hostname: string;
}