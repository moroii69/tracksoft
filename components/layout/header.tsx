import { ModeToggle } from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <HomeIcon className="h-5 w-5" />
            </Button>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/about" className="hover:text-foreground/80">
              About
            </Link>
            <Link href="/blog" className="hover:text-foreground/80">
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}