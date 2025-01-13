export async function getAllUrls() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/all`, {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch URLs')
  }
 
  return res.json()
}

export async function shortenUrl(url: string, expiration: number) {
  const shortenUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/shorten`
  const res = await fetch(shortenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, expiration }),
  })
  console.log("shortenUrl", shortenUrl);
  

  if (!res.ok) {
    throw new Error('Failed to shorten URL')
  }

  return res.json()
}

export async function getUrlStats(shortKey: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${shortKey}/stats`, {
    next: { revalidate: 60 } // Revalidate every minute
  })

  if (!res.ok) {
    throw new Error('Failed to fetch URL stats')
  }

  return res.json()
} 