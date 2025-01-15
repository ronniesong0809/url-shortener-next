import { MetadataPaginationResponse, UrlPaginationResponse } from '@/types'

export async function getAllUrls(page?: number, limit: number = 10) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/all`)
  if (page) {
    url.searchParams.set('page', page.toString())
  }
  url.searchParams.set('limit', limit.toString())

  const res = await fetch(url, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch URLs')
  }

  const data: UrlPaginationResponse = await res.json()
  return data
}

export async function shortenUrl(url: string, expiration: number) {
  const shortenUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/shorten`
  const res = await fetch(shortenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url, expiration })
  })
  console.log('shortenUrl', shortenUrl)

  if (!res.ok) {
    throw new Error('Failed to shorten URL')
  }

  return res.json()
}

export async function getUrlStats(shortKey: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${shortKey}/stats`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch URL stats')
  }

  return res.json()
}

export async function extendUrl(shortKey: string, expiration: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/extend`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: shortKey, expiration })
  })

  if (!res.ok) {
    throw new Error('Failed to extend URL expiration')
  }

  return res.json()
}

export async function getMetadata() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/all/metadata`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('Failed to fetch URLs')
  }

  const data: MetadataPaginationResponse = await res.json()
  return data
}
