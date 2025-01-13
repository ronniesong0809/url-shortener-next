export interface ShortUrl {
    _id: string;
    shortKey: string;
    shortUrl: string;
    longUrl: string;
    expiration: number;
    createdAt: string;
    updatedAt: string;
} 