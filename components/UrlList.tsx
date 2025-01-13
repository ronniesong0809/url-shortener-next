import { getAllUrls } from '@/app/api/urls'
import { UrlTable } from './UrlTable'
import { ShortUrl } from '@/types/url'

export async function UrlList() {
  const urls: ShortUrl[] = await getAllUrls()
  return <UrlTable urls={urls} />
} 