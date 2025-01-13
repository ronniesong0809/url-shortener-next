import { Github } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import content from '@/content/about.json'

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">{content.title}</h1>
          <p className="text-lg text-muted-foreground">
            {content.description}
          </p>
        </div>

        {content.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="mb-4 text-xl font-semibold">{section.title}</h2>
            <ul className="list-inside list-disc space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex justify-center">
          <Button asChild>
            <Link 
              href={content.reportIssue.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              {content.reportIssue.text}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 