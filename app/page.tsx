import { Button } from '@/components/ui/button'
import { Link2, List } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-3">URL Shortener</h1>
          <p className="text-lg text-muted-foreground">
            Create shortened URLs and track their performance
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/create" className="gap-2">
              <Link2 className="h-5 w-5" />
              Create URL
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/urls" className="gap-2">
              <List className="h-5 w-5" />
              View URLs
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
