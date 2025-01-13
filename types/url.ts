export interface ShortUrl {
    _id: string;
    longUrl: string;
    shortKey: string;
    expiration: number;
    createdAt: string;
    updatedAt: string;
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