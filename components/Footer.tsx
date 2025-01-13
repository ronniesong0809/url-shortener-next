import { Github } from 'lucide-react'
import Link from 'next/link'
import content from '@/content/footer.json'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {content.copyright.text}
          </p>
          <nav className="flex items-center gap-4">
            {content.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
} 