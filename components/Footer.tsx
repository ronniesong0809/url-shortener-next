import content from '@/content/footer.json'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {content.copyright.text}
          </p>
          <nav className="flex gap-4">
            {content.links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
} 