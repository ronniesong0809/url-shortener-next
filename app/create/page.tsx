import { CreateUrl } from '@/components/CreateUrl'

export default function CreatePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">Create Short URL</h1>
          <p className="text-lg text-muted-foreground">
            Enter a long URL to create a shortened version
          </p>
        </div>
        <div className="space-y-8">
          <CreateUrl />
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold mb-3">URL Expiration Options</h2>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Never expires:</strong> URL will remain active indefinitely</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>1 day:</strong> Perfect for temporary or time-sensitive links</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>7 days:</strong> Ideal for week-long events or promotions</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>30 days:</strong> Good for monthly content or campaigns</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 