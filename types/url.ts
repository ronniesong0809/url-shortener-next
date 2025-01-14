export interface UrlMetadata {
    title: string;
    description: string;
    hostname: string;
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

export interface PaginatedUrlResponse {
    urls: ShortUrl[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    message: string;
}

export interface UrlStats {
    stats: {
        _id: string;
        shortKey: string;
        clicks: number;
        createdAt: string;
        updatedAt: string;
        ip: string;
        userAgent: string;
    }
} 