'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Keyboard, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'
import { UrlMetadataEntry } from '@/types'
import { getMetadata } from '@/app/api/urls'

export function Header() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [urls, setUrls] = useState<UrlMetadataEntry[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (open) {
      setLoading(true)
      getMetadata()
        .then((data) => setUrls(data.content))
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [open])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">URL Shortener</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/create" className="text-muted-foreground hover:text-foreground">
              Create URL
            </Link>
            <Link href="/urls" className="text-muted-foreground hover:text-foreground">
              All URLs
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button
            variant="outline"
            className="inline-flex items-center"
            onClick={() => setOpen(true)}
          >
            <Keyboard className="mr-2 h-4 w-4" />
            Command Menu
            <CommandShortcut>⌘K</CommandShortcut>
          </Button>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => router.push('/'))}>
              Home
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/create'))}>
              Create URL
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/urls'))}>
              All URLs
              <CommandShortcut>⌘U</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/about'))}>
              About
              <CommandShortcut>⌘A</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Links">
            <CommandItem
              onSelect={() =>
                runCommand(() =>
                  window.open('https://github.com/ronniesong0809/url-shortener-next', '_blank')
                )
              }
            >
              GitHub Repository
              <CommandShortcut>⌘G</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          {loading ? (
            <CommandGroup heading="Loading URLs...">
              <CommandItem disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </CommandItem>
            </CommandGroup>
          ) : urls.length > 0 ? (
            <CommandGroup heading="Recent URLs">
              {urls.map((url) => (
                <CommandItem
                  key={url.shortKey}
                  onSelect={() => runCommand(() => router.push(`/${url.shortKey}/stats`))}
                >
                  <span className="truncate">{url.metadata.title || url.metadata.hostname}</span>
                  <CommandShortcut>{url.shortKey}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </header>
  )
}
