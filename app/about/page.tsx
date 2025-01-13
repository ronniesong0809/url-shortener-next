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
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2">
                  <span className="select-none text-muted-foreground">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="text-center">
          <p className="text-muted-foreground mb-4">{content.github.description}</p>
          <Button asChild>
            <Link 
              href={content.github.url}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              {content.github.text}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 