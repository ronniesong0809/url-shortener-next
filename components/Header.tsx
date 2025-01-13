'use client'

import { Github } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import content from '@/content/header.json'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href={content.brand.href} className="text-xl font-bold">
            {content.brand.text}
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              {content.navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-sm hover:text-primary">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={content.github.href} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">{content.github.ariaLabel}</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
} 