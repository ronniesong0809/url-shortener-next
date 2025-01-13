export async function getAllUrls() {
  const res = await fetch(`${process.env.NEXT_BACKEND_URL}/all`, {
    next: { revalidate: 3600 }
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch URLs')
  }
 
  return res.json()
} 